import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PlayListItem from "./PlayListItem";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/constants/SupabaseConfig";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useUser } from "@clerk/clerk-expo";
export default function PlayList({ route, navigation }) {
  const [videos, setVideos] = useState([]);
  let [loading, setLoading] = useState(false);
  let [Current, setCurrent] = useState();
  let { user } = useUser();
  const BottomTab = useBottomTabBarHeight();
  useEffect(() => {
    setVideos([route?.params?.selectedVideo]);
    GetLatestVideo();
  }, []);
  const GetLatestVideo = useCallback(async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("PostList")
      .select("*,Users(name,email,profileImage),PostFavority(postRef,emailRef)")
      .range(0, 8)
      .order("id", { ascending: false });
    if (data) {
      setLoading(false);
    }
    setVideos((prev) => [...prev, ...data?.filter((ele)=>ele?.id!=route?.params?.selectedVideo?.id)]);
  }, [route?.params?.selectedVideo]);

  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          padding: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: Colors.light.backgroundGray,
            padding: 10,
            borderRadius: 99,
          }}
        >
          <Icon name="arrow-left" size={20} color={Colors.dark.text} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={videos}
        pagingEnabled
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.y /
              (Dimensions.get("window").height - BottomTab)
          );
          setCurrent(index);
        }}
        renderItem={({ item, index }) => (
          <PlayListItem
            item={item}
            activeIndex={Current}
            index={index}
           
          />
        )}
      />
    </View>
  );
}
