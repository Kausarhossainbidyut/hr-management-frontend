import { useState } from "react";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { useGetDepartmentsQuery, useDeleteDepartmentMutation } from "../departmentApi";
import { DepartmentFormDialog } from "../components/DepartmentFormDialog";
import type { Department } from "@/lib/types/models";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/hooks";
import { ROLES } from "@/lib/types/roles";

export default function DepartmentListPage() {
  const role = useAppSelector((state) => state.auth.user?.role);
  const isAdmin = role === ROLES.ADMIN;

  const [formOpen, setFormOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Department | null>(null);

  const { data, isLoading } = useGetDepartmentsQuery();
  const [deleteDepartment, { isLoading: isDeleting }] = useDeleteDepartmentMutation();

  const columns: Column<Department>[] = [
    { header: "Name", cell: (row) => <span className="font-medium">{row.name}</span> },
    { header: "Description", cell: (row) => row.description ?? "—" },
    {
      header: "Employees",
      cell: (row) => (
        <span className="inline-flex items-center gap-1 text-sm">
          <Users className="h-3.5 w-3.5 text-muted" /> {row._count?.employees ?? 0}
        </span>
      ),
    },
    ...(isAdmin
      ? [
          {
            header: "Actions",
            cell: (row: Department) => (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingDepartment(row);
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
          } as Column<Department>,
        ]
      : []),
  ];

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await deleteDepartment(deleteTarget.id).unwrap();
      toast.success(res.message);
      setDeleteTarget(null);
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message ?? "Failed to delete department";
      toast.error(message);
    }
  };

  return (
    <div>
      <PageHeader
        title="Departments"
        description="Organize employees into departments."
        action={
          isAdmin ? (
            <Button
              onClick={() => {
                setEditingDepartment(null);
                setFormOpen(true);
              }}
            >
              <Plus className="h-4 w-4" /> Add Department
            </Button>
          ) : undefined
        }
      />

      <DataTable
        columns={columns}
        data={data?.data}
        isLoading={isLoading}
        emptyTitle="No departments found"
        emptyDescription="Create your first department to start organizing employees."
      />

      <DepartmentFormDialog open={formOpen} onOpenChange={setFormOpen} department={editingDepartment} />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete department?"
        description={`This will soft-delete "${deleteTarget?.name}". Employees assigned to it will remain unaffected.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
