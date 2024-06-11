import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFont } from "@/hooks/useFont";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import { supabase } from "@/constants/SupabaseConfig";
import { useUser } from "@clerk/clerk-expo";
export default function AddScreen({ navigation }) {
  let font = useFont();
  const [image, setImage] = useState(null);
  const [Video, setVideo] = useState(null);

  const generateThumbnail = async (uri) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(Video, {
        time: 10000,
      });
      setImage(uri);
     
      navigation.navigate("preview-screen", {
        video: Video,
        image: uri,
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
      setVideo(result.assets[0].uri);
      generateThumbnail(result.assets[0].uri);
    }
  };
 
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={pickImage}
      >
        <Icon name="folder" size={100} />
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
          Start Upload video
        </Text>
        <Text style={{ textAlign: "center", margin: 10 }}>
          Lets Upload short video and start sharing your creativity with commity
        </Text>
      </TouchableOpacity>
    </View>
  );
}
