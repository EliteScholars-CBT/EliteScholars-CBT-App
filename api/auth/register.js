// ============================================================================
// api/auth/register.js — POST /api/auth/register
// Rate limited: 5 attempts per hour per IP
// ============================================================================

import { checkRateLimit }  from '../_helpers/rateLimit.js';
import { sendOk, sendErr, sendRateLimited, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { hashPassword }    from '../_helpers/hash.js';
import { sheetsGet, sheetsPost } from '../_helpers/sheets.js';
import { logSecurityEvent } from '../_helpers/security.js';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendMethodNotAllowed(res);

  const ip  = req.headers['x-forwarded-for'] || 'unknown';
  const key = `register:${ip}`;

  const { allowed, retryAfter } = await checkRateLimit(key, 5, 3600);
  if (!allowed) {
    await logSecurityEvent({ type: 'register_rate_limited', email: '', ip, detail: 'IP blocked' });
    return sendRateLimited(res, retryAfter);
  }

  const { firstName, lastName, email, password, studentType, selectedExams } = req.body || {};

  if (!firstName || !lastName || !email || !password || !studentType || !selectedExams) {
    return sendErr(res, 'All fields are required.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendErr(res, 'Invalid email address.');
  }
  if (password.length < 8) {
    return sendErr(res, 'Password must be at least 8 characters.');
  }

  const passwordHash = hashPassword(password);
  const emailLower   = email.toLowerCase().trim();

  const existing = await sheetsGet({
    action:       'loginProfile',
    email:        emailLower,
    passwordHash: '__check_exists__',
  });
  if (existing.exists) return sendErr(res, 'An account with this email already exists.');

  const result = await sheetsGet({
    action:        'registerProfile',
    email:         emailLower,
    firstName,
    lastName,
    passwordHash,
    studentType,
    selectedExams: JSON.stringify(selectedExams),
  });

  if (!result.success) return sendErr(res, result.error || 'Registration failed.');

  await sheetsPost({
    event: 'register',
    name:  `${firstName} ${lastName}`,
    email: emailLower,
  });

  return sendOk(res, {
    profile: {
      email:              emailLower,
      firstName,
      lastName,
      passwordHash,
      studentType,
      selectedExams,
      stats:              {},
      achievements:       [],
      subjectPerformance: {},
    },
  });
}