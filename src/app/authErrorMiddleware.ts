import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { logoutAndClearCache } from "@/features/auth/authSlice";

/**
 * Catches any RTK Query 401 response from anywhere in the app and logs the
 * user out immediately, instead of relying on each page to handle it.
 * Also clears the RTK Query cache so the next user never sees stale data.
 */
export const authErrorMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action) && (action.payload as { status?: number })?.status === 401) {
    store.dispatch(logoutAndClearCache());
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
  return next(action);
};
