import React from 'react';
import { GOLD } from '../utils/colors';

// ============================================================================
// ModeSelect — Modes available vary by exam type:
//   jamb      → CBT + Flashcards
//   postutme  → CBT only
//   waec/neco → CBT + Learn Mode
//   gst       → CBT + Learn Mode
// ============================================================================

export default function ModeSelect({ onSelectMode, onBack, examType }) {
  const isPostUtme  = examType === 'postutme';
  const hasLearn    = examType === 'waec' || examType === 'neco' || examType === 'gst';
  const hasFlash    = examType === 'jamb';

  const examLabel = {
    jamb: 'JAMB UTME',
    postutme: 'POST UTME',
    waec: 'WAEC',
    neco: 'NECO',
    gst: 'GST',
  }[examType] || 'Exam';

  return (
    <div className="scr fd mode-select-page">
      <div className="mode-select-header-section">
        <button className="mode-select-back-btn" onClick={onBack}>← Back</button>
        <div className="mode-select-header-content">
          <div className="mode-select-icon">
            {examType === 'gst' ? '🎓' : examType === 'waec' ? '🏫' :
             examType === 'neco' ? '📋' : examType === 'postutme' ? '🎓' : '📝'}
          </div>
          <h1>
            <span style={{ color: GOLD }}>{examLabel}</span> Study Mode
          </h1>
          <p>How would you like to study today?</p>
        </div>
      </div>

      <div className="mode-select-container">
        {/* CBT — always available */}
        <div className="mode-select-card cbt-mode" onClick={() => onSelectMode('cbt')}>
          <div className="mode-select-card-icon">📝</div>
          <div className="mode-select-card-title">CBT Practice</div>
          <div className="mode-select-card-description">
            Timed quizzes with multiple-choice questions — exactly like the real exam.
          </div>
          <div className="mode-select-card-badge">Start →</div>
        </div>

        {/* Learn Mode — WAEC, NECO, GST */}
        {hasLearn && (
          <div className="mode-select-card learn-mode" onClick={() => onSelectMode('learn')}>
            <div className="mode-select-card-icon">📖</div>
            <div className="mode-select-card-title">Learn Mode</div>
            <div className="mode-select-card-description">
              Rich study notes, diagrams, text-to-speech and topic quizzes. Master before you attempt.
            </div>
            <div className="mode-select-card-badge" style={{ background: '#DCFCE7', color: '#065F46' }}>
              Study →
            </div>
          </div>
        )}

        {/* Flashcards — JAMB only */}
        {hasFlash && (
          <div className="mode-select-card flashcard-mode" onClick={() => onSelectMode('flashcard')}>
            <div className="mode-select-card-icon">🃏</div>
            <div className="mode-select-card-title">Flashcards</div>
            <div className="mode-select-card-description">
              Quick-fire key concepts and definitions — great for last-minute revision.
            </div>
            <div className="mode-select-card-badge" style={{ background: '#FEF3C7', color: '#B45309' }}>
              Revise →
            </div>
          </div>
        )}
      </div>

      {isPostUtme && (
        <div className="mode-select-note">
          <p>📚 POST UTME focuses on CBT practice with past questions from your chosen university.</p>
        </div>
      )}
    </div>
  );
}
