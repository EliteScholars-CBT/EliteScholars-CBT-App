import React, { useState } from 'react';
import {
  PREMIUM_MONTHLY_PRICE,
  PREMIUM_ANNUAL_PRICE,
  PREMIUM_ANNUAL_SAVINGS,
  PREMIUM_ANNUAL_DISCOUNT_PCT,
  USE_REAL_PAYMENT,
  PAYMENT_URL_MONTHLY,
  PAYMENT_URL_ANNUAL,
  FREE_TOPICS_PER_DAY,
  FREE_SESSION_MINUTES,
  FREE_COOLDOWN_HOURS,
  ACHIEVEMENTS,
} from '../utils/constants';
import { activatePremium } from '../utils/premium';
import { loadAchievements, saveAchievements } from '../utils/storage';

// ============================================================================
// PremiumModal — Paywall / upgrade screen
// Shows pricing, benefits, and simulated or real payment flow
// ============================================================================

const FMT = (n) => n.toLocaleString('en-NG');

export default function PremiumModal({ email, name, onClose, onActivated }) {
  const [plan, setPlan]         = useState('monthly');
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const price = plan === 'annual' ? PREMIUM_ANNUAL_PRICE : PREMIUM_MONTHLY_PRICE;
  const label = plan === 'annual' ? '/year' : '/month';

  const handleSubscribe = () => {
    if (USE_REAL_PAYMENT) {
      const url = plan === 'annual' ? PAYMENT_URL_ANNUAL : PAYMENT_URL_MONTHLY;
      window.open(url, '_blank');
      return;
    }

    // Simulated payment
    setLoading(true);
    setTimeout(() => {
      const data = activatePremium(email, plan);

      // Award premium achievement
      const existing = loadAchievements(email);
      if (!existing.some((a) => a?.id === 'premiumMember')) {
        const updated = [...existing, ACHIEVEMENTS.premiumMember];
        saveAchievements(updated, email);
      }

      setLoading(false);
      setSuccess(true);
      if (onActivated) onActivated(data);
    }, 1800);
  };

  if (success) {
    return (
      <div className="premium-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="premium-modal">
          <div className="premium-success-icon">⭐</div>
          <div className="premium-success-title">Welcome to Premium!</div>
          <div className="premium-success-sub">
            You now have unlimited access. Enjoy ad-free, limitless study sessions, {name}!
          </div>
          <button className="premium-cta-btn" onClick={onClose}>
            Start Learning →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="premium-modal">
        {/* Header */}
        <button className="premium-close" onClick={onClose}>✕</button>
        <div className="premium-header">
          <div className="premium-star">⭐</div>
          <div className="premium-title">EliteScholars Premium</div>
          <div className="premium-tagline">Unlock your full potential. No limits, no ads.</div>
        </div>

        {/* Free vs Premium comparison */}
        <div className="premium-compare">
          <div className="premium-compare-col free-col">
            <div className="premium-col-label">Free</div>
            {[
              `${FREE_TOPICS_PER_DAY} topics/day`,
              `${FREE_SESSION_MINUTES} min sessions`,
              `${FREE_COOLDOWN_HOURS}hr wait after limit`,
              'Ads shown',
              'Basic subjects',
            ].map((f) => (
              <div key={f} className="premium-compare-row">
                <span className="premium-x">✕</span> {f}
              </div>
            ))}
          </div>
          <div className="premium-compare-col premium-col">
            <div className="premium-col-label premium-col-header">Premium ⭐</div>
            {[
              'Unlimited topics',
              'Unlimited sessions',
              'No cooldown ever',
              'Zero ads',
              'All 5 exam types',
            ].map((f) => (
              <div key={f} className="premium-compare-row">
                <span className="premium-check">✓</span> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Plan toggle */}
        <div className="premium-plan-toggle">
          <button
            className={`premium-plan-btn ${plan === 'monthly' ? 'active' : ''}`}
            onClick={() => setPlan('monthly')}
          >
            Monthly
          </button>
          <button
            className={`premium-plan-btn ${plan === 'annual' ? 'active' : ''}`}
            onClick={() => setPlan('annual')}
          >
            Annual
            <span className="premium-save-badge">Save {PREMIUM_ANNUAL_DISCOUNT_PCT}%</span>
          </button>
        </div>

        {/* Price */}
        <div className="premium-price-row">
          <span className="premium-currency">₦</span>
          <span className="premium-amount">{FMT(price)}</span>
          <span className="premium-period">{label}</span>
        </div>
        {plan === 'annual' && (
          <div className="premium-savings-note">
            You save ₦{FMT(PREMIUM_ANNUAL_SAVINGS)} compared to monthly billing
          </div>
        )}

        {/* CTA */}
        <button
          className="premium-cta-btn"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? (
            <span className="premium-loading">Processing…</span>
          ) : USE_REAL_PAYMENT ? (
            `Subscribe for ₦${FMT(price)}${label}`
          ) : (
            `Try Premium — ₦${FMT(price)}${label}`
          )}
        </button>

        {!USE_REAL_PAYMENT && (
          <div className="premium-sim-note">
            🔧 Payment simulation active. Real gateway coming soon.
          </div>
        )}

        <div className="premium-cancel-note">Cancel anytime · No hidden fees</div>
      </div>
    </div>
  );
}
