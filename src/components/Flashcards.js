import React, { useState, useEffect } from 'react';
import { SUBJ } from '../data/subjects';
import { getFlashcardsForSubject } from '../data/flashcards';
import { BG, PURPLE, GOLD, WHITE, LGRAY, GREEN, RED } from '../utils/colors';

export default function Flashcards({ subjectId, onBack }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const meta = SUBJ[subjectId] || SUBJ.english;
  const currentCard = cards[currentIndex];
  const totalCards = cards.length;
  const progress = ((currentIndex + 1) / totalCards) * 100;

  useEffect(() => {
    // Load flashcards for selected subject
    const flashcards = getFlashcardsForSubject(subjectId);
    setCards(flashcards.map(card => ({ ...card, known: false })));
  }, [subjectId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    const updatedCards = [...cards];
    updatedCards[currentIndex].known = true;
    setCards(updatedCards);
    setKnownCount(knownCount + 1);
    handleNext();
  };

  const handleUnknown = () => {
    const updatedCards = [...cards];
    updatedCards[currentIndex].known = false;
    setCards(updatedCards);
    setUnknownCount(unknownCount + 1);
    handleNext();
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex + 1 < totalCards) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setKnownCount(0);
    setUnknownCount(0);
    setShowResult(false);
    setIsFlipped(false);
    // Reset all cards to unknown
    setCards(cards.map(card => ({ ...card, known: false })));
  };

  if (showResult) {
    const percentage = totalCards > 0 ? Math.round((knownCount / totalCards) * 100) : 0;
    return (
      <div className="scr fd" style={{ background: BG }}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <button onClick={onBack} style={{ position: 'absolute', top: 20, left: 20, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>←</button>
          <div style={{ fontSize: 48, marginTop: 40 }}>📊</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: PURPLE, marginTop: 20 }}>Session Complete!</div>
          <div style={{ fontSize: 14, color: '#6B7280', marginTop: 8 }}>You've reviewed all {totalCards} flashcards</div>
          
          <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center', gap: 30 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: GREEN }}>{knownCount}</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>Known</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: RED }}>{unknownCount}</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>Review Again</div>
            </div>
          </div>
          
          <div style={{ marginTop: 20, width: '80%', margin: '20px auto' }}>
            <div style={{ height: 10, background: LGRAY, borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ width: `${percentage}%`, height: '100%', background: GOLD, borderRadius: 5 }}></div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{percentage}% Mastered</div>
          </div>
          
          <button onClick={handleRestart} style={{ marginTop: 30, padding: '12px 30px', background: PURPLE, color: WHITE, border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            🔄 Study Again
          </button>
          <button onClick={onBack} style={{ marginTop: 15, marginLeft: 10, padding: '12px 30px', background: 'transparent', border: `2px solid ${PURPLE}`, color: PURPLE, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            📚 Back to Subjects
          </button>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return <div style={{ padding: 20, textAlign: 'center' }}>Loading flashcards...</div>;
  }

  return (
    <div className="scr fd" style={{ background: BG }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #280050, ${meta.color || PURPLE})`, padding: '20px', position: 'relative' }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, padding: '8px 15px', color: WHITE, cursor: 'pointer' }}>
          ← Back
        </button>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <div style={{ fontSize: 40 }}>{meta.icon}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: WHITE }}>{meta.label} Flashcards</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Card {currentIndex + 1} of {totalCards}</div>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, marginTop: 15, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: GOLD, borderRadius: 2 }}></div>
        </div>
      </div>

      {/* Flashcard */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div 
          onClick={handleFlip}
          style={{
            width: '100%',
            maxWidth: 400,
            height: 350,
            background: WHITE,
            borderRadius: 24,
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            position: 'relative',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
            transition: 'transform 0.6s',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Front of card */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            borderRadius: 24,
            background: `linear-gradient(135deg, ${WHITE}, #f5f0ff)`
          }}>
            <div style={{ fontSize: 14, color: GOLD, fontWeight: 600, marginBottom: 20 }}>📖 TERM</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: PURPLE, textAlign: 'center', lineHeight: 1.4 }}>
              {currentCard.term}
            </div>
            <div style={{ marginTop: 30, fontSize: 12, color: '#6B7280' }}>
              👆 Tap to flip
            </div>
          </div>
          
          {/* Back of card */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            borderRadius: 24,
            background: WHITE,
            overflowY: 'auto'
          }}>
            <div style={{ fontSize: 12, color: GOLD, fontWeight: 600, marginBottom: 10 }}>📝 DEFINITION</div>
            <div style={{ fontSize: 15, color: '#1a0030', lineHeight: 1.6, marginBottom: 15 }}>
              {currentCard.definition}
            </div>
            {currentCard.example && (
              <>
                <div style={{ fontSize: 12, color: PURPLE, fontWeight: 600, marginBottom: 5 }}>💡 EXAMPLE</div>
                <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.5, marginBottom: 15 }}>
                  {currentCard.example}
                </div>
              </>
            )}
            {currentCard.tip && (
              <>
                <div style={{ fontSize: 12, color: GOLD, fontWeight: 600, marginBottom: 5 }}>✨ TIP</div>
                <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.5 }}>
                  {currentCard.tip}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ padding: '20px', display: 'flex', gap: 15, justifyContent: 'center' }}>
        <button 
          onClick={handleUnknown}
          style={{
            flex: 1,
            padding: '14px',
            background: RED,
            border: 'none',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            color: WHITE,
            cursor: 'pointer',
            maxWidth: 150
          }}
        >
          ❌ Need Review
        </button>
        <button 
          onClick={handleKnown}
          style={{
            flex: 1,
            padding: '14px',
            background: GREEN,
            border: 'none',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            color: WHITE,
            cursor: 'pointer',
            maxWidth: 150
          }}
        >
          ✅ I Know This
        </button>
      </div>
      
      <div style={{ textAlign: 'center', paddingBottom: 20, fontSize: 12, color: '#6B7280' }}>
        Swipe card or tap to flip • {knownCount} known • {unknownCount} to review
      </div>
    </div>
  );
}
