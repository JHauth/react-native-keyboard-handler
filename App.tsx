import { StatusBar } from "expo-status-bar";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TextInput } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { KeyboardHandlerProvider } from "./context/Keyboard.context";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const { height } = useWindowDimensions();

  function update() {
    const currentlyFocusedField = TextInput.State.currentlyFocusedInput;
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <View
          style={{ flex: 1, width: "100%" }}
          //   onLayout={(e) => console.log(e.nativeEvent)}
        >
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: "green",
              position: "absolute",
              top: 632,
              left: 60,
              zIndex: 12,
            }}
          ></View>
          <KeyboardHandlerProvider>
            <Navigation colorScheme={colorScheme} />
          </KeyboardHandlerProvider>
          <StatusBar />
        </View>
      </SafeAreaProvider>
    );
  }
}
