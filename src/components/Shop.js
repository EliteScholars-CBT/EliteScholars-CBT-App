import React, { useState, useEffect } from 'react';
import {
  ACHIEVEMENTS,
  PRO_MONTHLY_PRICE,
  PREMIUM_MONTHLY_PRICE,
  PREMIUM_ANNUAL_PRICE,
  PREMIUM_ANNUAL_DISCOUNT_PCT,
} from '../utils/constants';
import { loadAchievements, saveAchievements } from '../utils/storage';
import { isPremium, getPremiumData, cancelPremium } from '../utils/premium';
import { fetchShopData, fetchPremiumStatus } from '../utils/profileApi';
import PremiumModal from './PremiumModal';

function ShopItemSVG({ title, category, color = '#6C3FC9' }) {
  return (
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 100, display: 'block' }}>
      <rect width="200" height="100" rx="10" fill={color + '1a'} />
      <rect width="200" height="100" rx="10" fill="none" stroke={color + '44'} strokeWidth="1.5" />
      <text x="100" y="38" textAnchor="middle" fontSize="24" fontFamily="sans-serif">🛍️</text>
      <text x="100" y="60" textAnchor="middle" fontSize="10" fill={color} fontFamily="sans-serif" fontWeight="700">{category}</text>
      <text x="100" y="76" textAnchor="middle" fontSize="8" fill={color + 'aa'} fontFamily="sans-serif">{title?.slice(0, 24)}</text>
    </svg>
  );
}

