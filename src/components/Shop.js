import React, { useEffect } from 'react';
import { SHOP_ITEMS } from '../utils/constants';
import { GOLD, DPURP } from '../utils/colors';
import { loadAchievements, saveAchievements } from '../utils/storage';
import { ACHIEVEMENTS } from '../utils/constants';

// ============================================================================
// Shop — Displays shop items (links to seller). Placeholder images supported.
// Visiting the shop awards the shopShopper achievement.
// ============================================================================

function ShopItemSVG({ title, category, color = '#6C3FC9' }) {
  return (
    <svg
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 100, display: 'block' }}
    >
      <rect width="200" height="100" rx="10" fill={color + '1a'} />
      <rect
        x="0"
        y="0"
        width="200"
        height="100"
        rx="10"
        fill="none"
        stroke={color + '44'}
        strokeWidth="1.5"
      />
      <text x="100" y="38" textAnchor="middle" fontSize="24" fontFamily="sans-serif">
        🛍️
      </text>
      <text
        x="100"
        y="60"
        textAnchor="middle"
        fontSize="10"
        fill={color}
        fontFamily="sans-serif"
        fontWeight="700"
      >
        {category}
      </text>
      <text
        x="100"
        y="76"
        textAnchor="middle"
        fontSize="8"
        fill={color + 'aa'}
        fontFamily="sans-serif"
      >
        {title?.slice(0, 28)}
      </text>
    </svg>
  );
}

export default function Shop({ userEmail, onBack }) {
  // Award shopShopper achievement on visit
  useEffect(() => {
    if (!userEmail) return;
    const existing = loadAchievements(userEmail);
    if (!existing.some((a) => a?.id === 'shopShopper')) {
      const updated = [...existing, ACHIEVEMENTS.shopShopper];
      saveAchievements(updated, userEmail);
    }
  }, [userEmail]);

  const categories = [...new Set(SHOP_ITEMS.map((i) => i.category))];

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

      {/* Item grid */}
      <div className="scroll shop-body">
        {categories.map((cat) => (
          <div key={cat} className="shop-category-section">
            <div className="shop-category-label">{cat}</div>
            <div className="shop-grid">
              {SHOP_ITEMS.filter((i) => i.category === cat).map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shop-item-card"
                >
                  <div className="shop-item-img">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: '10px 10px 0 0',
                        }}
                      />
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
          🔒 Purchases are handled on our secure website. Tap any item to proceed.
        </div>
      </div>
    </div>
  );
}
