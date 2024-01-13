
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAuth } from '../AuthContext/AuthContext';

const SignIn = () => {
  const { user, signIn, signOut } = useAuth();
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "722139354092-q9a5cgoo5o6fvk9sluh3kl6r1n3nh67d.apps.googleusercontent.com"
    });
  }, []);

  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      setError();
      signIn(user);
    } catch (e) {
      setError(e);
    }
  };

  const handleSignOut = () => {
    setUserInfo();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    signOut();
  };

  return (
    <View className="flex-1 justify-center items-center ">
      {console.log(user)}
      <Text>{user ? `Signed in as ${user.user.name}` : 'Not signed in'}</Text>
      <Text>{JSON.stringify(error)}</Text>
      {user ? (
        <Button title='Logout' onPress={handleSignOut} />
      ) : (
        <GoogleSigninButton size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Dark} onPress={handleSignIn} />
      )}

      

    </View>
  );
};

export default SignIn;
