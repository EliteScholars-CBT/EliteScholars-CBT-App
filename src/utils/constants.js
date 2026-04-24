// ============================================================================
// QUIZ CONFIGURATION
// ============================================================================

export const ROUND_SIZE = 5;
export const SHARE_GATE_EVERY = 200;
export const SHOW_ADS = true;
export const SHOW_POPOVER_AD = false;
export const POPOVER_AD_SCRIPT =
  'https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469.js';
export const POPOVER_AD_URL =
  'https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469';

// ============================================================================
// AD CONFIGURATION — edit from here
// ============================================================================

// Publisher ad (Adsterra) toggle
export const PUBLISHER_AD_ENABLED = true;

// In learn-mode, show a publisher ad slot before every Nth subheading.
// Set to 0 to disable in-content ads entirely.
export const AD_EVERY_NTH_SUBHEADING = 2;

// Hard ceiling on publisher ad slots per learn page
export const MAX_ADS_PER_PAGE = 3;

// Affiliate ads toggle
export const AFFILIATE_ADS_ENABLED = true;

// Affiliate ad items. image: null → auto-generate SVG placeholder.
export const AFFILIATE_ADS = [
  {
    id: 'aff_1',
    image: null,
    title: '📚 JAMB Masterclass Bundle',
    description: 'Premium offline study pack with 5,000+ questions, answer keys & video solutions.',
    link: 'https://elitescholars.site/shop',
    cta: 'Get It Now →',
  },
  {
    id: 'aff_2',
    image: null,
    title: '🎯 Score 300+ Guarantee',
    description: 'Join our 30-day intensive coaching programme. Limited spots available!',
    link: 'https://elitescholars.site/coaching',
    cta: 'Join Now →',
  },
  {
    id: 'aff_3',
    image: null,
    title: '📖 WAEC & NECO Prep Pack',
    description:
      'Complete study materials for WAEC & NECO. PDFs, past questions and model answers.',
    link: 'https://elitescholars.site/waec-pack',
    cta: 'Download Pack →',
  },
];

// Custom (third) ad slot toggle
export const CUSTOM_AD_ENABLED = false;
export const CUSTOM_AD = {
  image: null,
  title: 'EliteScholars Premium',
  description: 'Unlock unlimited practice, no ads, and priority support.',
  link: 'https://elitescholars.site/premium',
  cta: 'Upgrade Now',
};

// ============================================================================
// SHOP ITEMS
// ============================================================================

export const SHOP_ITEMS = [
  {
    id: 'shop_1',
    title: '📝 JAMB Key Points',
    description:
      'Condensed notes covering all JAMB topics — English, Maths, Physics, Chemistry, Biology, Economics.',
    price: '₦1,500',
    image: null,
    link: 'https://elitescholars.site/shop/jamb-key-points',
    category: 'Notes',
  },
  {
    id: 'shop_2',
    title: '📐 Mathematics Formula Sheet',
    description: 'All JAMB & WAEC maths formulas on one printable sheet.',
    price: '₦500',
    image: null,
    link: 'https://elitescholars.site/shop/maths-formula',
    category: 'Cheat Sheet',
  },
  {
    id: 'shop_3',
    title: '🎓 POST UTME Bundle',
    description:
      'Past questions and answers for 11 top universities. Updated for the latest session.',
    price: '₦2,000',
    image: null,
    link: 'https://elitescholars.site/shop/postutme',
    category: 'Bundle',
  },
  {
    id: 'shop_4',
    title: '🌍 WAEC Geography Notes',
    description: 'Complete geography study notes with maps, diagrams and practice questions.',
    price: '₦800',
    image: null,
    link: 'https://elitescholars.site/shop/geography',
    category: 'Notes',
  },
  {
    id: 'shop_5',
    title: '💡 Exam Success Blueprint',
    description:
      'A proven study strategy guide for Nigerian students. How to prepare, memorise and pass.',
    price: '₦1,000',
    image: null,
    link: 'https://elitescholars.site/shop/blueprint',
    category: 'Guide',
  },
];

