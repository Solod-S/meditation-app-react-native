import { View, Text, FlatList, Pressable, Image } from "react-native";
import React from "react";
import { GalleryPreviewData } from "./models/AffirmationsCategory";
import { Link } from "expo-router";

interface GuidedAffirmationsGalleryProps {
  title: string;
  previews: GalleryPreviewData[];
}

export function GuidedAffirmationsGallery({
  title,
  previews,
}: GuidedAffirmationsGalleryProps) {
  return (
    <View className="my-5 ">
      <View className="mb-2">
        <Text className="text-white font-bold text-xl">{title}</Text>
      </View>
      <View className="space-y-2">
        <FlatList
          data={previews}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => (
            <Link
              // href={{
              //   pathname: "/affirmations/[id]",
              //   params: { id: item.id.toString() }, // Преобразуем `id` в строку
              // }}
              href={`/affirmations/${item.id}`}
              asChild
            >
              <Pressable>
                <View className="h-36 w-32 rounded-md mr-4">
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </View>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </View>
  );
}
