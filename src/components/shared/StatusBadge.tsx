import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  APPROVED: "bg-green-100 text-green-800",
  PRESENT: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  REJECTED: "bg-red-100 text-red-800",
  ABSENT: "bg-red-100 text-red-800",
  LATE: "bg-slate-200 text-slate-800",
  ON_LEAVE: "bg-slate-200 text-slate-800",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        STATUS_STYLES[status] ?? "bg-slate-100 text-slate-700"
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}
