import React, { useState, useEffect } from 'react';
import { createChallenge, getChallengeMessages } from '../utils/challengeApi';
import { getAvailableUsers } from '../utils/leaderboardApi';

export default function CreateChallenge({ userEmail, userName, onClose, onCreated }) {
  const [opponentEmail, setOpponentEmail] = useState('');
  const [opponentName, setOpponentName] = useState('');
  const [examType, setExamType] = useState('jamb');
  const [university, setUniversity] = useState('');
  const [subject, setSubject] = useState('mathematics');
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(60);
  const [messageTemplate, setMessageTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const questionOptions = [5, 10, 20];
  const timeOptions = [30, 60, 90];
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

  useEffect(() => {
    loadMessages();
    loadUsers();
  }, []);

  const loadMessages = async () => {
    const msgs = await getChallengeMessages();
    setMessages(msgs);
    if (msgs.length > 0) setMessageTemplate(msgs[0].message_id);
  };

  const loadUsers = async () => {
    const usersList = await getAvailableUsers(userEmail);
    setUsers(usersList);
  };

  const handleSubmit = async () => {
    if (!opponentEmail) {
      alert('Please select an opponent');
      return;
    }

    setLoading(true);
    const result = await createChallenge(
      userEmail, userName,
      opponentEmail, opponentName,
      examType, university, subject,
      numQuestions, timeLimit,
      messageTemplate, customMessage
    );

    if (result.success) {
      onCreated();
    } else {
      alert('Failed to create challenge. Try again.');
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
            <label>Select Opponent</label>
            <select value={opponentEmail} onChange={(e) => {
              const selected = users.find(u => u.email === e.target.value);
              setOpponentEmail(selected?.email);
              setOpponentName(selected?.name);
            }}>
              <option value="">Choose a user...</option>
              {users.map(user => (
                <option key={user.email} value={user.email}>{user.name}</option>
              ))}
            </select>
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

          <div className="form-row">
            <div className="form-group">
              <label>Questions</label>
              <div className="radio-group">
                {questionOptions.map(q => (
                  <label key={q}>
                    <input type="radio" value={q} checked={numQuestions === q} onChange={(e) => setNumQuestions(parseInt(e.target.value))} />
                    {q}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Time Limit</label>
              <div className="radio-group">
                {timeOptions.map(t => (
                  <label key={t}>
                    <input type="radio" value={t} checked={timeLimit === t} onChange={(e) => setTimeLimit(parseInt(e.target.value))} />
                    {t}s
                  </label>
                ))}
              </div>
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
              <input type="text" placeholder="Write your own message..." value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} maxLength="100" />
            </div>
          )}

          {selectedMessage && messageTemplate !== 'custom' && (
            <div className="message-preview">"{selectedMessage.message_text}"</div>
          )}
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="send-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Sending...' : 'Send Challenge →'}
          </button>
        </div>
      </div>
    </div>
  );
}
