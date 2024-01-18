import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, View, Image, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon } from "react-native-heroicons/outline";
import Birds from "../components/BIrds";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../AuthContext/AuthContext";

const HomeScreen = () => {
  const { user, signIn, signOut } = useAuth();

  return (
    <View className="flex-1 justify-center items-center bg-[#2F4C31]">
      <StatusBar style="dark" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className=" space-y-6 pt-14 w-full"
      >
        {console.log(user)}
        
        <View className=" mx-4 flex-row justify-between items-center mb-2">
          {user ? (
            <Image
            source={{ uri: user.user.photo }}
              style={{
                width: hp(5.5),
                height: hp(5),
                borderRadius: hp(5.5) / 2,
              }}
            />
          ) : (
            <Image
              source={require("../assets/images/avatar.png")}
              style={{
                width: hp(5.5),
                height: hp(5),
              }}
            />
          )}

          {/* <BellIcon size={hp(4)} color="gray" /> */}
        </View>

        <View className=" mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className=" text-[#AEBCB1]">
            Hello, {user ? "Mr/Mrs." + user.user.name : "BirdWatchers"}!
          </Text>

          <Text
            style={{ fontSize: hp(4) }}
            className=" font-semibold text-white"
          >
            Find Birds in Wild,
          </Text>

          <Text
            style={{ fontSize: hp(3.8) }}
            className=" font-semibold text-white"
          >
            Explore The Wild
          </Text>
        </View>

        <View>
          <Birds />
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default HomeScreen;
