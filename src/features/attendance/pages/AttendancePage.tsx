import { useState } from "react";
import { LogIn, LogOut, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetAttendanceQuery,
  useCheckInMutation,
  useCheckOutMutation,
  useDeleteAttendanceMutation,
} from "../attendanceApi";
import type { Attendance } from "@/lib/types/models";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/app/hooks";
import { ROLES } from "@/lib/types/roles";
import { formatDate, formatDateTime } from "@/lib/utils";
import { useGetEmployeesQuery } from "@/features/employees/employeeApi";

const LIMIT = 10;

export default function AttendancePage() {
  const role = useAppSelector((state) => state.auth.user?.role);
  const isAdmin = role === ROLES.ADMIN;
  const isPrivileged = role === ROLES.ADMIN || role === ROLES.MANAGER;

  const [page, setPage] = useState(1);
  const [filterUserId, setFilterUserId] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<Attendance | null>(null);

  // Fetch employee list for the filter dropdown (privileged only)
  const { data: employeesRes } = useGetEmployeesQuery(
    { limit: 200 },
    { skip: !isPrivileged },
  );

  const { data, isLoading } = useGetAttendanceQuery({
    page,
    limit: LIMIT,
    ...(isPrivileged && filterUserId ? { userId: filterUserId } : {}),
  });
  const [checkIn, { isLoading: isCheckingIn }] = useCheckInMutation();
  const [checkOut, { isLoading: isCheckingOut }] = useCheckOutMutation();
  const [deleteAttendance, { isLoading: isDeleting }] = useDeleteAttendanceMutation();

  const handleCheckIn = async () => {
    try {
      const res = await checkIn().unwrap();
      toast.success(res.message);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message ?? "Check-in failed";
      toast.error(message);
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await checkOut().unwrap();
      toast.success(res.message);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message ?? "Check-out failed";
      toast.error(message);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await deleteAttendance(deleteTarget.id).unwrap();
      toast.success(res.message);
      setDeleteTarget(null);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message ?? "Failed to delete record";
      toast.error(message);
    }
  };

  const columns: Column<Attendance>[] = [
    ...(isPrivileged ? [{ header: "Employee", cell: (row: Attendance) => row.user?.name ?? "—" } as Column<Attendance>] : []),
    { header: "Date", cell: (row) => formatDate(row.date) },
    { header: "Check In", cell: (row) => formatDateTime(row.checkIn) },
    { header: "Check Out", cell: (row) => formatDateTime(row.checkOut) },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    ...(isAdmin
      ? [
          {
            header: "Actions",
            cell: (row: Attendance) => (
              <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(row)}>
                <Trash2 className="h-4 w-4 text-danger" />
              </Button>
            ),
          } as Column<Attendance>,
        ]
      : []),
  ];

  return (
    <div>
      <PageHeader
        title="Attendance"
        description="Track daily check-in and check-out records."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCheckIn} disabled={isCheckingIn}>
              <LogIn className="h-4 w-4" /> Check In
            </Button>
            <Button onClick={handleCheckOut} disabled={isCheckingOut}>
              <LogOut className="h-4 w-4" /> Check Out
            </Button>
          </div>
        }
      />

      {/* Employee filter — only visible to Admin/Manager */}
      {isPrivileged && (
        <div className="mb-4 max-w-xs">
          <Select
            value={filterUserId ?? "ALL"}
            onValueChange={(value) => {
              setFilterUserId(value === "ALL" ? undefined : value);
              setPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All employees</SelectItem>
              {employeesRes?.data.map((emp) => (
                <SelectItem key={emp.id} value={emp.id}>
                  {emp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <DataTable
        columns={columns}
        data={data?.data}
        isLoading={isLoading}
        emptyTitle="No attendance records found"
        pagination={
          data?.meta
            ? { page: data.meta.page, limit: data.meta.limit, total: data.meta.total, onPageChange: setPage }
            : undefined
        }
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete attendance record?"
        description={`This will permanently remove the attendance record for "${deleteTarget?.user?.name ?? "this employee"}" on ${deleteTarget ? formatDate(deleteTarget.date) : ""}.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
