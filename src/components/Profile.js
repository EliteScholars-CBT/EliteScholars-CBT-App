import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { DPURP, PURPLE, BG, WHITE, GRAY, GOLD, LGOLD } from '../utils/colors';
import { ROUND_SIZE, ACHIEVEMENTS } from '../utils/constants';
import { loadAchievements, loadSubjectPerformance } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';

export default function Profile({ name, email, sessions, streak, allScores, bestScore, onBack, onSignOut }) {
  const [activeTab, setActiveTab] = useState('stats');
  const [achievements, setAchievements] = useState([]);
  const [subjectPerformance, setSubjectPerformance] = useState({});
  const [performanceData, setPerformanceData] = useState([]);
  const [subjectChartData, setSubjectChartData] = useState([]);
  const { theme, toggleTheme } = useTheme();

  const initials = name ? name.slice(0, 2).toUpperCase() : 'ME';
  const avg = allScores.length ? Math.round(allScores.reduce((a,b) => a+b, 0) / allScores.length) : 0;
  const rank = bestScore >= 38 ? '🏆 Elite Scholar' : bestScore >= 30 ? '⭐ Rising Star' : bestScore >= 20 ? '📚 Sharp Guy' : '🌱 Beginner';

  useEffect(() => {
    // Load achievements
    const userAchievements = loadAchievements(email);
    const achievementList = userAchievements.map(id => ACHIEVEMENTS[id]).filter(a => a);
    setAchievements(achievementList);

    // Load subject performance
    const perf = loadSubjectPerformance(email);
    setSubjectPerformance(perf);

    // Prepare performance chart data (last 10 quizzes)
    const lastTenScores = allScores.slice(-10);
    const chartData = lastTenScores.map((score, index) => ({
      quiz: index + 1,
      score: score,
    }));
    setPerformanceData(chartData);

    // Prepare subject chart data
    const subjects = ['english', 'mathematics', 'physics', 'chemistry', 'biology', 'economics', 'accounting', 'government', 'literature'];
    const subjectData = subjects.map(sub => {
      const perfData = perf[sub] || { bestScore: 0, averageScore: 0, total: 0 };
      return {
        subject: sub.charAt(0).toUpperCase() + sub.slice(1),
        bestScore: perfData.bestScore || 0,
        averageScore: Math.round(perfData.averageScore || 0),
        attempts: perfData.total || 0
      };
    }).filter(s => s.attempts > 0);
    setSubjectChartData(subjectData);
  }, [email, allScores]);

  return (
    <div className="scr fd" style={{ background: BG }}>
      <div className="profile-header" style={{ background: `linear-gradient(135deg,${DPURP},${PURPLE})` }}>
        <div style={{ position: 'absolute', bottom: -20, left: 0, right: 0, height: 40, background: BG, borderRadius: '24px 24px 0 0' }} />
        <div className="profile-back" onClick={onBack}>← Back</div>
        <div className="profile-avatar">{initials}</div>
        <div className="profile-name">{name || 'Student'}</div>
        <div className="profile-email">{email}</div>
        <div className="profile-badges">
          <div className="profile-streak-badge">🔥 {streak} Day{streak !== 1 ? 's' : ''} Streak</div>
          <div className="profile-rank-badge">{rank}</div>
        </div>
      </div>

      <div className="profile-tabs">
        <button className={`profile-tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
          📊 Stats
        </button>
        <button className={`profile-tab ${activeTab === 'subjects' ? 'active' : ''}`} onClick={() => setActiveTab('subjects')}>
          📚 Subjects
        </button>
        <button className={`profile-tab ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>
          🏆 Achievements ({achievements.length})
        </button>
        <button className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          ⚙️ Settings
        </button>
      </div>

      <div className="profile-stats-section">
        {activeTab === 'stats' && (
          <>
            <div className="profile-stats-title">Your Stats</div>
            <div className="profile-stats-grid">
              {[['Quizzes Done', sessions || 0], ['Avg Score', avg + '%'], ['Best Score', bestScore + '/' + ROUND_SIZE], ['Streak', streak + ' days']].map(([l, v]) => (
                <div key={l} className="profile-stat-card">
                  <div className="profile-stat-value">{v}</div>
                  <div className="profile-stat-label">{l}</div>
                </div>
              ))}
            </div>

            {performanceData.length > 0 && (
              <div className="profile-chart-section">
                <div className="profile-stats-title">📈 Performance Trend</div>
                <div className="profile-chart-container">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={performanceData}>
                      <XAxis dataKey="quiz" stroke="#6B7280" fontSize={10} />
                      <YAxis domain={[0, 100]} stroke="#6B7280" fontSize={10} />
                      <Tooltip 
                        contentStyle={{ background: '#1a0030', border: `1px solid ${GOLD}`, borderRadius: 8 }}
                        labelStyle={{ color: '#FFFFFF' }}
                        itemStyle={{ color: GOLD }}
                      />
                      <Line type="monotone" dataKey="score" stroke={GOLD} strokeWidth={2} dot={{ fill: GOLD, r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="profile-streak-card">
              <div className="profile-streak-icon">🔥</div>
              <div>
                <div className="profile-streak-title">{streak}-Day Streak</div>
                <div className="profile-streak-text">Come back daily to keep it alive!</div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'subjects' && (
          <>
            <div className="profile-stats-title">📚 Subject Performance</div>
            {subjectChartData.length > 0 ? (
              <div className="profile-chart-section">
                <div className="profile-chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectChartData} layout="vertical" margin={{ left: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" domain={[0, 100]} stroke="#6B7280" fontSize={10} />
                      <YAxis type="category" dataKey="subject" stroke="#6B7280" fontSize={10} width={80} />
                      <Tooltip 
                        contentStyle={{ background: '#1a0030', border: `1px solid ${GOLD}`, borderRadius: 8 }}
                        labelStyle={{ color: '#FFFFFF' }}
                        itemStyle={{ color: GOLD }}
                      />
                      <Bar dataKey="bestScore" name="Best Score" fill={GOLD} radius={[0, 4, 4, 0]} />
                      <Bar dataKey="averageScore" name="Average Score" fill={PURPLE} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="profile-empty-state">
                <div className="profile-empty-icon">📖</div>
                <div className="profile-empty-text">Complete quizzes to see subject performance!</div>
              </div>
            )}
          </>
        )}

        {activeTab === 'achievements' && (
          <>
            <div className="profile-stats-title">🏆 Unlocked Achievements</div>
            {achievements.length > 0 ? (
              <div className="achievements-grid">
                {achievements.map(achievement => (
                  <div key={achievement.id} className="achievement-card">
                    <div className="achievement-card-icon">{achievement.icon}</div>
                    <div className="achievement-card-info">
                      <div className="achievement-card-name">{achievement.name}</div>
                      <div className="achievement-card-desc">{achievement.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-empty-state">
                <div className="profile-empty-icon">🏆</div>
                <div className="profile-empty-text">Complete quizzes to unlock achievements!</div>
              </div>
            )}
            <div className="profile-stats-title" style={{ marginTop: 20 }}>🔒 Locked Achievements</div>
            <div className="achievements-grid locked">
              {Object.values(ACHIEVEMENTS).filter(a => !achievements.some(ach => ach?.id === a.id)).slice(0, 6).map(achievement => (
                <div key={achievement.id} className="achievement-card locked">
                  <div className="achievement-card-icon">🔒</div>
                  <div className="achievement-card-info">
                    <div className="achievement-card-name">{achievement.name}</div>
                    <div className="achievement-card-desc">{achievement.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <>
            <div className="profile-stats-title">⚙️ Appearance</div>
            <div className="settings-card" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
              <div className="settings-item">
                <div className="settings-icon">{theme === 'light' ? '🌙' : '☀️'}</div>
                <div className="settings-info">
                  <div className="settings-name">Dark Mode</div>
                  <div className="settings-desc">Switch between light and dark theme</div>
                </div>
                <div className="settings-toggle">
                  <div className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`}>
                    <div className="toggle-slider"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-stats-title" style={{ marginTop: 20 }}>ℹ️ About</div>
            <div className="settings-card">
              <div className="settings-item">
                <div className="settings-icon">🎓</div>
                <div className="settings-info">
                  <div className="settings-name">EliteScholars CBT</div>
                  <div className="settings-desc">Version 2.0.0</div>
                </div>
              </div>
            </div>
            <div className="settings-card">
              <div className="settings-item">
                <div className="settings-icon">📧</div>
                <div className="settings-info">
                  <div className="settings-name">Contact Support</div>
                  <div className="settings-desc">elitescholars@gmail.com</div>
                </div>
              </div>
            </div>
          </>
        )}

        <button className="profile-signout-btn" onClick={onSignOut}>↩ Sign Out</button>
      </div>
    </div>
  );
}
