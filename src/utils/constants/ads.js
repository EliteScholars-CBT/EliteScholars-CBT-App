// ============================================================================
// constants/ads.js — All ad-related settings
// ============================================================================

// ── Global ad switch ──────────────────────────────────────────────────────────
export const SHOW_ADS = true;

// ── Popover ad ────────────────────────────────────────────────────────────────
export const SHOW_POPOVER_AD   = false;
export const POPOVER_AD_URL    = 'https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469';
export const POPOVER_AD_SCRIPT = 'https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469.js';

// ── Publisher ───────────────────────────────────────
export const PUBLISHER_AD_ENABLED = true;
export const PUBLISHER_AD_SCRIPT  = 'https://mistakefixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469.js';

// In Learn Mode: insert a publisher ad slot before every Nth subheading
export const AD_EVERY_NTH_SUBHEADING = 2;
// Hard ceiling on ad slots per learn page
export const MAX_ADS_PER_PAGE        = 3;

// ── Affiliate ads ─────────────────────────────────────────────────────────────
export const AFFILIATE_ADS_ENABLED = true;

// audiences: which exam types see this ad.
// Options: 'jamb' | 'postutme' | 'waec' | 'neco' | 'gst' | 'all'
export const AFFILIATE_ADS = [
  {
    id: 'aff_jamb_1',
    image: null,
    title: '📚 JAMB Masterclass Bundle',
    description: 'Premium offline study pack: 5,000+ questions, answer keys & video solutions.',
    link: 'https://elitescholars.site/shop',
    cta: 'Get It Now →',
    audiences: ['jamb', 'postutme'],
  },
  {
    id: 'aff_waec_1',
    image: null,
    title: '🏫 WAEC & NECO Prep Pack',
    description: 'Complete study materials: PDFs, past questions and model answers.',
    link: 'https://elitescholars.site/waec-pack',
    cta: 'Download Pack →',
    audiences: ['waec', 'neco'],
  },
  {
    id: 'aff_gst_1',
    image: null,
    title: '🎓 University GST Study Kit',
    description: 'Ace Use of English, Logic & Nigerian Studies. Written for 100-level students.',
    link: 'https://elitescholars.site/gst-kit',
    cta: 'Get the Kit →',
    audiences: ['gst'],
  },
  {
    id: 'aff_all_1',
    image: null,
    title: '🎯 Score 300+ Guarantee',
    description: '30-day intensive coaching programme. Limited spots!',
    link: 'https://elitescholars.site/coaching',
    cta: 'Join Now →',
    audiences: ['all'],
  },
];

// ── Custom (third) ad slot ────────────────────────────────────────────────────
export const CUSTOM_AD_ENABLED = false;
export const CUSTOM_AD = {
  image: null,
  title: 'EliteScholars Premium',
  description: 'No ads, unlimited practice, all subjects.',
  link: 'https://elitescholars.site/premium',
  cta: 'Upgrade Now',
  audiences: ['all'],
};