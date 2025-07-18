



import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
  Animated as RNAnimated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import AuthHeader from "../components/AuthHeader";
import FailureCard from "../components/failureCard";
import SuccessfulCard from "../components/successfulCard";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import InfoCard from "../components/successfulCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../utils/api";


export default function CodeVerification() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [codeArray, setCodeArray] = useState(['', '', '', '', '', '']);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const dropdownAnim = useRef(new RNAnimated.Value(-200)).current;
  const emailAddress = params.emailAddress as string;
  const password = params.password as string;
  const firstName = params.firstName as string;
  const lastName = params.lastName as string;

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
    if (text.length === 6 && /^[A-Za-z0-9]{6}$/.test(text)) {
      setCodeArray(text.toUpperCase().split(''));
      return;
    }

    const char = text.slice(-1).toUpperCase();
    if (!/^[A-Z0-9]?$/.test(char)) return;

    const newCode = [...codeArray];
    newCode[index] = char;
    setCodeArray(newCode);
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace') {
      const newCode = [...codeArray];
      newCode[index] = '';

      if (index === 5 && codeArray[5] === '') {
        setCodeArray(['', '', '', '', '', '']);
      } else {
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
      const response = await fetch(`http://${API_BASE_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailAddress,
          code,
        }),
      });

      const data = await response.json();
      console.log("📦 Response from backend:", data);

      if (data.success) {
        console.log("✅ Code verified. Logging in...");
      
        // Log in to get token
        const loginResponse = await fetch(`http://${API_BASE_URL}/api/auth/login`, {
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
          await AsyncStorage.setItem("user", JSON.stringify(loginData.user));
      
          console.log("🔐 Token stored. Proceeding...");
          triggerBounceDrop("success");
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
      const response = await fetch(`http://${API_BASE_URL}/api/auth/resend-verification-email`, {
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

  const getInputStyle = () => ({
    textAlignVertical: 'center',
    paddingVertical: 0,
    lineHeight: 40,
  });

  return (
    <View className="flex flex-col w-full justify-center items-center bg-[#F9FAFB] mx-auto relative">
      <AuthHeader title="Code Verification" />

      <RNAnimated.View
        className="absolute w-full items-center z-10 px-4"
        style={{ transform: [{ translateY: dropdownAnim }] }}
      >
        {showSuccess && <SuccessfulCard text="Successfully verified" />}
        {showFailure && <FailureCard  text="Invalid code" onClose={hideDropdown} />}
      </RNAnimated.View>

      <View className="flex flex-col justify-center items-center px-4 mt-5 w-full">
        <View className="flex flex-col w-[333px]">
          <Text className="text-4xl font-bold mt-3 text-[#1D2939]">
            Verify with code
          </Text>
          <Text className="mt-2 text-[#1D2939] text-base">
            Enter the 6-character code we sent to {emailAddress}
          </Text>
        </View>

        <View className="flex flex-row w-[333px] justify-between items-center mt-6">
          <View className="flex flex-row w-[150px] h-[40px] items-center justify-around">
            {[0, 1, 2].map((i) => (
              <TextInput
                key={i}
                value={codeArray[i]}
                onChangeText={(text) => handleCodeChange(text, i)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
                className="border border-[#9D9FA7] w-[40px] h-[40px] rounded-[9px] text-center text-lg"
                keyboardType="default"
                autoCapitalize="characters"
                maxLength={6}
                textContentType="oneTimeCode"
                style={getInputStyle()}
              />
            ))}
          </View>

          <View className="flex flex-row w-[150px] h-[40px] items-center justify-around">
            {[3, 4, 5].map((i) => (
              <TextInput
                key={i}
                value={codeArray[i]}
                onChangeText={(text) => handleCodeChange(text, i)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
                className="border border-[#9D9FA7] w-[40px] h-[40px] rounded-[9px] text-center text-lg"
                keyboardType="default"
                autoCapitalize="characters"
                maxLength={6}
                textContentType="oneTimeCode"
                style={getInputStyle()}
              />
            ))}
          </View>
        </View>
      </View>

      <View className="flex flex-col mt-12 justify-center items-center w-full md:w-[400px] lg:w-[450px]">
        <TouchableOpacity
          onPress={onVerifyPress}
          className="bg-[#090E24] p-2 rounded-full mt-3 w-[333px] h-[45px] flex-row items-center justify-center"
          disabled={isVerifying}
        >
          <View className="flex-row items-center justify-center">
            <Text className="text-white text-base">
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Text>
            {isVerifying && (
              <Animated.View style={[{ marginLeft: 8 }, animatedStyle]}>
                <Icon name="star" size={16} color="#6663FD" />
              </Animated.View>
            )}
          </View>
        </TouchableOpacity>

        <View className="flex-row items-center mt-6">
          <Text className="text-base font-semibold">Didn't get a code? </Text>
          <TouchableOpacity onPress={handleResend} disabled={isResending}>
            <Text className="text-base font-semibold text-[#6663FD]">
              {isResending ? 'Resending...' : 'Resend'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}








