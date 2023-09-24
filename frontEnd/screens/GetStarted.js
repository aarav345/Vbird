import React from "react";
import { View, Text, Image, Button} from "react-native"


export const GetStarted = () => {
  return (
    <>
      <View className="bg-[#186B23] h-full">
        <View className="grid grid-flow-row items-start">
          <View className="absolute bg-[#438926] w-[100%] h-[50vh]">
          </View>
          <View>
            <Text className="font-bold text-4xl mt-6 ml-12 text-[#E5F4DC]">VBIRD</Text>
          </View>
          <View className="relative -left-8 items-left m-0 p-0">
            <Image
              source={require("C:/Users/dell/Desktop/level 6/fyp/Vbird/frontEnd/assets/1.svg")}
              style={{ width: 300, height: 400 }}
              className="h-[50vh]"
            />
          </View>
          <View className="flex items-center">
            <Text className="text-3xl w-2/3 text-[#FFFFFF]  font-medium md-4">Explore Bird Calls</Text>
            <Text className={`text-sm w-4/6 text-[#82AF88] `}>
              Uncover Bird Identities Through Their Symphonies
            </Text>
          </View>
          <View className="w-2/3 items-center">
            <Button title="Let's get Started" color="#438926"/>
          </View>
        </View>
      </View>
    </>
  );
};
