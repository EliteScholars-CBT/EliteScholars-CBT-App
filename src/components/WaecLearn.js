import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WAEC_LEARN, WAEC_SUBJECTS } from '../data/waec';
import {
  AD_EVERY_NTH_SUBHEADING,
  MAX_ADS_PER_PAGE,
  PUBLISHER_AD_ENABLED,
} from '../utils/constants';
import AdSection from './AdSection';
import { SFX, speak, stopSpeech } from '../utils/sounds';

// ============================================================================
// WaecLearn — Rich HTML learn mode with:
//  - Accordion topic list
//  - Rich HTML content rendering (tables, SVGs, keywords, formulas)
//  - TTS with voice selection, pause/stop, font size control
//  - In-content ad slots (publisher + affiliate, constrained)
//  - End-of-topic quiz (5 questions from WAEC_QB)
//  - Topic completion tracking
//  - Keyboard navigation
// ============================================================================

const FONT_SIZES = [13, 15, 17, 19, 21];

// Strip HTML tags for TTS
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Inject ad slots between subheadings in HTML content
function injectAds(html, adEvery, maxAds, slot) {
  if (!html || adEvery <= 0) return [{ type: 'html', content: html }];

  // Split on h3 tags
  const parts = html.split(/(?=<h3\s)/i);
  const blocks = [];
  let adCount = 0;
  let h3Count = 0;

  parts.forEach((part, i) => {
    blocks.push({ type: 'html', content: part });
    if (part.match(/^<h3/i)) {
      h3Count++;
      if (h3Count % adEvery === 0 && adCount < maxAds) {
        blocks.push({ type: 'ad', slot: (slot + adCount) % 3 });
        adCount++;
      }
    }
  });

  return blocks;
}

// Renders one block — either HTML or AdSection
function ContentBlock({ block, refreshTrigger }) {
  if (block.type === 'ad') {
    return (
      <AdSection
        slot={block.slot}
        refreshTrigger={refreshTrigger}
        showPublisher={PUBLISHER_AD_ENABLED}
      />
    );
  }
  return <div className="learn-content-html" dangerouslySetInnerHTML={{ __html: block.content }} />;
}

