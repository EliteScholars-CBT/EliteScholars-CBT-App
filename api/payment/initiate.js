// ============================================================================
// api/payment/initiate.js — POST /api/payment/initiate
// Creates a Flutterwave payment session server-side
// ============================================================================

import { ok, err, methodNotAllowed } from '../_helpers/response.js';

const FLW_SECRET_KEY    = process.env.FLW_SECRET_KEY;
const PREMIUM_MONTHLY   = 9000;
const PREMIUM_ANNUAL    = 89000;
const PRO_MONTHLY       = 3000;

const PLAN_AMOUNTS = {
  monthly: PREMIUM_MONTHLY,
  annual:  PREMIUM_ANNUAL,
  pro:     PRO_MONTHLY,
};

const PLAN_NAMES = {
  monthly: 'EliteScholars Premium Monthly',
  annual:  'EliteScholars Premium Annual',
  pro:     'EliteScholars Pro',
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') return ok();
  if (req.method !== 'POST') return methodNotAllowed();

  let body;
  try { body = await req.json(); }
  catch { return err('Invalid request body.'); }

  const { email, name, plan } = body;

  if (!email || !name || !plan) return err('email, name and plan are required.');
  if (!PLAN_AMOUNTS[plan])     return err('Invalid plan. Choose monthly, annual or pro.');

  const amount    = PLAN_AMOUNTS[plan];
  const txRef     = `ES-${plan.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  const redirectUrl = `https://elitescholars.site/payment/verify?tx_ref=${txRef}&plan=${plan}&email=${encodeURIComponent(email)}`;

  const payload = {
    tx_ref:       txRef,
    amount,
    currency:     'NGN',
    redirect_url: redirectUrl,
    customer: {
      email,
      name,
    },
    customizations: {
      title:       'EliteScholars',
      description: PLAN_NAMES[plan],
      logo:        'https://elitescholars.site/android-chrome-192x192.png',
    },
    meta: {
      plan,
      email,
    },
  };

  const response = await fetch('https://api.flutterwave.com/v3/payments', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${FLW_SECRET_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.status !== 'success') {
    return err(data.message || 'Failed to initiate payment.');
  }

  return ok({
    paymentLink: data.data.link,
    txRef,
    plan,
    amount,
  });
}

export const config = { runtime: 'edge' };