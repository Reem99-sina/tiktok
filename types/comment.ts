export type PostComment = {
  _id: string;
  text: string;
  userId: {
    username: string;
    avatar: string;
  };
};

export type addComment={
    postId:string,
    text:string
}