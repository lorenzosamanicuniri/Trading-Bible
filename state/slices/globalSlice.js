import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    expanded: false,
    activeEvent: null,
    tempActiveEvent: null,
    username: null,
  },
  reducers: {
    controlExpand: (state) => {
      state.expanded = !state.expanded;
    },
    expandNav: (state) => {
      state.expanded = true;
    },
    setActiveEventGlobal: (state, action) => {
      state.activeEvent = action.payload;
    },
    resetActiveEventGlobal: (state) => {
      state.activeEvent = null;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    resetUsername: (state) => {
      state.username = null;
    },
  },
});

export const {
  controlExpand,
  expandNav,
  setActiveEventGlobal,
  resetActiveEventGlobal,
  setUsername,
  resetUsername,
} = globalSlice.actions;

export const activeUser = (state) => state.global.username;
export const activeEventState = (state) => state.global.activeEvent;
export const expandedState = (state) => state.global.expanded;

export default globalSlice.reducer;
