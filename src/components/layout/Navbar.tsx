import { Badge } from "@/components/ui/Badge";

export function Navbar() {
  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/90 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-input bg-primary text-white">
          TS
        </div>
        <div className="font-semibold">TalentScreen AI</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <div className="text-sm font-semibold text-text-primary">A. Recruiter</div>
          <div className="text-xs text-text-muted">HR Recruiter</div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent font-semibold">
          AR
        </div>
        <Badge variant="info" className="hidden md:inline-flex">
          Hackathon Demo
        </Badge>
      </div>
    </div>
  );
}

