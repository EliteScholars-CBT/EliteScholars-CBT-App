// ============================================================================
// JAMB Question Bank — Unified index
// Each subject is a separate file for fast lazy loading
// ============================================================================

export { QB_ACCOUNTING  as accounting  } from './accounting';
export { QB_ECONOMICS   as economics   } from './economics';
export { QB_ENGLISH     as english     } from './english';
export { QB_BIOLOGY     as biology     } from './biology';
export { QB_CHEMISTRY   as chemistry   } from './chemistry';
export { QB_MATHEMATICS as mathematics } from './mathematics';
export { QB_PHYSICS     as physics     } from './physics';
export { QB_GOVERNMENT  as government  } from './government';
export { QB_LITERATURE  as literature  } from './literature';
export { QB_NOVEL       as novel       } from './novel';

// Re-export as QB object for backward compatibility with Quiz.js
import { QB_ACCOUNTING  } from './accounting';
import { QB_ECONOMICS   } from './economics';
import { QB_ENGLISH     } from './english';
import { QB_BIOLOGY     } from './biology';
import { QB_CHEMISTRY   } from './chemistry';
import { QB_MATHEMATICS } from './mathematics';
import { QB_PHYSICS     } from './physics';
import { QB_GOVERNMENT  } from './government';
import { QB_LITERATURE  } from './literature';
import { QB_NOVEL       } from './novel';

export const QB = {
  accounting:  QB_ACCOUNTING,
  economics:   QB_ECONOMICS,
  english:     QB_ENGLISH,
  biology:     QB_BIOLOGY,
  chemistry:   QB_CHEMISTRY,
  mathematics: QB_MATHEMATICS,
  physics:     QB_PHYSICS,
  government:  QB_GOVERNMENT,
  literature:  QB_LITERATURE,
  novel:       QB_NOVEL,
};
