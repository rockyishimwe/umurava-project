"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/constants";

export function Navbar() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    toast.success("Signed out successfully");
    router.push(ROUTES.login);
    setShowDropdown(false);
  };

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/90 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-input bg-primary text-white font-bold">
          TS
        </div>
        <div className="font-semibold text-text-primary">RankWise</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <div className="text-sm font-semibold text-text-primary">A. Recruiter</div>
          <div className="text-xs text-text-muted">HR Recruiter</div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent font-semibold hover:bg-accent/25 transition-colors cursor-pointer"
            aria-label="User menu"
          >
            AR
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-card border border-border bg-card shadow-modal py-2 z-50">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-bg transition-colors"
              >
                <LogOut className="h-4 w-4 text-danger" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
        <Badge variant="info" className="hidden md:inline-flex">
          Hackathon Demo
        </Badge>
      </div>
    </div>
  );
}

