import { create } from "zustand";
import { Post } from "../types/post";
import { handleApiRequest } from "@/utils/apiHandler";
import { getPostsRequest } from "@/action/posts";

type PostState = {
  posts: Post[];
  userPosts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  getUserPosts: (userId: string) => Post[];
  getPosts:()=>void
};

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  userPosts: [],

  setPosts: (posts) => set({ posts }),

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),

  getUserPosts: (userId) => get().userPosts,
  getPosts: async () => {
    try {
      const result = await handleApiRequest(() => getPostsRequest());

      if (!result) {
        // set({ user: null, token: null });
        // await SecureStore.deleteItemAsync("token");
        return;
      }

      set({ posts: result?.data.data });
    } catch (err) {
      console.error("Failed to load user:", err);
    }
  },
}));
