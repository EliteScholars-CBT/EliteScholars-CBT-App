import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WAEC_SUBJECTS } from '../data/waec/index';
import { WAEC_LEARN } from '../data/waec/learn/index';
import { NECO_LEARN } from '../data/neco/index';
import { GST_LEARN } from '../data/gst/index';
import { JAMB_LEARN } from '../data/jamb/index';
import { GST_SUBJECTS } from '../data/gst/index';
import { NECO_SUBJECTS } from '../data/neco/index';
import {
  AD_EVERY_NTH_SUBHEADING,
  MAX_ADS_PER_PAGE,
  PUBLISHER_AD_ENABLED,
} from '../utils/constants';
import AdSection from './AdSection';
import { SFX, stopSpeech } from '../utils/sounds';
import BackButton from './BackButton';
import { mapToCharacterVoices, getVoiceForCharacter } from '../utils/voices';
import {
  startStudySession, endStudySession,
  trackTopicOpened, trackLearnQuizComplete, trackTopicComplete,
} from '../analytics/studyAnalytics';

// ============================================================================
// Learn — Card-based learn mode
//
// UX Flow:
//   1. Topic list: cards with progress bar + ✓ badge when complete
//   2. Tap a card → collapsible content view (header shrinks to save space)
//   3. "Take Quiz" button at the bottom of content
//   4. User MUST pass quiz to mark topic complete & unlock "Next"
//   5. Progress stored per-subject in localStorage
// ============================================================================

const FONT_SIZES = [13, 15, 17, 19, 21];
const STORAGE_KEY = (examType, subjectId) => `es_learn_${examType}_${subjectId}`;

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function injectAds(html, adEvery, maxAds, slot) {
  if (!html || adEvery <= 0) return [{ type: 'html', content: html }];
  const parts = html.split(/(?=<h3[\s>])/i);
  const blocks = [];
  let adCount = 0, h3Count = 0;
  parts.forEach((part) => {
    blocks.push({ type: 'html', content: part });
    if (/^<h3/i.test(part)) {
      h3Count++;
      if (h3Count % adEvery === 0 && adCount < maxAds) {
        blocks.push({ type: 'ad', slot: (slot + adCount) % 3 });
        adCount++;
      }
    }
  });
  return blocks;
}

function ContentBlock({ block, refreshTrigger, examType, email }) {
  if (block.type === 'ad')
    return <AdSection slot={block.slot} refreshTrigger={refreshTrigger}
      showPublisher={PUBLISHER_AD_ENABLED} examType={examType} email={email} />;

  let html = block.content;
  if (examType === 'jamb' || examType === 'postutme') {
    html = html.replace(/\bWAEC\b/gi, 'JAMB');
  }
  return <div className="learn-content-html" dangerouslySetInnerHTML={{ __html: html }} />;
}

// ── Circular progress SVG ────────────────────────────────────────────────────
function CircleProgress({ pct = 0, color = '#6C3FC9', size = 36 }) {
  const r = (size / 2) - 4;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(108,63,201,0.12)" strokeWidth={3} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={3}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.5s ease' }} />
    </svg>
  );
}

