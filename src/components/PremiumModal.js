import React, { useState } from 'react';
import {
  PREMIUM_MONTHLY_PRICE,
  PREMIUM_ANNUAL_PRICE,
  PREMIUM_ANNUAL_SAVINGS,
  PREMIUM_ANNUAL_DISCOUNT_PCT,
  PRO_MONTHLY_PRICE,
  USE_REAL_PAYMENT,
  PAYMENT_URL_MONTHLY,
  PAYMENT_URL_ANNUAL,
  PAYMENT_URL_PRO,
  FREE_TOPICS_PER_DAY,
  FREE_SESSION_MINUTES,
  FREE_COOLDOWN_HOURS,
  ACHIEVEMENTS,
} from '../utils/constants';
import { activatePremium } from '../utils/premium';
import { loadAchievements, saveAchievements } from '../utils/storage';

const FMT = (n) => n.toLocaleString('en-NG');

export default function PremiumModal({ email, name, onClose, onActivated }) {
  const [plan, setPlan]       = useState('pro');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const PLANS = {
    pro: {
      price: PRO_MONTHLY_PRICE,
      label: '/month',
      payUrl: PAYMENT_URL_PRO,
      tag: null,
      features: [
        'Unlimited topics',
        'Unlimited sessions',
        'No cooldown',
        'Ads reduced',
        'All 5 exam types',
      ],
    },
    monthly: {
      price: PREMIUM_MONTHLY_PRICE,
      label: '/month',
      payUrl: PAYMENT_URL_MONTHLY,
      tag: null,
      features: [
        'Unlimited topics',
        'Unlimited sessions',
        'No cooldown ever',
        'Zero ads',
        'All 5 exam types',
      ],
    },
    annual: {
      price: PREMIUM_ANNUAL_PRICE,
      label: '/year',
      payUrl: PAYMENT_URL_ANNUAL,
      tag: `Save ${PREMIUM_ANNUAL_DISCOUNT_PCT}%`,
      features: [
        'Unlimited topics',
        'Unlimited sessions',
        'No cooldown ever',
        'Zero ads',
        'All 5 exam types',
      ],
    },
  };

  const current = PLANS[plan];

  const handleSubscribe = () => {
    if (USE_REAL_PAYMENT) {
      window.open(current.payUrl, '_blank');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const data = activatePremium(email, plan);
      const existing = loadAchievements(email);
      if (!existing.some((a) => a?.id === 'premiumMember')) {
        saveAchievements([...existing, ACHIEVEMENTS.premiumMember], email);
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
          <div className="premium-success-title">Welcome to {plan === 'pro' ? 'Pro' : 'Premium'}!</div>
          <div className="premium-success-sub">
            You now have unlimited access. Enjoy your {plan === 'pro' ? 'Pro' : 'Premium'} experience, {name}!
          </div>
          <button className="premium-cta-btn" onClick={onClose}>Start Learning →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="premium-modal">
        <button className="premium-close" onClick={onClose}>✕</button>
        <div className="premium-header">
          <div className="premium-star">⭐</div>
          <div className="premium-title">Upgrade Your Plan</div>
          <div className="premium-tagline">No limits, no excuses. Pick your plan.</div>
        </div>

        <div className="premium-compare">
          <div className="premium-compare-col free-col">
            <div className="premium-col-label">Free</div>
            {[
              `${FREE_TOPICS_PER_DAY} topics/day`,
              `${FREE_SESSION_MINUTES} min sessions`,
              `${FREE_COOLDOWN_HOURS}hr cooldown`,
              'Ads shown',
              'Basic subjects',
            ].map((f) => (
              <div key={f} className="premium-compare-row">
                <span className="premium-x">✕</span> {f}
              </div>
            ))}
          </div>
          <div className="premium-compare-col premium-col">
            <div className="premium-col-label premium-col-header">
              {plan === 'pro' ? 'Pro 🚀' : 'Premium ⭐'}
            </div>
            {current.features.map((f) => (
              <div key={f} className="premium-compare-row">
                <span className="premium-check">✓</span> {f}
              </div>
            ))}
          </div>
        </div>

        <div className="premium-plan-toggle">
          <button
            className={`premium-plan-btn ${plan === 'pro' ? 'active' : ''}`}
            onClick={() => setPlan('pro')}
          >
            Pro 🚀
          </button>
          <button
            className={`premium-plan-btn ${plan === 'monthly' ? 'active' : ''}`}
            onClick={() => setPlan('monthly')}
          >
            Premium
          </button>
          <button
            className={`premium-plan-btn ${plan === 'annual' ? 'active' : ''}`}
            onClick={() => setPlan('annual')}
          >
            Annual
            <span className="premium-save-badge">Save {PREMIUM_ANNUAL_DISCOUNT_PCT}%</span>
          </button>
        </div>

        {plan === 'pro' && (
          <div className="premium-plan-note">
            🚀 <strong>Pro</strong> — Best value for serious students. Core unlimited access at ₦3k/mo. No annual option.
          </div>
        )}

        <div className="premium-price-row">
          <span className="premium-currency">₦</span>
          <span className="premium-amount">{FMT(current.price)}</span>
          <span className="premium-period">{current.label}</span>
        </div>
        {plan === 'annual' && (
          <div className="premium-savings-note">
            You save ₦{FMT(PREMIUM_ANNUAL_SAVINGS)} compared to monthly billing
          </div>
        )}

        <button className="premium-cta-btn" onClick={handleSubscribe} disabled={loading}>
          {loading ? (
            <span className="premium-loading">Processing…</span>
          ) : USE_REAL_PAYMENT ? (
            `Subscribe — ₦${FMT(current.price)}${current.label}`
          ) : (
            `Try ${plan === 'pro' ? 'Pro' : plan === 'annual' ? 'Annual' : 'Premium'} — ₦${FMT(current.price)}${current.label}`
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
