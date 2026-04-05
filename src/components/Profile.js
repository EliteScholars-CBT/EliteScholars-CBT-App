import React from 'react';
import { DPURP, PURPLE, BG, WHITE, GRAY, GOLD, LGOLD } from '../utils/colors';
import { ROUND_SIZE } from '../utils/constants';

export default function Profile({ name, email, sessions, streak, allScores, bestScore, onBack, onSignOut }) {
  const initials = name ? name.slice(0, 2).toUpperCase() : 'ME';
  const avg = allScores.length ? Math.round(allScores.reduce((a,b) => a+b, 0) / allScores.length) : 0;
  const rank = bestScore >= 38 ? '🏆 Elite Scholar' : bestScore >= 30 ? '⭐ Rising Star' : bestScore >= 20 ? '📚 Sharp Guy' : '🌱 Beginner';

  return (
    <div className="scr fd" style={{ background: BG }}>
      <div className="profile-header" style={{ background: `linear-gradient(135deg,${DPURP},${PURPLE})` }}>
        <div style={{ position: 'absolute', bottom: -20, left: 0, right: 0, height: 40, background: BG, borderRadius: '24px 24px 0 0' }} />
        <div className="profile-back" onClick={onBack}>← Back</div>
        <div className="profile-avatar">{initials}</div>
        <div className="profile-name">{name || 'Student'}</div>
        <div className="profile-email">{email}</div>
        <div className="profile-badges"><div className="profile-streak-badge">🔥 {streak} Day{streak !== 1 ? 's' : ''} Streak</div><div className="profile-rank-badge">{rank}</div></div>
      </div>
      <div className="profile-stats-section">
        <div className="profile-stats-title">Your Stats</div>
        <div className="profile-stats-grid">
          {[['Quizzes Done', sessions || 0], ['Avg Score', avg + '%'], ['Best Score', bestScore + '/' + ROUND_SIZE], ['Streak', streak + ' days']].map(([l, v]) => <div key={l} className="profile-stat-card"><div className="profile-stat-value">{v}</div><div className="profile-stat-label">{l}</div></div>)}
        </div>
        <div className="profile-streak-card"><div className="profile-streak-icon">🔥</div><div><div className="profile-streak-title">{streak}-Day Streak</div><div className="profile-streak-text">Come back daily to keep it alive!</div></div></div>
        <button className="profile-signout-btn" onClick={onSignOut}>↩ Sign Out</button>
      </div>
    </div>
  );
}
