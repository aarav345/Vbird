import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity , Image, ScrollView} from "react-native";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../AuthContext/AuthContext";
import { useBirdData } from "../BirdDataContext/BIrdDataContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const FavouriteScreen = () => {
  const { birdData, setBirdData } = useBirdData();
  const { user, signin, signout } = useAuth();
  const [favouriteData, setFavouriteData] = useState([]);
  const navigation = useNavigation();

  

  useEffect(() => {
    if (user !== null) {
      const fetchFav = async () => {
        try {
          const response = await fetch(
            `https://vbird.onrender.com/get_favourite_birds/${user.user.name}`
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
          } else {
            setFavouriteData([]);
          }
        } catch (error) {
          console.error("Error fetching bird information:", error);
        }
      };
  
      fetchFav();
    }

    
  }, [user]);

  if(!user) {
    return(
      <View className=" flex-1 justify-center items-center bg-[#2F4C31] ">
        <Text className="text-2xl text-white">Please Sign In to use This feature</Text>
        <BottomNav/>
      </View>
    )
  }


  const getBirdInfo = (birdName) => {
    const foundBird = birdData.find((bird) => bird.name === birdName);
    return foundBird || {};
  };

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    const truncatedWords = words.slice(0, maxWords);
    return truncatedWords.join(" ") + (words.length > maxWords ? "..." : "");
  };

  

  return (
    <View className="flex-1 bg-[#2F4C31] justify-center items-center space-y-4">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, display: "flex", justifyContent: "center", alignItems:"center" }}
        className=" space-y-6 pt-14 w-full"
      >
      <Text className=" text-3xl font-bold text-white tracking-widest">Favourites</Text>

      <View className= " flex gap-4">
      {favouriteData.length > 0 ? (
      // Mapping over favouriteData and rendering each item's properties
      favouriteData.map((item) => {
        const birdInfo = getBirdInfo(item.bird);
        return (
          <TouchableOpacity
            key={item.index}
            className="border border-white bg-[#071b0d13] rounded-lg max-w-[80%] p-2 pr-20"
            onPress={() => navigation.navigate("RecipeDetail", { ...birdInfo })}
          >
            <View className="flex flex-row items-center">
              <View className="w-[30%]">
                <Image
                  source={{ uri: `data:image/png;base64,${birdInfo.imageUri}` }}
                  style={{
                    width: "50%",
                    height: hp(10),
                    borderRadius: 35,
                  }}
                  className=""
                />
              </View>
              <View className="flex">
                <Text className="font-bold text-xl text-white">
                  {`Name: ${birdInfo.name}`}
                </Text>
                <Text className="text-gray-400 text-lg">
                  {`${birdInfo.scientificName}`}
                </Text>
                <Text className="text-white text-sm">
                  {`${truncateText(birdInfo.description, 10)}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })
    ) : (
      
      <Text className=" text-2xl text-white">No Favorites</Text>
    )}
    </View>

      
      </ScrollView>
      <BottomNav />
    </View>
  );
};

export default FavouriteScreen;
