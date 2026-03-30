"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Job } from "@/types";

type Step = 1 | 2 | 3 | 4;

function Stepper({ step }: { step: Step }) {
  const steps: Array<{ n: Step; label: string }> = [
    { n: 1, label: "Basic Info" },
    { n: 2, label: "Job Description" },
    { n: 3, label: "AI Criteria" },
    { n: 4, label: "Review & Launch" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((s) => {
        const active = s.n === step;
        const done = s.n < step;
        return (
          <div key={s.n} className="flex items-center gap-3">
            <div
              className={[
                "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold",
                done ? "border-accent bg-accent text-white" : active ? "border-accent text-accent" : "border-border text-text-muted",
              ].join(" ")}
            >
              {s.n}
            </div>
            <div className={active ? "text-sm font-semibold text-text-primary" : "text-sm text-text-muted"}>
              {s.label}
            </div>
            {s.n !== 4 ? <div className="h-px w-10 bg-border" /> : null}
          </div>
        );
      })}
    </div>
  );
}

export default function NewJobPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<Job>(() => ({
    id: "job_new",
    title: "",
    department: "",
    location: "",
    employmentType: "Full-time",
    experienceLevel: "Mid",
    salaryMin: undefined,
    salaryMax: undefined,
    description: "",
    responsibilities: "",
    qualifications: "",
    aiCriteria: {
      mustHaveSkills: "",
      niceToHaveSkills: "",
      screeningQuestions: "",
      dealBreakers: "",
      shortlistSize: 10,
    },
    status: "Draft",
    applicantsCount: 0,
    shortlistedCount: 0,
    updatedAtISO: new Date().toISOString(),
  }));

  const summary = useMemo(
    () => [
      { k: "Job Title", v: form.title || "—" },
      { k: "Department", v: form.department || "—" },
      { k: "Location", v: form.location || "—" },
      { k: "Employment", v: `${form.employmentType} • ${form.experienceLevel}` },
      {
        k: "Salary Range",
        v: form.salaryMin || form.salaryMax ? `${form.salaryMin ?? "—"} - ${form.salaryMax ?? "—"}` : "—",
      },
      { k: "Description", v: form.description ? `${form.description.slice(0, 120)}${form.description.length > 120 ? "…" : ""}` : "—" },
      { k: "Must-Have Skills", v: form.aiCriteria.mustHaveSkills || "—" },
      { k: "Nice-to-Have", v: form.aiCriteria.niceToHaveSkills || "—" },
      { k: "Shortlist Size", v: `Top ${form.aiCriteria.shortlistSize}` },
    ],
    [form],
  );

  function next() {
    if (step === 1 && !form.title.trim()) {
      toast.error("Job title is required.");
      return;
    }
    setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  }

  function back() {
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <PageHeader title="Create New Job" subtitle="A multi-step flow to launch AI screening-ready roles." />

      <div className="mt-6">
        <Card className="p-5">
          <Stepper step={step} />
        </Card>
      </div>

      <div className="mt-6">
        {step === 1 ? (
          <Card>
            <CardHeader title="Step 1 — Basic Information" subtitle="Define the role and logistics." />
            <CardBody>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-semibold">Job Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="mt-2 h-10 w-full rounded-input border border-border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                    placeholder="Senior Full Stack Engineer"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold">Department</label>
                    <input
                      value={form.department}
                      onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                      className="mt-2 h-10 w-full rounded-input border border-border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="Engineering"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Location</label>
                    <input
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      className="mt-2 h-10 w-full rounded-input border border-border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="Kigali (Hybrid)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold">Employment Type</label>
                    <select
                      value={form.employmentType}
                      onChange={(e) => setForm((f) => ({ ...f, employmentType: e.target.value }))}
                      className="mt-2 h-10 w-full rounded-input border border-border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Experience Level</label>
                    <select
                      value={form.experienceLevel}
                      onChange={(e) => setForm((f) => ({ ...f, experienceLevel: e.target.value }))}
                      className="mt-2 h-10 w-full rounded-input border border-border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                    >
                      <option>Junior</option>
                      <option>Mid</option>
                      <option>Senior</option>
                      <option>Lead</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold">Salary Min (optional)</label>
                    <input
                      value={form.salaryMin ?? ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, salaryMin: e.target.value ? Number(e.target.value) : undefined }))
                      }
                      type="number"
                      className="mt-2 h-10 w-full rounded-input border border-border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="45000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Salary Max (optional)</label>
                    <input
                      value={form.salaryMax ?? ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, salaryMax: e.target.value ? Number(e.target.value) : undefined }))
                      }
                      type="number"
                      className="mt-2 h-10 w-full rounded-input border border-border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="70000"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button variant="outline" disabled>
                  Back
                </Button>
                <Button onClick={next}>Next</Button>
              </div>
            </CardBody>
          </Card>
        ) : null}

        {step === 2 ? (
          <Card>
            <CardHeader title="Step 2 — Job Description" subtitle="Write the role narrative candidates will see." />
            <CardBody>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="mt-2 min-h-[120px] w-full rounded-input border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                    placeholder="Describe the mission, impact, and scope…"
                  />
                  <div className="mt-1 text-xs text-text-muted">{form.description.length} characters</div>
                </div>
                <div>
                  <label className="text-sm font-semibold">Responsibilities</label>
                  <textarea
                    value={form.responsibilities}
                    onChange={(e) => setForm((f) => ({ ...f, responsibilities: e.target.value }))}
                    className="mt-2 min-h-[110px] w-full rounded-input border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                    placeholder="What will they own day-to-day?"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Qualifications</label>
                  <textarea
                    value={form.qualifications}
                    onChange={(e) => setForm((f) => ({ ...f, qualifications: e.target.value }))}
                    className="mt-2 min-h-[110px] w-full rounded-input border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                    placeholder="Must-have experience, mindset, and skills…"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button variant="outline" onClick={back}>
                  Back
                </Button>
                <Button onClick={next}>Next</Button>
              </div>
            </CardBody>
          </Card>
        ) : null}

        {step === 3 ? (
          <Card className="overflow-hidden">
            <div className="bg-accent/8 p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <div className="text-base font-semibold">AI Screening Criteria</div>
              </div>
              <div className="mt-1 text-sm text-text-muted">
                Define what “great” means so the model can score consistently.
              </div>
            </div>
            <CardBody>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-semibold">Must-Have Skills</label>
                  <textarea
                    value={form.aiCriteria.mustHaveSkills}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, aiCriteria: { ...f.aiCriteria, mustHaveSkills: e.target.value } }))
                    }
                    className="mt-2 min-h-[90px] w-full rounded-input border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                    placeholder="TypeScript, React, Node.js, SQL…"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Nice-to-Have Skills</label>
                  <textarea
                    value={form.aiCriteria.niceToHaveSkills}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, aiCriteria: { ...f.aiCriteria, niceToHaveSkills: e.target.value } }))
                    }
                    className="mt-2 min-h-[90px] w-full rounded-input border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                    placeholder="Next.js, AWS, Docker…"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Screening Questions</label>
                  <textarea
                    value={form.aiCriteria.screeningQuestions}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, aiCriteria: { ...f.aiCriteria, screeningQuestions: e.target.value } }))
                    }
                    className="mt-2 min-h-[90px] w-full rounded-input border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                    placeholder="Ask 2–4 questions that reveal depth…"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Deal Breakers</label>
                  <textarea
                    value={form.aiCriteria.dealBreakers}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, aiCriteria: { ...f.aiCriteria, dealBreakers: e.target.value } }))
                    }
                    className="mt-2 min-h-[90px] w-full rounded-input border border-border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                    placeholder="Hard constraints / disqualifiers…"
                  />
                  <div className="mt-1 text-xs text-warning">
                    Tip: Keep deal breakers explicit to avoid false positives.
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-border bg-bg p-4">
                  <div>
                    <div className="text-sm font-semibold">Shortlist Size</div>
                    <div className="text-xs text-text-muted">How many top candidates to return.</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className={[
                        "rounded-badge border px-3 py-1 text-sm font-semibold",
                        form.aiCriteria.shortlistSize === 10 ? "border-accent bg-accent/10 text-accent" : "border-border bg-white text-text-muted",
                      ].join(" ")}
                      onClick={() => setForm((f) => ({ ...f, aiCriteria: { ...f.aiCriteria, shortlistSize: 10 } }))}
                      type="button"
                    >
                      Top 10
                    </button>
                    <button
                      className={[
                        "rounded-badge border px-3 py-1 text-sm font-semibold",
                        form.aiCriteria.shortlistSize === 20 ? "border-accent bg-accent/10 text-accent" : "border-border bg-white text-text-muted",
                      ].join(" ")}
                      onClick={() => setForm((f) => ({ ...f, aiCriteria: { ...f.aiCriteria, shortlistSize: 20 } }))}
                      type="button"
                    >
                      Top 20
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button variant="outline" onClick={back}>
                  Back
                </Button>
                <Button onClick={next}>Next</Button>
              </div>
            </CardBody>
          </Card>
        ) : null}

        {step === 4 ? (
          <Card>
            <CardHeader title="Step 4 — Review & Launch" subtitle="Double-check details before ingestion." />
            <CardBody>
              <div className="grid grid-cols-1 gap-3">
                {summary.map((row) => (
                  <div key={row.k} className="flex flex-col justify-between gap-1 rounded-card border border-border bg-bg p-4 md:flex-row md:items-center">
                    <div className="text-sm font-semibold text-text-primary">{row.k}</div>
                    <div className="text-sm text-text-muted md:max-w-[70%] md:text-right">{row.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.success("Saved as draft (mock).");
                  }}
                >
                  Save as Draft
                </Button>
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={back}>
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      toast.success("Job created. Continue to ingestion (mock).");
                      window.location.href = "/screening/job_001";
                    }}
                  >
                    Continue to Ingestion
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <Badge variant="info">Demo note</Badge>
                <span className="ml-2 text-xs text-text-muted">
                  This is a frontend-only flow backed by local mock data.
                </span>
              </div>
            </CardBody>
          </Card>
        ) : null}
      </div>
    </motion.div>
  );
}

