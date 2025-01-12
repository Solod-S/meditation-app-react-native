import {
  View,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import { AppGradient } from "@/components";
import { StatusBar } from "expo-status-bar";
import { MEDITATION_DATA } from "@/constants/MeditationData";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function NatureMeditate() {
  const router = useRouter();
  return (
    <View className="flex-1 ">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View className="mb-6">
          <Text className="text-gray-200 mb-3 font-bold text-4xl text-left">
            Welcome
          </Text>
          <Text className="text-indigo-100 text-xl font-medium">
            Start your meditation today
          </Text>
        </View>
        <View>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={MEDITATION_DATA}
            renderItem={({ item }) => (
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
            )}
            className="mb-20"
            showsVerticalScrollIndicator={false}
          />
        </View>
      </AppGradient>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});
