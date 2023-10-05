
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";

const BirdDetailScreen = ({ route, navigation }) => {
  const { birdName, birdImage } = route.params;

  const [birdInfo, setBirdInfo] = useState(null);

  // Function to fetch bird information from the API
  const fetchBirdInfo = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/get_bird/${birdName}`
      );
      const data = await response.json();
      setBirdInfo(data);
    } catch (error) {
      console.error("Error fetching bird information:", error);
    }
  };

  // Fetch bird information when the component mounts
  useEffect(() => {
    fetchBirdInfo();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.backContainer} className="">
          <Icon
            name="arrow-left"
            size={30}
            color="#757c7b"
            style={styles.back}
            onPress={()=> navigation.navigate('main')}
          />
        </View>
        <View style={styles.imageContainer} className="mt-10">
          <Image source={birdImage} style={styles.image} />
          <Text style={styles.birdName}>{birdName}</Text>
          {birdInfo && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Scientific Name:</Text>
              <Text style={styles.infoText}>{birdInfo.scientificName}</Text>
              <Text style={styles.infoLabel}>Description:</Text>
              <Text style={styles.infoText}>{birdInfo.description}</Text>
              <Text style={styles.infoLabel}>Location:</Text>
              <Text style={styles.infoText}>{birdInfo.location}</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#ffffff"
  },

  imageContainer: {
    flex: 1,
    alignItems: "center",
  },

  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 2, height: 10 }, // Shadow offset
    shadowOpacity: 1, // Shadow opacity (0 to 1)
    shadowRadius: 5, // Shadow radius
    elevation: 10, 
  },
  birdName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    color: "#1A1A1A"
  },

  infoContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    marginTop: 10,
    gap: 5,
     
  },

  infoLabel: {
    fontSize: 24,
    fontWeight: "500",
  },
  
  infoText: {
    fontSize: 18,

  }
});

export default BirdDetailScreen;
