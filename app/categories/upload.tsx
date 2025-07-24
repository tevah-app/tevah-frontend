import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMediaStore } from "../store/useUploadStore";
import LoadingOverlay from "../components/LoadingOverlay";
import { API_BASE_URL } from "../utils/api";
import Video from "expo-av/build/Video";

const categories = [
  "Worship",
  "Inspiration",
  "Youth",
  "Teachings",
  "Marriage",
  "Counselling",
];

const contentTypes = [
  { label: "Music", value: "music" },
  { label: "Videos", value: "videos" },
  { label: "Books", value: "books" },
  { label: "Podcasts", value: "podcasts" },
  { label: "Sermons", value: "sermons" },
];

export default function UploadScreen() {
  const router = useRouter();
  const [file, setFile] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);

  const isImage = (name: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(name);

  const getMimeTypeFromName = (filename: string): string => {
    if (filename.endsWith(".mp4")) return "video/mp4";
    if (filename.endsWith(".mp3")) return "audio/mpeg";
    if (filename.endsWith(".wav")) return "audio/wav";
    if (filename.endsWith(".pdf")) return "application/pdf";
    if (filename.endsWith(".epub")) return "application/epub+zip";
    return "application/octet-stream";
  };

  const pickMedia = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.type === "cancel") return;

    const { name, uri, mimeType } = result.assets[0];

    if (isImage(name)) {
      Alert.alert("Unsupported File", "Photos/images are not allowed.");
      return;
    }

    setFile({
      uri,
      name,
      mimeType: mimeType || getMimeTypeFromName(name),
    });
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffMs = now.getTime() - posted.getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "NOW";
    if (minutes < 60) return `${minutes}MIN AGO`;
    if (hours < 24) return `${hours}HRS AGO`;
    return `${days}DAYS AGO`;
  };

  const handleUpload = async () => {
    if (!file || !title || !selectedCategory || !selectedType) {
      Alert.alert("Missing fields", "Please complete all fields.");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const userRaw = await AsyncStorage.getItem("user");
      const user = userRaw ? JSON.parse(userRaw) : null;

      if (!token || !user) {
        setLoading(false);
        Alert.alert("Unauthorized", "Please log in to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
      } as any);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("contentType", selectedType);
      formData.append(
        "genre",
        JSON.stringify([selectedCategory.toLowerCase(), "All"])
      );
      formData.append("topics", JSON.stringify([]));

      const res = await fetch(`${API_BASE_URL}/api/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();
      setLoading(false);

      if (!res.ok) {
        console.error("❌ Upload failed:", result);
        Alert.alert("Upload failed", result.message || "Please try again.");
        return;
      }

      const uploaded = result.media;
      const now = new Date();

      useMediaStore.getState().addMedia({
        id: uploaded._id,
        title: uploaded.title,
        description: uploaded.description,
        uri: uploaded.fileUrl,
        category: uploaded.genre,
        type: uploaded.contentType,
        contentType: uploaded.contentType,
        fileUrl: uploaded.fileUrl,
        fileMimeType: uploaded.fileMimeType || file.mimeType,
        uploadedBy: `${user.firstName} ${user.lastName}`.trim(),
        viewCount: 0,
        listenCount: 0,
        readCount: 0,
        downloadCount: 0,
        isLive: false,
        concurrentViewers: 0,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        topics: [],
        timeAgo: getTimeAgo(now.toISOString()),
        speaker: `${user.firstName} ${user.lastName}`.trim(),
        speakerAvatar:
          user.avatar || require("../../assets/images/Avatar-1.png"),
        imageUrl: uploaded.imageUrl || "",
        favorite: 0,
        saved: 0,
        sheared: 0,
        onPress: undefined,
      });

      Alert.alert("Upload successful");

      // Reset
      setTitle("");
      setDescription("");
      setSelectedCategory("");
      setSelectedType("");
      setFile(null);

      const destination =
        selectedType.toUpperCase() === "BOOKS"
          ? "E-BOOKS"
          : selectedType.toUpperCase();

      router.push(`/categories/HomeScreen?default=${destination}`);
    } catch (error: any) {
      setLoading(false);
      console.error("❌ Upload error:", error?.message ?? error);
      Alert.alert("Error", error?.message || "Something went wrong.");
    }
  };

  const renderTag = (
    label: string,
    value: string,
    selected: string,
    setSelected: (val: string) => void
  ) => {
    const isSelected = value === selected;
    return (
      <TouchableOpacity
        key={value}
        onPress={() => setSelected(value)}
        className={`px-4 py-2 rounded-full mr-2 mb-2 border ${
          isSelected ? "bg-black border-black" : "bg-white border-gray-300"
        }`}
      >
        <Text className={isSelected ? "text-white" : "text-black"}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <ScrollView className="p-4 bg-white flex-1 h-full">
        <Text className="text-center text-lg font-semibold mt-4">
          New Upload
        </Text>

        <View className="flex items-center mt-2">
          <TouchableOpacity
            onPress={pickMedia}
            className="w-[200px] h-[200px] bg-gray-200 rounded-xl items-center justify-center mb-4"
          >
            {!file ? (
              <Feather name="plus" size={40} color="gray" />
            ) : file.mimeType.startsWith("video") ? (
              <Video
                source={{ uri: file.uri }}
                useNativeControls
                resizeMode="cover"
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
              />
            ) : (
              <Text className="px-4 text-gray-700 text-center">
                {file.name}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex flex-col items-center">
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            className="border border-gray-300 rounded-md w-[300px] mb-4 px-3 py-2"
          />

          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            className="border border-gray-300 rounded-md w-[300px] h-[60px] mb-4 px-3 py-2"
          />

          <View className="ml-5">
            <Text className="text-xs text-gray-600 mb-1">CATEGORY</Text>
            <View className="flex-row flex-wrap mb-4">
              {categories.map((item) =>
                renderTag(item, item, selectedCategory, setSelectedCategory)
              )}
            </View>
          </View>

          <View className="ml-5">
            <Text className="text-xs text-gray-600 mb-1">CONTENT TYPE</Text>
            <View className="flex-row flex-wrap mb-4">
              {contentTypes.map((item) =>
                renderTag(item.label, item.value, selectedType, setSelectedType)
              )}
            </View>
          </View>

          <TouchableOpacity
            onPress={async () => {
              const stopAudio = useMediaStore.getState().stopAudioFn;
              if (stopAudio) await stopAudio();

              // Then call your upload handler
              handleUpload();
            }}
            className="bg-black w-[300px] justify-center h-[40px] rounded-full items-center mt-2"
          >
            <Text className="text-white text-base font-semibold">Upload</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
