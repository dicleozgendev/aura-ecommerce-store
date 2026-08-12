# AURA E-Commerce Platform ⚡

A high-converting, modern, ultra-fast React E-Commerce Store & SaaS Platform equipped with built-in CRO (Conversion Rate Optimization) marketing tools, AI product recommendations, multi-currency support, and a password-protected Admin Dashboard.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-6366f1?style=for-the-badge&logo=vercel)](https://ecommerce-store-umber-two.vercel.app)

---

## 🌟 Key Features

- **⚡ Lightning-Fast Performance**: Built with Vite + React for <1s page loads.
- **🎨 Glassmorphic Premium Design**: Dark/Light theme mode, responsive CSS layout, and micro-interactions.
- **🤖 Aura AI Smart Recommender**: Intelligent shopping assistant widget matching products to customer preferences.
- **📈 CRO Marketing Tools**:
  - Real-time **Social Proof Notifications** ("X purchased Y 2 mins ago").
  - **Exit-Intent Coupon Modal** for capturing email leads.
  - **Free Shipping Threshold** progress bar in the shopping cart.
  - Interactive **Accessory Upsell Bundles**.
- **🌐 Global Commerce Ready**:
  - Multi-Currency switcher ($ USD, € EUR, ₺ TRY).
  - Multi-Language engine (English & Turkish).
- **👑 Encrypted Admin Dashboard**:
  - Analytics overview (Total Revenue, AOV, Order count, Captured leads).
  - Stateful Order Management (Processing → Shipped → Completed).
  - Real-time Product Catalog & Inventory stock editor (+/-).
  - Payment Gateway API Configuration (Stripe, PayPal, WhatsApp).

---

## 🌐 Live Interactive Demo

Test the live store directly in your browser:
👉 **[https://ecommerce-store-umber-two.vercel.app](https://ecommerce-store-umber-two.vercel.app)**

*Demo Admin Access:* `admin` / `aura2026` — this is a static, front-end-only demo (no real backend, payments or user data behind it), so this login is for portfolio evaluation purposes only.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6
- **Styling**: Modern Vanilla CSS, Glassmorphism System, Flexbox/Grid
- **Icons**: Lucide React Icons
- **Effects**: Canvas Confetti
- **Deployment**: Vercel Serverless Platform

---

## 🚀 Local Development Setup

**Step 1 — Clone the repository:**
```bash
git clone https://github.com/dicleozgendev/aura-ecommerce-store.git
cd aura-ecommerce-store
```

**Step 2 — Install dependencies:**
```bash
npm install
```

**Step 3 — Start local development server:**
```bash
npm run dev
```

**Step 4 —** Open `http://localhost:3000` in your browser.

---

## 🔐 Admin Authentication

The "Admin Access" panel is backed by real server-side auth (Vercel
serverless functions in `api/`), not a password hardcoded in the
frontend bundle:

- `api/admin-login.js` checks the submitted username/password against
  `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH` (a bcrypt hash — never a
  plaintext password) and, on success, sets a signed, HttpOnly session
  cookie (`ADMIN_JWT_SECRET`).
- `api/admin-verify.js` / `api/admin-logout.js` check and clear that
  cookie.

To run the admin panel locally or after forking this repo, set the
three environment variables described in `.env.example` (locally in a
`.env` file, or on Vercel under Project → Settings → Environment
Variables). Without them, the login endpoint responds with a clear
"Admin auth is not configured" error instead of silently failing open.

---

## 📜 License

Distributed under the MIT License. Developed by [dicleozgendev](https://github.com/dicleozgendev).
