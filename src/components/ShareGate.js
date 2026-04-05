import React, { useState, useEffect } from 'react';
import { APP_URL } from '../utils/constants';
import { GOLD, GREEN, DPURP, WHITE } from '../utils/colors';

export default function ShareGate({ name, email, onUnlocked }) {
  const [sharing, setSharing] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [done, setDone] = useState(false);
  const shareText = `I'm seriously preparing for JAMB on EliteScholars CBT! 🔥\n\nFree practice at ${APP_URL} — come join me!`;

  useEffect(() => {
    if (!sharing) return;
    if (countdown <= 0) { setDone(true); setSharing(false); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [sharing, countdown]);

  const doShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    setSharing(true);
    setCountdown(30);
    try { if (email) localStorage.removeItem(`ep_sharepending_${email}`); } catch {}
  };

  const vibe = ['Your brain is literally built different!', 'Every question moves you closer to your dream school.', "This is what serious JAMB students look like!"][Math.floor(Math.random() * 3)];

  return (
    <div className="scr fd sharegate-container">
      <div className="sharegate-card">
        <div className="sharegate-icon">📤</div>
        <div className="sharegate-title">Unlock Your Next Round</div>
        <div className="sharegate-subtitle">Share EliteScholars with your friends on WhatsApp to keep playing. 🔥</div>
        <div className="sharegate-vibe"><div className="sharegate-vibe-badge">✨ FROM ELITE JAMB</div><div className="sharegate-vibe-text">"{vibe}"</div></div>
        {!done ? (
          <>
            <button className={`sharegate-share-btn ${sharing ? 'sharegate-share-btn-disabled' : ''}`} onClick={doShare} disabled={sharing}>💬 {sharing ? `Verifying... ${countdown}s` : 'Share to WhatsApp Friends'}</button>
            {sharing && <div className="sharegate-progress"><div className="sharegate-progress-fill" style={{ width: `${((30-countdown)/30)*100}%` }} /></div>}
            <button className="sharegate-locked-btn">🔒 Start Quiz — Share First</button>
          </>
        ) : (
          <div className="sharegate-unlocked"><div className="sharegate-success"><div className="sharegate-success-text">✅ Unlocked!</div></div><button className="sharegate-start-btn" onClick={onUnlocked}>🚀 Start Quiz Now</button></div>
        )}
      </div>
    </div>
  );
}
