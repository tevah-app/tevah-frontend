// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Image,
//   Text,
//   TouchableOpacity,
//   Pressable,
//   FlatList,
//   Dimensions,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   ActivityIndicator,
// } from "react-native";
// import {
//   useOAuth,
//   useAuth,
//   useUser
// } from "@clerk/clerk-expo";
// import { router } from "expo-router";
// import * as SecureStore from "expo-secure-store";
// import "../global.css";
// import { API_BASE_URL } from "./utils/api";

// const { width } = Dimensions.get("window");

// const slides = [
//   {
//     id: "1",
//     image: require("../assets/images/Rectangle (2).png"),
//     title: "Your Daily Spiritual Companion",
//     description:
//       "Join a global community of believers. Access sermons, music, books, and more—all in one place.",
//   },
//   {
//     id: "2",
//     image: require("../assets/images/Rectangle2.png"),
//     title: "Unify Your Worship in One Place",
//     description:
//       "Stream gospel music, sermons, and access Christian books, no more switching apps!",
//   },
//   {
//     id: "3",
//     image: require("../assets/images/Rectangle3.png"),
//     title: "Grow Together in Faith",
//     description:
//       "Join discussion groups, share prayer requests, and connect with believers who share your values.",
//   },
//   {
//     id: "4",
//     image: require("../assets/images/Rectangle1.png"),
//     title: "Faith for the whole family",
//     description:
//       "Bible animations for kids, deep theology studies for adults, We’ve got you all covered",
//   },
// ];

// export default function Welcome() {
//   const flatListRef = useRef<FlatList<any>>(null);
//   const currentIndexRef = useRef(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const { isSignedIn, isLoaded: authLoaded, signOut, getToken } = useAuth(); // ✅ getToken properly used here
//   const { isLoaded: userLoaded, user } = useUser();

//   const { startOAuthFlow: startGoogleAuth } = useOAuth({ strategy: "oauth_google" });
//   const { startOAuthFlow: startFacebookAuth } = useOAuth({ strategy: "oauth_facebook" });
//   const { startOAuthFlow: startAppleAuth } = useOAuth({ strategy: "oauth_apple" });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       let nextIndex = currentIndexRef.current + 1;
//       if (nextIndex >= slides.length) nextIndex = 0;
//       flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
//       currentIndexRef.current = nextIndex;
//       setCurrentIndex(nextIndex);
//     }, 3500);

//     return () => clearInterval(interval);
//   }, []);

//   const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const index = Math.round(event.nativeEvent.contentOffset.x / width);
//     currentIndexRef.current = index;
//     setCurrentIndex(index);
//   };

//   const Pagination = () => (
//     <View className="flex-row justify-center items-center mt-4">
//       {slides.map((_, i) => (
//         <View
//           key={i}
//           className={`w-[20px] h-[6px] rounded-full mx-1.5 ${
//             i === currentIndex ? "bg-[#C2C1FE]" : "bg-[#EAECF0]"
//           }`}
//         />
//       ))}
//     </View>
//   );

//   const renderItem = ({ item }: { item: (typeof slides)[0] }) => (
//     <View className="items-center justify-start" style={{ width }}>
//       <Image source={item.image} className="w-full h-[340px]" resizeMode="cover" />
//       <View className=" bg-white rounded-t-3xl mt-[-19px] items-center w-full px-4 py-4">
//         <View className="w-[36px] h-[4px] bg-gray-300 self-center rounded-full mb-6 mt-0" />
//         <Text className="text-[#1D2939] text-[30px] font-bold text-center">
//           {item.title}
//         </Text>
//         <Text className="text-[#344054] text-[14px] text-center mt-2 w-full">
//           {item.description}
//         </Text>
//         <Pagination />
//       </View>
//     </View>
//   );

//   // const handleSignIn = async (
//   //   authFn: () => Promise<any>,
//   //   provider: "google" | "facebook" | "apple"
//   // ) => {
//   //   if (!authLoaded || !userLoaded) return;

//   //   try {
//   //     setLoading(true);

//   //     if (isSignedIn) {
//   //       await signOut(); // Clean up old session if exists
//   //     }

