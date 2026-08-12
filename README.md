# HR Management System — Frontend

A full-featured Human Resource Management System built with React, TypeScript, and Redux Toolkit. It covers employee management, department organization, task tracking, leave management, and attendance — all behind a role-based access control layer.

**Live Demo:** [https://hr-management-frontend-theta.vercel.app](https://hr-management-frontend-theta.vercel.app/login)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Role-Based Access](#role-based-access)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Screenshots](#screenshots)

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| State Management | Redux Toolkit + RTK Query |
| Routing | React Router v6 (lazy-loaded) |
| Styling | Tailwind CSS v3 |
| UI Primitives | Radix UI (Dialog, Select, Label) |
| Forms & Validation | React Hook Form + Zod |
| Toast Notifications | Sonner |
| Deployment | Vercel |

---

## Features

### Authentication
- JWT-based login and registration
- Persistent session via `localStorage` (access token)
- Auto-logout on 401 response anywhere in the app (via `authErrorMiddleware`)
- Protected routes — unauthenticated users are redirected to `/login`
- Guest routes — authenticated users cannot revisit `/login` or `/register`

### Dashboard
- Summary view for the logged-in user
- Role-aware — Admins see org-wide stats, Employees see personal data

### Employee Management *(Admin only)*
- List all employees with search, filter by role/department, and pagination
- Create, edit, and soft-delete employees
- Assign department and designation

### Department Management *(Admin & Manager)*
- Full CRUD on departments
- View employee count per department
- Assign employees to departments

### Task Management *(All roles — scoped by role)*
- Employees see tasks assigned to them
- Admins and Managers can create, assign, update, and delete tasks
- Filter by status: `TODO` / `IN_PROGRESS` / `DONE`

### Leave Management *(All roles — scoped by role)*
- Employees apply for leaves with date range and reason
- Admins and Managers approve or reject pending requests
- Status tracking: `PENDING` / `APPROVED` / `REJECTED`

### Attendance *(All roles — scoped by role)*
- Employees check in and check out
- Admins can view all attendance records
- Status tracking: `PRESENT` / `ABSENT` / `LATE` / `HALF_DAY`

### Profile
- View and update personal information
- Change password

---

## Role-Based Access

| Route | ADMIN | MANAGER | EMPLOYEE |
|---|:---:|:---:|:---:|
| `/dashboard` | ✅ | ✅ | ✅ |
| `/profile` | ✅ | ✅ | ✅ |
| `/employees` | ✅ | ❌ | ❌ |
| `/departments` | ✅ | ✅ | ❌ |
| `/tasks` | ✅ | ✅ | ✅ |
| `/leaves` | ✅ | ✅ | ✅ |
| `/attendance` | ✅ | ✅ | ✅ |

> New accounts are created with the `EMPLOYEE` role by default. To promote a user to `ADMIN` or `MANAGER`, update the role directly in the database (e.g., via Prisma Studio on the backend).

---

## Project Structure

```
src/
├── app/
│   ├── store.ts                  # Redux store configuration
│   ├── baseApi.ts                # Single RTK Query base instance (all endpoints extend this)
│   ├── hooks.ts                  # Typed useAppDispatch & useAppSelector
│   └── authErrorMiddleware.ts    # Global 401 interceptor → auto logout
│
├── features/                     # One folder per domain module
│   ├── auth/
│   │   ├── authApi.ts            # Login, register, profile, change password endpoints
│   │   ├── authSlice.ts          # Auth state + logoutAndClearCache thunk
│   │   ├── AuthInitializer.tsx   # Rehydrates user from token on app load
│   │   └── pages/
│   │       ├── LoginPage.tsx
│   │       └── RegisterPage.tsx
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   └── ProfilePage.tsx
│   ├── employees/
│   │   ├── employeeApi.ts
│   │   ├── components/EmployeeFormDialog.tsx
│   │   └── pages/EmployeeListPage.tsx
│   ├── departments/
│   │   ├── departmentApi.ts
│   │   ├── components/DepartmentFormDialog.tsx
│   │   └── pages/DepartmentListPage.tsx
│   ├── tasks/
│   │   ├── taskApi.ts
│   │   ├── components/TaskFormDialog.tsx
│   │   └── pages/TaskListPage.tsx
│   ├── leaves/
│   │   ├── leaveApi.ts
│   │   ├── components/ApplyLeaveDialog.tsx
│   │   └── pages/LeaveListPage.tsx
│   └── attendance/
│       ├── attendanceApi.ts
│       └── pages/AttendancePage.tsx
│
├── routes/
│   ├── AppRouter.tsx             # All routes, lazy-loaded with Suspense
│   ├── ProtectedRoute.tsx        # Redirects to /login if not authenticated
│   ├── RoleRoute.tsx             # Redirects to /dashboard if role not allowed
│   ├── GuestRoute.tsx            # Redirects to /dashboard if already authenticated
│   └── NotFoundPage.tsx
│
├── components/
│   ├── ui/                       # Base primitives: Button, Input, Select, Dialog, Label, Textarea
│   ├── layout/                   # Sidebar, Topbar, DashboardLayout
│   └── shared/                   # DataTable, StatusBadge, PageHeader, ConfirmDialog,
│                                 # Avatar, EmptyState, Skeleton, FullScreenSpinner
│
└── lib/
    ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
    ├── validations/              # Zod schemas mirroring the backend's validation rules
    └── types/
        ├── models.ts             # TypeScript types: User, Department, Task, Leave, Attendance
        └── roles.ts              # Role, TaskStatus, LeaveStatus, AttendanceStatus enums
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/hr-management-frontend.git
cd hr-management-frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL (see below)

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env` file in the project root:

```env
# For local development (backend running on your machine)
VITE_API_BASE_URL=http://localhost:5000/api

# For production (deployed backend)
# VITE_API_BASE_URL=https://hr-management-backend-jntb.onrender.com/api
```

> All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser.

---

## Available Scripts

```bash
npm run dev          # Start development server (hot reload)
npm run build        # Type-check + production build → dist/
npm run preview      # Serve the production build locally
npm run typecheck    # Run tsc --noEmit (type-check without building)
```

---

## API Integration

All API communication goes through a single RTK Query `baseApi` instance (`src/app/baseApi.ts`). Each feature injects its own endpoints into this base — meaning the entire app shares one cache, one set of tags, and one request configuration.

Every backend endpoint has a matching RTK Query hook:

| Module | Hooks |
|---|---|
| Auth | `useLoginMutation`, `useRegisterMutation`, `useGetProfileQuery`, `useChangePasswordMutation` |
| Employees | `useGetEmployeesQuery`, `useGetEmployeeByIdQuery`, `useCreateEmployeeMutation`, `useUpdateEmployeeMutation`, `useDeleteEmployeeMutation` |
| Departments | `useGetDepartmentsQuery`, `useGetDepartmentByIdQuery`, `useCreateDepartmentMutation`, `useUpdateDepartmentMutation`, `useDeleteDepartmentMutation` |
| Tasks | `useGetTasksQuery`, `useGetTaskByIdQuery`, `useCreateTaskMutation`, `useUpdateTaskMutation`, `useDeleteTaskMutation` |
| Leaves | `useGetLeavesQuery`, `useGetLeaveByIdQuery`, `useApplyLeaveMutation`, `useUpdateLeaveStatusMutation`, `useDeleteLeaveMutation` |
| Attendance | `useGetAttendanceQuery`, `useCheckInMutation`, `useCheckOutMutation`, `useDeleteAttendanceMutation` |

RTK Query's `providesTags` / `invalidatesTags` ensures lists automatically refetch after any create, update, or delete — no manual cache invalidation needed anywhere.

### Global 401 Handling

`authErrorMiddleware` intercepts every rejected RTK Query action. If the response status is `401`, it dispatches `logoutAndClearCache()` (clears auth state + resets the entire API cache) and redirects to `/login` using `window.location.replace()` — so the user cannot press Back to return to a protected page.

---

## Screenshots

> Coming soon — add screenshots of Dashboard, Employee List, Leave Management, and Attendance pages here.

---

## Backend

This frontend is built to consume the [HR Management System Backend](https://hr-management-backend-jntb.onrender.com/api).

The backend is built with Node.js, Express, Prisma, and PostgreSQL. All response shapes, validation rules, role names, and status enums in this frontend mirror the backend's implementation exactly.

---

## License

This project is for personal/portfolio use. Feel free to fork and adapt it.
