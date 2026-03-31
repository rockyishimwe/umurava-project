import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.18),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 sm:px-6">
        {/* Back Button */}
        <Link
          href={ROUTES.home}
          className="mb-6 inline-flex items-center gap-2 w-fit text-text-muted hover:text-accent transition-colors rounded-input p-2 hover:bg-bg"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Back to home</span>
        </Link>

        <div className="mb-8 text-center">
          <Link
            href={ROUTES.home}
            className="inline-flex items-center justify-center gap-2 rounded-input border border-border bg-card px-3 py-2 text-sm font-semibold text-text-primary shadow-card transition-colors hover:border-accent/30 hover:bg-bg"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-input bg-accent text-white shadow-sm">
              <Zap className="h-4 w-4" />
            </span>
            RankWise
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-text-primary">{title}</h1>
          <p className="mt-2 text-sm text-text-muted">{subtitle}</p>
        </div>

        <div className="rounded-card border border-border bg-card p-6 shadow-card sm:p-8">{children}</div>

        {footer ? <div className="mt-6 text-center text-sm text-text-muted">{footer}</div> : null}
      </div>
    </div>
  );
}
