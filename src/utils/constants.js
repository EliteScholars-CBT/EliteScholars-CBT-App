// ============================================================================
// CONFIGURATION - EDIT THESE VALUES
// ============================================================================

export const ROUND_SIZE = 20;
export const SHARE_GATE_EVERY = 4;
export const SHOW_ADS = true;
export const SHOW_POPOVER_AD = true;
export const POPOVER_AD_SCRIPT = "https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469.js";
export const POPOVER_AD_URL = "https://fixesconsessionconsession.com/63/ce/c2/63cec2ed9aad27f090a8f39c2b6d7469";

// ============================================================================
// CONSTANTS & LINKS
// ============================================================================

export const WA_GROUP = 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t';
export const WA_CHANNEL = 'https://whatsapp.com/channel/0029Vb6wPv72kNFnjr4FMr24';
export const APP_URL = 'https://elitescholars.site';
export const SHEETS_URL = 'https://script.google.com/macros/s/AKfycby59br8odWXDWQLkomFieaU-2aq_4wb5FiwzTiHkFgqztm0HqU5RShooJLeUANpF8sI/exec';

// ============================================================================
// TIMER FUNCTION
// ============================================================================

export function getTimerSecs(subjectId, questionCount) {
  const calcSubjects = ['mathematics', 'physics', 'chemistry'];
  const secsPerQ = calcSubjects.includes(subjectId) ? 25 : 16;
  return questionCount * secsPerQ;
}

// ============================================================================
// SHARE MESSAGE
// ============================================================================

export const shareMsg = (name, subject, correct, totalQ) =>
  `${name} just scored ${correct}/${totalQ} in ${subject} on EliteScholars CBT! 🔥\n\nI'm practising for JAMB free at ${APP_URL} — come try it!`;
