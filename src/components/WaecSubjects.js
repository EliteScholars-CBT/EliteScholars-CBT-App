import React, { useState } from 'react';
import { WAEC_SUBJECTS } from '../data/waec';
import { WAEC_QB } from '../data/waec';
import { GST_SUBJECTS } from '../data/gst';
import { NECO_SUBJECTS } from '../data/neco';
import { useTheme } from '../context/ThemeContext';

// ============================================================================
// WaecSubjects — subject picker for WAEC, NECO, and GST
// Has inline CBT / Learn mode toggle — no ModeSelect step needed
// ============================================================================

export default function WaecSubjects({
  name,
  onStart,
  onBack,
  examType = 'waec',
  onModeChange,
}) {
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState('cbt');

  // Pick the right subject list per exam type
  const subjects =
    examType === 'gst'  ? GST_SUBJECTS  :
    examType === 'neco' ? NECO_SUBJECTS :
    WAEC_SUBJECTS;

  const examLabel = {
    waec: 'WAEC',
    neco: 'NECO',
    gst:  'GST',
  }[examType] || 'WAEC';

  const handleMode = (m) => {
    setMode(m);
    if (onModeChange) onModeChange(m);
  };

  return (
    <div
      className="scr fd"
      style={{
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
      }}
    >
      {/* Header */}
      <div className="subjects-header">
        <div className="subjects-header-curve" />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="subjects-welcome-label">{examLabel}</div>
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

      {/* CBT / Learn mode toggle */}
      <div style={{ padding: '14px 16px 2px', flexShrink: 0 }}>
        <div className="waec-mode-toggle">
          <button
            className={`waec-mode-btn ${mode === 'cbt' ? 'active' : ''}`}
            onClick={() => handleMode('cbt')}
          >
            📝 CBT Practice
          </button>
          <button
            className={`waec-mode-btn ${mode === 'learn' ? 'active' : ''}`}
            onClick={() => handleMode('learn')}
          >
            📖 Learn Mode
          </button>
        </div>
      </div>

      {/* Subject grid */}
      <div className="scroll" style={{ flex: 1, padding: '12px 16px 100px', overflowY: 'auto' }}>
        <div className="waec-grid">
          {subjects.map((subj) => {
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
                  {mode === 'learn' ? '5 topics' : qCount > 0 ? `${qCount} questions` : 'Questions coming soon'}
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
        .waec-mode-toggle {
          display: flex;
          background: var(--card-bg, #F3F0FF);
          border-radius: 12px;
          padding: 4px;
          gap: 4px;
          border: 1px solid rgba(108,63,201,0.1);
        }
        .waec-mode-btn {
          flex: 1;
          padding: 9px 8px;
          border: none;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-secondary, #6B7280);
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }
        .waec-mode-btn.active {
          background: #fff;
          color: #6C3FC9;
          box-shadow: 0 2px 8px rgba(108,63,201,0.15);
        }
        body.dark-mode .waec-mode-toggle {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.1);
        }
        body.dark-mode .waec-mode-btn.active {
          background: rgba(108,63,201,0.3);
          color: #C4B5FD;
        }
        .waec-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
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
        body.dark-mode .waec-card {
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
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
          color: var(--text-primary, #1a0030);
          line-height: 1.2;
        }
        .waec-card-meta {
          font-size: 11px;
          color: var(--text-secondary, #6B7280);
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
