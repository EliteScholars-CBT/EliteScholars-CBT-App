import React, { useState } from 'react';
import { SHOP_ITEMS, ACHIEVEMENTS, PRO_MONTHLY_PRICE, PREMIUM_MONTHLY_PRICE, PREMIUM_ANNUAL_PRICE, PREMIUM_ANNUAL_DISCOUNT_PCT } from '../utils/constants';
import { loadAchievements, saveAchievements } from '../utils/storage';
import { isPremium, getPremiumData, cancelPremium } from '../utils/premium';
import PremiumModal from './PremiumModal';

// ============================================================================
// Shop — One card comparing Free, Pro, Premium with toggle inside
// ============================================================================

function ShopItemSVG({ title, category, color = '#6C3FC9' }) {
  return (
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 100, display: 'block' }}>
      <rect width="200" height="100" rx="10" fill={color + '1a'} />
      <rect width="200" height="100" rx="10" fill="none" stroke={color + '44'} strokeWidth="1.5" />
      <text x="100" y="38" textAnchor="middle" fontSize="24" fontFamily="sans-serif">🛍️</text>
      <text x="100" y="60" textAnchor="middle" fontSize="10" fill={color}
        fontFamily="sans-serif" fontWeight="700">{category}</text>
      <text x="100" y="76" textAnchor="middle" fontSize="8" fill={color + 'aa'}
        fontFamily="sans-serif">{title?.slice(0, 24)}</text>
    </svg>
  );
}