export default function Shop({ userEmail, name, premiumUser, onPremiumActivated }) {
  const [showPremium, setShowPremium]             = useState(false);
  const [selectedPlan, setSelectedPlan]           = useState('monthly');
  const [localPremium, setLocalPremium]           = useState(premiumUser);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [billing, setBilling]                     = useState('monthly');
  const [shopItems, setShopItems]                 = useState([]);
  const [premData, setPremData]                   = useState(getPremiumData(userEmail));
  const [loadingShop, setLoadingShop]             = useState(true);

  const FMT = (n) => n?.toLocaleString('en-NG') || '0';

  // Load shop items from server
  useEffect(() => {
    fetchShopData()
      .then(data => {
        if (data.success && data.items) setShopItems(data.items);
      })
      .catch(() => {})
      .finally(() => setLoadingShop(false));
  }, []);

  // Check server-side premium status on mount
  useEffect(() => {
    if (!userEmail) return;
    fetchPremiumStatus(userEmail).then(data => {
      if (data.isPremium) {
        setLocalPremium(true);
        setPremData({ plan: data.plan, expiresDateStr: data.expiresStr });
      }
    }).catch(() => {});
  }, [userEmail]);

  // Check payment success redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success' && params.get('email') === userEmail) {
      const plan = params.get('plan') || 'monthly';
      setLocalPremium(true);
      if (onPremiumActivated) onPremiumActivated({ plan });
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [userEmail]);

  // Shop visited achievement
  useEffect(() => {
    if (!userEmail) return;
    const existing = loadAchievements(userEmail);
    if (!existing.some((a) => a?.id === 'shopShopper')) {
      saveAchievements([...existing, ACHIEVEMENTS.shopShopper], userEmail);
    }
  }, [userEmail]);

  const openPlan = (planId) => {
    if (planId === 'free') return;
    let subscriptionPlan = planId;
    if (planId === 'premium') subscriptionPlan = billing === 'annual' ? 'annual' : 'monthly';
    setSelectedPlan(subscriptionPlan);
    setShowPremium(true);
  };

  const handlePremiumActivated = (data) => {
    setLocalPremium(true);
    setShowPremium(false);
    if (onPremiumActivated) onPremiumActivated(data);
  };

  const handleCancel = () => {
    cancelPremium(userEmail);
    setLocalPremium(false);
    setShowCancelConfirm(false);
  };

  const regularItems = shopItems.filter((i) => !i.isPremium);
  const categories   = [...new Set(regularItems.map((i) => i.category))];

  const COMPARE_PLANS = [
    {
      id: 'free', label: 'Free', icon: '🎓', tag: 'Basic',
      features: ['Limited topics', 'Limited sessions', 'Has cooldown', 'Ads shown', 'All exam types'],
      highlight: false, ctaDisabled: true,
    },
    {
      id: 'pro', label: 'Pro', icon: '🚀', tag: 'Popular',
      monthlyPrice: PRO_MONTHLY_PRICE, annualDisabled: true,
      features: ['Unlimited topics', 'Unlimited sessions', 'No cooldown', 'Ads reduced', 'All 5 exam types'],
      highlight: false,
    },
    {
      id: 'premium', label: 'Premium', icon: '⭐', tag: 'Best Value',
      monthlyPrice: PREMIUM_MONTHLY_PRICE, annualPrice: PREMIUM_ANNUAL_PRICE, annualDisabled: false,
      features: ['Unlimited topics', 'Unlimited sessions', 'No cooldown ever', 'Zero ads', 'All 5 exam types', 'Priority support'],
      highlight: true,
    },
  ];

  const getPlanPricing = (plan) => {
    if (plan.id === 'free')    return { price: 0, period: '', isDisabled: false };
    if (plan.id === 'pro')     return billing === 'annual'
      ? { price: null, period: '', isDisabled: true }
      : { price: plan.monthlyPrice, period: '/month', isDisabled: false };
    if (plan.id === 'premium') return billing === 'annual' && plan.annualPrice
      ? { price: plan.annualPrice, period: '/year', isDisabled: false }
      : { price: plan.monthlyPrice, period: '/month', isDisabled: false };
    return { price: null, period: '', isDisabled: false };
  };

  return (
    <div className="scr fd shop-page">
      <div className="shop-header">
        <div className="shop-header-bg" />
        <div className="shop-header-content">
          <div className="shop-title">🛍️ EliteScholars Shop</div>
          <div className="shop-subtitle">Premium study materials to boost your score</div>
        </div>
      </div>

      <div className="scroll shop-body">

        {/* ── Premium active ── */}
        {localPremium ? (
          <div className="premium-active-box" style={{ marginBottom: 20 }}>
            <div className="premium-badge">⭐ Premium Active</div>
            <div className="premium-active-title" style={{ marginTop: 10 }}>
              You are on the {premData?.plan === 'annual' ? 'Annual' : premData?.plan === 'pro' ? 'Pro' : 'Monthly'} plan
            </div>
            {premData?.expiresDateStr && (
              <div className="premium-active-expiry">Renews / expires: {premData.expiresDateStr}</div>
            )}
            <div className="shop-already-premium" style={{ marginTop: 12 }}>
              ✅ Ad-free · Unlimited practice · All subjects unlocked
            </div>
            {!showCancelConfirm ? (
              <button className="premium-manage-btn" onClick={() => setShowCancelConfirm(true)}>
                Manage Subscription
              </button>
            ) : (
              <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button onClick={handleCancel} style={{ padding: '8px 16px', background: '#FEE2E2', color: '#991B1B', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                  Cancel Premium
                </button>
                <button onClick={() => setShowCancelConfirm(false)} style={{ padding: '8px 16px', background: '#F3F0FF', color: '#6C3FC9', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                  Keep Premium
                </button>
              </div>
            )}
          </div>

        /* ── Plans ── */
        ) : (
          <div className="shop-plans-section">
            <div className="shop-pricing-card">
              <div className="shop-pricing-card-header">
                <div className="shop-pricing-card-title">📊 Compare Plans</div>
                <div className="shop-billing-toggle">
                  <button className={`shop-billing-btn ${billing === 'monthly' ? 'active' : ''}`} onClick={() => setBilling('monthly')}>
                    Monthly
                  </button>
                  <button className={`shop-billing-btn ${billing === 'annual' ? 'active' : ''}`} onClick={() => setBilling('annual')}>
                    Annual <span className="save-badge">Save {PREMIUM_ANNUAL_DISCOUNT_PCT}%</span>
                  </button>
                </div>
              </div>

              <div className="shop-plans-comparison">
                {COMPARE_PLANS.map(plan => {
                  const { price, period, isDisabled } = getPlanPricing(plan);
                  const annualDisabled = plan.id === 'pro' && billing === 'annual';
                  return (
                    <div key={plan.id} className={`shop-compare-plan ${plan.highlight ? 'highlighted' : ''} ${annualDisabled ? 'annual-disabled' : ''}`}>
                      {plan.tag && <div className="shop-plan-tag">{plan.tag}</div>}
                      <div className="shop-plan-icon">{plan.icon}</div>
                      <div className="shop-plan-name">{plan.label}</div>
                      <div className="shop-plan-price">
                        {annualDisabled ? (
                          <span className="shop-plan-no-annual">Monthly only</span>
                        ) : plan.id === 'free' ? (
                          <><span className="shop-plan-currency">₦</span><span className="shop-plan-amount">0</span></>
                        ) : (
                          <><span className="shop-plan-currency">₦</span><span className="shop-plan-amount">{FMT(price)}</span><span className="shop-plan-period">{period}</span></>
                        )}
                      </div>
                      <div className="shop-plan-features">
                        {plan.features.map(f => (
                          <div key={f} className="shop-plan-feature">
                            <span className="shop-plan-check">✓</span>{f}
                          </div>
                        ))}
                      </div>
                      <button
                        className={`shop-plan-cta ${plan.highlight ? 'cta-primary' : 'cta-secondary'}`}
                        disabled={plan.id === 'free' || annualDisabled}
                        onClick={() => openPlan(plan.id)}
                      >
                        {plan.id === 'free' ? 'Current' : annualDisabled ? 'N/A' : `Get ${plan.label}`}
                      </button>
                      {annualDisabled && <div className="shop-plan-disabled-note">Pro has no annual billing</div>}
                    </div>
                  );
                })}
              </div>
              <div className="shop-plans-note">Cancel anytime · Secured by Flutterwave · No hidden fees</div>
            </div>
          </div>
        )}

        {/* ── Shop items ── */}
        {loadingShop ? (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)', fontSize: 13 }}>
            Loading shop items...
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat} className="shop-category-section">
              <div className="shop-category-label">{cat}</div>
              <div className="shop-grid">
                {regularItems.filter((i) => i.category === cat).map((item) => (
                  <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="shop-item-card">
                    <div className="shop-item-img">
                      {item.image
                        ? <img src={item.image} alt={item.title} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
                        : <ShopItemSVG title={item.title} category={item.category} />}
                    </div>
                    <div className="shop-item-body">
                      <div className="shop-item-title">{item.title}</div>
                      <div className="shop-item-desc">{item.description}</div>
                      <div className="shop-item-footer">
                        <span className="shop-item-price">{item.price}</span>
                        <span className="shop-item-buy">Buy →</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))
        )}

        <div className="shop-footer-note">🔒 Payments secured by Flutterwave.</div>
      </div>

      {showPremium && (
        <PremiumModal
          email={userEmail}
          name={name}
          initialPlan={selectedPlan}
          onClose={() => setShowPremium(false)}
          onActivated={handlePremiumActivated}
        />
      )}
    </div>
  );
}