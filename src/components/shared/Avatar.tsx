import { getInitials, cn } from "@/lib/utils";

export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-white",
        className
      )}
    >
      {getInitials(name) || "?"}
    </div>
  );
}
