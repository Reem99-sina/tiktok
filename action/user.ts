import {
  FormDataLogin,
  FormDataResendCode,
  FormDataVerify,
} from "@/types/user";
import axios from "axios";
import Constants from "expo-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const apiUrl =
  Constants.expoConfig?.extra?.apiUrl || Constants.manifest?.extra?.apiUrl;

export async function loginRequest(data: FormDataLogin) {
  return await axios.post(`${apiUrl}user/login`, data);
}

export async function getUserRequest(token: string) {
  return await axios.get(`${apiUrl}user/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function registerRequest(data: FormData) {
  return await axios.post(`${apiUrl}user/register`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function verifyEmailRequest(data: FormDataVerify) {
  return await axios.post(`${apiUrl}user/confirm-code`, data);
}

export async function resendCodeRequest(data: FormDataResendCode) {
  return await axios.post(`${apiUrl}user/resend-code`, data);
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormDataLogin) =>
      axios.post(`${apiUrl}user/login`, data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

// 📝 Register
export const useRegister = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      axios
        .post(`${apiUrl}user/register`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};

// ✅ Verify Email
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: FormDataVerify) =>
      axios.post(`${apiUrl}user/confirm-code`, data).then((res) => res.data),
  });
};

// 🔁 Resend Code
export const useResendCode = () => {
  return useMutation({
    mutationFn: (data: FormDataResendCode) =>
      axios.post(`${apiUrl}user/resend-code`, data).then((res) => res.data),
  });
};

/* ===================== USER QUERY ===================== */

// 👤 Get User
export const useGetUser = (token: string | null) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get(`${apiUrl}user/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    enabled: !!token, // only run if token exists
  });
};

export const useToggleFollow = ({
  id,
  token,
}: {
  id?: string;
  token?: string | null;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axios
        .post(
          `${apiUrl}user/follow/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
