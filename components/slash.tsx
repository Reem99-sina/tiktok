import { View,  StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function Splash({ onFinish }: { onFinish?: any }) {
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => onFinish());
  }, [onFinish, scale]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/icon.png")}
        style={[styles.logo, { transform: [{ scale }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
});
