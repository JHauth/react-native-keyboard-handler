import React, { useContext } from "react";

import { Text, View, TextInput, Button } from "react-native";
import { RootTabScreenProps } from "../types";
import { KeyboardHandlerContext } from "../context/Keyboard.context";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useKeyboardHandler } from "../hooks/useKeyboardHandler";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const {
    animatedContentHeight,
    animatedFocusedInputValues,
    animatedKeyboardHeight,
    shouldHandleKeyboard,
  } = useKeyboardHandler();

  const translateY = useSharedValue<number>(0);

  useAnimatedReaction(
    () => shouldHandleKeyboard.value,
    (_shouldHandleKeyboard) => {
      // Translate if true
      if (_shouldHandleKeyboard) {
        //translate
        const TextInputPositionY = animatedFocusedInputValues.value?.pageY;
        translateY.value = animatedKeyboardHeight.value
          ? -animatedKeyboardHeight.value
          : 0;
        console.log(_shouldHandleKeyboard);
      } else {
        translateY.value = 0;
        console.log(_shouldHandleKeyboard);
      }
      // Translate back if false
    },
    []
  );

  const translationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      {/** Header */}
      <View
        style={{ height: 70, width: "100%", backgroundColor: "red", zIndex: 3 }}
      ></View>

      {/** content */}
      <Animated.View
        style={[
          { flex: 1, width: "100%", backgroundColor: "white" },
          translationStyle,
        ]}
      >
        <View style={{ height: 500 }}></View>
        <TextInput
          placeholder="Test"
          style={{ height: 40, width: "90%", borderWidth: 1, borderRadius: 10 }}
        />
        <Button
          title="test"
          onPress={() => {
            if (translateY.value) {
              translateY.value = 0;
            } else {
              translateY.value = -100;
            }
          }}
        />
      </Animated.View>
    </View>
  );
}
