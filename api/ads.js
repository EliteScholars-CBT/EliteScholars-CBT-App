api/ads.js
// ============================================================================
// api/ads.js — GET /api/ads?exam=jamb
// Returns filtered affiliate ads for the current exam type
// ============================================================================

import { ok, methodNotAllowed }    from './_helpers/response.js';
import { AFFILIATE_ADS, SHOW_ADS, PUBLISHER_AD_ENABLED, CUSTOM_AD_ENABLED, CUSTOM_AD } from './constants/ads.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') return ok();
  if (req.method !== 'GET') return methodNotAllowed();

  const { searchParams } = new URL(req.url);
  const exam = searchParams.get('exam')?.toLowerCase() || 'all';

  const filtered = AFFILIATE_ADS.filter(ad => {
    if (!ad.audiences || ad.audiences.length === 0) return true;
    if (ad.audiences.includes('all')) return true;
    return ad.audiences.includes(exam);
  });

  return ok({
    showAds:          SHOW_ADS,
    publisherEnabled: PUBLISHER_AD_ENABLED,
    affiliateAds:     filtered,
    customAd:         CUSTOM_AD_ENABLED ? CUSTOM_AD : null,
  });
}

export const config = { runtime: 'edge' };