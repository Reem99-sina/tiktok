import { View, Text, FlatList, VirtualizedList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { supabase } from "@/constants/SupabaseConfig";
import { useUser } from "@clerk/clerk-expo";
import UserPostList from "./UserPostList"
export default function ProfileScreen() {
  const { user } = useUser();
  const [postList,setPostList]=useState([])
  const [Loading,setLoading]=useState(false)

  const GetPostUser = useCallback(async () => {
    setLoading(true)
    let { data, error } = await supabase
      .from("PostList")
      .select(`*,PostFavority(emailRef,postRef)`)
      .eq("emailRef", user?.primaryEmailAddress?.emailAddress);
      setPostList(data)
      if(data||error){
        setLoading(false)
      }
  }, []);
  useEffect(()=>{
    GetPostUser()
  },[])
  return (
    <View>
      <FlatList data={[{id:1}]} renderItem={()=>(
        <View>
          <ProfileInfo  postList={postList}/>
          <UserPostList  postList={postList}GetPostUser={GetPostUser}loading={Loading}/>
        </View>
      )}/>
    </View>
  );
}
