import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Audio } from "expo-av";

import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { AppGradient, CustomButton } from "@/components";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Meditate() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setAudioSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // clean audio on exit
  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  // timer
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Exit
    if (secondsRemaining === 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setSecondsRemaining(prevState => prevState - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating]);

  // Format the time to ensure two digits are displayed

  const formattedTimeTuMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");

  const formattedTimeSeconds = String(
    Math.floor(secondsRemaining % 60)
  ).padStart(2, "0");

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setSecondsRemaining(10);
    setIsMeditating(!setIsMeditating);
    await toggleSound();
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initialSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setIsPlayingAudio(true);
    } else {
      await sound.pauseAsync();
      setIsPlayingAudio(false);
    }
  };

  const initialSound = async () => {
    const soundFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[soundFileName]);
    setAudioSound(sound);
    return sound;
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "#18181b"]}>
          <Pressable
            className="absolute top-16 left-6 z-10"
            onPress={() => router.back()}
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>
          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="font-rmono text-4xl text-blue-800">
                {formattedTimeTuMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-5">
            <CustomButton
              title={isPlayingAudio ? "Stop Meditation" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
}
