import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

export const GetStarted = () => {
  return (
    <>
      <View style={styles.GetStarted}>
        <View>
          <Image
            source={require('../assets/nature1.svg')}
            style={styles.image}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  GetStarted:{
    backgroundColor: "#186B23",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  image: {
    width: 100,
    height: 100,

  }
})
