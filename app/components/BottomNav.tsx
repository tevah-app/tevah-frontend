import * as ImagePicker from "expo-image-picker";

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import * as DocumentPicker from "expo-document-picker";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import Upload from "../categories/upload";
import { router } from "expo-router";


interface BottomNavProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const tabConfig: Record<
  string,
  { IconComponent: React.ComponentType<any>; name: string; label: string }
> = {
  Home: { IconComponent: AntDesign, name: "home", label: "Home" },
  Community: {
    IconComponent: MaterialCommunityIcons,
    name: "account-group-outline",
    label: "Community",
  },
  Library: {
    IconComponent: Ionicons,
    name: "play-circle-outline",
    label: "Library",
  },
  Account: {
    IconComponent: Ionicons,
    name: "person-outline",
    label: "Account",
  },
};

export default function BottomNav({
  selectedTab,
  setSelectedTab,
}: BottomNavProps) {
  const [showActions, setShowActions] = useState(false);

  const handleFabToggle = () => {
    setShowActions(!showActions);
  };

  // const handleUpload = async () => {
  //   setShowActions(false);

  //   // Request permission
  //   const permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (!permissionResult.granted) {
  //     alert("Permission to access media is required!");
  //     return;
  //   }

  //   // Launch media picker for both images and videos
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All, // 👈 allows both images and videos
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const file = result.assets[0]; // contains uri, type, fileName, etc.
  //     console.log("Selected file:", file);

  //     // Do something with file.uri
  //     // e.g., upload to backend or display in app
  //   }
  // };










// const handleUpload = async () => {
//   setShowActions(false);

//   const permissionResult =
//     await ImagePicker.requestMediaLibraryPermissionsAsync();

//   if (!permissionResult.granted) {
//     alert("Permission to access media is required!");
//     return;
//   }

//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ['video'], // ✅ modern format
//     allowsEditing: true,
//     quality: 1,
//   });

//   if (!result.canceled) {
//     const file = result.assets[0];
//     console.log("Selected file:", file);
//     // do something with file.uri
//   }
// };




const [showUploadScreen, setShowUploadScreen] = useState(false);

const handleUpload = () => {
  setShowActions(false);
  setTimeout(() => {
    router.push('/categories/upload');
  }, 300);
};


  

  return (
    <>
      {/* BlurView */}

      {showUploadScreen && (
  <View className="absolute top-0 left-0 right-0 bottom-0 z-50">
    <Upload onClose={() => setShowUploadScreen(false)} />
  </View>
)}
      {showActions && (
        <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />
      )}

      {/* Action Buttons */}
      {showActions && (
        <View className="absolute bottom-24 w-[220px] ml-20   flex-row justify-center items-center z-20 mb-12">
          <View className="rounded-2xl overflow-hidden w-full h-[70px]">
            <BlurView
              intensity={80}
              tint="light"
              className="flex-row w-full h-full items-center justify-center gap-4 bg-white/20"
            >
              <TouchableOpacity
                className="bg-[#6663FD] px-4 py-2 rounded-full border-4 border-white"
                onPress={handleUpload}
              >
                <Text className="text-white font-medium">Upload</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-black px-4 py-2 rounded-full border-4 border-white"
                onPress={() => setShowActions(false)}
              >
                <Text className="text-white font-medium">Go Live</Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </View>
      )}

      {/* Bottom Nav */}
      <View className="absolute bottom-0 left-0 right-0 h-20 bg-white flex-row justify-around items-center shadow-lg z-10 mb-14">
        {Object.entries(tabConfig)
          .slice(0, 2)
          .map(([tab, { IconComponent, name, label }]) => {
            const isActive = selectedTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                className="items-center justify-center"
              >
                <IconComponent
                  name={name}
                  size={24}
                  color={isActive ? "#6663FD" : "#000"}
                />
                <Text
                  className={`text-xs mt-1 ${
                    isActive ? "text-[#6663FD]" : "text-black"
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}

        {/* FAB Button */}
        <View className="absolute -top-6 bg-white p-1 rounded-full shadow-md">
          <TouchableOpacity
            className="w-12 h-12 rounded-full bg-white items-center justify-center"
            onPress={handleFabToggle}
          >
            <AntDesign
              name={showActions ? "close" : "plus"}
              size={18}
              color="#6663FD"
            />
          </TouchableOpacity>
        </View>

        {Object.entries(tabConfig)
          .slice(2)
          .map(([tab, { IconComponent, name, label }]) => {
            const isActive = selectedTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                className="items-center justify-center"
              >
                <IconComponent
                  name={name}
                  size={24}
                  color={isActive ? "#6663FD" : "#000"}
                />
                <Text
                  className={`text-xs mt-1 ${
                    isActive ? "text-[#6663FD]" : "text-black"
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}

      </View>
    </>
  );
}

















// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { BlurView } from "expo-blur";
// import { useRouter } from "expo-router";
// import {
//   AntDesign,
//   MaterialCommunityIcons,
//   Ionicons,
// } from "@expo/vector-icons";

// interface BottomNavProps {
//   selectedTab: string;
//   setSelectedTab: (tab: string) => void;
// }

// const tabConfig: Record<
//   string,
//   { IconComponent: React.ComponentType<any>; name: string; label: string }
// > = {
//   Home: { IconComponent: AntDesign, name: "home", label: "Home" },
//   Community: {
//     IconComponent: MaterialCommunityIcons,
//     name: "account-group-outline",
//     label: "Community",
//   },
//   Library: {
//     IconComponent: Ionicons,
//     name: "play-circle-outline",
//     label: "Library",
//   },
//   Account: {
//     IconComponent: Ionicons,
//     name: "person-outline",
//     label: "Account",
//   },
// };

// export default function BottomNav({
//   selectedTab,
//   setSelectedTab,
// }: BottomNavProps) {
//   const [showActions, setShowActions] = useState(false);
//   const router = useRouter();

//   const handleFabToggle = () => {
//     setShowActions(!showActions);
//   };

//   const handleUpload = () => {
//     setShowActions(false);
//     router.push("/components/UploadMediaGrid"); // Navigates to UploadScreen
//   };

//   const handleGoLive = () => {
//     setShowActions(false);
//     // Add your Go Live logic or navigation here
//     alert("Go Live clicked");
//   };

//   return (
//     <>
//       {/* Blur Overlay */}
//       {showActions && (
//         <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />
//       )}

//       {/* Action Buttons */}
//       {showActions && (
//         <View className="absolute bottom-24 w-[220px] ml-20 flex-row justify-center items-center z-20 mb-12">
//           <View className="rounded-2xl overflow-hidden w-full h-[70px]">
//             <BlurView
//               intensity={80}
//               tint="light"
//               className="flex-row w-full h-full items-center justify-center gap-4 bg-white/20"
//             >
//               <TouchableOpacity
//                 className="bg-[#6663FD] px-4 py-2 rounded-full border-4 border-white"
//                 onPress={handleUpload}
//               >
//                 <Text className="text-white font-medium">Upload</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 className="bg-black px-4 py-2 rounded-full border-4 border-white"
//                 onPress={handleGoLive}
//               >
//                 <Text className="text-white font-medium">Go Live</Text>
//               </TouchableOpacity>
//             </BlurView>
//           </View>
//         </View>
//       )}

//       {/* Bottom Navigation */}
//       <View className="absolute bottom-0 left-0 right-0 h-20 bg-white flex-row justify-around items-center shadow-lg z-10 mb-14">
//         {Object.entries(tabConfig)
//           .slice(0, 2)
//           .map(([tab, { IconComponent, name, label }]) => {
//             const isActive = selectedTab === tab;
//             return (
//               <TouchableOpacity
//                 key={tab}
//                 onPress={() => setSelectedTab(tab)}
//                 className="items-center justify-center"
//               >
//                 <IconComponent
//                   name={name}
//                   size={24}
//                   color={isActive ? "#6663FD" : "#000"}
//                 />
//                 <Text
//                   className={`text-xs mt-1 ${
//                     isActive ? "text-[#6663FD]" : "text-black"
//                   }`}
//                 >
//                   {label}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}

//         {/* FAB Button */}
//         <View className="absolute -top-6 bg-white p-1 rounded-full shadow-md">
//           <TouchableOpacity
//             className="w-12 h-12 rounded-full bg-white items-center justify-center"
//             onPress={handleFabToggle}
//           >
//             <AntDesign
//               name={showActions ? "close" : "plus"}
//               size={18}
//               color="#6663FD"
//             />
//           </TouchableOpacity>
//         </View>

//         {Object.entries(tabConfig)
//           .slice(2)
//           .map(([tab, { IconComponent, name, label }]) => {
//             const isActive = selectedTab === tab;
//             return (
//               <TouchableOpacity
//                 key={tab}
//                 onPress={() => setSelectedTab(tab)}
//                 className="items-center justify-center"
//               >
//                 <IconComponent
//                   name={name}
//                   size={24}
//                   color={isActive ? "#6663FD" : "#000"}
//                 />
//                 <Text
//                   className={`text-xs mt-1 ${
//                     isActive ? "text-[#6663FD]" : "text-black"
//                   }`}
//                 >
//                   {label}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//       </View>
//     </>
//   );
// }
