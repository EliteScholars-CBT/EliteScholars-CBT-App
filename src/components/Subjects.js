import React, { useState, useEffect } from 'react';
import { QB, JAMB_LEARN } from '../data/jamb';
import { POST_UTME, POSTUTME_LEARN } from '../data/postutme';
import { WAEC_SUBJECTS, WAEC_QB, WAEC_LEARN } from '../data/waec/index';
import { NECO_SUBJECTS, NECO_QB, NECO_LEARN } from '../data/neco/index';
import { GST_SUBJECTS, GST_QB, GST_LEARN } from '../data/gst/index';
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
  { id: 'learn', label: 'Learn' },
  { id: 'cbt', label: 'CBT' },
  // { id: 'flashcard', label: 'Flash' },
  // { id: 'game', label: 'Game' },
];

const MODE_DESC = {
  cbt: 'Practice past questions',
  learn: 'Study notes & key concepts',
  flashcard: 'Quick card revision',
  game: 'Play & earn XP',
};

// Exam types that use the grid layout (WAEC, NECO, GST)
const GRID_EXAMS = ['waec', 'neco', 'gst'];

// ── Count total available questions for a subject ───────────────────────────
// = question bank count + questions embedded inside Learn topics (deduped by
// question text, same logic Quiz.js uses when merging). This is for DISPLAY
// only — it doesn't extract/build the actual question arrays.
function countTotalQuestions(qbArr = [], learnTopics = []) {
  const qbSet = new Set(qbArr.map((q) => q.q));
  let total = qbArr.length;

  learnTopics.forEach((topic) => {
    (topic.questions || []).forEach((q) => {
      if (!qbSet.has(q.q)) {
        qbSet.add(q.q); // also avoid double-counting duplicates across topics
        total++;
      }
    });
  });

  return total;
}

