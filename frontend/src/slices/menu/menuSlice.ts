import { createSlice } from "@reduxjs/toolkit";
import { views } from "./menuTypes";
import type { RootState } from "../../store/store";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    activeView: views.CONVERSATIONS, // default view
  },
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeView = action.payload;
    },
  },
});

export const menuSelector = (state: RootState) => state.menu;
export const { setActiveMenu } = menuSlice.actions;
export default menuSlice.reducer;
