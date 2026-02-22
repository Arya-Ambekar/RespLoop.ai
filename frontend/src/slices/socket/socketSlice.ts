import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socketClient } from "../../main.tsx";
import type { RootState } from "../../store/store.ts";

const initialState = {
  connectionStatus: "",
};

export const connectToSocket = createAsyncThunk(
  "connectToSocket",
  async function () {
    return await socketClient.connect();
  },
);

export const disconnectFromSocket = createAsyncThunk(
  "disconnectFromSocket",
  async function () {
    return await socketClient.disconnect();
  },
);

const socketSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectToSocket.pending, (state) => {
        state.connectionStatus = "connecting";
      })
      .addCase(connectToSocket.fulfilled, (state) => {
        state.connectionStatus = "connected";
      })
      .addCase(connectToSocket.rejected, (state) => {
        state.connectionStatus = "connection failed";
      })
      .addCase(disconnectFromSocket.pending, (state) => {
        state.connectionStatus = "disconnecting";
      })
      .addCase(disconnectFromSocket.fulfilled, (state) => {
        state.connectionStatus = "disconnected";
      })
      .addCase(disconnectFromSocket.rejected, (state) => {
        state.connectionStatus = "disconnection failed";
      });
  },
});

export const socketSelector = (state: RootState) => state.socket;
export default socketSlice.reducer;
