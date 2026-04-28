import React from 'react';
import logo from '../assets/elite-scholars-cbt-logo.png';
import ChallengeNotification from './ChallengeNotification';

const NAV_ITEMS = [
  { id: 'subjects',     label: 'Study',       icon: '📚' },
  { id: 'challenges',   label: 'Challenges',  icon: '⚔️' },
  { id: 'leaderboard',  label: 'Ranks',       icon: '🏆' },
  { id: 'shop',         label: 'Shop',        icon: '🛍️' },
  { id: 'profile',      label: 'Me',          icon: '👤' },
];

const MAIN_SCREENS = ['subjects','challenges','leaderboard','shop','profile',
  'flashcardSubjects','examTypeSelect','universitySelect','modeSelect'];

export default function DesktopSidebar({ currentScreen, onNavigate, userEmail }) {
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
            (item.id === 'subjects' && ['examTypeSelect','universitySelect','modeSelect','flashcardSubjects'].includes(currentScreen));
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="sidebar-nav-icon">
                {item.id === 'challenges'
                  ? <ChallengeNotification userEmail={userEmail} onClick={() => onNavigate('challenges')} />
                  : <span>{item.icon}</span>
                }
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
