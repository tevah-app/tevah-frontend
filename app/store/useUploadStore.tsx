// import { create } from "zustand";

// // Define a media item interface
// export interface MediaItem {
//   id: string;
//   title: string;
//   description: string;
//   uri: string;
//   category: string;
//   type: string;
//   createdAt: string; // ISO string format
// }

// // Define the store's shape
// interface MediaState {
//   mediaList: MediaItem[];

//   addMedia: (item: MediaItem) => void;
//   setMediaList: (items: MediaItem[]) => void;
//   removeMedia: (id: string) => void;
//   clearMediaList: () => void;
// }

// // Create the Zustand store
// export const useMediaStore = create<MediaState>((set) => ({
//   mediaList: [],

//   addMedia: (item) =>
//     set((state) => ({
//       mediaList: [item, ...state.mediaList].sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       ),
//     })),

//   setMediaList: (items) =>
//     set({
//       mediaList: items.sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       ),
//     }),

//   removeMedia: (id) =>
//     set((state) => ({
//       mediaList: state.mediaList.filter((item) => item.id !== id),
//     })),

//   clearMediaList: () => set({ mediaList: [] }),
// }));







// import { create } from "zustand";

// // Define a media item interface
// export interface MediaItem {
//   id: string;
//   title: string;
//   description: string;
//   uri: string;
//   category: string[]; // Updated to array
//   type: string;
//   createdAt: string; // ISO string format
// }

// // Define the store's shape
// interface MediaState {
//   mediaList: MediaItem[];

//   addMedia: (item: MediaItem) => void;
//   setMediaList: (items: MediaItem[]) => void;
//   removeMedia: (id: string) => void;
//   clearMediaList: () => void;
// }

// // Create the Zustand store
// export const useMediaStore = create<MediaState>((set) => ({
//   mediaList: [],

//   addMedia: (item) =>
//     set((state) => ({
//       mediaList: [item, ...state.mediaList].sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       ),
//     })),

//   setMediaList: (items) =>
//     set({
//       mediaList: items.sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       ),
//     }),

//   removeMedia: (id) =>
//     set((state) => ({
//       mediaList: state.mediaList.filter((item) => item.id !== id),
//     })),

//   clearMediaList: () => set({ mediaList: [] }),
// }));






// import { create } from "zustand";

// // Define a media item interface 
// export interface MediaItem {
//   id: string;
//   title: string;
//   description: string;
//   uri: string;
//   category: string[]; // ✅ updated to match backend genre array
//   type: string;
//   createdAt: string; // ISO string format
// }

// // Define the store's shape
// interface MediaState {
//   media: any;
//   mediaList: MediaItem[];

//   addMedia: (item: MediaItem) => void;
//   setMediaList: (items: MediaItem[]) => void;
//   removeMedia: (id: string) => void;
//   clearMediaList: () => void;
// }

// // Create the Zustand store
// export const useMediaStore = create<MediaState>((set) => ({
//   mediaList: [],

//   addMedia: (item) =>
//     set((state) => ({
//       mediaList: [item, ...state.mediaList].sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       ),
//     })),

//   setMediaList: (items) =>
//     set({
//       mediaList: items.sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       ),
//     }),

//   removeMedia: (id) =>
//     set((state) => ({
//       mediaList: state.mediaList.filter((item) => item.id !== id),
//     })),

//   clearMediaList: () => set({ mediaList: [] }),
// }));








// import { create } from "zustand";

// // Define a media item interface 
// export interface MediaItem {
//   id: string;
//   title: string;
//   description: string;
//   uri: string;
//   category: string[]; // e.g. ['videos', 'all']
//   type: string; // e.g. 'videos', 'music'
//   createdAt: string; // ISO format
// }

// // Define the store's shape
// interface MediaState {
//   mediaList: MediaItem[];

//   addMedia: (item: MediaItem) => void;
//   setMediaList: (items: MediaItem[]) => void;
//   removeMedia: (id: string) => void;
//   clearMediaList: () => void;
// }

// // Create Zustand store
// export const useMediaStore = create<MediaState>((set) => ({
//   mediaList: [],

//   addMedia: (item: MediaItem) =>
//     set((state) => ({
//       mediaList: [item, ...state.mediaList].sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       ),
//     })),

//   setMediaList: (items: MediaItem[]) =>
//     set({
//       mediaList: items.sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       ),
//     }),

//   removeMedia: (id: string) =>
//     set((state) => ({
//       mediaList: state.mediaList.filter((item) => item.id !== id),
//     })),

//   clearMediaList: () => set({ mediaList: [] }),
// }));












import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

export interface MediaItem {
  imageUrl: { uri: string; };
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

  // ✅ Add these for UI purposes:
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
}));
