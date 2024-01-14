
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAuth } from '../AuthContext/AuthContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    <View className="flex-1 justify-center items-center space-y-3">
      {console.log(user)}
      <Text className=" text-xl text-center font-semibold tracking-widest text-green-500">WELCOME TO VBIRD, Your Personal Guide and tutor for making you a bird expert...</Text>
      <Text className=" text-2xl text-green-800 font-semibold">{user ? `Signed in as ${user.user.name}` : ''}</Text>
      {user ? (
        <TouchableOpacity className=" border-2 flex w-[80%] justify-center items-center border-green-700 py-4 rounded-full bg-green-500" onPress={handleSignOut}>
            <Text className=" text-xl font-semibold text-white tracking-widest">LOGOUT</Text>
        </TouchableOpacity>
      ) : (
        
        <TouchableOpacity className=" border-2 flex w-[80%] justify-center items-center border-green-700 py-4 rounded-full bg-green-500" onPress={handleSignIn}>
            <Text className=" text-xl font-semibold text-white tracking-widest">SIGN IN WITH GOOGLE</Text>
        </TouchableOpacity>
    

      )}

      

    </View>
  );
};

export default SignIn;
