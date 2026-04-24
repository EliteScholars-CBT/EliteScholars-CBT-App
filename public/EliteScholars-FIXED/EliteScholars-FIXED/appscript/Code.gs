// ─────────────────────────────────────────────────────────────────────────────
//  ELITESCHOLARS CBT - COMPLETE FIXED APPS SCRIPT
//
//  FIXES:
//  Issue 2  - Daily/Weekly/Monthly leaderboards filter by date correctly
//  Issue 3  - Rank columns use 1-based indexing (never 0); ordinals applied
//  Issue 4  - getAvailableUsers/createChallenge: flexible column detection + trim
//  Issue 5  - Analytics doPost: sheet creation and row appending work correctly
//  Issue 6  - addXP calls all four updateXxxLeaderboard functions in sequence
//  Issue 7  - updateXxxLeaderboard: upserts (finds existing row, updates it) not inserts
//  Issue 10 - fullSystemReset: all getRange() calls use 1-based column indices
// ─────────────────────────────────────────────────────────────────────────────

// ============================================================================
// CONFIGURATION
// ============================================================================
const CONFIG = {
  headerBg: "#1A1A2E",
  headerFont: "#E0E0FF",
  altRowBg: "#F0F0FA",
  borderColor: "#AAAACC",
  fontFamily: "Arial",
};

const LEADERBOARD_SHEETS = {
  USER_XP: 'user_xp',
  LEADERBOARD_DAILY: 'leaderboard_daily',
  LEADERBOARD_WEEKLY: 'leaderboard_weekly',
  LEADERBOARD_MONTHLY: 'leaderboard_monthly',
  LEADERBOARD_ALLTIME: 'leaderboard_alltime',
  CHALLENGES: 'challenges',
  CHALLENGE_MESSAGES: 'challenge_messages',
  SUBJECTS: 'subjects'
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function fmtTimestamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// FIX (Issue 2): Use UTC-based date strings consistently
function getTodayStr() {
  const d = new Date();
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().split('T')[0];
}

function getWeekStartStr() {
  const d = new Date();
  const utcDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = utcDate.getUTCDay();
  const diff = utcDate.getUTCDate() - day + (day === 0 ? -6 : 1);
  return new Date(Date.UTC(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), diff)).toISOString().split('T')[0];
}

function getMonthStr() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

function getOrdinalSuffix(n) {
  if (n >= 11 && n <= 13) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function formatRankDisplay(rank) {
  return rank + getOrdinalSuffix(rank);
}

// Safe JSON response helper
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// ENTRY POINT - doPost
// ============================================================================
function doPost(e) {
  console.log('=== doPost RECEIVED ===');
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    const event = data.event || "unknown";
    const action = data.action;
    const timestamp = data.timestamp || fmtTimestamp();

    // Ensure user exists in user_xp whenever email+name are present
    if (data.email && data.name) {
      ensureUserExists(data.email, data.name);
    }

    // Route named actions first
    if (action) {
      switch (action) {
        case 'addXP':               return addXP(data);
        case 'createChallenge':     return createChallenge(data);
        case 'acceptChallenge':     return acceptChallenge(data);
        case 'declineChallenge':    return declineChallenge(data);
        case 'submitChallengeScore':return submitChallengeScore(data);
        case 'ensureUser':
          ensureUserExists(data.email, data.name);
          return jsonResponse({ success: true });
        default:
          break;
      }
    }

    // FIX (Issue 5): Analytics event logging — robust sheet creation and row writing
    const dataKeys = Object.keys(data).filter(k => k !== "event");
    const headers  = ["#", "timestamp", ...dataKeys];

    let sheet = ss.getSheetByName(event);
    const isNew = !sheet;

    if (isNew) {
      sheet = ss.insertSheet(event);
      _setupSheet(sheet, headers);
    } else {
      // Ensure existing sheet has all current headers (in case new fields were added)
      const existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      if (existingHeaders.length < headers.length) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    }

    // Build row using the actual headers of this sheet
    const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const rowNum = Math.max(sheet.getLastRow(), 1); // always at least 1 (header row)
    const row = [rowNum, timestamp];
    // Fill remaining columns based on the dataKeys order
    for (let i = 2; i < currentHeaders.length; i++) {
      row.push(data[currentHeaders[i]] ?? "");
    }

    sheet.appendRow(row);
    _styleDataRow(sheet, sheet.getLastRow(), currentHeaders.length);
    _upsertChart(sheet, currentHeaders);

    return jsonResponse({ status: "ok" });

  } catch (err) {
    console.error('Error in doPost:', err.toString());
    return jsonResponse({ status: "error", msg: err.toString() });
  }
}

// ============================================================================
// ENTRY POINT - doGet
// ============================================================================
function doGet(e) {
  const action = e.parameter.action;
  switch (action) {
    case 'getLeaderboard':       return getLeaderboard(e);
    case 'getUserRank':          return getUserRank(e);
    case 'getAvailableUsers':    return getAvailableUsers(e);
    case 'getXP':                return getUserXP(e);
    case 'getPendingChallenges': return getPendingChallenges(e);
    case 'getChallengeHistory':  return getChallengeHistory(e);
    case 'getChallengeMessages': return getChallengeMessages();
    default:
      return jsonResponse({ error: 'Unknown action' });
  }
}

// ============================================================================
// AUTO-CREATE USER IN user_xp IF NOT EXISTS
// ============================================================================
function ensureUserExists(email, name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  if (!sheet) {
    createAllSheets();
    sheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  }

  const data = sheet.getDataRange().getValues();
  const emailLower = email.toLowerCase().trim();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]?.toString().toLowerCase().trim() === emailLower) return;
  }

  const now   = new Date();
  const today = getTodayStr();
  sheet.appendRow([email, name, 0, 1, 100, 0, 0, 0, 0, 0, 0, 0, 0, today, now]);
  Logger.log(`✅ New user created: ${email}`);
}

