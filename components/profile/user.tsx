import { useAuthStore } from "@/store/useAuthStore";
import { ThemedView } from "../themed-view";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NotFound } from "../post/notfound";
import { apiUrl } from "@/action/user";
import { usePostsByUserQuery } from "@/action/posts";
import {  useMemo } from "react";
import VideoCustom from "../ui/videoCustom";

const screenWidth = Dimensions.get("window").width;


const itemSize = screenWidth / 3;

export function UserProfile() {
  const { user, logout } = useAuthStore((state) => state);
  const { data: postsData } = usePostsByUserQuery({ id: user?._id });

  const posts = useMemo(() => {
    return postsData?.data?.data || [];
  }, [postsData]);
  if (!user) {
    return <NotFound message="user not found" />;
  }

  return (
    <ThemedView style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {user.avatar ? (
          <Image source={{ uri: apiUrl + user.avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.noAvatar}>No Avatar</Text>
        )}
      </View>

      {/* Username */}
      <Text style={styles.username}>{user.username}</Text>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {postsData?.data?.data?.length || 0}
          </Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user?.followers?.length || 0}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user?.following?.length || 0}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
      
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={{ width: itemSize, height: itemSize }}>
            <VideoCustom uri={apiUrl + item.videoUrl}  />
          </View>
        )}
      />

      {/* Logout Button */}
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  username: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 20,
  },

  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#eaeaea",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 5,
  },

  avatar: {
    width: "100%",
    height: "100%",
  },

  noAvatar: {
    color: "#888",
    fontSize: 14,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 5,
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  logoutButton: {
    marginTop: 20,
    backgroundColor: "#ff2d55",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
  },

  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
