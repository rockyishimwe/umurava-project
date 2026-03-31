"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Enter email and password.");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      toast.success("Signed in (demo — no backend).");
      router.push(ROUTES.dashboard);
    }, 600);
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage jobs, screening, and shortlists."
      footer={
        <>
          Don’t have an account?{" "}
          <Link href={ROUTES.register} className="font-semibold text-accent hover:text-accent-hover">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-text-primary">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-11 w-full rounded-input border border-border bg-white px-3 text-sm outline-none transition-shadow placeholder:text-text-muted focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-text-primary">
              Password
            </label>
            <button
              type="button"
              className="text-xs font-semibold text-accent hover:text-accent-hover"
              onClick={() => toast("Password reset is not wired in the demo.", { icon: "ℹ️" })}
            >
              Forgot password?
            </button>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 h-11 w-full rounded-input border border-border bg-white px-3 text-sm outline-none transition-shadow placeholder:text-text-muted focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
            placeholder="••••••••"
          />
        </div>
        <Button type="submit" className="h-11 w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>
        <p className="text-center text-xs text-text-muted">
          Demo mode: any valid-looking email + password continues to the app.
        </p>
      </form>
    </AuthShell>
  );
}
