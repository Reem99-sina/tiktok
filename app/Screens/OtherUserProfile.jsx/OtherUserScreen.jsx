import { useUser } from '@clerk/clerk-expo';
import { useCallback, useState } from 'react';
import { View, Text, Image } from 'react-native'
import { supabase } from "@/constants/SupabaseConfig";
import { Colors } from '@/constants/Colors';
import Icon from "react-native-vector-icons/FontAwesome";

export default function OtherUserScreen({user,posts}) {

  
  return (
    <View style={{ marginTop:20, paddingHorizontal: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>Profile</Text>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: user.profileImage }}
          style={{ width: 60, height: 60, borderRadius: 99 }}
        />
        <Text style={{ fontFamily: "outfit-bold", fontSize: 17 }}>
          {user?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
            marginVertical: 10,
            color: Colors?.light?.backgroundGray,
          }}
        >
          {user?.email}
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ padding: 20, alignItems: "center" }}>
          <Icon name="video-camera" size={20} />
          <Text style={{ fontFamily: "outfit-bold" }}>{posts?.length} POSTS</Text>
        </View>
        {/* <View style={{ padding: 20, alignItems: "center" }}>
          <Icon name="heart" size={20} />

          <Text style={{ fontFamily: "outfit-bold" }}>{likesLength} likes</Text>
        </View> */}
      </View>
    </View>
  )
}