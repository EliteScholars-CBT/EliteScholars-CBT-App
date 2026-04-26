// ─────────────────────────────────────────────────────────────────────────────
//  ELITESCHOLARS CBT — GOOGLE APPS SCRIPT (UPDATED)
//  Existing sheets: unchanged (user_xp, leaderboard_*, challenges, etc.)
//  NEW sheets: study_sessions, ad_events, security_events
//  NEW actions: studyEvents, adEvents, securityEvents, updateXP (all XP sources)
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

// NEW sheet names — separate from existing
const NEW_SHEETS = {
  STUDY_SESSIONS: 'study_sessions',
  AD_EVENTS:      'ad_events',
  SECURITY_EVENTS:'security_events',
};

// ============================================================================
// HELPER FUNCTIONS (unchanged from original)
// ============================================================================
function fmtTimestamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

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
    case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th';
  }
}

function formatRankDisplay(rank) { return rank + getOrdinalSuffix(rank); }

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function normalizeDateCell(val) {
  if (!val && val !== 0) return '';
  if (val instanceof Date) {
    const y = val.getFullYear();
    const m = String(val.getMonth() + 1).padStart(2, '0');
    const d = String(val.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  const s = val.toString().trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  if (/^\d{4}-\d{2}$/.test(s)) return s;
  const parsed = new Date(s);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const d = String(parsed.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return s;
}

function normalizeDateCellToMonth(val) {
  const full = normalizeDateCell(val);
  if (full.length >= 7) return full.substring(0, 7);
  return full;
}

// ============================================================================
// ENTRY POINT — doPost
// ============================================================================
function doPost(e) {
  console.log('=== doPost RECEIVED ===');
  try {
    const ss        = SpreadsheetApp.getActiveSpreadsheet();
    const data      = JSON.parse(e.postData.contents);
    const event     = data.event || "unknown";
    const action    = data.action;
    const timestamp = data.timestamp || fmtTimestamp();

    if (data.email && data.name) ensureUserExists(data.email, data.name);

    if (action) {
      switch (action) {
        // ── Existing actions (unchanged) ────────────────────────────────────
        case 'addXP':               return addXP(data);
        case 'updateXP':            return addXP(data); // alias — all XP sources use same handler
        case 'createChallenge':     return createChallenge(data);
        case 'acceptChallenge':     return acceptChallenge(data);
        case 'declineChallenge':    return declineChallenge(data);
        case 'submitChallengeScore':return submitChallengeScore(data);
        case 'ensureUser':
          ensureUserExists(data.email, data.name);
          return jsonResponse({ success: true });
        // ── NEW actions ──────────────────────────────────────────────────────
        case 'studyEvents':   return handleStudyEvents(data);
        case 'adEvents':      return handleAdEvents(data);
        case 'securityEvents':return handleSecurityEvents(data);
        default: break;
      }
    }

    // Generic analytics event logging (unchanged)
    const dataKeys = Object.keys(data).filter(k => k !== "event");
    const headers  = ["#", "timestamp", ...dataKeys];
    let sheet      = ss.getSheetByName(event);
    const isNew    = !sheet;
    if (isNew) {
      sheet = ss.insertSheet(event);
      _setupSheet(sheet, headers);
    } else {
      const existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      if (existingHeaders.length < headers.length) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    }
    const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const rowNum = Math.max(sheet.getLastRow(), 1);
    const row = [rowNum, timestamp];
    for (let i = 2; i < currentHeaders.length; i++) row.push(data[currentHeaders[i]] ?? "");
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
// ENTRY POINT — doGet (unchanged)
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
    default: return jsonResponse({ error: 'Unknown action' });
  }
}

// ============================================================================
// NEW — STUDY ANALYTICS HANDLER
// Creates/appends to study_sessions sheet (separate from existing sheets)
// ============================================================================
function handleStudyEvents(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const events = Array.isArray(data.events) ? data.events : [data];

  let sheet = ss.getSheetByName(NEW_SHEETS.STUDY_SESSIONS);
  if (!sheet) sheet = createStudySessionsSheet();

  for (const ev of events) {
    try {
      if (ev.type === 'study_session') {
        sheet.appendRow([
          fmtTimestamp(),
          ev.email        || '',
          ev.name         || '',
          ev.examType     || '',
          ev.subjectId    || '',
          ev.subjectLabel || '',
          ev.topicName    || '',
          ev.startIso     || '',
          ev.endIso       || '',
          ev.durationSec  || 0,
          ev.durationMin  || 0,
          ev.date         || '',
          ev.hourOfDay    || '',
        ]);
      } else if (ev.type === 'topic_opened') {
        sheet.appendRow([
          fmtTimestamp(), ev.email||'', ev.name||'', ev.examType||'', ev.subjectId||'',
          '', ev.topicName||'', '', '', 0, 0, '', ev.hourOfDay||''
        ]);
      } else if (ev.type === 'topic_completed' || ev.type === 'learn_quiz_complete') {
        sheet.appendRow([
          fmtTimestamp(), ev.email||'', ev.name||'', ev.examType||'', ev.subjectId||'',
          '', ev.topicName||'', '', '', 0, 0, '', ''
        ]);
      }
      _styleDataRow(sheet, sheet.getLastRow(), 13);
    } catch(e2) {
      Logger.log('studyEvent row error: ' + e2);
    }
  }
  return jsonResponse({ success: true, count: events.length });
}

// ============================================================================
// NEW — AD ANALYTICS HANDLER
// Creates/appends to ad_events sheet
// ============================================================================
function handleAdEvents(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const events = Array.isArray(data.events) ? data.events : [data];

  let sheet = ss.getSheetByName(NEW_SHEETS.AD_EVENTS);
  if (!sheet) sheet = createAdEventsSheet();

  for (const ev of events) {
    try {
      sheet.appendRow([
        fmtTimestamp(),
        ev.type        || '',
        ev.adType      || '',
        ev.adId        || '',
        ev.examType    || '',
        ev.link        || '',
        ev.visibleMs   || '',
        ev.url         || '',
        ev.timestamp   || '',
      ]);
      _styleDataRow(sheet, sheet.getLastRow(), 9);
    } catch(e2) {
      Logger.log('adEvent row error: ' + e2);
    }
  }
  return jsonResponse({ success: true, count: events.length });
}

// ============================================================================
// NEW — SECURITY ANALYTICS HANDLER
// Creates/appends to security_events sheet
// ============================================================================
function handleSecurityEvents(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const events = Array.isArray(data.events) ? data.events : [data];

  let sheet = ss.getSheetByName(NEW_SHEETS.SECURITY_EVENTS);
  if (!sheet) sheet = createSecurityEventsSheet();

  for (const ev of events) {
    try {
      sheet.appendRow([
        fmtTimestamp(),
        ev.type       || '',
        ev.target     || '',
        ev.targetClass|| '',
        ev.key        || '',
        ev.subjectId  || '',
        ev.detail     || '',
        ev.url        || '',
        ev.ua         || '',
        ev.timestamp  || '',
      ]);
      _styleDataRow(sheet, sheet.getLastRow(), 10);
    } catch(e2) {
      Logger.log('securityEvent row error: ' + e2);
    }
  }
  return jsonResponse({ success: true, count: events.length });
}

// ============================================================================
// NEW — CREATE NEW SHEETS ONLY (does NOT touch existing sheets)
// Run createNewSheets() manually from the Apps Script editor to set up.
// ============================================================================
function createNewSheets() {
  Logger.log('🆕 Creating NEW analytics sheets only (existing sheets untouched)...');
  createStudySessionsSheet();
  createAdEventsSheet();
  createSecurityEventsSheet();
  Logger.log('✅ New sheets created successfully!');
}

function createStudySessionsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(NEW_SHEETS.STUDY_SESSIONS);
  if (sheet) {
    Logger.log('ℹ️ study_sessions already exists — skipping creation');
    return sheet;
  }
  sheet = ss.insertSheet(NEW_SHEETS.STUDY_SESSIONS);
  const headers = [
    'logged_at', 'email', 'name', 'exam_type', 'subject_id',
    'subject_label', 'topic_name', 'start_iso', 'end_iso',
    'duration_sec', 'duration_min', 'date', 'hour_of_day'
  ];
  _setupSheet(sheet, headers);
  sheet.setTabColor('#065F46');
  Logger.log('📄 Created sheet: study_sessions');
  return sheet;
}

function createAdEventsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(NEW_SHEETS.AD_EVENTS);
  if (sheet) {
    Logger.log('ℹ️ ad_events already exists — skipping creation');
    return sheet;
  }
  sheet = ss.insertSheet(NEW_SHEETS.AD_EVENTS);
  const headers = [
    'logged_at', 'event_type', 'ad_type', 'ad_id',
    'exam_type', 'link', 'visible_ms', 'page_url', 'client_timestamp'
  ];
  _setupSheet(sheet, headers);
  sheet.setTabColor('#B45309');
  Logger.log('📄 Created sheet: ad_events');
  return sheet;
}

function createSecurityEventsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(NEW_SHEETS.SECURITY_EVENTS);
  if (sheet) {
    Logger.log('ℹ️ security_events already exists — skipping creation');
    return sheet;
  }
  sheet = ss.insertSheet(NEW_SHEETS.SECURITY_EVENTS);
  const headers = [
    'logged_at', 'event_type', 'target', 'target_class',
    'key_pressed', 'subject_id', 'detail', 'page_url', 'user_agent', 'client_timestamp'
  ];
  _setupSheet(sheet, headers);
  sheet.setTabColor('#9A3412');
  Logger.log('📄 Created sheet: security_events');
  return sheet;
}

