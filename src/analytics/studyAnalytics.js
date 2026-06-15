// ============================================================================
// studyAnalytics.js — Study session tracking
// Tracks who studies, what subject/exam/topic, for how long, and when
// ============================================================================

import { SHEETS_URL } from '../utils/constants';

const KEY_SESSION = (email) => `es_study_session_${email}`;
const KEY_QUEUE = 'es_study_queue';
const MAX_QUEUED = 8; // flush sooner — was 20, which a normal study session rarely reaches

// ── Internal helpers ──────────────────────────────────────────────────────────
function readQueue() {
  try {
    return JSON.parse(localStorage.getItem(KEY_QUEUE) || '[]');
  } catch {
    return [];
  }
}
function writeQueue(q) {
  try {
    localStorage.setItem(KEY_QUEUE, JSON.stringify(q.slice(-MAX_QUEUED * 5)));
  } catch {}
}

// Prevent overlapping flushes (e.g. periodic timer + visibilitychange firing close together)
let flushInFlight = false;

/**
 * Send queued events to the server. Only clears the queue if the request
 * actually completes successfully — on failure, events stay queued and will
 * be retried on the next flush trigger (periodic timer, visibility change,
 * or next enqueue reaching MAX_QUEUED).
 *
 * Uses sendBeacon when available (best for page-unload — survives the page
 * closing), falling back to fetch otherwise.
 */
async function flushToServer(events) {
  if (!events.length) return false;
  if (flushInFlight) return false;
  flushInFlight = true;

  const payload = JSON.stringify({ action: 'studyEvents', events });

  try {
    // sendBeacon is fire-and-forget but reliable during page unload, and
    // the browser guarantees delivery attempt even if the page is closing.
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      const ok = navigator.sendBeacon(SHEETS_URL, blob);
      flushInFlight = false;
      return ok;
    }

    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    });
    flushInFlight = false;
    return true;
  } catch {
    flushInFlight = false;
    return false;
  }
}

function enqueue(event) {
  const q = [...readQueue(), event];
  writeQueue(q);
  if (q.length >= MAX_QUEUED) {
    flushToServer(q).then((ok) => {
      if (ok) writeQueue([]);
    });
  }
}

// ── Session management ────────────────────────────────────────────────────────

/**
 * Start a study session. Call when user opens Learn Mode.
 */
export function startStudySession({ email, name, examType, subjectId, subjectLabel, topicName }) {
  if (!email) return;
  const session = {
    email,
    name,
    examType,
    subjectId,
    subjectLabel,
    topicName,
    startTime: Date.now(),
    startIso: new Date().toISOString(),
    date: new Date().toDateString(),
    hour: new Date().getHours(),
  };
  try {
    localStorage.setItem(KEY_SESSION(email), JSON.stringify(session));
  } catch {}
  return session;
}

/**
 * End a study session. Call when user leaves Learn Mode or closes topic.
 * Returns duration in seconds.
 */
export function endStudySession(email) {
  if (!email) return 0;
  try {
    const raw = localStorage.getItem(KEY_SESSION(email));
    if (!raw) return 0;
    const session = JSON.parse(raw);
    const durationMs = Date.now() - (session.startTime || Date.now());
    const durationSec = Math.round(durationMs / 1000);
    const durationMin = Math.round((durationSec / 60) * 10) / 10;

    enqueue({
      type: 'study_session',
      timestamp: new Date().toISOString(),
      email: session.email,
      name: session.name,
      examType: session.examType,
      subjectId: session.subjectId,
      subjectLabel: session.subjectLabel,
      topicName: session.topicName,
      startIso: session.startIso,
      endIso: new Date().toISOString(),
      durationSec,
      durationMin,
      date: session.date,
      hourOfDay: session.hour,
    });

    localStorage.removeItem(KEY_SESSION(email));
    return durationSec;
  } catch {
    return 0;
  }
}

/**
 * Track a topic being opened (without full session timing).
 */
export function trackTopicOpened({ email, name, examType, subjectId, topicName, topicIndex }) {
  enqueue({
    type: 'topic_opened',
    timestamp: new Date().toISOString(),
    email,
    name,
    examType,
    subjectId,
    topicName,
    topicIndex,
    hourOfDay: new Date().getHours(),
  });
}

/**
 * Track a learn-mode quiz being completed.
 */
export function trackLearnQuizComplete({
  email,
  name,
  examType,
  subjectId,
  topicName,
  score,
  total,
}) {
  enqueue({
    type: 'learn_quiz_complete',
    timestamp: new Date().toISOString(),
    email,
    name,
    examType,
    subjectId,
    topicName,
    score,
    total,
    pct: total > 0 ? Math.round((score / total) * 100) : 0,
  });
}

/**
 * Track a topic being marked complete.
 */
export function trackTopicComplete({ email, name, examType, subjectId, topicName, topicIndex }) {
  enqueue({
    type: 'topic_completed',
    timestamp: new Date().toISOString(),
    email,
    name,
    examType,
    subjectId,
    topicName,
    topicIndex,
  });
}

/**
 * Flush any remaining events immediately. Call on page unload, tab hide,
 * or periodically while the user is active. Safe to call often — it's a
 * no-op if the queue is empty or a flush is already in progress.
 *
 * On success, clears the local queue. On failure, leaves events queued
 * for the next attempt (no data loss on flaky connections).
 */
export function flushStudyAnalytics() {
  const q = readQueue();
  if (!q.length) return;
  flushToServer(q).then((ok) => {
    if (ok) writeQueue([]);
  });
}
