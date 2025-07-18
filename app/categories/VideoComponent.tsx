// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Ionicons, AntDesign, MaterialIcons, Fontisto } from "@expo/vector-icons";

// interface VideoCard {
//   fileUrl: any;
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

// interface RecommendedItem {
//   title: string;
//   imageUrl: any;
//   subTitle: string;
//   views: number;
//   onPress?: () => void;
// }

// const Videos: VideoCard[] = [
//     {
//       imageUrl: require("../../assets/images/image (12).png"),
//       title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//       speaker: "Minister Joseph Eluwa",
//       timeAgo: "3HRS AGO",
//       speakerAvatar: require("../../assets/images/Avatar-1.png"),
//       views: 500,
//       favorite: 600,
//       saved: 400,
//       sheared: 540,
//     },
//   ];

//   const videosA: VideoCard[] = [
//     {
//       imageUrl: require("../../assets/images/image (14).png"),
//       title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//       speaker: "Minister Joseph Eluwa",
//       timeAgo: "3HRS AGO",
//       speakerAvatar: require("../../assets/images/Avatar-1.png"),
//       views: 500,
//       favorite: 600,
//       saved: 400,
//       sheared: 540,
//     },
//     {
//       imageUrl: require("../../assets/images/image (15).png"),
//       title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//       speaker: "Minister Joseph Eluwa",
//       timeAgo: "3HRS AGO",
//       speakerAvatar: require("../../assets/images/Avatar-1.png"),
//       views: 500,
//       favorite: 600,
//       saved: 400,
//       sheared: 540,
//     },
//     {
//       imageUrl: require("../../assets/images/image (16).png"),
//       title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//       speaker: "Minister Joseph Eluwa",
//       timeAgo: "3HRS AGO",
//       speakerAvatar: require("../../assets/images/Avatar-1.png"),
//       views: 500,
//       favorite: 600,
//       saved: 400,
//       sheared: 540,
//     },
//     {
//       imageUrl: require("../../assets/images/image (17).png"),
//       title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//       speaker: "Minister Joseph Eluwa",
//       timeAgo: "3HRS AGO",
//       speakerAvatar: require("../../assets/images/Avatar-1.png"),
//       views: 500,
//       favorite: 600,
//       saved: 400,
//       sheared: 540,
//     },
//   ];

//   const videosB: VideoCard[] = [
//     {
//       imageUrl: require("../../assets/images/image (14).png"),
//       title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//       speaker: "Minister Joseph Eluwa",
//       timeAgo: "3HRS AGO",
//       speakerAvatar: require("../../assets/images/Avatar-1.png"),
//       views: 500,
//       favorite: 600,
//       saved: 400,
//       sheared: 540,
//     },
//     {
//       imageUrl: require("../../assets/images/image (15).png"),
//       title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//       speaker: "Minister Joseph Eluwa",
//       timeAgo: "3HRS AGO",
//       speakerAvatar: require("../../assets/images/Avatar-1.png"),
//       views: 500,
//       favorite: 600,
//       saved: 400,
//       sheared: 540,
//     },
//     {
//       imageUrl: require("../../assets/images/image (16).png"),
//       title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//       speaker: "Minister Joseph Eluwa",
//       timeAgo: "3HRS AGO",
//       speakerAvatar: require("../../assets/images/Avatar-1.png"),
//       views: 500,
//       favorite: 600,
//       saved: 400,
//       sheared: 540,
//     },
//     {
//       imageUrl: require("../../assets/images/image (17).png"),
//       title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
//       speaker: "Minister Joseph Eluwa",
//       timeAgo: "3HRS AGO",
//       speakerAvatar: require("../../assets/images/Avatar-1.png"),
//       views: 500,
//       favorite: 600,
//       saved: 400,
//       sheared: 540,
//     },
//   ];

//   const previouslyViewed: RecommendedItem[] = [
//     {
//       title: "The Beatitudes: The Path to Blessings",
//       imageUrl: require("../../assets/images/image12a.png"),
//       subTitle: "The Gospel of Lord by Andrew Farlay",
//       views: 100,
//       onPress: () => console.log("Viewing The Chosen"),
//     },
//     {
//       title: "The Beatitudes: The Path to Blessings",
//       imageUrl: require("../../assets/images/image (13).png"),
//       subTitle: "The Gospel of Lord by Andrew Farlay",
//       views: 150,
//       onPress: () => console.log("Viewing Overflow Worship"),
//     },
//     {
//       title: "Revival Nights",
//       imageUrl: require("../../assets/images/image (13).png"),
//       subTitle: "The Gospel of Lord by Andrew Farlay",
//       views: 300,
//       onPress: () => console.log("Viewing Revival Nights"),
//     },
//   ];
// const recommendedItems: RecommendedItem[] = [
//   {
//     title: "The Beatitudes: The Path to Blessings",
//     imageUrl: require("../../assets/images/image (6).png"),
//     subTitle: "The Gospel of Lord by Andrew Farlay",
//     views: 100,
//     onPress: () => console.log("Viewing The Chosen"),
//   },
//   {
//     title: "The Beatitudes: The Path to Blessings",
//     imageUrl: require("../../assets/images/image (7).png"),
//     subTitle: "The Gospel of Lord by Andrew Farlay",
//     views: 150,
//     onPress: () => console.log("Viewing Overflow Worship"),
//   },
//   {
//     title: "Revival Nights",
//     imageUrl: require("../../assets/images/image (7).png"),
//     subTitle: "The Gospel of Lord by Andrew Farlay",
//     views: 300,
//     onPress: () => console.log("Viewing Revival Nights"),
//   },
// ];

