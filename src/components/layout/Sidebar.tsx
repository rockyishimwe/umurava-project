import Link from "next/link";
import { LayoutDashboard, Briefcase, Sparkles, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const items = [
  { label: "Dashboard", href: ROUTES.dashboard, icon: LayoutDashboard },
  { label: "Jobs", href: "/jobs/new", icon: Briefcase },
  { label: "Screening", href: "/screening/job_001", icon: Sparkles },
  { label: "Candidates", href: "/candidates/cand_001", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
] as const;

export function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden h-screen w-[240px] shrink-0 border-r border-border bg-card md:block">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-input bg-primary text-white">
          TS
        </div>
        <div className="font-semibold">TalentScreen AI</div>
      </div>

      <nav className="p-3">
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Workspace
        </div>
        <ul className="mt-2 space-y-1">
          {items.map((it) => {
            const active = pathname === it.href || pathname.startsWith(`${it.href}/`);
            const Icon = it.icon;
            return (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className={cn(
                    "flex items-center gap-3 rounded-input px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent/10 text-accent"
                      : "text-text-primary hover:bg-bg hover:text-text-primary",
                  )}
                >
                  <Icon className={cn("h-4 w-4", active ? "text-accent" : "text-text-muted")} />
                  <span>{it.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
  
