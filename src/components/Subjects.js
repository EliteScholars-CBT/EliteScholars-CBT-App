import React, { useState } from 'react';
import AdsterraBanner from '../AdsterraBanner';
import { QB } from '../QB';
import { POST_UTME } from '../data/postutme';
import { getFlashcardsForSubject } from '../data/flashcards';
import { SUBJ } from '../data/subjects';
import { SHOW_ADS } from '../utils/constants';
import { PURPLE, DPURP, BG, LGRAY, WHITE, GRAY } from '../utils/colors';
import { SFX } from '../utils/sounds';
import { useTheme } from '../context/ThemeContext';

export default function Subjects({ 
  name, 
  onStart, 
  onProfile, 
  onSignOut, 
  refreshTrigger, 
  mode = 'cbt',
  examType = 'jamb',
  university = null 
}) {
  const { theme, toggleTheme } = useTheme();

  // Helper: Check if a subject has questions available for current exam type
  const hasQuestions = (subjectId) => {
    if (examType === 'postutme' && university) {
      const uniData = POST_UTME[university?.toUpperCase()];
      if (uniData && uniData[subjectId]) {
        return uniData[subjectId].length > 0;
      }
      return false;
    } else {
      if (subjectId === 'novel') {
        return (QB.novel || []).length > 0;
      }
      return (QB[subjectId] || []).length > 0;
    }
  };

  // Get count based on mode and exam type
  const getItemCount = (subjectId) => {
    if (mode === 'flashcard') {
      if (subjectId === 'novel') {
        return getFlashcardsForSubject('novel').length;
      }
      return getFlashcardsForSubject(subjectId).length;
    } else {
      if (examType === 'postutme' && university) {
        const uniData = POST_UTME[university?.toUpperCase()];
        if (uniData && uniData[subjectId]) {
          return uniData[subjectId].length;
        }
        return 0;
      } else {
        if (subjectId === 'novel') {
          return (QB.novel || []).length;
        }
        return (QB[subjectId] || []).length;
      }
    }
  };

  // Get label based on mode
  const getItemLabel = () => {
    return mode === 'flashcard' ? 'cards' : 'questions';
  };

  // Get header text based on exam type
  const getHeaderText = () => {
    if (examType === 'postutme' && university) {
      const uniNames = {
        unilag: 'UNILAG', lasu: 'LASU', unn: 'UNN', uniben: 'UNIBEN',
        abu: 'ABU', buk: 'BUK', funaab: 'FUNAAB', lautech: 'LAUTECH',
        unical: 'UNICAL', unilorin: 'UNILORIN', uniuyo: 'UNIUYO',
        oau: 'OAU', uniport: 'UNIPORT', ui: 'UI'
      };
      return `${uniNames[university] || university.toUpperCase()} POST UTME`;
    }
    return mode === 'flashcard' ? 'Flashcard Study Mode' : 'CBT Practice Mode';
  };

  // Handle subject click - start directly
  const handleSubjectClick = (subjectId) => {
    SFX.select();
    SFX.submit();
    onStart(subjectId);
  };

  // Filter subjects that actually have questions
  const getAvailableSubjects = () => {
    const allSubjects = Object.entries(SUBJ).filter(([id]) => id !== 'novel');
    return allSubjects.filter(([id]) => hasQuestions(id));
  };

  // Build the grid layout with Lekki card only if it has questions
  const buildSubjectGrid = () => {
    const availableSubjects = getAvailableSubjects();
    const hasNovelQuestions = hasQuestions('novel');
    
    if (availableSubjects.length === 0 && !hasNovelQuestions) {
      return [];
    }
    
    const subjectCards = availableSubjects.map(([id, meta]) => ({ id, meta, type: 'subject' }));
    
    if (!hasNovelQuestions) {
      return subjectCards;
    }
    
    const lekkiCard = { id: '__lekki__', isLekki: true, type: 'lekki' };
    const result = [];
    
    for (let i = 0; i < subjectCards.length; i++) {
      if (i === 2) {
        result.push(lekkiCard);
      }
      result.push(subjectCards[i]);
    }
    
    if (!result.some(card => card.isLekki) && hasNovelQuestions) {
      result.push(lekkiCard);
    }
    
    return result;
  };

  const allCards = buildSubjectGrid();
  const hasAnyQuestions = allCards.length > 0;

  // Guard for POST UTME trying to use flashcards
  if (mode === 'flashcard' && examType === 'postutme') {
    return (
      <div className="scr fd" style={{ background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, padding: 40 }}>
        <div style={{ fontSize: 64 }}>📚</div>
        <div style={{ fontSize: 20, fontWeight: 700, textAlign: 'center', color: 'var(--text-primary)' }}>Flashcards Coming Soon for POST UTME</div>
        <div style={{ fontSize: 14, color: GRAY, textAlign: 'center', maxWidth: 280 }}>
          POST UTME focuses on CBT practice with past questions. Check back later for flashcards!
        </div>
        <button onClick={onProfile} style={{ padding: '10px 24px', background: PURPLE, color: WHITE, border: 'none', borderRadius: 30, cursor: 'pointer' }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="scr fd" style={{ background: BG, display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <div className="subjects-header">
        <div className="subjects-header-curve" />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="subjects-welcome-label">
              {examType === 'postutme' ? 'POST UTME' : 'JAMB'} • {mode.toUpperCase()}
            </div>
            <div className="subjects-welcome-name">{name || 'Student'} 👋</div>
            <div className="subjects-welcome-text">{getHeaderText()}</div>
          </div>
          
          {/* Settings Group - Profile + Theme Toggle */}
          <div className="settings-group">
            <button className="settings-group-btn profile-btn" onClick={onProfile}>
              <span className="settings-group-icon">👤</span>
              <span className="settings-group-text">Profile</span>
            </button>
            <button className="settings-group-btn theme-btn" onClick={toggleTheme}>
              <span className="settings-group-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
              <span className="settings-group-text">{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </div>

      {SHOW_ADS && (
        <div style={{ padding: '0 16px', marginTop: '-8px', marginBottom: '12px', zIndex: 2 }}>
          <AdsterraBanner adKey="ec0487cde03d79b75629df8828d753f9" refreshTrigger={refreshTrigger} />
        </div>
      )}

      <div className="scroll" style={{ flex: 1, padding: '0 16px 100px', overflowY: 'auto' }}>
        {!hasAnyQuestions ? (
          <div className="no-questions-container" style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: 'var(--card-bg)',
            borderRadius: 20,
            marginTop: 40
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>📭</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
              No Questions Available Yet
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
              {examType === 'postutme' && university 
                ? `We're currently adding questions for ${university.toUpperCase()}. Check back soon!` 
                : 'More questions are being added. Please check back later!'}
            </div>
            <button 
              onClick={onProfile}
              style={{
                padding: '10px 24px',
                background: 'var(--gold)',
                border: 'none',
                borderRadius: 30,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Go to Profile
            </button>
          </div>
        ) : (
          <div className="subjects-card-container">
            {allCards.map((card) => {
              if (card.isLekki) {
                const itemCount = getItemCount('novel');
                const itemLabel = getItemLabel();
                
                return (
                  <div 
                    key="lekki" 
                    onClick={() => handleSubjectClick('novel')} 
                    className="lekki-card"
                  >
                    <div className="lekki-icon" style={{ background: '#FCE7F3' }}>📗</div>
                    <div style={{ flex: 1 }}>
                      <div className="lekki-title">The Lekki Headmaster</div>
                      <div className="lekki-author">Kabir Alabi Garba · Literature</div>
                      <div className="lekki-badge" style={{ background: LGRAY, color: GRAY }}>NOVEL</div>
                    </div>
                    <div className="lekki-question-count">
                      <div className="lekki-question-number" style={{ color: GRAY }}>{itemCount}</div>
                      <div>{itemLabel}</div>
                    </div>
                  </div>
                );
              }
              
              const { id, meta } = card;
              const itemCount = getItemCount(id);
              const itemLabel = getItemLabel();
              
              if (itemCount === 0) return null;
              
              return (
                <div 
                  key={id} 
                  onClick={() => handleSubjectClick(id)} 
                  className="subject-card"
                  style={{ '--subject-bg': meta.bg, '--subject-color': meta.color }}
                >
                  <div className="subject-icon" style={{ background: meta.bg }}>{meta.icon}</div>
                  <div className="subject-name">{meta.label}</div>
                  <div className="subject-question-count">{itemCount} {itemLabel}</div>
                  <div className="subject-status" style={{ background: LGRAY, color: GRAY }}>
                    {mode === 'flashcard' ? 'STUDY' : 'READY'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
