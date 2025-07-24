




import { GestureResponderEvent } from "react-native";
import { create } from "zustand";

export interface MediaItem {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  imageUrl: { uri: string };
  id: string;
  title: string;
  description: string;
  uri: string;
  category: string[];
  type: string;
  contentType: string;
  fileUrl: string;
  fileMimeType: string;
  uploadedBy: string;
  viewCount: number;
  listenCount: number;
  readCount: number;
  downloadCount: number;
  isLive: boolean;
  concurrentViewers: number;
  createdAt: string;
  updatedAt: string;
  topics: string[];
  thumbnailUrl?: string;
  timeAgo?: string;
  speaker?: string;
  speakerAvatar?: string | number;
  favorite?: number;
  saved?: number;
  sheared?: number;
}

interface MediaState {
  mediaList: MediaItem[];
  addMedia: (item: MediaItem) => void;
  setMediaList: (items: MediaItem[]) => void;
  removeMedia: (id: string) => void;
  clearMediaList: () => void;

  // 🔊 Add this for global audio control
  stopAudioFn: (() => Promise<void>) | null;
  setStopAudioFn: (fn: () => Promise<void>) => void;
  clearStopAudioFn: () => void;
}

export const useMediaStore = create<MediaState>((set) => ({
  mediaList: [],

  addMedia: (item: MediaItem) =>
    set((state) => ({
      mediaList: [item, ...state.mediaList].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    })),

  setMediaList: (items: MediaItem[]) =>
    set({
      mediaList: items.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    }),

  removeMedia: (id: string) =>
    set((state) => ({
      mediaList: state.mediaList.filter((item) => item.id !== id),
    })),

  clearMediaList: () => set({ mediaList: [] }),

  // 🔊 Audio control functions
  stopAudioFn: null,
  setStopAudioFn: (fn) => set({ stopAudioFn: fn }),
  clearStopAudioFn: () => set({ stopAudioFn: null }),
}));

