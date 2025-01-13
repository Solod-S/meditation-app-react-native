import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonPops {
  onPress: () => void;
  type?: "standard" | "warning";
  title: string;
  textStyle?: string;
  containerStyles?: string;
}

export function CustomButton({
  onPress,
  type = "standard",
  title,
  textStyle = "",
  containerStyles = "",
}: CustomButtonPops) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={
        type === "standard"
          ? `bg-white rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`
          : `bg-red-300 rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`
      }
      onPress={onPress}
    >
      <Text className={`font-semibold text-xl ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
}
