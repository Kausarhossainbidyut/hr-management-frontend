import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

/**
 * Decode the JWT payload (without verifying the signature — that is the
 * server's job) to get the expiry time. If the token is already expired
 * client-side we can redirect to login immediately without waiting for a
 * 401 from the server.
 */
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload?.exp) return false;
    // exp is in seconds; Date.now() is in milliseconds
    return payload.exp * 1000 < Date.now();
  } catch {
    return true; // malformed token — treat as expired
  }
}

export function ProtectedRoute() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  if (!accessToken || isTokenExpired(accessToken)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
