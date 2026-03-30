"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ExternalLink, Mail, X, Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ScoreCircle } from "@/components/ui/ScoreCircle";
import { SkillTag } from "@/components/ui/SkillTag";
import { initials } from "@/lib/utils";
import { mockCandidates, mockCandidateScores, mockJobs } from "@/lib/mockData";
import type { CandidateScore } from "@/types";

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <div className="font-semibold text-text-primary">{label}</div>
        <div className="text-text-muted">{value}%</div>
      </div>
      <div className="mt-2">
        <ProgressBar value={value} />
      </div>
    </div>
  );
}

export default function CandidateDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const candidate = mockCandidates.find((c) => c.id === id);
  const job = mockJobs[0];
  const score: CandidateScore | undefined = mockCandidateScores.find((s) => s.candidateId === id && s.jobId === job.id);

  if (!candidate) {
    return (
      <Card className="p-8">
        <div className="text-lg font-semibold">Candidate not found</div>
        <div className="mt-1 text-sm text-text-muted">The candidate id `{id}` doesn’t exist in mock data.</div>
        <div className="mt-4">
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </Card>
    );
  }

  const overall = score?.score ?? 0;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <PageHeader
        title={candidate.name}
        subtitle={`${candidate.currentTitle}${candidate.company ? ` • ${candidate.company}` : ""}`}
        right={
          <>
            <Button
              variant="outline"
              onClick={() => toast.success("Saved for later (mock).")}
              type="button"
            >
              <Bookmark className="h-4 w-4" />
              Save for Later
            </Button>
            <Button onClick={() => toast.success("Shortlisted (mock).")} type="button">
              <Check className="h-4 w-4" />
              Shortlist
            </Button>
            <Button variant="outline" onClick={() => toast.success("Rejected (mock).")} type="button">
              <X className="h-4 w-4" />
              Reject
            </Button>
          </>
        }
      />

      <div className="mt-4">
        <Link href={`/screening/${job.id}/results`} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Profile" subtitle={`${candidate.location} • ${candidate.yearsExperience} years experience`} />
          <CardBody>
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent text-xl font-bold">
                {initials(candidate.name)}
              </div>
              <div className="min-w-0">
                <div className="text-lg font-bold">{candidate.name}</div>
                <div className="mt-1 text-sm text-text-muted">{candidate.currentTitle}</div>
                {candidate.company ? <div className="text-sm text-text-muted">{candidate.company}</div> : null}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  {candidate.email ? (
                    <a className="inline-flex items-center gap-2 rounded-input border border-border bg-white px-3 py-2 text-text-muted hover:bg-bg" href={`mailto:${candidate.email}`}>
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                  ) : null}
                  <a className="inline-flex items-center gap-2 rounded-input border border-border bg-white px-3 py-2 text-text-muted hover:bg-bg" href="#" onClick={(e) => e.preventDefault()}>
                    <ExternalLink className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Skills</div>
              <div className="mt-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">Technical</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {candidate.skills.technical.map((s) => (
                    <SkillTag key={s}>{s}</SkillTag>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">Soft Skills</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {candidate.skills.soft.map((s) => (
                    <SkillTag key={s}>{s}</SkillTag>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Education</div>
              <div className="mt-2 space-y-2 text-sm text-text-muted">
                {candidate.education.map((e) => (
                  <div key={e} className="rounded-card border border-border bg-bg p-3">
                    {e}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Work History</div>
              <div className="mt-3 space-y-3">
                {candidate.workHistory.map((w) => (
                  <div key={`${w.company}-${w.role}-${w.startISO}`} className="rounded-card border border-border bg-bg p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{w.role}</div>
                        <div className="truncate text-sm text-text-muted">{w.company}</div>
                      </div>
                      <Badge variant="default">
                        {new Date(w.startISO).getFullYear()}–{w.endISO ? new Date(w.endISO).getFullYear() : "Present"}
                      </Badge>
                    </div>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-text-muted">
                      {w.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="AI Analysis" subtitle="Score breakdown, strengths, and risks." />
          <CardBody>
            <div className="flex flex-col items-center justify-center rounded-card border border-border bg-bg p-6">
              <ScoreCircle score={overall} size={92} />
              <div className="mt-2 text-xs text-text-muted">Overall AI Score</div>
            </div>

            <div className="mt-6 space-y-4">
              <ScoreRow label="Skills Match" value={score?.skillsMatchPct ?? 0} />
              <ScoreRow label="Experience Relevance" value={score?.experiencePct ?? 0} />
              <ScoreRow label="Education Fit" value={score?.educationPct ?? 0} />
              <ScoreRow label="Overall Relevance" value={score?.overallRelevancePct ?? 0} />
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Strengths</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(score?.strengths ?? []).map((s) => (
                  <span key={s} className="inline-flex items-center gap-2 rounded-badge border border-success/20 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                    <Check className="h-3.5 w-3.5" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Gaps / Risks</div>
              <div className="mt-2 space-y-2">
                {(score?.gaps ?? []).map((g) => (
                  <div key={g} className="rounded-card border border-warning/20 bg-warning/10 px-3 py-2 text-sm text-warning">
                    {g}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-card border border-accent/20 bg-accent/10 p-4">
              <div className="text-sm font-semibold text-text-primary">Final Recommendation</div>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {overall >= 80
                  ? "Strong hire signal. Move to interview quickly and validate system design depth with targeted questions."
                  : overall >= 60
                    ? "Potential fit. Consider a structured interview to validate missing evidence (frontend depth, leadership, or system design)."
                    : "Low fit for current criteria. Consider alternative roles or keep in talent pool if skills match future needs."}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
}

