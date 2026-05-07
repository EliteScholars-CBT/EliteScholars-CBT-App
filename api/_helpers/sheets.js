// ============================================================================
// api/_helpers/sheets.js — Apps Script communication helper
// ============================================================================

const SHEETS_URL = process.env.SHEETS_URL;

export async function sheetsGet(params) {
  alert('got to sheets.js ' + SHEETS_URL)
  const url = `${SHEETS_URL}?${new URLSearchParams(params)}`;
  const res  = await fetch(url);
  return res.json();
}

export async function sheetsPost(body) {
  await fetch(SHEETS_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
}