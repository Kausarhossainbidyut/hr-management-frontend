import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createTaskSchema,
  updateTaskSchema,
} from "@/lib/validations/task.validation";
import type { TaskStatus } from "@/lib/types/roles";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../taskApi";
import { useGetEmployeesQuery } from "@/features/employees/employeeApi";
import { TASK_STATUS, ROLES } from "@/lib/types/roles";
import type { Task } from "@/lib/types/models";
import { useAppSelector } from "@/app/hooks";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
};

type TaskFormValues = {
  title: string;
  description?: string;
  assignedToId: string;
  dueDate?: string;
  status?: TaskStatus;
};

export function TaskFormDialog({ open, onOpenChange, task }: Props) {
  const isEditMode = Boolean(task);
  const role = useAppSelector((state) => state.auth.user?.role);
  const canManage = role === ROLES.ADMIN || role === ROLES.MANAGER;

  const { data: employeesRes } = useGetEmployeesQuery(
    { limit: 100 },
    { skip: isEditMode || !canManage } // only needed when creating a task as ADMIN/MANAGER
  );
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(isEditMode ? updateTaskSchema : createTaskSchema) as never,
  });

  useEffect(() => {
    if (open) {
      reset(
        task
          ? {
              title: task.title,
              description: task.description ?? "",
              dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
              status: task.status,
            }
          : { title: "", description: "", assignedToId: "", dueDate: "" }
      );
    }
  }, [open, task, reset]);

  const onSubmit = async (values: TaskFormValues) => {
    try {
      if (isEditMode && task) {
        const res = await updateTask({ id: task.id, ...values }).unwrap();
        toast.success(res.message);
      } else {
        const res = await createTask({
          title: values.title,
          description: values.description,
          assignedToId: values.assignedToId,
          dueDate: values.dueDate,
        }).unwrap();
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
          <DialogTitle>{isEditMode ? "Edit Task" : "Assign Task"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ADMIN/MANAGER can edit title and description; EMPLOYEE sees them read-only */}
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} disabled={isEditMode && !canManage} />
            {errors.title && <p className="text-xs text-danger">{errors.title.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={3} {...register("description")} disabled={isEditMode && !canManage} />
          </div>

          {!isEditMode && (
            <div className="space-y-1.5">
              <Label>Assign to</Label>
              <Controller
                name="assignedToId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeesRes?.data.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.assignedToId && <p className="text-xs text-danger">{errors.assignedToId.message}</p>}
            </div>
          )}

          {isEditMode && (
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(TASK_STATUS).map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          )}

          {/* ADMIN/MANAGER can also change due date */}
          {(!isEditMode || canManage) && (
            <div className="space-y-1.5">
              <Label htmlFor="dueDate">Due date</Label>
              <Input id="dueDate" type="date" {...register("dueDate")} />
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving…" : isEditMode ? "Save changes" : "Assign task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
