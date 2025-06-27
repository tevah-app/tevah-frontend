// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import {
//   AntDesign,
//   Feather,
//   MaterialCommunityIcons,
//   Ionicons,
// } from '@expo/vector-icons';

// interface BottomNavProps {
//   selectedTab: string;
//   setSelectedTab: (tab: string) => void;
// }

// const tabConfig: Record<
//   string,
//   { IconComponent: React.ComponentType<any>; name: string }
// > = {
//   Home: { IconComponent: AntDesign, name: 'home' },
//   Search: { IconComponent: Feather, name: 'search' },
//   Community: { IconComponent: MaterialCommunityIcons, name: 'account-group-outline' },
//   Media: { IconComponent: Ionicons, name: 'play-circle-outline' },
//   Profile: { IconComponent: Ionicons, name: 'person-outline' },
// };

// const tabs = Object.keys(tabConfig);

// export default function BottomNav({ selectedTab, setSelectedTab }: BottomNavProps) {
//   return (
//     <View className="absolute bottom-0 left-0 right-0 mb-12 bg-white  flex-row justify-around items-center h-20 px-2">
//       {tabs.map((tab) => {
//         const { IconComponent, name } = tabConfig[tab];
//         const isActive = selectedTab === tab;

//         return (
//           <TouchableOpacity
//             key={tab}
//             onPress={() => setSelectedTab(tab)}
//             activeOpacity={0.8}
//             className={`flex-row items-center justify-center ${
//               isActive ? 'bg-[#6663FD] px-4 py-2' : 'bg-white w-12 h-12'
//             } rounded-full`}
//           >
//             <IconComponent
//               name={name}
//               size={20}
//               color={isActive ? '#ffffff' : '#000000'}
//             />
//             {isActive && (
//               <Text className="ml-2 text-white text-sm font-medium">{tab}</Text>
//             )}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }














// import React, { useState } from 'react';

// import { BlurView } from 'expo-blur';
// import { View, Text, TouchableOpacity } from 'react-native';
// import {
//   AntDesign,
//   Feather,
//   MaterialCommunityIcons,
//   Ionicons,
// } from '@expo/vector-icons';

// interface BottomNavProps {
//   selectedTab: string;
//   setSelectedTab: (tab: string) => void;
// }

// const tabConfig: Record<
//   string,
//   { IconComponent: React.ComponentType<any>; name: string; label: string }
// > = {
//   Home: { IconComponent: AntDesign, name: 'home', label: 'Home' },
//   Community: {
//     IconComponent: MaterialCommunityIcons,
//     name: 'account-group-outline',
//     label: 'Community',
//   },
//   Library: {
//     IconComponent: Ionicons,
//     name: 'play-circle-outline',
//     label: 'Library',
//   },
//   Account: { IconComponent: Ionicons, name: 'person-outline', label: 'Account' },
// };

// export default function BottomNav({ selectedTab, setSelectedTab }: BottomNavProps) {
//   const [showActions, setShowActions] = useState(false);

//   const handleFabToggle = () => {
//     setShowActions(!showActions);
//   };

//   return (
   
//   <>
//       {/* Action Buttons (Floating) */}
//       {showActions && (
//   <View className="absolute bottom-24 w-full flex-row justify-center items-center z-20 mb-10">
//     {/* Gray background container */}
//     <View className="flex-row bg-gray-200 rounded-t-2xl w-full h-[70px] items-center justify-center gap-4">
//       <TouchableOpacity
//         className="bg-[#6663FD] px-4 py-2 rounded-full"
//         onPress={() => {
//           setShowActions(false);
//           // trigger upload action
//         }}
//       >
//         <Text className="text-white font-medium">Upload</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         className="bg-black px-4 py-2 rounded-full"
//         onPress={() => {
//           setShowActions(false);
//           // trigger go live action
//         }}
//       >
//         <Text className="text-white font-medium">Go Live</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// )}


//       {/* Bottom Nav */}
//       <View className="absolute bottom-0 left-0 right-0 h-20 bg-white flex-row justify-around items-center shadow-lg z-10 mb-14">
//         {/* First two tabs */}
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
//                 <IconComponent name={name} size={24} color={isActive ? '#6663FD' : '#000'} />
//                 <Text className={`text-xs mt-1 ${isActive ? 'text-[#6663FD]' : 'text-black'}`}>
//                   {label}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}

//         {/* Center FAB */}
//         <View className="absolute -top-6 bg-white p-1 rounded-full shadow-md">
//           <TouchableOpacity
//             className="w-12 h-12 rounded-full bg-white items-center justify-center"
//             onPress={handleFabToggle}
//           >
//             <AntDesign
//               name={showActions ? 'close' : 'plus'}
//               size={18}
//               color="#6663FD"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Last two tabs */}
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
//                 <IconComponent name={name} size={24} color={isActive ? '#6663FD' : '#000'} />
//                 <Text className={`text-xs mt-1 ${isActive ? 'text-[#6663FD]' : 'text-black'}`}>
//                   {label}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//       </View>
//     </>


  
//   );
// }





import * as ImagePicker from 'expo-image-picker';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import * as DocumentPicker from 'expo-document-picker';
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';

interface BottomNavProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const tabConfig: Record<
  string,
  { IconComponent: React.ComponentType<any>; name: string; label: string }
> = {
  Home: { IconComponent: AntDesign, name: 'home', label: 'Home' },
  Community: {
    IconComponent: MaterialCommunityIcons,
    name: 'account-group-outline',
    label: 'Community',
  },
  Library: {
    IconComponent: Ionicons,
    name: 'play-circle-outline',
    label: 'Library',
  },
  Account: { IconComponent: Ionicons, name: 'person-outline', label: 'Account' },
};

export default function BottomNav({ selectedTab, setSelectedTab }: BottomNavProps) {
  const [showActions, setShowActions] = useState(false);

  const handleFabToggle = () => {
    setShowActions(!showActions);
  };

  const handleUpload = async () => {
    setShowActions(false);
  
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media is required!');
      return;
    }
  
    // Launch media picker for both images and videos
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // 👈 allows both images and videos
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const file = result.assets[0]; // contains uri, type, fileName, etc.
      console.log("Selected file:", file);
  
      // Do something with file.uri
      // e.g., upload to backend or display in app
    }
  };

  return (
    <>
      {/* BlurView */}
      {showActions && (
        <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />
      )}

      {/* Action Buttons */}
      {showActions && (
        <View className="absolute bottom-24 w-full flex-row justify-center items-center z-20 mb-10">
          <View className="flex-row bg-gray-200 rounded-t-2xl w-full h-[70px] items-center justify-center gap-4">
            <TouchableOpacity
              className="bg-[#6663FD] px-4 py-2 rounded-full"
              onPress={handleUpload}
            >
              <Text className="text-white font-medium">Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-black px-4 py-2 rounded-full"
              onPress={() => setShowActions(false)}
            >
              <Text className="text-white font-medium">Go Live</Text>
            </TouchableOpacity>
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
                <IconComponent name={name} size={24} color={isActive ? '#6663FD' : '#000'} />
                <Text className={`text-xs mt-1 ${isActive ? 'text-[#6663FD]' : 'text-black'}`}>
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
              name={showActions ? 'close' : 'plus'}
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
                <IconComponent name={name} size={24} color={isActive ? '#6663FD' : '#000'} />
                <Text className={`text-xs mt-1 ${isActive ? 'text-[#6663FD]' : 'text-black'}`}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </>
  );
}
