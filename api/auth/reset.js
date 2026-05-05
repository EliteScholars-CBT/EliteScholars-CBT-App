api/auth/reset.js
// ============================================================================
// api/auth/reset.js — POST /api/auth/reset
// Verifies code from KV then updates password in sheet
// ============================================================================

import { kv }             from '@vercel/kv';
import { ok, err, methodNotAllowed } from '../_helpers/response.js';
import { hashPassword }   from '../_helpers/hash.js';
import { sheetsGet }      from '../_helpers/sheets.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') return ok();
  if (req.method !== 'POST') return methodNotAllowed();

  let body;
  try { body = await req.json(); }
  catch { return err('Invalid request body.'); }

  const { email, code, newPassword } = body;
  if (!email || !code || !newPassword) return err('All fields are required.');
  if (newPassword.length < 8) return err('Password must be at least 8 characters.');

  const emailLower = email.toLowerCase().trim();
  const kvKey      = `reset:${emailLower}`;

  const storedCode = await kv.get(kvKey);
  if (!storedCode)          return err('Reset code has expired. Please request a new one.');
  if (storedCode !== code)  return err('Invalid reset code.');

  const passwordHash = hashPassword(newPassword);

  const result = await sheetsGet({
    action: 'confirmPasswordReset',
    email:  emailLower,
    code,
    passwordHash,
  });

  if (!result.success) return err(result.error || 'Failed to reset password.');

  // Delete code from KV
  await kv.del(kvKey);

  return ok({ message: 'Password reset successfully.' });
}

export const config = { runtime: 'edge' };