import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { PlayIcon, SpeakerWaveIcon } from 'react-native-heroicons/solid';
import AuthHeader from '../components/AuthHeader';

const profileImage = require('../../assets/images/user.png');

type DownloadItem = {
  img: any;
  title: string;
  description: string;
  author: string;
  time: string;
  size: string;
  status: string;
};

const yourDownloads: DownloadItem[] = [
  {
    img: require('../../assets/images/1.png'),
    title: 'The art of seeing Miracles',
    description: 'Learn how to see the miraculous in everyday life and grow your faith in amazing ways.',
    author: 'Minister Joseph Eluwa',
    time: '3HRS AGO',
    size: '15MB',
    status: 'DOWNLOADED',
  },
  {
    img: require('../../assets/images/9.png'),
    title: 'Faith That Moves Mountains',
    description: 'A deep dive into the power of faith and how it shapes our lives.',
    author: 'Minister Jane Doe',
    time: '5HRS AGO',
    size: '20MB',
    status: 'DOWNLOADED',
  },
  {
    img: require('../../assets/images/11.png'),
    title: 'Walking in the Spirit',
    description: 'Discover the joy and peace of living a Spirit-led life.',
    author: 'Pastor John Smith',
    time: '1DAY AGO',
    size: '18MB',
    status: 'DOWNLOADED',
  },
  {
    img: require('../../assets/images/16.png'),
    title: 'The Power of Prayer',
    description: 'Insights and testimonies on how prayer changes lives.',
    author: 'Minister Mary Lee',
    time: '2DAYS AGO',
    size: '25MB',
    status: 'DOWNLOADED',
  },
];

const automaticDownloads: DownloadItem[] = [
  {
    img: require('../../assets/images/Avatar-1.png'),
    title: 'Living with Purpose',
    description: 'Finding meaning and fulfillment in your daily walk.',
    author: 'Minister Paul Ade',
    time: '4HRS AGO',
    size: '12MB',
    status: 'DOWNLOADED',
  },
  {
    img: require('../../assets/images/image12a.png'),
    title: 'Overcoming Fear',
    description: 'Practical tips to build courage and defeat fear.',
    author: 'Minister Grace Kim',
    time: '6HRS AGO',
    size: '22MB',
    status: 'DOWNLOADED',
  },
  {
    img: require('../../assets/images/Apple.png'),
    title: 'Wisdom for Today',
    description: 'Daily nuggets of wisdom for a victorious life.',
    author: 'Minister James Lee',
    time: '8HRS AGO',
    size: '10MB',
    status: 'DOWNLOADED',
  },
  {
    img: require('../../assets/images/react-logo.png'),
    title: 'Walking in Love',
    description: 'How to live a life of love towards God and others.',
    author: 'Minister Sarah Doe',
    time: '10HRS AGO',
    size: '14MB',
    status: 'DOWNLOADED',
  },
  {
    img: require('../../assets/images/Vector1.png'),
    title: 'Victory Over Trials',
    description: 'Stories of overcoming challenges through faith.',
    author: 'Minister Joseph Eluwa',
    time: '12HRS AGO',
    size: '16MB',
    status: 'DOWNLOADED',
  },
];

const DownloadCard: React.FC<{ item: DownloadItem }> = ({ item }) => (
  <View className="mb-5 flex-row w-[362px] border border-red-600 justify-between">
    <Image source={item.img} className="w-[60px] h-[72px] rounded-xl" resizeMode="cover" />
  

<View className='flex-col w-[268px] '>
<Text className="mt-2 font-bold text-base">{item.title}</Text>
    <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>
      {item.description}
    </Text>



    <View className="flex-row items-center">
        <TouchableOpacity className="mr-3">
          <PlayIcon size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <SpeakerWaveIcon size={20} color="black" />
        </TouchableOpacity>
      </View>



    <View className="flex-row items-center justify-between mt-2">
      <View className="flex-row items-center flex-wrap">
        <Image source={profileImage} className="w-6 h-6 rounded-full" />
        <Text className="ml-2 text-sm font-semibold">{item.author}</Text>
        <View className='flex-row items-center'>
        <Text className="ml-2 text-xs text-gray-400">{item.time}</Text>
        <Text className="ml-2 text-xs text-gray-400">• {item.size}</Text>
        <Text className="ml-2 text-xs text-green-600">{item.status}</Text>
        </View>
    
       
      </View>

    </View>
  
</View>

    {/* Author & Actions */}
   
  </View>
);

const DownloadScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-white mx-auto">

<View className="px-4 m">
        <AuthHeader title="Downloads" />
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-[#F2F2F7] rounded-xl mx-4 mt-4 px-3 py-4 border border-[#E5E5EA]">
        <MagnifyingGlassIcon size={22} color="#8E8E93" />
        <Text className="ml-2 font-rubik-regular text-[#98A2B3]">Search for downloads...</Text>
      </View>

      {/* Profile */}
      <View className="flex-row items-center px-4 mt-4">
        <Image source={profileImage}   className="w-10 h-10 rounded-full" />
       <View className='flex-col'>
       <Text className="ml-3 font-semibold text-base">Lizzy</Text>
       <Text className="ml-2 text-gray-400">ADULTS</Text>
       </View>
      </View>

      {/* Smart download */}
      <View className="bg-gray-100 rounded-xl w-[362px] h-[104px] mx-4 mt-4">
        <Text className="font-semibold">Smart download</Text>
        <Text className="text-gray-500 text-sm mt-1">
          Automatically downloads content for you based on what you watch when connected to a wifi
        </Text>
      </View>

      {/* Downloads */}
      <ScrollView className="mt-4 px-4" showsVerticalScrollIndicator={false}>
        {/* Your downloads */}
        <Text className="text-base font-semibold mb-3">Your downloads</Text>
        {yourDownloads.map((item, index) => (
          <DownloadCard key={index} item={item} />
        ))}

        {/* Automatic downloads */}
        <Text className="text-base font-semibold mb-3 mt-4">Automatic downloads</Text>
        {automaticDownloads.map((item, index) => (
          <DownloadCard key={index} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DownloadScreen;
