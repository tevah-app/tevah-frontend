import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated as RNAnimated,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthHeader from "../components/AuthHeader";
import FailureCard from "../components/failureCard";
import SuccessfulCard from "../components/successfulCard";

export default function CodeVerification() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const API_BASE_URL = Constants.expoConfig?.extra?.API_URL;

  const [codeArray, setCodeArray] = useState(['', '', '', '', '', '']);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const dropdownAnim = useRef(new RNAnimated.Value(-200)).current;
  const emailAddress = params.emailAddress as string;
  const password = params.password as string;

  // Refs to control focus across code inputs
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const FLOOR_Y = 280;
  const FINAL_REST_Y = 70;

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isVerifying) {
      rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1);
    } else {
      rotation.value = 0;
    }
  }, [isVerifying]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handleCodeChange = (text: string, index: number) => {
    // If user pasted/auto-filled multiple characters starting at this index, distribute them
    if (text.length > 1) {
      const sanitized = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
      const newCode = [...codeArray];
      let writeIndex = index;
      for (let i = 0; i < sanitized.length && writeIndex < 6; i += 1) {
        newCode[writeIndex] = sanitized[i];
        writeIndex += 1;
      }
      setCodeArray(newCode);
      // Focus the next empty input if available
      if (writeIndex < 6) {
        inputsRef.current[writeIndex]?.focus();
      }
      return;
    }

    const char = text.slice(-1).toUpperCase();
    if (!/^[A-Z0-9]?$/.test(char)) return;

    const newCode = [...codeArray];
    newCode[index] = char;
    setCodeArray(newCode);

    // Auto-advance focus when a character is entered
    if (char !== '' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace') {
      const newCode = [...codeArray];
      if (newCode[index] === '') {
        // Move focus back and clear previous if current is already empty
        if (index > 0) {
          newCode[index - 1] = '';
          setCodeArray(newCode);
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        newCode[index] = '';
        setCodeArray(newCode);
      }
    }
  };

  const triggerBounceDrop = (type: 'success' | 'failure') => {
    if (type === 'success') {
      setShowFailure(false);
      setShowSuccess(true);
    } else {
      setShowSuccess(false);
      setShowFailure(true);
    }

    RNAnimated.timing(dropdownAnim, {
      toValue: FLOOR_Y,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      RNAnimated.spring(dropdownAnim, {
        toValue: FINAL_REST_Y,
        useNativeDriver: true,
        bounciness: 10,
        speed: 5,
      }).start(() => {
        if (type === 'success') {
          setTimeout(() => {
            router.replace('/Profile/profileSetUp');
          }, 600);
        }
      });
    });
  };

  const hideDropdown = () => {
    RNAnimated.spring(dropdownAnim, {
      toValue: -200,
      useNativeDriver: true,
      speed: 10,
      bounciness: 6,
    }).start(() => {
      setShowSuccess(false);
      setShowFailure(false);
    });
  };

  const onVerifyPress = async () => {
    setIsVerifying(true);
    const code = codeArray.join('');

    if (code.length !== 6) {
      triggerBounceDrop("failure");
      setIsVerifying(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailAddress,
          code,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailAddress,
            password: password,
          }),
        });

        const loginData = await loginResponse.json();

        if (loginData.success) {
          await AsyncStorage.setItem("token", loginData.token);
          
          // 🛡️ Validate user data before saving to prevent "Anonymous User" issue
          if (loginData.user && loginData.user.firstName && loginData.user.lastName) {
            await AsyncStorage.setItem("user", JSON.stringify(loginData.user));
            console.log("✅ Complete user data saved after verification:", {
              firstName: loginData.user.firstName,
              lastName: loginData.user.lastName,
              hasAvatar: !!loginData.user.avatar
            });
            triggerBounceDrop("success");
          } else {
            console.error("🚨 BLOCKED: Verification login returned incomplete user data!");
            console.error("   Incomplete data:", loginData.user);
            Alert.alert("Login Issue", "Incomplete user profile. Please contact support.");
            triggerBounceDrop("failure");
            return;
          }
        } else {
          Alert.alert("Login Failed", loginData.message || "Try signing in manually.");
          triggerBounceDrop("failure");
        }
      }

    } catch (err) {
      console.error("❌ Error verifying code:", err);
      Alert.alert("Server Error", "Unable to verify code. Try again later.");
      triggerBounceDrop("failure");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/resend-verification-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailAddress }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Code Resent", "A new verification code has been sent to your email.");
      } else {
        triggerBounceDrop("failure");
        Alert.alert("Resend Failed", data.message || "Try again later.");
      }
    } catch (err) {
      console.error("❌ Error resending code:", err);
      triggerBounceDrop("failure");
    } finally {
      setIsResending(false);
    }
  };

  const getInputStyle = (): TextStyle => ({
    height: 40,
    width: 40,
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    padding: 0,
    margin: 0,
    borderWidth: 1,
    borderColor: '#9D9FA7',
    borderRadius: 9,
    backgroundColor: 'white',
  } as TextStyle);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center' }}>
    

      <View className="w-[370px] mt-6">
        <AuthHeader title="Code Verification" />
      </View>

      <RNAnimated.View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#F9FAFB',
          paddingHorizontal: 16,
          transform: [{ translateY: dropdownAnim }],
          zIndex: 10,
        }}
      >
        {showSuccess && <SuccessfulCard text="Successfully verified" />}
        {showFailure && <FailureCard text="Invalid code" onClose={hideDropdown} />}
      </RNAnimated.View>

      <View className="w-[333px] mt-10 ml-2">
  <Text className="text-4xl font-bold text-[#1D2939]">
    Verify with code
  </Text>
  <Text className="mt-2 text-base text-[#1D2939]">
    Enter the 6-character code we sent to {emailAddress}
  </Text>
</View>


      <View style={{ flexDirection: 'row', marginTop: 30, gap: 12 }}>
        {codeArray.map((char, i) => (
          <TextInput
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            value={char}
            onChangeText={(text) => handleCodeChange(text, i)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
            keyboardType="default"
            autoCapitalize="characters"
            textContentType="oneTimeCode"
            autoFocus={i === 0}
            selectTextOnFocus
            style={getInputStyle()}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={onVerifyPress}
        disabled={isVerifying}
        style={{
          backgroundColor: '#090E24',
          height: 45,
          width: 333,
          marginTop: 40,
          borderRadius: 999,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          {isVerifying ? 'Verifying...' : 'Verify'}
        </Text>
        {isVerifying && (
          <Animated.View style={[{ marginLeft: 8 }, animatedStyle]}>
            <Icon name="star" size={16} color="#6663FD" />
          </Animated.View>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Didn't get a code? </Text>
        <TouchableOpacity onPress={handleResend} disabled={isResending}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#6663FD' }}>
            {isResending ? 'Resending...' : 'Resend'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
