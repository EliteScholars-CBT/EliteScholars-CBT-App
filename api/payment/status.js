// ============================================================================
// api/payment/status.js — GET /api/payment/status?email=...
// Returns current premium status from sheet
// ============================================================================

import { ok, err, methodNotAllowed } from '../_helpers/response.js';
import { sheetsGet }                 from '../_helpers/sheets.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') return ok();
  if (req.method !== 'GET') return methodNotAllowed();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email')?.toLowerCase().trim();
  if (!email) return err('email is required.');

  const result = await sheetsGet({ action: 'getPremiumStatus', email });
  return ok(result);
}

export const config = { runtime: 'edge' };