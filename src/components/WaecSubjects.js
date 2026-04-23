import React from 'react';
import { WAEC_SUBJECTS, WAEC_QB } from '../data/waec';
import { useTheme } from '../context/ThemeContext';

export default function WaecSubjects({ name, mode = 'cbt', onStart, onBack }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="scr fd" style={{ background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      {/* Header */}
      <div className="subjects-header">
        <div className="subjects-header-curve" />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="subjects-welcome-label">WAEC • {mode === 'learn' ? 'LEARN' : 'CBT'}</div>
            <div className="subjects-welcome-name">{name || 'Student'} 👋</div>
            <div className="subjects-welcome-text">
              {mode === 'learn' ? 'Study notes & key concepts' : 'Practice past questions'}
            </div>
          </div>
          <div className="settings-group">
            <button className="settings-group-btn theme-btn" onClick={onBack}>
              <span className="settings-group-icon">←</span>
              <span className="settings-group-text">Back</span>
            </button>
            <button className="settings-group-btn theme-btn" onClick={toggleTheme}>
              <span className="settings-group-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
              <span className="settings-group-text">{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode badge */}
      <div style={{ padding: '10px 16px 0' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: mode === 'learn' ? '#DCFCE7' : '#DBEAFE',
          color: mode === 'learn' ? '#065F46' : '#1D4ED8',
          borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700,
        }}>
          {mode === 'learn' ? '📖 Learn Mode — tap a subject to study' : '🎯 CBT Mode — tap a subject to begin'}
        </div>
      </div>

      {/* 2-column subject grid */}
      <div className="scroll" style={{ flex: 1, padding: '12px 16px 100px', overflowY: 'auto' }}>
        <div className="waec-grid">
          {WAEC_SUBJECTS.map((subj) => {
            const qCount = (WAEC_QB[subj.id] || []).length;
            return (
              <div
                key={subj.id}
                className="waec-card"
                style={{ '--waec-color': subj.color, '--waec-bg': subj.bg }}
                onClick={() => onStart(subj.id, mode)}
              >
                <div className="waec-card-icon" style={{ background: subj.bg }}>
                  {subj.icon}
                </div>
                <div className="waec-card-label">{subj.label}</div>
                <div className="waec-card-meta">
                  {mode === 'learn'
                    ? '5 topics'
                    : `${qCount} questions`}
                </div>
                <div className="waec-card-badge" style={{ background: subj.bg, color: subj.color }}>
                  {mode === 'learn' ? 'STUDY' : 'READY'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .waec-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        /* Last card spans full width when total count is odd */
        .waec-card:last-child:nth-child(odd) {
          grid-column: 1 / -1;
        }
        .waec-card {
          background: var(--card-bg, #fff);
          border-radius: 16px;
          padding: 14px 12px;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .waec-card:active {
          transform: scale(0.97);
          border-color: var(--waec-color);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }
        .waec-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .waec-card-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .waec-card-meta {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .waec-card-badge {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 2px 8px;
          border-radius: 10px;
          text-transform: uppercase;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}
