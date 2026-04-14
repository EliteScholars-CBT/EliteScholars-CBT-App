// Leaderboard API - Fetches rankings from Google Sheets
import { SHEETS_URL } from './constants';

// Fetch leaderboard data
export const getLeaderboard = async (type = 'alltime', examType = 'all', university = null, subject = null, limit = 50) => {
  try {
    const params = new URLSearchParams({
      action: 'getLeaderboard',
      type: type,
      exam_type: examType,
      university: university || '',
      subject: subject || '',
      limit: limit,
    });
    
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
};

// Get user's rank
export const getUserRank = async (email, type = 'alltime') => {
  try {
    const params = new URLSearchParams({
      action: 'getUserRank',
      email: email,
      type: type,
    });
    
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    return data.rank || 0;
  } catch (error) {
    console.error('Failed to get user rank:', error);
    return 0;
  }
};

// Get available users for challenges (exclude self)
export const getAvailableUsers = async (currentUserEmail) => {
  try {
    const params = new URLSearchParams({
      action: 'getAvailableUsers',
      current_email: currentUserEmail,
    });
    
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to get available users:', error);
    return [];
  }
};

// Update leaderboard after quiz
export const updateLeaderboardEntry = async (email, name, xpEarned, score, examType, university, subject) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'updateLeaderboard',
        email: email,
        name: name,
        xp_earned: xpEarned,
        score: score,
        exam_type: examType,
        university: university || '',
        subject: subject,
      })
    });
    return true;
  } catch (error) {
    console.error('Failed to update leaderboard:', error);
    return false;
  }
};
