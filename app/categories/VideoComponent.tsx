// import { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   Share,
//   TouchableOpacity,
//   ScrollView,
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
// import {
//   PanResponder,
//   GestureResponderEvent,
//   PanResponderGestureState,
// } from "react-native";
// import React from "react";
// import { TouchableWithoutFeedback } from "react-native";
// import {
//   getPersistedStats,
//   persistStats,
//   getViewed,
//   persistViewed,
// } from "../utils/persistentStorage";

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
//   fileUrl: string; // ✅ this is the video URL
//   imageUrl: ImageSourcePropType; // ✅ this is the thumbnail image
//   title: string;
//   subTitle: string;
//   views: number;
//   onPress?: () => void;
// }

// const videosA: VideoCard[] = [];
// const videosB: VideoCard[] = [];
// const recommendedItems: RecommendedItem[] = [];

// export default function VideoComponent() {
//   const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({});
//   const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>(
//     {}
//   );
//   const getVideoKey = (fileUrl: string): string => `video-${fileUrl}`;

//   const [progresses, setProgresses] = useState<Record<string, number>>({});
//   const [modalVisible, setModalVisible] = useState<string | null>(null);
//   const [pvModalIndex, setPvModalIndex] = useState<number | null>(null);
//   const [rsModalIndex, setRsModalIndex] = useState<number | null>(null);
//   const [showOverlay, setShowOverlay] = useState<Record<string, boolean>>({});
//   const [showOverlayMini, setShowOverlayMini] = useState<
//     Record<string, boolean>
//   >({});

//   const [miniCardViews, setMiniCardViews] = useState<Record<string, number>>(
//     {}
//   );
//   const [miniCardPlaying, setMiniCardPlaying] = useState<
//     Record<string, boolean>
//   >({});
//   const [miniCardHasPlayed, setMiniCardHasPlayed] = useState<
//     Record<string, boolean>
//   >({});
//   const [miniCardHasCompleted, setMiniCardHasCompleted] = useState<
//     Record<string, boolean>
//   >({});

//   const miniCardRefs = useRef<Record<string, any>>({});

//   const [videoStats, setVideoStats] = useState<
//     Record<string, Partial<VideoCard>>
//   >({});
//   const [previouslyViewedState, setPreviouslyViewedState] = useState<
//     RecommendedItem[]
//   >([]);

//   const videoRefs = useRef<Record<string, any>>({});
//   const uploadedVideos = useMediaStore((state) => state.mediaList).filter(
//     (item) => item.type?.toLowerCase() === "videos"
//   );

//   const toggleMute = (key: string) => {
//     setMutedVideos((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   // const handleMiniCardPlay = (
//   //   key: string,
//   //   item: RecommendedItem,
//   //   setViewsState: (val: Record<string, number>) => void,
//   //   setPlayingState: (val: Record<string, boolean>) => void,
//   //   setHasPlayed: (val: Record<string, boolean>) => void,
//   //   setHasCompleted: (val: Record<string, boolean>) => void
//   // ) => {
//   //   // Pause all other videos and show overlay
//   //   Object.keys(miniCardPlaying).forEach((k) => {
//   //     setPlayingVideos((prev) => ({ ...prev, [k]: false }));
//   //     setShowOverlayMini((prev) => ({ ...prev, [k]: true }));
//   //   });

//   //   const isPlaying = miniCardPlaying[key] ?? false;
//   //   const wasCompleted = miniCardHasCompleted[key] ?? false;

//   //   if (!isPlaying) {
//   //     if (wasCompleted && miniCardRefs.current[key]) {
//   //       miniCardRefs.current[key].setPositionAsync(0);
//   //     }

//   //     setViewsState((prev) => ({
//   //       ...prev,
//   //       [key]: (prev[key] ?? item.views) + 1,
//   //     }));

//   //     setHasPlayed((prev) => ({ ...prev, [key]: true }));
//   //     setHasCompleted((prev) => ({ ...prev, [key]: false }));

//   //     setPlayingState({ [key]: true });
//   //     setPlayingVideos((prev) => ({ ...prev, [key]: true }));
//   //     setShowOverlayMini((prev) => ({ ...prev, [key]: false }));
//   //   } else {
//   //     // pause and show icon
//   //     setPlayingState({ [key]: false });
//   //     setShowOverlayMini((prev) => ({ ...prev, [key]: true }));
//   //   }
//   // };

//   //   const togglePlay = (key: string, video?: VideoCard) => {
//   //     const isCurrentlyPlaying = playingVideos[key];

//   //     const newPlayingState: Record<string, boolean> = {};

//   //     Object.keys(playingVideos).forEach((k) => {
//   //       newPlayingState[k] = false;
//   //       setShowOverlay((prev) => ({ ...prev, [k]: true })); // 👈 force icon visible
//   //     });

//   //     const shouldStartPlaying = !isCurrentlyPlaying;

//   //     if (shouldStartPlaying) {
//   //       const alreadyPlayed = hasPlayed[key];
//   //       const completedBefore = hasCompleted[key];

//   //       if ((!alreadyPlayed || completedBefore) && video) {
//   //         incrementView(key, video);
//   //         setHasPlayed((prev) => ({ ...prev, [key]: true }));
//   //         setHasCompleted((prev) => ({ ...prev, [key]: false }));
//   //       }

//   //       if (mutedVideos[key]) {
//   //         setMutedVideos((prev) => ({ ...prev, [key]: false }));
//   //       }

//   //       newPlayingState[key] = true;
//   //     }

//   //     // ✅ stop mini cards too
//   //     setMiniCardPlaying({});
//   //     setPlayingVideos(newPlayingState);

//   //     setPlayingVideos(newPlayingState);
//   // setShowOverlay((prev) => ({
//   //   ...prev,
//   //   [key]: false,
//   // }));
//   //   };

//   useEffect(() => {
//     const loadPersistedData = async () => {
//       const stats = await getPersistedStats();
//       const viewed = await getViewed();

//       setVideoStats(stats);
//       setPreviouslyViewedState(viewed);

//       // Optional: Restore miniCardViews (just views count from stats)
//       const miniViews: Record<string, number> = {};
//       Object.keys(stats).forEach((key) => {
//         if (typeof stats[key]?.views === "number") {
//           miniViews[key] = stats[key].views;
//         }
//       });
//       setMiniCardViews(miniViews);
//     };

//     loadPersistedData();
//   }, []);

//   const handleMiniCardPlay = (
//     key: string,
//     item: RecommendedItem,
//     setViewsState: (val: Record<string, number>) => void,
//     setPlayingState: (val: Record<string, boolean>) => void,
//     setHasPlayed: (val: Record<string, boolean>) => void,
//     setHasCompleted: (val: Record<string, boolean>) => void
//   ) => {
//     // Stop all full video plays
//     Object.keys(playingVideos).forEach((k) => {
//       setPlayingVideos((prev) => ({ ...prev, [k]: false }));
//       setShowOverlay((prev) => ({ ...prev, [k]: true }));
//     });

