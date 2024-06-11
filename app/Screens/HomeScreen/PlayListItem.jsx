import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ResizeMode, Video } from 'expo-av'
import { useMemo, useRef, useState } from 'react';

import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { supabase } from '@/constants/SupabaseConfig';
import { useUser } from '@clerk/clerk-expo';


export default function PlayListItem({item,activeIndex,index}) {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [FaviourList, setFaviourList] = useState([]);

    const {user}=useUser()
    const BottomHeight=useBottomTabBarHeight()
    const navigation =useNavigation()
    const useLikeVideo = async (item, isLike) => {
      if (isLike) {
        const { data, error } = await supabase
          .from("PostFavority")
          .insert([
            {
              postRef: item.id,
              emailRef: user?.primaryEmailAddress?.emailAddress,
            },
          ])
          .select();
          setFaviourList(data)
      } else {
   
        const { error } = await supabase
          .from("PostFavority")
          .delete()
          .eq("postRef", item.id)
          .select()
       
          setFaviourList(FaviourList.filter((prev)=>prev.postRef!=item.id))
      }
    };
    const ChecKvideo=useMemo(()=>{
      
       return item?.PostFavority?.map(ele=>ele.postRef).includes(item?.id)||FaviourList.map((post)=>post.postRef).includes(item?.id)
    },[item?.id,FaviourList])
    const OtherUser=(user)=>{
     
      navigation.navigate("other-user",{user:user})
    }
  return (
    <View style={{flex:1}}>
        <View style={{position:"absolute",zIndex:10,bottom:20,padding:20,flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
            <TouchableOpacity onPress={()=>OtherUser(item?.Users)}>
            <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
                <Image source={{uri:item?.Users?.profileImage}} style={{width:40,height:40,borderRadius:99}}/>
                <Text style={{color:Colors?.dark?.backgroundGray}}>{item?.Users?.email}</Text>
            </View>
            </TouchableOpacity>
            <View style={{alignItems:"center"}}>
              {ChecKvideo? <TouchableOpacity onPress={()=>useLikeVideo(item,false)}>
             
              <Icon name={"heart"} size={40} color={Colors.dark.text} />
              </TouchableOpacity>: <TouchableOpacity onPress={()=>useLikeVideo(item,true)}>
              
              <Icon name={"heart-o"} size={40} color={Colors.dark.text} />
              </TouchableOpacity>}
               
              <Text style={{color:Colors.dark.text}}>{FaviourList?.length||item?.PostFavority?.length}</Text>
              
            </View>
        </View>
       <Video
        ref={video}
        style={[styles.video,{height:Dimensions.get("window").height-BottomHeight}]}
        source={{
          uri: item.videoUrl,
        }}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={index==activeIndex}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  )
}
const styles=StyleSheet.create({
    video:{
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height
    }
})