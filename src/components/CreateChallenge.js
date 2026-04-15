import React, { useState, useEffect } from 'react';
import { createChallenge, getChallengeMessages } from '../utils/challengeApi';

export default function CreateChallenge({ userEmail, userName, onClose, onCreated }) {
  const [opponentEmail, setOpponentEmail] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [examType, setExamType] = useState('jamb');
  const [university, setUniversity] = useState('');
  const [subject, setSubject] = useState('mathematics');
  const [messageTemplate, setMessageTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Fixed values
  const NUM_QUESTIONS = 10;
  const TIME_LIMIT = 60;

  const examOptions = [
    { id: 'jamb', label: 'JAMB' },
    { id: 'postutme', label: 'POST UTME' },
  ];
  const subjectOptions = [
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

  // Email validation function (same as signup)
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (email === userEmail) return 'You cannot challenge yourself';
    return '';
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setOpponentEmail(email);
    const error = validateEmail(email);
    setEmailError(error);
    
    // You could optionally fetch user name by email here
    if (!error && email !== userEmail) {
      // For now, use email as name until we fetch user data
      setOpponentName(email.split('@')[0]);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const msgs = await getChallengeMessages();
    setMessages(msgs);
    if (msgs.length > 0) setMessageTemplate(msgs[0].message_id);
  };

  const handleSubmit = async () => {
    const emailError = validateEmail(opponentEmail);
    if (emailError) {
      setEmailError(emailError);
      return;
    }

    if (!opponentEmail) {
      alert('Please enter opponent email');
      return;
    }

    setLoading(true);
    const result = await createChallenge(
      userEmail, userName,
      opponentEmail, opponentName || opponentEmail.split('@')[0],
      examType, university, subject,
      NUM_QUESTIONS, TIME_LIMIT,
      messageTemplate, customMessage
    );

    if (result.success) {
      onCreated();
    } else {
      alert('Failed to create challenge. Make sure the email belongs to a registered user.');
    }
    setLoading(false);
  };

  const selectedMessage = messages.find(m => m.message_id === messageTemplate);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
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
              placeholder="Enter opponent's email address" 
              value={opponentEmail} 
              onChange={handleEmailChange}
              className={emailError ? 'input-error' : ''}
            />
            {emailError && <div className="error-text">{emailError}</div>}
            <div className="helper-text">Enter the email address of the person you want to challenge</div>
          </div>

          <div className="form-group">
            <label>Exam Type</label>
            <div className="radio-group">
              {examOptions.map(opt => (
                <label key={opt.id}>
                  <input type="radio" value={opt.id} checked={examType === opt.id} onChange={(e) => setExamType(e.target.value)} />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {examType === 'postutme' && (
            <div className="form-group">
              <label>University</label>
              <input type="text" placeholder="e.g., unilag, unn" value={university} onChange={(e) => setUniversity(e.target.value)} />
            </div>
          )}

          <div className="form-group">
            <label>Subject</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              {subjectOptions.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.label}</option>
              ))}
            </select>
          </div>

          <div className="challenge-info-box">
            <div className="info-row">
              <span>📚 Questions:</span>
              <span><strong>{NUM_QUESTIONS} questions</strong> (fixed)</span>
            </div>
            <div className="info-row">
              <span>⏱️ Time per question:</span>
              <span><strong>{TIME_LIMIT} seconds</strong> (fixed)</span>
            </div>
          </div>

          <div className="form-group">
            <label>Challenge Message</label>
            <select value={messageTemplate} onChange={(e) => setMessageTemplate(e.target.value)}>
              {messages.map(msg => (
                <option key={msg.message_id} value={msg.message_id}>{msg.message_text}</option>
              ))}
              <option value="custom">Custom message...</option>
            </select>
          </div>

          {messageTemplate === 'custom' && (
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Write your own message (max 100 characters)" 
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
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="send-btn" onClick={handleSubmit} disabled={loading || !!emailError || !opponentEmail}>
            {loading ? 'Sending...' : 'Send Challenge →'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .input-error {
          border-color: #FF4444 !important;
        }
        .error-text {
          color: #FF4444;
          font-size: 11px;
          margin-top: 4px;
        }
        .helper-text {
          color: var(--text-secondary);
          font-size: 10px;
          margin-top: 4px;
        }
        .challenge-info-box {
          background: var(--bg-primary);
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 16px;
          border: 1px solid var(--border-color);
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          padding: 4px 0;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
