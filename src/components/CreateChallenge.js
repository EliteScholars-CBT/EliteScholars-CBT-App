import React, { useState, useEffect } from 'react';
import { createChallenge, getChallengeMessages } from '../utils/challengeApi';
import Quiz from './Quiz';
import { GOLD, DPURP } from '../utils/colors';

// ============================================================================
// CreateChallenge — Users must PLAY the quiz before it is sent to opponent.
// Flow: Setup → Play Quiz → Review Score → Send Challenge (or discard)
// ============================================================================

const EXAM_OPTIONS = [
  { id: 'jamb', label: 'JAMB' },
  { id: 'postutme', label: 'POST UTME' },
  { id: 'waec', label: 'WAEC' },
  { id: 'neco', label: 'NECO' },
];

const SUBJECT_OPTIONS = [
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'english', label: 'English' },
  { id: 'physics', label: 'Physics' },
  { id: 'chemistry', label: 'Chemistry' },
  { id: 'biology', label: 'Biology' },
  { id: 'economics', label: 'Economics' },
  { id: 'accounting', label: 'Accounting' },
  { id: 'government', label: 'Government' },
  { id: 'literature', label: 'Literature' },
];

const NUM_QUESTIONS = 10;
const TIME_LIMIT = 60;

export default function CreateChallenge({ userEmail, userName, onClose, onCreated }) {
  // Step: 'setup' | 'play' | 'review' | 'sending'
  const [step, setStep] = useState('setup');

  const [opponentEmail, setOpponentEmail] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [examType, setExamType] = useState('jamb');
  const [university, setUniversity] = useState('');
  const [subject, setSubject] = useState('mathematics');
  const [messageTemplate, setMessageTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  // Results captured from the embedded quiz
  const [challengeScore, setChallengeScore] = useState(0);
  const [challengeCorrect, setChallengeCorrect] = useState(0);
  const [challengeTotal, setChallengeTotal] = useState(0);
  const [quizTimeLeft, setQuizTimeLeft] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const msgs = await getChallengeMessages();
    setMessages(msgs);
    if (msgs.length > 0) setMessageTemplate(msgs[0].message_id);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!re.test(email)) return 'Please enter a valid email address';
    if (email === userEmail) return 'You cannot challenge yourself';
    return '';
  };

  const handleEmailChange = (e) => {
    const v = e.target.value;
    setOpponentEmail(v);
    setEmailError(validateEmail(v));
    if (!validateEmail(v)) setOpponentName(v.split('@')[0]);
  };

  // Step 1 → Step 2: validate setup then launch play
  const handleStartPlay = () => {
    const err = validateEmail(opponentEmail);
    if (err) {
      setEmailError(err);
      return;
    }
    setStep('play');
  };

  // Called when the embedded quiz finishes
  const handleQuizDone = (finalRoundsPlayed) => {
    // Score is tracked via props passed down; we read from state
    setStep('review');
  };

  // Send the challenge after playing
  const handleSendChallenge = async () => {
    setLoading(true);
    setStep('sending');

    const result = await createChallenge(
      userEmail,
      userName,
      opponentEmail,
      opponentName || opponentEmail.split('@')[0],
      examType,
      university,
      subject,
      NUM_QUESTIONS,
      TIME_LIMIT,
      messageTemplate,
      customMessage,
      // Pass the challenger's score so the server can record it
      challengeScore,
      challengeCorrect,
      challengeTotal
    );

    setLoading(false);
    if (result.success) {
      onCreated();
    } else {
      alert('Failed to send challenge. Please check the opponent email and try again.');
      setStep('review');
    }
  };

  const selectedMessage = messages.find((m) => m.message_id === messageTemplate);
  const pct = challengeTotal > 0 ? Math.round((challengeCorrect / challengeTotal) * 100) : 0;

  // ---- STEP: SETUP ----
  if (step === 'setup') {
    return (
      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="create-challenge-modal">
          <div className="modal-header">
            <div className="modal-title">⚔️ Create Challenge</div>
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="challenge-flow-notice">
              <span>📋</span>
              <span>
                You'll <strong>play the quiz first</strong>, then your score is sent to the
                opponent.
              </span>
            </div>

            {/* Opponent email */}
            <div className="form-group">
              <label>Opponent Email</label>
              <input
                type="email"
                placeholder="Enter opponent's email address"
                value={opponentEmail}
                onChange={handleEmailChange}
                className={emailError ? 'input-error' : ''}
              />
              {emailError && <div className="error-text">{emailError}</div>}
              <div className="helper-text">They must be a registered EliteScholars user.</div>
            </div>

            {/* Exam type */}
            <div className="form-group">
              <label>Exam Type</label>
              <div className="radio-group">
                {EXAM_OPTIONS.map((opt) => (
                  <label key={opt.id}>
                    <input
                      type="radio"
                      value={opt.id}
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
                <label>University (e.g. unilag, unn)</label>
                <input
                  type="text"
                  placeholder="e.g. unilag"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>
            )}

            {/* Subject */}
            <div className="form-group">
              <label>Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                {SUBJECT_OPTIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Info box */}
            <div className="challenge-info-box">
              <div className="info-row">
                <span>📚 Questions:</span>
                <span>
                  <strong>{NUM_QUESTIONS}</strong>
                </span>
              </div>
              <div className="info-row">
                <span>⏱️ Time/question:</span>
                <span>
                  <strong>{TIME_LIMIT}s</strong>
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="form-group">
              <label>Challenge Message</label>
              <select value={messageTemplate} onChange={(e) => setMessageTemplate(e.target.value)}>
                {messages.map((m) => (
                  <option key={m.message_id} value={m.message_id}>
                    {m.message_text}
                  </option>
                ))}
                <option value="custom">Custom message…</option>
              </select>
            </div>
            {messageTemplate === 'custom' && (
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your message (max 100 chars)"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  maxLength="100"
                />
              </div>
            )}
            {selectedMessage && messageTemplate !== 'custom' && (
              <div className="message-preview">"{selectedMessage.message_text}"</div>
            )}
          </div>

          <div className="modal-footer">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className="send-btn"
              onClick={handleStartPlay}
              disabled={!!emailError || !opponentEmail}
            >
              ▶ Play Your Round →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- STEP: PLAY (embedded quiz) ----
  if (step === 'play') {
    return (
      <div className="challenge-play-overlay">
        <div className="challenge-play-banner">
          <span>
            ⚔️ Challenge Round — {subject} vs {opponentEmail}
          </span>
          <button onClick={() => setStep('setup')} className="challenge-play-exit">
            ✕ Exit
          </button>
        </div>
        <Quiz
          subjectId={subject}
          onAllDone={handleQuizDone}
          setQuizTimeRemaining={setQuizTimeLeft}
          score={challengeScore}
          setScore={setChallengeScore}
          correct={challengeCorrect}
          setCorrect={setChallengeCorrect}
          totalQ={challengeTotal}
          setTotalQ={setChallengeTotal}
          onHome={() => setStep('setup')}
          triggerAdRefresh={() => {}}
          adRefresh={0}
          email={userEmail}
          name={userName}
          onFiftyUsed={() => {}}
          onHintUsed={() => {}}
          isChallengeMode
        />
      </div>
    );
  }

  // ---- STEP: REVIEW ----
  if (step === 'review') {
    return (
      <div className="modal-overlay">
        <div className="create-challenge-modal">
          <div className="modal-header">
            <div className="modal-title">⚔️ Your Challenge Score</div>
          </div>
          <div className="modal-body" style={{ textAlign: 'center' }}>
            <div className="challenge-score-circle">
              <div className="challenge-score-num">
                {challengeCorrect}/{challengeTotal}
              </div>
              <div className="challenge-score-pct">{pct}%</div>
            </div>
            <p style={{ marginTop: 12, fontSize: 14, color: 'var(--text-secondary)' }}>
              Great job! Now send this challenge to <strong>{opponentEmail}</strong>. They must beat
              your score to win.
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>
              If they don't respond, the challenge expires automatically.
            </p>
          </div>
          <div className="modal-footer">
            <button className="cancel-btn" onClick={onClose}>
              Discard
            </button>
            <button
              className="send-btn"
              onClick={handleSendChallenge}
              disabled={loading}
              style={{ background: GOLD, color: DPURP }}
            >
              📤 Send Challenge →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- STEP: SENDING ----
  return (
    <div className="modal-overlay">
      <div className="create-challenge-modal" style={{ textAlign: 'center', padding: 40 }}>
        <div className="loading-spinner" />
        <p style={{ marginTop: 16 }}>Sending challenge…</p>
      </div>
    </div>
  );
}
