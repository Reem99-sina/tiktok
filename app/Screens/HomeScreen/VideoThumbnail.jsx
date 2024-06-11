import { Colors } from "@/constants/Colors";
import { useRef } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
export default function VideoThumbnail({ item }) {
  const videoRef = useRef(null);
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={{ flex: 1, margin: 20 }}
      onPress={() =>
        navigation.navigate("play-video", {
          selectedVideo: item,
        })
      }
    >
      <>
        <View style={{ position: "absolute", zIndex: 10, bottom: 0, left: 0 }}>
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={{ uri: item?.Users?.profileImage }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: Colors.light.backgroundGray,
                  borderRadius: 99,
                }}
              />
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  color: Colors.dark.text,
                  fontSize: 10,
                }}
              >
                {item?.Users?.email}
              </Text>
            </View>

            <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
             
              <Icon name="heart-o" size={20} color={Colors.dark.text} />
              {/* <Feather name="delete" color={Colors.dark.text} size={25} /> */}
            </View>
            <View
              style={{ position: "absolute", zIndex: 10 }}
            >
              
            </View>
          </View>
        </View>
        <Image
          source={{ uri: item?.thumbnail }}
          style={{ width: "100%", height: 300, borderRadius: 9 }}
        />
      </>
    </TouchableHighlight>
  );
}
