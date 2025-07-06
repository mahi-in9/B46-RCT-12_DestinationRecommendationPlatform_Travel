import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    globalLoading: false,
    theme: "light", // could be 'dark'
    showToast: {
      visible: false,
      message: "",
      type: "success", // 'success' | 'error' | 'info'
    },
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    showToast: (state, action) => {
      state.showToast = {
        visible: true,
        message: action.payload.message,
        type: action.payload.type || "info",
      };
    },
    hideToast: (state) => {
      state.showToast = {
        visible: false,
        message: "",
        type: "success",
      };
    },
  },
});

export const { setGlobalLoading, toggleTheme, showToast, hideToast } =
  uiSlice.actions;

export default uiSlice.reducer;
