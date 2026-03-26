import { StyleSheet, Text, View } from "react-native";
import { SCREEN_HEIGHT } from "../video-item";

export function Loading() {
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT - 60,
    backgroundColor: "black",
    justifyContent: "flex-start",
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
  },
});