export default function WaecLearn({ subjectId, onBack, onTopicComplete }) {
  const topics = WAEC_LEARN[subjectId] || [];
  const meta = WAEC_SUBJECTS.find((s) => s.id === subjectId) || {};

  // State
  const [activeIdx, setActiveIdx] = useState(null); // null = accordion closed
  const [completedTopics, setCompleted] = useState(() => {
    try {
      const stored = localStorage.getItem(`learn_complete_${subjectId}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [fontSize, setFontSize] = useState(1); // index into FONT_SIZES
  const [voiceList, setVoiceList] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [refreshTrigger] = useState(0);

  // Quiz state
  const [quizMode, setQuizMode] = useState(false);
  const [quizQs, setQuizQs] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSel, setQuizSel] = useState(-1);
  const [quizDone, setQuizDone] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizResults, setResults] = useState([]);

  const scrollRef = useRef(null);

  // Load voices for TTS
  useEffect(() => {
    const load = () => {
      const voices = window.speechSynthesis?.getVoices() || [];
      setVoiceList(voices);
      if (!selectedVoice && voices.length) setSelectedVoice(voices[0].name);
    };
    load();
    window.speechSynthesis && (window.speechSynthesis.onvoiceschanged = load);
    return () => {
      stopSpeech();
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (quizMode) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          // next option
          setQuizSel((s) => Math.min((quizQs[quizIdx]?.o?.length || 4) - 1, s + 1));
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          setQuizSel((s) => Math.max(0, s - 1));
        } else if (e.key === 'Enter' && quizSel >= 0 && !quizDone) {
          handleQuizSubmit();
        }
      } else {
        if (e.key === 'ArrowRight') handleNextTopic();
        else if (e.key === 'ArrowLeft') handlePrevTopic();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [quizMode, quizSel, quizDone, quizIdx, activeIdx]);

  const handleNextTopic = () => {
    if (activeIdx === null) setActiveIdx(0);
    else setActiveIdx((i) => Math.min(topics.length - 1, i + 1));
  };
  const handlePrevTopic = () => {
    if (activeIdx !== null) setActiveIdx((i) => Math.max(0, i - 1));
  };

  // TTS helpers
  const speakContent = () => {
    if (!topics[activeIdx]) return;
    const text = stripHtml(topics[activeIdx].contentHTML || topics[activeIdx].content || '');
    stopSpeech();
    const utter = new SpeechSynthesisUtterance(text);
    const voice = voiceList.find((v) => v.name === selectedVoice);
    if (voice) utter.voice = voice;
    utter.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
    setPaused(false);
  };

  const handlePause = () => {
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  const handleStop = () => {
    stopSpeech();
    setSpeaking(false);
    setPaused(false);
  };

  // Load quiz questions for topic
  const startQuiz = useCallback(() => {
    // Import WAEC_QB lazily
    import('../data/waec').then(({ WAEC_QB }) => {
      const bank = WAEC_QB[subjectId] || [];
      // Shuffle and pick 5
      const shuffled = [...bank].sort(() => Math.random() - 0.5).slice(0, Math.min(5, bank.length));
      setQuizQs(shuffled);
      setQuizIdx(0);
      setQuizSel(-1);
      setQuizDone(false);
      setQuizScore(0);
      setResults([]);
      setQuizMode(true);
    });
  }, [subjectId]);

  const handleQuizSubmit = () => {
    if (quizSel < 0) return;
    const q = quizQs[quizIdx];
    const correct = quizSel === q.a;
    if (correct) {
      SFX.correct();
      setQuizScore((s) => s + 1);
    } else {
      SFX.wrong();
    }
    setResults((r) => [
      ...r,
      { q: q.q, sel: quizSel, ans: q.a, correct, explanation: q.e, options: q.o },
    ]);
    setQuizDone(true);
  };

  const handleQuizNext = () => {
    if (quizIdx >= quizQs.length - 1) {
      // Quiz finished
      const finalScore =
        quizResults.filter((r) => r.correct).length + (quizResults[quizIdx]?.correct ? 0 : 0);
      finishQuiz();
    } else {
      setQuizIdx((i) => i + 1);
      setQuizSel(-1);
      setQuizDone(false);
    }
  };

  const finishQuiz = () => {
    SFX.roundComplete();
    // Mark topic complete
    const updated = [...new Set([...completedTopics, activeIdx])];
    setCompleted(updated);
    try {
      localStorage.setItem(`learn_complete_${subjectId}`, JSON.stringify(updated));
    } catch {}
    if (onTopicComplete) onTopicComplete(activeIdx);
    setQuizMode(false);
  };

  const topic = activeIdx !== null ? topics[activeIdx] : null;
  const fSize = FONT_SIZES[fontSize];

  // Build content blocks with ad injection
  const contentBlocks = topic
    ? injectAds(
        topic.contentHTML || `<p class="learn-p">${topic.content}</p>`,
        AD_EVERY_NTH_SUBHEADING,
        MAX_ADS_PER_PAGE,
        activeIdx
      )
    : [];

  return (
    <div
      className="scr fd learn-page"
      style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <div
        className="learn-header"
        style={{ background: `linear-gradient(135deg, #1A1A2E, ${meta.color || '#6C63FF'})` }}
      >
        <button
          className="learn-back-btn"
          onClick={() => {
            stopSpeech();
            onBack();
          }}
        >
          ← Back
        </button>
        <div className="learn-header-info">
          <div className="learn-subject-icon" style={{ background: meta.bg }}>
            {meta.icon}
          </div>
          <div>
            <div className="learn-subject-name">{meta.label}</div>
            <div className="learn-subject-meta">
              Learn Mode · {topics.length} topics · {completedTopics.length} done
            </div>
          </div>
        </div>

        {/* Font size controls */}
        <div className="learn-font-controls">
          <button
            className="learn-font-btn"
            onClick={() => setFontSize((s) => Math.max(0, s - 1))}
            disabled={fontSize === 0}
            aria-label="Decrease font size"
          >
            A−
          </button>
          <button
            className="learn-font-btn"
            onClick={() => setFontSize((s) => Math.min(FONT_SIZES.length - 1, s + 1))}
            disabled={fontSize === FONT_SIZES.length - 1}
            aria-label="Increase font size"
          >
            A+
          </button>
        </div>
      </div>

      {/* Quiz mode overlay */}
      {quizMode ? (
        <div className="learn-quiz-overlay" ref={scrollRef}>
          <div className="learn-quiz-header">
            <span className="learn-quiz-badge">📝 Topic Quiz</span>
            <span className="learn-quiz-progress">
              Q {quizIdx + 1}/{quizQs.length}
            </span>
          </div>

          {quizQs[quizIdx] && (
            <div className="learn-quiz-card">
              <div className="learn-quiz-q">{quizQs[quizIdx].q}</div>
              <div className="learn-quiz-options">
                {quizQs[quizIdx].o.map((opt, i) => {
                  let cls = 'learn-quiz-opt';
                  if (quizDone) {
                    if (i === quizQs[quizIdx].a) cls += ' correct';
                    else if (i === quizSel && quizSel !== quizQs[quizIdx].a) cls += ' wrong';
                  } else if (i === quizSel) cls += ' selected';
                  return (
                    <button
                      key={i}
                      className={cls}
                      onClick={() => !quizDone && setQuizSel(i)}
                      disabled={quizDone}
                    >
                      <span className="learn-quiz-opt-letter">{['A', 'B', 'C', 'D'][i]}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {!quizDone && (
                <button
                  className="learn-quiz-submit"
                  onClick={handleQuizSubmit}
                  disabled={quizSel < 0}
                  style={{ background: meta.color }}
                >
                  Submit Answer →
                </button>
              )}

              {quizDone && (
                <div className="learn-quiz-explanation">
                  <div
                    className={`learn-quiz-result ${quizSel === quizQs[quizIdx].a ? 'correct' : 'wrong'}`}
                  >
                    {quizSel === quizQs[quizIdx].a ? '✅ Correct!' : '❌ Incorrect'}
                  </div>
                  <div className="learn-quiz-exp-text">💡 {quizQs[quizIdx].e}</div>
                  <button
                    className="learn-quiz-next"
                    onClick={handleQuizNext}
                    style={{ background: meta.color }}
                  >
                    {quizIdx >= quizQs.length - 1 ? '🏁 Finish Quiz' : 'Next Question →'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Score summary if all done */}
          {quizIdx >= quizQs.length && (
            <div className="learn-quiz-summary">
              <div className="learn-quiz-summary-score">
                {quizScore}/{quizQs.length}
              </div>
              <div>Topic complete! Well done.</div>
              <button
                className="learn-quiz-next"
                onClick={finishQuiz}
                style={{ background: meta.color }}
              >
                ✅ Back to Topics
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="scroll learn-body" ref={scrollRef} style={{ flex: 1, overflowY: 'auto' }}>
          {/* Progress bar */}
          <div className="learn-progress-bar">
            <div
              className="learn-progress-fill"
              style={{
                width: `${topics.length ? (completedTopics.length / topics.length) * 100 : 0}%`,
                background: meta.color,
              }}
            />
          </div>

          {/* Accordion */}
          <div className="learn-accordion">
            {topics.map((t, i) => {
              const isOpen = activeIdx === i;
              const isDone = completedTopics.includes(i);
              return (
                <div key={i} className={`learn-accordion-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="learn-accordion-header"
                    onClick={() => {
                      stopSpeech();
                      setSpeaking(false);
                      setActiveIdx(isOpen ? null : i);
                    }}
                    aria-expanded={isOpen}
                  >
                    <div className="learn-accordion-left">
                      <span
                        className="learn-accordion-num"
                        style={{ background: isOpen ? meta.color : undefined }}
                      >
                        {isDone ? '✓' : i + 1}
                      </span>
                      <span className="learn-accordion-title">{t.topic}</span>
                    </div>
                    <span className="learn-accordion-chevron">{isOpen ? '▲' : '▼'}</span>
                  </button>

                  {isOpen && (
                    <div className="learn-accordion-body" style={{ fontSize: fSize }}>
                      {/* TTS controls */}
                      <div className="learn-tts-bar">
                        <select
                          className="learn-voice-select"
                          value={selectedVoice}
                          onChange={(e) => setSelectedVoice(e.target.value)}
                          aria-label="Select voice"
                        >
                          {voiceList.map((v) => (
                            <option key={v.name} value={v.name}>
                              {v.name}
                            </option>
                          ))}
                        </select>
                        {!speaking ? (
                          <button className="learn-tts-btn" onClick={speakContent}>
                            ▶ Read
                          </button>
                        ) : (
                          <>
                            <button className="learn-tts-btn" onClick={handlePause}>
                              {paused ? '▶ Resume' : '⏸ Pause'}
                            </button>
                            <button className="learn-tts-btn learn-tts-stop" onClick={handleStop}>
                              ⏹ Stop
                            </button>
                          </>
                        )}
                      </div>

                      {/* Rich content with interleaved ads */}
                      {contentBlocks.map((block, bi) => (
                        <ContentBlock key={bi} block={block} refreshTrigger={refreshTrigger} />
                      ))}

                      {/* Navigation + quiz button */}
                      <div className="learn-nav-row">
                        <button
                          className="learn-nav-btn"
                          onClick={() => setActiveIdx(Math.max(0, i - 1))}
                          disabled={i === 0}
                        >
                          ← Previous
                        </button>
                        <button
                          className="learn-quiz-trigger"
                          onClick={startQuiz}
                          style={{ background: meta.color }}
                        >
                          📝 Take Quiz
                        </button>
                        <button
                          className="learn-nav-btn"
                          onClick={() => setActiveIdx(Math.min(topics.length - 1, i + 1))}
                          disabled={i === topics.length - 1}
                        >
                          Next →
                        </button>
                      </div>

                      {/* Keyboard hint */}
                      <p className="learn-keyboard-hint">
                        ⌨️ Use ← → arrow keys to navigate topics
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {topics.length === 0 && (
            <div className="learn-empty">No content available yet. Coming soon!</div>
          )}
        </div>
      )}
    </div>
  );
}
