# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Goods Cheaper** — a responsive web app for real-time price-per-unit comparison between two products. Target URL: `https://cheaper.myifew.com`.

The full requirements are in [.requirement/requriement.md](.requirement/requriement.md).

## Planned Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (React) |
| Database / Auth | Supabase (real-time sync, OAuth via Google & Facebook) |
| Hosting | Vercel |
| PWA | Service Worker for mobile offline support |

## Setup & Development Commands

```bash
npm install          # Install dependencies (first time)
cp .env.local.example .env.local   # Then fill in Supabase credentials

npm run dev          # Start local dev server  →  http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
```

### Supabase setup
1. Create a project at supabase.com, copy URL + anon key to `.env.local`.
2. Run `supabase/migrations/001_init.sql` in the SQL editor.
3. Enable Google & Facebook OAuth providers in Authentication → Providers.
4. Set redirect URL: `https://your-domain/auth/callback`.

## Architecture

### File Structure
```
src/
  app/
    layout.tsx              ← pass-through root layout
    [locale]/
      layout.tsx            ← html/body + NextIntlClientProvider + Header + BottomNav
      page.tsx              ← Compare page (client component)
      history/page.tsx      ← Server component (fetches from Supabase server-side)
      settings/page.tsx     ← Server component
    auth/callback/route.ts  ← OAuth code-exchange handler
  components/               ← All client components ('use client')
  lib/
    comparison.ts           ← Pure comparison engine (no side effects)
    units.ts                ← Unit definitions & UNIT_GROUPS
    supabase/{client,server}.ts
  stores/comparisonStore.ts ← Zustand store (productA, productB, result, currency)
  i18n/{routing,request,navigation}.ts
  types/index.ts
messages/{locale}.json      ← 13 locale files
supabase/migrations/        ← SQL schema
```

### Comparison Engine (`src/lib/comparison.ts`)
Pure function `compare(a, b) → ComparisonResult`. No side effects.
- Normalises quantities to base units (ml, g, pcs) using `UNITS` from `units.ts`.
- Returns `winner: 'A' | 'B' | 'tie' | null`, unit prices, savings % and cash.
- Returns `error: 'unit_mismatch'` when unit categories differ, `'invalid_input'` when price/qty ≤ 0.
- Results update in real-time (<100ms) — the Zustand store calls `compare()` on every input change.

### State (`src/stores/comparisonStore.ts`)
Zustand store holds `productA`, `productB`, `result` (auto-computed), and `currency`.
`updateProductA / updateProductB` patches state and recomputes result immediately.

### i18n (next-intl v3)
- Locale routing via `src/i18n/routing.ts` → `defineRouting`.
- Message files at `messages/{locale}.json` (13 locales).
- Server components use `getTranslations()`; client components use `useTranslations()`.
- Locale-aware `Link`, `useRouter`, `usePathname` from `src/i18n/navigation.ts`.
- Language change: call `router.replace(pathname, { locale })` from `SettingsForm` or `Header`.

### Auth Flow
- `AuthButton` uses `createBrowserClient` from `@supabase/ssr`.
- OAuth redirects to `/auth/callback` which exchanges the code via server client.
- History/settings pages check auth server-side; unauthenticated users see a prompt (no redirect).
- Profile row is auto-created by a Postgres trigger on first sign-up.

### Responsive Layout
- Mobile: stacked ProductCards + fixed BottomNav (`lg:hidden`).
- Desktop: side-by-side cards + Header nav links (`hidden lg:flex`). BottomNav hidden.
