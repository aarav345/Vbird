import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { ChevronLeftIcon, PlayIcon } from "react-native-heroicons/solid";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useAuth } from "../AuthContext/AuthContext";
import { useBirdData } from "../BirdDataContext/BIrdDataContext";

const BirdDetailScreen = (props) => {
  let item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const naivgation = useNavigation();
  const { user, signIn, signOut } = useAuth();
  const [favouriteData, setFavouriteData] = useState([]);

  const fetchFav = async (user_name) => {
    try {
      const response = await fetch(
        `https://vbird.onrender.com/get_favourite_birds/${user_name}`
      );

      const data = await response.json();

      console.log(data);

      const dataArray = Array.isArray(data) ? data : Object.values(data);

      const dataArrayWithIndex = dataArray.map((item, index) => ({
        ...item,
        index,
      }));

      if (dataArrayWithIndex.length > 0) {
        setFavouriteData(dataArrayWithIndex);
        if (dataArrayWithIndex.some((favItem) => favItem.bird === item.name)) {
          setIsFavourite(true);
        }
      } else {
        setFavouriteData([]);
      }
    } catch (error) {
      console.error("Error fetching bird information:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFav(user.user.name);
    }
  }, []);

  useEffect(() => {
    if (isFavourite) {
      if (!user) {
        Alert.alert("To use this feature, First Sign In");
        setIsFavourite(false);
      } else {
        const bird_name = item.name;
        const user_name = user.user.name;

        // Create FormData object and append data
        const formData = new FormData();
        formData.append("bird_name", bird_name);
        formData.append("user_name", user_name);

        try {
          fetch(
            `https://vbird.onrender.com/favourite/${bird_name}/${user_name}`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
              },
              body: formData,
            }
          )
            .then((response) => {
              if (response.ok) {
                return response.text();
              } else {
                throw new Error(
                  `Request failed with status: ${response.status}`
                );
              }
            })
            .then((responseBody) => {
              console.log(responseBody);
            })
            .catch((error) => {
              console.error("Error during the request:", error);
            });
        } catch (error) {
          console.error("Error during the request:", error);
        }
      }
    }
  }, [isFavourite, user, item]);

  const removeFav = async () => {
    if (isFavourite) {
      if (!user) {
        Alert.alert("To use this feature, First Sign In");
        setIsFavourite(false);
      } else {
        const bird_name = item.name;
        const user_name = user.user.name;

        try {
          const response = await fetch(
            `https://vbird.onrender.com/delete_favourite_birds/${user_name}/${bird_name}`,
            { method: "DELETE" }
          );

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setIsFavourite(false);
          } else {
            throw new Error(`Request failed with status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error during the request:", error);
        }
      }
    }
  };

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
      className="  bg-[#EBECF0] flex-1"
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />

      <View
        className=" flex-row justify-center"
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
        <Image
          source={{ uri: `data:image/png;base64,${item.imageUri}` }}
          style={{
            width: wp(70),
            height: hp(40),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 8,
          }}
          sharedTransitionTag="tag"
        />
      </View>

      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className=" w-full absolute flex-row justify-between items-center pt-14"
      >
        <TouchableOpacity
          onPress={() => naivgation.goBack()}
          className=" p-2 rounded-full ml-5 bg-white"
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
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#228B22" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsFavourite(!isFavourite); removeFav()
          }}
          className=" p-2 rounded-full mr-5 bg-white"
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
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      <View className=" border-2 border-white px-4 flex space-y-4 pt-8 h-[100vh] rounded-3xl bg-[#2F4C31]">
        <Animated.View
          entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
          className=" space-y-2 flex flex-row justify-between items-center"
        >
          <View>
            <Text
              style={{ fontSize: hp(4) }}
              className=" font-bold text-white tracking-wider"
            >
              {item.name}
            </Text>

            <Text
              style={{ fontSize: hp(2) }}
              className=" font-medium text-[#AEBCB1] tracking-widest"
            >
              {item.scientificName}
            </Text>
          </View>

          <View
            className=" border-1 bg-white p-1.5 rounded-full flex items-center justify-center"
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
            <PlayIcon size={hp(5)} strokeWidth={5} color="#2F4C31" />
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(300).duration(700).springify().damping(12)}
          className=" space-y-4"
        >
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

        <Animated.View
          entering={FadeInDown.delay(400).duration(700).springify().damping(12)}
          className=" space-y-4"
        >
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
          <Animated.View
            entering={FadeInDown.delay(500)
              .duration(700)
              .springify()
              .damping(12)}
            className=" space-y-4"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Bird Video
            </Text>

            <View>
              <YoutubeIframe
                videoId={getYoutubeVideo(item.video)}
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