//     // Stop all mini card plays
//     Object.keys(miniCardPlaying).forEach((k) => {
//       setMiniCardPlaying((prev) => ({ ...prev, [k]: false }));
//       setShowOverlayMini((prev) => ({ ...prev, [k]: true }));
//     });

//     const isPlaying = miniCardPlaying[key] ?? false;
//     const wasCompleted = miniCardHasCompleted[key] ?? false;

//     if (!isPlaying) {
//       if (wasCompleted && miniCardRefs.current[key]) {
//         miniCardRefs.current[key].setPositionAsync(0);
//       }

//       setViewsState((prev: { [x: string]: any }) => ({
//         ...prev,
//         [key]: (prev[key] ?? item.views) + 1,
//       }));

//       setHasPlayed((prev: any) => ({ ...prev, [key]: true }));
//       setHasCompleted((prev) => ({ ...prev, [key]: false }));

//       setPlayingState({ [key]: true });
//       setMiniCardPlaying({ [key]: true });

//       setShowOverlayMini((prev) => ({ ...prev, [key]: false }));
//     } else {
//       setPlayingState({ [key]: false });
//       setMiniCardPlaying({ [key]: false });

//       setShowOverlayMini((prev) => ({ ...prev, [key]: true }));
//     }
//   };

//   const togglePlay = (key: string, video?: VideoCard) => {
//     const isCurrentlyPlaying = playingVideos[key];

//     const newPlayingState: Record<string, boolean> = {};

//     // Pause all full videos
//     Object.keys(playingVideos).forEach((k) => {
//       newPlayingState[k] = false;
//       setShowOverlay((prev) => ({ ...prev, [k]: true }));
//     });

//     // ✅ Pause all mini cards too
//     Object.keys(miniCardPlaying).forEach((k) => {
//       setMiniCardPlaying((prev) => ({ ...prev, [k]: false }));
//       setShowOverlayMini((prev) => ({ ...prev, [k]: true }));
//     });

//     const shouldStartPlaying = !isCurrentlyPlaying;

//     if (shouldStartPlaying) {
//       const alreadyPlayed = hasPlayed[key];
//       const completedBefore = hasCompleted[key];

//       if ((!alreadyPlayed || completedBefore) && video) {
//         incrementView(key, video);
//         setHasPlayed((prev) => ({ ...prev, [key]: true }));
//         setHasCompleted((prev) => ({ ...prev, [key]: false }));
//       }

//       if (mutedVideos[key]) {
//         setMutedVideos((prev) => ({ ...prev, [key]: false }));
//       }

//       newPlayingState[key] = true;
//     }

//     setPlayingVideos(newPlayingState);
//     setShowOverlay((prev) => ({
//       ...prev,
//       [key]: !shouldStartPlaying ? true : false,
//     }));
//   };

//   const [hasPlayed, setHasPlayed] = useState<Record<string, boolean>>({});
//   const [hasCompleted, setHasCompleted] = useState<Record<string, boolean>>({});

//   const incrementView = (key: string, video: VideoCard) => {
//     const alreadyExists = previouslyViewedState.some(
//       (item) => item.fileUrl === video.fileUrl
//     );

//     if (!alreadyExists) {
//       const thumbnailUrl =
//         video.fileUrl.replace("/upload/", "/upload/so_1/") + ".jpg";

//       const newItem: RecommendedItem = {
//         fileUrl: video.fileUrl,
//         imageUrl: { uri: thumbnailUrl },
//         title: video.title,
//         subTitle: video.speaker || "Unknown",
//         views: videoStats[key]?.views || video.views || 0,
//       };

//       setPreviouslyViewedState((prev) => {
//         const updatedViewed = [newItem, ...prev];
//         persistViewed(updatedViewed); // ✅ FIXED
//         return updatedViewed;
//       });
//     }

//     setVideoStats((prev) => {
//       const updated = {
//         ...prev,
//         [key]: {
//           ...prev[key],
//           views: (prev[key]?.views || 0) + 1,
//         },
//       };
//       persistStats(updated); // ✅ persist after update
//       return updated;
//     });
//   };

//   const handleShare = async (key: string, video: VideoCard) => {
//     try {
//       const result = await Share.share({
//         title: video.title,
//         message: `Check out this video: ${video.title}\n${video.fileUrl}`,
//         url: video.fileUrl,
//       });

//       if (result.action === Share.sharedAction) {
//         setVideoStats((prev) => {
//           const updatedStats = {
//             ...prev,
//             [key]: {
//               ...prev[key],
//               sheared: (prev[key]?.sheared || video.sheared || 0) + 1,
//             },
//           };
//           persistStats(updatedStats); // 👈 Add this
//           return updatedStats;
//         });
//       }
//     } catch (error) {
//       console.warn("❌ Share error:", error);
//     }
//   };

//   // First 4 for early explore
//   const firstExploreVideos = uploadedVideos.slice(1, 5);

//   // Remaining explore videos
//   const remainingExploreVideos = uploadedVideos.slice(5);

//   const handleVideoTap = (key: string) => {
//     // Pause the video and show controls
//     setPlayingVideos((prev) => ({
//       ...prev,
//       [key]: false,
//     }));
//     setShowOverlay((prev) => ({
//       ...prev,
//       [key]: true,
//     }));
//   };

//   // const allIndexedVideos = uploadedVideos.map((video, i) => {
//   //   let key = "";
//   //   if (i === 0) {
//   //     key = `uploaded-${i}`;
//   //   } else if (i > 0 && i <= 4) {
//   //     key = `explore-early-${i}`;
//   //   } else {
//   //     key = `explore-remaining-${i + 95}`;
//   //   }

//   //   const stats = videoStats[key] || {};
//   //   const views = Math.max(stats.views ?? 0, video.viewCount ?? 0);
//   //   const shares = Math.max(stats.sheared ?? 0, video.sheared ?? 0);
//   //   const favorites = Math.max(stats.favorite ?? 0, video.favorite ?? 0);
//   //   const score = views + shares + favorites;

//   //   return {
//   //     key,
//   //     fileUrl: video.fileUrl,
//   //     title: video.title,
//   //     subTitle: video.speaker || "Unknown",
//   //     views,
//   //     shares,
//   //     favorites,
//   //     score,
//   //     imageUrl: {
//   //       uri: video.fileUrl.replace("/upload/", "/upload/so_1/") + ".jpg",
//   //     },
//   //   };
//   // });

//   const allIndexedVideos = uploadedVideos.map((video, i) => {
//     const key = getVideoKey(video.fileUrl); // ✅ Stable unique key

//     const stats = videoStats[key] || {};
//     const views = Math.max(stats.views ?? 0, video.viewCount ?? 0);
//     const shares = Math.max(stats.sheared ?? 0, video.sheared ?? 0);
//     const favorites = Math.max(stats.favorite ?? 0, video.favorite ?? 0);
//     const score = views + shares + favorites;

