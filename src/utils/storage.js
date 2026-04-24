// ============================================================================
// LOCAL STORAGE
// ============================================================================

export function loadUser() {
  try {
    return JSON.parse(localStorage.getItem('ep_user') || '{}');
  } catch {
    return {};
  }
}

export function loadStats(email) {
  try {
    const key = email ? `ep_stats_${email}` : 'ep_stats';
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

export function saveUser(u) {
  try {
    localStorage.setItem('ep_user', JSON.stringify(u));
  } catch {}
}

export function saveStats(s, email) {
  try {
    const key = email ? `ep_stats_${email}` : 'ep_stats';
    localStorage.setItem(key, JSON.stringify(s));
  } catch {}
}

// ============================================================================
// ACHIEVEMENTS STORAGE
// ============================================================================

export function loadAchievements(email) {
  try {
    const key = email ? `ep_achievements_${email}` : 'ep_achievements';
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

export function saveAchievements(achievements, email) {
  try {
    const key = email ? `ep_achievements_${email}` : 'ep_achievements';
    localStorage.setItem(key, JSON.stringify(achievements));
  } catch {}
}

// ============================================================================
// SUBJECT PERFORMANCE STORAGE
// ============================================================================

export function loadSubjectPerformance(email) {
  try {
    const key = email ? `ep_subject_performance_${email}` : 'ep_subject_performance';
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

export function saveSubjectPerformance(performance, email) {
  try {
    const key = email ? `ep_subject_performance_${email}` : 'ep_subject_performance';
    localStorage.setItem(key, JSON.stringify(performance));
  } catch {}
}
