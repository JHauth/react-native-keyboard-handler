import * as React from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, TextInput } from "react-native";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <TextInput
        placeholder="Test"
        style={{ height: 40, width: "90%", borderWidth: 1, borderRadius: 10 }}
      />
      <Text>Test</Text>
    </View>
  );
}
