import { Text, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/themed-view";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useState } from "react";
import { router } from "expo-router";

export default function TabTwoScreen() {
  const [Video, setVideo] = useState<string | null>(null);

  const generateThumbnail = async (uri: string) => {
    try {
      await VideoThumbnails.getThumbnailAsync(uri, {
        time: 10000,
      }).then((result) => {
        router.push({
          pathname: "/preview-screen",
          params: {
            video: uri || Video,
            image: result.uri,
          },
        });
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const videoAsset = result.assets[0];
      const durationSeconds = videoAsset?.duration! / 1000;

      if (durationSeconds && durationSeconds > 180) {
        // 3 minutes = 180 seconds
        alert("Video is too long. Maximum allowed length is 3 minutes.");
        return;
      }
      setVideo(result.assets[0].uri);
      generateThumbnail(result.assets[0].uri);
    }
  };
  return (
    <ThemedView
      style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
    >
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={pickImage}
      >
        <AntDesign name="folder-add" size={100} color="black" />

        <Text style={{ fontSize: 20 }}>Start Upload video</Text>
        <Text style={{ textAlign: "center", margin: 10 }}>
          Lets Upload short video and start sharing your creativity with commity
        </Text>
      </TouchableOpacity>
    </ThemedView>
  );
}
