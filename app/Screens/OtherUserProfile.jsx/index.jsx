import { View, Text, FlatList } from "react-native";

import { useCallback, useEffect, useState } from "react";
import OtherUserScreen from "../OtherUserProfile.jsx/OtherUserScreen";
import { supabase } from "@/constants/SupabaseConfig";
import UserPostList from "../ProfileScreen/UserPostList";
export default function OtherUserProfile({ route }) {
  const [postList, setPostList] = useState([]);
  const [Loading, setLoading] = useState(false);
  const GetPostUser = useCallback(async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("PostList")
      .select(`*,PostFavority(emailRef,postRef),Users(*)`)
      .eq("emailRef", route.params.user.email);
    setPostList(data);
    if (data || error) {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    GetPostUser();
  }, []);
  return (
    <View>
      <FlatList
        data={[{ id: 1 }]}
        renderItem={() => (
          <View>
            <OtherUserScreen user={route.params.user} posts={postList} />
            <UserPostList
              postList={postList}
              GetPostUser={GetPostUser}
              loading={Loading}
            />
          </View>
        )}
      />
    </View>
  );
}
