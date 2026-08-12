import { z } from "zod";

/** Mirrors backend src/services/department/department.validation.ts */
export const createDepartmentSchema = z.object({
  name: z.string({ required_error: "Department name is required" }).min(2),
  description: z.string().optional(),
});
export type CreateDepartmentFormValues = z.infer<typeof createDepartmentSchema>;

export const updateDepartmentSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
});
export type UpdateDepartmentFormValues = z.infer<typeof updateDepartmentSchema>;
