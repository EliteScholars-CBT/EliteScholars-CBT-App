// ============================================================================
// api/auth/forgot.js — POST /api/auth/forgot
// Rate limited: 3 requests per hour per email
// Sends reset code via Resend
// ============================================================================

import { kv }              from '@vercel/kv';
import { Resend }          from 'resend';
import { checkRateLimit }  from '../_helpers/rateLimit.js';
import { sendOk, sendErr, sendRateLimited, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { sheetsGet }       from '../_helpers/sheets.js';
import { logSecurityEvent } from '../_helpers/security.js';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.FROM_EMAIL || 'noreply@elitescholars.site';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendMethodNotAllowed(res);

  const { email } = req.body || {};
  if (!email) return sendErr(res, 'Email is required.');

  const emailLower = email.toLowerCase().trim();
  const ip         = req.headers['x-forwarded-for'] || 'unknown';
  const key        = `forgot:${emailLower}`;

  const { allowed, retryAfter } = await checkRateLimit(key, 3, 3600);
  if (!allowed) {
    await logSecurityEvent({ type: 'forgot_rate_limited', email: emailLower, ip, detail: 'Reset flood attempt' });
    return sendRateLimited(res, retryAfter);
  }

  const check = await sheetsGet({
    action:       'loginProfile',
    email:        emailLower,
    passwordHash: '__check_exists__',
  });

  if (!check.exists && !check.success) {
    return sendOk(res, { message: 'If that email exists, a reset code has been sent.' });
  }

  const code  = Math.floor(100000 + Math.random() * 900000).toString();
  const kvKey = `reset:${emailLower}`;
  await kv.set(kvKey, code, { ex: 900 });

  await resend.emails.send({
    from:    `EliteScholars <${FROM}>`,
    to:      emailLower,
    subject: 'Your EliteScholars Password Reset Code',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
        <div style="text-align:center;margin-bottom:24px;">
          <h1 style="color:#4B0082;font-size:24px;margin:0;">EliteScholars</h1>
          <p style="color:#6B7280;font-size:14px;margin:6px 0 0;">Password Reset</p>
        </div>
        <div style="background:#F3EEFF;border-radius:16px;padding:24px;text-align:center;margin-bottom:24px;">
          <p style="color:#1a0030;font-size:14px;margin:0 0 16px;">Your password reset code is:</p>
          <div style="font-size:36px;font-weight:900;letter-spacing:8px;color:#4B0082;">${code}</div>
          <p style="color:#6B7280;font-size:12px;margin:16px 0 0;">Expires in <strong>15 minutes</strong>.</p>
        </div>
        <p style="color:#6B7280;font-size:13px;text-align:center;">
          If you did not request this, ignore this email.
        </p>
        <div style="text-align:center;margin-top:24px;">
          <a href="https://elitescholars.site"
             style="background:#4B0082;color:#fff;padding:12px 28px;border-radius:30px;text-decoration:none;font-weight:700;font-size:14px;">
            Back to EliteScholars
          </a>
        </div>
      </div>
    `,
  });

  return sendOk(res, { message: 'If that email exists, a reset code has been sent.' });
}