import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
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

export default function AllLibrary () {
  const [query, setQuery] = useState("");
  const libraryStore = useLibraryStore();
  const globalVideoStore = useGlobalVideoStore();
  const [savedItems, setSavedItems] = useState<any[]>([]);
  
  // Video playback state for videos in all library
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});
  const [showOverlay, setShowOverlay] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, any>>({});

  useEffect(() => {
    const loadSavedItems = async () => {
      if (!libraryStore.isLoaded) {
        await libraryStore.loadSavedItems();
      }
      
      const allItems = libraryStore.getAllSavedItems();
      setSavedItems(allItems);
      console.log(`📚 Loaded ${allItems.length} saved items`);
      
      // Initialize overlay state for video items
      const overlayState: Record<string, boolean> = {};
      allItems.forEach(item => {
        if (item.contentType === "videos") {
          overlayState[item.id] = true;
        }
      });
      setShowOverlay(overlayState);
    };

    loadSavedItems();
  }, [libraryStore.savedItems, libraryStore.isLoaded]);



  const handleRemoveFromLibrary = async (item: any) => {
    await libraryStore.removeFromLibrary(item.id);
    console.log(`🗑️ Removed ${item.title} from library`);
  };

  const togglePlay = (itemId: string) => {
    // Pause all other videos first
    Object.keys(playingVideos).forEach((id) => {
      if (id !== itemId) {
        setPlayingVideos(prev => ({ ...prev, [id]: false }));
        setShowOverlay(prev => ({ ...prev, [id]: true }));
      }
    });

    // Also pause videos in global store
    globalVideoStore.pauseAllVideos();

    // Toggle current video
    const isPlaying = playingVideos[itemId] ?? false;
    setPlayingVideos(prev => ({ ...prev, [itemId]: !isPlaying }));
    setShowOverlay(prev => ({ ...prev, [itemId]: isPlaying }));
  };

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType.toLowerCase()) {
      case 'videos':
        return 'videocam';
      case 'music':
        return 'musical-notes';
      case 'sermon':
        return 'book';
      case 'e-books':
        return 'library';
      case 'live':
        return 'radio';
      default:
        return 'document';
    }
  };

  const renderMediaCard = ({ item }: any) => {
    const isVideo = item.contentType === "videos";
    const isPlaying = playingVideos[item.id] ?? false;
    const showVideoOverlay = showOverlay[item.id] ?? true;

    return (
      <View className="w-[48%] mb-6 h-[232px] rounded-xl overflow-hidden bg-[#E5E5EA]">
        {isVideo ? (
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
                  console.log(`🎬 All Library video completed: ${item.title}`);
                }
              }}
            />
            
            {/* Play/Pause Overlay for Videos */}
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
          </TouchableOpacity>
        ) : (
          // Non-video content (images, etc.)
          <Image
            source={
              item.thumbnailUrl 
                ? { uri: item.thumbnailUrl }
                : item.imageUrl 
                ? (typeof item.imageUrl === 'string' ? { uri: item.imageUrl } : item.imageUrl)
                : require("../../../assets/images/image (10).png")
            }
            className="h-full w-full rounded-xl"
            resizeMode="cover"
          />
        )}
        
        {/* Title overlay for non-video content */}
        {!isVideo && (
          <View className="absolute bottom-2 left-2 right-2">
            <Text className="text-white font-rubik-bold text-sm" numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        )}
        
        {/* Remove Button */}
        <TouchableOpacity 
          className="absolute bottom-2 right-2 bg-black/50 rounded-full p-1"
          onPress={(e) => {
            if (isVideo) e.stopPropagation();
            handleRemoveFromLibrary(item);
          }}
        >
          <Ionicons name="trash-outline" size={14} color="#FFFFFF" />
        </TouchableOpacity>
        
        {/* Content type badge */}
        <View className="absolute top-2 right-2 bg-black/70 rounded-full p-1">
          <Ionicons name={getContentTypeIcon(item.contentType)} size={12} color="#FFFFFF" />
        </View>
        
        {/* Speaker Badge */}
        {item.speaker && (
          <View className="absolute top-2 left-2 bg-black/50 rounded px-2 py-1">
            <Text className="text-white text-xs font-rubik">{item.speaker}</Text>
          </View>
        )}
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
        {savedItems.length > 0 ? (
          <FlatList
            data={savedItems}
            renderItem={renderMediaCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            scrollEnabled={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center py-10">
            <Ionicons name="bookmark-outline" size={48} color="#98A2B3" />
            <Text className="text-[#98A2B3] text-lg font-rubik-medium mt-4">
              No saved content yet
            </Text>
            <Text className="text-[#D0D5DD] text-sm font-rubik text-center mt-2 px-6">
              Content you save will appear here for easy access
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
