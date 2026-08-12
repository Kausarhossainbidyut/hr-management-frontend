import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { logoutAndClearCache } from "@/features/auth/authSlice";

/**
 * Catches any RTK Query 401 response from anywhere in the app and logs the
 * user out immediately, instead of relying on each page to handle it.
 * Also clears the RTK Query cache so the next user never sees stale data.
 *
 * Uses window.location.replace() instead of href= so the login page
 * replaces the current history entry — the user cannot press Back to
 * return to a protected page with an expired session.
 */
export const authErrorMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action) && (action.payload as { status?: number })?.status === 401) {
    store.dispatch(logoutAndClearCache());
    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }
  return next(action);
};
