import React, { useState, useEffect, useRef, useCallback } from 'react';
import logo from '../assets/elite-scholars-cbt-logo.png';
import { getPendingChallenges } from '../utils/challengeApi';

const NAV_ITEMS = [
  { id: 'subjects',     label: 'Study',       icon: '📚' },
  { id: 'challenges',   label: 'Challenges',  icon: '⚔️', hasNotif: true },
  { id: 'leaderboard',  label: 'Ranks',       icon: '🏆' },
  { id: 'shop',         label: 'Shop',        icon: '🛍️' },
  { id: 'profile',      label: 'Me',          icon: '👤' },
];

const MAIN_SCREENS = ['subjects','challenges','leaderboard','shop','profile',
  'flashcardSubjects','examTypeSelect','universitySelect','modeSelect','examType',
  'waecSubjects','modeSelect'];

export default function DesktopSidebar({ currentScreen, onNavigate, userEmail }) {
  const [challengeCount, setChallengeCount] = useState(0);
  const countRef = useRef(0);

  const checkChallenges = useCallback(async () => {
    if (!userEmail) return;
    try {
      const pending  = await getPendingChallenges(userEmail);
      const n = Array.isArray(pending) ? pending.length : 0;
      countRef.current = n;
      setChallengeCount(n);
    } catch {}
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail) return;
    checkChallenges();
    const id = setInterval(checkChallenges, 60000);
    return () => clearInterval(id);
  }, [userEmail, checkChallenges]);

  const visible = MAIN_SCREENS.includes(currentScreen);
  if (!visible) return null;

  return (
    <aside className="desktop-sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="EliteScholars" />
      </div>
      <nav>
        {NAV_ITEMS.map(item => {
          const isActive = currentScreen === item.id ||
            (item.id === 'subjects' && ['examType','waecSubjects','modeSelect','flashcardSubjects','universitySelect'].includes(currentScreen));
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="sidebar-nav-icon" style={{ position: 'relative' }}>
                <span>{item.icon}</span>
                {item.hasNotif && challengeCount > 0 && (
                  <span style={{
                    position: 'absolute', top: -4, right: -6,
                    background: '#EF4444', color: '#fff',
                    fontSize: 9, fontWeight: 900,
                    borderRadius: 8, padding: '1px 4px',
                    minWidth: 14, textAlign: 'center',
                  }}>{challengeCount}</span>
                )}
              </div>
              <span className="sidebar-nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-footer-text">EliteScholars CBT<br />Free exam prep for Nigeria</div>
      </div>
    </aside>
  );
}
