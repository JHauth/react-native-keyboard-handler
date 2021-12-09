import React, { createContext, useState } from "react";
import { LayoutChangeEvent, Platform, useWindowDimensions } from "react-native";
import { View, Keyboard } from "react-native";

export type KeyboardHandlerProviderProps = object;

export const KeyboardHandlerContext = createContext({});

export type KeyboardEventName =
  | "keyboardWillShow"
  | "keyboardDidShow"
  | "keyboardWillHide"
  | "keyboardDidHide"
  | "keyboardWillChangeFrame"
  | "keyboardDidChangeFrame";

/**
 * Handles the keyboard gracefully on Android and IOS.
 * Exposes the height of the visible content and the height of the keyboard
 *
 * @remark Requieres android:windowSoftInputMode = adjustResize (Default value)
 */
export const KeyboardHandlerProvider: React.FC<
  KeyboardHandlerProviderProps
> = ({ children }) => {
  // ContentHeight
  const { height } = useWindowDimensions();
  const [contentHeight, setContentHeight] = useState<number>(height);

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

  function getKeyboardValues(e: LayoutChangeEvent) {
    setContentHeight(e.nativeEvent.layout.height);
    setKeyboardHeight(height - e.nativeEvent.layout.height);
  }

  // Keyboard height
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  return (
    <KeyboardHandlerContext.Provider value={{ contentHeight, keyboardHeight }}>
      <View
        style={{ flex: 1, width: "100%" }}
        onLayout={(e) => {
          getKeyboardValues(e);
        }}
      >
        <View style={{ height, width: "100%" }}>{children}</View>
      </View>
    </KeyboardHandlerContext.Provider>
  );
};
