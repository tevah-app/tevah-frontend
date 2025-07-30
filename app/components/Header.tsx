import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../utils/api";

const defaultAvatar = require("../../assets/images/image (5).png");

type User = {
  firstName: string;
  lastName: string;
  avatar: string;
  section: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("👤 User API response:", data);
        setUser(data.data);
      } catch (error) {
        console.error("❌ Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <View className="flex-row justify-between items-center bg-white mt-12 w-[370px] mx-auto">
        <View className="flex-row items-center justify-center">
          <TouchableOpacity onPress={() => router.push("/auth/Logout")}>
            <Image
              source={
                typeof user?.avatar === "string" &&
                user.avatar.startsWith("http")
                  ? { uri: user.avatar.trim() }
                  : defaultAvatar
              }
              className="w-[38px] h-[38px] rounded-[8px]"
            />
          </TouchableOpacity>

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
          <TouchableOpacity
            onPress={() => router.push("/ExploreSearch/ExploreSearch")}
          >
            <Ionicons name="search-outline" size={24} color="#090E24" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/noitfication/NotificationsScreen")}
          >
            <Ionicons name="notifications-outline" size={24} color="#090E24" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/categories/HomeScreen")}
          >
            <Ionicons name="download-outline" size={24} color="#090E24" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Gray horizontal line under the component */}
      <View className=" w-full h-[1px] bg-gray-300 mt-3" />
    </>
  );
}
