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
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'alltime', label: 'All-Time' },
  ];

  const examTypes = [
    { id: 'all', label: 'All' },
    { id: 'jamb', label: 'JAMB' },
    { id: 'postutme', label: 'POST UTME' },
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

  // Get the appropriate XP field based on timeframe
  const getXP = (user) => {
    switch(activeTimeframe) {
      case 'daily': return user.xp_earned_today || 0;
      case 'weekly': return user.xp_earned_week || 0;
      case 'monthly': return user.xp_earned_month || 0;
      default: return user.total_xp || 0;
    }
  };

  // Get the appropriate score field based on timeframe
  const getScore = (user) => {
    if (activeTimeframe === 'alltime') {
      return user.avg_score || 0;
    }
    return 0; // Daily, Weekly, Monthly don't have scores
  };

  // Get rank display (use API's rank_display or calculate fallback)
  const getRankDisplay = (user, index) => {
    if (user.rank_display) return user.rank_display;
    const rank = user.rank || index + 1;
    if (rank === 1) return '1st';
    if (rank === 2) return '2nd';
    if (rank === 3) return '3rd';
    return `${rank}th`;
  };

  // Get medal emoji based on rank
  const getMedal = (rank) => {
    const rankNum = parseInt(rank);
    if (rankNum === 1) return '👑';
    if (rankNum === 2) return '🥈';
    if (rankNum === 3) return '🥉';
    return rankNum;
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
      ) : (
        <>
          <div className="leaderboard-list">
            {leaderboard.map((user, index) => (
              <div key={user.email} className={`leaderboard-item ${user.email === userEmail ? 'is-current-user' : ''}`}>
                <div className="leaderboard-rank">{getMedal(getRankDisplay(user, index))}</div>
                <div className="leaderboard-avatar">{user.name?.charAt(0) || '?'}</div>
                <div className="leaderboard-info">
                  <div className="leaderboard-name">{user.name}</div>
                  <div className="leaderboard-stats">
                    <span>Lv.{user.level || 1}</span>
                    <span>{getXP(user)} XP</span>
                  </div>
                </div>
                {activeTimeframe === 'alltime' && (
                  <div className="leaderboard-score">{getScore(user)}%</div>
                )}
              </div>
            ))}
          </div>

          {userRank && (
            <div className="leaderboard-user-rank">
              <div className="user-rank-label">Your Rank</div>
              <div className="user-rank-value">
                {typeof userRank === 'object' ? userRank.rank_display || `#${userRank.rank}` : `#${userRank}`}
              </div>
              <XPBar email={userEmail} name={userName} compact={true} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
