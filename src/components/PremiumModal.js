import React, { useState } from 'react';
import {
  PREMIUM_MONTHLY_PRICE,
  PREMIUM_ANNUAL_PRICE,
  PREMIUM_ANNUAL_SAVINGS,
  PREMIUM_ANNUAL_DISCOUNT_PCT,
  PRO_MONTHLY_PRICE,
  ACHIEVEMENTS,
} from '../utils/constants';
import { activatePremium } from '../utils/premium';
import { loadAchievements, saveAchievements } from '../utils/storage';
import { initiatePayment } from '../utils/profileApi';

const FMT = (n) => n.toLocaleString('en-NG');

export default function PremiumModal({ email, name, onClose, onActivated, initialPlan = 'monthly' }) {
  const [plan, setPlan]       = useState(initialPlan);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);

  const PLANS = {
    pro: {
      id:       'pro',
      name:     'Pro',
      price:    PRO_MONTHLY_PRICE,
      label:    '/month',
      tag:      null,
      features: [
        'Unlimited topics',
        'Unlimited sessions',
        'No cooldown',
        'Ads reduced',
        'All 5 exam types',
      ],
    },
    monthly: {
      id:       'monthly',
      name:     'Premium Monthly',
      price:    PREMIUM_MONTHLY_PRICE,
      label:    '/month',
      tag:      null,
      features: [
        'Unlimited topics',
        'Unlimited sessions',
        'No cooldown ever',
        'Zero ads',
        'All 5 exam types',
        'Priority support',
      ],
    },
    annual: {
      id:       'annual',
      name:     'Premium Annual',
      price:    PREMIUM_ANNUAL_PRICE,
      label:    '/year',
      tag:      `Save ${PREMIUM_ANNUAL_DISCOUNT_PCT}%`,
      features: [
        'Unlimited topics',
        'Unlimited sessions',
        'No cooldown ever',
        'Zero ads',
        'All 5 exam types',
        'Priority support',
        'Best value',
      ],
    },
  };

  const currentPlan = PLANS[plan] || PLANS.monthly;

  const handleSubscribe = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await initiatePayment({ email, name, plan });
      if (!result.success || !result.paymentLink) {
        setError(result.error || 'Failed to initiate payment. Please try again.');
        setLoading(false);
        return;
      }
      // Redirect to Flutterwave payment page
      window.location.href = result.paymentLink;
    } catch {
      setError('Network error. Please check your connection.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="premium-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="premium-modal">
          <div className="premium-success-icon">⭐</div>
          <div className="premium-success-title">Welcome to {plan === 'pro' ? 'Pro' : 'Premium'}!</div>
          <div className="premium-success-sub">
            You now have unlimited access. Enjoy your experience, {name}!
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

        {/* Plan toggle */}
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

        {plan === 'pro' && (
          <div className="premium-plan-note">
            🚀 <strong>Pro</strong> — Core unlimited access at ₦{FMT(PRO_MONTHLY_PRICE)}/month. No annual option.
          </div>
        )}

        {/* Price */}
        <div className="premium-price-row">
          <span className="premium-currency">₦</span>
          <span className="premium-amount">{FMT(currentPlan.price)}</span>
          <span className="premium-period">{currentPlan.label}</span>
        </div>

        {plan === 'annual' && (
          <div className="premium-savings-note">
            You save ₦{FMT(PREMIUM_ANNUAL_SAVINGS)} vs monthly billing
          </div>
        )}

        {/* Features */}
        <div className="premium-features-list">
          <div className="premium-features-title">
            {plan === 'pro' ? 'Pro Features:' : 'Premium Features:'}
          </div>
          <div className="premium-features-grid">
            {currentPlan.features.map((f) => (
              <div key={f} className="premium-feature-item">
                <span className="premium-check">✓</span> {f}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#DC2626', fontSize: 12, fontWeight: 600, padding: '10px 14px', borderRadius: 10, marginBottom: 12 }}>
            {error}
          </div>
        )}

        {/* CTA */}
        <button className="premium-cta-btn" onClick={handleSubscribe} disabled={loading}>
          {loading
            ? 'Redirecting to payment…'
            : `Subscribe — ₦${FMT(currentPlan.price)}${currentPlan.label}`}
        </button>

        <div className="premium-cancel-note">Cancel anytime · Secured by Flutterwave · No hidden fees</div>
      </div>
    </div>
  );
}