// ============================================================================
// profileApi.js — Server-side profile management via Google Apps Script
// Handles register, login, profile sync, stats/achievements update
// ============================================================================

import { SHEETS_URL } from './constants';

// ── SHA-256 password hashing (Web Crypto API) ─────────────────────────────────
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'ep_salt_2025');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── GET helper ────────────────────────────────────────────────────────────────
async function get(params) {
  try {
    const url = `${SHEETS_URL}?${new URLSearchParams(params)}`;
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error('profileApi GET error:', err);
    return { success: false, error: err.message };
  }
}

// ── POST helper ───────────────────────────────────────────────────────────────
async function post(body) {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return { success: true };
  } catch (err) {
    console.error('profileApi POST error:', err);
    return { success: false, error: err.message };
  }
}

// ── Register ──────────────────────────────────────────────────────────────────
export async function registerProfile({ firstName, lastName, email, password, studentType, selectedExams }) {
  const passwordHash = await hashPassword(password);
  return get({
    action: 'registerProfile',
    email: email.toLowerCase().trim(),
    firstName,
    lastName,
    passwordHash,
    studentType,
    selectedExams: JSON.stringify(selectedExams),
  });
}

// ── Login ─────────────────────────────────────────────────────────────────────
export async function loginProfile({ email, password }) {
  const passwordHash = await hashPassword(password);
  return get({
    action: 'loginProfile',
    email: email.toLowerCase().trim(),
    passwordHash,
  });
}

// ── Verify token (auto-login) ─────────────────────────────────────────────────
export async function verifyProfile({ email, passwordHash }) {
  return get({
    action: 'loginProfile',
    email: email.toLowerCase().trim(),
    passwordHash,
  });
}

// ── Sync profile back to sheet after key events ───────────────────────────────
export async function syncProfileToSheet({ email, stats, achievements, subjectPerformance, theme }) {
  return post({
    action: 'syncProfile',
    email: email.toLowerCase().trim(),
    stats:              JSON.stringify(stats || {}),
    achievements:       JSON.stringify(achievements || []),
    subjectPerformance: JSON.stringify(subjectPerformance || {}),
    theme:              theme || 'light',
    lastSync:           new Date().toISOString(),
  });
}

// ── Forgot password — request reset code ─────────────────────────────────────
export async function requestPasswordReset(email) {
  return get({
    action: 'requestPasswordReset',
    email: email.toLowerCase().trim(),
  });
}

// ── Reset password with code ──────────────────────────────────────────────────
export async function confirmPasswordReset({ email, code, newPassword }) {
  const passwordHash = await hashPassword(newPassword);
  return get({
    action: 'confirmPasswordReset',
    email: email.toLowerCase().trim(),
    code,
    passwordHash,
  });
}