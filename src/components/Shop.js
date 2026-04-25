import React, { useState } from 'react';
import { SHOP_ITEMS, ACHIEVEMENTS } from '../utils/constants';
import { loadAchievements, saveAchievements } from '../utils/storage';
import { isPremium, getPremiumData, cancelPremium } from '../utils/premium';
import PremiumModal from './PremiumModal';

// ============================================================================
// Shop — Premium card + regular items. Premium users see active subscription.
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
  const [showPremium, setShowPremium] = useState(false);
  const [localPremium, setLocalPremium] = useState(premiumUser);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const premData = getPremiumData(userEmail);

  // Award shopShopper achievement on visit
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

  return (
    <div className="scr fd shop-page">
      {/* Header */}
      <div className="shop-header">
        <div className="shop-header-bg" />
        <div className="shop-header-content">
          <div className="shop-title">🛍️ EliteScholars Shop</div>
          <div className="shop-subtitle">Premium study materials to boost your score</div>
        </div>
      </div>

      <div className="scroll shop-body">
        {/* Premium section */}
        {localPremium ? (
          /* Already premium — show subscription status */
          <div className="premium-active-box" style={{ marginBottom: 20 }}>
            <div className="premium-badge">⭐ Premium Active</div>
            <div className="premium-active-title" style={{ marginTop: 10 }}>
              You are on the {premData?.plan === 'annual' ? 'Annual' : 'Monthly'} plan
            </div>
            {premData?.expiresDateStr && (
              <div className="premium-active-expiry">
                Renews / expires: {premData.expiresDateStr}
              </div>
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
                <button
                  onClick={handleCancel}
                  style={{ padding: '8px 16px', background: '#FEE2E2', color: '#991B1B', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700 }}
                >
                  Cancel Premium
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  style={{ padding: '8px 16px', background: '#F3F0FF', color: '#6C3FC9', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700 }}
                >
                  Keep Premium
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Not premium — show upgrade card */
          <div className="shop-premium-card" onClick={() => setShowPremium(true)}>
            <div className="shop-premium-star">⭐</div>
            <div className="shop-premium-title">EliteScholars Premium</div>
            <div className="shop-premium-sub">
              Remove all limits and study without interruptions.
            </div>
            <div className="shop-premium-features">
              {[
                '✓ No ads — ever',
                '✓ Unlimited daily topics',
                '✓ Unlimited session time',
                '✓ All 5 exam types unlocked',
                '✓ Priority support',
              ].map((f) => (
                <div key={f} className="shop-premium-feature">{f}</div>
              ))}
            </div>
            <button className="shop-premium-cta">⭐ Go Premium from ₦9,000/month</button>
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
          onClose={() => setShowPremium(false)}
          onActivated={handlePremiumActivated}
        />
      )}
    </div>
  );
}
