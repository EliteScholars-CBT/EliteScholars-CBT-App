import React, { useState, useEffect, useCallback } from 'react';
import {
  getPendingChallenges,
  getChallengeHistory,
  acceptChallenge,
  declineChallenge,
  submitChallengeScore,
  getChallengeMessages
} from '../utils/challengeApi';
import CreateChallenge from './CreateChallenge';
import Quiz from './Quiz';

export default function Challenges({ userEmail, userName }) {
  const [activeTab, setActiveTab]        = useState('pending');
  const [pendingChallenges, setPending]  = useState([]);
  const [history, setHistory]            = useState([]);
  const [messages, setMessages]          = useState([]);
  const [showCreateModal, setShowCreate] = useState(false);
  const [loading, setLoading]            = useState(true);

  // Playing state
  const [playingChallenge, setPlaying]   = useState(null);
  const [score, setScore]                = useState(0);
  const [correct, setCorrect]            = useState(0);
  const [totalQ, setTotalQ]              = useState(0);

  const loadChallenges = useCallback(async (silent = false) => {
    if (!userEmail) return;
    if (!silent) setLoading(true);
    try {
      if (activeTab === 'pending') {
        const pending = await getPendingChallenges(userEmail);
        setPending(Array.isArray(pending) ? pending : []);
      } else {
        const hist = await getChallengeHistory(userEmail);
        setHistory(Array.isArray(hist) ? hist : []);
      }
    } catch (err) {
      console.error('Failed to load challenges:', err);
    }
    setLoading(false);
  }, [userEmail, activeTab]);

  useEffect(() => {
    getChallengeMessages().then(setMessages);
  }, []);

  useEffect(() => {
    if (userEmail) loadChallenges(false);
  }, [loadChallenges]);

  // Poll every 20 seconds
  useEffect(() => {
    if (!userEmail) return;
    const interval = setInterval(() => loadChallenges(true), 20000);
    return () => clearInterval(interval);
  }, [loadChallenges]);

  // ── Accept ────────────────────────────────────────────────────────────────
  const handleAccept = async (challenge) => {
    await acceptChallenge(challenge.challenge_id, userEmail);
    setScore(0); setCorrect(0); setTotalQ(0);
    setPlaying(challenge);
  };

  const handleDecline = async (challengeId) => {
    await declineChallenge(challengeId, userEmail);
    loadChallenges(true);
  };

  // ── Quiz done ─────────────────────────────────────────────────────────────
  const handleQuizDone = async () => {
    if (!playingChallenge) return;
    await submitChallengeScore(
      playingChallenge.challenge_id,
      userEmail,
      correct,
      totalQ
    );
    setPlaying(null);
    loadChallenges(false);
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getMessageText = (challenge) => {
    if (challenge.custom_message) return challenge.custom_message;
    const found = messages.find(m => m.message_id === challenge.message_template);
    return found?.message_text || '';
  };

  const getStatusBadge = (status) => {
    if (status === 'pending')   return <span className="badge-pending">⏳ Pending</span>;
    if (status === 'accepted')  return <span className="badge-accepted">✅ Accepted</span>;
    if (status === 'completed') return <span className="badge-completed">🏆 Completed</span>;
    if (status === 'declined')  return <span className="badge-declined">🚫 Declined</span>;
    if (status === 'expired')   return <span className="badge-expired">⏰ Expired</span>;
    return null;
  };

  // ── History card — competition scoreboard style ────────────────────────────
  const renderHistoryCard = (challenge) => {
  const isChallenger =
    challenge.challenger_email?.toLowerCase() ===
    userEmail?.toLowerCase();

  const myName = userName || 'You';

  const oppName = isChallenger
    ? (challenge.opponent_name || 'Opponent')
    : (challenge.challenger_name || 'Opponent');

  const myScore = isChallenger
    ? (challenge.challenger_score ?? '?')
    : (challenge.opponent_score ?? '?');

  const oppScore = isChallenger
    ? (challenge.opponent_score ?? '?')
    : (challenge.challenger_score ?? '?');

  const status = (challenge.status || '').toLowerCase();

  const winner = challenge.winner_email;

  const isDraw = winner === 'draw';

  const iWon =
    !isDraw &&
    winner === userEmail;

  const iLost =
    !isDraw &&
    winner &&
    winner !== userEmail;

  const isPending = status === 'pending';
  const isDeclined = status === 'declined';
  const isExpired = status === 'expired';

  let resultIcon = '—';
  let resultText = status;
  let resultClass = 'neutral';

  if (isPending) {
    resultIcon = '⏳';
    resultText = 'Awaiting Opponent';
    resultClass = 'pending';
  } else if (isExpired) {
    resultIcon = '⏰';
    resultText = 'Expired';
    resultClass = 'expired';
  } else if (isDeclined) {
    resultIcon = '🚫';
    resultText = 'Declined';
    resultClass = 'declined';
  } else if (isDraw) {
    resultIcon = '🤝';
    resultText = 'Draw';
    resultClass = 'draw';
  } else if (iWon) {
    resultIcon = '🏆';
    resultText = 'Victory';
    resultClass = 'won';
  } else if (iLost) {
    resultIcon = '❌';
    resultText = 'Defeat';
    resultClass = 'lost';
  }

  const rawDate =
    challenge.completed_at ||
    challenge.expires_at ||
    challenge.created_at;

  const dateObj = rawDate
    ? new Date(rawDate)
    : null;

  const formattedDate = dateObj
    ? dateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : '--';

  const formattedTime = dateObj
    ? dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    : '--';

  const oppScoreDisplay =
    (isPending || isDeclined || isExpired)
      ? '?'
      : oppScore;

  return (
    <div
      key={challenge.challenge_id}
      className={`challenge-history-card ${resultClass}`}
    >

      {/* HEADER */}
      <div className="challenge-history-top">

        <div className="challenge-history-user">
          <div className="challenge-history-opponent">
            {oppName}
          </div>

          <div className="challenge-history-meta">
            <span>{challenge.subject}</span>
            <span>•</span>
            <span>{challenge.exam_type || 'JAMB'}</span>
          </div>
        </div>

        <div className={`history-status-badge ${resultClass}`}>
          <span>{resultIcon}</span>
          <span>{resultText}</span>
        </div>

      </div>

      {/* SCOREBOARD */}
      <div className="challenge-scoreboard">

        <div className="challenge-player-side">

          <div className={`
            challenge-score
            ${iWon ? 'winner-score' : ''}
            ${isDraw ? 'draw-score' : ''}
          `}>
            {myScore}
          </div>

          <div className="challenge-player-name">
            {myName}
          </div>

          {iWon && (
            <div className="winner-tag">
              WINNER
            </div>
          )}

        </div>

        <div className="challenge-vs">
          VS
        </div>

        <div className="challenge-player-side">

          <div className={`
            challenge-score
            ${iLost ? 'loser-score' : ''}
            ${isDraw ? 'draw-score' : ''}
          `}>
            {oppScoreDisplay}
          </div>

          <div className="challenge-player-name">
            {oppName}
          </div>

          {iLost && !isDraw && (
            <div className="winner-tag loser">
              WINNER
            </div>
          )}

        </div>

      </div>

      {/* FOOTER */}
      <div className="challenge-history-footer">

        <div className="challenge-history-date-wrap">
          <div className="challenge-history-date">
            {formattedDate}
          </div>

          <div className="challenge-history-time">
            {formattedTime}
          </div>
        </div>

        <div className="challenge-history-extra">
          <span>
            {challenge.num_questions || 5} Questions
          </span>

          <span>•</span>

          <span>
            {challenge.time_limit || 60}s each
          </span>
        </div>

      </div>

    </div>
  );
};

  // ── Playing screen ────────────────────────────────────────────────────────
  if (playingChallenge) {
    return (
      <div className="challenge-play-overlay">
        <div className="challenge-play-banner">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, padding: '12px 16px' }}>
            ⚔️ Challenge vs {playingChallenge.challenger_name} — Beat {playingChallenge.challenger_score || '?'} pts!
          </div>
        </div>
        <Quiz
          subjectId={playingChallenge.subject}
          onAllDone={handleQuizDone}
          setQuizTimeRemaining={() => {}}
          score={score}     setScore={setScore}
          correct={correct} setCorrect={setCorrect}
          totalQ={totalQ}   setTotalQ={setTotalQ}
          onHome={() => setPlaying(null)}
          triggerAdRefresh={() => {}} adRefresh={0}
          email={userEmail} name={userName}
          onFiftyUsed={() => {}} onHintUsed={() => {}}
          onLogQuestion={() => {}}
          isChallengeMode
          examType={playingChallenge.exam_type}
        />
      </div>
    );
  }

  // ── Main screen ───────────────────────────────────────────────────────────
  return (
    <div className="challenges-page">
      <div className="challenges-header">
        <div className="challenges-title">⚔️ Challenges</div>
        <div className="challenges-subtitle">Challenge friends and climb the ranks</div>
        <button className="create-challenge-btn" onClick={() => setShowCreate(true)}>
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

          {/* ── PENDING TAB ── */}
          {activeTab === 'pending' && pendingChallenges.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🎯</div>
              <div>No pending challenges</div>
              <button className="empty-action" onClick={() => setShowCreate(true)}>
                Create one
              </button>
            </div>
          )}

          {activeTab === 'pending' &&
            pendingChallenges.map((challenge) => {
              const isOpponent   = challenge.opponent_email?.toLowerCase()   === userEmail?.toLowerCase();
              const isChallenger = challenge.challenger_email?.toLowerCase() === userEmail?.toLowerCase();

              return (
                <div key={challenge.challenge_id} className="challenge-card">
                  <div className="challenge-header">
                    <div className="challenger-info">
                      <span className="challenger-name">
                        {isOpponent
                          ? `From: ${challenge.challenger_name}`
                          : `To: ${challenge.opponent_name}`}
                      </span>
                      <span className="challenge-subject">{challenge.subject}</span>
                    </div>
                    {getStatusBadge(challenge.status)}
                  </div>

                  <div className="challenge-details">
                    <span>📚 {challenge.num_questions || 10} questions</span>
                    <span>⏱️ {challenge.time_limit || 60}s per question</span>
                    {isChallenger && (
                      <span>
                        🎯 Your score:{' '}
                        {challenge.challenger_score != null && challenge.challenger_score !== ''
                          ? challenge.challenger_score
                          : '?'}
                      </span>
                    )}
                  </div>

                  {getMessageText(challenge) ? (
                    <div className="challenge-message">
                      "{getMessageText(challenge)}"
                    </div>
                  ) : null}

                  {/* Opponent — pending: Accept / Decline */}
                  {isOpponent && challenge.status === 'pending' && (
                    <div className="challenge-actions">
                      <button
                        className="decline-btn"
                        onClick={() => handleDecline(challenge.challenge_id)}
                      >
                        Decline
                      </button>
                      <button
                        className="accept-btn"
                        onClick={() => handleAccept(challenge)}
                      >
                        Accept & Play →
                      </button>
                    </div>
                  )}

                  {/* Opponent — accepted but not yet played */}
                  {isOpponent && challenge.status === 'accepted' && (
                    <div className="challenge-actions">
                      <button className="accept-btn" onClick={() => {
                        setScore(0); setCorrect(0); setTotalQ(0);
                        setPlaying(challenge);
                      }}>
                        ▶ Play Now
                      </button>
                    </div>
                  )}

                  {/* Challenger — waiting */}
                  {isChallenger && (
                    <div style={{
                      fontSize:   11,
                      color:      'var(--text-secondary)',
                      marginTop:  8,
                      fontStyle:  'italic',
                    }}>
                      Waiting for {challenge.opponent_name} to play...
                    </div>
                  )}
                </div>
              );
            })}

          {/* ── HISTORY TAB — latest first ── */}
          {activeTab === 'history' && history.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <div>No challenge history yet</div>
            </div>
          )}

          {activeTab === 'history' &&
            [...history].map(renderHistoryCard)}

        </div>
      )}

      {showCreateModal && (
        <CreateChallenge
          userEmail={userEmail}
          userName={userName}
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            loadChallenges(false);
          }}
        />
      )}
    </div>
  );
}