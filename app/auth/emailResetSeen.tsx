import { router } from "expo-router";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";


export default function EmailResetSeem() {
  return (
    <View className="flex justify-center mx-auto mt-6 w-[333px] h-[449px]">
      <View className="flex flex-col justify-center items-center w-[333px]">
        <Image source={require("../../assets/images/Clip path group.png")} />

        <Text className="text-4xl font-bold mb-4 mt-4 text-[#1D2939] text-clip text-center">You’ve got an email</Text>

        <Text className="text-1xl mb-4 mt-4 text-[#1D2939] text-clip text-center">Check your email, we’ve sent you a password reset link.</Text>


        <TouchableOpacity
        onPress={() => router.push("/auth/resetPassword")}
        className="bg-[#090E24] p-2 rounded-full  mt-4 w-[333px] h-[45px]"
      >
        <Text className="text-white text-center">Okay, Got It</Text>
      </TouchableOpacity>

      </View>


    
    </View>
  );
}
