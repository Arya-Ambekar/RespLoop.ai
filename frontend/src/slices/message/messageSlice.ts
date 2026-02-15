import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { MessageState } from "./messageTypes";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import type { RootState } from "../../store/store";
import { socketClient } from "../../main";

export const addMessage = createAsyncThunk<
  // { data: createMessage },
  void,
  { text: string; conversationId?: string; sent_at: Date }
>("messages/addMessage", async (message) => {
  // const response = await axios.post(`${BASE_URL}/api/v1/messages`, message);
  // return response.data;
  return await socketClient.emit("chat", { body: message });
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
  messageStatus: "idle",
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
    builder.addCase(addMessage.pending, (state) => {
      state.messageStatus = "Sending";
    });
    builder.addCase(addMessage.fulfilled, (state) => {
      state.messageStatus = "Sent successfully";
    });
    builder.addCase(addMessage.rejected, (state) => {
      state.messageStatus = "Send failed";
    });
  },
});

export const messageSelector = (state: RootState) => state.messages;
export default messageSlice.reducer;
