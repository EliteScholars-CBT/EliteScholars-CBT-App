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
  const [billing, setBilling] = useState(initialPlan === 'annual' ? 'annual' : 'monthly');
  const [selectedPlan, setSelectedPlan] = useState(null); // 'pro' or 'premium'
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Pro plan (always monthly, no annual)
  const PRO_PLAN = {
    id: 'pro',
    name: 'Pro',
    icon: '🚀',
    price: PRO_MONTHLY_PRICE,
    period: '/month',
    payUrl: PAYMENT_URL_PRO,
    tag: 'Popular',
    features: [
      'Unlimited topics',
      'Unlimited sessions',
      'No cooldown',
      'Ads reduced',
      'All 5 exam types',
    ],
  };

  // Premium plan (changes based on billing)
  const getPremiumPlan = () => {
    if (billing === 'annual') {
      return {
        id: 'premium',
        name: 'Premium',
        icon: '⭐',
        price: PREMIUM_ANNUAL_PRICE,
        period: '/year',
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
    } else {
      return {
        id: 'premium',
        name: 'Premium',
        icon: '⭐',
        price: PREMIUM_MONTHLY_PRICE,
        period: '/month',
        payUrl: PAYMENT_URL_MONTHLY,
        tag: 'Most Popular',
        features: [
          'Unlimited topics',
          'Unlimited sessions',
          'No cooldown ever',
          'Zero ads',
          'All 5 exam types',
          'Priority support',
        ],
      };
    }
  };

  const PREMIUM_PLAN = getPremiumPlan();

  const handleSubscribe = (planType) => {
    setSelectedPlan(planType);
    
    let planId;
    let payUrl;
    
    if (planType === 'pro') {
      planId = 'pro';
      payUrl = PRO_PLAN.payUrl;
    } else {
      planId = billing === 'annual' ? 'annual' : 'monthly';
      payUrl = PREMIUM_PLAN.payUrl;
    }
    
    if (USE_REAL_PAYMENT) {
      window.open(payUrl, '_blank');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      const data = activatePremium(email, planId);
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
            Welcome to {selectedPlan === 'pro' ? 'Pro' : 'Premium'}!
          </div>
          <div className="premium-success-sub">
            You now have unlimited access. Enjoy your {selectedPlan === 'pro' ? 'Pro' : 'Premium'} experience, {name}!
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

        {/* Billing Toggle (only Monthly/Annual, affects Premium) */}
        <div className="premium-billing-toggle-wrapper">
          <div className="premium-billing-toggle">
            <button
              className={`premium-billing-btn ${billing === 'monthly' ? 'active' : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              className={`premium-billing-btn ${billing === 'annual' ? 'active' : ''}`}
              onClick={() => setBilling('annual')}
            >
              Annual
              <span className="premium-save-badge">Save {PREMIUM_ANNUAL_DISCOUNT_PCT}%</span>
            </button>
          </div>
        </div>

        {/* 2-column grid: Pro | Premium */}
        <div className="premium-plans-grid">
          {/* Pro Card */}
          <div className="premium-plan-card">
            {PRO_PLAN.tag && <div className="premium-plan-tag">{PRO_PLAN.tag}</div>}
            <div className="premium-plan-icon">{PRO_PLAN.icon}</div>
            <div className="premium-plan-name">{PRO_PLAN.name}</div>
            <div className="premium-plan-price">
              <span className="premium-currency">₦</span>
              <span className="premium-amount">{FMT(PRO_PLAN.price)}</span>
              <span className="premium-period">{PRO_PLAN.period}</span>
            </div>
            <div className="premium-plan-features">
              {PRO_PLAN.features.map((feature) => (
                <div key={feature} className="premium-plan-feature">
                  <span className="premium-check">✓</span> {feature}
                </div>
              ))}
            </div>
            <button
              className="premium-plan-cta cta-secondary"
              onClick={() => handleSubscribe('pro')}
              disabled={loading}
            >
              {loading && selectedPlan === 'pro' ? 'Processing...' : 'Get Pro'}
            </button>
          </div>

          {/* Premium Card */}
          <div className="premium-plan-card highlighted">
            {PREMIUM_PLAN.tag && <div className="premium-plan-tag">{PREMIUM_PLAN.tag}</div>}
            <div className="premium-plan-icon">{PREMIUM_PLAN.icon}</div>
            <div className="premium-plan-name">{PREMIUM_PLAN.name}</div>
            <div className="premium-plan-price">
              <span className="premium-currency">₦</span>
              <span className="premium-amount">{FMT(PREMIUM_PLAN.price)}</span>
              <span className="premium-period">{PREMIUM_PLAN.period}</span>
            </div>
            {billing === 'annual' && (
              <div className="premium-savings-badge">
                Save ₦{FMT(PREMIUM_ANNUAL_SAVINGS)}/year
              </div>
            )}
            <div className="premium-plan-features">
              {PREMIUM_PLAN.features.map((feature) => (
                <div key={feature} className="premium-plan-feature">
                  <span className="premium-check">✓</span> {feature}
                </div>
              ))}
            </div>
            <button
              className="premium-plan-cta cta-primary"
              onClick={() => handleSubscribe('premium')}
              disabled={loading}
            >
              {loading && selectedPlan === 'premium' ? 'Processing...' : `Get ${PREMIUM_PLAN.name}`}
            </button>
          </div>
        </div>

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