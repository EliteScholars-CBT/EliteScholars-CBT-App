import React, { lazy, Suspense, useState, useEffect } from 'react';
import Toast from './components/Toast';
import AchievementPopup from './components/AchievementPopup';
import ModeSelect from './components/ModeSelect';
import ExamTypeSelect from './components/ExamTypeSelect';
import UniversitySelect from './components/UniversitySelect';
import Flashcards from './components/Flashcards';
import BottomNav from './components/BottomNav';
import Leaderboard from './components/Leaderboard';
import Challenges from './components/Challenges';
import Shop from './components/Shop';
import {
  SHOW_ADS,
  SHOW_POPOVER_AD,
  SHARE_GATE_EVERY,
  ROUND_SIZE,
  getTimerSecs,
  ACHIEVEMENTS,
} from './utils/constants';
import {
  loadUser,
  loadStats,
  saveStats,
  saveUser,
  loadSubjectPerformance,
  saveSubjectPerformance,
  loadAchievements,
  saveAchievements,
} from './utils/storage';
import {
  trackEvent,
  trackSessionStart,
  trackSessionEnd,
  getDeviceInfo,
  fmtTimestamp,
} from './utils/analytics';
import { stopSpeech } from './utils/sounds';
import { calculateQuizXP, addXP } from './utils/xpManager';
import './styles/base.css';
import './styles/components.css';
import './styles/learn.css';
import './styles/quiz.css';
import './styles/result.css';
import './styles/shop.css';
import './styles/ads.css';
import './styles/theme.css';

// Lazy loaded pages
const Splash = lazy(() => import('./components/Splash'));
const Onboard = lazy(() => import('./components/Onboard'));
const Subjects = lazy(() => import('./components/Subjects'));
const Ready = lazy(() => import('./components/Ready'));
const Quiz = lazy(() => import('./components/Quiz'));
const Result = lazy(() => import('./components/Result'));
const Profile = lazy(() => import('./components/Profile'));
const WaecSubjects = lazy(() => import('./components/WaecSubjects'));
const WaecLearn = lazy(() => import('./components/WaecLearn'));
const ShareGate = lazy(() => import('./components/ShareGate'));
const AdGate = lazy(() => import('./components/AdGate'));

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-spinner" />
    <div className="loading-text">Loading…</div>
  </div>
);

// ============================================================================
// Check and award achievements after a quiz
// ============================================================================
const checkAndAwardAchievements = (
  userStats,
  email,
  currentAchievements,
  showToast,
  showAchievement,
  subjectPerformance
) => {
  const achievedIds = currentAchievements.map((a) => a?.id).filter(Boolean);
  const newIds = [];

  const check = (id, condition) => {
    if (!achievedIds.includes(id) && condition) newIds.push(id);
  };

  check('firstQuiz', userStats.totalQuizzes >= 1);
  check('fiveQuizzes', userStats.totalQuizzes >= 5);
  check('tenQuizzes', userStats.totalQuizzes >= 10);
  check('twentyQuizzes', userStats.totalQuizzes >= 20);
  check('fiftyQuizzes', userStats.totalQuizzes >= 50);
  check('perfectScore', userStats.perfectScores >= 1);
  check('threePerfects', userStats.perfectScores >= 3);
  check('ninetyPlus', userStats.ninetyPlusCount >= 1);
  check('streak3', userStats.streak >= 3);
  check('streak7', userStats.streak >= 7);
  check('streak30', userStats.streak >= 30);
  check('speedDemon', userStats.speedDemonCount >= 1);

  // Night owl / early bird based on current hour
  const h = new Date().getHours();
  check('nightOwl', h >= 22 || h < 1);
  check('earlyBird', h >= 5 && h < 7);

  // All subjects
  if (!achievedIds.includes('allSubjects')) {
    const attempted = Object.keys(subjectPerformance || {}).filter(
      (s) => subjectPerformance[s]?.total > 0
    ).length;
    if (attempted >= 9) newIds.push('allSubjects');
  }

  // Subject mastery
  const masteryMap = {
    mathematics: 'mathematician',
    physics: 'physicist',
    chemistry: 'chemist',
    biology: 'biologist',
    economics: 'economist',
    accounting: 'accountant',
    literature: 'literatureLover',
    government: 'governmentGuru',
    english: 'englishExpert',
    novel: 'novelReader',
  };
  Object.entries(masteryMap).forEach(([subj, key]) => {
    if (!achievedIds.includes(key)) {
      const perf = subjectPerformance?.[subj];
      if (perf && perf.bestScore >= 80) newIds.push(key);
    }
  });

  if (newIds.length > 0) {
    const objs = newIds.map((id) => ACHIEVEMENTS[id]).filter(Boolean);
    const updated = [...currentAchievements, ...objs];
    saveAchievements(updated, email);
    objs.forEach((a) => {
      showToast(`${a.name} unlocked!`, 'achievement');
      showAchievement(a);
    });
  }

  return newIds;
};

