import React, { useState, useEffect } from 'react';
import {
  getPendingChallenges,
  getChallengeHistory,
  acceptChallenge,
  declineChallenge,
} from '../utils/challengeApi';
import CreateChallenge from './CreateChallenge';

export default function Challenges({ userEmail, userName }) {
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingChallenges, setPendingChallenges] = useState([]);
  const [history, setHistory] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userEmail) {
      loadChallenges();
    }
  }, [userEmail, activeTab]);

  const loadChallenges = async () => {
    setLoading(true);
    if (activeTab === 'pending') {
      const pending = await getPendingChallenges(userEmail);
      setPendingChallenges(pending);
    } else {
      const hist = await getChallengeHistory(userEmail);
      setHistory(hist);
    }
    setLoading(false);
  };

  const handleAccept = async (challengeId) => {
    const result = await acceptChallenge(challengeId, userEmail);
    if (result.success) {
      loadChallenges();
    }
  };

  const handleDecline = async (challengeId) => {
    const result = await declineChallenge(challengeId, userEmail);
    if (result.success) {
      loadChallenges();
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'pending') return <span className="badge-pending">⏳ Pending</span>;
    if (status === 'accepted') return <span className="badge-accepted">✅ Accepted</span>;
    if (status === 'completed') return <span className="badge-completed">🏆 Completed</span>;
    if (status === 'expired') return <span className="badge-expired">⏰ Expired</span>;
    return null;
  };

  return (
    <div className="challenges-page">
      <div className="challenges-header">
        <div className="challenges-title">⚔️ Challenges</div>
        <div className="challenges-subtitle">Challenge friends and climb the ranks</div>
        <button className="create-challenge-btn" onClick={() => setShowCreateModal(true)}>
          + New Challenge
        </button>
      </div>

      <div className="challenges-tabs">
        <button
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending ({pendingChallenges.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      {loading ? (
        <div className="challenges-loading">Loading challenges...</div>
      ) : (
        <div className="challenges-list">
          {activeTab === 'pending' && pendingChallenges.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🎯</div>
              <div>No pending challenges</div>
              <button className="empty-action" onClick={() => setShowCreateModal(true)}>
                Create one
              </button>
            </div>
          )}

          {activeTab === 'pending' &&
            pendingChallenges.map((challenge) => (
              <div key={challenge.challenge_id} className="challenge-card">
                <div className="challenge-header">
                  <div className="challenger-info">
                    <span className="challenger-name">{challenge.challenger_name}</span>
                    <span className="challenge-subject">{challenge.subject}</span>
                  </div>
                  {getStatusBadge(challenge.status)}
                </div>
                <div className="challenge-details">
                  <span>📚 10 questions</span>
                </div>
                <div className="challenge-message">
                  "{challenge.custom_message || challenge.message_text}"
                </div>
                <div className="challenge-actions">
                  <button
                    className="decline-btn"
                    onClick={() => handleDecline(challenge.challenge_id)}
                  >
                    Decline
                  </button>
                  <button
                    className="accept-btn"
                    onClick={() => handleAccept(challenge.challenge_id)}
                  >
                    Accept →
                  </button>
                </div>
              </div>
            ))}

          {activeTab === 'history' && history.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <div>No challenge history yet</div>
            </div>
          )}

          {activeTab === 'history' &&
            history.map((challenge) => (
              <div key={challenge.challenge_id} className="history-card">
                <div className="history-opponent">
                  {challenge.opponent_name || challenge.challenger_name}
                </div>
                <div
                  className={`history-result ${challenge.winner_email === userEmail ? 'win' : 'loss'}`}
                >
                  {challenge.winner_email === userEmail ? '🏆 Won' : '❌ Lost'}
                </div>
                <div className="history-score">
                  {challenge.challenger_score} - {challenge.opponent_score}
                </div>
                <div className="history-date">{challenge.completed_at?.split(' ')[0]}</div>
              </div>
            ))}
        </div>
      )}

      {showCreateModal && (
        <CreateChallenge
          userEmail={userEmail}
          userName={userName}
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            loadChallenges();
          }}
        />
      )}
    </div>
  );
}