// ── Topic card ────────────────────────────────────────────────────────────────
function TopicCard({ topic, index, isActive, isDone, isLocked, color, onClick }) {
  return (
    <div
      className={`learn-topic-card ${isDone ? 'done' : ''} ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
      style={{ '--topic-color': color }}
      onClick={!isLocked ? onClick : undefined}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      onKeyDown={(e) => !isLocked && (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-label={`${topic.topic}${isDone ? ' — completed' : ''}${isLocked ? ' — locked' : ''}`}
    >
      <div className="learn-topic-card-left">
        <div className={`learn-topic-num ${isDone ? 'done' : ''}`}
          style={{ background: isDone ? color : undefined, borderColor: isActive ? color : undefined }}>
          {isDone ? '✓' : isLocked ? '🔒' : index + 1}
        </div>
        <div className="learn-topic-card-info">
          <div className="learn-topic-title">{topic.topic}</div>
          <div className="learn-topic-status">
            {isDone ? '✅ Completed' : isActive ? '📖 In progress' : isLocked ? '🔒 Complete previous first' : 'Not started'}
          </div>
        </div>
      </div>
      <div className="learn-topic-card-right">
        {isDone
          ? <div className="learn-topic-done-badge">✓</div>
          : <CircleProgress pct={isActive ? 30 : 0} color={color} />
        }
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Learn({ subjectId, onBack, onTopicComplete, examType = 'waec', email }) {
  // Pick learn bank
  const learnData = examType === 'neco' ? NECO_LEARN
    : examType === 'gst'  ? GST_LEARN
    : (examType === 'jamb' || examType === 'postutme') ? JAMB_LEARN
    : WAEC_LEARN;
  const topics = learnData[subjectId] || [];

  // Subject metadata — check across all banks
  const allSubjects = [
    ...( WAEC_SUBJECTS || []),
    ...( GST_SUBJECTS  || []),
    ...( NECO_SUBJECTS || []),
  ];
  const meta = allSubjects.find((s) => s.id === subjectId) || { label: subjectId, icon: '📖', color: '#6C3FC9', bg: '#F3F0FF' };

  // ── Persistent state ───────────────────────────────────────────────────────
  const storageKey = STORAGE_KEY(examType, subjectId);
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
    catch { return {}; }
  });
  // progress shape: { completedTopics: [0,1,...], lastTopicIdx: 0 }
  const completedTopics = progress.completedTopics || [];
  const lastIdx         = progress.lastTopicIdx ?? null;

  const saveProgress = (newCompleted, newLastIdx) => {
    const p = { completedTopics: newCompleted, lastTopicIdx: newLastIdx };
    setProgress(p);
    try { localStorage.setItem(storageKey, JSON.stringify(p)); } catch {}
  };

  // ── UI state ───────────────────────────────────────────────────────────────
  const [activeIdx, setActiveIdx]         = useState(null);   // null = topic list
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [fontSize, setFontSize]           = useState(1);
  const [characterVoices, setCharVoices]  = useState([]);
  const [selectedCharId, setSelectedCharId] = useState('sophia');
  const [speaking, setSpeaking]           = useState(false);
  const [paused, setPaused]               = useState(false);
  const [adRefresh]                       = useState(0);

  // Quiz state
  const [quizMode, setQuizMode]   = useState(false);
  const [quizQs, setQuizQs]       = useState([]);
  const [quizIdx, setQuizIdx]     = useState(0);
  const [quizSel, setQuizSel]     = useState(-1);
  const [quizAnswered, setAnswered] = useState(false);  // current Q answered
  const [quizResults, setResults] = useState([]);
  const [quizDone, setQuizDone]   = useState(false);    // all Qs done

  const scrollRef = useRef(null);
  const fSize     = FONT_SIZES[fontSize];

  // ── Voice loading ──────────────────────────────────────────────────────────
  useEffect(() => {
    const load = () => {
      const raw = window.speechSynthesis?.getVoices() || [];
      const mapped = mapToCharacterVoices(raw);
      setCharVoices(mapped);
      // Auto-select first available
      const firstAvail = mapped.find(c => c.voice);
      if (firstAvail) setSelectedCharId(firstAvail.id);
    };
    load();
    if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = load;
    return () => stopSpeech();
  }, []);

  // Collapse header on scroll inside topic view
  const handleScroll = () => {
    if (scrollRef.current && activeIdx !== null) {
      setHeaderCollapsed(scrollRef.current.scrollTop > 60);
    }
  };

  // ── TTS ────────────────────────────────────────────────────────────────────
  const speakContent = () => {
    if (activeIdx === null) return;
    const text = stripHtml(topics[activeIdx]?.contentHTML || topics[activeIdx]?.content || '');
    stopSpeech();
    const utter = new SpeechSynthesisUtterance(text);
    const voice = getVoiceForCharacter(selectedCharId, characterVoices);
    if (voice) utter.voice = voice;
    utter.rate  = 0.75;  // slightly below normal for clear comprehension
    utter.pitch = 1.0;
    utter.onend = () => { setSpeaking(false); setPaused(false); };
    window.speechSynthesis.speak(utter);
    setSpeaking(true); setPaused(false);
  };
  const handlePause = () => {
    if (paused) { window.speechSynthesis.resume(); setPaused(false); }
    else { window.speechSynthesis.pause(); setPaused(true); }
  };
  const handleStop = () => { stopSpeech(); setSpeaking(false); setPaused(false); };

  // ── Open a topic ───────────────────────────────────────────────────────────
  const openTopic = (idx) => {
    stopSpeech(); setSpeaking(false);
    // Start study session tracking
    if (idx !== activeIdx) endStudySession(email);
    startStudySession({
      email, name: '', examType, subjectId,
      subjectLabel: meta.label,
      topicName: topics[idx]?.topic || '',
    });
    trackTopicOpened({ email, examType, subjectId, topicName: topics[idx]?.topic, topicIndex: idx });
    setActiveIdx(idx);
    setQuizMode(false);
    setHeaderCollapsed(false);
    saveProgress(completedTopics, idx);
    setTimeout(() => scrollRef.current?.scrollTo(0, 0), 50);
  };

  const closeTopic = () => {
    endStudySession(email);
    stopSpeech(); setSpeaking(false);
    setActiveIdx(null); setHeaderCollapsed(false); setQuizMode(false);
  };

  // ── Start topic quiz ───────────────────────────────────────────────────────
  const startQuiz = useCallback(() => {
    const bankPromise = examType === 'neco' ? import('../data/neco/index').then(m => m.NECO_QB)
      : examType === 'gst'   ? import('../data/gst/index').then(m => m.GST_QB)
      : (examType === 'jamb' || examType === 'postutme') ? import('../data/jamb/index').then(m => m.QB)
      : import('../data/waec/index').then(m => m.WAEC_QB);

    bankPromise.then((bank) => {
      const pool = (bank[subjectId] || []);
      const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(5, pool.length));
      if (!shuffled.length) {
        // No questions — auto-complete topic
        markComplete(activeIdx);
        return;
      }
      setQuizQs(shuffled);
      setQuizIdx(0); setQuizSel(-1);
      setAnswered(false); setResults([]); setQuizDone(false);
      setQuizMode(true);
      setTimeout(() => scrollRef.current?.scrollTo(0, 0), 50);
    });
  }, [subjectId, examType, activeIdx]);

  // ── Quiz answer flow ───────────────────────────────────────────────────────
  const submitAnswer = () => {
    if (quizSel < 0 || quizAnswered) return;
    const q = quizQs[quizIdx];
    const correct = quizSel === q.a;
    if (correct) SFX.correct(); else SFX.wrong();
    setResults((r) => [...r, { q: q.q, options: q.o, sel: quizSel, ans: q.a, correct, exp: q.e }]);
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (quizIdx >= quizQs.length - 1) {
      setQuizDone(true);
    } else {
      setQuizIdx((i) => i + 1);
      setQuizSel(-1);
      setAnswered(false);
    }
  };

  const markComplete = (idx) => {
    SFX.roundComplete();
    const updated = [...new Set([...completedTopics, idx])];
    saveProgress(updated, idx);
    trackTopicComplete({ email, examType, subjectId, topicName: topics[idx]?.topic, topicIndex: idx });
    if (onTopicComplete) onTopicComplete(idx);
    setQuizMode(false);
  };

  const finishQuiz = () => markComplete(activeIdx);

  // Build content blocks for active topic
  const topic          = activeIdx !== null ? topics[activeIdx] : null;
  const contentBlocks  = topic
    ? injectAds(topic.contentHTML || `<p class="learn-p">${topic.content || ''}</p>`, AD_EVERY_NTH_SUBHEADING, MAX_ADS_PER_PAGE, activeIdx)
    : [];

  const overallPct = topics.length ? Math.round((completedTopics.length / topics.length) * 100) : 0;

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER — Topic List (when no active topic)
  // ─────────────────────────────────────────────────────────────────────────
  if (activeIdx === null) {
    return (
      <div className="scr fd learn-page" style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
        {/* Header — full size when showing topic list */}
        <div className="learn-header learn-header-full"
          style={{ background: `linear-gradient(135deg,#1A1A2E,${meta.color || '#6C63FF'})` }}>
          <div className="learn-header-top-row">
            <BackButton onClick={() => { stopSpeech(); onBack(); }} light />
            <div className="learn-font-controls">
              <button className="learn-font-btn" onClick={() => setFontSize((s) => Math.max(0, s - 1))} disabled={fontSize === 0} aria-label="Smaller text">A−</button>
              <button className="learn-font-btn" onClick={() => setFontSize((s) => Math.min(FONT_SIZES.length - 1, s + 1))} disabled={fontSize === FONT_SIZES.length - 1} aria-label="Larger text">A+</button>
            </div>
          </div>
          <div className="learn-header-info">
            <div className="learn-subject-icon" style={{ background: meta.bg }}>{meta.icon}</div>
            <div>
              <div className="learn-subject-name">{meta.label}</div>
              <div className="learn-subject-meta">
                Learn Mode · {topics.length} topics · {completedTopics.length} done
              </div>
            </div>
          </div>
          {/* Overall progress bar */}
          <div className="learn-header-progress-bar">
            <div className="learn-header-progress-fill" style={{ width: `${overallPct}%`, background: '#D4AF37' }} />
          </div>
          <div className="learn-header-progress-label">{overallPct}% complete</div>
        </div>

        {/* Topic cards */}
        <div className="scroll learn-body" style={{ flex: 1, overflowY: 'auto' }}>
          <div className="learn-topic-list">
            {topics.map((t, i) => {
              const isDone   = completedTopics.includes(i);
              // Topic i is locked if topic i-1 is not done (first topic always unlocked)
              const isLocked = i > 0 && !completedTopics.includes(i - 1);
              return (
                <TopicCard
                  key={i}
                  topic={t}
                  index={i}
                  isActive={i === lastIdx}
                  isDone={isDone}
                  isLocked={isLocked}
                  color={meta.color}
                  onClick={() => openTopic(i)}
                />
              );
            })}
            {topics.length === 0 && (
              <div className="learn-empty">📚 Content coming soon for this subject!</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER — Topic Content View
  // ─────────────────────────────────────────────────────────────────────────
  const isDoneNow = completedTopics.includes(activeIdx);
  const quizScore = quizResults.filter((r) => r.correct).length;

  return (
    <div className="scr fd learn-page" style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Collapsible header — shrinks when scrolling */}
      <div className={`learn-header ${headerCollapsed ? 'learn-header-collapsed' : 'learn-header-full'}`}
        style={{ background: `linear-gradient(135deg,#1A1A2E,${meta.color || '#6C63FF'})` }}>
        <div className="learn-header-top-row">
          <BackButton onClick={closeTopic} light label={topics[activeIdx]?.topic || 'Back'} truncate />
          {!headerCollapsed && (
            <div className="learn-font-controls">
              <button className="learn-font-btn" onClick={() => setFontSize((s) => Math.max(0, s - 1))} disabled={fontSize === 0}>A−</button>
              <button className="learn-font-btn" onClick={() => setFontSize((s) => Math.min(FONT_SIZES.length - 1, s + 1))} disabled={fontSize === FONT_SIZES.length - 1}>A+</button>
            </div>
          )}
        </div>

        {!headerCollapsed && (
          <>
            <div className="learn-header-info" style={{ paddingTop: 6 }}>
              <div className="learn-subject-icon" style={{ background: meta.bg, width: 32, height: 32, fontSize: 16 }}>{meta.icon}</div>
              <div>
                <div className="learn-subject-name" style={{ fontSize: 14 }}>{meta.label}</div>
                <div className="learn-subject-meta">Topic {activeIdx + 1} of {topics.length}{isDoneNow ? ' · ✅ Completed' : ''}</div>
              </div>
            </div>
            {/* TTS bar in header */}
            <div className="learn-tts-bar learn-tts-compact">
              <select className="learn-voice-select" value={selectedCharId}
                onChange={(e) => setSelectedCharId(e.target.value)} aria-label="Select voice">
                {characterVoices.filter(c => c.voice).map((c) => (
                  <option key={c.id} value={c.id}>{c.name} ({c.gender === 'female' ? '♀' : '♂'})</option>
                ))}
              </select>
              {!speaking
                ? <button className="learn-tts-btn" onClick={speakContent}>▶ Read</button>
                : <>
                  <button className="learn-tts-btn" onClick={handlePause}>{paused ? '▶' : '⏸'}</button>
                  <button className="learn-tts-btn learn-tts-stop" onClick={handleStop}>⏹</button>
                </>
              }
            </div>
          </>
        )}
      </div>

      {/* ── Quiz mode ─────────────────────────────────────────────────────── */}
      {quizMode ? (
        <div className="scroll learn-quiz-overlay" ref={scrollRef} style={{ flex: 1, overflowY: 'auto' }}>
          <div className="learn-quiz-header">
            <button className="learn-quiz-back-btn" onClick={() => setQuizMode(false)}>← Back to content</button>
            <span className="learn-quiz-progress">
              {quizDone ? 'Complete!' : `Q ${quizIdx + 1}/${quizQs.length}`}
            </span>
          </div>

          {!quizDone && quizQs[quizIdx] && (
            <div className="learn-quiz-card">
              {/* Progress dots */}
              <div className="learn-quiz-dots">
                {quizQs.map((_, i) => (
                  <div key={i} className={`learn-quiz-dot ${i < quizIdx ? 'done' : i === quizIdx ? 'active' : ''}`} />
                ))}
              </div>

              <div className="learn-quiz-q">{quizQs[quizIdx].q}</div>
              <div className="learn-quiz-options">
                {quizQs[quizIdx].o.map((opt, i) => {
                  let cls = 'learn-quiz-opt';
                  if (quizAnswered) {
                    if (i === quizQs[quizIdx].a) cls += ' correct';
                    else if (i === quizSel && quizSel !== quizQs[quizIdx].a) cls += ' wrong';
                  } else if (i === quizSel) cls += ' selected';
                  return (
                    <button key={i} className={cls}
                      onClick={() => !quizAnswered && setQuizSel(i)}
                      disabled={quizAnswered}>
                      <span className="learn-quiz-opt-letter">{['A','B','C','D'][i]}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {!quizAnswered
                ? <button className="learn-quiz-submit" onClick={submitAnswer}
                    disabled={quizSel < 0} style={{ background: meta.color }}>
                    Submit Answer →
                  </button>
                : <div className="learn-quiz-explanation">
                    <div className={`learn-quiz-result ${quizSel === quizQs[quizIdx].a ? 'correct' : 'wrong'}`}>
                      {quizSel === quizQs[quizIdx].a ? '✅ Correct!' : '❌ Incorrect'}
                    </div>
                    <div className="learn-quiz-exp-text">💡 {quizQs[quizIdx].e}</div>
                    <button className="learn-quiz-next" onClick={nextQuestion} style={{ background: meta.color }}>
                      {quizIdx >= quizQs.length - 1 ? '🏁 See Results' : 'Next Question →'}
                    </button>
                  </div>
              }
            </div>
          )}

          {/* Results screen */}
          {quizDone && (
            <div className="learn-quiz-results">
              <div className="learn-quiz-results-score" style={{ color: meta.color }}>
                {quizScore}/{quizQs.length}
              </div>
              <div className="learn-quiz-results-label">
                {quizScore === quizQs.length ? '🎉 Perfect score!' : quizScore >= quizQs.length * 0.6 ? '👍 Well done!' : '📚 Keep studying!'}
              </div>
              <div className="learn-quiz-results-list">
                {quizResults.map((r, i) => (
                  <div key={i} className={`learn-quiz-result-row ${r.correct ? 'correct' : 'wrong'}`}>
                    <span>{i + 1}. {r.q?.slice(0, 55)}{r.q?.length > 55 ? '…' : ''}</span>
                    <span>{r.correct ? '✅' : '❌'}</span>
                  </div>
                ))}
              </div>
              <button className="learn-quiz-finish-btn" onClick={finishQuiz}
                style={{ background: meta.color }}>
                ✅ Mark Topic Complete →
              </button>
              {quizScore < quizQs.length * 0.6 && (
                <button className="learn-quiz-retry-btn" onClick={startQuiz}>
                  🔄 Retry Quiz
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        // ── Content view ────────────────────────────────────────────────────
        <div className="scroll" ref={scrollRef} onScroll={handleScroll}
          style={{ flex: 1, overflowY: 'auto', padding: '0 0 24px' }}>
          <div style={{ padding: '12px 16px 0', fontSize: fSize }}>
            {contentBlocks.map((block, bi) => (
              <ContentBlock key={bi} block={block} refreshTrigger={adRefresh}
                examType={examType} email={email} />
            ))}
          </div>

          {/* Bottom action bar */}
          <div className="learn-content-footer">
            {isDoneNow
              ? <div className="learn-completed-badge">✅ Topic Completed</div>
              : <button className="learn-quiz-trigger-full" onClick={startQuiz}
                  style={{ background: meta.color }}>
                  📝 Take Quiz to Complete This Topic
                </button>
            }
            <div className="learn-content-nav">
              <button className="learn-nav-btn"
                onClick={() => openTopic(Math.max(0, activeIdx - 1))}
                disabled={activeIdx === 0}>
                ← Prev
              </button>
              <button className="learn-nav-btn learn-nav-next"
                onClick={() => openTopic(Math.min(topics.length - 1, activeIdx + 1))}
                disabled={activeIdx === topics.length - 1 || !isDoneNow}
                style={isDoneNow ? { borderColor: meta.color, color: meta.color } : {}}>
                {isDoneNow ? 'Next →' : '🔒 Next'}
              </button>
            </div>
            <p className="learn-keyboard-hint">⌨️ Arrow keys to navigate · Complete quiz to unlock next topic</p>
          </div>
        </div>
      )}
    </div>
  );
}