// export default function VideoComponent() {
//   const [isMuted, setIsMuted] = useState(true);
//     const [modalVisible, setModalVisible] = useState<string | null>(null);
//     const [pvModalIndex, setPvModalIndex] = useState<number | null>(null);
//     const [rsModalIndex, setRsModalIndex] = useState<number | null>(null);

//     const renderVideoCard = (
//       video: VideoCard,
//       index: number,
//       sectionId: string,
//       playType: 'progress' | 'center' = 'center'
//     ) => {
//       const modalKey = `${sectionId}-${index}`;
//       return (
//         <View className="flex flex-col">
//           <TouchableOpacity
//             key={modalKey}
//             onPress={video.onPress}
//             className="mr-4 w-full h-[436px]"
//             activeOpacity={0.9}
//           >
//             <View className="w-full h-[393px] overflow-hidden relative">
//   <Image
//     source={video.imageUrl}
//     className="w-full h-full absolute"
//     resizeMode="cover"
//   />

//   {/* Only show title when NOT playType "progress" */}
//   {playType !== "progress" && (
//     <View className="absolute bottom-3 left-3 right-3 z-10  px-3 py-2 rounded">
//       <Text className="text-white text-sm font-rubik" numberOfLines={2}>
//         {video.title}
//       </Text>
//     </View>
//   )}

//   {/* Show progress or play center */}
//   {playType === "progress" ? (
//     <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2">
//       <Ionicons name="play" size={24} color="#FEA74E" />
//       <View className="flex-1 h-1 bg-white/30 rounded-full relative">
//         <View className="h-full bg-[#6663FD] w-1/6 rounded-full" />
//         <View className="absolute top-1/2 -translate-y-1/2 left-[16.66%] w-2 h-2 bg-white rounded-full" />
//       </View>
//       <TouchableOpacity
//         onPress={() => setIsMuted(!isMuted)}
//         className="p-1 rounded-ful"
//       >
//         <Ionicons
//           name={isMuted ? "volume-mute" : "volume-high"}
//           size={20}
//           color="#6663FD"
//         />
//       </TouchableOpacity>
//     </View>
//   ) : (
//     <View className="absolute inset-0 justify-center items-center">
//       <View className="bg-white/70 p-2 rounded-full">
//         <Ionicons name="play" size={24} color="#6663FD" />
//       </View>
//     </View>
//   )}

//             {modalVisible === modalKey && (
//               <View className="absolute mt-[260px] right-4 bg-white shadow-md rounded-lg p-3 z-50 w-44">
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
//                   <Text className="text-[#1D2939] font-rubik ml-2">
//                     Save to Library
//                   </Text>
//                   <MaterialIcons name="library-add" size={18} color="#3A3E50" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>

//             {/* Speaker info and stats */}
//             <View className="flex-row items-center justify-between mt-1">
//               <View className="flex flex-row items-center">
//                 <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center relative ml-1 mt-2">
//                   <Image source={video.speakerAvatar} style={{ width: 80, height: 80, borderRadius: 999, marginLeft: 26, marginTop: 15 }} resizeMode="cover" />
//                 </View>
//                 <View className="ml-3">
//                  <View className="flex-row items center">

//                  <Text className="ml-1 text-[13px] font-rubik-semibold text-[#344054] mt-1">{video.speaker}</Text>
//                   <View className="flex flex-row mt-2 ml-2">
//                     <Ionicons name="time-outline" size={13} color="#9CA3AF" />
//                     <Text className="text-[10px] text-gray-500 ml-1 font-rubik">{video.timeAgo}</Text>
//                   </View>

