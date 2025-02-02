import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { AppGradient, CustomButton } from "@/components";

import MEDITATION_IMAGES from "@/constants/meditation-images";
import { TimerContext } from "@/context/TimerContext";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";
import { useKeepAwake, deactivateKeepAwake } from "expo-keep-awake";

import ProgressWheel from "react-native-progress-wheel";

const Page = () => {
  const { id } = useLocalSearchParams();

  const {
    duration: secondsRemaining,
    setDuration,
    totalDuration,
    setTotalDuration,
  } = useContext(TimerContext);

  const [isMeditating, setMeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (secondsRemaining === 0) {
      if (isPlayingAudio) audioSound?.pauseAsync();
      setMeditating(false);
      setPlayingAudio(false);
      setTotalDuration(60);
      setDuration(60);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(secondsRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    return () => {
      if (Boolean(audioSound?.getStatusAsync())) {
        setTotalDuration(60);
        setDuration(60);
      }
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  useEffect(() => {
    useKeepAwake(); // Turn on the prohibition of turning off the screen
    return () => {
      deactivateKeepAwake(); // Turn off the dismounting ban
    };
  }, []);

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);

    // Добавляем обработчик завершения трека
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded && status.didJustFinish) {
        sound.replayAsync(); // Повторяем трек заново
      }
    });
    setSound(sound);
    return sound;
  };

  const togglePlayPause = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound?.playAsync();
      setPlayingAudio(true);
    } else {
      await sound?.pauseAsync();
      setPlayingAudio(false);
    }
  };

  async function toggleMeditationSessionStatus() {
    setMeditating(prevState => !prevState);
    await togglePlayPause();
  }

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();

    router.push("/(modal)/adjustMeditationDuration" as any);
  };

  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>

          <View className="flex-1 justify-center items-center">
            <ProgressWheel
              size={176} // Размер круга
              width={12} // Ширина полоски прогресса
              progress={(secondsRemaining / totalDuration) * 100} // Прогресс в процентах
              color="#FEB2B2"
              backgroundColor="#ddd"
              animateFromValue={((secondsRemaining + 1) / totalDuration) * 100} // Добавляем плавность
              duration={1000} // Продолжительность анимации в миллисекундах
            />
            <View className="absolute bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}.{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton
              title="Adjust duration"
              onPress={handleAdjustDuration}
            />
            <CustomButton
              type={isPlayingAudio ? "warning" : "standard"}
              containerStyles="mt-4"
              title={isPlayingAudio ? "Stop Meditation" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Page;
