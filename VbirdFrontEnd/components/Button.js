import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

const Button = () => {
  return (
    <View>
        <TouchableOpacity className=" border-2 flex w-[80%] justify-center items-center border-green-700 py-4 rounded-full">
            <Text className=" text-xl font-semibold text-green-800 tracking-widest">SIGN IN WITH GOOGLE</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Button