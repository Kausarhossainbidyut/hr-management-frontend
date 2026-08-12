import { z } from "zod";
import { TASK_STATUS } from "@/lib/types/roles";

const taskStatusEnum = z.enum([
  TASK_STATUS.PENDING,
  TASK_STATUS.IN_PROGRESS,
  TASK_STATUS.COMPLETED,
  TASK_STATUS.CANCELLED,
]);

/** Mirrors backend src/services/task/task.validation.ts -> createTaskValidation.body
 * NOTE: dueDate is a plain <input type="date"> value here; it is converted to a
 * full ISO datetime string (toIsoDateTime) before being sent to the API, since
 * the backend's zod schema requires z.string().datetime(). */
export const createTaskSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(2),
  description: z.string().optional(),
  assignedToId: z.string({ required_error: "Please select an employee" }).min(1, "Please select an employee"),
  dueDate: z.string().optional(),
});
export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;

/** Mirrors backend updateTaskValidation.body */
export const updateTaskSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  status: taskStatusEnum.optional(),
  dueDate: z.string().optional(),
});
export type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>;
