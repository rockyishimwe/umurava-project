"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreCircle } from "@/components/ui/ScoreCircle";
import { mockDashboardStats, mockJobs, mockCandidateScores, mockCandidates } from "@/lib/mockData";
import { TrendingUp, TrendingDown, Minus, Users, Briefcase, Sparkles } from "lucide-react";

function StatCard({ title, value, trend, icon: Icon }: {
  title: string;
  value: string | number;
  trend?: { label: string; value: string; direction: "up" | "down" | "neutral" };
  icon?: any;
}) {
  const TrendIcon = trend?.direction === "up" ? TrendingUp : trend?.direction === "down" ? TrendingDown : Minus;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              <TrendIcon className={`h-3 w-3 ${
                trend.direction === "up" ? "text-green-600" :
                trend.direction === "down" ? "text-red-600" : "text-gray-600"
              }`} />
              <span className="text-xs text-text-muted">{trend.value} {trend.label}</span>
            </div>
          )}
        </div>
        {Icon && <Icon className="h-8 w-8 text-accent" />}
      </div>
    </Card>
  );
}

function RecentActivity() {
  const recentJobs = mockJobs.slice(0, 3);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Jobs</h3>
      <div className="space-y-4">
        {recentJobs.map((job) => (
          <div key={job.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{job.title}</p>
              <p className="text-sm text-text-muted">{job.applicantsCount} applicants</p>
            </div>
            <Badge variant={job.status === "Active" ? "success" : job.status === "Screening" ? "info" : "default"}>
              {job.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TopCandidates() {
  const topCandidates = [...mockCandidateScores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Top Candidates</h3>
      <div className="space-y-4">
        {topCandidates.map((score) => {
          const candidate = mockCandidates.find(c => c.id === score.candidateId);
          return (
            <div key={score.candidateId} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{candidate?.name || "Unknown"}</p>
                <p className="text-sm text-text-muted">Score: {score.score}%</p>
              </div>
              <ScoreCircle score={score.score} size="sm" />
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="flex">
        <Sidebar pathname="/" />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
            <p className="text-text-muted">Welcome back! Here's what's happening with your recruitment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Active Jobs"
              value={mockDashboardStats.activeJobs.value}
              trend={mockDashboardStats.activeJobs.trend}
              icon={Briefcase}
            />
            <StatCard
              title="Total Applicants"
              value={mockDashboardStats.totalApplicants.value}
              trend={mockDashboardStats.totalApplicants.trend}
              icon={Users}
            />
            <StatCard
              title="Shortlisted"
              value={mockDashboardStats.shortlisted.value}
              trend={mockDashboardStats.shortlisted.trend}
            />
            <StatCard
              title="In Screening"
              value={mockDashboardStats.inScreening.value}
              trend={mockDashboardStats.inScreening.trend}
              icon={Sparkles}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity />
            <TopCandidates />
          </div>
        </main>
      </div>
    </div>
  );
}