//   //     const { createdSessionId, setActive } = await authFn();
//   //     if (createdSessionId && setActive) {
//   //       await setActive({ session: createdSessionId });
//   //     }

//   //     const token = await getToken(); // ✅ Called properly inside component
//   //     if (!token || !user) throw new Error("Missing Clerk token or user");

//   //     const response = await fetch(`${API_BASE_URL}/auth/oauth-login`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({
//   //         provider,
//   //         token,
//   //         userInfo: {
//   //           firstName: user.firstName || "",
//   //           lastName: user.lastName || "",
//   //           avatar: user.imageUrl || "",
//   //         },
//   //       }),
//   //     });

//   //     const result = await response.json();
//   //     if (!response.ok) throw new Error(result.message || "Login failed");

//   //     await SecureStore.setItemAsync("jwt", result.token);

//   //     router.replace("/categories/HomeScreen");
//   //   } catch (error) {
//   //     console.error("OAuth error:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// const handleSignIn = async (
//   authFn: () => Promise<any>,
//   provider: "google" | "facebook" | "apple"
// ) => {
//   if (!authLoaded || !userLoaded) {
//     console.log("Auth or user not loaded yet");
//     return;
//   }

//   try {
//     setLoading(true);

//     if (isSignedIn) {
//       await signOut(); // Clean up old session if exists
//     }

//     const { createdSessionId, setActive } = await authFn();
//     if (!createdSessionId || !setActive) {
//       throw new Error("OAuth flow failed: No session ID or setActive function");
//     }

//     await setActive({ session: createdSessionId });

//     const token = await getToken();
//     if (!token) {
//       throw new Error("Failed to retrieve Clerk token");
//     }

//     if (!user) {
//       throw new Error("User data not available");
//     }

//     console.log("Token:", token); // Debug
//     console.log("User:", user); // Debug

//     const response = await fetch(`${API_BASE_URL}/auth/oauth-login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         provider,
//         token,
//         userInfo: {
//           firstName: user.firstName || "",
//           lastName: user.lastName || "",
//           avatar: user.imageUrl || "",
//         },
//       }),
//     });

//     const result = await response.json();
//     if (!response.ok) throw new Error(result.message || "Login failed");

//     await SecureStore.setItemAsync("jwt", result.token);
//     router.replace("/categories/HomeScreen");
//   } catch (error) {
//     console.error("OAuth error:", error);
//   } finally {
//     setLoading(false);
//   }
// };



//   return (
//     <View className="w-full h-full bg-white">
//       <FlatList
//         ref={flatListRef}
//         data={slides}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={onMomentumScrollEnd}
//         getItemLayout={(_, index) => ({
//           length: width,
//           offset: width * index,
//           index,
//         })}
//       />

//       {/* Bottom Panel */}
//       <View className="absolute top-[500px] left-0 right-0 items-center w-full px-4">
//         <Text className="text-[#344054] text-[12px] font-rubik-bold text-center mt-6">
//           GET STARTED WITH
//         </Text>
//         <View className="flex-row mt-12 gap-[16px]">
//           <TouchableOpacity onPress={() => handleSignIn(startFacebookAuth, "facebook")}>
//             <Image
//               source={require("../assets/images/Faceboook.png")}
//               className="w-12 h-12"
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleSignIn(startGoogleAuth, "google")}>
//             <Image
//               source={require("../assets/images/Gooogle.png")}
//               className="w-12 h-12"
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleSignIn(startAppleAuth, "apple")}>
//             <Image
//               source={require("../assets/images/Apple.png")}
//               className="w-12 h-12"
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* OR divider */}
//         <View className="flex-row items-center mt-9 justify-center w-[90%] max-w-[361px]">
//           <Image
//             source={require("../assets/images/Rectangle.png")}
//             className="h-[1px] w-[30%]"
//             resizeMode="contain"
//           />
//           <Text className="text-[#101828] font-bold text-[10px]">OR</Text>
//           <Image
//             source={require("../assets/images/Rectangle (1).png")}
//             className="h-[1px] w-[30%]"
//             resizeMode="contain"
//           />
//         </View>

