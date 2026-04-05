import React, { useState, useEffect } from 'react';
import { SUBJ } from '../data/subjects';
import { SHOW_POPOVER_AD, SHARE_GATE_EVERY, WA_GROUP, WA_CHANNEL } from '../utils/constants';
import { DPURP, PURPLE, BG, WHITE, GRAY, GOLD, LGRAY, GREEN } from '../utils/colors';
import { SFX } from '../utils/sounds';  // Fixed: only SFX from sounds
import ScoreCard from './ScoreCard';

export default function Result({ name, subjectId, score, correct, totalQ, totalSessions, onHome, onProfile, onAdGateComplete }) {
  const [showCard, setShowCard] = useState(false);
  const [adCompleted, setAdCompleted] = useState(false);
  const meta = SUBJ[subjectId] || SUBJ.economics;
  const pct = totalQ ? Math.round((correct / totalQ) * 100) : 0;
  const wrong = totalQ - correct;

  const needAdGate = SHOW_POPOVER_AD && totalSessions > 0 && totalSessions % SHARE_GATE_EVERY === 0;
  const showGroup = !needAdGate && !SHOW_POPOVER_AD && totalSessions % 2 === 1;
  const showChannel = !needAdGate && !SHOW_POPOVER_AD && totalSessions % 2 === 0;

  const msgs = [[80, "Excellent! You're in the top league. 300+ is within reach."], [60, "Good work! A bit more practice and you're unstoppable."], [40, 'Not bad. Review the explanations and come back.'], [0, "Every session makes you sharper. Don't stop."]];
  const msg = msgs.find(([t]) => pct >= t)[1];

  useEffect(() => { setTimeout(() => SFX.roundComplete(), 400); }, []);

  const handlePlayAgain = () => {
    if (needAdGate && !adCompleted) {
      onAdGateComplete(() => { setAdCompleted(true); onHome(); });
    } else { onHome(); }
  };

  return (
    <div className="scr fd" style={{ background: BG }}>
      <div className="result-hero" style={{ background: `linear-gradient(135deg,${DPURP},${meta.color || PURPLE})` }}>
        <div className="result-score-circle"><div className="result-score-number">{correct}/{totalQ}</div><div className="result-score-label">FINAL SCORE</div></div>
        <div className="result-name">{name}!</div>
        <div className="result-message">{msg}</div>
      </div>

      <div className="scroll" style={{ flex: 1, padding: '0 16px 20px', marginTop: -18 }}>
        <div className="result-stats">
          {[['Correct', correct], ['Wrong', wrong], ['Points', score]].map(([l, v]) => <div key={l} className="result-stat-card"><div className="result-stat-value">{v}</div><div className="result-stat-label">{l}</div></div>)}
        </div>

        <button className="result-scorecard-btn" onClick={() => { SFX.select(); setShowCard(true); }} style={{ background: `linear-gradient(135deg,${meta.color},${DPURP})` }}>🖼️ Show Friends Your Score Card</button>

        {needAdGate && !adCompleted && (
          <div className="gate-container" style={{ background: `linear-gradient(135deg,${DPURP},#3d0070)` }}>
            <div className="gate-badge">🎬 SUPPORT ELITESCHOLARS</div>
            <div className="gate-quote" style={{ textAlign: 'center' }}>Watch a quick ad to unlock your next quiz round and help keep this free!</div>
            <button className="gate-share-btn" style={{ background: GOLD, color: DPURP }} onClick={() => onAdGateComplete(handlePlayAgain)}>🎬 Watch Ad & Continue</button>
            <div className="gate-unlock-note">Ad supports free JAMB practice for everyone</div>
          </div>
        )}

        {needAdGate && adCompleted && (
          <div className="su gate-success"><div className="gate-success-text">✅ Thank you! Next round unlocked!</div><button className="join-play-again" onClick={onHome} style={{ marginTop: 10, background: GOLD, color: DPURP }}>🔄 Play Again</button></div>
        )}

        {!SHOW_POPOVER_AD && (
          <>
            {showGroup && (
              <div className="join-card"><div className="join-title">Join Our WhatsApp Group 💬</div><div className="join-subtitle">Practise with other serious JAMB students daily.</div><button className="join-button" onClick={() => window.open(WA_GROUP, '_blank')}>💬 Join WhatsApp Group</button><button className="join-play-again" onClick={onHome}>🔄 Play Again</button></div>
            )}
            {showChannel && (
              <div className="join-card"><div className="join-title">Follow Our WhatsApp Channel 📲</div><div className="join-subtitle">Daily questions, tips &amp; serious JAMB community.</div><button className="join-button" onClick={() => window.open(WA_CHANNEL, '_blank')}>📢 Follow Elite JAMB Channel</button><button className="join-play-again" onClick={onHome}>🔄 Play Again</button></div>
            )}
          </>
        )}

        {!needAdGate && !showGroup && !showChannel && !SHOW_POPOVER_AD && <button className="join-play-again" onClick={onHome} style={{ background: GOLD, color: DPURP, marginBottom: 12 }}>🔄 Play Again</button>}
        {!needAdGate && !showGroup && !showChannel && SHOW_POPOVER_AD && !adCompleted && <button className="join-play-again" onClick={onHome} style={{ background: GOLD, color: DPURP, marginBottom: 12 }}>🔄 Play Again</button>}

        <button className="profile-view-btn" onClick={onProfile}>📊 View My Profile</button>
        <button className="back-menu-btn" onClick={onHome}>⌂ Back to Main Menu</button>
      </div>

      {showCard && <ScoreCard name={name} subjectId={subjectId} score={score} correct={correct} totalQ={totalQ} onClose={() => setShowCard(false)} />}
    </div>
  );
}
