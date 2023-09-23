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
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Home" component={HomeScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
