import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./userTypes";
import type { RootState } from "../../store/store";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const addUser = createAsyncThunk(
  "users/addUser",
  async (email: string) => {
    const response = await axios.post(`${BASE_URL}/api/v1/users`, { email });
    return response.data.data;
  },
);

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
  currentUser: null,
  currentConversationId: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.currentConversationId = action.payload.conversation.id;
        console.log("currentConversationId: ", state.currentConversationId);
      });
  },
});

export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
