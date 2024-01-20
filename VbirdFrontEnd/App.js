import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import BirdDetailScreen from "./screens/BirdDetailScreen";
import AudioScreen from "./screens/AudioScreen";
import { AuthProvider } from "./AuthContext/AuthContext";
import { BottomNavProvider } from "./BottomNavContext/BottomNavContext";
import FavouriteScreen from "./screens/FavouriteScreen";
import { BirdDataProvider } from "./BirdDataContext/BIrdDataContext";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <BirdDataProvider>
      <BottomNavProvider>
        <NavigationContainer persistNavigationState={true}>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RecipeDetail" component={BirdDetailScreen} />
            <Stack.Screen name="AudioScreen" component={AudioScreen} />
            <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomNavProvider>
      </BirdDataProvider>
    </AuthProvider>
  );
}
