// ============================================================================
// WAEC Data — Master index
//
// Structure:
//   waec/questions/<subject>.js         — question bank per subject
//   waec/learn/ss1/<subject>.js         — SS1 learn topics
//   waec/learn/ss2/<subject>.js         — SS2 learn topics
//   waec/learn/ss3/<subject>.js         — SS3 learn topics
//   waec/learn/index.js                 — merged WAEC_LEARN object
// ============================================================================

// Question banks
import { WAEC_ACCOUNTING } from './questions/accounting';
import { WAEC_BIOLOGY } from './questions/biology';
import { WAEC_CHEMISTRY } from './questions/chemistry';
import { WAEC_CIVIC } from './questions/civic';
import { WAEC_COMMERCE } from './questions/commerce';
import { WAEC_ECONOMICS } from './questions/economics';
import { WAEC_ENGLISH } from './questions/english';
import { WAEC_GEOGRAPHY } from './questions/geography';
import { WAEC_GOVERNMENT } from './questions/government';
import { WAEC_LITERATURE } from './questions/literature';
import { WAEC_MATHEMATICS } from './questions/mathematics';
import { WAEC_PHYSICS } from './questions/physics';

// Learn content (all SS levels merged)
import { WAEC_LEARN, WAEC_LEARN_BY_LEVEL } from './learn/index';

// Subject metadata (for UI display)
export const WAEC_SUBJECTS = [
  { id: 'english',     label: 'English Language',    icon: '📖', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'mathematics', label: 'Mathematics',          icon: '📐', color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 'physics',     label: 'Physics',              icon: '⚡', color: '#B45309', bg: '#FEF3C7' },
  { id: 'chemistry',   label: 'Chemistry',            icon: '⚗️', color: '#9A3412', bg: '#FEE2E2' },
  { id: 'biology',     label: 'Biology',              icon: '🔬', color: '#065F46', bg: '#DCFCE7' },
  { id: 'economics',   label: 'Economics',            icon: '📊', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'government',  label: 'Government',           icon: '🏛️', color: '#3F6212', bg: '#F7FEE7' },
  { id: 'literature',  label: 'Literature in English',icon: '📚', color: '#831843', bg: '#FCE7F3' },
  { id: 'accounting',  label: 'Financial Accounting', icon: '💰', color: '#064E3B', bg: '#ECFDF5' },
  { id: 'geography',   label: 'Geography',            icon: '🌍', color: '#0C4A6E', bg: '#E0F2FE' },
  { id: 'commerce',    label: 'Commerce',             icon: '🏪', color: '#0F766E', bg: '#CCFBF1' },
  { id: 'civic',       label: 'Civic Education',      icon: '🗳️', color: '#1D4ED8', bg: '#DBEAFE' },
];

// QB object keyed by subject ID
export const WAEC_QB = {
  accounting: WAEC_ACCOUNTING,
  biology: WAEC_BIOLOGY,
  chemistry: WAEC_CHEMISTRY,
  civic: WAEC_CIVIC,
  commerce: WAEC_COMMERCE,
  economics: WAEC_ECONOMICS,
  english: WAEC_ENGLISH,
  geography: WAEC_GEOGRAPHY,
  government: WAEC_GOVERNMENT,
  literature: WAEC_LITERATURE,
  mathematics: WAEC_MATHEMATICS,
  physics: WAEC_PHYSICS,
};

// Re-export learn objects
export { WAEC_LEARN, WAEC_LEARN_BY_LEVEL };

// Re-export individual QB arrays
export { WAEC_ACCOUNTING } from './questions/accounting';
export { WAEC_BIOLOGY } from './questions/biology';
export { WAEC_CHEMISTRY } from './questions/chemistry';
export { WAEC_CIVIC } from './questions/civic';
export { WAEC_COMMERCE } from './questions/commerce';
export { WAEC_ECONOMICS } from './questions/economics';
export { WAEC_ENGLISH } from './questions/english';
export { WAEC_GEOGRAPHY } from './questions/geography';
export { WAEC_GOVERNMENT } from './questions/government';
export { WAEC_LITERATURE } from './questions/literature';
export { WAEC_MATHEMATICS } from './questions/mathematics';
export { WAEC_PHYSICS } from './questions/physics';
