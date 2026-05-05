// ============================================================================
// api/shop.js — GET /api/shop
// Returns shop items from server-side constants
// ============================================================================

import { ok, methodNotAllowed }  from './_helpers/response.js';
import { SHOP_ITEMS }            from './constants/shop.js';
import { PREMIUM_MONTHLY_PRICE, PREMIUM_ANNUAL_PRICE, PRO_MONTHLY_PRICE, PAYMENT_URL_MONTHLY, PAYMENT_URL_ANNUAL, PAYMENT_URL_PRO } from './constants/premium.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') return ok();
  if (req.method !== 'GET') return methodNotAllowed();

  return ok({
    items: SHOP_ITEMS,
    pricing: {
      premiumMonthly: PREMIUM_MONTHLY_PRICE,
      premiumAnnual:  PREMIUM_ANNUAL_PRICE,
      pro:            PRO_MONTHLY_PRICE,
      urls: {
        monthly: PAYMENT_URL_MONTHLY,
        annual:  PAYMENT_URL_ANNUAL,
        pro:     PAYMENT_URL_PRO,
      },
    },
  });
}

export const config = { runtime: 'edge' };