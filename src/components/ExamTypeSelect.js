import React from 'react';
import { EXAM_TYPES } from '../utils/constants';
import { GOLD } from '../utils/colors';

// ============================================================================
// ExamTypeSelect — Compact grid layout (3 cols / 2 cols alternating)
// Icon + label only, keyboard navigable
// ============================================================================

export default function ExamTypeSelect({ onSelectExam }) {
  // Keyboard navigation
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectExam(id);
    }
  };

  return (
    <div className="scr fd exam-type-page">
      <div className="exam-type-header-section">
        <div className="exam-type-header-content">
          <div className="exam-type-icon">📚</div>
          <h1>
            What are you <span style={{ color: GOLD }}>studying</span> for?
          </h1>
          <p>Pick your focus — CBT, Learn, Game Mode and more await</p>
        </div>
      </div>

      {/* Compact grid — 3 columns, wraps to 2 for even items */}
      <div className="exam-type-compact-grid">
        {EXAM_TYPES.map((exam, idx) => (
          <div
            key={exam.id}
            className={`exam-type-compact-card ${idx % 2 === 0 ? 'span-three' : 'span-two'}`}
            style={{ '--exam-color': exam.color }}
            role="button"
            tabIndex={0}
            onClick={() => onSelectExam(exam.id)}
            onKeyDown={(e) => handleKeyDown(e, exam.id)}
            aria-label={`Select ${exam.label}`}
          >
            <span className="exam-type-compact-icon">{exam.icon}</span>
            <span className="exam-type-compact-label">{exam.label}</span>
            <span className="exam-type-compact-desc">{exam.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
