import React from 'react';
import ChallengeNotification from './ChallengeNotification';

export default function BottomNav({ currentScreen, onNavigate, userEmail }) {
  const navItems = [
    { id: 'subjects', label: 'Study', icon: '📚' },
    { id: 'challenges', label: 'Challenges', icon: '⚔️' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    { id: 'profile', label: 'Me', icon: '👤' },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`bottom-nav-item ${currentScreen === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          <div className="bottom-nav-icon">
            {item.id === 'challenges' ? (
              <ChallengeNotification userEmail={userEmail} onClick={() => onNavigate('challenges')} />
            ) : (
              <span>{item.icon}</span>
            )}
          </div>
          <div className="bottom-nav-label">{item.label}</div>
        </button>
      ))}
    </div>
  );
}
