// ============================================================================
// api/payment/verify.js — GET /api/payment/verify?tx_ref=...&plan=...&email=...
// Called after Flutterwave redirects back — verifies payment and activates plan
// ============================================================================

import { sendErr, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { sheetsGet } from '../_helpers/sheets.js';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return sendMethodNotAllowed(res);

  const { tx_ref, plan, email, status } = req.query;

  if (!tx_ref || !plan || !email) return sendErr(res, 'Missing parameters.');
  if (status === 'cancelled') {
    return res.redirect(`https://elitescholars.site/?payment=cancelled`);
  }

  const response = await fetch(
    `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`,
    { headers: { 'Authorization': `Bearer ${FLW_SECRET_KEY}` } }
  );

  const data = await response.json();

  if (
    data.status !== 'success' ||
    data.data.status !== 'successful' ||
    data.data.currency !== 'NGN' ||
    data.data.customer.email.toLowerCase() !== email.toLowerCase()
  ) {
    return res.redirect(`https://elitescholars.site/?payment=failed`);
  }

  const expiresAt = plan === 'annual'
    ? Date.now() + 365 * 24 * 60 * 60 * 1000
    : Date.now() +  30 * 24 * 60 * 60 * 1000;

  await sheetsGet({
    action:    'activatePremium',
    email:     email.toLowerCase().trim(),
    plan,
    txRef:     tx_ref,
    expiresAt: String(expiresAt),
    amount:    String(data.data.amount),
  });

  return res.redirect(
    `https://elitescholars.site/?payment=success&plan=${plan}&email=${encodeURIComponent(email)}`
  );
}