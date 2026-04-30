import React, { useState } from 'react';
import { QB } from '../data/jamb';
import { POST_UTME } from '../data/postutme';
import { WAEC_SUBJECTS, WAEC_QB } from '../data/waec/index';
import { NECO_SUBJECTS, NECO_QB } from '../data/neco/index';
import { GST_SUBJECTS, GST_QB } from '../data/gst/index';
import { getFlashcardsForSubject } from '../data/flashcards';
import { SUBJ } from '../data/subjects';
import { LGRAY, GRAY } from '../utils/colors';
import { SFX } from '../utils/sounds';
import { useTheme } from '../context/ThemeContext';

// ============================================================================
// Subjects — unified subject picker for ALL exam types
// Replaces WaecSubjects. Inline CBT | Learn | Flashcards | Game toggle.
// ============================================================================

const MODES = [
  { id: 'cbt',       label: '📝 CBT'   },
  { id: 'learn',     label: '📖 Learn' },
  { id: 'flashcard', label: '🃏 Flash' },
  { id: 'game',      label: '🎮 Game'  },
];

const MODE_DESC = {
  cbt:       'Practice past questions',
  learn:     'Study notes & key concepts',
  flashcard: 'Quick card revision',
  game:      'Play & earn XP',
};

// Exam types that use the grid layout (WAEC, NECO, GST)
const GRID_EXAMS = ['waec', 'neco', 'gst'];