// ============================================================================
// AUTO-CREATE USER IN user_xp IF NOT EXISTS (unchanged)
// ============================================================================
function ensureUserExists(email, name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP); }
  const data = sheet.getDataRange().getValues();
  const emailLower = email.toLowerCase().trim();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]?.toString().toLowerCase().trim() === emailLower) return;
  }
  const now = new Date();
  const today = getTodayStr();
  sheet.appendRow([email, name, 0, 1, 100, 0, 0, 0, 0, 0, 0, 0, 0, today, now]);
  Logger.log(`✅ New user created: ${email}`);
}

// ============================================================================
// CREATE ALL SHEETS (original — unchanged, only creates existing set)
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
      headers: ['date','rank','rank_display','email','name','xp_earned','level','quizzes']
    },
    {
      name: LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY,
      headers: ['week_start','week_end','rank','rank_display','email','name','xp_earned','level','quizzes']
    },
    {
      name: LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY,
      headers: ['month','rank','rank_display','email','name','xp_earned','level','quizzes']
    },
    {
      name: LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME,
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

  const msgSheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGE_MESSAGES);
  if (msgSheet) {
    const messages = [
      ['msg_001','friendly',     'Think you can beat me? 😊',                              true],
      ['msg_002','competitive',  "I'm coming for your spot on the leaderboard! 👑",         true],
      ['msg_003','funny',        "Prepare to lose... or maybe win? Let's play! 🎮",         true],
      ['msg_004','motivational', "Let's help each other improve! Best score wins! 💪",      true],
      ['msg_005','trash_talk',   "You're going down! Hope you've been studying 😤",          true],
      ['msg_006','rematch',      'Round 2? I want revenge! 🔥',                              true],
      ['msg_007','daily',        'Daily challenge time! Beat my score! 📅',                  true],
      ['msg_008','weekend',      'Weekend quiz battle! Winner buys lunch? 🍕',               true],
    ];
    msgSheet.getRange(2, 1, messages.length, 4).setValues(messages);
  }

  const subjSheet = ss.getSheetByName(LEADERBOARD_SHEETS.SUBJECTS);
  if (subjSheet) {
    const subjects = [
      ['mathematics','Mathematics','all',    '',       true,250,1],
      ['english',    'English',    'all',    '',       true,200,2],
      ['physics',    'Physics',    'all',    '',       true,150,3],
      ['chemistry',  'Chemistry',  'all',    '',       true, 80,4],
      ['biology',    'Biology',    'all',    '',       true, 60,5],
      ['economics',  'Economics',  'all',    '',       true,120,6],
      ['accounting', 'Accounting', 'jamb',   '',       true, 90,7],
      ['government', 'Government', 'all',    '',       true,100,8],
      ['literature', 'Literature', 'all',    '',       true, 45,9],
      ['geography',  'Geography',  'waec',   '',       true, 40,10],
      ['commerce',   'Commerce',   'waec',   '',       true, 35,11],
      ['gst_english','Use of English','gst', '',       true, 30,12],
      ['gst_logic',  'Logic & Thinking','gst','',      true, 25,13],
      ['gst_nigerian','Nigerian Studies','gst','',     true, 25,14],
    ];
    subjSheet.getRange(2, 1, subjects.length, 7).setValues(subjects);
  }

  Logger.log('✅ All original sheets created successfully!');
}

