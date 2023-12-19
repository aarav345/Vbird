import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, TouchableOpacity} from 'react-native'
import { HomeIcon , MagnifyingGlassIcon, MicrophoneIcon, UserIcon} from "react-native-heroicons/solid";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BottomNav = () => {
    const navigation = useNavigation();
  return (
    <View className=" absolute bottom-2 rounded-full bg-gray-400 p-2 flex flex-row space-x-6">
        <TouchableOpacity
          className=" p-2 rounded-full  bg-white" onPress={() => navigation.navigate('Home')}
        >
          <MagnifyingGlassIcon size={hp(3.5)} strokeWidth={4.5} color="#228B22"  />
        </TouchableOpacity>

        <TouchableOpacity
          className=" p-2 rounded-full  bg-white" onPress={() => navigation.navigate('AudioScreen')}
        >
          <MicrophoneIcon size={hp(3.5)} strokeWidth={4.5} color="#228B22"  />
        </TouchableOpacity>

        <TouchableOpacity
          className=" p-2 rounded-full  bg-white" onPress={() => navigation.navigate('SignIn')}
        >
          <UserIcon size={hp(3.5)} strokeWidth={4.5} color="#228B22"  />
        </TouchableOpacity>
    </View>
  )
}

export default BottomNav