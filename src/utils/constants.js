// ============================================================================
// CONFIGURATION - EDIT THESE VALUES
// ============================================================================

export const ROUND_SIZE = 20;
export const SHARE_GATE_EVERY = 6;
export const SHOW_ADS = false;
export const SHOW_POPOVER_AD = false;
export const POPOVER_AD_SCRIPT = "https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469.js";
export const POPOVER_AD_URL = "https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469";

// ============================================================================
// CONSTANTS & LINKS
// ============================================================================

export const WA_GROUP = 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t';
export const WA_CHANNEL = 'https://whatsapp.com/channel/0029Vb6wPv72kNFnjr4FMr24';
export const APP_URL = 'https://elitescholars.site';
export const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwoVirYXx5sTn6BQAJTLICjSAKpyac1WMpLOAsBA19wV3F-r0iDyPScsvUDZd_KcYck/exec';


// ============================================================================
// ACHIEVEMENTS
// ============================================================================

export const ACHIEVEMENTS = {
  firstQuiz: { id: 'firstQuiz', name: "🌟 Beginner", desc: "Complete your first quiz", icon: "🌟", requirement: { type: 'totalQuizzes', value: 1 } },
  fiveQuizzes: { id: 'fiveQuizzes', name: "📚 Getting Started", desc: "Complete 5 quizzes", icon: "📚", requirement: { type: 'totalQuizzes', value: 5 } },
  tenQuizzes: { id: 'tenQuizzes', name: "🎓 Dedicated Learner", desc: "Complete 10 quizzes", icon: "🎓", requirement: { type: 'totalQuizzes', value: 10 } },
  perfectScore: { id: 'perfectScore', name: "🎯 Perfect", desc: "Score 100% on a quiz", icon: "🎯", requirement: { type: 'perfectScore', value: 1 } },
  ninetyPlus: { id: 'ninetyPlus', name: "⭐ Excellence", desc: "Score 90% or higher on a quiz", icon: "⭐", requirement: { type: 'ninetyPlus', value: 1 } },
  streak7: { id: 'streak7', name: "🔥 On Fire", desc: "7 day streak", icon: "🔥", requirement: { type: 'streak', value: 7 } },
  streak30: { id: 'streak30', name: "💪 Dedicated", desc: "30 day streak", icon: "💪", requirement: { type: 'streak', value: 30 } },
  allSubjects: { id: 'allSubjects', name: "📖 Scholar", desc: "Attempt all 9 subjects", icon: "📖", requirement: { type: 'subjectsAttempted', value: 9 } },
  speedDemon: { id: 'speedDemon', name: "⚡ Speed Demon", desc: "Finish a quiz with 10+ seconds left per question", icon: "⚡", requirement: { type: 'speedDemon', value: 1 } },
  mathematician: { id: 'mathematician', name: "🧮 Mathematician", desc: "Score 80%+ in Mathematics", icon: "🧮", requirement: { type: 'subjectMastery', subject: 'mathematics', value: 80 } },
  physicist: { id: 'physicist', name: "⚛️ Physicist", desc: "Score 80%+ in Physics", icon: "⚛️", requirement: { type: 'subjectMastery', subject: 'physics', value: 80 } },
  chemist: { id: 'chemist', name: "🧪 Chemist", desc: "Score 80%+ in Chemistry", icon: "🧪", requirement: { type: 'subjectMastery', subject: 'chemistry', value: 80 } },
  biologist: { id: 'biologist', name: "🔬 Biologist", desc: "Score 80%+ in Biology", icon: "🔬", requirement: { type: 'subjectMastery', subject: 'biology', value: 80 } },
  economist: { id: 'economist', name: "📊 Economist", desc: "Score 80%+ in Economics", icon: "📊", requirement: { type: 'subjectMastery', subject: 'economics', value: 80 } },
  accountant: { id: 'accountant', name: "💰 Accountant", desc: "Score 80%+ in Accounting", icon: "💰", requirement: { type: 'subjectMastery', subject: 'accounting', value: 80 } },
  literatureLover: { id: 'literatureLover', name: "📖 Literature Lover", desc: "Score 80%+ in Literature", icon: "📖", requirement: { type: 'subjectMastery', subject: 'literature', value: 80 } },
  governmentGuru: { id: 'governmentGuru', name: "🏛️ Government Guru", desc: "Score 80%+ in Government", icon: "🏛️", requirement: { type: 'subjectMastery', subject: 'government', value: 80 } },
  englishExpert: { id: 'englishExpert', name: "📝 English Expert", desc: "Score 80%+ in English", icon: "📝", requirement: { type: 'subjectMastery', subject: 'english', value: 80 } },
  novelReader: { id: 'novelReader', name: "📗 Novel Reader", desc: "Score 80%+ in The Lekki Headmaster", icon: "📗", requirement: { type: 'subjectMastery', subject: 'novel', value: 80 } },
  perfectWeek: { id: 'perfectWeek', name: "📅 Perfect Week", desc: "Complete a quiz every day for 7 days", icon: "📅", requirement: { type: 'perfectWeek', value: 1 } },
};

// ============================================================================
// TIMER FUNCTION
// ============================================================================

export function getTimerSecs(subjectId, questionCount) {
  const calcSubjects = ['mathematics', 'physics', 'chemistry'];
  const secsPerQ = calcSubjects.includes(subjectId) ? 25 : 16;
  return questionCount * secsPerQ;
}

// ============================================================================
// SHARE MESSAGE
// ============================================================================

export const shareMsg = (name, subject, correct, totalQ) =>
  `${name} just scored ${correct}/${totalQ} in ${subject} on EliteScholars CBT! 🔥\n\nI'm practising for JAMB free at ${APP_URL} — come try it!`;
