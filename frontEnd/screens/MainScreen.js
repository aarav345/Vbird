import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExploreScreen } from "./ExploreScreen";
import { AudioScreen } from "./AudioScreen";
import Icon from "react-native-vector-icons/FontAwesome";

const exploreName = "explore";
const audioName = "audio";

const Tab = createBottomTabNavigator();

export const MainScreen = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName={exploreName}
        shifting={true}
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 10,
            backgroundColor: "#d1d3d3",
            borderRadius: 50,
            height: 90,
            justifyContent: "center",
          },

      
          tabBarLabelStyle: {
            display: "none"
          },
        }}
      >
        <Tab.Screen
          name={exploreName}
          component={ExploreScreen}
          options={{
            
            tabBarIcon: ({ color }) => (
              <Icon name="search" size={44} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={audioName}
          component={AudioScreen}
          options={{
          
            tabBarIcon: ({ color }) => (
              <Icon name="music" size={44} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      
    </>
  );
};
