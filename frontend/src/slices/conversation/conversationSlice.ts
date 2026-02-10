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
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const response = await axios.get(`${BASE_URL}/api/v1/conversations`, {
      params: { page, limit },
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
      });
  },
});

export const conversationSelector = (state: RootState) => state.conversations;
export default conversationSlice.reducer;
export const { setResolutionStatusesFilter } = conversationSlice.actions;

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