// ============================================================================
// CREATE ALL SHEETS (run once or during reset)
// ============================================================================
function createAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetsConfig = [
    {
      name: LEADERBOARD_SHEETS.USER_XP,
      headers: ['email','name','total_xp','level','xp_to_next','quizzes_taken','total_correct','total_questions','perfect_rounds','challenges_won','challenges_lost','current_streak','best_streak','last_active','created_at']
    },
    {
      name: LEADERBOARD_SHEETS.LEADERBOARD_DAILY,
      // Cols: date | rank | rank_display | email | name | xp_earned | level | quizzes
      headers: ['date','rank','rank_display','email','name','xp_earned','level','quizzes']
    },
    {
      name: LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY,
      // Cols: week_start | week_end | rank | rank_display | email | name | xp_earned | level | quizzes
      headers: ['week_start','week_end','rank','rank_display','email','name','xp_earned','level','quizzes']
    },
    {
      name: LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY,
      // Cols: month | rank | rank_display | email | name | xp_earned | level | quizzes
      headers: ['month','rank','rank_display','email','name','xp_earned','level','quizzes']
    },
    {
      name: LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME,
      // Cols: rank | rank_display | email | name | total_xp | level | avg_score | total_quizzes
      headers: ['rank','rank_display','email','name','total_xp','level','avg_score','total_quizzes']
    },
    {
      name: LEADERBOARD_SHEETS.CHALLENGES,
      headers: ['challenge_id','challenger_email','challenger_name','opponent_email','opponent_name','exam_type','university','subject','num_questions','time_limit','message_template','custom_message','status','challenger_score','opponent_score','winner_email','created_at','expires_at','completed_at']
    },
    {
      name: LEADERBOARD_SHEETS.CHALLENGE_MESSAGES,
      headers: ['message_id','category','message_text','is_active']
    },
    {
      name: LEADERBOARD_SHEETS.SUBJECTS,
      headers: ['subject_id','subject_name','exam_type','university','is_active','question_count','display_order']
    }
  ];

  sheetsConfig.forEach(config => {
    let sheet = ss.getSheetByName(config.name);
    if (sheet) ss.deleteSheet(sheet);
    sheet = ss.insertSheet(config.name);
    sheet.getRange(1, 1, 1, config.headers.length).setValues([config.headers]);
    sheet.getRange(1, 1, 1, config.headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    Logger.log(`📄 Created sheet: ${config.name}`);
  });

  // Pre-fill challenge messages
  const msgSheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGE_MESSAGES);
  if (msgSheet) {
    const messages = [
      ['msg_001','friendly',    'Think you can beat me? 😊',                              true],
      ['msg_002','competitive', "I'm coming for your spot on the leaderboard! 👑",         true],
      ['msg_003','funny',       "Prepare to lose... or maybe win? Let's play! 🎮",         true],
      ['msg_004','motivational',"Let's help each other improve! Best score wins! 💪",      true],
      ['msg_005','trash_talk',  "You're going down! Hope you've been studying 😤",          true],
      ['msg_006','rematch',     'Round 2? I want revenge! 🔥',                              true],
      ['msg_007','daily',       'Daily challenge time! Beat my score! 📅',                  true],
      ['msg_008','weekend',     'Weekend quiz battle! Winner buys lunch? 🍕',               true],
    ];
    msgSheet.getRange(2, 1, messages.length, 4).setValues(messages);
  }

  // Pre-fill subjects
  const subjSheet = ss.getSheetByName(LEADERBOARD_SHEETS.SUBJECTS);
  if (subjSheet) {
    const subjects = [
      ['mathematics','Mathematics','both','',    true,250,1],
      ['english',    'English',    'both','',    true,200,2],
      ['physics',    'Physics',    'jamb','',    true,150,3],
      ['chemistry',  'Chemistry',  'both','unilag',true,80,4],
      ['biology',    'Biology',    'both','unilag',true,60,5],
      ['economics',  'Economics',  'jamb','',    true,120,6],
      ['accounting', 'Accounting', 'jamb','',    true, 90,7],
      ['government', 'Government', 'jamb','',    true,100,8],
      ['literature', 'Literature', 'both','unn', true, 45,9],
    ];
    subjSheet.getRange(2, 1, subjects.length, 7).setValues(subjects);
  }

  Logger.log('✅ All sheets created successfully!');
}

