import React from 'react';
import RootNavigator from '@/app/navigation'; // ✅ This import is required
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import './global.css';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <RootNavigator />
    </>
  );
}

