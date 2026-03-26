import { StyleSheet, Text, View } from "react-native";
import { SCREEN_HEIGHT } from "../video-item";

export function NotFound({message}: {message?: string}) {
  // Handle loading state

  return (
    <View style={styles.container}>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{message || "Post not found"}</Text>
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

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "white",
    fontSize: 18,
  },

});