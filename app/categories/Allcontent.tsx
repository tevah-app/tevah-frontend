// import React, { useState,  useCallback  } from "react";
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
// import { BackHandler } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";



// interface RecommendedItem {
//   title: string;
//   fileUrl: any;
//   subTitle: string;
//   views: number;
//   onPress?: () => void;
// }

// interface ExploreItem {
//   title: string;
//   fileUrl: string;
//   subTitle: string;
//   views: number;
//   timeAgo: string;
//   onPress?: () => void;
// }

// // interface VideoCard {
// //   fileUrl: string;
// //   title: string;
// //   speaker: string;
// //   timeAgo: string;
// //   speakerAvatar: any;
// //   favorite: number;
// //   views: number;
// //   saved: number;
// //   sheared: number;

// //   onPress?: () => void;
// // }

// interface VideoCard {
//   fileUrl: ImageSourcePropType | string;
//   title: string;
//   speaker: string;
//   timeAgo: string;
//   speakerAvatar: ImageSourcePropType | string;
//   favorite: number;
//   views: number;
//   saved: number;
//   sheared: number;
// }

// const videos: VideoCard[] = [
//   {
//     fileUrl: require("../../assets/images/bg (1).png"),
//     title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//     speaker: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     speakerAvatar: require("../../assets/images/Avatar-1.png"),
//     views: 500,
//     favorite: 600,
//     saved: 400,
//     sheared: 540,
//   },
// ];

// const videosA: VideoCard[] = [
//   {
//     fileUrl: require("../../assets/images/image (8).png"),
//     title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//     speaker: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     speakerAvatar: require("../../assets/images/Avatar-1.png"),
//     views: 500,
//     favorite: 600,
//     saved: 400,
//     sheared: 540,
//   },
//   {
//     fileUrl: require("../../assets/images/image (9).png"),
//     title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//     speaker: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     speakerAvatar: require("../../assets/images/Avatar-1.png"),
//     views: 500,
//     favorite: 600,
//     saved: 400,
//     sheared: 540,
//   },
//   {
//     fileUrl: require("../../assets/images/image (10).png"),
//     title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//     speaker: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     speakerAvatar: require("../../assets/images/Avatar-1.png"),
//     views: 500,
//     favorite: 600,
//     saved: 400,
//     sheared: 540,
//   },
//   {
//     fileUrl: require("../../assets/images/image (10).png"),
//     title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//     speaker: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     speakerAvatar: require("../../assets/images/Avatar-1.png"),
//     views: 500,
//     favorite: 600,
//     saved: 400,
//     sheared: 540,
//   },
//   {
//     fileUrl: require("../../assets/images/image (10).png"),
//     title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//     speaker: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     speakerAvatar: require("../../assets/images/Avatar-1.png"),
//     views: 500,
//     favorite: 600,
//     saved: 400,
//     sheared: 540,
//   },
// ];

// const videosB: VideoCard[] = [
//   {
//     fileUrl: require("../../assets/images/image (10).png"),
//     title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//     speaker: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     speakerAvatar: require("../../assets/images/Avatar-1.png"),
//     views: 500,
//     favorite: 600,
//     saved: 400,
//     sheared: 540,
//   },
//   {
//     fileUrl: require("../../assets/images/image (10).png"),
//     title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//     speaker: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     speakerAvatar: require("../../assets/images/Avatar-1.png"),
//     views: 500,
//     favorite: 600,
//     saved: 400,
//     sheared: 540,
//   },
//   {
//     fileUrl: require("../../assets/images/image (10).png"),
//     title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//     speaker: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     speakerAvatar: require("../../assets/images/Avatar-1.png"),
//     views: 500,
//     favorite: 600,
//     saved: 400,
//     sheared: 540,
//   },
//   {
//     fileUrl: require("../../assets/images/image (10).png"),
//     title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//     speaker: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     speakerAvatar: require("../../assets/images/Avatar-1.png"),
//     views: 500,
//     favorite: 600,
//     saved: 400,
//     sheared: 540,
//   },
//   {
//     fileUrl: require("../../assets/images/image (10).png"),
//     title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//     speaker: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     speakerAvatar: require("../../assets/images/Avatar-1.png"),
//     views: 500,
//     favorite: 600,
//     saved: 400,
//     sheared: 540,
//   },
// ];