// ============================================================================
// XP FUNCTIONS — addXP now handles ALL xp sources (quiz, daily, topic, etc.)
// ============================================================================
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

function addXP(data) {
  // Support both 'amount' (from addXP action) and xpGained field
  const rawAmount = parseInt(data.amount || data.xpGained || data.xp_gained) || 0;
  const email     = data.email?.toLowerCase().trim();
  const name      = data.name;
  const reason    = data.reason || 'unknown';
  const amount    = rawAmount;

  Logger.log(`➕ addXP: ${email}, +${amount} (${reason})`);

  if (!email || amount <= 0) return jsonResponse({ success: false, error: 'Invalid email or amount' });

  const ss  = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP); }

  const rows = sheet.getDataRange().getValues();
  let userRow = null, userIdx = -1;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0]?.toString().toLowerCase().trim() === email) { userRow = rows[i]; userIdx = i; break; }
  }

  const today = getTodayStr();
  const now   = new Date();

  if (!userRow) {
    const newLevel = Math.floor(amount / 100) + 1;
    const xpToNext = newLevel * 100 - amount;
    sheet.appendRow([data.email, name, amount, newLevel, xpToNext, 1, amount, amount, 0, 0, 0, 1, 1, today, now]);
    Logger.log(`✅ New user row: ${email}`);
  } else {
    const oldXP   = parseFloat(userRow[2]) || 0;
    const newXP   = oldXP + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    const xpToNext = newLevel * 100 - newXP;
    const quizzes  = (parseFloat(userRow[5]) || 0) + (reason === 'quiz_complete' ? 1 : 0);
    sheet.getRange(userIdx + 1, 3).setValue(newXP);
    sheet.getRange(userIdx + 1, 4).setValue(newLevel);
    sheet.getRange(userIdx + 1, 5).setValue(xpToNext);
    sheet.getRange(userIdx + 1, 6).setValue(quizzes);
    sheet.getRange(userIdx + 1, 14).setValue(today);
    Logger.log(`✅ XP updated: ${email} ${oldXP} → ${newXP} (${reason})`);
  }

  // Always update ALL leaderboard tiers regardless of XP source
  updateDailyLeaderboard(data.email, name, amount);
  updateWeeklyLeaderboard(data.email, name, amount);
  updateMonthlyLeaderboard(data.email, name, amount);
  updateAllTimeLeaderboard(data.email, name, amount);

  return jsonResponse({ success: true });
}

