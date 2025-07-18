import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import PagerView from "react-native-pager-view";
import {
  AntDesign,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import BottomNav from "../components/BottomNav";

// ✅ Route Params Type
type Params = {
  title: string;
  speaker: string;
  timeAgo: string;
  views: string;
  sheared: string;
  saved: string;
  favorite: string;
  imageUrl: string;
  speakerAvatar: string;
  isLive?: string; // Optional
  category?: string;
};

const tabList = ["Home", "Community", "Library", "Account"];

export default function Reelsviewscroll() {
  const [selectedTab, setSelectedTab] = useState("Home");
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const pagerRef = useRef<PagerView>(null);
  const modalKey = "videoActionMenu";

  const {
    title,
    speaker,
    timeAgo,
    views,
    sheared,
    saved,
    favorite,
    imageUrl,
    speakerAvatar,
    isLive = "false",
    category,
  } = useLocalSearchParams() as Params;

  const live = isLive === "true"  ;
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    const index = tabList.indexOf(tab);
    pagerRef.current?.setPage(index);
    setSelectedTab(tab);
  };

  return (
    <View className="flex-1 bg-[#FCFCFD]">
      <Image
        source={{ uri: imageUrl }}
        className="h-[730px] w-full relative"
        resizeMode="cover"
      />

      {/* Live Header */}
      <View className="flex-row items-center justify-between absolute w-full top-10 h-[30px] mt-4">
        {live ? (
          <View className="absolute bg-red-600 px-2 ml-6 rounded-md z-10 flex flex-row items-center h-[23px] ">
            <Text className="text-white text-xs font-bold">LIVE</Text>
            <Image
              source={require("../../assets/images/Vector.png")}
              className="h-[10px] w-[10px] ml-2"
              resizeMode="contain"
            />
          </View>
        ) : (
          <View className="absolute bg-gray-500 px-2 ml-6 rounded-md z-10 flex flex-row items-center h-[23px] ">
            <Text className="text-white text-xs font-bold">LIVE</Text>
            <Text className="text-white ml-2 text-xs font-bold">{timeAgo}</Text>
          </View>
        )}

        <Text className="text-white font-rubik-semibold ml-[160px]">Live</Text>

        <TouchableOpacity
          className="absolute ml-[300px]"
          onPress={() => {
            if (router.canGoBack?.()) {
              router.back();
            } else {
              router.replace({
                pathname: "/categories/Allcontent", // ✅ adjust to your actual home tab route
                params: {
                  defaultCategory: category  // Pass category back
                },
              });
            }
          }}
        >
          <MaterialIcons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View className="absolute bottom-[220px] left-3 right-3 ml-3">
        <Text className="text-white text-base font-bold" numberOfLines={2}>
          {title}
        </Text>
      </View>

      {/* Speaker Info */}
      <View className="flex-row items-center justify-between mt-1">
        <View className="flex flex-row items-center absolute bottom-32 ml-3">
          <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center relative ml-1 mt-2">
            <Image
              source={{ uri: speakerAvatar }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 999,
                marginLeft: 26,
                marginTop: 15,
              }}
              resizeMode="cover"
            />
          </View>

          <View className="ml-3">
            <View className="flex-row items-center">
              <Text className="ml-1 text-[13px] font-rubik-semibold text-white mt-1">
                {speaker}
              </Text>
              <View className="flex flex-row mt-2 ml-2">
                <Ionicons name="time-outline" size={13} color="#FFFFFF" />
                <Text className="text-[10px] text-white ml-1 font-rubik">
                  {timeAgo}
                </Text>
              </View>
            </View>

            <View className="flex flex-row mt-2">
              <View className="flex-row items-center">
                <Image
                  source={require("../../assets/images/Vector1.png")}
                  className="h-[16px] w-[16px] ml-1"
                  resizeMode="contain"
                />
                <Text className="text-[10px] text-white ml-1 mt-1 font-rubik">
                  {views}
                </Text>
              </View>
              <View className="flex-row items-center ml-4">
                <AntDesign name="sharealt" size={16} color="#FFFFFF" />
                <Text className="text-[10px] text-white ml-1 font-rubik">
                  {sheared}
                </Text>
              </View>
              <View className="flex-row items-center ml-6">
                <Fontisto name="favorite" size={14} color="#FFFFFF" />
                <Text className="text-[10px] text-white ml-1 font-rubik">
                  {saved}
                </Text>
              </View>
              <View className="flex-row items-center ml-6">
                <MaterialIcons
                  name="favorite-border"
                  size={16}
                  color="#FFFFFF"
                />
                <Text className="text-[10px] text-white ml-1 font-rubik">
                  {favorite}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            setModalVisible(modalVisible === modalKey ? null : modalKey)
          }
          className="mr-2 absolute bottom-32 right-3"
        >
          <Ionicons name="ellipsis-vertical" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      {modalVisible === modalKey && (
        <View className="absolute mt-[260px] right-4 bg-white shadow-md rounded-lg p-3 z-50 w-44">
          <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
            <Text className="text-[#1D2939] font-rubik ml-2">View Details</Text>
            <Ionicons name="eye-outline" size={16} color="#3A3E50" />
          </TouchableOpacity>
          <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
            <Text className="text-sm text-[#1D2939] font-rubik ml-2">
              Share
            </Text>
            <AntDesign name="sharealt" size={16} color="#3A3E50" />
          </TouchableOpacity>
          <TouchableOpacity className="py-2 flex-row items-center justify-between">
            <Text className="text-[#1D2939] font-rubik ml-2">
              Save to Library
            </Text>
            <MaterialIcons name="library-add" size={18} color="#3A3E50" />
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Nav */}
      <BottomNav selectedTab={selectedTab} setSelectedTab={handleTabChange} />
    </View>
  );
}