//     return {
//       key,
//       fileUrl: video.fileUrl,
//       title: video.title,
//       subTitle: video.speaker || "Unknown",
//       views,
//       shares,
//       favorites,
//       score,
//       imageUrl: {
//         uri: video.fileUrl.replace("/upload/", "/upload/so_1/") + ".jpg",
//       },
//     };
//   });

//   const trendingItems: RecommendedItem[] = allIndexedVideos
//     .filter((v) => v.views >= 3 && v.shares >= 3 && v.favorites >= 1)
//     .sort((a, b) => b.score - a.score)
//     .map(({ fileUrl, title, subTitle, views, imageUrl }) => ({
//       fileUrl,
//       title,
//       subTitle,
//       views,
//       imageUrl,
//     }));

//   // useEffect(() => {
//   //   // Initialize showOverlay for uploaded videos (Recent, Explore)
//   //   uploadedVideos.forEach((video, i) => {
//   //     let key = "";
//   //     if (i === 0) {
//   //       key = `uploaded-${i}`;
//   //     } else if (i > 0 && i <= 4) {
//   //       key = `explore-early-${i}`;
//   //     } else {
//   //       key = `explore-remaining-${i + 95}`;
//   //     }

//   //     setShowOverlay((prev) => {
//   //       if (prev[key]) return prev;
//   //       return { ...prev, [key]: true };
//   //     });
//   //   });

//   //   // Initialize showOverlayMini for Trending and Previously Viewed
//   //   const trendingKeys = trendingItems.map((_, i) => `Trending-${i}`);
//   //   const viewedKeys = previouslyViewedState.map(
//   //     (_, i) => `Previously Viewed-${i}`
//   //   );

//   //   [...trendingKeys, ...viewedKeys].forEach((key) => {
//   //     setShowOverlayMini((prev) => {
//   //       if (prev[key]) return prev;
//   //       return { ...prev, [key]: true };
//   //     });
//   //   });
//   // }, [uploadedVideos, trendingItems, previouslyViewedState]);

//   useEffect(() => {
//     // Initialize showOverlay for uploaded videos (Recent, Explore, etc.)
//     uploadedVideos.forEach((video) => {
//       const key = getVideoKey(video.fileUrl); // ✅ Stable key

//       setShowOverlay((prev) => {
//         if (prev[key]) return prev;
//         return { ...prev, [key]: true };
//       });
//     });

//     // Initialize showOverlayMini for Trending and Previously Viewed
//     const trendingKeys = trendingItems.map((item) => getVideoKey(item.fileUrl));
//     const viewedKeys = previouslyViewedState.map((item) =>
//       getVideoKey(item.fileUrl)
//     );

//     [...trendingKeys, ...viewedKeys].forEach((key) => {
//       setShowOverlayMini((prev) => {
//         if (prev[key]) return prev;
//         return { ...prev, [key]: true };
//       });
//     });
//   }, [uploadedVideos, trendingItems, previouslyViewedState]);

//   const handleSave = (fileUrl: string) => {
//     const key = getVideoKey(fileUrl);

//     setVideoStats((prev) => {
//       if (prev[key]?.saved) return prev;
//       const updatedStats = {
//         ...prev,
//         [key]: {
//           ...prev[key],
//           saved: (prev[key]?.saved || 0) + 1,
//         },
//       };
//       persistStats(updatedStats);
//       return updatedStats;
//     });
//   };

//   const handleFavorite = (fileUrl: string) => {
//     const key = getVideoKey(fileUrl);

//     setVideoStats((prev) => {
//       const hasLiked = !!prev[key]?.favorite;
//       const updatedStats = {
//         ...prev,
//         [key]: {
//           ...prev[key],
//           favorite: hasLiked ? 0 : 1,
//         },
//       };
//       persistStats(updatedStats);
//       return updatedStats;
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
//     // const modalKey = `${sectionId}-${index}`;

//     const modalKey = getVideoKey(video.fileUrl);
//     const stats = videoStats[modalKey] || {};
//     const videoRef = videoRefs.current[modalKey];
//     const progress = progresses[modalKey] ?? 0;

//     const panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (evt, gestureState) => {
//         const barWidth = 260;
//         const x = Math.max(0, Math.min(gestureState.moveX - 50, barWidth));
//         const pct = (x / barWidth) * 100;

//         setProgresses((prev) => ({ ...prev, [modalKey]: pct }));

//         if (videoRef?.setPositionAsync && videoRef.getStatusAsync) {
//           videoRef.getStatusAsync().then((status) => {
//             if (status.isLoaded && status.durationMillis) {
//               videoRef.setPositionAsync((pct / 100) * status.durationMillis);
//             }
//           });
//         }
//       },
//     });

//     return (
//       <View key={modalKey} className="flex flex-col mb-10">
//         <TouchableWithoutFeedback onPress={() => handleVideoTap(modalKey)}>
//           <View className="w-full h-[393px] overflow-hidden relative">
//             <Video
//               ref={(ref) => {
//                 if (ref) videoRefs.current[modalKey] = ref;
//               }}
//               source={{ uri: video.fileUrl }}
//               style={{ width: "100%", height: "100%", position: "absolute" }}
//               resizeMode="cover"
//               isMuted={mutedVideos[modalKey] ?? false}
//               shouldPlay={playingVideos[modalKey] ?? false}
//               useNativeControls={false}
//               onPlaybackStatusUpdate={(status) => {
//                 if (!status.isLoaded) return;
//                 const pct = status.durationMillis
//                   ? (status.positionMillis / status.durationMillis) * 100
//                   : 0;
//                 setProgresses((prev) => ({ ...prev, [modalKey]: pct }));

//                 if (status.didJustFinish) {
//                   videoRef?.setPositionAsync(0);
//                   setPlayingVideos((prev) => ({ ...prev, [modalKey]: false }));
//                   setHasCompleted((prev) => ({ ...prev, [modalKey]: true }));
//                   setShowOverlay((prev) => ({ ...prev, [modalKey]: true }));
//                 }
//               }}
//             />

//             {/* Title Overlay */}
//             {!playingVideos[modalKey] && showOverlay[modalKey] && (
//               <View className="absolute bottom-9 left-3 right-3 px-4 py-2 rounded-md ">
//                 <Text
//                   className="text-white font-rubik-semibold text-[14px]"
//                   numberOfLines={2}
//                 >
//                   {video.title}
//                 </Text>
//               </View>
//             )}

//             {/* Conditional Controls */}
//             {!playingVideos[modalKey] &&
//               showOverlay[modalKey] &&
//               (playType === "progress" ? (
//                 <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2 px-3">
//                   <TouchableOpacity onPress={() => togglePlay(modalKey, video)}>
//                     <Ionicons name="play" size={24} color="#FEA74E" />
//                   </TouchableOpacity>

//                   <View
//                     className="flex-1 h-1 bg-white/30 rounded-full relative"
//                     {...panResponder.panHandlers}
//                   >
//                     <View
//                       className="h-full bg-[#FEA74E] rounded-full"
//                       style={{ width: `${progress}%` }}
//                     />
//                     <View
//                       style={{
//                         position: "absolute",
//                         left: `${progress}%`,
//                         transform: [{ translateX: -6 }],
//                         top: -5,
//                         width: 12,
//                         height: 12,
//                         borderRadius: 6,
//                         backgroundColor: "#FFFFFF",
//                         borderWidth: 1,
//                         borderColor: "#FEA74E",
//                       }}
//                     />
//                   </View>

