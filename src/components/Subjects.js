import React, { useState } from 'react';
import AdsterraBanner from '../AdsterraBanner';
import { QB } from '../QB';
import { SUBJ } from '../data/subjects';
import { SHOW_ADS } from '../utils/constants';
import { PURPLE, DPURP, BG, LGRAY, WHITE, GRAY } from '../utils/colors';
import { SFX } from '../utils/sounds';
import { useTheme } from '../context/ThemeContext';

export default function Subjects({ name, onStart, onProfile, onSignOut, refreshTrigger }) {
  const [sel, setSel] = useState();
  const { theme, toggleTheme } = useTheme();
  
  const subjEntries = Object.entries(SUBJ).filter(([id]) => id !== 'novel');
  const lekkiCard = { id: '__lekki__', isLekki: true };
  const allCards = [
    ...subjEntries.slice(0, 2).map(([id, meta]) => ({ id, meta })),
    lekkiCard,
    ...subjEntries.slice(2).map(([id, meta]) => ({ id, meta })),
  ];

  return (
    <div className="scr fd" style={{ background: BG, display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <div className="subjects-header">
        <div className="subjects-header-curve" />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="subjects-welcome-label">WELCOME BACK</div>
            <div className="subjects-welcome-name">{name || 'Student'} 👋</div>
            <div className="subjects-welcome-text">Pick a subject to practise today</div>
          </div>
          
          {/* Settings Group - Profile + Theme Toggle */}
          <div className="settings-group">
            {/* Profile Button */}
            <button className="settings-group-btn profile-btn" onClick={onProfile}>
              <span className="settings-group-icon">👤</span>
              <span className="settings-group-text">Profile</span>
            </button>
            
            {/* Theme Toggle Button */}
            <button className="settings-group-btn theme-btn" onClick={toggleTheme}>
              <span className="settings-group-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
              <span className="settings-group-text">{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, padding: '0 16px 100px', overflowY: 'auto' }}>
        <div className="subjects-card-container">
          {allCards.map((card) => {
            if (card.isLekki) {
              const isSelL = sel === '__lekki__';
              return (
                <div key="lekki" onClick={() => { SFX.select(); setSel('__lekki__'); }} className={`lekki-card ${isSelL ? 'lekki-card-selected' : 'lekki-card-unselected'}`}>
                  <div className="lekki-icon" style={{ background: isSelL ? '#831843' : '#FCE7F3' }}>📗</div>
                  <div style={{ flex: 1 }}>
                    <div className="lekki-title">The Lekki Headmaster</div>
                    <div className="lekki-author">Kabir Alabi Garba · Literature</div>
                    <div className="lekki-badge" style={{ background: isSelL ? '#831843' : LGRAY, color: isSelL ? WHITE : GRAY }}>NOVEL</div>
                  </div>
                  <div className="lekki-question-count">
                    <div className="lekki-question-number" style={{ color: isSelL ? '#831843' : GRAY }}>{(QB.novel || []).length}</div>
                    <div>questions</div>
                  </div>
                </div>
              );
            }
            const { id, meta } = card;
            const isSel = sel === id;
            return (
              <div key={id} onClick={() => { SFX.select(); setSel(id); }} className={`subject-card ${isSel ? 'subject-card-selected' : 'subject-card-unselected'}`} style={{ '--subject-bg': meta.bg, '--subject-color': meta.color }}>
                <div className="subject-icon" style={{ background: isSel ? meta.color : meta.bg }}>{meta.icon}</div>
                <div className="subject-name">{meta.label}</div>
                <div className="subject-question-count">{(QB[id] || []).length} questions</div>
                <div className="subject-status" style={{ background: isSel ? meta.color : LGRAY, color: isSel ? WHITE : GRAY }}>READY</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="start-button-container">
        <button onClick={() => { SFX.submit(); onStart(sel === '__lekki__' ? 'novel' : sel); }} className={`start-button ${sel ? 'start-button-active' : 'start-button-inactive'}`}>
          {sel === '__lekki__' ? '📗' : SUBJ[sel]?.icon || '📚'} Start {sel === '__lekki__' ? 'Lekki Headmaster' : SUBJ[sel]?.label || 'a subject'} →
        </button>
      </div>
    </div>
  );
}
