// async (params) => {

import React, { useState, useEffect } from 'react';
import { createChallenge, getChallengeMessages } from '../utils/challengeApi';
import Quiz from './Quiz';
import BackButton from './BackButton';

const EXAM_OPTIONS = [
  { id: 'jamb',     label: 'JAMB' },
  { id: 'postutme', label: 'POST UTME' },
  { id: 'waec',     label: 'WAEC' },
  { id: 'neco',     label: 'NECO' },
  { id: 'gst',      label: 'GST' },
];

const SUBJECT_OPTIONS = [
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'english',     label: 'English' },
  { id: 'physics',     label: 'Physics' },
  { id: 'chemistry',   label: 'Chemistry' },
  { id: 'biology',     label: 'Biology' },
  { id: 'economics',   label: 'Economics' },
  { id: 'accounting',  label: 'Accounting' },
  { id: 'government',  label: 'Government' },
  { id: 'literature',  label: 'Literature' },
];

const NUM_QUESTIONS = 5;
const TIME_LIMIT    = 60;

export default function CreateChallenge({ userEmail, userName, onClose, onCreated }) {
  const [step, setStep]                   = useState('setup');
  const [opponentEmail, setOpponentEmail] = useState('');
  const [opponentName, setOpponentName]   = useState('');
  const [examType, setExamType]           = useState('jamb');
  const [university, setUniversity]       = useState('');
  const [subject, setSubject]             = useState('mathematics');
  const [messageTemplate, setMsgTpl]      = useState('');
  const [customMessage, setCustomMsg]     = useState('');
  const [messages, setMessages]           = useState([]);
  const [emailError, setEmailError]       = useState('');
  const [sendError, setSendError]         = useState('');

  // Final scores — set directly from quiz callback, not from state
  const [finalCorrect, setFinalCorrect]   = useState(0);
  const [finalTotal, setFinalTotal]       = useState(0);
  const [finalScore, setFinalScore]       = useState(0);

  // Live quiz state (passed into Quiz component)
  const [score, setScore]     = useState(0);
  const [correct, setCorrect] = useState(0);
  const [totalQ, setTotalQ]   = useState(0);

  useEffect(() => {
    getChallengeMessages().then((msgs) => {
      setMessages(msgs);
      if (msgs.length) setMsgTpl(msgs[0].message_id);
    });
  }, []);

  const validateEmail = (val) => {
    if (!val) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Enter a valid email address';
    if (val.toLowerCase() === userEmail?.toLowerCase()) return 'You cannot challenge yourself';
    return '';
  };

  const handleEmailChange = (e) => {
    const v = e.target.value;
    setOpponentEmail(v);
    const err = validateEmail(v);
    setEmailError(err);
    if (!err) setOpponentName(v.split('@')[0]);
  };

  const handleStartPlay = () => {
    const err = validateEmail(opponentEmail);
    if (err) { setEmailError(err); return; }
    setScore(0); setCorrect(0); setTotalQ(0);
    setFinalCorrect(0); setFinalTotal(0); setFinalScore(0);
    setStep('play');
  };

  // Quiz calls onAllDone — we capture final values HERE before sending
  const handleQuizDone = async () => {
    // Read directly from live state at the moment quiz ends
    const fc = correct;
    const ft = totalQ;
    const fs = score;

    setFinalCorrect(fc);
    setFinalTotal(ft);
    setFinalScore(fs);

    setStep('sending');
    setSendError('');

    try {
      const result = await createChallenge(
        userEmail, userName,
        opponentEmail, opponentName || opponentEmail.split('@')[0],
        examType, university, subject,
        NUM_QUESTIONS, TIME_LIMIT,
        messageTemplate, customMessage,
        fs, fc, ft
      );
      if (result.success) {
        setStep('sent');
        setTimeout(() => { onCreated(); }, 2200);
      } else {
        setSendError(result.error || 'Failed to send. Check the opponent email and try again.');
        setStep('error');
      }
    } catch {
      setSendError('Network error. Please try again.');
      setStep('error');
    }
  };

  // ── STEP: SETUP ────────────────────────────────────────────────────────────
  if (step === 'setup') {
    return (
      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="create-challenge-modal">
          <div className="modal-header">
            <div className="modal-title">⚔️ Create Challenge</div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>

          <div className="modal-body">

            <div className="form-group">
              <label>Opponent Email</label>
              <input
                type="email"
                placeholder="opponent@email.com"
                value={opponentEmail}
                onChange={handleEmailChange}
                className={emailError ? 'input-error' : ''}
              />
              {emailError && <div className="error-text">{emailError}</div>}
            </div>

            <div className="form-group">
              <label>Exam Type</label>
              <div className="radio-group">
                {EXAM_OPTIONS.map((opt) => (
                  <label key={opt.id}>
                    <input
                      type="radio" value={opt.id}
                      checked={examType === opt.id}
                      onChange={(e) => setExamType(e.target.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {examType === 'postutme' && (
              <div className="form-group">
                <label>University (e.g. unilag)</label>
                <input
                  type="text" placeholder="e.g. unilag" value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label>Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                {SUBJECT_OPTIONS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="challenge-info-box">
              <div className="info-row">
                <span>📚 Questions:</span>
                <span><strong>{NUM_QUESTIONS}</strong></span>
              </div>
              <div className="info-row">
                <span>⏱️ Time/question:</span>
                <span><strong>{TIME_LIMIT}s</strong></span>
              </div>
            </div>

            <div className="form-group">
              <label>Challenge Message</label>
              <select value={messageTemplate} onChange={(e) => setMsgTpl(e.target.value)}>
                <option value="custom">Custom message…</option>
                {messages.map((m) => (
                  <option key={m.message_id} value={m.message_id}>{m.message_text}</option>
                ))}
              </select>
            </div>

            {messageTemplate === 'custom' && (
              <div className="form-group">
                <input
                  type="text" placeholder="Your message (max 100 chars)"
                  value={customMessage}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  maxLength="100"
                />
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button
              className="send-btn"
              onClick={handleStartPlay}
              disabled={!!emailError || !opponentEmail}
            >
              ▶ Play
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP: PLAY ─────────────────────────────────────────────────────────────
  if (step === 'play') {
    return (
      <div className="challenge-play-overlay">
        <div className="challenge-play-banner">
          <BackButton onClick={() => setStep('setup')} light label="Setup" />
        </div>
        <Quiz
          subjectId={subject}
          onAllDone={handleQuizDone}
          setQuizTimeRemaining={() => {}}
          score={score}     setScore={setScore}
          correct={correct} setCorrect={setCorrect}
          totalQ={totalQ}   setTotalQ={setTotalQ}
          onHome={() => setStep('setup')}
          triggerAdRefresh={() => {}} adRefresh={0}
          email={userEmail} name={userName}
          onFiftyUsed={() => {}} onHintUsed={() => {}}
          onLogQuestion={() => {}}
          isChallengeMode examType={examType}
        />
      </div>
    );
  }

  // ── STEP: SENDING ──────────────────────────────────────────────────────────
  if (step === 'sending') {
    return (
      <div className="modal-overlay">
        <div className="create-challenge-modal" style={{ textAlign: 'center', padding: 44 }}>
          <div className="loading-spinner" style={{ margin: '0 auto 16px' }} />
          <div style={{ fontWeight: 700, fontSize: 15, color: '#1a0030' }}>Sending challenge…</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>
            Your score: <strong>{correct}/{totalQ}</strong> — {opponentEmail} will need to beat it!
          </div>
        </div>
      </div>
    );
  }

  // ── STEP: SENT ─────────────────────────────────────────────────────────────
  if (step === 'sent') {
    return (
      <div className="modal-overlay">
        <div className="create-challenge-modal" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 52 }}>🎉</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#1a0030', margin: '12px 0 6px' }}>
            Challenge Sent!
          </div>
          <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
            Your score <strong>{finalCorrect}/{finalTotal}</strong> has been sent to{' '}
            <strong>{opponentEmail}</strong>. They have 24 hours to accept and play.
          </div>
        </div>
      </div>
    );
  }

  // ── STEP: ERROR ────────────────────────────────────────────────────────────
  return (
    <div className="modal-overlay">
      <div className="create-challenge-modal" style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 40 }}>⚠️</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#DC2626', margin: '10px 0 6px' }}>
          Could Not Send
        </div>
        <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6, marginBottom: 18 }}>
          {sendError}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button className="cancel-btn" onClick={onClose}>Discard</button>
          <button className="send-btn" onClick={handleQuizDone}>Retry →</button>
        </div>
      </div>
    </div>
  );
}
