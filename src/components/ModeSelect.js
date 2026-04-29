import React from 'react';
import { GOLD } from '../utils/colors';

export default function ModeSelect({ onSelectMode, onBack, examType }) {

  const examLabel = {
    jamb:     'JAMB UTME',
    postutme: 'POST UTME',
    waec:     'WAEC',
    neco:     'NECO',
    gst:      'GST',
  }[examType] || 'Exam';

  const examIcon = {
    jamb: '📝', postutme: '🎓', waec: '🏫', neco: '📋', gst: '🏛️',
  }[examType] || '📚';

  // ALL exam types now get both Read Mode and Flashcards inside Learn
  // The learn mode borrows WAEC content for JAMB/POSTUTME (regex swaps labels)
  const hasLearn = true;
  const hasFlash = true;

  return (
    <div className="scr fd mode-select-page">
      <div className="mode-select-header-section">
        <button className="mode-select-back-btn" onClick={onBack}>← Back</button>
        <div className="mode-select-header-content">
          <div className="mode-select-icon">{examIcon}</div>
          <h1>
            <span style={{ color: GOLD }}>{examLabel}</span> — Pick Your Mode
          </h1>
          <p>Choose how you want to study today</p>
        </div>
      </div>

      <div className="mode-select-container">

        {/* CBT — always */}
        <div className="mode-select-card cbt-mode" onClick={() => onSelectMode('cbt')}>
          <div className="mode-select-card-icon">📝</div>
          <div className="mode-select-card-title">CBT Practice</div>
          <div className="mode-select-card-description">
            Timed multiple-choice quizzes — exactly like the real exam. Track your score per round.
          </div>
          <div className="mode-select-card-badge">Start →</div>
        </div>

        {/* Game Mode — always */}
        <div className="mode-select-card game-mode" onClick={() => onSelectMode('game')}>
          <div className="mode-select-card-icon">🎮</div>
          <div className="mode-select-card-title">Game Mode</div>
          <div className="mode-select-card-description">
            Battle the Fog of Ignorance with random edu-games built from everything you've studied.
          </div>
          <div className="mode-select-card-badge" style={{ background: '#1a0030', color: '#D4AF37' }}>Play →</div>
        </div>

        {/* Learn Mode — contains both Read and Flashcards */}
        <div className="mode-select-card learn-mode" style={{ gridColumn: '1 / -1' }}>
          <div className="mode-select-card-icon">📖</div>
          <div className="mode-select-card-title">Learn Mode</div>
          <div className="mode-select-card-description">
            Deep study notes and quick revision — pick how you want to learn.
          </div>
          <div className="mode-learn-sub-btns">
            <button className="mode-learn-sub-btn read" onClick={() => onSelectMode('learn')}>
              <span>📖</span>
              <div>
                <div className="mode-learn-sub-title">Read Mode</div>
                <div className="mode-learn-sub-desc">Rich notes, diagrams, topic quizzes</div>
              </div>
            </button>
            <button className="mode-learn-sub-btn flash" onClick={() => onSelectMode('flashcard')}>
              <span>🃏</span>
              <div>
                <div className="mode-learn-sub-title">Flashcards</div>
                <div className="mode-learn-sub-desc">Quick-fire key terms and concepts</div>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
