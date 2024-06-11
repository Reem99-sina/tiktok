import { useTheme } from "@react-navigation/native";
import { Video } from "expo-av";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";
import { supabase } from "@/constants/SupabaseConfig";
import React from 'react';
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  const theme = useTheme();
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        if (signUp?.emailAddress) {
          const { data, error } = await supabase
            .from("Users")
            .insert([{ name: signUp?.firstName, email: signUp?.emailAddress }])
            .select();
            
        }
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Video
        source={{
          uri: "https://media.istockphoto.com/id/1467578274/video/curved-road-winds-through-the-dense-green-forest-sustainability-and-e-mobility-combined-in.mp4?s=mp4-640x640-is&k=20&c=l7uid5eoG5BkBDvtuU-nmVTp--VK2hdFgnDQ86WmTDU=",
        }}
        shouldPlay
        resizeMode="cover"
        isLooping={true}
        style={styles.video}
      />
      <View
        style={[styles.mainview, { backgroundColor: theme.backgroundGray }]}
      >
        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              color: theme.text,
              fontSize: 30,
              marginVertical: 20,
            }}
          >
            Tiktok
          </Text>
          <Text style={{ color: theme.text, fontSize: 17 }}>
            Welcome to TUBEGURUJI, the ultimate destination for coding and
            programming tutorials!
          </Text>
        </View>
        <View style={{}}>
          <TouchableOpacity onPress={onPress} style={styles.subScription}>
            <Icon name={"google"} size={20} color="green" />
            <Text style={{ color: "gray", marginHorizontal: 10 }}>
              Continue with google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mainview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",

    flex: 1,
  },
  subScription: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 10,
  },
});
