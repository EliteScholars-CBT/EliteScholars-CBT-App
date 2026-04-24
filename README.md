# 🎓 EliteScholars CBT — Developer README

> Nigeria's all-in-one free exam preparation platform. JAMB, POST UTME, WAEC, NECO & GST.

---

## 📋 Table of Contents

1. [What the App Does](#what-the-app-does)
2. [Exam Types Supported](#exam-types-supported)
3. [Core Features](#core-features)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Configuration (constants.js)](#configuration)
7. [Ad System](#ad-system)
8. [Learn Mode](#learn-mode)
9. [Challenge Flow](#challenge-flow)
10. [CSS Architecture](#css-architecture)
11. [Adding Content](#adding-content)
12. [Keyboard Navigation](#keyboard-navigation)
13. [Achievement System](#achievement-system)
14. [Shop System](#shop-system)
15. [SEO](#seo)
16. [Known Issues & TODOs](#known-issues)

---

## What the App Does

EliteScholars CBT is a React-based Progressive Web App (PWA) that lets Nigerian secondary school and university students practise for major standardised exams completely free. Think of it as a pocket CBT hall that is always open.

**Non-developer summary:**
- You sign up with your name and email (no password needed).
- Pick an exam type (JAMB, WAEC, etc.) then a subject.
- Answer timed quiz questions just like in the real CBT hall.
- After each question you see whether you were right or wrong, with a full explanation.
- Your score, streak, and achievements are saved to your device.
- You can challenge a friend by playing the quiz first, then sending them your score to beat.

---

## Exam Types Supported

| ID | Label | Description |
|----|-------|-------------|
| `jamb` | JAMB | UTME — goes straight to subject select, no accordion |
| `postutme` | POST UTME | University-specific — user selects university first |
| `waec` | WAEC | Senior School — subjects use accordion learn mode |
| `neco` | NECO | Senior School — shares WAEC question bank structure |
| `gst` | GST | General Studies — university level (Use of English, Logic, etc.) |

---

## Core Features

### CBT Mode
- 5-question rounds (configurable via `ROUND_SIZE` in `constants.js`)
- Per-subject timer (calc subjects get 25s/question, others 16s)
- Lifelines: 50:50 and Hint (one each per round)
- Text-to-speech reads questions aloud
- Keyboard navigation: `←/→` arrows, `Enter` to submit
- Full question review after every round (see corrections + explanations)

### Learn Mode (WAEC/NECO/GST)
- Collapsible accordion topic list
- Rich HTML content: tables, SVG illustrations, keyword highlights, formula boxes, worked examples
- TTS audio: voice selector, play/pause/stop controls
- Font size adjustment (A− / A+)
- In-content ad slots between subheadings
- 5-question topic quiz at the end of each topic
- Completion tracking: topics marked done after quiz is passed

### Challenges
- **Play-before-send:** Challenger plays the quiz first. Score is recorded. Only then does the challenge send to the opponent.
- Opponent receives challenge, must beat the challenger's score
- Challenges expire automatically if not accepted
- Declined manually or auto-expired challenges are marked clearly

### Shop
- 5 shop items by default (all configurable in `constants.js → SHOP_ITEMS`)
- Opens external seller link in new tab
- Awards `shopShopper` achievement on first visit

### Achievements
- 25+ achievements across categories: quiz count, perfect scores, streaks, subject mastery, time-of-day, learn mode, challenges, shop
- Unlocked achievements pop up with an overlay
- All stored in `localStorage` keyed by email

### ShareGate
- After every `SHARE_GATE_EVERY` sessions (default 200), user is asked to share on WhatsApp before continuing
- Vibe quote (3-second separate timer) vs verification countdown (30-second separate timer) — these are independent

### Ad System (3-slot)
See the [Ad System](#ad-system) section below.

---

## Project Structure

```
src/
├── App.js                   # Root component, all screen routing
├── AdsterraBanner.js        # Publisher ad (Adsterra) — constrained
│
├── components/
│   ├── ExamTypeSelect.js    # Compact grid: 3 cols / 2 cols layout
│   ├── WaecLearn.js         # Rich learn mode with accordion + TTS + quiz
│   ├── WaecSubjects.js      # Subject picker for WAEC/NECO/GST
│   ├── CreateChallenge.js   # Play-before-send challenge creation
│   ├── Challenges.js        # Challenges list + incoming challenges
│   ├── Result.js            # Score result + full question review modal
│   ├── ShareGate.js         # Share to unlock (dual-timer)
│   ├── BottomNav.js         # 5-tab persistent nav
│   ├── Shop.js              # Shop page
│   ├── AdSection.js         # 3-slot ad unit (publisher + affiliate + custom)
│   ├── Quiz.js              # CBT quiz engine
│   ├── Subjects.js          # Subject selector (JAMB/POST UTME)
│   ├── Profile.js           # User stats + achievements
│   ├── Leaderboard.js       # Global leaderboard
│   └── ...
│
├── data/
│   ├── waec/
│   │   ├── index.js         # Exports WAEC_QB, WAEC_LEARN, WAEC_SUBJECTS
│   │   ├── english.js       # Questions + rich learn content (Topic 1 is full)
│   │   ├── mathematics.js   # Questions + rich learn content (Topic 1 is full)
│   │   └── ...
│   ├── neco/
│   │   └── index.js         # NECO questions + learn topics
│   ├── gst/
│   │   └── index.js         # GST questions + learn topics
│   └── subjects.js          # JAMB/POST UTME subject metadata
│
├── pages/
│   └── About.js             # About page (SEO updated)
│
├── utils/
│   ├── constants.js         # ⚙️  All configurable values — edit here first
│   ├── sounds.js            # Web Audio API SFX + SpeechSynthesis TTS
│   ├── storage.js           # localStorage helpers
│   ├── analytics.js         # Event tracking
│   ├── colors.js            # Shared colour constants
│   ├── challengeApi.js      # Google Sheets challenge API
│   └── xpManager.js         # XP calculation and saving
│
└── styles/
    ├── base.css             # Fonts, reset, animations, layout
    ├── components.css       # All component styles (nav, cards, modals…)
    ├── learn.css            # Learn mode + rich HTML content styles
    ├── quiz.css             # Quiz screen styles
    ├── result.css           # Result screen + review modal
    ├── shop.css             # Shop page styles
    ├── ads.css              # Ad section: publisher, affiliate, custom
    └── theme.css            # Dark mode / theme tokens
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build
```

The app runs on **React 18** with no router (all screens are managed by the `screen` state in `App.js`).

---

## Configuration

Everything you need to customise lives in **`src/utils/constants.js`**.

```js
// Quiz round size
export const ROUND_SIZE = 5;

// Show/hide each ad slot
export const PUBLISHER_AD_ENABLED = true;
export const AFFILIATE_ADS_ENABLED = true;
export const CUSTOM_AD_ENABLED = false;

// How many subheadings between ad slots in learn mode
export const AD_EVERY_NTH_SUBHEADING = 2;

// Maximum publisher ad slots per learn page
export const MAX_ADS_PER_PAGE = 3;

// Shop items (title, price, link, image)
export const SHOP_ITEMS = [ ... ];

// Affiliate ads (title, description, link, cta, image)
export const AFFILIATE_ADS = [ ... ];
```

---

## Ad System

The app has **3 ad slot types**, managed from `constants.js`:

| Slot | Type | Source | Toggle |
|------|------|--------|--------|
| 1 | Publisher | Adsterra (script inject) | `PUBLISHER_AD_ENABLED` |
| 2 | Affiliate | Your own content (image + link) | `AFFILIATE_ADS_ENABLED` |
| 3 | Custom | Your own banner | `CUSTOM_AD_ENABLED` |

### Publisher Ad (Adsterra)
- Injected via `AdsterraBanner.js`
- Hard-constrained inside `.ad-publisher-box` — never taller than 100px, never wider than parent
- Rotates ad unit on every `refreshTrigger` change

### Affiliate Ads
- Defined as an array in `AFFILIATE_ADS` in `constants.js`
- `image: null` → auto-generated SVG placeholder displayed until you add a real image URL
- Each ad slot cycles through the array index

### In-Content Learn Mode Ads
- Injected between every `AD_EVERY_NTH_SUBHEADING` subheadings (default: every 2nd `<h3>`)
- Maximum `MAX_ADS_PER_PAGE` per page
- Both publisher and affiliate slots appear together in each in-content slot

---

## Learn Mode

### Content Format
Topics support two content fields:
- `content` — plain text (fallback, used in old topics)
- `contentHTML` — rich HTML string (preferred, used for Topic 1 in English and Maths)

Rich HTML classes available inside `contentHTML`:
```html
<span class="learn-keyword">term</span>        <!-- highlighted keyword -->
<h3 class="learn-subheading">Title</h3>        <!-- section header + ad trigger point -->
<p class="learn-p">paragraph</p>
<div class="learn-tip-box">💡 tip</div>
<div class="learn-tip-warn">⚠️ warning</div>
<table class="learn-table">...</table>
<div class="learn-formula">formula</div>
<div class="learn-worked-example">...</div>
<svg class="learn-svg">...</svg>               <!-- SVG illustration -->
```

### Adding a New Rich Topic
1. Open `src/data/waec/english.js` (or whichever subject)
2. Add a new object to `WAEC_ENGLISH_LEARN`:
```js
{
  topic: 'Your Topic Name',
  contentHTML: `<div class="learn-intro">...</div>`,
  content: 'Plain text fallback',
}
```
3. The accordion will automatically pick it up

---

## Challenge Flow

The new play-before-send flow works in 4 steps:

1. **Setup** — user fills in opponent email, exam type, subject, message
2. **Play** — embedded `Quiz` component renders full-screen. Challenger plays the quiz.
3. **Review** — challenger sees their score and can choose to send or discard
4. **Send** — challenge is posted to the Google Sheets API with the challenger's pre-recorded score

The opponent receives the challenge showing the challenger's score. They must beat it. If the challenge isn't accepted within the expiry time, it auto-expires.

---

## CSS Architecture

CSS is split into meaningful files in `src/styles/`:

| File | Contains |
|------|----------|
| `base.css` | Fonts, CSS reset, animations, body/layout utilities |
| `components.css` | Every component style (nav, cards, modals, exam select, challenges, sharegate…) |
| `learn.css` | Learn mode page + accordion + rich HTML + topic quiz |
| `quiz.css` | Quiz screen, options, lifelines, timer, action bar |
| `result.css` | Result hero, stats, review modal, gate/join cards |
| `shop.css` | Shop page grid, item cards |
| `ads.css` | All three ad slot types |
| `theme.css` | Dark mode variables and overrides |

All files are imported in `App.js`. Do **not** re-merge them into a single `style.css`.

---

## Adding Content

### New Subject (JAMB/WAEC)
1. Create `src/data/waec/mysubject.js` with `WAEC_MYSUBJECT` (question array) and `WAEC_MYSUBJECT_LEARN` (learn array)
2. Import and register in `src/data/waec/index.js`
3. Add metadata to `WAEC_SUBJECTS` in the same file

### New Exam Type
1. Add entry to `EXAM_TYPES` in `constants.js`
2. Handle the new ID in `App.js → handleExamTypeSelect`
3. Create a data folder `src/data/myexam/` and follow the NECO pattern

---

## Keyboard Navigation

Available throughout the app:

| Key | Action |
|-----|--------|
| `→` / `ArrowRight` | Next topic (learn mode) / Next option (quiz) |
| `←` / `ArrowLeft` | Prev topic (learn mode) / Prev option (quiz) |
| `↑` / `↓` | Previous/next option (quiz) |
| `Enter` | Submit selected answer (quiz) |

---

## Achievement System

Achievements are defined in `ACHIEVEMENTS` in `constants.js`. Each has:
```js
{
  id: 'uniqueId',
  name: 'Display Name',
  desc: 'How to earn it',
  icon: '🏆',
}
```

They are checked and awarded in `checkAndAwardAchievements()` in `App.js` after every quiz. Adding a new achievement:
1. Add entry to `ACHIEVEMENTS` in `constants.js`
2. Add the check condition in `checkAndAwardAchievements()` in `App.js`

---

## Shop System

Shop items are defined in `SHOP_ITEMS` in `constants.js`:
```js
{
  id: 'shop_1',
  title: '📝 Item Title',
  description: 'Short description',
  price: '₦1,500',
  image: null,              // null = auto SVG placeholder; or URL string
  link: 'https://...',      // External seller URL
  category: 'Notes',        // Groups items in the Shop UI
}
```

Items open in a new tab. All e-commerce is handled on your external site.

---

## SEO

`public/index.html` meta tags now cover all 5 exam types. Keywords updated:
```
JAMB practice, WAEC practice, NECO CBT, POST UTME, GST university, free JAMB app...
```

`src/pages/About.js` also updated to reflect all 5 exam types.

---

## Known Issues & TODOs

- [ ] GST subjects need more question bank content (currently 5 per subject as seed)
- [ ] NECO topics only have English and Maths learn content — others need expansion
- [ ] `WaecSubjects.js` needs to render NECO-specific branding when `examType === 'neco'`
- [ ] Challenge `challengeApi.js` needs server-side update to accept `challengerScore` field
- [ ] PWA service worker may need manual refresh after this update (clear cache if issues arise)
- [ ] `fonts/` directory must be present with DM Sans for Pillow pipeline (separate from web app)

---

*Built with ❤️ by EliteScholars. Not affiliated with JAMB, WAEC, or NECO.*
