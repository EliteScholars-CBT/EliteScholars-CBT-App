// ============================================================================
// api/payment/verify.js — GET /api/payment/verify?tx_ref=...&plan=...&email=...
// Called after Flutterwave redirects back — verifies payment and activates plan
// ============================================================================

import { ok, err, methodNotAllowed } from '../_helpers/response.js';
import { sheetsGet }                 from '../_helpers/sheets.js';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

export default async function handler(req) {
  if (req.method === 'OPTIONS') return ok();
  if (req.method !== 'GET') return methodNotAllowed();

  const { searchParams } = new URL(req.url);
  const txRef  = searchParams.get('tx_ref');
  const plan   = searchParams.get('plan');
  const email  = searchParams.get('email');
  const status = searchParams.get('status');

  if (!txRef || !plan || !email) return err('Missing parameters.');
  if (status === 'cancelled') return err('Payment was cancelled.');

  // Verify with Flutterwave
  const response = await fetch(
    `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${txRef}`,
    {
      headers: { 'Authorization': `Bearer ${FLW_SECRET_KEY}` },
    }
  );

  const data = await response.json();

  if (
    data.status !== 'success' ||
    data.data.status !== 'successful' ||
    data.data.currency !== 'NGN' ||
    data.data.customer.email.toLowerCase() !== email.toLowerCase()
  ) {
    return err('Payment verification failed.');
  }

  const expiresAt = plan === 'annual'
    ? Date.now() + 365 * 24 * 60 * 60 * 1000
    : Date.now() +  30 * 24 * 60 * 60 * 1000;

  // Update premium status in profiles sheet
  await sheetsGet({
    action:    'activatePremium',
    email:     email.toLowerCase().trim(),
    plan,
    txRef,
    expiresAt: String(expiresAt),
    amount:    String(data.data.amount),
  });

  // Redirect to app with success flag
  return Response.redirect(
    `https://elitescholars.site/?payment=success&plan=${plan}&email=${encodeURIComponent(email)}`,
    302
  );
}

export const config = { runtime: 'edge' };