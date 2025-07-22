









import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';

interface AuthHeaderProps {
  title: string;
  showCancel?: boolean;
}

export default function AuthHeader({ title, showCancel = true }: AuthHeaderProps) {
  return (
    <View className="flex-row items-center justify-between bg-white mt-3 mb-2">
      <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
        <MaterialIcons name="arrow-back" size={24} color="#1D2939" />
      </TouchableOpacity>

      <Text className="text-lg font-rubik-semibold text-[#1D2939]">{title}</Text>

      {showCancel ? (
        <TouchableOpacity onPress={() => router.push('/')} className="w-10 h-10 items-center justify-center">
          <MaterialIcons name="close" size={24} color="#1D2939" />
        </TouchableOpacity>
      ) : (
        <View className="w-10 h-10" />
      )}
    </View>
  );
}
