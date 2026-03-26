import { StyleSheet, View } from "react-native";
import { ResizeMode, Video } from "expo-av";

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
    <View style={styles.container}>
      <Video
        source={{ uri: uri}}
        style={{...styles.video,...style}}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={autoPlay}
        isLooping={loop}
        useNativeControls={false}
        pointerEvents="none"
        onError={(e) => console.log("Video error", e)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  container: { flex: 1, justifyContent: "center" },
});
