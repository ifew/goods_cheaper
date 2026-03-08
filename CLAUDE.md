# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Goods Cheaper** — static web app for real-time price-per-unit comparison between two products.
Target URL: `https://cheaper.myifew.com`

## Tech Stack

| Layer | Choice |
| --- | --- |
| Frontend | Plain HTML + Vanilla JS |
| Styling | Tailwind CSS (CDN) |
| Storage | localStorage (browser) |
| Hosting | Vercel (static) |

## File Structure

```
index.html      ← Compare page (main)
history.html    ← History page
vercel.json     ← Vercel static config (outputDirectory: ".")
CLAUDE.md
```

## No build step — open index.html directly in browser to test locally.

## Features

- **Compare page** (`index.html`): Two product cards side-by-side on all screen sizes.
  - Field order: Price → Quantity → Name (optional) → Discount
  - Discount toggle: `%` or `Price` (flat)
  - Real-time unit price calculation (price / qty after discount)
  - Winner highlighted green, loser stays gray
  - Save to localStorage via "Save comparison" button
- **History page** (`history.html`): Reads from `localStorage`, delete per item or clear all.
- **Language**: 13 locales (th, en, zh-TW, zh-CN, fr, ru, de, es, vi, ja, ar, hi, kk), stored in `localStorage`.
  - All translations embedded as `LANG` object in each HTML file.
- **No auth, no backend, no build tools.**

## Comparison Logic (in index.html `<script>`)

```js
effectivePrice = discType === 'percent'
  ? price * (1 - min(disc, 100) / 100)
  : max(0, price - disc)

unitPrice = effectivePrice / quantity
winner = unitPriceA < unitPriceB ? 'a' : unitPriceA > unitPriceB ? 'b' : 'tie'
```

## localStorage Keys

| Key | Value |
| --- | --- |
| `locale` | current language code e.g. `"th"` |
| `gc_history` | JSON array of saved comparisons (max 200) |

## Deploy to Vercel

Push to git — Vercel reads `vercel.json` and serves static files from repo root automatically. No build command needed.
