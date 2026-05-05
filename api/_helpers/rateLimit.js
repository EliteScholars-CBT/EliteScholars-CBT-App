// ============================================================================
// api/_helpers/rateLimit.js — Rate limiting via Vercel KV
// ============================================================================

import { kv } from '@vercel/kv';

/**
 * Check and increment rate limit counter.
 * @param {string} key      - unique key e.g. "login:email@example.com"
 * @param {number} max      - max attempts allowed
 * @param {number} windowSec - time window in seconds
 * @returns {{ allowed: boolean, remaining: number, retryAfter: number }}
 */
export async function checkRateLimit(key, max, windowSec) {
  try {
    const current = await kv.incr(key);

    // Set expiry on first attempt
    if (current === 1) {
      await kv.expire(key, windowSec);
    }

    const ttl       = await kv.ttl(key);
    const remaining = Math.max(0, max - current);
    const allowed   = current <= max;

    return { allowed, remaining, retryAfter: allowed ? 0 : ttl };
  } catch (err) {
    // If KV fails, allow the request (fail open)
    console.error('Rate limit KV error:', err);
    return { allowed: true, remaining: 1, retryAfter: 0 };
  }
}

/**
 * Clear rate limit counter (e.g. on successful login)
 */
export async function clearRateLimit(key) {
  try {
    await kv.del(key);
  } catch {}
}