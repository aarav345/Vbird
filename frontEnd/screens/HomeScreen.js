// HomeScreen.js

import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreSreen } from './ExploreSreen';

const Tab = createBottomTabNavigator();


export function HomeScreen(navigation) {
  return (
    <>

    <Tab.Navigator>
      {/* <Tab.Screen name="home" component={HomeScreen} /> */}
      <Tab.Screen name="explore" component={ExploreSreen} />
    </Tab.Navigator>

    </>
  );
}




