// ============================================================================
// constants.js — Single source of truth for all configurable values
// Edit this file to change app behaviour without touching component code
// ============================================================================

// ── Quiz ─────────────────────────────────────────────────────────────────────
export const ROUND_SIZE        = 5;
export const SHARE_GATE_EVERY  = 200;

// ── Ads global ───────────────────────────────────────────────────────────────
export const SHOW_ADS          = true;
export const SHOW_POPOVER_AD   = false;
export const POPOVER_AD_URL    = 'https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469';
export const POPOVER_AD_SCRIPT = 'https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469.js';

// ── Publisher ad (Adsterra native banner) ────────────────────────────────────
// Paste your Adsterra native-banner script src URL here.
// Example: 'https://www.highperformanceformat.com/YOURKEY/invoke.js'
export const PUBLISHER_AD_ENABLED   = true;
export const PUBLISHER_AD_SCRIPT    = 'https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469.js';

// In Learn Mode: insert a publisher ad slot before every Nth subheading
export const AD_EVERY_NTH_SUBHEADING = 2;
// Hard ceiling on ad slots per learn page
export const MAX_ADS_PER_PAGE        = 3;

// ── Affiliate ads ─────────────────────────────────────────────────────────────
export const AFFILIATE_ADS_ENABLED = true;

// audiences: which exam types see this ad.
// Options: 'jamb' | 'postutme' | 'waec' | 'neco' | 'gst' | 'all'
// Leave empty [] to show to nobody; use ['all'] or omit to show to everyone.
export const AFFILIATE_ADS = [
  {
    id: 'aff_jamb_1',
    image: null,
    title: '📚 JAMB Masterclass Bundle',
    description: 'Premium offline study pack: 5,000+ questions, answer keys & video solutions.',
    link: 'https://elitescholars.site/shop',
    cta: 'Get It Now →',
    audiences: ['jamb', 'postutme'],
  },
  {
    id: 'aff_waec_1',
    image: null,
    title: '🏫 WAEC & NECO Prep Pack',
    description: 'Complete study materials: PDFs, past questions and model answers.',
    link: 'https://elitescholars.site/waec-pack',
    cta: 'Download Pack →',
    audiences: ['waec', 'neco'],
  },
  {
    id: 'aff_gst_1',
    image: null,
    title: '🎓 University GST Study Kit',
    description: 'Ace Use of English, Logic & Nigerian Studies. Written for 100-level students.',
    link: 'https://elitescholars.site/gst-kit',
    cta: 'Get the Kit →',
    audiences: ['gst'],
  },
  {
    id: 'aff_all_1',
    image: null,
    title: '🎯 Score 300+ Guarantee',
    description: '30-day intensive coaching programme. Limited spots!',
    link: 'https://elitescholars.site/coaching',
    cta: 'Join Now →',
    audiences: ['all'],
  },
];

// ── Custom (third) ad slot ────────────────────────────────────────────────────
export const CUSTOM_AD_ENABLED = false;
export const CUSTOM_AD = {
  image: null,
  title: 'EliteScholars Premium',
  description: 'No ads, unlimited practice, all subjects.',
  link: 'https://elitescholars.site/premium',
  cta: 'Upgrade Now',
  audiences: ['all'],
};

// ── Reminder schedule ─────────────────────────────────────────────────────────
// Add or remove hours (24h format) to set when daily reminders fire.
// Examples: 6 = 6 AM, 17 = 5 PM, 20 = 8 PM
// The SW will schedule a notification at each of these times every day.
export const REMINDER_TIMES = [6, 18]; // 6 AM and 6 PM

// ── Premium / Freemium ────────────────────────────────────────────────────────
// Free-tier limits (all editable here)
export const FREE_TOPICS_PER_DAY   = 2;    // max learn-mode topics per day
export const FREE_SESSION_MINUTES  = 30;   // max CBT/learn time per session (minutes)
export const FREE_COOLDOWN_HOURS   = 4;    // hours before they can continue after limit

