// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import React from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';

// interface FailureCardProps {
//   onClose?: () => void;
// }

// export default function FailureCard({ onClose }: FailureCardProps) {
//   return (
//     <View className="flex-row items-center justify-between w-[300px] h-[40px] bg-[#F04438] rounded-lg px-4">
//       <View className="flex-row items-center">
//         <MaterialIcons name="error" size={24} color="white" />
//         <Text className="text-white ml-24 font-medium">Invalid Code</Text>
//       </View>
//       <TouchableOpacity onPress={onClose}>
//         <MaterialIcons name="close" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// } 






import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface DynamicCardProps {
  onClose?: () => void;
  text: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  backgroundColor?: string;
  textColor?: string;
}

export default function FailureCard({
  onClose,
  text,
  icon = 'error',
  backgroundColor = '#F04438',
  textColor = 'white',
}: DynamicCardProps) {
  return (
    <View
      className="flex-row items-center justify-between w-[300px] h-[40px] rounded-lg px-4"
      style={{ backgroundColor }}
    >
      <View className="flex-row items-center">
        <MaterialIcons name={icon} size={24} color={textColor} />
        <Text className="ml-4 font-medium" style={{ color: textColor }}>
          {text}
        </Text>
      </View>
      <TouchableOpacity onPress={onClose}>
        <MaterialIcons name="close" size={24} color={textColor} />
      </TouchableOpacity>
    </View>
  );
}
