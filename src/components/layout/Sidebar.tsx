import Link from "next/link";
import {
  Home,
  LayoutDashboard,
  Briefcase,
  Sparkles,
  Users,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const system = [{ label: "Settings", href: "/settings", icon: Settings }] as const;

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-3 pt-6 first:pt-2">
      <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">{title}</div>
      <ul className="mt-2 space-y-0.5">{children}</ul>
    </div>
  );
}

function NavLink({
  href,
  label,
  icon: Icon,
  pathname,
  badge,
  prefixMatch,
}: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  pathname: string;
  badge?: number;
  prefixMatch?: string;
}) {
  const active =
    prefixMatch != null
      ? pathname === prefixMatch || pathname.startsWith(`${prefixMatch}/`)
      : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-3 rounded-input px-3 py-2.5 text-sm font-medium transition-colors",
          active
            ? "bg-accent text-white shadow-sm shadow-accent/20"
            : "text-white/70 hover:bg-white/5 hover:text-white",
        )}
      >
        <Icon className={cn("h-[18px] w-[18px] shrink-0", active ? "text-white" : "text-white/50")} />
        <span className="flex-1">{label}</span>
        {badge !== undefined ? (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-success px-1.5 text-[11px] font-bold text-white">
            {badge}
          </span>
        ) : null}
      </Link>
    </li>
  );
}

export function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden h-screen w-[260px] shrink-0 flex-col border-r border-white/10 bg-primary md:flex">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-input bg-accent text-white shadow-sm shadow-accent/30">
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-bold tracking-tight text-white">TalentScreen</div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/45">AI</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto pb-4">
        <NavSection title="Overview">
          <NavLink href={ROUTES.home} label="Home" icon={Home} pathname={pathname} />
          <NavLink href={ROUTES.dashboard} label="Dashboard" icon={LayoutDashboard} pathname={pathname} />
        </NavSection>
        <NavSection title="Pipeline">
          <NavLink href="/jobs/new" label="Jobs" icon={Briefcase} pathname={pathname} prefixMatch="/jobs" />
          <NavLink
            href="/screening/job_001"
            label="Screening"
            icon={Sparkles}
            pathname={pathname}
            prefixMatch="/screening"
            badge={3}
          />
          <NavLink
            href="/candidates/cand_001"
            label="Candidates"
            icon={Users}
            pathname={pathname}
            prefixMatch="/candidates"
          />
        </NavSection>
        <NavSection title="System">
          {system.map((it) => (
            <NavLink key={it.href} {...it} pathname={pathname} />
          ))}
        </NavSection>
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-input bg-white/5 px-3 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
            AR
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">A. Recruiter</div>
            <div className="truncate text-xs text-white/50">HR Recruiter</div>
          </div>
          <Link
            href={ROUTES.login}
            className="shrink-0 rounded-input p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
