// challengeApi.js
// FIX (Issue 4): createChallenge, acceptChallenge, declineChallenge, submitChallengeScore
//   now use mode: 'no-cors' for POST calls (required by Google Apps Script).
//   Since no-cors gives opaque responses, we optimistically return { success: true }
//   after sending, just like addXP does. GET requests remain normal (they work fine).
import { SHEETS_URL } from './constants';

// Create a new challenge
// FIX: Added mode: 'no-cors'. Returns optimistic success after send.
export const createChallenge = async (
  challengerEmail, challengerName,
  opponentEmail, opponentName,
  examType, university, subject,
  numQuestions, timeLimit,
  messageTemplate, customMessage = null
) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'createChallenge',
        challenger_email: challengerEmail,
        challenger_name: challengerName,
        opponent_email: opponentEmail,
        opponent_name: opponentName || opponentEmail.split('@')[0],
        exam_type: examType,
        university: university || '',
        subject: subject,
        num_questions: numQuestions,
        time_limit: timeLimit,
        message_template: messageTemplate,
        custom_message: customMessage || '',
      }),
    });
    // no-cors returns an opaque response so we cannot read the body.
    // Apps Script will still process the request; we assume success here.
    return { success: true };
  } catch (error) {
    console.error('Failed to create challenge:', error);
    return { success: false, error: error.message };
  }
};

// Get pending challenges for a user (GET - works normally)
export const getPendingChallenges = async (email) => {
  try {
    const params = new URLSearchParams({
      action: 'getPendingChallenges',
      email: email,
    });
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to get pending challenges:', error);
    return [];
  }
};

// Get user's challenge history (GET - works normally)
export const getChallengeHistory = async (email) => {
  try {
    const params = new URLSearchParams({
      action: 'getChallengeHistory',
      email: email,
    });
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to get challenge history:', error);
    return [];
  }
};

// Accept a challenge (POST with no-cors)
export const acceptChallenge = async (challengeId, opponentEmail) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'acceptChallenge',
        challenge_id: challengeId,
        opponent_email: opponentEmail,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to accept challenge:', error);
    return { success: false };
  }
};

// Decline a challenge (POST with no-cors)
export const declineChallenge = async (challengeId, opponentEmail) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'declineChallenge',
        challenge_id: challengeId,
        opponent_email: opponentEmail,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to decline challenge:', error);
    return { success: false };
  }
};

// Submit challenge score (POST with no-cors)
export const submitChallengeScore = async (challengeId, email, score, timeSpent) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'submitChallengeScore',
        challenge_id: challengeId,
        email: email,
        score: score,
        time_spent: timeSpent,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to submit challenge score:', error);
    return { success: false };
  }
};

// Get challenge message templates (GET - works normally)
export const getChallengeMessages = async () => {
  try {
    const params = new URLSearchParams({ action: 'getChallengeMessages' });
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
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
