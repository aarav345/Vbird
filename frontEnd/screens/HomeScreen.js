// HomeScreen.js

import React from 'react';
import { View, Text } from 'react-native';

function HomeScreen({ route }) {
  // Access user information from route.params.userInfo
  const userInfo = route.params.userInfo;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome, {userInfo.name}</Text>
    </View>
  );
}

export default HomeScreen; // Ensure that HomeScreen is the default export
