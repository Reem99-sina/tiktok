import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 🚫 يمنع ظهور شريط العنوان
      }}
    />
  );
}
