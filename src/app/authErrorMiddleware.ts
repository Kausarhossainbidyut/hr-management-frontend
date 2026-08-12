import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { logout } from "@/features/auth/authSlice";

/**
 * Catches any RTK Query 401 response from anywhere in the app and logs the
 * user out immediately, instead of relying on each page to handle it.
 */
export const authErrorMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action) && (action.payload as { status?: number })?.status === 401) {
    store.dispatch(logout());
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
  return next(action);
};
