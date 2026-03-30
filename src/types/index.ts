export type JobStatus = "Draft" | "Active" | "Screening" | "Complete";

export interface Trend {
  label: string;
  value: string;
  direction: "up" | "down" | "neutral";
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salaryMin?: number;
  salaryMax?: number;
  description: string;
  responsibilities: string;
  qualifications: string;
  aiCriteria: {
    mustHaveSkills: string;
    niceToHaveSkills: string;
    screeningQuestions: string;
    dealBreakers: string;
    shortlistSize: 10 | 20;
  };
  status: JobStatus;
  applicantsCount: number;
  shortlistedCount: number;
  updatedAtISO: string;
}

export interface Candidate {
  id: string;
  name: string;
  currentTitle: string;
  company?: string;
  location: string;
  yearsExperience: number;
  email?: string;
  linkedIn?: string;
  skills: {
    technical: string[];
    soft: string[];
  };
  education: string[];
  workHistory: Array<{
    role: string;
    company: string;
    startISO: string;
    endISO?: string;
    highlights: string[];
  }>;
}

export type ScoreBucket = "qualified" | "maybe" | "notQualified";

export interface CandidateScore {
  candidateId: string;
  jobId: string;
  score: number; // 0-100
  skillsMatchPct: number; // 0-100
  experiencePct: number; // 0-100
  educationPct: number; // 0-100
  overallRelevancePct: number; // 0-100
  reasoning: string;
  strengths: string[];
  gaps: string[];
  screenedAtISO: string;
}

export interface DashboardStats {
  activeJobs: { value: number; trend: Trend };
  totalApplicants: { value: number; trend: Trend };
  shortlisted: { value: number; trend: Trend; conversionRatePct: number };
  inScreening: { value: number; trend: Trend; avgTimePerCandidateMins: number };
}

export interface UiState {
  sidebarCollapsed: boolean;
  isGlobalLoading: boolean;
}

