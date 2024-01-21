import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TouchableOpacity, Modal, Text, ImageBackground } from "react-native";
import {
  HeartIcon,
  MicrophoneIcon,
  UserIcon,
  HomeIcon,
} from "react-native-heroicons/solid";
import SignIn from "./SignIn";
import { useBottomNav } from "../BottomNavContext/BottomNavContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BottomNav = () => {
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState(false);
  const { activeNav, setBottomNavActive } = useBottomNav();

  const transparent = "rgba(0, 0, 0, 0.5)";

  function renderModal() {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        
        <View
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: transparent }}
        >
         
          <View className="p-4 w-[90%] h-[30%] bg-white rounded-lg ">
          
            <TouchableOpacity onPress={() => setOpenModal(false)}>
              <Text className="text-base font-medium text-gray-600">Close</Text>
            </TouchableOpacity>
            <SignIn />
            
          </View>
          
          
        </View>
        
      </Modal>
    );
  }

  return (
    <View
      className="absolute w-fit bottom-2 rounded-2xl bg-white p-2 flex flex-row py-2 items-center justify-center space-x-8"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      }}
    >
      <TouchableOpacity
        className={`p-2 rounded-2xl ${
          activeNav === "Home" ? "bg-green-900" : ""
        }`}
        onPress={() => {
          setBottomNavActive("Home");
          navigation.navigate("Home");
        }}
      >
        <HomeIcon size={hp(4.5)} strokeWidth={5} color="#E5E4E2" />
      </TouchableOpacity>

      <TouchableOpacity
        className={`p-2 rounded-2xl ${
          activeNav === "favourite" ? "bg-green-900" : ""
        }`}
        onPress={() => {
          setBottomNavActive("favourite");
          navigation.navigate("FavouriteScreen");
        }}
      >
        <HeartIcon size={hp(4.5)} strokeWidth={5} color="#E5E4E2" />
      </TouchableOpacity>

      <TouchableOpacity
        className={`p-2 rounded-2xl ${
          activeNav === "audio" ? "bg-green-900" : ""
        }`}
        onPress={() => {
          setBottomNavActive("audio");
          navigation.navigate("AudioScreen");
        }}
      >
        <MicrophoneIcon size={hp(4.5)} strokeWidth={5} color="#E5E4E2" />
      </TouchableOpacity>

      <TouchableOpacity
        className={`p-2 rounded-2xl ${
          activeNav === "sign" ? "bg-green-900" : ""
        }`}
        onPress={() => {
          setBottomNavActive("sign");
          setOpenModal(true);
        }}
      >
        <UserIcon size={hp(4.5)} strokeWidth={5} color="#E5E4E2" />
      </TouchableOpacity>
      {renderModal()}
    </View>
  );
};

export default BottomNav;
