import React, { useState } from 'react';
import AdsterraBanner from '../AdsterraBanner';
import { QB } from '../QB';
import { POST_UTME, getPostUtmeQuestions } from '../data/postutme';
import { getFlashcardsForSubject, getPostUtmeFlashcardsForSubject } from '../data/flashcards';
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
  const [sel, setSel] = useState();
  const { theme, toggleTheme } = useTheme();

  // Helper: Check if a subject has questions available for current exam type
  const hasQuestions = (subjectId) => {
    if (examType === 'postutme' && university) {
      // POST UTME - check university's question bank
      const uniData = POST_UTME[university?.toUpperCase()];
      if (uniData && uniData[subjectId]) {
        return uniData[subjectId].length > 0;
      }
      return false;
    } else {
      // JAMB - check QB
      if (subjectId === 'novel') {
        return (QB.novel || []).length > 0;
      }
      return (QB[subjectId] || []).length > 0;
    }
  };

  // Get count based on mode and exam type
  const getItemCount = (subjectId) => {
    if (mode === 'flashcard') {
      // FLASHCARD MODE
      if (examType === 'postutme' && university) {
        // POST UTME Flashcards
        const flashcards = getPostUtmeFlashcardsForSubject(university, subjectId);
        return flashcards.length;
      } else {
        // JAMB Flashcards
        if (subjectId === 'novel') {
          return getFlashcardsForSubject('novel').length;
        }
        return getFlashcardsForSubject(subjectId).length;
      }
    } else {
      // CBT MODE
      if (examType === 'postutme' && university) {
        // POST UTME CBT Questions
        const questions = getPostUtmeQuestions(university, subjectId);
        return questions.length;
      } else {
        // JAMB CBT Questions
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

  // Filter subjects that actually have questions
  const getAvailableSubjects = () => {
    const allSubjects = Object.entries(SUBJ).filter(([id]) => id !== 'novel');
    return allSubjects.filter(([id]) => hasQuestions(id));
  };

  // Build the grid layout with Lekki card only if it has questions
  const buildSubjectGrid = () => {
    const availableSubjects = getAvailableSubjects();
    const hasNovelQuestions = hasQuestions('novel');
    
    // If no subjects available, show empty state
    if (availableSubjects.length === 0 && !hasNovelQuestions) {
      return [];
    }
    
    const subjectCards = availableSubjects.map(([id, meta]) => ({ id, meta, type: 'subject' }));
    
    if (!hasNovelQuestions) {
      return subjectCards;
    }
    
    // Insert Lekki card at position 2 (after first 2 subjects) if novel has questions
    const lekkiCard = { id: '__lekki__', isLekki: true, type: 'lekki' };
    const result = [];
    
    for (let i = 0; i < subjectCards.length; i++) {
      if (i === 2) {
        result.push(lekkiCard);
      }
      result.push(subjectCards[i]);
    }
    
    // If we never inserted Lekki (less than 2 subjects), add at the end
    if (!result.some(card => card.isLekki) && hasNovelQuestions) {
      result.push(lekkiCard);
    }
    
    return result;
  };

  const allCards = buildSubjectGrid();
  const hasAnyQuestions = allCards.length > 0;

  // Get header text based on exam type
  const getHeaderText = () => {
    if (examType === 'postutme' && university) {
      const uniName = university.toUpperCase();
      return `${uniName} - ${mode === 'flashcard' ? 'Flashcards' : 'CBT Practice'}`;
    }
    return mode === 'flashcard' ? 'Pick a subject to study flashcards' : 'Pick a subject to practise today';
  };

  // Get welcome text based on exam type
  const getWelcomeText = () => {
    if (examType === 'postutme' && university) {
      const uniNames = {
        unilag: 'UNILAG', lasu: 'LASU', unn: 'UNN', uniben: 'UNIBEN',
        abu: 'ABU', buk: 'BUK', funaab: 'FUNAAB', lautech: 'LAUTECH',
        unical: 'UNICAL', unilorin: 'UNILORIN', uniuyo: 'UNIUYO'
      };
      return `Practising ${uniNames[university] || university.toUpperCase()} POST UTME`;
    }
    return mode === 'flashcard' ? 'Flashcard Study Mode' : 'CBT Practice Mode';
  };

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
            <div className="subjects-welcome-text">{getWelcomeText()}</div>
            <div className="subjects-welcome-subtext">{getHeaderText()}</div>
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
                const isSelL = sel === '__lekki__';
                const itemCount = getItemCount('novel');
                const itemLabel = getItemLabel();
                
                return (
                  <div 
                    key="lekki" 
                    onClick={() => { SFX.select(); setSel('__lekki__'); }} 
                    className={`lekki-card ${isSelL ? 'lekki-card-selected' : 'lekki-card-unselected'}`}
                  >
                    <div className="lekki-icon" style={{ background: isSelL ? '#831843' : '#FCE7F3' }}>📗</div>
                    <div style={{ flex: 1 }}>
                      <div className="lekki-title">The Lekki Headmaster</div>
                      <div className="lekki-author">Kabir Alabi Garba · Literature</div>
                      <div className="lekki-badge" style={{ background: isSelL ? '#831843' : LGRAY, color: isSelL ? WHITE : GRAY }}>NOVEL</div>
                    </div>
                    <div className="lekki-question-count">
                      <div className="lekki-question-number" style={{ color: isSelL ? '#831843' : GRAY }}>{itemCount}</div>
                      <div>{itemLabel}</div>
                    </div>
                  </div>
                );
              }
              
              const { id, meta } = card;
              const isSel = sel === id;
              const itemCount = getItemCount(id);
              const itemLabel = getItemLabel();
              
              // Don't show subjects with 0 questions
              if (itemCount === 0) return null;
              
              return (
                <div 
                  key={id} 
                  onClick={() => { SFX.select(); setSel(id); }} 
                  className={`subject-card ${isSel ? 'subject-card-selected' : 'subject-card-unselected'}`} 
                  style={{ '--subject-bg': meta.bg, '--subject-color': meta.color }}
                >
                  <div className="subject-icon" style={{ background: isSel ? meta.color : meta.bg }}>{meta.icon}</div>
                  <div className="subject-name">{meta.label}</div>
                  <div className="subject-question-count">{itemCount} {itemLabel}</div>
                  <div className="subject-status" style={{ background: isSel ? meta.color : LGRAY, color: isSel ? WHITE : GRAY }}>
                    {mode === 'flashcard' ? 'STUDY' : 'READY'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="start-button-container">
        <button 
          onClick={() => { 
            if (!sel) return;
            SFX.submit(); 
            const subjectId = sel === '__lekki__' ? 'novel' : sel;
            onStart(subjectId); 
          }} 
          className={`start-button ${sel ? 'start-button-active' : 'start-button-inactive'}`}
          disabled={!sel}
        >
          {mode === 'flashcard' 
            ? '📖 Start Flashcards →' 
            : (sel === '__lekki__' ? '📗' : SUBJ[sel]?.icon || '📚') + ' Start ' + (sel === '__lekki__' ? 'Lekki Headmaster' : SUBJ[sel]?.label || 'a subject') + ' →'
          }
        </button>
      </div>
    </div>
  );
}
