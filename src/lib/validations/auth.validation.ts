import { z } from "zod";

/** Mirrors backend src/services/auth/auth.validation.ts -> loginValidation.body */
export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Invalid email"),
  password: z.string({ required_error: "Password is required" }).min(1, "Password is required"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

/** Mirrors backend registerValidation.body */
export const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2, "Name must be at least 2 characters"),
  email: z.string({ required_error: "Email is required" }).email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
});
export type RegisterFormValues = z.infer<typeof registerSchema>;

/** Mirrors backend changePasswordValidation.body */
export const changePasswordSchema = z.object({
  oldPassword: z.string({ required_error: "Old password is required" }).min(1),
  newPassword: z
    .string({ required_error: "New password is required" })
    .min(6, "Password must be at least 6 characters"),
});
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
