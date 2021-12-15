import { useContext } from "react";
import { KeyboardHandlerContext } from "../context/Keyboard.context";

export const useKeyboardHandler = () => {
  const context = useContext(KeyboardHandlerContext);

  if (context === null) {
    throw new Error(
      "KeyboardHandler cannot be used outside of KeyboardHandlerProvider"
    );
  }

  return context;
};
