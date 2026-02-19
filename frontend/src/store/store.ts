import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../slices/message/messageSlice";
import conversationReducer from "../slices/conversation/conversationSlice";
import ticketReducer from "../slices/ticket/ticketSlice";
import menuReducer from "../slices/menu/menuSlice";
import userReducer from "../slices/user/userSlice";
import socketReducer from "../slices/socket/socketSlice";
import loginReducer from "../slices/login/loginSlice";
import improveAgentReducer from "../slices/improveAgent/improveAgentSlice";

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    conversations: conversationReducer,
    tickets: ticketReducer,
    menu: menuReducer,
    user: userReducer,
    socket: socketReducer,
    improveAgent: improveAgentReducer,
    login: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
