// ============================================================================
// profileApi.js — Auth via Vercel API, sync via Apps Script (DEBUG ENABLED)
// ============================================================================

import { SHEETS_URL } from './constants';
import { addLog } from './debugStore'; // 👈 IMPORTANT

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// ───────────────────────────────────────────────────────────────
// POST wrapper (DEBUG VERSION)
// ───────────────────────────────────────────────────────────────
async function apiPost(endpoint, body) {
  try {
    addLog({
      type: "info",
      message: "API REQUEST (POST)",
      data: { endpoint, body },
      time: new Date().toISOString()
    });

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    addLog({
      type: "info",
      message: "API RAW RESPONSE",
      data: { endpoint, text },
      time: new Date().toISOString()
    });

    const data = safeParse(text);

    if (!data) {
      addLog({
        type: "error",
        message: "INVALID JSON RESPONSE",
        data: text,
        time: new Date().toISOString()
      });

      return { success: false, error: "Invalid JSON response" };
    }

    addLog({
      type: res.ok ? "success" : "error",
      message: "API PARSED RESPONSE",
      data,
      time: new Date().toISOString()
    });

    return data;

  } catch (err) {
    addLog({
      type: "error",
      message: "API NETWORK ERROR",
      data: err.message,
      time: new Date().toISOString()
    });

    return { success: false, error: err.message };
  }
}

// ───────────────────────────────────────────────────────────────
// GET wrapper (DEBUG VERSION)
// ───────────────────────────────────────────────────────────────
async function apiGet(endpoint, params = {}) {
  try {
    const qs = new URLSearchParams(params).toString();
    const url = `${endpoint}${qs ? '?' + qs : ''}`;

    addLog({
      type: "info",
      message: "API REQUEST (GET)",
      data: { url },
      time: new Date().toISOString()
    });

    const res = await fetch(url);
    const text = await res.text();

    const data = safeParse(text);

    addLog({
      type: res.ok ? "success" : "error",
      message: "API GET RESPONSE",
      data: data || text,
      time: new Date().toISOString()
    });

    return data;

  } catch (err) {
    addLog({
      type: "error",
      message: "API GET ERROR",
      data: err.message,
      time: new Date().toISOString()
    });

    return null;
  }
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export async function registerProfile(data) {
  return apiPost('/api/auth/register', data);
}

export async function loginProfile(data) {
  return apiPost('/api/auth/login', data);
}

export async function verifyProfile(data) {
  return apiPost('/api/auth/verify', data);
}

export async function requestPasswordReset(email) {
  return apiPost('/api/auth/forgot', { email });
}

export async function confirmPasswordReset(data) {
  return apiPost('/api/auth/reset', data);
}

// ── Payment ───────────────────────────────────────────────────────────────────
export async function initiatePayment(data) {
  return apiPost('/api/payment/initiate', data);
}

export async function fetchPremiumStatus(email) {
  return apiGet('/api/payment/status', { email });
}

// ── Content ───────────────────────────────────────────────────────────────────
export async function fetchSubjects(exam) {
  return apiGet('/api/subjects', { exam });
}

export async function fetchQuestions(params) {
  return apiGet('/api/questions', {
    ...params,
    seed: params.seed || String(Date.now()),
  });
}

export async function fetchLearnTopics(subject) {
  return apiGet('/api/learn', { subject });
}

export async function fetchFlashcards(subject) {
  return apiGet('/api/flashcards', { subject });
}

export async function fetchShopData() {
  return apiGet('/api/shop');
}

export async function fetchAds(exam) {
  return apiGet('/api/ads', { exam: exam || 'all' });
}

// ── Profile sync ─────────────────────────────────────────────────────────────
export async function syncProfileToSheet(data) {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'syncProfile',
        email: data.email.toLowerCase().trim(),
        stats: JSON.stringify(data.stats || {}),
        achievements: JSON.stringify(data.achievements || []),
        subjectPerformance: JSON.stringify(data.subjectPerformance || {}),
        theme: data.theme || 'light',
        lastSync: new Date().toISOString(),
      }),
    });
  } catch {}
}

// ── Pull profile ─────────────────────────────────────────────────────────────
export async function pullProfileFromSheet(email) {
  try {
    const qs = new URLSearchParams({
      action: 'loginProfile',
      email: email.toLowerCase().trim(),
      passwordHash: '__pull_only__'
    });

    const res = await fetch(`${SHEETS_URL}?${qs}`);
    return await res.json();
  } catch {
    return null;
  }
}