export default function Subjects({
  name,
  examType = 'jamb',
  university = null,
  email = '',
  premiumUser = false,
  refreshTrigger,

  // callbacks from App.js
  onStartCBT,
  onStartLearn,
  onStartFlashcard,
  onStartGame,
  onProfile,
  onBack,
}) {
  const { theme, toggleTheme } = useTheme();

  // persistent learning mode
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('learningMode') || 'cbt';
  });

  // persist mode whenever it changes
  useEffect(() => {
    localStorage.setItem('learningMode', mode);
  }, [mode]);

  // ── Subject metadata, QB, and learn bank for current exam type ────────────
  const getSubjectsAndQB = () => {
    switch (examType) {
      case 'waec':
        return { subjects: WAEC_SUBJECTS, qb: WAEC_QB, learn: WAEC_LEARN };

      case 'neco':
        // Use NECO_SUBJECTS (subjects NECO actually supports)
        // not WAEC_SUBJECTS which would show subjects with no NECO QB
        return { subjects: NECO_SUBJECTS, qb: NECO_QB, learn: NECO_LEARN };

      case 'jamb':
        return { subjects: WAEC_SUBJECTS, qb: QB, learn: JAMB_LEARN };

      case 'postutme':
        return { subjects: WAEC_SUBJECTS, qb: POST_UTME, learn: POSTUTME_LEARN };

      case 'gst':
        return { subjects: GST_SUBJECTS, qb: GST_QB, learn: GST_LEARN };

      default:
        return { subjects: null, qb: null, learn: null };
    }
  };

  const { subjects: gridSubjects, qb: gridQB, learn: gridLearn } = getSubjectsAndQB();

  const isGridExam = GRID_EXAMS.includes(examType);

  // ── Helpers for JAMB / POST UTME ─────────────────────────────────────────
  // Falls back to WAEC_QB for subjects JAMB doesn't have its own questions for
  // (e.g. newly added subjects shared from WAEC). This is what makes those
  // subjects appear for JAMB students once WAEC content is uploaded.
  const getQuestionPool = (subjectId) => {
    const jambPool = QB[subjectId] || [];
    if (jambPool.length > 0) return jambPool;
    return WAEC_QB[subjectId] || [];
  };

  // Total displayable count for a JAMB/POST UTME subject:
  // QB (with WAEC fallback) + topic-embedded questions from JAMB_LEARN
  const getJambTotalCount = (subjectId) => {
    const qbArr = getQuestionPool(subjectId);
    const learnTopics = JAMB_LEARN[subjectId] || [];
    return countTotalQuestions(qbArr, learnTopics);
  };

  // Whether a subject has any Learn topics at all (used for Learn mode visibility)
  const hasLearnContent = (subjectId) => {
    if (examType === 'postutme') {
      return (POSTUTME_LEARN[subjectId] || []).length > 0;
    }
    return (JAMB_LEARN[subjectId] || []).length > 0;
  };

  const hasQuestions = (subjectId) => {
    if (examType === 'postutme' && university) {
      const uniData = POST_UTME[university?.toUpperCase()];
      const uniCount = uniData?.[subjectId]?.length || 0;
      const learnTopics = POSTUTME_LEARN[subjectId] || [];
      return countTotalQuestions(Array(uniCount).fill({ q: '' }), learnTopics) > 0;
    }

    return getJambTotalCount(subjectId) > 0;
  };

  const getJambCount = (subjectId) => {
    if (mode === 'flashcard') {
      return getFlashcardsForSubject(subjectId).length;
    }

    if (examType === 'postutme' && university) {
      const uniCount = POST_UTME[university?.toUpperCase()]?.[subjectId]?.length || 0;
      const learnTopics = POSTUTME_LEARN[subjectId] || [];
      return countTotalQuestions(Array(uniCount).fill({ q: '' }), learnTopics);
    }

    return getJambTotalCount(subjectId);
  };

  // ── Header label ──────────────────────────────────────────────────────────
  const examLabel =
    {
      jamb: 'JAMB',
      postutme: university ? `${university.toUpperCase()} POST UTME` : 'POST UTME',
      waec: 'WAEC',
      neco: 'NECO',
      gst: 'GST',
    }[examType] || 'Subjects';

  // ── Mode switch ───────────────────────────────────────────────────────────
  const handleModeSwitch = (m) => {
    SFX.select?.();

    if (m === 'game') {
      onStartGame?.();
      return;
    }

    setMode(m);
  };

  // ── Subject click ─────────────────────────────────────────────────────────
  const handleSubjectClick = (subjectId) => {
    SFX.select?.();
    SFX.submit?.();

    if (mode === 'learn') {
      onStartLearn?.(subjectId);
      return;
    }

    if (mode === 'flashcard') {
      onStartFlashcard?.(subjectId);
      return;
    }

    onStartCBT?.(subjectId);
  };

  // ── JAMB / POST UTME card grid builder ───────────────────────────────────
  const buildJambGrid = () => {
    // In Learn mode, show subjects that have study notes (regardless of
    // question count). In CBT/Flashcard mode, show subjects that have
    // practice questions/cards.
    const subs = Object.entries(SUBJ)
      .filter(([id]) => id !== 'novel')
      .filter(([id]) => (mode === 'learn' ? hasLearnContent(id) : hasQuestions(id)));

    // The Lekki Headmaster novel has no study notes — never show it in Learn mode
    const hasNovel = mode === 'learn' ? false : hasQuestions('novel');

    if (!subs.length && !hasNovel) return [];

    const cards = subs.map(([id, meta]) => ({
      id,
      meta,
      isLekki: false,
    }));

    if (!hasNovel) return cards;

    const lekkiCard = {
      id: '__lekki__',
      isLekki: true,
    };

    const result = [];

    for (let i = 0; i < cards.length; i++) {
      if (i === 2) {
        result.push(lekkiCard);
      }

      result.push(cards[i]);
    }

    if (!result.some((c) => c.isLekki)) {
      result.push(lekkiCard);
    }

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

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div className="subjects-welcome-label">{examLabel}</div>

            <div className="subjects-welcome-name">Hi {name || 'Student'} 👋</div>

            <div className="subjects-welcome-text">{MODE_DESC[mode]}</div>
          </div>

          <div className="settings-group">
            {onBack && (
              <button className="settings-group-btn theme-btn" onClick={onBack}>
                <span className="settings-group-icon">←</span>
                <span className="settings-group-text">Back</span>
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
          {MODES.map((m) => (
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
        {/* Flashcard unavailable */}
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
        ) : isGridExam ? (
          /* ── WAEC / NECO / GST ── */
          <div className="subjects-grid">
            {(gridSubjects || []).map((subj) => {
              const qCount = countTotalQuestions(
                gridQB?.[subj.id] || [],
                gridLearn?.[subj.id] || []
              );

              return (
                <div
                  key={subj.id}
                  className="subjects-grid-card"
                  style={{
                    '--subject-color': subj.color,
                    '--subject-bg': subj.bg,
                  }}
                  onClick={() => handleSubjectClick(subj.id)}
                >
                  <div className="subjects-grid-icon" style={{ background: subj.bg }}>
                    {subj.icon}
                  </div>

                  <div className="subjects-grid-label">{subj.label}</div>

                  <div className="subjects-grid-meta">
                    {mode === 'learn'
                      ? 'Study notes'
                      : qCount > 0
                        ? `${qCount} questions`
                        : 'Coming soon'}
                  </div>

                  <div
                    className="subjects-grid-badge"
                    style={{
                      background: subj.bg,
                      color: subj.color,
                    }}
                  >
                    {mode === 'learn' ? 'STUDY' : 'READY'}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          (() => {
            /* ── JAMB / POST UTME ── */

            const allCards = buildJambGrid();

            if (!allCards.length) {
              return (
                <div className="subjects-empty-state">
                  <div className="subjects-empty-icon">📭</div>

                  <div className="subjects-empty-title">
                    {mode === 'learn'
                      ? 'No Study Notes Available Yet'
                      : 'No Questions Available Yet'}
                  </div>

                  <div className="subjects-empty-sub">
                    {examType === 'postutme' && university
                      ? `We're adding ${mode === 'learn' ? 'study notes' : 'questions'} for ${university.toUpperCase()}. Check back soon!`
                      : `More ${mode === 'learn' ? 'study notes' : 'questions'} are being added. Please check back later!`}
                  </div>

                  <button className="subjects-empty-btn" onClick={onProfile}>
                    Go to Profile
                  </button>
                </div>
              );
            }

            return (
              <div className="subjects-card-container">
                {allCards.map((card) => {
                  if (card.isLekki) {
                    const count = getJambCount('novel');

                    return (
                      <div
                        key="lekki"
                        onClick={() => handleSubjectClick('novel')}
                        className="lekki-card"
                      >
                        <div className="lekki-icon" style={{ background: '#FCE7F3' }}>
                          📗
                        </div>

                        <div style={{ flex: 1 }}>
                          <div className="lekki-title">The Lekki Headmaster</div>

                          <div className="lekki-author">Kabir Alabi Garba · Literature</div>

                          <div
                            className="lekki-badge"
                            style={{
                              background: LGRAY,
                              color: GRAY,
                            }}
                          >
                            NOVEL
                          </div>
                        </div>

                        <div className="lekki-question-count">
                          <div className="lekki-question-number" style={{ color: GRAY }}>
                            {count}
                          </div>

                          <div>{mode === 'flashcard' ? 'cards' : 'questions'}</div>
                        </div>
                      </div>
                    );
                  }

                  const { id, meta } = card;

                  const count = getJambCount(id);

                  // In CBT/Flashcard mode, hide subjects with zero questions/cards.
                  // In Learn mode, the card is shown as long as it has study notes,
                  // regardless of question count.
                  if (mode !== 'learn' && count === 0) return null;

                  return (
                    <div
                      key={id}
                      onClick={() => handleSubjectClick(id)}
                      className="subject-card"
                      style={{
                        '--subject-bg': meta.bg,
                        '--subject-color': meta.color,
                      }}
                    >
                      <div className="subject-icon" style={{ background: meta.bg }}>
                        {meta.icon}
                      </div>

                      <div className="subject-name">{meta.label}</div>

                      <div className="subject-question-count">
                        {mode === 'learn'
                          ? 'Study notes'
                          : `${count} ${mode === 'flashcard' ? 'cards' : 'questions'}`}
                      </div>

                      <div
                        className="subject-status"
                        style={{
                          background: LGRAY,
                          color: GRAY,
                        }}
                      >
                        {mode === 'learn' ? 'STUDY' : mode === 'flashcard' ? 'REVIEW' : 'READY'}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
