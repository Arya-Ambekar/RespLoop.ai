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
  searchQueries: {
    conversation_serial_id: undefined,
  },
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
    searchImproveAgentData: (state, action) => {
      console.log("searchImproveAgentData called", action.payload);
      state.searchQueries.conversation_serial_id = action.payload;
      console.log(
        "state.searchQueries.conversation_serial_id: ",
        state.searchQueries.conversation_serial_id,
      );
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
  searchImproveAgentData,
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

//search and status filter :
// export const filteredImproveAgentData = createSelector(
//   [
//     (state: RootState) => state.improveAgent.improveAgentData,
//     (state: RootState) => state.improveAgent.filters,
//     (state: RootState) => state.improveAgent.searchQueries,
//   ],
//   (improveAgentData, filters, searchQueries): ImproveAgentData[] | null => {
//     if (!improveAgentData) return null;

//     if (
//       !filters.improve_agent_statuses &&
//       !searchQueries.conversation_serial_id
//     )
//       return improveAgentData;

//     const { improve_agent_statuses } = filters;
//     const { conversation_serial_id } = searchQueries;

//     const statusMatch = [
//       ...improveAgentData.filter((convo) => {
//         const match =
//           !improve_agent_statuses ||
//           convo.resolution_status === improve_agent_statuses.toLowerCase();
//         return match;
//       }),
//     ];

//     const searchMatch = [
//       ...improveAgentData.filter((convo) => {
//         const match =
//           !conversation_serial_id || convo.serial_id === conversation_serial_id;
//         return match;
//       }),
//     ];

//     const result = searchMatch.reduce(
//       (acc, item) => {
//         return acc.includes(item) ? acc : [...acc, item];
//       },
//       [...statusMatch],
//     );

//     console.log("result: ", result);
//     return result;
//   },
// );

// export const filterImproveAgentDataBySearch = createSelector(
//   [
//     (state: RootState) => state.improveAgent.improveAgentData,
//     (state: RootState) => state.improveAgent.searchQueries,
//   ],
//   (improveAgentData, searchQueries): ImproveAgentData[] | null => {
//     if (!improveAgentData) return null;

//     if (!searchQueries.conversation_serial_id) return improveAgentData;

//     const { conversation_serial_id } = searchQueries;

//     return [
//       ...improveAgentData.filter((convo) => {
//         const searchMatch =
//           !conversation_serial_id || convo.serial_id === conversation_serial_id;
//         return searchMatch;
//       }),
//     ];
//   },
// );