//                   <TouchableOpacity onPress={() => toggleMute(modalKey)}>
//                     <Ionicons
//                       name={
//                         mutedVideos[modalKey] ? "volume-mute" : "volume-high"
//                       }
//                       size={20}
//                       color="#FEA74E"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <TouchableOpacity
//                   onPress={() => togglePlay(modalKey, video)}
//                   className="absolute inset-0 justify-center items-center"
//                   activeOpacity={0.9}
//                 >
//                   <View className="bg-white/70 p-2 rounded-full">
//                     <Ionicons name="play" size={28} color="#FEA74E" />
//                   </View>
//                 </TouchableOpacity>
//               ))}

//             {/* Modal Options */}
//             {modalVisible === modalKey && (
//               <View className="absolute top-28 right-4 bg-white shadow-md rounded-lg p-3 z-50 w-44">
//                 <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
//                   <Text className="text-[#1D2939] font-rubik ml-2">
//                     View Details
//                   </Text>
//                   <Ionicons name="eye-outline" size={16} color="#3A3E50" />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => handleShare(modalKey, video)}
//                   className="py-2 border-b border-gray-200 flex-row items-center justify-between"
//                 >
//                   <Text className="text-[#1D2939] font-rubik ml-2">Share</Text>
//                   <AntDesign name="sharealt" size={16} color="#3A3E50" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => handleSave(video.fileUrl)}>
//                   <Text className="text-[#1D2939] font-rubik ml-2">
//                     Save to Library
//                   </Text>
//                   <MaterialIcons name="library-add" size={16} color="#3A3E50" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </TouchableWithoutFeedback>

//         {/* Footer Section */}
//         <View className="flex-row items-center justify-between mt-1 px-3">
//           <View className="flex flex-row items-center">
//             <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center relative ml-1 mt-2">
//               <Image
//                 source={
//                   typeof video.speakerAvatar === "string" &&
//                   video.speakerAvatar.startsWith("http")
//                     ? { uri: video.speakerAvatar.trim() }
//                     : video.speakerAvatar
//                 }
//                 style={{ width: 30, height: 30, borderRadius: 999 }}
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
//                 <TouchableOpacity
//                   onPress={() => handleShare(modalKey, video)}
//                   className="flex-row items-center ml-4"
//                 >
//                   <AntDesign name="sharealt" size={20} color="#98A2B3" />
//                   <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                     {stats.sheared ?? video.sheared}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => {
//                     if (!stats.saved) handleSave(video.fileUrl);
//                   }}
//                   className="flex-row items-center ml-6"
//                   disabled={!!stats.saved}
//                 >
//                   <Fontisto name="favorite" size={20} color="#98A2B3" />
//                   <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
//                     {stats.saved ?? video.saved}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => handleFavorite(video.fileUrl)} >

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
//     setModalIndex: (val: number | null) => void,
//     viewsState: Record<string, number>,
//     setViewsState: React.Dispatch<React.SetStateAction<Record<string, number>>>,
//     playingState: Record<string, boolean>,
//     setPlayingState: React.Dispatch<
//       React.SetStateAction<Record<string, boolean>>
//     >,
//     hasPlayed: Record<string, boolean>,
//     setHasPlayed: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
//     hasCompleted: Record<string, boolean>,
//     setHasCompleted: React.Dispatch<
//       React.SetStateAction<Record<string, boolean>>
//     >
//   ) => (
//     <View className="mt-5">
//       <Text className="text-[16px] font-rubik-semibold text-[#344054] mt-4 mb-2 ml-2">
//         {title}
//       </Text>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 12 }}
//       >
//         {items.map((item, index) => {
//          const key = getVideoKey(item.fileUrl);

//           const isPlaying = playingState[key] ?? false;
//           const views = viewsState[key] ?? item.views;

//           const togglePlay = () => {
//             handleMiniCardPlay(
//               key,
//               item,
//               setViewsState,
//               setPlayingState,
//               setHasPlayed,
//               setHasCompleted
//             );
//           };

//           const handleShare = async () => {
//             try {
//               await Share.share({
//                 title: item.title,
//                 message: `Check out this video: ${item.title}\n${item.fileUrl}`,
//                 url: item.fileUrl,
//               });
//             } catch (error) {
//               console.warn("Share error:", error);
//             }
//           };

//           return (
//             <View key={key} className="mr-4 w-[154px] flex-col items-center">
//               <TouchableOpacity
//                 onPress={togglePlay}
//                 className="w-full h-[232px] rounded-2xl overflow-hidden relative"
//                 activeOpacity={0.9}
//               >
//                 <Video
//                   ref={(ref) => {
//                     if (ref) miniCardRefs.current[key] = ref;
//                   }}
//                   source={{ uri: item.fileUrl }}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     position: "absolute",
//                   }}
//                   resizeMode="cover"
//                   isMuted={false}
//                   shouldPlay={isPlaying}
//                   useNativeControls={false}
//                   onPlaybackStatusUpdate={(status) => {
//                     if (!status.isLoaded) return;

//                     if (status.didJustFinish) {
//                       setPlayingState((prev: any) => ({
//                         ...prev,
//                         [key]: false,
//                       }));
//                       setHasCompleted((prev: any) => ({
//                         ...prev,
//                         [key]: true,
//                       }));
//                       setShowOverlayMini((prev) => ({ ...prev, [key]: true }));
//                     }
//                   }}
//                 />

//                 {/* Overlay Play Icon and Title — only when NOT playing */}
//                 {!isPlaying && showOverlayMini[key] && (
//                   <>
//                     <View className="absolute inset-0 justify-center items-center">
//                       <View className="bg-white/70 p-2 rounded-full">
//                         <Ionicons name="play" size={24} color="#FEA74E" />
//                       </View>
//                     </View>
//                     <View className="absolute bottom-2 left-2 right-2">
//                       <Text
//                         className="text-white text-start text-[14px] ml-1 mb-6 font-rubik"
//                         numberOfLines={2}
//                       >
//                         {item.title}
//                       </Text>
//                     </View>
//                   </>
//                 )}
//               </TouchableOpacity>

//               {/* Modal Options */}
//               {modalIndex === index && (
//                 <View className="absolute mt-[26px] left-1 bg-white shadow-md rounded-lg p-3 z-50 w-30">
//                   <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
//                     <Text className="text-[#1D2939] font-rubik ml-2">
//                       View Details
//                     </Text>
//                     <Ionicons name="eye-outline" size={16} color="#3A3E50" />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     className="py-2 border-b border-gray-200 flex-row items-center justify-between"
//                     onPress={handleShare}
//                   >
//                     <Text className="text-sm text-[#1D2939] font-rubik ml-2">
//                       Share
//                     </Text>
//                     <AntDesign name="sharealt" size={16} color="#3A3E50" />
//                   </TouchableOpacity>
//                   <TouchableOpacity className="py-2 flex-row items-center justify-between">
//                     <Text className="text-[#1D2939] font-rubik mr-2">
//                       Save to Library
//                     </Text>
//                     <MaterialIcons
//                       name="library-add"
//                       size={18}
//                       color="#3A3E50"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               )}

