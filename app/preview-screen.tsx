import {
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ResizeMode,Video } from "expo-av";
import { useState } from "react";
import { Colors } from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import InputField from "@/components/ui/InputField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddPost } from "@/types/post";
import { schemaAddPost } from "@/validation/post";
import { usePostAdd } from "@/action/posts";
import { handleApiRequest } from "@/utils/apiHandler";
import { useAuthStore } from "@/store/useAuthStore";

export default function PreviewScreen() {
  let [loading, setLoading] = useState(false);
  const { video } = useLocalSearchParams<{
    image: string;
    video: string;
  }>();
  const { mutateAsync } = usePostAdd();
  const { token } = useAuthStore((state) => state);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPost>({
    resolver: yupResolver(schemaAddPost),
  });

  
  const sendPostList = async (data: AddPost) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("caption", data.caption);
    if (video) {
      const uriParts = video.split("/");
      const fileName = uriParts[uriParts.length - 1];
      const fileType = `video/${fileName.split(".").pop()}`;

      formData.append("video", {
        uri: video,
        name: fileName,
        type: fileType,
      } as any); // 'any' is required in React Native
    }

    if (token) {
      const result = await handleApiRequest(() =>
        mutateAsync({ data: formData, token: token }),
      ).finally(() => setLoading(false));

      if (!result) return;
      router.push('/')
    }
  };
 
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        padding: 20,
        marginTop: 30,
      }}
      behavior="padding"
    >
      <ScrollView style={{ flex: 1 }}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",

            justifyContent: "flex-start",
            padding: 10,
            borderRadius: 10
          }}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }}
        >
          <AntDesign name="arrow-left" size={24} color="white" />

          <Text>Back</Text>
        </Pressable>
        {video && (
          <Video
            source={{ uri: video }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 8,
              marginVertical: 20,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            shouldPlay={false}
          />
        )}

        <Controller
          control={control}
          name="caption"
          render={({ field: { value, onChange } }) => (
            <InputField
              label="Caption"
              placeholder="Enter your caption"
              value={value}
              onChangeText={onChange}
              error={errors.caption?.message}
            />
          )}
        />

        <TouchableOpacity
          style={{ backgroundColor: "red", padding: 20, borderRadius: 5 }}
          onPress={handleSubmit(sendPostList)}
          disabled={loading}
        >
          <Text style={{ color: Colors.dark.text }}>
            {loading ? <ActivityIndicator /> : "Publish"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
