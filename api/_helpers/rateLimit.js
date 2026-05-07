// ============================================================================
// api/_helpers/rateLimit.js — Rate limiting via Vercel KV
// ============================================================================

import { kv } from '@vercel/kv';

export async function checkRateLimit(key, max, windowSec) {
  try {
    const current = await kv.incr(key);
    if (current === 1) await kv.expire(key, windowSec);
    const ttl       = await kv.ttl(key);
    const remaining = Math.max(0, max - current);
    const allowed   = current <= max;
    return { allowed, remaining, retryAfter: allowed ? 0 : ttl };
  } catch {
    return { allowed: true, remaining: 1, retryAfter: 0 };
  }
}

export async function clearRateLimit(key) {
  try { await kv.del(key); } catch {}
}