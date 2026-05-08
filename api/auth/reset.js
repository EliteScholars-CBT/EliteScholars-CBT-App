// ============================================================================
// api/auth/reset.js — POST /api/auth/reset
// Verifies code from Redis then updates password in sheet
// ============================================================================


import { redis } from '../_helpers/redis.js';
import { sendOk, sendErr, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { hashPassword } from '../_helpers/hash.js';
import { sheetsGet } from '../_helpers/sheets.js';

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return sendMethodNotAllowed(res);
  }

  const { email, code, newPassword } = req.body || {};

  if (!email || !code || !newPassword) {
    return sendErr(res, 'All fields are required.');
  }

  if (newPassword.length < 8) {
    return sendErr(res, 'Password must be at least 8 characters.');
  }

  const emailLower = email.toLowerCase().trim();
  const redisKey = `reset:${emailLower}`;

  // =========================
  // GET CODE FROM REDIS
  // =========================
  let storedCode;
  try {
    storedCode = await redis.get(redisKey);
  } catch (err) {
    return sendErr(res, 'Redis error while verifying reset code.');
  }

  if (!storedCode) {
    return sendErr(res, 'Reset code has expired. Please request a new one.');
  }

  if (storedCode !== code) {
    return sendErr(res, 'Invalid reset code.');
  }

  // =========================
  // HASH NEW PASSWORD
  // =========================
  const passwordHash = hashPassword(newPassword);

  // =========================
  // UPDATE SHEET
  // =========================
  let result;
  try {
    result = await sheetsGet({
      action: 'confirmPasswordReset',
      email: emailLower,
      passwordHash
    });
  } catch (err) {
    return sendErr(res, 'Failed to contact Sheets backend.');
  }

  if (!result || !result.success) {
    return sendErr(res, result?.error || 'Failed to reset password.');
  }

  // =========================
  // CLEANUP REDIS
  // =========================
  try {
    await redis.del(redisKey);
  } catch {}

  return sendOk(res, {
    message: 'Password reset successfully.'
  });
}