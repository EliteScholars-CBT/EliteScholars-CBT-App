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
    setCors(res);

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return sendMethodNotAllowed(res);
    }

    // =========================
    // REQUEST INFO
    // =========================
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      'unknown';

    const body = req.body || {};

    // =========================
    // VALIDATION STAGE
    // =========================
    if (!body.email || !body.password) {
      return res.status(400).json({
        success: false,
        stage: "validation_error",
        message: "Email and password are required",

        data: null,

        debug: {
          receivedBody: body,
          ip,
          time: new Date().toISOString()
        }
      });
    }

    const emailLower = body.email.toLowerCase().trim();

    const key = `login:${emailLower}:${ip}`;

    // =========================
    // RATE LIMIT STAGE
    // =========================
    const { allowed, retryAfter, remaining } =
      await checkRateLimit(key, 10, 900);

    if (!allowed) {
      await logSecurityEvent({
        type: 'login_rate_limited',
        email: emailLower,
        ip,
        detail: 'Too many attempts'
      });

      return res.status(429).json({
        success: false,
        stage: "rate_limited",
        message: "Too many login attempts",

        data: null,

        debug: {
          retryAfter,
          remaining,
          email: emailLower,
          ip,
          time: new Date().toISOString()
        }
      });
    }

    // =========================
    // AUTH STAGE (HASH CHECK)
    // =========================
    const passwordHash = hashPassword(body.password);

    let result;
    try {
      result = await sheetsGet({
        action: 'loginProfile',
        email: emailLower,
        passwordHash
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        stage: "sheets_call_failed",
        message: "Failed to contact Sheets backend",

        data: null,

        debug: {
          error: err.message,
          email: emailLower,
          ip,
          time: new Date().toISOString()
        }
      });
    }

    // =========================
    // LOGIN FAILURE
    // =========================
    if (!result || !result.success) {
      await logSecurityEvent({
        type: 'login_failed',
        email: emailLower,
        ip,
        detail: `${10 - remaining} attempts left`
      });

      return res.status(401).json({
        success: false,
        stage: "login_failed",
        message: result?.error || "Invalid email or password",

        data: null,

        debug: {
          email: emailLower,
          ip,
          remainingAttempts: remaining,
          time: new Date().toISOString()
        }
      });
    }

    // =========================
    // SUCCESS STAGE
    // =========================
    await clearRateLimit(key);

    return res.status(200).json({
      success: true,
      stage: "login_success",
      message: "Login successful",

      data: {
        profile: result.profile
      },

      debug: {
        email: emailLower,
        ip,
        time: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      stage: "internal_error",
      message: err.message || "Internal server error",

      data: null,

      debug: {
        stack: err.stack,
        ip: req.socket?.remoteAddress || "unknown",
        time: new Date().toISOString()
      }
    });
  }
}