//         <Pressable
//           onPress={() => router.push("/auth/signup")}
//           className="w-[90%] max-w-[400px] h-11 rounded-full bg-[#090E24] justify-center items-center mt-9 active:scale-[0.97]"
//         >
//           <Text className="text-white font-semibold">Get Started with Email</Text>
//         </Pressable>

//         <Pressable onPress={() => router.push("/auth/login")} className="mt-9">
//           <Text className="font-rubik-bold text-[#344054]">Sign In</Text>
//         </Pressable>

//         {loading && <ActivityIndicator className="mt-4" color="#090E24" />}
//       </View>
//     </View>
//   );
// }
















import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import '../global.css'
import AnimatedLogoIntro from './components/AnimatedLogoIntro'
import { API_BASE_URL } from './utils/api'

const { width } = Dimensions.get('window')

const slides = [
  {
    id: '1',
    image: require('../assets/images/Rectangle (2).png'),
    title: 'Your Daily Spiritual Companion',
    description:
      'Join a global community of believers. Access sermons, music, books, and more—all in one place.',
  },
  {
    id: '2',
    image: require('../assets/images/Rectangle2.png'),
    title: 'Unify Your Worship in One Place',
    description:
      'Stream gospel music, sermons, and access Christian books, no more switching apps!',
  },
  {
    id: '3',
    image: require('../assets/images/Rectangle3.png'),
    title: 'Grow Together in Faith',
    description:
      'Join discussion groups, share prayer requests, and connect with believers who share your values.',
  },
  {
    id: '4',
    image: require('../assets/images/Rectangle1.png'),
    title: 'Faith for the whole family',
    description:
      'Bible animations for kids, deep theology studies for adults, We’ve got you all covered',
  },
]

