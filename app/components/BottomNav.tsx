import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import Upload from "../categories/upload";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

// Bottom tab config
interface BottomNavProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const tabConfig: Record<
  string,
  { IconComponent: React.ComponentType<any>; name: string; label: string }
> = {
  Home: { IconComponent: AntDesign, name: "home", label: "Home" },
  Community: {
    IconComponent: MaterialCommunityIcons,
    name: "account-group-outline",
    label: "Community",
  },
  Library: {
    IconComponent: Ionicons,
    name: "play-circle-outline",
    label: "Library",
  },
  Account: {
    IconComponent: Ionicons,
    name: "person-outline",
    label: "Account",
  },
};

export default function BottomNav({
  selectedTab,
  setSelectedTab,
}: BottomNavProps) {
  const [showActions, setShowActions] = useState(false);
  const [showUploadScreen, setShowUploadScreen] = useState(false);

  const handleFabToggle = () => {
    setShowActions(!showActions);
  };

  const handleUpload = () => {
    setShowActions(false);
    setTimeout(() => {
      router.push("/categories/upload");
    }, 300);
  };

  const handleGoLive = () => {
    setShowActions(false);
    alert("Go Live clicked!");
  };

  return (
    <>
      {/* Upload Overlay */}
      {showUploadScreen && (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-50">
          <Upload onClose={() => setShowUploadScreen(false)} />
        </View>
      )}

      {/* Background Blur */}
      {showActions && Platform.OS !== "web" && (
        <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />
      )}

      {/* FAB Action Buttons */}
      {showActions && (
        <View className="absolute bottom-24 w-[220px] ml-20 flex-row justify-center items-center z-20 mb-12">
          <View className="rounded-2xl overflow-hidden w-full h-[70px]">
            {Platform.OS !== "web" ? (
              <BlurView
                intensity={80}
                tint="light"
                className="flex-row w-full h-full items-center justify-center gap-4 bg-white/20"
              >
                <TouchableOpacity
                  className="bg-[#6663FD] px-4 py-2 rounded-full border-4 border-white"
                  onPress={handleUpload}
                >
                  <Text className="text-white font-medium">Upload</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-black px-4 py-2 rounded-full border-4 border-white"
                  onPress={handleGoLive}
                >
                  <Text className="text-white font-medium">Go Live</Text>
                </TouchableOpacity>
              </BlurView>
            ) : (
              <View className="flex-row w-full h-full items-center justify-center gap-4 bg-white/70 px-2 rounded-2xl">
                <TouchableOpacity
                  className="bg-[#6663FD] px-4 py-2 rounded-full border-4 border-white"
                  onPress={handleUpload}
                >
                  <Text className="text-white font-medium">Upload</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-black px-4 py-2 rounded-full border-4 border-white"
                  onPress={handleGoLive}
                >
                  <Text className="text-white font-medium">Go Live</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Bottom Navigation Bar */}
      <View className="absolute bottom-0 left-0 right-0 h-20 bg-white flex-row justify-around items-center shadow-lg z-10 mb-14">
        {/* First half of tabs */}
        {Object.entries(tabConfig)
          .slice(0, 2)
          .map(([tab, { IconComponent, name, label }]) => {
            const isActive = selectedTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                className="items-center justify-center"
              >
                <IconComponent
                  name={name}
                  size={24}
                  color={isActive ? "#6663FD" : "#000"}
                />
                <Text
                  className={`text-xs mt-1 ${
                    isActive ? "text-[#6663FD]" : "text-black"
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}

        {/* Floating Action Button */}
        <View className="absolute -top-6 bg-white p-1 rounded-full shadow-md">
          <TouchableOpacity
            className="w-12 h-12 rounded-full bg-white items-center justify-center"
            onPress={handleFabToggle}
          >
            <AntDesign
              name={showActions ? "close" : "plus"}
              size={18}
              color="#6663FD"
            />
          </TouchableOpacity>
        </View>

        {/* Second half of tabs */}
        {Object.entries(tabConfig)
          .slice(2)
          .map(([tab, { IconComponent, name, label }]) => {
            const isActive = selectedTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                className="items-center justify-center"
              >
                <IconComponent
                  name={name}
                  size={24}
                  color={isActive ? "#6663FD" : "#000"}
                />
                <Text
                  className={`text-xs mt-1 ${
                    isActive ? "text-[#6663FD]" : "text-black"
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </>
  );
}
