import {
  View,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AppGradient } from "@/components";
import { StatusBar } from "expo-status-bar";
import { MEDITATION_DATA } from "@/constants/MeditationData";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

// Skeleton Loader Component for FlatList Items
const SkeletonLoaderItem = () => (
  <View className="bg-gray-200 opacity-30 h-[150] mb-4 rounded-lg justify-center items-center">
    <ActivityIndicator size="large" color="#888" className="flex-1" />
  </View>
);

export default function NatureMeditate() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Simulating loading data (in a real app, you'd fetch data here)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderItem = ({ index }: { index: number }) => {
    if (loading) {
      return <SkeletonLoaderItem />;
    }

    const item = MEDITATION_DATA[index];
    return (
      <Pressable
        className="h-48 my-3 rounded-md overflow-hidden"
        onPress={() => router.push(`/meditate/${item.id}`)}
      >
        <ImageBackground
          source={MEDITATION_IMAGES[item.id - 1]}
          resizeMode="cover"
          className="flex-1 rounded-ls justify-center"
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.gradient}
          >
            <Text className="text-center text-gray-100 text-3xl font-bold">
              {item.title}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    );
  };

  return (
    <View className="flex-1">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View className="mb-6">
          <Text className="text-gray-200 mb-3 font-bold text-4xl text-left">
            Welcome
          </Text>
          <Text className="text-indigo-100 text-xl font-medium">
            Start your meditation today
          </Text>
        </View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={MEDITATION_DATA}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </AppGradient>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
