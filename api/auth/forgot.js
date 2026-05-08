// ============================================================================
// api/auth/forgot.js — POST /api/auth/forgot
// Rate limited: 3 requests per hour per email
// Sends reset code via Resend
// ============================================================================

import { redis } from "../_helpers/redis.js";
import { Resend } from "resend";
import { checkRateLimit } from "../_helpers/rateLimit.js";
import { sendOk, sendErr, sendRateLimited, sendMethodNotAllowed, setCors } from "../_helpers/response.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.FROM_EMAIL;

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return sendMethodNotAllowed(res);
  }

  const { email } = req.body || {};

  if (!email) {
    return sendErr(res, "Email required.");
  }

  const emailLower = email.toLowerCase().trim();
  const key = `forgot:${emailLower}`;

  const { allowed, retryAfter } =
    await checkRateLimit(key, 3, 3600);

  if (!allowed) {
    return sendRateLimited(res, retryAfter);
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await redis.set(`reset:${emailLower}`, code, { ex: 900 });

  await resend.emails.send({
    from: `EliteScholars <${FROM}>`,
    to: emailLower,
    subject: "Reset Code",
    html: `<h2>Your code is ${code}</h2>`,
  });

  return sendOk(res, {
    message: "Reset code sent",
  });
}