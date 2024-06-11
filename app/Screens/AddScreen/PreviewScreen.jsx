import { View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import { useFont } from '@/hooks/useFont';
import { Colors } from '@/constants/Colors';
import Icon from "react-native-vector-icons/FontAwesome"
import { useCallback, useState } from 'react';
import { s3Config } from '@/hooks/s3Config';
import { useUser } from '@clerk/clerk-expo';
export default function PreviewScreen({route,navigation}) {
    let font=useFont()
    let [videoUrl,setVideoUrl]=useState("")
    let [loading,setLoading]=useState(false)
    let { user } = useUser();
    const PublichHandler=useCallback(async()=>{
      setLoading(true)
      await  UploadUriToAws(route.params.video,"video")
      await  UploadUriToAws(route.params.image,"image")
      sendPostList()
    },[route.params.video,route.params.image])
    const UploadUriToAws=async(file,type)=>{
        const fileType=file.split(".").pop()
        const params={
            Bucket:"tiktok-clone-test",
            Key:`tubeguruji-${Date.now()}.${fileType}`,
            Body:await fetch(file).then((res)=>res.blob()),
            ACL:"public-read",
            ContentType:type=="video"?`video/${fileType}`:`image:${fileType}`
        }
        try {
          await s3Config.upload(params).promise().then((result)=>{
                if(type=="video"){
                    setVideoUrl(result?.Location)
                }
               }
              )
        } catch (error) {
            console.log(error,"error")
        }finally{
          setLoading(false)
        } 
    }
    const sendPostList = async () => {
      const { data, error } = await supabase
        .from("PostList")
        .insert([{ videoUrl:Video, thumbnail: image,emailRef:user?.primaryEmailAddress?.emailAddress }])
        .select();
        navigation.navigate("Home")
    };
  return (
    <KeyboardAvoidingView style={{flex:1,alignItems:"center",justifyContent:"center",marginTop:30}} behavior="padding">
    <ScrollView style={{flex:1}}>

        <Pressable style={{flexDirection:"row",alignItems:"center",
            backgroundColor:Colors.dark.backgroundGray,
            justifyContent:"flex-start",padding:10
            ,borderRadius:8}}onPress={()=>navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="black"/>
            <Text>Back</Text>
        </Pressable>
      <Text style={{fontFamily:"outfit-bold",fontSize:20}}>Add Detail</Text>
      <Image source={{uri:route?.params?.image}}style={{width:200,height:300,borderRadius:8,marginVertical:20}}/>
    
      <TouchableOpacity style={{backgroundColor:"black",padding:20,borderRadius:5}} onPress={PublichHandler}>
        <Text style={{color:Colors.dark.text}}>
          {loading?<ActivityIndicator/>:  "Publish"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}