import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginState } from "./loginTypes";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import type { RootState } from "../../store/store";

export const login = createAsyncThunk<
  boolean,
  { emailId: string; password: string }
>("login", async (data) => {
  const response = await axios.post(`${BASE_URL}/api/v1/login`, data);
  return response.data.data;
});

const initialState: LoginState = {
  isLoggedIn: null,
  status: "idle",
  error: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.isLoggedIn = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const loginSelector = (state: RootState) => state.login;
export default loginSlice.reducer;
