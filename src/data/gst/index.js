// ============================================================================
// GST (General Studies) Data — Master index
//
// Structure:
//   gst/questions/<subject>.js  — question bank per GST course
//   gst/learn/<subject>.js      — learn content per GST course
// ============================================================================

// Question banks
import { GST_QB_GST_ENGLISH } from './questions/gst_english';
import { GST_QB_GST_LOGIC } from './questions/gst_logic';
import { GST_QB_GST_NIGERIAN } from './questions/gst_nigerian';
import { GST_QB_GST_HISTORY } from './questions/gst_history';
import { GST_QB_GST_COMPUTE } from './questions/gst_compute';

// Learn content
import { GST_LEARN_GST_ENGLISH } from './learn/gst_english';
import { GST_LEARN_GST_LOGIC } from './learn/gst_logic';
import { GST_LEARN_GST_NIGERIAN } from './learn/gst_nigerian';
import { GST_LEARN_GST_HISTORY } from './learn/gst_history';
import { GST_LEARN_GST_COMPUTE } from './learn/gst_compute';

// Subject metadata
export const GST_SUBJECTS = [
  { id: 'gst_english', label: 'Use of English', icon: '📝', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'gst_logic', label: 'Logic & Critical Thinking', icon: '🧠', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'gst_nigerian', label: 'Nigerian Peoples & Culture', icon: '🇳🇬', color: '#065F46', bg: '#DCFCE7' },
  { id: 'gst_history', label: 'History & Philosophy of Science', icon: '🔭', color: '#B45309', bg: '#FEF3C7' },
  { id: 'gst_compute', label: 'Introduction to Computing', icon: '💻', color: '#1D4ED8', bg: '#DBEAFE' },
];

// QB object keyed by subject ID
export const GST_QB = {
  gst_english: GST_QB_GST_ENGLISH,
  gst_logic: GST_QB_GST_LOGIC,
  gst_nigerian: GST_QB_GST_NIGERIAN,
  gst_history: GST_QB_GST_HISTORY,
  gst_compute: GST_QB_GST_COMPUTE,
};

// Learn content keyed by subject ID
export const GST_LEARN = {
  gst_english: GST_LEARN_GST_ENGLISH,
  gst_logic: GST_LEARN_GST_LOGIC,
  gst_nigerian: GST_LEARN_GST_NIGERIAN,
  gst_history: GST_LEARN_GST_HISTORY,
  gst_compute: GST_LEARN_GST_COMPUTE,
};
