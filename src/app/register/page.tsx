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

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; password?: boolean; confirm?: boolean }>({});
  const [busy, setBusy] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!confirm) {
      newErrors.confirm = "Please confirm your password";
    } else if (password !== confirm) {
      newErrors.confirm = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && agreeToTerms;
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (touched.name) {
      if (!value.trim()) {
        setErrors(prev => ({ ...prev, name: "Full name is required" }));
      } else if (value.trim().length < 2) {
        setErrors(prev => ({ ...prev, name: "Name must be at least 2 characters" }));
      } else {
        setErrors(prev => ({ ...prev, name: undefined }));
      }
    }
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
      } else if (value.length < 8) {
        setErrors(prev => ({ ...prev, password: "Password must be at least 8 characters" }));
      } else {
        setErrors(prev => ({ ...prev, password: undefined }));
      }
    }
  };

  const handleConfirmChange = (value: string) => {
    setConfirm(value);
    if (touched.confirm) {
      if (!value) {
        setErrors(prev => ({ ...prev, confirm: "Please confirm your password" }));
      } else if (password !== value) {
        setErrors(prev => ({ ...prev, confirm: "Passwords do not match" }));
      } else {
        setErrors(prev => ({ ...prev, confirm: undefined }));
      }
    }
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) {
      if (!agreeToTerms) {
        toast.error("Please agree to the terms and privacy policy");
      }
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
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={() => handleBlur("name")}
            className={`mt-2 h-11 w-full rounded-input border bg-white px-3 text-sm outline-none transition-all placeholder:text-text-muted focus:ring-2 ${
              errors.name && touched.name
                ? "border-danger focus:border-danger focus:ring-danger/20"
                : "border-border focus:border-accent/40 focus:ring-accent/20"
            }`}
            placeholder="Alex Recruiter"
          />
          {errors.name && touched.name && (
            <p className="mt-1.5 text-xs font-medium text-danger">{errors.name}</p>
          )}
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
          <label htmlFor="password" className="text-sm font-semibold text-text-primary">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            onBlur={() => handleBlur("password")}
            className={`mt-2 h-11 w-full rounded-input border bg-white px-3 text-sm outline-none transition-all placeholder:text-text-muted focus:ring-2 ${
              errors.password && touched.password
                ? "border-danger focus:border-danger focus:ring-danger/20"
                : "border-border focus:border-accent/40 focus:ring-accent/20"
            }`}
            placeholder="At least 8 characters"
          />
          {errors.password && touched.password && (
            <p className="mt-1.5 text-xs font-medium text-danger">{errors.password}</p>
          )}
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
            onChange={(e) => handleConfirmChange(e.target.value)}
            onBlur={() => handleBlur("confirm")}
            className={`mt-2 h-11 w-full rounded-input border bg-white px-3 text-sm outline-none transition-all placeholder:text-text-muted focus:ring-2 ${
              errors.confirm && touched.confirm
                ? "border-danger focus:border-danger focus:ring-danger/20"
                : "border-border focus:border-accent/40 focus:ring-accent/20"
            }`}
            placeholder="Repeat password"
          />
          {errors.confirm && touched.confirm && (
            <p className="mt-1.5 text-xs font-medium text-danger">{errors.confirm}</p>
          )}
        </div>
        <label className={`flex items-start gap-3 text-sm transition-colors ${
          !agreeToTerms ? "text-danger" : "text-text-muted"
        }`}>
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border text-accent cursor-pointer"
          />
          <span>
            I agree to the{" "}
            <button
              type="button"
              className="font-semibold text-accent hover:text-accent-hover"
              onClick={() => toast("Terms are placeholder in the demo.")}
            >
              Terms
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="font-semibold text-accent hover:text-accent-hover"
              onClick={() => toast("Privacy policy is placeholder in the demo.")}
            >
              Privacy Policy
            </button>
            .
          </span>
        </label>
        <Button
          type="submit"
          className="h-11 w-full"
          disabled={busy || Object.keys(errors).length > 0 || !agreeToTerms}
        >
          {busy ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