// ============================================================================
// LEADERBOARD UPDATE FUNCTIONS (all unchanged from original)
// ============================================================================
function _getUserLevel(email, ss) {
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  if (!sheet) return 1;
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]?.toString().toLowerCase().trim() === email.toLowerCase().trim()) return data[i][3] || 1;
  }
  return 1;
}

function updateDailyLeaderboard(email, name, xpEarned) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const todayStr   = getTodayStr();
  const emailLower = email.toLowerCase().trim();
  const level      = _getUserLevel(email, ss);
  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_DAILY);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_DAILY); }
  const data = sheet.getDataRange().getValues();
  let foundIdx = -1;
  for (let i = 1; i < data.length; i++) {
    if (normalizeDateCell(data[i][0]) === todayStr && data[i][3]?.toString().toLowerCase().trim() === emailLower) {
      foundIdx = i; break;
    }
  }
  if (foundIdx !== -1) {
    const curXP  = parseFloat(data[foundIdx][5]) || 0;
    const curQzz = parseFloat(data[foundIdx][7]) || 0;
    sheet.getRange(foundIdx + 1, 6).setValue(curXP + xpEarned);
    sheet.getRange(foundIdx + 1, 7).setValue(level);
    sheet.getRange(foundIdx + 1, 8).setValue(curQzz + 1);
  } else {
    sheet.appendRow([todayStr, 0, '', email, name, xpEarned, level, 1]);
  }
  _reRankDailyRows(sheet, todayStr);
}

function updateWeeklyLeaderboard(email, name, xpEarned) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const weekStart  = getWeekStartStr();
  const emailLower = email.toLowerCase().trim();
  const level      = _getUserLevel(email, ss);
  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY); }
  const data = sheet.getDataRange().getValues();
  let foundIdx = -1;
  for (let i = 1; i < data.length; i++) {
    if (normalizeDateCell(data[i][0]) === weekStart && data[i][4]?.toString().toLowerCase().trim() === emailLower) {
      foundIdx = i; break;
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
  _reRankWeekRows(sheet, weekStart);
}

function updateMonthlyLeaderboard(email, name, xpEarned) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const monthStr   = getMonthStr();
  const emailLower = email.toLowerCase().trim();
  const level      = _getUserLevel(email, ss);
  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY); }
  const data = sheet.getDataRange().getValues();
  let foundIdx = -1;
  for (let i = 1; i < data.length; i++) {
    if (normalizeDateCellToMonth(data[i][0]) === monthStr && data[i][3]?.toString().toLowerCase().trim() === emailLower) {
      foundIdx = i; break;
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
}

function updateAllTimeLeaderboard(email, name, xpEarned) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const emailLower = email.toLowerCase().trim();
  let sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME);
  if (!sheet) { createAllSheets(); sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME); }
  const data = sheet.getDataRange().getValues();
  let foundIdx = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][2]?.toString().toLowerCase().trim() === emailLower) { foundIdx = i; break; }
  }
  if (foundIdx !== -1) {
    const curXP  = parseFloat(data[foundIdx][4]) || 0;
    const newXP  = curXP + xpEarned;
    const newLvl = Math.floor(newXP / 100) + 1;
    const curQzz = parseFloat(data[foundIdx][7]) || 0;
    sheet.getRange(foundIdx + 1, 5).setValue(newXP);
    sheet.getRange(foundIdx + 1, 6).setValue(newLvl);
    sheet.getRange(foundIdx + 1, 8).setValue(curQzz + 1);
  } else {
    const newLvl = Math.floor(xpEarned / 100) + 1;
    sheet.appendRow([0, '', email, name, xpEarned, newLvl, 0, 1]);
  }
  _reRankAllTimeRows(sheet);
}

