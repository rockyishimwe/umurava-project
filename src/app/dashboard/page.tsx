"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Sparkles, Users, TrendingUp, TrendingDown, Minus, MoreHorizontal, Plus } from "lucide-react";
import { ApplicationSourcesChart } from "@/components/dashboard/ApplicationSourcesChart";
import { CandidateInflowChart } from "@/components/dashboard/CandidateInflowChart";
import { ScreeningTargetsCard } from "@/components/dashboard/ScreeningTargetsCard";
import { StatSparkline } from "@/components/dashboard/StatSparkline";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ROUTES } from "@/lib/constants";
import { cn, formatShortDate, formatNumber } from "@/lib/utils";
import { mockDashboardStats, mockJobs } from "@/lib/mockData";
import type { Trend } from "@/types";

export const dynamic = 'force-dynamic';

function sparkFromSeed(seed: number) {
  return Array.from({ length: 8 }, (_, i) => ({ i, v: seed + i * 2 + ((i + seed) % 3) * 3 }));
}

function TrendLine({ trend }: { trend: Trend }) {
  const Icon =
    trend.direction === "up" ? TrendingUp : trend.direction === "down" ? TrendingDown : Minus;
  const color =
    trend.direction === "up"
      ? "text-success"
      : trend.direction === "down"
        ? "text-danger"
        : "text-text-muted";

  return (
    <div className="mt-1 flex items-center gap-1 text-xs text-text-muted">
      <Icon className={cn("h-3 w-3 shrink-0", color)} />
      <span className="font-semibold text-text-primary">{trend.value}</span>
      <span>{trend.label}</span>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  meta,
  loading,
  spark,
}: {
  title: string;
  value: string;
  icon: typeof Briefcase;
  trend: Trend;
  meta?: string;
  loading: boolean;
  spark: Array<{ i: number; v: number }>;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
      <div className="rounded-card border border-border bg-card p-5 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-medium text-text-muted">{title}</div>
            <div className="mt-1 text-3xl font-bold tracking-tight text-text-primary">
              {loading ? <Skeleton className="h-9 w-28" /> : value}
            </div>
            {loading ? <Skeleton className="mt-3 h-3 w-40" /> : <TrendLine trend={trend} />}
            {meta ? <div className="mt-1 text-xs text-text-muted">{meta}</div> : null}
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent ring-4 ring-accent/5">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {loading ? <Skeleton className="mt-4 h-12 w-full rounded-input" /> : <StatSparkline data={spark} />}
      </div>
    </motion.div>
  );
}

function statusBadgeVariant(status: string) {
  if (status === "Screening") return "warning";
  if (status === "Complete") return "success";
  if (status === "Active") return "info";
  return "default";
}

export default function DashboardPage() {
  const loading = false;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back — here's what's happening with recruitment and AI screening."
      />

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active Jobs"
          value={formatNumber(mockDashboardStats.activeJobs.value)}
          icon={Briefcase}
          trend={mockDashboardStats.activeJobs.trend}
          spark={sparkFromSeed(4)}
          loading={loading}
        />
        <StatCard
          title="Total Applicants"
          value={formatNumber(mockDashboardStats.totalApplicants.value)}
          icon={Users}
          trend={mockDashboardStats.totalApplicants.trend}
          spark={sparkFromSeed(18)}
          loading={loading}
        />
        <StatCard
          title="Shortlisted"
          value={formatNumber(mockDashboardStats.shortlisted.value)}
          icon={Sparkles}
          trend={mockDashboardStats.shortlisted.trend}
          meta={`Conversion: ${mockDashboardStats.shortlisted.conversionRatePct}%`}
          spark={sparkFromSeed(6)}
          loading={loading}
        />
        <StatCard
          title="In Screening"
          value={formatNumber(mockDashboardStats.inScreening.value)}
          icon={Sparkles}
          trend={mockDashboardStats.inScreening.trend}
          meta={`Avg time: ${mockDashboardStats.inScreening.avgTimePerCandidateMins}m / candidate`}
          spark={sparkFromSeed(10)}
          loading={loading}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CandidateInflowChart />
        </div>
        <div className="flex flex-col gap-6">
          <ApplicationSourcesChart />
          <ScreeningTargetsCard />
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader title="Recent Jobs" subtitle="Latest pipeline activity across your roles." />
          <CardBody className="px-0 pb-0">
            {mockJobs.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="text-sm font-semibold">No jobs yet</div>
                <div className="mt-1 text-sm text-text-muted">
                  Create your first job to start screening candidates.
                </div>
                <div className="mt-4">
                  <Link href={ROUTES.newJob}>
                    <Button>Create New Job</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] border-t border-border text-sm">
                  <thead className="bg-bg">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                      <th className="px-5 py-3">Job Title</th>
                      <th className="px-5 py-3">Department</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Applicants</th>
                      <th className="px-5 py-3">Shortlisted</th>
                      <th className="px-5 py-3">Last Updated</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockJobs.map((job) => (
                      <tr
                        key={job.id}
                        className="border-t border-border transition-colors hover:bg-bg/70"
                      >
                        <td className="px-5 py-4 font-semibold text-text-primary">{job.title}</td>
                        <td className="px-5 py-4 text-text-muted">{job.department}</td>
                        <td className="px-5 py-4">
                          <Badge variant={statusBadgeVariant(job.status)}>{job.status}</Badge>
                        </td>
                        <td className="px-5 py-4">{formatNumber(job.applicantsCount)}</td>
                        <td className="px-5 py-4">{formatNumber(job.shortlistedCount)}</td>
                        <td className="px-5 py-4 text-text-muted">{formatShortDate(job.updatedAtISO)}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-3">
                            <Link
                              className="font-semibold text-accent hover:text-accent-hover"
                              href={`/jobs/${job.id}`}
                            >
                              View →
                            </Link>
                            <button
                              className="rounded-input p-2 text-text-muted hover:bg-bg hover:text-text-primary"
                              aria-label="More"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
          <Link href={ROUTES.newJob} className="block">
            <div className="rounded-card border border-accent/25 bg-accent p-6 text-white shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold opacity-90">Quick Action</div>
                  <div className="mt-1 text-xl font-bold">Create New Job</div>
                  <div className="mt-2 text-sm opacity-90">Launch a role and start screening in minutes.</div>
                </div>
                <div className="rounded-full bg-white/15 p-3">→</div>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
          <div className="rounded-card border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-text-muted">AI Insights</div>
                <div className="mt-1 text-lg font-bold text-text-primary">Spot trends & gaps</div>
                <div className="mt-2 text-sm text-text-muted">Identify top skills and common risks.</div>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent ring-4 ring-accent/5">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
          <div className="rounded-card border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-text-muted">Talent Pool</div>
                <div className="mt-1 text-lg font-bold text-text-primary">Build your pipeline</div>
                <div className="mt-2 text-sm text-text-muted">Save and revisit high-signal candidates.</div>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent ring-4 ring-accent/5">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
