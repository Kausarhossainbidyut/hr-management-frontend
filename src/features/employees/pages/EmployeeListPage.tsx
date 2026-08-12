import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from "../employeeApi";
import { EmployeeFormDialog } from "../components/EmployeeFormDialog";
import type { User } from "@/lib/types/models";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Avatar } from "@/components/shared/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LIMIT = 10;

export default function EmployeeListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const { data, isLoading } = useGetEmployeesQuery({ page, limit: LIMIT, search: search || undefined });
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();

  const columns: Column<User>[] = [
    {
      header: "Name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} />
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-muted">{row.email}</p>
          </div>
        </div>
      ),
    },
    { header: "Role", cell: (row) => row.role },
    { header: "Designation", cell: (row) => row.designation ?? "—" },
    { header: "Department", cell: (row) => row.department?.name ?? "—" },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditingEmployee(row);
              setFormOpen(true);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(row)}>
            <Trash2 className="h-4 w-4 text-danger" />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await deleteEmployee(deleteTarget.id).unwrap();
      toast.success(res.message);
      setDeleteTarget(null);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message ?? "Failed to delete employee";
      toast.error(message);
    }
  };

  return (
    <div>
      <PageHeader
        title="Employees"
        description="Manage everyone in your organization."
        action={
          <Button
            onClick={() => {
              setEditingEmployee(null);
              setFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add Employee
          </Button>
        }
      />

      <div className="mb-4 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            className="pl-9"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.data}
        isLoading={isLoading}
        emptyTitle="No employees found"
        emptyDescription="Add your first employee to get started."
        pagination={
          data?.meta
            ? { page: data.meta.page, limit: data.meta.limit, total: data.meta.total, onPageChange: setPage }
            : undefined
        }
      />

      <EmployeeFormDialog open={formOpen} onOpenChange={setFormOpen} employee={editingEmployee} />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete employee?"
        description={`This will remove ${deleteTarget?.name ?? "this employee"} from active records. This can be reversed by an administrator directly in the database if needed.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
