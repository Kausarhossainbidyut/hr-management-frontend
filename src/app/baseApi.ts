import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

/**
 * Single RTK Query instance for the whole app. Every feature's api file
 * (authApi, userApi, departmentApi, taskApi, leaveApi, attendanceApi) injects
 * its endpoints into this instance via baseApi.injectEndpoints — never create
 * a second createApi() instance, or caching/tag invalidation breaks silently.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "User", "Department", "Task", "Leave", "Attendance"],
  endpoints: () => ({}),
});
