

// ============================================================================
// api/auth/login.js — POST /api/auth/login
// Rate limited: 10 attempts per 15 minutes per email+IP
// ============================================================================

import { checkRateLimit, clearRateLimit } from '../_helpers/rateLimit.js';
import { hashPassword } from '../_helpers/hash.js';
import { sheetsGet } from '../_helpers/sheets.js';
import { logSecurityEvent } from '../_helpers/security.js';
import { setCors, sendMethodNotAllowed } from '../_helpers/response.js';

export default async function handler(req, res) {
  try {
    const body = req.body || {};

    return res.status(200).json({
      stage: "pre_login_test",
      success: true,
      debug: {
        step: "before_hash_and_sheets",
        body
      }
    });

  } catch (err) {
    return res.status(500).json({
      stage: "crash_before_login",
      success: false,
      error: err.message
    });
  }
}