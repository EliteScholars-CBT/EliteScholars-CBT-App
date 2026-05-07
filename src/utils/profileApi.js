// ============================================================================
// profileApi.js — Auth via Vercel API, sync via Apps Script
// ============================================================================

import { SHEETS_URL } from './constants';

async function apiPost(endpoint, body) {
const res = await fetch(endpoint, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
alert('hi from apiPost' + res.json())
  return res.json();
}

async function apiGet(endpoint, params = {}) {
  const qs  = new URLSearchParams(params).toString();
  const res = await fetch(`${endpoint}${qs ? '?' + qs : ''}`);

alert('hi from apiGett' + res.json())
  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export async function registerProfile({ firstName, lastName, email, password, studentType, selectedExams }) {
  return apiPost('/api/auth/register', { firstName, lastName, email, password, studentType, selectedExams });
}

export async function loginProfile({ email, password }) {
  return apiPost('/api/auth/login', { email, password });
}

export async function verifyProfile({ email, passwordHash }) {
  return apiPost('/api/auth/verify', { email, passwordHash });
}

export async function requestPasswordReset(email) {
  return apiPost('/api/auth/forgot', { email });
}

export async function confirmPasswordReset({ email, code, newPassword }) {
  return apiPost('/api/auth/reset', { email, code, newPassword });
}

// ── Payment ───────────────────────────────────────────────────────────────────
export async function initiatePayment({ email, name, plan }) {
  return apiPost('/api/payment/initiate', { email, name, plan });
}

export async function fetchPremiumStatus(email) {
  return apiGet('/api/payment/status', { email });
}

// ── Content ───────────────────────────────────────────────────────────────────
export async function fetchSubjects(exam) {
  return apiGet('/api/subjects', { exam });
}

export async function fetchQuestions({ exam, subject, university, count = 5, seed }) {
  return apiGet('/api/questions', {
    exam, subject, count,
    seed: seed || String(Date.now()),
    ...(university && { university }),
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

// ── Profile sync — push + pull merged ────────────────────────────────────────
export async function syncProfileToSheet({ email, stats, achievements, subjectPerformance, theme }) {
  try {
    await fetch(SHEETS_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        action:             'syncProfile',
        email:              email.toLowerCase().trim(),
        stats:              JSON.stringify(stats || {}),
        achievements:       JSON.stringify(achievements || []),
        subjectPerformance: JSON.stringify(subjectPerformance || {}),
        theme:              theme || 'light',
        lastSync:           new Date().toISOString(),
      }),
    });
  } catch {}
}

// ── Pull profile from sheet (called on every login) ───────────────────────────
export async function pullProfileFromSheet(email) {
  try {
    const qs  = new URLSearchParams({ action: 'loginProfile', email: email.toLowerCase().trim(), passwordHash: '__pull_only__' });
    const res = await fetch(`${SHEETS_URL}?${qs}`);
    return await res.json();
  } catch {
    return null;
  }
}