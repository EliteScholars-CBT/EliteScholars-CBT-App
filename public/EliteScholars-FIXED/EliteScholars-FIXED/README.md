# EliteScholars CBT — Bug Fix Documentation

## Summary of All Fixes

| # | Issue | Root Cause | Fix Location |
|---|-------|-----------|--------------|
| 1 | XP added multiple times | `handleSubmit` in `Quiz.js` had `addXP()` code (even if commented, it confused flow); `calculateQuizXP` called correctly but `addXP` also could have been called twice | Removed `addXP` import from `Quiz.js`; single `addXP` call in `App.js handleAllDone` |
| 2 | Leaderboards show all users | Update functions inserted new rows without period filtering; `getLeaderboard` didn't filter by date | `updateXxxLeaderboard` functions upsert per period; `getLeaderboard` filters correctly |
| 3 | Rank shows 0 | `updateAllTimeLeaderboard` used `sheet.getRange(i+2, 0)` — column 0 is invalid in GAS (1-indexed) | All `getRange()` calls now use 1-based column numbers |
| 4 | Challenge opponent not found | Column detection used rigid index assumptions; email comparison wasn't trimmed | `getAvailableUsers` and `createChallenge` now use `findIndex` on lowercased headers with multiple aliases |
| 5 | Analytics events not recording | Row construction used stale `headers` array instead of the sheet's actual headers after potential resize | `doPost` re-reads current sheet headers before building each row |
| 6 | Leaderboard not updating after quiz | All four `updateXxx` calls were present but could be skipped if `addXP` threw early | Wrapped all four calls after the user_xp write, with proper guard checks |
| 7 | Duplicate user entries | Update functions called `appendRow` without first searching for an existing row | All four update functions now search for `email + period` before deciding to insert vs update |
| 8 | XP bonuses not applied | `calculateQuizXP` was correct; `streakDays` was passed but could be 0 causing no streak bonus | Added `|| 1` guard for `streakDays`; confirmed all params passed correctly in `App.js` |
| 9 | Duration format wrong | `trackSessionEnd` received minutes from `Math.round((Date.now() - start) / 60000)` but then did `totalSeconds = Math.floor(minutes * 60)` — rounding lost precision | `App.js` now passes raw `durationMs = Date.now() - sessionStartTime`; `analytics.js` does `Math.floor(ms / 1000)` for exact seconds |
| 10 | fullSystemReset fails | `alltimeSheet.getRange(i + 2, 0)` — column 0 is invalid | Fixed to `getRange(sheetRow, 1)` and `getRange(sheetRow, 2)` throughout |
| 11 | Leaderboard UI tabs wrong data | `getXP()` in `Leaderboard.js` used `user.xp_earned_today`, `user.xp_earned_week` — field names that don't exist in API response | Fixed to use actual API field names: `user.xp_earned` (daily/weekly/monthly) and `user.total_xp` (alltime) |

---

## Files Changed

### React Frontend
```
src/App.js                  ← Issue 1, 8, 9
src/components/Quiz.js      ← Issue 1 (removed addXP import + call)
src/components/Leaderboard.js ← Issue 11, 3 (UI field mapping + ordinal fallback)
src/utils/xpManager.js      ← Issue 1, 8 (clean calculateQuizXP, single addXP)
src/utils/analytics.js      ← Issue 9 (trackSessionEnd accepts ms, formats HH:MM:SS)
src/utils/leaderboardApi.js ← Issue 11 (clean API calls, array guard)
src/utils/challengeApi.js   ← Issue 4 (all POST calls use mode: 'no-cors')
```

### Apps Script
```
appscript/Code.gs           ← Issues 2, 3, 4, 5, 6, 7, 10 (complete rewrite)
```

### Unchanged Files
```
src/components/Challenges.js      ← No changes needed
src/components/CreateChallenge.js ← No changes needed
src/utils/constants.js            ← No changes needed
src/utils/storage.js              ← No changes needed
src/utils/sounds.js               ← No changes needed
src/utils/helpers.js              ← No changes needed
```

---

## Deployment Steps

### Step 1 — Replace React Files
Copy these files into your project, replacing the originals:
```
src/App.js
src/components/Quiz.js
src/components/Leaderboard.js
src/utils/xpManager.js
src/utils/analytics.js
src/utils/leaderboardApi.js
src/utils/challengeApi.js
```

