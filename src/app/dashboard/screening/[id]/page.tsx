"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Filter, Upload, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SkillTag } from "@/components/ui/SkillTag";
import { Skeleton } from "@/components/ui/Skeleton";
import { initials } from "@/lib/utils";
import { mockCandidates } from "@/lib/mockData";

type Tab = "umurava" | "external";

export default function ScreeningIngestionPage() {
  const params = useParams<{ id: string }>();
  const jobId = params?.id ?? "job_001";
  const [tab, setTab] = useState<Tab>("umurava");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return mockCandidates;
    return mockCandidates.filter((c) => {
      return (
        c.name.toLowerCase().includes(query) ||
        c.currentTitle.toLowerCase().includes(query) ||
        c.skills.technical.some((s) => s.toLowerCase().includes(query))
      );
    });
  }, [q]);

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  const loading = false;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <PageHeader
        title="Applicant Ingestion"
        subtitle="Select candidates from Umurava profiles or upload external resumes."
        backHref="/dashboard"
        right={
          <div className="rounded-badge border border-border bg-bg px-3 py-1 text-xs font-semibold text-text-muted">
            Job: {jobId}
          </div>
        }
      />

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <button
          className={[
            "rounded-badge border px-4 py-2 text-sm font-semibold",
            tab === "umurava" ? "border-accent bg-accent/10 text-accent" : "border-border bg-white text-text-muted",
          ].join(" ")}
          onClick={() => setTab("umurava")}
          type="button"
        >
          Umurava Platform Profiles
        </button>
        <button
          className={[
            "rounded-badge border px-4 py-2 text-sm font-semibold",
            tab === "external" ? "border-accent bg-accent/10 text-accent" : "border-border bg-white text-text-muted",
          ].join(" ")}
          onClick={() => setTab("external")}
          type="button"
        >
          External Upload
        </button>
      </div>

      {tab === "umurava" ? (
        <div className="mt-6">
          <Card className="p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="h-10 w-full rounded-input border border-border bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                  placeholder="Search name, title, or skills…"
                />
              </div>
              <button
                className="inline-flex h-10 items-center gap-2 rounded-input border border-border bg-white px-3 text-sm font-semibold text-text-muted hover:bg-bg"
                type="button"
              >
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
          </Card>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="p-5">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="mt-3 h-4 w-40" />
                    <Skeleton className="mt-2 h-3 w-28" />
                    <div className="mt-4 flex gap-2">
                      <Skeleton className="h-6 w-16 rounded-badge" />
                      <Skeleton className="h-6 w-20 rounded-badge" />
                      <Skeleton className="h-6 w-14 rounded-badge" />
                    </div>
                  </Card>
                ))
              : filtered.map((c) => {
                  const isSelected = selected.includes(c.id);
                  return (
                    <motion.button
                      key={c.id}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      onClick={() => toggle(c.id)}
                      className={[
                        "text-left rounded-card border bg-card p-5 shadow-card",
                        isSelected ? "border-accent ring-2 ring-accent/15" : "border-border",
                      ].join(" ")}
                      type="button"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent font-bold">
                            {initials(c.name)}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold">{c.name}</div>
                            <div className="truncate text-xs text-text-muted">{c.currentTitle}</div>
                          </div>
                        </div>
                        {isSelected ? <CheckCircle2 className="h-5 w-5 text-accent" /> : null}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {c.skills.technical.slice(0, 3).map((s) => (
                          <SkillTag key={s}>{s}</SkillTag>
                        ))}
                      </div>
                    </motion.button>
                  );
                })}
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <Card className="p-6">
            <div className="rounded-card border-2 border-dashed border-border bg-bg p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Upload className="h-6 w-6" />
              </div>
              <div className="mt-3 text-sm font-semibold">Drop CSV, Excel or PDF resumes here</div>
              <div className="mt-1 text-sm text-text-muted">Supported: .csv, .xlsx, .pdf</div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => toast.success("Upload simulated (mock).")}
                  type="button"
                >
                  Choose Files
                </Button>
              </div>
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">or</div>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div>
              <label className="text-sm font-semibold">Paste resume links</label>
              <textarea
                className="mt-2 min-h-[110px] w-full rounded-input border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="https://…"
              />
            </div>
          </Card>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/95 backdrop-blur md:left-[240px]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 p-4">
          <div className="text-sm text-text-muted">
            <span className="font-semibold text-text-primary">{selected.length}</span> candidates selected
          </div>
          <Button
            onClick={() => {
              if (selected.length === 0) {
                toast.error("Select at least 1 candidate.");
                return;
              }
              toast.success("Starting AI screening (mock)...");
              window.location.href = `/dashboard/screening/${jobId}/progress`;
            }}
          >
            Run AI Screening →
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
