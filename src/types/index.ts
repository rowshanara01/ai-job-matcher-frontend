export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  skills: string[];
  description: string;
  experience: string;
  postedAt: string;
}

export interface AnalyzeResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendation: string;
  aiSummary: string;
  topJobs: (Job & { score: number })[];
}
