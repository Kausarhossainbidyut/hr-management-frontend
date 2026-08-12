# HR Management System — Frontend

React + TypeScript + Redux Toolkit (RTK Query) + Tailwind CSS + shadcn/ui-style components.
Built to consume the HR Management System backend exactly (same response shape,
same validation rules, same role names).

## Stack

- React 18 + Vite + TypeScript
- Redux Toolkit + RTK Query (state & data fetching, one `baseApi` instance)
- React Router v6 (protected + role-guarded, lazy-loaded routes)
- Tailwind CSS + Radix-based UI primitives (Button, Input, Select, Dialog, Label...)
- React Hook Form + Zod (validation schemas mirror the backend's zod schemas field-for-field)
- sonner (toast notifications)

## Setup

```bash
npm install
```

Edit `.env` and set your real backend URL:

```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

(Currently set to a placeholder — replace it once your backend is deployed,
or point it at `http://localhost:5000/api` for local development against
the backend running on your machine.)

```bash
npm run dev        # start dev server
npm run typecheck  # tsc --noEmit
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## Folder structure

```
src/
├── app/            # Redux store, single RTK Query base instance, typed hooks
├── features/       # one folder per backend module: auth, employees, departments,
│                     tasks, leaves, attendance, dashboard — each with its own
│                     api slice, pages, and components
├── routes/         # AppRouter, ProtectedRoute, RoleRoute
├── components/
│   ├── ui/         # base primitives (Button, Input, Select, Dialog...)
│   ├── layout/      # Sidebar, Topbar, DashboardLayout
│   └── shared/      # DataTable, StatusBadge, PageHeader, ConfirmDialog...
└── lib/
    ├── validations/ # zod schemas, one per module, mirroring the backend exactly
    └── types/        # roles.ts (single source of truth for role/status strings), models.ts
```

## First login

The backend always creates new accounts with role `EMPLOYEE`. To get an
Admin account for testing, register normally, then promote that user to
`ADMIN` directly in the database (or via Prisma Studio) — see the backend's
own documentation for this one-time step.

## What's already wired up

Every one of the backend's 29 endpoints has a matching RTK Query hook:

- **Auth**: login, register, get profile, change password
- **Employees**: list (search/filter/paginate), get one, create, update, soft-delete — Admin-gated where required
- **Departments**: list, get one, create, update, soft-delete — Admin-gated where required
- **Tasks**: list (filter by status), get one, create, update, soft-delete — Admin/Manager-gated where required
- **Leaves**: list, get one, apply, approve/reject, soft-delete — Admin/Manager-gated where required
- **Attendance**: check-in, check-out, list, get one, soft-delete — Admin-gated where required

All CRUD flows use RTK Query's `providesTags` / `invalidatesTags`, so lists
refetch automatically after a create/edit/delete — no manual refetch calls
anywhere in the codebase.

## UI/UX

Functional styling only for now (per request) — colors, spacing, and
components follow the design tokens in `tailwind.config.ts`
(`primary`, `success`, `warning`, `danger`, `muted`, `background`, `surface`)
so visual polish can be layered on later without restructuring any component.
