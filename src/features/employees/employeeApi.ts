import { baseApi } from "@/app/baseApi";
import type { ApiResponse, User } from "@/lib/types/models";
import type { CreateUserFormValues, UpdateUserFormValues } from "@/lib/validations/user.validation";

export type EmployeeQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/users
    getEmployees: builder.query<ApiResponse<User[]>, EmployeeQueryParams | void>({
      query: (params) => ({ url: "/users", params: params ?? {} }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((u) => ({ type: "User" as const, id: u.id })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),

    // GET /api/users/:id
    getEmployeeById: builder.query<ApiResponse<User>, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    // POST /api/users  (Admin only)
    createEmployee: builder.mutation<ApiResponse<User>, CreateUserFormValues>({
      query: (payload) => ({ url: "/users", method: "POST", body: payload }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    // PATCH /api/users/:id
    updateEmployee: builder.mutation<ApiResponse<User>, { id: string } & UpdateUserFormValues>({
      query: ({ id, ...payload }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    // DELETE /api/users/:id  (Admin only, soft delete)
    deleteEmployee: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
