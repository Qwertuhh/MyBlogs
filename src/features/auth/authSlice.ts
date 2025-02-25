import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/globalTypes";
import { Data } from "../../types/globalTypes";

const initialState: AuthState = {
  status: false,
  userData: {} as Data,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = {} as Data;
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
