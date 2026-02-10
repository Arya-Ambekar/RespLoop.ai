import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { ConversationState, Conversation } from "./conversationTypes";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import type { RootState } from "../../store/store";

export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async ({
    search,
    page = 1,
    limit = 10,
  }: {
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await axios.get(`${BASE_URL}/api/v1/conversations`, {
      params: { search, page, limit },
    });
    return response.data.data;
  },
);

const initialState: ConversationState = {
  conversations: [],
  status: "idle",
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {
    statuses: undefined,
  },
};

export const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setStatusesFilter: (state, action) => {
      state.filters.statuses =
        action.payload === "All Statuses" ? undefined : action.payload;
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
        console.log(action.payload);
        state.pagination = action.payload?.pagination;
      });
  },
});

export const conversationSelector = (state: RootState) => state.conversations;
export default conversationSlice.reducer;
export const { setStatusesFilter } = conversationSlice.actions;

export const filteredConversations = createSelector(
  [
    (state: RootState) => state.conversations.conversations,
    (state: RootState) => state.conversations.filters,
  ],
  (conversations, filter): Conversation[] | null => {
    if (!conversations) return null;

    if (!filter.statuses) return conversations;

    const { statuses } = filter;
    console.log("statuses in createSelector:", statuses);

    return [
      ...conversations.filter((conversation) => {
        const statusMatch =
          !statuses ||
          conversation.resolution_status === statuses.toLowerCase();
        return statusMatch;
      }),
    ];
  },
);
