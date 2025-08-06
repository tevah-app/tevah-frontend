import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalVideoStore } from "../../store/useGlobalVideoStore";
import { useLibraryStore } from "../../store/useLibraryStore";



const sampleMedia = [
  {
    id: "1",
    title: "2 Hours time with God with Dunsin Oy...",
    image: require("../../../assets/images/image (10).png"),
  },
  {
    id: "2",
    title: "Living with the Holy Spirit",
    image: require("../../../assets/images/image (10).png"),
  },
  {
    id: "3",
    title: "The power of confidence",
    image: require("../../../assets/images/image (10).png"),
  },
  {
    id: "4",
    title: "30 minutes songs of worship",
    image: require("../../../assets/images/image (10).png"),
  },
  {
    id: "5",
    title: "The Prophetic",
    image: require("../../../assets/images/image (10).png"),
  },
  {
    id: "6",
    title: "Lagos open field praise",
    image: require("../../../assets/images/image (10).png"),
  },
  {
    id: "7",
    title: "Jesus preaches",
    image: require("../../../assets/images/image (10).png"),
  },
  {
    id: "8",
    title: "AI Jams in Lekki Lagos Stadium",
    image: require("../../../assets/images/image (10).png"),
  },
];

const pastSearchesInitial = [
  "Miracles",
  "Spiritual growth",
  "Mega worship",
  "Soaking worship",
  "Love and Light",
];

export default function VideoLibrary () {
  const [query, setQuery] = useState("");
  const libraryStore = useLibraryStore();
  const globalVideoStore = useGlobalVideoStore();
  const [savedVideos, setSavedVideos] = useState<any[]>([]);
  
  // Video playback state
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});
  const [showOverlay, setShowOverlay] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, any>>({});

  useEffect(() => {
    const loadSavedVideos = async () => {
      if (!libraryStore.isLoaded) {
        await libraryStore.loadSavedItems();
      }
      
      const videos = libraryStore.getSavedItemsByType("videos");
      setSavedVideos(videos);
      console.log(`📹 Loaded ${videos.length} saved videos`);
      
      // Initialize overlay state for all videos
      const overlayState: Record<string, boolean> = {};
      videos.forEach(video => {
        overlayState[video.id] = true;
      });
      setShowOverlay(overlayState);
    };

    loadSavedVideos();
  }, [libraryStore.savedItems, libraryStore.isLoaded]);



  const handleRemoveFromLibrary = async (item: any) => {
    await libraryStore.removeFromLibrary(item.id);
    console.log(`🗑️ Removed ${item.title} from library`);
  };

  const togglePlay = (videoId: string) => {
    // Pause all other videos first
    Object.keys(playingVideos).forEach((id) => {
      if (id !== videoId) {
        setPlayingVideos(prev => ({ ...prev, [id]: false }));
        setShowOverlay(prev => ({ ...prev, [id]: true }));
      }
    });

    // Also pause videos in global store
    globalVideoStore.pauseAllVideos();

    // Toggle current video
    const isPlaying = playingVideos[videoId] ?? false;
    setPlayingVideos(prev => ({ ...prev, [videoId]: !isPlaying }));
    setShowOverlay(prev => ({ ...prev, [videoId]: isPlaying }));
  };

  const renderMediaCard = ({ item }: any) => {
    const isPlaying = playingVideos[item.id] ?? false;
    const showVideoOverlay = showOverlay[item.id] ?? true;

    return (
      <View className="w-[48%] mb-6 h-[232px] rounded-xl overflow-hidden bg-[#E5E5EA]">
        <TouchableOpacity 
          onPress={() => togglePlay(item.id)}
          className="w-full h-full"
          activeOpacity={0.9}
        >
          <Video
            ref={(ref) => {
              if (ref) {
                videoRefs.current[item.id] = ref;
              }
            }}
            source={{ uri: item.fileUrl }}
            style={{ width: "100%", height: "100%", position: "absolute" }}
            resizeMode={ResizeMode.COVER}
            shouldPlay={isPlaying}
            isLooping={false}
            isMuted={false}
            useNativeControls={false}
            onPlaybackStatusUpdate={(status) => {
              if (!status.isLoaded) return;
              if (status.didJustFinish) {
                setPlayingVideos(prev => ({ ...prev, [item.id]: false }));
                setShowOverlay(prev => ({ ...prev, [item.id]: true }));
                console.log(`🎬 Library video completed: ${item.title}`);
              }
            }}
          />
          
          {/* Play/Pause Overlay */}
          {!isPlaying && showVideoOverlay && (
            <>
              <View className="absolute inset-0 justify-center items-center">
                <View className="bg-white/70 p-2 rounded-full">
                  <Ionicons name="play" size={24} color="#FEA74E" />
                </View>
              </View>
              
              <View className="absolute bottom-2 left-2 right-2">
                <Text className="text-white font-rubik-bold text-sm" numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </>
          )}
          
          {/* Remove Button */}
          <TouchableOpacity 
            className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
            onPress={(e) => {
              e.stopPropagation();
              handleRemoveFromLibrary(item);
            }}
          >
            <Ionicons name="trash-outline" size={14} color="#FFFFFF" />
          </TouchableOpacity>
          
          {/* Speaker Badge */}
          {item.speaker && (
            <View className="absolute top-2 left-2 bg-black/50 rounded px-2 py-1">
              <Text className="text-white text-xs font-rubik">{item.speaker}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1  bg-[#98a2b318]">
   

      {/* Scrollable Content with matching px-6 */}
      <ScrollView
        className="flex-1 px-3"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Past Search Keywords */}
       

        {/* Media Cards */}
        {savedVideos.length > 0 ? (
          <FlatList
            data={savedVideos}
            renderItem={renderMediaCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            scrollEnabled={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center py-10">
            <Ionicons name="videocam-outline" size={48} color="#98A2B3" />
            <Text className="text-[#98A2B3] text-lg font-rubik-medium mt-4">
              No saved videos yet
            </Text>
            <Text className="text-[#D0D5DD] text-sm font-rubik text-center mt-2 px-6">
              Videos you save will appear here for easy access
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}