// const recommendedItems: RecommendedItem[] = [
//   {
//     title: "The Beatitudes: The Path to Blessings",
//     fileUrl: require("../../assets/images/image (6).png"),
//     subTitle: "The Gospel of Lord by Andrew Farlay",
//     views: 100,
//     onPress: () => console.log("Viewing The Chosen"),
//   },
//   {
//     title: "The Beatitudes: The Path to Blessings",
//     fileUrl: require("../../assets/images/image (7).png"),
//     subTitle: "The Gospel of Lord by Andrew Farlay",
//     views: 150,
//     onPress: () => console.log("Viewing Overflow Worship"),
//   },
//   {
//     title: "Revival Nights",
//     fileUrl: require("../../assets/images/image (7).png"),
//     subTitle: "The Gospel of Lord by Andrew Farlay",
//     views: 300,
//     onPress: () => console.log("Viewing Revival Nights"),
//   },
// ];

// const exploreItems: ExploreItem[] = [
//   {
//     title: "The elevation Chu",
//     fileUrl: require("../../assets/images/bilble.png"),
//     subTitle: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     views: 100,
//     onPress: () => console.log("Viewing The Chosen"),
//   },
//   {
//     title: "The Beatitudes: The Path to Blessings",
//     fileUrl: require("../../assets/images/bilble.png"),
//     subTitle: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     views: 150,
//     onPress: () => console.log("Viewing Overflow Worship"),
//   },
//   {
//     title: "Revival Nights",
//     fileUrl: require("../../assets/images/bilble.png"),
//     //
//     subTitle: "Minister Joseph Eluwa",
//     timeAgo: "3HRS AGO",
//     views: 300,
//     onPress: () => console.log("Viewing Revival Nights"),
//   },
// ];

// const router = useRouter();
// export default function AllContent() {
//   const [modalVisible, setModalVisible] = useState<string | null>(null);
//   const [pvModalIndex, setPvModalIndex] = useState<number | null>(null);
//   const [exploreModalIndex, setExploreModalIndex] = useState<number | null>(
//     null
//   );

