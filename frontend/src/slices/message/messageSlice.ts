import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { createMessage, MessageState } from "./messageTypes";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import type { RootState } from "../../store/store";

export const addMessage = createAsyncThunk<
  { data: createMessage },
  { text: string; conversationId?: string; sent_at: Date }
>("messages/addMessage", async (message) => {
  const response = await axios.post(`${BASE_URL}/api/v1/messages`, message);
  return response.data;
});

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (conversationId: string) => {
    const response = await axios.get(`${BASE_URL}/api/v1/messages`, {
      params: { conversationId: conversationId },
    });
    return response.data.data;
  },
);

const initialState: MessageState = {
  messages: [],
  status: "idle",
  error: null,
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload?.data;
        console.log(action.payload);
      });
  },
});

export const messageSelector = (state: RootState) => state.messages;
export default messageSlice.reducer;
