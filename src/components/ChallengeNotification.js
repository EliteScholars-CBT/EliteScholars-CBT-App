import React, { useState, useEffect } from 'react';
import { getPendingChallenges } from '../utils/challengeApi';

export default function ChallengeNotification({ userEmail, onClick }) {
  const [count, setCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (userEmail) {
      checkChallenges();
      const interval = setInterval(checkChallenges, 30000);
      return () => clearInterval(interval);
    }
  }, [userEmail]);

  const checkChallenges = async () => {
    const pending = await getPendingChallenges(userEmail);
    const newCount = pending.length;
    
    if (newCount > count && newCount > 0) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    }
    setCount(newCount);
  };

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
