// ============================================================================
// notifications.js — Service worker registration & push notification helpers
// ============================================================================

const SW_URL = '/sw.js';

// ── Register service worker ───────────────────────────────────────────────────
export async function registerSW() {
  if (!('serviceWorker' in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register(SW_URL);
    return reg;
  } catch (err) {
    console.warn('[SW] Registration failed:', err);
    return null;
  }
}

// ── Request notification permission ──────────────────────────────────────────
export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';

  const result = await Notification.requestPermission();
  return result;
}

// ── Show a local notification via SW message ─────────────────────────────────
async function sendSWMessage(data) {
  if (!('serviceWorker' in navigator)) return;
  const reg = await navigator.serviceWorker.ready;
  if (reg.active) reg.active.postMessage(data);
}

// ── Study reminder ────────────────────────────────────────────────────────────
export async function showStudyReminder(msg) {
  if (Notification.permission !== 'granted') return;
  await sendSWMessage({
    type: 'SHOW_REMINDER',
    body: msg || "Time for today's practice! Don't break your streak 🔥",
  });
}

// ── Challenge notification ────────────────────────────────────────────────────
export async function showChallengeNotification({ challengerName, subject, examType }) {
  if (Notification.permission !== 'granted') return;
  await sendSWMessage({
    type: 'SHOW_CHALLENGE',
    challengerName,
    subject,
    examType,
  });
}

// ── Schedule daily study reminder ─────────────────────────────────────────────
// Schedules a reminder at the given hour (24h format) each day using
// setTimeout — rough approximation; real push would need a server.
export function scheduleDailyReminder(hourOfDay = 18, name = 'Scholar') {
  const now   = new Date();
  const target = new Date();
  target.setHours(hourOfDay, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);

  const msUntil = target - now;

  const tid = setTimeout(async () => {
    await showStudyReminder(
      `Hi ${name}! Time for today's study session 📚 Keep that streak alive!`
    );
    // Reschedule for next day
    scheduleDailyReminder(hourOfDay, name);
  }, msUntil);

  // Store so we can cancel if needed
  try { window._reminderTid = tid; } catch {}
  return tid;
}

export function cancelDailyReminder() {
  try { if (window._reminderTid) clearTimeout(window._reminderTid); } catch {}
}

// ── Listen for SW→client messages (e.g. notification click) ──────────────────
export function listenForSWMessages(callback) {
  if (!('serviceWorker' in navigator)) return () => {};
  const handler = (event) => {
    if (event.data?.type === 'NOTIFICATION_CLICK') callback(event.data);
  };
  navigator.serviceWorker.addEventListener('message', handler);
  return () => navigator.serviceWorker.removeEventListener('message', handler);
}
