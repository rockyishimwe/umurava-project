import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-card border border-border bg-card shadow-card", className)}>
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  title,
  subtitle,
  right,
}: {
  className?: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 p-5", className)}>
      <div className="min-w-0">
        <div className="truncate text-base font-semibold text-text-primary">{title}</div>
        {subtitle ? <div className="mt-1 text-sm text-text-muted">{subtitle}</div> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("px-5 pb-5", className)}>{children}</div>;
}

