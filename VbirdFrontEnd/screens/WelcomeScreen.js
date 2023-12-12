import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Text, View, Image } from 'react-native'
import { NativeWindStyleSheet } from "nativewind";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';



NativeWindStyleSheet.setOutput({
    default: "native",
});




const WelcomeScreen = () => {

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(() => ring1padding.value = withSpring(ring1padding.value +  hp(2)), 100);
        setTimeout(() => ring2padding.value = withSpring(ring1padding.value +  hp(4.5)), 100);

        setTimeout(()=> navigation.navigate('Home'), 2500);
    })

    return (
        <View className=" flex-1 justify-center items-center space-y-10 bg-green-500">
            <StatusBar style='light' />

            <Animated.View className=" bg-white/20 rounded-full" style={{ padding: ring2padding}}>
                <Animated.View className=" bg-white/20 rounded-full" style={{ padding: ring1padding }}>
                    <Image source={require('../assets/images/WelcomeLogo.png')}
                        style={{ width: hp(30), height: hp(30) }} />
                </Animated.View>
            </Animated.View>

            <View className=" flex items-center space-y-2">
                <Text style={{ fontSize: hp(7) }} className=" font-bold text-white tracking-widest text-6xl">
                    VBird
                </Text>
                <Text style={{ fontSize: hp(2) }} className=" font-medium text-white tracking-widest text-lg">
                    Be a wildLife Bird Expert.
                </Text>
            </View>

        </View>

    )
}

export default WelcomeScreen