import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

interface RecommendedItem {
  title: string;
  imageUrl: any;
  subTitle: string;
  views: number;
  onPress?: () => void;
}

interface ExploreItem {
  title: string;
  imageUrl: string;
  subTitle: string;
  views: number;
  timeAgo: string;
  onPress?: () => void;
}

// interface VideoCard {
//   imageUrl: string;
//   title: string;
//   speaker: string;
//   timeAgo: string;
//   speakerAvatar: any;
//   favorite: number;
//   views: number;
//   saved: number;
//   sheared: number;

//   onPress?: () => void;
// }

interface VideoCard {
  imageUrl: ImageSourcePropType | string;
  title: string;
  speaker: string;
  timeAgo: string;
  speakerAvatar: ImageSourcePropType | string;
  favorite: number;
  views: number;
  saved: number;
  sheared: number;
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

const recommendedItems: RecommendedItem[] = [
  {
    title: "The Beatitudes: The Path to Blessings",
    imageUrl: require("../../assets/images/image (6).png"),
    subTitle: "The Gospel of Lord by Andrew Farlay",
    views: 100,
    onPress: () => console.log("Viewing The Chosen"),
  },
  {
    title: "The Beatitudes: The Path to Blessings",
    imageUrl: require("../../assets/images/image (7).png"),
    subTitle: "The Gospel of Lord by Andrew Farlay",
    views: 150,
    onPress: () => console.log("Viewing Overflow Worship"),
  },
  {
    title: "Revival Nights",
    imageUrl: require("../../assets/images/image (7).png"),
    subTitle: "The Gospel of Lord by Andrew Farlay",
    views: 300,
    onPress: () => console.log("Viewing Revival Nights"),
  },
];

const exploreItems: ExploreItem[] = [
  {
    title: "The elevation Chu",
    imageUrl: require("../../assets/images/bilble.png"),
    subTitle: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    views: 100,
    onPress: () => console.log("Viewing The Chosen"),
  },
  {
    title: "The Beatitudes: The Path to Blessings",
    imageUrl: require("../../assets/images/bilble.png"),
    subTitle: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    views: 150,
    onPress: () => console.log("Viewing Overflow Worship"),
  },
  {
    title: "Revival Nights",
    imageUrl: require("../../assets/images/bilble.png"),
    //
    subTitle: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    views: 300,
    onPress: () => console.log("Viewing Revival Nights"),
  },
];

const router = useRouter();
export default function AllContent() {
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [pvModalIndex, setPvModalIndex] = useState<number | null>(null);
  const [exploreModalIndex, setExploreModalIndex] = useState<number | null>(
    null
  );

  const { isLive, ...otherParams } = useLocalSearchParams() as Params & {
    isLive?: string;
  };

  const renderExploreCard = (
    modalIndex: number | null,
    setModalIndex: React.Dispatch<React.SetStateAction<number | null>>
  ) => (
    <View className="mt-5">
      <Text className="text-[16px] font-rubik-semibold text-[#344054] mt-4 mb-2 ml-2">
        Explore Categories
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {exploreItems.map((item, index) => (
          <View
            key={`explore-${index}`}
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

            {/* MODAL */}
            {modalIndex === index && (
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
                <Text
                  className="text-[11px] text-[#1D2939] font-rubik-semibold"
                  numberOfLines={1}
                >
                  {item.subTitle}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setModalIndex(modalIndex === index ? null : index)
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
                  <Ionicons
                    name="time-outline"
                    size={13}
                    color="#9CA3AF"
                    style={{ marginLeft: 6 }}
                  />
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

  const renderCard = (
    video: VideoCard,
    showLiveBadge = false,
    sectionId: string,
    index: number
  ) => {
    const modalKey = `${sectionId}-${index}`;

    return (
      <TouchableOpacity
        key={modalKey}
        onPress={() =>
          router.push({
            pathname: "/reels/Reelsviewscroll",
            params: {
              title: video.title,
              speaker: video.speaker,
              timeAgo: video.timeAgo,
              views: video.views.toString(),
              favorite: video.favorite.toString(),
              saved: video.saved.toString(),
              sheared: video.sheared.toString(),
              imageUrl:
                typeof video.imageUrl === "number"
                  ? Image.resolveAssetSource(video.imageUrl).uri
                  : video.imageUrl,
              speakerAvatar:
                typeof video.speakerAvatar === "number"
                  ? Image.resolveAssetSource(video.speakerAvatar).uri
                  : video.speakerAvatar,
            },
          })
        }
        className="mr-4 w-full h-[436px]"
        activeOpacity={0.9}
      >
        <View className="w-full h-[393px] overflow-hidden relative">
          <Image
            source={video.imageUrl}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* ✅ Show LIVE badge if needed */}
          {isLive === "true" && (
            <View className="absolute top-10 bg-red-600 px-2 ml-6 rounded-md z-10 flex flex-row items-center h-[23px] mt-4">
              <Text className="text-white text-xs font-bold">LIVE</Text>
              <Image
                source={require("../../assets/images/Vector.png")}
                className="h-[10px] w-[10px] ml-2"
                resizeMode="contain"
              />
            </View>
          )}

          <View className="absolute bottom-3 left-3 right-3 z-10 px-3 py-2 rounded">
            <Text className="text-white text-sm font-rubik" numberOfLines={2}>
              {video.title}
            </Text>
          </View>
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
    );
  };

  return (
    <ScrollView className="flex-1 pb-10">
      <View className="mt-9">
        {videos.map((video, i) => renderCard(video, true, "videos", i))}
      </View>

      {renderMiniCards(
        "Recommended Live for you",
        recommendedItems,
        pvModalIndex,
        setPvModalIndex
      )}

      <View className="mt-9 gap-12">
        {videosA.map((video, i) => renderCard(video, false, "videosA", i))}
      </View>

      {renderExploreCard(exploreModalIndex, setExploreModalIndex)}

      <View className="mt-9 gap-12">
        {videosB.map((video, i) => renderCard(video, false, "videosB", i))}
      </View>
    </ScrollView>
  );
}

const renderMiniCards = (
  title: string,
  items: RecommendedItem[],
  modalIndex: number | null,
  setModalIndex: React.Dispatch<React.SetStateAction<number | null>>
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
          key={`${title}-${index}`}
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
                <Ionicons name="eye-outline" size={16} color="#3A3E50" />
              </TouchableOpacity>
              <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                <Text className="text-sm text-[#1D2939] font-rubik ml-2">
                  Share
                </Text>
                <AntDesign name="sharealt" size={16} color="#3A3E50" />
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
              >
                {item.subTitle?.split(" ").slice(0, 4).join(" ") + " ..."}
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












// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Image,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { useRouter } from "expo-router";

// export default function AllContent() {
//   const router = useRouter();
//   const [media, setMedia] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMedia = async () => {
//       try {
//         const response = await fetch("http://192.168.43.240:4000/api/media");
//         const data = await response.json();
//         setMedia(data.media || []);
//       } catch (error) {
//         console.error("Failed to fetch media", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMedia();
//   }, []);

//   const allMedia = media.filter((item) =>
//     item?.category?.includes?.("all") || item?.contentType === "videos"
//   );

//   return (
//     <ScrollView className="flex-1 p-4">
//       <Text className="text-xl font-bold text-[#344054] mb-4">All Content</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#000" className="mt-10" />
//       ) : allMedia.length === 0 ? (
//         <Text className="text-gray-500 text-center mt-10">No uploads yet.</Text>
//       ) : (
//         allMedia.map((item, index) => (
//           <TouchableOpacity
//             key={item._id || index}
//             onPress={() =>
//               router.push({
//                 pathname: "/reels/Reelsviewscroll",
//                 params: {
//                   title: item.title,
//                   speaker: item.description,
//                   timeAgo: new Date(item.createdAt).toLocaleString(),
//                   views: item.viewCount?.toString() || "0",
//                   favorite: "0",
//                   saved: "0",
//                   sheared: "0",
//                   imageUrl: item.fileUrl,
//                   speakerAvatar: "https://placehold.co/100x100",
//                 },
//               })
//             }
//             className="mb-6"
//           >
//             <Image
//               source={{ uri: item.fileUrl }}
//               className="w-full h-48 rounded-lg mb-2"
//               resizeMode="cover"
//             />
//             <Text className="text-lg font-semibold">{item.title}</Text>
//             <Text className="text-sm text-gray-600">{item.description}</Text>
//             <Text className="text-xs text-gray-400 mt-1">
//               {new Date(item.createdAt).toLocaleDateString()}
//             </Text>
//           </TouchableOpacity>
//         ))
//       )}
//     </ScrollView>
//   );
// }












// import React, { useState } from "react";
// import {
//   View,
//   Image,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   ImageSourcePropType,
// } from "react-native";
// import {
//   Ionicons,
//   AntDesign,
//   MaterialIcons,
//   Fontisto,
// } from "@expo/vector-icons";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useMediaStore } from "../store/useUploadStore"; // ✅ Zustand media store

// interface VideoCard {
//   imageUrl: ImageSourcePropType | string;
//   title: string;
//   speaker: string;
//   timeAgo: string;
//   speakerAvatar: ImageSourcePropType | string;
//   favorite: number;
//   views: number;
//   saved: number;
//   sheared: number;
// }

// interface RecommendedItem {
//   title: string;
//   imageUrl: any;
//   subTitle: string;
//   views: number;
//   onPress?: () => void;
// }

// interface ExploreItem {
//   title: string;
//   imageUrl: string;
//   subTitle: string;
//   views: number;
//   timeAgo: string;
//   onPress?: () => void;
// }

// const recommendedItems: RecommendedItem[] = [
//   {
//     title: "The Beatitudes: The Path to Blessings",
//     imageUrl: require("../../assets/images/image (6).png"),
//     subTitle: "The Gospel of Lord by Andrew Farlay",
//     views: 100,
//   },
// ];

// const exploreItems: ExploreItem[] = [
//   {
//     title: "The elevation Chu",
//     imageUrl: require("../../assets/images/bilble.png"),
//     subTitle: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     views: 100,
//   },
// ];

// const router = useRouter();
// export default function AllContent() {
//   const [modalVisible, setModalVisible] = useState<string | null>(null);
//   const [pvModalIndex, setPvModalIndex] = useState<number | null>(null);
//   const [exploreModalIndex, setExploreModalIndex] = useState<number | null>(null);

//   const { isLive } = useLocalSearchParams() as { isLive?: string };

//   const allMedia = useMediaStore((state) => state.mediaList);
//   const filteredAll = allMedia.filter((item) =>
//     item.category?.some((tag: string) => tag.toLowerCase() === "all")
//   );

//   const renderCard = (
//     video: VideoCard,
//     showLiveBadge = false,
//     sectionId: string,
//     index: number
//   ) => {
//     const modalKey = `${sectionId}-${index}`;
//     return (
//       <TouchableOpacity
//         key={modalKey}
//         onPress={() =>
//           router.push({
//             pathname: "/reels/Reelsviewscroll",
//             params: {
//               title: video.title,
//               speaker: video.speaker,
//               timeAgo: video.timeAgo,
//               views: video.views.toString(),
//               favorite: video.favorite.toString(),
//               saved: video.saved.toString(),
//               sheared: video.sheared.toString(),
//               imageUrl:
//                 typeof video.imageUrl === "number"
//                   ? Image.resolveAssetSource(video.imageUrl).uri
//                   : video.imageUrl,
//               speakerAvatar:
//                 typeof video.speakerAvatar === "number"
//                   ? Image.resolveAssetSource(video.speakerAvatar).uri
//                   : video.speakerAvatar,
//             },
//           })
//         }
//         className="mr-4 w-full h-[436px]"
//         activeOpacity={0.9}
//       >
//         <View className="w-full h-[393px] overflow-hidden relative">
//           <Image
//             source={video.imageUrl}
//             className="w-full h-full"
//             resizeMode="cover"
//           />
//           {isLive === "true" && (
//             <View className="absolute top-10 bg-red-600 px-2 ml-6 rounded-md z-10 flex flex-row items-center h-[23px] mt-4">
//               <Text className="text-white text-xs font-bold">LIVE</Text>
//               <Image
//                 source={require("../../assets/images/Vector.png")}
//                 className="h-[10px] w-[10px] ml-2"
//                 resizeMode="contain"
//               />
//             </View>
//           )}

//           <View className="flex-col">
//           <View className="absolute bottom-3 left-3 right-3 z-10 px-3 py-2 rounded">
//             <Text className="text-white text-sm font-rubik" numberOfLines={2}>
//               {video.title}
//             </Text>
//           </View>
//         </View>
//         <View className="flex-row items-center justify-between mt-1">
//           <View className="flex flex-row items-center">
//             <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center relative ml-1 mt-2">
//               <Image
//                 source={video.speakerAvatar}
//                 style={{
//                   width: 80,
//                   height: 80,
//                   borderRadius: 999,
//                   marginLeft: 26,
//                   marginTop: 15,
//                 }}
//                 resizeMode="cover"
//               />
//             </View>
//             <View className="ml-3">
//               <Text className="ml-1 text-[13px] font-rubik-semibold text-[#344054] mt-1">
//                 {video.speaker}
//               </Text>
//               <View className="flex flex-row mt-2 ml-2">
//                 <Ionicons name="time-outline" size={13} color="#9CA3AF" />
//                 <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                   {video.timeAgo}
//                 </Text>
//               </View>
//             </View>
//           </View>
//           <TouchableOpacity
//             onPress={() =>
//               setModalVisible(modalVisible === modalKey ? null : modalKey)
//             }
//             className="mr-2"
//           >
//             <Ionicons name="ellipsis-vertical" size={18} color="#9CA3AF" />
//           </TouchableOpacity>
//         </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <ScrollView className="flex-1 pb-10">
//       <View className="mt-9">
//         {filteredAll.map((item, index) =>
//           renderCard(
//             {
//               imageUrl: item.uri,
//               title: item.title,
//               speaker: "Uploaded Content",
//               timeAgo: "Just now",
//               speakerAvatar: require("../../assets/images/Avatar-1.png"),
//               views: 0,
//               favorite: 0,
//               saved: 0,
//               sheared: 0,
//             },
//             true,
//             "uploadedAll",
//             index
//           )
//         )}
//       </View>

//       {renderMiniCards(
//         "Recommended Live for you",
//         recommendedItems,
//         pvModalIndex,
//         setPvModalIndex
//       )}

//       {renderExploreCard(exploreModalIndex, setExploreModalIndex)}
//     </ScrollView>
//   );
// }

// const renderMiniCards = (
//   title: string,
//   items: RecommendedItem[],
//   modalIndex: number | null,
//   setModalIndex: React.Dispatch<React.SetStateAction<number | null>>
// ) => (
//   <View className="mt-5">
//     <Text className="text-[16px] font-rubik-semibold text-[#344054] mt-4 mb-2 ml-2">
//       {title}
//     </Text>
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={{ paddingHorizontal: 12 }}
//     >
//       {items.map((item, index) => (
//         <View
//           key={`${title}-${index}`}
//           className="mr-4 w-[154px] flex-col items-center"
//         >
//           <TouchableOpacity
//             onPress={item.onPress}
//             className="w-full h-[232px] rounded-2xl overflow-hidden relative"
//             activeOpacity={0.9}
//           >
//             <Image
//               source={item.imageUrl}
//               className="w-full h-full absolute"
//               resizeMode="cover"
//             />
//             <View className="absolute inset-0 justify-center items-center">
//               <View className="bg-white/70 p-2 rounded-full">
//                 <Ionicons name="play" size={24} color="#6663FD" />
//               </View>
//             </View>
//             <View className="absolute bottom-2 left-2 right-2">
//               <Text
//                 className="text-white text-start text-[14px] ml-1 mb-6 font-rubik"
//                 numberOfLines={2}
//               >
//                 {item.title}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   </View>
// );

// const renderExploreCard = (
//   modalIndex: number | null,
//   setModalIndex: React.Dispatch<React.SetStateAction<number | null>>
// ) => (
//   <View className="mt-5">
//     <Text className="text-[16px] font-rubik-semibold text-[#344054] mt-4 mb-2 ml-2">
//       Explore Categories
//     </Text>
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={{ paddingHorizontal: 12 }}
//     >
//       {exploreItems.map((item, index) => (
//         <View
//           key={`explore-${index}`}
//           className="mr-4 w-[150px] flex-col items-center relative"
//         >
//           <TouchableOpacity
//             onPress={item.onPress}
//             className="w-full h-[232px] rounded-2xl overflow-hidden relative"
//             activeOpacity={0.9}
//           >
//             <Image
//               source={item.imageUrl}
//               className="w-full h-full absolute"
//               resizeMode="cover"
//             />
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   </View>
// );
