import { View, Text, ScrollView } from "react-native";
import React from "react";
import { AppGradient, GuidedAffirmationsGallery } from "@/components";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallary";

export default function Affirmation() {
  return (
    <View className="flex-1">
      <AppGradient
        colors={["#2e1f58", "#54426b", "#a790af"]}
        // className="px-5"
        // style={{ paddingTop: insets.top }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-zinc-50 text-3xl font-bold ">
            Change your beliefs with affirmations
          </Text>
          <View>
            {AFFIRMATION_GALLERY.map(g => (
              <GuidedAffirmationsGallery
                key={g.title}
                title={g.title}
                previews={g.data}
              ></GuidedAffirmationsGallery>
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
}