export default function Subjects({
  name,
  examType   = 'jamb',
  university = null,
  email      = '',
  premiumUser = false,
  refreshTrigger,
  // callbacks from App.js
  onStartCBT,       // (subjectId) → start quiz
  onStartLearn,     // (subjectId) → open learn screen
  onStartFlashcard, // (subjectId) → open flashcards
  onStartGame,      // () → open game mode
  onProfile,
  onBack,
}) {
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState('cbt');

  // ── Subject metadata & QB for current exam type ───────────────────────────
  const getSubjectsAndQB = () => {
    switch (examType) {
      case 'waec': return { subjects: WAEC_SUBJECTS, qb: WAEC_QB };
      case 'neco': return { subjects: NECO_SUBJECTS, qb: NECO_QB };
      case 'gst':  return { subjects: GST_SUBJECTS,  qb: GST_QB  };
      default:     return { subjects: null, qb: null };
    }
  };

  const { subjects: gridSubjects, qb: gridQB } = getSubjectsAndQB();
  const isGridExam = GRID_EXAMS.includes(examType);

  // ── Helpers for JAMB / POST UTME ─────────────────────────────────────────
  const hasQuestions = (subjectId) => {
    if (examType === 'postutme' && university) {
      const uniData = POST_UTME[university?.toUpperCase()];
      return !!(uniData?.[subjectId]?.length);
    }
    return (QB[subjectId] || []).length > 0;
  };

  const getJambCount = (subjectId) => {
    if (mode === 'flashcard') return getFlashcardsForSubject(subjectId).length;
    if (examType === 'postutme' && university) {
      return POST_UTME[university?.toUpperCase()]?.[subjectId]?.length || 0;
    }
    return (QB[subjectId] || []).length;
  };

  // ── Header label ──────────────────────────────────────────────────────────
  const examLabel = {
    jamb:     'JAMB',
    postutme: university ? `${university.toUpperCase()} POST UTME` : 'POST UTME',
    waec:     'WAEC',
    neco:     'NECO',
    gst:      'GST',
  }[examType] || 'Subjects';

  // ── Mode switch ───────────────────────────────────────────────────────────
  const handleModeSwitch = (m) => {
    SFX.select?.();
    if (m === 'game') { onStartGame?.(); return; }
    setMode(m);
  };

  // ── Subject click ─────────────────────────────────────────────────────────
  const handleSubjectClick = (subjectId) => {
    SFX.select?.(); SFX.submit?.();
    if (mode === 'learn')     { onStartLearn?.(subjectId);     return; }
    if (mode === 'flashcard') { onStartFlashcard?.(subjectId); return; }
    onStartCBT?.(subjectId);
  };

  // ── JAMB / POST UTME card grid builder ────────────────────────────────────
  const buildJambGrid = () => {
    const subs = Object.entries(SUBJ)
      .filter(([id]) => id !== 'novel')
      .filter(([id]) => hasQuestions(id));
    const hasNovel = hasQuestions('novel');
    if (!subs.length && !hasNovel) return [];
    const cards = subs.map(([id, meta]) => ({ id, meta, isLekki: false }));
    if (!hasNovel) return cards;
    const lekkiCard = { id: '__lekki__', isLekki: true };
    const result = [];
    for (let i = 0; i < cards.length; i++) {
      if (i === 2) result.push(lekkiCard);
      result.push(cards[i]);
    }
    if (!result.some(c => c.isLekki)) result.push(lekkiCard);
    return result;
  };

  // ── Availability guards ───────────────────────────────────────────────────
  const flashUnavailable = mode === 'flashcard' && (examType === 'postutme' || isGridExam);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="scr fd subjects-wrapper">

      {/* ── Header ── */}
      <div className="subjects-header">
        <div className="subjects-header-curve" />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="subjects-welcome-label">{examLabel}</div>
            <div className="subjects-welcome-name">{name || 'Student'} 👋</div>
            <div className="subjects-welcome-text">{MODE_DESC[mode]}</div>
          </div>
          <div className="settings-group">
            {onBack ? (
              <button className="settings-group-btn theme-btn" onClick={onBack}>
                <span className="settings-group-icon">←</span>
                <span className="settings-group-text">Back</span>
              </button>
            ) : (
              <button className="settings-group-btn profile-btn" onClick={onProfile}>
                <span className="settings-group-icon">👤</span>
                <span className="settings-group-text">Profile</span>
              </button>
            )}
            <button className="settings-group-btn theme-btn" onClick={toggleTheme}>
              <span className="settings-group-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
              <span className="settings-group-text">{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mode toggle ── */}
      <div className="subjects-mode-toggle-wrap">
        <div className="subjects-mode-toggle">
          {MODES.map(m => (
            <button
              key={m.id}
              className={`subjects-mode-btn ${mode === m.id ? 'active' : ''}`}
              onClick={() => handleModeSwitch(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="scroll subjects-body">

        {/* Flashcard unavailable for non-JAMB */}
        {flashUnavailable ? (
          <div className="subjects-empty-state">
            <div className="subjects-empty-icon">📚</div>
            <div className="subjects-empty-title">Flashcards Coming Soon</div>
            <div className="subjects-empty-sub">
              Flashcards are currently only available for JAMB. Check back later!
            </div>
            <button className="subjects-empty-btn" onClick={() => setMode('cbt')}>
              Switch to CBT
            </button>
          </div>

        /* ── WAEC / NECO / GST — grid layout ── */
        ) : isGridExam ? (
          <div className="subjects-grid">
            {(gridSubjects || []).map(subj => {
              const qCount = (gridQB?.[subj.id] || []).length;
              return (
                <div
                  key={subj.id}
                  className="subjects-grid-card"
                  style={{ '--subject-color': subj.color, '--subject-bg': subj.bg }}
                  onClick={() => handleSubjectClick(subj.id)}
                >
                  <div className="subjects-grid-icon" style={{ background: subj.bg }}>
                    {subj.icon}
                  </div>
                  <div className="subjects-grid-label">{subj.label}</div>
                  <div className="subjects-grid-meta">
                    {mode === 'learn'
                      ? 'Study notes'
                      : qCount > 0 ? `${qCount} questions` : 'Coming soon'}
                  </div>
                  <div
                    className="subjects-grid-badge"
                    style={{ background: subj.bg, color: subj.color }}
                  >
                    {mode === 'learn' ? 'STUDY' : 'READY'}
                  </div>
                </div>
              );
            })}
          </div>

        /* ── JAMB / POST UTME — list layout ── */
        ) : (() => {
          const allCards = buildJambGrid();
          if (!allCards.length) {
            return (
              <div className="subjects-empty-state">
                <div className="subjects-empty-icon">📭</div>
                <div className="subjects-empty-title">No Questions Available Yet</div>
                <div className="subjects-empty-sub">
                  {examType === 'postutme' && university
                    ? `We're adding questions for ${university.toUpperCase()}. Check back soon!`
                    : 'More questions are being added. Please check back later!'}
                </div>
                <button className="subjects-empty-btn" onClick={onProfile}>
                  Go to Profile
                </button>
              </div>
            );
          }
          return (
            <div className="subjects-card-container">
              {allCards.map(card => {
                if (card.isLekki) {
                  const count = getJambCount('novel');
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
                        <div className="lekki-badge" style={{ background: LGRAY, color: GRAY }}>
                          NOVEL
                        </div>
                      </div>
                      <div className="lekki-question-count">
                        <div className="lekki-question-number" style={{ color: GRAY }}>{count}</div>
                        <div>{mode === 'flashcard' ? 'cards' : 'questions'}</div>
                      </div>
                    </div>
                  );
                }

                const { id, meta } = card;
                const count = getJambCount(id);
                if (count === 0) return null;

                return (
                  <div
                    key={id}
                    onClick={() => handleSubjectClick(id)}
                    className="subject-card"
                    style={{ '--subject-bg': meta.bg, '--subject-color': meta.color }}
                  >
                    <div className="subject-icon" style={{ background: meta.bg }}>{meta.icon}</div>
                    <div className="subject-name">{meta.label}</div>
                    <div className="subject-question-count">
                      {count} {mode === 'flashcard' ? 'cards' : 'questions'}
                    </div>
                    <div className="subject-status" style={{ background: LGRAY, color: GRAY }}>
                      {mode === 'learn' ? 'STUDY' : mode === 'flashcard' ? 'REVIEW' : 'READY'}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

      </div>
    </div>
  );
}