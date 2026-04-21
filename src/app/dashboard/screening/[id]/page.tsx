"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, FileUp, Filter, Search, Upload, Users } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { SkillTag } from "@/components/ui/SkillTag";
import { useCandidates } from "@/hooks/useCandidates";
import { getApiErrorMessage, getJob, uploadCandidatesFile } from "@/lib/api";
import { initials } from "@/lib/utils";

type Tab = "pool" | "upload";

export default function ScreeningIngestionPage() {
  const params = useParams<{ id: string }>();
  const jobId = params?.id ?? "";
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<Tab>("pool");
  const [q, setQ] = useState("");
  const [showRoleMatchesOnly, setShowRoleMatchesOnly] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [lastUploadSummary, setLastUploadSummary] = useState<{
    createdCount: number;
    skippedCount: number;
  } | null>(null);

  const { data: job, isLoading: jobLoading } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJob(jobId),
    enabled: Boolean(jobId),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
  const { data: candidates = [], isLoading: candidatesLoading, error } = useCandidates();

  const roleMatchedCandidates = useMemo(() => {
    if (!job) {
      return candidates;
    }

    return candidates.filter((candidate) => {
      const role = (candidate.appliedJobTitle || candidate.currentTitle || "").trim().toLowerCase();
      return role === job.title.trim().toLowerCase();
    });
  }, [candidates, job]);

  const filteredCandidates = useMemo(() => {
    const source = showRoleMatchesOnly ? roleMatchedCandidates : candidates;
    const query = q.trim().toLowerCase();

    if (!query) {
      return source;
    }

    return source.filter((candidate) => {
      return (
        candidate.name.toLowerCase().includes(query) ||
        (candidate.appliedJobTitle || candidate.currentTitle || "").toLowerCase().includes(query) ||
        candidate.skills.technical.some((skill) => skill.toLowerCase().includes(query))
      );
    });
  }, [candidates, q, roleMatchedCandidates, showRoleMatchesOnly]);

  async function handleChooseFile(file?: File | null) {
    if (!file) {
      return;
    }

    setUploading(true);

    try {
      const response = await uploadCandidatesFile(file);
      setLastUploadSummary({
        createdCount: response.createdCount,
        skippedCount: response.skippedCount,
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["candidates"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboardOverview"] }),
        queryClient.invalidateQueries({ queryKey: ["job", jobId] }),
      ]);
      toast.success(
        `${response.createdCount} candidate${response.createdCount === 1 ? "" : "s"} added successfully.`,
      );
      setTab("pool");
    } catch (uploadError) {
      toast.error(getApiErrorMessage(uploadError, "Unable to upload candidate file right now."));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  if (error) {
    return (
      <Card className="p-8">
        <div className="text-lg font-semibold">Candidate intake is unavailable</div>
        <div className="mt-1 text-sm text-text-muted">
          We could not load the current candidate pool from the backend.
        </div>
        <div className="mt-4">
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </Card>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <PageHeader
        title="Applicant Intake"
        subtitle="Review candidate records already in the backend, then upload CSV or Excel files when you need more signal."
        backHref={job ? `/dashboard/jobs/${job.id}` : "/dashboard"}
        right={
          <div className="rounded-badge border border-border bg-bg px-3 py-1 text-xs font-semibold text-text-muted">
            {jobLoading ? "Loading role..." : job ? `Role: ${job.title}` : "Role unavailable"}
          </div>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.2fr)_340px]">
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Current Backend Scope"
              subtitle="This flow is now connected only to the routes your backend already exposes."
            />
            <CardBody className="grid gap-4 md:grid-cols-3">
              <div className="rounded-card border border-border bg-bg p-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                  <Users className="h-3.5 w-3.5" />
                  Candidates in pool
                </div>
                <div className="mt-2 text-2xl font-bold text-text-primary">
                  {candidatesLoading ? "-" : candidates.length}
                </div>
              </div>
              <div className="rounded-card border border-border bg-bg p-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                  <Briefcase className="h-3.5 w-3.5" />
                  Matched to this role
                </div>
                <div className="mt-2 text-2xl font-bold text-text-primary">
                  {candidatesLoading ? "-" : roleMatchedCandidates.length}
                </div>
              </div>
              <div className="rounded-card border border-border bg-bg p-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                  <FileUp className="h-3.5 w-3.5" />
                  Upload format
                </div>
                <div className="mt-2 text-sm font-semibold text-text-primary">CSV or XLSX</div>
              </div>
            </CardBody>
          </Card>

          <div className="flex flex-wrap items-center gap-2">
            <button
              className={[
                "rounded-badge border px-4 py-2 text-sm font-semibold",
                tab === "pool" ? "border-accent bg-accent/10 text-accent" : "border-border bg-white text-text-muted",
              ].join(" ")}
              onClick={() => setTab("pool")}
              type="button"
            >
              Candidate Pool
            </button>
            <button
              className={[
                "rounded-badge border px-4 py-2 text-sm font-semibold",
                tab === "upload"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-white text-text-muted",
              ].join(" ")}
              onClick={() => setTab("upload")}
              type="button"
            >
              Upload File
            </button>
          </div>

          {tab === "pool" ? (
            <>
              <Card className="p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    <input
                      value={q}
                      onChange={(event) => setQ(event.target.value)}
                      className="h-10 w-full rounded-input border border-border bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                      placeholder="Search by name, role, or skill"
                    />
                  </div>
                  <button
                    className="inline-flex h-10 items-center gap-2 rounded-input border border-border bg-white px-3 text-sm font-semibold text-text-muted transition-colors hover:bg-bg"
                    onClick={() => setShowRoleMatchesOnly((current) => !current)}
                    type="button"
                  >
                    <Filter className="h-4 w-4" />
                    {showRoleMatchesOnly ? "Showing this role only" : "Showing all candidates"}
                  </button>
                </div>
              </Card>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {candidatesLoading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <Card key={index} className="p-5">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="mt-4 h-4 w-40" />
                        <Skeleton className="mt-2 h-3 w-28" />
                        <div className="mt-4 flex gap-2">
                          <Skeleton className="h-6 w-16 rounded-badge" />
                          <Skeleton className="h-6 w-20 rounded-badge" />
                        </div>
                      </Card>
                    ))
                  : filteredCandidates.map((candidate) => (
                      <Card key={candidate.id} className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 font-bold text-accent">
                              {initials(candidate.name)}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-text-primary">
                                {candidate.name}
                              </div>
                              <div className="truncate text-xs text-text-muted">
                                {candidate.appliedJobTitle || candidate.currentTitle}
                              </div>
                            </div>
                          </div>
                          <Badge variant={candidate.shortlisted ? "success" : "default"}>
                            {candidate.shortlisted ? "Shortlisted" : "Reviewing"}
                          </Badge>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {candidate.skills.technical.length > 0 ? (
                            candidate.skills.technical.slice(0, 4).map((skill) => (
                              <SkillTag key={skill}>{skill}</SkillTag>
                            ))
                          ) : (
                            <div className="text-sm text-text-muted">No skills captured yet.</div>
                          )}
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-text-muted">
                          <div>{candidate.yearsExperience} years experience</div>
                          <Link
                            className="font-semibold text-accent hover:text-accent-hover"
                            href={`/dashboard/candidates/${candidate.id}`}
                          >
                            Open profile
                          </Link>
                        </div>
                      </Card>
                    ))}
              </div>

              {!candidatesLoading && filteredCandidates.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="text-sm font-semibold text-text-primary">No candidates match this view yet</div>
                  <div className="mt-1 text-sm text-text-muted">
                    Try searching a broader term or upload a new spreadsheet for this role.
                  </div>
                </Card>
              ) : null}
            </>
          ) : (
            <Card>
              <CardHeader
                title="Upload Candidate Spreadsheet"
                subtitle="The current backend accepts CSV and Excel files and converts them into candidate records."
              />
              <CardBody className="space-y-6">
                <div className="rounded-card border-2 border-dashed border-border bg-bg p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div className="mt-4 text-base font-semibold text-text-primary">
                    Upload a CSV or XLSX candidate file
                  </div>
                  <div className="mt-2 text-sm text-text-muted">
                    Each row should include the candidate name, role, skills, education, and years of experience.
                  </div>
                  <div className="mt-5">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.xlsx"
                      className="hidden"
                      onChange={(event) => handleChooseFile(event.target.files?.[0] ?? null)}
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      type="button"
                    >
                      {uploading ? "Uploading..." : "Choose File"}
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-card border border-border bg-bg p-4">
                    <div className="text-sm font-semibold text-text-primary">Best for right now</div>
                    <div className="mt-2 text-sm text-text-muted">
                      Intake and profile review are now real. Candidate scoring and shortlist ranking still need a
                      dedicated backend endpoint before we wire them in.
                    </div>
                  </div>
                  <div className="rounded-card border border-border bg-bg p-4">
                    <div className="text-sm font-semibold text-text-primary">Recent upload</div>
                    <div className="mt-2 text-sm text-text-muted">
                      {lastUploadSummary
                        ? `${lastUploadSummary.createdCount} created, ${lastUploadSummary.skippedCount} skipped.`
                        : "No upload has been completed in this session yet."}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Next Step" subtitle="What recruiters can do after intake with the current backend." />
            <CardBody className="space-y-4">
              <div className="rounded-card border border-border bg-bg p-4 text-sm text-text-muted">
                Review the imported candidate records, verify the role alignment, and decide who should remain in the
                pool for later screening.
              </div>
              {job ? (
                <Link href={`/dashboard/jobs/${job.id}`} className="block">
                  <Button className="w-full">Return to Job Brief</Button>
                </Link>
              ) : null}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Intake Tips" subtitle="A few habits that keep the pipeline clean." />
            <CardBody className="space-y-3 text-sm text-text-muted">
              <div className="rounded-card border border-border bg-bg p-4">
                Use the exact job title from the brief so candidates can be grouped correctly.
              </div>
              <div className="rounded-card border border-border bg-bg p-4">
                Keep spreadsheet skill columns concise; long freeform notes work better in additional info.
              </div>
              <div className="rounded-card border border-border bg-bg p-4">
                Re-uploading the same candidate for the same role will be skipped automatically.
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
