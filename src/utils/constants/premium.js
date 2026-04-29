// ============================================================================
// constants/premium.js — Freemium limits and pricing
// ============================================================================

// ── Free-tier limits ──────────────────────────────────────────────────────────
export const FREE_TOPICS_PER_DAY  = 5;   // max learn-mode topics per day
export const FREE_SESSION_MINUTES = 60;  // max CBT/learn time per session (minutes)
export const FREE_COOLDOWN_HOURS  = 4;   // hours before they can continue after limit

// ── Premium pricing ───────────────────────────────────────────────────────────
export const PREMIUM_MONTHLY_PRICE = 9000;   // ₦9,000/month
export const PREMIUM_ANNUAL_PRICE  = 89000;  // ₦89,000/year

// ── Pro plan ──────────────────────────────────────────────────────────────────
export const PRO_MONTHLY_PRICE = 3000;   // ₦3,000/month
export const PAYMENT_URL_PRO   = 'https://selar.co/elitescholars-pro';

// ── Calculated discount ───────────────────────────────────────────────────────
export const PREMIUM_ANNUAL_SAVINGS = PREMIUM_MONTHLY_PRICE * 12 - PREMIUM_ANNUAL_PRICE;
export const PREMIUM_ANNUAL_DISCOUNT_PCT = Math.round(
  (PREMIUM_ANNUAL_SAVINGS / (PREMIUM_MONTHLY_PRICE * 12)) * 100
);

// ── Payment gateway ───────────────────────────────────────────────────────────
// Set USE_REAL_PAYMENT to true when ready to go live
export const USE_REAL_PAYMENT     = false;
export const PAYMENT_URL_MONTHLY  = 'https://selar.co/elitescholars-monthly';
export const PAYMENT_URL_ANNUAL   = 'https://selar.co/elitescholars-annual';