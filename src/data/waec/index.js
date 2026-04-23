import { WAEC_ENGLISH, WAEC_ENGLISH_LEARN } from './english';
import { WAEC_MATHEMATICS, WAEC_MATHEMATICS_LEARN } from './mathematics';
import { WAEC_PHYSICS, WAEC_PHYSICS_LEARN } from './physics';
import { WAEC_CHEMISTRY, WAEC_CHEMISTRY_LEARN } from './chemistry';
import { WAEC_BIOLOGY, WAEC_BIOLOGY_LEARN } from './biology';
import { WAEC_ECONOMICS, WAEC_ECONOMICS_LEARN } from './economics';
import { WAEC_ACCOUNTING, WAEC_ACCOUNTING_LEARN } from './accounting';
import { WAEC_GOVERNMENT, WAEC_GOVERNMENT_LEARN } from './government';
import { WAEC_LITERATURE, WAEC_LITERATURE_LEARN } from './literature';
import { WAEC_GEOGRAPHY, WAEC_GEOGRAPHY_LEARN } from './geography';
import { WAEC_COMMERCE, WAEC_COMMERCE_LEARN } from './commerce';
import { WAEC_CIVIC, WAEC_CIVIC_LEARN } from './civic';

// Question banks — keyed by subject id
export const WAEC_QB = {
  english:     WAEC_ENGLISH,
  mathematics: WAEC_MATHEMATICS,
  physics:     WAEC_PHYSICS,
  chemistry:   WAEC_CHEMISTRY,
  biology:     WAEC_BIOLOGY,
  economics:   WAEC_ECONOMICS,
  accounting:  WAEC_ACCOUNTING,
  government:  WAEC_GOVERNMENT,
  literature:  WAEC_LITERATURE,
  geography:   WAEC_GEOGRAPHY,
  commerce:    WAEC_COMMERCE,
  civic:       WAEC_CIVIC,
};

// Learn mode content — keyed by subject id
export const WAEC_LEARN = {
  english:     WAEC_ENGLISH_LEARN,
  mathematics: WAEC_MATHEMATICS_LEARN,
  physics:     WAEC_PHYSICS_LEARN,
  chemistry:   WAEC_CHEMISTRY_LEARN,
  biology:     WAEC_BIOLOGY_LEARN,
  economics:   WAEC_ECONOMICS_LEARN,
  accounting:  WAEC_ACCOUNTING_LEARN,
  government:  WAEC_GOVERNMENT_LEARN,
  literature:  WAEC_LITERATURE_LEARN,
  geography:   WAEC_GEOGRAPHY_LEARN,
  commerce:    WAEC_COMMERCE_LEARN,
  civic:       WAEC_CIVIC_LEARN,
};

// Subject metadata
export const WAEC_SUBJECTS = [
  { id: 'english',     label: 'English Language', icon: '📖', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'mathematics', label: 'Mathematics',       icon: '📐', color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 'physics',     label: 'Physics',           icon: '⚡', color: '#B45309', bg: '#FEF3C7' },
  { id: 'chemistry',   label: 'Chemistry',         icon: '⚗️', color: '#9A3412', bg: '#FEE2E2' },
  { id: 'biology',     label: 'Biology',           icon: '🔬', color: '#065F46', bg: '#DCFCE7' },
  { id: 'economics',   label: 'Economics',         icon: '📊', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'accounting',  label: 'Accounting',        icon: '💰', color: '#0F766E', bg: '#CCFBF1' },
  { id: 'government',  label: 'Government',        icon: '🏛️', color: '#3F6212', bg: '#F7FEE7' },
  { id: 'literature',  label: 'Literature',        icon: '📚', color: '#831843', bg: '#FCE7F3' },
  { id: 'geography',   label: 'Geography',         icon: '🌍', color: '#0C4A6E', bg: '#E0F2FE' },
  { id: 'commerce',    label: 'Commerce',          icon: '🛒', color: '#92400E', bg: '#FEF3C7' },
  { id: 'civic',       label: 'Civic Education',   icon: '⚖️', color: '#1E3A5F', bg: '#DBEAFE' },
];
