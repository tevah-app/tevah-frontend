// // components/GoLiveScreen.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

// const icons = [
//   { name: 'refresh-ccw', action: 'flip' },
//   { name: 'music', action: 'music' },
//   { name: 'clock', action: 'timer' },
//   { name: 'zap-off', action: 'flash' },
//   { name: 'mic-off', action: 'mute' },
// ];

// const durations = ['10m', '5m', '2m', '60s', '30s'];

// const filters = [
//   { id: 1, image: 'https://randomuser.me/api/portraits/women/1.jpg' },
//   { id: 2, image: 'https://randomuser.me/api/portraits/men/2.jpg' },
//   { id: 3, image: 'https://randomuser.me/api/portraits/women/3.jpg' },
//   { id: 4, image: 'https://randomuser.me/api/portraits/men/4.jpg' },
//   { id: 5, image: 'https://randomuser.me/api/portraits/women/5.jpg' },
// ];

// const GoLiveScreen = () => {
//   const [selectedDuration, setSelectedDuration] = useState('60s');

//   const handleIconClick = (action: string) => {
//     console.log(`Icon pressed: ${action}`);
//     // Add toggle logic here for real interaction
//   };

//   return (
//     <View className="flex-1 bg-[#0D1A2D] pt-10 px-4 relative">
//       {/* Header */}
//       <View className="flex-row justify-between items-center mb-6">
//         <View className="bg-red-600 px-2 py-1 rounded-md flex-row items-center space-x-1">
//           <View className="w-2 h-2 rounded-full bg-white" />
//           <Text className="text-white text-xs font-medium">LIVE</Text>
//         </View>
//         <TouchableOpacity>
//           <Feather name="x" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       {/* Side Menu Icons */}
//       <View className="absolute right-4 top-24 space-y-6">
//         {icons.map((icon, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleIconClick(icon.action)}
//             className="p-2 rounded-full bg-white/10"
//           >
//             <Feather name={icon.name as any} size={24} color="white" />
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Bottom Controls */}
//       <View className="absolute bottom-8 w-full items-center px-4">
//         {/* Duration Selection */}
//         <View className="flex-row space-x-4 mb-4">
//           {durations.map((time, idx) => (
//             <TouchableOpacity
//               key={idx}
//               onPress={() => setSelectedDuration(time)}
//             >
//               <Text
//                 className={`text-xs font-medium ${
//                   selectedDuration === time ? 'text-white' : 'text-gray-400'
//                 }`}
//               >
//                 {time}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Record Button & Filters */}
//         <View className="flex-row items-center space-x-4 mb-4">
//           <View className="w-20 h-20 rounded-full border-4 border-white bg-white/20" />
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {filters.map((filter) => (
//               <TouchableOpacity key={filter.id} className="mx-2">
//                 <Image
//                   source={{ uri: filter.image }}
//                   className="w-12 h-12 rounded-full border-2 border-white"
//                 />
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         {/* Action Buttons */}
//         <View className="flex-row space-x-4">
//           <TouchableOpacity className="bg-white px-4 py-2 rounded-md">
//             <Text className="text-black font-semibold text-sm">Go Live</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text className="text-white font-medium text-sm">Upload</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default GoLiveScreen;










// components/GoLiveScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const icons = [
  { name: 'refresh-ccw', action: 'flip' },
  { name: 'music', action: 'music' },
  { name: 'clock', action: 'timer' },
  { name: 'zap-off', action: 'flash' },
  { name: 'mic-off', action: 'mute' },
];

const durations = ['10m', '5m', '2m', '60s', '30s'];

// 👇 Using local default avatar image
const filters = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

const defaultImage = require('../../assets/images/_Avatar Images (4).png');

const GoLiveScreen = () => {
  const [selectedDuration, setSelectedDuration] = useState('60s');

  const handleIconClick = (action: string) => {
    console.log(`Icon pressed: ${action}`);
  };

  return (
    <View className="flex-1 bg-[#0D1A2D] pt-10 px-4 relative">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View className="bg-red-600 px-2 py-1 rounded-md flex-row items-center space-x-1">
          <View className="w-2 h-2 rounded-full bg-white" />
          <Text className="text-white text-xs font-medium">LIVE</Text>
        </View>
        <TouchableOpacity>
          <Feather name="x" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Side Menu Icons */}
      <View className="absolute right-4 top-24 space-y-6">
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleIconClick(icon.action)}
            className="p-2 rounded-full bg-white/10"
          >
            <Feather name={icon.name as any} size={24} color="white" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Controls */}
      <View className="absolute bottom-8 w-full items-center px-4">
        {/* Duration Selection */}
        <View className="flex-row space-x-4 mb-4">
          {durations.map((time, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedDuration(time)}
            >
              <Text
                className={`text-xs font-medium ${
                  selectedDuration === time ? 'text-white' : 'text-gray-400'
                }`}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Record Button & Filters */}
        <View className="flex-row items-center space-x-4 mb-4">
          <View className="w-20 h-20 rounded-full border-4 border-white bg-white/20" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity key={filter.id} className="mx-2">
                <Image
                  source={defaultImage}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-4">
          <TouchableOpacity className="bg-white px-4 py-2 rounded-md">
            <Text className="text-black font-semibold text-sm">Go Live</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-white font-medium text-sm">Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GoLiveScreen;
