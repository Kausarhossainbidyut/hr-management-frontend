import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
  type CreateDepartmentFormValues,
} from "@/lib/validations/department.validation";
import { useCreateDepartmentMutation, useUpdateDepartmentMutation } from "../departmentApi";
import type { Department } from "@/lib/types/models";
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

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: Department | null;
};

export function DepartmentFormDialog({ open, onOpenChange, department }: Props) {
  const isEditMode = Boolean(department);
  const [createDepartment, { isLoading: isCreating }] = useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDepartmentFormValues>({
    resolver: zodResolver(isEditMode ? updateDepartmentSchema : createDepartmentSchema) as never,
  });

  useEffect(() => {
    if (open) {
      reset(
        department
          ? { name: department.name, description: department.description ?? "" }
          : { name: "", description: "" }
      );
    }
  }, [open, department, reset]);

  const onSubmit = async (values: CreateDepartmentFormValues) => {
    try {
      if (isEditMode && department) {
        const res = await updateDepartment({ id: department.id, ...values }).unwrap();
        toast.success(res.message);
      } else {
        const res = await createDepartment(values).unwrap();
        toast.success(res.message);
      }
      onOpenChange(false);
    } catch (err) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ?? "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Department" : "Add Department"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Department name</Label>
            <Input id="name" placeholder="e.g. Engineering" {...register("name")} />
            {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={3} {...register("description")} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving…" : isEditMode ? "Save changes" : "Create department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