// ============================================================================
// RANK HELPERS (unchanged)
// ============================================================================
function _reRankDailyRows(sheet, todayStr) {
  const allData = sheet.getDataRange().getValues();
  const idxs = [];
  for (let i = 1; i < allData.length; i++) {
    if (normalizeDateCell(allData[i][0]) === todayStr) idxs.push(i);
  }
  idxs.sort((a, b) => (parseFloat(allData[b][5]) || 0) - (parseFloat(allData[a][5]) || 0));
  for (let rank = 1; rank <= idxs.length; rank++) {
    const row = idxs[rank - 1] + 1;
    sheet.getRange(row, 2).setValue(rank);
    sheet.getRange(row, 3).setValue(formatRankDisplay(rank));
  }
}

function _reRankWeekRows(sheet, weekStart) {
  const allData = sheet.getDataRange().getValues();
  const idxs = [];
  for (let i = 1; i < allData.length; i++) {
    if (normalizeDateCell(allData[i][0]) === weekStart) idxs.push(i);
  }
  idxs.sort((a, b) => (parseFloat(allData[b][6]) || 0) - (parseFloat(allData[a][6]) || 0));
  for (let rank = 1; rank <= idxs.length; rank++) {
    const row = idxs[rank - 1] + 1;
    sheet.getRange(row, 3).setValue(rank);
    sheet.getRange(row, 4).setValue(formatRankDisplay(rank));
  }
}

function _reRankMonthRows(sheet, monthStr) {
  const allData = sheet.getDataRange().getValues();
  const idxs = [];
  for (let i = 1; i < allData.length; i++) {
    if (normalizeDateCellToMonth(allData[i][0]) === monthStr) idxs.push(i);
  }
  idxs.sort((a, b) => (parseFloat(allData[b][5]) || 0) - (parseFloat(allData[a][5]) || 0));
  for (let rank = 1; rank <= idxs.length; rank++) {
    const row = idxs[rank - 1] + 1;
    sheet.getRange(row, 2).setValue(rank);
    sheet.getRange(row, 3).setValue(formatRankDisplay(rank));
  }
}

function _reRankAllTimeRows(sheet) {
  const allData = sheet.getDataRange().getValues();
  const idxs = [];
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][2]) idxs.push(i);
  }
  idxs.sort((a, b) => (parseFloat(allData[b][4]) || 0) - (parseFloat(allData[a][4]) || 0));
  for (let rank = 1; rank <= idxs.length; rank++) {
    const row = idxs[rank - 1] + 1;
    sheet.getRange(row, 1).setValue(rank);
    sheet.getRange(row, 2).setValue(formatRankDisplay(rank));
  }
}

// ============================================================================
// CHALLENGE FUNCTIONS (unchanged from original)
// ============================================================================
function createChallenge(data) {
  Logger.log(`⚔️ Creating challenge: ${data.challenger_email} → ${data.opponent_email}`);
  const challenger_email = data.challenger_email?.toLowerCase().trim();
  const opponent_email   = data.opponent_email?.toLowerCase().trim();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let opponentExists    = false;
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

  let challengerRealName = data.challenger_name;
  const uxpSheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  if (uxpSheet) {
    const uxpData = uxpSheet.getDataRange().getValues();
    for (let i = 1; i < uxpData.length; i++) {
      if (uxpData[i][0]?.toString().toLowerCase().trim() === challenger_email) {
        challengerRealName = uxpData[i][1]; break;
      }
    }
  }
  if (!challengerRealName) {
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
    'pending',
    data.challenger_score  || null,
    data.challenger_correct || null,
    null, // opponent_score — filled when opponent plays
    null, // winner
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
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGES);
  if (!sheet) return jsonResponse({ success: false });
  const opponentEmailLower = data.opponent_email?.toLowerCase().trim();
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.challenge_id && rows[i][3]?.toString().toLowerCase().trim() === opponentEmailLower) {
      sheet.getRange(i + 1, 13).setValue('accepted'); break;
    }
  }
  return jsonResponse({ success: true });
}

