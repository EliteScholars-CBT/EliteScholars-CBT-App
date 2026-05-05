// ============================================================================
// api/auth/login.js — POST /api/auth/login
// Rate limited: 10 attempts per 15 minutes per email+IP
// ============================================================================

import { checkRateLimit, clearRateLimit } from '../_helpers/rateLimit.js';
import { ok, err, rateLimited, methodNotAllowed } from '../_helpers/response.js';
import { hashPassword }   from '../_helpers/hash.js';
import { sheetsGet }      from '../_helpers/sheets.js';
import { logSecurityEvent } from '../_helpers/security.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') return ok();
  if (req.method !== 'POST') return methodNotAllowed();

  const ip  = req.headers.get('x-forwarded-for') || 'unknown';

  let body;
  try { body = await req.json(); }
  catch { return err('Invalid request body.'); }

  const { email, password } = body;
  if (!email || !password) return err('Email and password are required.');

  const emailLower = email.toLowerCase().trim();
  const key        = `login:${emailLower}:${ip}`;

  const { allowed, retryAfter, remaining } = await checkRateLimit(key, 10, 900);
  if (!allowed) {
    await logSecurityEvent({
      type:   'login_rate_limited',
      email:  emailLower,
      ip,
      detail: 'Too many failed login attempts',
    });
    return rateLimited(retryAfter);
  }

  const passwordHash = hashPassword(password);

  const result = await sheetsGet({
    action:       'loginProfile',
    email:        emailLower,
    passwordHash,
  });

  if (!result.success) {
    await logSecurityEvent({
      type:   'login_failed',
      email:  emailLower,
      ip,
      detail: `${10 - remaining} failed attempts`,
    });
    return err(result.error || 'Invalid email or password.');
  }

  // Clear rate limit on success
  await clearRateLimit(key);

  return ok({ profile: result.profile });
}

export const config = { runtime: 'edge' };