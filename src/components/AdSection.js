import React, { useRef, useEffect } from 'react';
import AdsterraBanner from '../AdsterraBanner';
import {
  PUBLISHER_AD_ENABLED,
  AFFILIATE_ADS_ENABLED,
  AFFILIATE_ADS,
  CUSTOM_AD_ENABLED,
  CUSTOM_AD,
} from '../utils/constants';

// ============================================================================
// AdSection — Constrained, three-slot ad unit.
// Publisher ad (Adsterra), Affiliate ad (rotating), Custom ad (toggle)
// Max width = parent. Content never overflows the box.
// ============================================================================

// SVG placeholder for affiliate/custom ads with no image
function AffPlaceholder({ title, color = '#6C3FC9' }) {
  return (
    <svg
      viewBox="0 0 240 80"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 80, display: 'block', borderRadius: 8 }}
    >
      <rect width="240" height="80" rx="8" fill={color + '22'} />
      <rect
        x="0"
        y="0"
        width="240"
        height="80"
        rx="8"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="5,4"
      />
      <text
        x="120"
        y="30"
        textAnchor="middle"
        fontSize="11"
        fill={color}
        fontFamily="sans-serif"
        fontWeight="700"
      >
        {title}
      </text>
      <text
        x="120"
        y="46"
        textAnchor="middle"
        fontSize="9"
        fill={color + 'aa'}
        fontFamily="sans-serif"
      >
        📢 Sponsored
      </text>
      <text
        x="120"
        y="62"
        textAnchor="middle"
        fontSize="8"
        fill={color + '88'}
        fontFamily="sans-serif"
      >
        ADVERTISEMENT
      </text>
    </svg>
  );
}

// Single affiliate ad card
function AffiliateCard({ ad }) {
  const colors = ['#6C3FC9', '#065F46', '#B45309', '#0369A1', '#831843'];
  const color = colors[AFFILIATE_ADS.indexOf(ad) % colors.length];

  return (
    <a
      href={ad.link}
      target="_blank"
      rel="noopener noreferrer"
      className="ad-affiliate-card"
      style={{ '--aff-color': color }}
      aria-label={`Affiliate ad: ${ad.title}`}
    >
      <div className="ad-affiliate-img">
        {ad.image ? (
          <img
            src={ad.image}
            alt={ad.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
          />
        ) : (
          <AffPlaceholder title={ad.title} color={color} />
        )}
      </div>
      <div className="ad-affiliate-body">
        <div className="ad-affiliate-badge">AFFILIATE</div>
        <div className="ad-affiliate-title">{ad.title}</div>
        <div className="ad-affiliate-desc">{ad.description}</div>
        <div className="ad-affiliate-cta">{ad.cta}</div>
      </div>
    </a>
  );
}

// Custom ad card
function CustomAdCard({ ad }) {
  return (
    <a
      href={ad.link}
      target="_blank"
      rel="noopener noreferrer"
      className="ad-custom-card"
      aria-label={`Ad: ${ad.title}`}
    >
      {ad.image ? (
        <img
          src={ad.image}
          alt={ad.title}
          style={{
            width: '100%',
            borderRadius: 8,
            display: 'block',
            maxHeight: 80,
            objectFit: 'cover',
          }}
        />
      ) : (
        <AffPlaceholder title={ad.title} color="#7C3AED" />
      )}
      <div style={{ padding: '6px 10px 4px' }}>
        <div style={{ fontWeight: 700, fontSize: 12 }}>{ad.title}</div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>
          {ad.description}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED' }}>{ad.cta}</div>
      </div>
    </a>
  );
}

// ============================================================================
// Main exported component
// slot: which affiliate ad to show (index). Rotates through array.
// ============================================================================
export default function AdSection({ slot = 0, refreshTrigger = 0, showPublisher = true }) {
  const affAd = AFFILIATE_ADS[slot % AFFILIATE_ADS.length];

  const hasAnyAd =
    (PUBLISHER_AD_ENABLED && showPublisher) || AFFILIATE_ADS_ENABLED || CUSTOM_AD_ENABLED;
  if (!hasAnyAd) return null;

  return (
    <div className="ad-section-wrapper" role="complementary" aria-label="Advertisement">
      <div className="ad-section-label">AD</div>

      {/* Publisher ad — constrained inside fixed-height box */}
      {PUBLISHER_AD_ENABLED && showPublisher && (
        <div className="ad-publisher-box">
          <AdsterraBanner enableRotation refreshTrigger={refreshTrigger} />
        </div>
      )}

      {/* Affiliate ad */}
      {AFFILIATE_ADS_ENABLED && affAd && <AffiliateCard ad={affAd} />}

      {/* Custom ad */}
      {CUSTOM_AD_ENABLED && <CustomAdCard ad={CUSTOM_AD} />}
    </div>
  );
}