//                  </View>
//                   <View className="flex flex-row mt-2">
//                     <View className="flex-row items-center">
//                       <Image source={require("../../assets/images/Vector1.png")} className="h-[16px] w-[16px] ml-1" resizeMode="contain" />
//                       <Text className="text-[10px] text-gray-500 ml-1 mt-1 font-rubik">{video.views}</Text>
//                     </View>
//                     <View className="flex-row items-center ml-4">
//                       <AntDesign name="sharealt" size={16} color="#98A2B3" />
//                       <Text className="text-[10px] text-gray-500 ml-1 font-rubik">{video.sheared}</Text>
//                     </View>
//                     <View className="flex-row items-center ml-6">
//                       <Fontisto name="favorite" size={14} color="#98A2B3" />
//                       <Text className="text-[10px] text-gray-500 ml-1 font-rubik">{video.saved}</Text>
//                     </View>
//                     <View className="flex-row items-center ml-6">
//                       <MaterialIcons name="favorite-border" size={16} color="#98A2B3" />
//                       <Text className="text-[10px] text-gray-500 ml-1 font-rubik">{video.favorite}</Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <TouchableOpacity onPress={() => setModalVisible(modalVisible === modalKey ? null : modalKey)} className="mr-2">
//                 <Ionicons name="ellipsis-vertical" size={18} color="#9CA3AF" />
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         </View>
//       );
//     };

//     const renderMiniCards = (title: string, items: typeof recommendedItems, modalIndex: number | null, setModalIndex: any) => (
//       <View className="mt-5">
//         <Text className="text-[16px] font-rubik-semibold text-[#344054] mt-4 mb-2 ml-2">{title}</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
//         {items.map((item, index) => (
//   <View key={`${title}-${item.title}-${index}`} className="mr-4 w-[154px] flex-col items-center">

//               <TouchableOpacity onPress={item.onPress} className="w-full h-[232px] rounded-2xl overflow-hidden relative" activeOpacity={0.9}>
//                 <Image source={item.imageUrl} className="w-full h-full absolute" resizeMode="cover" />
//                 <View className="absolute inset-0 justify-center items-center">
//                   <View className="bg-white/70 p-2 rounded-full">
//                     <Ionicons name="play" size={24} color="#6663FD" />
//                   </View>
//                 </View>
//                 <View className="absolute bottom-2 left-2 right-2">
//                   <Text className="text-white text-start text-[14px] ml-1 mb-6 font-rubik" numberOfLines={2}>{item.title}</Text>
//                 </View>
//               </TouchableOpacity>
//               {modalIndex === index && (
//                 <View className="absolute mt-[26px] left-1 bg-white shadow-md rounded-lg p-3 z-50 w-30">
//                   <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
//                     <Text className="text-[#1D2939] font-rubik ml-2">View Details</Text>
//                     <Ionicons name="eye-outline" size={16} color="##3A3E50" />
//                   </TouchableOpacity>
//                   <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
//                     <Text className="text-sm text-[#1D2939] font-rubik ml-2">Share</Text>
//                     <AntDesign name="sharealt" size={16} color="##3A3E50" />
//                   </TouchableOpacity>
//                   <TouchableOpacity className="py-2 flex-row items-center justify-between">
//                     <Text className="text-[#1D2939] font-rubik mr-2">Save to Library</Text>
//                     <MaterialIcons name="library-add" size={18} color="#3A3E50" />
//                   </TouchableOpacity>
//                 </View>
//               )}
//               <View className="mt-2 flex flex-col w-full">
//                 <View className="flex flex-row justify-between items-center">
//                   <Text className="text-[12px] text-[#1D2939] font-rubik font-medium" numberOfLines={1} ellipsizeMode="tail">
//                     {item.subTitle?.split(" ").slice(0, 4).join(" ") + " ..."}
//                   </Text>
//                   <TouchableOpacity onPress={() => setModalIndex(modalIndex === index ? null : index)} className="mr-2">
//                     <Ionicons name="ellipsis-vertical" size={14} color="#9CA3AF" />
//                   </TouchableOpacity>
//                 </View>
//                 <View className="flex-row items-center">
//                   <Image source={require("../../assets/images/Vector1.png")} className="h-[16px] w-[16px] ml-1" resizeMode="contain" />
//                   <Text className="text-[10px] text-gray-500 ml-2 mt-1 font-rubik">{item.views}</Text>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     );

//     return (
//       <ScrollView className="flex-1">
//         <View className="mt-4">
//           <Text className="text-[#344054] text-[16px] font-rubik-semibold mb-4">Listening</Text>
//           {Videos.map((video, index) => (
//             <View key={`Videos-${video.title}-${index}`}>
//               {renderVideoCard(video, index, "main", "progress")}
//             </View>
//           ))}
//         </View>

//         {renderMiniCards("Previously Viewed", recommendedItems, pvModalIndex, setPvModalIndex)}

//         <View className="mt-9 gap-12">
//           {videosA.map((video, index) => (
//             <View key={`videosA-${video.title}-${index}`}>
//               {renderVideoCard(video, index, "videosA", "center")}
//             </View>
//           ))}
//         </View>

//         {renderMiniCards("Recommended for you", recommendedItems, rsModalIndex, setRsModalIndex)}

//         <View className="mt-9 gap-12">
//           {videosB.map((video, index) => (
//             <View key={`videosB-${video.title}-${index}`}>
//               {renderVideoCard(video, index, "videosB", "center")}
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     );

//   }

