import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../utils/api";

// Local fallback image
const defaultAvatar = require("../../assets/images/image (5).png");

type User = {
  firstName: string;
  lastName: string;
  avatar: string;
  section: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("👤 User API response:", data);
        setUser(data.data); // double-check this shape
      } catch (error) {
        console.error("❌ Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View className="flex-row justify-between items-center bg-white mt-12 w-[320px] ml-5">
      <View className="flex-row items-center justify-center">
        <Image
          source={
            typeof user?.avatar === "string" && user.avatar.startsWith("http")
              ? { uri: user.avatar.trim() }
              : defaultAvatar
          }
          className="w-[38px] h-[38px] rounded-[8px]"
        />

        <View className="ml-2">
          <Text className="text-[14px] font-rubik font-medium text-[#090E24]">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </Text>
          <Text className="text-[10px] text-[#090E24] font-rubik font-medium">
          {user?.section?.toUpperCase()}
          </Text>
        </View>
      </View>
      <View className="flex-row gap-4">
        <Ionicons name="search-outline" size={24} color="#090E24" />
        <Ionicons name="notifications-outline" size={24} color="#090E24" />
        <Ionicons name="download-outline" size={24} color="#090E24" />
      </View>
    </View>
  );
}
