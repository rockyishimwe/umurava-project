"use client";

import Link from "next/link";
import { Search, Bell, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card px-4 sm:px-6">
      <div className="relative hidden min-w-0 flex-1 md:block md:max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          type="search"
          placeholder="Search jobs, candidates, screening…"
          className="h-10 w-full rounded-input border border-border bg-bg py-2 pl-10 pr-16 text-sm text-text-primary outline-none transition-shadow placeholder:text-text-muted focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
          aria-label="Search"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] font-medium text-text-muted sm:inline-block">
          ⌘K
        </kbd>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:flex-initial sm:gap-3">
        <Link href={ROUTES.newJob} className="shrink-0">
          <Button className="h-10 whitespace-nowrap shadow-sm">+ New Job</Button>
        </Link>
        <button
          type="button"
          className="hidden h-10 w-10 items-center justify-center rounded-input border border-border text-text-muted transition-colors hover:bg-bg hover:text-text-primary lg:inline-flex"
          aria-label="Theme"
        >
          <Moon className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="hidden h-10 w-10 items-center justify-center rounded-input border border-border text-text-muted transition-colors hover:bg-bg hover:text-text-primary lg:inline-flex"
          aria-label="Language"
        >
          <Globe className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-input border border-border text-text-muted transition-colors hover:bg-bg hover:text-text-primary"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger ring-2 ring-card" />
        </button>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
          AR
        </div>
      </div>
    </header>
  );
}
