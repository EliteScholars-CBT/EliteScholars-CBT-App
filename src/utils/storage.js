// ============================================================================
// LOCAL STORAGE
// ============================================================================

export function loadUser() {
  try { return JSON.parse(localStorage.getItem('ep_user') || '{}'); } catch { return {}; }
}

export function loadStats(email) {
  try {
    const key = email ? `ep_stats_${email}` : 'ep_stats';
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch { return {}; }
}

export function saveUser(u) {
  try { localStorage.setItem('ep_user', JSON.stringify(u)); } catch {}
}

export function saveStats(s, email) {
  try {
    const key = email ? `ep_stats_${email}` : 'ep_stats';
    localStorage.setItem(key, JSON.stringify(s));
  } catch {}
}
