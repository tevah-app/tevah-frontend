import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface VideoPlayerState {
  // Global video state - only one video can play at a time
  currentlyPlayingVideo: string | null;
  playingVideos: Record<string, boolean>;
  showOverlay: Record<string, boolean>;
  mutedVideos: Record<string, boolean>;
  progresses: Record<string, number>;
  hasCompleted: Record<string, boolean>;
  
  // Actions
  playVideo: (videoKey: string) => void;
  pauseVideo: (videoKey: string) => void;
  pauseAllVideos: () => void;
  toggleVideoMute: (videoKey: string) => void;
  setVideoProgress: (videoKey: string, progress: number) => void;
  setVideoCompleted: (videoKey: string, completed: boolean) => void;
  setOverlayVisible: (videoKey: string, visible: boolean) => void;
  
  // Global play function - pauses all others and plays selected video
  playVideoGlobally: (videoKey: string) => void;
}

export const useGlobalVideoStore = create<VideoPlayerState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    currentlyPlayingVideo: null,
    playingVideos: {},
    showOverlay: {},
    mutedVideos: {},
    progresses: {},
    hasCompleted: {},

    // Individual video actions
    playVideo: (videoKey: string) => {
      set((state) => ({
        currentlyPlayingVideo: videoKey,
        playingVideos: { ...state.playingVideos, [videoKey]: true },
        showOverlay: { ...state.showOverlay, [videoKey]: false }
      }));
    },

    pauseVideo: (videoKey: string) => {
      set((state) => ({
        currentlyPlayingVideo: state.currentlyPlayingVideo === videoKey ? null : state.currentlyPlayingVideo,
        playingVideos: { ...state.playingVideos, [videoKey]: false },
        showOverlay: { ...state.showOverlay, [videoKey]: true }
      }));
    },

    pauseAllVideos: () => {
      set((state) => {
        const newPlayingVideos: Record<string, boolean> = {};
        const newShowOverlay: Record<string, boolean> = {};
        
        Object.keys(state.playingVideos).forEach(key => {
          newPlayingVideos[key] = false;
          newShowOverlay[key] = true;
        });

        return {
          currentlyPlayingVideo: null,
          playingVideos: newPlayingVideos,
          showOverlay: newShowOverlay
        };
      });
    },

    toggleVideoMute: (videoKey: string) => {
      set((state) => ({
        mutedVideos: { 
          ...state.mutedVideos, 
          [videoKey]: !state.mutedVideos[videoKey] 
        }
      }));
    },

    setVideoProgress: (videoKey: string, progress: number) => {
      set((state) => ({
        progresses: { ...state.progresses, [videoKey]: progress }
      }));
    },

    setVideoCompleted: (videoKey: string, completed: boolean) => {
      set((state) => ({
        hasCompleted: { ...state.hasCompleted, [videoKey]: completed }
      }));
    },

    setOverlayVisible: (videoKey: string, visible: boolean) => {
      set((state) => ({
        showOverlay: { ...state.showOverlay, [videoKey]: visible }
      }));
    },

    // ✅ Global play function - the main function for playing videos
    playVideoGlobally: (videoKey: string) => {
      set((state) => {
        const isCurrentlyPlaying = state.playingVideos[videoKey] ?? false;
        
        if (isCurrentlyPlaying) {
          // If video is already playing, pause it
          return {
            currentlyPlayingVideo: null,
            playingVideos: { ...state.playingVideos, [videoKey]: false },
            showOverlay: { ...state.showOverlay, [videoKey]: true }
          };
        } else {
          // Pause all other videos and play this one
          const newPlayingVideos: Record<string, boolean> = {};
          const newShowOverlay: Record<string, boolean> = {};
          
          // Pause all other videos
          Object.keys(state.playingVideos).forEach(key => {
            newPlayingVideos[key] = false;
            newShowOverlay[key] = true;
          });
          
          // Play the selected video
          newPlayingVideos[videoKey] = true;
          newShowOverlay[videoKey] = false;

          console.log(`🌍 Global video control: Playing ${videoKey}, paused all others`);

          return {
            currentlyPlayingVideo: videoKey,
            playingVideos: newPlayingVideos,
            showOverlay: newShowOverlay
          };
        }
      });
    }
  }))
);