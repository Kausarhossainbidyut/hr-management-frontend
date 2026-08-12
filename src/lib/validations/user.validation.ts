import { z } from "zod";
import { ROLES } from "@/lib/types/roles";

const roleEnum = z.enum([ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE]);

/** Mirrors backend src/services/user/user.validation.ts -> createUserValidation.body */
export const createUserSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2),
  email: z.string({ required_error: "Email is required" }).email("Invalid email"),
  password: z.string({ required_error: "Password is required" }).min(6),
  phone: z.string().optional(),
  role: roleEnum.optional(),
  designation: z.string().optional(),
  departmentId: z.string().optional(),
});
export type CreateUserFormValues = z.infer<typeof createUserSchema>;

/** Mirrors backend updateUserValidation.body */
export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  role: roleEnum.optional(),
  designation: z.string().optional(),
  departmentId: z.string().optional(),
});
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