function declineChallenge(data) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGES);
  if (!sheet) return jsonResponse({ success: false });
  const opponentEmailLower = data.opponent_email?.toLowerCase().trim();
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.challenge_id && rows[i][3]?.toString().toLowerCase().trim() === opponentEmailLower) {
      sheet.getRange(i + 1, 13).setValue('declined'); break;
    }
  }
  return jsonResponse({ success: true });
}

function submitChallengeScore(data) {
  const userEmail = data.email?.toLowerCase().trim();
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.CHALLENGES);
  if (!sheet) return jsonResponse({ success: false });
  const rows = sheet.getDataRange().getValues();
  let rowIdx = -1, challengerEmail = '', opponentEmail = '';
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.challenge_id) {
      rowIdx = i;
      challengerEmail = rows[i][1]?.toString().toLowerCase().trim();
      opponentEmail   = rows[i][3]?.toString().toLowerCase().trim();
      break;
    }
  }
  if (rowIdx === -1) return jsonResponse({ success: false, error: 'Challenge not found' });
  if (userEmail === challengerEmail)    sheet.getRange(rowIdx + 1, 14).setValue(data.score);
  else if (userEmail === opponentEmail) sheet.getRange(rowIdx + 1, 15).setValue(data.score);
  const updatedRow      = sheet.getRange(rowIdx + 1, 1, 1, 19).getValues()[0];
  const challengerScore = updatedRow[13];
  const opponentScore   = updatedRow[14];
  if (challengerScore !== null && challengerScore !== '' && opponentScore !== null && opponentScore !== '') {
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
// GET LEADERBOARD / GET USER RANK / GET AVAILABLE USERS (unchanged)
// ============================================================================
function getLeaderboard(e) {
  const type  = e.parameter.type  || 'alltime';
  const limit = parseInt(e.parameter.limit) || 50;
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet, headers, rows;
  switch (type) {
    case 'daily': {
      sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_DAILY);
      if (!sheet) break;
      const raw = sheet.getDataRange().getValues();
      headers   = raw[0];
      const todayStr = getTodayStr();
      rows = raw.slice(1).filter(r => normalizeDateCell(r[0]) === todayStr);
      rows.sort((a, b) => (b[5]||0) - (a[5]||0));
      for (let i = 0; i < rows.length; i++) { rows[i][1] = i+1; rows[i][2] = formatRankDisplay(i+1); }
      break;
    }
    case 'weekly': {
      sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY);
      if (!sheet) break;
      const raw = sheet.getDataRange().getValues();
      headers   = raw[0];
      const weekStart = getWeekStartStr();
      rows = raw.slice(1).filter(r => normalizeDateCell(r[0]) === weekStart);
      rows.sort((a, b) => (b[6]||0) - (a[6]||0));
      for (let i = 0; i < rows.length; i++) { rows[i][2] = i+1; rows[i][3] = formatRankDisplay(i+1); }
      break;
    }
    case 'monthly': {
      sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY);
      if (!sheet) break;
      const raw = sheet.getDataRange().getValues();
      headers   = raw[0];
      const monthStr = getMonthStr();
      rows = raw.slice(1).filter(r => normalizeDateCellToMonth(r[0]) === monthStr);
      rows.sort((a, b) => (b[5]||0) - (a[5]||0));
      for (let i = 0; i < rows.length; i++) { rows[i][1] = i+1; rows[i][2] = formatRankDisplay(i+1); }
      break;
    }
    default: {
      sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME);
      if (!sheet) break;
      const raw = sheet.getDataRange().getValues();
      headers   = raw[0];
      rows      = raw.slice(1);
      rows.sort((a, b) => (b[4]||0) - (a[4]||0));
      for (let i = 0; i < rows.length; i++) { rows[i][0] = i+1; rows[i][1] = formatRankDisplay(i+1); }
      break;
    }
  }
  if (!sheet || !rows || rows.length === 0) return jsonResponse([]);
  const results = rows.slice(0, limit).map(row => {
    const obj = {}; headers.forEach((h, i) => obj[h] = row[i]); return obj;
  });
  return jsonResponse(results);
}

