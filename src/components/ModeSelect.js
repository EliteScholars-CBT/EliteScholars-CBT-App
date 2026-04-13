import React from 'react';
import { BG, PURPLE, GOLD, WHITE } from '../utils/colors';

export default function ModeSelect({ onSelectMode, onBack, examType }) {
  const isPostUtme = examType === 'postutme';
  
  return (
    <div className="scr fd mode-select-page">
      <div className="mode-select-header-section">
        <button className="mode-select-back-btn" onClick={onBack}>
          ← Back
        </button>
        <div className="mode-select-header-content">
          <div className="mode-select-icon">{isPostUtme ? '🎓' : '📝'}</div>
          <h1>Choose <span style={{ color: GOLD }}>Study Mode</span></h1>
          <p>{isPostUtme ? 'Practice POST UTME with these modes' : 'Practice JAMB with these modes'}</p>
        </div>
      </div>

      <div className="mode-select-container">
        {/* CBT Mode Button */}
        <div 
          className="mode-select-card cbt-mode"
          onClick={() => onSelectMode('cbt')}
        >
          <div className="mode-select-card-icon">📝</div>
          <div className="mode-select-card-title">CBT Practice</div>
          <div className="mode-select-card-description">
            Take timed quizzes with multiple choice questions
          </div>
          <div className="mode-select-card-features">
            <span>⏱️ Timed</span>
            <span>📊 Track Progress</span>
            <span>🏆 Achievements</span>
          </div>
          <div className="mode-select-card-badge">Start →</div>
        </div>

        {/* Flashcard Mode Button */}
        <div 
          className="mode-select-card flashcard-mode"
          onClick={() => onSelectMode('flashcard')}
        >
          <div className="mode-select-card-icon">🃏</div>
          <div className="mode-select-card-title">Flashcards</div>
          <div className="mode-select-card-description">
            Learn key concepts quickly with bite-sized cards
          </div>
          <div className="mode-select-card-features">
            <span>🎴 Bite-sized</span>
            <span>⚡ Quick Learning</span>
            <span>🔄 Swipe to Learn</span>
          </div>
          <div className="mode-select-card-badge">Start →</div>
        </div>
      </div>
    </div>
  );
}
