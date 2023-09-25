import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { GetStarted } from "./screens/GetStarted";
import { NativeWindStyleSheet } from "nativewind";

export default function App() {
  const Stack = createNativeStackNavigator();

  NativeWindStyleSheet.setOutput({
    default: "native",
  });
  return (
    <>
    <GetStarted/>
    </>
  );
}
