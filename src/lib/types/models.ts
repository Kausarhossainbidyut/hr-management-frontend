import type { AttendanceStatus, LeaveStatus, Role, TaskStatus } from "./roles";

/** Matches the backend's sendResponse() wrapper exactly:
 * { success, message, data, meta } — see src/lib/sendResponse.ts on the backend. */
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: { page: number; limit: number; total: number };
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  designation?: string | null;
  departmentId?: string | null;
  department?: { id: string; name: string } | null;
  createdAt: string;
  updatedAt: string;
};

export type Department = {
  id: string;
  name: string;
  description?: string | null;
  _count?: { employees: number };
  employees?: Pick<User, "id" | "name" | "email" | "designation" | "role">[];
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  dueDate?: string | null;
  assignedToId: string;
  assignedById: string;
  assignedTo?: Pick<User, "id" | "name" | "email">;
  assignedBy?: Pick<User, "id" | "name" | "email">;
  createdAt: string;
  updatedAt: string;
};

export type Leave = {
  id: string;
  userId: string;
  reason: string;
  fromDate: string;
  toDate: string;
  status: LeaveStatus;
  reviewedById?: string | null;
  user?: Pick<User, "id" | "name" | "email">;
  reviewedBy?: Pick<User, "id" | "name"> | null;
  createdAt: string;
  updatedAt: string;
};

export type Attendance = {
  id: string;
  userId: string;
  date: string;
  checkIn?: string | null;
  checkOut?: string | null;
  status: AttendanceStatus;
  user?: Pick<User, "id" | "name" | "email">;
  createdAt: string;
  updatedAt: string;
};
