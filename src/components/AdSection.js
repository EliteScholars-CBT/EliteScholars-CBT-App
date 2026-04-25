import React, { useEffect, useRef } from 'react';
import {
  PUBLISHER_AD_ENABLED,
  PUBLISHER_AD_SCRIPT,
  AFFILIATE_ADS_ENABLED,
  AFFILIATE_ADS,
  CUSTOM_AD_ENABLED,
  CUSTOM_AD,
} from '../utils/constants';
import { isPremium } from '../utils/premium';

// ============================================================================
// AdSection — 3-slot ad unit. Hidden entirely for premium users.
// Audience filtering: each affiliate ad has an `audiences` array.
// Publisher ad is a native banner injected via script tag.
// ============================================================================

// Filter affiliate ads for the current exam type audience
function getAffiliateAds(examType) {
  if (!AFFILIATE_ADS_ENABLED) return [];
  return AFFILIATE_ADS.filter((ad) => {
    if (!ad.audiences || ad.audiences.length === 0) return true;
    if (ad.audiences.includes('all')) return true;
    if (!examType) return true;
    return ad.audiences.includes(examType);
  });
}

// SVG placeholder for ads with no image
function AdPlaceholder({ title, color = '#6C3FC9' }) {
  return (
    <svg
      viewBox="0 0 240 72"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 72, display: 'block', borderRadius: 8 }}
    >
      <rect width="240" height="72" rx="8" fill={color + '18'} />
      <rect width="240" height="72" rx="8" fill="none" stroke={color + '40'} strokeWidth="1.5" strokeDasharray="5,4" />
      <text x="120" y="28" textAnchor="middle" fontSize="11" fill={color} fontFamily="sans-serif" fontWeight="700">
        {title}
      </text>
      <text x="120" y="44" textAnchor="middle" fontSize="9" fill={color + '99'} fontFamily="sans-serif">
        📢 Sponsored
      </text>
      <text x="120" y="58" textAnchor="middle" fontSize="8" fill={color + '66'} fontFamily="sans-serif">
        ADVERTISEMENT
      </text>
    </svg>
  );
}

// Publisher ad — injects native banner script into DOM
function PublisherAd({ refreshTrigger }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !PUBLISHER_AD_SCRIPT) return;
    ref.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = PUBLISHER_AD_SCRIPT;
    script.async = true;
    ref.current.appendChild(script);
  }, [refreshTrigger]);

  return (
    <div className="ad-publisher-box" ref={ref} aria-label="Advertisement" />
  );
}

// Single affiliate ad card
function AffiliateCard({ ad, index }) {
  const COLORS = ['#6C3FC9', '#065F46', '#B45309', '#0369A1', '#831843', '#9A3412'];
  const color = COLORS[index % COLORS.length];

  return (
    <a
      href={ad.link}
      target="_blank"
      rel="noopener noreferrer"
      className="ad-affiliate-card"
      style={{ '--aff-color': color }}
      aria-label={`Sponsored: ${ad.title}`}
    >
      <div className="ad-affiliate-img">
        {ad.image ? (
          <img src={ad.image} alt={ad.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
        ) : (
          <AdPlaceholder title={ad.title} color={color} />
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

// ── Main export ───────────────────────────────────────────────────────────────
// slot: index for which affiliate ad to show (rotates through filtered list)
// examType: current exam context for audience targeting
// email: used to check premium status
export default function AdSection({ slot = 0, refreshTrigger = 0, examType, email, showPublisher = true }) {
  // Premium users never see ads
  if (isPremium(email)) return null;

  const filteredAffiliates = getAffiliateAds(examType);
  const affAd = filteredAffiliates.length > 0
    ? filteredAffiliates[slot % filteredAffiliates.length]
    : null;

  const hasAnyAd =
    (PUBLISHER_AD_ENABLED && showPublisher) ||
    (AFFILIATE_ADS_ENABLED && affAd) ||
    CUSTOM_AD_ENABLED;

  if (!hasAnyAd) return null;

  return (
    <div className="ad-section-wrapper" role="complementary" aria-label="Advertisement">
      <div className="ad-section-label">AD</div>

      {/* Publisher native banner */}
      {PUBLISHER_AD_ENABLED && showPublisher && (
        <PublisherAd refreshTrigger={refreshTrigger} />
      )}

      {/* Audience-targeted affiliate ad */}
      {AFFILIATE_ADS_ENABLED && affAd && (
        <AffiliateCard ad={affAd} index={slot} />
      )}

      {/* Custom ad slot */}
      {CUSTOM_AD_ENABLED && (
        <a
          href={CUSTOM_AD.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ad-custom-card"
          aria-label={`Ad: ${CUSTOM_AD.title}`}
        >
          {CUSTOM_AD.image ? (
            <img src={CUSTOM_AD.image} alt={CUSTOM_AD.title} style={{ width: '100%', borderRadius: 8, display: 'block', maxHeight: 80, objectFit: 'cover' }} />
          ) : (
            <AdPlaceholder title={CUSTOM_AD.title} color="#7C3AED" />
          )}
          <div style={{ padding: '6px 10px 8px' }}>
            <div style={{ fontWeight: 700, fontSize: 12 }}>{CUSTOM_AD.title}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{CUSTOM_AD.description}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED' }}>{CUSTOM_AD.cta}</div>
          </div>
        </a>
      )}
    </div>
  );
}