// ============================================================================
// App
// ============================================================================
export default function App() {
  const [screen, setScreen] = useState('splash');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('english');
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [totalQ, setTotalQ] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [allScores, setAllScores] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [fromResult, setFromResult] = useState(false);
  const [pendingSubject, setPendingSubject] = useState('english');
  const [streak, setStreak] = useState(1);
  const [lastDate, setLastDate] = useState('');
  const [adRefresh, setAdRefresh] = useState(0);
  const [showAdGate, setShowAdGate] = useState(false);
  const [adGateCallback, setAdGateCallback] = useState(null);
  const [totalSessionsForAd, setTotalSessionsForAd] = useState(0);

  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [achievementPopup, setAchievementPopup] = useState({ show: false, achievement: null });
  const [achievements, setAchievements] = useState([]);
  const [quizTimeRemaining, setQuizTimeRemaining] = useState(null);
  const [subjectPerformance, setSubjectPerformance] = useState({});
  const [studyMode, setStudyMode] = useState(null);
  const [flashcardSubject, setFlashcardSubject] = useState(null);
  const [examType, setExamType] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [waecSubject, setWaecSubject] = useState(null);
  const [waecMode, setWaecMode] = useState('cbt');
  const [questionLog, setQuestionLog] = useState([]);

  // Load user on mount
  useEffect(() => {
    const u = loadUser();
    if (u.name) {
      setName(u.name);
      setEmail(u.email || '');
      const s = loadStats(u.email);
      if (s.sessions) setSessions(s.sessions);
      if (s.allScores) setAllScores(s.allScores);
      if (s.bestScore) setBestScore(s.bestScore);
      if (s.streak) setStreak(s.streak);
      if (s.lastDate) setLastDate(s.lastDate);
      setSubjectPerformance(loadSubjectPerformance(u.email));
      setAchievements(loadAchievements(u.email));
    }
  }, []);

  // Session tracking
  useEffect(() => {
    if (name && email && !['splash', 'onboard'].includes(screen)) {
      if (!sessionStartTime) {
        setSessionStartTime(Date.now());
        trackSessionStart(email, name);
      }
    }
  }, [name, email, screen]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (sessionStartTime && email) {
        trackSessionEnd(email, Date.now() - sessionStartTime);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [sessionStartTime, email]);

  const showToast = (message, type = 'info') => setToast({ show: true, message, type });
  const showAchievement = (achievement) => setAchievementPopup({ show: true, achievement });
  const triggerAdRefresh = () => setAdRefresh((prev) => prev + 1);

  const updateSubjectPerformance = (subjectName, scoreCorrect, totalQuestions) => {
    const pct = (scoreCorrect / totalQuestions) * 100;
    const current = subjectPerformance[subjectName] || {
      bestScore: 0,
      averageScore: 0,
      total: 0,
      scores: [],
    };
    const newScores = [...(current.scores || []), pct];
    const newAverage = newScores.reduce((a, b) => a + b, 0) / newScores.length;
    const newBest = Math.max(current.bestScore || 0, pct);
    const updated = {
      ...subjectPerformance,
      [subjectName]: {
        bestScore: newBest,
        averageScore: newAverage,
        total: (current.total || 0) + 1,
        scores: newScores,
      },
    };
    setSubjectPerformance(updated);
    saveSubjectPerformance(updated, email);
  };

  const calcStreak = (currentStreak, lastDate) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (!lastDate) return 1;
    if (lastDate === today) return currentStreak;
    if (lastDate === yesterday) return currentStreak + 1;
    return 1;
  };

  const persist = (ns, nsc, nb, streak, lastDate) =>
    saveStats({ sessions: ns, allScores: nsc, bestScore: nb, streak, lastDate }, email);

  const goHome = () => {
    if (SHOW_ADS) triggerAdRefresh();
    stopSpeech();
    setStudyMode(null);
    setFlashcardSubject(null);
    setExamType(null);
    setSelectedUniversity(null);
    setScreen('examType');
  };

  const handleAdGateComplete = (callback) => {
    setTotalSessionsForAd(sessions + 1);
    setAdGateCallback(() => callback);
    setShowAdGate(true);
  };

  const handleAdGateUnlocked = () => {
    setShowAdGate(false);
    if (adGateCallback) {
      adGateCallback();
      setAdGateCallback(null);
    }
  };

  const handleSplash = () => {
    const u = loadUser();
    if (u.name) {
      setName(u.name);
      setEmail(u.email || '');
      const s = loadStats(u.email);
      if (s.sessions) setSessions(s.sessions);
      if (s.allScores) setAllScores(s.allScores);
      if (s.bestScore) setBestScore(s.bestScore);
      if (s.streak) setStreak(s.streak);
      if (s.lastDate) setLastDate(s.lastDate);
      setScreen('examType');
    } else {
      setScreen('onboard');
    }
  };

  const handleExamTypeSelect = (type) => {
    setExamType(type);
    if (type === 'postutme') setScreen('universitySelect');
    else if (type === 'waec' || type === 'neco') setScreen('waecSubjects');
    else setScreen('modeSelect');
  };

  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
    setScreen('modeSelect');
  };

  const handleBackToExamType = () => {
    setExamType(null);
    setSelectedUniversity(null);
    setScreen('examType');
  };

  const handleModeSelect = (mode) => {
    setStudyMode(mode);
    if (mode === 'cbt') setScreen('subjects');
    else if (mode === 'flashcard') setScreen('flashcardSubjects');
    else if (mode === 'learn') setScreen('waecLearn');
  };

  const handleFlashcardSubjectSelect = (subjectId) => {
    setFlashcardSubject(subjectId);
    setScreen('flashcards');
  };

  const handleBackToModeSelect = () => {
    setStudyMode(null);
    setFlashcardSubject(null);
    setScreen('modeSelect');
  };

  const startQuiz = (sel) => {
    if (SHOW_ADS) triggerAdRefresh();
    try {
      const pending = localStorage.getItem(`ep_sharepending_${email}`);
      if (pending && !SHOW_POPOVER_AD) {
        setPendingSubject(sel);
        setScreen('sharegate');
        return;
      }
    } catch {}
    setSubject(sel);
    setScore(0);
    setCorrect(0);
    setTotalQ(0);
    setRoundsPlayed(0);
    setUsedFiftyFifty(false);
    setUsedHint(false);
    setQuizTimeRemaining(null);
    setQuestionLog([]);
    trackEvent('quiz_start', {
      name,
      email,
      subject: sel,
      examType,
      university: selectedUniversity,
      timestamp2: fmtTimestamp(),
      ...getDeviceInfo(),
    });
    setScreen('ready');
  };

  const handleAllDone = (finalRoundsPlayed) => {
    const pct = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;

    const totalXPEarned = calculateQuizXP(
      correct,
      totalQ,
      quizTimeRemaining || 0,
      streak,
      usedFiftyFifty,
      usedHint
    );

    if (email && name && totalXPEarned > 0) {
      addXP(email, name, totalXPEarned, 'quiz_complete');
    }

    const ns = sessions + 1;
    const nsc = [...allScores, pct];
    const nb = Math.max(bestScore, score);
    const today = new Date().toDateString();
    const newStreak = calcStreak(streak, lastDate);

    const isPerfect = pct === 100;
    const isNinetyPlus = pct >= 90;

    updateSubjectPerformance(subject, correct, totalQ);
    setSessions(ns);
    setAllScores(nsc);
    setBestScore(nb);
    setStreak(newStreak);
    setLastDate(today);
    persist(ns, nsc, nb, newStreak, today);

    const perfectScoresCount = allScores.filter((s) => s === 100).length + (isPerfect ? 1 : 0);
    const ninetyPlusCount = allScores.filter((s) => s >= 90).length + (isNinetyPlus ? 1 : 0);

    checkAndAwardAchievements(
      {
        totalQuizzes: ns,
        perfectScores: perfectScoresCount,
        ninetyPlusCount,
        streak: newStreak,
        speedDemonCount: (quizTimeRemaining || 0) > 10 ? 1 : 0,
      },
      email,
      achievements,
      showToast,
      showAchievement,
      subjectPerformance
    );

    if (ns % SHARE_GATE_EVERY === 0 && !SHOW_POPOVER_AD) {
      try {
        localStorage.setItem(`ep_sharepending_${email}`, ns.toString());
      } catch {}
    }

    setRoundsPlayed(finalRoundsPlayed);

    if (isPerfect) showToast(`Perfect score! 🎯 ${correct}/${totalQ} correct!`, 'success');
    else if (isNinetyPlus) showToast(`Excellent! ${pct}% — keep up the great work! ⭐`, 'success');
    else if (pct >= 70) showToast(`Good job! ${pct}% — you're making progress! 📈`, 'success');
    else if (pct >= 50)
      showToast(`Not bad! ${pct}% — review the explanations to improve! 📚`, 'info');
    else showToast(`Keep practising! ${pct}% — every session counts! 💪`, 'warning');

    trackEvent('quiz_complete', {
      name,
      email,
      subject,
      score,
      correct,
      totalQ,
      pct: pct + '%',
      rounds: finalRoundsPlayed,
      totalSessions: ns,
      xpEarned: totalXPEarned,
      examType,
      university: selectedUniversity,
      timestamp2: fmtTimestamp(),
      date: new Date().toISOString(),
    });

    setScreen('result');
  };

  const handleNavigate = (newScreen) => {
    if (SHOW_ADS) triggerAdRefresh();
    stopSpeech();
    setScreen(newScreen);
  };

  const isLoggedIn = name && email;

  // Bottom nav is visible on these screens
  const NAV_SCREENS = new Set([
    'subjects',
    'flashcardSubjects',
    'leaderboard',
    'challenges',
    'profile',
    'shop',
    'waecSubjects',
    'modeSelect',
    'universitySelect',
  ]);
  const showBottomNav = isLoggedIn && NAV_SCREENS.has(screen);

  return (
    <>
      <div className="phone">
        <Suspense fallback={<LoadingScreen />}>
          {screen === 'splash' && <Splash onDone={handleSplash} />}

          {screen === 'onboard' && (
            <Onboard
              onDone={(n, e) => {
                setName(n);
                setEmail(e);
                const s = loadStats(e);
                if (s.sessions) setSessions(s.sessions);
                if (s.allScores) setAllScores(s.allScores);
                if (s.bestScore) setBestScore(s.bestScore);
                if (s.streak) setStreak(s.streak);
                if (s.lastDate) setLastDate(s.lastDate);
                setScreen('examType');
              }}
            />
          )}

          {screen === 'examType' && (
            <ExamTypeSelect
              onSelectExam={handleExamTypeSelect}
              onBack={() => setScreen('onboard')}
            />
          )}

          {screen === 'universitySelect' && (
            <UniversitySelect
              onSelectUniversity={handleUniversitySelect}
              onBack={handleBackToExamType}
            />
          )}

          {screen === 'modeSelect' && (
            <ModeSelect
              onSelectMode={handleModeSelect}
              onBack={
                examType === 'postutme' ? () => setScreen('universitySelect') : handleBackToExamType
              }
              examType={examType}
            />
          )}

          {screen === 'waecSubjects' && (
            <WaecSubjects
              name={name}
              mode={waecMode}
              examType={examType}
              onStart={(subjectId, mode) => {
                setWaecSubject(subjectId);
                setWaecMode(mode);
                if (mode === 'learn') {
                  setScreen('waecLearn');
                } else {
                  setSubject(subjectId);
                  setScore(0);
                  setCorrect(0);
                  setTotalQ(0);
                  setUsedFiftyFifty(false);
                  setUsedHint(false);
                  setQuestionLog([]);
                  setScreen('ready');
                }
              }}
              onBack={() => setScreen('examType')}
              onModeChange={(mode) => setWaecMode(mode)}
            />
          )}

          {screen === 'waecLearn' && (
            <WaecLearn
              subjectId={waecSubject}
              onBack={() => setScreen('waecSubjects')}
              onTopicComplete={(topicIdx) => {
                showToast('Topic completed! 📖', 'success');
                // Award learn mode achievement
                if (!achievements.some((a) => a?.id === 'learnMode')) {
                  const updated = [...achievements, ACHIEVEMENTS.learnMode];
                  setAchievements(updated);
                  saveAchievements(updated, email);
                  showAchievement(ACHIEVEMENTS.learnMode);
                }
              }}
            />
          )}

          {screen === 'subjects' && (
            <Subjects
              name={name}
              onStart={startQuiz}
              onProfile={() => setScreen('profile')}
              refreshTrigger={adRefresh}
              mode="cbt"
              examType={examType}
              university={selectedUniversity}
            />
          )}

          {screen === 'flashcardSubjects' && (
            <Subjects
              name={name}
              onStart={handleFlashcardSubjectSelect}
              onProfile={() => setScreen('profile')}
              refreshTrigger={adRefresh}
              mode="flashcard"
              examType={examType}
              university={selectedUniversity}
            />
          )}

          {screen === 'leaderboard' && <Leaderboard userEmail={email} userName={name} />}

          {screen === 'challenges' && <Challenges userEmail={email} userName={name} />}

          {screen === 'shop' && <Shop userEmail={email} onBack={() => setScreen('subjects')} />}

          {screen === 'profile' && (
            <Profile
              name={name}
              email={email}
              sessions={sessions}
              streak={streak}
              allScores={allScores}
              bestScore={bestScore}
              onBack={() => setScreen('subjects')}
              onSignOut={() => {
                stopSpeech();
                localStorage.removeItem('ep_user');
                setName('');
                setEmail('');
                setSessions(0);
                setAllScores([]);
                setBestScore(0);
                setStreak(1);
                setLastDate('');
                setScreen('onboard');
              }}
            />
          )}

          {screen === 'sharegate' && (
            <ShareGate
              name={name}
              email={email}
              onUnlocked={() => {
                setSubject(pendingSubject);
                setScore(0);
                setCorrect(0);
                setTotalQ(0);
                setRoundsPlayed(0);
                setUsedFiftyFifty(false);
                setUsedHint(false);
                setQuestionLog([]);
                trackEvent('quiz_start', {
                  name,
                  email,
                  subject: pendingSubject,
                  examType,
                  university: selectedUniversity,
                  timestamp2: fmtTimestamp(),
                  ...getDeviceInfo(),
                });
                setScreen('ready');
              }}
            />
          )}

          {screen === 'adgate' && (
            <AdGate
              name={name}
              email={email}
              totalSessions={totalSessionsForAd}
              onUnlocked={handleAdGateUnlocked}
            />
          )}

          {screen === 'ready' && (
            <Ready subjectId={subject} onGo={() => setScreen('quiz')} onBack={goHome} />
          )}

          {screen === 'quiz' && (
            <Quiz
              subjectId={subject}
              onAllDone={handleAllDone}
              setQuizTimeRemaining={setQuizTimeRemaining}
              score={score}
              setScore={setScore}
              correct={correct}
              setCorrect={setCorrect}
              totalQ={totalQ}
              setTotalQ={setTotalQ}
              onHome={goHome}
              triggerAdRefresh={triggerAdRefresh}
              adRefresh={adRefresh}
              email={email}
              name={name}
              onFiftyUsed={setUsedFiftyFifty}
              onHintUsed={setUsedHint}
              onLogQuestion={(entry) => setQuestionLog((l) => [...l, entry])}
              examType={examType}
            />
          )}

          {screen === 'result' && (
            <Result
              name={name}
              subjectId={subject}
              score={score}
              correct={correct}
              totalQ={totalQ}
              totalSessions={sessions}
              onHome={goHome}
              onProfile={() => {
                setFromResult(true);
                setScreen('profile');
              }}
              onAdGateComplete={handleAdGateComplete}
              questionLog={questionLog}
            />
          )}

          {screen === 'flashcards' && (
            <Flashcards subjectId={flashcardSubject} onBack={handleBackToModeSelect} />
          )}
        </Suspense>
      </div>

      {showBottomNav && (
        <BottomNav currentScreen={screen} onNavigate={handleNavigate} userEmail={email} />
      )}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'info' })}
        />
      )}

      {achievementPopup.show && achievementPopup.achievement && (
        <AchievementPopup
          achievement={achievementPopup.achievement}
          onClose={() => setAchievementPopup({ show: false, achievement: null })}
        />
      )}
    </>
  );
}
