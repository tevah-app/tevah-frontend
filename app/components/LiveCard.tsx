// // import React from 'react';
// // import { View, Text, Image, TouchableOpacity } from 'react-native';

// // interface LiveCardProps {
// //   imageUrl: string;
// //   title: string;
// //   speaker: string;
// //   timeAgo: string;
// //   onPress?: () => void;
// // }

// // export default function LiveCard({
// //   imageUrl,
// //   title,
// //   speaker,
// //   timeAgo,
// //   onPress,
// // }: LiveCardProps) {
// //   return (
// //     <TouchableOpacity onPress={onPress} className="mb-4">
// //       <Image
// //         source={{ uri: imageUrl }}
// //         className="w-full h-44 rounded-xl mb-2"
// //         resizeMode="cover"
// //       />
// //       <Text className="text-base font-semibold">{title}</Text>
// //       <Text className="text-xs text-gray-600">
// //         {speaker} • {timeAgo}
// //       </Text>
// //     </TouchableOpacity>
// //   );
// // }

// // import React from 'react';
// // import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';

// // interface VideoCard {
// //   imageUrl: string;
// //   title: string;
// //   speaker: string;
// //   timeAgo: string;
// //   onPress?: () => void;
// // }

// // export default function LiveCardSlider() {
// //   const videos: VideoCard[] = [
// //     {
// //       imageUrl: 'https://source.unsplash.com/random/300x200?gospel',
// //       title: 'Worship Night',
// //       speaker: 'Minister Joseph Eluwa',
// //       timeAgo: '3HRS AGO',
// //     },
// //     {
// //       imageUrl: 'https://source.unsplash.com/random/300x200?church',
// //       title: 'Praise & Power',
// //       speaker: 'Sis. Grace Ali',
// //       timeAgo: '2HRS AGO',
// //     },
// //     {
// //       imageUrl: 'https://source.unsplash.com/random/300x200?worship',
// //       title: 'Deep Worship',
// //       speaker: 'Minister John Mark',
// //       timeAgo: '1HR AGO',
// //     },
// //   ];

// //   return (
// //     <View className="mt-2 w-[333px]">
// //       <ScrollView
// //         horizontal
// //         showsHorizontalScrollIndicator={false}
// //         contentContainerStyle={{ paddingHorizontal: 16 }}
// //       >
// //         {videos.map((video, index) => (
// //           <TouchableOpacity
// //             key={index}
// //             onPress={video.onPress}
// //             className="w-[320px] h-[282px] bg-blue-600 "
// //             activeOpacity={0.9}
// //           >
// //             <Image
// //               source={{ uri: video.imageUrl }}
// //               className="w-full h-[232px] rounded-[15px] mb-2 bg-black"
// //               resizeMode="cover"
// //             />
// //             <Text className="text-base font-semibold">{video.title}</Text>
// //             <Text className="text-xs text-gray-600">
// //               {video.speaker} • {video.timeAgo}
// //             </Text>
// //           </TouchableOpacity>
// //         ))}
// //       </ScrollView>
// //     </View>
// //   );
// // }

// import React from 'react';
// import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';

// interface VideoCard {
//   imageUrl: string;
//   title: string;
//   speaker: string;
//   timeAgo: string;
//   onPress?: () => void;
// }

// export default function LiveCardSlider() {
//   const videos: VideoCard[] = [
//     {
//       imageUrl: 'https://source.unsplash.com/random/300x200?gospel',
//       title: 'Worship Night',
//       speaker: 'Minister Joseph Eluwa',
//       timeAgo: '3HRS AGO',
//     },
//     {
//       imageUrl: 'https://source.unsplash.com/random/300x200?church',
//       title: 'Praise & Power',
//       speaker: 'Sis. Grace Ali',
//       timeAgo: '2HRS AGO',
//     },
//     {
//       imageUrl: 'https://source.unsplash.com/random/300x200?worship',
//       title: 'Deep Worship',
//       speaker: 'Minister John Mark',
//       timeAgo: '1HR AGO',
//     },
//   ];

