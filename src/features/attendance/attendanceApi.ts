import { baseApi } from "@/app/baseApi";
import type { ApiResponse, Attendance } from "@/lib/types/models";

export type AttendanceQueryParams = {
  page?: number;
  limit?: number;
  userId?: string;
  from?: string;
  to?: string;
};

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/attendance
    getAttendance: builder.query<ApiResponse<Attendance[]>, AttendanceQueryParams | void>({
      query: (params) => ({ url: "/attendance", params: params ?? {} }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((a) => ({ type: "Attendance" as const, id: a.id })),
              { type: "Attendance" as const, id: "LIST" },
            ]
          : [{ type: "Attendance" as const, id: "LIST" }],
    }),

    // GET /api/attendance/:id
    getAttendanceById: builder.query<ApiResponse<Attendance>, string>({
      query: (id) => `/attendance/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Attendance", id }],
    }),

    // POST /api/attendance/check-in
    checkIn: builder.mutation<ApiResponse<Attendance>, void>({
      query: () => ({ url: "/attendance/check-in", method: "POST" }),
      invalidatesTags: [{ type: "Attendance", id: "LIST" }],
    }),

    // PATCH /api/attendance/check-out
    checkOut: builder.mutation<ApiResponse<Attendance>, void>({
      query: () => ({ url: "/attendance/check-out", method: "PATCH" }),
      invalidatesTags: [{ type: "Attendance", id: "LIST" }],
    }),

    // DELETE /api/attendance/:id  (Admin only, soft delete)
    deleteAttendance: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/attendance/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Attendance", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAttendanceQuery,
  useGetAttendanceByIdQuery,
  useCheckInMutation,
  useCheckOutMutation,
  useDeleteAttendanceMutation,
} = attendanceApi;
