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

## Development Commands

Once the project is scaffolded (e.g., `npx create-next-app@latest`), the standard commands will be:

```bash
npm run dev          # Start local dev server
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Run tests (add Jest/Vitest when set up)
```

## Architecture

### Core Feature: Comparison Engine
- Lives in a client-side module (no server round-trip needed) — results must appear within **<100ms** of input change.
- Calculation: `unit_price = (price - discount) / quantity`, normalized to a common unit before comparison.
- Discount can be percentage or flat cash amount (toggle).

### Pages / Routes
- `/` — Comparison Dashboard (the calculator)
- `/history` — Logged-in users only; searchable/filterable archive; CSV/PDF export
- `/settings` — Language, currency, unit system preferences

### Authentication Flow
- Guest mode: fully functional, state in local storage only.
- Logged-in: Supabase Auth with Google and Facebook OAuth. "Remember Me" via persistent session.
- History and settings are cloud-synced for authenticated users.

### Localization
- 13 languages: English, Thai, Chinese (Traditional/Simplified), French, Russian, German, Spanish, Vietnamese, Japanese, Arabic, Hindi, Kazakh.
- Use `next-i18next` or Next.js built-in i18n routing.
- Support Metric and Imperial unit systems; configurable default currency.

### Responsive Layout
- **Mobile-first**. Stacked card layout on mobile, side-by-side on desktop.
- Bottom navigation bar on mobile (Compare / History / Settings).
- Header on desktop: Logo, Language Selector, Profile/Login.