// ============================================================================
// GET LEADERBOARD (doGet handler)
// FIX (Issue 2): Each type only returns rows matching the current period.
// FIX (Issue 3): Re-ranks on every read to keep ordinals fresh.
// ============================================================================
function getLeaderboard(e) {
  const type  = e.parameter.type  || 'alltime';
  const limit = parseInt(e.parameter.limit) || 50;
  const ss    = SpreadsheetApp.getActiveSpreadsheet();

  let sheet, headers, rows;

  switch (type) {
    // ── DAILY ──────────────────────────────────────────────────────────────
    case 'daily': {
      sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_DAILY);
      if (!sheet) break;
      const raw     = sheet.getDataRange().getValues();
      headers       = raw[0];
      const todayStr = getTodayStr();
      // FIX (Issue 2): filter to today only
      rows = raw.slice(1).filter(r => r[0]?.toString() === todayStr);
      // Sort by xp_earned desc (col index 5)
      rows.sort((a, b) => (b[5] || 0) - (a[5] || 0));
      // Re-assign ranks in memory (don't write back; write-back happens in update fns)
      for (let i = 0; i < rows.length; i++) {
        rows[i][1] = i + 1;
        rows[i][2] = formatRankDisplay(i + 1);
      }
      break;
    }
    // ── WEEKLY ─────────────────────────────────────────────────────────────
    case 'weekly': {
      sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY);
      if (!sheet) break;
      const raw        = sheet.getDataRange().getValues();
      headers          = raw[0];
      const weekStart  = getWeekStartStr();
      // FIX (Issue 2): filter to this week only
      rows = raw.slice(1).filter(r => r[0]?.toString() === weekStart);
      // Sort by xp_earned desc (col index 6)
      rows.sort((a, b) => (b[6] || 0) - (a[6] || 0));
      for (let i = 0; i < rows.length; i++) {
        rows[i][2] = i + 1;
        rows[i][3] = formatRankDisplay(i + 1);
      }
      break;
    }
    // ── MONTHLY ────────────────────────────────────────────────────────────
    case 'monthly': {
      sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY);
      if (!sheet) break;
      const raw      = sheet.getDataRange().getValues();
      headers        = raw[0];
      const monthStr = getMonthStr();
      // FIX (Issue 2): filter to this month only
      rows = raw.slice(1).filter(r => r[0]?.toString() === monthStr);
      // Sort by xp_earned desc (col index 5)
      rows.sort((a, b) => (b[5] || 0) - (a[5] || 0));
      for (let i = 0; i < rows.length; i++) {
        rows[i][1] = i + 1;
        rows[i][2] = formatRankDisplay(i + 1);
      }
      break;
    }
    // ── ALL-TIME ───────────────────────────────────────────────────────────
    default: {
      sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME);
      if (!sheet) break;
      const raw = sheet.getDataRange().getValues();
      headers   = raw[0];
      rows      = raw.slice(1);
      // Sort by total_xp desc (col index 4)
      rows.sort((a, b) => (b[4] || 0) - (a[4] || 0));
      for (let i = 0; i < rows.length; i++) {
        rows[i][0] = i + 1;
        rows[i][1] = formatRankDisplay(i + 1);
      }
      break;
    }
  }

  if (!sheet || !rows || rows.length === 0) {
    return jsonResponse([]);
  }

  const results = rows.slice(0, limit).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });

  return jsonResponse(results);
}

// ============================================================================
// GET USER RANK (doGet handler)
// FIX (Issue 3): Consistent column mapping across all types
// ============================================================================
function getUserRank(e) {
  const email = e.parameter.email?.toLowerCase().trim();
  const type  = e.parameter.type || 'alltime';
  const ss    = SpreadsheetApp.getActiveSpreadsheet();

  let rank = 0;

  switch (type) {
    case 'daily': {
      const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_DAILY);
      if (sheet) {
        const rows = sheet.getDataRange().getValues().slice(1);
        const today = getTodayStr();
        const filtered = rows.filter(r => r[0]?.toString() === today);
        filtered.sort((a, b) => (b[5] || 0) - (a[5] || 0));
        for (let i = 0; i < filtered.length; i++) {
          if (filtered[i][3]?.toString().toLowerCase().trim() === email) { rank = i + 1; break; }
        }
      }
      break;
    }
    case 'weekly': {
      const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY);
      if (sheet) {
        const rows = sheet.getDataRange().getValues().slice(1);
        const ws   = getWeekStartStr();
        const filtered = rows.filter(r => r[0]?.toString() === ws);
        filtered.sort((a, b) => (b[6] || 0) - (a[6] || 0));
        for (let i = 0; i < filtered.length; i++) {
          if (filtered[i][4]?.toString().toLowerCase().trim() === email) { rank = i + 1; break; }
        }
      }
      break;
    }
    case 'monthly': {
      const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY);
      if (sheet) {
        const rows = sheet.getDataRange().getValues().slice(1);
        const ms   = getMonthStr();
        const filtered = rows.filter(r => r[0]?.toString() === ms);
        filtered.sort((a, b) => (b[5] || 0) - (a[5] || 0));
        for (let i = 0; i < filtered.length; i++) {
          if (filtered[i][3]?.toString().toLowerCase().trim() === email) { rank = i + 1; break; }
        }
      }
      break;
    }
    default: {
      const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME);
      if (sheet) {
        const rows = sheet.getDataRange().getValues().slice(1);
        rows.sort((a, b) => (b[4] || 0) - (a[4] || 0));
        for (let i = 0; i < rows.length; i++) {
          if (rows[i][2]?.toString().toLowerCase().trim() === email) { rank = i + 1; break; }
        }
      }
      break;
    }
  }

  return jsonResponse({ rank: rank, rank_display: rank > 0 ? formatRankDisplay(rank) : '—' });
}

// ============================================================================
// GET AVAILABLE USERS (for Challenge creation)
// FIX (Issue 4): Robust column detection - checks multiple possible header names,
//   falls back to index-based detection if headers are non-standard.
// ============================================================================
function getAvailableUsers(e) {
  const currentEmail = e.parameter.current_email?.toLowerCase().trim();
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const users = [];

  // Try register sheet first; fall back to user_xp
  const registerSheet = ss.getSheetByName('register') || ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  if (!registerSheet) return jsonResponse(users);

  const data    = registerSheet.getDataRange().getValues();
  const headers = data[0].map(h => h?.toString().toLowerCase().trim());

  // FIX (Issue 4): look for email column by multiple possible names
  let emailCol = headers.findIndex(h => ['email','email address','e-mail','emailaddress'].includes(h));
  let nameCol  = headers.findIndex(h => ['name','fullname','full name','full_name','username','display name'].includes(h));

  // Fallback: register sheet is typically: name(0), email(1)
  // user_xp sheet is: email(0), name(1)
  if (emailCol === -1) emailCol = registerSheet.getName() === 'register' ? 1 : 0;
  if (nameCol  === -1) nameCol  = registerSheet.getName() === 'register' ? 0 : 1;

  for (let i = 1; i < data.length; i++) {
    const rowEmail = data[i][emailCol]?.toString().toLowerCase().trim();
    if (!rowEmail) continue;
    if (rowEmail === currentEmail) continue;
    const rowName = data[i][nameCol]?.toString().trim() || rowEmail.split('@')[0];
    users.push({ email: data[i][emailCol].toString().trim(), name: rowName });
  }

  Logger.log(`📋 Found ${users.length} available users`);
  return jsonResponse(users);
}

