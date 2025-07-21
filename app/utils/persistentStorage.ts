// utils/persistentStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const persistStats = async (stats: Record<string, any>) => {
  try {
    await AsyncStorage.setItem("videoStats", JSON.stringify(stats));
  } catch (err) {
    console.error("❌ Failed to persist stats:", err);
  }
};

export const getPersistedStats = async (): Promise<Record<string, any>> => {
  try {
    const stored = await AsyncStorage.getItem("videoStats");
    return stored ? JSON.parse(stored) : {};
  } catch (err) {
    console.error("❌ Failed to load stats:", err);
    return {};
  }
};

export const persistViewed = async (items: any[]) => {
  try {
    await AsyncStorage.setItem("viewedVideos", JSON.stringify(items));
  } catch (err) {
    console.error("❌ Failed to save viewed videos:", err);
  }
};

export const getViewed = async (): Promise<any[]> => {
  try {
    const stored = await AsyncStorage.getItem("viewedVideos");
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("❌ Failed to load viewed videos:", err);
    return [];
  }
};
