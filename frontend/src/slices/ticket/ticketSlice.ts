import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { TicketState, Ticket } from "./ticketTypes";
import type { RootState } from "../../store/store";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async ({
    page = 1,
    limit = 10,
    search,
    status,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => {
    const response = await axios.get(`${BASE_URL}/api/v1/tickets`, {
      params: { page, limit, search, status },
    });
    return response.data.data;
  },
);

const initialState: TicketState = {
  tickets: [],
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

export const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setStatusesFilter: (state, action) => {
      state.filters.statuses =
        action.payload === "All Statuses" ? undefined : action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tickets = action.payload?.data;
        console.log("payload: ", action.payload);
        state.pagination = action.payload?.pagination;
      });
  },
});

export default ticketSlice.reducer;
export const ticketSelector = (state: RootState) => state.tickets;
export const { setStatusesFilter } = ticketSlice.actions;

export const filteredTickets = createSelector(
  [
    (state: RootState) => state.tickets.tickets,
    (state: RootState) => state.tickets.filters,
  ],
  (tickets, filters): Ticket[] | null => {
    if (!tickets) return null;

    if (!filters.statuses) return tickets;

    const { statuses } = filters;

    return [
      ...tickets.filter((ticket) => {
        const statusMatch =
          !statuses || ticket.status === statuses.toLowerCase();
        return statusMatch;
      }),
    ];
  },
);
