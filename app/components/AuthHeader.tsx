import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface AuthHeaderProps {
  title: string;
  showCancel?: boolean;
}

export default function successfullCard({ title, showCancel = true }: AuthHeaderProps) {
  return (

    <View className="flex flex-row items-end bg-white justify-between h-[78px] w-full">
 <View className="flex-row items-center bg-white justify-between mt-4 mb-0 w-full  mx-auto">
      <TouchableOpacity 
        onPress={() => router.back()}
        className="w-10 h-10 items-center justify-center"
      >
        <MaterialIcons name="arrow-back" size={24} color="#1D2939" />
      </TouchableOpacity>

      <Text className="text-lg font-semibold text-[#1D2939]">
        {title}
      </Text>

      {showCancel && (
        <TouchableOpacity 
          onPress={() => router.push("/")}
          className="w-10 h-10 items-center justify-center"
        >
          <MaterialIcons name="close" size={24} color="#1D2939" />
        </TouchableOpacity>
      )}
    </View>
    </View>






   
  );
} 