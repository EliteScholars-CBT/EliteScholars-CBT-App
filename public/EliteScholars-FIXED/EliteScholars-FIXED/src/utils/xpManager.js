// XP Manager - Handles XP calculations and API calls
// FIX: XP is calculated ONCE at quiz completion via calculateQuizXP()
//      and sent in a SINGLE addXP() call. Per-question XP calls are removed.
import { SHEETS_URL } from './constants';

// XP constants
export const XP_RULES = {
  CORRECT_ANSWER: 5,
  STREAK_BONUS_PER_DAY: 2,
  MAX_STREAK_BONUS: 20,
  PERFECT_ROUND: 50,
  SCORE_90_PLUS: 30,
  SCORE_80_PLUS: 15,
  SPEED_BONUS: 10,
  WIN_CHALLENGE: 50,
  DAILY_LOGIN: 10,
  PENALTY_FIFTY_FIFTY: -5,
  PENALTY_HINT: -3,
};

// Level calculation
export const getLevelFromXP = (totalXP) => {
  return Math.floor(totalXP / 100) + 1;
};

export const getXPToNextLevel = (totalXP) => {
  const currentLevel = getLevelFromXP(totalXP);
  const nextLevelXP = currentLevel * 100;
  return nextLevelXP - totalXP;
};

export const getProgressPercentage = (totalXP) => {
  const currentLevel = getLevelFromXP(totalXP);
  const currentLevelXP = (currentLevel - 1) * 100;
  const xpInCurrentLevel = totalXP - currentLevelXP;
  return (xpInCurrentLevel / 100) * 100;
};

// Calculate total XP for a completed quiz (call ONCE at quiz end)
// FIX: This is the single source of truth. Do NOT call addXP() per correct answer.
export const calculateQuizXP = (correctCount, totalQuestions, timeRemaining, streakDays, usedFiftyFifty, usedHint) => {
  let totalXP = 0;

  if (totalQuestions === 0) return 0;

  const percentage = (correctCount / totalQuestions) * 100;

  // Base XP for correct answers
  totalXP += correctCount * XP_RULES.CORRECT_ANSWER;

  // Streak bonus (capped at MAX_STREAK_BONUS)
  const streakBonus = Math.min((streakDays || 1) * XP_RULES.STREAK_BONUS_PER_DAY, XP_RULES.MAX_STREAK_BONUS);
  totalXP += streakBonus;

  // Perfect round bonus
  if (correctCount === totalQuestions) {
    totalXP += XP_RULES.PERFECT_ROUND;
  }

  // Score bonuses (mutually exclusive - only the higher tier applies)
  if (percentage >= 90) {
    totalXP += XP_RULES.SCORE_90_PLUS;
  } else if (percentage >= 80) {
    totalXP += XP_RULES.SCORE_80_PLUS;
  }

  // Speed bonus (finished with more than 10 seconds remaining)
  if ((timeRemaining || 0) > 10) {
    totalXP += XP_RULES.SPEED_BONUS;
  }

  // Lifeline penalties
  if (usedFiftyFifty) {
    totalXP += XP_RULES.PENALTY_FIFTY_FIFTY; // negative value
  }
  if (usedHint) {
    totalXP += XP_RULES.PENALTY_HINT; // negative value
  }

  return Math.max(totalXP, 0); // never go below 0
};

// Add XP to user via Apps Script - called ONCE per quiz completion
// FIX: Uses no-cors for POST (required by GAS), updates localStorage for immediate UI
export const addXP = async (email, name, amount, reason = '') => {
  if (!email || !name || amount <= 0) return false;

  try {
    const payload = {
      action: 'addXP',
      email: email,
      name: name,
      amount: amount,
      reason: reason,
    };

    // no-cors is required for Google Apps Script POST requests
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Update localStorage immediately for XPBar to reflect new value without waiting for API
    const currentXP = parseInt(localStorage.getItem(`xp_${email}`) || '0', 10);
    localStorage.setItem(`xp_${email}`, currentXP + amount);

    return true;
  } catch (error) {
    console.error('Failed to add XP:', error);
    return false;
  }
};

// Get user XP data from Apps Script (with localStorage fallback)
export const getUserXP = async (email) => {
  try {
    const response = await fetch(`${SHEETS_URL}?action=getXP&email=${encodeURIComponent(email)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    const localXP = parseInt(localStorage.getItem(`xp_${email}`) || '0', 10);
    return {
      total_xp: localXP,
      level: getLevelFromXP(localXP),
      xp_to_next: getXPToNextLevel(localXP),
    };
  }
};
