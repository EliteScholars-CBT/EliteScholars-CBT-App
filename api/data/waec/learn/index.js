// ============================================================================
// WAEC Learn Mode — Master index
// Topics organised by SS level but merged for the learn mode component
// ============================================================================

import { WAEC_ENGLISH_LEARN_SS1 } from './ss1/english';
import { WAEC_ENGLISH_LEARN_SS2 } from './ss2/english';
import { WAEC_ENGLISH_LEARN_SS3 } from './ss3/english';
import { WAEC_MATHEMATICS_LEARN_SS1 } from './ss1/mathematics';
import { WAEC_MATHEMATICS_LEARN_SS2 } from './ss2/mathematics';
import { WAEC_MATHEMATICS_LEARN_SS3 } from './ss3/mathematics';
import { WAEC_PHYSICS_LEARN_SS1 } from './ss1/physics';
import { WAEC_PHYSICS_LEARN_SS2 } from './ss2/physics';
import { WAEC_PHYSICS_LEARN_SS3 } from './ss3/physics';
import { WAEC_CHEMISTRY_LEARN_SS1 } from './ss1/chemistry';
import { WAEC_CHEMISTRY_LEARN_SS2 } from './ss2/chemistry';
import { WAEC_CHEMISTRY_LEARN_SS3 } from './ss3/chemistry';
import { WAEC_BIOLOGY_LEARN_SS1 } from './ss1/biology';
import { WAEC_BIOLOGY_LEARN_SS2 } from './ss2/biology';
import { WAEC_BIOLOGY_LEARN_SS3 } from './ss3/biology';
import { WAEC_ECONOMICS_LEARN_SS1 } from './ss1/economics';
import { WAEC_ECONOMICS_LEARN_SS2 } from './ss2/economics';
import { WAEC_ECONOMICS_LEARN_SS3 } from './ss3/economics';
import { WAEC_GOVERNMENT_LEARN_SS1 } from './ss1/government';
import { WAEC_GOVERNMENT_LEARN_SS2 } from './ss2/government';
import { WAEC_GOVERNMENT_LEARN_SS3 } from './ss3/government';
import { WAEC_LITERATURE_LEARN_SS1 } from './ss1/literature';
import { WAEC_LITERATURE_LEARN_SS2 } from './ss2/literature';
import { WAEC_LITERATURE_LEARN_SS3 } from './ss3/literature';
import { WAEC_ACCOUNTING_LEARN_SS1 } from './ss1/accounting';
import { WAEC_ACCOUNTING_LEARN_SS2 } from './ss2/accounting';
import { WAEC_ACCOUNTING_LEARN_SS3 } from './ss3/accounting';
import { WAEC_GEOGRAPHY_LEARN_SS1 } from './ss1/geography';
import { WAEC_GEOGRAPHY_LEARN_SS2 } from './ss2/geography';
import { WAEC_GEOGRAPHY_LEARN_SS3 } from './ss3/geography';
import { WAEC_COMMERCE_LEARN_SS1 } from './ss1/commerce';
import { WAEC_COMMERCE_LEARN_SS2 } from './ss2/commerce';
import { WAEC_COMMERCE_LEARN_SS3 } from './ss3/commerce';
import { WAEC_CIVIC_LEARN_SS1 } from './ss1/civic';
import { WAEC_CIVIC_LEARN_SS2 } from './ss2/civic';
import { WAEC_CIVIC_LEARN_SS3 } from './ss3/civic';

