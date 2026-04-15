import React from 'react';
import ChallengeNotification from './ChallengeNotification';

export default function BottomNav({ currentScreen, onNavigate, userEmail }) {
  const navItems = [
    { id: 'subjects', label: 'Study', icon: '📚', activeIcon: '📖' },
    { id: 'challenges', label: 'Challenges', icon: '⚔️', activeIcon: '⚔️' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆', activeIcon: '🏆' },
    { id: 'profile', label: 'Me', icon: '👤', activeIcon: '👤' },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map(item => {
        const isActive = currentScreen === item.id;
        
        return (
          <button
            key={item.id}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <div className="bottom-nav-icon">
              {item.id === 'challenges' ? (
                <ChallengeNotification userEmail={userEmail} onClick={() => onNavigate('challenges')} />
              ) : (
                <span>{isActive ? item.activeIcon : item.icon}</span>
              )}
            </div>
            <div className={`bottom-nav-label ${isActive ? 'active-label' : ''}`}>
              {item.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