// ============================================================================
// XP FUNCTIONS
// ============================================================================

// Get user XP from user_xp sheet
function getUserXP(e) {
  const email = e.parameter.email?.toLowerCase().trim();
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);

  if (!sheet) return jsonResponse({ total_xp: 0, level: 1, xp_to_next: 100 });

  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]?.toString().toLowerCase().trim() === email) {
      return jsonResponse({ total_xp: data[i][2], level: data[i][3], xp_to_next: data[i][4] });
    }
  }
  return jsonResponse({ total_xp: 0, level: 1, xp_to_next: 100 });
}

// FIX (Issue 6 & 7): addXP upserts user_xp and calls ALL four leaderboard updaters
function addXP(data) {
  Logger.log(`➕ addXP called for: ${data.email}, amount: ${data.amount}`);
  const email  = data.email?.toLowerCase().trim();
  const name   = data.name;
  const amount = parseInt(data.amount) || 0;
  if (!email || amount <= 0) return jsonResponse({ success: false, error: 'Invalid email or amount' });

  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP); }

  const rows  = sheet.getDataRange().getValues();
  let userRow = null;
  let userIdx = -1;

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0]?.toString().toLowerCase().trim() === email) {
      userRow = rows[i];
      userIdx = i;
      break;
    }
  }

  const today = getTodayStr();
  const now   = new Date();

  if (!userRow) {
    // New user — create row
    const newLevel  = Math.floor(amount / 100) + 1;
    const xpToNext  = newLevel * 100 - amount;
    sheet.appendRow([data.email, name, amount, newLevel, xpToNext, 1, amount, amount, 0, 0, 0, 1, 1, today, now]);
    Logger.log(`✅ New user row created: ${email}`);
  } else {
    // Existing user — update in place
    const oldXP     = parseFloat(userRow[2]) || 0;
    const newXP     = oldXP + amount;
    const newLevel  = Math.floor(newXP / 100) + 1;
    const xpToNext  = newLevel * 100 - newXP;
    const quizzes   = (parseFloat(userRow[5]) || 0) + 1;

    // Columns are 1-indexed: email=1, name=2, total_xp=3, level=4, xp_to_next=5,
    //   quizzes_taken=6, total_correct=7, total_questions=8, ..., last_active=14
    sheet.getRange(userIdx + 1, 3).setValue(newXP);
    sheet.getRange(userIdx + 1, 4).setValue(newLevel);
    sheet.getRange(userIdx + 1, 5).setValue(xpToNext);
    sheet.getRange(userIdx + 1, 6).setValue(quizzes);
    sheet.getRange(userIdx + 1, 14).setValue(today);
    Logger.log(`✅ Updated XP for ${email}: ${oldXP} → ${newXP}`);
  }

  // FIX (Issue 6): Always update all four leaderboards
  updateDailyLeaderboard(data.email, name, amount);
  updateWeeklyLeaderboard(data.email, name, amount);
  updateMonthlyLeaderboard(data.email, name, amount);
  updateAllTimeLeaderboard(data.email, name, amount);

  return jsonResponse({ success: true });
}

// ──────────────────────────────────────────────────────────────────────────────
// FIX (Issue 7): All update functions UPSERT (find existing row, add XP to it).
//               They never insert duplicate rows for the same user+period.
// FIX (Issue 3): All getRange() calls use 1-based column numbers.
// ──────────────────────────────────────────────────────────────────────────────

function _getUserLevel(email, ss) {
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  if (!sheet) return 1;
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]?.toString().toLowerCase().trim() === email.toLowerCase().trim()) {
      return data[i][3] || 1;
    }
  }
  return 1;
}

// leaderboard_daily columns: date(1) | rank(2) | rank_display(3) | email(4) | name(5) | xp_earned(6) | level(7) | quizzes(8)
function updateDailyLeaderboard(email, name, xpEarned) {
  const ss         = SpreadsheetApp.getActiveSpreadsheet();
  const todayStr   = getTodayStr();
  const emailLower = email.toLowerCase().trim();
  const level      = _getUserLevel(email, ss);

  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_DAILY);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_DAILY); }

  const data = sheet.getDataRange().getValues();
  let foundIdx = -1;

  // FIX (Issue 7): Search for existing row for this user+today
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]?.toString() === todayStr && data[i][3]?.toString().toLowerCase().trim() === emailLower) {
      foundIdx = i;
      break;
    }
  }

  if (foundIdx !== -1) {
    // Upsert: add XP to existing row (col 6 = xp_earned, col 7 = level, col 8 = quizzes)
    const curXP     = parseFloat(data[foundIdx][5]) || 0;
    const curQzz    = parseFloat(data[foundIdx][7]) || 0;
    sheet.getRange(foundIdx + 1, 6).setValue(curXP + xpEarned);
    sheet.getRange(foundIdx + 1, 7).setValue(level);
    sheet.getRange(foundIdx + 1, 8).setValue(curQzz + 1);
  } else {
    // New entry for today
    sheet.appendRow([todayStr, 0, '', email, name, xpEarned, level, 1]);
  }

  // Re-rank today's rows and write back to sheet
  _reRankPeriodRows(sheet, todayStr, 0, 5, [1, 2]); // periodCol=0, xpCol=5, rankCols=[1,2] (1-based: col2=rank, col3=rank_display)
  Logger.log(`📊 Daily leaderboard updated: ${email}`);
}

