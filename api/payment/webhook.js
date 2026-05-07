// ============================================================================
// api/payment/webhook.js — POST /api/payment/webhook
// Handles Flutterwave webhook events with signature verification
// Webhook URL: https://elitescholars.site/api/payment/webhook
// ============================================================================

import crypto          from 'crypto';
import { sheetsGet }   from '../_helpers/sheets.js';
import { logSecurityEvent } from '../_helpers/security.js';

const FLW_WEBHOOK_SECRET = process.env.FLW_WEBHOOK_SECRET;
const FLW_SECRET_KEY     = process.env.FLW_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).end();

  const signature = req.headers['verif-hash'];
  if (!signature || signature !== FLW_WEBHOOK_SECRET) {
    await logSecurityEvent({
      type:   'webhook_invalid_signature',
      email:  '',
      ip:     req.headers['x-forwarded-for'] || 'unknown',
      detail: 'Invalid Flutterwave webhook signature',
    });
    return res.status(401).end();
  }

  const event  = req.body;
  if (event.event !== 'charge.completed') return res.status(200).end();

  const txData = event.data;
  if (txData.status !== 'successful' || txData.currency !== 'NGN') return res.status(200).end();

  const verifyRes  = await fetch(
    `https://api.flutterwave.com/v3/transactions/${txData.id}/verify`,
    { headers: { 'Authorization': `Bearer ${FLW_SECRET_KEY}` } }
  );
  const verifyData = await verifyRes.json();

  if (
    verifyData.status !== 'success' ||
    verifyData.data.status !== 'successful' ||
    verifyData.data.currency !== 'NGN'
  ) {
    return res.status(400).end();
  }

  const email     = txData.customer.email?.toLowerCase().trim();
  const plan      = txData.meta?.plan || 'monthly';
  const txRef     = txData.tx_ref;
  const expiresAt = plan === 'annual'
    ? Date.now() + 365 * 24 * 60 * 60 * 1000
    : Date.now() +  30 * 24 * 60 * 60 * 1000;

  await sheetsGet({
    action:    'activatePremium',
    email,
    plan,
    txRef,
    expiresAt: String(expiresAt),
    amount:    String(txData.amount),
  });

  return res.status(200).end();
}