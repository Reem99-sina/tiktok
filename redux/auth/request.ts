import { loginRequest, registerRequest } from "@/action/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔥 Async login action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await loginRequest(data);

      // save token (persist)
      localStorage.setItem("token", response.data.token);

      return response.data; // { user, token }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Login failed"
        );
      }
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    data: FormData,
    thunkAPI
  ) => {
    try {
      const response = await registerRequest(data);

      return response.data; 
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || "Register failed"
        );
      }
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);