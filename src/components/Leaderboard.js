// Leaderboard.js
// FIX (Issue 11): getXP() now reads the correct field names that the Apps Script API returns:
//   - daily/monthly:  user.xp_earned   (column name in those sheets)
//   - weekly:         user.xp_earned   (same)
//   - alltime:        user.total_xp
// FIX (Issue 3): getRankDisplay falls back cleanly to index-based ordinals when
//   rank_display is missing (should be populated by Apps Script now).
import React, { useState, useEffect } from 'react';
import { getLeaderboard, getUserRank } from '../utils/leaderboardApi';
import XPBar from './XPBar';

export default function Leaderboard({ userEmail, userName }) {
  const [activeTimeframe, setActiveTimeframe] = useState('alltime');
  const [activeExam, setActiveExam] = useState('all');
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  const timeframes = [
    { id: 'daily',   label: 'Daily'   },
    { id: 'weekly',  label: 'Weekly'  },
    { id: 'monthly', label: 'Monthly' },
    { id: 'alltime', label: 'All-Time'},
  ];

  const examTypes = [
    { id: 'all',     label: 'All'      },
    { id: 'jamb',    label: 'JAMB'     },
    { id: 'postutme',label: 'POST UTME'},
  ];

  useEffect(() => {
    loadLeaderboard();
  }, [activeTimeframe, activeExam]);

  const loadLeaderboard = async () => {
    setLoading(true);
    const data = await getLeaderboard(activeTimeframe, activeExam);
    setLeaderboard(data);
    if (userEmail) {
      const rank = await getUserRank(userEmail, activeTimeframe);
      setUserRank(rank);
    }
    setLoading(false);
  };

  // FIX (Issue 11): Map the correct API field names per timeframe.
  // Apps Script returns named objects so we rely on the actual column names:
  //   daily/weekly/monthly → xp_earned
  //   alltime              → total_xp
  const getXP = (user) => {
    if (activeTimeframe === 'alltime') return user.total_xp || 0;
    return user.xp_earned || 0;
  };

  // Avg score only available on all-time leaderboard
  const getScore = (user) => {
    if (activeTimeframe === 'alltime') return user.avg_score || 0;
    return null;
  };

  // FIX (Issue 3): Ordinal helper - use API's rank_display when present, otherwise calculate
  const getOrdinal = (n) => {
    const num = parseInt(n, 10);
    if (isNaN(num) || num < 1) return '—';
    if (num >= 11 && num <= 13) return `${num}th`;
    switch (num % 10) {
      case 1: return `${num}st`;
      case 2: return `${num}nd`;
      case 3: return `${num}rd`;
      default: return `${num}th`;
    }
  };

  const getRankDisplay = (user, index) => {
    if (user.rank_display) return user.rank_display;
    const rank = user.rank || (index + 1);
    return getOrdinal(rank);
  };

  const getMedal = (user, index) => {
    const rankDisplay = getRankDisplay(user, index);
    const rankNum = user.rank || (index + 1);
    if (rankNum === 1) return '👑';
    if (rankNum === 2) return '🥈';
    if (rankNum === 3) return '🥉';
    return rankDisplay;
  };

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <div className="leaderboard-title">🏆 Leaderboard</div>
        <div className="leaderboard-subtitle">Compete with top students</div>
      </div>

      <div className="leaderboard-filters">
        <div className="filter-group">
          {timeframes.map(tf => (
            <button
              key={tf.id}
              className={`filter-btn ${activeTimeframe === tf.id ? 'active' : ''}`}
              onClick={() => setActiveTimeframe(tf.id)}
            >
              {tf.label}
            </button>
          ))}
        </div>
        <div className="filter-group">
          {examTypes.map(et => (
            <button
              key={et.id}
              className={`filter-btn ${activeExam === et.id ? 'active' : ''}`}
              onClick={() => setActiveExam(et.id)}
            >
              {et.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="leaderboard-loading">Loading rankings...</div>
      ) : leaderboard.length === 0 ? (
        <div className="leaderboard-empty">
          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            {activeTimeframe === 'daily'   ? 'No one has played today yet. Be the first!' :
             activeTimeframe === 'weekly'  ? 'No activity this week yet.' :
             activeTimeframe === 'monthly' ? 'No activity this month yet.' :
             'No data yet. Complete a quiz to appear here!'}
          </div>
        </div>
      ) : (
        <>
          <div className="leaderboard-list">
            {leaderboard.map((user, index) => (
              <div
                key={`${user.email}-${index}`}
                className={`leaderboard-item ${user.email === userEmail ? 'is-current-user' : ''}`}
              >
                <div className="leaderboard-rank">{getMedal(user, index)}</div>
                <div className="leaderboard-avatar">{user.name?.charAt(0)?.toUpperCase() || '?'}</div>
                <div className="leaderboard-info">
                  <div className="leaderboard-name">{user.name}</div>
                  <div className="leaderboard-stats">
                    <span>Lv.{user.level || 1}</span>
                    <span>{getXP(user).toLocaleString()} XP</span>
                    {activeTimeframe !== 'alltime' && (
                      <span>{user.quizzes || 0} quiz{user.quizzes !== 1 ? 'zes' : ''}</span>
                    )}
                  </div>
                </div>
                {activeTimeframe === 'alltime' && getScore(user) !== null && (
                  <div className="leaderboard-score">{getScore(user)}%</div>
                )}
              </div>
            ))}
          </div>

          {userRank && (
            <div className="leaderboard-user-rank">
              <div className="user-rank-label">Your Rank</div>
              <div className="user-rank-value">
                {typeof userRank === 'object'
                  ? (userRank.rank_display || getOrdinal(userRank.rank))
                  : getOrdinal(userRank)}
              </div>
              <XPBar email={userEmail} name={userName} compact={true} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
