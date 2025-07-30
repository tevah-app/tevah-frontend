import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ActivityIndicator,
} from "react-native";
import {
  useOAuth,
  useAuth,
  useUser
} from "@clerk/clerk-expo";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import "../global.css";
import { API_BASE_URL } from "./utils/api";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../assets/images/Rectangle (2).png"),
    title: "Your Daily Spiritual Companion",
    description:
      "Join a global community of believers. Access sermons, music, books, and more—all in one place.",
  },
  {
    id: "2",
    image: require("../assets/images/Rectangle2.png"),
    title: "Unify Your Worship in One Place",
    description:
      "Stream gospel music, sermons, and access Christian books, no more switching apps!",
  },
  {
    id: "3",
    image: require("../assets/images/Rectangle3.png"),
    title: "Grow Together in Faith",
    description:
      "Join discussion groups, share prayer requests, and connect with believers who share your values.",
  },
  {
    id: "4",
    image: require("../assets/images/Rectangle1.png"),
    title: "Faith for the whole family",
    description:
      "Bible animations for kids, deep theology studies for adults, We’ve got you all covered",
  },
];

export default function Welcome() {
  const flatListRef = useRef<FlatList<any>>(null);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const { isSignedIn, isLoaded: authLoaded, signOut, getToken } = useAuth(); // ✅ getToken properly used here
  const { isLoaded: userLoaded, user } = useUser();

  const { startOAuthFlow: startGoogleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startFacebookAuth } = useOAuth({ strategy: "oauth_facebook" });
  const { startOAuthFlow: startAppleAuth } = useOAuth({ strategy: "oauth_apple" });

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndexRef.current + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    currentIndexRef.current = index;
    setCurrentIndex(index);
  };

  const Pagination = () => (
    <View className="flex-row justify-center items-center mt-4">
      {slides.map((_, i) => (
        <View
          key={i}
          className={`w-[20px] h-[6px] rounded-full mx-1.5 ${
            i === currentIndex ? "bg-[#C2C1FE]" : "bg-[#EAECF0]"
          }`}
        />
      ))}
    </View>
  );

  const renderItem = ({ item }: { item: (typeof slides)[0] }) => (
    <View className="items-center justify-start" style={{ width }}>
      <Image source={item.image} className="w-full h-[340px]" resizeMode="cover" />
      <View className=" bg-white rounded-t-3xl mt-[-19px] items-center w-full px-4 py-4">
        <View className="w-[36px] h-[4px] bg-gray-300 self-center rounded-full mb-6 mt-0" />
        <Text className="text-[#1D2939] text-[30px] font-bold text-center">
          {item.title}
        </Text>
        <Text className="text-[#344054] text-[14px] text-center mt-2 w-full">
          {item.description}
        </Text>
        <Pagination />
      </View>
    </View>
  );

  const handleSignIn = async (
    authFn: () => Promise<any>,
    provider: "google" | "facebook" | "apple"
  ) => {
    if (!authLoaded || !userLoaded) return;

    try {
      setLoading(true);

      if (isSignedIn) {
        await signOut(); // Clean up old session if exists
      }

      const { createdSessionId, setActive } = await authFn();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }

      const token = await getToken(); // ✅ Called properly inside component
      if (!token || !user) throw new Error("Missing Clerk token or user");

      const response = await fetch(`${API_BASE_URL}/auth/oauth-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          token,
          userInfo: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            avatar: user.imageUrl || "",
          },
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login failed");

      await SecureStore.setItemAsync("jwt", result.token);

      router.replace("/categories/HomeScreen");
    } catch (error) {
      console.error("OAuth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full h-full bg-white">
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Bottom Panel */}
      <View className="absolute top-[500px] left-0 right-0 items-center w-full px-4">
        <Text className="text-[#344054] text-xs font-semibold text-center mt-4">
          GET STARTED WITH
        </Text>
        <View className="flex-row mt-6 gap-[16px]">
          <TouchableOpacity onPress={() => handleSignIn(startFacebookAuth, "facebook")}>
            <Image
              source={require("../assets/images/Faceboook.png")}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSignIn(startGoogleAuth, "google")}>
            <Image
              source={require("../assets/images/Gooogle.png")}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSignIn(startAppleAuth, "apple")}>
            <Image
              source={require("../assets/images/Apple.png")}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* OR divider */}
        <View className="flex-row items-center mt-6 justify-center w-[90%] max-w-[361px]">
          <Image
            source={require("../assets/images/Rectangle.png")}
            className="h-[1px] w-[30%]"
            resizeMode="contain"
          />
          <Text className="text-[#101828] font-bold text-[10px]">OR</Text>
          <Image
            source={require("../assets/images/Rectangle (1).png")}
            className="h-[1px] w-[30%]"
            resizeMode="contain"
          />
        </View>

        <Pressable
          onPress={() => router.push("/auth/signup")}
          className="w-[90%] max-w-[400px] h-11 rounded-full bg-[#090E24] justify-center items-center mt-6 active:scale-[0.97]"
        >
          <Text className="text-white font-semibold">Get Started with Email</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/auth/login")} className="mt-6">
          <Text className="text-sm">Sign In</Text>
        </Pressable>

        {loading && <ActivityIndicator className="mt-4" color="#090E24" />}
      </View>
    </View>
  );
}
