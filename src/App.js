import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import Toast from './components/Toast';
import AchievementPopup from './components/AchievementPopup';
import AuthScreen from './components/AuthScreen';
import GameMode from './components/GameMode';
import ExamTypeSelect from './components/ExamTypeSelect';
import UniversitySelect from './components/UniversitySelect';
import Flashcards from './components/Flashcards';
import BottomNav from './components/BottomNav';
import Leaderboard from './components/Leaderboard';
import Challenges from './components/Challenges';
import Shop from './components/Shop';
import FreeLimitGate from './components/FreeLimitGate';
import {
  SHOW_ADS, SHOW_POPOVER_AD, SHARE_GATE_EVERY, ACHIEVEMENTS, XP_REWARDS, REMINDER_TIMES,
} from './utils/constants';
import {
  loadUser, loadStats, saveStats, saveUser,
  loadSubjectPerformance, saveSubjectPerformance,
  loadAchievements, saveAchievements,
} from './utils/storage';
import {
  trackEvent, trackSessionStart, trackSessionEnd, getDeviceInfo, fmtTimestamp,
} from './analytics/quizAnalytics';
import { stopSpeech } from './utils/sounds';
import {
  calculateQuizXP, addXP, awardDailyLoginXP, awardTopicXP,
} from './utils/xpManager';
import {
  isPremium, isSessionExpired, startSession, startCooldown,
  canUseTopic, incrementTopicsToday, resetSession,
} from './utils/premium';
import { registerSW, requestNotificationPermission, scheduleDailyReminder, listenForSWMessages } from './utils/notifications';
import { applySecurityMeasures } from './utils/security';
import './styles/base.css';
import './styles/components.css';
import './styles/learn.css';
import './styles/quiz.css';
import './styles/result.css';
import './styles/shop.css';
import './styles/ads.css';
import './styles/premium.css';
import './styles/theme.css';
import './styles/auth.css';

// Lazy loaded pages/components
const Splash    = lazy(() => import('./components/Splash'));
const Subjects  = lazy(() => import('./components/Subjects'));  // now handles ALL exam types
const Ready     = lazy(() => import('./components/Ready'));
const Quiz      = lazy(() => import('./components/Quiz'));
const Result    = lazy(() => import('./components/Result'));
const Profile   = lazy(() => import('./components/Profile'));
const Learn = lazy(() => import('./components/Learn')); // still used for learn screen
const ShareGate = lazy(() => import('./components/ShareGate'));
const AdGate    = lazy(() => import('./components/AdGate'));

import appLogo from './assets/elite-scholars-cbt-logo.png';

const LoadingScreen = () => (
  <div className="loading-screen" style={{ background: 'linear-gradient(160deg, #1a0030, #4B0082, #1a0030)' }}>
    <div className="loading-spinner" />
  </div>
);

