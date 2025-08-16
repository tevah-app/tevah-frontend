import { AntDesign, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Audio, ResizeMode, Video } from "expo-av";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import useVideoViewport from "../hooks/useVideoViewport";
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
  
  // 📱 Viewport detection for auto-play
  const { calculateVideoVisibility } = useVideoViewport();

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

  // 🎵 Music items (audio with thumbnails)
  const allMusic = useMemo(() => 
    mediaList.filter((item) => item.contentType === "music"), 
    [mediaList]
  );

  // 🕘 Most Recent item (videos or music) to appear on top
  const mostRecentItem = useMemo(() => {
    const candidates = [...allVideos, ...allMusic];
    if (candidates.length === 0) return null as MediaItem | null;
    const sorted = [...candidates].sort((a, b) => {
      const ad = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bd = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bd - ad;
    });
    return sorted[0] || null;
  }, [allVideos, allMusic]);

  const recentId = mostRecentItem?._id;
  const videosExcludingRecent = useMemo(() => 
    recentId ? allVideos.filter(v => v._id !== recentId) : allVideos,
    [allVideos, recentId]
  );
  const musicExcludingRecent = useMemo(() => 
    recentId ? allMusic.filter(m => m._id !== recentId) : allMusic,
    [allMusic, recentId]
  );

  // 🎵 Audio playback state for Music items
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [soundMap, setSoundMap] = useState<Record<string, Audio.Sound>>({});
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [pausedAudioMap, setPausedAudioMap] = useState<Record<string, number>>({});
  const [audioProgressMap, setAudioProgressMap] = useState<Record<string, number>>({}); // 0..1
  const [audioDurationMap, setAudioDurationMap] = useState<Record<string, number>>({});
  const [audioMuteMap, setAudioMuteMap] = useState<Record<string, boolean>>({});

  const playAudio = async (uri: string, id: string) => {
    if (!uri) return;
    if (isLoadingAudio) return;
    setIsLoadingAudio(true);
    try {
      // Pause currently playing if different
      if (playingAudioId && playingAudioId !== id && soundMap[playingAudioId]) {
        try {
          await soundMap[playingAudioId].pauseAsync();
          const status = await soundMap[playingAudioId].getStatusAsync();
          if (status.isLoaded) {
            setPausedAudioMap((prev) => ({ ...prev, [playingAudioId]: status.positionMillis ?? 0 }));
          }
        } catch {}
      }

      const existing = soundMap[id];
      if (existing) {
        const status = await existing.getStatusAsync();
        if (status.isLoaded) {
          if (status.isPlaying) {
            const pos = status.positionMillis ?? 0;
            await existing.pauseAsync();
            setPausedAudioMap((prev) => ({ ...prev, [id]: pos }));
            setPlayingAudioId(null);
          } else {
            const resumePos = pausedAudioMap[id] ?? 0;
            await existing.playFromPositionAsync(resumePos);
            setPlayingAudioId(id);

            let duration = audioDurationMap[id];
            if (!duration) {
              const updated = await existing.getStatusAsync();
              if (updated.isLoaded && updated.durationMillis) {
                duration = updated.durationMillis;
                setAudioDurationMap((prev) => ({ ...prev, [id]: duration! }));
              }
            }
            setAudioProgressMap((prev) => ({ ...prev, [id]: (resumePos || 0) / Math.max(duration || 1, 1) }));
          }
          setIsLoadingAudio(false);
          return;
        } else {
          setSoundMap((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
          });
        }
      }

      const resumePos = pausedAudioMap[id] ?? 0;
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        {
          shouldPlay: true,
          isMuted: audioMuteMap[id] ?? false,
          positionMillis: resumePos,
        }
      );
      setSoundMap((prev) => ({ ...prev, [id]: sound }));
      setPlayingAudioId(id);

      const initial = await sound.getStatusAsync();
      if (initial.isLoaded && typeof initial.durationMillis === 'number') {
        const safeDur = initial.durationMillis || 1;
        setAudioDurationMap((prev) => ({ ...prev, [id]: safeDur }));
        setAudioProgressMap((prev) => ({ ...prev, [id]: (resumePos || 0) / safeDur }));
      }

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (!status.isLoaded || typeof status.durationMillis !== 'number') return;
        const safeDur = status.durationMillis || 1;
        setAudioProgressMap((prev) => ({ ...prev, [id]: (status.positionMillis || 0) / safeDur }));
        setAudioDurationMap((prev) => ({ ...prev, [id]: safeDur }));
        if (status.didJustFinish) {
          try { await sound.unloadAsync(); } catch {}
          setSoundMap((prev) => { const u = { ...prev }; delete u[id]; return u; });
          setPlayingAudioId((curr) => (curr === id ? null : curr));
          setPausedAudioMap((prev) => ({ ...prev, [id]: 0 }));
          setAudioProgressMap((prev) => ({ ...prev, [id]: 0 }));
        }
      });
    } catch (err) {
      console.error('❌ Audio playback error:', err);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const pauseAllAudio = useCallback(async () => {
    try {
      const ids = Object.keys(soundMap);
      for (const id of ids) {
        const snd = soundMap[id];
        if (snd) {
          try { await snd.pauseAsync(); } catch {}
        }
      }
      setPlayingAudioId(null);
    } catch {}
  }, [soundMap]);

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
  
  // 📱 Scroll-based auto-play state
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentlyVisibleVideo, setCurrentlyVisibleVideo] = useState<string | null>(null);
  const contentLayoutsRef = useRef<Record<string, { y: number; height: number; type: 'video' | 'music'; uri?: string }>>({});
  const lastScrollYRef = useRef<number>(0);
  
  // ✅ Get video state from global store
  const playingVideos = globalVideoStore.playingVideos;
  const mutedVideos = globalVideoStore.mutedVideos;
  const progresses = globalVideoStore.progresses;
  const showOverlay = globalVideoStore.showOverlay;
  const hasCompleted = globalVideoStore.hasCompleted;
  const isAutoPlayEnabled = globalVideoStore.isAutoPlayEnabled;
  const handleVideoVisibilityChange = globalVideoStore.handleVideoVisibilityChange;
  // Note: Using contentStats for all statistics instead of separate videoStats

  const toggleMute = (key: string) =>
    globalVideoStore.toggleVideoMute(key);

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

  const handleVideoTap = (key: string, video?: MediaItem, index?: number) => {
    // Navigate to reels view with the video list for swipeable navigation
    if (video && index !== undefined) {
      console.log(`📱 Video tapped to navigate to reels: ${video.title}`);
      
      // Pause all videos before navigation
      globalVideoStore.pauseAllVideos();
      setCurrentlyVisibleVideo(null);
      
      // Prepare the full video list for TikTok-style navigation
      const videoListForNavigation = allVideos.map((v, idx) => ({
        title: v.title,
        speaker: getDisplayName(v.speaker, v.uploadedBy),
        timeAgo: getTimeAgo(v.createdAt),
        views: contentStats[getContentKey(v)]?.views || v.views || 0,
        sheared: contentStats[getContentKey(v)]?.sheared || v.sheared || 0,
        saved: contentStats[getContentKey(v)]?.saved || v.saved || 0,
        favorite: globalFavoriteCounts[getContentKey(v)] || v.favorite || 0,
        fileUrl: v.fileUrl,
        imageUrl: v.fileUrl,
        speakerAvatar: typeof v.speakerAvatar === "string" 
          ? v.speakerAvatar 
          : v.speakerAvatar || require("../../assets/images/Avatar-1.png"),
        _id: v._id,
        contentType: v.contentType,
        description: v.description,
        createdAt: v.createdAt,
        uploadedBy: v.uploadedBy,
      }));

      router.push({
        pathname: "/reels/Reelsviewscroll",
        params: {
          title: video.title,
          speaker: getDisplayName(video.speaker, video.uploadedBy),
          timeAgo: getTimeAgo(video.createdAt),
          views: String(contentStats[getContentKey(video)]?.views || video.views || 0),
          sheared: String(contentStats[getContentKey(video)]?.sheared || video.sheared || 0),
          saved: String(contentStats[getContentKey(video)]?.saved || video.saved || 0),
          favorite: String(globalFavoriteCounts[getContentKey(video)] || video.favorite || 0),
          imageUrl: video.fileUrl,
          speakerAvatar: typeof video.speakerAvatar === "string" 
            ? video.speakerAvatar 
            : video.speakerAvatar || require("../../assets/images/Avatar-1.png").toString(),
          category: "videos",
          videoList: JSON.stringify(videoListForNavigation),
          currentIndex: String(index),
        },
      });
    }
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
          const key = `video-${video._id || video.fileUrl || index}`;
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
          const key = `video-${video._id || video.fileUrl || index}`;
          // Check if video is muted and unmute it
          if (globalVideoStore.mutedVideos[key]) {
            globalVideoStore.toggleVideoMute(key);
          }
        });
      }
    };
    
    initializeAudio();
  }, [allVideos]);

  useEffect(() => {
    allVideos.forEach((v, index) => {
      const key = `video-${v._id || v.fileUrl || index}`;
      // Initialize overlay visibility in global store if not set
      if (globalVideoStore.showOverlay[key] === undefined) {
        globalVideoStore.setOverlayVisible(key, true);
      }
    });
  }, [allVideos]);

  // 📱 Handle scroll events to detect video visibility
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isAutoPlayEnabled) return;

    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const screenHeight = layoutMeasurement.height;
    lastScrollYRef.current = scrollY;
    const viewportTop = scrollY;
    const viewportBottom = scrollY + screenHeight;

    let mostVisibleKey: string | null = null;
    let maxRatio = 0;

    Object.entries(contentLayoutsRef.current).forEach(([key, layout]) => {
      const itemTop = layout.y;
      const itemBottom = layout.y + layout.height;
      const intersectionTop = Math.max(viewportTop, itemTop);
      const intersectionBottom = Math.min(viewportBottom, itemBottom);
      const visibleHeight = Math.max(0, intersectionBottom - intersectionTop);
      const ratio = visibleHeight / Math.max(1, layout.height);
      if (ratio > maxRatio) {
        maxRatio = ratio;
        mostVisibleKey = key;
      }
    });

    // Require minimal visibility to avoid flicker at edges
    const selectedKey: string | null = maxRatio >= 0.15 ? mostVisibleKey : null;
    // Control playback across videos and music using recorded content types
    const entry = selectedKey ? contentLayoutsRef.current[selectedKey] : null;
    if (entry?.type === 'video') {
      // Pause any audio and play the visible video
      pauseAllAudio();
      // Auto-play disabled: do not trigger visibility-based video play
      // handleVideoVisibilityChange(selectedKey);
      setCurrentlyVisibleVideo(selectedKey);
    } else if (entry?.type === 'music') {
      // Pause all videos and play this audio
      globalVideoStore.pauseAllVideos();
      if (entry.uri && selectedKey) {
        playAudio(entry.uri, selectedKey);
      }
      // Auto-play disabled: do not affect global video visibility
      // handleVideoVisibilityChange(null);
      setCurrentlyVisibleVideo(null);
    } else {
      // Nothing clearly visible; pause all
      globalVideoStore.pauseAllVideos();
      pauseAllAudio();
      // Auto-play disabled: do not affect global video visibility
      // handleVideoVisibilityChange(null);
      setCurrentlyVisibleVideo(null);
    }
  }, [isAutoPlayEnabled, allVideos, handleVideoVisibilityChange]);

  const recomputeVisibilityFromLayouts = useCallback(() => {
    if (!isAutoPlayEnabled) return;
    const scrollY = lastScrollYRef.current;
    const screenHeight = Dimensions.get('window').height;
    const viewportTop = scrollY;
    const viewportBottom = scrollY + screenHeight;

    let mostVisibleKey: string | null = null;
    let maxRatio = 0;

    Object.entries(contentLayoutsRef.current).forEach(([key, layout]) => {
      const itemTop = layout.y;
      const itemBottom = layout.y + layout.height;
      const intersectionTop = Math.max(viewportTop, itemTop);
      const intersectionBottom = Math.min(viewportBottom, itemBottom);
      const visibleHeight = Math.max(0, intersectionBottom - intersectionTop);
      const ratio = visibleHeight / Math.max(1, layout.height);
      if (ratio > maxRatio) {
        maxRatio = ratio;
        mostVisibleKey = key;
      }
    });

    const selectedKey: string | null = maxRatio >= 0.15 ? mostVisibleKey : null;
    const entry = selectedKey ? contentLayoutsRef.current[selectedKey] : null;
    if (entry?.type === 'video') {
      pauseAllAudio();
      // Auto-play disabled: do not trigger visibility-based video play
      // handleVideoVisibilityChange(selectedKey);
      setCurrentlyVisibleVideo(selectedKey);
    } else if (entry?.type === 'music') {
      globalVideoStore.pauseAllVideos();
      if (entry.uri && selectedKey) {
        playAudio(entry.uri, selectedKey);
      }
      // Auto-play disabled: do not affect global video visibility
      // handleVideoVisibilityChange(null);
      setCurrentlyVisibleVideo(null);
    } else {
      globalVideoStore.pauseAllVideos();
      pauseAllAudio();
      // Auto-play disabled: do not affect global video visibility
      // handleVideoVisibilityChange(null);
      setCurrentlyVisibleVideo(null);
    }
  }, [isAutoPlayEnabled, allVideos, handleVideoVisibilityChange]);

  // 📱 Initialize auto-play after component mounts
  useEffect(() => {
    // Auto-play disabled globally; skip initial visibility computation
  }, [allVideos.length, isAutoPlayEnabled, recomputeVisibilityFromLayouts]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => sub.remove();
    }, [])
  );

  // 📱 Cleanup: Pause all videos when component loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        // Pause all videos when leaving the screen
        globalVideoStore.pauseAllVideos();
        globalVideoStore.handleVideoVisibilityChange(null);
        setCurrentlyVisibleVideo(null);
      };
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
    const modalKey = `video-${video._id || video.fileUrl || index}`;
    const progress = progresses[modalKey] ?? 0;
    const key = getContentKey(video);
    const stats = contentStats[key] || {};
  
    return (
      <View 
        key={modalKey} 
        className="flex flex-col mb-10"
        onLayout={(e) => {
          const { y, height } = e.nativeEvent.layout;
          contentLayoutsRef.current[modalKey] = { y, height, type: 'video' };
        }}
      >
        <TouchableWithoutFeedback onPress={() => {
          const isCurrentlyPlaying = playingVideos[modalKey] ?? false;
          if (isCurrentlyPlaying) {
            // If video is playing, pause it
            globalVideoStore.pauseVideo(modalKey);
            setCurrentlyVisibleVideo(null);
          } else {
            // If video is paused, navigate to reels
            handleVideoTap(modalKey, video, index);
          }
        }}>
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
            {/* ✅ Centered Play/Pause Button - always visible */}
            <View className="absolute inset-0 justify-center items-center">
              <TouchableOpacity onPress={() => handleVideoTap(modalKey, video, index)}>
                <View className={`${playingVideos[modalKey] ? 'bg-black/30' : 'bg-white/70'} p-3 rounded-full`}>
                  <Ionicons 
                    name={playingVideos[modalKey] ? "pause" : "play"} 
                    size={32} 
                    color={playingVideos[modalKey] ? "#FFFFFF" : "#FEA74E"} 
                  />
                </View>
              </TouchableOpacity>
            </View>
            
            {/* 📱 Auto-play indicator when this card is the active auto-playing video */}
            {playingVideos[modalKey] && currentlyVisibleVideo === modalKey && (
              <View className="absolute top-4 left-4">
                <View className="bg-black/50 px-2 py-1 rounded-full flex-row items-center">
                  <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  <Text className="text-white text-xs font-rubik">Auto-playing</Text>
                </View>
              </View>
            )}
            
            {/* Video Title - show when paused */}
            {!playingVideos[modalKey] && (
              <View className="absolute bottom-9 left-3 right-3 px-4 py-2 rounded-md">
                <Text className="text-white font-semibold text-[14px]" numberOfLines={2}>
                  {video.title}
                </Text>
              </View>
            )}
            
            {/* Bottom Controls (Progress bar and Mute button) - always visible */}
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

  // 🎵 Render music (audio) card with thumbnail and interactions
  const renderMusicCard = (audio: MediaItem, index: number) => {
    const modalKey = `music-${audio._id || index}`;
    const key = getContentKey(audio);
    const stats = contentStats[key] || {};
    const thumbnailSource = audio?.imageUrl
      ? (typeof audio.imageUrl === "string" ? { uri: audio.imageUrl } : (audio.imageUrl as any))
      : { uri: audio.fileUrl };
    const isPlaying = playingAudioId === modalKey;
    const currentProgress = audioProgressMap[modalKey] || 0;

    return (
      <View 
        key={modalKey} 
        className="flex flex-col mb-10"
        onLayout={(e) => {
          const { y, height } = e.nativeEvent.layout;
          contentLayoutsRef.current[modalKey] = { y, height, type: 'music', uri: audio.fileUrl };
        }}
      >
        <TouchableWithoutFeedback onPress={() => { /* tap does nothing; use buttons */ }}>
          <View className="w-full h-[400px] overflow-hidden relative">
            <Image
              source={thumbnailSource as any}
              style={{ width: "100%", height: "100%", position: "absolute" }}
              resizeMode="cover"
            />

            {/* Center Play/Pause button */}
            <View className="absolute inset-0 justify-center items-center">
              <TouchableOpacity
                onPress={() => playAudio(audio.fileUrl, modalKey)}
                className="bg-white/70 p-3 rounded-full"
                activeOpacity={0.9}
              >
                <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="#FEA74E" />
              </TouchableOpacity>
            </View>

            {/* Right side actions */}
            <View className="flex-col absolute mt-[170px] right-4">
              <TouchableOpacity onPress={() => handleFavorite(key, audio)} className="flex-col justify-center items-center">
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
                  {stats.comment === 1 ? (audio.comment ?? 0) + 1 : audio.comment ?? 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSave(key, audio)} className="flex-col justify-center items-center mt-6">
                <MaterialIcons
                  name={stats.saved === 1 ? "bookmark" : "bookmark-border"}
                  size={30}
                  color={stats.saved === 1 ? "#FEA74E" : "#FFFFFF"}
                />
                <Text className="text-[10px] text-white font-rubik-semibold">
                  {stats.saved === 1 ? (audio.saved ?? 0) + 1 : audio.saved ?? 0}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Controls: progress and mute, styled similar to video */}
            <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2 px-3">
              <TouchableOpacity onPress={() => playAudio(audio.fileUrl, modalKey)}>
                <Ionicons 
                  name={isPlaying ? "pause" : "play"} 
                  size={24} 
                  color="#FEA74E" 
                />
              </TouchableOpacity>
              <View className="flex-1 h-1 bg-white/30 rounded-full relative">
                <View className="h-full bg-[#FEA74E] rounded-full" style={{ width: `${currentProgress * 100}%` }} />
                <View
                  style={{
                    position: "absolute",
                    left: `${currentProgress * 100}%`,
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
              <TouchableOpacity onPress={async () => {
                const currentMuted = audioMuteMap[modalKey] ?? false;
                const newMuted = !currentMuted;
                setAudioMuteMap((prev) => ({ ...prev, [modalKey]: newMuted }));
                const snd = soundMap[modalKey];
                if (snd) {
                  try { await snd.setIsMutedAsync(newMuted); } catch {}
                }
              }}>
                <Ionicons
                  name={(audioMuteMap[modalKey] ?? false) ? "volume-mute" : "volume-high"}
                  size={20}
                  color="#FEA74E"
                />
              </TouchableOpacity>
            </View>

            {/* Title overlay above controls */}
            <View className="absolute bottom-9 left-3 right-3 px-4 py-2 rounded-md">
              <Text className="text-white font-semibold text-[14px]" numberOfLines={2}>
                {audio.title}
              </Text>
            </View>

          </View>
        </TouchableWithoutFeedback>
        {/* Footer under the card: avatar, time and share */}
        <View className="flex-row items-center justify-between mt-1 px-3">
          <View className="flex flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center relative ml-1 mt-2">
              <Image
                source={
                  typeof audio.speakerAvatar === "string" && (audio.speakerAvatar as string).startsWith("http")
                    ? { uri: (audio.speakerAvatar as string).trim() }
                    : (audio.speakerAvatar as any) || require("../../assets/images/Avatar-1.png")
                }
                style={{ width: 30, height: 30, borderRadius: 999 }}
                resizeMode="cover"
              />
            </View>
            <View className="ml-3">
              <View className="flex-row items-center">
                <Text className="ml-1 text-[13px] font-rubik-semibold text-[#344054] mt-1">
                  {getDisplayName(audio.speaker || "", audio.uploadedBy)}
                </Text>
                <View className="flex flex-row mt-2 ml-2">
                  <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                  <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                    {getTimeAgo(audio.createdAt)}
                  </Text>
                </View>
              </View>
              <View className="flex-row mt-2">
                <View className="flex-row items-center">
                  <AntDesign name="eyeo" size={24} color="#98A2B3" />
                  <Text className="text-[10px] text-gray-500 ml-1 mt-1 font-rubik">
                    {stats.views ?? audio.views ?? 0}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleShare(key, audio)} className="flex-row items-center ml-4">
                  <Feather name="send" size={24} color="#98A2B3" />
                  <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                    {stats.sheared ?? audio.sheared ?? 0}
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

        {/* Vertical pop modal, same behavior as video cards */}
        {modalVisible === modalKey && (
          <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(null)}>
              <View className="absolute inset-0 z-40" />
            </TouchableWithoutFeedback>
            <View className="absolute bottom-24 right-16 bg-white shadow-md rounded-lg p-3 z-50 w-[200px] h-[180]">
              <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                <Text className="text-[#1D2939] font-rubik ml-2">View Details</Text>
                <Ionicons name="eye-outline" size={22} color="#1D2939" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare(key, audio)}
                className="py-2 border-b border-gray-200 flex-row items-center justify-between"
              >
                <Text className="text-[#1D2939] font-rubik ml-2">Share</Text>
                <Feather name="send" size={22} color="#1D2939" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center justify-between mt-6" onPress={() => handleSave(key, audio)}>
                <Text className="text-[#1D2939] font-rubik ml-2">{stats.saved === 1 ? "Remove from Library" : "Save to Library"}</Text>
                <MaterialIcons
                  name={stats.saved === 1 ? "bookmark" : "bookmark-border"}
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
      </View>
    );
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      className="flex-1"
      onScroll={handleScroll}
      onScrollEndDrag={() => {
        // Recompute at drag end to ensure correct active video when user stops scrolling
        recomputeVisibilityFromLayouts();
      }}
      onMomentumScrollEnd={() => {
        // Recompute at momentum end for fast flicks
        recomputeVisibilityFromLayouts();
      }}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={true}
    >
      {/* 🆕 Recent Section */}
      {mostRecentItem && (
        <View>
          <Text className="text-[16px] font-rubik-semibold px-4 mt-5 mb-3">Recent</Text>
          {mostRecentItem.contentType === 'videos'
            ? renderVideoCard(mostRecentItem as any, 0)
            : renderMusicCard(mostRecentItem as any, 0)}
        </View>
      )}
      {/* 🔥 Videos Section with Full Layout */}
      {videosExcludingRecent.length > 0 && (
        <>
          {/* <Text className="text-[18px] font-bold px-4 mt-5 mb-3">🎥 Videos</Text> */}
          {videosExcludingRecent.map((video, index) => renderVideoCard(video, index))}
        </>
      )}

      {/* 🎵 Music Section with thumbnails */}
      {musicExcludingRecent.length > 0 && (
        <>
          {/* <Text className="text-[18px] font-bold px-4 mt-5 mb-3">🎵 Music</Text> */}
          {musicExcludingRecent.map((audio, index) => renderMusicCard(audio, index))}
        </>
      )}

      {mediaList.length === 0 && (
        <Text className="text-center text-gray-500 mt-10">No content uploaded yet.</Text>
      )}
    </ScrollView>
  );
}