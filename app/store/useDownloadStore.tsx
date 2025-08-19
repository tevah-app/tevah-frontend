import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  author: string;
  contentType: string; // 'video', 'audio', 'ebook', 'live'
  fileUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  size?: string;
  downloadedAt: string;
  status: 'DOWNLOADED' | 'DOWNLOADING' | 'FAILED';
}

interface DownloadStore {
  downloadedItems: DownloadItem[];
  isLoaded: boolean;
  
  addToDownloads: (item: Omit<DownloadItem, 'downloadedAt' | 'status'>) => Promise<void>;
  removeFromDownloads: (itemId: string) => Promise<void>;
  isItemDownloaded: (itemId: string) => boolean;
  loadDownloadedItems: () => Promise<void>;
  getDownloadedItemsByType: (contentType: string) => DownloadItem[];
  getAllDownloadedItems: () => DownloadItem[];
  clearAllDownloads: () => Promise<void>;
}

const STORAGE_KEY = "userDownloadedItems";

export const useDownloadStore = create<DownloadStore>((set, get) => ({
  downloadedItems: [],
  isLoaded: false,

  addToDownloads: async (item: Omit<DownloadItem, 'downloadedAt' | 'status'>) => {
    const { downloadedItems } = get();
    
    // Check if item already exists
    const existingItem = downloadedItems.find(downloaded => downloaded.id === item.id);
    if (existingItem) {
      console.log(`📥 Item already downloaded: ${item.title}`);
      return;
    }

    // Add download timestamp and status
    const downloadItem: DownloadItem = {
      ...item,
      downloadedAt: new Date().toISOString(),
      status: 'DOWNLOADED'
    };

    const updatedItems = [downloadItem, ...downloadedItems];
    
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      set({ downloadedItems: updatedItems });
      console.log(`✅ Added to downloads: ${item.title} (${item.contentType})`);
    } catch (error) {
      console.error("❌ Failed to save item to downloads:", error);
    }
  },

  removeFromDownloads: async (itemId: string) => {
    const { downloadedItems } = get();
    const updatedItems = downloadedItems.filter(item => item.id !== itemId);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      set({ downloadedItems: updatedItems });
      console.log(`🗑️ Removed from downloads: ${itemId}`);
    } catch (error) {
      console.error("❌ Failed to remove item from downloads:", error);
    }
  },

  isItemDownloaded: (itemId: string) => {
    const { downloadedItems } = get();
    return downloadedItems.some(item => item.id === itemId);
  },

  loadDownloadedItems: async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      const downloadedItems = savedData ? JSON.parse(savedData) : [];
      
      set({ 
        downloadedItems,
        isLoaded: true 
      });
      
      console.log(`📥 Loaded ${downloadedItems.length} downloaded items`);
    } catch (error) {
      console.error("❌ Failed to load downloaded items:", error);
      set({ downloadedItems: [], isLoaded: true });
    }
  },

  getDownloadedItemsByType: (contentType: string) => {
    const { downloadedItems } = get();
    return downloadedItems.filter(item => 
      item.contentType.toLowerCase() === contentType.toLowerCase()
    );
  },

  getAllDownloadedItems: () => {
    const { downloadedItems } = get();
    return downloadedItems;
  },

  clearAllDownloads: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      set({ downloadedItems: [] });
      console.log("🗑️ Cleared all downloads");
    } catch (error) {
      console.error("❌ Failed to clear downloads:", error);
    }
  }
}));

// Default export for route compatibility
export default function UseDownloadStore() {
  return null;
}
