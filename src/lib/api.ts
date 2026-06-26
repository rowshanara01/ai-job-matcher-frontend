import { AnalyzeResult, Job } from '@/types';

export async function analyzeResume(data: {
  resumeText: string;
  preferredRole?: string;
  preferredLocation?: string;
}): Promise<AnalyzeResult> {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch('/api/jobs');
  const json = await res.json();
  return json.data;
}

export async function fetchJob(id: string): Promise<Job> {
  const res = await fetch(`/api/jobs/${id}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}
