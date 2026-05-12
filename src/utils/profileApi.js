// ============================================================================
// profileApi.js — DEBUGGER-INTEGRATED SAFE VERSION
// ============================================================================

import { SHEETS_URL } from './constants';
import { addLog } from "./debugStore";

// ─────────────────────────────────────────────────────────────────────────────
// CORE SAFE FETCH (now fully observable)
// ─────────────────────────────────────────────────────────────────────────────

async function safeFetchJSON(endpoint, options = {}) {
  const start = performance.now();

  addLog({
    type: "info",
    category: "network",
    message: "REQUEST",
    data: {
      url: endpoint,
      method: options.method || "GET",
      body: options.body || null
    }
  });

  try {
    const res = await fetch(endpoint, options);
    const text = await res.text();
    const duration = Math.round(performance.now() - start);

    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      addLog({
        type: "error",
        category: "network",
        message: "INVALID JSON RESPONSE",
        data: {
          url: endpoint,
          status: res.status,
          raw: text
        }
      });

      return {
        success: false,
        error: "INVALID_JSON_RESPONSE",
        raw: text,
        status: res.status
      };
    }

    addLog({
      type: res.ok ? "success" : "error",
      category: "network",
      message: "RESPONSE",
      data: {
        url: endpoint,
        status: res.status,
        duration: `${duration}ms`,
        response: data
      }
    });

    return data;

  } catch (err) {
    addLog({
      type: "error",
      category: "network",
      message: "NETWORK ERROR",
      data: {
        url: endpoint,
        error: err.message
      }
    });

    return {
      success: false,
      error: err.message || "NETWORK_ERROR"
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// API WRAPPERS
// ─────────────────────────────────────────────────────────────────────────────

async function apiPost(endpoint, body) {
  return safeFetchJSON(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function apiGet(endpoint, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const url = `${endpoint}${qs ? '?' + qs : ''}`;

  return safeFetchJSON(url);
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// PAYMENT
// ─────────────────────────────────────────────────────────────────────────────

export async function initiatePayment(payload) {
  return apiPost('/api/payment/initiate', payload);
}

export async function fetchPremiumStatus(email) {
  return apiGet('/api/payment/status', { email });
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE SYNC — push local data to Sheets
// ─────────────────────────────────────────────────────────────────────────────

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
        stats:              JSON.stringify(data.stats || {}),
        achievements:       JSON.stringify(data.achievements || []),
        subjectPerformance: JSON.stringify(data.subjectPerformance || {}),
      }),
    });
  } catch (err) {
    addLog({ type: 'error', category: 'network', message: 'SYNC FAILED', data: { error: err.message, email: data?.email } });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE PULL — fetch latest profile from Sheets via /api/auth/verify
// Returns { stats, achievements, subjectPerformance } or null
// ─────────────────────────────────────────────────────────────────────────────

export async function pullProfileFromSheet(email, passwordHash) {
  try {
    const result = await apiPost('/api/auth/verify', { email, passwordHash });
    if (!result?.success) return null;
    const p = result.profile;
    return {
      stats:              p.stats              || {},
      achievements:       p.achievements       || [],
      subjectPerformance: p.subjectPerformance || {},
    };
  } catch (err) {
    addLog({ type: 'error', category: 'network', message: 'PULL FAILED', data: { error: err.message, email } });
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GUARDIAN
// ─────────────────────────────────────────────────────────────────────────────

export async function updateGuardianEmail({ email, guardianEmail }) {
  return apiGet(SHEETS_URL, { action: 'updateGuardianEmail', email, guardianEmail });
}

export async function fetchGuardianEmail(email) {
  return apiGet(SHEETS_URL, { action: 'getProfile', email });
}
