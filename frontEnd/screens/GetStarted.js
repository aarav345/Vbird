import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";

export const GetStarted = ({navigation}) => {
  return (
    <>
      <ImageBackground
        source={require("../assets/bg-image1.avif")}
        style={styles.backgroundImage}
      >
        <View style={styles.container} className="px-8 py-4">
          <View style={styles.container1}>
            <Text style={styles.text}>VBIRD</Text>
          </View>

          <View style={styles.container2}>
            <View style={styles.smallhead}>
              <Text style={styles.text1}>Explore bird calls</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.text2}>
                Uncover bird identities through their symphonies
              </Text>
            </View>

            <View style={styles.press}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
              <Text style={styles.buttonText}>Let's get Started</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    color: "white",
  },

  container1: {
    flex: 1,
  },

  text: {
    color: "#FAFAFA",
    fontSize: 56,
    fontWeight: 700,
  },

  container2: {
    flex: 1,
  },

  text1: {
    color: "#FAFAFA",
    fontSize: 48,
    fontWeight: 700,
  },

  text2: {
    color: "#d3d3d3",
    fontSize: 24,
    fontWeight: 400,
  },

  button: {
    alignItems: 'center',
    borderColor: '#FAFAFA',
    borderWidth: 3,
    borderRadius: 50,
    width: "70%",
    marginTop: 30,
    padding: 15
  },

  buttonText: {
    color: "#FAFAFA",
    fontSize: 24,
    fontWeight: 500,
  }
});
