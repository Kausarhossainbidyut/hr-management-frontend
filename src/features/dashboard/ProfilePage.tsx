import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/lib/validations/auth.validation";
import { useChangePasswordMutation } from "@/features/auth/authApi";
import { useAppSelector } from "@/app/hooks";
import { PageHeader } from "@/components/shared/PageHeader";
import { Avatar } from "@/components/shared/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({ resolver: zodResolver(changePasswordSchema) });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    try {
      const res = await changePassword(values).unwrap();
      toast.success(res.message);
      reset();
    } catch (err) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ?? "Failed to change password";
      toast.error(message);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl">
      <PageHeader title="My Profile" description="View your account details and update your password." />

      <div className="mb-6 flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-6">
        <Avatar name={user.name} className="h-14 w-14 text-lg" />
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-muted">{user.email}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-primary-light">{user.role}</p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-primary">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="oldPassword">Current password</Label>
            <Input id="oldPassword" type="password" {...register("oldPassword")} />
            {errors.oldPassword && <p className="text-xs text-danger">{errors.oldPassword.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">New password</Label>
            <Input id="newPassword" type="password" {...register("newPassword")} />
            {errors.newPassword && <p className="text-xs text-danger">{errors.newPassword.message}</p>}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating…" : "Update password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
