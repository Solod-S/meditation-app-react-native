import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarAccessibilityLabel: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="natureMeditate"
        options={{
          tabBarLabel: "Meditate",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="flower-tulip"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="affirmation"
        options={{
          tabBarLabel: "Affirmation",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="book-open-reader" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
