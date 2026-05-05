// ============================================================================
// api/auth/register.js — POST /api/auth/register
// Rate limited: 5 attempts per hour per IP
// ============================================================================

import { checkRateLimit }    from '../_helpers/rateLimit.js';
import { ok, err, rateLimited, methodNotAllowed } from '../_helpers/response.js';
import { hashPassword }      from '../_helpers/hash.js';
import { sheetsGet, sheetsPost } from '../_helpers/sheets.js';
import { logSecurityEvent }  from '../_helpers/security.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') return ok();
  if (req.method !== 'POST') return methodNotAllowed();

  const ip  = req.headers.get('x-forwarded-for') || 'unknown';
  const key = `register:${ip}`;

  const { allowed, retryAfter } = await checkRateLimit(key, 5, 3600);
  if (!allowed) {
    await logSecurityEvent({ type: 'register_rate_limited', email: '', ip, detail: 'IP blocked' });
    return rateLimited(retryAfter);
  }

  let body;
  try { body = await req.json(); }
  catch { return err('Invalid request body.'); }

  const { firstName, lastName, email, password, studentType, selectedExams } = body;

  if (!firstName || !lastName || !email || !password || !studentType || !selectedExams) {
    return err('All fields are required.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return err('Invalid email address.');
  }
  if (password.length < 8) {
    return err('Password must be at least 8 characters.');
  }

  const passwordHash = hashPassword(password);
  const emailLower   = email.toLowerCase().trim();

  // Check if already registered
  const existing = await sheetsGet({
    action: 'loginProfile',
    email:  emailLower,
    passwordHash: '__check_exists__',
  });

  if (existing.exists) {
    return err('An account with this email already exists.');
  }

  // Register in profiles sheet
  const result = await sheetsGet({
    action:       'registerProfile',
    email:        emailLower,
    firstName,
    lastName,
    passwordHash,
    studentType,
    selectedExams: JSON.stringify(selectedExams),
  });

  if (!result.success) {
    return err(result.error || 'Registration failed.');
  }

  // Also log to register sheet (existing behaviour)
  await sheetsPost({
    event: 'register',
    name:  `${firstName} ${lastName}`,
    email: emailLower,
  });

  return ok({
    profile: {
      email:         emailLower,
      firstName,
      lastName,
      passwordHash,
      studentType,
      selectedExams,
      stats:             {},
      achievements:      [],
      subjectPerformance:{},
    },
  });
}

export const config = { runtime: 'edge' };