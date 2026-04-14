// XP Manager - Handles XP calculations and storage
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

// Add XP to user
export const addXP = async (email, name, amount, reason = '') => {
  if (!email || amount === 0) return false;
  
  try {
    const response = await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'addXP',
        email: email,
        name: name,
        amount: amount,
        reason: reason,
      })
    });
    
    // Store in localStorage for immediate UI update
    const currentXP = localStorage.getItem(`xp_${email}`) || 0;
    localStorage.setItem(`xp_${email}`, parseInt(currentXP) + amount);
    
    return true;
  } catch (error) {
    console.error('Failed to add XP:', error);
    return false;
  }
};

// Get user XP data
export const getUserXP = async (email) => {
  try {
    const response = await fetch(`${SHEETS_URL}?action=getXP&email=${encodeURIComponent(email)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    // Fallback to localStorage
    const localXP = localStorage.getItem(`xp_${email}`) || 0;
    return {
      total_xp: parseInt(localXP),
      level: getLevelFromXP(parseInt(localXP)),
      xp_to_next: getXPToNextLevel(parseInt(localXP)),
    };
  }
};

// Calculate XP for quiz completion
export const calculateQuizXP = (correctCount, totalQuestions, timeRemaining, streakDays, usedFiftyFifty, usedHint) => {
  let totalXP = 0;
  const percentage = (correctCount / totalQuestions) * 100;
  
  // Base XP for correct answers
  totalXP += correctCount * XP_RULES.CORRECT_ANSWER;
  
  // Streak bonus
  const streakBonus = Math.min(streakDays * XP_RULES.STREAK_BONUS_PER_DAY, XP_RULES.MAX_STREAK_BONUS);
  totalXP += streakBonus;
  
  // Perfect round bonus
  if (correctCount === totalQuestions) {
    totalXP += XP_RULES.PERFECT_ROUND;
  }
  
  // Score bonuses
  if (percentage >= 90) {
    totalXP += XP_RULES.SCORE_90_PLUS;
  } else if (percentage >= 80) {
    totalXP += XP_RULES.SCORE_80_PLUS;
  }
  
  // Speed bonus (if finished with time left)
  if (timeRemaining > 10) {
    totalXP += XP_RULES.SPEED_BONUS;
  }
  
  // Penalties
  if (usedFiftyFifty) {
    totalXP += XP_RULES.PENALTY_FIFTY_FIFTY;
  }
  if (usedHint) {
    totalXP += XP_RULES.PENALTY_HINT;
  }
  
  return Math.max(totalXP, 0);
};
