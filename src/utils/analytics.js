import { SHEETS_URL } from './constants';

// ============================================================================
// ANALYTICS
// ============================================================================

export function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua);
  const browser = /Chrome/i.test(ua) && !/Edge|OPR/i.test(ua) ? 'Chrome' : /Firefox/i.test(ua) ? 'Firefox' : /Safari/i.test(ua) && !/Chrome/i.test(ua) ? 'Safari' : /Edge/i.test(ua) ? 'Edge' : /OPR|Opera/i.test(ua) ? 'Opera' : 'Other';
  const device = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';
  const os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iOS' : /Windows/i.test(ua) ? 'Windows' : /Mac/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : 'Unknown';
  return { browser, device, os };
}

export function fmtTimestamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function trackEvent(eventName, data) {
  if (!SHEETS_URL) return;
  fetch(SHEETS_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: eventName, timestamp: fmtTimestamp(), ...data }),
  }).catch(() => {});
}