// ── Achievement checker ───────────────────────────────────────────────────────
const checkAchievements = (userStats, email, current, showToast, showAch, subjPerf) => {
  const ids = current.map((a) => a?.id).filter(Boolean);
  const newIds = [];
  const add = (id, cond) => { if (!ids.includes(id) && cond) newIds.push(id); };

  add('firstQuiz',      userStats.totalQuizzes >= 1);
  add('fiveQuizzes',    userStats.totalQuizzes >= 5);
  add('tenQuizzes',     userStats.totalQuizzes >= 10);
  add('twentyQuizzes',  userStats.totalQuizzes >= 20);
  add('fiftyQuizzes',   userStats.totalQuizzes >= 50);
  add('perfectScore',   userStats.perfectScores >= 1);
  add('threePerfects',  userStats.perfectScores >= 3);
  add('ninetyPlus',     userStats.ninetyPlusCount >= 1);
  add('streak3',        userStats.streak >= 3);
  add('streak7',        userStats.streak >= 7);
  add('streak30',       userStats.streak >= 30);
  add('speedDemon',     userStats.speedDemonCount >= 1);

  const h = new Date().getHours();
  add('nightOwl',  h >= 22 || h < 1);
  add('earlyBird', h >= 5 && h < 7);

  if (!ids.includes('allSubjects')) {
    const attempted = Object.keys(subjPerf || {}).filter((s) => subjPerf[s]?.total > 0).length;
    if (attempted >= 9) newIds.push('allSubjects');
  }

  const masteryMap = {
    mathematics: 'mathematician', physics: 'physicist', chemistry: 'chemist',
    biology: 'biologist', economics: 'economist', accounting: 'accountant',
    literature: 'literatureLover', government: 'governmentGuru',
    english: 'englishExpert', novel: 'novelReader',
  };
  Object.entries(masteryMap).forEach(([subj, key]) => {
    if (!ids.includes(key) && (subjPerf?.[subj]?.bestScore || 0) >= 80) newIds.push(key);
  });

  if (newIds.length > 0) {
    const objs = newIds.map((id) => ACHIEVEMENTS[id]).filter(Boolean);
    const updated = [...current, ...objs];
    saveAchievements(updated, email);
    objs.forEach((a) => { showToast(`${a.name} unlocked!`, 'achievement'); showAch(a); });
  }
  return newIds;
};

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]               = useState('splash');
  const [name, setName]                   = useState('');
  const [email, setEmail]                 = useState('');
  const [studentType, setStudentType]     = useState('');
  const [selectedExams, setSelectedExams] = useState([]);
  const [subject, setSubject]             = useState('english');
  const [score, setScore]                 = useState(0);
  const [correct, setCorrect]             = useState(0);
  const [totalQ, setTotalQ]               = useState(0);
  const [sessions, setSessions]           = useState(0);
  const [allScores, setAllScores]         = useState([]);
  const [bestScore, setBestScore]         = useState(0);
  const [roundsPlayed, setRoundsPlayed]   = useState(0);
  const [pendingSubject, setPendingSubject] = useState('english');
  const [streak, setStreak]               = useState(1);
  const [lastDate, setLastDate]           = useState('');
  const [adRefresh, setAdRefresh]         = useState(0);
  const [showAdGate, setShowAdGate]       = useState(false);
  const [adGateCallback, setAdGateCallback] = useState(null);
  const [totalSessionsForAd, setTSFAd]   = useState(0);
  const [toast, setToast]                 = useState({ show: false, message: '', type: 'info' });
  const [achPopup, setAchPopup]           = useState({ show: false, achievement: null });
  const [achievements, setAchievements]   = useState([]);
  const [quizTimeLeft, setQuizTimeLeft]   = useState(null);
  const [subjPerf, setSubjPerf]           = useState({});
  const [examType, setExamType]           = useState(null);
  const [selectedUni, setSelectedUni]     = useState(null);
  const [sessionStart, setSessionStart]   = useState(null);
  const [usedFifty, setUsedFifty]         = useState(false);
  const [usedHint, setUsedHint]           = useState(false);
  const [learnSubject, setLearnSubject]   = useState(null);  // replaces Subject
  const [questionLog, setQuestionLog]     = useState([]);
  const [premiumUser, setPremiumUser]     = useState(false);
  const [showLimitGate, setShowLimitGate] = useState(false);
  const [limitReason, setLimitReason]     = useState('session');
  const [flashcardSubject, setFlashSub]   = useState(null);

  const showToast = (message, type = 'info') => setToast({ show: true, message, type });
  const showAch   = (achievement) => setAchPopup({ show: true, achievement });
  const triggerAdRefresh = () => setAdRefresh((p) => p + 1);

  // ── Startup ─────────────────────────────────────────────────────────────────
useEffect(() => {
  applySecurityMeasures();
  registerSW().then((reg) => {
    if (reg) {
      requestNotificationPermission().then((perm) => {
        if (perm === 'granted') {
          const u = loadUser();
          if (u.name) scheduleDailyReminder(REMINDER_TIMES, u.name);
        }
      });
    }
  });
  const unsub = listenForSWMessages((data) => {
    if (data.type === 'challenge') setScreen('challenges');
  });
  return unsub;
}, []);

