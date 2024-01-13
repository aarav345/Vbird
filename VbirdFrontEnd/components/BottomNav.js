import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, TouchableOpacity, Modal, Text} from 'react-native'
import { HomeIcon , MagnifyingGlassIcon, MicrophoneIcon, UserIcon} from "react-native-heroicons/solid";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SignIn from './SignIn';

const BottomNav = () => {
    const navigation = useNavigation();
    const [openModal, setOpenModal] = useState(false);

    const transparent = 'rgba(0, 0, 0, 0.5)';


    function renderModal() {
      return (
        <Modal visible={openModal} animationType='slide' transparent={true}>
          <View className=" flex-1 justify-center items-center" style={{backgroundColor: transparent}}>
            <View className=" bg-white p-4 w-[90%] h-[30%] rounded-lg">
              <TouchableOpacity onPress={() => setOpenModal(false)}>
                <Text className=" text-base font-medium text-gray-600">Close</Text>
              </TouchableOpacity>
              <SignIn/>
            </View>
          </View>
        </Modal>
      )
    }





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

        {/* <TouchableOpacity
          className=" p-2 rounded-full  bg-white" onPress={() => navigation.navigate('SignIn')}
        >
          <UserIcon size={hp(3.5)} strokeWidth={4.5} color="#228B22"  />
        </TouchableOpacity> */}
        <TouchableOpacity
          className=" p-2 rounded-full  bg-white" onPress={() => setOpenModal(true)}
        >
          <UserIcon size={hp(3.5)} strokeWidth={4.5} color="#228B22"  />
        </TouchableOpacity>
        {renderModal()}
    </View>
  )
}

export default BottomNav