// Premium pricing
export const PREMIUM_MONTHLY_PRICE = 9000;    // ₦9,000/month
export const PREMIUM_ANNUAL_PRICE  = 89000;   // ₦89,000/year

// Pro plan pricing (no annual option)
export const PRO_MONTHLY_PRICE     = 3000;    // ₦3,000/month
export const PAYMENT_URL_PRO       = 'https://selar.co/elitescholars-pro';

// Calculated discount
export const PREMIUM_ANNUAL_SAVINGS =
  PREMIUM_MONTHLY_PRICE * 12 - PREMIUM_ANNUAL_PRICE; // ₦19,000
export const PREMIUM_ANNUAL_DISCOUNT_PCT = Math.round(
  (PREMIUM_ANNUAL_SAVINGS / (PREMIUM_MONTHLY_PRICE * 12)) * 100
); // ~17.6% → 18%

// Payment — set to true to use real gateway when ready
export const USE_REAL_PAYMENT = false;
// When USE_REAL_PAYMENT is true, this URL is opened for checkout
export const PAYMENT_URL_MONTHLY = 'https://selar.co/elitescholars-monthly';
export const PAYMENT_URL_ANNUAL  = 'https://selar.co/elitescholars-annual';


// ── XP rewards ────────────────────────────────────────────────────────────────
export const XP_REWARDS = {
  perCorrectAnswer:    5,    // was 10 — reduced so quiz farming is slower
  perfectRound:       30,    // was 50
  perfectQuiz:        60,    // was 100
  ninetyPlusQuiz:     25,    // was 50
  topicCompleted:     40,    // was 75
  dailyLogin:         15,    // was 20
  streakBonus3:       25,    // was 30
  streakBonus7:       60,    // was 70
  streakBonus30:     150,    // was 200
  challengeWon:       70,    // was 80
  challengePlayed:    15,    // was 20
  speedBonus:         20,    // was 25
  firstQuizEver:      40,    // was 50
  shopVisit:           5,    // was 10
  shareApp:           20,    // was 30
  gameCompleted:      35,    // NEW — game mode completion
  gamePerfect:        80,    // NEW — perfect game round
  learnQuizPass:      30,    // NEW — pass learn-mode quiz 70%+
};

// ── Shop items ────────────────────────────────────────────────────────────────
export const SHOP_ITEMS = [
  {
    id: 'premium',
    title: '⭐ EliteScholars Premium',
    description: 'No ads · Unlimited topics · Unlimited sessions · All subjects unlocked',
    price: '₦9,000/mo',
    image: null,
    link: null,        // handled internally by PremiumModal
    category: 'Premium',
    isPremium: true,
  },
  {
    id: 'shop_1',
    title: '📝 JAMB Key Points',
    description: 'Condensed notes covering all JAMB topics.',
    price: '₦1,500',
    image: null,
    link: 'https://elitescholars.site/shop/jamb-key-points',
    category: 'Notes',
  },
  {
    id: 'shop_2',
    title: '📐 Maths Formula Sheet',
    description: 'All JAMB & WAEC maths formulas on one printable sheet.',
    price: '₦500',
    image: null,
    link: 'https://elitescholars.site/shop/maths-formula',
    category: 'Cheat Sheet',
  },
  {
    id: 'shop_3',
    title: '🎓 POST UTME Bundle',
    description: 'Past questions & answers for 11 top universities.',
    price: '₦2,000',
    image: null,
    link: 'https://elitescholars.site/shop/postutme',
    category: 'Bundle',
  },
  {
    id: 'shop_4',
    title: '🌍 WAEC Geography Notes',
    description: 'Complete geography notes with maps & diagrams.',
    price: '₦800',
    image: null,
    link: 'https://elitescholars.site/shop/geography',
    category: 'Notes',
  },
  {
    id: 'shop_5',
    title: '💡 Exam Success Blueprint',
    description: 'A proven study strategy guide for Nigerian students.',
    price: '₦1,000',
    image: null,
    link: 'https://elitescholars.site/shop/blueprint',
    category: 'Guide',
  },
];

