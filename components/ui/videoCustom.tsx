
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View } from "react-native";

type Props = {
  uri: string;
  autoPlay?: boolean;
  loop?: boolean;
  style?: any;
};
export default function VideoScreen({ uri ,autoPlay,style}:Props) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    if(autoPlay) {
      player.play();
    }
  });


  return (
    <View >
      <VideoView
        style={[styles.video,style]}
        player={player}
        nativeControls={false}
        // allowsFullscreen
        // allowsPictureInPicture
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    padding: 10,
  },
});
