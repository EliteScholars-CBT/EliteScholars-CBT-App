import React, { useState } from 'react';
import { WAEC_LEARN, WAEC_SUBJECTS } from '../data/waec';

export default function WaecLearn({ subjectId, onBack }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const topics = WAEC_LEARN[subjectId] || [];
  const meta   = WAEC_SUBJECTS.find(s => s.id === subjectId) || {};
  const topic  = topics[activeIdx];

  return (
    <div className="scr fd" style={{ background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, #1A1A2E, ${meta.color || '#6C63FF'})`,
        padding: '18px 16px 20px',
        color: '#fff',
      }}>
        <button
          onClick={onBack}
          style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: 8, padding: '4px 12px', fontSize: 13, cursor: 'pointer', marginBottom: 10 }}
        >
          ← Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: meta.bg, borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            {meta.icon}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{meta.label}</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Learn Mode · {topics.length} topics</div>
          </div>
        </div>
      </div>

      {/* Topic pills */}
      <div style={{ padding: '10px 16px 4px', overflowX: 'auto', display: 'flex', gap: 8, flexShrink: 0 }}>
        {topics.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            style={{
              whiteSpace: 'nowrap',
              padding: '6px 14px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              background: activeIdx === i ? (meta.color || '#6C63FF') : 'var(--card-bg, #f5f5f5)',
              color: activeIdx === i ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.15s',
            }}
          >
            {t.topic}
          </button>
        ))}
      </div>

      {/* Content card */}
      <div className="scroll" style={{ flex: 1, padding: '12px 16px 40px', overflowY: 'auto' }}>
        {topic ? (
          <div style={{
            background: 'var(--card-bg, #fff)',
            borderRadius: 18,
            padding: '20px 18px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            borderLeft: `4px solid ${meta.color || '#6C63FF'}`,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14,
            }}>
              <div style={{
                background: meta.bg, color: meta.color, borderRadius: 8,
                padding: '3px 10px', fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
              }}>
                TOPIC {activeIdx + 1} OF {topics.length}
              </div>
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
              {topic.topic}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {topic.content}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
            No content available yet.
          </div>
        )}

        {/* Prev / Next navigation */}
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button
            onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
            disabled={activeIdx === 0}
            style={{
              flex: 1, padding: '12px', borderRadius: 12, border: 'none', cursor: activeIdx === 0 ? 'not-allowed' : 'pointer',
              background: activeIdx === 0 ? 'var(--card-bg)' : (meta.color || '#6C63FF'),
              color: activeIdx === 0 ? 'var(--text-secondary)' : '#fff',
              fontWeight: 600, fontSize: 14, opacity: activeIdx === 0 ? 0.4 : 1,
            }}
          >
            ← Previous
          </button>
          <button
            onClick={() => setActiveIdx(i => Math.min(topics.length - 1, i + 1))}
            disabled={activeIdx === topics.length - 1}
            style={{
              flex: 1, padding: '12px', borderRadius: 12, border: 'none', cursor: activeIdx === topics.length - 1 ? 'not-allowed' : 'pointer',
              background: activeIdx === topics.length - 1 ? 'var(--card-bg)' : (meta.color || '#6C63FF'),
              color: activeIdx === topics.length - 1 ? 'var(--text-secondary)' : '#fff',
              fontWeight: 600, fontSize: 14, opacity: activeIdx === topics.length - 1 ? 0.4 : 1,
            }}
          >
            Next →
          </button>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
          {topics.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                width: i === activeIdx ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: i === activeIdx ? (meta.color || '#6C63FF') : 'var(--border-color, #e0e0e0)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