// ============================================================================
// CONSTANTS & LINKS
// ============================================================================

export const WA_GROUP = 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t';
export const WA_CHANNEL = 'https://whatsapp.com/channel/0029Vb6wPv72kNFnjr4FMr24';
export const APP_URL = 'https://elitescholars.site';
export const SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbxmY2qZ-5zexeOLdZba1U6k3Sl7czKLzC0PjW4jP1FSO4P_mMkSWN4fUmmCBPjt09YU/exec';

// ============================================================================
// EXAM TYPES
// ============================================================================

export const EXAM_TYPES = [
  { id: 'jamb', label: 'JAMB', icon: '📝', color: '#6C3FC9', desc: 'UTME' },
  { id: 'postutme', label: 'POST UTME', icon: '🎓', color: '#0369A1', desc: 'University' },
  { id: 'waec', label: 'WAEC', icon: '🏫', color: '#065F46', desc: 'Senior School' },
  { id: 'neco', label: 'NECO', icon: '📋', color: '#9A3412', desc: 'Senior School' },
  { id: 'gst', label: 'GST', icon: '🎓', color: '#7C3AED', desc: 'University' },
];

// ============================================================================
// ACHIEVEMENTS
// ============================================================================

export const ACHIEVEMENTS = {
  firstQuiz: { id: 'firstQuiz', name: '🌟 Beginner', desc: 'Complete your first quiz', icon: '🌟' },
  fiveQuizzes: {
    id: 'fiveQuizzes',
    name: '📚 Getting Started',
    desc: 'Complete 5 quizzes',
    icon: '📚',
  },
  tenQuizzes: {
    id: 'tenQuizzes',
    name: '🎓 Dedicated Learner',
    desc: 'Complete 10 quizzes',
    icon: '🎓',
  },
  twentyQuizzes: {
    id: 'twentyQuizzes',
    name: '🏅 Quiz Veteran',
    desc: 'Complete 20 quizzes',
    icon: '🏅',
  },
  fiftyQuizzes: {
    id: 'fiftyQuizzes',
    name: '🦁 Exam Warrior',
    desc: 'Complete 50 quizzes',
    icon: '🦁',
  },
  perfectScore: {
    id: 'perfectScore',
    name: '🎯 Perfect',
    desc: 'Score 100% on a quiz',
    icon: '🎯',
  },
  threePerfects: {
    id: 'threePerfects',
    name: '✨ Hat-Trick',
    desc: 'Score 100% three times',
    icon: '✨',
  },
  ninetyPlus: { id: 'ninetyPlus', name: '⭐ Excellence', desc: 'Score 90%+ on a quiz', icon: '⭐' },
  streak3: { id: 'streak3', name: '🔥 On a Roll', desc: '3-day streak', icon: '🔥' },
  streak7: { id: 'streak7', name: '🔥 On Fire', desc: '7-day streak', icon: '🔥' },
  streak30: { id: 'streak30', name: '💪 Dedicated', desc: '30-day streak', icon: '💪' },
  allSubjects: {
    id: 'allSubjects',
    name: '📖 Scholar',
    desc: 'Attempt all 9 subjects',
    icon: '📖',
  },
  speedDemon: {
    id: 'speedDemon',
    name: '⚡ Speed Demon',
    desc: 'Finish with 10+ seconds left per question',
    icon: '⚡',
  },
  nightOwl: { id: 'nightOwl', name: '🦉 Night Owl', desc: 'Study after 10 PM', icon: '🦉' },
  earlyBird: { id: 'earlyBird', name: '🌅 Early Bird', desc: 'Study before 7 AM', icon: '🌅' },
  learnMode: {
    id: 'learnMode',
    name: '📖 Curious Mind',
    desc: 'Complete a full learn-mode topic',
    icon: '📖',
  },
  mathematician: {
    id: 'mathematician',
    name: '🧮 Mathematician',
    desc: 'Score 80%+ in Mathematics',
    icon: '🧮',
  },
  physicist: { id: 'physicist', name: '⚛️ Physicist', desc: 'Score 80%+ in Physics', icon: '⚛️' },
  chemist: { id: 'chemist', name: '🧪 Chemist', desc: 'Score 80%+ in Chemistry', icon: '🧪' },
  biologist: { id: 'biologist', name: '🔬 Biologist', desc: 'Score 80%+ in Biology', icon: '🔬' },
  economist: { id: 'economist', name: '📊 Economist', desc: 'Score 80%+ in Economics', icon: '📊' },
  accountant: {
    id: 'accountant',
    name: '💰 Accountant',
    desc: 'Score 80%+ in Accounting',
    icon: '💰',
  },
  literatureLover: {
    id: 'literatureLover',
    name: '📖 Literature Lover',
    desc: 'Score 80%+ in Literature',
    icon: '📖',
  },
  governmentGuru: {
    id: 'governmentGuru',
    name: '🏛️ Government Guru',
    desc: 'Score 80%+ in Government',
    icon: '🏛️',
  },
  englishExpert: {
    id: 'englishExpert',
    name: '📝 English Expert',
    desc: 'Score 80%+ in English',
    icon: '📝',
  },
  novelReader: {
    id: 'novelReader',
    name: '📗 Novel Reader',
    desc: 'Score 80%+ in The Lekki Headmaster',
    icon: '📗',
  },
  challengeWinner: {
    id: 'challengeWinner',
    name: '🏆 Challenge Winner',
    desc: 'Win your first challenge',
    icon: '🏆',
  },
  shopShopper: {
    id: 'shopShopper',
    name: '🛍️ Shop Explorer',
    desc: 'Visited the Shop tab',
    icon: '🛍️',
  },
};

