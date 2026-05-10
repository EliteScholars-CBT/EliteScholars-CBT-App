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
    const isChallenger = challenge.challenger_email?.toLowerCase() === userEmail?.toLowerCase();

    const myName  = userName || 'You';
    const oppName = isChallenger
      ? (challenge.opponent_name   || 'Opponent')
      : (challenge.challenger_name || 'Opponent');

    const myScore  = isChallenger
      ? (challenge.challenger_score ?? '?')
      : (challenge.opponent_score   ?? '?');

    const oppScore = isChallenger
      ? (challenge.opponent_score   ?? '?')
      : (challenge.challenger_score ?? '?');

    const status     = challenge.status;
    const winner     = challenge.winner_email;
    const isDraw     = winner === 'draw';
    const iWon       = !isDraw && winner === userEmail;
    const iLost      = !isDraw && winner && winner !== userEmail;
    const isPending  = status === 'pending';
    const isDeclined = status === 'declined';

    let resultIcon, resultText, resultColor;
    if (isPending)       { resultIcon = '⏳'; resultText = 'Awaiting';  resultColor = '#9090b0'; }
    else if (isDeclined) { resultIcon = '🚫'; resultText = 'Declined';  resultColor = '#ff5f57'; }
    else if (isDraw)     { resultIcon = '🤝'; resultText = 'Draw';      resultColor = '#ffbd2e'; }
    else if (iWon)       { resultIcon = '🏆'; resultText = 'You Won';   resultColor = '#28c840'; }
    else if (iLost)      { resultIcon = '❌'; resultText = 'You Lost';  resultColor = '#ff5f57'; }
    else                 { resultIcon = '—';  resultText = status;      resultColor = '#9090b0'; }

    const dateStr = challenge.completed_at || challenge.expires_at
      ? new Date(challenge.completed_at || challenge.expires_at)
          .toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
          })
      : '';

    const oppScoreDisplay = (isPending || isDeclined) ? '?' : oppScore;

    return (
      <div key={challenge.challenge_id} style={{
        background:   'linear-gradient(135deg, #1a0030, #2a0050)',
        border:       `1px solid ${resultColor}44`,
        borderRadius: 14,
        marginBottom: 12,
        overflow:     'hidden',
      }}>

        {/* Top bar */}
        <div style={{
          background:     `${resultColor}18`,
          borderBottom:   `1px solid ${resultColor}33`,
          padding:        '8px 14px',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 16 }}>{resultIcon}</span>
            <span style={{ color: resultColor, fontWeight: 700, fontSize: 12 }}>
              {resultText}
            </span>
            <span style={{ color: '#5a5a7a', fontSize: 11 }}>·</span>
            <span style={{
              color:         '#9090b0',
              fontSize:      11,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              {challenge.subject}
            </span>
          </div>
          <span style={{ color: '#5a5a7a', fontSize: 10 }}>{dateStr}</span>
        </div>

        {/* Scoreboard */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems:          'center',
          padding:             '16px 14px',
          gap:                 8,
        }}>

          {/* You */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize:   28,
              fontWeight: 900,
              color:      iWon ? '#28c840' : isDraw ? '#ffbd2e' : '#fff',
              lineHeight: 1,
            }}>
              {myScore}
            </div>
            <div style={{ color: '#9090b0', fontSize: 11, marginTop: 4 }}>
              {myName}
            </div>
            {iWon && (
              <div style={{ fontSize: 10, color: '#28c840', marginTop: 2 }}>
                WINNER
              </div>
            )}
          </div>

          {/* VS */}
          <div style={{
            color:      '#3a3a5a',
            fontSize:   13,
            fontWeight: 700,
            padding:    '0 8px',
          }}>
            VS
          </div>

          {/* Opponent */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize:   28,
              fontWeight: 900,
              color:      iLost ? '#ff5f57' : isDraw ? '#ffbd2e' : '#9090b0',
              lineHeight: 1,
            }}>
              {oppScoreDisplay}
            </div>
            <div style={{ color: '#9090b0', fontSize: 11, marginTop: 4 }}>
              {oppName}
            </div>
            {iLost && !isDraw && (
              <div style={{ fontSize: 10, color: '#ff5f57', marginTop: 2 }}>
                WINNER
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div style={{
          padding:        '6px 14px',
          borderTop:      '1px solid #1e1e3a',
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
        }}>
          <span style={{
            color:         '#5a5a7a',
            fontSize:      10,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            {challenge.exam_type || 'JAMB'}
          </span>
          <span style={{ color: '#5a5a7a', fontSize: 10 }}>
            {challenge.num_questions || 5} questions · {challenge.time_limit || 60}s each
          </span>
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
            [...history].reverse().map(renderHistoryCard)}

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