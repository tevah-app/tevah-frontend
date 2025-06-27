// 



// CommunityScreen.tsx
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";


import VideoComponent from "../categories/VideoComponent";
import AllContent from "../categories/Allcontent";
import LiveComponent from "../categories/LiveComponent";
import SermonComponent from "../categories/SermonComponent";
import Music from "../categories/music";


const categories = ["ALL", "LIVE", "SERMON", "MUSIC", "E-BOOKS", "VIDEO"];

export default function LibraryScreen() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const renderContent = () => {
    switch (selectedCategory) {
      case "ALL":
        return <AllContent />;
      case "LIVE":
        return <LiveComponent />;
      case "SERMON":
        return <SermonComponent />;
      case "MUSIC":
        return <Music />;
      case "VIDEO":
        return <VideoComponent />;
      default:
        return null;
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-2 py-3 mt-6"
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 mx-1 rounded-[10px] ${
              selectedCategory === category
                ? "bg-black"
                : "bg-white border border-[#6B6E7C]"
            }`}
          >
            <Text
              className={`${
                selectedCategory === category
                  ? "text-white"
                  : "text-[#1D2939]"
              } font-rubik`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className="flex-1">{renderContent()}</View>
    </ScrollView>
  );
}