//   const { isLive, ...otherParams } = useLocalSearchParams() as Params & {
//     isLive?: string;
//   };

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => {
//         // Disables the back button
//         return true;
//       };
  
//       // Add the event listener
//       const backHandler = BackHandler.addEventListener(
//         "hardwareBackPress",
//         onBackPress
//       );
      
//       return () => backHandler.remove();
      
//     }, [])
//   );
  

//   const renderExploreCard = (
//     modalIndex: number | null,
//     setModalIndex: React.Dispatch<React.SetStateAction<number | null>>
//   ) => (
//     <View className="mt-5">
//       <Text className="text-[16px] font-rubik-semibold text-[#344054] mt-4 mb-2 ml-2">
//         Explore Categories
//       </Text>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 12 }}
//       >
//         {exploreItems.map((item, index) => (
//           <View
//             key={`explore-${index}`}
//             className="mr-4 w-[150px] flex-col items-center relative"
//           >
//             <TouchableOpacity
//               onPress={item.onPress}
//               className="w-full h-[232px] rounded-2xl overflow-hidden relative"
//               activeOpacity={0.9}
//             >
//               <Image
//                 source={item.fileUrl}
//                 className="w-full h-full absolute"
//                 resizeMode="cover"
//               />
//               <View className="absolute top-2 bg-red-600 px-2 py-0.5 rounded-md z-10 flex flex-row items-center h-[23px] mt-3 ml-5">
//                 <Image
//                   source={require("../../assets/images/Vector.png")}
//                   className="h-[10px] w-[10px]"
//                   resizeMode="contain"
//                 />
//               </View>
//               <View className="absolute bottom-2 left-2 right-2">
//                 <Text
//                   className="text-white text-start text-[17px] mb-6 font-rubik-semibold text-sm"
//                   numberOfLines={2}
//                 >
//                   {item.title}
//                 </Text>
//               </View>
//             </TouchableOpacity>

//             {/* MODAL */}
//             {modalIndex === index && (
//               <View className="absolute mt-[30px] left-1 bg-white shadow-md rounded-lg p-3 z-50 w-36">
//                 <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
//                   <Text className="text-[#1D2939] font-rubik ml-2">
//                     View Details
//                   </Text>
//                   <Ionicons name="eye-outline" size={16} color="#3A3E50" />
//                 </TouchableOpacity>
//                 <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
//                   <Text className="text-sm text-[#1D2939] font-rubik ml-2">
//                     Share
//                   </Text>
//                   <AntDesign name="sharealt" size={16} color="#3A3E50" />
//                 </TouchableOpacity>
//                 <TouchableOpacity className="py-2 flex-row items-center justify-between">
//                   <Text className="text-[#1D2939] font-rubik mr-2">Save</Text>
//                   <MaterialIcons name="library-add" size={18} color="#3A3E50" />
//                 </TouchableOpacity>
//               </View>
//             )}

//             <View className="mt-2 flex flex-col">
//               <View className="flex flex-row w-[150px] justify-between">
//                 <Text
//                   className="text-[11px] text-[#1D2939] font-rubik-semibold"
//                   numberOfLines={1}
//                 >
//                   {item.subTitle}
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() =>
//                     setModalIndex(modalIndex === index ? null : index)
//                   }
//                 >
//                   <Ionicons
//                     name="ellipsis-vertical"
//                     size={14}
//                     color="#9CA3AF"
//                   />
//                 </TouchableOpacity>
//               </View>
//               <View className="flex flex-row">
//                 <View className="flex-row items-center">
//                   <Image
//                     source={require("../../assets/images/Vector1.png")}
//                     className="h-[16px] w-[16px] ml-1"
//                     resizeMode="contain"
//                   />
//                   <Text className="text-[10px] text-gray-500 ml-1 mt-1 font-rubik">
//                     {item.views}
//                   </Text>
//                 </View>
//                 <View className="flex flex-row mt-2 ml-2">
//                   <Ionicons
//                     name="time-outline"
//                     size={13}
//                     color="#9CA3AF"
//                     style={{ marginLeft: 6 }}
//                   />
//                   <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                     {item.timeAgo}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
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
//               fileUrl:
//                 typeof video.fileUrl === "number"
//                   ? Image.resolveAssetSource(video.fileUrl).uri
//                   : video.fileUrl,
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
//             source={video.fileUrl}
//             className="w-full h-full"
//             resizeMode="cover"
//           />

//           {/* ✅ Show LIVE badge if needed */}
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
//               <View className="flex-row items center">
//                 <Text className="ml-1 text-[13px] font-rubik-semibold text-[#344054] mt-1">
//                   {video.speaker}
//                 </Text>
//                 <View className="flex flex-row mt-2 ml-2">
//                   <Ionicons name="time-outline" size={13} color="#9CA3AF" />
//                   <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                     {video.timeAgo}
//                   </Text>
//                 </View>
//               </View>
//               <View className="flex flex-row mt-2">
//                 <View className="flex-row items-center">
//                   <Image
//                     source={require("../../assets/images/Vector1.png")}
//                     className="h-[16px] w-[16px] ml-1"
//                     resizeMode="contain"
//                   />
//                   <Text className="text-[10px] text-gray-500 ml-1 mt-1 font-rubik">
//                     {video.views}
//                   </Text>
//                 </View>
//                 <View className="flex-row items-center ml-4">
//                   <AntDesign name="sharealt" size={16} color="#98A2B3" />
//                   <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                     {video.sheared}
//                   </Text>
//                 </View>
//                 <View className="flex-row items-center ml-6">
//                   <Fontisto name="favorite" size={14} color="#98A2B3" />
//                   <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                     {video.saved}
//                   </Text>
//                 </View>
//                 <View className="flex-row items-center ml-6">
//                   <MaterialIcons
//                     name="favorite-border"
//                     size={16}
//                     color="#98A2B3"
//                   />
//                   <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                     {video.favorite}
//                   </Text>
//                 </View>
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
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <ScrollView className="flex-1 pb-10">
//       <View className="mt-9">
//         {videos.map((video, i) => renderCard(video, true, "videos", i))}
//       </View>

//       {renderMiniCards(
//         "Recommended Live for you",
//         recommendedItems,
//         pvModalIndex,
//         setPvModalIndex
//       )}

//       <View className="mt-9 gap-12">
//         {videosA.map((video, i) => renderCard(video, false, "videosA", i))}
//       </View>

//       {renderExploreCard(exploreModalIndex, setExploreModalIndex)}

//       <View className="mt-9 gap-12">
//         {videosB.map((video, i) => renderCard(video, false, "videosB", i))}
//       </View>
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
//               source={item.fileUrl}
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
//           {modalIndex === index && (
//             <View className="absolute mt-[26px] left-1 bg-white shadow-md rounded-lg p-3 z-50 w-30">
//               <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
//                 <Text className="text-[#1D2939] font-rubik ml-2">
//                   View Details
//                 </Text>
//                 <Ionicons name="eye-outline" size={16} color="#3A3E50" />
//               </TouchableOpacity>
//               <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
//                 <Text className="text-sm text-[#1D2939] font-rubik ml-2">
//                   Share
//                 </Text>
//                 <AntDesign name="sharealt" size={16} color="#3A3E50" />
//               </TouchableOpacity>
//               <TouchableOpacity className="py-2 flex-row items-center justify-between">
//                 <Text className="text-[#1D2939] font-rubik mr-2">
//                   Save to Library
//                 </Text>
//                 <MaterialIcons name="library-add" size={18} color="#3A3E50" />
//               </TouchableOpacity>
//             </View>
//           )}
//           <View className="mt-2 flex flex-col w-full">
//             <View className="flex flex-row justify-between items-center">
//               <Text
//                 className="text-[12px] text-[#1D2939] font-rubik font-medium"
//                 numberOfLines={1}
//               >
//                 {item.subTitle?.split(" ").slice(0, 4).join(" ") + " ..."}
//               </Text>
//               <TouchableOpacity
//                 onPress={() =>
//                   setModalIndex(modalIndex === index ? null : index)
//                 }
//                 className="mr-2"
//               >
//                 <Ionicons name="ellipsis-vertical" size={14} color="#9CA3AF" />
//               </TouchableOpacity>
//             </View>
//             <View className="flex-row items-center">
//               <Image
//                 source={require("../../assets/images/Vector1.png")}
//                 className="h-[16px] w-[16px] ml-1"
//                 resizeMode="contain"
//               />
//               <Text className="text-[10px] text-gray-500 ml-2 mt-1 font-rubik">
//                 {item.views}
//               </Text>
//             </View>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   </View>
// );
























import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler,
  PanResponder,
  Share,
} from "react-native";
import { Video } from "expo-av";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { useMediaStore } from "../store/useUploadStore";
import { useFocusEffect, useRouter } from "expo-router";
import { getPersistedStats, getViewed, persistStats, persistViewed } from "../utils/persistentStorage";

