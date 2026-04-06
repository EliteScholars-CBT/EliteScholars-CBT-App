import React, { lazy, Suspense, useState, useEffect } from 'react';
import AdsterraBanner from './AdsterraBanner';
import Toast from './components/Toast';
import AchievementPopup from './components/AchievementPopup';
import ModeSelect from './components/ModeSelect';
import Flashcards from './components/Flashcards';
import { SHOW_ADS, SHOW_POPOVER_AD, SHARE_GATE_EVERY, ROUND_SIZE, getTimerSecs } from './utils/constants';
import { loadUser, loadStats, saveStats, saveUser, loadSubjectPerformance, saveSubjectPerformance, loadAchievements, saveAchievements } from './utils/storage';
import { trackEvent, getDeviceInfo, fmtTimestamp } from './utils/analytics';
import { stopSpeech } from './utils/sounds';
import { ACHIEVEMENTS } from './utils/constants';
import './style.css';

// Lazy loaded components
const Splash = lazy(() => import('./components/Splash'));
const Onboard = lazy(() => import('./components/Onboard'));
const Subjects = lazy(() => import('./components/Subjects'));
const Ready = lazy(() => import('./components/Ready'));
const Quiz = lazy(() => import('./components/Quiz'));
const Result = lazy(() => import('./components/Result'));
const Profile = lazy(() => import('./components/Profile'));
const ShareGate = lazy(() => import('./components/ShareGate'));
const AdGate = lazy(() => import('./components/AdGate'));

// Loading component
const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-spinner"></div>
    <div className="loading-text">Loading...</div>
  </div>
);

