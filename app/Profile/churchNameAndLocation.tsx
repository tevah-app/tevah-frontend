



// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import AuthHeader from "../components/AuthHeader";
// import ProgressBar from "../components/ProgressBar";
// import * as Location from "expo-location";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";

// type Suggestion = {
//   id: string;
//   name: string;
//   type: "church" | "location";
// };

// function ChurchNameAndLocation() {
//   const [search, setSearch] = useState("");
//   const [churches, setChurches] = useState<Suggestion[]>([]);
//   const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
//   const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
//     []
//   );
//   const [selectedItem, setSelectedItem] = useState<Suggestion | null>(null);

//   // Get current location & nearby churches on mount
//   useEffect(() => {
//     const fetchLocationAndChurches = async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           console.log("Permission denied");
//           return;
//         }

//         const location = await Location.getCurrentPositionAsync({});
//         const lat = location.coords.latitude;
//         const lng = location.coords.longitude;

//         const res = await fetch(
//           `http://192.168.100.47:4000/api/churches?lat=${lat}&lng=${lng}`
//         );
//         const data = await res.json();

//         const churchSuggestions = data.map((church: any) => ({
//           id: church.id,
//           name: church.name,
//           type: "church" as const,
//         }));

//         setChurches(churchSuggestions);
//       } catch (error) {
//         console.error("Error fetching churches:", error);
//       }
//     };

//     fetchLocationAndChurches();
//   }, []);