// import { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Share,
//   TouchableOpacity,
//   ScrollView,
//   Platform,
//   ToastAndroid,
//   ImageSourcePropType,
// } from "react-native";
// import {
//   Ionicons,
//   AntDesign,
//   Fontisto,
//   MaterialIcons,
// } from "@expo/vector-icons";
// import { Video, AVPlaybackStatus } from "expo-av";
// import { useMediaStore } from "../store/useUploadStore";
// import * as Clipboard from "expo-clipboard";
// import * as Linking from "expo-linking";
// // Optional: for Android toast feedback

// interface VideoCard {
//   fileUrl: string;
//   title: string;
//   speaker: string;
//   timeAgo: string;
//   speakerAvatar: any;
//   favorite: number;
//   views: number;
//   saved: number;
//   sheared: number;
//   imageUrl?: any;
//   onPress?: () => void;
// }

// interface RecommendedItem {
//   fileUrl?: ImageSourcePropType;
//   title: string;
//   imageUrl: any;
//   subTitle: string;
//   views: number;
//   onPress?: () => void;
// }

// const videosA: VideoCard[] = [];
// const videosB: VideoCard[] = [];
// const recommendedItems: RecommendedItem[] = [];
// const previouslyViewed: RecommendedItem[] = [];

// export default function VideoComponent() {
//   const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({});
//   const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [progresses, setProgresses] = useState<Record<string, number>>({});
//   const [modalVisible, setModalVisible] = useState<string | null>(null);
//   const [pvModalIndex, setPvModalIndex] = useState<number | null>(null);
//   const [rsModalIndex, setRsModalIndex] = useState<number | null>(null);
//   const [videoStats, setVideoStats] = useState<
//     Record<string, Partial<VideoCard>>
//   >({});

//   const videoRefs = useRef<Record<string, any>>({});
//   const uploadedVideos = useMediaStore((state) => state.mediaList).filter(
//     (item) => item.type?.toLowerCase() === "videos"
//   );

//   const toggleMute = (key: string) => {
//     setMutedVideos((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const togglePlay = (key: string) => {
//     setPlayingVideos((prev) => ({ ...prev, [key]: !prev[key] }));
//     if (!playingVideos[key]) incrementView(key);
//   };

//   const incrementView = (key: string) => {
//     setVideoStats((prev) => ({
//       ...prev,
//       [key]: {
//         ...prev[key],
//         views: (prev[key]?.views || 0) + 1,
//       },
//     }));
//   };

//   const handleShare = async (key: string, video: VideoCard) => {
//     try {
//       const result = await Share.share({
//         title: video.title,
//         message: `Check out this video: ${video.title}\n${video.fileUrl}`,
//         url: video.fileUrl,
//       });

//       if (result.action === Share.sharedAction) {
//         // Only increment if actually shared
//         setVideoStats((prev) => ({
//           ...prev,
//           [key]: {
//             ...prev[key],
//             sheared: (prev[key]?.sheared || video.sheared || 0) + 1,
//           },
//         }));
//       }
//     } catch (error) {
//       console.warn("❌ Share error:", error);
//     }
//   };

//   const handleSave = (key: string) => {
//     setVideoStats((prev) => {
//       if (prev[key]?.saved) return prev;
//       return {
//         ...prev,
//         [key]: {
//           ...prev[key],
//           saved: (prev[key]?.saved || 0) + 1,
//         },
//       };
//     });
//   };

//   const handleFavorite = (key: string) => {
//     setVideoStats((prev) => {
//       const hasLiked = !!prev[key]?.favorite;
//       return {
//         ...prev,
//         [key]: {
//           ...prev[key],
//           favorite: hasLiked ? 0 : 1,
//         },
//       };
//     });
//   };

//   const getTimeAgo = (createdAt: string): string => {
//     const now = new Date();
//     const posted = new Date(createdAt);
//     const diff = now.getTime() - posted.getTime();
//     const minutes = Math.floor(diff / (1000 * 60));
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     if (minutes < 1) return "NOW";
//     if (minutes < 60) return `${minutes}MIN AGO`;
//     if (hours < 24) return `${hours}HRS AGO`;
//     return `${days}DAYS AGO`;
//   };

//   const renderVideoCard = (
//     video: VideoCard,
//     index: number,
//     sectionId: string,
//     playType: "progress" | "center" = "center"
//   ) => {
//     const modalKey = `${sectionId}-${index}`;
//     const stats = videoStats[modalKey] || {};

