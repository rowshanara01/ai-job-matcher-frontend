'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchJob } from '@/lib/api';
import { Job } from '@/types';

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob(id as string).then(setJob).catch(() => router.push('/jobs')).finally(() => setLoading(false));
  }, [id, router]);

  const typeColor: Record<string, string> = { Remote: 'var(--accent3)', Hybrid: 'var(--accent)', 'On-site': 'var(--accent2)' };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );

  if (!job) return null;

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav className="global-nav">
        <Link href="/" className="nav-logo">⚡ JobMatchAI</Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/jobs" className="nav-link">← All Jobs</Link>
          <Link href="/analyze" className="nav-link nav-cta">Match My Resume</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem', animation: 'fadeUp 0.5s ease' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, rgba(79,158,255,0.06), rgba(167,139,250,0.06))', border: '1px solid var(--border2)', borderRadius: '18px', padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '0.4rem' }}>{job.title}</h1>
              <div style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '1rem' }}>{job.company} · {job.location}</div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(79,158,255,0.1)', border: '1px solid rgba(79,158,255,0.2)', color: 'var(--accent)', borderRadius: '6px', padding: '0.3rem 0.7rem', fontSize: '0.82rem', fontWeight: 600 }}>{job.experience}</span>
                <span style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', color: typeColor[job.type], borderRadius: '6px', padding: '0.3rem 0.7rem', fontSize: '0.82rem', fontWeight: 600 }}>{job.type}</span>
                <span style={{ color: 'var(--muted)', fontSize: '0.82rem', padding: '0.3rem 0' }}>Posted {job.postedAt}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent3)' }}>{job.salary}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>per month</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem', marginBottom: '1rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.8rem' }}>About this role</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.92rem' }}>{job.description}</p>
        </div>

        {/* Skills */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>Required Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {job.skills.map(s => (
              <span key={s} style={{ background: 'rgba(79,158,255,0.08)', border: '1px solid rgba(79,158,255,0.2)', color: 'var(--accent)', borderRadius: '8px', padding: '0.4rem 0.9rem', fontSize: '0.85rem', fontWeight: 500 }}>{s}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, rgba(79,158,255,0.06), rgba(167,139,250,0.06))', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Want to see how well you match this job?</p>
          <Link href="/analyze" style={{ background: 'linear-gradient(135deg,#4f9eff,#a78bfa)', color: '#fff', padding: '0.85rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', display: 'inline-block' }}>
            🤖 Match My Resume to This Job
          </Link>
        </div>
      </div>
    </div>
  );
}
