"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Sparkles, Users, TrendingUp, TrendingDown, Minus, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ROUTES } from "@/lib/constants";
import { formatShortDate, formatNumber } from "@/lib/utils";
import { mockDashboardStats, mockJobs } from "@/lib/mockData";
import type { Trend } from "@/types";

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
    <div className="mt-2 flex items-center gap-1 text-xs text-text-muted">
      <Icon className={color + " h-3 w-3"} />
      <span className="font-semibold">{trend.value}</span>
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
}: {
  title: string;
  value: string;
  icon: typeof Briefcase;
  trend: Trend;
  meta?: string;
  loading: boolean;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-medium text-text-muted">{title}</div>
            <div className="mt-2 text-3xl font-bold tracking-tight text-text-primary">
              {loading ? <Skeleton className="h-9 w-28" /> : value}
            </div>
            {loading ? <Skeleton className="mt-3 h-3 w-40" /> : <TrendLine trend={trend} />}
            {meta ? <div className="mt-2 text-xs text-text-muted">{meta}</div> : null}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-input bg-accent/10 text-accent">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </Card>
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
  const loading = false; // wired for future async

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <PageHeader
        title="Dashboard"
        subtitle="Track jobs, applicants, and screening performance at a glance."
        right={
          <Link href={ROUTES.newJob}>
            <Button>Create New Job</Button>
          </Link>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active Jobs"
          value={formatNumber(mockDashboardStats.activeJobs.value)}
          icon={Briefcase}
          trend={mockDashboardStats.activeJobs.trend}
          loading={loading}
        />
        <StatCard
          title="Total Applicants"
          value={formatNumber(mockDashboardStats.totalApplicants.value)}
          icon={Users}
          trend={mockDashboardStats.totalApplicants.trend}
          loading={loading}
        />
        <StatCard
          title="Shortlisted"
          value={formatNumber(mockDashboardStats.shortlisted.value)}
          icon={Sparkles}
          trend={mockDashboardStats.shortlisted.trend}
          meta={`Conversion: ${mockDashboardStats.shortlisted.conversionRatePct}%`}
          loading={loading}
        />
        <StatCard
          title="In Screening"
          value={formatNumber(mockDashboardStats.inScreening.value)}
          icon={Sparkles}
          trend={mockDashboardStats.inScreening.trend}
          meta={`Avg time: ${mockDashboardStats.inScreening.avgTimePerCandidateMins}m / candidate`}
          loading={loading}
        />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader title="Recent Jobs" subtitle="Latest pipeline activity across your roles." />
          <CardBody className="px-0 pb-0">
            {mockJobs.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center">
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
                        className="border-t border-border hover:bg-bg/70 transition-colors"
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
                              className="text-accent hover:text-accent-hover font-semibold"
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

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
          <Link href={ROUTES.newJob} className="block">
            <Card className="border-accent/30 bg-accent text-white">
              <div className="flex items-center justify-between p-6">
                <div>
                  <div className="text-sm font-semibold opacity-90">Quick Action</div>
                  <div className="mt-1 text-xl font-bold">Create New Job</div>
                  <div className="mt-2 text-sm opacity-90">Launch a role and start screening in minutes.</div>
                </div>
                <div className="rounded-full bg-white/15 p-3">→</div>
              </div>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
          <Card>
            <div className="flex items-center justify-between p-6">
              <div>
                <div className="text-sm font-semibold text-text-muted">AI Insights</div>
                <div className="mt-1 text-lg font-bold">Spot trends & gaps</div>
                <div className="mt-2 text-sm text-text-muted">Identify top skills and common risks.</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-input bg-accent/10 text-accent">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
          <Card>
            <div className="flex items-center justify-between p-6">
              <div>
                <div className="text-sm font-semibold text-text-muted">Talent Pool</div>
                <div className="mt-1 text-lg font-bold">Build your pipeline</div>
                <div className="mt-2 text-sm text-text-muted">Save and revisit high-signal candidates.</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-input bg-accent/10 text-accent">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

