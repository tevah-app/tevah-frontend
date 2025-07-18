// components/LoadingOverlay.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

export default function LoadingOverlay() {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#000" />
      <Text style={styles.text}>Uploading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },
});
