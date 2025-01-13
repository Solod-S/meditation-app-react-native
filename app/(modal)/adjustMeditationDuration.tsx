import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { AppGradient, CustomButton } from "@/components";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TimerContext } from "@/context/TimerContext";

export default function AdjustMeditationDuration() {
  const router = useRouter();
  const { setDuration } = useContext(TimerContext);

  const handlePress = (duration: number) => {
    router.back();
    setDuration(duration);
  };

  return (
    <View className="flex-1 relative">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <Pressable
          className="absolute top-8 left-6 z-10"
          onPress={() => router.back()}
        >
          <AntDesign name="leftcircleo" size={50} color="white" />
        </Pressable>
        <View className="justify-center h-4/5">
          <Text className="text-center font-bold text-3xl text-white mb-8">
            Adjust your meditation duration
          </Text>
          <View>
            <CustomButton
              containerStyles="mb-5"
              title="10 seconds"
              onPress={() => handlePress(10)}
            />
            <CustomButton
              containerStyles="mb-5"
              title="5 minutes"
              onPress={() => handlePress(5 * 60)}
            />
            <CustomButton
              containerStyles="mb-5"
              title="10 minutes"
              onPress={() => handlePress(10 * 60)}
            />
            <CustomButton
              containerStyles="mb-5"
              title="15 minutes"
              onPress={() => handlePress(15 * 60)}
            />
          </View>
        </View>
      </AppGradient>
    </View>
  );
}
