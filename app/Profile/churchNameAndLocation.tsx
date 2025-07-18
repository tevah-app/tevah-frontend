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
import { API_BASE_URL } from "../utils/api";
import Constants from "expo-constants";

type Suggestion = {
  id: string;
  name: string;
  type: "church" | "location";
};

function ChurchNameAndLocation() {
  const [search, setSearch] = useState("");
  const API_BASE_URL = Constants.expoConfig?.extra?.API_URL;
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
          `${API_BASE_URL}/api/churches?lat=${lat}&lng=${lng}`
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
            `${API_BASE_URL}/api/churches?lat=${loc.lat}&lng=${loc.lng}`
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
        `${API_BASE_URL}/api/auth/complete-profile`,
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
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
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
