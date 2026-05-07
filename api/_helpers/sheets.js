// ============================================================================
// api/_helpers/sheets.js — Apps Script communication helper
// ============================================================================

// const SHEETS_URL = process.env.SHEETS_URL;

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxmY2qZ-5zexeOLdZba1U6k3Sl7czKLzC0PjW4jP1FSO4P_mMkSWN4fUmmCBPjt09YU/exec';

export async function sheetsGet(params) {
  const url = `${SHEETS_URL}?${new URLSearchParams(params)}`;
  const res = await fetch(url);

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function sheetsPost(body) {
  await fetch(SHEETS_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
}