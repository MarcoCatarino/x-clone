import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

// TODO: Add Search functionality

const TRENDING_TOPICS = [
  { topic: "#ReactNative", tweets: "15K" },
  { topic: "#TypeScript", tweets: "25K" },
  { topic: "#WebDevelopment", tweets: "65K" },
  { topic: "#AI", tweets: "15K" },
  { topic: "#TechNews", tweets: "13K" },
  { topic: "#AstroDevelopment", tweets: "15K" },
];

const SearchScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center px-4 py-3 bg-gray-100 rounded-full">
          <Feather name="search" size={20} color="#657786" />

          <TextInput
            placeholder="Search Twitter"
            className="flex-1 ml-3 text-base"
            placeholderTextColor="#657786"
          />
        </View>
      </View>

      {/* Scalable Trending Topics */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={true}>
        <View className="p-4">
          <Text className="mb-4 text-2xl font-bold text-gray-900">
            Trending for you
          </Text>

          {/* List of Topics */}
          {TRENDING_TOPICS.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="py-3 border-b border-gray-100"
            >
              <Text className="text-sm text-gray-500">
                Trending in Technology
              </Text>

              <Text className="text-lg font-bold text-gray-900">
                {item.topic}
              </Text>

              <Text className="text-sm text-gray-500">{item.tweets}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
