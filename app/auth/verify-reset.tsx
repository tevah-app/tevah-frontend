import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import AuthHeader from '../components/AuthHeader';

export default function VerifyReset() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 bg-white">
      <AuthHeader title="Reset Password" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-col justify-center px-4 py-6 mx-auto md:px-8 lg:px-12">
            <View className="flex flex-col w-full max-w-[500px] mx-auto">
              <Text className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-[#1D2939]">
                Reset your password
              </Text>
              <Text className="mt-3 sm:mt-4 text-[#1D2939] text-sm sm:text-base md:text-lg lg:text-xl">
                Enter the verification code sent to your email and your new password.
              </Text>
            </View>

            <View className="flex flex-col w-full max-w-[500px] mx-auto mt-6">
              <View className="flex flex-row rounded-[15px] w-full h-[50px] sm:h-[56px] md:h-[64px] lg:h-[72px] border border-[#9D9FA7] items-center justify-center">
                <MaterialCommunityIcons
                  name="email-check-outline"
                  size={15}
                  color="black"
                  className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
                <TextInput
                  placeholder="Enter verification code"
                  className="border-hidden outline-none w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-[40px] sm:h-[45px] md:h-[48px] lg:h-[56px] ml-2 text-sm sm:text-base md:text-lg lg:text-xl text-center"
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>

              <View className="flex flex-row rounded-[15px] w-full h-[50px] sm:h-[56px] md:h-[64px] lg:h-[72px] border border-[#9D9FA7] items-center justify-center mt-4">
                <FontAwesome6 
                  name="unlock-keyhole" 
                  size={15} 
                  color="black" 
                  className="sm:w-5 sm:h-5 md:w-6 md:h-6" 
                />
                <TextInput
                  placeholder="New password"
                  className="border-hidden outline-none w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] h-[40px] sm:h-[45px] md:h-[48px] lg:h-[56px] ml-2 text-sm sm:text-base md:text-lg lg:text-xl"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <FontAwesome5 
                    name={showPassword ? "eye" : "eye-slash"} 
                    size={15} 
                    color="black" 
                    className="sm:w-5 sm:h-5 md:w-6 md:h-6" 
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/auth/login")}
                className="bg-[#090E24] p-2 rounded-full mt-6 w-full h-[42px] sm:h-[45px] md:h-[52px] lg:h-[60px]"
              >
                <Text className="text-white text-center text-sm sm:text-base md:text-lg lg:text-xl">Reset Password</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/auth/reset-password")}
                className="mt-4"
              >
                <Text className="text-[#344054] text-xs sm:text-sm md:text-base lg:text-lg underline-none font-medium text-center">
                  Back to Reset Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
} 