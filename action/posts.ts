import axios from "axios";
import { apiUrl } from "./user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export async function getPostsRequest() {
  return await axios.get(`${apiUrl}post`);
}

export const usePostsQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => await axios.get(`${apiUrl}post`),
  });
};

export const usePostsByidQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async () => await axios.get(`${apiUrl}post/${id}`),
  });
};

// export const usePostsByUserQuery = ({ token }: { token: string }) => {
//   return useQuery({
//     queryKey: ["posts"],
//     queryFn: async () =>
//       await axios.get(`${apiUrl}post/own`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }),
//   });
// };

export const usePostsByUserQuery = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ["posts","user",id],
    queryFn: async () =>
      await axios.get(`${apiUrl}post/user/${id}`),
  });
};

export const usePostAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, token }: { data: FormData; token: string }) =>
      await axios
        .post(`${apiUrl}post`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};
