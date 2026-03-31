"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      toast.error("Fill in name, email, and password.");
      return;
    }
    if (password.length < 8) {
      toast.error("Use at least 8 characters for the password.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      toast.success("Account created (demo — no backend).");
      router.push(ROUTES.dashboard);
    }, 700);
  }

  return (
    <AuthShell
      title="Create your workspace"
      subtitle="Start posting roles and running AI screening in minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link href={ROUTES.login} className="font-semibold text-accent hover:text-accent-hover">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-text-primary">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 h-11 w-full rounded-input border border-border bg-white px-3 text-sm outline-none transition-shadow placeholder:text-text-muted focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
            placeholder="Alex Recruiter"
          />
        </div>
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
          <label htmlFor="password" className="text-sm font-semibold text-text-primary">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 h-11 w-full rounded-input border border-border bg-white px-3 text-sm outline-none transition-shadow placeholder:text-text-muted focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
            placeholder="At least 8 characters"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="text-sm font-semibold text-text-primary">
            Confirm password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-2 h-11 w-full rounded-input border border-border bg-white px-3 text-sm outline-none transition-shadow placeholder:text-text-muted focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
            placeholder="Repeat password"
          />
        </div>
        <label className="flex items-start gap-3 text-sm text-text-muted">
          <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-border text-accent" />
          <span>
            I agree to the{" "}
            <button type="button" className="font-semibold text-accent hover:text-accent-hover" onClick={() => toast("Terms are placeholder in the demo.")}>
              Terms
            </button>{" "}
            and{" "}
            <button type="button" className="font-semibold text-accent hover:text-accent-hover" onClick={() => toast("Privacy policy is placeholder in the demo.")}>
              Privacy Policy
            </button>
            .
          </span>
        </label>
        <Button type="submit" className="h-11 w-full" disabled={busy}>
          {busy ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
