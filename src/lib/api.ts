import axios, { type AxiosInstance } from "axios";
import { mockCandidates, mockCandidateScores, mockDashboardStats, mockJobs } from "@/lib/mockData";
import type { Candidate, CandidateScore, DashboardStats, Job } from "@/types";
import { dashboardStatsSchema } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "mock://local";

export const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

type MockResponse<T> = { data: T };

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function mockGet<T>(path: string): Promise<MockResponse<T>> {
  await sleep(650);

  if (path === "/dashboard/stats") {
    return { data: mockDashboardStats as unknown as T };
  }

  if (path === "/jobs") {
    return { data: mockJobs as unknown as T };
  }

  if (path.startsWith("/jobs/")) {
    const id = path.split("/")[2] ?? "";
    const job = mockJobs.find((j) => j.id === id);
    if (!job) throw new Error("Job not found");
    return { data: job as unknown as T };
  }

  if (path === "/candidates") {
    return { data: mockCandidates as unknown as T };
  }

  if (path.startsWith("/candidates/")) {
    const id = path.split("/")[2] ?? "";
    const c = mockCandidates.find((x) => x.id === id);
    if (!c) throw new Error("Candidate not found");
    return { data: c as unknown as T };
  }

  if (path.startsWith("/screening/results")) {
    // example: /screening/results?jobId=job_001
    return { data: mockCandidateScores as unknown as T };
  }

  throw new Error(`No mock handler for GET ${path}`);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    let data: DashboardStats;
    if (baseURL.startsWith("mock://")) {
      const res = await mockGet<DashboardStats>("/dashboard/stats");
      data = res.data;
    } else {
      const res = await api.get<DashboardStats>("/dashboard/stats");
      data = res.data;
    }
    return dashboardStatsSchema.parse(data);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}

export async function getJobs(): Promise<Job[]> {
  if (baseURL.startsWith("mock://")) {
    const res = await mockGet<Job[]>("/jobs");
    return res.data;
  }
  const res = await api.get<Job[]>("/jobs");
  return res.data;
}

export async function getJob(id: string): Promise<Job> {
  if (baseURL.startsWith("mock://")) {
    const res = await mockGet<Job>(`/jobs/${id}`);
    return res.data;
  }
  const res = await api.get<Job>(`/jobs/${id}`);
  return res.data;
}

export async function getCandidates(): Promise<Candidate[]> {
  if (baseURL.startsWith("mock://")) {
    const res = await mockGet<Candidate[]>("/candidates");
    return res.data;
  }
  const res = await api.get<Candidate[]>("/candidates");
  return res.data;
}

export async function getCandidate(id: string): Promise<Candidate> {
  if (baseURL.startsWith("mock://")) {
    const res = await mockGet<Candidate>(`/candidates/${id}`);
    return res.data;
  }
  const res = await api.get<Candidate>(`/candidates/${id}`);
  return res.data;
}

export async function getScreeningResults(jobId: string): Promise<CandidateScore[]> {
  if (baseURL.startsWith("mock://")) {
    const _jobId = jobId;
    const res = await mockGet<CandidateScore[]>(`/screening/results?jobId=${encodeURIComponent(_jobId)}`);
    return res.data;
  }
  const res = await api.get<CandidateScore[]>("/screening/results", { params: { jobId } });
  return res.data;
}