export default function Welcome() {
  const flatListRef = useRef<FlatList<any>>(null)
  const currentIndexRef = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const { isSignedIn, isLoaded: authLoaded, signOut, getToken } = useAuth()
  const { isLoaded: userLoaded, user } = useUser()
  const { startOAuthFlow: startGoogleAuth } = useOAuth({ strategy: 'oauth_google' })
  const { startOAuthFlow: startFacebookAuth } = useOAuth({ strategy: 'oauth_facebook' })
  const { startOAuthFlow: startAppleAuth } = useOAuth({ strategy: 'oauth_apple' })

  useEffect(() => {
    if (showIntro) return
    const interval = setInterval(() => {
      let nextIndex = currentIndexRef.current + 1
      if (nextIndex >= slides.length) nextIndex = 0
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true })
      currentIndexRef.current = nextIndex
      setCurrentIndex(nextIndex)
    }, 3500)
    return () => clearInterval(interval)
  }, [showIntro])

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width)
    currentIndexRef.current = index
    setCurrentIndex(index)
  }

  const Pagination = () => (
    <View className="flex-row justify-center items-center mt-4">
      {slides.map((_, i) => (
        <View
          key={i}
          className={`w-[20px] h-[6px] rounded-full mx-1.5 ${
            i === currentIndex ? 'bg-[#C2C1FE]' : 'bg-[#EAECF0]'
          }`}
        />
      ))}
    </View>
  )

  const renderItem = ({ item }: { item: (typeof slides)[0] }) => (
    <View className="items-center justify-start" style={{ width }}>
      <Image source={item.image} className="w-full h-[340px]" resizeMode="cover" />
      <View className="bg-white rounded-t-3xl mt-[-19px] items-center w-full px-4 py-4">
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
  )

  const handleIntroFinished = useCallback(() => setShowIntro(false), [])

  if (showIntro) {
    return (
      <AnimatedLogoIntro
        // You can tweak timings by adjusting letterStaggerMs or scale
        onFinished={handleIntroFinished}
      />
    )
  }

  // const handleSignIn = async (
  //   authFn: () => Promise<any>,
  //   provider: 'google' | 'facebook' | 'apple'
  // ) => {
  //   if (!authLoaded || !userLoaded) {
  //     console.log('Auth or user not loaded yet')
  //     return
  //   }

  //   try {
  //     setLoading(true)

  //     if (isSignedIn) {
  //       await signOut()
  //     }

  //     const { createdSessionId, setActive } = await authFn()
  //     if (!createdSessionId || !setActive) {
  //       throw new Error('OAuth flow failed: No session ID or setActive function')
  //     }

  //     await setActive({ session: createdSessionId })

  //     const token = await getToken()
  //     if (!token) {
  //       throw new Error('Failed to retrieve Clerk token')
  //     }

  //     if (!user) {
  //       throw new Error('User data not available')
  //     }

  //     const response = await fetch(`${API_BASE_URL}/auth/oauth-login`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         provider,
  //         token,
  //         userInfo: {
  //           firstName: user.firstName || '',
  //           lastName: user.lastName || '',
  //           avatar: user.imageUrl || '',
  //         },
  //       }),
  //     })

  //     const result = await response.json()
  //     if (!response.ok) throw new Error(result.message || 'Login failed')

  //     await SecureStore.setItemAsync('jwt', result.token)
  //     router.replace('/categories/HomeScreen')
  //   } catch (error) {
  //     console.error('OAuth error:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }



  const handleSignIn = async (
    authFn: () => Promise<any>,
    provider: 'google' | 'facebook' | 'apple'
  ) => {
    if (!authLoaded || !userLoaded) {
      console.log('Waiting for auth or user to load', { authLoaded, userLoaded });
      return;
    }
  
    try {
      setLoading(true);
  
      // ✅ Better session cleanup with waiting
      if (isSignedIn) {
        console.log('🔄 Signing out existing session...');
        await signOut();
        
        // Wait for sign out to complete
        let signOutRetries = 0;
        const maxSignOutRetries = 10;
        
        while (signOutRetries < maxSignOutRetries && isSignedIn) {
          await new Promise(resolve => setTimeout(resolve, 300));
          signOutRetries++;
          console.log(`⏳ Sign out retry ${signOutRetries}/${maxSignOutRetries}`, { isSignedIn });
        }
        
        if (isSignedIn) {
          console.warn('⚠️ Still signed in after signOut attempts');
        } else {
          console.log('✅ Successfully signed out');
        }
      }
  
      console.log('🚀 Starting OAuth flow...');
      const { createdSessionId, setActive } = await authFn();
      if (!createdSessionId || !setActive) {
        throw new Error('OAuth flow failed: No session ID or setActive function');
      }
  
      await setActive({ session: createdSessionId });
      
      // ✅ Wait for Clerk to update user state after session activation
      console.log('⏳ Waiting for user data to load...');
      let retries = 0;
      const maxRetries = 10;
      
      while (retries < maxRetries && !user) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
        retries++;
        console.log(`⏳ User data retry ${retries}/${maxRetries}`, { userLoaded, user: !!user });
      }
  
      const token = await getToken();
      if (!token) {
        throw new Error('Failed to retrieve Clerk token');
      }
  
      if (!user) {
        console.error('❌ User data still not available after retries');
        console.error('❌ Auth state:', { isSignedIn, authLoaded, userLoaded });
        throw new Error('User data not available after session activation');
      }
      
      console.log('✅ User data loaded successfully:', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.primaryEmailAddress?.emailAddress
      });
  
      // ✅ Debug API configuration
      console.log('🔍 API Debug Info:');
      console.log('   API_BASE_URL:', API_BASE_URL);
      console.log('   typeof API_BASE_URL:', typeof API_BASE_URL);
      console.log('   Full URL:', `${API_BASE_URL}/api/auth/oauth-login`);
      
      console.log('🔍 Request Data:');
      console.log('   Provider:', provider);
      console.log('   Token length:', token?.length || 0);
      console.log('   User info:', {
        firstName: user.firstName || 'Unknown',
        lastName: user.lastName || 'User',
        avatar: user.imageUrl || '',
        email: user.primaryEmailAddress?.emailAddress
      });
      
      // ✅ Validate all required values before making request
      if (!API_BASE_URL || API_BASE_URL === 'undefined') {
        throw new Error('API_BASE_URL is not configured properly');
      }
      
      if (!provider) {
        throw new Error('Provider is missing');
      }
      
      if (!token) {
        throw new Error('Token is missing');
      }
  
      const apiUrl = `${API_BASE_URL}/api/auth/oauth-login`;
      console.log('🚀 Making request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          token,
          userInfo: {
            firstName: user.firstName || 'Unknown',
            lastName: user.lastName || 'User',
            avatar: user.imageUrl || '',
          },
        }),
      });
  
      // Log raw response
      const responseText = await response.text();
      console.log('Backend response:', { status: response.status, text: responseText });
  
      // Attempt to parse JSON
      const result = JSON.parse(responseText);
      if (!response.ok) throw new Error(result.message || 'Login failed');
  
      // ✅ Save both token AND user data to storage (like regular login flow)
      await SecureStore.setItemAsync('jwt', result.token);
      await AsyncStorage.setItem('token', result.token); // Also save to AsyncStorage for upload compatibility
      
      if (result.user) {
        // 🛡️ Validate OAuth user data before saving
        if (result.user.firstName && result.user.lastName) {
          await AsyncStorage.setItem('user', JSON.stringify(result.user));
          console.log('✅ Complete OAuth user data saved to AsyncStorage:', {
            firstName: result.user.firstName,
            lastName: result.user.lastName,
            avatar: result.user.avatar
          });
        } else {
          console.error("🚨 BLOCKED: OAuth backend returned incomplete user data!");
          console.error("   Incomplete data:", result.user);
          throw new Error('OAuth login returned incomplete user data');
        }
      } else {
        // ✅ Fallback: Create user data from Clerk user if backend doesn't return it
        const userData = {
          firstName: user.firstName || 'Unknown',
          lastName: user.lastName || 'User', 
          avatar: user.imageUrl || '',
          email: user.primaryEmailAddress?.emailAddress
        };
        
        // 🛡️ Validate fallback data too
        if (userData.firstName && userData.lastName && userData.firstName !== 'Unknown') {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          console.log('✅ Complete fallback user data saved to AsyncStorage:', userData);
        } else {
          console.error("🚨 BLOCKED: Clerk user data is also incomplete!");
          console.error("   Incomplete Clerk data:", userData);
          throw new Error('Both OAuth and Clerk user data are incomplete');
        }
      }
      
      router.replace('/categories/HomeScreen');
    } catch (error) {
      console.error('OAuth error:', error);
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

      <View className="absolute top-[500px] left-0 right-0 items-center w-full px-4">
        <Text className="text-[#344054] text-[12px] font-rubik-bold text-center mt-6">
          GET STARTED WITH
        </Text>
        <View className="flex-row mt-12 gap-[16px]">
          <TouchableOpacity onPress={() => handleSignIn(startFacebookAuth, 'facebook')}>
            <Image
              source={require('../assets/images/Faceboook.png')}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSignIn(startGoogleAuth, 'google')}>
            <Image
              source={require('../assets/images/Gooogle.png')}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSignIn(startAppleAuth, 'apple')}>
            <Image
              source={require('../assets/images/Apple.png')}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center mt-9 justify-center w-[90%] max-w-[361px]">
          <Image
            source={require('../assets/images/Rectangle.png')}
            className="h-[1px] w-[30%]"
            resizeMode="contain"
          />
          <Text className="text-[#101828] font-bold text-[10px]">OR</Text>
          <Image
            source={require('../assets/images/Rectangle (1).png')}
            className="h-[1px] w-[30%]"
            resizeMode="contain"
          />
        </View>

        <Pressable
          onPress={() => router.push('/auth/signup')}
          className="w-[90%] max-w-[400px] h-11 rounded-full bg-[#090E24] justify-center items-center mt-9 active:scale-[0.97]"
        >
          <Text className="text-white font-semibold">Get Started with Email</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/downloads/DownloadsScreen')} className="mt-9">
          <Text className="font-rubik-bold text-[#344054]">Sign In</Text>
        </Pressable>

        {loading && <ActivityIndicator className="mt-4" color="#090E24" />}
      </View>
    </View>
  )
}