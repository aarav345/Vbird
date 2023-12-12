import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import MasonryList from '@react-native-seoul/masonry-list';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

const Birds = () => {

  const [birdData, setBirdData] = useState([]);

  const fetchBirdInfo = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.71:8000/`
      );
      const data = await response.json();
      setBirdData(data);
    } catch (error) {
      console.error("Error fetching bird information:", error);
    }
  };

  useEffect(() => {
    fetchBirdInfo();
  }, []);

  return (
    <View className="mx-4 space-y-3">
      <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">
        Birds Categories:
      </Text>
      <View>
        <MasonryList
          data={birdData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => <CardItem item={item} index={index} />}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
};

const CardItem = ({ item, index }) => {
  let isEven = index % 2 === 0;

  return (
    <View>
      <Pressable
        style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
        className="flex justify-center mb-4 space-y-1"
      >
        <Image
          source={{ uri: item.imageUri }}
          style={{ width: '100%', height: hp(35), borderRadius: 35 }}
          className="bg-black/5"
        />

        <Text style={{ fontSize: hp(1.5) }} className="font-semibold ml-2 text-neutral-600">
          {item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
        </Text>
      </Pressable>
    </View>
  );
};

export default Birds;
