import axios from "axios";
import { apiUrl } from "./user";
import { addComment } from "@/types/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function addCommentRequest(data: addComment, token: string) {
  return await axios.post(`${apiUrl}comment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, token }: { data: addComment; token: string }) =>
      axios
        .post(`${apiUrl}comment`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["posts", variables.data.postId],
      });
    },
  });
};
