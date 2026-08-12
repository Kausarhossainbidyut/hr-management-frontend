import { useEffect, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetMeQuery } from "./authApi";
import { setUser } from "./authSlice";
import { FullScreenSpinner } from "@/components/shared/FullScreenSpinner";

/**
 * The access token survives a page refresh (read from localStorage into the
 * Redux initial state in authSlice.ts), but the `user` object does not.
 * This component fetches it once on load if a token exists and no user is
 * in state yet, so protected pages don't briefly render as "logged out".
 *
 * While that check is in flight, it shows a full-screen spinner instead of
 * flashing the login page or an empty dashboard shell.
 */
export function AuthInitializer({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.auth.user);

  const { data, isSuccess, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !accessToken || !!user,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.data));
    }
  }, [isSuccess, data, dispatch]);

  // If /auth/me fails (expired token), authErrorMiddleware handles the
  // redirect on 401; isError is only read here to avoid an unused-var lint.
  void isError;

  // A token exists but we haven't confirmed the user yet — show a spinner
  // instead of letting protected routes render (or a login flash appear)
  // for that brief window.
  const isCheckingSession = Boolean(accessToken) && !user && isLoading;

  if (isCheckingSession) {
    return <FullScreenSpinner label="Checking your session…" />;
  }

  return <>{children}</>;
}
