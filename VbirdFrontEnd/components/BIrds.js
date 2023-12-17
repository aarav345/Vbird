import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import MasonryList from "@react-native-seoul/masonry-list";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Birds = () => {
  const [birdData, setBirdData] = useState([]);

  useEffect(() => {
    const fetchBirdInfo = async () => {
      try {
        const response = await fetch(`https://vbird.onrender.com/bird_info`);
        const data = await response.json();

        // Check if data is an array, if not, extract it
        const dataArray = Array.isArray(data) ? data : Object.values(data);

        // Add an index property to each item in the array
        const dataArrayWithIndex = dataArray.map((item, index) => ({
          ...item,
          index,
        }));

        setBirdData(dataArrayWithIndex);
      } catch (error) {
        console.error("Error fetching bird information:", error);
      }
    };

    fetchBirdInfo();
  }, []);

  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Birds Categories:
      </Text>
      <View>
        {birdData.length == 0 ? (
          <Loading size="large" className="mt-20" />
        ) : (
          <MasonryList
            data={birdData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CardItem item={item} index={item.index} />
            )} // Pass index here
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

const CardItem = ({ item, index }) => {
  let isEven = index % 2 == 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(700)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        <Image
          source={{ uri: item.imageUri }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />

        <Text
          style={{ fontSize: hp(2) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default Birds;