// leaderboard_weekly columns: week_start(1) | week_end(2) | rank(3) | rank_display(4) | email(5) | name(6) | xp_earned(7) | level(8) | quizzes(9)
function updateWeeklyLeaderboard(email, name, xpEarned) {
  const ss          = SpreadsheetApp.getActiveSpreadsheet();
  const weekStart   = getWeekStartStr();
  const emailLower  = email.toLowerCase().trim();
  const level       = _getUserLevel(email, ss);

  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY); }

  const data = sheet.getDataRange().getValues();
  let foundIdx = -1;

  // FIX (Issue 7): Search for existing row for this user+week (email at col index 4 → 0-based)
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]?.toString() === weekStart && data[i][4]?.toString().toLowerCase().trim() === emailLower) {
      foundIdx = i;
      break;
    }
  }

  if (foundIdx !== -1) {
    const curXP  = parseFloat(data[foundIdx][6]) || 0;
    const curQzz = parseFloat(data[foundIdx][8]) || 0;
    sheet.getRange(foundIdx + 1, 7).setValue(curXP + xpEarned);
    sheet.getRange(foundIdx + 1, 8).setValue(level);
    sheet.getRange(foundIdx + 1, 9).setValue(curQzz + 1);
  } else {
    sheet.appendRow([weekStart, weekStart, 0, '', email, name, xpEarned, level, 1]);
  }

  // Re-rank this week's rows — email is at col index 4, xp at col index 6
  _reRankWeekRows(sheet, weekStart);
  Logger.log(`📊 Weekly leaderboard updated: ${email}`);
}

// leaderboard_monthly columns: month(1) | rank(2) | rank_display(3) | email(4) | name(5) | xp_earned(6) | level(7) | quizzes(8)
function updateMonthlyLeaderboard(email, name, xpEarned) {
  const ss         = SpreadsheetApp.getActiveSpreadsheet();
  const monthStr   = getMonthStr();
  const emailLower = email.toLowerCase().trim();
  const level      = _getUserLevel(email, ss);

  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY); }

  const data = sheet.getDataRange().getValues();
  let foundIdx = -1;

  for (let i = 1; i < data.length; i++) {
    if (data[i][0]?.toString() === monthStr && data[i][3]?.toString().toLowerCase().trim() === emailLower) {
      foundIdx = i;
      break;
    }
  }

  if (foundIdx !== -1) {
    const curXP  = parseFloat(data[foundIdx][5]) || 0;
    const curQzz = parseFloat(data[foundIdx][7]) || 0;
    sheet.getRange(foundIdx + 1, 6).setValue(curXP + xpEarned);
    sheet.getRange(foundIdx + 1, 7).setValue(level);
    sheet.getRange(foundIdx + 1, 8).setValue(curQzz + 1);
  } else {
    sheet.appendRow([monthStr, 0, '', email, name, xpEarned, level, 1]);
  }

  _reRankMonthRows(sheet, monthStr);
  Logger.log(`📊 Monthly leaderboard updated: ${email}`);
}

// leaderboard_alltime columns: rank(1) | rank_display(2) | email(3) | name(4) | total_xp(5) | level(6) | avg_score(7) | total_quizzes(8)
function updateAllTimeLeaderboard(email, name, xpEarned) {
  const ss         = SpreadsheetApp.getActiveSpreadsheet();
  const emailLower = email.toLowerCase().trim();

  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME); }

  const data = sheet.getDataRange().getValues();
  let foundIdx = -1;

  // FIX (Issue 7): Search by email at col index 2 (0-based)
  for (let i = 1; i < data.length; i++) {
    if (data[i][2]?.toString().toLowerCase().trim() === emailLower) {
      foundIdx = i;
      break;
    }
  }

  if (foundIdx !== -1) {
    const curXP   = parseFloat(data[foundIdx][4]) || 0;
    const newXP   = curXP + xpEarned;
    const newLvl  = Math.floor(newXP / 100) + 1;
    const curQzz  = parseFloat(data[foundIdx][7]) || 0;
    // FIX (Issue 3/10): 1-based column indices: total_xp=5, level=6, total_quizzes=8
    sheet.getRange(foundIdx + 1, 5).setValue(newXP);
    sheet.getRange(foundIdx + 1, 6).setValue(newLvl);
    sheet.getRange(foundIdx + 1, 8).setValue(curQzz + 1);
  } else {
    const newLvl = Math.floor(xpEarned / 100) + 1;
    sheet.appendRow([0, '', email, name, xpEarned, newLvl, 0, 1]);
  }

  // Re-rank all-time
  _reRankAllTimeRows(sheet);
  Logger.log(`📊 All-time leaderboard updated: ${email}`);
}

// ──────────────────────────────────────────────────────────────────────────────
// Rank helper functions
// FIX (Issue 3 & 10): All setRange() calls use 1-based column indices.
// ──────────────────────────────────────────────────────────────────────────────

// Re-rank leaderboard_daily or leaderboard_monthly rows for a given period value
// periodColIdx = 0-based index for the period column in the data array
// xpColIdx = 0-based index for the XP column
// rankSheetCols = [rankCol1Based, rankDisplayCol1Based]
function _reRankPeriodRows(sheet, periodValue, periodColIdx, xpColIdx, rankSheetCols) {
  const allData = sheet.getDataRange().getValues();
  // Collect indices of rows matching this period
  const matchingIdxs = [];
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][periodColIdx]?.toString() === periodValue) {
      matchingIdxs.push(i);
    }
  }
  if (matchingIdxs.length === 0) return;

  // Sort by XP descending
  matchingIdxs.sort((a, b) => (parseFloat(allData[b][xpColIdx]) || 0) - (parseFloat(allData[a][xpColIdx]) || 0));

  // Write ranks back to sheet
  for (let rank = 1; rank <= matchingIdxs.length; rank++) {
    const sheetRow = matchingIdxs[rank - 1] + 1; // +1 for 1-based
    sheet.getRange(sheetRow, rankSheetCols[0]).setValue(rank);
    sheet.getRange(sheetRow, rankSheetCols[1]).setValue(formatRankDisplay(rank));
  }
}

