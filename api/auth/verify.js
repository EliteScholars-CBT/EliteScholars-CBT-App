// ============================================================================
// api/auth/verify.js — POST /api/auth/verify
// Silent auto-login token verification
// ============================================================================

api/auth/verify.js
import { sendOk, sendErr, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { sheetsGet } from '../_helpers/sheets.js';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendMethodNotAllowed(res);

  const { email, passwordHash } = req.body || {};
  if (!email || !passwordHash) return sendErr(res, 'Missing credentials.');

  const result = await sheetsGet({
    action: 'loginProfile',
    email:  email.toLowerCase().trim(),
    passwordHash,
  });

  if (!result.success) return sendErr(res, 'Session expired. Please log in again.');
  return sendOk(res, { profile: result.profile });
}