// ── Session end tracking ─────────────────────────────────────────────────────
useEffect(() => {
  if (!email || !sessionStart) return;

  const handleEnd = () => {
    trackSessionEnd(email, Date.now() - sessionStart);
  };

  const handleVisibility = () => {
    if (document.visibilityState === 'hidden') handleEnd();
  };

  window.addEventListener('beforeunload', handleEnd);
  document.addEventListener('visibilitychange', handleVisibility);

  return () => {
    window.removeEventListener('beforeunload', handleEnd);
    document.removeEventListener('visibilitychange', handleVisibility);
  };
}, [email, sessionStart]);

  // ── Load user data ───────────────────────────────────────────────────────────
  const loadUserData = useCallback((u) => {
    setName(u.name);
    setEmail(u.email || '');
    setStudentType(u.studentType || '');
    setSelectedExams(u.selectedExams || []);
    setPremiumUser(isPremium(u.email));
    const s = loadStats(u.email);
    if (s.sessions)  setSessions(s.sessions);
    if (s.allScores) setAllScores(s.allScores);
    if (s.bestScore) setBestScore(s.bestScore);
    if (s.streak)    setStreak(s.streak);
    if (s.lastDate)  setLastDate(s.lastDate);
    setSubjPerf(loadSubjectPerformance(u.email));
    setAchievements(loadAchievements(u.email));
    awardDailyLoginXP(u.email, u.name);
    startSession(u.email);
    setSessionStart(Date.now());
    trackSessionStart(u.email, u.name);
  }, []);

  const handleSplash = () => {
    const u = loadUser();
    if (u.name && u.email) { loadUserData(u); setScreen('examType'); }
    else setScreen('onboard');
  };

  const handleOnboard = (userData) => {
    const n = userData.name;
    const e = userData.email;
    setName(n); setEmail(e);
    setStudentType(userData.studentType || '');
    setSelectedExams(userData.selectedExams || []);
    setPremiumUser(isPremium(e));
    const s = loadStats(e);
    if (s.sessions)  setSessions(s.sessions);
    if (s.allScores) setAllScores(s.allScores);
    if (s.bestScore) setBestScore(s.bestScore);
    if (s.streak)    setStreak(s.streak);
    if (s.lastDate)  setLastDate(s.lastDate);
    startSession(e);
    setSessionStart(Date.now());
    trackSessionStart(e, n);
    awardDailyLoginXP(e, n);
    saveUser({ name: n, email: e, studentType: userData.studentType, selectedExams: userData.selectedExams, firstName: userData.firstName, lastName: userData.lastName });
    setScreen('examType');
  };

  // ── Session expiry check ─────────────────────────────────────────────────────
  const checkSessionLimit = useCallback(() => {
    if (!email || premiumUser) return false;
    if (isSessionExpired(email)) {
      startCooldown(email);
      setLimitReason('session');
      setShowLimitGate(true);
      return true;
    }
    return false;
  }, [email, premiumUser]);

  // ── Navigation ───────────────────────────────────────────────────────────────
  const goHome = () => {
    if (SHOW_ADS) triggerAdRefresh();
    stopSpeech();
    setFlashSub(null);
    setExamType(null); setSelectedUni(null);
    setScreen('examType');
  };

  const handleExamTypeSelect = (type) => {
    setExamType(type);
    if (type === 'postutme') setScreen('universitySelect');
    else                     setScreen('subjects');
  };

  // ── CBT start ────────────────────────────────────────────────────────────────
  const startQuiz = (sel) => {
    if (checkSessionLimit()) return;
    if (SHOW_ADS) triggerAdRefresh();
    try {
      const pending = localStorage.getItem(`ep_sharepending_${email}`);
      if (pending && !SHOW_POPOVER_AD) { setPendingSubject(sel); setScreen('sharegate'); return; }
    } catch {}
    setSubject(sel);
    setScore(0); setCorrect(0); setTotalQ(0);
    setRoundsPlayed(0); setUsedFifty(false); setUsedHint(false);
    setQuestionLog([]);
    trackEvent('quiz_start', { name, email, subject: sel, examType, timestamp2: fmtTimestamp(), ...getDeviceInfo() });
    setScreen('ready');
  };

  // ── Learn start ───────────────────────────────────────────────────────────────
  const startLearn = (subjectId) => {
    if (!canUseTopic(email) && !premiumUser) {
      setLimitReason('topics'); setShowLimitGate(true); return;
    }
    setLearnSubject(subjectId);
    setScreen('learn');
  };

  // ── Flashcard start ───────────────────────────────────────────────────────────
  const startFlashcard = (subjectId) => {
    setFlashSub(subjectId);
    setScreen('flashcards');
  };

  // ── Quiz complete ─────────────────────────────────────────────────────────────
  const handleAllDone = (finalRounds) => {
    const pct = totalQ ? Math.round((correct / totalQ) * 100) : 0;
    const xp  = calculateQuizXP(correct, totalQ, quizTimeLeft || 0, streak, usedFifty, usedHint);
    if (email && name && xp > 0) addXP(email, name, xp, 'quiz_complete');

    const ns  = sessions + 1;
    const nsc = [...allScores, pct];
    const nb  = Math.max(bestScore, score);
    const today = new Date().toDateString();
    const yst   = new Date(Date.now() - 86400000).toDateString();
    const newStreak = !lastDate ? 1 : lastDate === today ? streak : lastDate === yst ? streak + 1 : 1;

    const perf      = subjPerf[subject] || { bestScore: 0, averageScore: 0, total: 0, scores: [] };
    const newScores = [...(perf.scores || []), pct];
    const newBest   = Math.max(perf.bestScore || 0, pct);
    const newAvg    = newScores.reduce((a, b) => a + b, 0) / newScores.length;
    const newPerf   = { ...subjPerf, [subject]: { bestScore: newBest, averageScore: newAvg, total: (perf.total || 0) + 1, scores: newScores } };
    setSubjPerf(newPerf);
    saveSubjectPerformance(newPerf, email);

    setSessions(ns); setAllScores(nsc); setBestScore(nb);
    setStreak(newStreak); setLastDate(today);
    saveStats({ sessions: ns, allScores: nsc, bestScore: nb, streak: newStreak, lastDate: today }, email);

    const perfectScores   = allScores.filter((s) => s === 100).length + (pct === 100 ? 1 : 0);
    const ninetyPlusCount = allScores.filter((s) => s >= 90).length  + (pct >= 90  ? 1 : 0);
    checkAchievements(
      { totalQuizzes: ns, perfectScores, ninetyPlusCount, streak: newStreak, speedDemonCount: (quizTimeLeft || 0) > 10 ? 1 : 0 },
      email, achievements, showToast, showAch, newPerf,
    );

    if (ns % SHARE_GATE_EVERY === 0 && !SHOW_POPOVER_AD) {
      try { localStorage.setItem(`ep_sharepending_${email}`, ns.toString()); } catch {}
    }

    if (pct === 100)     showToast('Perfect score! 🎯', 'success');
    else if (pct >= 90)  showToast(`Excellent! ${pct}% ⭐`, 'success');
    else if (pct >= 70)  showToast(`Good job! ${pct}% 📈`, 'success');
    else if (pct >= 50)  showToast(`Keep going! ${pct}% 💪`, 'info');
    else                 showToast('Review the explanations and try again! 📚', 'warning');

    trackEvent('quiz_complete', { name, email, subject, score, correct, totalQ, pct: pct + '%', rounds: finalRounds, ns, xpEarned: xp, examType, timestamp2: fmtTimestamp() });
    setRoundsPlayed(finalRounds);
    setScreen('result');
  };

  const handleNavigate = (newScreen) => {
    if (SHOW_ADS) triggerAdRefresh();
    stopSpeech();
    if (newScreen === 'subjects') setScreen('examType');
    else setScreen(newScreen);
  };

  const handlePremiumActivated = () => {
    setPremiumUser(true);
    resetSession(email);
    setShowLimitGate(false);
    showToast('⭐ Premium activated! Enjoy unlimited access.', 'success');
    const updated = [...achievements, ACHIEVEMENTS.premiumMember].filter(
      (a, i, arr) => arr.findIndex((x) => x?.id === a?.id) === i
    );
    setAchievements(updated);
    saveAchievements(updated, email);
    showAch(ACHIEVEMENTS.premiumMember);
  };

  const NAV_SCREENS = new Set([
    'subjects', 'leaderboard', 'challenges',
    'profile', 'shop', 'universitySelect', 'examType',
  ]);
  const showBottomNav = name && email && NAV_SCREENS.has(screen);

  return (
    <>
      <div className="phone">
        <div className="phone-content">
          <Suspense fallback={<LoadingScreen />}>

            {screen === 'splash' && <Splash onDone={handleSplash} />}

            {screen === 'onboard' && <AuthScreen onDone={handleOnboard} />}

            {screen === 'examType' && (
              <ExamTypeSelect onSelectExam={handleExamTypeSelect} onBack={() => {
                if (window.confirm('Log out of EliteScholars?')) {
                  localStorage.removeItem('ep_user');
                  setName(''); setEmail('');
                  setScreen('onboard');
                }
              }} />
            )}

            {screen === 'universitySelect' && (
              <UniversitySelect
                onSelectUniversity={(u) => { setSelectedUni(u); setScreen('subjects'); }}
                onBack={() => setScreen('examType')}
              />
            )}

            {/* ── Unified subjects screen — handles ALL exam types ── */}
            {screen === 'subjects' && (
              <Subjects
                name={name}
                examType={examType}
                university={selectedUni}
                email={email}
                premiumUser={premiumUser}
                refreshTrigger={adRefresh}
                onStartCBT={startQuiz}
                onStartLearn={startLearn}
                onStartFlashcard={startFlashcard}
                onStartGame={() => setScreen('game')}
                onProfile={() => setScreen('profile')}
                onBack={examType === 'postutme' ? () => setScreen('universitySelect') : null}
              />
            )}

            {/* ── Flashcards ── */}
            {screen === 'flashcards' && (
              <Flashcards
                subjectId={flashcardSubject}
                onBack={() => setScreen('subjects')}
              />
            )}

            {/* ── Learn mode (was Learn, now shared) ── */}
            {screen === 'learn' && (
              <Learn
                subjectId={learnSubject}
                onBack={() => setScreen('subjects')}
                examType={examType}
                email={email}
                onTopicComplete={() => {
                  incrementTopicsToday(email);
                  awardTopicXP(email, name);
                  showToast('Topic completed! +75 XP 📖', 'success');
                  if (!achievements.some((a) => a?.id === 'learnMode')) {
                    const updated = [...achievements, ACHIEVEMENTS.learnMode];
                    setAchievements(updated);
                    saveAchievements(updated, email);
                    showAch(ACHIEVEMENTS.learnMode);
                  }
                  if (!canUseTopic(email) && !premiumUser) {
                    setLimitReason('topics'); setShowLimitGate(true);
                  }
                }}
              />
            )}

            {screen === 'leaderboard' && <Leaderboard userEmail={email} userName={name} />}
            {screen === 'challenges'  && <Challenges  userEmail={email} userName={name} />}

            {screen === 'shop' && (
              <Shop
                userEmail={email} name={name}
                premiumUser={premiumUser}
                onPremiumActivated={handlePremiumActivated}
              />
            )}

            {screen === 'profile' && (
              <Profile
                name={name} email={email} sessions={sessions} streak={streak}
                allScores={allScores} bestScore={bestScore}
                premiumUser={premiumUser}
                onPremiumActivated={handlePremiumActivated}
                onBack={() => setScreen('subjects')}
                onSignOut={() => {
                  stopSpeech();
                  localStorage.removeItem('ep_user');
                  setName(''); setEmail(''); setSessions(0);
                  setAllScores([]); setBestScore(0); setStreak(1); setLastDate('');
                  setPremiumUser(false);
                  setScreen('onboard');
                }}
              />
            )}

            {screen === 'sharegate' && (
              <ShareGate name={name} email={email}
                onUnlocked={() => {
                  setSubject(pendingSubject);
                  setScore(0); setCorrect(0); setTotalQ(0);
                  setUsedFifty(false); setUsedHint(false); setQuestionLog([]);
                  trackEvent('quiz_start', { name, email, subject: pendingSubject, examType, timestamp2: fmtTimestamp(), ...getDeviceInfo() });
                  setScreen('ready');
                }}
              />
            )}

            {screen === 'adgate' && (
              <AdGate name={name} email={email} totalSessions={totalSessionsForAd}
                onUnlocked={() => { setShowAdGate(false); if (adGateCallback) { adGateCallback(); setAdGateCallback(null); } }}
              />
            )}

            {screen === 'ready' && (
              <Ready subjectId={subject} onGo={() => setScreen('quiz')} onBack={goHome} />
            )}

            {screen === 'quiz' && (
              <Quiz
                subjectId={subject} onAllDone={handleAllDone}
                setQuizTimeRemaining={setQuizTimeLeft}
                score={score}     setScore={setScore}
                correct={correct} setCorrect={setCorrect}
                totalQ={totalQ}   setTotalQ={setTotalQ}
                onHome={goHome}
                triggerAdRefresh={triggerAdRefresh} adRefresh={adRefresh}
                email={email} name={name} examType={examType}
                onFiftyUsed={setUsedFifty} onHintUsed={setUsedHint}
                onLogQuestion={(entry) => setQuestionLog((l) => [...l, entry])}
              />
            )}

            {screen === 'game' && (
              <GameMode onBack={() => setScreen('subjects')} email={email} name={name} />
            )}

            {screen === 'result' && (
              <Result
                name={name} subjectId={subject}
                score={score} correct={correct} totalQ={totalQ}
                totalSessions={sessions}
                onHome={goHome}
                onProfile={() => setScreen('profile')}
                onAdGateComplete={(cb) => { setTSFAd(sessions + 1); setAdGateCallback(() => cb); setShowAdGate(true); }}
                questionLog={questionLog}
                userEmail={email}
                studentType={studentType}
                selectedExams={selectedExams}
              />
            )}

          </Suspense>
        </div>
      </div>

      {showBottomNav && (
        <BottomNav currentScreen={screen} onNavigate={handleNavigate} userEmail={email} />
      )}

      {showLimitGate && (
        <FreeLimitGate
          email={email} name={name} reason={limitReason}
          onClose={() => setShowLimitGate(false)}
          onPremiumActivated={handlePremiumActivated}
        />
      )}

      {toast.show && (
        <Toast message={toast.message} type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'info' })} />
      )}
      {achPopup.show && achPopup.achievement && (
        <AchievementPopup achievement={achPopup.achievement}
          onClose={() => setAchPopup({ show: false, achievement: null })} />
      )}
    </>
  );
}