import { createSlice } from "@reduxjs/toolkit";

const updateThemeData = (themeState: ThemeState) => {
  localStorage.setItem("themeData", JSON.stringify(themeState));
};

export const retrieveThemeData = (): undefined | ThemeState => {
  try {
    const themeData = localStorage.getItem("themeData");
    if (themeData === null) {
      return undefined;
    }
    return JSON.parse(themeData);
  } catch (e) {
    return undefined;
  }
};

export type ThemeState = {
  darkMode: boolean;
  primaryColor: string;
  errorColor: string;
  primaryTextColor: string;
  errorTextColor: string;
};

const initialThemeState = {
  darkMode: false,
  primaryColor: "bg-zinc-900",
  errorColor: "bg-white",
  primaryTextColor: "text-white",
  errorTextColor: "text-black",
} as ThemeState;

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        state.primaryColor = "bg-zinc-900";
        state.errorColor = "bg-white";
        state.primaryTextColor = "text-white";
        state.errorTextColor = "text-black";
      } else {
        state.primaryColor = "bg-white";
        state.errorColor = "bg-zinc-900";
        state.primaryTextColor = "text-black";
        state.errorTextColor = "text-white";
      }
      updateThemeData(state);
    },
    setTheme(state, action: { payload: ThemeState }) {
      state.darkMode = action.payload.darkMode;
      state.primaryColor = action.payload.primaryColor;
      state.errorColor = action.payload.errorColor;
      state.primaryTextColor = action.payload.primaryTextColor;
      state.errorTextColor = action.payload.errorTextColor;
    },
  },
});

export default themeSlice;

export const themeSliceActions = themeSlice.actions;
