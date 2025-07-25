import { router, useFocusEffect } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
  BackHandler,
} from "react-native";
import AuthHeader from "../components/AuthHeader";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { API_BASE_URL } from "../utils/api";

export default function LoginScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLoginValidation = async () => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");

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
      setPasswordError(
        "Password must be at least 6 characters with letters and numbers"
      );
      isValid = false;
    }

    if (!isValid) return;

    // `/auth/login`

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailAddress,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Login Failed", data.message || "Something went wrong");
        return;
      }

      // ✅ Save token and user info to AsyncStorage
      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
      }

      if (data.user) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
      }

      // Navigate to profile setup
      router.replace("/categories/HomeScreen");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Error", "An unexpected error occurred.");
    }
  };

  const validatePassword = (password: string) => {
    return (
      password.length >= 6 && /[A-Za-z]/.test(password) && /\d/.test(password)
    );
  };

  return (
    <View className="flex-1 bg-[#FCFCFD]">
       <View className="px-4 mt-6">
        <AuthHeader title="Sign In" />
      </View>
      <View className="flex flex-col justify-center items-center mx-auto px-4 mt-0 w-[333px]">
        <View className="flex flex-col justify-center items-start h-[160px] w-[333px] mt-3">
          <Text className="font-rubik-semibold text-[#1D2939] text-star text-[40px]">
            Great to see you {"\n"}again{" "}
            <Image
              source={{
                uri: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif",
              }}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </Text>
          <Text className="mt-2 font-rubik text-[14px] w-full text-[#344054] text-start">
            Log in to pick up where you left off. Your sermons, playlists, and
            community await.
          </Text>
        </View>

        <View className="flex flex-col justify-center mt-6 items-center w-[333px] h-[157px]">
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
          <View className="flex flex-col w-[333px] mt-3">
            <View className="flex flex-row rounded-[15px] h-[56px] border border-[#9D9FA7] items-center px-3">
              <FontAwesome6 name="unlock-keyhole" size={15} color="black" />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="ml-2 flex-1"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FontAwesome6
                  name={showPassword ? "eye-slash" : "eye"}
                  size={18}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {passwordError && (
              <Text className="text-red-500 text-sm mt-1">{passwordError}</Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => router.push("/auth/forgetPassword")}
            className="mt-2 flex flex-row w-[333px] ml-2"
          >
            <Text className="text-[#6663FD] text-[14px] font-rubik-semibold underline">
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-col mt-32 justify-center items-center w-full">
          <TouchableOpacity
            onPress={handleLoginValidation}
            className="bg-[#090E24] p-2 rounded-full mt-0 w-[333px] h-[45px]"
          >
            <Text className="text-white text-center text-base">Sign In</Text>
          </TouchableOpacity>

          <Text className="text-1xl font-semibold mt-6">
            DON'T HAVE AN ACCOUNT?
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/auth/signup")}
            className="mt-6"
          >
            <Text className="text-[#344054] text-sm font-medium mt-4">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
