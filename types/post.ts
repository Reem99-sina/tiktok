import { PostComment } from "./comment";
import { User } from "./user";

export type Post = {
  _id: string;
  userId: User;
  videoUrl: string;
  caption: string;
  likes: any;
  comments: PostComment[];
  createdAt: string;
};

export type AddPost = {
  caption: string;
};