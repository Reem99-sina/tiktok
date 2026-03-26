// utils/apiHandler.ts
import { Alert } from "react-native";
import axios from "axios";

export async function handleApiRequest<T>(
  requestFn: () => Promise<T>,
): Promise<T | null> {
  try {
    const response = await requestFn();
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data.message || "Something went wrong",
        );
      } else {
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("Error", "An unexpected error occurred");
    }
    return null;
  }
}
