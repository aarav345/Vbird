import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { GetStarted } from "./screens/GetStarted";
import { NativeWindStyleSheet } from "nativewind";
import { ExploreSreen } from "./screens/ExploreSreen";

const Stack = createNativeStackNavigator();

export default function App() {

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
          <Stack.Screen name='getstarted' component={GetStarted} />
          <Stack.Screen name='home' component={HomeScreen} />
          <Stack.Screen name='explore' component={ExploreSreen}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