//               {/* Footer Details */}
//               <View className="mt-2 flex flex-col w-full">
//                 <View className="flex flex-row justify-between items-center">
//                   <Text
//                     className="text-[12px] text-[#1D2939] font-rubik font-medium"
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                   >
//                     {item.subTitle?.split(" ").slice(0, 4).join(" ") + " ..."}
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() =>
//                       setModalIndex(modalIndex === index ? null : index)
//                     }
//                     className="mr-2"
//                   >
//                     <Ionicons
//                       name="ellipsis-vertical"
//                       size={14}
//                       color="#9CA3AF"
//                     />
//                   </TouchableOpacity>
//                 </View>
//                 <View className="flex-row items-center">
//                   <Image
//                     source={require("../../assets/images/Vector1.png")}
//                     className="h-[16px] w-[16px] ml-1"
//                     resizeMode="contain"
//                   />
//                   <Text className="text-[10px] text-gray-500 ml-2 mt-1 font-rubik">
//                     {views}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );

//   return (
//     <ScrollView className="flex-1 px-3">
//       {/* 🎬 Recent */}
//       {uploadedVideos.length > 0 && (
//         <>
//           <Text className="text-[#344054] text-[16px] font-rubik-semibold my-4">
//             Recent
//           </Text>
//           {renderVideoCard(
//             {
//               fileUrl: uploadedVideos[0].fileUrl,
//               title: uploadedVideos[0].title,
//               speaker: uploadedVideos[0].speaker || "Unknown",
//               timeAgo: getTimeAgo(uploadedVideos[0].createdAt),
//               speakerAvatar:
//                 typeof uploadedVideos[0].speakerAvatar === "string"
//                   ? uploadedVideos[0].speakerAvatar.trim()
//                   : require("../../assets/images/Avatar-1.png"),
//               views: uploadedVideos[0].viewCount || 0,
//               favorite: uploadedVideos[0].favorite || 0,
//               saved: uploadedVideos[0].saved || 0,
//               sheared: uploadedVideos[0].sheared || 0,
//             },
//             0,
//             "uploaded",
//             "progress"
//           )}
//         </>
//       )}

//       {/* 👁 Previously Viewed */}
//       {renderMiniCards(
//         "Previously Viewed",
//         previouslyViewedState,
//         pvModalIndex,
//         setPvModalIndex,
//         miniCardViews,
//         setMiniCardViews,
//         miniCardPlaying,
//         setMiniCardPlaying,
//         miniCardHasPlayed,
//         setMiniCardHasPlayed,
//         miniCardHasCompleted,
//         setMiniCardHasCompleted
//       )}

//       {/* 🎥 Explore More - Top 4 */}
//       {firstExploreVideos.length > 0 && (
//         <>
//           <Text className="text-[#344054] text-[16px] font-rubik-semibold my-4">
//             Explore More Videos
//           </Text>
//           <View className="gap-8">
//             {firstExploreVideos.map((video, index) =>
//               renderVideoCard(
//                 {
//                   fileUrl: video.fileUrl,
//                   title: video.title,
//                   speaker: video.speaker || "Unknown",
//                   timeAgo: getTimeAgo(video.createdAt),
//                   speakerAvatar:
//                     typeof video.speakerAvatar === "string"
//                       ? video.speakerAvatar.trim()
//                       : require("../../assets/images/Avatar-1.png"),
//                   views: video.viewCount || 0,
//                   favorite: video.favorite || 0,
//                   saved: video.saved || 0,
//                   sheared: video.sheared || 0,
//                 },
//                 index + 1,
//                 "explore-early",
//                 "center"
//               )
//             )}
//           </View>
//         </>
//       )}

//       {/* 🔥 Trending Section (MiniCards format) */}
//       {renderMiniCards(
//         "Trending",
//         trendingItems,
//         rsModalIndex,
//         setRsModalIndex,
//         miniCardViews,
//         setMiniCardViews,
//         miniCardPlaying,
//         setMiniCardPlaying,
//         miniCardHasPlayed,
//         setMiniCardHasPlayed,
//         miniCardHasCompleted,
//         setMiniCardHasCompleted
//       )}

