import React from 'react';
import { useState, useEffect, useRef } from 'react';
import AdsterraBanner from './AdsterraBanner';
import { QB } from './QB';
import logo from './assets/elite-scholars-cbt-logo.png';
import './style.css';

// ============================================================================
// CONFIGURATION - EDIT THESE VALUES
// ============================================================================

const ROUND_SIZE = 20;                    // Questions per quiz round
const SHARE_GATE_EVERY = 1;              // Show ad gate every N quizzes (replaces share gate)
const SHOW_ADS = false;                   // Set to false to hide all banner ads
const SHOW_POPOVER_AD = false;            // Set to false to disable popover ads (shows share gate instead)
const POPOVER_AD_SCRIPT = "https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469.js"; // Popover ad script

// ============================================================================
// CONSTANTS & LINKS
// ============================================================================

const WA_GROUP = 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t';
const WA_CHANNEL = 'https://whatsapp.com/channel/0029Vb6wPv72kNFnjr4FMr24';
const APP_URL = 'https://elitescholars.site';
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycby59br8odWXDWQLkomFieaU-2aq_4wb5FiwzTiHkFgqztm0HqU5RShooJLeUANpF8sI/exec';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getTimerSecs(subjectId, questionCount) {
  const calcSubjects = ['mathematics', 'physics', 'chemistry'];
  const secsPerQ = calcSubjects.includes(subjectId) ? 25 : 16;
  return questionCount * secsPerQ;
}

const shareMsg = (name, subject, correct, totalQ) =>
  `${name} just scored ${correct}/${totalQ} in ${subject} on EliteScholars CBT! 🔥\n\nI'm practising for JAMB free at ${APP_URL} — come try it!`;

function sfl(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Popover Ad Functions
let popoverScriptLoaded = false;

function loadPopoverAd() {
  if (!SHOW_POPOVER_AD) return;
  if (popoverScriptLoaded) return;
  
  const script = document.createElement('script');
  script.src = POPOVER_AD_SCRIPT;
  script.async = true;
  document.body.appendChild(script);
  popoverScriptLoaded = true;
  console.log("Popover ad script loaded");
}

function triggerPopoverAd() {
  if (!SHOW_POPOVER_AD) return false;
  
  // Check if the ad network's popunder function exists
  if (window.popunder && typeof window.popunder === 'function') {
    window.popunder();
    console.log("Popover ad triggered");
    return true;
  }
  
  // Alternative: Try to trigger via the ad key
  if (window.Adsterra && typeof window.Adsterra.popunder === 'function') {
    window.Adsterra.popunder();
    console.log("Popover ad triggered via Adsterra");
    return true;
  }
  
  console.log("Popover ad function not found yet");
  return false;
}

// ============================================================================
// COLORS
// ============================================================================

const PURPLE = '#4B0082';
const DPURP = '#280050';
const GOLD = '#D4AF37';
const LGOLD = '#FFEB82';
const DGOLD = '#A07820';
const GREEN = '#16A34A';
const LGREEN = '#DCFCE7';
const RED = '#DC2626';
const LRED = '#FEE2E2';
const GRAY = '#6B7280';
const LGRAY = '#E5E7EB';
const BG = '#F8F5FF';
const WHITE = '#FFFFFF';

// ============================================================================
// SUBJECT METADATA
// ============================================================================

const SUBJ = {
  english: { icon: '📖', label: 'English', color: '#0369A1', bg: '#E0F2FE' },
  economics: { icon: '📊', label: 'Economics', color: '#7C3AED', bg: '#EDE9FE' },
  biology: { icon: '🔬', label: 'Biology', color: '#065F46', bg: '#DCFCE7' },
  chemistry: { icon: '⚗️', label: 'Chemistry', color: '#9A3412', bg: '#FEE2E2' },
  mathematics: { icon: '📐', label: 'Mathematics', color: '#1D4ED8', bg: '#DBEAFE' },
  physics: { icon: '⚡', label: 'Physics', color: '#B45309', bg: '#FEF3C7' },
  government: { icon: '🏛️', label: 'Government', color: '#3F6212', bg: '#F7FEE7' },
  literature: { icon: '📚', label: 'Literature', color: '#831843', bg: '#FCE7F3' },
  novel: { icon: '📗', label: 'The Lekki Headmaster', color: '#831843', bg: '#FCE7F3' },
};

// ============================================================================
// SOUND ENGINE
// ============================================================================

let _audioCtx = null;

function getAudioCtx() {
  if (!_audioCtx) {
    try {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {}
  }
  return _audioCtx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.18, delay = 0) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.04);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.05);
  } catch (e) {}
}

const SFX = {
  intro: () => {
    playTone(80, 0.35, 'sine', 0.22, 0.0);
    playTone(120, 0.3, 'sine', 0.18, 0.1);
    [196, 246, 294, 349, 392, 494, 587, 698, 784].forEach((f, i) => {
      playTone(f, 0.1, 'sine', 0.14, 0.35 + i * 0.07);
    });
    playTone(784, 0.45, 'sine', 0.2, 1.05);
    playTone(988, 0.45, 'sine', 0.16, 1.05);
    playTone(1175, 0.45, 'sine', 0.12, 1.05);
    playTone(1568, 0.18, 'sine', 0.14, 1.52);
    playTone(1976, 0.22, 'sine', 0.1, 1.68);
  },
  select: () => playTone(600, 0.07, 'sine', 0.12),
  wrong: () => { playTone(300, 0.18, 'sawtooth', 0.14, 0); playTone(220, 0.28, 'sawtooth', 0.1, 0.15); },
  correct: () => { playTone(523, 0.12, 'sine', 0.16, 0); playTone(659, 0.12, 'sine', 0.16, 0.1); playTone(784, 0.22, 'sine', 0.18, 0.2); },
  roundComplete: () => {
    playTone(523, 0.1, 'sine', 0.2, 0.0);
    playTone(659, 0.1, 'sine', 0.2, 0.1);
    playTone(784, 0.1, 'sine', 0.2, 0.2);
    playTone(1047, 0.1, 'sine', 0.2, 0.3);
    playTone(1047, 0.4, 'sine', 0.18, 0.42);
    playTone(784, 0.3, 'sine', 0.15, 0.55);
  },
  timerWarn: () => playTone(880, 0.05, 'square', 0.08),
  submit: () => { playTone(440, 0.08, 'sine', 0.13); playTone(550, 0.08, 'sine', 0.1, 0.06); },
  splash: () => {
    playTone(1047, 0.5, 'sine', 0.06, 0.0);
    playTone(1319, 0.5, 'sine', 0.05, 0.1);
    playTone(1568, 0.5, 'sine', 0.05, 0.2);
    playTone(523, 0.4, 'sine', 0.1, 0.4);
    playTone(659, 0.4, 'sine', 0.11, 0.65);
    playTone(784, 0.4, 'sine', 0.12, 0.9);
    playTone(1047, 0.5, 'sine', 0.13, 1.15);
    playTone(523, 0.7, 'sine', 0.1, 1.4);
    playTone(659, 0.7, 'sine', 0.09, 1.42);
    playTone(784, 0.7, 'sine', 0.09, 1.44);
    playTone(1047, 1.0, 'sine', 0.14, 1.8);
    playTone(784, 0.9, 'sine', 0.08, 1.9);
  },
};

