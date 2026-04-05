import React, { useEffect, useRef } from 'react';
import { GOLD, WHITE, LGOLD } from '../utils/colors';
import { SFX } from '../utils/sounds';
import { loadPopoverAd } from '../utils/ads';
import logo from '../assets/elite-scholars-cbt-logo.png';

export default function Splash({ onDone }) {
  const stars = useRef(Array.from({ length: 22 }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    delay: Math.random() * 3, dur: 1.5 + Math.random() * 2
  }))).current;
  
  useEffect(() => {
    loadPopoverAd();
  }, []);
  
  useEffect(() => {
    const s = setTimeout(() => SFX.splash(), 300);
    const t = setTimeout(onDone, 2800);
    return () => { clearTimeout(s); clearTimeout(t); };
  }, []);
  
  return (
    <div className="scr splash-container">
      {stars.map(s => <div key={s.id} className="star" style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }} />)}
      <img src={logo} alt="Elite Scholars CBT Logo" className="splash-logo" />
      <div className="splash-title">Elite<span style={{ color: GOLD }}>Scholars</span> CBT</div>
      <div className="splash-subtitle">JAMB Practice · 9 Subjects</div>
      <div className="splash-load-bar"><div className="splash-load-progress" /></div>
      <div className="splash-footer">by Elite JAMB &amp; PUTME Clinic</div>
    </div>
  );
}
