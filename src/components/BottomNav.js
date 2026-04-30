import React from 'react';
import ChallengeNotification from './ChallengeNotification';

// ============================================================================
// BottomNav — 5 tabs: Study, Challenges, Leaderboard, Shop, Me
// Persistent during subject selection; hidden in quiz/learn/result screens
// ============================================================================

export default function BottomNav({ currentScreen, onNavigate, userEmail }) {
  const navItems = [
    { id: 'subjects', label: 'Study', icon: '📚', activeIcon: '📖' },
    { id: 'challenges', label: 'Challenges', icon: '⚔️', activeIcon: '⚔️' },
    { id: 'leaderboard', label: 'Ranks', icon: '🏆', activeIcon: '🏆' },
    { id: 'shop', label: 'Shop', icon: '🛍️', activeIcon: '🛍️' },
    { id: 'profile', label: 'Me', icon: '👤', activeIcon: '👤' },
  ];

  const STUDY_SCREENS = new Set([
    'subjects','examType','universitySelect',
'ready','quiz','result','learn','game',
  ]);

  return (
    <div className="bottom-nav" role="navigation" aria-label="Main navigation">
      {navItems.map((item) => {
        const isActive = item.id === 'subjects'
          ? STUDY_SCREENS.has(currentScreen)
          : currentScreen === item.id;
        return (
          <button
            key={item.id}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="bottom-nav-icon">
              {item.id === 'challenges' ? (
                <ChallengeNotification
                  userEmail={userEmail}
                  onClick={() => onNavigate('challenges')}
                />
              ) : (
                <span>{isActive ? item.activeIcon : item.icon}</span>
              )}
            </div>
            <div className={`bottom-nav-label ${isActive ? 'active-label' : ''}`}>{item.label}</div>
          </button>
        );
      })}
    </div>
  );
}