//     return (
//       <View key={modalKey} className="flex flex-col mb-10">
//         <View className="w-full h-[393px] overflow-hidden relative">
//           <Video
//             ref={(ref) => {
//               if (ref) videoRefs.current[modalKey] = ref;
//             }}
//             source={{ uri: video.fileUrl }}
//             style={{ width: "100%", height: "100%", position: "absolute" }}
//             resizeMode="cover"
//             isMuted={mutedVideos[modalKey] ?? true}
//             shouldPlay={playingVideos[modalKey] ?? false}
//             useNativeControls={false}
//             onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
//               if (!status.isLoaded) return;
//               const pct = status.durationMillis
//                 ? (status.positionMillis / status.durationMillis) * 100
//                 : 0;
//               setProgresses((prev) => ({ ...prev, [modalKey]: pct }));
//               if (status.didJustFinish) {
//                 videoRefs.current[modalKey]?.setPositionAsync(0);
//                 setPlayingVideos((prev) => ({ ...prev, [modalKey]: false }));
//               }
//             }}
//           />
//           <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2 px-3">
//             <TouchableOpacity onPress={() => togglePlay(modalKey)}>
//               <Ionicons
//                 name={playingVideos[modalKey] ? "pause" : "play"}
//                 size={24}
//                 color="#FEA74E"
//               />
//             </TouchableOpacity>
//             <View className="flex-1 h-1 bg-white/30 rounded-full relative overflow-hidden">
//               <View
//                 className="h-full bg-[#FEA74E] rounded-full"
//                 style={{ width: `${progresses[modalKey] ?? 0}%` }}
//               />
//             </View>
//             <TouchableOpacity onPress={() => toggleMute(modalKey)}>
//               <Ionicons
//                 name={mutedVideos[modalKey] ? "volume-mute" : "volume-high"}
//                 size={20}
//                 color="#FEA74E"
//               />
//             </TouchableOpacity>
//           </View>

//           {modalVisible === modalKey && (
//             <View className="absolute top-28 right-4 bg-white shadow-md rounded-lg p-3 z-50 w-44">
//               {/* View Details */}
//               <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
//                 <Text className="text-[#1D2939] font-rubik ml-2">
//                   View Details
//                 </Text>
//                 <Ionicons name="eye-outline" size={16} color="#3A3E50" />
//               </TouchableOpacity>

//               {/* Share */}
//               <TouchableOpacity
//                 onPress={() => handleShare(modalKey, video)}
//                 className="py-2 border-b border-gray-200 flex-row items-center justify-between"
//               >
//                 <Text className="text-[#1D2939] font-rubik ml-2">Share</Text>
//                 <AntDesign name="sharealt" size={16} color="#3A3E50" />
//               </TouchableOpacity>

//               {/* Save to Library */}
//               <TouchableOpacity
//                 onPress={() => handleSave(modalKey)}
//                 className="py-2 flex-row items-center justify-between"
//               >
//                 <Text className="text-[#1D2939] font-rubik ml-2">
//                   Save to Library
//                 </Text>
//                 <MaterialIcons name="library-add" size={16} color="#3A3E50" />
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* Footer Section with Speaker & Interactive Icons */}
//         <View className="flex-row items-center justify-between mt-1 px-3">
//           <View className="flex flex-row items-center">
//             <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center relative ml-1 mt-2">
//               <Image
//                 source={
//                   typeof video.speakerAvatar === "string"
//                     ? { uri: video.speakerAvatar }
//                     : video.speakerAvatar
//                 }
//                 style={{
//                   width: 30,
//                   height: 30,
//                   borderRadius: 999,
//                 }}
//                 resizeMode="cover"
//               />
//             </View>
//             <View className="ml-3">
//               <View className="flex-row items-center">
//                 <Text className="ml-1 text-[13px] font-rubik-semibold text-[#344054] mt-1">
//                   {video.speaker}
//                 </Text>
//                 <View className="flex flex-row mt-2 ml-2">
//                   <Ionicons name="time-outline" size={14} color="#9CA3AF" />
//                   <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                     {video.timeAgo}
//                   </Text>
//                 </View>
//               </View>
//               <View className="flex flex-row mt-2">
//                 {/* Views */}
//                 <View className="flex-row items-center">
//                   <Image
//                     source={require("../../assets/images/Vector1.png")}
//                     className="h-[20px] w-[20px] ml-1"
//                     resizeMode="contain"
//                   />
//                   <Text className="text-[10px] text-gray-500 ml-1 mt-1 font-rubik">
//                     {stats.views ?? video.views}
//                   </Text>
//                 </View>

//                 {/* Share */}
//                 <TouchableOpacity
//                   onPress={() => handleShare(modalKey, video)}
//                   className="flex-row items-center ml-4"
//                 >
//                   <AntDesign name="sharealt" size={20} color="#98A2B3" />
//                   <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                     {stats.sheared ?? video.sheared}
//                   </Text>
//                 </TouchableOpacity>

//                 {/* Save */}
//                 <TouchableOpacity
//                   onPress={() => {
//                     if (!stats.saved) handleSave(modalKey);
//                   }}
//                   className="flex-row items-center ml-6"
//                   disabled={!!stats.saved}
//                 >
//                   <Fontisto name="favorite" size={20} color="#98A2B3" />
//                   <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                     {stats.saved ?? video.saved}
//                   </Text>
//                 </TouchableOpacity>

