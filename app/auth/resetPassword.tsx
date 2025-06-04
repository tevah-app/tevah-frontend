import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AuthHeader from '../components/AuthHeader';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View className="flex-1 bg-white">
      <AuthHeader title="Reset Password" />
      <View className="flex flex-col justify-center mx-auto mt-12 w-[333px]">
        <View className="flex flex-col w-[333px] h-[176px]">
          <Text className="text-4xl font-bold mb-4 text-[#1D2939]">
            Reset Password
          </Text>
          <Text className="mt-2 text-[#1D2939]">
            Enter your new password.  
          </Text>
        </View>

        <View className="flex flex-col">
          <View className="flex flex-row rounded-[15px] w-[333px] h-[56px] border border-[#9D9FA7] items-center justify-center mt-2">
            <FontAwesome6 name="unlock-keyhole" size={15} color="black" />
            <TextInput
              placeholder="Password"
              className="border-hidden outline-none w-[250px] h-[40px] ml-2"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome5 
                name={showPassword ? "eye" : "eye-slash"} 
                size={15} 
                color="black" 
              />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row rounded-[15px] w-[333px] h-[56px] border border-[#9D9FA7] items-center justify-center mt-4">
            <FontAwesome6 name="unlock-keyhole" size={15} color="black" />
            <TextInput
              placeholder="Confirm Password"
              className="border-hidden outline-none w-[250px] h-[40px] ml-2"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <FontAwesome5 
                name={showConfirmPassword ? "eye" : "eye-slash"} 
                size={15} 
                color="black" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-col mt-36 justify-center items-center h-[113px] w-[333px]">
          <TouchableOpacity
            onPress={() => router.push("/auth/emailResetSeen")}
            className="bg-[#090E24] p-2 rounded-full mt-4 w-[333px] h-[45px]"
          >
            <Text className="text-white text-center mt-2">Submit</Text>
          </TouchableOpacity>

          <Text className="text-1xl font-semibold mt-9">
            REMEMBER YOUR PASSWORD?
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/auth/login")}
            className="mt-2"
          >
            <Text className="text-[#344054] text-sm underline-none font-medium mt-9">
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