// ── Links ─────────────────────────────────────────────────────────────────────
export const WA_GROUP   = 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t';
export const WA_CHANNEL = 'https://whatsapp.com/channel/0029Vb6wPv72kNFnjr4FMr24';
export const APP_URL    = 'https://elitescholars.site';
export const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxmY2qZ-5zexeOLdZba1U6k3Sl7czKLzC0PjW4jP1FSO4P_mMkSWN4fUmmCBPjt09YU/exec';

// ── Group chat links per exam type (use the JAMB link as the base for all) ───
export const GC_LINKS = {
  jamb:    { label: 'JAMB',     emoji: '📚', url: 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t' },
  waec:    { label: 'WAEC',     emoji: '📝', url: 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t' },
  neco:    { label: 'NECO',     emoji: '📋', url: 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t' },
  postutme:{ label: 'POST UTME',emoji: '🎓', url: 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t' },
  gst:     { label: 'GST',      emoji: '🏛️', url: 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t' },
};

// Which GCs are shown per student type and their selected exams
// senior_school: can see jamb + waec + neco (always) + postutme if selected
// university: can see gst (always) + jamb/waec/neco/postutme if selected
export function getStudentGCLinks(studentType, selectedExams = []) {
  const links = [];
  const add = (key) => { if (!links.find(l => l.key === key)) links.push({ key, ...GC_LINKS[key] }); };

  if (studentType === 'senior_school') {
    add('jamb'); add('waec'); add('neco');
    if (selectedExams.includes('postutme')) add('postutme');
  } else if (studentType === 'university') {
    add('gst');
    if (selectedExams.includes('jamb'))     add('jamb');
    if (selectedExams.includes('waec'))     add('waec');
    if (selectedExams.includes('neco'))     add('neco');
    if (selectedExams.includes('postutme')) add('postutme');
  } else {
    add('jamb');
  }
  return links;
}

// ── Exam types ────────────────────────────────────────────────────────────────
export const EXAM_TYPES = [
  { id: 'jamb',     label: 'JAMB',      icon: '📝', color: '#6C3FC9', desc: 'UTME' },
  { id: 'postutme', label: 'POST UTME', icon: '🎓', color: '#0369A1', desc: 'University' },
  { id: 'waec',     label: 'WAEC',      icon: '🏫', color: '#065F46', desc: 'Senior School' },
  { id: 'neco',     label: 'NECO',      icon: '📋', color: '#9A3412', desc: 'Senior School' },
  { id: 'gst',      label: 'GST',       icon: '🎓', color: '#7C3AED', desc: 'University' },
];

// ── Achievements ──────────────────────────────────────────────────────────────
export const ACHIEVEMENTS = {
  firstQuiz:        { id: 'firstQuiz',        name: '🌟 Beginner',           desc: 'Complete your first quiz',                   icon: '🌟' },
  fiveQuizzes:      { id: 'fiveQuizzes',       name: '📚 Getting Started',    desc: 'Complete 5 quizzes',                         icon: '📚' },
  tenQuizzes:       { id: 'tenQuizzes',        name: '🎓 Dedicated Learner',  desc: 'Complete 10 quizzes',                        icon: '🎓' },
  twentyQuizzes:    { id: 'twentyQuizzes',     name: '🏅 Quiz Veteran',       desc: 'Complete 20 quizzes',                        icon: '🏅' },
  fiftyQuizzes:     { id: 'fiftyQuizzes',      name: '🦁 Exam Warrior',       desc: 'Complete 50 quizzes',                        icon: '🦁' },
  hundredQuizzes:   { id: 'hundredQuizzes',    name: '💯 Century Scholar',    desc: 'Complete 100 quizzes',                       icon: '💯' },
  perfectScore:     { id: 'perfectScore',      name: '🎯 Perfect',            desc: 'Score 100% on a quiz',                       icon: '🎯' },
  threePerfects:    { id: 'threePerfects',     name: '✨ Hat-Trick',          desc: 'Score 100% three times',                     icon: '✨' },
  tenPerfects:      { id: 'tenPerfects',       name: '🏆 Flawless',           desc: 'Score 100% ten times',                       icon: '🏆' },
  ninetyPlus:       { id: 'ninetyPlus',        name: '⭐ Excellence',         desc: 'Score 90%+ on a quiz',                       icon: '⭐' },
  streak3:          { id: 'streak3',           name: '🔥 On a Roll',          desc: '3-day streak',                               icon: '🔥' },
  streak7:          { id: 'streak7',           name: '🔥 On Fire',            desc: '7-day streak',                               icon: '🔥' },
  streak14:         { id: 'streak14',          name: '🔥 Unstoppable',        desc: '14-day streak',                              icon: '🔥' },
  streak30:         { id: 'streak30',          name: '💪 Dedicated',          desc: '30-day streak',                              icon: '💪' },
  streak60:         { id: 'streak60',          name: '👑 Iron Will',          desc: '60-day streak',                              icon: '👑' },
  allSubjects:      { id: 'allSubjects',       name: '📖 Scholar',            desc: 'Attempt all 9 subjects',                     icon: '📖' },
  speedDemon:       { id: 'speedDemon',        name: '⚡ Speed Demon',        desc: 'Finish with 10+ secs left per question',      icon: '⚡' },
  nightOwl:         { id: 'nightOwl',          name: '🦉 Night Owl',          desc: 'Study after 10 PM',                          icon: '🦉' },
  earlyBird:        { id: 'earlyBird',         name: '🌅 Early Bird',         desc: 'Study before 7 AM',                          icon: '🌅' },
  learnMode:        { id: 'learnMode',         name: '📖 Curious Mind',       desc: 'Complete a full learn-mode topic',            icon: '📖' },
  tenTopics:        { id: 'tenTopics',         name: '🧠 Topic Master',       desc: 'Complete 10 learn-mode topics',               icon: '🧠' },
  twentyFiveTopics: { id: 'twentyFiveTopics',  name: '🔬 Deep Diver',         desc: 'Complete 25 learn-mode topics',               icon: '🔬' },
  mathematician:    { id: 'mathematician',     name: '🧮 Mathematician',      desc: 'Score 80%+ in Mathematics',                  icon: '🧮' },
  physicist:        { id: 'physicist',         name: '⚛️ Physicist',          desc: 'Score 80%+ in Physics',                      icon: '⚛️' },
  chemist:          { id: 'chemist',           name: '🧪 Chemist',            desc: 'Score 80%+ in Chemistry',                    icon: '🧪' },
  biologist:        { id: 'biologist',         name: '🔬 Biologist',          desc: 'Score 80%+ in Biology',                      icon: '🔬' },
  economist:        { id: 'economist',         name: '📊 Economist',          desc: 'Score 80%+ in Economics',                    icon: '📊' },
  accountant:       { id: 'accountant',        name: '💰 Accountant',         desc: 'Score 80%+ in Accounting',                   icon: '💰' },
  literatureLover:  { id: 'literatureLover',   name: '📖 Literature Lover',   desc: 'Score 80%+ in Literature',                   icon: '📖' },
  governmentGuru:   { id: 'governmentGuru',    name: '🏛️ Government Guru',    desc: 'Score 80%+ in Government',                   icon: '🏛️' },
  englishExpert:    { id: 'englishExpert',     name: '📝 English Expert',     desc: 'Score 80%+ in English',                      icon: '📝' },
  novelReader:      { id: 'novelReader',       name: '📗 Novel Reader',       desc: 'Score 80%+ in Novel',                        icon: '📗' },
  challengeWinner:  { id: 'challengeWinner',   name: '🏆 Challenge Winner',   desc: 'Win your first challenge',                   icon: '🏆' },
  challengeStreak3: { id: 'challengeStreak3',  name: '⚔️ Combo Fighter',      desc: 'Win 3 challenges in a row',                  icon: '⚔️' },
  shopShopper:      { id: 'shopShopper',       name: '🛍️ Shop Explorer',      desc: 'Visited the Shop',                           icon: '🛍️' },
  premiumMember:    { id: 'premiumMember',     name: '⭐ Premium Member',     desc: 'Subscribed to EliteScholars Premium',         icon: '⭐' },
  dailyLogin:       { id: 'dailyLogin',        name: '📅 Daily Player',       desc: 'Logged in 7 days in a row',                  icon: '📅' },
  gamePlayer:       { id: 'gamePlayer',        name: '🎮 Gamer Scholar',      desc: 'Complete your first game mode round',         icon: '🎮' },
  gamePerfect:      { id: 'gamePerfect',       name: '🕹️ Perfect Run',        desc: 'Complete a game round with 100%',             icon: '🕹️' },
  gameStreak5:      { id: 'gameStreak5',       name: '🎯 Game Streak',        desc: 'Win 5 game rounds in a row',                  icon: '🎯' },
  multiExam:        { id: 'multiExam',         name: '🌍 All-Rounder',        desc: 'Practice 3+ different exam types',            icon: '🌍' },
  levelUp5:         { id: 'levelUp5',          name: '📈 Rising Star',        desc: 'Reach Level 5',                              icon: '📈' },
  levelUp10:        { id: 'levelUp10',         name: '🚀 Level 10',           desc: 'Reach Level 10',                             icon: '🚀' },
  levelUp20:        { id: 'levelUp20',         name: '👑 Level 20',           desc: 'Reach Level 20',                             icon: '👑' },
  xp500:            { id: 'xp500',             name: '💎 500 XP',             desc: 'Earn 500 total XP',                          icon: '💎' },
  xp2000:           { id: 'xp2000',            name: '💎 2,000 XP',           desc: 'Earn 2,000 total XP',                        icon: '💎' },
  xp5000:           { id: 'xp5000',            name: '💎 5,000 XP',           desc: 'Earn 5,000 total XP',                        icon: '💎' },
  comeback:         { id: 'comeback',          name: '💥 Comeback Kid',       desc: 'Score 50%+ after two consecutive fails',      icon: '💥' },
  shareWarrior:     { id: 'shareWarrior',      name: '📣 Share Warrior',      desc: 'Share the app 3 times',                      icon: '📣' },
};

// ── Vibes ─────────────────────────────────────────────────────────────────────
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
  '💡 Use Learn Mode to master topics before CBT practice.',
  '💡 Boost your XP by maintaining daily streaks! Check your Profile.',
  '💡 Try all 5 exam types — JAMB, POST UTME, WAEC, NECO & GST!',
  '💡 Check the Shop tab for premium study materials! 🛍️',
  '💡 Use keyboard arrows ← → to navigate questions in a quiz!',
  '📚 Study Tip: Review your wrong answers — that is where marks hide.',
  '📚 Study Tip: 30 minutes daily beats 5 hours once a week.',
  '🎯 Exam Tip: Read every question twice before picking an answer.',
  '🎯 Exam Tip: Eliminate wrong options first — narrow it down!',
  '🏅 Win Tip: Players with 50+ quizzes score 40% higher on average.',
  '💡 Go Premium to remove all ads and unlock unlimited practice!',
];

// ── Timer helper ──────────────────────────────────────────────────────────────
export function getTimerSecs(subjectId, questionCount) {
  const calcSubjects = ['mathematics', 'physics', 'chemistry'];
  const secsPerQ = calcSubjects.includes(subjectId) ? 25 : 16;
  return questionCount * secsPerQ;
}

// ── Share message ─────────────────────────────────────────────────────────────
export const shareMsg = (name, subject, correct, totalQ) =>
  `${name} just scored ${correct}/${totalQ} in ${subject} on EliteScholars CBT! 🔥\n\nFree exam prep at ${APP_URL} — come try it!`;
