import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getPendingChallenges } from '../utils/challengeApi';

export default function ChallengeNotification({ userEmail, onClick }) {
  const [count, setCount]       = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const countRef = useRef(0);

  const checkChallenges = useCallback(async () => {
    if (!userEmail) return;
    try {
      const pending  = await getPendingChallenges(userEmail);
      const newCount = Array.isArray(pending) ? pending.length : 0;
      if (newCount > countRef.current && newCount > 0) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      }
      countRef.current = newCount;
      setCount(newCount);
    } catch {}
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail) return;
    checkChallenges();
    const interval = setInterval(checkChallenges, 30000);
    return () => clearInterval(interval);
  }, [userEmail, checkChallenges]);

  return (
    <>
      <button className="notification-bell" onClick={onClick}>
        🔔
        {count > 0 && <span className="notification-badge">{count}</span>}
      </button>
      
      {showPopup && (
        <div className="notification-popup">
          <div className="popup-icon">⚔️</div>
          <div className="popup-text">
            <strong>New Challenge!</strong>
            <span>You have {count} pending challenge(s)</span>
          </div>
        </div>
      )}
    </>
  );
}
