import { LayoutType } from "@/types/Product";
import { createSlice } from "@reduxjs/toolkit";

// Initial state based on localStorage
const initialState = (): LayoutType => {
  let layoutPreferenceData = LayoutType.GRID;
  if (typeof window !== "undefined") {
    layoutPreferenceData =
      (window.localStorage.getItem("layoutPreference") as LayoutType) ||
      LayoutType.GRID;
  } else {
    // Handle the case where localStorage is not available
    console.error("localStorage is not available in this environment.");
  }

  return layoutPreferenceData;
};


const layoutSlice = createSlice({
  name: "layout",
  initialState: initialState(),
  reducers: {
    setLayout: (state, action) => {
      state = action.payload;
      localStorage.setItem("layoutPreference", state); // Store the preference in localStorage

      return state;
    },
  },
});

export const { setLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
