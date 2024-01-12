import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import MasonryList from "@react-native-seoul/masonry-list";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import { useNavigation } from "@react-navigation/native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { filter } from "lodash";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const BIrds = () => {
  const [birdData, setBirdData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  

  const navigation = useNavigation();

  useEffect(() => {
    const fetchBirdInfo = async () => {
      try {
        const response = await fetch(`https://vbird.onrender.com/bird_info`);
        const data = await response.json();

    
        const dataArray = Array.isArray(data) ? data : Object.values(data);

       
        const dataArrayWithIndex = dataArray.map((item, index) => ({
          ...item,
          index,
        }));

        setBirdData(dataArrayWithIndex);
        setFilteredData(dataArrayWithIndex); 
      } catch (error) {
        console.error("Error fetching bird information:", error);
      }
    };

    fetchBirdInfo();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = filter(birdData, (bird) =>
      bird.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  return (
    <View className="space-y-3">
      <View className=" mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
        <TextInput
          placeholder="Search Any Birds"
          placeholderTextColor={"gray"}
          style={{ fontSize: hp(1.7) }}
          className=" flex-1 text-base mb-1 pl-3 tracking-wider"
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />

        <View className=" bg-white rounded-full p-3">
          <MagnifyingGlassIcon size={hp(2.5)} color="gray" />
        </View>
      </View>
      <View className="mx-4 space-y-3">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-600"
        >
          Birds Categories:
        </Text>
        <View>
          {filteredData.length === 0 ? (
            <Loading size="large" className="mt-20" />
          ) : (
            <MasonryList
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CardItem
                  item={item}
                  index={item.index}
                  navigation={navigation}
                />
              )}
              onEndReachedThreshold={0.1}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const CardItem = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(700)
        .springify()
        .damping(12)}
    >
      <Pressable
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
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
          sharedTransitionTag="tag"
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

export default BIrds;
