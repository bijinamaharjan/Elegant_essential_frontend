import { createSlice } from "@reduxjs/toolkit";

export type AuthStateType = {
  user: any;
  token: null | string;
};

const initialAuthState = {
  user: null,
  token: null,
} as AuthStateType;

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    replaceLoggedInState(
      state,
      action: {
        payload: {
          user: any;
          token: string | null;
        };
      }
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export default authSlice;

export const authSliceActions = authSlice.actions;
