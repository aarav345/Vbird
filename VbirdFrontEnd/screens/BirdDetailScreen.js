import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown , FadeIn} from "react-native-reanimated";

const BirdDetailScreen = (props) => {
  let item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const naivgation = useNavigation();

  const getYoutubeVideo = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    }

    return null;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className=" bg-white flex-1"
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />

      <View className=" flex-row justify-center">
        <Image
          source={{ uri: item.imageUri }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 8,
          }}
          sharedTransitionTag="tag"
        />
      </View>

      <Animated.View entering={FadeIn.delay(200).duration(1000)} className=" w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          onPress={() => naivgation.goBack()}
          className=" p-2 rounded-full ml-5 bg-white"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#228B22" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFavourite(!isFavourite)}
          className=" p-2 rounded-full mr-5 bg-white"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      <View className=" px-4 flex justify-between space-y-4 pt-8">
        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className=" space-y-2">
          <Text
            style={{ fontSize: hp(4) }}
            className=" font-bold text-neutral-700"
          >
            {item.name}
          </Text>

          <Text
            style={{ fontSize: hp(2) }}
            className=" font-medium text-neutral-500"
          >
            Scinetific Name: {item.scientificName}
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className=" space-y-4">
          <Text
            style={{ fontSize: hp(3) }}
            className="font-bold flex-1 text-neutral-700"
          >
            Description
          </Text>

          <Text style={{ fontSize: hp(2) }} className="text-neutral-700">
            {item.description}
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className=" space-y-4">
          <Text
            style={{ fontSize: hp(3) }}
            className="font-bold flex-1 text-neutral-700"
          >
            Location
          </Text>

          <Text style={{ fontSize: hp(2) }} className="text-neutral-700">
            {item.location}
          </Text>
        </Animated.View>

        {item.video && (
          <Animated.View entering={FadeInDown.delay(500).duration(700).springify().damping(12)}className=" space-y-4">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Bird Video
            </Text>

            <View>
              <YoutubeIframe
                videoId={getYoutubeVideo("https://www.youtube.com/watch?v=hb3SGuhSKj4")}
                height={hp(30)}
              />
            </View>
          </Animated.View>
        )}

        
      </View>
    </ScrollView>
  );
};

export default BirdDetailScreen;
