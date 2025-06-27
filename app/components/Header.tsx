import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Import your local default image
const defaultAvatar = require('../../assets/images/image (5).png'); // <-- path to your image

export default function Header() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const savedAvatar = await AsyncStorage.getItem('userAvatarUrl');
        if (savedAvatar) {
          setAvatarUrl(savedAvatar);
        }
      } catch (error) {
        console.error("Failed to load avatar from storage:", error);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <View className="flex-row justify-between items-center bg-white mt-12   w-[320px] ml-5">
      <View className="flex-row items-center justify-center">
        <Image
          source={avatarUrl ? { uri: avatarUrl } : defaultAvatar}
          className="w-[38px] h-[38px] rounded-[8px]"
        />
        <View className="ml-2">
          <Text className="text-[14px] font-rubik font-medium text-[#090E24]">Lizzy</Text>
          <Text className="text-[10px]  text-[#090E24] font-rubik font-medium">ADULTS</Text>
        </View>
      </View>
      <View className="flex-row gap-4">
      <Ionicons name="search-outline" size={24} color="#090E24" />
        <Ionicons name="notifications-outline" size={24} color="#090E24" />
    
        <Ionicons name="download-outline" size={24} color="#090E24" />
      </View>
    </View>
  );
}