//       {/* 📽️ Explore More - Remaining */}
//       {remainingExploreVideos.length > 0 && (
//         <>
//           <Text className="text-[#344054] text-[16px] font-rubik-semibold my-4">
//             More Videos
//           </Text>
//           <View className="gap-8">
//             {remainingExploreVideos.map((video, index) =>
//               renderVideoCard(
//                 {
//                   fileUrl: video.fileUrl,
//                   title: video.title,
//                   speaker: video.speaker || "Unknown",
//                   timeAgo: getTimeAgo(video.createdAt),
//                   speakerAvatar:
//                     typeof video.speakerAvatar === "string"
//                       ? video.speakerAvatar.trim()
//                       : require("../../assets/images/Avatar-1.png"),
//                   views: video.viewCount || 0,
//                   favorite: video.favorite || 0,
//                   saved: video.saved || 0,
//                   sheared: video.sheared || 0,
//                 },
//                 index + 100,
//                 "explore-remaining",
//                 "center"
//               )
//             )}
//           </View>
//         </>
//       )}
//     </ScrollView>
//   );
// }



















 import { useEffect, useRef, useState } from "react";
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
import {
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import {
  getPersistedStats,
  persistStats,
  getViewed,
  persistViewed,
} from "../utils/persistentStorage";


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
  const getVideoKey = (fileUrl: string): string => `video-${fileUrl}`;

  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [pvModalIndex, setPvModalIndex] = useState<number | null>(null);
  const [rsModalIndex, setRsModalIndex] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState<Record<string, boolean>>({});
  const [showOverlayMini, setShowOverlayMini] = useState<
    Record<string, boolean>
  >({});

  const [miniCardViews, setMiniCardViews] = useState<Record<string, number>>(
    {}
  );
  const [miniCardPlaying, setMiniCardPlaying] = useState<
    Record<string, boolean>
  >({});
  const [miniCardHasPlayed, setMiniCardHasPlayed] = useState<
    Record<string, boolean>
  >({});
  const [miniCardHasCompleted, setMiniCardHasCompleted] = useState<
    Record<string, boolean>
  >({});

  const miniCardRefs = useRef<Record<string, any>>({});

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

 
  useEffect(() => {
    const loadPersistedData = async () => {
      const stats = await getPersistedStats();
      const viewed = await getViewed();

      setVideoStats(stats);
      setPreviouslyViewedState(viewed);

      // Optional: Restore miniCardViews (just views count from stats)
      const miniViews: Record<string, number> = {};
      Object.keys(stats).forEach((key) => {
        if (typeof stats[key]?.views === "number") {
          miniViews[key] = stats[key].views;
        }
      });
      setMiniCardViews(miniViews);
    };

    loadPersistedData();
  }, []);

  const handleMiniCardPlay = (
    key: string,
    item: RecommendedItem,
    setViewsState: (val: Record<string, number>) => void,
    setPlayingState: (val: Record<string, boolean>) => void,
    setHasPlayed: (val: Record<string, boolean>) => void,
    setHasCompleted: (val: Record<string, boolean>) => void
  ) => {
    // Stop all full video plays
    Object.keys(playingVideos).forEach((k) => {
      setPlayingVideos((prev) => ({ ...prev, [k]: false }));
      setShowOverlay((prev) => ({ ...prev, [k]: true }));
    });

    // Stop all mini card plays
    Object.keys(miniCardPlaying).forEach((k) => {
      setMiniCardPlaying((prev) => ({ ...prev, [k]: false }));
      setShowOverlayMini((prev) => ({ ...prev, [k]: true }));
    });

    const isPlaying = miniCardPlaying[key] ?? false;
    const wasCompleted = miniCardHasCompleted[key] ?? false;

    if (!isPlaying) {
      if (wasCompleted && miniCardRefs.current[key]) {
        miniCardRefs.current[key].setPositionAsync(0);
      }

      setViewsState((prev: { [x: string]: any }) => ({
        ...prev,
        [key]: (prev[key] ?? item.views) + 1,
      }));

      setHasPlayed((prev: any) => ({ ...prev, [key]: true }));
      setHasCompleted((prev) => ({ ...prev, [key]: false }));

      setPlayingState({ [key]: true });
      setMiniCardPlaying({ [key]: true });

      setShowOverlayMini((prev) => ({ ...prev, [key]: false }));
    } else {
      setPlayingState({ [key]: false });
      setMiniCardPlaying({ [key]: false });

      setShowOverlayMini((prev) => ({ ...prev, [key]: true }));
    }
  };

  const togglePlay = (key: string, video?: VideoCard) => {
    const isCurrentlyPlaying = playingVideos[key];

    const newPlayingState: Record<string, boolean> = {};

    // Pause all full videos
    Object.keys(playingVideos).forEach((k) => {
      newPlayingState[k] = false;
      setShowOverlay((prev) => ({ ...prev, [k]: true }));
    });

    // ✅ Pause all mini cards too
    Object.keys(miniCardPlaying).forEach((k) => {
      setMiniCardPlaying((prev) => ({ ...prev, [k]: false }));
      setShowOverlayMini((prev) => ({ ...prev, [k]: true }));
    });

    const shouldStartPlaying = !isCurrentlyPlaying;

    if (shouldStartPlaying) {
      const alreadyPlayed = hasPlayed[key];
      const completedBefore = hasCompleted[key];

      if ((!alreadyPlayed || completedBefore) && video) {
        incrementView(key, video);
        setHasPlayed((prev) => ({ ...prev, [key]: true }));
        setHasCompleted((prev) => ({ ...prev, [key]: false }));
      }

      if (mutedVideos[key]) {
        setMutedVideos((prev) => ({ ...prev, [key]: false }));
      }

      newPlayingState[key] = true;
    }

    setPlayingVideos(newPlayingState);
    setShowOverlay((prev) => ({
      ...prev,
      [key]: !shouldStartPlaying ? true : false,
    }));
  };

  const [hasPlayed, setHasPlayed] = useState<Record<string, boolean>>({});
  const [hasCompleted, setHasCompleted] = useState<Record<string, boolean>>({});

  const incrementView = (key: string, video: VideoCard) => {
    const alreadyExists = previouslyViewedState.some(
      (item) => item.fileUrl === video.fileUrl
    );

    if (!alreadyExists) {
      const thumbnailUrl =
        video.fileUrl.replace("/upload/", "/upload/so_1/") + ".jpg";

      const newItem: RecommendedItem = {
        fileUrl: video.fileUrl,
        imageUrl: { uri: thumbnailUrl },
        title: video.title,
        subTitle: video.speaker || "Unknown",
        views: videoStats[key]?.views || video.views || 0,
      };

      setPreviouslyViewedState((prev) => {
        const updatedViewed = [newItem, ...prev];
        persistViewed(updatedViewed); // ✅ FIXED
        return updatedViewed;
      });
    }

    setVideoStats((prev) => {
      const updated = {
        ...prev,
        [key]: {
          ...prev[key],
          views: (prev[key]?.views || 0) + 1,
        },
      };
      persistStats(updated); // ✅ persist after update
      return updated;
    });
  };

  const handleShare = async (key: string, video: VideoCard) => {
    try {
      const result = await Share.share({
        title: video.title,
        message: `Check out this video: ${video.title}\n${video.fileUrl}`,
        url: video.fileUrl,
      });

      if (result.action === Share.sharedAction) {
        setVideoStats((prev) => {
          const updatedStats = {
            ...prev,
            [key]: {
              ...prev[key],
              sheared: (prev[key]?.sheared || video.sheared || 0) + 1,
            },
          };
          persistStats(updatedStats); // 👈 Add this
          return updatedStats;
        });
      }
    } catch (error) {
      console.warn("❌ Share error:", error);
    }
  };

  // First 4 for early explore
  const firstExploreVideos = uploadedVideos.slice(1, 5);

  // Remaining explore videos
  const remainingExploreVideos = uploadedVideos.slice(5);

  const handleVideoTap = (key: string) => {
    // Pause the video and show controls
    setPlayingVideos((prev) => ({
      ...prev,
      [key]: false,
    }));
    setShowOverlay((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  
  const allIndexedVideos = uploadedVideos.map((video, i) => {
    const key = getVideoKey(video.fileUrl); // ✅ Stable unique key

    const stats = videoStats[key] || {};
    const views = Math.max(stats.views ?? 0, video.viewCount ?? 0);
    const shares = Math.max(stats.sheared ?? 0, video.sheared ?? 0);
    const favorites = Math.max(stats.favorite ?? 0, video.favorite ?? 0);
    const score = views + shares + favorites;

    return {
      key,
      fileUrl: video.fileUrl,
      title: video.title,
      subTitle: video.speaker || "Unknown",
      views,
      shares,
      favorites,
      score,
      imageUrl: {
        uri: video.fileUrl.replace("/upload/", "/upload/so_1/") + ".jpg",
      },
    };
  });

  const trendingItems: RecommendedItem[] = allIndexedVideos
    .filter((v) => v.views >= 3 && v.shares >= 3 && v.favorites >= 1)
    .sort((a, b) => b.score - a.score)
    .map(({ fileUrl, title, subTitle, views, imageUrl }) => ({
      fileUrl,
      title,
      subTitle,
      views,
      imageUrl,
    }));

 
  useEffect(() => {
    // Initialize showOverlay for uploaded videos (Recent, Explore, etc.)
    uploadedVideos.forEach((video) => {
      const key = getVideoKey(video.fileUrl); // ✅ Stable key

      setShowOverlay((prev) => {
        if (prev[key]) return prev;
        return { ...prev, [key]: true };
      });
    });

    // Initialize showOverlayMini for Trending and Previously Viewed
    const trendingKeys = trendingItems.map((item) => getVideoKey(item.fileUrl));
    const viewedKeys = previouslyViewedState.map((item) =>
      getVideoKey(item.fileUrl)
    );

    [...trendingKeys, ...viewedKeys].forEach((key) => {
      setShowOverlayMini((prev) => {
        if (prev[key]) return prev;
        return { ...prev, [key]: true };
      });
    });
  }, [uploadedVideos, trendingItems, previouslyViewedState]);
  const handleSave = (key: string, video: VideoCard) => {
    setVideoStats((prev) => {
      const isSaved = prev[key]?.saved === 1;
      const updatedStats = {
        ...prev,
        [key]: {
          ...prev[key],
          saved: isSaved ? 0 : 1,
        },
      };
      persistStats(updatedStats);
      return updatedStats;
    });
  };
  
  const handleFavorite = (key: string, video: VideoCard) => {
    setVideoStats((prev) => {
      const isFavorite = prev[key]?.favorite === 1;
      const updatedStats = {
        ...prev,
        [key]: {
          ...prev[key],
          favorite: isFavorite ? 0 : 1,
        },
      };
      persistStats(updatedStats);
      return updatedStats;
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
    const modalKey = getVideoKey(video.fileUrl);
    const stats = videoStats[modalKey] || {};
    const videoRef = videoRefs.current[modalKey];
    const progress = progresses[modalKey] ?? 0;
  
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const barWidth = 260;
        const x = Math.max(0, Math.min(gestureState.moveX - 50, barWidth));
        const pct = (x / barWidth) * 100;
  
        setProgresses((prev) => ({ ...prev, [modalKey]: pct }));
  
        if (videoRef?.setPositionAsync && videoRef.getStatusAsync) {
          videoRef.getStatusAsync().then((status) => {
            if (status.isLoaded && status.durationMillis) {
              videoRef.setPositionAsync((pct / 100) * status.durationMillis);
            }
          });
        }
      },
    });
  
    return (
      <View key={modalKey} className="flex flex-col mb-10">
        <TouchableWithoutFeedback onPress={() => handleVideoTap(modalKey)}>
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
              onPlaybackStatusUpdate={(status) => {
                if (!status.isLoaded) return;
                const pct = status.durationMillis
                  ? (status.positionMillis / status.durationMillis) * 100
                  : 0;
                setProgresses((prev) => ({ ...prev, [modalKey]: pct }));
  
                if (status.didJustFinish) {
                  videoRef?.setPositionAsync(0);
                  setPlayingVideos((prev) => ({ ...prev, [modalKey]: false }));
                  setHasCompleted((prev) => ({ ...prev, [modalKey]: true }));
                  setShowOverlay((prev) => ({ ...prev, [modalKey]: true }));
                }
              }}
            />
  
            {!playingVideos[modalKey] && showOverlay[modalKey] && (
              <View className="absolute bottom-9 left-3 right-3 px-4 py-2 rounded-md">
                <Text
                  className="text-white font-rubik-semibold text-[14px]"
                  numberOfLines={2}
                >
                  {video.title}
                </Text>
              </View>
            )}
  
            {!playingVideos[modalKey] && showOverlay[modalKey] && (
              playType === "progress" ? (
                <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2 px-3">
                  <TouchableOpacity onPress={() => togglePlay(modalKey, video)}>
                    <Ionicons name="play" size={24} color="#FEA74E" />
                  </TouchableOpacity>
  
                  <View
                    className="flex-1 h-1 bg-white/30 rounded-full relative"
                    {...panResponder.panHandlers}
                  >
                    <View
                      className="h-full bg-[#FEA74E] rounded-full"
                      style={{ width: `${progress}%` }}
                    />
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
              ) : (
                <TouchableOpacity
                  onPress={() => togglePlay(modalKey, video)}
                  className="absolute inset-0 justify-center items-center"
                  activeOpacity={0.9}
                >
                  <View className="bg-white/70 p-2 rounded-full">
                    <Ionicons name="play" size={28} color="#FEA74E" />
                  </View>
                </TouchableOpacity>
              )
            )}
  
            {modalVisible === modalKey && (
              <View className="absolute top-28 right-4 bg-white shadow-md rounded-lg p-3 z-50 w-44">
                <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                  <Text className="text-[#1D2939] font-rubik ml-2">View Details</Text>
                  <Ionicons name="eye-outline" size={16} color="#3A3E50" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleShare(modalKey, video)}
                  className="py-2 border-b border-gray-200 flex-row items-center justify-between"
                >
                  <Text className="text-[#1D2939] font-rubik ml-2">Share</Text>
                  <AntDesign name="sharealt" size={16} color="#3A3E50" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSave(modalKey, video)}>
                  <Text className="text-[#1D2939] font-rubik ml-2">Save to Library</Text>
                  <MaterialIcons name="library-add" size={16} color="#3A3E50" />
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
                    {video.timeAgo}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row mt-2">
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
                <TouchableOpacity
                  onPress={() => handleShare(modalKey, video)}
                  className="flex-row items-center ml-4"
                >
                  <AntDesign name="sharealt" size={20} color="#98A2B3" />
                  <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                    {stats.sheared ?? video.sheared}
                  </Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  onPress={() => handleSave(modalKey, video)}
                  className="flex-row items-center ml-9"
                >
                  <MaterialIcons
                    name={stats.saved === 1 ? "bookmark" : "bookmark-border"}
                    size={20}
                    color={stats.saved === 1 ? "#FEA74E" : "#98A2B3"}
                  />
                  <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                    {stats.saved === 1 ? (video.saved ?? 0) + 1 : video.saved ?? 0}
                  </Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  onPress={() => handleFavorite(modalKey, video)}
                  className="ml-9 flex-row"
                >
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
  
  const renderMiniCards = (
    title: string,
    items: RecommendedItem[],
    modalIndex: number | null,
    setModalIndex: (val: number | null) => void,
    viewsState: Record<string, number>,
    setViewsState: React.Dispatch<React.SetStateAction<Record<string, number>>>,
    playingState: Record<string, boolean>,
    setPlayingState: React.Dispatch<
      React.SetStateAction<Record<string, boolean>>
    >,
    hasPlayed: Record<string, boolean>,
    setHasPlayed: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    hasCompleted: Record<string, boolean>,
    setHasCompleted: React.Dispatch<
      React.SetStateAction<Record<string, boolean>>
    >
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
        {items.map((item, index) => {
         const key = getVideoKey(item.fileUrl);

          const isPlaying = playingState[key] ?? false;
          const views = viewsState[key] ?? item.views;

          const togglePlay = () => {
            handleMiniCardPlay(
              key,
              item,
              setViewsState,
              setPlayingState,
              setHasPlayed,
              setHasCompleted
            );
          };

          const handleShare = async () => {
            try {
              await Share.share({
                title: item.title,
                message: `Check out this video: ${item.title}\n${item.fileUrl}`,
                url: item.fileUrl,
              });
            } catch (error) {
              console.warn("Share error:", error);
            }
          };

          return (
            <View key={key} className="mr-4 w-[154px] flex-col items-center">
              <TouchableOpacity
                onPress={togglePlay}
                className="w-full h-[232px] rounded-2xl overflow-hidden relative"
                activeOpacity={0.9}
              >
                <Video
                  ref={(ref) => {
                    if (ref) miniCardRefs.current[key] = ref;
                  }}
                  source={{ uri: item.fileUrl }}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                  resizeMode="cover"
                  isMuted={false}
                  shouldPlay={isPlaying}
                  useNativeControls={false}
                  onPlaybackStatusUpdate={(status) => {
                    if (!status.isLoaded) return;

                    if (status.didJustFinish) {
                      setPlayingState((prev: any) => ({
                        ...prev,
                        [key]: false,
                      }));
                      setHasCompleted((prev: any) => ({
                        ...prev,
                        [key]: true,
                      }));
                      setShowOverlayMini((prev) => ({ ...prev, [key]: true }));
                    }
                  }}
                />

                {/* Overlay Play Icon and Title — only when NOT playing */}
                {!isPlaying && showOverlayMini[key] && (
                  <>
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
                  </>
                )}
              </TouchableOpacity>

              {/* Modal Options */}
              {modalIndex === index && (
                <View className="absolute mt-[26px] left-1 bg-white shadow-md rounded-lg p-3 z-50 w-30">
                  <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                    <Text className="text-[#1D2939] font-rubik ml-2">
                      View Details
                    </Text>
                    <Ionicons name="eye-outline" size={16} color="#3A3E50" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="py-2 border-b border-gray-200 flex-row items-center justify-between"
                    onPress={handleShare}
                  >
                    <Text className="text-sm text-[#1D2939] font-rubik ml-2">
                      Share
                    </Text>
                    <AntDesign name="sharealt" size={16} color="#3A3E50" />
                  </TouchableOpacity>
                  <TouchableOpacity className="py-2 flex-row items-center justify-between">
                    <Text className="text-[#1D2939] font-rubik mr-2">
                      Save to Library
                    </Text>
                    <MaterialIcons
                      name="library-add"
                      size={18}
                      color="#3A3E50"
                    />
                  </TouchableOpacity>
                </View>
              )}

              {/* Footer Details */}
              <View className="mt-2 flex flex-col w-full">
                <View className="flex flex-row justify-between items-center">
                  <Text
                    className="text-[12px] text-[#1D2939] font-rubik font-medium"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.subTitle?.split(" ").slice(0, 4).join(" ") + " ..."}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setModalIndex(modalIndex === index ? null : index)
                    }
                    className="mr-2"
                  >
                    <Ionicons
                      name="ellipsis-vertical"
                      size={14}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
                <View className="flex-row items-center">
                  <Image
                    source={require("../../assets/images/Vector1.png")}
                    className="h-[16px] w-[16px] ml-1"
                    resizeMode="contain"
                  />
                  <Text className="text-[10px] text-gray-500 ml-2 mt-1 font-rubik">
                    {views}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView className="flex-1 px-3">
     
      {/* 🎬 Recent */}
      {uploadedVideos.length > 0 && (
        <>
          <Text className="text-[#344054] text-[16px] font-rubik-semibold my-4">
            Recent
          </Text>
          {renderVideoCard(
            {
              fileUrl: uploadedVideos[0].fileUrl,
              title: uploadedVideos[0].title,
              speaker: uploadedVideos[0].speaker || "Unknown",
              timeAgo: getTimeAgo(uploadedVideos[0].createdAt),
              speakerAvatar:
                typeof uploadedVideos[0].speakerAvatar === "string"
                  ? uploadedVideos[0].speakerAvatar.trim()
                  : require("../../assets/images/Avatar-1.png"),
              views: uploadedVideos[0].viewCount || 0,
              favorite: uploadedVideos[0].favorite || 0,
              saved: uploadedVideos[0].saved || 0,
              sheared: uploadedVideos[0].sheared || 0,
            },
            0,
            "uploaded",
            "progress"
          )}
        </>
      )}

      {/* 👁 Previously Viewed */}
      {renderMiniCards(
        "Previously Viewed",
        previouslyViewedState,
        pvModalIndex,
        setPvModalIndex,
        miniCardViews,
        setMiniCardViews,
        miniCardPlaying,
        setMiniCardPlaying,
        miniCardHasPlayed,
        setMiniCardHasPlayed,
        miniCardHasCompleted,
        setMiniCardHasCompleted
      )}

      {/* 🎥 Explore More - Top 4 */}
      {firstExploreVideos.length > 0 && (
        <>
          <Text className="text-[#344054] text-[16px] font-rubik-semibold my-4">
            Explore More Videos
          </Text>
          <View className="gap-8">
            {firstExploreVideos.map((video, index) =>
              renderVideoCard(
                {
                  fileUrl: video.fileUrl,
                  title: video.title,
                  speaker: video.speaker || "Unknown",
                  timeAgo: getTimeAgo(video.createdAt),
                  speakerAvatar:
                    typeof video.speakerAvatar === "string"
                      ? video.speakerAvatar.trim()
                      : require("../../assets/images/Avatar-1.png"),
                  views: video.viewCount || 0,
                  favorite: video.favorite || 0,
                  saved: video.saved || 0,
                  sheared: video.sheared || 0,
                },
                index + 1,
                "explore-early",
                "center"
              )
            )}
          </View>
        </>
      )}

      {/* 🔥 Trending Section (MiniCards format) */}
      {renderMiniCards(
        "Trending",
        trendingItems,
        rsModalIndex,
        setRsModalIndex,
        miniCardViews,
        setMiniCardViews,
        miniCardPlaying,
        setMiniCardPlaying,
        miniCardHasPlayed,
        setMiniCardHasPlayed,
        miniCardHasCompleted,
        setMiniCardHasCompleted
      )}

      {/* 📽️ Explore More - Remaining */}
      {remainingExploreVideos.length > 0 && (
        <>
          <Text className="text-[#344054] text-[16px] font-rubik-semibold my-4">
            More Videos
          </Text>
          <View className="gap-8">
            {remainingExploreVideos.map((video, index) =>
              renderVideoCard(
                {
                  fileUrl: video.fileUrl,
                  title: video.title,
                  speaker: video.speaker || "Unknown",
                  timeAgo: getTimeAgo(video.createdAt),
                  speakerAvatar:
                    typeof video.speakerAvatar === "string"
                      ? video.speakerAvatar.trim()
                      : require("../../assets/images/Avatar-1.png"),
                  views: video.viewCount || 0,
                  favorite: video.favorite || 0,
                  saved: video.saved || 0,
                  sheared: video.sheared || 0,
                },
                index + 100,
                "explore-remaining",
                "center"
              )
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

