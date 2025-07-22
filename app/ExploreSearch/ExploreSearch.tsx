import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AuthHeader from "../components/AuthHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { HugeiconsIcon } from '@hugeicons/react-native';
import { router } from "expo-router";



const sampleMedia = [
  {
    id: "1",
    title: "2 Hours time with God with Dunsin Oy...",
    image: require("../../assets/images/image (10).png"),
  },
  {
    id: "2",
    title: "Living with the Holy Spirit",
    image: require("../../assets/images/image (10).png"),
  },
  {
    id: "3",
    title: "The power of confidence",
    image: require("../../assets/images/image (10).png"),
  },
  {
    id: "4",
    title: "30 minutes songs of worship",
    image: require("../../assets/images/image (10).png"),
  },
  {
    id: "5",
    title: "The Prophetic",
    image: require("../../assets/images/image (10).png"),
  },
  {
    id: "6",
    title: "Lagos open field praise",
    image: require("../../assets/images/image (10).png"),
  },
  {
    id: "7",
    title: "Jesus preaches",
    image: require("../../assets/images/image (10).png"),
  },
  {
    id: "8",
    title: "AI Jams in Lekki Lagos Stadium",
    image: require("../../assets/images/image (10).png"),
  },
];

const pastSearchesInitial = [
  "Miracles",
  "Spiritual growth",
  "Mega worship",
  "Soaking worship",
  "Love and Light",
];

export default function ExploreSearch() {
  const [query, setQuery] = useState("");
  const [pastSearches, setPastSearches] = useState(pastSearchesInitial);

  const removePastSearch = (item: string) => {
    setPastSearches(pastSearches.filter((keyword) => keyword !== item));
  };
  const renderMediaCard = ({ item }: any) => (
    <View className="w-[48%] mb-4 h-[232px] rounded-xl overflow-hidden bg-gray-100">
      <Image
        source={item.image}
        className="h-full w-full rounded-xl" // ✅ Apply rounding here
        resizeMode="cover"
      />
      <View className="absolute bottom-2 left-2 right-2">
        <Text className="text-white font-rubik-bold text-sm">{item.title}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Content */}
      <View className="px-6">
        <AuthHeader title="Explore" />

        {/* Search Bar */}

        <View className="flex flex-row">
          <View className="flex-row items-center px-2 bg-gray-100 w-[270px] rounded-xl  h-[42px] mb-3">
           <View className="ml-2">
           <Ionicons name="search" size={20} color="#666" />
           </View>
            <TextInput
              placeholder="Search for anything..."
              className="ml-3 flex-1 text-base font-rubik items-center"
              value={query}
              onChangeText={setQuery}
            />
          </View>

 
          <TouchableOpacity onPress={() => router.push("/ExploreSearch/FilterScreen")} className="ml-3   ">
       

          <Ionicons name="options" size={36} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content with matching px-6 */}
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Past Search Keywords */}
        {pastSearches.length > 0 && (
          <View className="mb-4">
            {pastSearches.map((keyword, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between px-2 py-1"
              >
                <Text className="text-gray-700 text-base">{keyword}</Text>
                <TouchableOpacity onPress={() => removePastSearch(keyword)}>
                  <Ionicons name="close" size={18} color="gray" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Media Cards */}
        <FlatList
          data={sampleMedia}
          renderItem={renderMediaCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