function getUserRank(e) {
  const email = e.parameter.email?.toLowerCase().trim();
  const type  = e.parameter.type || 'alltime';
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let rank = 0;
  switch (type) {
    case 'daily': {
      const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_DAILY);
      if (sheet) {
        const rows     = sheet.getDataRange().getValues().slice(1);
        const today    = getTodayStr();
        const filtered = rows.filter(r => normalizeDateCell(r[0]) === today);
        filtered.sort((a, b) => (b[5]||0) - (a[5]||0));
        for (let i = 0; i < filtered.length; i++) {
          if (filtered[i][3]?.toString().toLowerCase().trim() === email) { rank = i+1; break; }
        }
      }
      break;
    }
    case 'weekly': {
      const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY);
      if (sheet) {
        const rows     = sheet.getDataRange().getValues().slice(1);
        const ws       = getWeekStartStr();
        const filtered = rows.filter(r => normalizeDateCell(r[0]) === ws);
        filtered.sort((a, b) => (b[6]||0) - (a[6]||0));
        for (let i = 0; i < filtered.length; i++) {
          if (filtered[i][4]?.toString().toLowerCase().trim() === email) { rank = i+1; break; }
        }
      }
      break;
    }
    case 'monthly': {
      const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY);
      if (sheet) {
        const rows     = sheet.getDataRange().getValues().slice(1);
        const ms       = getMonthStr();
        const filtered = rows.filter(r => normalizeDateCellToMonth(r[0]) === ms);
        filtered.sort((a, b) => (b[5]||0) - (a[5]||0));
        for (let i = 0; i < filtered.length; i++) {
          if (filtered[i][3]?.toString().toLowerCase().trim() === email) { rank = i+1; break; }
        }
      }
      break;
    }
    default: {
      const sheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME);
      if (sheet) {
        const rows = sheet.getDataRange().getValues().slice(1);
        rows.sort((a, b) => (b[4]||0) - (a[4]||0));
        for (let i = 0; i < rows.length; i++) {
          if (rows[i][2]?.toString().toLowerCase().trim() === email) { rank = i+1; break; }
        }
      }
      break;
    }
  }
  return jsonResponse({ rank, rank_display: rank > 0 ? formatRankDisplay(rank) : '—' });
}

function getAvailableUsers(e) {
  const currentEmail = e.parameter.current_email?.toLowerCase().trim();
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const users = [];
  const registerSheet = ss.getSheetByName('register') || ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
  if (!registerSheet) return jsonResponse(users);
  const data    = registerSheet.getDataRange().getValues();
  const headers = data[0].map(h => h?.toString().toLowerCase().trim());
  let emailCol = headers.findIndex(h => ['email','email address','e-mail','emailaddress'].includes(h));
  let nameCol  = headers.findIndex(h => ['name','fullname','full name','full_name','username','display name'].includes(h));
  if (emailCol === -1) emailCol = registerSheet.getName() === 'register' ? 1 : 0;
  if (nameCol  === -1) nameCol  = registerSheet.getName() === 'register' ? 0 : 1;
  for (let i = 1; i < data.length; i++) {
    const rowEmail = data[i][emailCol]?.toString().toLowerCase().trim();
    if (!rowEmail || rowEmail === currentEmail) continue;
    const rowName = data[i][nameCol]?.toString().trim() || rowEmail.split('@')[0];
    users.push({ email: data[i][emailCol].toString().trim(), name: rowName });
  }
  return jsonResponse(users);
}

