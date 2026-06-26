'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchJobs } from '@/lib/api';
import { Job } from '@/types';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filtered, setFiltered] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    fetchJobs().then(data => { setJobs(data); setFiltered(data); setLoading(false); });
  }, []);

  useEffect(() => {
    let res = jobs;
    if (typeFilter !== 'All') res = res.filter(j => j.type === typeFilter);
    if (search) res = res.filter(j =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    );
    setFiltered(res);
  }, [search, typeFilter, jobs]);

  const typeColors: Record<string, string> = {
    'Remote': 'rgba(52,211,153,0.15)',
    'Hybrid': 'rgba(79,158,255,0.15)',
    'On-site': 'rgba(167,139,250,0.15)',
  };
  const typeText: Record<string, string> = {
    'Remote': 'var(--accent3)',
    'Hybrid': 'var(--accent)',
    'On-site': 'var(--accent2)',
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <style>{`
        .navbar {
          border-bottom: 1px solid var(--border);
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(8,11,20,0.9);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 100;
          gap: 1rem;
        }
        .nav-logo {
          font-weight: 700;
          font-size: 1rem;
          background: linear-gradient(90deg,#4f9eff,#a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nav-btn {
          background: var(--accent);
          color: #fff;
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .filters {
          display: flex;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .search-input {
          flex: 1;
          min-width: 160px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.65rem 1rem;
          color: var(--text);
          font-size: 0.88rem;
          width: 100%;
        }
        .type-btns {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .type-btn {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--muted);
          padding: 0.55rem 0.9rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .type-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .job-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.2rem;
          transition: all 0.2s;
          cursor: pointer;
          display: block;
        }
        .job-card:hover {
          border-color: var(--border2);
          transform: translateY(-2px);
        }
        .job-inner {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.8rem;
        }
        .job-salary {
          font-weight: 700;
          color: var(--accent3);
          font-size: 0.85rem;
          white-space: nowrap;
        }
        .job-meta {
          color: var(--muted);
          font-size: 0.82rem;
          margin-bottom: 0.7rem;
          line-height: 1.5;
        }
        .skill-tag {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 0.12rem 0.45rem;
          font-size: 0.75rem;
          color: var(--muted);
        }
        .spinner {
          width: 36px; height: 36px;
          border: 3px solid var(--border);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }
        @media (max-width: 480px) {
          .job-inner { flex-direction: column; }
          .job-right { display: flex; gap: 1rem; align-items: center; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
        <Link href="/" className="nav-logo">⚡ JobMatchAI</Link>
        <Link href="/analyze" className="nav-btn">Analyze Resume →</Link>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800, marginBottom: '0.3rem' }}>Browse Jobs</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{filtered.length} opportunities available</p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '0.8rem' }}>
          <input
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search by title, company or skill..."
          />
        </div>

        {/* Type filter buttons */}
        <div className="type-btns" style={{ marginBottom: '1.5rem' }}>
          {['All', 'Remote', 'Hybrid', 'On-site'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`type-btn${typeFilter === t ? ' active' : ''}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Jobs list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
            <div className="spinner" />
            Loading jobs...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {filtered.map(job => (
              <Link href={`/jobs/${job.id}`} key={job.id} className="job-card">
                <div className="job-inner">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{job.title}</span>
                      <span style={{
                        background: typeColors[job.type],
                        color: typeText[job.type],
                        fontSize: '0.7rem', fontWeight: 700,
                        padding: '0.12rem 0.5rem', borderRadius: '4px',
                        whiteSpace: 'nowrap'
                      }}>{job.type}</span>
                    </div>
                    <p className="job-meta">{job.company} · {job.location} · {job.experience}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {job.skills.slice(0, 4).map(s => (
                        <span key={s} className="skill-tag">{s}</span>
                      ))}
                      {job.skills.length > 4 && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>+{job.skills.length - 4}</span>
                      )}
                    </div>
                  </div>
                  <div className="job-right" style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div className="job-salary">{job.salary}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{job.postedAt}</div>
                  </div>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
                😕 No jobs found. Try a different search.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
