// import { ClerkProvider } from '@clerk/clerk-expo'
// import { tokenCache } from '@clerk/clerk-expo/token-cache'
// import { Slot } from 'expo-router'
// import { useFonts, Rubik_400Regular, Rubik_700Bold,  Rubik_600SemiBold } from '@expo-google-fonts/rubik';
// import "react-native-gesture-handler";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default function RootLayout() {
//   const [fontsLoaded] = useFonts({
//     Rubik_400Regular,
//     Rubik_700Bold,
//     Rubik_600SemiBold,
//   });

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//     <ClerkProvider tokenCache={tokenCache}>
//       <Slot />
//     </ClerkProvider>
//     </GestureHandlerRootView>
//   )
// }







import { ClerkProvider } from '@clerk/clerk-expo'
import { Rubik_400Regular, Rubik_600SemiBold, Rubik_700Bold, useFonts } from '@expo-google-fonts/rubik'
import { Slot } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useMediaStore } from './store/useUploadStore'

// Clerk publishable key from environment variables
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

// Token cache configuration for Clerk
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_600SemiBold,
    Rubik_700Bold,
  })

  // 🎬 Initialize media store early so videos are available when user logs in
  const loadPersistedMedia = useMediaStore((state) => state.loadPersistedMedia)
  
  useEffect(() => {
    const initializeApp = async () => {
      console.log("🚀 App initializing - loading persisted media...")
      await loadPersistedMedia()
      console.log("✅ App initialization complete")
    }
    
    if (fontsLoaded) {
      initializeApp()
    }
  }, [fontsLoaded, loadPersistedMedia])

  if (!fontsLoaded) {
    return null // or a loading component
  }

  return (
    <SafeAreaProvider>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
        </GestureHandlerRootView>
      </ClerkProvider>
    </SafeAreaProvider>
  )
}