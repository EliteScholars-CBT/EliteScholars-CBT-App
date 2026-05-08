// ============================================================================
// api/auth/register.js — POST /api/auth/register
// Rate limited: 5 attempts per hour per IP
// ============================================================================

import { redis } from "../_helpers/redis.js";
import { sendOk, sendErr, sendMethodNotAllowed, setCors } from "../_helpers/response.js";
import { hashPassword } from "../_helpers/hash.js";
import { sheetsGet } from "../_helpers/sheets.js";

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return sendMethodNotAllowed(res);
  }

  const { email, code, newPassword } = req.body || {};

  if (!email || !code || !newPassword) {
    return sendErr(res, "All fields are required.");
  }

  const emailLower = email.toLowerCase().trim();
  const key = `reset:${emailLower}`;

  const storedCode = await redis.get(key);

  if (!storedCode) {
    return sendErr(res, "Reset code expired.");
  }

  if (storedCode !== code) {
    return sendErr(res, "Invalid reset code.");
  }

  const passwordHash = hashPassword(newPassword);

  const result = await sheetsGet({
    action: "confirmPasswordReset",
    email: emailLower,
    code,
    passwordHash,
  });

  if (!result.success) {
    return sendErr(res, result.error || "Reset failed.");
  }

  await redis.del(key);

  return sendOk(res, {
    message: "Password reset successful",
  });
}