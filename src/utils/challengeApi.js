import { SHEETS_URL } from './constants';

// ── Check if a user exists by email ──────────────────────────────────────────
export const checkUserExists = async (email) => {
  try {
    const params = new URLSearchParams({
      action: 'getProfile',
      email:  email.toLowerCase().trim(),
    });
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data     = await response.json();
    return {
      exists:    data?.success === true,
      firstName: data?.profile?.firstName || '',
      lastName:  data?.profile?.lastName  || '',
    };
  } catch (error) {
    console.error('Failed to check user:', error);
    return { exists: false, firstName: '', lastName: '' };
  }
};

// Create a new challenge
export const createChallenge = async (
  challengerEmail,
  challengerName,
  opponentEmail,
  opponentName,
  examType,
  university,
  subject,
  numQuestions,
  timeLimit,
  messageTemplate,
  customMessage = null,
  challengerScore = 0,
  challengerCorrect = 0,
  challengerTotal = 0
) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action:             'createChallenge',
        challenger_email:   challengerEmail,
        challenger_name:    challengerName,
        opponent_email:     opponentEmail,
        opponent_name:      opponentName || opponentEmail.split('@')[0],
        exam_type:          examType,
        university:         university || '',
        subject:            subject,
        num_questions:      numQuestions,
        time_limit:         timeLimit,
        message_template:   messageTemplate,
        custom_message:     customMessage || '',
        challenger_score:   challengerScore,
        challenger_correct: challengerCorrect,
        challenger_total:   challengerTotal,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to create challenge:', error);
    return { success: false, error: error.message };
  }
};

// Get pending challenges for a user
export const getPendingChallenges = async (email) => {
  try {
    const params = new URLSearchParams({
      action: 'getPendingChallenges',
      email:  email,
    });
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data     = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to get pending challenges:', error);
    return [];
  }
};

// Get user's challenge history
export const getChallengeHistory = async (email) => {
  try {
    const params = new URLSearchParams({
      action: 'getChallengeHistory',
      email:  email,
    });
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data     = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to get challenge history:', error);
    return [];
  }
};

// Accept a challenge
export const acceptChallenge = async (challengeId, opponentEmail) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode:   'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action:         'acceptChallenge',
        challenge_id:   challengeId,
        opponent_email: opponentEmail,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to accept challenge:', error);
    return { success: false };
  }
};

// Decline a challenge
export const declineChallenge = async (challengeId, opponentEmail) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode:   'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action:         'declineChallenge',
        challenge_id:   challengeId,
        opponent_email: opponentEmail,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to decline challenge:', error);
    return { success: false };
  }
};

// Submit challenge score
export const submitChallengeScore = async (challengeId, email, score, timeSpent) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode:   'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action:       'submitChallengeScore',
        challenge_id: challengeId,
        email:        email,
        score:        score,
        time_spent:   timeSpent,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to submit challenge score:', error);
    return { success: false };
  }
};

// Get challenge message templates
export const getChallengeMessages = async () => {
  try {
    const params   = new URLSearchParams({ action: 'getChallengeMessages' });
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data     = await response.json();
    return Array.isArray(data) ? data : defaultMessages();
  } catch (error) {
    console.error('Failed to get challenge messages:', error);
    return defaultMessages();
  }
};

function defaultMessages() {
  return [
    { message_id: 'msg_001', category: 'friendly',     message_text: 'Think you can beat me? 😊' },
    { message_id: 'msg_002', category: 'competitive',  message_text: "I'm coming for your spot on the leaderboard! 👑" },
    { message_id: 'msg_003', category: 'funny',        message_text: "Prepare to lose... or maybe win? Let's play! 🎮" },
    { message_id: 'msg_004', category: 'motivational', message_text: "Let's help each other improve! Best score wins! 💪" },
    { message_id: 'msg_005', category: 'trash_talk',   message_text: "You're going down! Hope you've been studying 😤" },
    { message_id: 'msg_006', category: 'rematch',      message_text: 'Round 2? I want revenge! 🔥' },
    { message_id: 'msg_007', category: 'daily',        message_text: 'Daily challenge time! Beat my score! 📅' },
    { message_id: 'msg_008', category: 'weekend',      message_text: 'Weekend quiz battle! Winner buys lunch? 🍕' },
  ];
}