
import { useSignUp } from "@clerk/clerk-expo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AuthHeader from "../components/AuthHeader";
import VerifyEmail from "./verifyEmail";
import { AsyncStorage } from "react-native";

export default function SignUpScreen() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  // const handleSignUpValidation = async () => {
  //   let isValid = true;
  
  //   // ... validation logic unchanged ...
  
  //   if (isValid) {
  //     try {
  //       const response = await fetch("http://192.168.100.47:4000/api/auth/register", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: emailAddress, password, firstName, lastName }),
  //       });
  
  //       const data = await response.json();
  
  //       if (data.success) {
  //         setShowModal(true); // show VerifyEmail modal
  //       } else {
  //         alert(data.message || "Something went wrong");
  //       }
  //     } catch (err) {
  //       console.error("Signup error:", err);
  //       alert("Signup failed. Try again.");
  //     }
  //   }
  // };
  // const handleSignUpValidation = async () => {
  //   let isValid = true;
  
  //   // Clear previous errors
  //   setEmailError("");
  //   setPasswordError("");
  //   setFirstNameError("");
  //   setLastNameError("");
  
  //   // Validate First Name
  //   if (!firstName.trim()) {
  //     setFirstNameError("First name is required");
  //     isValid = false;
  //   }
  
  //   // Validate Last Name
  //   if (!lastName.trim()) {
  //     setLastNameError("Last name is required");
  //     isValid = false;
  //   }
  
  //   // Validate Email
  //   if (!emailAddress.trim()) {
  //     setEmailError("Email is required");
  //     isValid = false;
  //   } else if (!validateEmail(emailAddress)) {
  //     setEmailError("Invalid email format");
  //     isValid = false;
  //   }
  
  //   // Validate Password
  //   if (!password) {
  //     setPasswordError("Password is required");
  //     isValid = false;
  //   } else if (!validatePassword(password)) {
  //     setPasswordError("Password must be at least 6 characters long and include both letters and numbers");
  //     isValid = false;
  //   }
  
  //   if (isValid) {
  //     try {
  //       const response = await fetch("http://192.168.43.62:4000/api/auth/register", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: emailAddress, password, firstName, lastName }),
  //       });
  
  //       const data = await response.json();
  
  //       if (data.success) {
  //         setShowModal(true); // Show verification modal
  //       } else {
  //         alert(data.message || "Something went wrong");
  //       }
  //     } catch (err) {
  //       console.error("Signup error:", err);
  //       alert("Signup failed. Try again.");
  //     }
  //   }
  // };
  




  const handleSignUpValidation = async () => {
    let isValid = true;
  
    // Clear previous errors
    setEmailError("");
    setPasswordError("");
    setFirstNameError("");
    setLastNameError("");
  
    // Validation logic
    if (!firstName.trim()) {
      setFirstNameError("First name is required");
      isValid = false;
    }
  
    if (!lastName.trim()) {
      setLastNameError("Last name is required");
      isValid = false;
    }
  
    if (!emailAddress.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(emailAddress)) {
      setEmailError("Invalid email format");
      isValid = false;
    }
  
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long and include both letters and numbers");
      isValid = false;
    }
  
    if (isValid) {
      try {
        const response = await fetch("http://192.168.43.62:4000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailAddress, password, firstName, lastName }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          // 🔐 Save token (if returned from backend)
          if (data.token) {
            await AsyncStorage.setItem("token", data.token);
          }
  
          setShowModal(true); // Show verify modal
        } else {
          alert(data.message || "Something went wrong");
        }
      } catch (err) {
        console.error("Signup error:", err);
        alert("Signup failed. Try again.");
      }
    }
  };
  

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return (
      password.length >= 6 && /[A-Za-z]/.test(password) && /\d/.test(password)
    );
  };


  return (
    <View className="flex-1 bg-[#FCFCFD]">
      <AuthHeader title="Sign Up" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "flex-start",
            paddingBottom: 160,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex flex-col justify-center items-start h-[160px] w-[333px] mt-3">
            <Text className="font-rubik-semibold text-[#1D2939] text-star text-[40px]">
              Welcome to the {"\n"}family!{" "}
              <Image
                source={{
                  uri: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f917/512.gif",
                }}
                style={{ width: 32, height: 32 }}
                resizeMode="contain"
              />
            </Text>
            <Text className="mt-2 font-rubik text-[15px] w-full text-[#344054] text-start">
              Sign up with your email. We promise no spam, just blessings.
            </Text>
          </View>

          <View className="flex flex-col justify-center mt-6 items-center w-[33px]">
            {/* First Name */}
            <View className="flex flex-col w-[333px] mt-2">
              <View className="flex flex-row rounded-[15px] h-[56px] border border-[#9D9FA7] items-center px-3">
                <Image
                  source={require("../../assets/images/user.png")}
                  className="w-[24px] h-[24px]"
                />
                <TextInput
                  placeholder="First name"
                  value={firstName}
                  onChangeText={setFirstName}
                  className="ml-3 w-full text-[#090E24]"
                />
              </View>
              {firstNameError && (
                <Text className="text-red-500 text-sm mt-1">
                  {firstNameError}
                </Text>
              )}
            </View>

            {/* Last Name */}
            <View className="flex flex-col w-[333px] mt-2">
              <View className="flex flex-row rounded-[15px] h-[56px] border border-[#9D9FA7] items-center px-3">
                <Image
                  source={require("../../assets/images/user.png")}
                  className="w-[24px] h-[24px]"
                />
                <TextInput
                  placeholder="Last name"
                  value={lastName}
                  onChangeText={setLastName}
                  className="ml-3 w-full text-[#090E24]"
                />
              </View>
              {lastNameError && (
                <Text className="text-red-500 text-sm mt-1">
                  {lastNameError}
                </Text>
              )}
            </View>

            {/* Email Field */}
            <View className="flex flex-col w-[333px] mt-2">
              <View className="flex flex-row rounded-[15px] h-[56px] border border-[#9D9FA7] items-center px-3">
                <Image
                  source={require("../../assets/images/mail.png")}
                  className="w-[20px] h-[18px]"
                />
                <TextInput
                  placeholder="Email"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="ml-3 w-full"
                />
              </View>
              {emailError && (
                <Text className="text-red-500 text-sm mt-1">{emailError}</Text>
              )}
            </View>

            {/* Password Field */}
            <View className="flex flex-col w-[333px] mt-2">
              <View className="flex flex-row rounded-[15px] h-[56px] border border-[#9D9FA7] items-center px-3">
                <FontAwesome6 name="unlock-keyhole" size={15} color="black" />
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className="ml-2 flex-1"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <FontAwesome6
                    name={showPassword ? "eye-slash" : "eye"}
                    size={18}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {passwordError && (
                <Text className="text-red-500 text-sm mt-1">
                  {passwordError}
                </Text>
              )}
            </View>
          </View>

          {/* Sign Up Button */}
          <View className="flex flex-col mt-10 justify-center items-center w-full">
            <TouchableOpacity
              onPress={handleSignUpValidation}
              className="bg-[#090E24] p-2 rounded-full mt-3 w-[333px] h-[45px]"
            >
              <Text className="text-white text-center text-base">Sign Up</Text>
            </TouchableOpacity>

            <Text className="text-1xl font-semibold mt-6">
              ALREADY HAVE AN ACCOUNT?
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/auth/login")}
              className="mt-6"
            >
              <Text className="text-[#344054] text-sm font-medium">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerifyEmail
        visible={showModal}
        onClose={() => setShowModal(false)}
        onVerify={() => {}}
        emailAddress={emailAddress}
        password={password}
        firstName={firstName}
        lastName={lastName}
      />
    </View>
  );
}
