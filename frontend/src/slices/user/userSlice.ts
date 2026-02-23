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
  reducers: {
    hydrateUserFromLocalStorage: (state, action) => {
      state.currentUser = action.payload.user;
      state.currentConversationId = action.payload.conversationId;
    },

    setCurrentConversationId: (state, action) => {
      state.currentConversationId = action.payload;
    },

    clearUser: (state) => {
      state.currentUser = null;
      state.currentConversationId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentConversationId = action.payload.conversation.id;
        state.currentUser = {
          id: action.payload.user.id,
          email_id: action.payload.user.email_id,
        };
      });
  },
});

export const {
  hydrateUserFromLocalStorage,
  setCurrentConversationId,
  clearUser,
} = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
