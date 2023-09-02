// web 338378501985-5ahu3gebfg1uf83fm9ag3se1gp5bn0o8.apps.googleusercontent.com
// android 338378501985-ovst7178aadcpim050gbddt3kgfaoti9.apps.googleusercontent.com

import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import react from "react";
import { Button } from "react-native-web";

WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const [userInfo, setUserInfo] = React.useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "338378501985-ovst7178aadcpim050gbddt3kgfaoti9.apps.googleusercontent.com",
    webClientId: "338378501985-5ahu3gebfg1uf83fm9ag3se1gp5bn0o8.apps.googleusercontent.com"
  })

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response])

  async function handleSignInWithGoogle(){
    const user = await AsyncStorage.getItem("@user")
    if (!user) {

      if(response?.type === "success"){
        await getUserInfo(response.authentication.accessToken);
      }

    } else {
      setUserInfo(JSON.parse(user))
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {headers: {Authorization: `Bearer ${token}`}
      }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch(error) {

    }
  };


  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <Button title="Sign in with Google" onPress={()=>promptAsync()}/>
      <Button title="delete storage" onPress={() =>  AsyncStorage.removeItem("@user")}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
