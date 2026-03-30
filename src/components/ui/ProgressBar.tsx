import { cn, clamp } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const v = clamp(value, 0, 100);
  return (
    <div className={cn("h-2 w-full rounded-full bg-border/60", className)}>
      <div className="h-2 rounded-full bg-accent" style={{ width: `${v}%` }} />
    </div>
  );
}

