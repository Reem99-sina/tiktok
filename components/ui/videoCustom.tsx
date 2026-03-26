import { ResizeMode, Video } from "expo-av";
import { StyleSheet } from "react-native";

type Props = {
  uri: string;
  autoPlay?: boolean;
  loop?: boolean;
  style?: any;
};

export default function VideoCustom({
  uri,
  autoPlay = true,
  loop = true,
  style,
}: Props) {
  return (
    <Video
      source={{ uri: uri }}
      style={[styles.video, style]}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      isLooping={false}
      shouldPlay={false}
    />
  );
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  container: { flex: 1, justifyContent: "center" },
});
