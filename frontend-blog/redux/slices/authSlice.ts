// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false, // initial state (user not authenticated)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true; // When user logs in, set isAuthenticated to true
    },
    logout: (state) => {
      state.isAuthenticated = false; // When user logs out, set isAuthenticated to false
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
