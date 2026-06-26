JobMatchAI — Frontend

> AI-powered job matching platform built with Next.js 14 and TypeScript.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

## 🌐 Live Demo
👉 https://your-app.vercel.app

## ✨ Features
- **AI Resume Analyzer** — Paste your resume, skills extracted instantly
- **Smart Job Matching** — See match % for every job
- **Skill Gap Report** — Know exactly what to learn next
- **Job Browser** — Filter by Remote, Hybrid, On-site
- **Fully Responsive** — Mobile, tablet, desktop

## 🛠 Tech Stack
| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type-safe development |
| Fetch API | HTTP requests to backend |

## 🚀 Getting Started
```bash
git clone https://github.com/your-username/job-matcher-frontend.git
cd job-matcher-frontend
npm install
cp .env.example .env.local
npm run dev
```

**.env.local**
NEXT_PUBLIC_API_URL=http://localhost:8000

## ☁️ Deploy on Vercel
1. Push to GitHub
2. Go to vercel.com → New Project → Import repo
3. Add environment variable: `NEXT_PUBLIC_API_URL` = your Render URL
4. Click Deploy ✅

## 🔗 Related
- [Backend Repo](https://github.com/your-username/job-matcher-backend)

## 📄 License
MIT

Backend README:
# ⚡ JobMatchAI — Backend

> REST API for AI-powered job matching — Node.js + Express + TypeScript.

![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Express](https://img.shields.io/badge/Express-4-black?style=flat-square&logo=express)
![Render](https://img.shields.io/badge/Deployed-Render-purple?style=flat-square)

## 🌐 Live API
👉 https://your-backend.onrender.com/api/health

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server status |
| POST | `/api/analyze` | Analyze resume → job matches |
| GET | `/api/jobs` | All job listings |
| GET | `/api/jobs/:id` | Single job detail |

## 🚀 Getting Started
```bash
git clone https://github.com/your-username/job-matcher-backend.git
cd job-matcher-backend
npm install
cp .env.example .env
npm run dev
```

**.env**
PORT=8000

FRONTEND_URL=http://localhost:3000

## ☁️ Deploy on Render
1. Push to GitHub
2. Go to render.com → New Web Service → Connect repo
3. Build: `npm install && npm run build`
4. Start: `node dist/index.js`
5. Add env: `FRONTEND_URL` = your Vercel URL
6. Deploy ✅

## 🔗 Related
- [Frontend Repo](https://github.com/your-username/job-matcher-frontend)

## 📄 License
MIT
