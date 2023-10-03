import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput, 
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const Tab = createBottomTabNavigator();

export function ExploreScreen(navigation) {


  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Learn About</Text>
          <Text style={styles.text2}>Birds</Text>
        </View>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={24}
            color="#757c7b"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="search for bird "
            keyboardType="default"
            style={styles.textField}
            placeholderTextColor="#757c7b"
            underlineColorAndroid="transparent"
          />
        </View>
        <View>
          
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "2rem",
  },
  text: {
    fontSize: "2.25rem",
    fontWeight: "600",
    color: "#1A2624",
    width: "70%",
  },

  text2: {
    fontSize: "2.25rem",
    fontWeight: "400",
    color: "#757c7b",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    padding: 8,
    borderColor: "#8c9291",
    borderRadius: 50,
    borderWidth: 3,
    backgroundColor: "#FAFAFA",
  },

  searchIcon: {
    padding: 8,
  },

  textField: {
    flex: 1,
    fontSize: "1.5rem",
    color: "#1A2624",
  },

 
});
