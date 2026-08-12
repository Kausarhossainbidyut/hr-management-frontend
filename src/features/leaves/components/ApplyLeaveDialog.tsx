import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { applyLeaveSchema, type ApplyLeaveFormValues } from "@/lib/validations/leave.validation";
import { useApplyLeaveMutation } from "../leaveApi";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ApplyLeaveDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [applyLeave, { isLoading }] = useApplyLeaveMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplyLeaveFormValues>({ resolver: zodResolver(applyLeaveSchema) });

  const onSubmit = async (values: ApplyLeaveFormValues) => {
    try {
      const res = await applyLeave(values).unwrap();
      toast.success(res.message);
      reset();
      onOpenChange(false);
    } catch (err) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ?? "Failed to submit leave request";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for Leave</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="reason">Reason</Label>
            <Textarea id="reason" rows={3} placeholder="Briefly describe the reason…" {...register("reason")} />
            {errors.reason && <p className="text-xs text-danger">{errors.reason.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="fromDate">From</Label>
              <Input id="fromDate" type="date" {...register("fromDate")} />
              {errors.fromDate && <p className="text-xs text-danger">{errors.fromDate.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="toDate">To</Label>
              <Input id="toDate" type="date" {...register("toDate")} />
              {errors.toDate && <p className="text-xs text-danger">{errors.toDate.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting…" : "Submit request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
