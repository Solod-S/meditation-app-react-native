import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    }; // cleanup timer
  }, []);

  return (
    <View className="my-5">
      <View className="mb-2">
        {loading ? (
          <Text className="  text-gray-200 opacity-30 text-xl">{title}</Text>
        ) : (
          <Text className="text-white font-bold text-xl">{title}</Text>
        )}
      </View>
      <View className="space-y-2">
        <FlatList
          data={loading ? [...Array(3)] : previews} // Display loading placeholders
          keyExtractor={(item, index) => index.toString()} // Use index for skeleton items
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => {
            if (loading) {
              // Render skeleton loading item
              return (
                <View
                  key={index}
                  className="h-36 w-32 rounded-md bg-gray-200 opacity-30 mr-4"
                >
                  <ActivityIndicator
                    size="large"
                    color="#888"
                    className="flex-1 justify-center items-center"
                  />
                </View>
              );
            } else {
              // Render actual item after data is loaded
              return (
                <Link href={`/affirmation/${item.id}`} asChild>
                  <Pressable>
                    <View className="h-36 w-32 rounded-md mr-4">
                      <Image
                        source={item.image}
                        contentFit="cover"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </View>
                  </Pressable>
                </Link>
              );
            }
          }}
        />
      </View>
    </View>
  );
}
