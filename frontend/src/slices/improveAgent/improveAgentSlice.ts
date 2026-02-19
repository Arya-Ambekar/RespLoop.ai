import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type {
  ImproveAgentData,
  ImproveAgentState,
} from "./improveAgentTypes.ts";
import { DUMMY_IMPROVE_AGENT_DATA } from "../../constants/improveAgentViewDummyData.ts";

const initialState: ImproveAgentState = {
  improveAgentData: DUMMY_IMPROVE_AGENT_DATA,
  isImproveAgentModalOpen: false,
  filters: {
    improve_agent_statuses: undefined,
  },
  currentImproveAgent: null,
};

export const improverAgentSlice = createSlice({
  name: "improveAgent",
  initialState,
  reducers: {
    openImproveAgentModal: (state) => {
      state.isImproveAgentModalOpen = true;
    },
    closeImproveAgentModal: (state) => {
      state.isImproveAgentModalOpen = false;
    },
    setImproveAgentStatusesFilter: (state, action) => {
      state.filters.improve_agent_statuses =
        action.payload === "All Statuses" ? undefined : action.payload;
    },
    setCurrentImproveAgent: (state, action) => {
      for (let improveAgent of state.improveAgentData) {
        if (improveAgent.id === action.payload) {
          state.currentImproveAgent = improveAgent;
        }
      }
    },
    setApprovalStatus: (state, action) => {
      for (let improveAgent of state.improveAgentData) {
        if (improveAgent.id === action.payload.id) {
          improveAgent.approval_status = action.payload.approval_status;
        }
      }
    },
  },
});

export const improveAgentSelector = (state: RootState) => state.improveAgent;
export const {
  openImproveAgentModal,
  closeImproveAgentModal,
  setImproveAgentStatusesFilter,
  setCurrentImproveAgent,
  setApprovalStatus,
} = improverAgentSlice.actions;
export default improverAgentSlice.reducer;

export const filteredImproveAgentData = createSelector(
  [
    (state: RootState) => state.improveAgent.improveAgentData,
    (state: RootState) => state.improveAgent.filters,
  ],
  (improveAgentData, filters): ImproveAgentData[] | null => {
    if (!improveAgentData) return null;

    if (!filters.improve_agent_statuses) return improveAgentData;

    const { improve_agent_statuses } = filters;

    return [
      ...improveAgentData.filter((convo) => {
        const statusMatch =
          !improve_agent_statuses ||
          convo.resolution_status === improve_agent_statuses.toLowerCase();
        return statusMatch;
      }),
    ];
  },
);
