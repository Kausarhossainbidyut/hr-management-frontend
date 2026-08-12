import { baseApi } from "@/app/baseApi";
import type { ApiResponse, Task } from "@/lib/types/models";
import type { CreateTaskFormValues, UpdateTaskFormValues } from "@/lib/validations/task.validation";
import { toIsoDateTime } from "@/lib/utils";

export type TaskQueryParams = {
  page?: number;
  limit?: number;
  status?: string;
  assignedToId?: string;
};

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/tasks
    getTasks: builder.query<ApiResponse<Task[]>, TaskQueryParams | void>({
      query: (params) => ({ url: "/tasks", params: params ?? {} }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((t) => ({ type: "Task" as const, id: t.id })),
              { type: "Task" as const, id: "LIST" },
            ]
          : [{ type: "Task" as const, id: "LIST" }],
    }),

    // GET /api/tasks/:id
    getTaskById: builder.query<ApiResponse<Task>, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Task", id }],
    }),

    // POST /api/tasks  (Admin/Manager only)
    createTask: builder.mutation<ApiResponse<Task>, CreateTaskFormValues>({
      query: ({ dueDate, ...rest }) => ({
        url: "/tasks",
        method: "POST",
        body: { ...rest, dueDate: dueDate ? toIsoDateTime(dueDate) : undefined },
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),

    // PATCH /api/tasks/:id
    updateTask: builder.mutation<ApiResponse<Task>, { id: string } & UpdateTaskFormValues>({
      query: ({ id, dueDate, ...rest }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: {
          ...rest,
          // dueDate === ""  → user cleared the date input → send null to backend
          // dueDate is a valid date string  → convert to ISO datetime
          // dueDate === undefined → field not changed → omit from body
          ...(dueDate !== undefined
            ? { dueDate: dueDate === "" ? null : toIsoDateTime(dueDate) }
            : {}),
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" },
      ],
    }),

    // DELETE /api/tasks/:id  (Admin/Manager only, soft delete)
    deleteTask: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/tasks/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
