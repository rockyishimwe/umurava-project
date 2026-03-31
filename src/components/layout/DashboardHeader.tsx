"use client";

import Link from "next/link";
import { Search, Bell, Moon, Sun, Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ROUTES } from "@/lib/constants";

export function DashboardHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <div className="relative hidden min-w-0 flex-1 md:block md:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="search"
            placeholder="Search jobs, candidates..."
            className="h-9 w-full rounded-lg border border-border bg-bg py-2 pl-9 pr-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href={ROUTES.newJob}>
          <Button size="sm" className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            New Job
          </Button>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:bg-bg hover:text-text-primary lg:inline-flex"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>

        <button
          type="button"
          className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:bg-bg hover:text-text-primary lg:inline-flex"
          aria-label="Language"
        >
          <Globe className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:bg-bg hover:text-text-primary"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-danger text-[10px] font-bold text-white ring-2 ring-card flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent ring-2 ring-accent/20">
          AR
        </div>
      </div>
    </header>
  );
}
