import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

export function RoleRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.auth.user);

  // Token exists but /auth/me fetch is still in flight (AuthInitializer is loading).
  // Return null so we don't redirect prematurely — the spinner is shown by AuthInitializer.
  if (accessToken && !user) return null;

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
