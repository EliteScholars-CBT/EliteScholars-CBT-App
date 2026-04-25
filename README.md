# 🎓 EliteScholars CBT — Developer README (v2.1)

> Nigeria's all-in-one free exam preparation platform.
> JAMB · POST UTME · WAEC · NECO · GST

---

## 📋 Table of Contents

1. [What the App Does](#what-the-app-does)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Configuration (constants.js)](#configuration)
5. [Premium / Freemium System](#premium--freemium-system)
6. [Ad System](#ad-system)
7. [Question Bank (QB) Architecture](#question-bank-architecture)
8. [Learn Mode](#learn-mode)
9. [Challenge Flow](#challenge-flow)
10. [Service Worker & Notifications](#service-worker--notifications)
11. [Security](#security)
12. [XP & Achievements](#xp--achievements)
13. [CSS Architecture](#css-architecture)
14. [Shop System](#shop-system)
15. [Keyboard Navigation](#keyboard-navigation)
16. [SEO](#seo)
17. [Known Issues & TODOs](#known-issues)

---

## What the App Does

EliteScholars CBT is a React PWA for Nigerian students preparing for JAMB, POST UTME, WAEC, NECO, and university GST exams. Think of it as a pocket CBT hall that never closes.

**For students:**
- Sign up with name and email (no password needed)
- Pick an exam type and subject — answer timed quiz questions
- Every wrong answer comes with a full explanation
- Challenge friends, earn XP, unlock achievements, maintain streaks
- Learn from rich notes with text-to-speech reading
- Free tier: 2 topics/day, 30-min sessions — upgrade to Premium for unlimited access

---

## Getting Started

```bash
npm install
npm start        # Development server
npm run build    # Production build (output: /build)
```

> **Node version:** v18+ recommended. React 18 / Create React App.

---

## Project Structure

```
src/
├── App.js                        # Root — all screen routing, session/premium checks
├── index.js                      # React entry — BrowserRouter, ThemeProvider
│
├── components/
│   ├── ExamTypeSelect.js         # 5-exam compact grid (3+2 layout)
│   ├── WaecLearn.js              # Rich learn mode: accordion, TTS, ads, quiz
│   ├── WaecSubjects.js           # Subject picker for WAEC/NECO/GST
│   ├── CreateChallenge.js        # Play-before-send challenge creation
│   ├── Challenges.js             # Challenges list
│   ├── Quiz.js                   # CBT quiz engine
│   ├── Result.js                 # Score display + question review modal
│   ├── ShareGate.js              # Share to unlock (dual timer)
│   ├── BottomNav.js              # 5-tab persistent nav
│   ├── Shop.js                   # Shop + premium card + subscription mgmt
│   ├── AdSection.js              # 3-slot ad unit (publisher, affiliate, custom)
│   ├── PremiumModal.js           # Premium paywall modal
│   ├── FreeLimitGate.js          # Limit reached gate with countdown
│   ├── Profile.js                # Stats, achievements, premium management
│   ├── XPBar.js                  # XP progress bar component
│   └── ...
│
├── data/
│   ├── jamb/                     # ★ QB.js split into per-subject files
│   │   ├── index.js              # Exports QB object (backward compat)
│   │   ├── accounting.js         # 180 questions
│   │   ├── economics.js          # 298 questions
│   │   ├── english.js            # 398 questions
│   │   ├── biology.js            # 346 questions
│   │   ├── chemistry.js          # 203 questions
│   │   ├── mathematics.js        # 344 questions
│   │   ├── physics.js            # 141 questions
│   │   ├── government.js         # 521 questions
│   │   ├── literature.js         # 148 questions
│   │   └── novel.js              # 146 questions
│   ├── waec/
│   │   ├── index.js              # Exports WAEC_QB, WAEC_LEARN, WAEC_SUBJECTS
│   │   ├── english.js            # Rich learn content (Topic 1 full HTML)
│   │   ├── mathematics.js        # Rich learn content (Topic 1 full HTML)
│   │   ├── government.js         # WAEC Government questions + learn
│   │   └── ...
│   ├── neco/index.js             # NECO questions + learn content
│   ├── gst/index.js              # GST subjects + questions + learn
│   └── subjects.js               # JAMB/POST UTME subject metadata
│
├── pages/
│   ├── About.js                  # About (SEO updated — all 5 exam types)
│   ├── TermsOfService.js
│   └── PrivacyPolicy.js
│
├── utils/
│   ├── constants.js              # ⚙️  ALL configurable values — start here
│   ├── premium.js                # Premium state: isPremium, limits, cooldown
│   ├── xpManager.js              # XP calc, levelling, rewards
│   ├── notifications.js          # SW registration, push notification helpers
│   ├── security.js               # Anti-copy, anti-scrape, devtools detection
│   ├── sounds.js                 # Web Audio SFX + SpeechSynthesis TTS
│   ├── storage.js                # localStorage helpers
│   ├── analytics.js              # Event tracking (Google Sheets)
│   ├── colors.js                 # Shared colour tokens
│   ├── challengeApi.js           # Google Sheets challenge API
│   └── ads.js                    # Legacy popover ad loader
│
├── styles/
│   ├── base.css                  # Fonts, reset, animations, layout utilities
│   ├── components.css            # All component styles
│   ├── learn.css                 # Learn mode, rich HTML, topic quiz
│   ├── quiz.css                  # Quiz screen
│   ├── result.css                # Result + review modal
│   ├── shop.css                  # Shop page
│   ├── ads.css                   # Ad section styles
│   ├── premium.css               # Premium modal, limit gate, subscription UI
│   └── theme.css                 # Dark mode tokens
│
└── public/
    ├── sw.js                     # Service worker (push notifications + cache)
    ├── index.html                # SEO meta tags — all 5 exam types
    └── manifest.json             # PWA manifest
```

---

## Configuration

**Everything configurable lives in `src/utils/constants.js`.**
You should never need to touch a component to change app behaviour.

### Free tier limits

```js
export const FREE_TOPICS_PER_DAY  = 2;    // max learn-mode topics per day
export const FREE_SESSION_MINUTES = 30;   // max CBT/learn minutes per session
export const FREE_COOLDOWN_HOURS  = 4;    // hours before they can continue
```

### Premium pricing

```js
export const PREMIUM_MONTHLY_PRICE = 9000;   // ₦9,000/month
export const PREMIUM_ANNUAL_PRICE  = 89000;  // ₦89,000/year
// Discount is auto-calculated: PREMIUM_ANNUAL_SAVINGS & PREMIUM_ANNUAL_DISCOUNT_PCT
```

### Publisher ad (Adsterra native banner)

```js
export const PUBLISHER_AD_ENABLED = true;
// Paste your native-banner script URL here:
export const PUBLISHER_AD_SCRIPT  = 'https://your-adsterra-script-url.js';
```

### Affiliate ads with audience targeting

```js
export const AFFILIATE_ADS = [
  {
    id: 'aff_jamb_1',
    title: '📚 JAMB Masterclass Bundle',
    description: '...',
    link: 'https://...',
    cta: 'Get It Now →',
    audiences: ['jamb', 'postutme'],  // only shown to JAMB/POST UTME users
  },
  {
    id: 'aff_gst_1',
    audiences: ['gst'],               // only shown to GST (university) users
  },
  {
    id: 'aff_all',
    audiences: ['all'],               // shown to everyone
  },
];
```

`audiences` options: `'jamb'` | `'postutme'` | `'waec'` | `'neco'` | `'gst'` | `'all'`

### Payment gateway

```js
export const USE_REAL_PAYMENT    = false;           // set true when ready
export const PAYMENT_URL_MONTHLY = 'https://selar.co/elitescholars-monthly';
export const PAYMENT_URL_ANNUAL  = 'https://selar.co/elitescholars-annual';
```

### XP rewards

```js
export const XP_REWARDS = {
  perCorrectAnswer:  10,
  perfectRound:      50,
  perfectQuiz:      100,
  topicCompleted:    75,
  dailyLogin:        20,
  streakBonus7:      70,
  challengeWon:      80,
  shareApp:          30,
  // ... see constants.js for full list
};
```

---

## Premium / Freemium System

### How it works

| State | CBT | Learn Mode | Ads | Topics/Day | Session |
|-------|-----|-----------|-----|-----------|---------|
| Free | ✅ | ✅ (limited) | ✅ shown | 2 | 30 min then 4hr cooldown |
| Premium | ✅ | ✅ unlimited | ❌ hidden | Unlimited | Unlimited |

### Key functions (`src/utils/premium.js`)

```js
isPremium(email)              // → boolean
activatePremium(email, plan)  // plan: 'monthly' | 'annual'
cancelPremium(email)
isSessionExpired(email)       // true if 30min session used up
isInCooldown(email)           // true if in 4hr cooldown
getCooldownSecondsLeft(email) // remaining seconds
canUseTopic(email)            // false if daily topic limit hit
incrementTopicsToday(email)   // call after each topic completed
```

### FreeLimitGate component

Automatically shown when `isSessionExpired()` or `!canUseTopic()`. Displays:
- Icon + message explaining the limit
- Live countdown timer (counts down from cooldown end time)
- "Go Premium" button → opens `PremiumModal`
- "Continue" button once cooldown expires

### Simulated payment

When `USE_REAL_PAYMENT = false`, clicking Subscribe simulates a 1.8s processing
delay then calls `activatePremium()` locally. When you're ready for real
payments, set `USE_REAL_PAYMENT = true` and add the Selar (or other gateway) URL.

---

## Ad System

### Three ad slots

| Slot | Type | Config key | Hidden for premium? |
|------|------|-----------|-------------------|
| Publisher | Adsterra native banner | `PUBLISHER_AD_ENABLED` | ✅ Yes |
| Affiliate | Your own curated ads | `AFFILIATE_ADS_ENABLED` | ✅ Yes |
| Custom | Your own banner/link | `CUSTOM_AD_ENABLED` | ✅ Yes |

### Audience targeting

Each affiliate ad has an `audiences` array. `AdSection` filters to only show
ads relevant to the current `examType` prop. Configure per-ad in `constants.js`.

### Publisher banner setup

1. Get your native banner script URL from Adsterra
2. Paste it into `PUBLISHER_AD_SCRIPT` in `constants.js`
3. The banner is injected via a `<script>` tag and constrained inside `.ad-publisher-box` (max-height: 100px, never overflows)

**`AdsterraBanner.js` has been removed.** All ad logic lives in `AdSection.js`.

---

## Question Bank Architecture

`QB.js` (27,000+ lines) has been split into per-subject files:

```
src/data/jamb/
├── index.js         → exports QB object (backward compat)
├── accounting.js    → 180 questions  (QB_ACCOUNTING)
├── economics.js     → 298 questions  (QB_ECONOMICS)
├── english.js       → 398 questions  (QB_ENGLISH)
├── biology.js       → 346 questions  (QB_BIOLOGY)
├── chemistry.js     → 203 questions  (QB_CHEMISTRY)
├── mathematics.js   → 344 questions  (QB_MATHEMATICS)
├── physics.js       → 141 questions  (QB_PHYSICS)
├── government.js    → 521 questions  (QB_GOVERNMENT)
├── literature.js    → 148 questions  (QB_LITERATURE)
└── novel.js         → 146 questions  (QB_NOVEL)
```

**All existing code works unchanged** — `import { QB } from '../data/jamb'` returns the same `QB` object as before. The old `QB.js` is kept for reference but no longer imported.

To add a new subject:
1. Create `src/data/jamb/mysubject.js` with `export const QB_MYSUBJECT = [...]`
2. Add to `src/data/jamb/index.js` exports

---

## Learn Mode

Topics support rich HTML via `contentHTML` property:

```js
{
  topic: 'Topic Name',
  contentHTML: `
    <div class="learn-intro">Intro text with <span class="learn-keyword">keyword</span></div>
    <h3 class="learn-subheading">Section Title</h3>
    <div class="learn-formula">formula = value</div>
    <div class="learn-tip-box"><span class="learn-tip-icon">💡</span> Tip text</div>
    <svg class="learn-svg">...illustration...</svg>
  `,
  content: 'Plain text fallback',
}
```

Ad slots are auto-injected before every `AD_EVERY_NTH_SUBHEADING` subheading (configured in `constants.js`). Premium users see no ads.

**Free users** are limited to `FREE_TOPICS_PER_DAY` topics per day. After completing the max, `FreeLimitGate` appears.

---

## Challenge Flow

1. **Setup** — Challenger enters opponent email, exam, subject, message
2. **Play** — Challenger plays the full quiz (embedded `Quiz` component)
3. **Review** — Challenger sees their score, chooses to send or discard
4. **Send** — Challenge posted to Google Sheets API with challenger's pre-recorded score
5. **Opponent** — Receives challenge, sees challenger's score, must beat it
6. **Expiry** — Auto-expires if not accepted within time limit

---

## Service Worker & Notifications

### Setup

Service worker (`public/sw.js`) registers automatically on app mount in `App.js`.
Notification permission is requested after registration.

### Notification types

| Type | Trigger | How to use |
|------|---------|-----------|
| Study reminder | Daily at 6PM (default) | `scheduleDailyReminder(18, name)` |
| Challenge alert | When challenge received | `showChallengeNotification({challengerName, subject})` |

### Triggering a challenge notification

```js
import { showChallengeNotification } from '../utils/notifications';

await showChallengeNotification({
  challengerName: 'Emeka',
  subject: 'Mathematics',
  examType: 'jamb',
});
```

The notification includes action buttons: "Accept Challenge" and "Later".
Clicking the notification focuses the app and navigates to the Challenges tab.

---

## Security

Applied globally on app mount via `applySecurityMeasures()` in `src/utils/security.js`:

- **Text selection disabled** — CSS `user-select: none` on all elements (inputs/textareas exempt)
- **Right-click blocked** — `contextmenu` event prevented
- **Copy/Cut blocked** — keyboard and event-level
- **DevTools shortcuts blocked** — F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S, Ctrl+P
- **Drag blocked** — `dragstart` event prevented
- **Console warning** — styled warning message deters casual scrapers

> Note: These are soft protections. A determined attacker can always bypass client-side JS. For stronger protection, serve content server-side.

---

## XP & Achievements

### Earning XP

| Action | XP |
|--------|----|
| Correct answer | 10 |
| Perfect round (5/5) | 50 |
| Perfect quiz (100%) | 100 |
| Score 90%+ | 50 |
| Complete a learn topic | 75 |
| Daily login | 20 |
| 7-day streak bonus | 70 |
| Win a challenge | 80 |
| Share the app | 30 |
| Speed bonus | 25 |

Streak multipliers apply: 3-day = ×1.15, 7-day = ×1.3, 30-day = ×1.5

### Level system

XP thresholds increase by 50% each level:
Level 1 → 100 XP → Level 2 → 150 XP → Level 3 → 225 XP → …

Titles: Rookie → Learner → Student → Scholar → Achiever → Expert → Master → Champion → Legend → Elite

---

## CSS Architecture

All CSS is split into `src/styles/`:

| File | Contains |
|------|----------|
| `base.css` | Fonts, reset, animations, layout utilities |
| `components.css` | Nav, cards, modals, exam select, challenge UI, sharegate, review modal |
| `learn.css` | Accordion, rich HTML content, topic quiz, TTS bar |
| `quiz.css` | Quiz screen, options, lifelines, timer, action bar |
| `result.css` | Score hero, stats cards, gate cards |
| `shop.css` | Shop grid, item cards |
| `ads.css` | Publisher box, affiliate card, custom slot |
| `premium.css` | Premium modal, pricing, limit gate, subscription UI |
| `theme.css` | Dark mode variables |

All imported in `App.js`. **Do not** re-merge into a single file.

---

## Shop System

Items defined in `SHOP_ITEMS` in `constants.js`.

The first item with `isPremium: true` renders as the featured Premium card at the top of Shop. If the user is already premium, it shows their subscription status and a cancel option instead.

---

## Keyboard Navigation

| Key | Context | Action |
|-----|---------|--------|
| `→` / `↓` | Quiz | Next option |
| `←` / `↑` | Quiz | Previous option |
| `Enter` | Quiz | Submit selected answer |
| `→` | Learn mode | Open next topic |
| `←` | Learn mode | Open previous topic |
| `Enter` / `Space` | Exam type grid | Select exam |

---

## SEO

`public/index.html` meta tags and `src/pages/About.js` now reflect all 5 exam types.

Keywords: JAMB practice, WAEC practice, NECO CBT, POST UTME, GST university, free JAMB app, JAMB past questions, WAEC 2025, NECO 2025, Nigerian students, score 300, EliteScholars CBT

---

## Known Issues & TODOs

- [ ] NECO and GST learn content needs expansion beyond seed topics
- [ ] Real payment gateway integration (Selar, Paystack, or Flutterwave) when `USE_REAL_PAYMENT = true`
- [ ] Server-side push notifications for challenges (currently only local SW messages)
- [ ] `WaecSubjects.js` could load NECO-specific question bank when `examType === 'neco'`
- [ ] The old `QB.js` file is still present — safe to delete once confirmed working
- [ ] PWA service worker may need manual cache-bust after major updates (add version to `CACHE_NAME` in `sw.js`)

---

*Built with ❤️ by EliteScholars. Not affiliated with JAMB, WAEC, NECO, or any government body.*
