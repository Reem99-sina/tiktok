import { useAddLike } from "@/action/like";
import { usePostsByidQuery } from "@/action/posts";
import { apiUrl } from "@/action/user";
import { useAuthStore } from "@/store/useAuthStore";
import { Post } from "@/types/post";
import { handleApiRequest } from "@/utils/apiHandler";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AvatarPost } from "./post/avatar";
import { CommentPost } from "./post/comment";
import { NotFound } from "./post/notfound";
import { Loading } from "./post/loading";
import VideoScreen from "./ui/VideoCustom";


type VideoItemProps = {
  post: Post;
  isVisible: boolean;
};

export const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function VideoItem({ post, isVisible }: VideoItemProps) {
  const [likes, setLikes] = useState<number>(post.likes.length || 0);
  const [liked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { token } = useAuthStore((state) => state);
  const { mutateAsync } = useAddLike();
  const { data, isLoading, isError } = usePostsByidQuery({ id: post?._id });
  const postById = data?.data?.data;

  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle error or no post found
  if (isError || !postById) {
    return <NotFound />;
  }

  const handleLike = async () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    if (token) {
      const result = await handleApiRequest(() =>
        mutateAsync({ data: { postId: postById?._id }, token: token }),
      );
      if (!result) return;
    }
  };

  const handleCommentOpen = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Video */}
      {/* <Video
        source={{ uri: apiUrl + postById?.videoUrl }}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={isVisible}
        isLooping
        useNativeControls={false}
        pointerEvents="none"
        onError={(e) => console.log("Video error", e)}
      /> */}
      <VideoScreen
        uri={apiUrl + postById?.videoUrl}
        autoPlay={isVisible}
        style={styles.video}
        loop={true}
      />

      {/* Overlay Buttons */}
      <View style={styles.overlay}>
        <TouchableOpacity onPress={handleLike} style={styles.button}>
          <Entypo
            name="heart-outlined"
            size={40}
            color={liked ? "red" : "white"}
          />
          <Text style={styles.buttonText}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCommentOpen} style={styles.button}>
          <AntDesign name="comment" size={40} color="white" />
          <Text style={styles.buttonText}>{postById?.comments?.length}</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View style={{}}>
        <AvatarPost user={postById?.userId} caption={postById?.caption} />
      </View>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalWrapper}>
          {/* Background overlay */}
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>

          {/* Modal content */}
          <View style={styles.modalContent}>
            <CommentPost post={postById} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: SCREEN_HEIGHT,
    backgroundColor: "black",
    justifyContent: "flex-start",
  },
  video: {
    width: "100%",
    height: "100%", // fill the container exactly
  },
  overlay: {
    position: "absolute",
    right: 20,
    bottom: 100,
    alignItems: "center",
    zIndex: 2,
  },
  button: {
    // marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  userInfo: {
    position: "absolute",
    bottom: 120,
    left: 15,
    right: 80,
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  caption: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 0,
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "60%",
    zIndex: 1,
  },
});
