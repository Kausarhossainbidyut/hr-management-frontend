import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleRoute } from "./RoleRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ROLES } from "@/lib/types/roles";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const DashboardPage = lazy(() => import("@/features/dashboard/DashboardPage"));
const ProfilePage = lazy(() => import("@/features/dashboard/ProfilePage"));
const EmployeeListPage = lazy(() => import("@/features/employees/pages/EmployeeListPage"));
const DepartmentListPage = lazy(() => import("@/features/departments/pages/DepartmentListPage"));
const TaskListPage = lazy(() => import("@/features/tasks/pages/TaskListPage"));
const LeaveListPage = lazy(() => import("@/features/leaves/pages/LeaveListPage"));
const AttendancePage = lazy(() => import("@/features/attendance/pages/AttendancePage"));

function PageFallback() {
  return <div className="flex min-h-screen items-center justify-center text-sm text-muted">Loading…</div>;
}

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/profile", element: <ProfilePage /> },
          {
            element: <RoleRoute allowedRoles={[ROLES.ADMIN]} />,
            children: [{ path: "/employees", element: <EmployeeListPage /> }],
          },
          {
            element: <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,
            children: [{ path: "/departments", element: <DepartmentListPage /> }],
          },
          { path: "/tasks", element: <TaskListPage /> },
          { path: "/leaves", element: <LeaveListPage /> },
          { path: "/attendance", element: <AttendancePage /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);

export function AppRouter() {
  return (
    <Suspense fallback={<PageFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