// ============================================================================
// SPEECH & VOICE
// ============================================================================

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  utter.pitch = 1.0;
  utter.volume = 1;
  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = ['Google UK English Male', 'Microsoft David Desktop', 'Microsoft Mark Desktop', 'Daniel', 'Fred', 'Thomas', 'Arthur', 'Google US English', 'Alex'];
    const male = voices.find(v => preferred.some(p => v.name.includes(p))) || voices.find(v => v.name.toLowerCase().includes('male')) || null;
    if (male) utter.voice = male;
    window.speechSynthesis.speak(utter);
  };
  if (window.speechSynthesis.getVoices().length > 0) trySpeak();
  else window.speechSynthesis.onvoiceschanged = trySpeak;
  return utter;
}

function stopSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

// ============================================================================
// ANALYTICS
// ============================================================================

function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua);
  const browser = /Chrome/i.test(ua) && !/Edge|OPR/i.test(ua) ? 'Chrome' : /Firefox/i.test(ua) ? 'Firefox' : /Safari/i.test(ua) && !/Chrome/i.test(ua) ? 'Safari' : /Edge/i.test(ua) ? 'Edge' : /OPR|Opera/i.test(ua) ? 'Opera' : 'Other';
  const device = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';
  const os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iOS' : /Windows/i.test(ua) ? 'Windows' : /Mac/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : 'Unknown';
  return { browser, device, os };
}

function fmtTimestamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function trackEvent(eventName, data) {
  if (!SHEETS_URL) return;
  fetch(SHEETS_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: eventName, timestamp: fmtTimestamp(), ...data }),
  }).catch(() => {});
}

// ============================================================================
// LOCAL STORAGE
// ============================================================================

function loadUser() {
  try { return JSON.parse(localStorage.getItem('ep_user') || '{}'); } catch { return {}; }
}

function loadStats(email) {
  try {
    const key = email ? `ep_stats_${email}` : 'ep_stats';
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch { return {}; }
}

function saveUser(u) {
  try { localStorage.setItem('ep_user', JSON.stringify(u)); } catch {}
}

function saveStats(s, email) {
  try {
    const key = email ? `ep_stats_${email}` : 'ep_stats';
    localStorage.setItem(key, JSON.stringify(s));
  } catch {}
}


// ============================================================================
// SPLASH SCREEN
// ============================================================================

function Splash({ onDone }) {
  const stars = useRef(Array.from({ length: 22 }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    delay: Math.random() * 3, dur: 1.5 + Math.random() * 2
  }))).current;
  
  // Load popover ad script on splash screen
  useEffect(() => {
    loadPopoverAd();
  }, []);
  
  useEffect(() => {
    const s = setTimeout(() => SFX.splash(), 300);
    const t = setTimeout(onDone, 2800);
    return () => { clearTimeout(s); clearTimeout(t); };
  }, []);
  
  return (
    <div className="scr" style={{ background: 'linear-gradient(160deg,#1a0030,#4B0082,#1a0030)', alignItems: 'center', justifyContent: 'center', gap: 16, position: 'relative', overflow: 'hidden' }}>
      {stars.map(s => <div key={s.id} className="star" style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }} />)}
      <img src={logo} alt="Elite Scholars CBT Logo" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 0 40px rgba(212,175,55,.5)', animation: 'pulse 2s infinite', zIndex: 1 }} />
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: WHITE, lineHeight: 1.1 }}>Elite<span style={{ color: GOLD }}>Scholars</span> CBT</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 6 }}>JAMB Practice · 8 Subjects</div>
      </div>
      <div style={{ width: 180, height: 3, background: 'rgba(255,255,255,.15)', borderRadius: 2, overflow: 'hidden', zIndex: 1 }}>
        <div style={{ height: '100%', background: GOLD, animation: 'loadBar 2.5s ease forwards' }} />
      </div>
      <div style={{ fontSize: 10, color: LGOLD, letterSpacing: 2, textTransform: 'uppercase', zIndex: 1 }}>by Elite JAMB &amp; PUTME Clinic</div>
    </div>
  );
}

// ============================================================================
// ONBOARD SCREEN
// ============================================================================

function Onboard({ onDone }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const submit = () => {
    if (!name.trim()) return alert('Please enter your name');
    const emailRx = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRx.test(email.trim())) return alert('Please enter a valid email address');
    saveUser({ name: name.trim(), email: email.trim() });
    trackEvent('register', { name: name.trim(), email: email.trim(), ...getDeviceInfo() });
    onDone(name.trim(), email.trim());
  };
  
  const inpStyle = { width: '100%', padding: '14px 18px', fontSize: 14, fontWeight: 500, border: '2px solid rgba(255,255,255,.15)', borderRadius: 14, background: 'rgba(255,255,255,.08)', color: WHITE, outline: 'none' };
  
  return (
    <div className="scr fd" style={{ background: 'linear-gradient(160deg,#280050,#4B0082,#280050)' }}>
      <div style={{ padding: '44px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
        <div style={{ fontSize: 40, animation: 'bounce 2s infinite' }}>👋</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: WHITE, lineHeight: 1.2 }}>Let's get you<br /><span style={{ color: GOLD }}>300+</span> ready.</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.65 }}>Enter your name and email to save progress. No password needed.</div>
      </div>
      <div style={{ padding: '0 24px 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input style={inpStyle} placeholder="Your first name" value={name} onChange={e => setName(e.target.value)} maxLength={30} onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.15)'} />
        <input style={inpStyle} type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,.15)'} />
        <button onClick={submit} style={{ padding: 16, background: GOLD, border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, color: DPURP, boxShadow: '0 8px 24px rgba(212,175,55,.4)' }}>Let's Go →</button>
      </div>
    </div>
  );
}

// ============================================================================
// SUBJECTS SCREEN
// ============================================================================

