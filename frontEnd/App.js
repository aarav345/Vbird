import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GetStarted } from "./screens/GetStarted";
import { NativeWindStyleSheet } from "nativewind";
import { AudioScreen } from "./screens/AudioScreen";
import { MainScreen } from "./screens/MainScreen";
import BirdDetailScreen from "./screens/BirdDetailScreen";
import { ExploreScreen } from "./screens/ExploreScreen";
import { LoginScreen } from "./screens/LoginScreen";

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
          <Stack.Screen name='login' component={LoginScreen} />
          <Stack.Screen name='main' component={MainScreen} />
          <Stack.Screen name='explore' component={ExploreScreen} />
          <Stack.Screen name="BirdDetail" component={BirdDetailScreen}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
