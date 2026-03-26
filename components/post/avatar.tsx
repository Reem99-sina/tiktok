import { apiUrl, useGetUser, useToggleFollow } from "@/action/user";
import { useAuthStore } from "@/store/useAuthStore";

import { avatarUser, User } from "@/types/user";
import { handleApiRequest } from "@/utils/apiHandler";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function AvatarPost({
  user,
  isAbsolute = true,
  caption,
}: {
  user: avatarUser;
  isAbsolute?: boolean;
  caption?: string;
}) {
  const { user: userCurrent, token } = useAuthStore((state) => state);
  const { data: userData } = useGetUser(token);

  const { mutateAsync } = useToggleFollow({ id: user?._id, token: token });
  const handleFollowSubmit = async () => {
    const result = await handleApiRequest(() => mutateAsync());
    if (!result) return; // error already handled inside helper
  };
  const checkIfFollowing = () => {
    if (!userCurrent || !userData?.user) return false;
    return userData?.user?.following
      ?.map((ele: User) => ele?._id)
      .includes(user?._id);
  };

  return (
    <View
      style={{
        ...styles.userInfo,
        position: isAbsolute ? "absolute" : "relative",
        bottom: isAbsolute ? 120 : undefined, // above buttons
        left: isAbsolute ? 15 : undefined,
        right: isAbsolute ? 80 : undefined, // leave space for like/comment buttons
        backgroundColor: isAbsolute ? "rgba(0,0,0,0.5)" : "transparent", // semi-transparent background for absolute position
      }}
    >
      <View style={styles.rowStyle}>
        <View>
          <TouchableOpacity style={styles.userRow}>
            <Image
              source={{ uri: apiUrl + user?.avatar }}
              style={styles.avatar}
            />

            {isAbsolute && <Text style={styles.username}>{user?.username}</Text>}
          </TouchableOpacity>
          <Text style={styles.caption}>{caption}</Text>
        </View>

        {userCurrent?._id !== user?._id && !checkIfFollowing() && (
          <TouchableOpacity
            onPress={handleFollowSubmit}
            style={styles.followButton}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Follow</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    borderRadius: 50,
    padding: 5,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  caption: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  followButton: {
    backgroundColor: "#ff2d55",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 40,
  },
});
