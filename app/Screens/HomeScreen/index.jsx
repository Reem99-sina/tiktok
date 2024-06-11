import { supabase } from "@/constants/SupabaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { useCallback, useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, FlatList } from "react-native";
import React from "react";
import { useFont } from "@/hooks/useFont";
import VideoThumbnail from "./VideoThumbnail";
export default function Home() {
  let { user } = useUser();
  let font = useFont();
  let [list, setList] = useState([]);
  let [loading, setLoading] = useState(false);
  let [Count, setCount] = useState(9);

  const updateProfileUser = useCallback(async () => {
    const { data, error } = await supabase
      .from("Users")
      .update({ profileImage: user?.imageUrl })
      .eq("email", user?.primaryEmailAddress?.emailAddress)
      .is("profileImage", null)
      .select();
  }, [user]);
  useEffect(() => {
    updateProfileUser();
    GetLatestVideo();
  }, []);
   const GetLatestVideo = useCallback(async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("PostList")
      .select("*,Users(name,email,profileImage),PostFavority(postRef,emailRef)")
      .range(0, Count)
      .order("id", { ascending: false });
    if (data) {
      setLoading(false);
    }
  
    setList(data);
  }, [user]);
  useEffect(()=>{
    GetLatestVideo()
  },[Count])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>tiktok</Text>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
      </View>
      <View>
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <VideoThumbnail item={item} key={item?.id} />
          )}
          numColumns={2}
          onRefresh={GetLatestVideo}
          refreshing={loading}
          onEndReached={()=>setCount((prev)=>prev+9)}
        />
      </View>
    </SafeAreaView>
  );
}
