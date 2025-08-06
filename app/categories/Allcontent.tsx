import { AntDesign, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Audio, ResizeMode, Video } from "expo-av";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useGlobalVideoStore } from "../store/useGlobalVideoStore";
import { useLibraryStore } from "../store/useLibraryStore";
import { useMediaStore } from "../store/useUploadStore";
import { getFavoriteState, getPersistedStats, getViewed, persistStats, persistViewed, toggleFavorite } from "../utils/persistentStorage";
import { getDisplayName } from "../utils/userValidation";

// Define interface for media items
interface MediaItem {
  _id?: string; // Use _id as it appears in the code
  contentType: string;
  fileUrl: string;
  title: string;
  speaker?: string;
  uploadedBy?: string;
  description?: string;
  createdAt: string;
  speakerAvatar?: string | number | { uri: string };
  views?: number;
  sheared?: number;
  saved?: number;
  comment?: number;
  favorite?: number;
  imageUrl?: string | { uri: string };
}

export default function AllContent() {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;

  // Ensure mediaList is always an array and get the store
  const mediaStore = useMediaStore();
  const mediaList: MediaItem[] = mediaStore.mediaList || [];
  
  // ✅ Use global video store for cross-component video management
  const globalVideoStore = useGlobalVideoStore();
  
  // ✅ Use library store for saving content
  const libraryStore = useLibraryStore();
  
  // 🔧 Fix infinite loop: Use useMemo to memoize filtered arrays
  const allVideos = useMemo(() => 
    mediaList.filter((item) => item.contentType === "videos"), 
    [mediaList]
  );
  
  const otherContent = useMemo(() => 
    mediaList.filter((item) => item.contentType !== "videos"), 
    [mediaList]
  );

  // Log items with missing _id for debugging
  useEffect(() => {
    const itemsWithoutId = mediaList.filter((item) => !item._id);
    if (itemsWithoutId.length > 0) {
      console.warn("Items with missing _id:", itemsWithoutId);
    }
  }, [mediaList]);

  const getContentKey = (item: MediaItem) => `${item.contentType}-${item._id || Math.random().toString(36).substring(2)}`;
  const [contentStats, setContentStats] = useState<Record<string, any>>({});
  const [previouslyViewed, setPreviouslyViewed] = useState<any[]>([]);
  
  // 🎯 New favorite system state
  const [userFavorites, setUserFavorites] = useState<Record<string, boolean>>({});
  const [globalFavoriteCounts, setGlobalFavoriteCounts] = useState<Record<string, number>>({});

  // Video control state
  const videoRefs = useRef<Record<string, any>>({});
  const [videoVolume, setVideoVolume] = useState<number>(1.0); // 🔊 Add volume control
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [viewCounted, setViewCounted] = useState<Record<string, boolean>>({});
  
  // ✅ Get video state from global store
  const playingVideos = globalVideoStore.playingVideos;
  const mutedVideos = globalVideoStore.mutedVideos;
  const progresses = globalVideoStore.progresses;
  const showOverlay = globalVideoStore.showOverlay;
  const hasCompleted = globalVideoStore.hasCompleted;
  // Note: Using contentStats for all statistics instead of separate videoStats

  const toggleMute = (key: string) =>
    globalVideoStore.toggleVideoMute(key);

  const togglePlay = (key: string, video: any) => {
    const isPlaying = playingVideos[key] ?? false;

    if (!isPlaying) {
      // 🔊 Ensure audio is enabled when starting to play
      if (mutedVideos[key]) {
        console.log(`🔊 Unmuting video ${key} on play start`);
        globalVideoStore.toggleVideoMute(key);
      }
      
      // Ensure video has proper volume for audio playback
      if (videoVolume === 0) {
        console.log(`🔊 Setting volume to 1.0 for audio playback`);
        setVideoVolume(1.0);
      }

      // ✅ Reset view counting flag if video was completed (allowing new views on replay)
      if (hasCompleted[key]) {
        setViewCounted((prev) => ({ ...prev, [key]: false }));
        globalVideoStore.setVideoCompleted(key, false);
        console.log(`🔄 Reset view counting for replay via play button: ${video.title}`);
      }
    }

    if (!isPlaying && hasCompleted[key]) {
      videoRefs.current[key]?.setPositionAsync(0);
    }

    // ✅ Use global video management - this will pause all other videos across all components
    globalVideoStore.playVideoGlobally(key);
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

  const handleVideoTap = (key: string, video?: MediaItem) => {
    const isCurrentlyPlaying = playingVideos[key] ?? false;
    
    if (!isCurrentlyPlaying && video) {
      console.log(`📱 Video tapped to play: ${video.title}`);
      
      // 🔊 Ensure audio is enabled when tapping to play
      if (mutedVideos[key]) {
        globalVideoStore.toggleVideoMute(key);
      }
      
      // Ensure video has proper volume for audio playback
      if (videoVolume === 0) {
        setVideoVolume(1.0);
      }

      // ✅ Reset view counting flag if video was completed (allowing new views on replay)
      if (hasCompleted[key]) {
        setViewCounted((prev) => ({ ...prev, [key]: false }));
        globalVideoStore.setVideoCompleted(key, false);
        console.log(`🔄 Reset view counting for replay: ${video.title}`);
      }
    }
    
    // ✅ Use global video management - this will pause all other videos across all components
    globalVideoStore.playVideoGlobally(key);
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
          ref.getStatusAsync().then((status: { isLoaded: any; durationMillis: number }) => {
            if (status.isLoaded && status.durationMillis) {
              ref.setPositionAsync((pct / 100) * status.durationMillis);
            }
          });
        }

        globalVideoStore.setVideoProgress(activeKey, pct);
      }
    },
  });

  // 🔊 Initialize audio settings
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        console.log("🔊 AllContent: Initializing audio settings...");
        
        // 🎵 Configure audio session for video playback
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          playsInSilentModeIOS: true, // 🔑 This is crucial for video audio!
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        
        // Ensure default volume is set
        setVideoVolume(1.0);
        
        // Initialize all videos as unmuted by default
        allVideos.forEach((video, index) => {
          const key = `video-${video._id || index}`;
          // Check if video is muted and unmute it
          if (globalVideoStore.mutedVideos[key]) {
            globalVideoStore.toggleVideoMute(key);
          }
        });
        
        console.log("✅ AllContent: Audio session configured, all videos unmuted with volume 1.0");
      } catch (error) {
        console.error("❌ AllContent: Failed to initialize audio session:", error);
        // Fallback: still set volume and unmute videos
        setVideoVolume(1.0);
        allVideos.forEach((video, index) => {
          const key = `video-${video._id || index}`;
          // Check if video is muted and unmute it
          if (globalVideoStore.mutedVideos[key]) {
            globalVideoStore.toggleVideoMute(key);
          }
        });
      }
    };
    
    initializeAudio();
  }, [allVideos]);

  // 🎬 Video playback control - ensure videos respond to global state changes
  useEffect(() => {
    const controlVideos = async () => {
      for (const videoKey of Object.keys(playingVideos)) {
        const ref = videoRefs.current[videoKey];
        const shouldPlay = playingVideos[videoKey] ?? false;
        
        // Only proceed if ref exists and is properly initialized
        if (ref && typeof ref.getStatusAsync === 'function') {
          try {
            const status = await ref.getStatusAsync();
            if (status && status.isLoaded) {
              if (shouldPlay && !status.isPlaying) {
                // Play the video
                await ref.playAsync();
                console.log(`▶️ Playing video: ${videoKey}`);
              } else if (!shouldPlay && status.isPlaying) {
                // Pause the video
                await ref.pauseAsync();
                console.log(`⏸️ Paused video: ${videoKey}`);
              }
            }
          } catch (error) {
            // Skip videos that aren't ready yet - this is normal during mounting
            const errorMessage = error instanceof Error ? error.message : String(error);
            if (!errorMessage.includes('Invalid view returned from registry')) {
              console.error(`❌ Error controlling video ${videoKey}:`, error);
            }
          }
        }
      }
    };

    // Add a small delay to ensure video refs are properly set
    const timeoutId = setTimeout(controlVideos, 100);
    
    return () => clearTimeout(timeoutId);
  }, [playingVideos]);

  useEffect(() => {
    allVideos.forEach((v, index) => {
      const key = `video-${v._id || index}`;
      // Initialize overlay visibility in global store if not set
      if (globalVideoStore.showOverlay[key] === undefined) {
        globalVideoStore.setOverlayVisible(key, true);
      }
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
    const loadAllData = async () => {
      console.log("📱 AllContent: Loading persisted data...");
      
      // 📚 Load library data first
      if (!libraryStore.isLoaded) {
        await libraryStore.loadSavedItems();
      }
      
      // 📊 Load stats and viewed content (media list is already loaded globally)
      const stats = await getPersistedStats();
      const viewed = await getViewed();
      setContentStats(stats || {});
      setPreviouslyViewed(viewed || []);
      
      // 🎯 Load favorite states for all content
      const favoriteStates: Record<string, boolean> = {};
      const favoriteCounts: Record<string, number> = {};
      
      await Promise.all(mediaList.map(async (item) => {
        const key = getContentKey(item);
        const { isUserFavorite, globalCount } = await getFavoriteState(key);
        favoriteStates[key] = isUserFavorite;
        favoriteCounts[key] = globalCount;
      }));
      
      setUserFavorites(favoriteStates);
      setGlobalFavoriteCounts(favoriteCounts);
      
      console.log(`✅ AllContent: Loaded ${mediaList.length} media items and stats for ${Object.keys(stats || {}).length} items`);
    };
    loadAllData();
  }, [mediaList.length]); // 🎯 Depend on actual media count

  const handleShare = async (key: string, item: any) => {
    console.log("🔄 Share button clicked for:", item.title);
    try {
      const result = await Share.share({
        title: item.title,
        message: `Check this out: ${item.title}\n${item.fileUrl}`,
        url: item.fileUrl,
      });

      if (result.action === Share.sharedAction) {
        console.log("✅ Share completed successfully");
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
      
      // ✅ Close modal after share action
      setModalVisible(null);
    } catch (err) {
      console.warn("❌ Share error:", err);
      // ✅ Close modal even if share failed
      setModalVisible(null);
    }
  };

  const handleSave = async (key: string, item: any) => {
    console.log("🔄 Save button clicked for:", item.title);
    
    const isSaved = contentStats[key]?.saved === 1;
    
    if (!isSaved) {
      // Save to library
      const libraryItem = {
        id: key,
        contentType: item.contentType || "content",
        fileUrl: item.fileUrl,
        title: item.title,
        speaker: item.speaker,
        uploadedBy: item.uploadedBy,
        description: item.description,
        createdAt: item.createdAt || new Date().toISOString(),
        speakerAvatar: item.speakerAvatar,
        views: contentStats[key]?.views || item.views || 0,
        sheared: contentStats[key]?.sheared || item.sheared || 0,
        favorite: contentStats[key]?.favorite || item.favorite || 0,
        comment: contentStats[key]?.comment || item.comment || 0,
        saved: 1,
        imageUrl: item.imageUrl,
        thumbnailUrl: item.contentType === "videos" 
          ? item.fileUrl.replace("/upload/", "/upload/so_1/") + ".jpg"
          : item.imageUrl || item.fileUrl,
        originalKey: key
      };
      
      await libraryStore.addToLibrary(libraryItem);
    } else {
      // Remove from library
      await libraryStore.removeFromLibrary(key);
    }
    
    setContentStats((prev) => {
      const updated = {
        ...prev,
        [key]: {
          ...prev[key],
          saved: isSaved ? 0 : 1,
        },
      };
      persistStats(updated);
      console.log(`✅ Save ${isSaved ? 'removed from' : 'added to'} library:`, item.title);
      return updated;
    });
    
    // ✅ Close modal after save action
    setModalVisible(null);
  };

  const handleFavorite = async (key: string, item: any) => {
    console.log(`🎯 Handling favorite for: ${item.title}`);
    
    try {
      // Toggle favorite using new system
      const { isUserFavorite, globalCount } = await toggleFavorite(key);
      
      // Update local state immediately for UI responsiveness
      setUserFavorites(prev => ({ ...prev, [key]: isUserFavorite }));
      setGlobalFavoriteCounts(prev => ({ ...prev, [key]: globalCount }));
      
      console.log(`✅ Favorite ${isUserFavorite ? 'added' : 'removed'} for ${item.title}. Global count: ${globalCount}`);
    } catch (error) {
      console.error(`❌ Failed to toggle favorite for ${item.title}:`, error);
    }
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

    // ✅ Increment view count in stats
    setContentStats((prev) => {
      const updated = {
        ...prev,
        [key]: {
          ...prev[key],
          views: (prev[key]?.views || 0) + 1,
          sheared: prev[key]?.sheared || item.sheared || 0,
          favorite: prev[key]?.favorite || item.favorite || 0,
          saved: prev[key]?.saved || item.saved || 0,
          comment: prev[key]?.comment || item.comment || 0,
        },
      };
      persistStats(updated);
      return updated;
    });
  };

  const renderVideoCard = (video: MediaItem, index: number) => {
    const modalKey = `video-${video._id || index}`;
    const progress = progresses[modalKey] ?? 0;
    const key = getContentKey(video);
    const stats = contentStats[key] || {};
  
    return (
      <View key={modalKey} className="flex flex-col mb-10">
        <TouchableWithoutFeedback onPress={() => handleVideoTap(modalKey, video)}>
          <View className="w-full h-[400px] overflow-hidden relative">
            <Video
              ref={(ref) => {
                if (ref) {
                  videoRefs.current[modalKey] = ref;
                } else {
                  // Clean up ref when component unmounts
                  delete videoRefs.current[modalKey];
                }
              }}
              source={{ uri: video.fileUrl }}
              style={{ width: "100%", height: "100%", position: "absolute" }}
              resizeMode={ResizeMode.COVER}
              isMuted={mutedVideos[modalKey] ?? false}
              volume={mutedVideos[modalKey] ? 0.0 : videoVolume} // 🔊 Add volume control
              shouldPlay={playingVideos[modalKey] ?? false}
              useNativeControls={false}
              onPlaybackStatusUpdate={(status) => {
                if (!status.isLoaded) return;
                const pct = status.durationMillis
                  ? (status.positionMillis / status.durationMillis) * 100
                  : 0;
                globalVideoStore.setVideoProgress(modalKey, pct);
                const ref = videoRefs.current[modalKey];
                if (status.didJustFinish) {
                  // ✅ Only increment view count when video completes and hasn't been counted yet
                  const contentKey = getContentKey(video);
                  if (!viewCounted[modalKey]) {
                    incrementView(contentKey, video);
                    setViewCounted((prev) => ({ ...prev, [modalKey]: true }));
                    console.log(`✅ Video completed, view counted for: ${video.title}`);
                  }
                  
                  ref?.setPositionAsync(0);
                  globalVideoStore.pauseVideo(modalKey);
                  globalVideoStore.setVideoCompleted(modalKey, true);
                }
              }}
            />
            <View className="flex-col absolute mt-[170px] ml-[360px]">
              <TouchableOpacity onPress={() => handleFavorite(key, video)} className="flex-col justify-center items-center">
                <MaterialIcons
                  name={userFavorites[key] ? "favorite" : "favorite-border"}
                  size={30}
                  color={userFavorites[key] ? "#D22A2A" : "#FFFFFF"}
                />
                <Text className="text-[10px] text-white font-rubik-semibold">
                  {globalFavoriteCounts[key] || 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-col justify-center items-center mt-6">
                <Ionicons name="chatbubble-sharp" size={30} color="white" />
                <Text className="text-[10px] text-white font-rubik-semibold">
                  {stats.comment === 1 ? (video.comment ?? 0) + 1 : video.comment ?? 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSave(key, video)} className="flex-col justify-center items-center mt-6">
                <MaterialIcons
                  name={stats.saved === 1 ? "bookmark" : "bookmark-border"}
                  size={30}
                  color={stats.saved === 1 ? "#FEA74E" : "#FFFFFF"}
                />
                <Text className="text-[10px] text-white font-rubik-semibold">
                  {stats.saved === 1 ? (video.saved ?? 0) + 1 : video.saved ?? 0}
                </Text>
              </TouchableOpacity>
            </View>
            {/* ✅ Centered Play Button (like VideoComponent) */}
            {!playingVideos[modalKey] && showOverlay[modalKey] && (
              <View className="absolute inset-0 justify-center items-center">
                <TouchableOpacity onPress={() => togglePlay(modalKey, video)}>
                  <View className="bg-white/70 p-3 rounded-full">
                    <Ionicons name="play" size={32} color="#FEA74E" />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            
            {/* Video Title */}
            {!playingVideos[modalKey] && showOverlay[modalKey] && (
              <View className="absolute bottom-9 left-3 right-3 px-4 py-2 rounded-md">
                <Text className="text-white font-semibold text-[14px]" numberOfLines={2}>
                  {video.title}
                </Text>
              </View>
            )}
            
            {/* Bottom Controls (Progress bar and Mute button only) */}
            {!playingVideos[modalKey] && showOverlay[modalKey] && (
              <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2 px-3">
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
                  typeof video.speakerAvatar === "string" && video.speakerAvatar.startsWith("http")
                    ? { uri: video.speakerAvatar.trim() }
                    : typeof video.speakerAvatar === "object" && video.speakerAvatar
                    ? video.speakerAvatar
                    : require("../../assets/images/Avatar-1.png")
                }
                style={{ width: 30, height: 30, borderRadius: 999 }}
                resizeMode="cover"
              />
            </View>
            <View className="ml-3">
              <View className="flex-row items-center">
                <Text className="ml-1 text-[13px] font-rubik-semibold text-[#344054] mt-1">
                  {getDisplayName(video.speaker, video.uploadedBy)}
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
                  <AntDesign name="eyeo" size={24} color="#98A2B3" />
                  <Text className="text-[10px] text-gray-500 ml-1 mt-1 font-rubik">
                    {stats.views ?? video.views ?? 0}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleShare(key, video)} className="flex-row items-center ml-4">
                  <Feather name="send" size={24} color="#98A2B3" />
                  <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                    {stats.sheared ?? video.sheared ?? 0}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(modalVisible === modalKey ? null : modalKey)}
            className="mr-2"
          >
            <Ionicons name="ellipsis-vertical" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        
        {/* ✅ Modal with touch-outside-to-close functionality */}
        {modalVisible === modalKey && (
          <>
            {/* ✅ Full-screen overlay to close modal when touching outside */}
            <TouchableWithoutFeedback onPress={() => setModalVisible(null)}>
              <View className="absolute inset-0 z-40" />
            </TouchableWithoutFeedback>
            
            {/* ✅ Modal content - removed TouchableWithoutFeedback to allow button interactions */}
            <View className="absolute bottom-24 right-16 bg-white shadow-md rounded-lg p-3 z-50 w-[170px] h-[140]">
              <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                <Text className="text-[#1D2939] font-rubik ml-2">View Details</Text>
                <Ionicons name="eye-outline" size={22} color="#1D2939" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare(modalKey, video)}
                className="py-2 border-b border-gray-200 flex-row items-center justify-between"
              >
                <Text className="text-[#1D2939] font-rubik ml-2">Share</Text>
                <Feather name="send" size={22} color="#1D2939" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center justify-between mt-6" onPress={() => handleSave(modalKey, video)}>
                <Text className="text-[#1D2939] font-rubik ml-2">Save to Library</Text>
                <MaterialIcons
                  name={stats.saved === 1 ? "bookmark" : "bookmark-border"}
                  size={22}
                  color={stats.saved === 1 ? "#1D2939" : "#1D2939"}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <ScrollView className="flex-1">
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
            <View key={item._id || Math.random().toString(36).substring(2)} className="mb-6 px-4">
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/reels/Reelsviewscroll",
                    params: {
                      title: item.title,
                      speaker: item.description || "Unknown",
                      timeAgo: getTimeAgo(item.createdAt),
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
                <Text className="text-sm text-gray-500">{item.description || "No description"}</Text>
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