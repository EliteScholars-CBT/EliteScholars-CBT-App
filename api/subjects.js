// ============================================================================
// api/subjects.js — GET /api/subjects?exam=jamb
// Returns subject list for the given exam type
// ============================================================================

import { ok, err, methodNotAllowed } from './_helpers/response.js';
import { SUBJECTS } from './data/subjects/index.js';

export default async function handler(req) {
  if (req.method === 'OPTIONS') return ok();
  if (req.method !== 'GET') return methodNotAllowed();

  const { searchParams } = new URL(req.url);
  const exam = searchParams.get('exam')?.toLowerCase();

  if (!exam) return err('exam parameter is required.');

  const subjects = SUBJECTS[exam];
  if (!subjects) return err(`Unknown exam type: ${exam}`);

  return ok({ subjects });
}

export const config = { runtime: 'edge' };