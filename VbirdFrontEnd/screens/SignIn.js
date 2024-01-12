import React, {useEffect, useState} from 'react'
import { View, Text, Button } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'

const SignIn = () => {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "722139354092-q9a5cgoo5o6fvk9sluh3kl6r1n3nh67d.apps.googleusercontent.com"
    }
    );
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      setError();
      
    } catch (e) {

      setError(e);
      
    }
    
  }

  const logout = () => {
    setUserInfo();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  }

  return (
    <View className="flex-1 justify-center items-center ">
        <Text>
            {JSON.stringify(error)}
        </Text>
        {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
        {userInfo ? ( <Button title='Logout' onPress={logout} /> ) : (<GoogleSigninButton size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Dark} onPress={signin}/>)}
    </View>
  )
}

export default SignIn