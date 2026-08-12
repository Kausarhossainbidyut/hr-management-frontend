import { useState } from "react";
import { Plus, Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useGetLeavesQuery, useUpdateLeaveStatusMutation, useDeleteLeaveMutation } from "../leaveApi";
import { ApplyLeaveDialog } from "../components/ApplyLeaveDialog";
import type { Leave } from "@/lib/types/models";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/hooks";
import { ROLES, LEAVE_STATUS } from "@/lib/types/roles";
import { formatDate } from "@/lib/utils";

const LIMIT = 10;

export default function LeaveListPage() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const role = currentUser?.role;
  const canReview = role === ROLES.ADMIN || role === ROLES.MANAGER;

  const [page, setPage] = useState(1);
  const [applyOpen, setApplyOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Leave | null>(null);

  const { data, isLoading } = useGetLeavesQuery({ page, limit: LIMIT });
  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateLeaveStatusMutation();
  const [deleteLeave, { isLoading: isDeleting }] = useDeleteLeaveMutation();

  const handleReview = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      const res = await updateStatus({ id, status }).unwrap();
      toast.success(res.message);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message ?? "Failed to update leave request";
      toast.error(message);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await deleteLeave(deleteTarget.id).unwrap();
      toast.success(res.message);
      setDeleteTarget(null);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message ?? "Failed to delete leave request";
      toast.error(message);
    }
  };

  const columns: Column<Leave>[] = [
    ...(canReview
      ? [{ header: "Employee", cell: (row: Leave) => row.user?.name ?? "—" } as Column<Leave>]
      : []),
    { header: "Reason", cell: (row) => <span className="line-clamp-1 max-w-xs">{row.reason}</span> },
    { header: "From", cell: (row) => formatDate(row.fromDate) },
    { header: "To", cell: (row) => formatDate(row.toDate) },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-1">
          {canReview && row.status === LEAVE_STATUS.PENDING && row.userId !== currentUser?.id && (
            <>
              <Button
                variant="ghost"
                size="icon"
                disabled={isUpdatingStatus}
                onClick={() => handleReview(row.id, "APPROVED")}
                title="Approve"
              >
                <Check className="h-4 w-4 text-success" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={isUpdatingStatus}
                onClick={() => handleReview(row.id, "REJECTED")}
                title="Reject"
              >
                <X className="h-4 w-4 text-danger" />
              </Button>
            </>
          )}
          {/* ADMIN/MANAGER can delete any leave; EMPLOYEE can only withdraw their own PENDING request */}
          {(canReview ||
            (row.userId === currentUser?.id && row.status === LEAVE_STATUS.PENDING)) && (
            <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(row)} title="Delete">
              <Trash2 className="h-4 w-4 text-danger" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Leave Requests"
        description={canReview ? "Review and manage leave requests." : "Your leave request history."}
        action={
          <Button onClick={() => setApplyOpen(true)}>
            <Plus className="h-4 w-4" /> Apply for Leave
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={data?.data}
        isLoading={isLoading}
        emptyTitle="No leave requests found"
        pagination={
          data?.meta
            ? { page: data.meta.page, limit: data.meta.limit, total: data.meta.total, onPageChange: setPage }
            : undefined
        }
      />

      <ApplyLeaveDialog open={applyOpen} onOpenChange={setApplyOpen} />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete leave request?"
        description={
          deleteTarget?.userId === currentUser?.id
            ? "This will withdraw your leave request. This action cannot be undone."
            : `This will delete the leave request from "${deleteTarget?.user?.name ?? "this employee"}".`
        }
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
