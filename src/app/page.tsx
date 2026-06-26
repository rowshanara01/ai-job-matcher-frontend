'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [hovered, setHovered] = useState<number | null>(null);

  const features = [
    { icon: '🤖', title: 'AI Resume Analysis', desc: 'Paste your resume and our AI extracts your skills automatically.' },
    { icon: '🎯', title: 'Smart Job Matching', desc: 'Get a match score for every job based on your skill set.' },
    { icon: '📊', title: 'Skill Gap Report', desc: 'See exactly which skills to learn to unlock better opportunities.' },
    { icon: '⚡', title: 'Instant Results', desc: 'Get your personalized job matches in under 2 seconds.' },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Navbar */}
      <nav className="global-nav">
        <Link href="/" className="nav-logo">⚡ JobMatchAI</Link>
        <div className="nav-links">
          <Link href="/jobs" className="nav-link">Browse Jobs</Link>
          <Link href="/analyze" className="nav-link nav-cta">Analyze Resume →</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 2rem 3rem', textAlign: 'center', animation: 'fadeUp 0.6s ease' }}>
        <div style={{ display: 'inline-block', background: 'rgba(79,158,255,0.1)', border: '1px solid rgba(79,158,255,0.3)', borderRadius: '20px', padding: '0.3rem 1rem', fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          🤖 AI-POWERED · FREE · INSTANT
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Find your perfect job{' '}
          <span style={{ background: 'linear-gradient(135deg, #4f9eff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>with AI</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--muted)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Paste your resume text. Our AI analyzes your skills, finds the best matching jobs, and tells you exactly what to learn next.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/analyze" style={{ background: 'linear-gradient(135deg, #4f9eff, #6b8dff)', color: '#fff', padding: '0.9rem 2rem', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', animation: 'glow 3s ease-in-out infinite' }}>
            Analyze My Resume ✨
          </Link>
          <Link href="/jobs" style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)', padding: '0.9rem 2rem', borderRadius: '12px', fontWeight: 600, fontSize: '1rem' }}>
            Browse All Jobs →
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: '700px', margin: '0 auto 4rem', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', textAlign: 'center' }}>
        {[['8+', 'Active Jobs'], ['50+', 'Skills Tracked'], ['< 2s', 'AI Response']].map(([num, label]) => (
          <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.2rem' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)' }}>{num}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ maxWidth: '900px', margin: '0 auto 5rem', padding: '0 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 700, marginBottom: '2.5rem' }}>How it works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: '1.2rem' }}>
          {features.map((f, i) => (
            <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ background: hovered === i ? 'var(--surface2)' : 'var(--surface)', border: `1px solid ${hovered === i ? 'var(--border2)' : 'var(--border)'}`, borderRadius: '14px', padding: '1.5rem', transition: 'all 0.2s', cursor: 'default' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.95rem' }}>{f.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '3rem 2rem 5rem' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(79,158,255,0.1), rgba(167,139,250,0.1))', border: '1px solid var(--border2)', borderRadius: '20px', padding: '3rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Ready to find your dream job?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>It's free. No signup required. Just paste your resume and go.</p>
          <Link href="/analyze" style={{ background: 'linear-gradient(135deg, #4f9eff, #a78bfa)', color: '#fff', padding: '1rem 2.5rem', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', display: 'inline-block' }}>
            Get Started Free →
          </Link>
        </div>
      </div>
    </div>
  );
}
