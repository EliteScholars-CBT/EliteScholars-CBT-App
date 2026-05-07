// ============================================================================
// api/auth/login.js — POST /api/auth/login
// Rate limited: 10 attempts per 15 minutes per email+IP
// ============================================================================

// import { parseBody } from '../_helpers/bodyParser.js';
import { checkRateLimit, clearRateLimit } from '../_helpers/rateLimit.js';
import { sendOk, sendErr, sendRateLimited, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { hashPassword }    from '../_helpers/hash.js';
import { sheetsGet }       from '../_helpers/sheets.js';
import { logSecurityEvent } from '../_helpers/security.js';

export default async function handler(req, res) {
  try {
    setCors(res);

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return sendMethodNotAllowed(res);
    }

    const ip = (
      req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    ) || req.socket?.remoteAddress || 'unknown';
const DEBUG = false;
    const body = req.body || {};
  
if(DEBUG) {
return res.status(200).json({
  rawBody: body,
  headers: req.headers,
  bodyType: typeof body
});
}

    const { email, password } = body;

    if (!email || !password) {
      return sendErr(res, 'Email and password are required.');
    }

    const emailLower = email.toLowerCase().trim();

    const key = `login:${emailLower}:${ip}`;

    const { allowed, retryAfter, remaining } =
      await checkRateLimit(key, 10, 900);

    if (!allowed) {
      await logSecurityEvent({
        type: 'login_rate_limited',
        email: emailLower,
        ip,
        detail: 'Too many failed attempts'
      });

      return sendRateLimited(res, retryAfter);
    }

    const passwordHash = hashPassword(password);

    const result = await sheetsGet({
      action: 'loginProfile',
      email: emailLower,
      passwordHash
    });

    if (!result.success) {
      await logSecurityEvent({
        type: 'login_failed',
        email: emailLower,
        ip,
        detail: `${10 - remaining} failed attempts`
      });

      return sendErr(
        res,
        result.error || 'Invalid email or password.'
      );
    }

    await clearRateLimit(key);

    return sendOk(res, {
      profile: result.profile
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message || 'Internal server error'
    });
  }
}