//                 {/* Like (Favorite) */}
//                 <TouchableOpacity
//                   onPress={() => handleFavorite(modalKey)}
//                   className="flex-row items-center ml-6"
//                 >
//                   <MaterialIcons
//                     name={stats.favorite ? "favorite" : "favorite-border"}
//                     size={20}
//                     color={stats.favorite ? "#FEA74E" : "#98A2B3"}
//                   />
//                   <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                     {stats.favorite ?? video.favorite}
//                   </Text>
//                 </TouchableOpacity>
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
//       </View>
//     );
//   };

//   const renderMiniCards = (
//     title: string,
//     items: RecommendedItem[],
//     modalIndex: number | null,
//     setModalIndex: (val: number | null) => void
//   ) => (
//     <View className="mt-6">
//       <Text className="text-[16px] font-rubik-semibold text-[#344054] mb-2 ml-2">
//         {title}
//       </Text>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 12 }}
//       >
//         {items.map((item, index) => (
//           <View
//             key={`${title}-${item.title}-${index}`}
//             className="mr-4 w-[154px] flex-col items-center"
//           >
//             <TouchableOpacity
//               onPress={item.onPress}
//               className="w-full h-[232px] rounded-2xl overflow-hidden relative"
//               activeOpacity={0.9}
//             >
//               <Image
//                 source={item.imageUrl}
//                 className="w-full h-full absolute"
//                 resizeMode="cover"
//               />
//               <View className="absolute inset-0 justify-center items-center">
//                 <View className="bg-white/70 p-2 rounded-full">
//                   <Ionicons name="play" size={24} color="#FEA74E" />
//                 </View>
//               </View>
//               <View className="absolute bottom-2 left-2 right-2">
//                 <Text
//                   className="text-white text-start text-[14px] ml-1 mb-6 font-rubik"
//                   numberOfLines={2}
//                 >
//                   {item.title}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );

//   return (
//     <ScrollView className="flex-1 px-3">
//       <Text className="text-[#344054] text-[16px] font-rubik-semibold my-4">
//         Watching
//       </Text>

//       {uploadedVideos.map((item, index) =>
//         renderVideoCard(
//           {
//             fileUrl: item.fileUrl,
//             title: item.title,
//             speaker: item.speaker || "Unknown",
//             timeAgo: getTimeAgo(item.createdAt),
//             speakerAvatar:
//               item.speakerAvatar || require("../../assets/images/Avatar-1.png"),
//             views: item.viewCount || 0,
//             favorite: item.favorite || 0,
//             saved: item.saved || 0,
//             sheared: item.sheared || 0,
//           },
//           index,
//           "uploaded",
//           "progress"
//         )
//       )}

//       {renderMiniCards(
//         "Previously Viewed",
//         previouslyViewed,
//         pvModalIndex,
//         setPvModalIndex
//       )}
//       {renderMiniCards(
//         "Recommended for you",
//         recommendedItems,
//         rsModalIndex,
//         setRsModalIndex
//       )}

//       {videosA.length > 0 && (
//         <View className="mt-9">
//           {videosA.map((video, index) =>
//             renderVideoCard(video, index, "videosA", "center")
//           )}
//         </View>
//       )}

//       {videosB.length > 0 && (
//         <View className="mt-9">
//           {videosB.map((video, index) =>
//             renderVideoCard(video, index, "videosB", "center")
//           )}
//         </View>
//       )}
//     </ScrollView>
//   );
// }

import { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Share,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import { Video, AVPlaybackStatus } from "expo-av";
import { useMediaStore } from "../store/useUploadStore";

interface VideoCard {
  fileUrl: string;
  title: string;
  speaker: string;
  timeAgo: string;
  speakerAvatar: any;
  favorite: number;
  views: number;
  saved: number;
  sheared: number;
  imageUrl?: any;
  onPress?: () => void;
}

interface RecommendedItem {
  fileUrl: string; // ✅ this is the video URL
  imageUrl: ImageSourcePropType; // ✅ this is the thumbnail image
  title: string;
  subTitle: string;
  views: number;
  onPress?: () => void;
}

const videosA: VideoCard[] = [];
const videosB: VideoCard[] = [];
const recommendedItems: RecommendedItem[] = [];

export default function VideoComponent() {
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({});
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>(
    {}
  );
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [pvModalIndex, setPvModalIndex] = useState<number | null>(null);
  const [rsModalIndex, setRsModalIndex] = useState<number | null>(null);
  const [videoStats, setVideoStats] = useState<
    Record<string, Partial<VideoCard>>
  >({});
  const [previouslyViewedState, setPreviouslyViewedState] = useState<
    RecommendedItem[]
  >([]);

  const videoRefs = useRef<Record<string, any>>({});
  const uploadedVideos = useMediaStore((state) => state.mediaList).filter(
    (item) => item.type?.toLowerCase() === "videos"
  );

  const toggleMute = (key: string) => {
    setMutedVideos((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const togglePlay = (key: string) => {
    const isCurrentlyPlaying = playingVideos[key];

    // If starting to play...
    if (!isCurrentlyPlaying) {
      const alreadyPlayed = hasPlayed[key];
      const completedBefore = hasCompleted[key];

      // Only increment if first time or replay after completion
      if (!alreadyPlayed || completedBefore) {
        incrementView(key);
        setHasPlayed((prev) => ({ ...prev, [key]: true }));
        setHasCompleted((prev) => ({ ...prev, [key]: false }));
      }

      // Automatically unmute if it's the first time playing
      if (mutedVideos[key]) {
        setMutedVideos((prev) => ({ ...prev, [key]: false }));
      }
    }

    setPlayingVideos((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [hasPlayed, setHasPlayed] = useState<Record<string, boolean>>({});
  const [hasCompleted, setHasCompleted] = useState<Record<string, boolean>>({});

  const incrementView = (key: string) => {
    const videoIndex = parseInt(key.split("-")[1]);
    const video = uploadedVideos[videoIndex];
    if (!video) return;

    setVideoStats((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        views: (prev[key]?.views || 0) + 1,
      },
    }));

    const alreadyExists = previouslyViewedState.some(
      (item) => item.title === video.title && item.fileUrl === video.fileUrl
    );
    if (!alreadyExists) {
      // Generate thumbnail from Cloudinary video
      const fileUrl = video.fileUrl;
      const thumbnailUrl = fileUrl.replace("/upload/", "/upload/so_1/") + ".jpg";
    
      const newItem: RecommendedItem = {
        fileUrl: video.fileUrl, // video
        imageUrl: { uri: thumbnailUrl }, // auto-generated thumbnail from Cloudinary
        title: video.title,
        subTitle: video.speaker || "Unknown",
        views: video.viewCount || 0,
      };
    
      setPreviouslyViewedState((prev) => [newItem, ...prev]);
    }
    
  };

  const handleShare = async (key: string, video: VideoCard) => {
    try {
      const result = await Share.share({
        title: video.title,
        message: `Check out this video: ${video.title}\n${video.fileUrl}`,
        url: video.fileUrl,
      });

      if (result.action === Share.sharedAction) {
        setVideoStats((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            sheared: (prev[key]?.sheared || video.sheared || 0) + 1,
          },
        }));
      }
    } catch (error) {
      console.warn("❌ Share error:", error);
    }
  };

  const handleSave = (key: string) => {
    setVideoStats((prev) => {
      if (prev[key]?.saved) return prev;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          saved: (prev[key]?.saved || 0) + 1,
        },
      };
    });
  };

  const handleFavorite = (key: string) => {
    setVideoStats((prev) => {
      const hasLiked = !!prev[key]?.favorite;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          favorite: hasLiked ? 0 : 1,
        },
      };
    });
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

  const renderVideoCard = (
    video: VideoCard,
    index: number,
    sectionId: string,
    playType: "progress" | "center" = "center"
  ) => {
    const modalKey = `${sectionId}-${index}`;
    const stats = videoStats[modalKey] || {};

    return (
      <View key={modalKey} className="flex flex-col mb-10">
        {/* PLACE EXISTING Video RENDER UI HERE (shortened to save space) */}
        {/* Video player, controls, icons, etc. */}
        <View key={modalKey} className="flex flex-col mb-10">
          <View className="w-full h-[393px] overflow-hidden relative">
            <Video
              ref={(ref) => {
                if (ref) videoRefs.current[modalKey] = ref;
              }}
              source={{ uri: video.fileUrl }}
              style={{ width: "100%", height: "100%", position: "absolute" }}
              resizeMode="cover"
              isMuted={mutedVideos[modalKey] ?? false}
              shouldPlay={playingVideos[modalKey] ?? false}
              useNativeControls={false}
              onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                if (!status.isLoaded) return;

                const pct = status.durationMillis
                  ? (status.positionMillis / status.durationMillis) * 100
                  : 0;
                setProgresses((prev) => ({ ...prev, [modalKey]: pct }));

                if (status.didJustFinish) {
                  videoRefs.current[modalKey]?.setPositionAsync(0);
                  setPlayingVideos((prev) => ({ ...prev, [modalKey]: false }));
                  setHasCompleted((prev) => ({ ...prev, [modalKey]: true }));
                }
              }}
            />
            <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2 px-3">
              <TouchableOpacity onPress={() => togglePlay(modalKey)}>
                <Ionicons
                  name={playingVideos[modalKey] ? "pause" : "play"}
                  size={24}
                  color="#FEA74E"
                />
              </TouchableOpacity>
              <View className="flex-1 h-1 bg-white/30 rounded-full relative overflow-hidden">
                <View
                  className="h-full bg-[#FEA74E] rounded-full"
                  style={{ width: `${progresses[modalKey] ?? 0}%` }}
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

            {modalVisible === modalKey && (
              <View className="absolute top-28 right-4 bg-white shadow-md rounded-lg p-3 z-50 w-44">
                {/* View Details */}
                <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                  <Text className="text-[#1D2939] font-rubik ml-2">
                    View Details
                  </Text>
                  <Ionicons name="eye-outline" size={16} color="#3A3E50" />
                </TouchableOpacity>

                {/* Share */}
                <TouchableOpacity
                  onPress={() => handleShare(modalKey, video)}
                  className="py-2 border-b border-gray-200 flex-row items-center justify-between"
                >
                  <Text className="text-[#1D2939] font-rubik ml-2">Share</Text>
                  <AntDesign name="sharealt" size={16} color="#3A3E50" />
                </TouchableOpacity>

                {/* Save to Library */}
                <TouchableOpacity
                  onPress={() => handleSave(modalKey)}
                  className="py-2 flex-row items-center justify-between"
                >
                  <Text className="text-[#1D2939] font-rubik ml-2">
                    Save to Library
                  </Text>
                  <MaterialIcons name="library-add" size={16} color="#3A3E50" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Footer Section with Speaker & Interactive Icons */}
          <View className="flex-row items-center justify-between mt-1 px-3">
            <View className="flex flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center relative ml-1 mt-2">
                <Image
                  source={
                    typeof video.speakerAvatar === "string"
                      ? { uri: video.speakerAvatar }
                      : video.speakerAvatar
                  }
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                  }}
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
                      {video.timeAgo}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row mt-2">
                  {/* Views */}
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

                  {/* Share */}
                  <TouchableOpacity
                    onPress={() => handleShare(modalKey, video)}
                    className="flex-row items-center ml-4"
                  >
                    <AntDesign name="sharealt" size={20} color="#98A2B3" />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {stats.sheared ?? video.sheared}
                    </Text>
                  </TouchableOpacity>

                  {/* Save */}
                  <TouchableOpacity
                    onPress={() => {
                      if (!stats.saved) handleSave(modalKey);
                    }}
                    className="flex-row items-center ml-6"
                    disabled={!!stats.saved}
                  >
                    <Fontisto name="favorite" size={20} color="#98A2B3" />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {stats.saved ?? video.saved}
                    </Text>
                  </TouchableOpacity>

                  {/* Like (Favorite) */}
                  <TouchableOpacity
                    onPress={() => handleFavorite(modalKey)}
                    className="flex-row items-center ml-6"
                  >
                    <MaterialIcons
                      name={stats.favorite ? "favorite" : "favorite-border"}
                      size={20}
                      color={stats.favorite ? "#FEA74E" : "#98A2B3"}
                    />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {stats.favorite ?? video.favorite}
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
      </View>
    );
  };

  const renderMiniCards = (
    title: string,
    items: RecommendedItem[],
    modalIndex: number | null,
    setModalIndex: (val: number | null) => void
  ) => (
    <View className="mt-6">
      <Text className="text-[16px] font-rubik-semibold text-[#344054] mb-2 ml-2">
        {title}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {items.map((item, index) => (
          <View
            key={`${title}-${item.title}-${index}`}
            className="mr-4 w-[154px] flex-col items-center"
          >
            <TouchableOpacity
              onPress={item.onPress}
              className="w-full h-[232px] rounded-2xl overflow-hidden relative"
              activeOpacity={0.9}
            >
             <Video
  source={{ uri: item.fileUrl }}
  style={{ width: "100%", height: "100%", position: "absolute" }}
  resizeMode="cover"
  isMuted
  shouldPlay={false}
  useNativeControls={false}
/>

              <View className="absolute inset-0 justify-center items-center">
                <View className="bg-white/70 p-2 rounded-full">
                  <Ionicons name="play" size={24} color="#FEA74E" />
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
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView className="flex-1 px-3">
      <Text className="text-[#344054] text-[16px] font-rubik-semibold my-4">
        Watching
      </Text>

      {uploadedVideos.map((item, index) =>
        renderVideoCard(
          {
            fileUrl: item.fileUrl,
            title: item.title,
            speaker: item.speaker || "Unknown",
            timeAgo: getTimeAgo(item.createdAt),
            speakerAvatar:
              item.speakerAvatar || require("../../assets/images/Avatar-1.png"),
            views: item.viewCount || 0,
            favorite: item.favorite || 0,
            saved: item.saved || 0,
            sheared: item.sheared || 0,
          },
          index,
          "uploaded",
          "progress"
        )
      )}

      {renderMiniCards(
        "Previously Viewed",
        previouslyViewedState,
        pvModalIndex,
        setPvModalIndex
      )}

      {renderMiniCards(
        "Recommended for you",
        recommendedItems,
        rsModalIndex,
        setRsModalIndex
      )}

      {videosA.length > 0 && (
        <View className="mt-9">
          {videosA.map((video, index) =>
            renderVideoCard(video, index, "videosA", "center")
          )}
        </View>
      )}

      {videosB.length > 0 && (
        <View className="mt-9">
          {videosB.map((video, index) =>
            renderVideoCard(video, index, "videosB", "center")
          )}
        </View>
      )}
    </ScrollView>
  );
}
