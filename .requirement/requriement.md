# Product Requirements Document (PRD): Goods Cheaper Web Application

## 1. Project Overview
**App Name:** Goods Cheaper (Web Version)
**URL Concept:** https://cheaper.myifew.com
**Objective:** A responsive web application designed for quick price-per-unit comparisons. It allows shoppers to compare values on-the-go via mobile browsers or at home via desktop, with cloud-sync capabilities for registered users.

---

## 2. Functional Requirements

### 2.1 Comparison Dashboard (Responsive)
The core interface must be fully responsive, adjusting its layout between Desktop (Side-by-side) and Mobile (Stacked) views.

* **Dual-Input Interface:** Two distinct sections for **Product A** and **Product B**.
* **Input Parameters:**
    * **Product/Brand Name (Optional):** Text input.
    * **Price:** Numerical input with support for decimal points.
    * **Quantity/Volume:** Numerical input.
    * **Unit Selector:** Dropdown menu (Pcs, Pack, ml, Liter, Gram, Kilogram, etc.).
* **Advanced Discount Logic:**
    * **Toggle Switch:** Choose between **Percentage (%)** or **Flat Rate (Cash)**.
    * **Calculation:** Automatic deduction from the total price before calculating the unit price.
* **Real-time Results:**
    * **Dynamic Highlight:** The "Cheaper" item is immediately highlighted with a "Winner" badge or green glow.
    * **Price Difference:** Show exactly how much (in % or currency) the user saves by picking the cheaper option.

### 2.2 User Authentication & Cloud Sync
* **Web SSO (Single Sign-On):** * Login via **Google (Gmail)**.
    * Login via **Facebook**.
* **Session Management:** "Remember Me" functionality to keep users logged in across browser sessions.
* **Guest Access:** Fully functional calculator for non-registered users (Local session only).

### 2.3 Comparison History & Data Management
* **Personal Archive:** A dedicated "History" page for logged-in users.
* **Search & Filter:** Users can search through their history by product name or date.
* **Export Data:** Ability to export comparison history to **CSV or PDF** (Exclusive to Web version).

### 2.4 Localization & Global Settings
* **Multi-Language Support (13 Languages):** * English, Thai, Chinese (Traditional/Simplified), French, Russian, German, Spanish, Vietnamese, Japanese, Arabic, Hindi, Kazakh.
* **Currency/Unit Localization:** Ability to set default currency and preferred unit systems (Metric/Imperial).

---

## 3. Technical & Performance Requirements

| Feature | Specification |
| :--- | :--- |
| **Framework** | React.js, Next.js, or Vue.js (for high performance). |
| **Responsiveness** | Mobile-first Design (PWA - Progressive Web App support recommended). |
| **Database** | Supabase (Real-time data syncing). |
| **SEO** | Basic SEO optimization for the landing page to drive organic traffic. |
| **Security** | HTTPS encryption and secure OAuth 2.0 protocols. |
| **Host** | Vercel |

---

## 4. User Interface (UI) Layout Concept

### Desktop View
- **Header:** Logo (Goods Cheaper), Language Selector, Profile/Login.
- **Main:** Two large cards side-by-side (Item A | Item B).
- **Footer:** History Preview and Settings.

### Mobile Web View
- **Main:** Stacked cards (Item A on top, Item B below).
- **Bottom Navigation:** Quick links to "Compare", "History", and "Settings".

---

## 5. Success Metrics
* **Calculation Speed:** Result should appear within < 100ms of input change.
* **User Retention:** Percentage of users who return and log in to save history.
* **Conversion:** Increase in "Sign-ups" compared to "Guest sessions."