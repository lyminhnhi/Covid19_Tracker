import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    isInfo: false
  },
  reducers: {
    toggleOn: (state, action) => {
      return { ...state, isInfo: true};
    },
    toggleOff: (state, action) => {
      return { ...state, isInfo: false};
    },
  }
});

const {reducer, actions} = user;
export const {toggleOn,toggleOff} = actions;
export default reducer;