// Merged learn content keyed by subject ID
export const WAEC_LEARN = {
  english: [...WAEC_ENGLISH_LEARN_SS1, ...WAEC_ENGLISH_LEARN_SS2, ...WAEC_ENGLISH_LEARN_SS3],
  mathematics: [...WAEC_MATHEMATICS_LEARN_SS1, ...WAEC_MATHEMATICS_LEARN_SS2, ...WAEC_MATHEMATICS_LEARN_SS3],
  physics: [...WAEC_PHYSICS_LEARN_SS1, ...WAEC_PHYSICS_LEARN_SS2, ...WAEC_PHYSICS_LEARN_SS3],
  chemistry: [...WAEC_CHEMISTRY_LEARN_SS1, ...WAEC_CHEMISTRY_LEARN_SS2, ...WAEC_CHEMISTRY_LEARN_SS3],
  biology: [...WAEC_BIOLOGY_LEARN_SS1, ...WAEC_BIOLOGY_LEARN_SS2, ...WAEC_BIOLOGY_LEARN_SS3],
  economics: [...WAEC_ECONOMICS_LEARN_SS1, ...WAEC_ECONOMICS_LEARN_SS2, ...WAEC_ECONOMICS_LEARN_SS3],
  government: [...WAEC_GOVERNMENT_LEARN_SS1, ...WAEC_GOVERNMENT_LEARN_SS2, ...WAEC_GOVERNMENT_LEARN_SS3],
  literature: [...WAEC_LITERATURE_LEARN_SS1, ...WAEC_LITERATURE_LEARN_SS2, ...WAEC_LITERATURE_LEARN_SS3],
  accounting: [...WAEC_ACCOUNTING_LEARN_SS1, ...WAEC_ACCOUNTING_LEARN_SS2, ...WAEC_ACCOUNTING_LEARN_SS3],
  geography: [...WAEC_GEOGRAPHY_LEARN_SS1, ...WAEC_GEOGRAPHY_LEARN_SS2, ...WAEC_GEOGRAPHY_LEARN_SS3],
  commerce: [...WAEC_COMMERCE_LEARN_SS1, ...WAEC_COMMERCE_LEARN_SS2, ...WAEC_COMMERCE_LEARN_SS3],
  civic: [...WAEC_CIVIC_LEARN_SS1, ...WAEC_CIVIC_LEARN_SS2, ...WAEC_CIVIC_LEARN_SS3],
};

// Per-level access (for future SS-level filtering)
export const WAEC_LEARN_BY_LEVEL = {
  ss1: { english: WAEC_ENGLISH_LEARN_SS1, mathematics: WAEC_MATHEMATICS_LEARN_SS1, physics: WAEC_PHYSICS_LEARN_SS1, chemistry: WAEC_CHEMISTRY_LEARN_SS1, biology: WAEC_BIOLOGY_LEARN_SS1, economics: WAEC_ECONOMICS_LEARN_SS1, government: WAEC_GOVERNMENT_LEARN_SS1, literature: WAEC_LITERATURE_LEARN_SS1, accounting: WAEC_ACCOUNTING_LEARN_SS1, geography: WAEC_GEOGRAPHY_LEARN_SS1, commerce: WAEC_COMMERCE_LEARN_SS1, civic: WAEC_CIVIC_LEARN_SS1 },
  ss2: { english: WAEC_ENGLISH_LEARN_SS2, mathematics: WAEC_MATHEMATICS_LEARN_SS2, physics: WAEC_PHYSICS_LEARN_SS2, chemistry: WAEC_CHEMISTRY_LEARN_SS2, biology: WAEC_BIOLOGY_LEARN_SS2, economics: WAEC_ECONOMICS_LEARN_SS2, government: WAEC_GOVERNMENT_LEARN_SS2, literature: WAEC_LITERATURE_LEARN_SS2, accounting: WAEC_ACCOUNTING_LEARN_SS2, geography: WAEC_GEOGRAPHY_LEARN_SS2, commerce: WAEC_COMMERCE_LEARN_SS2, civic: WAEC_CIVIC_LEARN_SS2 },
  ss3: { english: WAEC_ENGLISH_LEARN_SS3, mathematics: WAEC_MATHEMATICS_LEARN_SS3, physics: WAEC_PHYSICS_LEARN_SS3, chemistry: WAEC_CHEMISTRY_LEARN_SS3, biology: WAEC_BIOLOGY_LEARN_SS3, economics: WAEC_ECONOMICS_LEARN_SS3, government: WAEC_GOVERNMENT_LEARN_SS3, literature: WAEC_LITERATURE_LEARN_SS3, accounting: WAEC_ACCOUNTING_LEARN_SS3, geography: WAEC_GEOGRAPHY_LEARN_SS3, commerce: WAEC_COMMERCE_LEARN_SS3, civic: WAEC_CIVIC_LEARN_SS3 },
};
