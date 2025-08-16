# Twitter-Like Auto-Play Feature Guide

## Overview
This React Native Expo app now includes a Twitter-like auto-play feature where videos automatically play when they come into view and pause when scrolled away.

## How It Works

### 1. **Auto-Play Detection**
- Videos are tracked using their layout positions in the scroll view
- When a video becomes 30% or more visible in the viewport, it automatically starts playing
- When a video scrolls out of view, it automatically pauses
- Only one video plays at a time (like Twitter)

### 2. **Scroll-Based Visibility**
- The app uses `onLayout` events to track each video's position
- Scroll events calculate which video is most visible
- Videos must be at least 30% visible to trigger auto-play
- This prevents flickering when videos are barely visible

### 3. **User Controls**
- **Auto-play Toggle**: Top-right button to enable/disable auto-play
- **Manual Play/Pause**: Tap the center play button to manually control videos
- **Volume Control**: Mute/unmute individual videos
- **Progress Bar**: Drag to seek through video content

## Key Features

### ✅ **Automatic Play/Pause**
- Videos play when scrolled into view
- Videos pause when scrolled out of view
- Smooth transitions between videos

### ✅ **Audio Management**
- Videos are unmuted by default
- Audio plays through speakers (not earpiece)
- Works in silent mode on iOS

### ✅ **Performance Optimized**
- Only one video plays at a time
- Efficient scroll event handling
- Proper cleanup when leaving screen

### ✅ **Visual Indicators**
- Red dot shows auto-playing videos
- Yellow dot shows visible but paused videos (debug mode)
- Auto-play toggle button shows current state

## Technical Implementation

### Global Video Store
```typescript
// Manages video state across the app
const globalVideoStore = useGlobalVideoStore();
```

### Scroll Detection
```typescript
// Tracks video visibility during scroll
const handleScroll = useCallback((event) => {
  // Calculate which video is most visible
  // Trigger auto-play for visible video
  // Pause all other videos
}, []);
```

### Layout Tracking
```typescript
// Each video card tracks its position
onLayout={(e) => {
  const { y, height } = e.nativeEvent.layout;
  contentLayoutsRef.current[modalKey] = { y, height, type: 'video' };
}}
```

## Usage Instructions

1. **Enable Auto-Play**: The feature is enabled by default
2. **Scroll Through Content**: Videos will automatically play/pause as you scroll
3. **Toggle Auto-Play**: Use the top-right button to turn it on/off
4. **Manual Control**: Tap the center play button for manual control
5. **Volume Control**: Use the volume button to mute/unmute

## Debug Features

- Console logs show when videos become visible
- Visual indicators show auto-play state
- Toggle button shows current auto-play status

## Troubleshooting

### Videos Not Auto-Playing
1. Check if auto-play is enabled (top-right button)
2. Ensure videos are at least 30% visible
3. Check console for debug messages
4. Verify audio permissions are granted

### Performance Issues
1. Reduce video quality if needed
2. Check device memory usage
3. Ensure proper cleanup on screen exit

### Audio Issues
1. Check device volume settings
2. Verify audio session configuration
3. Test with different audio sources

## Future Enhancements

- [ ] Add auto-play preferences in settings
- [ ] Implement video preloading for smoother playback
- [ ] Add network-aware quality adjustment
- [ ] Support for background audio playback
