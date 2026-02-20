import { createSlice } from "@reduxjs/toolkit";
import { views } from "./menuTypes";
import type { RootState } from "../../store/store";

const savedActiveView = localStorage.getItem("activeView");
console.log("savedActiveView: ", savedActiveView);

const initialState = {
  activeView: savedActiveView ?? views.CONVERSATIONS,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeView = action.payload;
      localStorage.setItem("activeView", action.payload);
    },
  },
});

export const menuSelector = (state: RootState) => state.menu;
export const { setActiveMenu } = menuSlice.actions;
export default menuSlice.reducer;
