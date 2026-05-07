// ============================================================================
// api/auth/reset.js — POST /api/auth/reset
// Verifies code from KV then updates password in sheet
// ============================================================================

api/auth/reset.js
import { kv }          from '@vercel/kv';
import { sendOk, sendErr, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { hashPassword } from '../_helpers/hash.js';
import { sheetsGet }   from '../_helpers/sheets.js';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendMethodNotAllowed(res);

  const { email, code, newPassword } = req.body || {};
  if (!email || !code || !newPassword) return sendErr(res, 'All fields are required.');
  if (newPassword.length < 8) return sendErr(res, 'Password must be at least 8 characters.');

  const emailLower = email.toLowerCase().trim();
  const kvKey      = `reset:${emailLower}`;
  const storedCode = await kv.get(kvKey);

  if (!storedCode)         return sendErr(res, 'Reset code has expired. Please request a new one.');
  if (storedCode !== code) return sendErr(res, 'Invalid reset code.');

  const passwordHash = hashPassword(newPassword);
  const result = await sheetsGet({
    action: 'confirmPasswordReset',
    email:  emailLower,
    code,
    passwordHash,
  });

  if (!result.success) return sendErr(res, result.error || 'Failed to reset password.');

  await kv.del(kvKey);
  return sendOk(res, { message: 'Password reset successfully.' });
}