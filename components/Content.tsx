import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

export function Content({ children }: any) {
  return (
    <SafeAreaView
      // edges={["top"]}
      className="flex-1 px-5 py-3"
    >
      {children}
    </SafeAreaView>
  );
}
