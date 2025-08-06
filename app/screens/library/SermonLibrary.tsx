import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

export default function SermonLibrary () {
  const [query, setQuery] = useState("");
  const libraryStore = useLibraryStore();
  const [savedSermons, setSavedSermons] = useState<any[]>([]);

  useEffect(() => {
    const loadSavedSermons = async () => {
      if (!libraryStore.isLoaded) {
        await libraryStore.loadSavedItems();
      }
      
      const sermons = libraryStore.getSavedItemsByType("sermon");
      setSavedSermons(sermons);
      console.log(`📜 Loaded ${sermons.length} saved sermons`);
    };

    loadSavedSermons();
  }, [libraryStore.savedItems, libraryStore.isLoaded]);



  const handleRemoveFromLibrary = async (item: any) => {
    await libraryStore.removeFromLibrary(item.id);
    console.log(`🗑️ Removed ${item.title} from library`);
  };

  const renderMediaCard = ({ item }: any) => (
    <View className="w-[48%] mb-6 h-[232px] rounded-xl overflow-hidden bg-[#E5E5EA]">
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
      <View className="absolute bottom-2 left-2 right-2">
        <Text className="text-white font-rubik-bold text-sm" numberOfLines={2}>
          {item.title}
        </Text>
      </View>
      <TouchableOpacity 
        className="absolute bottom-2 right-2 bg-black/50 rounded-full p-1"
        onPress={() => handleRemoveFromLibrary(item)}
      >
        <Ionicons name="trash-outline" size={14} color="#FFFFFF" />
      </TouchableOpacity>
      {item.speaker && (
        <View className="absolute top-2 left-2 bg-black/50 rounded px-2 py-1">
          <Text className="text-white text-xs font-rubik">{item.speaker}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1  bg-[#98a2b318]">
   

      {/* Scrollable Content with matching px-6 */}
      <ScrollView
        className="flex-1 px-3"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Past Search Keywords */}
       

        {/* Media Cards */}
        {savedSermons.length > 0 ? (
          <FlatList
            data={savedSermons}
            renderItem={renderMediaCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            scrollEnabled={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center py-10">
            <Ionicons name="book-outline" size={48} color="#98A2B3" />
            <Text className="text-[#98A2B3] text-lg font-rubik-medium mt-4">
              No saved sermons yet
            </Text>
            <Text className="text-[#D0D5DD] text-sm font-rubik text-center mt-2 px-6">
              Sermons you save will appear here for easy access
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
