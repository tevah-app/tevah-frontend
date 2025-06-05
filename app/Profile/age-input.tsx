





// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { Platform, Text, TouchableOpacity, View } from 'react-native';
// import AuthHeader from '../components/AuthHeader';
// import ProgressBar from '../components/ProgressBar';


// export default function AgeInputScreen() {
//   const router = useRouter();
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   const handleNext = () => {
//     // You can handle the selected date here
//       router.replace('/Profile/churchNameAndLocation');
//   };

//   const onChange = (event: any, selectedDate?: Date) => {
//     if (Platform.OS === 'android') {
//       setShowPicker(false); // Hide after selection on Android
//     }
  
//     if (selectedDate) {
//       setDate(selectedDate);
//     }
//   };
//   return (
//     <View className="flex-1 bg-white">
//       {/* Header */}
//       <AuthHeader title="Profile set up" showCancel />

//       {/* Progress bar */}
//       <View className="flex flex-col w-[333px] mx-auto mt-2">
//         <ProgressBar currentStep={1} totalSteps={7} />
//         <Text className="text-[#1D2939] font-semibold mt-2 text-left">Let&apos;s make this feel like home</Text>
//       </View>

//       {/* Main content */}
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-3xl font-extrabold text-[#1D2939] mb-6 mt-6 w-[333px] text-left">Tell us your age</Text>
//         <TouchableOpacity
//           className="w-[333px] h-[56px] bg-white rounded-2xl shadow-md justify-center items-center mb-8 border border-[#E0E0FF]"
//           onPress={() => setShowPicker(true)}
//         >
//           <Text className="text-lg text-[#1D2939]">
//             {date ? date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Select your date of birth'}
//           </Text>
//         </TouchableOpacity>
//         {showPicker && (
//           <DateTimePicker
//             value={date}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={onChange}
//             maximumDate={new Date()}
//           />
//         )}
//       </View>

//       {/* Next Button */}
//       <View className="w-full px-6 mb-8">
//         <TouchableOpacity
//           onPress={handleNext}
//           className="bg-[#090E24] rounded-full w-full h-[48px] items-center justify-center"
//         >
//           <Text className="text-white text-center text-base font-semibold">Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// } 













import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AuthHeader from "../components/AuthHeader";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ CORRECT


export default function AgeInputScreen() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateAge = (dob: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleNext = async () => {
    const age = calculateAge(date);

    if (age < 1 || age > 120) {
      Alert.alert("Invalid age", "Please select a valid date of birth.");
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
 // Replace with real token logic

      const response = await axios.post(
        "http://192.168.43.62:4000/api/auth/complete-profile",
        { age },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        router.replace("/Profile/churchNameAndLocation");
      } else {
        Alert.alert("Error", response.data.message || "An error occurred");
      }
    } catch (error: any) {
      console.error("Age submission failed:", error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <AuthHeader title="Profile set up" showCancel />

      <View className="flex flex-col w-[333px] mx-auto mt-2">
        <ProgressBar currentStep={1} totalSteps={7} />
        <Text className="text-[#1D2939] font-semibold mt-2 text-left">
          Let&apos;s make this feel like home
        </Text>
      </View>

      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-extrabold text-[#1D2939] mb-6 mt-6 w-[333px] text-left">
          Tell us your age
        </Text>
        <TouchableOpacity
          className="w-[333px] h-[56px] bg-white rounded-2xl shadow-md justify-center items-center mb-8 border border-[#E0E0FF]"
          onPress={() => setShowPicker(true)}
        >
          <Text className="text-lg text-[#1D2939]">
            {date
              ? date.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Select your date of birth"}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
            maximumDate={new Date()}
          />
        )}
      </View>

      <View className="w-full px-6 mb-8">
        <TouchableOpacity
          onPress={handleNext}
          className={`bg-[#090E24] rounded-full w-full h-[48px] items-center justify-center ${
            loading ? "opacity-50" : ""
          }`}
          disabled={loading}
        >
          <Text className="text-white text-center text-base font-semibold">
            {loading ? "Submitting..." : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
