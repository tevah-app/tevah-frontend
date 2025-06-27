import { router, useFocusEffect } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
  BackHandler,
} from "react-native";
import AuthHeader from "../components/AuthHeader";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import BottomNav from "../components/BottomNav";
import PagerView from "react-native-pager-view";

const tabList = ["Home", "Community", "Library", "Account"];

export default function Reelsviewscroll() {
  const [selectedTab, setSelectedTab] = useState("Home");
  const pagerRef = useRef<PagerView>(null);

  interface VideoCard {
    imageUrl: string;
    title: string;
    speaker: string;
    timeAgo: string;
    speakerAvatar: any;
    favorite: number;
    views: number;
    saved: number;
    sheared: number;
  
    
  }


//   const videos: VideoCard[] = [
//     {
//       imageUrl: require("../../assets/images/bg (1).png"),
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

  const handleTabChange = (tab: string) => {
    const index = tabList.indexOf(tab);
    pagerRef.current?.setPage(index);
    setSelectedTab(tab);
  };

  return (
    <View className="flex-1 bg-[#FCFCFD]">
      <Image
        source={require("../../assets/images/bg (1).png")}
        className="h-[730px] w-full  relative"
        resizeMode="cover"
      />
         <View className="absolute top-10 bg-red-600 px-2 py-0.5 rounded-md z-10 flex flex-row items-center h-[23px] mt-3 ml-5">
                <Text className="text-white text-xs font-bold">LIVE</Text>
                <Image
                  source={require("../../assets/images/Vector.png")}
                  className="h-[10px] w-[10px] ml-2"
                  resizeMode="contain"
                />
              </View>

              <View className="absolute bottom-60 left-3 right-3">
              <Text
                className="text-white text-base font-bold"
                numberOfLines={2}
              >
               2 Hours Soaking worship  with Dunsin Oyekan & Sunmisola Agbebi
              </Text>
            </View>
      <BottomNav selectedTab={selectedTab} setSelectedTab={handleTabChange} />
    </View>
  );
}