export default function AllContent() {
  const router = useRouter();

  const mediaList = useMediaStore((state) => state.mediaList);
  const allVideos = mediaList.filter((item) => item.contentType === "videos");
  const otherContent = mediaList.filter((item) => item.contentType !== "videos");
  const getContentKey = (item: any) => `${item.contentType}-${item.id}`;
  const [contentStats, setContentStats] = useState<Record<string, any>>({});
  const [previouslyViewed, setPreviouslyViewed] = useState<any[]>([]);



  // Video control state
  const videoRefs = useRef<Record<string, any>>({});
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({});
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState<Record<string, boolean>>({});

  const [hasCompleted, setHasCompleted] = useState<Record<string, boolean>>({});
  const [videoStats, setVideoStats] = useState<Record<string, any>>({});

  const toggleMute = (key: string) =>
    setMutedVideos((prev) => ({ ...prev, [key]: !prev[key] }));

  const togglePlay = (key: string, video: any) => {
    const isPlaying = playingVideos[key] ?? false;

    if (!isPlaying) {
      setPlayingVideos({ [key]: true });
      setShowOverlay((prev) => ({ ...prev, [key]: false }));
    } else {
      setPlayingVideos({ [key]: false });
      setShowOverlay((prev) => ({ ...prev, [key]: true }));
    }

    if (!isPlaying && hasCompleted[key]) {
      videoRefs.current[key]?.setPositionAsync(0);
    }
  };

  const getTimeAgo = (createdAt: string): string => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diff = now.getTime() - posted.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (minutes < 1) return "NOW";
    if (minutes < 60) return `${minutes}MIN AGO`;
    if (hours < 24) return `${hours}HRS AGO`;
    return `${days}DAYS AGO`;
  };

  const handleVideoTap = (key: string) => {
    setPlayingVideos((prev) => ({ ...prev, [key]: false }));
    setShowOverlay((prev) => ({ ...prev, [key]: true }));
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const x = Math.max(0, Math.min(gestureState.moveX - 50, 260));
      const pct = (x / 260) * 100;

      const activeKey = Object.keys(playingVideos).find((k) => playingVideos[k]);
      if (activeKey) {
        const ref = videoRefs.current[activeKey];
        if (ref?.getStatusAsync && ref?.setPositionAsync) {
          ref.getStatusAsync().then((status: { isLoaded: any; durationMillis: number; }) => {
            if (status.isLoaded && status.durationMillis) {
              ref.setPositionAsync((pct / 100) * status.durationMillis);
            }
          });
        }

        setProgresses((prev) => ({ ...prev, [activeKey]: pct }));
      }
    },
  });

  useEffect(() => {
    setShowOverlay((prev) => {
      const updated = { ...prev };
      let hasChanged = false;
  
      allVideos.forEach((v) => {
        const key = `video-${v.id}`;
        if (updated[key] === undefined) {
          updated[key] = true;
          hasChanged = true;
        }
      });
  
      return hasChanged ? updated : prev;
    });
  }, [allVideos]);
  

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => sub.remove();
    }, [])
  );

  useEffect(() => {
    const loadStats = async () => {
      const stats = await getPersistedStats();
      const viewed = await getViewed();
      setContentStats(stats || {});
      setPreviouslyViewed(viewed || []);
    };
    loadStats();
  }, []);
  





 
  
  const handleShare = async (key: string, item: any) => {
    try {
      const result = await Share.share({
        title: item.title,
        message: `Check this out: ${item.title}\n${item.fileUrl}`,
        url: item.fileUrl,
      });
  
      if (result.action === Share.sharedAction) {
        setContentStats((prev) => {
          const updated = {
            ...prev,
            [key]: {
              ...prev[key],
              sheared: (prev[key]?.sheared || item.sheared || 0) + 1,
            },
          };
          persistStats(updated);
          return updated;
        });
      }
    } catch (err) {
      console.warn("❌ Share error:", err);
    }
  };
  
  const handleSave = (key: string, item: any) => {
    setContentStats((prev) => {
      const isSaved = prev[key]?.saved === 1;
      const updated = {
        ...prev,
        [key]: {
          ...prev[key],
          saved: isSaved ? 0 : 1,
        },
      };
      persistStats(updated);
      return updated;
    });
  };
  
  const handleFavorite = (key: string, item: any) => {
    setContentStats((prev) => {
      const isFav = prev[key]?.favorite === 1;
      const updated = {
        ...prev,
        [key]: {
          ...prev[key],
          favorite: isFav ? 0 : 1,
        },
      };
      persistStats(updated);
      return updated;
    });
  };
  


  const incrementView = (key: string, item: any) => {
    const alreadyExists = previouslyViewed.some((v) => v.fileUrl === item.fileUrl);
  
    if (!alreadyExists) {
      const thumbnailUrl = item.fileUrl.replace("/upload/", "/upload/so_1/") + ".jpg";
      const newItem = {
        fileUrl: item.fileUrl,
        imageUrl: { uri: thumbnailUrl },
        title: item.title,
        subTitle: item.speaker || item.description || "Unknown",
        views: contentStats[key]?.views || item.views || 0,
      };
  
      setPreviouslyViewed((prev) => {
        const updated = [newItem, ...prev];
        persistViewed(updated);
        return updated;
      });
    }
  }
  




  const renderVideoCard = (video: any, index: number) => {
    const modalKey = `video-${video.id}`;
    const progress = progresses[modalKey] ?? 0;
    const key = getContentKey(video);
    const stats = contentStats[key] || {};

    return (
      <View key={modalKey} className="flex flex-col mb-10">
        <TouchableWithoutFeedback onPress={() => handleVideoTap(modalKey)}>
          <View className="w-full h-[393px] overflow-hidden relative">
            <Video
              ref={(ref) => (videoRefs.current[modalKey] = ref)}
              source={{ uri: video.fileUrl }}
              style={{ width: "100%", height: "100%", position: "absolute" }}
              resizeMode="cover"
              isMuted={mutedVideos[modalKey] ?? false}
              shouldPlay={playingVideos[modalKey] ?? false}
              useNativeControls={false}
              onPlaybackStatusUpdate={(status) => {
                if (!status.isLoaded) return;
              
                const pct = status.durationMillis
                  ? (status.positionMillis / status.durationMillis) * 100
                  : 0;
                setProgresses((prev) => ({ ...prev, [modalKey]: pct }));
              
                const ref = videoRefs.current[modalKey]; // ✅ Define it here
              
                if (status.didJustFinish) {
                  ref?.setPositionAsync(0);
                  setPlayingVideos((prev) => ({ ...prev, [modalKey]: false }));
                  setHasCompleted((prev) => ({ ...prev, [modalKey]: true }));
                  setShowOverlay((prev) => ({ ...prev, [modalKey]: true }));
                }
              }}
              
            />

            {!playingVideos[modalKey] && showOverlay[modalKey] && (
              <View className="absolute bottom-9 left-3 right-3 px-4 py-2 rounded-md">
                <Text className="text-white font-semibold text-[14px]" numberOfLines={2}>
                  {video.title}
                </Text>
              </View>
            )}

            {!playingVideos[modalKey] && showOverlay[modalKey] && (
              <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2 px-3">
                <TouchableOpacity onPress={() => togglePlay(modalKey, video)}>
                  <Ionicons name="play" size={24} color="#FEA74E" />
                </TouchableOpacity>

                <View className="flex-1 h-1 bg-white/30 rounded-full relative" {...panResponder.panHandlers}>
                  <View className="h-full bg-[#FEA74E] rounded-full" style={{ width: `${progress}%` }} />
                  <View
                    style={{
                      position: "absolute",
                      left: `${progress}%`,
                      transform: [{ translateX: -6 }],
                      top: -5,
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#FEA74E",
                    }}
                  />
                </View>

                <TouchableOpacity onPress={() => toggleMute(modalKey)}>
                  <Ionicons
                    name={mutedVideos[modalKey] ? "volume-mute" : "volume-high"}
                    size={20}
                    color="#FEA74E"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>

        {/* Footer */}
        <View className="flex-row items-center justify-between mt-1 px-3">
          <View className="flex flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center relative ml-1 mt-2">
              <Image
                source={
                  typeof video.speakerAvatar === "string" &&
                  video.speakerAvatar.startsWith("http")
                    ? { uri: video.speakerAvatar.trim() }
                    : video.speakerAvatar
                }
                style={{ width: 30, height: 30, borderRadius: 999 }}
                resizeMode="cover"
              />
            </View>
            <View className="ml-3">
              <View className="flex-row items-center">
                <Text className="ml-1 text-[13px] font-rubik-semibold text-[#344054] mt-1">
                  {video.speaker}
                </Text>
                <View className="flex flex-row mt-2 ml-2">
                  <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                  <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                  {getTimeAgo(video.createdAt)}
                  </Text>
                </View>
              </View>
              <View className="flex-row mt-2">
  <View className="flex-row items-center">
    <Image
      source={require("../../assets/images/Vector1.png")}
      className="h-[20px] w-[20px] ml-1"
      resizeMode="contain"
    />
    <Text className="text-[10px] text-gray-500 ml-1 mt-1 font-rubik">
      {stats.views ?? video.views}
    </Text>
  </View>

  <TouchableOpacity onPress={() => handleShare(key, video)} className="flex-row videos-center ml-4">
    <AntDesign name="sharealt" size={20} color="#98A2B3" />
    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
      {stats.sheared ?? video.sheared}
    </Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => handleSave(key, video)} className="flex-row videos-center ml-9">
    <MaterialIcons
      name={stats.saved === 1 ? "bookmark" : "bookmark-border"}
      size={20}
      color={stats.saved === 1 ? "#FEA74E" : "#98A2B3"}
    />
    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
      {stats.saved === 1 ? (video.saved ?? 0) + 1 : video.saved ?? 0}
    </Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => handleFavorite(key, video)} className="ml-9 flex-row">
    <MaterialIcons
      name={stats.favorite === 1 ? "favorite" : "favorite-border"}
      size={20}
      color={stats.favorite === 1 ? "#FEA74E" : "#98A2B3"}
    />
    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
      {stats.favorite === 1 ? (video.favorite ?? 0) + 1 : video.favorite ?? 0}
    </Text>
  </TouchableOpacity>
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
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* 🔥 Videos Section with Full Layout */}
      {allVideos.length > 0 && (
        <>
          <Text className="text-[18px] font-bold px-4 mt-5 mb-3">🎥 Videos</Text>
          {allVideos.map((video, index) => renderVideoCard(video, index))}
        </>
      )}

      {/* 📚 Other content */}
      {otherContent.length > 0 && (
        <>
          <Text className="text-[18px] font-bold px-4 mt-5 mb-3">📁 Other Content</Text>
          {otherContent.map((item) => (
            <View key={item.id} className="mb-6 px-4">
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/reels/Reelsviewscroll",
                    params: {
                      title: item.title,
                      speaker: item.description,
                      timeAgo: item.timeAgo || new Date(item.createdAt).toLocaleDateString(),
                      imageUrl: item.fileUrl,
                      speakerAvatar: typeof item.speakerAvatar === "string"
                        ? item.speakerAvatar
                        : item.speakerAvatar || require("../../assets/images/Avatar-1.png"),
                    },
                  })
                }
              >
                <Image
                  source={
                    typeof item.imageUrl === "string"
                      ? { uri: item.imageUrl }
                      : item.imageUrl || { uri: item.fileUrl }
                  }
                  className="w-full h-48 rounded-xl mb-2"
                  resizeMode="cover"
                />
                <Text className="text-lg font-semibold">{item.title}</Text>
                <Text className="text-sm text-gray-500">{item.description}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}

      {mediaList.length === 0 && (
        <Text className="text-center text-gray-500 mt-10">No content uploaded yet.</Text>
      )}
    </ScrollView>
  );
}

