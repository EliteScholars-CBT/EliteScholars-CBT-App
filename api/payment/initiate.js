// ============================================================================
// api/payment/initiate.js — POST /api/payment/initiate
// Creates a Flutterwave payment session server-side
// ============================================================================

import { sendOk, sendErr, sendMethodNotAllowed, setCors } from '../_helpers/response.js';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

const PLAN_AMOUNTS = { monthly: 9000, annual: 89000, pro: 3000 };
const PLAN_NAMES   = {
  monthly: 'EliteScholars Premium Monthly',
  annual:  'EliteScholars Premium Annual',
  pro:     'EliteScholars Pro',
};

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendMethodNotAllowed(res);

  const { email, name, plan } = req.body || {};
  if (!email || !name || !plan)  return sendErr(res, 'email, name and plan are required.');
  if (!PLAN_AMOUNTS[plan])       return sendErr(res, 'Invalid plan.');

  const amount      = PLAN_AMOUNTS[plan];
  const txRef       = `ES-${plan.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  const redirectUrl = `https://elitescholars.site/api/payment/verify?tx_ref=${txRef}&plan=${plan}&email=${encodeURIComponent(email)}`;

  const payload = {
    tx_ref:       txRef,
    amount,
    currency:     'NGN',
    redirect_url: redirectUrl,
    customer:     { email, name },
    customizations: {
      title:       'EliteScholars',
      description: PLAN_NAMES[plan],
      logo:        'https://elitescholars.site/android-chrome-192x192.png',
    },
    meta: { plan, email },
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
  if (data.status !== 'success') return sendErr(res, data.message || 'Failed to initiate payment.');

  return sendOk(res, { paymentLink: data.data.link, txRef, plan, amount });
}