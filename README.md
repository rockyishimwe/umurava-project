# TalentScreen AI (Frontend)

Production-ready frontend for **TalentScreen AI** — an AI-powered candidate screening tool for HR recruiters (Umurava AI Hackathon).

## Tech stack (strict)

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Redux Toolkit**
- **Axios**
- **Framer Motion**
- **Recharts**
- **Lucide React**
- **React Hot Toast**
- **React Dropzone**

## Design system tokens

Tailwind tokens are defined in `tailwind.config.ts` and mapped to:

- **primary**: `#0F172A`
- **accent**: `#3B82F6` (hover: `#2563EB`)
- **success/warning/danger**: `#10B981` / `#F59E0B` / `#EF4444`
- **bg/card/border**: `#F8FAFC` / `#FFFFFF` / `#E2E8F0`
- **text-primary/text-muted**: `#0F172A` / `#64748B`

Typography uses **Inter** via `next/font`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` — you’ll land on the **marketing homepage**. Use **Get started** / **Sign in** for the auth screens (demo: no real backend; forms redirect into the app).

## Environment variables

All API calls go through `src/lib/api.ts` (Axios) and use:

- `NEXT_PUBLIC_API_URL`
  - If omitted, the app runs in **mock mode** (`mock://local`) with realistic local dummy data.

## Routes

### Public

- **Landing**: `/`
- **Login** (demo): `/login`
- **Register** (demo): `/register`

### App (after sign-in / “Skip to app demo”)

- **Dashboard**: `/dashboard`
- **Create Job (4-step)**: `/jobs/new`
- **Job detail**: `/jobs/[id]`
- **Applicant ingestion**: `/screening/[id]`
- **AI screening progress** (auto-redirect ~5s): `/screening/[id]/progress`
- **Shortlist results**: `/screening/[id]/results`
- **Candidate detail**: `/candidates/[id]`
- **Settings**: `/settings`

## Chatbot (demo)

A floating **TalentScreen Copilot** widget is included globally (mock responses) at:

- `src/components/chat/ChatBotWidget.tsx`

## What to improve next (suggested)

1. **Real auth** — Replace demo login/register with NextAuth, Clerk, or your API; protect `/dashboard` and below with middleware.
2. **One shell for all app routes** — Reuse the dashboard layout (sidebar + header) for jobs, screening, and candidates so navigation is consistent everywhere.
3. **Mobile nav** — Add a drawer/hamburger when the sidebar is hidden.
4. **Jobs index** — Add `/jobs` listing before “new” and detail.
5. **Tests** — Smoke tests for landing → login → dashboard and a screening flow.

## Notes

- This repo is currently **frontend-only**; data is mocked in `src/lib/mockData.ts`.
- Redux slices are in `src/store/slices/`.
