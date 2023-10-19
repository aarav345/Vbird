import React, { useEffect, useState } from "react";
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export const LoginScreen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      navigation.navigate("main");
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

  return (
    <>
      <ImageBackground
        source={require("../assets/bird2.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container} className="px-8 py-4">
          <Text style={styles.text}>VBIRD</Text>

          <View style={styles.container1}>
            <Text style={styles.head}>Sign IN with Google:</Text>
            <View style={styles.press}>
              <TouchableOpacity style={styles.button} onPress={handleClick}>
                <Text style={styles.buttonText}>Sign In</Text>
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
    color: "white",
  },

  text: {
    flex: 1,
    color: "#FAFAFA",
    fontSize: 56,
    fontWeight: 700,
  },

  container1: {
    flex: 1,
    justifyContent: "center",
  },

  head: {
    color: "#FAFAFA",
    fontSize: 40,
    fontWeight: 700,
  },

  button: {
    alignItems: "center",
    borderColor: "#FAFAFA",
    borderWidth: 3,
    borderRadius: 50,
    width: "70%",
    marginTop: 30,
    padding: 15,
  },

  buttonText: {
    color: "#FAFAFA",
    fontSize: 24,
    fontWeight: 500,
  },
});
