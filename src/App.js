import React from 'react';
import { useState, useEffect } from 'react';
import AdsterraBanner from './AdsterraBanner';
import Splash from './components/Splash';
import Onboard from './components/Onboard';
import Subjects from './components/Subjects';
import Ready from './components/Ready';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Profile from './components/Profile';
import ShareGate from './components/ShareGate';
import AdGate from './components/AdGate';
import { SHOW_ADS, SHOW_POPOVER_AD, SHARE_GATE_EVERY, ROUND_SIZE } from './utils/constants';
import { loadUser, loadStats, saveStats, saveUser } from './utils/storage';
import { trackEvent, getDeviceInfo, fmtTimestamp } from './utils/analytics';
import { stopSpeech } from './utils/sounds';
import './style.css';

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
    }
  }, []);

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
  
  const goHome = () => { if (SHOW_ADS) triggerAdRefresh(); stopSpeech(); setScreen('subjects'); };
  
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
      setScreen('subjects');
    } else setScreen('onboard');
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
    setSessions(ns);
    setAllScores(nsc);
    setBestScore(nb);
    setStreak(newStreak);
    setLastDate(today);
    persist(ns, nsc, nb, newStreak, today);
    if (ns % SHARE_GATE_EVERY === 0 && !SHOW_POPOVER_AD) {
      try { localStorage.setItem(`ep_sharepending_${email}`, ns.toString()); } catch {}
    }
    setRoundsPlayed(finalRoundsPlayed);
    trackEvent('quiz_complete', { name, email, subject, score, correct, totalQ, pct: pct + '%', rounds: finalRoundsPlayed, totalSessions: ns, timestamp2: fmtTimestamp() });
    setScreen('result');
  };

  return (
    <>
      <div className="phone">
        {screen === 'splash' && <Splash onDone={handleSplash} />}
        {screen === 'onboard' && <Onboard onDone={(n, e) => { setName(n); setEmail(e); const s = loadStats(e); if (s.sessions) setSessions(s.sessions); if (s.allScores) setAllScores(s.allScores); if (s.bestScore) setBestScore(s.bestScore); if (s.streak) setStreak(s.streak); if (s.lastDate) setLastDate(s.lastDate); setScreen('subjects'); }} />}
        {screen === 'subjects' && <Subjects name={name} onStart={startQuiz} onProfile={() => { setFromResult(false); setScreen('profile'); }} onSignOut={() => { stopSpeech(); localStorage.removeItem('ep_user'); setName(''); setEmail(''); setSessions(0); setAllScores([]); setBestScore(0); setStreak(1); setLastDate(''); setScreen('onboard'); }} refreshTrigger={adRefresh} />}
        {screen === 'sharegate' && <ShareGate name={name} email={email} onUnlocked={() => { setSubject(pendingSubject); setScore(0); setCorrect(0); setTotalQ(0); setRoundsPlayed(0); trackEvent('quiz_start', { name, email, subject: pendingSubject, timestamp2: fmtTimestamp(), ...getDeviceInfo() }); setScreen('ready'); }} />}
        {screen === 'adgate' && <AdGate name={name} email={email} totalSessions={totalSessionsForAd} onUnlocked={handleAdGateUnlocked} />}
        {screen === 'ready' && <Ready subjectId={subject} onGo={() => setScreen('quiz')} onBack={goHome} />}
        {screen === 'quiz' && <Quiz subjectId={subject} onAllDone={handleAllDone} score={score} setScore={setScore} correct={correct} setCorrect={setCorrect} totalQ={totalQ} setTotalQ={setTotalQ} onHome={goHome} triggerAdRefresh={triggerAdRefresh} />}
        {screen === 'result' && <Result name={name} subjectId={subject} score={score} correct={correct} totalQ={totalQ} totalSessions={sessions} onHome={goHome} onProfile={() => { setFromResult(true); setScreen('profile'); }} onAdGateComplete={handleAdGateComplete} />}
        {screen === 'profile' && <Profile name={name} email={email} sessions={sessions} streak={streak} allScores={allScores} bestScore={bestScore} onBack={() => setScreen(fromResult ? 'result' : 'subjects')} onSignOut={() => { stopSpeech(); localStorage.removeItem('ep_user'); setName(''); setEmail(''); setSessions(0); setAllScores([]); setBestScore(0); setStreak(1); setLastDate(''); setScreen('onboard'); }} />}
      </div>
      
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
