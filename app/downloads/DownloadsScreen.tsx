// import React from 'react';
// import { View, Text, Image, FlatList, ScrollView, StyleSheet } from 'react-native';
// import { Ionicons, Feather } from '@expo/vector-icons';
// import { useFonts } from 'expo-font';
// import { AuthHeader } from '@/components/AuthHeader'; // Adjust to your path

// // Font loader
// const useRubik = () => {
//   const [fontsLoaded] = useFonts({
//     RubikRegular: require('@/assets/fonts/Rubik-Regular.ttf'),
//     RubikBold: require('@/assets/fonts/Rubik-Bold.ttf'),
//     RubikMedium: require('@/assets/fonts/Rubik-Medium.ttf'),
//   });

//   return fontsLoaded;
// };

// // TypeScript interface
// interface SermonItem {
//   title: string;
//   description: string;
//   artist: string;
//   timeAgo: string;
//   size: string;
//   image: any; // Replace with ImageSourcePropType if desired
// }

// // Dummy data
// const downloadData: SermonItem[] = [
//   {
//     title: 'The Art of Seeing Miracles',
//     description: 'Discover how to align your vision with faith and expect miracles in everyday life.',
//     artist: 'Minister Joseph Eluwa',
//     timeAgo: '3hrs ago',
//     size: '15MB',
//     image: require('@/assets/sermon1.jpg'),
//   },
//   {
//     title: 'Faith Beyond Feelings',
//     description: 'Learn how to walk in unwavering faith even when emotions are overwhelming.',
//     artist: 'Minister Joseph Eluwa',
//     timeAgo: '6hrs ago',
//     size: '18MB',
//     image: require('@/assets/sermon2.jpg'),
//   },
//   {
//     title: 'Power in the Name of Jesus',
//     description: 'Explore the authority believers carry through the name above all names.',
//     artist: 'Minister Joseph Eluwa',
//     timeAgo: 'Yesterday',
//     size: '20MB',
//     image: require('@/assets/sermon3.jpg'),
//   },
//   {
//     title: 'The Secret Place',
//     description: 'A teaching on cultivating a deep and intimate relationship with God in private.',
//     artist: 'Minister Joseph Eluwa',
//     timeAgo: '2 days ago',
//     size: '22MB',
//     image: require('@/assets/sermon4.jpg'),
//   },
//   {
//     title: 'Victory Over Fear',
//     description: 'How to overcome anxiety and fear by trusting in God’s promises.',
//     artist: 'Minister Joseph Eluwa',
//     timeAgo: 'Last week',
//     size: '17MB',
//     image: require('@/assets/sermon5.jpg'),
//   },
// ];

// // Centralized font styles
// const fonts = StyleSheet.create({
//   regular: { fontFamily: 'RubikRegular' },
//   bold: { fontFamily: 'RubikBold' },
//   medium: { fontFamily: 'RubikMedium' },
// });

// // Reusable card
// const DownloadCard: React.FC<SermonItem> = ({
//   title,
//   description,
//   artist,
//   timeAgo,
//   size,
//   image,
// }) => (
//   <View className="flex-row mb-4">
//     <Image source={image} className="w-16 h-16 rounded-lg mr-3" />
//     <View className="flex-1">
//       <Text className="text-base text-black" style={fonts.bold}>
//         {title}
//       </Text>
//       <Text
//         className="text-xs text-gray-500"
//         style={fonts.regular}
//         numberOfLines={2}
//       >
//         {description}
//       </Text>
//       <View className="flex-row items-center mt-1">
//         <Ionicons name="person-circle-outline" size={16} color="#888" />
//         <Text className="text-xs text-gray-600 ml-1" style={fonts.regular}>
//           {artist}
//         </Text>
//         <Text className="text-xs text-gray-500 mx-2">• {timeAgo}</Text>
//         <Text className="text-xs text-gray-500">• {size}</Text>
//         <Feather name="check-circle" size={14} color="green" className="ml-2" />
//       </View>
//     </View>
//     <Feather name="volume-2" size={18} color="#555" className="ml-2 mt-1" />
//   </View>
// );

// // Main screen
// const DownloadsScreen = () => {
//   const fontsLoaded = useRubik();
//   if (!fontsLoaded) return null;

//   const renderSection = (
//     title: string,
//     data: SermonItem[]
//   ): React.ReactNode => (
//     <View className="mt-4">
//       <Text className="text-sm text-gray-800 mb-3" style={fonts.medium}>
//         {title}
//       </Text>
//       {data.map((item, idx) => (
//         <DownloadCard key={idx} {...item} />
//       ))}
//     </View>
//   );

//   return (
//     <ScrollView className="bg-white flex-1 px-4 mt-6">
//       <AuthHeader title="Downloads" />

//       {/* Profile Info */}
//       <View className="flex-row items-center my-4">
//       <Image
//   source={require('@/assets/images/profile.jpg')} // adjust path as needed
//   className="w-8 h-8 rounded-full mr-2"
// />

//         <Text className="text-sm text-black" style={fonts.medium}>
//           Lizzy
//         </Text>
//         <Text className="text-xs text-gray-400 ml-1">• Adults</Text>
//       </View>

//       {/* Smart Download */}
//       <View className="bg-gray-100 p-4 rounded-xl mb-6">
//         <Text className="text-base text-black mb-1" style={fonts.medium}>
//           Smart download
//         </Text>
//         <Text className="text-xs text-gray-600" style={fonts.regular}>
//           Automatically downloads content for you based on what you watch when connected to a wifi
//         </Text>
//         <Text className="text-xs text-blue-500 mt-2" style={fonts.medium}>
//           SETUP
//         </Text>
//       </View>

//       {/* Sections */}
//       {renderSection('Your downloads', downloadData.slice(0, 3))}
//       {renderSection('Automatic downloads', downloadData.slice(3))}
//     </ScrollView>
//   );
// };

// export default DownloadsScreen;