// Helper function to check and award achievements
const checkAndAwardAchievements = (userStats, email, currentAchievements, showToast, showAchievement, subjectPerformance) => {
  const newAchievements = [];
  const achievedIds = currentAchievements.map(a => a?.id).filter(Boolean);

  // Total quizzes completed
  if (!achievedIds.includes('firstQuiz') && userStats.totalQuizzes >= 1) {
    newAchievements.push('firstQuiz');
  }
  if (!achievedIds.includes('fiveQuizzes') && userStats.totalQuizzes >= 5) {
    newAchievements.push('fiveQuizzes');
  }
  if (!achievedIds.includes('tenQuizzes') && userStats.totalQuizzes >= 10) {
    newAchievements.push('tenQuizzes');
  }

  // Perfect score
  if (!achievedIds.includes('perfectScore') && userStats.perfectScores >= 1) {
    newAchievements.push('perfectScore');
  }
  
  // 90%+ score
  if (!achievedIds.includes('ninetyPlus') && userStats.ninetyPlusCount >= 1) {
    newAchievements.push('ninetyPlus');
  }

  // Streak achievements
  if (!achievedIds.includes('streak7') && userStats.streak >= 7) {
    newAchievements.push('streak7');
  }
  if (!achievedIds.includes('streak30') && userStats.streak >= 30) {
    newAchievements.push('streak30');
  }

  // All subjects attempted
  if (!achievedIds.includes('allSubjects')) {
    const subjectsAttempted = Object.keys(subjectPerformance || {}).filter(s => subjectPerformance[s]?.total > 0).length;
    if (subjectsAttempted >= 9) {
      newAchievements.push('allSubjects');
    }
  }

  // Speed demon
  if (!achievedIds.includes('speedDemon') && userStats.speedDemonCount >= 1) {
    newAchievements.push('speedDemon');
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
    novel: 'novelReader'
  };

  Object.keys(masteryMap).forEach(subject => {
    const achievementKey = masteryMap[subject];
    if (!achievedIds.includes(achievementKey)) {
      const perf = subjectPerformance?.[subject];
      if (perf && perf.bestScore >= 80) {
        newAchievements.push(achievementKey);
      }
    }
  });

  // Save new achievements and show popups
  if (newAchievements.length > 0) {
    const newAchievementObjects = newAchievements.map(id => ACHIEVEMENTS[id]).filter(a => a);
    const updatedAchievements = [...currentAchievements, ...newAchievementObjects];
    saveAchievements(updatedAchievements, email);
    
    newAchievementObjects.forEach(achievement => {
      if (achievement) {
        showToast(`${achievement.name} unlocked!`, 'achievement');
        showAchievement(achievement);
      }
    });
  }

  return newAchievements;
};

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
  
  // Toast and Achievement states
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [achievementPopup, setAchievementPopup] = useState({ show: false, achievement: null });
  const [achievements, setAchievements] = useState([]);
  
  // Quiz timing for speed demon achievement
  const [quizTimeRemaining, setQuizTimeRemaining] = useState(null);
  
  // Subject performance tracking
  const [subjectPerformance, setSubjectPerformance] = useState({});
  
  // Study mode state
  const [studyMode, setStudyMode] = useState(null); // 'cbt' or 'flashcard'
  const [flashcardSubject, setFlashcardSubject] = useState(null);

  // Load user data on mount
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
      
      const perf = loadSubjectPerformance(u.email);
      setSubjectPerformance(perf);
      
      const userAchievements = loadAchievements(u.email);
      setAchievements(userAchievements);
    }
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
  };

  const showAchievement = (achievement) => {
    setAchievementPopup({ show: true, achievement });
  };

  const updateSubjectPerformance = (subjectName, scoreCorrect, totalQuestions, timeRemaining, totalTime) => {
    const pct = (scoreCorrect / totalQuestions) * 100;
    const current = subjectPerformance[subjectName] || { bestScore: 0, averageScore: 0, total: 0, scores: [] };
    
    const newScores = [...(current.scores || []), pct];
    const newAverage = newScores.reduce((a, b) => a + b, 0) / newScores.length;
    const newBest = Math.max(current.bestScore || 0, pct);
    
    const updated = {
      ...subjectPerformance,
      [subjectName]: {
        bestScore: newBest,
        averageScore: newAverage,
        total: (current.total || 0) + 1,
        scores: newScores
      }
    };
    
    setSubjectPerformance(updated);
    saveSubjectPerformance(updated, email);
    
    return newBest >= 80;
  };

  const calcStreak = (currentStreak, lastDate) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (!lastDate) return 1;
    if (lastDate === today) return currentStreak;
    if (lastDate === yesterday) return currentStreak + 1;
    return 1;
  };

  const persist = (ns, nsc, nb, streak, lastDate) => saveStats({ sessions: ns, allScores: nsc, bestScore: nb, streak, lastDate }, email);
  const triggerAdRefresh = () => { setAdRefresh(prev => prev + 1); console.log("Ads Refreshing..."); };
  
  const goHome = () => { 
    if (SHOW_ADS) triggerAdRefresh(); 
    stopSpeech(); 
    setStudyMode(null);
    setFlashcardSubject(null);
    setScreen('modeSelect'); 
  };
  
  const handleAdGateComplete = (callback) => {
    setTotalSessionsForAd(sessions + 1);
    setAdGateCallback(() => callback);
    setShowAdGate(true);
  };

  const handleAdGateUnlocked = (adWatched) => {
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
      setScreen('modeSelect');
    } else setScreen('onboard');
  };

  const handleModeSelect = (mode) => {
    setStudyMode(mode);
    if (mode === 'cbt') {
      setScreen('subjects');
    } else if (mode === 'flashcard') {
      setScreen('flashcardSubjects');
    }
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
      if (pending && !SHOW_POPOVER_AD) { setPendingSubject(sel); setScreen('sharegate'); return; }
    } catch {}
    setSubject(sel);
    setScore(0);
    setCorrect(0);
    setTotalQ(0);
    setRoundsPlayed(0);
    trackEvent('quiz_start', { name, email, subject: sel, timestamp2: fmtTimestamp(), ...getDeviceInfo() });
    setScreen('ready');
  };

  const handleAllDone = (finalRoundsPlayed) => {
    const pct = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;
    const ns = sessions + 1;
    const nsc = [...allScores, pct];
    const nb = Math.max(bestScore, score);
    const today = new Date().toDateString();
    const newStreak = calcStreak(streak, lastDate);
    
    // Check for perfect score and 90%+
    const isPerfect = pct === 100;
    const isNinetyPlus = pct >= 90;
    
    // Update subject performance
    updateSubjectPerformance(subject, correct, totalQ, quizTimeRemaining, getTimerSecs(subject, ROUND_SIZE));
    
    setSessions(ns);
    setAllScores(nsc);
    setBestScore(nb);
    setStreak(newStreak);
    setLastDate(today);
    persist(ns, nsc, nb, newStreak, today);
    
    // Calculate user stats for achievements
    const perfectScoresCount = allScores.filter(s => s === 100).length + (isPerfect ? 1 : 0);
    const ninetyPlusCount = allScores.filter(s => s >= 90).length + (isNinetyPlus ? 1 : 0);
    
    const userStats = {
      totalQuizzes: ns,
      perfectScores: perfectScoresCount,
      ninetyPlusCount: ninetyPlusCount,
      streak: newStreak,
      speedDemonCount: 0,
    };
    
    // Check and award achievements
    const currentAchievements = achievements;
    checkAndAwardAchievements(userStats, email, currentAchievements, showToast, showAchievement, subjectPerformance);
    
    if (ns % SHARE_GATE_EVERY === 0 && !SHOW_POPOVER_AD) {
      try { localStorage.setItem(`ep_sharepending_${email}`, ns.toString()); } catch {}
    }
    setRoundsPlayed(finalRoundsPlayed);
    
    // Show toast for performance
    if (isPerfect) {
      showToast(`Perfect score! 🎯 You got ${correct}/${totalQ} correct!`, 'success');
    } else if (isNinetyPlus) {
      showToast(`Excellent! ${pct}% - Keep up the great work! ⭐`, 'success');
    } else if (pct >= 70) {
      showToast(`Good job! ${pct}% - You're making progress! 📈`, 'success');
    } else if (pct >= 50) {
      showToast(`Not bad! ${pct}% - Review the explanations to improve! 📚`, 'info');
    } else {
      showToast(`Keep practicing! ${pct}% - Every session makes you better! 💪`, 'warning');
    }
    
    trackEvent('quiz_complete', { name, email, subject, score, correct, totalQ, pct: pct + '%', rounds: finalRoundsPlayed, totalSessions: ns, timestamp2: fmtTimestamp() });
    setScreen('result');
  };

  return (
    <>
      <div className="phone">
        <Suspense fallback={<LoadingScreen />}>
  {screen === 'splash' && <Splash onDone={handleSplash} />}
  {screen === 'onboard' && <Onboard onDone={(n, e) => { setName(n); setEmail(e); const s = loadStats(e); if (s.sessions) setSessions(s.sessions); if (s.allScores) setAllScores(s.allScores); if (s.bestScore) setBestScore(s.bestScore); if (s.streak) setStreak(s.streak); if (s.lastDate) setLastDate(s.lastDate); setScreen('modeSelect'); }} />}
  {screen === 'modeSelect' && <ModeSelect onSelectMode={handleModeSelect} />}
  {screen === 'subjects' && <Subjects name={name} onStart={startQuiz} onProfile={() => { setFromResult(false); setScreen('profile'); }} refreshTrigger={adRefresh} mode="cbt" />}
  {screen === 'flashcardSubjects' && <Subjects name={name} onStart={handleFlashcardSubjectSelect} onProfile={() => { setFromResult(false); setScreen('profile'); }} refreshTrigger={adRefresh} mode="flashcard" />}
  {screen === 'sharegate' && <ShareGate name={name} email={email} onUnlocked={() => { setSubject(pendingSubject); setScore(0); setCorrect(0); setTotalQ(0); setRoundsPlayed(0); trackEvent('quiz_start', { name, email, subject: pendingSubject, timestamp2: fmtTimestamp(), ...getDeviceInfo() }); setScreen('ready'); }} />}
  {screen === 'adgate' && <AdGate name={name} email={email} totalSessions={totalSessionsForAd} onUnlocked={handleAdGateUnlocked} />}
  {screen === 'ready' && <Ready subjectId={subject} onGo={() => setScreen('quiz')} onBack={goHome} />}
  {screen === 'quiz' && <Quiz 
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
  />}
  {screen === 'result' && <Result name={name} subjectId={subject} score={score} correct={correct} totalQ={totalQ} totalSessions={sessions} onHome={goHome} onProfile={() => { setFromResult(true); setScreen('profile'); }} onAdGateComplete={handleAdGateComplete} />}
  {screen === 'flashcards' && <Flashcards subjectId={flashcardSubject} onBack={handleBackToModeSelect} />}
  {screen === 'profile' && <Profile name={name} email={email} sessions={sessions} streak={streak} allScores={allScores} bestScore={bestScore} onBack={() => setScreen(fromResult ? 'result' : 'modeSelect')} onSignOut={() => { stopSpeech(); localStorage.removeItem('ep_user'); setName(''); setEmail(''); setSessions(0); setAllScores([]); setBestScore(0); setStreak(1); setLastDate(''); setScreen('onboard'); }} />}
</Suspense>
      </div>
      
      {/* Toast Notifications */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ show: false, message: '', type: 'info' })} 
        />
      )}
      
      {/* Achievement Popup */}
      {achievementPopup.show && achievementPopup.achievement && (
        <AchievementPopup 
          achievement={achievementPopup.achievement} 
          onClose={() => setAchievementPopup({ show: false, achievement: null })} 
        />
      )}

      {/* Bottom Sticky Ad */}
  {SHOW_ADS && (
    <div style={{ 
      position: 'sticky', 
      bottom: 0, 
      zIndex: 999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'var(--bg-primary)',
      padding: '5px 0',
      borderTop: '1px solid var(--border-color)',
      marginTop: 'auto'
    }}>
      <AdsterraBanner 
        adKey="ec0487cde03d79b75629df8828d753f9" 
        scale={0.3}
        refreshTrigger={adRefresh} 
      />
    </div>
  )}
      
      {SHOW_ADS && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', marginTop: '10px', marginBottom: '20px' }}>
          <AdsterraBanner adKey="3ac2ce320a30936c1cf44c1dc6af48b3" width={320} height={50} refreshTrigger={adRefresh} />
          <AdsterraBanner adKey="acfeb6d2c7aa8faa701a1d3bd1b8e3ee" width={728} height={90} refreshTrigger={adRefresh} />
          <AdsterraBanner adKey="6aeea40ea3fac071fc3c3d43fd2f1fe6" width={160} height={600} refreshTrigger={adRefresh} />
          <AdsterraBanner adKey="c3797bda9331d8516f86837bb9068207" width={160} height={300} refreshTrigger={adRefresh} />
          <AdsterraBanner adKey="fce61a93a320cdb7161fa006b20e7b00" width={468} height={60} refreshTrigger={adRefresh} />
          <AdsterraBanner adKey="6eb8313e3d0a4c25d0e4d2c71e7ca69d" width={300} height={250} refreshTrigger={adRefresh} />
        </div>
      )}
    </>
  );
}