export default function Shop({ userEmail, name, premiumUser, onPremiumActivated }) {
  const [showPremium, setShowPremium]       = useState(false);
  const [selectedPlan, setSelectedPlan]     = useState('monthly');
  const [localPremium, setLocalPremium]     = useState(premiumUser);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [billing, setBilling]               = useState('monthly');

  const openPlan = (planId) => {
    // Map frontend plan IDs to actual subscription types
    let subscriptionPlan = planId;
    if (planId === 'free') {
      // Free plan — just close modal or show upgrade prompt
      return;
    }
    if (planId === 'pro') {
      subscriptionPlan = 'pro';
    } else if (planId === 'premium') {
      subscriptionPlan = billing === 'annual' ? 'annual' : 'monthly';
    }
    setSelectedPlan(subscriptionPlan);
    setShowPremium(true);
  };

  const premData = getPremiumData(userEmail);

  React.useEffect(() => {
    if (!userEmail) return;
    const existing = loadAchievements(userEmail);
    if (!existing.some((a) => a?.id === 'shopShopper')) {
      saveAchievements([...existing, ACHIEVEMENTS.shopShopper], userEmail);
    }
  }, [userEmail]);

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

  const regularItems = SHOP_ITEMS.filter((i) => !i.isPremium);
  const categories = [...new Set(regularItems.map((i) => i.category))];

  const FMT = (n) => n.toLocaleString('en-NG');

  // One card comparing Free, Pro, Premium
  const COMPARE_PLANS = [
    {
      id: 'free',
      label: 'Free',
      icon: '🎓',
      tag: 'Basic',
      price: 0,
      period: '',
      features: [
        'Limited topics',
        'Limited sessions',
        'Has cooldown',
        'Ads shown',
        'All exam types'
      ],
      highlight: false,
      ctaText: 'Current Plan',
      ctaDisabled: true,
    },
    {
      id: 'pro',
      label: 'Pro',
      icon: '🚀',
      tag: 'Popular',
      monthlyPrice: PRO_MONTHLY_PRICE,
      annualPrice: null,
      annualDisabled: true,
      features: [
        'Unlimited topics',
        'Unlimited sessions',
        'No cooldown',
        'Ads reduced',
        'All 5 exam types'
      ],
      highlight: false,
      ctaText: 'Get Pro',
    },
    {
      id: 'premium',
      label: 'Premium',
      icon: '⭐',
      tag: 'Best Value',
      monthlyPrice: PREMIUM_MONTHLY_PRICE,
      annualPrice: PREMIUM_ANNUAL_PRICE,
      annualDisabled: false,
      features: [
        'Unlimited topics',
        'Unlimited sessions',
        'No cooldown ever',
        'Zero ads',
        'All 5 exam types',
        'Priority support'
      ],
      highlight: true,
      ctaText: 'Get Premium',
    },
  ];

  // Helper to get current price and period for a plan
  const getPlanPricing = (plan) => {
    if (plan.id === 'free') {
      return { price: 0, period: '', isDisabled: false };
    }
    
    const isAnnual = billing === 'annual';
    
    if (plan.id === 'pro') {
      if (isAnnual) {
        return { price: null, period: '', isDisabled: true };
      }
      return { price: plan.monthlyPrice, period: '/month', isDisabled: false };
    }
    
    if (plan.id === 'premium') {
      if (isAnnual && plan.annualPrice) {
        return { price: plan.annualPrice, period: '/year', isDisabled: false };
      }
      return { price: plan.monthlyPrice, period: '/month', isDisabled: false };
    }
    
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
              <button className="premium-manage-btn" onClick={() => setShowCancelConfirm(true)}>Manage Subscription</button>
            ) : (
              <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button onClick={handleCancel} style={{ padding: '8px 16px', background: '#FEE2E2', color: '#991B1B', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>Cancel Premium</button>
                <button onClick={() => setShowCancelConfirm(false)} style={{ padding: '8px 16px', background: '#F3F0FF', color: '#6C3FC9', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>Keep Premium</button>
              </div>
            )}
          </div>
        ) : (
          <div className="shop-plans-section">
            {/* Single pricing card with toggle inside */}
            <div className="shop-pricing-card">
              {/* Header with toggle */}
              <div className="shop-pricing-card-header">
                <div className="shop-pricing-card-title">📊 Compare Plans</div>
                <div className="shop-billing-toggle">
                  <button 
                    className={`shop-billing-btn ${billing === 'monthly' ? 'active' : ''}`} 
                    onClick={() => setBilling('monthly')}
                  >
                    Monthly
                  </button>
                  <button 
                    className={`shop-billing-btn ${billing === 'annual' ? 'active' : ''}`} 
                    onClick={() => setBilling('annual')}
                  >
                    Annual <span className="save-badge">Save {PREMIUM_ANNUAL_DISCOUNT_PCT}%</span>
                  </button>
                </div>
              </div>

              {/* 3-column plan comparison */}
              <div className="shop-plans-comparison">
                {COMPARE_PLANS.map(plan => {
                  const { price, period, isDisabled } = getPlanPricing(plan);
                  const isAnnualDisabled = (plan.id === 'pro' && billing === 'annual');
                  
                  return (
                    <div 
                      key={plan.id} 
                      className={`shop-compare-plan ${plan.highlight ? 'highlighted' : ''} ${isAnnualDisabled ? 'annual-disabled' : ''}`}
                    >
                      {plan.tag && <div className="shop-plan-tag">{plan.tag}</div>}
                      
                      <div className="shop-plan-icon">{plan.icon}</div>
                      <div className="shop-plan-name">{plan.label}</div>
                      
                      <div className="shop-plan-price">
                        {isAnnualDisabled ? (
                          <span className="shop-plan-no-annual">Monthly only</span>
                        ) : plan.id === 'free' ? (
                          <>
                            <span className="shop-plan-currency">₦</span>
                            <span className="shop-plan-amount">0</span>
                          </>
                        ) : (
                          <>
                            <span className="shop-plan-currency">₦</span>
                            <span className="shop-plan-amount">{FMT(price)}</span>
                            <span className="shop-plan-period">{period}</span>
                          </>
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
                        disabled={plan.id === 'free' || isAnnualDisabled}
                        onClick={() => openPlan(plan.id)}
                      >
                        {plan.id === 'free' ? 'Current' : isAnnualDisabled ? 'N/A' : plan.ctaText}
                      </button>
                      
                      {isAnnualDisabled && (
                        <div className="shop-plan-disabled-note">Pro has no annual billing</div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="shop-plans-note">Cancel anytime · No hidden fees · Secure payment</div>
            </div>
          </div>
        )}

        {/* Regular shop items */}
        {categories.map((cat) => (
          <div key={cat} className="shop-category-section">
            <div className="shop-category-label">{cat}</div>
            <div className="shop-grid">
              {regularItems.filter((i) => i.category === cat).map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shop-item-card"
                >
                  <div className="shop-item-img">
                    {item.image ? (
                      <img src={item.image} alt={item.title}
                        style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
                    ) : (
                      <ShopItemSVG title={item.title} category={item.category} />
                    )}
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
        ))}

        <div className="shop-footer-note">
          🔒 Purchases handled on our secure website.
        </div>
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



// import React, { useState } from 'react';
// import { SHOP_ITEMS, ACHIEVEMENTS, PRO_MONTHLY_PRICE, PREMIUM_MONTHLY_PRICE, PREMIUM_ANNUAL_PRICE, PREMIUM_ANNUAL_DISCOUNT_PCT } from '../utils/constants';
// import { loadAchievements, saveAchievements } from '../utils/storage';
// import { isPremium, getPremiumData, cancelPremium } from '../utils/premium';
// import PremiumModal from './PremiumModal';

// // ============================================================================
// // Shop — Premium card + regular items. Premium users see active subscription.
// // ============================================================================

// function ShopItemSVG({ title, category, color = '#6C3FC9' }) {
//   return (
//     <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"
//       style={{ width: '100%', height: 100, display: 'block' }}>
//       <rect width="200" height="100" rx="10" fill={color + '1a'} />
//       <rect width="200" height="100" rx="10" fill="none" stroke={color + '44'} strokeWidth="1.5" />
//       <text x="100" y="38" textAnchor="middle" fontSize="24" fontFamily="sans-serif">🛍️</text>
//       <text x="100" y="60" textAnchor="middle" fontSize="10" fill={color}
//         fontFamily="sans-serif" fontWeight="700">{category}</text>
//       <text x="100" y="76" textAnchor="middle" fontSize="8" fill={color + 'aa'}
//         fontFamily="sans-serif">{title?.slice(0, 24)}</text>
//     </svg>
//   );
// }

// export default function Shop({ userEmail, name, premiumUser, onPremiumActivated }) {
//   const [showPremium, setShowPremium]       = useState(false);
//   const [selectedPlan, setSelectedPlan]     = useState('monthly');
//   const [localPremium, setLocalPremium]     = useState(premiumUser);
//   const [showCancelConfirm, setShowCancelConfirm] = useState(false);
//   const [billing, setBilling]               = useState('monthly');

//   const openPlan = (planId) => {
//     setSelectedPlan(planId);
//     setShowPremium(true);
//   };

//   const premData = getPremiumData(userEmail);

//   React.useEffect(() => {
//     if (!userEmail) return;
//     const existing = loadAchievements(userEmail);
//     if (!existing.some((a) => a?.id === 'shopShopper')) {
//       saveAchievements([...existing, ACHIEVEMENTS.shopShopper], userEmail);
//     }
//   }, [userEmail]);

//   const handlePremiumActivated = (data) => {
//     setLocalPremium(true);
//     setShowPremium(false);
//     if (onPremiumActivated) onPremiumActivated(data);
//   };

//   const handleCancel = () => {
//     cancelPremium(userEmail);
//     setLocalPremium(false);
//     setShowCancelConfirm(false);
//   };

//   const regularItems = SHOP_ITEMS.filter((i) => !i.isPremium);
//   const categories = [...new Set(regularItems.map((i) => i.category))];

//   const FMT = (n) => n.toLocaleString('en-NG');

//   const PLANS = [
//     {
//       id: 'pro',
//       label: 'Pro',
//       icon: '🚀',
//       tag: null,
//       monthlyPrice: PRO_MONTHLY_PRICE,
//       annualPrice: null,
//       annualDisabled: true,
//       features: ['Unlimited topics', 'Unlimited sessions', 'No cooldown', 'Ads reduced', 'All 5 exam types'],
//       highlight: false,
//     },
//     {
//       id: 'monthly',
//       label: 'Premium',
//       icon: '⭐',
//       tag: 'Most Popular',
//       monthlyPrice: PREMIUM_MONTHLY_PRICE,
//       annualPrice: null,
//       annualDisabled: false,
//       features: ['Unlimited topics', 'Unlimited sessions', 'No cooldown ever', 'Zero ads', 'All 5 exam types'],
//       highlight: true,
//     },
//     {
//       id: 'annual',
//       label: 'Annual',
//       icon: '👑',
//       tag: `Save ${PREMIUM_ANNUAL_DISCOUNT_PCT}%`,
//       monthlyPrice: null,
//       annualPrice: PREMIUM_ANNUAL_PRICE,
//       annualDisabled: false,
//       features: ['Everything in Premium', 'Best value per month', 'Priority support', 'Zero ads', 'All 5 exam types'],
//       highlight: false,
//     },
//   ];

//   return (
//     <div className="scr fd shop-page">
//       <div className="shop-header">
//         <div className="shop-header-bg" />
//         <div className="shop-header-content">
//           <div className="shop-title">🛍️ EliteScholars Shop</div>
//           <div className="shop-subtitle">Premium study materials to boost your score</div>
//         </div>
//       </div>

//       <div className="scroll shop-body">
//         {localPremium ? (
//           <div className="premium-active-box" style={{ marginBottom: 20 }}>
//             <div className="premium-badge">⭐ Premium Active</div>
//             <div className="premium-active-title" style={{ marginTop: 10 }}>
//               You are on the {premData?.plan === 'annual' ? 'Annual' : premData?.plan === 'pro' ? 'Pro' : 'Monthly'} plan
//             </div>
//             {premData?.expiresDateStr && (
//               <div className="premium-active-expiry">Renews / expires: {premData.expiresDateStr}</div>
//             )}
//             <div className="shop-already-premium" style={{ marginTop: 12 }}>
//               ✅ Ad-free · Unlimited practice · All subjects unlocked
//             </div>
//             {!showCancelConfirm ? (
//               <button className="premium-manage-btn" onClick={() => setShowCancelConfirm(true)}>Manage Subscription</button>
//             ) : (
//               <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center' }}>
//                 <button onClick={handleCancel} style={{ padding: '8px 16px', background: '#FEE2E2', color: '#991B1B', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>Cancel Premium</button>
//                 <button onClick={() => setShowCancelConfirm(false)} style={{ padding: '8px 16px', background: '#F3F0FF', color: '#6C3FC9', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>Keep Premium</button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="shop-plans-section">
//             <div className="shop-plans-header">
//               <div className="shop-plans-title">Choose Your Plan</div>
//               <div className="shop-billing-toggle">
//                 <button className={`shop-billing-btn ${billing === 'monthly' ? 'active' : ''}`} onClick={() => setBilling('monthly')}>Monthly</button>
//                 <button className={`shop-billing-btn ${billing === 'annual' ? 'active' : ''}`} onClick={() => setBilling('annual')}>Annual</button>
//               </div>
//             </div>

//             <div className="shop-plans-grid">
//               {PLANS.map(plan => {
//                 const price = billing === 'annual' && !plan.annualDisabled && plan.annualPrice
//                   ? plan.annualPrice
//                   : plan.monthlyPrice || plan.annualPrice;
//                 const period = billing === 'annual' && !plan.annualDisabled && plan.annualPrice ? '/year' : '/month';
//                 const isDisabled = billing === 'annual' && plan.annualDisabled;

//                 return (
//                   <div key={plan.id} className={`shop-plan-card ${plan.highlight ? 'highlighted' : ''} ${isDisabled ? 'disabled' : ''}`}>
//                     {plan.tag && <div className="shop-plan-tag">{plan.tag}</div>}
//                     <div className="shop-plan-icon">{plan.icon}</div>
//                     <div className="shop-plan-name">{plan.label}</div>
//                     <div className="shop-plan-price">
//                       {isDisabled ? (
//                         <span className="shop-plan-no-annual">No annual</span>
//                       ) : (
//                         <>
//                           <span className="shop-plan-currency">₦</span>
//                           <span className="shop-plan-amount">{FMT(price)}</span>
//                           <span className="shop-plan-period">{period}</span>
//                         </>
//                       )}
//                     </div>
//                     <div className="shop-plan-features">
//                       {plan.features.map(f => (
//                         <div key={f} className="shop-plan-feature"><span className="shop-plan-check">✓</span>{f}</div>
//                       ))}
//                     </div>
//                     <button
//                       className={`shop-plan-cta ${plan.highlight ? 'cta-primary' : 'cta-secondary'}`}
//                       disabled={isDisabled}
//                       onClick={() => openPlan(plan.id)}
//                     >
//                       {isDisabled ? 'Monthly only' : `Get ${plan.label}`}
//                     </button>
//                     {isDisabled && (
//                       <div className="shop-plan-disabled-note">Pro has no annual billing</div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="shop-plans-note">Cancel anytime · No hidden fees · Secure payment</div>
//           </div>
//         )}

//         {/* Regular shop items */}
//         {categories.map((cat) => (
//           <div key={cat} className="shop-category-section">
//             <div className="shop-category-label">{cat}</div>
//             <div className="shop-grid">
//               {regularItems.filter((i) => i.category === cat).map((item) => (
//                 <a
//                   key={item.id}
//                   href={item.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="shop-item-card"
//                 >
//                   <div className="shop-item-img">
//                     {item.image ? (
//                       <img src={item.image} alt={item.title}
//                         style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
//                     ) : (
//                       <ShopItemSVG title={item.title} category={item.category} />
//                     )}
//                   </div>
//                   <div className="shop-item-body">
//                     <div className="shop-item-title">{item.title}</div>
//                     <div className="shop-item-desc">{item.description}</div>
//                     <div className="shop-item-footer">
//                       <span className="shop-item-price">{item.price}</span>
//                       <span className="shop-item-buy">Buy →</span>
//                     </div>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           </div>
//         ))}

//         <div className="shop-footer-note">
//           🔒 Purchases handled on our secure website.
//         </div>
//       </div>

//       {showPremium && (
//         <PremiumModal
//           email={userEmail}
//           name={name}
//           initialPlan={selectedPlan}
//           onClose={() => setShowPremium(false)}
//           onActivated={handlePremiumActivated}
//         />
//       )}
//     </div>
//   );
// }
