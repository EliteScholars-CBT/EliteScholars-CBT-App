// ============================================================================
// api/auth/verify.js — POST /api/auth/verify
// Silent auto-login token verification
// ============================================================================

import { ok, err, methodNotAllowed } from '../_helpers/response.js';
import { sheetsGet } from '../_helpers/sheets.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') return ok();
  if (req.method !== 'POST') return methodNotAllowed();

  let body;
  try { body = await req.json(); }
  catch { return err('Invalid request body.'); }

  const { email, passwordHash } = body;
  if (!email || !passwordHash) return err('Missing credentials.');

  const result = await sheetsGet({
    action:       'loginProfile',
    email:        email.toLowerCase().trim(),
    passwordHash,
  });

  if (!result.success) return err('Session expired. Please log in again.');

  return ok({ profile: result.profile });
}

export const config = { runtime: 'edge' };