import { useAuthStore } from "@/store/useAuthStore";
import { useFonts } from "expo-font";
import { Redirect, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
export const unstable_settings = {
  anchor: "",
};

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [loaded] = useFonts({
    OutfitBold: require("../assets/fonts/Outfit-Bold.ttf"),
  });
  const { token, loadUserFromToken } = useAuthStore((state) => state);

  const segments = useSegments();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    if (token) {
      loadUserFromToken().then(() => {
        setAppReady(true);
      });
    } else {
      setAppReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, token]);

  if (!appReady || !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const inAuthGroup = segments[0] === "(auth)";

  // 🔥 Redirect logic
  if (!token && !inAuthGroup) {
    return <Redirect href="/login" />;
  }

  if (token && inAuthGroup) {
    return <Redirect href="/" />;
  }
  return (
    //  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
    // </AuthProvider>
  );
}