### Step 2 — Deploy Updated Apps Script
1. Open your Google Apps Script project at https://script.google.com
2. Replace the entire contents of `Code.gs` with the contents of `appscript/Code.gs`
3. Click **Save** (Ctrl+S)
4. Click **Deploy → Manage Deployments**
5. Click the pencil (edit) on your existing deployment
6. Change **Version** to **"New version"**
7. Click **Deploy**
8. Copy the new deployment URL (it will be the same base URL — GAS keeps the URL stable across versions)
9. Confirm `SHEETS_URL` in `src/utils/constants.js` matches your deployment URL

### Step 3 — Run Full System Reset (one time only)
After deploying the new Apps Script:
1. In the Apps Script editor, select the function `fullSystemReset` from the dropdown
2. Click **Run**
3. Check the **Execution log** — you should see all sheets recreated and user counts logged
4. This will NOT delete your `register` sheet or any analytics sheets

### Step 4 — Verify Sheets Structure
After the reset, confirm these sheets exist with the correct headers:
- `user_xp` — 15 columns starting with `email, name, total_xp...`
- `leaderboard_daily` — 8 columns: `date, rank, rank_display, email, name, xp_earned, level, quizzes`
- `leaderboard_weekly` — 9 columns: `week_start, week_end, rank, rank_display, email, name, xp_earned, level, quizzes`
- `leaderboard_monthly` — 8 columns: `month, rank, rank_display, email, name, xp_earned, level, quizzes`
- `leaderboard_alltime` — 8 columns: `rank, rank_display, email, name, total_xp, level, avg_score, total_quizzes`
- `challenges` — 19 columns
- `challenge_messages` — 4 pre-filled rows
- `subjects` — 9 pre-filled rows

### Step 5 — Build and Test
```bash
npm run build   # or: npm run dev
```

---

## Testing Checklist

### XP System (Issues 1, 8)
- [ ] Complete a quiz with 3/5 correct answers
- [ ] Check `user_xp` sheet — exactly ONE new row or updated row, with XP = `(3×5) + streak_bonus ± bonuses`
- [ ] Streak = 1 day → +2 XP bonus applied
- [ ] Perfect score (5/5) → +50 bonus
- [ ] Finish with >10s remaining → +10 speed bonus
- [ ] Used 50/50 → -5 penalty
- [ ] Used hint → -3 penalty
- [ ] XP should NEVER appear twice for one quiz

### Leaderboards (Issues 2, 3, 6, 7, 11)
- [ ] Complete a quiz → wait 5 seconds → open Leaderboard
- [ ] Your name appears in All-Time with correct XP
- [ ] Your name appears in Daily (rank shows "1st", "2nd", not "0")
- [ ] Tomorrow, open Daily tab → today's entry is gone; you're not in the list
- [ ] Completing a second quiz increases your XP in all boards — you appear only ONCE per board

### Challenges (Issue 4)
- [ ] Enter a valid registered email → challenge creates successfully (no "not found" error)
- [ ] Enter an unregistered email → shows error correctly
- [ ] Accept/decline challenge updates the status in the sheet

### Analytics (Issues 5, 9)
- [ ] Complete a quiz → `quiz_complete` sheet is created/updated with a new row
- [ ] Load the app → close tab → `session_end` sheet shows `duration_formatted` as `HH:MM:SS` (e.g., `00:02:34`)

### System Reset (Issue 10)
- [ ] Run `fullSystemReset()` from the Apps Script editor
- [ ] No errors in execution log
- [ ] All leaderboard sheets have data repopulated from `user_xp`
- [ ] Ranks show ordinals (1st, 2nd, 3rd) not zeros

---

## Key Architecture Notes

- **Google Apps Script POST**: Always use `mode: 'no-cors'` for POST requests. This means you cannot read the response body. The script still runs and writes to Sheets — it just returns an opaque response to the browser.
- **Google Apps Script GET**: Normal fetch works fine — responses are readable JSON.
- **XP flow**: `Quiz.js` tracks correct/wrong → `App.js handleAllDone` calls `calculateQuizXP()` once → `addXP()` is called once → Apps Script `addXP()` writes to `user_xp` and updates all 4 leaderboards.
- **Date handling**: All date comparisons in Apps Script use UTC ISO strings (`YYYY-MM-DD`) to avoid timezone bugs.
- **Email matching**: Always `.toLowerCase().trim()` before comparing.
