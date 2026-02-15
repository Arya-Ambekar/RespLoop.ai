import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { ConversationState, Conversation } from "./conversationTypes";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import type { RootState } from "../../store/store";
// import { addMessage } from "../message/messageSlice";
import { socketClient } from "../../main";

export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async ({
    page = 1,
    limit = 10,
    search,
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const response = await axios.get(`${BASE_URL}/api/v1/conversations`, {
      params: { page, limit, search },
    });
    return response.data.data;
  },
);

export const fetchConversation = createAsyncThunk(
  "conversations/fetchConversation",
  async ({ id }: { id: string }) => {
    const response = await axios.get(`${BASE_URL}/api/v1/conversations/${id}`);
    return response.data.data;
  },
);

// export const fetchMessages = createAsyncThunk(
//   "fetchMessages",
//   async function (_, { getState, dispatch }) {
//     console.log("state ", getState());
//     return await socketClient.on("chat", (receivedMessages: any) =>
//       dispatch({
//         type: "conversations/saveReceivedMessages",
//         payload: { messages: receivedMessages },
//       }),
//     );
//   },
// );

const initialState: ConversationState = {
  conversations: [],
  currentConversation: null,
  status: "idle",
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {
    resolution_statuses: undefined,
  },
};

export const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setResolutionStatusesFilter: (state, action) => {
      state.filters.resolution_statuses =
        action.payload === "All Statuses" ? undefined : action.payload;
    },
    saveReceivedMessages: (state, action) => {
      console.log(
        "state.currentConversation before adding new msg: ",
        state.currentConversation,
      );
      console.log("action.payload: ", action.payload);
      state.currentConversation?.Messages.push(action.payload.userMessage);
      state.currentConversation?.Messages.push(action.payload.botMessage);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload?.data;
        state.pagination = action.payload?.pagination;
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        console.log("fetchConversation is called");
        state.status = "succeeded";
        state.currentConversation = action.payload;
        console.log(
          "action.payload.data in fetchConversation: ",
          action.payload,
        );
        console.log(
          " state.currentConversation in fetchConversation: ",
          state.currentConversation,
        );
      });
    // .addCase(fetchMessages.pending, (state) => {
    //   state.status = "loading";
    // });
    // .addCase(fetchMessages.fulfilled, (state, action) => {});
    // .addCase(addMessage.fulfilled, (state, action) => {
    //   console.log("addMessage case in conversation slice");
    //   console.log(
    //     "currentConversation before uppdating: ",
    //     state.currentConversation,
    //   );
    //   state.currentConversation?.Messages.push(
    //     action.payload.data?.userMessage,
    //   );
    //   console.log(
    //     "currentConversation after adding userMessage: ",
    //     state.currentConversation,
    //   );

    //   if (action.payload.data.botMessage) {
    //     state.currentConversation?.Messages.push(
    //       action.payload.data?.botMessage,
    //     );
    //   }
    //   console.log(
    //     "currentConversation after adding botMessage: ",
    //     state.currentConversation,
    //   );
    // });
  },
});

export const conversationSelector = (state: RootState) => state.conversations;
export default conversationSlice.reducer;
export const { setResolutionStatusesFilter, saveReceivedMessages } =
  conversationSlice.actions;

export const filteredConversations = createSelector(
  [
    (state: RootState) => state.conversations.conversations,
    (state: RootState) => state.conversations.filters,
  ],
  (conversations, filter): Conversation[] | null => {
    if (!conversations) return null;

    if (!filter.resolution_statuses) return conversations;

    const { resolution_statuses } = filter;

    return [
      ...conversations.filter((conversation) => {
        const resolutionStatusMatch =
          !resolution_statuses ||
          conversation.resolution_status === resolution_statuses.toLowerCase();
        return resolutionStatusMatch;
      }),
    ];
  },
);

export const startChatListener = () => (dispatch: any) => {
  socketClient.on("chat", (receivedMessage: any) => {
    dispatch(saveReceivedMessages(receivedMessage));
  });
};