//   // Fetch suggestions from Google Maps Places API
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const fetchSuggestions = async () => {
//         if (search.trim().length === 0) {
//           setFilteredSuggestions([]);
//           return;
//         }
      
//         try {
//           const locRes = await fetch(
//             `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
//               search
//             )}&key=AIzaSyBh0wMTrbudGPQdd-a3GfBZycczoVyyw3M`
//           );
      
//           const locData = await locRes.json();
      
//           if (!locData.predictions || !Array.isArray(locData.predictions)) {
//             console.error("No predictions returned:", locData);
//             return;
//           }
      
//           const locationSuggestions: Suggestion[] = locData.predictions.map(
//             (prediction: any) => ({
//               id: prediction.place_id,
//               name: prediction.description,
//               type: "location",
//             })
//           );
      
//           setFilteredSuggestions(locationSuggestions);
//         } catch (err) {
//           console.error("Error fetching suggestions:", err);
//         }
//       };
      
      
      

//       fetchSuggestions();
//     }, 400);

//     return () => clearTimeout(timeout);
//   }, [search, churches]);

//   // Handle selection
//   const selectSuggestion = async (item: Suggestion) => {
//     setSearch(item.name);
//     setSelectedItem(item);
//     setFilteredSuggestions([]);

//     if (item.type === "location") {
//       try {
//         const geoRes = await fetch(
//           `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.id}&key=AIzaSyBh0wMTrbudGPQdd-a3GfBZycczoVyyw3M`
//         );
//         const geoData = await geoRes.json();
//         const loc = geoData.result?.geometry?.location;

//         if (loc) {
//           const res = await fetch(
//             `http://192.168.100.47:4000/api/churches?lat=${loc.lat}&lng=${loc.lng}`
//           );
//           const churchData = await res.json();

//           const churchSuggestions = churchData.map((church: any) => ({
//             id: church.id,
//             name: church.name,
//             type: "church" as const,
//           }));

//           setChurches(churchSuggestions);
//         }
//       } catch (error) {
      
//       }
//     } else {
//       console.log("Selected church:", item);
//     }
//   };

//   const handleNext = () => {
//     router.push("/avatars/indexAvatar");
//   };

//   return (
//     <View className="flex flex-col bg-[#FCFCFD] mx-auto w-full justify-center items-center">
//       <AuthHeader title="Profile Setup" />
//       <View className="flex flex-col w-[333px] mt-4">
//         <ProgressBar currentStep={3} totalSteps={7} />
//         <Text className="text-[#1D2939] font-semibold mt-3 ml-1">
//           Let&apos;s make this feel like home
//         </Text>
//       </View>

//       <View className="flex flex-col h-[627px] w-[333px]">
//         <View className="flex flex-col h-[257px]">
//           <Text className="font-rubik-semibold text-[32px] text-[#1D2939]">
//             What’s the name of your church?
//           </Text>

//           {/* Search Input */}
//           <View className="flex flex-row items-center justify-between h-[56px] w-[333px] mt-5 border rounded-3xl bg-white px-3 mb-2">
//             <TextInput
//               className="flex-1 h-full text-base text-gray-800"
//               placeholder="Search church or location"
//               onChangeText={(text) => {
//                 setSearch(text);
//                 setSelectedItem(null);
//               }}
//               value={search}
//             />
//             <Ionicons name="search" size={30} color="#6B7280" />
//           </View>

//           {/* Suggestions List */}
//           <FlatList
//             data={filteredSuggestions}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <TouchableOpacity onPress={() => selectSuggestion(item)}>
//                 <Text className="p-3 bg-white border-b">
//                   {item.name}
//                   {item.type === "location" ? " (Location)" : ""}
//                 </Text>
//               </TouchableOpacity>
//             )}
//             ListEmptyComponent={
//               search.trim().length > 0 ? (
//                 <Text className="text-center text-gray-500 mt-4">
//                   No matches found
//                 </Text>
//               ) : null
//             }
//           />

//           {/* Next Button */}
//           {selectedItem && (
//                <TouchableOpacity
//                onPress={handleNext}
//                className="bg-[#090E24] rounded-full w-full h-[48px] items-center justify-center"
//              >
//                <Text className="text-white text-center text-base font-semibold">Next</Text>
//              </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// }

// export default ChurchNameAndLocation;
















// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   ToastAndroid,
// } from "react-native";
// import AuthHeader from "../components/AuthHeader";
// import ProgressBar from "../components/ProgressBar";
// import * as Location from "expo-location";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type Suggestion = {
//   id: string;
//   name: string;
//   type: "church" | "location";
// };

// function ChurchNameAndLocation() {
//   const [search, setSearch] = useState("");
//   const [churches, setChurches] = useState<Suggestion[]>([]);
//   const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
//     []
//   );
//   const [selectedItem, setSelectedItem] = useState<Suggestion | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchLocationAndChurches = async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           console.log("Permission denied");
//           return;
//         }

//         const location = await Location.getCurrentPositionAsync({});
//         const lat = location.coords.latitude;
//         const lng = location.coords.longitude;

//         const res = await fetch(
//           `http://192.168.100.47:4000/api/churches?lat=${lat}&lng=${lng}`
//         );
//         const data = await res.json();

//         const churchSuggestions = data.map((church: any) => ({
//           id: church.id,
//           name: church.name,
//           type: "church" as const,
//         }));

//         setChurches(churchSuggestions);
//       } catch (error) {
//         console.error("Error fetching churches:", error);
//       }
//     };

//     fetchLocationAndChurches();
//   }, []);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const fetchSuggestions = async () => {
//         if (search.trim().length === 0) {
//           setFilteredSuggestions([]);
//           return;
//         }

//         try {
//           const locRes = await fetch(
//             `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
//               search
//             )}&key=AIzaSyBh0wMTrbudGPQdd-a3GfBZycczoVyyw3M`
//           );

//           const locData = await locRes.json();

//           if (!locData.predictions || !Array.isArray(locData.predictions)) {
//             console.error("No predictions returned:", locData);
//             return;
//           }

//           const locationSuggestions: Suggestion[] = locData.predictions.map(
//             (prediction: any) => ({
//               id: prediction.place_id,
//               name: prediction.description,
//               type: "location",
//             })
//           );

//           setFilteredSuggestions(locationSuggestions);
//         } catch (err) {
//           console.error("Error fetching suggestions:", err);
//         }
//       };

//       fetchSuggestions();
//     }, 400);

//     return () => clearTimeout(timeout);
//   }, [search, churches]);

//   const selectSuggestion = async (item: Suggestion) => {
//     setSearch(item.name);
//     setSelectedItem(item);
//     setFilteredSuggestions([]);

//     if (item.type === "location") {
//       try {
//         const geoRes = await fetch(
//           `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.id}&key=AIzaSyBh0wMTrbudGPQdd-a3GfBZycczoVyyw3M`
//         );
//         const geoData = await geoRes.json();
//         const loc = geoData.result?.geometry?.location;

//         if (loc) {
//           const res = await fetch(
//             `http://192.168.43.62:4000/api/churches?lat=${loc.lat}&lng=${loc.lng}`
//           );
//           const churchData = await res.json();

//           const churchSuggestions = churchData.map((church: any) => ({
//             id: church.id,
//             name: church.name,
//             type: "church" as const,
//           }));

//           setChurches(churchSuggestions);
//         }
//       } catch (error) {
//         console.error("Error fetching churches for location:", error);
//       }
//     }
//   };

//   const handleNext = async () => {
//     if (!selectedItem) return;

//     try {
//       setIsSubmitting(true);

//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         ToastAndroid.show("No token found", ToastAndroid.SHORT);
//         return;
//       }

//       const res = await fetch("http://192.168.43.62:4000/api/user/complete-profile", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           location: selectedItem.name,
//           locationType: selectedItem.type,
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to update location");

//       ToastAndroid.show("Location submitted", ToastAndroid.SHORT);
//       router.push("/avatars/indexAvatar");
//     } catch (err) {
//       console.error(err);
//       ToastAndroid.show("Error submitting location", ToastAndroid.SHORT);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <View className="flex flex-col bg-[#FCFCFD] mx-auto w-full justify-center items-center">
//       <AuthHeader title="Profile Setup" />
//       <View className="flex flex-col w-[333px] mt-4">
//         <ProgressBar currentStep={3} totalSteps={7} />
//         <Text className="text-[#1D2939] font-semibold mt-3 ml-1">
//           Let&apos;s make this feel like home
//         </Text>
//       </View>

//       <View className="flex flex-col h-[627px] w-[333px]">
//         <View className="flex flex-col h-[257px]">
//           <Text className="font-rubik-semibold text-[32px] text-[#1D2939]">
//             What’s the name of your church?
//           </Text>

//           <View className="flex flex-row items-center justify-between h-[56px] w-[333px] mt-5 border rounded-3xl bg-white px-3 mb-2">
//             <TextInput
//               className="flex-1 h-full text-base text-gray-800"
//               placeholder="Search church or location"
//               onChangeText={(text) => {
//                 setSearch(text);
//                 setSelectedItem(null);
//               }}
//               value={search}
//             />
//             <Ionicons name="search" size={30} color="#6B7280" />
//           </View>

//           <FlatList
//             data={filteredSuggestions}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <TouchableOpacity onPress={() => selectSuggestion(item)}>
//                 <Text className="p-3 bg-white border-b">
//                   {item.name}
//                   {item.type === "location" ? " (Location)" : ""}
//                 </Text>
//               </TouchableOpacity>
//             )}
//             ListEmptyComponent={
//               search.trim().length > 0 ? (
//                 <Text className="text-center text-gray-500 mt-4">
//                   No matches found
//                 </Text>
//               ) : null
//             }
//           />

//           {selectedItem && (
//             <TouchableOpacity
//               onPress={handleNext}
//               disabled={isSubmitting}
//               className={`bg-[#090E24] rounded-full w-full h-[48px] items-center justify-center mt-4 ${
//                 isSubmitting ? "opacity-50" : ""
//               }`}
//             >
//               <Text className="text-white text-center text-base font-semibold">
//                 {isSubmitting ? "Submitting..." : "Next"}
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// }

// export default ChurchNameAndLocation;










import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AuthHeader from "../components/AuthHeader";
import ProgressBar from "../components/ProgressBar";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ CORRECT


type Suggestion = {
  id: string;
  name: string;
  type: "church" | "location";
};

function ChurchNameAndLocation() {
  const [search, setSearch] = useState("");
  const [churches, setChurches] = useState<Suggestion[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    []
  );
  const [selectedItem, setSelectedItem] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocationAndChurches = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const lat = location.coords.latitude;
        const lng = location.coords.longitude;

        const res = await fetch(
          `http://192.168.43.62:4000/api/churches?lat=${lat}&lng=${lng}`
        );
        const data = await res.json();

        const churchSuggestions = data.map((church: any) => ({
          id: church.id,
          name: church.name,
          type: "church" as const,
        }));

        setChurches(churchSuggestions);
      } catch (error) {
        console.error("Error fetching churches:", error);
      }
    };

    fetchLocationAndChurches();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchSuggestions = async () => {
        if (search.trim().length === 0) {
          setFilteredSuggestions([]);
          return;
        }

        try {
          const locRes = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
              search
            )}&key=AIzaSyBh0wMTrbudGPQdd-a3GfBZycczoVyyw3M`
          );

          const locData = await locRes.json();

          if (!locData.predictions || !Array.isArray(locData.predictions)) {
            console.error("No predictions returned:", locData);
            return;
          }

          const locationSuggestions: Suggestion[] = locData.predictions.map(
            (prediction: any) => ({
              id: prediction.place_id,
              name: prediction.description,
              type: "location",
            })
          );

          setFilteredSuggestions(locationSuggestions);
        } catch (err) {
          console.error("Error fetching suggestions:", err);
        }
      };

      fetchSuggestions();
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  const selectSuggestion = async (item: Suggestion) => {
    setSearch(item.name);
    setSelectedItem(item);
    setFilteredSuggestions([]);

    if (item.type === "location") {
      try {
        const geoRes = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.id}&key=AIzaSyBh0wMTrbudGPQdd-a3GfBZycczoVyyw3M`
        );
        const geoData = await geoRes.json();
        const loc = geoData.result?.geometry?.location;

        if (loc) {
          const res = await fetch(
            `http://192.168.43.62:4000/api/churches?lat=${loc.lat}&lng=${loc.lng}`
          );
          const churchData = await res.json();

          const churchSuggestions = churchData.map((church: any) => ({
            id: church.id,
            name: church.name,
            type: "church" as const,
          }));

          setChurches(churchSuggestions);
        }
      } catch (error) {
        console.error("Error processing location:", error);
      }
    }
  };

  const handleNext = async () => {
    if (!selectedItem?.name) {
      Alert.alert("Please select a valid church or location");
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
// Replace with your actual auth token logic

      const response = await axios.post(
        "http://192.168.43.62:4000/api/auth/complete-profile",
        {
          location: selectedItem.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        router.push("/avatars/indexAvatar");
      } else {
        Alert.alert("Error", response.data.message || "An error occurred");
      }
    } catch (error: any) {
      console.error("Location submission error:", error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex flex-col bg-[#FCFCFD] mx-auto w-full justify-center items-center">
      <AuthHeader title="Profile Setup" />
      <View className="flex flex-col w-[333px] mt-4">
        <ProgressBar currentStep={3} totalSteps={7} />
        <Text className="text-[#1D2939] font-semibold mt-3 ml-1">
          Let&apos;s make this feel like home
        </Text>
      </View>

      <View className="flex flex-col h-[627px] w-[333px]">
        <View className="flex flex-col h-[257px]">
          <Text className="font-rubik-semibold text-[32px] text-[#1D2939]">
            What’s the name of your church?
          </Text>

          <View className="flex flex-row items-center justify-between h-[56px] w-[333px] mt-5 border rounded-3xl bg-white px-3 mb-2">
            <TextInput
              className="flex-1 h-full text-base text-gray-800"
              placeholder="Search church or location"
              onChangeText={(text) => {
                setSearch(text);
                setSelectedItem(null);
              }}
              value={search}
            />
            <Ionicons name="search" size={30} color="#6B7280" />
          </View>

          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectSuggestion(item)}>
                <Text className="p-3 bg-white border-b">
                  {item.name}
                  {item.type === "location" ? " (Location)" : ""}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              search.trim().length > 0 ? (
                <Text className="text-center text-gray-500 mt-4">
                  No matches found
                </Text>
              ) : null
            }
          />

          {selectedItem && (
            <TouchableOpacity
              onPress={handleNext}
              className={`bg-[#090E24] rounded-full w-full h-[48px] items-center justify-center mt-6 ${
                loading ? "opacity-50" : ""
              }`}
              disabled={loading}
            >
              <Text className="text-white text-center text-base font-semibold">
                {loading ? "Submitting..." : "Next"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

export default ChurchNameAndLocation;
