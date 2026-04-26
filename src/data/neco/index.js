// ============================================================================
// NECO Data — Master index
//
// Structure:
//   neco/questions/<subject>.js  — question bank per subject
//   neco/learn/<subject>.js      — learn content per subject
// ============================================================================

// Question banks
import { NECO_QB_ENGLISH } from './questions/english';
import { NECO_QB_MATHEMATICS } from './questions/mathematics';
import { NECO_QB_PHYSICS } from './questions/physics';
import { NECO_QB_CHEMISTRY } from './questions/chemistry';
import { NECO_QB_BIOLOGY } from './questions/biology';
import { NECO_QB_ECONOMICS } from './questions/economics';
import { NECO_QB_GOVERNMENT } from './questions/government';
import { NECO_QB_LITERATURE } from './questions/literature';
import { NECO_QB_GEOGRAPHY } from './questions/geography';

// Learn content
import { NECO_LEARN_ENGLISH } from './learn/english';
import { NECO_LEARN_MATHEMATICS } from './learn/mathematics';

// Subject metadata
export const NECO_SUBJECTS = [
  { id: 'english',     label: 'English Language', icon: '📖', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'mathematics', label: 'Mathematics',       icon: '📐', color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 'physics',     label: 'Physics',           icon: '⚡', color: '#B45309', bg: '#FEF3C7' },
  { id: 'chemistry',   label: 'Chemistry',         icon: '⚗️', color: '#9A3412', bg: '#FEE2E2' },
  { id: 'biology',     label: 'Biology',           icon: '🔬', color: '#065F46', bg: '#DCFCE7' },
  { id: 'economics',   label: 'Economics',         icon: '📊', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'government',  label: 'Government',        icon: '🏛️', color: '#3F6212', bg: '#F7FEE7' },
  { id: 'literature',  label: 'Literature',        icon: '📚', color: '#831843', bg: '#FCE7F3' },
  { id: 'geography',   label: 'Geography',         icon: '🌍', color: '#0C4A6E', bg: '#E0F2FE' },
];

// QB object keyed by subject ID
export const NECO_QB = {
  english: NECO_QB_ENGLISH,
  mathematics: NECO_QB_MATHEMATICS,
  physics: NECO_QB_PHYSICS,
  chemistry: NECO_QB_CHEMISTRY,
  biology: NECO_QB_BIOLOGY,
  economics: NECO_QB_ECONOMICS,
  government: NECO_QB_GOVERNMENT,
  literature: NECO_QB_LITERATURE,
  geography: NECO_QB_GEOGRAPHY,
};

// Learn content keyed by subject ID
export const NECO_LEARN = {
  english: NECO_LEARN_ENGLISH,
  mathematics: NECO_LEARN_MATHEMATICS,
};
