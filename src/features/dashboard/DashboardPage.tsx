import { ListChecks, CalendarClock, Clock, Users } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import { useGetTasksQuery } from "@/features/tasks/taskApi";
import { useGetLeavesQuery } from "@/features/leaves/leaveApi";
import { useGetAttendanceQuery } from "@/features/attendance/attendanceApi";
import { useGetEmployeesQuery } from "@/features/employees/employeeApi";
import { ROLES } from "@/lib/types/roles";
import { PageHeader } from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/shared/Skeleton";

function StatCard({
  label,
  value,
  icon: Icon,
  isLoading,
}: {
  label: string;
  value: number | undefined;
  icon: typeof ListChecks;
  isLoading: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
        {isLoading ? <Skeleton className="mt-1 h-6 w-10" /> : <p className="text-xl font-bold">{value ?? 0}</p>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const isPrivileged = user?.role === ROLES.ADMIN || user?.role === ROLES.MANAGER;

  const { data: tasksData, isLoading: tasksLoading } = useGetTasksQuery({ limit: 1 });
  const { data: leavesData, isLoading: leavesLoading } = useGetLeavesQuery(
    isPrivileged ? { limit: 1, status: "PENDING" } : { limit: 1 }
  );
  const { data: attendanceData, isLoading: attendanceLoading } = useGetAttendanceQuery({ limit: 1 });
  const { data: employeesData, isLoading: employeesLoading } = useGetEmployeesQuery(
    { limit: 1 },
    { skip: user?.role !== ROLES.ADMIN }
  );

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? ""}`}
        description="Here's what's happening across the organization today."
      />

      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${user?.role === ROLES.ADMIN ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {user?.role === ROLES.ADMIN && (
          <StatCard label="Employees" value={employeesData?.meta?.total} icon={Users} isLoading={employeesLoading} />
        )}
        <StatCard label="Total Tasks" value={tasksData?.meta?.total} icon={ListChecks} isLoading={tasksLoading} />
        <StatCard
          label={isPrivileged ? "Pending Leave Requests" : "My Leave Requests"}
          value={leavesData?.meta?.total}
          icon={CalendarClock}
          isLoading={leavesLoading}
        />
        <StatCard
          label="Attendance Records"
          value={attendanceData?.meta?.total}
          icon={Clock}
          isLoading={attendanceLoading}
        />
      </div>
    </div>
  );
}
