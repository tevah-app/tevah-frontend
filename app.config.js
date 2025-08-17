import 'dotenv/config';

export default {
  expo: {
    name: 'Jevah App',
    slug: 'jevah-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'jevahapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    extra: {
      API_URL: process.env.EXPO_PUBLIC_API_URL,
      CLERK_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      eas: {
        projectId: 'dcbafd4e-7087-4d44-982f-481637a0b516',
      },
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.tevahapp.TevahApp1',
      infoPlist: {
        NSPhotoLibraryUsageDescription: 'This app needs access to your photo and video library.',
        NSCameraUsageDescription: 'This app needs access to your camera for media upload.',
      },
    },
    android: {
      package: 'com.tevahapp.TevahApp1',
      edgeToEdgeEnabled: true,
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: [
        'READ_MEDIA_IMAGES',
        'READ_MEDIA_VIDEO',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
      ],
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-secure-store',
      'expo-font',
      'expo-asset',
      'expo-media-library',
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};