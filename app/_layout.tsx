import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { useFonts, Rubik_400Regular, Rubik_700Bold,  Rubik_600SemiBold } from '@expo-google-fonts/rubik';
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
    Rubik_600SemiBold,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ClerkProvider tokenCache={tokenCache}>
      <Slot />
    </ClerkProvider>
    </GestureHandlerRootView>
  )
}