// ============================================================================
// VIBES — shown on high scores and share gate
// ============================================================================

export const VIBES = [
  'Your brain is literally built different! 🧠',
  'Every question moves you closer to your dream school. 🎓',
  'This is what serious exam candidates look like! 🔥',
  "You're not just studying — you're dominating! 💪",
  "300+ is not a dream, it's a plan. Keep going! 📈",
  "The exam hall has no idea what's coming. 😤",
  'You studied, you practiced, you conquered! 🏆',
  'Your consistency is your superpower! ⚡',
  '💡 Did you know? You can challenge a friend in the Challenges tab!',
  '💡 Tip: Use Learn Mode to master topics before CBT practice.',
  '💡 Boost your XP by maintaining daily streaks! Check your Profile.',
  '💡 Try all 5 exam types — JAMB, POST UTME, WAEC, NECO & GST!',
  '💡 Check the Shop tab for premium study materials! 🛍️',
  '💡 Use keyboard arrows to navigate questions during a quiz!',
  "📚 Study Tip: Review your wrong answers — that's where marks hide.",
  '📚 Study Tip: 30 minutes daily beats 5 hours once a week.',
  '🎯 Exam Tip: Read every question twice before picking an answer.',
  '🎯 Exam Tip: Eliminate wrong options first — narrow it down!',
  '🏅 Win Tip: Players with 50+ quizzes score 40% higher on average.',
];

// ============================================================================
// TIMER FUNCTION
// ============================================================================

export function getTimerSecs(subjectId, questionCount) {
  const calcSubjects = ['mathematics', 'physics', 'chemistry'];
  const secsPerQ = calcSubjects.includes(subjectId) ? 25 : 16;
  return questionCount * secsPerQ;
}

// ============================================================================
// SHARE MESSAGE — generalised for all exam types
// ============================================================================

export const shareMsg = (name, subject, correct, totalQ) =>
  `${name} just scored ${correct}/${totalQ} in ${subject} on EliteScholars CBT! 🔥\n\nFree exam prep at ${APP_URL} — come try it!`;
