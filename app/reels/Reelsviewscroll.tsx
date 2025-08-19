import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Audio, ResizeMode, Video } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
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

import BottomNav from "../components/BottomNav";
import { useGlobalVideoStore } from "../store/useGlobalVideoStore";
import { useLibraryStore } from "../store/useLibraryStore";
import allMediaAPI from "../utils/allMediaAPI";
import {
    getFavoriteState,
    getPersistedStats,
    persistStats,
    toggleFavorite,
} from "../utils/persistentStorage";

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
  videoList?: string; // JSON string of video array
  currentIndex?: string; // Current video index in the list
};

export default function Reelsviewscroll() {
  const videoRefs = useRef<Record<string, Video>>({});

  // Global video store for video management
  const globalVideoStore = useGlobalVideoStore();

  // Get video states from global store
  const playingVideos = globalVideoStore.playingVideos;
  const mutedVideos = globalVideoStore.mutedVideos;
  const videoVolume = 1.0;

  // State for interaction functionality
  const [userFavorites, setUserFavorites] = useState<Record<string, boolean>>(
    {}
  );
  const [globalFavoriteCounts, setGlobalFavoriteCounts] = useState<
    Record<string, number>
  >({});
  const [videoStats, setVideoStats] = useState<Record<string, any>>({});
  
  // Video progress and duration state
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [videoPosition, setVideoPosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Use library store for saving content
  const libraryStore = useLibraryStore();

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
    videoList,
    currentIndex = "0",
  } = useLocalSearchParams() as Params;

  const live = isLive === "true";
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  // 🔁 Helper: try to refresh stale media URL from backend
  const tryRefreshMediaUrl = async (item: any): Promise<string | null> => {
    try {
      const response = await allMediaAPI.getAllMedia({
        search: item.title,
        contentType: (item.contentType as any),
        limit: 1,
      });
      const fresh = (response as any)?.media?.[0];
      if (fresh?.fileUrl) {
        return fresh.fileUrl as string;
      }
    } catch (e) {
      console.log("🔁 Refresh media URL failed in reels:", e);
    }
    return null;
  };

  // Parse video list and current index for TikTok-style navigation
  const parsedVideoList = videoList ? JSON.parse(videoList) : [];
  const currentVideoIndex = parseInt(currentIndex);
  const [currentIndex_state, setCurrentIndex_state] = useState(currentVideoIndex);
  const lastIndexRef = useRef<number>(currentVideoIndex);
  
  // Animation and scroll state
  const screenHeight = Dimensions.get('window').height;

  // Debug logging
  useEffect(() => {
    console.log(`🎬 ReelsViewScroll loaded with:`);
    console.log(`   - Video list length: ${parsedVideoList.length}`);
    console.log(`   - Current index: ${currentIndex_state}`);
    console.log(`   - VideoList param exists: ${!!videoList}`);
    if (parsedVideoList.length > 0) {
      console.log(`   - First video: ${parsedVideoList[0]?.title}`);
      console.log(`   - Current video: ${parsedVideoList[currentIndex_state]?.title}`);
    }
  }, []);

  // Get current video from the list or use passed parameters
  const currentVideo = parsedVideoList.length > 0 && currentIndex_state < parsedVideoList.length 
    ? parsedVideoList[currentIndex_state] 
    : {
        title,
        speaker,
        timeAgo,
        views: parseInt(views) || 0,
        sheared: parseInt(sheared) || 0,
        saved: parseInt(saved) || 0,
        favorite: parseInt(favorite) || 0,
        imageUrl,
        speakerAvatar,
        fileUrl: imageUrl,
      };

  // Create a unique key for this reel content
  const reelKey = `reel-${currentVideo.title}-${currentVideo.speaker}`;
  const modalKey = reelKey;

  // Create video object for consistency with VideoComponent pattern
  const video = {
    fileUrl: currentVideo.fileUrl || currentVideo.imageUrl || imageUrl,
    title: currentVideo.title,
    speaker: currentVideo.speaker,
    timeAgo: currentVideo.timeAgo,
    speakerAvatar: currentVideo.speakerAvatar,
    favorite: currentVideo.favorite || 0,
    views: currentVideo.views || 0,
    saved: currentVideo.saved || 0,
    sheared: currentVideo.sheared || 0,
    comment: 0,
  };

  // Initialize state on component mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Load persisted data for this specific reel
        const stats = await getPersistedStats();
        setVideoStats(stats);

        // Load user favorite state
        const { isUserFavorite, globalCount } = await getFavoriteState(modalKey);
        setUserFavorites((prev) => ({ ...prev, [modalKey]: isUserFavorite }));
        setGlobalFavoriteCounts((prev) => ({ ...prev, [modalKey]: globalCount }));

        console.log(`✅ ReelsView: Loaded stats for ${title} - favorite: ${globalCount}`);
      } catch (error) {
        console.error("❌ ReelsView: Failed to load persisted data:", error);
      }
    };

    initializeData();
  }, [modalKey, title]);

  const handleFavorite = async (key: string) => {
    console.log("🔄 Favorite button clicked for reel:", title);

    try {
      // Toggle user's favorite state using the utility function
      const result = await toggleFavorite(key);

      // Update local state  
      setUserFavorites((prev) => ({ ...prev, [key]: result.isUserFavorite }));
      setGlobalFavoriteCounts((prev) => ({ ...prev, [key]: result.globalCount }));

      console.log(`✅ Favorite updated for ${title}: user=${result.isUserFavorite}, global=${result.globalCount}`);
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

  const handleComment = async (key: string) => {
    console.log("🔄 Comment button clicked for reel:", title);

    const currentStats = videoStats[key] || {};
    const newCommentCount = (currentStats.comment || video.comment || 0) + 1;

    // Update stats
    setVideoStats((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        comment: newCommentCount,
      },
    }));

    // Persist the stats
    const updatedStats = { ...currentStats, comment: newCommentCount };
    // Get all current stats and update this specific key
    const getAllStats = async () => {
      const allStats = await getPersistedStats();
      allStats[key] = updatedStats;
      persistStats(allStats);
    };
    getAllStats();

    console.log(`💬 Comment toggled for reel: ${title}`);
  };

  const handleSave = async (key: string) => {
    console.log("🔄 Save button clicked for reel:", title);

    try {
      // Check current user-specific save state from library store
      const isCurrentlyUserSaved = libraryStore.isItemSaved(key);

      if (isCurrentlyUserSaved) {
        // Remove from library
        libraryStore.removeFromLibrary(key);
        console.log(`❌ Removed from library: ${title}`);
      } else {
        // Create a LibraryItem object to save
        const reelToSave = {
          id: key,
          title,
          speaker,
          timeAgo,
          contentType: "Reel" as const,
          fileUrl: imageUrl, // Using imageUrl as the content URL for reels
          thumbnailUrl: imageUrl,
          originalKey: key,
          createdAt: new Date().toISOString(),
        };

        // Add to library
        libraryStore.addToLibrary(reelToSave);
        console.log(`✅ Added to library: ${title}`);
      }
    } catch (error) {
      console.error("Error handling save:", error);
    }
  };

  const handleShare = async (key: string) => {
    console.log("📤 Share button clicked for reel:", title);

    try {
      const shareOptions = {
        title: currentVideo.title,
        message: `Check out this video: ${currentVideo.title}`,
        url: currentVideo.fileUrl || currentVideo.imageUrl || imageUrl,
      };

      const result = await Share.share(shareOptions);

      // Only record if user actually shared
      if (result.action === Share.sharedAction) {
        const currentStats = videoStats[key] || {};
        const newSharedCount = (currentStats.sheared || parseInt(sheared) || 0) + 1;

        setVideoStats((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            sheared: newSharedCount,
          },
        }));

        const updatedStats = { ...currentStats, sheared: newSharedCount };
        const allStats = await getPersistedStats();
        allStats[key] = updatedStats;
        persistStats(allStats);
        console.log(`✅ Share count updated for ${title}: ${newSharedCount}`);
      }

      // Close any open menu after sharing
      setMenuVisible(false);
    } catch (error) {
      console.error("Error handling share:", error);
      setMenuVisible(false);
    }
  };

  // Toggle video play/pause when tapped
  const toggleVideoPlay = () => {
    const isCurrentlyPlaying = playingVideos[modalKey] ?? false;

    if (isCurrentlyPlaying) {
      globalVideoStore.pauseVideo(modalKey);
    } else {
      globalVideoStore.playVideoGlobally(modalKey);
    }
  };

  // Video seeking function
  const seekToPosition = async (position: number) => {
    const ref = videoRefs.current[modalKey];
    if (ref && videoDuration > 0) {
      const seekTime = (position / 100) * videoDuration;
      await ref.setPositionAsync(seekTime);
      setVideoPosition(seekTime);
    }
  };

  // Progress bar dimensions and calculations
  const screenWidth = Dimensions.get('window').width;
  const progressBarWidth = screenWidth - 32; // Account for margins
  const progressPercentage = videoDuration > 0 ? (videoPosition / videoDuration) * 100 : 0;

  // Pan responder for draggable progress bar
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      setIsDragging(true);
      // Calculate initial position based on touch location
      const touchX = evt.nativeEvent.locationX;
      const newProgress = Math.max(0, Math.min(100, (touchX / progressBarWidth) * 100));
      seekToPosition(newProgress);
    },
    onPanResponderMove: (evt, gestureState) => {
      // Use absolute position instead of relative movement
      const touchX = evt.nativeEvent.locationX;
      const newProgress = Math.max(0, Math.min(100, (touchX / progressBarWidth) * 100));
      seekToPosition(newProgress);
    },
    onPanResponderRelease: () => {
      setIsDragging(false);
    },
  });

  // Toggle mute function
  const toggleMute = (key: string) => {
    globalVideoStore.toggleVideoMute(key);
  };

  // Initialize video audio on mount
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        console.log("✅ ReelsView: Audio session configured");
      } catch (error) {
        console.error(
          "❌ ReelsView: Failed to initialize audio session:",
          error
        );
      }
    };

    initializeAudio();
  }, []);

  // Auto-play or switch play target immediately when the active key changes
  useEffect(() => {
    // Reset progress state for new video
    setVideoDuration(0);
    setVideoPosition(0);
    // Ensure only the active video plays
    globalVideoStore.pauseAllVideos();
    globalVideoStore.playVideoGlobally(modalKey);
    // Close action menu when switching videos
    setMenuVisible(false);
  }, [modalKey]);

  // Function to render a single video item
  const renderVideoItem = (videoData: any, index: number, isActive: boolean = false) => {
    const videoKey = `reel-${videoData.title}-${videoData.speaker}-${index}`;
    const [refreshedUrl, setRefreshedUrl] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // 🔁 Refresh URL on mount if needed
    useEffect(() => {
      const refreshIfNeeded = async () => {
        if (!videoData.fileUrl || String(videoData.fileUrl).trim() === "") {
          setIsRefreshing(true);
          const fresh = await tryRefreshMediaUrl(videoData);
          setRefreshedUrl(fresh);
          setIsRefreshing(false);
        }
      };
      refreshIfNeeded();
    }, [videoData.fileUrl]);

    const videoUrl = refreshedUrl || videoData.fileUrl || videoData.imageUrl;
    
    return (
      <View key={videoKey} style={{ height: screenHeight, width: '100%' }}>
        <TouchableWithoutFeedback 
          onPress={() => {
            if (isActive) {
              console.log("🎬 Video tap detected");
              toggleVideoPlay();
            }
          }}
          onLongPress={() => console.log("🎬 Long press detected")}
        >
          <View 
            className="w-full h-full"
            onTouchStart={(e) => isActive && console.log("🎬 Touch start at:", e.nativeEvent.pageY)}
            onTouchEnd={(e) => isActive && console.log("🎬 Touch end at:", e.nativeEvent.pageY)}
          >
            <Video
              ref={(ref) => {
                if (ref && isActive) videoRefs.current[modalKey] = ref;
              }}
              source={{ uri: videoUrl }}
              style={{ width: "100%", height: "100%", position: "absolute" }}
              resizeMode={ResizeMode.COVER}
              isMuted={mutedVideos[modalKey] ?? false}
              volume={mutedVideos[modalKey] ? 0.0 : videoVolume}
              shouldPlay={isActive && (playingVideos[modalKey] ?? false)}
              useNativeControls={false}
              isLooping={true}
              onError={async (error) => {
                console.log(`❌ Video loading error in reels for ${videoData.title}:`, error);
                // Try to refresh URL on error
                if (!refreshedUrl) {
                  setIsRefreshing(true);
                  const fresh = await tryRefreshMediaUrl(videoData);
                  setRefreshedUrl(fresh);
                  setIsRefreshing(false);
                }
              }}
              onPlaybackStatusUpdate={(status) => {
                if (!isActive || !status.isLoaded) return;
                
                // Update duration when first loaded
                if (status.durationMillis && videoDuration === 0) {
                  setVideoDuration(status.durationMillis);
                }
                
                // Update position only if not dragging
                if (!isDragging && status.positionMillis) {
                  setVideoPosition(status.positionMillis);
                }
                
                const pct = status.durationMillis
                  ? (status.positionMillis / status.durationMillis) * 100
                  : 0;
                globalVideoStore.setVideoProgress(modalKey, pct);
                const ref = videoRefs.current[modalKey];
                if (status.didJustFinish) {
                  ref?.setPositionAsync(0);
                  globalVideoStore.pauseVideo(modalKey);
                }
              }}
            />

            {/* Auto-play indicator removed per request */}

            {/* Play/Pause Overlay */}
            {isActive && !playingVideos[modalKey] && (
              <View className="absolute inset-0 justify-center items-center">
                <View className="bg-white/20 p-4 rounded-full">
                  <MaterialIcons name="play-arrow" size={60} color="#FFFFFF" />
                </View>
              </View>
            )}

            {/* Only show UI elements for active video */}
            {isActive && (
              <>
                {/* Action Buttons */}
                <View className="flex-col absolute top-[370px] right-6">
                  <TouchableOpacity
                    onPress={() => handleFavorite(modalKey)}
                    className="flex-col justify-center items-center"
                  >
                    <MaterialIcons
                      name={userFavorites[modalKey] ? "favorite" : "favorite-border"}
                      size={35}
                      color={userFavorites[modalKey] ? "#D22A2A" : "#FFFFFF"}
                    />
                    <Text className="text-[10px] text-white font-rubik-semibold">
                      {globalFavoriteCounts[modalKey] || video.favorite || 0}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleComment(modalKey)}
                    className="flex-col justify-center items-center mt-6"
                  >
                    <Ionicons name="chatbubble-sharp" size={35} color="white" />
                    <Text className="text-[10px] text-white font-rubik-semibold">
                      {videoStats[modalKey]?.comment === 1
                        ? (video.comment ?? 0) + 1
                        : video.comment ?? 0}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleSave(modalKey)}
                    className="flex-col justify-center items-center mt-6"
                  >
                    <MaterialIcons
                      name={libraryStore.isItemSaved(modalKey) ? "bookmark" : "bookmark-border"}
                      size={35}
                      color={libraryStore.isItemSaved(modalKey) ? "#FEA74E" : "#FFFFFF"}
                    />
                    <Text className="text-[10px] text-white font-rubik-semibold">
                      {videoStats[modalKey]?.totalSaves || video.saved || 0}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleShare(modalKey)}
                    className="flex-col justify-center items-center mt-6"
                  >
                    <Feather name="send" size={35} color="white" />
                    <Text className="text-[10px] text-white font-rubik-semibold">
                      {videoStats[modalKey]?.sheared || video.sheared || 0}
                    </Text>
                  </TouchableOpacity>

                 
                </View>

                {/* Speaker Info Section */}
                <View className="absolute top-[722px] left-3 right-3 flex-row items-center p-3 rounded-lg">
                  <View className="w-[40px] h-[40px] rounded-full bg-gray-200 items-center justify-center">
                    <Image
                      source={
                        typeof videoData.speakerAvatar === "string" &&
                        videoData.speakerAvatar.startsWith("http")
                          ? { uri: videoData.speakerAvatar.trim() }
                          : typeof videoData.speakerAvatar === "object" && videoData.speakerAvatar
                          ? videoData.speakerAvatar
                          : require("../../assets/images/Avatar-1.png")
                      }
                      style={{ width: 30, height: 30, borderRadius: 15 }}
                      resizeMode="cover"
                    />
                  </View>

                  <View className="flex-row items-center justify-between w-[320px]">
                    <View className="flex-row items-center ml-3">
                      <Text className="text-white text-[14px] font-rubik-semibold">
                        {videoData.speaker || "No Speaker"}
                      </Text>
                      <Text className="text-[#D0D5DD] text-[10px] font-rubik-semibold ml-2">
                        {videoData.timeAgo || "No Time"}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => setMenuVisible((v) => !v)}
                      className="w-[40px] h-[40px] rounded-full bg-white items-center justify-center"
                    >
                      <Ionicons name="ellipsis-vertical" size={18} color="#3A3E50" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Action Menu - exactly like big video card */}
                {menuVisible && (
                  <>
                    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
                      <View className="absolute inset-0 z-10" />
                    </TouchableWithoutFeedback>

                    <View className="absolute bottom-32 right-16 bg-white shadow-md rounded-lg p-3 z-20 w-[200px] h-[180]">
                      <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                        <Text className="text-[#1D2939] font-rubik ml-2">View Details</Text>
                        <Ionicons name="eye-outline" size={22} color="#1D2939" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleShare(modalKey)}
                        className="py-2 border-b border-gray-200 flex-row items-center justify-between"
                      >
                        <Text className="text-[#1D2939] font-rubik ml-2">Share</Text>
                        <Feather name="send" size={22} color="#1D2939" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="flex-row items-center justify-between mt-6"
                        onPress={() => {
                          handleSave(modalKey);
                          setMenuVisible(false);
                        }}
                      >
                        <Text className="text-[#1D2939] font-rubik ml-2">{libraryStore.isItemSaved(modalKey) ? "Remove from Library" : "Save to Library"}</Text>
                        <MaterialIcons
                          name={libraryStore.isItemSaved(modalKey) ? "bookmark" : "bookmark-border"}
                          size={22}
                          color="#1D2939"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity className="py-2 flex-row items-center justify-between border-t border-gray-200 mt-2">
                        <Text className="text-[#1D2939] font-rubik ml-2">Download</Text>
                        <Ionicons name="download-outline" size={24} color="#090E24" />
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {/* Draggable Progress Bar */}
                <View className="absolute top-[790px] left-4 right-4">
                  <View 
                    {...panResponder.panHandlers}
                    className="py-3"
                    style={{ marginTop: -12, marginBottom: -12 }}
                  >
                    <View className="h-1 bg-white rounded-full relative">
                      <View 
                        className="h-full bg-[#FEA74E] rounded-full" 
                        style={{ width: `${progressPercentage}%` }} 
                      />
                      
                      <View
                        className="absolute top-[-4px] w-3 h-3 bg-[#FFFFFF] rounded-full border-2 border-white"
                        style={{ 
                          left: `${Math.max(0, Math.min(progressPercentage, 100))}%`,
                          transform: [{ translateX: -6 }],
                        }}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  // Create array of all videos for smooth scrolling
  const allVideos = parsedVideoList.length > 0 ? parsedVideoList : [currentVideo];
  const scrollViewRef = useRef<ScrollView>(null);

  // Handle scroll-based navigation (update active index immediately while scrolling)
  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.y / screenHeight);
    if (index !== lastIndexRef.current && index >= 0 && index < allVideos.length) {
      lastIndexRef.current = index;
      setCurrentIndex_state(index);
      console.log(`🎬 Active index while scrolling: ${index}: ${allVideos[index]?.title}`);
    }
  };

  // Initialize scroll position when component mounts
  useEffect(() => {
    if (scrollViewRef.current && parsedVideoList.length > 0) {
      const initialOffset = currentIndex_state * screenHeight;
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: initialOffset,
          animated: false,
        });
      }, 100);
    }
  }, []);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={screenHeight}
        decelerationRate="fast"
        bounces={false}
      >
        {allVideos.map((videoData: { title: any; speaker: any; }, index: number) => {
          const isActive = index === currentIndex_state;
          const videoKey = `reel-${videoData.title}-${videoData.speaker || 'unknown'}-${index}`;
          
          return (
            <View key={videoKey} style={{ height: screenHeight, width: '100%' }}>
              {renderVideoItem(videoData, index, isActive)}
            </View>
          );
        })}
      </ScrollView>

      {/* Fixed overlays that stay on top */}
      {/* Live Header */}
      <View className="absolute flex-row items-center justify-between w-[400px] top-10 h-[30px] mt-4 z-50">
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
            <Text className="text-white ml-2 text-xs font-bold">
              {allVideos[currentIndex_state]?.timeAgo || timeAgo}
            </Text>
          </View>
        )}

        <Text className="text-white font-rubik-semibold ml-[160px]">
          Live
        </Text>

        <TouchableOpacity
          className="absolute ml-[300px]"
          onPress={() => {
            if (router.canGoBack?.()) {
              router.back();
            } else {
              router.replace({
                pathname: "/categories/Allcontent",
                params: {
                  defaultCategory: category,
                },
              });
            }
          }}
        >
          <MaterialIcons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Fixed overlays for current video */}
      <View className="absolute top-[670px] left-4 right-4 pointer-events-none z-40">
        <Text className="text-white text-[20px] font-rubik-bold">
          {allVideos[currentIndex_state]?.title || currentVideo.title}
        </Text>
      </View>

     
    

      {/* Navigation indicators */}
      {parsedVideoList.length > 1 && (
        <>
          {/* Video counter */}
          <View className="absolute top-16 left-4 bg-black/50 rounded-full px-3 py-1 pointer-events-none z-50">
            <Text className="text-white text-xs">
              {currentIndex_state + 1} / {parsedVideoList.length}
            </Text>
          </View>
        </>
      )}

      {/* Bottom Nav - Outside main container for proper absolute positioning */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "transparent",
          pointerEvents: "box-none", // Allow touch events to pass through to children
        }}
      >
        <BottomNav
          selectedTab={activeTab}
          setSelectedTab={(tab) => {
            setActiveTab(tab);
            switch (tab) {
              case "Home":
                router.replace({ pathname: "/categories/HomeScreen" });
                break;
              case "Community":
                router.replace({ pathname: "/screens/CommunityScreen" });
                break;
              case "Library":
                router.replace({ pathname: "/screens/library/LibraryScreen" });
                break;
              case "Account":
                router.replace({ pathname: "/screens/AccountScreen" });
                break;
              default:
                break;
            }
          }}
        />
      </View>
    </>
  );
}