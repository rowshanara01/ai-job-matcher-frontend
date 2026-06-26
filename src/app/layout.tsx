import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Job Matcher — Find Your Perfect Job',
  description: 'Paste your resume, get AI-powered job matches instantly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