//   return (
//     <View className="mt-2">
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 4 }}
//       >
//         {videos.map((video, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={video.onPress}
//             className="mr-4 w-[250px]"
//             activeOpacity={0.9}
//           >
//             <Image
//               source={{ uri: video.imageUrl }}
//               className="w-full h-[160px] rounded-[15px] mb-2 bg-black"
//               resizeMode="cover"
//             />
//             <Text className="text-base font-semibold">{video.title}</Text>
//             <Text className="text-xs text-gray-600">
//               {video.speaker} • {video.timeAgo}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// import badgeIcon from "../../assets/images/path961.png";

interface VideoCard {
  imageUrl: string;
  title: string;
  speaker: string;
  timeAgo: string;
  speakerAvatar: any;
  views: number;
  onPress?: () => void;
}

export default function LiveCardSlider() {
  const videos: VideoCard[] = [
    {
      imageUrl: "https://source.unsplash.com/random/300x200?gospel",
      title:
        "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
      speaker: "Minister Joseph Eluwa",
      timeAgo: "3HRS AGO",
      speakerAvatar: require("../../assets/images/Avatar-1.png"),
      views: 500,
    },
    {
      imageUrl: "https://source.unsplash.com/random/300x200?church",
      title: "Praise & Power",
      speaker: "Sis. Grace Ali",
      timeAgo: "2HRS AGO",
      speakerAvatar: require("../../assets/images/Avatar-1.png"),
      views: 400,
    },

    {
      imageUrl: "https://source.unsplash.com/random/300x200?worship",
      title: "Deep Worship",
      speaker: "Minister John Mark",
      timeAgo: "1HR AGO",
      speakerAvatar: require("../../assets/images/Avatar-1.png"),
      views: 700,
    },
  ];

  return (
    <View className="">

<Text className="text-[16px] font-rubik-semibold  text-[#344054] mt-4 mb-2 ml-2">See Who is Live</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {videos.map((video, index) => (
          <TouchableOpacity
            key={index}
            onPress={video.onPress}
            className="mr-4 w-[280px] h-[282px] rounded-t-2xl bg-white shadow"
            activeOpacity={0.9}
          >
            {/* Video Thumbnail */}
            <View className="w-full h-[232px] rounded-xl overflow-hidden relative bg-blue-300">
              <Image
                source={{ uri: video.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />

              {/* LIVE Badge */}
              <View className="absolute top-2 right-2 bg-red-600 px-2 py-0.5 rounded-md z-10 flex flex-row items-center h-[23px] mt-2 mr-2">
                <Text className="text-white text-xs font-bold">LIVE</Text>
                {/* assets/images/Vector.png */}
                <Image
                  source={require("../../assets/images/Vector.png")}
                  className="h-[10px] w-[10px]  ml-2"
                  resizeMode="contain"
                />
              </View>

              {/* Title Overlay */}
              <View className="absolute bottom-2 left-2 right-2 z-10">
                <Text className="text-white font-semibold text-sm">
                  {video.title}
                </Text>
              </View>
            </View>

            {/* Speaker Info */}
            <View className="flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center relative ml-1 mt-2">
                  <Image
                    source={video.speakerAvatar}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 999,
                      marginLeft: 26,
                      marginTop: 15,
                    }}
                    resizeMode="cover"
                  />
      
                </View>
                <View className="ml-3">
                  <Text className="text-[13px]  font-rubik-semibold  text-[#344054] mt-1 ">
                    {video.speaker}
                  </Text>
                  <View className="flex-row items-center mt-0.5">
                    {/* assets/images/Vector1.png */}

                    <Image
                      source={require("../../assets/images/Vector1.png")}
                      className="h-[10px] w-[10px]  ml-2"
                      resizeMode="contain"
                    />

                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {video.views}
                    </Text>

                    <Ionicons
                      name="time-outline"
                      size={13}
                      color="#9CA3AF"
                      style={{ marginLeft: 6 }}
                    />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {video.timeAgo}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mr-2">
                <Ionicons name="ellipsis-vertical" size={18} color="#9CA3AF" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
