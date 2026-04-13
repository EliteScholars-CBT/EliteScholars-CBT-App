import React from 'react';
import { BG, PURPLE, GOLD, WHITE } from '../utils/colors';

export default function ExamTypeSelect({ onSelectExam, onBack }) {
  return (
    <div className="scr fd exam-type-page">
      <div className="exam-type-header-section">
        <button className="exam-type-back-btn" onClick={onBack}>
          ← Back
        </button>
        <div className="exam-type-header-content">
          <div className="exam-type-icon">📚</div>
          <h1>Choose <span style={{ color: GOLD }}>Exam Type</span></h1>
          <p>Select the exam you want to practice for</p>
        </div>
      </div>

      <div className="exam-type-container">
        {/* JAMB Card - Always Available */}
        <div 
          className="exam-type-card jamb-card"
          onClick={() => onSelectExam('jamb')}
        >
          <div className="exam-type-card-icon">📝</div>
          <div className="exam-type-card-title">JAMB</div>
          <div className="exam-type-card-description">
            Joint Admissions and Matriculation Board<br />
            Unified Tertiary Matriculation Examination
          </div>
          <div className="exam-type-card-features">
            <span>✅ 4 Subjects</span>
            <span>✅ 180 Questions</span>
            <span>✅ 2 Hours</span>
          </div>
          <div className="exam-type-card-badge available">Available</div>
        </div>

        {/* POST UTME Card */}
        <div 
          className="exam-type-card postutme-card"
          onClick={() => onSelectExam('postutme')}
        >
          <div className="exam-type-card-icon">🎓</div>
          <div className="exam-type-card-title">POST UTME</div>
          <div className="exam-type-card-description">
            Post-Unified Tertiary Matriculation Examination<br />
            University-specific screening
          </div>
          <div className="exam-type-card-features">
            <span>✅ University Selection</span>
            <span>✅ Past Questions</span>
            <span>✅ CBT Practice</span>
          </div>
          <div className="exam-type-card-badge available">Available</div>
        </div>
      </div>
    </div>
  );
}