function Subjects({ name, onStart, onProfile, onSignOut, refreshTrigger }) {
  const [sel, setSel] = useState();
  const subjEntries = Object.entries(SUBJ).filter(([id]) => id !== 'novel');
  const lekkiCard = { id: '__lekki__', isLekki: true };
  const allCards = [
    ...subjEntries.slice(0, 2).map(([id, meta]) => ({ id, meta })),
    lekkiCard,
    ...subjEntries.slice(2).map(([id, meta]) => ({ id, meta })),
  ];

  return (
    <div className="scr fd" style={{ background: BG, display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg,${DPURP},${PURPLE})`, padding: '44px 20px 30px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', bottom: -16, left: 0, right: 0, height: 32, background: BG, borderRadius: '20px 20px 0 0' }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>WELCOME BACK</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: WHITE }}>{name || 'Student'} 👋</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', marginTop: 2 }}>Pick a subject to practise today</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, marginTop: 2 }}>
            <button onClick={onProfile} style={{ background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 10, padding: '5px 12px', color: WHITE, fontSize: 11, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>👤 Profile</button>
            <button onClick={onSignOut} style={{ background: 'rgba(220,38,38,.18)', border: '1px solid rgba(220,38,38,.3)', borderRadius: 10, padding: '5px 12px', color: '#fca5a5', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>↩ Sign Out</button>
          </div>
        </div>
      </div>

      {/* Native Banner */}
      {SHOW_ADS && (
        <div style={{ padding: '0 16px', marginTop: '-8px', marginBottom: '12px', zIndex: 2 }}>
          <AdsterraBanner adKey="ec0487cde03d79b75629df8828d753f9" refreshTrigger={refreshTrigger} />
        </div>
      )}

      {/* Subject Cards */}
      <div className="scroll" style={{ flex: 1, padding: '0 16px 100px', overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {allCards.map((card) => {
            if (card.isLekki) {
              const isSelL = sel === '__lekki__';
              return (
                <div key="lekki" onClick={() => { SFX.select(); setSel('__lekki__'); }} style={{ gridColumn: '1 / -1', background: isSelL ? '#FCE7F3' : WHITE, borderRadius: 16, padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12, border: `2px solid ${isSelL ? '#831843' : LGRAY}`, cursor: 'pointer', boxShadow: isSelL ? '0 4px 14px #83184330' : '0 2px 8px rgba(0,0,0,.05)', transition: 'all .2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: isSelL ? '#831843' : '#FCE7F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📗</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1a0030', lineHeight: 1.2 }}>The Lekki Headmaster</div>
                    <div style={{ fontSize: 10, color: GRAY, marginTop: 2 }}>Kabir Alabi Garba · Literature</div>
                    <div style={{ background: isSelL ? '#831843' : LGRAY, color: isSelL ? WHITE : GRAY, fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 12, display: 'inline-block', marginTop: 5 }}>NOVEL</div>
                  </div>
                  <div style={{ fontSize: 10, color: GRAY, textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontWeight: 700, color: isSelL ? '#831843' : GRAY }}>{(QB.novel || []).length}</div>
                    <div>questions</div>
                  </div>
                </div>
              );
            }
            const { id, meta } = card;
            const isSel = sel === id;
            return (
              <div key={id} onClick={() => { SFX.select(); setSel(id); }} style={{ background: isSel ? meta.bg : WHITE, borderRadius: 16, padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 7, border: `2px solid ${isSel ? meta.color : LGRAY}`, cursor: 'pointer', boxShadow: isSel ? `0 4px 14px ${meta.color}30` : '0 2px 8px rgba(0,0,0,.05)', transition: 'all .2s' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: isSel ? meta.color : meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{meta.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a0030', lineHeight: 1.2 }}>{meta.label}</div>
                <div style={{ fontSize: 10, color: GRAY }}>{(QB[id] || []).length} questions</div>
                <div style={{ background: isSel ? meta.color : LGRAY, color: isSel ? WHITE : GRAY, fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 12, alignSelf: 'flex-start' }}>READY</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Button */}
      <div style={{ padding: '8px 16px 24px', flexShrink: 0, background: BG, borderTop: `1px solid ${LGRAY}`, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10000 }}>
        <button onClick={() => { SFX.submit(); onStart(sel === '__lekki__' ? 'novel' : sel); }} style={{ width: '100%', padding: 16, background: sel ? PURPLE : LGRAY, border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, color: sel ? WHITE : GRAY, boxShadow: sel ? '0 8px 22px rgba(75,0,130,.4)' : 'none', opacity: sel ? 1 : 0.6, cursor: sel ? 'pointer' : 'not-allowed' }}>
          {sel === '__lekki__' ? '📗' : SUBJ[sel]?.icon || '📚'} Start {sel === '__lekki__' ? 'Lekki Headmaster' : SUBJ[sel]?.label || 'a subject'} →
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// READY SCREEN (Countdown)
// ============================================================================

function Ready({ subjectId, onGo, onBack }) {
  const [count, setCount] = useState(3);
  const [offset, setOffset] = useState(283);
  const meta = SUBJ[subjectId] || SUBJ.english;
  
  useEffect(() => {
    const tick = (c) => {
      setCount(c);
      setOffset(283 * (1 - (4 - c) / 3));
      if (c === 0) { setTimeout(onGo, 450); return; }
      SFX.select();
      setTimeout(() => tick(c - 1), 1000);
    };
    setTimeout(() => tick(3), 200);
  }, []);
  
  return (
    <div className="scr fd" style={{ background: 'linear-gradient(160deg,#1a0030,#4B0082,#1a0030)', alignItems: 'center', justifyContent: 'center', gap: 14, textAlign: 'center', padding: '40px 24px', position: 'relative' }}>
      <button onClick={onBack} style={{ position: 'absolute', top: 48, left: 20, background: 'rgba(255,255,255,.1)', border: 'none', borderRadius: 10, padding: '6px 14px', color: 'rgba(255,255,255,.7)', fontSize: 12 }}>← Back</button>
      <div style={{ fontSize: 28 }}>{meta.icon}</div>
      <div style={{ width: 140, height: 140, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 100 100" width="140" height="140" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="7" />
          <circle cx="50" cy="50" r="45" fill="none" stroke={GOLD} strokeWidth="7" strokeLinecap="round" strokeDasharray="283" strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1s linear' }} />
        </svg>
        <div key={count} className="pi" style={{ fontSize: 58, fontWeight: 900, color: WHITE, zIndex: 1 }}>{count}</div>
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: WHITE }}>{meta.label} — Get Ready! 🔥</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)', lineHeight: 1.6 }}>{ROUND_SIZE} questions · {getTimerSecs(subjectId, ROUND_SIZE)}s timer<br />Select → Submit → See explanation</div>
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', justifyContent: 'center' }}>
        {['+10 pts correct', '50/50 lifeline', 'Hint lifeline', '🔊 Voice read'].map((t, i) => (
          <div key={i} style={{ background: i === 0 ? 'rgba(212,175,55,.2)' : 'rgba(255,255,255,.1)', border: `1px solid ${i === 0 ? GOLD : 'rgba(255,255,255,.2)'}`, color: i === 0 ? LGOLD : WHITE, fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 16 }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// AD GATE SCREEN (Replaces Share Gate with Popover Ad)
// ============================================================================

function AdGate({ name, email, totalSessions, onUnlocked }) {
  const [countdown, setCountdown] = useState(5);
  const [adTriggered, setAdTriggered] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // Trigger popover ad when component mounts
    if (!adTriggered) {
      setAdTriggered(true);
      
      // Small delay to ensure UI is ready
      setTimeout(() => {
        const adTriggered = triggerPopoverAd();
        if (!adTriggered) {
          // If ad function not ready, try again after 1 second
          setTimeout(() => {
            triggerPopoverAd();
          }, 1000);
        }
      }, 500);
      
      trackEvent('ad_gate_shown', { name, email, totalSessions });
    }
  }, [name, email, totalSessions, adTriggered]);

  // Countdown timer - ad is considered "watched" after countdown
  useEffect(() => {
    if (unlocked) return;
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setUnlocked(true);
          trackEvent('ad_gate_completed', { name, email, totalSessions });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [unlocked, name, email, totalSessions]);

  const vibe = [
    'Thanks for supporting EliteScholars! 🎓',
    'One quick ad keeps us running! 🙏',
    'You\'re helping others learn for free! 💪',
    'Almost there! Your next quiz awaits! 🔥',
  ][Math.floor(Math.random() * 4)];

  return (
    <div className="scr fd" style={{ background: 'linear-gradient(160deg,#1a0030,#4B0082,#1a0030)', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>🎬</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: WHITE }}>Watch to Continue</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 8, lineHeight: 1.5 }}>
            {unlocked ? 'Ad complete! Ready to continue!' : 'Watch the ad to unlock your next quiz round'}
          </div>
        </div>

        <div style={{ background: 'rgba(212,175,55,.1)', border: `1px solid rgba(212,175,55,.25)`, borderRadius: 14, padding: '16px', marginBottom: 22, textAlign: 'center' }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: GOLD, marginBottom: 8 }}>✨ FROM ELITE JAMB</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.85)', fontWeight: 500 }}>{vibe}</div>
        </div>

        {!unlocked ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', marginBottom: 8 }}>Ad will unlock in</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: GOLD }}>{countdown}s</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', marginTop: 8 }}>Please wait for the ad to load</div>
            </div>
            
            <div style={{ height: 4, background: 'rgba(255,255,255,.1)', borderRadius: 2, marginBottom: 16, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: GOLD, width: `${((5 - countdown) / 5) * 100}%`, transition: 'width 1s linear' }} />
            </div>
            
            <button disabled style={{ width: '100%', padding: 15, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 13, fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,.4)', cursor: 'not-allowed' }}>
              🔒 Waiting for Ad...
            </button>
          </>
        ) : (
          <div className="su">
            <div style={{ background: 'rgba(22,163,74,.18)', border: `1px solid ${GREEN}`, borderRadius: 13, padding: '13px 16px', textAlign: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#4ade80', marginBottom: 3 }}>✅ Ad Complete!</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.7)' }}>Your next quiz is ready!</div>
            </div>
            <button onClick={() => onUnlocked(true)} style={{ width: '100%', padding: 15, background: GOLD, border: 'none', borderRadius: 13, fontSize: 15, fontWeight: 700, color: DPURP, boxShadow: '0 8px 22px rgba(212,175,55,.4)' }}>
              🚀 Continue to Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// QUIZ SCREEN
// ============================================================================

function Quiz({ subjectId, onAllDone, score, setScore, correct, setCorrect, totalQ, setTotalQ, onHome, triggerAdRefresh }) {
  const [shuffled] = useState(() => sfl(QB[subjectId] || QB.economics));
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(-1);
  const [done, setDone] = useState(false);
  const [modal, setModal] = useState(false);
  const [timeLeft, setTL] = useState(() => getTimerSecs(subjectId, ROUND_SIZE));
  const [usedF, setUF] = useState(false);
  const [usedH, setUH] = useState(false);
  const [hidden, setHid] = useState([]);
  const [showHint, setSHint] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [ansAnim, setAnsAnim] = useState('');
  const timerRef = useRef(null);
  const bodyRef = useRef(null);
  const utterRef = useRef(null);
  const roundSecs = getTimerSecs(subjectId, ROUND_SIZE);

  const q = shuffled[qi];
  const isLastQ = qi >= shuffled.length - 1;
  const isRoundEnd = (qi + 1) % ROUND_SIZE === 0;
  const isLast = isLastQ || isRoundEnd;
  const roundNum = Math.floor(qi / ROUND_SIZE);
  const meta = SUBJ[subjectId] || SUBJ.economics;

  // Auto-read question
  useEffect(() => {
    if (!q || !voiceEnabled) return;
    const txt = q.q + '. Options: ' + q.o.map((opt, i) => ['A', 'B', 'C', 'D'][i] + '. ' + opt).join('. ');
    stopSpeech();
    const u = speak(txt);
    if (u) { utterRef.current = u; setSpeaking(true); u.onend = () => setSpeaking(false); }
  }, [qi, voiceEnabled, q]);

  // Timer
  useEffect(() => {
    setTL(roundSecs);
    if (timerRef.current) clearInterval(timerRef.current);
    const start = Date.now();
    let lastWarnSec = -1;
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = Math.max(0, roundSecs - elapsed);
      setTL(remaining);
      if (remaining <= 10 && remaining > 0 && remaining !== lastWarnSec) { lastWarnSec = remaining; SFX.timerWarn(); }
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setDone(d => { if (!d) { setTotalQ(x => x + 1); return true; } return d; });
        stopSpeech(); setSpeaking(false);
      }
    }, 500);
    return () => clearInterval(timerRef.current);
  }, [roundNum, roundSecs]);

  const stopTimer = () => clearInterval(timerRef.current);

  const toggleVoice = () => {
    if (speaking) { stopSpeech(); setSpeaking(false); setVoiceEnabled(false); }
    else {
      setVoiceEnabled(v => {
        const next = !v;
        if (next && q) {
          const txt = q.q + '. Options: ' + q.o.map((opt, i) => ['A', 'B', 'C', 'D'][i] + '. ' + opt).join('. ');
          const u = speak(txt);
          if (u) { utterRef.current = u; setSpeaking(true); u.onend = () => setSpeaking(false); }
        }
        return next;
      });
    }
  };

  const handleSelect = (i) => { if (done || hidden.includes(i)) return; SFX.select(); setSel(i); };
  
  const handleSubmit = () => {
    if (SHOW_ADS) triggerAdRefresh();
    if (sel === -1 || done) return;
    stopSpeech(); setSpeaking(false); SFX.submit(); setDone(true); setTotalQ(t => t + 1);
    const isCorrect = sel === q.a;
    if (isCorrect) { setScore(s => s + 1); setCorrect(c => c + 1); setTimeout(() => SFX.correct(), 100); setAnsAnim('correct'); }
    else { setTimeout(() => SFX.wrong(), 80); setAnsAnim('wrong'); }
    setTimeout(() => setAnsAnim(''), 500);
    setTimeout(() => { if (bodyRef.current) bodyRef.current.scrollTop = 999; }, 200);
  };

  const handleNext = () => {
    stopSpeech(); setSpeaking(false); setSHint(false);
    if (SHOW_ADS) triggerAdRefresh();
    if (isLast) { SFX.roundComplete(); onAllDone(Math.ceil(shuffled.length / ROUND_SIZE)); return; }
    const nextQi = qi + 1;
    if (isRoundEnd) { setUF(false); setUH(false); setHid([]); setSHint(false); }
    setQi(nextQi); setSel(-1); setDone(false); setAnsAnim('');
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  };

  const doFifty = () => { if (usedF || done) return; setUF(true); SFX.select(); const wrong = sfl([0,1,2,3].filter(i => i !== q.a)).slice(0,2); setHid(wrong); if (wrong.includes(sel)) setSel(-1); };
  const doHint = () => { if (usedH || done) return; setUH(true); setSHint(true); SFX.select(); };

  const tw = timeLeft <= 10;
  const tc = timeLeft <= 10 ? '#FF6B6B' : timeLeft <= 20 ? LGOLD : GOLD;

  const optStyle = (i) => {
    if (hidden.includes(i)) return { display: 'none' };
    let border = `2px solid ${LGRAY}`, bg = WHITE, color = '#1a0030';
    if (!done && sel === i) { border = `2px solid ${meta.color}`; bg = meta.bg; color = meta.color; }
    if (done) {
      if (i === q.a) { border = `2px solid ${GREEN}`; bg = LGREEN; color = GREEN; }
      else if (i === sel && i !== q.a) { border = `2px solid ${RED}`; bg = LRED; color = RED; }
    }
    return { border, background: bg, color, padding: '11px 13px', borderRadius: 11, display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, fontWeight: 500, cursor: done ? 'default' : 'pointer', transition: 'all .18s', marginBottom: 7 };
  };

  const bubStyle = (i) => {
    if (hidden.includes(i)) return { display: 'none' };
    let bg = LGRAY, color = GRAY;
    if (!done && sel === i) { bg = meta.color; color = WHITE; }
    if (done && i === q.a) { bg = GREEN; color = WHITE; }
    if (done && i === sel && i !== q.a) { bg = RED; color = WHITE; }
    return { width: 28, height: 28, borderRadius: '50%', background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, transition: 'all .18s' };
  };

  if (!q) return null;

  return (
    <div className="scr" style={{ background: BG }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg,${DPURP},${meta.color || PURPLE})`, padding: '38px 15px 13px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
          <button onClick={() => { stopSpeech(); stopTimer(); onHome(); }} style={{ background: 'rgba(255,255,255,.12)', border: 'none', borderRadius: 8, padding: '5px 11px', color: 'rgba(255,255,255,.85)', fontSize: 11, fontWeight: 600 }}>⌂ Home</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: tc, animation: tw ? 'timerPulse .6s infinite' : 'none' }}>⏱ {timeLeft}s</div>
            <div style={{ background: 'rgba(0,0,0,.2)', color: LGOLD, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 14 }}>{correct}/{ROUND_SIZE}</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,.55)', marginBottom: 5 }}>
          <span>Q{(qi % ROUND_SIZE) + 1}/{ROUND_SIZE} · {meta.label}</span>
          <span>Round {roundNum + 1} · {(qi % ROUND_SIZE) + 1}/{ROUND_SIZE}</span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,.15)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: GOLD, borderRadius: 2, width: `${(((qi % ROUND_SIZE) + 1) / ROUND_SIZE) * 100}%`, transition: 'width .4s ease' }} />
        </div>
      </div>

      {/* Question Area */}
      <div ref={bodyRef} className="scroll" style={{ flex: 1, padding: '10px 13px 6px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {/* Lifelines */}
        <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
          <button onClick={doFifty} disabled={done} style={{ flex: 1, padding: '8px 8px', borderRadius: 10, border: usedF ? '1px solid #E5E7EB' : `1.5px solid ${GOLD}`, background: usedF ? '#f9f9f9' : WHITE, color: usedF ? '#ccc' : DGOLD, fontSize: 10, fontWeight: 700, opacity: usedF ? 0.38 : 1, cursor: usedF ? 'not-allowed' : 'pointer', animation: usedF ? 'fadeUsed .4s ease forwards' : 'powerGlow 2s ease-in-out infinite' }}>⚖️ 50/50</button>
          <button onClick={doHint} disabled={done} style={{ flex: 1, padding: '8px 8px', borderRadius: 10, border: usedH ? '1px solid #E5E7EB' : `1.5px solid ${PURPLE}`, background: usedH ? '#f9f9f9' : WHITE, color: usedH ? '#ccc' : PURPLE, fontSize: 10, fontWeight: 700, opacity: usedH ? 0.38 : 1, cursor: usedH ? 'not-allowed' : 'pointer', animation: usedH ? 'fadeUsed .4s ease forwards' : 'powerGlowP 2s ease-in-out infinite' }}>💡 Hint</button>
          <button onClick={toggleVoice} style={{ flex: 1, padding: '8px 8px', borderRadius: 10, border: `1.5px solid ${voiceEnabled ? GREEN : GRAY}`, background: voiceEnabled ? LGREEN : WHITE, color: voiceEnabled ? GREEN : GRAY, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>{speaking ? '🔊 Stop' : voiceEnabled ? '🔊 On' : '🔊 Off'}</button>
        </div>

        {showHint && <div className="su" style={{ background: '#FFFBEB', border: `1px solid ${GOLD}`, borderRadius: 11, padding: '9px 13px', flexShrink: 0 }}><div style={{ fontSize: 9, fontWeight: 700, color: DGOLD, letterSpacing: 1, marginBottom: 4 }}>HINT</div><div style={{ fontSize: 12, color: '#78350F', lineHeight: 1.55 }}>{q.h}</div></div>}

        {/* Question Card */}
        <div key={qi} className={`su ${ansAnim === 'correct' ? 'correct-pop' : ansAnim === 'wrong' ? 'wrong-shake' : ''}`} style={{ background: WHITE, borderRadius: 16, padding: 15, boxShadow: '0 3px 14px rgba(0,0,0,.08)', border: `2px solid ${done ? (sel === q.a ? GREEN : RED) : LGRAY}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: meta.color, letterSpacing: 1, textTransform: 'uppercase' }}>Q{qi + 1}</div>
            <div style={{ background: `${meta.color}18`, color: meta.color, fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 12 }}>{q.yr}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a0030', lineHeight: 1.55, marginBottom: 12 }}>{q.q}</div>
          {q.o.map((opt, i) => (
            <div key={i} style={optStyle(i)} onClick={() => handleSelect(i)}>
              <div style={bubStyle(i)}>{['A','B','C','D'][i]}</div>
              <span>{opt}</span>
            </div>
          ))}
        </div>

        {done && (
          <div className="su" style={{ background: `linear-gradient(135deg,${DPURP},${PURPLE})`, borderRadius: 14, padding: '13px 15px', flexShrink: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: GOLD, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 5 }}>QUICK TAKE</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.88)', lineHeight: 1.65 }}>{q.e.split('. ')[0]}.</div>
            <div onClick={() => setModal(true)} style={{ display: 'inline-block', marginTop: 7, fontSize: 10, fontWeight: 700, color: LGOLD, border: '1px solid rgba(212,175,55,.4)', padding: '3px 11px', borderRadius: 18, cursor: 'pointer', background: 'rgba(212,175,55,.08)' }}>Read full explanation →</div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div style={{ padding: '9px 13px 18px', display: 'flex', alignItems: 'center', gap: 9, background: BG, borderTop: `1px solid ${LGRAY}`, flexShrink: 0 }}>
        {!done && sel !== -1 && <button onClick={() => setSel(-1)} style={{ padding: '10px 13px', background: WHITE, border: `2px solid ${LGRAY}`, borderRadius: 11, fontSize: 12, fontWeight: 600, color: GRAY }}>✕</button>}
        {!done && <button onClick={handleSubmit} style={{ flex: 1, padding: '11px 18px', background: sel === -1 ? LGRAY : PURPLE, border: 'none', borderRadius: 11, fontSize: 13, fontWeight: 700, color: sel === -1 ? GRAY : WHITE, opacity: sel === -1 ? 0.55 : 1, cursor: sel === -1 ? 'not-allowed' : 'pointer', boxShadow: sel !== -1 ? '0 4px 14px rgba(75,0,130,.3)' : 'none' }}>Submit Answer</button>}
        {done && <button onClick={handleNext} style={{ marginLeft: 'auto', padding: '11px 20px', background: GOLD, border: 'none', borderRadius: 11, fontSize: 13, fontWeight: 700, color: DPURP, boxShadow: '0 4px 14px rgba(212,175,55,.4)', display: 'flex', alignItems: 'center', gap: 5 }}>{isLastQ ? 'Final Results →' : isRoundEnd ? 'See Results →' : 'Next →'}</button>}
      </div>

      {/* Modal */}
      {modal && (
        <div onClick={e => e.target === e.currentTarget && setModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }}>
          <div className="su" style={{ background: WHITE, borderRadius: '26px 26px 0 0', padding: '24px 22px 32px', width: '100%', maxHeight: '82%', overflowY: 'auto' }}>
            <div style={{ width: 36, height: 4, background: LGRAY, borderRadius: 2, margin: '0 auto 18px' }} />
            <div style={{ fontSize: 14, fontWeight: 800, color: PURPLE, marginBottom: 6 }}>💡 Full Explanation</div>
            <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.55, marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${LGRAY}`, fontStyle: 'italic' }}>{q.q}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: GOLD, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>WHY THIS ANSWER?</div>
            <div style={{ fontSize: 13, color: '#1a0030', lineHeight: 1.85 }}>{(q.full || q.e).split('\n').filter(l => l.trim()).map((para, i) => <p key={i} style={{ marginBottom: 12 }}>{para}</p>)}</div>
            <div style={{ marginTop: 14, background: `${meta.color}12`, border: `1px solid ${meta.color}30`, borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: meta.color, letterSpacing: 1, marginBottom: 4 }}>CORRECT ANSWER</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a0030' }}>{['A','B','C','D'][q.a]}. {q.o[q.a]}</div>
            </div>
            <button onClick={() => setModal(false)} style={{ width: '100%', padding: 13, background: PURPLE, border: 'none', borderRadius: 11, fontSize: 13, fontWeight: 700, color: WHITE }}>Got it ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SCORE CARD COMPONENT
// ============================================================================

function ScoreCard({ name, subjectId, score, correct, totalQ, onClose }) {
  const meta = SUBJ[subjectId] || SUBJ.economics;
  const pct = totalQ ? Math.round((correct / totalQ) * 100) : 0;
  const wrong = totalQ - correct;
  const grade = pct >= 80 ? { emoji: '🏆', label: 'ELITE', ac: '#F59E0B', bg: 'rgba(245,158,11,.18)' } : pct >= 60 ? { emoji: '⭐', label: 'SHARP', ac: GOLD, bg: 'rgba(212,175,55,.18)' } : pct >= 40 ? { emoji: '💪', label: 'RISING', ac: '#06B6D4', bg: 'rgba(6,182,212,.18)' } : { emoji: '📚', label: 'LEARNING', ac: LGOLD, bg: 'rgba(255,235,130,.12)' };
  
  const messages = {
    elite: [`${name} e choke!! 🔥 No be every person fit score like this — you be different breed!`, `Omo! ${name} don enter another level!`],
    sharp: [`${name} you dey gbadun!! Score like this no be beans — continue like this!`, `Oya ${name}, the momentum dey!`],
    rising: [`${name} you don start o! Small small e go reach top — no stop now!`, `${name} the hustle dey show — keep reading the explanations!`],
    learning: [`${name} no vex — everybody start from somewhere! Review every explanation 📖`, `${name} this na your beginning — great JAMB scores take practise!`],
  };
  const pool = pct >= 80 ? messages.elite : pct >= 60 ? messages.sharp : pct >= 40 ? messages.rising : messages.learning;
  const msg = pool[Math.floor(Math.random() * pool.length)];
  const shareText = `${grade.emoji} ${msg}\n\nI scored ${correct}/${totalQ} (${pct}%) in ${meta.label} on EliteScholars CBT!\n\n🎓 Free JAMB practice at ${APP_URL} — by Elite JAMB & PUTME Clinic`;

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 20 }}>
      <div className="su" style={{ width: '100%', maxWidth: 340, borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,.6)' }}>
        <div style={{ background: `linear-gradient(150deg, #0d001a 0%, ${meta.color}60 55%, #150028 100%)`, padding: '24px 22px 18px', position: 'relative', overflow: 'hidden' }}>
          {[...Array(8)].map((_, i) => <div key={i} style={{ position: 'absolute', width: 3+(i%3), height: 3+(i%3), borderRadius: '50%', background: grade.ac, opacity: 0.35, left: `${10+i*11}%`, top: `${15+Math.sin(i)*30}%` }} />)}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}><div style={{ fontSize: 10, color: 'rgba(255,255,255,.38)' }}>EliteScholars CBT</div><div style={{ background: grade.bg, border: `1px solid ${grade.ac}`, color: grade.ac, fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>{grade.label}</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 40 }}>{grade.emoji}</div><div style={{ fontSize: 56, fontWeight: 900, color: grade.ac, lineHeight: 1 }}>{pct}<span style={{ fontSize: 22 }}>%</span></div><div style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,.6)' }}>{correct}/{totalQ} correct</div></div>
          <div style={{ textAlign: 'center', marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.1)' }}><div style={{ fontSize: 15, fontWeight: 800, color: WHITE }}>{name}</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>{meta.icon} {meta.label} · JAMB Practice</div></div>
        </div>
        <div style={{ background: '#110020', display: 'flex' }}>
          {[['✅', correct, 'Correct', GREEN], ['❌', wrong, 'Wrong', RED], ['🏅', score, 'Points', grade.ac]].map(([ico, v, l, c]) => <div key={l} style={{ flex: 1, padding: '13px 8px', textAlign: 'center' }}><div style={{ fontSize: 10 }}>{ico}</div><div style={{ fontSize: 20, fontWeight: 900, color: c }}>{v}</div><div style={{ fontSize: 9, color: 'rgba(255,255,255,.3)' }}>{l}</div></div>)}
        </div>
        <div style={{ background: '#0d0018', padding: '13px 20px' }}><div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', fontStyle: 'italic', textAlign: 'center' }}>"{msg}"</div></div>
        <div style={{ background: '#0a0015', padding: '14px 18px 18px' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.2)', textAlign: 'center', marginBottom: 11 }}>{APP_URL}</div>
          <button onClick={() => { window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank'); onClose(); }} style={{ width: '100%', padding: 13, background: '#25D366', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, color: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 9 }}>📤 Share My Score Card</button>
          <button onClick={onClose} style={{ width: '100%', padding: 10, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, fontSize: 12, color: 'rgba(255,255,255,.32)' }}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// RESULT SCREEN
// ============================================================================

function Result({ name, subjectId, score, correct, totalQ, totalSessions, onHome, onProfile, onAdGateComplete }) {
  const [showCard, setShowCard] = useState(false);
  const [adCompleted, setAdCompleted] = useState(false);
  const meta = SUBJ[subjectId] || SUBJ.economics;
  const pct = totalQ ? Math.round((correct / totalQ) * 100) : 0;
  const wrong = totalQ - correct;

  // Check if we need to show ad gate (replaces share gate)
  const needAdGate = SHOW_POPOVER_AD && totalSessions > 0 && totalSessions % SHARE_GATE_EVERY === 0;
  const showGroup = !needAdGate && !SHOW_POPOVER_AD && totalSessions % 2 === 1;
  const showChannel = !needAdGate && !SHOW_POPOVER_AD && totalSessions % 2 === 0;

  const msgs = [[80, "Excellent! You're in the top league. 300+ is within reach."], [60, "Good work! A bit more practice and you're unstoppable."], [40, 'Not bad. Review the explanations and come back.'], [0, "Every session makes you sharper. Don't stop."]];
  const msg = msgs.find(([t]) => pct >= t)[1];
  const vibe = ['Your brain is literally built different right now!', 'Every question moved you closer to your dream school.', "This is what serious JAMB students look like!", "You're in Elite territory!"][Math.floor(Math.random() * 4)];
  const waShareText = shareMsg(name, meta.label, correct, totalQ);

  useEffect(() => { setTimeout(() => SFX.roundComplete(), 400); }, []);

  const handlePlayAgain = () => {
    if (needAdGate && !adCompleted) {
      // Show ad gate first
      onAdGateComplete(() => {
        setAdCompleted(true);
        onHome();
      });
    } else {
      onHome();
    }
  };

  return (
    <div className="scr fd" style={{ background: BG }}>
      <div style={{ background: `linear-gradient(135deg,${DPURP},${meta.color || PURPLE})`, padding: '40px 20px 62px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ width: 108, height: 108, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: `3px solid ${GOLD}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: GOLD }}>{correct}/{totalQ}</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,.55)' }}>FINAL SCORE</div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: WHITE }}>{name}!</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', marginTop: 4 }}>{msg}</div>
      </div>

      <div className="scroll" style={{ flex: 1, padding: '0 16px 20px', marginTop: -18 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[['Correct', correct], ['Wrong', wrong], ['Points', score]].map(([l, v]) => <div key={l} style={{ flex: 1, background: WHITE, borderRadius: 13, padding: '12px 9px', textAlign: 'center' }}><div style={{ fontSize: 18, fontWeight: 800, color: PURPLE }}>{v}</div><div style={{ fontSize: 9, color: GRAY }}>{l}</div></div>)}
        </div>

        <button onClick={() => { SFX.select(); setShowCard(true); }} style={{ width: '100%', padding: '13px 16px', background: `linear-gradient(135deg,${meta.color},${DPURP})`, border: 'none', borderRadius: 13, fontSize: 13, fontWeight: 700, color: WHITE, marginBottom: 12 }}>🖼️ Show Friends Your Score Card</button>

        {/* AD GATE SECTION - Replaces Share Gate */}
        {needAdGate && !adCompleted && (
          <div style={{ background: `linear-gradient(135deg,${DPURP},#3d0070)`, borderRadius: 16, padding: '16px 18px', marginBottom: 12 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: GOLD, marginBottom: 6 }}>🎬 UNLOCK NEXT ROUND</div>
            <div style={{ fontSize: 12, color: WHITE, marginBottom: 12, fontStyle: 'italic' }}>"{vibe}"</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', marginBottom: 12, textAlign: 'center' }}>
              Watch a quick ad to unlock your next quiz round!<br />
              This helps keep EliteScholars free for everyone. 🙏
            </div>
            <button onClick={() => onAdGateComplete(handlePlayAgain)} style={{ width: '100%', padding: 14, background: GOLD, border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, color: DPURP }}>
              🎬 Watch Ad & Continue
            </button>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', textAlign: 'center', marginTop: 10 }}>
              Ad supports free JAMB practice
            </div>
          </div>
        )}

        {needAdGate && adCompleted && (
          <div className="su" style={{ background: 'rgba(22,163,74,.18)', border: `1px solid ${GREEN}`, borderRadius: 13, padding: '13px 16px', textAlign: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80', marginBottom: 3 }}>✅ Ad Complete! Next round unlocked!</div>
            <button onClick={onHome} style={{ width: '100%', padding: 12, background: GOLD, border: 'none', borderRadius: 11, fontSize: 13, fontWeight: 700, color: DPURP, marginTop: 10 }}>🔄 Play Again</button>
          </div>
        )}

        {/* Legacy Share Gate (only if popover ads are disabled) */}
        {!SHOW_POPOVER_AD && (
          <>
            {showGroup && (
              <div style={{ background: `linear-gradient(135deg,${DPURP},${PURPLE})`, borderRadius: 16, padding: 16, textAlign: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 4 }}>Join Our WhatsApp Group 💬</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', marginBottom: 12 }}>Practise with other serious JAMB students daily.</div>
                <button onClick={() => window.open(WA_GROUP, '_blank')} style={{ width: '100%', padding: 12, background: '#25D366', border: 'none', borderRadius: 11, fontSize: 13, fontWeight: 700, color: WHITE, marginBottom: 8 }}>💬 Join WhatsApp Group</button>
                <button onClick={onHome} style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: WHITE }}>🔄 Play Again</button>
              </div>
            )}

            {showChannel && (
              <div style={{ background: `linear-gradient(135deg,${DPURP},${PURPLE})`, borderRadius: 16, padding: 16, textAlign: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 4 }}>Follow Our WhatsApp Channel 📲</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', marginBottom: 12 }}>Daily questions, tips &amp; serious JAMB community.</div>
                <button onClick={() => window.open(WA_CHANNEL, '_blank')} style={{ width: '100%', padding: 12, background: '#25D366', border: 'none', borderRadius: 11, fontSize: 13, fontWeight: 700, color: WHITE, marginBottom: 8 }}>📢 Follow Elite JAMB Channel</button>
                <button onClick={onHome} style={{ width: '100%', padding: 12, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 11, fontSize: 13, fontWeight: 700, color: WHITE }}>🔄 Play Again</button>
              </div>
            )}
          </>
        )}

        {/* If no gate needed, show Play Again button */}
        {!needAdGate && !showGroup && !showChannel && (
          <button onClick={onHome} style={{ width: '100%', padding: 14, background: GOLD, border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, color: DPURP, marginBottom: 12 }}>
            🔄 Play Again
          </button>
        )}

        <button onClick={onProfile} style={{ width: '100%', padding: 13, background: WHITE, border: `2px solid ${PURPLE}`, borderRadius: 13, fontSize: 13, fontWeight: 700, color: PURPLE, marginBottom: 8 }}>📊 View My Profile</button>
        <button onClick={onHome} style={{ width: '100%', padding: 12, background: BG, border: `1px solid ${LGRAY}`, borderRadius: 13, fontSize: 12, fontWeight: 600, color: GRAY }}>⌂ Back to Main Menu</button>
      </div>

      {showCard && <ScoreCard name={name} subjectId={subjectId} score={score} correct={correct} totalQ={totalQ} onClose={() => setShowCard(false)} />}
    </div>
  );
}

// ============================================================================
// PROFILE SCREEN
// ============================================================================

function Profile({ name, email, sessions, streak, allScores, bestScore, onBack, onSignOut }) {
  const initials = name ? name.slice(0, 2).toUpperCase() : 'ME';
  const avg = allScores.length ? Math.round(allScores.reduce((a,b) => a+b, 0) / allScores.length) : 0;
  const rank = bestScore >= 38 ? '🏆 Elite Scholar' : bestScore >= 30 ? '⭐ Rising Star' : bestScore >= 20 ? '📚 Sharp Guy' : '🌱 Beginner';

  return (
    <div className="scr fd" style={{ background: BG }}>
      <div style={{ background: `linear-gradient(135deg,${DPURP},${PURPLE})`, padding: '44px 20px 68px', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: -20, left: 0, right: 0, height: 40, background: BG, borderRadius: '24px 24px 0 0' }} />
        <div onClick={onBack} style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.5)', cursor: 'pointer', marginBottom: 16 }}>← Back</div>
        <div style={{ width: 68, height: 68, borderRadius: '50%', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: DPURP, margin: '0 auto 10px', border: '3px solid rgba(255,255,255,.22)' }}>{initials}</div>
        <div style={{ fontSize: 19, fontWeight: 800, color: WHITE, textAlign: 'center' }}>{name || 'Student'}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', textAlign: 'center', marginTop: 2 }}>{email}</div>
        <div style={{ display: 'flex', gap: 7, justifyContent: 'center', marginTop: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 700, padding: '4px 11px', borderRadius: 20, background: 'rgba(212,175,55,.2)', border: `1px solid ${GOLD}`, color: LGOLD }}>🔥 {streak} Day{streak !== 1 ? 's' : ''} Streak</div>
          <div style={{ fontSize: 10, fontWeight: 700, padding: '4px 11px', borderRadius: 20, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', color: WHITE }}>{rank}</div>
        </div>
      </div>
      <div className="scroll" style={{ flex: 1, padding: '28px 16px 20px', display: 'flex', flexDirection: 'column', gap: 11 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: GRAY, textTransform: 'uppercase' }}>Your Stats</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
          {[['Quizzes Done', sessions || 0], ['Avg Score', avg + '%'], ['Best Score', bestScore + '/' + ROUND_SIZE], ['Streak', streak + ' days']].map(([l, v]) => <div key={l} style={{ background: WHITE, borderRadius: 13, padding: '13px 12px' }}><div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>{v}</div><div style={{ fontSize: 10, color: GRAY }}>{l}</div></div>)}
        </div>
        <div style={{ background: `linear-gradient(135deg,${DPURP},${PURPLE})`, borderRadius: 13, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 28 }}>🔥</div>
          <div><div style={{ fontSize: 16, fontWeight: 800, color: GOLD }}>{streak}-Day Streak</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)' }}>Come back daily to keep it alive!</div></div>
        </div>
        <button onClick={onSignOut} style={{ padding: 13, background: 'transparent', border: '1px solid rgba(220,38,38,.35)', borderRadius: 13, fontSize: 13, fontWeight: 700, color: '#DC2626' }}>↩ Sign Out</button>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
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
      
      {/* Bottom Ads */}
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
