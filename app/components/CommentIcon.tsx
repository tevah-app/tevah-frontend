import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function CommentIcon({ size = 16, color = '#6B7280' }: { size?: number; color?: string }) {
  return <Ionicons name="chatbubble-outline" size={size} color={color} />;
}



