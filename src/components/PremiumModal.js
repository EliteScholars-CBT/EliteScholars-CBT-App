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
  ACHIEVEMENTS,
} from '../utils/constants';
import { activatePremium } from '../utils/premium';
import { loadAchievements, saveAchievements } from '../utils/storage';

const FMT = (n) => n.toLocaleString('en-NG');

export default function PremiumModal({ email, name, onClose, onActivated, initialPlan = 'monthly' }) {
  // initialPlan can be 'pro', 'monthly', or 'annual'
  const [plan, setPlan] = useState(initialPlan);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Premium plan details based on billing type
  const getPremiumPlan = (billingType) => {
    if (billingType === 'monthly') {
      return {
        id: 'monthly',
        name: 'Premium Monthly',
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
          'Priority support',
        ],
      };
    } else {
      return {
        id: 'annual',
        name: 'Premium Annual',
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
          'Priority support',
          'Best value',
        ],
      };
    }
  };

  const PRO_PLAN = {
    id: 'pro',
    name: 'Pro',
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
  };

  // Current selected plan (Pro or Premium with current billing)
  const isPro = plan === 'pro';
  const currentPlan = isPro ? PRO_PLAN : getPremiumPlan(plan);

  const handleSubscribe = () => {
    if (USE_REAL_PAYMENT) {
      window.open(currentPlan.payUrl, '_blank');
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
          <div className="premium-success-title">
            Welcome to {isPro ? 'Pro' : 'Premium'}!
          </div>
          <div className="premium-success-sub">
            You now have unlimited access. Enjoy your {isPro ? 'Pro' : 'Premium'} experience, {name}!
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

        {/* Toggle: Pro | Monthly | Annual */}
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

        {/* Pro note - no annual option */}
        {plan === 'pro' && (
          <div className="premium-plan-note">
            🚀 <strong>Pro</strong> — Best value for serious students. Core unlimited access at ₦{FMT(PRO_MONTHLY_PRICE)}/month. No annual option available.
          </div>
        )}

        {/* Price display */}
        <div className="premium-price-row">
          <span className="premium-currency">₦</span>
          <span className="premium-amount">{FMT(currentPlan.price)}</span>
          <span className="premium-period">{currentPlan.label}</span>
        </div>
        
        {plan === 'annual' && (
          <div className="premium-savings-note">
            You save ₦{FMT(PREMIUM_ANNUAL_SAVINGS)} compared to monthly billing
          </div>
        )}

        {/* Features list */}
        <div className="premium-features-list">
          <div className="premium-features-title">
            {isPro ? 'Pro Features:' : 'Premium Features:'}
          </div>
          <div className="premium-features-grid">
            {currentPlan.features.map((feature) => (
              <div key={feature} className="premium-feature-item">
                <span className="premium-check">✓</span> {feature}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button className="premium-cta-btn" onClick={handleSubscribe} disabled={loading}>
          {loading ? (
            <span className="premium-loading">Processing…</span>
          ) : USE_REAL_PAYMENT ? (
            `Subscribe — ₦${FMT(currentPlan.price)}${currentPlan.label}`
          ) : (
            `Try ${isPro ? 'Pro' : plan === 'annual' ? 'Annual' : 'Premium'} — ₦${FMT(currentPlan.price)}${currentPlan.label}`
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