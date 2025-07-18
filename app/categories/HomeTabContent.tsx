import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import AllContent from "./Allcontent";
import LiveComponent from "./LiveComponent";
import SermonComponent from "./SermonComponent";
import Music from "./music";
import VideoComponent from "./VideoComponent";
import Header from "../components/Header";
import EbookComponent from "./EbookComponent";
import { useLocalSearchParams } from "expo-router";
import FilteredMediaList from "./FilteredMediaList";

const categories = ["ALL", "LIVE", "SERMON", "MUSIC", "E-BOOKS", "VIDEO"];

export default function HomeTabContent() {
  const { defaultCategory } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    (defaultCategory as string) || "ALL"
  );

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

      //
      case "E-BOOKS":
        return <EbookComponent />;
      case "VIDEO":
        return <VideoComponent />;
      default:
        return null;
    }

    // switch (selectedCategory) {
    //   case "ALL":
    //     return <FilteredMediaList tag="All" />;
    //   case "LIVE":
    //     return <FilteredMediaList tag="Live" />;
    //   case "SERMON":
    //     return <FilteredMediaList tag="Sermons" />;
    //   case "MUSIC":
    //     return <FilteredMediaList tag="Music" />;
    //   case "E-BOOKS":
    //     return <FilteredMediaList tag="Books" />;
    //   case "VIDEO":
    //     return <FilteredMediaList tag="Videos" />;
    //   default:
    //     return null;
    // }
  };


  // const renderContent = () => {
   
  // };


  return (
    <View style={{ flex: 1 }}>
      <Header />
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
              <View className="relative">
                <Text
                  className={`font-rubik ${
                    selectedCategory === category
                      ? "text-white"
                      : "text-[#1D2939]"
                  }`}
                >
                  {category}
                </Text>

                {category === "LIVE" && (
                  <View
                    style={{
                      position: "absolute",
                      top: -2,
                      right: 2, // Adjust to position over the "E"
                      width: 5,
                      height: 5,
                      borderRadius: 4,
                      backgroundColor: "red",
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View className="flex-1">{renderContent()}</View>
      </ScrollView>
    </View>
  );
}
