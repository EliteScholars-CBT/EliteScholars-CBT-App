import React, { useState, useEffect, useRef } from 'react';
import { QB } from '../data/jamb';
import { WAEC_QB } from '../data/waec';
import { SUBJ } from '../data/subjects';
import { ROUND_SIZE, getTimerSecs, SHOW_ADS } from '../utils/constants';
import {
  DPURP,
  PURPLE,
  BG,
  LGRAY,
  WHITE,
  GRAY,
  LGOLD,
  GREEN,
  LGREEN,
  RED,
  LRED,
  GOLD,
} from '../utils/colors';
import { SFX, speak, stopSpeech } from '../utils/sounds';
import { sfl } from '../utils/helpers';

export default function Quiz({
  subjectId,
  onAllDone,
  score,
  setScore,
  correct,
  setCorrect,
  totalQ,
  setTotalQ,
  onHome,
  triggerAdRefresh,
  adRefresh,
  setQuizTimeRemaining,
  name,
  email,
  onFiftyUsed,
  onHintUsed,
  onLogQuestion,   // optional: (entry) => void — logs each answered question for review
  isChallengeMode, // optional: true when playing a challenge round
  examType,        // optional: 'jamb' | 'waec' | 'neco' | 'postutme' | 'gst'
}) {
  const [shuffled] = useState(() => {
    const questions = WAEC_QB[subjectId] || QB[subjectId] || QB.economics;
    return sfl(questions);
  });

  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(-1);
  const [done, setDone] = useState(false);
  const [modal, setModal] = useState(false);
  const [timeLeft, setTL] = useState(() => getTimerSecs(subjectId, ROUND_SIZE));
  const [usedF, setUF] = useState(false);
  const [usedH, setUH] = useState(false);
  const [hidden, setHid] = useState([]);
  const [showHint, setSHint] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [ansAnim, setAnsAnim] = useState('');
  const timerRef = useRef(null);
  const bodyRef = useRef(null);
  const utterRef = useRef(null);
  const roundSecs = getTimerSecs(subjectId, ROUND_SIZE);

  const q = shuffled[qi];
  const isLastQ = qi >= shuffled.length - 1;
  const isRoundEnd = (qi + 1) % ROUND_SIZE === 0;
  const isLast = isLastQ || isRoundEnd;
  const roundNum = Math.floor(qi / ROUND_SIZE);
  const meta = SUBJ[subjectId] || SUBJ.economics;

  // Reset visual states when moving to next question
  useEffect(() => {
    setSel(-1);
    setDone(false);
    setAnsAnim('');
    setHid([]);
    setSHint(false);
  }, [qi]);

  // Reset lifelines only when a new ROUND starts
  useEffect(() => {
    setUF(false);
    setUH(false);
  }, [roundNum]);

  // Auto-read question
  useEffect(() => {
    if (!q || !voiceEnabled) return;
    const txt =
      q.q + '. Options: ' + q.o.map((opt, i) => ['A', 'B', 'C', 'D'][i] + '. ' + opt).join('. ');
    stopSpeech();
    const u = speak(txt);
    if (u) {
      utterRef.current = u;
      setSpeaking(true);
      u.onend = () => setSpeaking(false);
    }
  }, [qi, voiceEnabled, q]);

  // Timer (per round)
  useEffect(() => {
    setTL(roundSecs);
    if (timerRef.current) clearInterval(timerRef.current);
    const start = Date.now();
    let lastWarnSec = -1;
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = Math.max(0, roundSecs - elapsed);
      setTL(remaining);
      if (remaining <= 10 && remaining > 0 && remaining !== lastWarnSec) {
        lastWarnSec = remaining;
        SFX.timerWarn();
      }
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        // Time up — mark question as done without a selection
        setDone((d) => {
          if (!d) {
            setTotalQ((x) => x + 1);
            return true;
          }
          return d;
        });
        stopSpeech();
        setSpeaking(false);
      }
    }, 500);
    return () => clearInterval(timerRef.current);
  }, [roundNum, roundSecs]);

  const stopTimer = () => clearInterval(timerRef.current);

  const toggleVoice = () => {
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
      setVoiceEnabled(false);
    } else {
      setVoiceEnabled((v) => {
        const next = !v;
        if (next && q) {
          const txt =
            q.q +
            '. Options: ' +
            q.o.map((opt, i) => ['A', 'B', 'C', 'D'][i] + '. ' + opt).join('. ');
          const u = speak(txt);
          if (u) {
            utterRef.current = u;
            setSpeaking(true);
            u.onend = () => setSpeaking(false);
          }
        }
        return next;
      });
    }
  };

  const handleSelect = (i) => {
    if (done || hidden.includes(i)) return;
    SFX.select();
    setSel(i);
  };

  // FIX (Issue 1): handleSubmit does NOT call addXP.
  // XP is computed once in App.js handleAllDone when the quiz ends.
  const handleSubmit = () => {
    if (SHOW_ADS) triggerAdRefresh();
    if (sel === -1 || done) return;
    stopSpeech();
    setSpeaking(false);
    SFX.submit();
    setDone(true);
    setTotalQ((t) => t + 1);
    const isCorrect = sel === q.a;

    if (isCorrect) {
      setScore((s) => s + 1);
      setCorrect((c) => c + 1);
      setTimeout(() => SFX.correct(), 100);
      setAnsAnim('correct');
    } else {
      setTimeout(() => SFX.wrong(), 80);
      setAnsAnim('wrong');
    }

    setTimeout(() => setAnsAnim(''), 500);
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = 999;
    }, 200);

    // Log this question for Result review modal
    if (onLogQuestion) {
      onLogQuestion({
        q: q.q,
        options: q.o,
        selected: sel,
        answer: q.a,
        correct: isCorrect,
        explanation: q.e || '',
      });
    }
  };

  const handleNext = () => {
    stopSpeech();
    setSpeaking(false);
    if (SHOW_ADS) triggerAdRefresh();

    if (isLast) {
      SFX.roundComplete();
      // Pass final time remaining to App.js for speed bonus calculation
      if (setQuizTimeRemaining) {
        setQuizTimeRemaining(timeLeft);
      }
      onAllDone(Math.ceil(shuffled.length / ROUND_SIZE));
      return;
    }

    setQi((nextQi) => nextQi + 1);
  };

  const doFifty = () => {
    if (usedF || done) return;
    if (onFiftyUsed) onFiftyUsed(true);
    setUF(true);
    SFX.select();
    const wrongOptions = [0, 1, 2, 3].filter((i) => i !== q.a);
    const shuffledWrong = sfl(wrongOptions);
    const toHide = shuffledWrong.slice(0, 2);
    setHid(toHide);
    if (toHide.includes(sel)) setSel(-1);
  };

  const doHint = () => {
    if (usedH || done) return;
    if (onHintUsed) onHintUsed(true);
    setUH(true);
    setSHint(true);
    SFX.select();
  };

  const tw = timeLeft <= 10;
  const tc = timeLeft <= 10 ? '#FF6B6B' : timeLeft <= 20 ? LGOLD : GOLD;

  const getOptionClass = (i) => {
    if (hidden.includes(i)) return 'hidden';
    let className = 'quiz-option';
    if (!done && sel === i) className += ' selected';
    if (done) {
      if (i === q.a) className += ' correct';
      else if (i === sel && i !== q.a) className += ' wrong';
      className += ' disabled';
    }
    return className;
  };

  const getOptionStyle = (i) => {
    if (hidden.includes(i)) return { display: 'none' };
    let border = `2px solid ${LGRAY}`;
    let bg = WHITE;
    let color = '#1a0030';
    if (!done && sel === i) {
      border = `2px solid ${meta.color}`;
      bg = meta.bg;
      color = meta.color;
    }
    if (done) {
      if (i === q.a) {
        border = `2px solid ${GREEN}`;
        bg = LGREEN;
        color = GREEN;
      } else if (i === sel && i !== q.a) {
        border = `2px solid ${RED}`;
        bg = LRED;
        color = RED;
      }
    }
    return {
      border,
      background: bg,
      color,
      padding: '11px 13px',
      borderRadius: 11,
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      fontSize: 13,
      fontWeight: 500,
      cursor: done ? 'default' : 'pointer',
      transition: 'all .18s',
      marginBottom: 7,
    };
  };

  const getLetterStyle = (i) => {
    if (hidden.includes(i)) return { display: 'none' };
    let bg = LGRAY;
    let color = GRAY;
    if (!done && sel === i) {
      bg = meta.color;
      color = WHITE;
    }
    if (done && i === q.a) {
      bg = GREEN;
      color = WHITE;
    }
    if (done && i === sel && i !== q.a) {
      bg = RED;
      color = WHITE;
    }
    return {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: bg,
      color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 700,
      flexShrink: 0,
      transition: 'all .18s',
    };
  };

  if (!q) {
    return (
      <div
        className="scr"
        style={{
          background: BG,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={{ fontSize: 48 }}>❌</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: PURPLE }}>Error Loading Questions</div>
        <div style={{ fontSize: 14, color: GRAY, textAlign: 'center', maxWidth: 300 }}>
          No questions found for {subjectId}. Please check QB.js file.
        </div>
        <button
          onClick={onHome}
          style={{
            padding: '10px 20px',
            background: PURPLE,
            color: WHITE,
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="scr" style={{ background: BG }}>
      <div
        className="quiz-header"
        style={{ background: `linear-gradient(135deg,${DPURP},${meta.color || PURPLE})` }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 7,
          }}
        >
          <button
            className="quiz-home-btn"
            onClick={() => {
              stopSpeech();
              stopTimer();
              onHome();
            }}
          >
            ⌂ Home
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className={`quiz-timer ${tw ? 'quiz-timer-warning' : ''}`} style={{ color: tc }}>
              ⏱ {timeLeft}s
            </div>
            <div className="quiz-score-badge">
              {correct}/{ROUND_SIZE}
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 10,
            color: 'rgba(255,255,255,.55)',
            marginBottom: 5,
          }}
        >
          <span>
            Q{(qi % ROUND_SIZE) + 1}/{ROUND_SIZE} · {meta.label}
          </span>
          <span>
            Round {roundNum + 1} · {(qi % ROUND_SIZE) + 1}/{ROUND_SIZE}
          </span>
        </div>
        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{ width: `${(((qi % ROUND_SIZE) + 1) / ROUND_SIZE) * 100}%` }}
          />
        </div>
      </div>

      <div
        ref={bodyRef}
        className="scroll"
        style={{
          flex: 1,
          padding: '10px 13px 6px',
          display: 'flex',
          flexDirection: 'column',
          gap: 9,
        }}
      >
        <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
          <button
            onClick={doFifty}
            disabled={usedF || done}
            className={`lifeline-button ${usedF ? 'lifeline-fifty-used' : 'lifeline-fifty'}`}
          >
            ⚖️ 50/50
          </button>
          <button
            onClick={doHint}
            disabled={usedH || done}
            className={`lifeline-button ${usedH ? 'lifeline-hint-used' : 'lifeline-hint'}`}
          >
            💡 Hint
          </button>
          <button
            onClick={toggleVoice}
            className={`lifeline-button ${voiceEnabled ? 'lifeline-voice' : 'lifeline-voice-off'}`}
          >
            {speaking ? '🔊 Stop' : voiceEnabled ? '🔊 On' : '🔊 Off'}
          </button>
        </div>

        {showHint && (
          <div className="hint-box">
            <div className="hint-title">HINT</div>
            <div className="hint-text">{q.h}</div>
          </div>
        )}

        <div
          key={qi}
          className={`su ${ansAnim === 'correct' ? 'correct-pop' : ansAnim === 'wrong' ? 'wrong-shake' : ''} question-card ${done ? (sel === q.a ? 'question-card-correct' : 'question-card-wrong') : ''}`}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
            <div className="question-number" style={{ color: meta.color }}>
              Q{qi + 1}
            </div>
            <div
              className="question-year"
              style={{ background: `${meta.color}18`, color: meta.color }}
            >
              {q.yr}
            </div>
          </div>
          <div className="question-text">{q.q}</div>
          {q.o.map((opt, i) => (
            <div
              key={i}
              className={getOptionClass(i)}
              style={getOptionStyle(i)}
              onClick={() => handleSelect(i)}
            >
              <div style={getLetterStyle(i)}>{['A', 'B', 'C', 'D'][i]}</div>
              <span>{opt}</span>
            </div>
          ))}
        </div>

        {done && (
          <div className="quick-take">
            <div className="quick-take-title">QUICK TAKE</div>
            <div className="quick-take-text">{q.e.split('. ')[0]}.</div>
            <div className="quick-take-link" onClick={() => setModal(true)}>
              Read full explanation →
            </div>
          </div>
        )}
      </div>

      <div className="quiz-action-bar">
        {!done && sel !== -1 && (
          <button className="quiz-clear-btn" onClick={() => setSel(-1)}>
            ✕
          </button>
        )}
        {!done && (
          <button
            onClick={handleSubmit}
            className={`quiz-submit-btn ${sel !== -1 ? 'quiz-submit-active' : 'quiz-submit-inactive'}`}
          >
            Submit Answer
          </button>
        )}
        {done && (
          <button className="quiz-next-btn" onClick={handleNext}>
            {isLastQ ? 'Final Results →' : isRoundEnd ? 'See Results →' : 'Next →'}
          </button>
        )}
      </div>

      {modal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setModal(false)}
        >
          <div className="modal-content">
            <div className="modal-handle" />
            <div className="modal-title">💡 Full Explanation</div>
            <div className="modal-question">{q.q}</div>
            <div className="modal-section-title">WHY THIS ANSWER?</div>
            <div className="modal-explanation">
              {(q.full || q.e)
                .split('\n')
                .filter((l) => l.trim())
                .map((para, i) => (
                  <p key={i} style={{ marginBottom: 12 }}>
                    {para}
                  </p>
                ))}
            </div>
            <div
              className="modal-answer-box"
              style={{ background: `${meta.color}12`, border: `1px solid ${meta.color}30` }}
            >
              <div className="modal-answer-title" style={{ color: meta.color }}>
                CORRECT ANSWER
              </div>
              <div className="modal-answer-text">
                {['A', 'B', 'C', 'D'][q.a]}. {q.o[q.a]}
              </div>
            </div>
            <button className="modal-close-btn" onClick={() => setModal(false)}>
              Got it ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
