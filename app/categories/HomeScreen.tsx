

import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";

import BottomNav from "@/app/components/BottomNav";

import LibraryScreen from "../screens/LibraryScreen";
import HomeTabContent from "./HomeTabContent";
import CommunityScreen from "../screens/CommunityScreen";
import AccountScreen from "../screens/AccountScreen";
import { useLocalSearchParams } from "expo-router";

const tabList = ["Home", "Community", "Library", "Account"];

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState("Home");
  const pagerRef = useRef<PagerView>(null);

  // const { default: defaultTabParam } = useLocalSearchParams();
  const { default: defaultTabParamRaw } = useLocalSearchParams();
  const defaultTabParam = Array.isArray(defaultTabParamRaw)
    ? defaultTabParamRaw[0]
    : defaultTabParamRaw;


    function handleTabChange(tab: string) {
      const tabIndex = tabList.indexOf(tab);
      if (tabIndex !== -1 && pagerRef.current) {
        pagerRef.current.setPage(tabIndex);
        setSelectedTab(tab);
      }
    }

  useEffect(() => {
    if (defaultTabParam && tabList.includes(defaultTabParam)) {
      handleTabChange(defaultTabParam);
    }
  }, [defaultTabParam]);

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        scrollEnabled={false} // 👈 disables swiping
        ref={pagerRef}
      >
        <View key="1">
          <HomeTabContent />
        </View>
        <View key="2">
          <CommunityScreen />
        </View>
        <View key="3">
          <LibraryScreen />
        </View>
        <View key="4">
          <AccountScreen />
        </View>
      </PagerView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          backgroundColor: "#fff",
        }}
      >
        <BottomNav selectedTab={selectedTab} setSelectedTab={handleTabChange} />
      </View>
    </View>
  );
}
function handleTabChange(defaultTabParam: string | string[]) {
  throw new Error("Function not implemented.");
}
