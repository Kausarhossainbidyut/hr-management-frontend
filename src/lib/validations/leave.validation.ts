import { z } from "zod";
import { LEAVE_STATUS } from "@/lib/types/roles";

/** Mirrors backend src/services/leave/leave.validation.ts -> applyLeaveValidation.body
 * fromDate/toDate are plain <input type="date"> values here; they are converted to
 * full ISO datetime strings (toIsoDateTime) before being sent, since the backend's
 * zod schema requires z.string().datetime(). */
export const applyLeaveSchema = z
  .object({
    reason: z.string({ required_error: "Reason is required" }).min(5, "Please provide at least 5 characters"),
    fromDate: z.string({ required_error: "fromDate is required" }).min(1, "Start date is required"),
    toDate: z.string({ required_error: "toDate is required" }).min(1, "End date is required"),
  })
  .refine((data) => new Date(data.fromDate) <= new Date(data.toDate), {
    message: "fromDate cannot be after toDate",
    path: ["toDate"],
  });
export type ApplyLeaveFormValues = z.infer<typeof applyLeaveSchema>;

/** Mirrors backend updateLeaveStatusValidation.body — only APPROVED/REJECTED are
 * valid transitions from the UI (PENDING is the default, not a target state). */
export const updateLeaveStatusSchema = z.object({
  status: z.enum([LEAVE_STATUS.APPROVED, LEAVE_STATUS.REJECTED], {
    required_error: "Status is required",
  }),
});
export type UpdateLeaveStatusFormValues = z.infer<typeof updateLeaveStatusSchema>;
