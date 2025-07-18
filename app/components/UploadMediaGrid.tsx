import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const itemSize = width / 3;

interface UploadMediaGridProps {
  onSelect: (video: MediaLibrary.Asset) => void;
}

export default function UploadMediaGrid({ onSelect }: UploadMediaGridProps) {
  const [videos, setVideos] = useState<MediaLibrary.Asset[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') return;
      setHasPermission(true);

      const result = await MediaLibrary.getAssetsAsync({
        mediaType: 'video',
        sortBy: MediaLibrary.SortBy.creationTime,
        first: 30,
      });
      setVideos(result.assets);
    })();
  }, []);

  const handleSelect = (video: MediaLibrary.Asset) => {
    setSelectedId(video.id);
    onSelect(video);
  };

  const formatDuration = (duration: number) => {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration % 60)
      .toString()
      .padStart(2, '0');
    return `${min}:${sec}`;
  };

  const renderItem = ({ item }: { item: MediaLibrary.Asset }) => {
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity
        className="relative"
        style={{ width: itemSize, height: itemSize }}
        onPress={() => handleSelect(item)}
      >
        <Image
          source={{ uri: item.uri }}
          className="w-full h-full rounded-sm"
          resizeMode="cover"
        />
        {!isSelected && (
          <BlurView
            intensity={50}
            tint="dark"
            className="absolute top-0 bottom-0 left-0 right-0 rounded-sm"
          />
        )}
        <Text className="absolute bottom-1 right-1 text-white text-[10px] bg-black/50 px-1 rounded">
          {formatDuration(item.duration)}
        </Text>
      </TouchableOpacity>
    );
  };

  if (!hasPermission) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">Permission required</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      numColumns={3}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 140 }}
    />
  );
}
