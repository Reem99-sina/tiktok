import { Post } from "@/types/post";
import { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AvatarPost } from "./avatar";
import { handleApiRequest } from "@/utils/apiHandler";
import { useAddComment } from "@/action/comments";
import { useAuthStore } from "@/store/useAuthStore";

type commentProps = {
  post: Post;
};

export function CommentPost({ post }: commentProps) {
  const comments = useMemo(() => post.comments, [post.comments]);
  const [commentText, setCommentText] = useState("");
  const { token } = useAuthStore((state) => state);
  const { mutateAsync } = useAddComment();

  const handleCommentSubmit = async () => {
    console.log("Submitting comment:", commentText, token);
    if (commentText.trim() !== "" && token) {
      const result = await handleApiRequest(() =>
        mutateAsync({
          data: { postId: post._id, text: commentText },
          token: token,
        }),
      );

      if (!result) return;
      //   setComments((prev) => [...prev, newComment]);
      setCommentText("");
    }
  };

  return (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Comments</Text>

      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentRow}>
            <AvatarPost user={item.userId} isAbsolute={false} />
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={true}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          placeholderTextColor="#888"
          value={commentText}
          onChangeText={setCommentText}
          onSubmitEditing={handleCommentSubmit}
        />
        <TouchableOpacity
          onPress={handleCommentSubmit}
          style={styles.sendButton}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#1a1a1a",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  commentItem: {
    paddingVertical: 8,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  commentText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    color: "white",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#ff2d55",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },

  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // spacing between avatar and text
    // backgroundColor: "red",
  },
});
