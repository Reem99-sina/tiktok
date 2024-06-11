import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import "react-native-reanimated";
import LoginScreen from "@/app/Screens/LoginScreen/index";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import TabNavigation from "@/app/navigations/TabNavigation";
import Home from "./Screens/HomeScreen";
import { View } from "react-native";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigationRef = useRef();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/Outfit-Regular.ttf"),
    
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? Colors.dark : Colors.light}>
      <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY!}>
        <View style={{ flex: 1 }}>
          <SignedIn>
            <NavigationContainer independent={true}>
              <TabNavigation/>
            </NavigationContainer>
           
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </View>
      </ClerkProvider>
    </ThemeProvider>
  );
}
