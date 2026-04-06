import React from 'react';
import { BG, PURPLE, GOLD, WHITE } from '../utils/colors';

export default function ModeSelect({ onSelectMode }) {
  return (
    <div className="scr fd" style={{ background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: 30 }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>📚</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: PURPLE }}>Choose Your Study Mode</div>
        <div style={{ fontSize: 14, color: '#6B7280', marginTop: 8 }}>Pick how you want to learn today</div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 350 }}>
        {/* CBT Mode Button */}
        <button 
          onClick={() => onSelectMode('cbt')}
          style={{
            background: `linear-gradient(135deg, ${PURPLE}, ${GOLD})`,
            border: 'none',
            borderRadius: 20,
            padding: '30px 20px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 8px 25px rgba(75, 0, 130, 0.3)'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(75, 0, 130, 0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(75, 0, 130, 0.3)'; }}
        >
          <div style={{ fontSize: 48, marginBottom: 10 }}>📝</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 5 }}>CBT Practice</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>Take timed quizzes with multiple choice questions</div>
          <div style={{ marginTop: 15, display: 'flex', gap: 10, justifyContent: 'center' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20, fontSize: 11 }}>⏱️ Timed</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20, fontSize: 11 }}>📊 Track Progress</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20, fontSize: 11 }}>🏆 Achievements</span>
          </div>
        </button>
        
        {/* Flashcard Mode Button */}
        <button 
          onClick={() => onSelectMode('flashcard')}
          style={{
            background: `linear-gradient(135deg, #1a0030, #4B0082)`,
            border: `2px solid ${GOLD}`,
            borderRadius: 20,
            padding: '30px 20px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)'; }}
        >
          <div style={{ fontSize: 48, marginBottom: 10 }}>🃏</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 5 }}>Flashcards</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>Learn key concepts quickly with bite-sized cards</div>
          <div style={{ marginTop: 15, display: 'flex', gap: 10, justifyContent: 'center' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20, fontSize: 11 }}>🎴 Bite-sized</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20, fontSize: 11 }}>⚡ Quick Learning</span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20, fontSize: 11 }}>🔄 Swipe to Learn</span>
          </div>
        </button>
      </div>
    </div>
  );
}
