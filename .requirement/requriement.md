# Product Requirements Document (PRD): Goods Cheaper Web Application

## 1. Project Overview
**App Name:** Goods Cheaper (Web Version)
**URL:** https://cheaper.myifew.com
**Objective:** A responsive static web app for quick price-per-unit comparisons. No login required. Works on mobile and desktop.

---

## 2. Functional Requirements

### 2.1 Comparison Dashboard
- Two product cards **side-by-side** on all screen sizes (mobile + desktop).
- **Field order:** Price → Quantity → Name (optional) → Discount
- **Price:** Numeric input, no currency label (unitless).
- **Quantity:** Numeric input. Placeholder hints: ชิ้น, กรัม, มล., กล่อง. No unit dropdown.
- **Name:** Text input, optional.
- **Discount:** Toggle between `%` (percent) and `ราคา` (flat cash), plus numeric input.
- **Real-time result:** Unit price = (price after discount) ÷ quantity, shown in each card.
- **Winner:** Lower unit price card gets green border + 🏆 badge.
- **Price display:** 2 decimal places, no currency symbol.

### 2.2 No Authentication
- No sign in / sign up.
- All data stored in browser `localStorage`.

### 2.3 History
- Save comparison to `localStorage` via "Save comparison" button (shown after result).
- History page (`history.html`) lists saved comparisons with winner, unit prices, date.
- Delete individual entries or clear all.

### 2.4 Language
- 13 languages: Thai, English, Traditional Chinese, Simplified Chinese, French, Russian, German, Spanish, Vietnamese, Japanese, Arabic, Hindi, Kazakh.
- Language selector in header (dropdown).
- Selected language stored in `localStorage`.
- No URL-based routing for locale.

---

## 3. Technical Requirements

| Feature | Specification |
| :--- | :--- |
| **Stack** | Plain HTML + Vanilla JS + Tailwind CSS (CDN) |
| **No framework** | No Next.js, no React, no TypeScript |
| **Storage** | localStorage only |
| **Auth** | None |
| **Host** | Vercel (static, no build step) |
| **Performance** | Result < 100ms on every input change |

---

## 4. UI Layout

### All screen sizes
- **Header:** 🛒 Goods Cheaper logo · Nav links (Compare / History) · Language dropdown
- **Main:** Two cards side by side
- **Mobile bottom nav:** ⚖️ Compare · 📋 History (fixed bottom, hidden on lg+)

### Card layout (both cards identical)
```
[ ราคา (ตัวเลข)                    ]
[ ปริมาณ เช่น ชิ้น, กรัม, มล.     ]
[ ชื่อสินค้า (ไม่บังคับ)            ]
[ % | ราคา ][ ส่วนลด               ]
[ ผลลัพธ์: X.XX ต่อหน่วย           ]  ← shows after both cards have valid input
```

---

## 5. Out of Scope (removed from original PRD)
- User authentication (Google/Facebook OAuth)
- Cloud sync / Supabase
- Settings page (currency, unit system)
- Export CSV/PDF
- Unit selector dropdown (g, ml, pcs, etc.)
- URL-based locale routing
