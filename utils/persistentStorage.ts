// utils/persistentStorage.ts

import AsyncStorage from "@react-native-async-storage/async-storage/lib/typescript/AsyncStorage";

// Save viewed audio keys as string[]
export const persistViewed = async (viewedArray: string[]) => {
    try {
      await AsyncStorage.setItem("viewedAudios", JSON.stringify(viewedArray));
    } catch (e) {
      console.error("Error saving viewed audios", e);
    }
  };
  
  export const getViewed = async (): Promise<Set<string>> => {
    try {
      const json = await AsyncStorage.getItem("viewedAudios");
      const parsedArray: string[] = json ? JSON.parse(json) : [];
      return new Set(parsedArray); // ✅ convert array to Set
    } catch (e) {
      console.error("Error loading viewed audios:", e);
      return new Set(); // fallback to empty Set
    }
  };
  
  
  