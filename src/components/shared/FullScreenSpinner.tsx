import { Loader2 } from "lucide-react";

export function FullScreenSpinner({ label = "Loading…" }: { label?: string }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-muted">{label}</p>
        </div>
    );
}