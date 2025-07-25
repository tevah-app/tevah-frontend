import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import { useMediaStore } from "../store/useUploadStore";
import { Audio } from "expo-av";
import { PanResponder, View as RNView } from "react-native";
import {
  getPersistedStats,
  getViewed,
  persistStats,
} from "../utils/persistentStorage";

interface AudioCard {
  fileUrl: any;
  title: string;
  speaker: string;
  timeAgo: string;
  speakerAvatar: any;
  favorite: number;
  views: number;
  saved: number;
  sheared: number;
  onPress?: () => void;
}

interface RecommendedItem {
  title: string;
  fileUrl: any;
  subTitle: string;
  views: number;
  onPress?: () => void;
}

const Audios: AudioCard[] = [
  {
    fileUrl: require("../../assets/images/image (12).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
];

const AudiosA: AudioCard[] = [
  {
    fileUrl: require("../../assets/images/image (14).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    fileUrl: require("../../assets/images/image (15).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    fileUrl: require("../../assets/images/image (16).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    fileUrl: require("../../assets/images/image (17).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
];

const AudiosB: AudioCard[] = [
  {
    fileUrl: require("../../assets/images/image (14).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    fileUrl: require("../../assets/images/image (15).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    fileUrl: require("../../assets/images/image (16).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
  {
    fileUrl: require("../../assets/images/image (17).png"),
    title: "2 Hours time with God with Dunsin Oyekan & Pastor Godman Akinlabi",
    speaker: "Minister Joseph Eluwa",
    timeAgo: "3HRS AGO",
    speakerAvatar: require("../../assets/images/Avatar-1.png"),
    views: 500,
    favorite: 600,
    saved: 400,
    sheared: 540,
  },
];

const previouslyViewed: RecommendedItem[] = [
  {
    title: "The Beatitudes: The Path to Blessings",
    fileUrl: require("../../assets/images/image12a.png"),
    subTitle: "The Gospel of Lord by Andrew Farlay",
    views: 100,
    onPress: () => console.log("Viewing The Chosen"),
  },
  {
    title: "The Beatitudes: The Path to Blessings",
    fileUrl: require("../../assets/images/image (13).png"),
    subTitle: "The Gospel of Lord by Andrew Farlay",
    views: 150,
    onPress: () => console.log("Viewing Overflow Worship"),
  },
  {
    title: "Revival Nights",
    fileUrl: require("../../assets/images/image (13).png"),
    subTitle: "The Gospel of Lord by Andrew Farlay",
    views: 300,
    onPress: () => console.log("Viewing Revival Nights"),
  },
];
const recommendedItems: RecommendedItem[] = [
  {
    title: "The Beatitudes: The Path to Blessings",
    fileUrl: require("../../assets/images/image (6).png"),
    subTitle: "The Gospel of Lord by Andrew Farlay",
    views: 100,
    onPress: () => console.log("Viewing The Chosen"),
  },
  {
    title: "The Beatitudes: The Path to Blessings",
    fileUrl: require("../../assets/images/image (7).png"),
    subTitle: "The Gospel of Lord by Andrew Farlay",
    views: 150,
    onPress: () => console.log("Viewing Overflow Worship"),
  },
  {
    title: "Revival Nights",
    fileUrl: require("../../assets/images/image (7).png"),
    subTitle: "The Gospel of Lord by Andrew Farlay",
    views: 300,
    onPress: () => console.log("Viewing Revival Nights"),
  },
];

export default function Music() {
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [pvModalIndex, setPvModalIndex] = useState<number | null>(null);
  const [rsModalIndex, setRsModalIndex] = useState<number | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());


  const getAudioKey = (fileUrl: string): string => `Audio-${fileUrl}`;

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({});
  const [durationMap, setDurationMap] = useState<{ [key: string]: number }>({});
  const [soundMap, setSoundMap] = useState<Record<string, Audio.Sound>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [pausedMap, setPausedMap] = useState<Record<string, number>>({});
  const [muteMap, setMuteMap] = useState<Record<string, boolean>>({});
  const [AudioStats, setAudioStats] = useState<
    Record<
      string,
      Partial<AudioCard> & {
        favoriteCount?: number;
        savedCount?: number;
      }
    >
  >({});

  const { mediaList } = useMediaStore();
  const uploadedAudios = mediaList.filter(
    (item) => item.contentType === "music" || item.type === "music"
  );

  const handleShare = async (key: string, Audio: AudioCard) => {
    try {
      const result = await Share.share({
        title: Audio.title,
        message: `Check out this Audio: ${Audio.title}\n${Audio.fileUrl}`,
        url: Audio.fileUrl,
      });

      if (result.action === Share.sharedAction) {
        setAudioStats((prev) => {
          const updatedStats = {
            ...prev,
            [key]: {
              ...prev[key],
              sheared: (prev[key]?.sheared || Audio.sheared || 0) + 1,
            },
          };
          persistStats(updatedStats); // 👈 Add this
          return updatedStats;
        });
      }
    } catch (error) {
      console.warn("❌ Share error:", error);
    }
  };

  const handleSave = (key: string, Audio: AudioCard) => {
    setAudioStats((prev) => {
      const isSaved = prev[key]?.saved === 1;
      const updatedStats = {
        ...prev,
        [key]: {
          ...prev[key],
          saved: isSaved ? 0 : 1,
        },
      };
      persistStats(updatedStats);
      return updatedStats;
    });
  };

  const handleFavorite = (key: string, Audio: AudioCard) => {
    setAudioStats((prev) => {
      const isFavorited = prev[key]?.favorite === 1;
      const updatedStats = {
        ...prev,
        [key]: {
          ...prev[key],
          favorite: isFavorited ? 0 : 1,
        },
      };
      persistStats(updatedStats);
      return updatedStats;
    });
  };

  useEffect(() => {
    const loadPersistedData = async () => {
      const stats = await getPersistedStats();
      const viewed = await getViewed();

      setAudioStats(stats);
      // setPreviouslyViewedState(viewed);

      // Optional: Restore miniCardViews (just views count from stats)
      const miniViews: Record<string, number> = {};
      Object.keys(stats).forEach((key) => {
        if (typeof stats[key]?.views === "number") {
          miniViews[key] = stats[key].views;
        }
      });
      // setMiniCardViews(miniViews);
    };

    loadPersistedData();
  }, []);

 

  // const allIndexedAudios = uploadedAudios.map((Audio, i) => {
  //   const key = getAudioKey(Audio.fileUrl); // ✅ Stable unique key

  //   const stats = AudioStats[key] || {};
  //   const views = Math.max(stats.views ?? 0, Audio.viewCount ?? 0);
  //   const shares = Math.max(stats.sheared ?? 0, Audio.sheared ?? 0);
  //   const favorites = Math.max(stats.favorite ?? 0, Audio.favorite ?? 0);
  //   const score = views + shares + favorites;

  //   return {
  //     key,
  //     fileUrl: Audio.fileUrl,
  //     title: Audio.title,
  //     subTitle: Audio.speaker || "Unknown",
  //     views,
  //     shares,
  //     favorites,
  //     score,
  //     imageUrl: {
  //       uri: Audio.fileUrl.replace("/upload/", "/upload/so_1/") + ".jpg",
  //     },
  //   };
  // });

  const playAudio = async (uri: string, id: string) => {
    if (isLoadingAudio) return;
    setIsLoadingAudio(true);
  
    try {
      // Pause currently playing audio if different
      if (playingId && playingId !== id && soundMap[playingId]) {
        await soundMap[playingId].pauseAsync();
        const status = await soundMap[playingId].getStatusAsync();
        if (status.isLoaded) {
          setPausedMap((prev) => ({
            ...prev,
            [playingId]: status.positionMillis ?? 0,
          }));
        }
      }
  
      const existingSound = soundMap[id];
  
      if (existingSound) {
        const status = await existingSound.getStatusAsync();
  
        if (status.isLoaded) {
          if (status.isPlaying) {
            const pos = status.positionMillis ?? 0;
            await existingSound.pauseAsync();
            setPausedMap((prev) => ({ ...prev, [id]: pos }));
            setPlayingId(null);
          } else {
            const resumePos = pausedMap[id] ?? 0;
            await existingSound.playFromPositionAsync(resumePos);
            setPlayingId(id);
  
            // Ensure duration is set
            let duration = durationMap[id];
            if (!duration) {
              const updatedStatus = await existingSound.getStatusAsync();
              if (updatedStatus.isLoaded && updatedStatus.durationMillis) {
                duration = updatedStatus.durationMillis;
                setDurationMap((prev) => ({
                  ...prev,
                  [id]: duration,
                }));
              }
            }
  
            setProgressMap((prev) => ({
              ...prev,
              [id]: resumePos / Math.max(duration || 1, 1),
            }));
  
            // ✅ View tracking block
            if (!viewedIds.has(id)) {
              setAudioStats((prevStats) => {
                const currentViews = prevStats[id]?.views ?? 0;
                const updatedStats = {
                  ...prevStats,
                  [id]: {
                    ...prevStats[id],
                    views: currentViews + 1,
                  },
                };
                persistStats(updatedStats);
                return updatedStats;
              });
              setViewedIds((prev) => new Set(prev).add(id));
            }
  
          }
          return;
        } else {
          setSoundMap((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
          });
        }
      }
  
      const resumePos = pausedMap[id] ?? 0;
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        {
          shouldPlay: true,
          isMuted: muteMap[id] ?? false,
          positionMillis: resumePos,
        }
      );
  
      setSoundMap((prev) => ({ ...prev, [id]: newSound }));
      setPlayingId(id);
  
      // ✅ View tracking block
      if (!viewedIds.has(id)) {
        setAudioStats((prevStats) => {
          const currentViews = prevStats[id]?.views ?? 0;
          const updatedStats = {
            ...prevStats,
            [id]: {
              ...prevStats[id],
              views: currentViews + 1,
            },
          };
          persistStats(updatedStats);
          return updatedStats;
        });
        setViewedIds((prev) => new Set(prev).add(id));
      }
  
      const status = await newSound.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        setDurationMap((prev) => ({
          ...prev,
          [id]: status.durationMillis,
        }));
  
        setProgressMap((prev) => ({
          ...prev,
          [id]: resumePos / status.durationMillis,
        }));
      }
  
      newSound.setOnPlaybackStatusUpdate(async (status) => {
        if (!status.isLoaded || !status.durationMillis) return;
  
        setProgressMap((prev) => ({
          ...prev,
          [id]: status.positionMillis / status.durationMillis,
        }));
  
        setDurationMap((prev) => ({
          ...prev,
          [id]: status.durationMillis,
        }));
  
        if (status.didJustFinish) {
          setPlayingId(null);
          setProgressMap((prev) => ({ ...prev, [id]: 0 }));
          setPausedMap((prev) => ({ ...prev, [id]: 0 }));
  
          await newSound.unloadAsync();
          setSoundMap((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
          });
        }
      });
    } catch (err) {
      console.error("❌ Audio playback error:", err);
    } finally {
      setIsLoadingAudio(false);
    }
  };
  
  
  


const stopAudio = useCallback(async () => {
  if (playingId && soundMap[playingId]) {
    await soundMap[playingId].stopAsync();
    await soundMap[playingId].unloadAsync();
    setSoundMap((prev) => {
      const updated = { ...prev };
      delete updated[playingId];
      return updated;
    });
    setPlayingId(null);
  }
}, [playingId, soundMap]);
// ✅ 2. Then register it inside useEffect (AFTER the function is declared)
useEffect(() => {
  useMediaStore.getState().setStopAudioFn(stopAudio);
  return () => {
    useMediaStore.getState().clearStopAudioFn();
  };
}, [stopAudio]);


  useEffect(() => {
    const loadPersistedData = async () => {
      const stats = await getPersistedStats();
      const viewed = await getViewed();

      setAudioStats(stats);
      // setPreviouslyViewedState(viewed);

      // Optional: Restore miniCardViews (just views count from stats)
      const miniViews: Record<string, number> = {};
      Object.keys(stats).forEach((key) => {
        if (typeof stats[key]?.views === "number") {
          miniViews[key] = stats[key].views;
        }
      });
      // setMiniCardViews(miniViews);
    };

    loadPersistedData();
  }, []);

  const getTimeAgo = (createdAt: string): string => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diff = now.getTime() - posted.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (minutes < 1) return "NOW";
    if (minutes < 60) return `${minutes}MIN AGO`;
    if (hours < 24) return `${hours}HRS AGO`;
    return `${days}DAYS AGO`;
  };

  const renderAudioCard = (
    Audio: AudioCard,
    index: number,
    sectionId: string,
    playType: "progress" | "center" = "center"
  ) => {
    const modalKey = `${sectionId}-${index}`;
    const audioUri =
      typeof Audio.fileUrl === "string" ? Audio.fileUrl : Audio.fileUrl?.uri;
    const stats = AudioStats[modalKey] || {};

    const currentProgress = progressMap[modalKey] || 0;
    const currentDuration = durationMap[modalKey] || 1;

    const handleSeek = async (newProgress: number) => {
      const pos = newProgress * currentDuration;
      const currentSound = soundMap[modalKey];
      if (currentSound) {
        await currentSound.setPositionAsync(pos);
      }
      setProgressMap((prev) => ({ ...prev, [modalKey]: newProgress }));
    };

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const layoutWidth = 260;
        const x = e.nativeEvent.locationX;
        const newProgress = Math.max(0, Math.min(1, x / layoutWidth));
        handleSeek(newProgress);
      },
      onPanResponderMove: (e) => {
        const layoutWidth = 260;
        const x = e.nativeEvent.locationX;
        const newProgress = Math.max(0, Math.min(1, x / layoutWidth));
        handleSeek(newProgress);
      },
    });

    return (
      <View className="flex flex-col">
        <TouchableOpacity
          key={modalKey}
          onPress={Audio.onPress}
          className="mr-4 w-full h-[436px]"
          activeOpacity={0.9}
        >
          <View className="w-full h-[393px] overflow-hidden relative">
            {Audio.fileUrl && (
              <Image
                source={
                  typeof Audio.fileUrl === "string"
                    ? { uri: Audio.fileUrl }
                    : Audio.fileUrl
                }
                className="w-full h-full absolute"
                resizeMode="cover"
              />
            )}

            {playType !== "progress" && (
              <View className="absolute bottom-3 left-3 right-3 z-10 px-3 py-2 rounded">
                <Text
                  className="text-white text-sm font-rubik"
                  numberOfLines={2}
                >
                  {Audio.title}
                </Text>
              </View>
            )}

            {playType === "progress" ? (
              <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2 px-2">
                <TouchableOpacity
                 onPress={() => playAudio(audioUri, modalKey)}

                  className="mr-2"
                >
                  <Ionicons
                    name={playingId === modalKey ? "pause" : "play"}
                    size={24}
                    color="#FEA74E"
                  />
                </TouchableOpacity>

                <View className="flex-1 justify-center px-2">
                  <RNView
                    className="w-full h-1 bg-white/30 rounded-full relative"
                    {...panResponder.panHandlers}
                  >
                    <View
                      className="h-full bg-[#FEA74E] rounded-full"
                      style={{ width: `${currentProgress * 100}%` }}
                    />
                    <View
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-[#FEA74E] rounded-full"
                      style={{
                        left: `${currentProgress * 100}%`,
                        marginLeft: -8,
                      }}
                    />
                  </RNView>
                </View>

                <TouchableOpacity
                  onPress={async () => {
                    const currentMute = muteMap[modalKey] ?? false;
                    const newMuted = !currentMute;
                    setMuteMap((prev) => ({ ...prev, [modalKey]: newMuted }));

                    const currentSound = soundMap[modalKey];
                    if (currentSound) {
                      await currentSound.setIsMutedAsync(newMuted);
                    }
                  }}
                  className="ml-2"
                >
                  <Ionicons
                    name={muteMap[modalKey] ? "volume-mute" : "volume-high"}
                    size={20}
                    color="#FEA74E"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="absolute inset-0 justify-center items-center">
                <TouchableOpacity
                 onPress={() => playAudio(audioUri, modalKey)}

                  className="bg-white/70 p-2 rounded-full"
                >
                  <Ionicons
                    name={playingId === modalKey ? "pause" : "play"}
                    size={40}
                    color="#FEA74E"
                  />
                </TouchableOpacity>
              </View>
            )}

          
{modalVisible === modalKey && (
              <View className="absolute top-28 right-4 bg-white shadow-md rounded-lg p-3 z-50 w-44">
                <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                  <Text className="text-[#1D2939] font-rubik ml-2">View Details</Text>
                  <Ionicons name="eye-outline" size={16} color="#3A3E50" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleShare(modalKey, Audio)}
                  className="py-2 border-b border-gray-200 flex-row items-center justify-between"
                >
                  <Text className="text-[#1D2939] font-rubik ml-2">Share</Text>
                  <AntDesign name="sharealt" size={16} color="#3A3E50" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSave(modalKey, Audio)}>
                  <Text className="text-[#1D2939] font-rubik ml-2">Save to Library</Text>
                  <MaterialIcons name="library-add" size={16} color="#3A3E50" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View className="flex-row items-center justify-between mt-1 px-3">
            <View className="flex flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center relative ml-1 mt-2">
                <Image
                  source={
                    typeof Audio.speakerAvatar === "string" &&
                    Audio.speakerAvatar.startsWith("http")
                      ? { uri: Audio.speakerAvatar.trim() }
                      : Audio.speakerAvatar
                  }
                  style={{ width: 30, height: 30, borderRadius: 999 }}
                  resizeMode="cover"
                />
              </View>
              <View className="ml-3">
                <View className="flex-row items-center">
                  <Text className="ml-1 text-[13px] font-rubik-semibold text-[#344054] mt-1">
                    {Audio.speaker}
                  </Text>
                  <View className="flex flex-row mt-2 ml-2">
                    <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {Audio.timeAgo}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row mt-2">
                  <View className="flex-row items-center">
                    <Image
                      source={require("../../assets/images/Vector1.png")}
                      className="h-[20px] w-[20px] ml-1"
                      resizeMode="contain"
                    />
                    <Text className="text-[10px] text-gray-500 ml-1 mt-1 font-rubik">
                      {stats.views ?? Audio.views}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleShare(modalKey, Audio)}
                    className="flex-row items-center ml-4"
                  >
                    <AntDesign name="sharealt" size={20} color="#98A2B3" />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {stats.sheared ?? Audio.sheared}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleSave(modalKey, Audio)}
                    className="flex-row items-center ml-9"
                  >
                    <MaterialIcons
                      name={stats.saved === 1 ? "bookmark" : "bookmark-border"}
                      size={22}
                      color={stats.saved === 1 ? "#FEA74E" : "#98A2B3"}
                    />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {stats.saved === 1
                        ? (Audio.saved ?? 0) + 1
                        : Audio.saved ?? 0}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleFavorite(modalKey, Audio)}
                    className="ml-9 flex-row"
                  >
                    <MaterialIcons
                      name={
                        stats.favorite === 1 ? "favorite" : "favorite-border"
                      }
                      size={22}
                      color={stats.favorite === 1 ? "#FEA74E" : "#98A2B3"}
                    />
                    <Text className="text-[10px] text-gray-500 ml-1 font-rubik">
                      {stats.favorite === 1
                        ? (Audio.favorite ?? 0) + 1
                        : Audio.favorite ?? 0}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                setModalVisible(modalVisible === modalKey ? null : modalKey)
              }
              className="mr-2"
            >
              <Ionicons name="ellipsis-vertical" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMiniCards = (
    title: string,
    items: typeof recommendedItems,
    modalIndex: number | null,
    setModalIndex: any
  ) => (
    <View className="mt-5">
      <Text className="text-[16px] font-rubik-semibold text-[#344054] mt-4 mb-2 ml-2">
        {title}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {items.map((item, index) => (
          <View
            key={`${title}-${item.title}-${index}`}
            className="mr-4 w-[154px] flex-col items-center"
          >
            <TouchableOpacity
              onPress={item.onPress}
              className="w-full h-[232px] rounded-2xl overflow-hidden relative"
              activeOpacity={0.9}
            >
              <Image
                source={item.fileUrl}
                className="w-full h-full absolute"
                resizeMode="cover"
              />
              <View className="absolute inset-0 justify-center items-center">
                <View className="bg-white/70 p-2 rounded-full">
                  <Ionicons name="play" size={24} color="#FEA74E" />
                </View>
              </View>
              <View className="absolute bottom-2 left-2 right-2">
                <Text
                  className="text-white text-start text-[14px] ml-1 mb-6 font-rubik"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
            {modalIndex === index && (
              <View className="absolute mt-[26px] left-1 bg-white shadow-md rounded-lg p-3 z-50 w-30">
                <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                  <Text className="text-[#1D2939] font-rubik ml-2">
                    View Details
                  </Text>
                  <Ionicons name="eye-outline" size={16} color="##3A3E50" />
                </TouchableOpacity>
                <TouchableOpacity className="py-2 border-b border-gray-200 flex-row items-center justify-between">
                  <Text className="text-sm text-[#1D2939] font-rubik ml-2">
                    Share
                  </Text>
                  <AntDesign name="sharealt" size={16} color="##3A3E50" />
                </TouchableOpacity>
                <TouchableOpacity className="py-2 flex-row items-center justify-between">
                  <Text className="text-[#1D2939] font-rubik mr-2">
                    Save to Library
                  </Text>
                  <MaterialIcons name="library-add" size={18} color="#3A3E50" />
                </TouchableOpacity>
              </View>
            )}
            <View className="mt-2 flex flex-col w-full">
              <View className="flex flex-row justify-between items-center">
                <Text
                  className="text-[12px] text-[#1D2939] font-rubik font-medium"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.subTitle?.split(" ").slice(0, 4).join(" ") + " ..."}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setModalIndex(modalIndex === index ? null : index)
                  }
                  className="mr-2"
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={14}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
              <View className="flex-row items-center">
                <Image
                  source={require("../../assets/images/Vector1.png")}
                  className="h-[16px] w-[16px] ml-1"
                  resizeMode="contain"
                />
                <Text className="text-[10px] text-gray-500 ml-2 mt-1 font-rubik">
                  {item.views}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView className="flex-1">
      {/* 1. Most Recent Upload */}
      {uploadedAudios.length > 0 && (
        <View className="mt-4">
          <Text className="text-[#344054] text-[16px] font-rubik-semibold mb-4 ml-2">
            Most Recent
          </Text>
          {renderAudioCard(
            {
              fileUrl:
                typeof uploadedAudios[0].fileUrl === "string"
                  ? { uri: uploadedAudios[0].fileUrl }
                  : uploadedAudios[0].fileUrl,
              title: uploadedAudios[0].title,
              speaker: uploadedAudios[0].speaker ?? "Uploaded Speaker",
              timeAgo: getTimeAgo(uploadedAudios[0].createdAt),
              speakerAvatar:
                typeof uploadedAudios[0].speakerAvatar === "string"
                  ? { uri: uploadedAudios[0].speakerAvatar }
                  : uploadedAudios[0].speakerAvatar ||
                    require("../../assets/images/Avatar-1.png"),
              favorite: uploadedAudios[0].favorite ?? 0,
              views: uploadedAudios[0].viewCount ?? 0,
              saved: uploadedAudios[0].saved ?? 0,
              sheared: uploadedAudios[0].sheared ?? 0,
            },
            0,
            `uploaded-recent-${uploadedAudios[0].id ?? "0"}`,
            "progress"
          )}
        </View>
      )}

      {/* 2. Previously Viewed */}
      {renderMiniCards(
        "Previously Viewed",
        previouslyViewed,
        pvModalIndex,
        setPvModalIndex
      )}

      {/* 3. First 4 Explore More Music */}
      {uploadedAudios.length > 1 && (
        <View className="mt-9 gap-12">
          <Text className="text-[#344054] text-[16px] font-rubik-semibold mb-4 ml-2">
            Explore More Music
          </Text>
          {uploadedAudios.slice(1, 5).map((audio, index) => (
            <View key={`ExploreMoreFirst-${audio.id}-${index}`}>
              {renderAudioCard(
                {
                  fileUrl: { uri: audio.fileUrl },
                  title: audio.title,
                  speaker: audio.speaker ?? "Uploaded Speaker",
                  timeAgo: getTimeAgo(audio.createdAt),
                  speakerAvatar:
                    typeof audio.speakerAvatar === "string"
                      ? { uri: audio.speakerAvatar }
                      : audio.speakerAvatar ||
                        require("../../assets/images/Avatar-1.png"),
                  favorite: audio.favorite ?? 0,
                  views: audio.viewCount ?? 0,
                  saved: audio.saved ?? 0,
                  sheared: audio.sheared ?? 0,
                },
                index,
                `exploreMoreFirst-${index}`,
                "center"
              )}
            </View>
          ))}
        </View>
      )}

      {/* 4. Recommended For You */}
      {renderMiniCards(
        "Recommended for you",
        recommendedItems,
        rsModalIndex,
        setRsModalIndex
      )}

      {/* 5. Remaining Explore More Music */}
      {uploadedAudios.length > 5 && (
        <View className="mt-9 gap-12">
          <Text className="text-[#344054] text-[16px] font-rubik-semibold mb-4 ml-2">
            Explore More Music
          </Text>
          {uploadedAudios.slice(5).map((audio, index) => (
            <View key={`ExploreMoreRest-${audio.id}-${index}`}>
              {renderAudioCard(
                {
                  fileUrl: { uri: audio.fileUrl },
                  title: audio.title,
                  speaker: audio.speaker ?? "Uploaded Speaker",
                  timeAgo: getTimeAgo(audio.createdAt),
                  speakerAvatar:
                    typeof audio.speakerAvatar === "string"
                      ? { uri: audio.speakerAvatar }
                      : audio.speakerAvatar ||
                        require("../../assets/images/Avatar-1.png"),
                  favorite: audio.favorite ?? 0,
                  views: audio.viewCount ?? 0,
                  saved: audio.saved ?? 0,
                  sheared: audio.sheared ?? 0,
                },
                index,
                `exploreMoreRest-${index}`,
                "center"
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
