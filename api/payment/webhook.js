// ============================================================================
// api/payment/webhook.js — POST /api/payment/webhook
// Handles Flutterwave webhook events with signature verification
// Webhook URL: https://elitescholars.site/api/payment/webhook
// ============================================================================

import { createHmac } from 'crypto';
import { sheetsGet }  from '../_helpers/sheets.js';
import { logSecurityEvent } from '../_helpers/security.js';

const FLW_WEBHOOK_SECRET = process.env.FLW_WEBHOOK_SECRET;
const FLW_SECRET_KEY     = process.env.FLW_SECRET_KEY;

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200 });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Verify webhook signature
  const signature = req.headers.get('verif-hash');
  if (!signature || signature !== FLW_WEBHOOK_SECRET) {
    await logSecurityEvent({
      type:   'webhook_invalid_signature',
      email:  '',
      ip:     req.headers.get('x-forwarded-for') || 'unknown',
      detail: 'Invalid Flutterwave webhook signature',
    });
    return new Response('Unauthorized', { status: 401 });
  }

  let event;
  try { event = await req.json(); }
  catch { return new Response('Invalid body', { status: 400 }); }

  // Only handle successful charges
  if (event.event !== 'charge.completed') {
    return new Response('OK', { status: 200 });
  }

  const txData = event.data;

  if (txData.status !== 'successful' || txData.currency !== 'NGN') {
    return new Response('OK', { status: 200 });
  }

  // Verify the transaction with Flutterwave (don't trust webhook data alone)
  const verifyRes = await fetch(
    `https://api.flutterwave.com/v3/transactions/${txData.id}/verify`,
    {
      headers: { 'Authorization': `Bearer ${FLW_SECRET_KEY}` },
    }
  );

  const verifyData = await verifyRes.json();

  if (
    verifyData.status !== 'success' ||
    verifyData.data.status !== 'successful' ||
    verifyData.data.currency !== 'NGN'
  ) {
    return new Response('Verification failed', { status: 400 });
  }

  const email = txData.customer.email?.toLowerCase().trim();
  const plan  = txData.meta?.plan || 'monthly';
  const txRef = txData.tx_ref;

  const expiresAt = plan === 'annual'
    ? Date.now() + 365 * 24 * 60 * 60 * 1000
    : Date.now() +  30 * 24 * 60 * 60 * 1000;

  // Activate premium in profiles sheet
  await sheetsGet({
    action:    'activatePremium',
    email,
    plan,
    txRef,
    expiresAt: String(expiresAt),
    amount:    String(txData.amount),
  });

  return new Response('OK', { status: 200 });
}

export const config = { runtime: 'edge' };