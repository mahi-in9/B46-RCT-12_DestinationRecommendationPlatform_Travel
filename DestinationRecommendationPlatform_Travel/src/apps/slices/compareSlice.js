import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    destinations: [], // array of destination objects
  },
  reducers: {
    addToCompare: (state, action) => {
      const exists = state.destinations.find(
        (dest) => dest.id === action.payload.id
      );
      if (!exists && state.destinations.length < 3) {
        state.destinations.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      state.destinations = state.destinations.filter(
        (dest) => dest.id !== action.payload
      );
    },
    clearCompare: (state) => {
      state.destinations = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;

export default compareSlice.reducer;
