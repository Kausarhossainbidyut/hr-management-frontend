import { baseApi } from "@/app/baseApi";
import type { ApiResponse, Leave } from "@/lib/types/models";
import type { ApplyLeaveFormValues, UpdateLeaveStatusFormValues } from "@/lib/validations/leave.validation";
import { toIsoDateTime } from "@/lib/utils";

export type LeaveQueryParams = {
  page?: number;
  limit?: number;
  status?: string;
  userId?: string;
};

export const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/leaves
    getLeaves: builder.query<ApiResponse<Leave[]>, LeaveQueryParams | void>({
      query: (params) => ({ url: "/leaves", params: params ?? {} }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((l) => ({ type: "Leave" as const, id: l.id })),
              { type: "Leave" as const, id: "LIST" },
            ]
          : [{ type: "Leave" as const, id: "LIST" }],
    }),

    // GET /api/leaves/:id
    getLeaveById: builder.query<ApiResponse<Leave>, string>({
      query: (id) => `/leaves/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Leave", id }],
    }),

    // POST /api/leaves
    applyLeave: builder.mutation<ApiResponse<Leave>, ApplyLeaveFormValues>({
      query: ({ fromDate, toDate, reason }) => ({
        url: "/leaves",
        method: "POST",
        body: { reason, fromDate: toIsoDateTime(fromDate), toDate: toIsoDateTime(toDate) },
      }),
      invalidatesTags: [{ type: "Leave", id: "LIST" }],
    }),

    // PATCH /api/leaves/:id/status  (Admin/Manager only)
    updateLeaveStatus: builder.mutation<
      ApiResponse<Leave>,
      { id: string } & UpdateLeaveStatusFormValues
    >({
      query: ({ id, status }) => ({
        url: `/leaves/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Leave", id },
        { type: "Leave", id: "LIST" },
      ],
    }),

    // DELETE /api/leaves/:id
    deleteLeave: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/leaves/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Leave", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLeavesQuery,
  useGetLeaveByIdQuery,
  useApplyLeaveMutation,
  useUpdateLeaveStatusMutation,
  useDeleteLeaveMutation,
} = leaveApi;
