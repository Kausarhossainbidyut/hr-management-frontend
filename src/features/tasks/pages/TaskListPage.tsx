import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useGetTasksQuery, useDeleteTaskMutation } from "../taskApi";
import { TaskFormDialog } from "../components/TaskFormDialog";
import type { Task } from "@/lib/types/models";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/app/hooks";
import { ROLES, TASK_STATUS } from "@/lib/types/roles";
import { formatDate } from "@/lib/utils";

const LIMIT = 10;

export default function TaskListPage() {
  const role = useAppSelector((state) => state.auth.user?.role);
  const canManage = role === ROLES.ADMIN || role === ROLES.MANAGER;

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  const { data, isLoading } = useGetTasksQuery({ page, limit: LIMIT, status });
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const columns: Column<Task>[] = [
    { header: "Title", cell: (row) => <span className="font-medium">{row.title}</span> },
    { header: "Assigned To", cell: (row) => row.assignedTo?.name ?? "—" },
    { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    { header: "Due Date", cell: (row) => formatDate(row.dueDate) },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditingTask(row);
              setFormOpen(true);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          {canManage && (
            <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(row)}>
              <Trash2 className="h-4 w-4 text-danger" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await deleteTask(deleteTarget.id).unwrap();
      toast.success(res.message);
      setDeleteTarget(null);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message ?? "Failed to delete task";
      toast.error(message);
    }
  };

  return (
    <div>
      <PageHeader
        title="Tasks"
        description={canManage ? "Assign and track tasks across your team." : "Tasks assigned to you."}
        action={
          canManage ? (
            <Button
              onClick={() => {
                setEditingTask(null);
                setFormOpen(true);
              }}
            >
              <Plus className="h-4 w-4" /> Assign Task
            </Button>
          ) : undefined
        }
      />

      <div className="mb-4 max-w-xs">
        <Select
          value={status ?? "ALL"}
          onValueChange={(value) => {
            setStatus(value === "ALL" ? undefined : value);
            setPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            {Object.values(TASK_STATUS).map((s) => (
              <SelectItem key={s} value={s}>
                {s.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={data?.data}
        isLoading={isLoading}
        emptyTitle="No tasks found"
        emptyDescription={canManage ? "Assign your first task to get started." : "You have no tasks yet."}
        pagination={
          data?.meta
            ? { page: data.meta.page, limit: data.meta.limit, total: data.meta.total, onPageChange: setPage }
            : undefined
        }
      />

      <TaskFormDialog open={formOpen} onOpenChange={setFormOpen} task={editingTask} />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete task?"
        description={`This will soft-delete "${deleteTarget?.title}" and mark it as cancelled.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
