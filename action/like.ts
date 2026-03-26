import axios from "axios";
import { apiUrl } from "./user";

import { addLike } from "@/types/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function addlikeRequest(data: addLike, token: string) {
  return await axios.post(`${apiUrl}like`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const useAddLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, token }: { data: addLike; token: string }) =>
      axios
        .post(`${apiUrl}like`, data, {
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
