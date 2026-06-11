# AcdyOn — Academic Pathway Recommendation Engine

AI-powered academic credential advisor built with React 18 + Vite, Supabase, and Claude (Anthropic).

---

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Frontend      | React 18 + Vite                     |
| Styling       | Tailwind CSS v3                     |
| Routing       | React Router v6                     |
| Database      | Supabase (PostgreSQL)               |
| AI Engine     | Claude Sonnet via Anthropic API     |
| Deployment    | Vercel                              |
| Icons         | lucide-react                        |
| Notifications | react-hot-toast                     |

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

> The `ANTHROPIC_API_KEY` is **server-side only** — set it in Vercel's environment variables (no `VITE_` prefix), never in `.env.local`.

### 3. Set up Supabase database

1. Create a new project at https://supabase.com
2. Go to **SQL Editor** and run the contents of `supabase-setup.sql`
3. Verify the `submissions` table appears in the Table Editor

### 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000

---

## Deployment (Vercel)

```bash
git init
git add .
git commit -m "feat: initial Academic Pathway Engine"
git remote add origin https://github.com/YOUR_USERNAME/academic-pathway-engine.git
git push -u origin main
```

1. Go to https://vercel.com/new and import your repository
2. Framework: **Vite** (auto-detected)
3. Add environment variables in Vercel dashboard:
   - `ANTHROPIC_API_KEY` = your Anthropic API key (**no** VITE_ prefix)
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
4. Click **Deploy**

---

## Routes

| Path           | Description                          |
|----------------|--------------------------------------|
| `/`            | Landing page with hero + features    |
| `/recommend`   | 3-step assessment form + AI result   |
| `/submissions` | Admin table of all past submissions  |

---

## How It Works

1. User fills in their profile (name, email, qualification, experience, profession, goal)
2. App calls `/api/recommend` — a Vercel serverless function that sends the profile to Claude Sonnet
3. Claude returns a structured JSON recommendation (pathway type + reasoning)
4. If the AI call fails, the local rules-based engine (`src/lib/recommendationEngine.js`) is used as fallback
5. The result is stored in Supabase and displayed to the user
6. All submissions are viewable at `/submissions`

---

## Security Notes

- The Anthropic API key only exists in `api/recommend.js` (Vercel serverless) — never in frontend code
- Supabase RLS policies restrict access to anonymous insert + select only
- `vercel.json` rewrites handle client-side routing (no 404 on direct URL navigation)