// Weekly has different layout (email at col 4, xp at col 6, rank at cols 3&4 in sheet)
function _reRankWeekRows(sheet, weekStart) {
  const allData = sheet.getDataRange().getValues();
  const matchingIdxs = [];
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][0]?.toString() === weekStart) matchingIdxs.push(i);
  }
  if (matchingIdxs.length === 0) return;
  matchingIdxs.sort((a, b) => (parseFloat(allData[b][6]) || 0) - (parseFloat(allData[a][6]) || 0));
  for (let rank = 1; rank <= matchingIdxs.length; rank++) {
    const sheetRow = matchingIdxs[rank - 1] + 1;
    sheet.getRange(sheetRow, 3).setValue(rank);
    sheet.getRange(sheetRow, 4).setValue(formatRankDisplay(rank));
  }
}

function _reRankMonthRows(sheet, monthStr) {
  // monthly: month(0) | rank(1) | rank_display(2) | email(3) | name(4) | xp_earned(5) ...
  const allData = sheet.getDataRange().getValues();
  const matchingIdxs = [];
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][0]?.toString() === monthStr) matchingIdxs.push(i);
  }
  if (matchingIdxs.length === 0) return;
  matchingIdxs.sort((a, b) => (parseFloat(allData[b][5]) || 0) - (parseFloat(allData[a][5]) || 0));
  for (let rank = 1; rank <= matchingIdxs.length; rank++) {
    const sheetRow = matchingIdxs[rank - 1] + 1;
    sheet.getRange(sheetRow, 2).setValue(rank);
    sheet.getRange(sheetRow, 3).setValue(formatRankDisplay(rank));
  }
}

function _reRankAllTimeRows(sheet) {
  // alltime: rank(0) | rank_display(1) | email(2) | name(3) | total_xp(4) ...
  const allData = sheet.getDataRange().getValues();
  const dataRows = [];
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][2]) dataRows.push(i); // has email
  }
  if (dataRows.length === 0) return;
  dataRows.sort((a, b) => (parseFloat(allData[b][4]) || 0) - (parseFloat(allData[a][4]) || 0));
  for (let rank = 1; rank <= dataRows.length; rank++) {
    const sheetRow = dataRows[rank - 1] + 1;
    // FIX (Issue 10): col 1 and col 2 are 1-based
    sheet.getRange(sheetRow, 1).setValue(rank);
    sheet.getRange(sheetRow, 2).setValue(formatRankDisplay(rank));
  }
}

// ============================================================================
// CHALLENGE FUNCTIONS
// ============================================================================

// FIX (Issue 4): createChallenge uses the same robust column detection as getAvailableUsers
function createChallenge(data) {
  Logger.log(`⚔️ Creating challenge: ${data.challenger_email} → ${data.opponent_email}`);

  const challenger_email = data.challenger_email?.toLowerCase().trim();
  const opponent_email   = data.opponent_email?.toLowerCase().trim();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Look up opponent in register sheet (or user_xp as fallback)
  let opponentExists   = false;
  let opponentRealEmail = data.opponent_email;
  let opponentRealName  = data.opponent_name || opponent_email.split('@')[0];

  const regSheet = ss.getSheetByName('register') || ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  if (regSheet) {
    const regData = regSheet.getDataRange().getValues();
    const headers = regData[0].map(h => h?.toString().toLowerCase().trim());

    let emailCol = headers.findIndex(h => ['email','email address','e-mail','emailaddress'].includes(h));
    let nameCol  = headers.findIndex(h => ['name','fullname','full name','full_name','username','display name'].includes(h));
    if (emailCol === -1) emailCol = regSheet.getName() === 'register' ? 1 : 0;
    if (nameCol  === -1) nameCol  = regSheet.getName() === 'register' ? 0 : 1;

    for (let i = 1; i < regData.length; i++) {
      const sheetEmail = regData[i][emailCol]?.toString().toLowerCase().trim();
      if (sheetEmail === opponent_email) {
        opponentExists    = true;
        opponentRealEmail = regData[i][emailCol].toString().trim();
        opponentRealName  = regData[i][nameCol]?.toString().trim() || opponent_email.split('@')[0];
        break;
      }
    }
  }

  if (!opponentExists) {
    Logger.log(`❌ Opponent not found: ${data.opponent_email}`);
    return jsonResponse({ success: false, error: "Opponent email not found. They must be registered." });
  }

  // Verify challenger exists in user_xp
  let challengerExists   = false;
  let challengerRealName = data.challenger_name;
  const uxpSheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  if (uxpSheet) {
    const uxpData = uxpSheet.getDataRange().getValues();
    for (let i = 1; i < uxpData.length; i++) {
      if (uxpData[i][0]?.toString().toLowerCase().trim() === challenger_email) {
        challengerExists   = true;
        challengerRealName = uxpData[i][1];
        break;
      }
    }
  }

  if (!challengerExists) {
    // Auto-create challenger so challenges can proceed
    ensureUserExists(data.challenger_email, data.challenger_name || challenger_email.split('@')[0]);
    challengerRealName = data.challenger_name || challenger_email.split('@')[0];
  }

  const challengeId = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 6);
  const createdAt   = new Date();
  const expiresAt   = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);

  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGES);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGES); }

  sheet.appendRow([
    challengeId, data.challenger_email, challengerRealName,
    opponentRealEmail, opponentRealName,
    data.exam_type, data.university || '', data.subject,
    data.num_questions, data.time_limit,
    data.message_template, data.custom_message || '',
    'pending', null, null, null,
    createdAt, expiresAt, null
  ]);

  Logger.log(`✅ Challenge created: ${challengeId}`);
  return jsonResponse({ success: true, challenge_id: challengeId });
}

