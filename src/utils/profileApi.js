// ============================================================================
// profileApi.js — SAFE VERSION (FIXED ERROR HANDLING)
// ============================================================================

import { SHEETS_URL } from './constants';

async function safeFetchJSON(endpoint, options) {
  try {
    const res = await fetch(endpoint, options);

    const text = await res.text(); // always read raw first

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return {
        success: false,
        error: 'INVALID_JSON_RESPONSE',
        raw: text,
        status: res.status
      };
    }

    return data;
  } catch (err) {
    return {
      success: false,
      error: err.message || 'NETWORK_ERROR'
    };
  }
}

async function apiPost(endpoint, body) {
  return safeFetchJSON(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function apiGet(endpoint, params = {}) {
  const qs = new URLSearchParams(params).toString();

  return safeFetchJSON(`${endpoint}${qs ? '?' + qs : ''}`);
}

// ── AUTH ─────────────────────────────────────────────────────────────────────

export async function registerProfile(payload) {
  return apiPost('/api/auth/register', payload);
}

export async function loginProfile(payload) {
  return apiPost('/api/auth/login', payload);
}

export async function verifyProfile(payload) {
  return apiPost('/api/auth/verify', payload);
}

export async function requestPasswordReset(email) {
  return apiPost('/api/auth/forgot', { email });
}

export async function confirmPasswordReset(payload) {
  return apiPost('/api/auth/reset', payload);
}

// ── PAYMENT ──────────────────────────────────────────────────────────────────

export async function initiatePayment(payload) {
  return apiPost('/api/payment/initiate', payload);
}

export async function fetchPremiumStatus(email) {
  return apiGet('/api/payment/status', { email });
}

// ── CONTENT ──────────────────────────────────────────────────────────────────

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

// ── PROFILE SYNC ─────────────────────────────────────────────────────────────

export async function syncProfileToSheet(data) {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'syncProfile',
        ...data,
        email: data.email?.toLowerCase().trim(),
      }),
    });
  } catch {}
}

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