import { useGetUser } from "@/action/user";
import { AvatarPost } from "@/components/post/avatar";
import CustomTabs from "@/components/ui/tabs";
import { useAuthStore } from "@/store/useAuthStore";
import { useMemo, useState } from "react";
import { FlatList,  View } from "react-native";

export default function Followers() {
  const {  token } = useAuthStore((state) => state);
  const { data: userData } = useGetUser(token);
  const [activeTab, setActiveTab] = useState("followers");

  const user = useMemo(() => {
    return userData?.user || [];
  }, [userData]);
  console.log("user followers", user);

  const tabs = [
    {
      key: "followers",
      label: `Followers (${user.followers.length})`,
    },
    {
      key: "following",
      label: `Following (${user.following.length})`,
    },
  ];

  const data = useMemo(() => {
    return activeTab === "followers" ? user.followers : user.following;
  }, [activeTab, user]);

  return (
    <View style={{ flex: 1 }}>
      <CustomTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              borderBottomWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <AvatarPost user={item} isAbsolute={false} />
          
          </View>
        )}
      />
    </View>
  );
}
