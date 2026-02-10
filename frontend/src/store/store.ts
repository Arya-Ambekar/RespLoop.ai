import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../slices/message/messageSlice";
import conversationReducer from "../slices/conversation/conversationSlice";

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    conversations: conversationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
