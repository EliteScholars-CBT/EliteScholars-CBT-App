import React from 'react';
import { BG, PURPLE, GOLD, WHITE, LGRAY, GRAY } from '../utils/colors';

export default function About({ onBack }) {
  return (
    <div className="scr fd about-page">
      {/* Header */}
      <div className="about-header-section">
        <button className="about-back-btn" onClick={onBack}>
          ← Back
        </button>
        <div className="about-header-content">
          <div className="about-logo">🎓</div>
          <h1>Elite<span style={{ color: GOLD }}>Scholars</span> CBT</h1>
          <p>Your Ultimate JAMB Preparation Companion</p>
        </div>
      </div>

      {/* Content */}
      <div className="about-content">
        {/* About Us */}
        <div className="about-card">
          <div className="about-card-icon">📖</div>
          <div className="about-card-content">
            <h3>About Us</h3>
            <p>EliteScholars CBT is a comprehensive Computer-Based Test preparation platform designed specifically for JAMB candidates. Our mission is to make quality exam preparation accessible, affordable, and effective for every Nigerian student.</p>
          </div>
        </div>

        {/* Features */}
        <div className="about-card">
          <div className="about-card-icon">✨</div>
          <div className="about-card-content">
            <h3>Features</h3>
            <ul className="about-features-list">
              <li>✅ Over 2,000+ JAMB-style questions across 9 subjects</li>
              <li>✅ Realistic CBT simulation with timer</li>
              <li>✅ Detailed explanations for every question</li>
              <li>✅ Performance tracking and analytics</li>
              <li>✅ Achievements and gamification</li>
              <li>✅ Dark/Light mode support</li>
              <li>✅ Flashcard learning mode</li>
              <li>✅ Works offline (PWA ready)</li>
            </ul>
          </div>
        </div>

        {/* Subjects Covered */}
        <div className="about-card">
          <div className="about-card-icon">📚</div>
          <div className="about-card-content">
            <h3>Subjects Covered</h3>
            <div className="about-subjects-grid">
              <span className="about-subject-tag">English</span>
              <span className="about-subject-tag">Mathematics</span>
              <span className="about-subject-tag">Physics</span>
              <span className="about-subject-tag">Chemistry</span>
              <span className="about-subject-tag">Biology</span>
              <span className="about-subject-tag">Economics</span>
              <span className="about-subject-tag">Accounting</span>
              <span className="about-subject-tag">Government</span>
              <span className="about-subject-tag">Literature</span>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="about-card">
          <div className="about-card-icon">👨‍💻</div>
          <div className="about-card-content">
            <h3>Our Team</h3>
            <p>EliteScholars CBT is brought to you by <strong>Elite JAMB &amp; PUTME Clinic</strong> — a team of experienced educators, examiners, and tech professionals dedicated to helping students achieve 300+ in JAMB.</p>
          </div>
        </div>

        {/* Contact */}
        <div className="about-card">
          <div className="about-card-icon">📞</div>
          <div className="about-card-content">
            <h3>Contact Us</h3>
            <p>📧 <a href="mailto:elitescholars.site@gmail.com" className="about-link">elitescholars.site@gmail.com</a></p>
            <p>📱 Follow us on social media for daily tips and updates</p>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats">
          <div className="about-stat">
            <div className="about-stat-number">9+</div>
            <div className="about-stat-label">Subjects</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-number">2000+</div>
            <div className="about-stat-label">Questions</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-number">100%</div>
            <div className="about-stat-label">Free</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="about-footer">
        <p>© 2026 EliteScholars CBT. All rights reserved.</p>
        <p className="about-version">Version 2.0.0</p>
      </div>
    </div>
  );
}
