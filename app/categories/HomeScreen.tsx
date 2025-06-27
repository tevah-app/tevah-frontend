// import React, { useState } from "react";
// import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";

// import LiveCardSlider from "@/app/components/LiveCard";
// import BottomNav from "@/app/components/BottomNav";
// import CategoryTabs from "@/app/components/CategoryTabs";
// import Header from "@/app/components/Header";

// import { Ionicons } from "@expo/vector-icons";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import Fontisto from "@expo/vector-icons/Fontisto";


// import LiveComponent from "./LiveComponent";
// import AllContent from "./Allcontent";
// import SermonComponent from "./SermonComponent";
// import Music from "./music";
// import VideoComponent from "./VideoComponent";



// const categories = ["ALL", "LIVE", "SERMON", "MUSIC", "E-BOOKS", "VIDEO"];

// export default function HomeScreen() {
//   const [selectedCategory, setSelectedCategory] = useState("ALL");
//   const [selectedTab, setSelectedTab] = useState("Home");
//   const renderContent = () => {
//     switch (selectedCategory) {
//       case "ALL":
//         return <AllContent />;
//       case "LIVE":
//         return <LiveComponent />;
//       case "SERMON":
//         return <SermonComponent />;
//       case 'MUSIC': return <Music />;
//       // case 'E-BOOKS': return <EbookContent />;
//       case 'VIDEO': return <VideoComponent />;
//       // default: return <AllContent />;
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Fixed Header */}
//       <Header />

//       {/* Scrollable Content */}
//       <View style={{ flex: 1 }}>
//         <ScrollView
//           contentContainerStyle={{
//             paddingHorizontal: 16,
//             paddingBottom: 100, // Adjusted to match BottomNav + margin
//           }}
//           showsVerticalScrollIndicator={false}
//         >
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             className="px-2 py-3 mt-6"
//           >
//             {categories.map((category) => (
//               <TouchableOpacity
//                 key={category}
//                 onPress={() => setSelectedCategory(category)}
//                 className={`px-3 py-1.5 mx-1 rounded-[10px] ${
//                   selectedCategory === category
//                     ? "bg-black"
//                     : "bg-white border border-[#6B6E7C]"
//                 }`}
//               >
//                 <Text
//                   className={`${
//                     selectedCategory === category
//                       ? "text-white"
//                       : "text-[#1D2939]"
//                   } font-rubik`}
//                 >
//                   {category}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//           <View className="flex-1">{renderContent()}</View>
//         </ScrollView>
//       </View>

//       {/* Bottom Navigation */}
//       <View
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: 80, // Add fixed height for BottomNav
//           backgroundColor: "#fff", // Optional: matches BottomNav background
//         }}
//       >
//         <BottomNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
//       </View>
//     </View>
//   );
// }












// import React, { useRef, useState } from "react";
// import { View } from "react-native";
// import PagerView from "react-native-pager-view";

// import Header from "@/app/components/Header";
// import BottomNav from "@/app/components/BottomNav";
// import HomeTabContent from "./HomeTabContent";
// import CommunityScreen from "../screens/CommunityScreen";
// import LibraryScreen from "../screens/LibraryScreen";
// import AccountScreen from "../screens/AccountScreen";

// // import HomeTabContent from "./HomeTabContent";
// // import CommunityScreen from "./CommunityScreen";
// // import LibraryScreen from "./LibraryScreen";
// // import AccountScreen from "./AccountScreen";

// const tabList = ["Home", "Community", "Library", "Account"];

// export default function HomeScreen() {
//   const [selectedTab, setSelectedTab] = useState("Home");
//   const pagerRef = useRef<PagerView>(null);

//   const handleTabChange = (tab: string) => {
//     const index = tabList.indexOf(tab);
//     pagerRef.current?.setPage(index);
//     setSelectedTab(tab);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Header />

//       <PagerView
//         style={{ flex: 1 }}
//         initialPage={0}
//         onPageSelected={(e: { nativeEvent: { position: string | number; }; }) => {
//           const newTab = tabList[e.nativeEvent.position];
//           setSelectedTab(newTab);
//         }}
//         ref={pagerRef}
//       >
//         <View key="1">
//           <HomeTabContent />
//         </View>
//         <View key="2">
//           <CommunityScreen />
//         </View>
//         <View key="3">
//           <LibraryScreen />
//         </View>
//         <View key="4">
//           <AccountScreen />
//         </View>
//       </PagerView>

//       <View
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: 80,
//           backgroundColor: "#fff",
//         }}
//       >
//         <BottomNav selectedTab={selectedTab} setSelectedTab={handleTabChange} />
//       </View>
//     </View>
//   );
// }






// import React, { useRef, useState } from "react";
// import { View } from "react-native";
// import PagerView from "react-native-pager-view";

// import BottomNav from "@/app/components/BottomNav";

// import LibraryScreen from "../screens/LibraryScreen";
// import HomeTabContent from "./HomeTabContent";
// import CommunityScreen from "../screens/CommunityScreen";
// import AccountScreen from "../screens/AccountScreen";

// const tabList = ["Home", "Community", "Library", "Account"];

// export default function HomeScreen() {
//   const [selectedTab, setSelectedTab] = useState("Home");
//   const pagerRef = useRef<PagerView>(null);

//   const handleTabChange = (tab: string) => {
//     const index = tabList.indexOf(tab);
//     pagerRef.current?.setPage(index);
//     setSelectedTab(tab);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <PagerView
//         style={{ flex: 1 }}
//         initialPage={0}
//         onPageSelected={(e) => {
//           const newTab = tabList[e.nativeEvent.position];
//           setSelectedTab(newTab);
//         }}
//         ref={pagerRef}
//       >
//         <View key="1">
//           <HomeTabContent />
//         </View>
//         <View key="2">
//           <CommunityScreen />
//         </View>
//         <View key="3">
//           <LibraryScreen />
//         </View>
//         <View key="4">
//           <AccountScreen />
//         </View>
//       </PagerView>

//       <View
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: 80,
//           backgroundColor: "#fff",
//         }}
//       >
//         <BottomNav selectedTab={selectedTab} setSelectedTab={handleTabChange} />
//       </View>
//     </View>
//   );
// }



import React, { useRef, useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";

import BottomNav from "@/app/components/BottomNav";

import LibraryScreen from "../screens/LibraryScreen";
import HomeTabContent from "./HomeTabContent";
import CommunityScreen from "../screens/CommunityScreen";
import AccountScreen from "../screens/AccountScreen";

const tabList = ["Home", "Community", "Library", "Account"];

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState("Home");
  const pagerRef = useRef<PagerView>(null);

  const handleTabChange = (tab: string) => {
    const index = tabList.indexOf(tab);
    pagerRef.current?.setPage(index);
    setSelectedTab(tab);
  };

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
