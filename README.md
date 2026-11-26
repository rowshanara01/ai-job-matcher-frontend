#### 🚀 JobMatchAI (Frontend + Backend)

> AI-powered job matching platform builts with **Next.js 14**, **Node.js**, **Express**, and **TypeScript**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4-black?style=flat-square&logo=express)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-purple?style=flat-square)

---

#### 🌐 Live Links
- **Frontend Live Demo:** 👉 https://your-app.vercel.app
- **Backend Live API:** 👉 https://your-backend.onrender.com/api/health

---

#### ✨ Features
- **AI Resume Analyzer** — Paste your resume, skills extracted instantly
- **Smart Job Matching** — See match % for every job
- **Skill Gap Report** — Know exactly what to learn next
- **Job Browser** — Filter by Remote, Hybrid, On-site
- **Fully Responsive** — Mobile, tablet, desktop

---

#### 🛠 Tech Stack

| Part | Technology | Purpose |
|------|------------|---------|
| Frontend | Next.js 14 | React framework with App Router |
| Frontend | TypeScript | Type-safe development |
| Frontend | Fetch API | HTTP requests to backend |
| Backend | Node.js 20 & Express 4 | REST API server |
| Backend | TypeScript | Type-safe API & matching logic |

---

#### 📡 API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server status |
| POST | `/api/analyze` | Analyze resume → job matches |
| GET | `/api/jobs` | All job listings |
| GET | `/api/jobs/:id` | Single job detail |

---

#### 🚀 Getting Started

#### 1. Frontend Setup
```bash
git clone https://github.com/your-username/job-matcher-frontend.git
cd job-matcher-frontend
npm install
cp .env.example .env.local
npm run dev
```

**.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### 2. Backend Setup
```bash
git clone https://github.com/your-username/job-matcher-backend.git
cd job-matcher-backend
npm install
cp .env.example .env
npm run dev
```

**.env**
```env
PORT=8000
FRONTEND_URL=http://localhost:3000
```

---

#### ☁️ Deployment

#### Deploy Frontend on Vercel
1. Push to GitHub
2. Go to vercel.com → New Project → Import repo
3. Add environment variable: `NEXT_PUBLIC_API_URL` = your Render URL
4. Click Deploy ✅

#### Deploy Backend on Render
1. Push to GitHub
2. Go to render.com → New Web Service → Connect repo
3. Build: `npm install && npm run build`
4. Start: `node dist/index.js`
5. Add env: `FRONTEND_URL` = your Vercel URL
6. Deploy ✅

---

#### 🐛 Issues Faced & How I Fixed Them

#### Frontend Issues
1. **CORS Policy Blocking API Requests in Production**
   - **Issue:** Browser `fetch` calls from Vercel (`*.vercel.app`) to Render (`*.onrender.com`) failed with CORS errors.
   - **Fix:** Set `FRONTEND_URL` on the backend to the exact Vercel domain (without a trailing slash) and ensured proper `Content-Type: application/json` headers on requests.

2. **`NEXT_PUBLIC_API_URL` Returning `undefined` After Deployment**
   - **Issue:** Client-side requests hit `undefined/api/...` even after adding the env variable in Vercel.
   - **Fix:** Because Next.js embeds `NEXT_PUBLIC_*` variables at build time, triggered a fresh redeploy on Vercel after saving the variable.

3. **Slow Initial Load / Timeout from Render Cold Start**
   - **Issue:** Render's free tier sleeps after inactivity, making the first `/api/analyze` call take 30–50 seconds.
   - **Fix:** Added loading skeletons, `AbortController` timeout handling, clear retry states, and a lightweight `/api/health` ping on load to wake up the server early.

4. **Next.js 14 App Router Client/Server Boundary & Type Errors**
   - **Issue:** Vercel builds failed due to React hooks inside Server Components and strict TypeScript checks on API responses.
   - **Fix:** Added `'use client'` only to interactive components (Resume Analyzer, Job Filters) and defined strict TypeScript interfaces for job and match data.

#### Backend Issues
1. **CORS Origin Mismatch Between Local & Vercel URLs**
   - **Issue:** Preflight (`OPTIONS`) requests were rejected in production due to origin/trailing-slash mismatches.
   - **Fix:** Normalized `FRONTEND_URL` and configured Express `cors` middleware to explicitly allow `GET`, `POST`, and `OPTIONS` from the allowed origin.

2. **Render Deployment Failing on `node dist/index.js`**
   - **Issue:** Build completed, but starting the app threw `Cannot find module 'dist/index.js'`.
   - **Fix:** Configured `rootDir: "./src"` and `outDir: "./dist"` in `tsconfig.json` and ensured TypeScript types (`@types/express`, `@types/node`) were properly resolved so `npm run build` outputs `dist/index.js`.

3. **Port Binding Failure on Render**
   - **Issue:** Server failed Render's health check when hardcoded to port `8000`.
   - **Fix:** Updated the server listener to `process.env.PORT || 8000` so Render can bind its dynamic port.

4. **Unhandled Errors & Payload Issues in `POST /api/analyze`**
   - **Issue:** Long pasted resumes or malformed request bodies caused `500 Internal Server Error` crashes.
   - **Fix:** Increased body size limit via `express.json({ limit: '2mb' })`, added input validation, normalized skill matching (case-insensitive), and added centralized error-handling middleware for clean JSON error responses.

---

#### 🔗 Repositories
- [Frontend Repo](https://github.com/your-username/job-matcher-frontend)
- [Backend Repo](https://github.com/your-username/job-matcher-backend)

#### 📄 License
MIT
