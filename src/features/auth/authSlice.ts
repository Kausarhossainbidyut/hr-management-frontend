import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/lib/types/models";
import { baseApi } from "@/app/baseApi";

type AuthState = {
  user: User | null;
  accessToken: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("accessToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;

// Thunk: clears RTK Query cache on logout so the next user never sees stale data
export const logoutAndClearCache = () => (dispatch: (action: unknown) => void) => {
  dispatch(logout());
  dispatch(baseApi.util.resetApiState());
};

export default authSlice.reducer;
