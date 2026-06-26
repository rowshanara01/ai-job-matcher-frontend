'use client';
import { useState } from 'react';
import Link from 'next/link';
import { analyzeResume } from '@/lib/api';
import { AnalyzeResult } from '@/types';

const SAMPLE_RESUME = `John Doe - Full Stack Developer
Email: john@example.com | Phone: 01700000000

SKILLS:
React, Next.js, TypeScript, Node.js, Express, MongoDB, Git, CSS, REST API

EXPERIENCE:
Junior Web Developer at WebAgency (2022-2024)
- Built React-based dashboards for 10+ clients
- Developed REST APIs using Node.js and Express
- Maintained MongoDB databases

EDUCATION:
BSc in Computer Science - BUET (2018-2022)

PROJECTS:
- E-commerce site with Next.js and Stripe payments
- Chat application with Socket.io and React`;

export default function AnalyzePage() {
  const [resumeText, setResumeText] = useState('');
  const [preferredRole, setPreferredRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'input' | 'analyzing' | 'result'>('input');

  const handleAnalyze = async () => {
    if (resumeText.trim().length < 50) {
      setError('Please paste a longer resume (at least 50 characters).');
      return;
    }
    setError('');
    setLoading(true);
    setStep('analyzing');
    try {
      const data = await analyzeResume({ resumeText, preferredRole });
      setResult(data);
      setStep('result');
    } catch {
      setError('Failed to connect to server. Make sure backend is running.');
      setStep('input');
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score: number) =>
    score >= 70 ? 'var(--accent3)' : score >= 40 ? 'var(--accent)' : 'var(--accent2)';

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Nav */}
      <nav className="global-nav">
        <Link href="/" className="nav-logo">⚡ JobMatchAI</Link>
        <Link href="/jobs" className="nav-link">Browse Jobs</Link>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* STEP 1: Input */}
        {step === 'input' && (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🤖 AI Resume Analyzer</h1>
              <p style={{ color: 'var(--muted)' }}>Paste your resume below and get instant job matches</p>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>Your Resume</label>
                <button onClick={() => setResumeText(SAMPLE_RESUME)} style={{ background: 'rgba(79,158,255,0.1)', border: '1px solid rgba(79,158,255,0.3)', color: 'var(--accent)', padding: '0.3rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem' }}>
                  Use sample resume
                </button>
              </div>
              <textarea
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                placeholder="Paste your resume here — skills, experience, education..."
                style={{ width: '100%', minHeight: '220px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1rem', color: 'var(--text)', fontSize: '0.9rem', resize: 'vertical', lineHeight: 1.6 }}
              />
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem' }}>{resumeText.length} characters</div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: '0.6rem' }}>Preferred Role (optional)</label>
              <input value={preferredRole} onChange={e => setPreferredRole(e.target.value)}
                placeholder="e.g. Full Stack Developer, Backend Engineer..."
                style={{ width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.7rem 1rem', color: 'var(--text)', fontSize: '0.9rem' }} />
            </div>

            {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '10px', padding: '0.8rem 1rem', color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

            <button onClick={handleAnalyze} style={{ width: '100%', background: 'linear-gradient(135deg,#4f9eff,#6b8dff)', color: '#fff', padding: '1rem', borderRadius: '12px', fontWeight: 700, fontSize: '1.05rem', transition: 'opacity 0.2s' }}>
              🚀 Analyze with AI
            </button>
          </div>
        )}

        {/* STEP 2: Analyzing */}
        {step === 'analyzing' && (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', animation: 'fadeUp 0.5s ease' }}>
            <div style={{ width: '60px', height: '60px', border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 2rem' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>AI is analyzing your resume...</h2>
            <p className="nav-link">Extracting skills · Matching jobs · Generating insights</p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
              {['Extracting skills', 'Matching jobs', 'Building report'].map((s, i) => (
                <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '0.3rem 0.8rem', fontSize: '0.8rem', color: 'var(--muted)', animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite` }}>{s}</div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Results */}
        {step === 'result' && result && (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>🎯 Your AI Results</h1>
              <button onClick={() => { setResult(null); setStep('input'); setResumeText(''); }} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--muted)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                ← Analyze Again
              </button>
            </div>

            {/* Score card */}
            <div style={{ background: 'linear-gradient(135deg, rgba(79,158,255,0.08), rgba(167,139,250,0.08))', border: '1px solid var(--border2)', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: scoreColor(result.matchScore), lineHeight: 1 }}>{result.matchScore}%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.3rem' }}>Match Score</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1rem' }}>{result.recommendation}</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{result.aiSummary}</p>
              </div>
            </div>

            {/* Skills */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--accent3)', fontSize: '0.9rem' }}>✅ Skills Detected ({result.matchedSkills.length})</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {result.matchedSkills.length > 0 ? result.matchedSkills.map(s => (
                    <span key={s} style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: 'var(--accent3)', borderRadius: '20px', padding: '0.2rem 0.7rem', fontSize: '0.8rem' }}>{s}</span>
                  )) : <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>No skills detected</span>}
                </div>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--accent2)', fontSize: '0.9rem' }}>📚 Skills to Learn</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {result.missingSkills.length > 0 ? result.missingSkills.map(s => (
                    <span key={s} style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)', color: 'var(--accent2)', borderRadius: '20px', padding: '0.2rem 0.7rem', fontSize: '0.8rem' }}>{s}</span>
                  )) : <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Great! No gaps found.</span>}
                </div>
              </div>
            </div>

            {/* Top Jobs */}
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>🔥 Top Matching Jobs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {result.topJobs.map((job, i) => (
                <Link href={`/jobs/${job.id}`} key={job.id}>
                  <div style={{ background: 'var(--surface)', border: `1px solid ${i === 0 ? 'var(--border2)' : 'var(--border)'}`, borderRadius: '14px', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s', cursor: 'pointer' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                        {i === 0 && <span style={{ background: 'rgba(79,158,255,0.15)', color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: '4px' }}>BEST MATCH</span>}
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{job.title}</span>
                      </div>
                      <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{job.company} · {job.location} · {job.type}</div>
                      <div style={{ color: 'var(--accent3)', fontSize: '0.85rem', marginTop: '0.2rem', fontWeight: 600 }}>{job.salary}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: scoreColor(job.score) }}>{job.score}%</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>match</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
