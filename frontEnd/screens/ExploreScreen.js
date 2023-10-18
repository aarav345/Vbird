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
import filter from "lodash.filter";

const Tab = createBottomTabNavigator();

const birdData = [
  { name: "Asian Koel", image: require("../assets/image/Asian Koel.jpg") },
  { name: "Wood Snipe", image: require("../assets/image/Wood Snipe.jpg") },
  // Add more bird entries as needed
];

export function ExploreScreen({ navigation }) {

  // for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(birdData);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = filter(birdData, (bird) =>
      bird.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  // to navigate to bird detail screen
  const navigateToBirdDetail = (birdName, birdImage) => {
    navigation.navigate("BirdDetail", { birdName, birdImage });
  };

  const renderBirdItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigateToBirdDetail(item.name, item.image)}
      style={styles.card}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.birdName}>{item.name}</Text>
    </TouchableOpacity>
  );

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
            autoCapitalize="none"
            autoCorrect="false"
            value={searchQuery}
            onChangeText={(query) => handleSearch(query)}
          />
        </View>
        <View>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderBirdItem}
            horizontal={true}
          />
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

  card: {
    marginTop: 50,
    margin: 10,
    width: 300,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 350,
  },
  birdName: {
    fontSize: 30,
    fontWeight: "600",
    color: "#1A2624",
    textAlign: "center",
  },
});
