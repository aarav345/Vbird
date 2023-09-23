import React from "react";
import { View, Text, Image, Button } from "react-native";

export const GetStarted = () => {
  return (
    <>
      <View className="bg-[#186B23] h-full">
        <View className="relative">
          <View className="absolute ">
            <Image
              source={require("C:/Users/dell/Desktop/level 6/fyp/Vbird/frontEnd/assets/greenblock.svg")}
              style={{ width: 269, height: 300 }}
            />
          </View>
          <View>
            <Text className="font-bold text-4xl mt-6 ml-12 text-[#E5F4DC]">VBIRD</Text>
          </View>
          <View className="absolute right-9 top-10">
            <Image
              source={require("C:/Users/dell/Desktop/level 6/fyp/Vbird/frontEnd/assets/1.svg")}
              style={{ width: 269, height: 300 }}
            />
          </View>
          <View className="relative top-64 left-10">
            <Text className="text-3xl w-2/3 text-[#FFFFFF]  font-medium md-4">Explore Bird Calls</Text>
            <Text className={`text-sm w-4/6 text-[#82AF88] `}>
              Uncover Bird Identities Through Their Symphonies
            </Text>
          </View>
          <View className="bg-[#438926]">
            <Button>let's get Started</Button>
          </View>
        </View>
      </View>
    </>
  );
};
