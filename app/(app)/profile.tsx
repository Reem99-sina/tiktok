import { UserProfile } from "@/components/profile/user";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
    >
      <UserProfile/>
    </View>
  );
}