function getPendingChallenges(e) {
  const email = e.parameter.email?.toLowerCase().trim();
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGES);
  if (!sheet) return jsonResponse([]);

  const data    = sheet.getDataRange().getValues();
  const headers = data[0];
  const now     = new Date();
  const pending = [];

  for (const row of data.slice(1)) {
    const oppEmail  = row[3]?.toString().toLowerCase().trim();
    const expiresAt = new Date(row[17]);
    if (oppEmail === email && row[12] === 'pending' && expiresAt > now) {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      pending.push(obj);
    }
  }

  Logger.log(`📋 ${pending.length} pending challenges for ${email}`);
  return jsonResponse(pending);
}

function getChallengeHistory(e) {
  const email = e.parameter.email?.toLowerCase().trim();
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGES);
  if (!sheet) return jsonResponse([]);

  const data    = sheet.getDataRange().getValues();
  const headers = data[0];
  const history = [];

  for (const row of data.slice(1)) {
    const cEmail = row[1]?.toString().toLowerCase().trim();
    const oEmail = row[3]?.toString().toLowerCase().trim();
    if ((cEmail === email || oEmail === email) && row[12] === 'completed') {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      history.push(obj);
    }
  }

  return jsonResponse(history);
}

function acceptChallenge(data) {
  Logger.log(`✅ Accepting challenge: ${data.challenge_id}`);
  const opponentEmailLower = data.opponent_email?.toLowerCase().trim();
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGES);
  if (!sheet) return jsonResponse({ success: false });

  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.challenge_id && rows[i][3]?.toString().toLowerCase().trim() === opponentEmailLower) {
      sheet.getRange(i + 1, 13).setValue('accepted');
      break;
    }
  }
  return jsonResponse({ success: true });
}

function declineChallenge(data) {
  Logger.log(`❌ Declining challenge: ${data.challenge_id}`);
  const opponentEmailLower = data.opponent_email?.toLowerCase().trim();
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGES);
  if (!sheet) return jsonResponse({ success: false });

  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.challenge_id && rows[i][3]?.toString().toLowerCase().trim() === opponentEmailLower) {
      sheet.getRange(i + 1, 13).setValue('declined');
      break;
    }
  }
  return jsonResponse({ success: true });
}

function submitChallengeScore(data) {
  Logger.log(`📝 Challenge score: ${data.challenge_id}, user: ${data.email}, score: ${data.score}`);
  const userEmail = data.email?.toLowerCase().trim();
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGES);
  if (!sheet) return jsonResponse({ success: false });

  const rows = sheet.getDataRange().getValues();
  let rowIdx = -1, challengerEmail = '', opponentEmail = '';

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.challenge_id) {
      rowIdx         = i;
      challengerEmail = rows[i][1]?.toString().toLowerCase().trim();
      opponentEmail   = rows[i][3]?.toString().toLowerCase().trim();
      break;
    }
  }
  if (rowIdx === -1) return jsonResponse({ success: false, error: 'Challenge not found' });

  // Write score into the correct column (1-based: challenger_score=14, opponent_score=15)
  if (userEmail === challengerEmail) {
    sheet.getRange(rowIdx + 1, 14).setValue(data.score);
  } else if (userEmail === opponentEmail) {
    sheet.getRange(rowIdx + 1, 15).setValue(data.score);
  }

  // Check if both scores are in — if so, complete the challenge
  const updatedRow      = sheet.getRange(rowIdx + 1, 1, 1, 19).getValues()[0];
  const challengerScore = updatedRow[13];
  const opponentScore   = updatedRow[14];

  if (challengerScore !== null && challengerScore !== '' &&
      opponentScore   !== null && opponentScore   !== '') {
    const winner = parseFloat(challengerScore) >= parseFloat(opponentScore) ? updatedRow[1] : updatedRow[3];
    sheet.getRange(rowIdx + 1, 16).setValue(winner);
    sheet.getRange(rowIdx + 1, 13).setValue('completed');
    sheet.getRange(rowIdx + 1, 19).setValue(new Date());
    Logger.log(`🏆 Challenge complete! Winner: ${winner}`);
  }

  return jsonResponse({ success: true });
}

function getChallengeMessages() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGE_MESSAGES);
  if (!sheet) return jsonResponse([]);

  const data    = sheet.getDataRange().getValues();
  const headers = data[0];
  const messages = [];

  for (const row of data.slice(1)) {
    if (row[3] === true) {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      messages.push(obj);
    }
  }
  return jsonResponse(messages);
}

