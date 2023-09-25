import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExploreScreen } from "./ExploreScreen";
import { AudioScreen } from "./AudioScreen";

const exploreName = "explore";
const audioName = "audio";

const Tab = createBottomTabNavigator();

export const MainScreen = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName={exploreName}
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 10,
            backgroundColor: "#1A2624",
            borderRadius: 50,
            height: 90,
            justifyContent: "center",
          },

          tabBarIconStyle: {
            visibility: "hidden",
          },

          tabBarLabelStyle: {
            color: "white",
            fontSize: "30px",
            fontWeight: "600",
            
          },
        }}
      >
        <Tab.Screen
          name={exploreName}
          component={ExploreScreen}
          options={{
            tabBarLabel: "Explore",
          }}
        />
        <Tab.Screen
          name={audioName}
          component={AudioScreen}
          options={{
            tabBarLabel: "Audio",
          }}
        />
      </Tab.Navigator>
    </>
  );
};
