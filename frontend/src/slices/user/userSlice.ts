import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./userTypes";

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});
