import React, { useEffect, useRef } from 'react';
import {
  PUBLISHER_AD_ENABLED, PUBLISHER_AD_SCRIPT,
  AFFILIATE_ADS_ENABLED, AFFILIATE_ADS,
  CUSTOM_AD_ENABLED, CUSTOM_ADS,
} from '../utils/constants';
import { isPremium } from '../utils/premium';
import {
  observeAdElement, trackAdClick, flushAdAnalytics,
} from '../analytics/adAnalytics';
import '../styles/ads.css';

// ── Helpers ───────────────────────────────────────────────────────────────────
function getAffiliateAds(examType) {
  if (!AFFILIATE_ADS_ENABLED) return [];
  return AFFILIATE_ADS.filter((ad) => {
    if (!ad.audiences || ad.audiences.length === 0) return true;
    if (ad.audiences.includes('all')) return true;
    if (!examType) return true;
    return ad.audiences.includes(examType);
  });
}

function getCustomAds(examType) {
  if (!CUSTOM_AD_ENABLED || !CUSTOM_ADS?.length) return [];
  return CUSTOM_ADS.filter((ad) => {
    if (!ad.audiences || ad.audiences.length === 0) return true;
    if (ad.audiences.includes('all')) return true;
    if (!examType) return true;
    return ad.audiences.includes(examType);
  });
}

// ── Publisher ad ──────────────────────────────────────────────────────────────
function PublisherAd({ refreshTrigger, examType }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !PUBLISHER_AD_SCRIPT) return;
    ref.current.innerHTML = '';

    const script   = document.createElement('script');
    script.src     = PUBLISHER_AD_SCRIPT;
    script.async   = true;

    const timer = setTimeout(() => {
      if (ref.current && ref.current.offsetHeight < 10) {
        ref.current.style.display = 'none';
      }
    }, 2000);

    script.onerror = () => {
      clearTimeout(timer);
      if (ref.current) ref.current.style.display = 'none';
    };

    ref.current.appendChild(script);
    return () => clearTimeout(timer);
  }, [refreshTrigger]);

  useEffect(() => {
    if (!ref.current) return;
    const unobserve = observeAdElement(
      ref.current, 'publisher_native', 'publisher', examType, PUBLISHER_AD_SCRIPT
    );
    return unobserve;
  }, [examType]);

  return (
    <div
      className="ad-publisher-box"
      ref={ref}
      aria-label="Advertisement"
    />
  );
}

// ── Affiliate card ────────────────────────────────────────────────────────────
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
        {/* Image on top */}
        <div className="ad-affiliate-img">
          {ad.image ? (
            <img src={ad.image} alt={ad.title} />
          ) : (
            <div className="ad-affiliate-img-placeholder">📢</div>
          )}
        </div>
        {/* Text below */}
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

// ── Custom ad card ────────────────────────────────────────────────────────────
function CustomCard({ ad, examType }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const unobserve = observeAdElement(
      ref.current, 'custom_ad', 'custom', examType, ad.link
    );
    return unobserve;
  }, [examType, ad.link]);

  return (
    <div ref={ref} style={{ marginTop: 6 }}>
      <a
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer"
        className="ad-custom-card"
        aria-label={`Ad: ${ad.title}`}
        onClick={() => trackAdClick('custom', 'custom_ad', ad.link, examType)}
      >
        {/* Image on top */}
        {ad.image ? (
          <img src={ad.image} alt={ad.title} className="ad-custom-img" />
        ) : (
          <div className="ad-custom-img-placeholder">📢</div>
        )}
        {/* Text below */}
        <div className="ad-custom-body">
          <div className="ad-custom-title">{ad.title}</div>
          <div className="ad-custom-desc">{ad.description}</div>
          <div className="ad-custom-cta">{ad.cta}</div>
        </div>
      </a>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function AdSection({
  slot = 0,
  refreshTrigger = 0,
  examType,
  email,
  showPublisher = true,
}) {
  if (isPremium(email)) return null;

  const filteredAffiliates = getAffiliateAds(examType);
  const filteredCustom     = getCustomAds(examType);

  const affAd    = filteredAffiliates.length > 0
    ? filteredAffiliates[slot % filteredAffiliates.length]
    : null;

  const customAd = filteredCustom.length > 0
    ? filteredCustom[slot % filteredCustom.length]
    : null;

  const hasAnyAd =
    (PUBLISHER_AD_ENABLED && showPublisher) ||
    (AFFILIATE_ADS_ENABLED && affAd)        ||
    (CUSTOM_AD_ENABLED     && customAd);

  if (!hasAnyAd) return null;

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

      {CUSTOM_AD_ENABLED && customAd && (
        <CustomCard ad={customAd} examType={examType} />
      )}
    </div>
  );
}