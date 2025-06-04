// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// interface SuccessfulCardProps {
//   onClose?: () => void;
// }

// export default function SuccessfulCard({ onClose }: SuccessfulCardProps) {
//   return (
//     <View className="flex-row items-center justify-between w-[300px] h-[40px] bg-[#039855] rounded-lg px-4">
//       <View className="flex-row items-center">
//         <MaterialIcons name="check-circle" size={24} color="white" />
//         <Text className="text-white ml-24 font-medium">Success</Text>
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

interface InfoCardProps {
  onClose?: () => void;
  text: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  backgroundColor?: string;
  textColor?: string;
}

export default function SuccessfulCard({
  onClose,
  text,
  icon = 'check-circle',
  backgroundColor = '#039855',
  textColor = 'white',
}: InfoCardProps) {
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

