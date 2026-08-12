import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import type { ReactNode } from "react";

/**
 * Wraps public-only pages (login, register).
 * If the user is already authenticated, redirect them to the dashboard
 * so they can't accidentally overwrite their session.
 */
export function GuestRoute({ children }: { children: ReactNode }) {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
