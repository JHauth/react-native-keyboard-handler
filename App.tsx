import { StatusBar } from "expo-status-bar";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { height } = useWindowDimensions();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <View
          style={{ flex: 1, width: "100%", backgroundColor: "red" }}
          onLayout={(e) => console.log(e.nativeEvent)}
        >
          <View style={{ height, width: "100%" }}>
            <Navigation colorScheme={colorScheme} />
          </View>
        </View>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
