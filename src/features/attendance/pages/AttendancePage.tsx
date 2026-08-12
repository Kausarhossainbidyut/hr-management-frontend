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
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/hooks";
import { ROLES } from "@/lib/types/roles";
import { formatDate, formatDateTime } from "@/lib/utils";

const LIMIT = 10;

export default function AttendancePage() {
  const role = useAppSelector((state) => state.auth.user?.role);
  const isAdmin = role === ROLES.ADMIN;

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAttendanceQuery({ page, limit: LIMIT });
  const [checkIn, { isLoading: isCheckingIn }] = useCheckInMutation();
  const [checkOut, { isLoading: isCheckingOut }] = useCheckOutMutation();
  const [deleteAttendance] = useDeleteAttendanceMutation();

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

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteAttendance(id).unwrap();
      toast.success(res.message);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message ?? "Failed to delete record";
      toast.error(message);
    }
  };

  const columns: Column<Attendance>[] = [
    ...(isAdmin ? [{ header: "Employee", cell: (row: Attendance) => row.user?.name ?? "—" } as Column<Attendance>] : []),
    { header: "Date", cell: (row) => formatDate(row.date) },
    { header: "Check In", cell: (row) => formatDateTime(row.checkIn) },
    { header: "Check Out", cell: (row) => formatDateTime(row.checkOut) },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    ...(isAdmin
      ? [
          {
            header: "Actions",
            cell: (row: Attendance) => (
              <Button variant="ghost" size="icon" onClick={() => handleDelete(row.id)}>
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
    </div>
  );
}
