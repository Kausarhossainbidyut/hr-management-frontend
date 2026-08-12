import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormValues,
  type UpdateUserFormValues,
} from "@/lib/validations/user.validation";
import { useCreateEmployeeMutation, useUpdateEmployeeMutation } from "../employeeApi";
import { useGetDepartmentsQuery } from "@/features/departments/departmentApi";
import { ROLES } from "@/lib/types/roles";
import type { User } from "@/lib/types/models";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: User | null;
};

export function EmployeeFormDialog({ open, onOpenChange, employee }: Props) {
  const isEditMode = Boolean(employee);
  const { data: departmentsRes } = useGetDepartmentsQuery();
  const [createEmployee, { isLoading: isCreating }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema) as never,
  });

  useEffect(() => {
    if (open) {
      reset(
        employee
          ? {
              name: employee.name,
              phone: employee.phone ?? "",
              role: employee.role,
              designation: employee.designation ?? "",
              departmentId: employee.departmentId ?? "",
            }
          : { name: "", email: "", password: "", phone: "", designation: "", departmentId: "" }
      );
    }
  }, [open, employee, reset]);

  const onSubmit = async (values: CreateUserFormValues | UpdateUserFormValues) => {
    try {
      if (isEditMode && employee) {
        const res = await updateEmployee({ id: employee.id, ...values }).unwrap();
        toast.success(res.message);
      } else {
        const res = await createEmployee(values as CreateUserFormValues).unwrap();
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
          <DialogTitle>{isEditMode ? "Edit Employee" : "Add Employee"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
          </div>

          {!isEditMode && (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Temporary password</Label>
                <Input id="password" type="password" {...register("password")} />
                {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" placeholder="e.g. Software Engineer" {...register("designation")} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ROLES.EMPLOYEE}>Employee</SelectItem>
                      <SelectItem value={ROLES.MANAGER}>Manager</SelectItem>
                      <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Department</Label>
              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentsRes?.data.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving…" : isEditMode ? "Save changes" : "Create employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
