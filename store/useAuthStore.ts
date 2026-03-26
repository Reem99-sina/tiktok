import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { User } from "@/types/user";
import axios from "axios";
import { handleApiRequest } from "@/utils/apiHandler";
import { getUserRequest } from "@/action/user";
import { getPostsRequest } from "@/action/posts";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

type AuthState = {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  setToken: (token: string) => void;

  logout: () => void;
  loadUserFromToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  posts:null,

  setUser: async (user, token) => {
    set({ user, token });
    await SecureStore.setItemAsync("token", token);
  },
  setToken: async (token) => {
    set({ token });
    await SecureStore.setItemAsync("token", token);
  },
  logout: async () => {
    set({ user: null, token: null });
    await SecureStore.deleteItemAsync("token");
  },

  loadUserFromToken: async () => {
    const token = await SecureStore.getItemAsync("token");
  
    if (!token) return;

    try {
      const result = await handleApiRequest(() => getUserRequest(token));

      if (!result) {
        // set({ user: null, token: null });
        // await SecureStore.deleteItemAsync("token");
        return;
      }

      set({ user: result?.data.user, token });
    } catch (err) {
      console.error("Failed to load user:", err);
    }
  },
  
}));