// ============================================================================
// FULL SYSTEM RESET
// FIX (Issue 10): All getRange() calls use 1-based column indices (never 0)
// ============================================================================
function fullSystemReset() {
  Logger.log('🚀 ========== FULL SYSTEM RESET STARTED ==========');

  try {
    // Step 1: Recreate all sheets fresh
    Logger.log('📄 Step 1: Recreating all sheets...');
    createAllSheets();

    const ss         = SpreadsheetApp.getActiveSpreadsheet();
    const userXpSheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
    if (!userXpSheet) {
      Logger.log('❌ user_xp sheet not found after createAllSheets - aborting');
      return;
    }

    const userData = userXpSheet.getDataRange().getValues();
    const userRows = userData.slice(1);
    Logger.log(`📊 Found ${userRows.length} users in user_xp`);

    const todayStr    = getTodayStr();
    const weekStart   = getWeekStartStr();
    const monthStr    = getMonthStr();

    const dailySheet   = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_DAILY);
    const weeklySheet  = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY);
    const monthlySheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY);
    const alltimeSheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME);

    const dailyEntries   = [];
    const weeklyEntries  = [];
    const monthlyEntries = [];
    const alltimeEntries = [];

    for (const row of userRows) {
      const email        = row[0]?.toString().trim();
      const name         = row[1]?.toString().trim();
      const totalXP      = parseFloat(row[2]) || 0;
      const level        = parseFloat(row[3]) || 1;
      const quizzesTaken = parseFloat(row[5]) || 0;
      const totalCorrect = parseFloat(row[6]) || 0;
      const totalQuests  = parseFloat(row[7]) || 1;
      const avgScore     = Math.round((totalCorrect / totalQuests) * 100);
      const lastActive   = row[13];

      if (!email || totalXP === 0) continue;

      let lastActiveStr = '';
      if (lastActive) {
        const d = lastActive instanceof Date ? lastActive : new Date(lastActive);
        if (!isNaN(d.getTime())) {
          lastActiveStr = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().split('T')[0];
        }
      }

      alltimeEntries.push({ email, name, totalXP, level, avgScore, quizzesTaken });

      if (lastActiveStr === todayStr) {
        dailyEntries.push({ email, name, xp: totalXP, level, quizzes: quizzesTaken });
      }
      if (lastActiveStr && lastActiveStr >= weekStart) {
        weeklyEntries.push({ email, name, xp: totalXP, level, quizzes: quizzesTaken });
      }
      if (lastActiveStr && lastActiveStr.substring(0, 7) === monthStr) {
        monthlyEntries.push({ email, name, xp: totalXP, level, quizzes: quizzesTaken });
      }
    }

    // Write daily
    dailyEntries.sort((a, b) => b.xp - a.xp);
    dailyEntries.forEach((u, i) => {
      const rank = i + 1;
      dailySheet.appendRow([todayStr, rank, formatRankDisplay(rank), u.email, u.name, u.xp, u.level, u.quizzes]);
    });
    Logger.log(`📅 Daily: ${dailyEntries.length} entries`);

    // Write weekly
    weeklyEntries.sort((a, b) => b.xp - a.xp);
    weeklyEntries.forEach((u, i) => {
      const rank = i + 1;
      weeklySheet.appendRow([weekStart, weekStart, rank, formatRankDisplay(rank), u.email, u.name, u.xp, u.level, u.quizzes]);
    });
    Logger.log(`📆 Weekly: ${weeklyEntries.length} entries`);

    // Write monthly
    monthlyEntries.sort((a, b) => b.xp - a.xp);
    monthlyEntries.forEach((u, i) => {
      const rank = i + 1;
      monthlySheet.appendRow([monthStr, rank, formatRankDisplay(rank), u.email, u.name, u.xp, u.level, u.quizzes]);
    });
    Logger.log(`📅 Monthly: ${monthlyEntries.length} entries`);

    // Write all-time
    alltimeEntries.sort((a, b) => b.totalXP - a.totalXP);
    alltimeEntries.forEach((u, i) => {
      const rank = i + 1;
      alltimeSheet.appendRow([rank, formatRankDisplay(rank), u.email, u.name, u.totalXP, u.level, u.avgScore, u.quizzesTaken]);
    });
    Logger.log(`🏆 All-time: ${alltimeEntries.length} entries`);

    Logger.log('✅ ========== FULL SYSTEM RESET COMPLETE ==========');
    Logger.log(`   Daily: ${dailyEntries.length} | Weekly: ${weeklyEntries.length} | Monthly: ${monthlyEntries.length} | All-time: ${alltimeEntries.length}`);

  } catch (error) {
    Logger.log(`❌ ERROR during reset: ${error.toString()}`);
    throw error;
  }
}

// ============================================================================
// SHEET SETUP HELPER FUNCTIONS
// ============================================================================
function _setupSheet(sheet, headers) {
  const totalCols = headers.length;
  const headerRange = sheet.getRange(1, 1, 1, totalCols);
  headerRange.setValues([headers]);
  headerRange
    .setBackground(CONFIG.headerBg)
    .setFontColor(CONFIG.headerFont)
    .setFontWeight("bold")
    .setFontFamily(CONFIG.fontFamily)
    .setFontSize(11)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 36);
  sheet.setColumnWidth(1, 50);
  sheet.setColumnWidth(2, 180);
  for (let c = 3; c <= totalCols; c++) sheet.setColumnWidth(c, 160);
  sheet.setFrozenRows(1);
  sheet.setTabColor("#1A1A2E");
}

function _styleDataRow(sheet, rowIndex, totalCols) {
  const isEven = rowIndex % 2 === 0;
  const bg = isEven ? CONFIG.altRowBg : "#FFFFFF";
  sheet.getRange(rowIndex, 1, 1, totalCols)
    .setBackground(bg)
    .setFontFamily(CONFIG.fontFamily)
    .setFontSize(10)
    .setFontColor("#222222")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(rowIndex, 28);
}

function _upsertChart(sheet, headers) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  const numericColIndex = _firstNumericColIndex(sheet, headers);
  if (numericColIndex === -1) return;
  sheet.getCharts().forEach(c => sheet.removeChart(c));
  const labelRange = sheet.getRange(2, 1, lastRow - 1, 1);
  const valueRange = sheet.getRange(2, numericColIndex, lastRow - 1, 1);
  const chart = sheet.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(labelRange)
    .addRange(valueRange)
    .setNumHeaders(0)
    .setOption("title", `${sheet.getName()} — ${headers[numericColIndex - 1]}`)
    .setOption("titleTextStyle", { fontSize: 13, bold: true, color: CONFIG.headerBg })
    .setOption("backgroundColor", { fill: "#FAFAFA" })
    .setOption("colors", ["#6C63FF"])
    .setOption("legend", { position: "none" })
    .setOption("chartArea", { left: 60, top: 50, width: "80%", height: "75%" })
    .setPosition(2, headers.length + 2, 0, 0)
    .setOption("width", 520)
    .setOption("height", 300)
    .build();
  sheet.insertChart(chart);
}

function _firstNumericColIndex(sheet, headers) {
  if (sheet.getLastRow() < 2) return -1;
  for (let i = 0; i < headers.length; i++) {
    const val = sheet.getRange(2, i + 1).getValue();
    if (typeof val === "number") return i + 1;
  }
  return -1;
}
