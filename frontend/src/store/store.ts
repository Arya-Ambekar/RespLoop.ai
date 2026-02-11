import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../slices/message/messageSlice";
import conversationReducer from "../slices/conversation/conversationSlice";
import ticketReducer from "../slices/ticket/ticketSlice";
import menuReducer from "../slices/menu/menuSlice";

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    conversations: conversationReducer,
    tickets: ticketReducer,
    menu: menuReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
