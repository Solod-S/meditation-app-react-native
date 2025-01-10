import { View, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

import { CustomButton, AppGradient } from "@/components";
import home from "@/assets/meditation-images/home.jpg";
export default function App() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground source={home} resizeMode="cover" className="flex-1">
        <AppGradient colors={["transparent", "#18181b"]}>
          <SafeAreaView edges={["top"]} className="flex-1 px-1 justify-between">
            <View>
              <Text className="text-center text-white font-bold text-4xl">
                Simple Meditation
              </Text>
              <Text className="text-center text-white text-regular text-2xl mt-3">
                Simplifying Meditation for Everyone
              </Text>
            </View>
            <View>
              <CustomButton
                title="Get Started"
                onPress={() => router.push("/natureMeditate")}
              />
            </View>
            <StatusBar style="light" />
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
}
