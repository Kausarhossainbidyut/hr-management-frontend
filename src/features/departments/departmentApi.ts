import { baseApi } from "@/app/baseApi";
import type { ApiResponse, Department } from "@/lib/types/models";
import type {
  CreateDepartmentFormValues,
  UpdateDepartmentFormValues,
} from "@/lib/validations/department.validation";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/departments
    getDepartments: builder.query<ApiResponse<Department[]>, void>({
      query: () => "/departments",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((d) => ({ type: "Department" as const, id: d.id })),
              { type: "Department" as const, id: "LIST" },
            ]
          : [{ type: "Department" as const, id: "LIST" }],
    }),

    // GET /api/departments/:id
    getDepartmentById: builder.query<ApiResponse<Department>, string>({
      query: (id) => `/departments/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Department", id }],
    }),

    // POST /api/departments  (Admin only)
    createDepartment: builder.mutation<ApiResponse<Department>, CreateDepartmentFormValues>({
      query: (payload) => ({ url: "/departments", method: "POST", body: payload }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),

    // PATCH /api/departments/:id  (Admin only)
    updateDepartment: builder.mutation<
      ApiResponse<Department>,
      { id: string } & UpdateDepartmentFormValues
    >({
      query: ({ id, ...payload }) => ({
        url: `/departments/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Department", id },
        { type: "Department", id: "LIST" },
      ],
    }),

    // DELETE /api/departments/:id  (Admin only, soft delete)
    deleteDepartment: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/departments/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
