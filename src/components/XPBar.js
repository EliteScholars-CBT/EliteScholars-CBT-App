import React, { useState, useEffect } from 'react';
import { getUserXP, getProgressPercentage, getXPToNextLevel } from '../utils/xpManager';

export default function XPBar({ email, name, showLevel = true, compact = false }) {
  const [xpData, setXpData] = useState({ total_xp: 0, level: 1, xp_to_next: 100 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      loadXP();
    }
  }, [email]);

  const loadXP = async () => {
    const data = await getUserXP(email);
    setXpData({
      total_xp: data.total_xp || 0,
      level: data.level || 1,
      xp_to_next: data.xp_to_next || 100,
    });
    setLoading(false);
  };

  if (loading) {
    return <div className="xp-bar-skeleton"></div>;
  }

  const progress = getProgressPercentage(xpData.total_xp);
  const currentLevelXP = (xpData.level - 1) * 100;
  const xpInLevel = xpData.total_xp - currentLevelXP;

  if (compact) {
    return (
      <div className="xp-bar-compact">
        <div className="xp-bar-compact-level">Lv.{xpData.level}</div>
        <div className="xp-bar-compact-progress">
          <div className="xp-bar-compact-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="xp-bar-compact-xp">{xpInLevel}/{100}</div>
      </div>
    );
  }

  return (
    <div className="xp-bar-container">
      {showLevel && (
        <div className="xp-bar-header">
          <div className="xp-bar-level">
            <span className="xp-icon">⭐</span>
            <span>Level {xpData.level}</span>
          </div>
          <div className="xp-bar-total">{xpData.total_xp} XP</div>
        </div>
      )}
      <div className="xp-bar-progress">
        <div className="xp-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="xp-bar-footer">
        <span>{xpInLevel} / {100} XP</span>
        <span>{xpData.xp_to_next} XP to next level</span>
      </div>
    </div>
  );
}
