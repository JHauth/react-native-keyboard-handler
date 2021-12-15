import React, { createContext, useState } from "react";
import {
  findNodeHandle,
  LayoutChangeEvent,
  Platform,
  TextInput,
  useWindowDimensions,
  View,
  Keyboard,
} from "react-native";
import Animated, {
  runOnUI,
  useSharedValue,
  useWorkletCallback,
} from "react-native-reanimated";

//#region Types ----------------------------------------------------------------
export type KeyboardHandlerProviderProps = object;

export type animatedFocusedInputType = {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
};

export type KeyboardHandlerProviderValues = {
  animatedContentHeight: Animated.SharedValue<number>;
  animatedKeyboardHeight: Animated.SharedValue<number | null>;
  animatedFocusedInputValues: Animated.SharedValue<null | animatedFocusedInputType>;
  shouldHandleKeyboard: Animated.SharedValue<boolean>;
};

export type KeyboardEventName =
  | "keyboardWillShow"
  | "keyboardDidShow"
  | "keyboardWillHide"
  | "keyboardDidHide"
  | "keyboardWillChangeFrame"
  | "keyboardDidChangeFrame";
//#endregion

// Create context --------------------------------------------------------------
export const KeyboardHandlerContext =
  createContext<KeyboardHandlerProviderValues | null>(null);

// Provider --------------------------------------------------------------------
/**
 * Handles the keyboard gracefully on Android and IOS.
 * Exposes the height of the visible content and the height of the keyboard
 *
 * @remark Requieres android:windowSoftInputMode = adjustResize (Default value)
 */
export const KeyboardHandlerProvider: React.FC<
  KeyboardHandlerProviderProps
> = ({ children }) => {
  //#region Init values --------------------------------------------------------

  // ContentHeight
  const { height } = useWindowDimensions();
  //const [contentHeight, setContentHeight] = useState<number>(height);

  //#region shared values
  const animatedContentHeight = useSharedValue<number>(height);
  const animatedKeyboardHeight = useSharedValue<number | null>(null);
  const animatedFocusedInputValues =
    useSharedValue<null | animatedFocusedInputType>(null);
  const shouldHandleKeyboard = useSharedValue<boolean>(false);
  //#endregion

  // Get the correct events for Platfrom keyboard
  const KEYBOARD_EVENT_MAPPER = {
    KEYBOARD_SHOW: Platform.select({
      ios: "keyboardWillShow",
      android: "keyboardDidShow",
      default: "",
    }) as KeyboardEventName,
    KEYBOARD_HIDE: Platform.select({
      ios: "keyboardWillHide",
      android: "keyboardDidHide",
      default: "",
    }) as KeyboardEventName,
  };
  //#endregion

  //#region Functions ----------------------------------------------------------
  const handleOnKeyboardShow = useWorkletCallback(() => {
    // test
  });

  function getAndroidKeyboardValues(e: LayoutChangeEvent) {
    // Check if correct Platform
    if (Platform.OS !== "android") {
      return;
    }

    // TODO Only works for Android. Implement for IOS too!!
    if (height - e.nativeEvent.layout.height > 0) {
      console.log(height);
      console.log(e.nativeEvent.layout.height);

      // Calc values
      animatedContentHeight.value = e.nativeEvent.layout.height;
      animatedKeyboardHeight.value = height - e.nativeEvent.layout.height;

      // Get the currently focused field
      const currentlyFocusedField = TextInput.State.currentlyFocusedInput();

      // Get measurements if not null
      if (currentlyFocusedField) {
        currentlyFocusedField.measure((x, y, width, height, pageX, pageY) => {
          animatedFocusedInputValues.value = {
            x,
            y,
            width,
            height,
            pageY,
            pageX,
          };
          console.log({ x, y, width, height, pageX, pageY });

          shouldHandleKeyboard.value = true;
        });
      } // else do nothing

      console.log("keyboard show");
    } else if (e.nativeEvent.layout.height - height === 0) {
      console.log("keyboard hide");
      shouldHandleKeyboard.value = false;
    } else {
      // Handle negative Keyboard height
    }
  }

  //#endregion

  // Keyboard height

  return (
    <KeyboardHandlerContext.Provider
      value={{
        animatedContentHeight,
        animatedFocusedInputValues,
        animatedKeyboardHeight,
        shouldHandleKeyboard,
      }}
    >
      <View
        style={{ flex: 1, width: "100%" }}
        onLayout={(e) => {
          getAndroidKeyboardValues(e);
        }}
      >
        <View style={{ height, width: "100%" }}>{children}</View>
      </View>
    </KeyboardHandlerContext.Provider>
  );
};
