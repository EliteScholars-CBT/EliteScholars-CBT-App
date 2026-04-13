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
          <p>{isPostUtme ? 'Practice POST UTME with CBT' : 'Choose how you want to study'}</p>
        </div>
      </div>

      <div className="mode-select-container">
        {/* CBT Mode Button - Available for BOTH */}
        <div 
          className="mode-select-card cbt-mode"
          onClick={() => onSelectMode('cbt')}
        >
          <div className="mode-select-card-icon">📝</div>
          <div className="mode-select-card-title">CBT Practice</div>
          <div className="mode-select-card-description">
            Take timed quizzes with multiple choice questions
          </div>
          <div className="mode-select-card-badge">Start →</div>
        </div>

        {/* Flashcard Mode Button - HIDDEN for POST UTME */}
        {!isPostUtme && (
          <div 
            className="mode-select-card flashcard-mode"
            onClick={() => onSelectMode('flashcard')}
          >
            <div className="mode-select-card-icon">🃏</div>
            <div className="mode-select-card-title">Flashcards</div>
            <div className="mode-select-card-description">
              Learn key concepts quickly with bite-sized cards
            </div>
            <div className="mode-select-card-badge">Start →</div>
          </div>
        )}
      </div>
      
      {/* Optional: Show message for POST UTME */}
      {isPostUtme && (
        <div className="mode-select-note">
          <p>📚 POST UTME focuses on CBT practice with past questions from your chosen university.</p>
        </div>
      )}
    </div>
  );
    }
