"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [busy, setBusy] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      if (!value.trim()) {
        setErrors(prev => ({ ...prev, email: "Email is required" }));
      } else if (!isValidEmail(value)) {
        setErrors(prev => ({ ...prev, email: "Please enter a valid email" }));
      } else {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      if (!value) {
        setErrors(prev => ({ ...prev, password: "Password is required" }));
      } else if (value.length < 6) {
        setErrors(prev => ({ ...prev, password: "Password must be at least 6 characters" }));
      } else {
        setErrors(prev => ({ ...prev, password: undefined }));
      }
    }
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) {
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
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`mt-2 h-11 w-full rounded-input border bg-white px-3 text-sm outline-none transition-all placeholder:text-text-muted focus:ring-2 ${
              errors.email && touched.email
                ? "border-danger focus:border-danger focus:ring-danger/20"
                : "border-border focus:border-accent/40 focus:ring-accent/20"
            }`}
            placeholder="you@company.com"
          />
          {errors.email && touched.email && (
            <p className="mt-1.5 text-xs font-medium text-danger">{errors.email}</p>
          )}
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
            onChange={(e) => handlePasswordChange(e.target.value)}
            onBlur={() => handleBlur("password")}
            className={`mt-2 h-11 w-full rounded-input border bg-white px-3 text-sm outline-none transition-all placeholder:text-text-muted focus:ring-2 ${
              errors.password && touched.password
                ? "border-danger focus:border-danger focus:ring-danger/20"
                : "border-border focus:border-accent/40 focus:ring-accent/20"
            }`}
            placeholder="••••••••"
          />
          {errors.password && touched.password && (
            <p className="mt-1.5 text-xs font-medium text-danger">{errors.password}</p>
          )}
        </div>
        <Button type="submit" className="h-11 w-full" disabled={busy || Object.keys(errors).length > 0}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>
        <p className="text-center text-xs text-text-muted">
          Demo: Use any valid email and 6+ character password.
        </p>
      </form>
    </AuthShell>
  );
}
