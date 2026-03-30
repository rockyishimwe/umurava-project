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

Open `http://localhost:3000` (root redirects to `/dashboard`).

## Environment variables

All API calls go through `src/lib/api.ts` (Axios) and use:

- `NEXT_PUBLIC_API_URL`
  - If omitted, the app runs in **mock mode** (`mock://local`) with realistic local dummy data.

## Routes implemented

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

## Notes

- This repo is currently **frontend-only**; data is mocked in `src/lib/mockData.ts`.
- Redux slices are in `src/store/slices/`.
