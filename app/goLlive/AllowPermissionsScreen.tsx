 // components/AllowPermissionsScreen.tsx


import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";

// Optional: if you're using TypeScript and have a type for your stack

const router = useRouter();

const AllowPermissionsScreen = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-12 pb-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-[16px] font-rubik-semibold text-[#3B3B3B]">
          Allow Permissions
        </Text>
        <TouchableOpacity>
          <Feather name="x" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Main Card */}
      <View className="bg-gray-100 rounded-xl p-6 flex-1   justify-between">
        {/* Icon + Title */}
        <View className="items-center mt-9">
          <View className="bg-indigo-500 rounded-full p-4 mb-4">
            <Feather name="help-circle" size={36} color="#fff" />
          </View>
          <Text className=" font-rubik-bold text-center text-[18px] text-[#344054] mb-4">
            Allow JevahApp to access your{"\n"}camera and microphone
          </Text>
        </View>

        {/* Features */}
        <View className="mb-24">
          <View className="flex-row space-x-4">
            <Feather name="camera" size={24} color="#000" />
            <View className="flex-1 ml-3">
              <Text className="font-semibold text-base text-[#475467]">
                Enjoy certain features using Jevah App
              </Text>
              <Text className="text-sm font-rubik text-[#344054]">
                Allow permissions to take pictures, photos, record sounds, and
                videos from your phone.
              </Text>
            </View>
          </View>

          <View className="flex-row space-x-4 mt-3">
            <Feather name="settings" size={24} color="#000" />
            <View className="flex-1 ml-3">
              <Text className="font-semibold text-base text-[#475467]">
                Manage permissions
              </Text>
              <Text className="text-sm text-[#344054]">
                Not to worry, you can always go back to your settings at any
                time to change your preference.
              </Text>
            </View>
          </View>
        </View>
        

        {/* Allow Button */}
        <Pressable
          onPress={() => router.push("/goLlive/GoLive")}
          className="bg-black rounded-full mt-8 py-4"
        >
          <Text className="text-center text-white text-base font-semibold">
            Allow Permissions
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AllowPermissionsScreen;

