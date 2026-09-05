import { Loader2 } from "lucide-react";

export function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-accent" />
      <p className="text-sm text-ink-500">{message}</p>
    </div>
  );
}
