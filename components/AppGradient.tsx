import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Content } from "./Content";

export function AppGradient({
  children,
  colors,
}: {
  children: any;
  colors: [string, string, ...string[]];
}) {
  return (
    <LinearGradient
      colors={colors}
      style={{
        flex: 1,
        // opacity: 0.7,
      }}
    >
      <Content>{children}</Content>
    </LinearGradient>
  );
}