// ============================================================================
// FULL SYSTEM RESET (unchanged)
// ============================================================================
function fullSystemReset() {
  Logger.log('🚀 ========== FULL SYSTEM RESET STARTED ==========');
  try {
    createAllSheets();
    const ss          = SpreadsheetApp.getActiveSpreadsheet();
    const userXpSheet = ss.getSheetByName(LEADERBOARD_SHEETS.USER_XP);
    if (!userXpSheet) { Logger.log('❌ user_xp not found'); return; }
    const userRows = userXpSheet.getDataRange().getValues().slice(1);
    Logger.log(`📊 Found ${userRows.length} users`);
    const todayStr  = getTodayStr();
    const weekStart = getWeekStartStr();
    const monthStr  = getMonthStr();
    const dailySheet   = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_DAILY);
    const weeklySheet  = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_WEEKLY);
    const monthlySheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_MONTHLY);
    const alltimeSheet = ss.getSheetByName(LEADERBOARD_SHEETS.LEADERBOARD_ALLTIME);
    const dailyEntries = [], weeklyEntries = [], monthlyEntries = [], alltimeEntries = [];
    for (const row of userRows) {
      const email = row[0]?.toString().trim(); const name = row[1]?.toString().trim();
      const totalXP = parseFloat(row[2]) || 0; const level = parseFloat(row[3]) || 1;
      const quizzesTaken = parseFloat(row[5]) || 0; const totalCorrect = parseFloat(row[6]) || 0;
      const totalQuests  = parseFloat(row[7]) || 1;
      const avgScore     = Math.round((totalCorrect / totalQuests) * 100);
      const lastActive   = row[13];
      if (!email || totalXP === 0) continue;
      let lastActiveStr = '';
      if (lastActive) {
        const d = lastActive instanceof Date ? lastActive : new Date(lastActive);
        if (!isNaN(d.getTime())) lastActiveStr = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().split('T')[0];
      }
      alltimeEntries.push({ email, name, totalXP, level, avgScore, quizzesTaken });
      if (lastActiveStr === todayStr) dailyEntries.push({ email, name, xp: totalXP, level, quizzes: quizzesTaken });
      if (lastActiveStr && lastActiveStr >= weekStart) weeklyEntries.push({ email, name, xp: totalXP, level, quizzes: quizzesTaken });
      if (lastActiveStr && lastActiveStr.substring(0,7) === monthStr) monthlyEntries.push({ email, name, xp: totalXP, level, quizzes: quizzesTaken });
    }
    dailyEntries.sort((a, b) => b.xp - a.xp);
    dailyEntries.forEach((u, i) => { const rank = i+1; dailySheet.appendRow([todayStr, rank, formatRankDisplay(rank), u.email, u.name, u.xp, u.level, u.quizzes]); });
    weeklyEntries.sort((a, b) => b.xp - a.xp);
    weeklyEntries.forEach((u, i) => { const rank = i+1; weeklySheet.appendRow([weekStart, weekStart, rank, formatRankDisplay(rank), u.email, u.name, u.xp, u.level, u.quizzes]); });
    monthlyEntries.sort((a, b) => b.xp - a.xp);
    monthlyEntries.forEach((u, i) => { const rank = i+1; monthlySheet.appendRow([monthStr, rank, formatRankDisplay(rank), u.email, u.name, u.xp, u.level, u.quizzes]); });
    alltimeEntries.sort((a, b) => b.totalXP - a.totalXP);
    alltimeEntries.forEach((u, i) => { const rank = i+1; alltimeSheet.appendRow([rank, formatRankDisplay(rank), u.email, u.name, u.totalXP, u.level, u.avgScore, u.quizzesTaken]); });
    Logger.log('✅ RESET COMPLETE');
  } catch (error) {
    Logger.log(`❌ ERROR: ${error.toString()}`); throw error;
  }
}

// ============================================================================
// SHEET STYLING HELPERS (unchanged)
// ============================================================================
function _setupSheet(sheet, headers) {
  const totalCols = headers.length;
  const headerRange = sheet.getRange(1, 1, 1, totalCols);
  headerRange.setValues([headers]);
  headerRange.setBackground(CONFIG.headerBg).setFontColor(CONFIG.headerFont)
    .setFontWeight("bold").setFontFamily(CONFIG.fontFamily).setFontSize(11)
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(1, 36);
  sheet.setColumnWidth(1, 50);
  sheet.setColumnWidth(2, 180);
  for (let c = 3; c <= totalCols; c++) sheet.setColumnWidth(c, 160);
  sheet.setFrozenRows(1);
  sheet.setTabColor("#1A1A2E");
}

function _styleDataRow(sheet, rowIndex, totalCols) {
  const bg = rowIndex % 2 === 0 ? CONFIG.altRowBg : "#FFFFFF";
  sheet.getRange(rowIndex, 1, 1, totalCols)
    .setBackground(bg).setFontFamily(CONFIG.fontFamily).setFontSize(10)
    .setFontColor("#222222").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(rowIndex, 28);
}

function _upsertChart(sheet, headers) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  const numericColIndex = _firstNumericColIndex(sheet, headers);
  if (numericColIndex === -1) return;
  sheet.getCharts().forEach(c => sheet.removeChart(c));
  const chart = sheet.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(sheet.getRange(2, 1, lastRow - 1, 1))
    .addRange(sheet.getRange(2, numericColIndex, lastRow - 1, 1))
    .setNumHeaders(0)
    .setOption("title", `${sheet.getName()} — ${headers[numericColIndex - 1]}`)
    .setOption("titleTextStyle", { fontSize: 13, bold: true, color: CONFIG.headerBg })
    .setOption("backgroundColor", { fill: "#FAFAFA" })
    .setOption("colors", ["#6C63FF"])
    .setOption("legend", { position: "none" })
    .setOption("chartArea", { left: 60, top: 50, width: "80%", height: "75%" })
    .setPosition(2, headers.length + 2, 0, 0)
    .setOption("width", 520).setOption("height", 300)
    .build();
  sheet.insertChart(chart);
}

function _firstNumericColIndex(sheet, headers) {
  if (sheet.getLastRow() < 2) return -1;
  for (let i = 0; i < headers.length; i++) {
    if (typeof sheet.getRange(2, i + 1).getValue() === "number") return i + 1;
  }
  return -1;
}
