import React, { useState } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";

interface VideoCard {
  imageUrl: string;
  title: string;
  speaker: string;
  timeAgo: string;
  speakerAvatar: any;
  favorite: number;
  views: number;
  saved: number;
  sheared: number;

  onPress?: () => void;
}

const videos: VideoCard[] = [
  {
    imageUrl: require("../../assets/images/bg (1).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
];

const videosA: VideoCard[] = [
  {
    imageUrl: require("../../assets/images/image (8).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    imageUrl: require("../../assets/images/image (9).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    imageUrl: require("../../assets/images/image (10).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    imageUrl: require("../../assets/images/image (10).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    imageUrl: require("../../assets/images/image (10).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
];

const videosB: VideoCard[] = [
  {
    imageUrl: require("../../assets/images/image (10).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    imageUrl: require("../../assets/images/image (10).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    imageUrl: require("../../assets/images/image (10).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    imageUrl: require("../../assets/images/image (10).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    imageUrl: require("../../assets/images/image (10).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
];

// Mock data reused for main cards

// Live recommendation items
const recommendedItems = [
  {
    title: "The elevation Chu",
    imageUrl: require("../../assets/images/image (6).png"),
    speaker: "Minister Joseph Eluwa",
    views: 100,
    onPress: () => console.log("Viewing The Chosen"),
  },
  {
    title: "The Beatitudes: The Path to Blessings",
    imageUrl: require("../../assets/images/image (7).png"),
    speaker: "Minister Joseph Eluwa",
    views: 300,
    onPress: () => console.log("Viewing Revival Nights"),
  },
];

// Favourite Live cards
const favouriteVideos = [
  {
    imageUrl: require("../../assets/images/bilble.png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    onPress: () => console.log("Viewing The Chosen"),
  },
  {
    imageUrl: require("../../assets/images/bilble.png"),
    title: "Praise & Power",
    speaker: "Sis. Grace Ali",
    timeAgo: "2HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 400,
    onPress: () => console.log("Viewing Praise & Power"),
  },
  {
    imageUrl: require("../../assets/images/bilble.png"),
    title: "Deep Worship",
    speaker: "Minister John Mark",
    timeAgo: "1HR AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 700,
    onPress: () => console.log("Viewing Deep Worship"),
  },
];

const renderMiniCards = (
  title: string,
  items: typeof recommendedItems,
  modalIndex: number | null,
  setModalIndex: any
) => (
  <View className="mt-5">
    <Text className="text-[16px] font-rubik-semibold text-[#344054] mt-4 mb-2 ml-2">
      {title}
    </Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
    >
      {items.map((item, index) => (
        <View
          key={`rec-${item.title}-${index}`}
          className="mr-4 w-[154px] flex-col items-center"
        >
          <TouchableOpacity
            onPress={item.onPress}
            className="w-full h-[232px] rounded-2xl overflow-hidden relative"
            activeOpacity={0.9}
          >
            <Image
              source={item.imageUrl}
              className="w-full h-full absolute"
              resizeMode="cover"
            />
            <View className="absolute inset-0 justify-center items-center">
              <View className="bg-white/70 p-2 rounded-full">
                <Ionicons name="play" size={24} color="#6663FD" />
              </View>
            </View>
            <View className="absolute bottom-2 left-2 right-2">
              <Text
                className="text-white text-start text-[14px] ml-1 mb-6 font-rubik"
                numberOfLines={2}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
          {modalIndex === index && (
            <View className="absolute mt-[26px] left-1 bg-white shadow-md rounded-lg p-3 z-50 w-30">
              <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                <Text className="text-[#1D2939] font-rubik ml-2">
                  View Details
                </Text>
                <Ionicons name="eye-outline" size={16} color="##3A3E50" />
              </TouchableOpacity>
              <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                <Text className="text-sm text-[#1D2939] font-rubik ml-2">
                  Share
                </Text>
                <AntDesign name="sharealt" size={16} color="##3A3E50" />
              </TouchableOpacity>
              <TouchableOpacity className="py-2 flex-row items-center justify-between">
                <Text className="text-[#1D2939] font-rubik mr-2">
                  Save to Library
                </Text>
                <MaterialIcons name="library-add" size={18} color="#3A3E50" />
              </TouchableOpacity>
            </View>
          )}
          <View className="mt-2 flex flex-col w-full">
            <View className="flex flex-row justify-between items-center">
              <Text
                className="text-[12px] text-[#1D2939] font-rubik font-medium"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.speaker?.split(" ").slice(0, 4).join(" ") + " ..."}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setModalIndex(modalIndex === index ? null : index)
                }
                className="mr-2"
              >
                <Ionicons name="ellipsis-vertical" size={14} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center">
              <Image
                source={require("../../assets/images/Vector1.png")}
                className="h-[16px] w-[16px] ml-1"
                resizeMode="contain"
              />
              <Text className="text-[10px] text-gray-500 ml-2 mt-1 font-rubik">
                {item.views}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
);

// Final Component
export default function LiveComponent() {
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [rsModalIndex, setRsModalIndex] = useState<number | null>(null);
  const [favModalIndex, setFavModalIndex] = useState<number | null>(null);
  let globalIndex = 0;

  const renderVideoCard = (
    video: VideoCard,
    index: number,
    section: string,
    showLiveBadge = true
  ) => {
    const modalKey = `${section}-${index}`;
    return (
      <View className="flex flex-col mt-0" key={modalKey}>
        {index === 0 && section === "videos" && (
          <Text className="text-[16px] font-rubik-semibold text-[#344054] mt-4 mb-2 ml-2">
            Featured
          </Text>
        )}
        <TouchableOpacity
          onPress={video.onPress}
          className="mr-4 w-full h-[436px]"
          activeOpacity={0.9}
        >
          <View className="w-full h-[393px] overflow-hidden relative">
            <Image
              source={video.imageUrl}
              className="w-full h-full"
              resizeMode="cover"
            />
            {showLiveBadge && (
              <View className="absolute top-2 bg-red-600 px-2 py-0.5 rounded-md z-10 flex flex-row items-center h-[23px] mt-3 ml-5">
                <Text className="text-white text-xs font-bold">LIVE</Text>
                <Image
                  source={require("../../assets/images/Vector.png")}
                  className="h-[10px] w-[10px] ml-2"
                  resizeMode="contain"
                />
              </View>
            )}
            <View className="absolute bottom-3 left-3 right-3">
              <Text
                className="text-white text-base font-bold"
                numberOfLines={2}
              >
                {video.title}
              </Text>
            </View>

            {modalVisible === modalKey && (
              <View className="absolute mt-[260px] right-4 bg-white shadow-md rounded-lg p-3 z-50 w-44">
                <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                  <Text className="text-[#1D2939] font-rubik ml-2">
                    View Details
                  </Text>
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
          </View>

          <View className="flex-row items-center justify-between mt-1">
            <View className="flex flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center relative ml-1 mt-2">
                <Image
                  source={video.speakerAvatar}
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
                <View className="flex-row items center">
                  <Text className="ml-1 text-[13px] font-rubik-semibold text-[#344054] mt-1">
                    {video.speaker}
                  </Text>
                  <View className="flex flex-row mt-2 ml-2">
                    <Ionicons name="time-outline" size={13} color="#9CA3AF" />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {video.timeAgo}
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
                    <Text className="text-[10px] text-gray-500 ml-1 mt-1 font-rubik">
                      {video.views}
                    </Text>
                  </View>
                  <View className="flex-row items-center ml-4">
                    <AntDesign name="sharealt" size={16} color="#98A2B3" />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {video.sheared}
                    </Text>
                  </View>
                  <View className="flex-row items-center ml-6">
                    <Fontisto name="favorite" size={14} color="#98A2B3" />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {video.saved}
                    </Text>
                  </View>
                  <View className="flex-row items-center ml-6">
                    <MaterialIcons
                      name="favorite-border"
                      size={16}
                      color="#98A2B3"
                    />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {video.favorite}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                setModalVisible(modalVisible === modalKey ? null : modalKey)
              }
              className="mr-2"
            >
              <Ionicons name="ellipsis-vertical" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderLiveRecommendation = () => (
    <View className="mt-5">
      <Text className="text-[16px] font-rubik-semibold text-[#344054] mt-4 mb-2 ml-2">
        Live from your favourite speaker
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {favouriteVideos.map((item, index) => (
          <View
            key={`fav-${item.title}-${index}`}
            className="mr-4 w-[150px] flex-col items-center relative"
          >
            <TouchableOpacity
              onPress={item.onPress}
              className="w-full h-[232px] rounded-2xl overflow-hidden relative"
              activeOpacity={0.9}
            >
              <Image
                source={item.imageUrl}
                className="w-full h-full absolute"
                resizeMode="cover"
              />
              <View className="absolute top-2 bg-red-600 px-2 py-0.5 rounded-md z-10 flex flex-row items-center h-[23px] mt-3 ml-5">
                <Image
                  source={require("../../assets/images/Vector.png")}
                  className="h-[10px] w-[10px]"
                  resizeMode="contain"
                />
              </View>
              <View className="absolute bottom-2 left-2 right-2">
                <Text
                  className="text-white text-start text-[17px] mb-6 font-rubik-semibold text-sm"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
            {favModalIndex === index && (
              <View className="absolute mt-[30px] left-1 bg-white shadow-md rounded-lg p-3 z-50 w-36">
                <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                  <Text className="text-[#1D2939] font-rubik ml-2">
                    View Details
                  </Text>
                  <Ionicons name="eye-outline" size={16} color="#3A3E50" />
                </TouchableOpacity>
                <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                  <Text className="text-sm text-[#1D2939] font-rubik ml-2">
                    Share
                  </Text>
                  <AntDesign name="sharealt" size={16} color="#3A3E50" />
                </TouchableOpacity>
                <TouchableOpacity className="py-2 flex-row items-center justify-between">
                  <Text className="text-[#1D2939] font-rubik mr-2">Save</Text>
                  <MaterialIcons name="library-add" size={18} color="#3A3E50" />
                </TouchableOpacity>
              </View>
            )}
            <View className="mt-2 flex flex-col">
              <View className="flex flex-row w-[150px] justify-between">
                <Text className="text-[11px] text-[#1D2939] font-rubik-semibold">
                  {item.speaker}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setFavModalIndex(favModalIndex === index ? null : index)
                  }
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={14}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
              <View className="flex flex-row">
                <View className="flex-row items-center">
                  <Image
                    source={require("../../assets/images/Vector1.png")}
                    className="h-[16px] w-[16px] ml-1"
                    resizeMode="contain"
                  />
                  <Text className="text-[10px] text-gray-500 ml-1 mt-1 font-rubik">
                    {item.views}
                  </Text>
                </View>
                <View className="flex flex-row mt-2 ml-2">
                  <Ionicons name="time-outline" size={13} color="#9CA3AF" />
                  <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                    {item.timeAgo}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView className="flex-1 pb-10">
      <View className="mt-9">
        {videos.map((video, index) => renderVideoCard(video, index, "videos"))}
      </View>
      {renderLiveRecommendation()}
      <View className="mt-9 gap-12">
        {videosA.map((video, index) =>
          renderVideoCard(video, index, "videosA")
        )}
      </View>
      {renderMiniCards(
        "Recommended for Live you",
        recommendedItems,
        rsModalIndex,
        setRsModalIndex
      )}
      <View className="mt-9 gap-12">
        {videosB.map((video, index) =>
          renderVideoCard(video, index, "videosB")
        )}
      </View>
    </ScrollView>
  );
}
