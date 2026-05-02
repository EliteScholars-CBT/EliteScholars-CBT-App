import React, { useEffect, useRef } from 'react';
import {
  PUBLISHER_AD_ENABLED, PUBLISHER_AD_SCRIPT,
  AFFILIATE_ADS_ENABLED, AFFILIATE_ADS,
  CUSTOM_AD_ENABLED, CUSTOM_AD,
} from '../utils/constants';
import { isPremium } from '../utils/premium';
import {
  observeAdElement, trackAdClick, flushAdAnalytics,
} from '../analytics/adAnalytics';

// ============================================================================
// AdSection — 3-slot ad unit. Hidden entirely for premium users.
// ============================================================================

function getAffiliateAds(examType) {
  if (!AFFILIATE_ADS_ENABLED) return [];
  return AFFILIATE_ADS.filter((ad) => {
    if (!ad.audiences || ad.audiences.length === 0) return true;
    if (ad.audiences.includes('all')) return true;
    if (!examType) return true;
    return ad.audiences.includes(examType);
  });
}

function AdPlaceholder({ title, color = '#6C3FC9' }) {
  return (
    <svg viewBox="0 0 240 72" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 72, display: 'block', borderRadius: 8 }}>
      <rect width="240" height="72" rx="8" fill={color + '18'} />
      <rect width="240" height="72" rx="8" fill="none" stroke={color + '40'} strokeWidth="1.5" strokeDasharray="5,4" />
      <text x="120" y="28" textAnchor="middle" fontSize="11" fill={color} fontFamily="sans-serif" fontWeight="700">{title}</text>
      <text x="120" y="44" textAnchor="middle" fontSize="9" fill={color + '99'} fontFamily="sans-serif">📢 Sponsored</text>
      <text x="120" y="58" textAnchor="middle" fontSize="8" fill={color + '66'} fontFamily="sans-serif">ADVERTISEMENT</text>
    </svg>
  );
}

function PublisherAd({ refreshTrigger, examType }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !PUBLISHER_AD_SCRIPT) return;
    ref.current.innerHTML = '';
    const script = document.createElement('script');
    script.src   = PUBLISHER_AD_SCRIPT;
    script.async = true;
    ref.current.appendChild(script);
  }, [refreshTrigger]);

  useEffect(() => {
    if (!ref.current) return;
    const unobserve = observeAdElement(ref.current, 'publisher_native', 'publisher', examType, PUBLISHER_AD_SCRIPT);
    return unobserve;
  }, [examType]);

  return <div className="ad-publisher-box" ref={ref} aria-label="Advertisement" />;
}

function AffiliateCard({ ad, index, examType }) {
  const COLORS = ['#6C3FC9', '#065F46', '#B45309', '#0369A1', '#831843', '#9A3412'];
  const color  = COLORS[index % COLORS.length];
  const ref    = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const unobserve = observeAdElement(ref.current, ad.id, 'affiliate', examType, ad.link);
    return unobserve;
  }, [ad.id, examType]);

  return (
    <div ref={ref}>
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        className="ad-affiliate-card"
        style={{ '--aff-color': color }}
        aria-label={`Sponsored: ${ad.title}`}
        onClick={() => trackAdClick('affiliate', ad.id, ad.link, examType)}
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
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function AdSection({ slot = 0, refreshTrigger = 0, examType, email, showPublisher = true }) {
  if (isPremium(email)) return null;

  const customRef = useRef(null);

  const filteredAffiliates = getAffiliateAds(examType);
  const affAd = filteredAffiliates.length > 0
    ? filteredAffiliates[slot % filteredAffiliates.length]
    : null;

  const hasAnyAd =
    (PUBLISHER_AD_ENABLED && showPublisher) ||
    (AFFILIATE_ADS_ENABLED && affAd) ||
    CUSTOM_AD_ENABLED;

  if (!hasAnyAd) return null;

  useEffect(() => {
    if (!CUSTOM_AD_ENABLED || !customRef.current) return;
    const unobserve = observeAdElement(customRef.current, 'custom_ad', 'custom', examType, CUSTOM_AD.link);
    return unobserve;
  }, [examType]);

  useEffect(() => {
    return () => flushAdAnalytics();
  }, []);

  return (
    <div className="ad-section-wrapper" role="complementary" aria-label="Advertisement">
      <div className="ad-section-label">AD</div>

      {PUBLISHER_AD_ENABLED && showPublisher && (
        <PublisherAd refreshTrigger={refreshTrigger} examType={examType} />
      )}

      {AFFILIATE_ADS_ENABLED && affAd && (
        <AffiliateCard ad={affAd} index={slot} examType={examType} />
      )}

      {CUSTOM_AD_ENABLED && (
        <div ref={customRef}>
          <a
            href={CUSTOM_AD.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ad-custom-card"
            aria-label={`Ad: ${CUSTOM_AD.title}`}
            onClick={() => trackAdClick('custom', 'custom_ad', CUSTOM_AD.link, examType)}
          >
            {CUSTOM_AD.image ? (
              <img src={CUSTOM_AD.image} alt={CUSTOM_AD.title}
                style={{ width: '100%', borderRadius: 8, display: 'block', maxHeight: 80, objectFit: 'cover' }} />
            ) : (
              <AdPlaceholder title={CUSTOM_AD.title} color="#7C3AED" />
            )}
            <div style={{ padding: '6px 10px 8px' }}>
              <div style={{ fontWeight: 700, fontSize: 12 }}>{CUSTOM_AD.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{CUSTOM_AD.description}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED' }}>{CUSTOM_AD.cta}</div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}