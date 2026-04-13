// src/data/postutme/index.js
import { UNILAG } from './unilag';
import { LASU } from './lasu';
import { UNN } from './unn';
import { UNIBEN } from './uniben';
import { ABU } from './abu';
import { BUK } from './buk';
import { FUNAAB } from './funaab';
import { LAUTECH } from './lautech';
import { UNICAL } from './unical';
import { UNILORIN } from './unilorin';
import { UNIUYO } from './uniuyo';

// Available universities with question banks
export const POST_UTME = {
  UNILAG,
  LASU,
  UNN,
  UNIBEN,
  ABU,
  BUK,
  FUNAAB,
  LAUTECH,
  UNICAL,
  UNILORIN,
  UNIUYO,
};

// Helper function to get questions by university and subject
export const getPostUtmeQuestions = (university, subject) => {
  const uniData = POST_UTME[university?.toUpperCase()];
  if (!uniData) return [];
  return uniData[subject] || [];
};

// Helper to check if university has questions
export const hasUniversityQuestions = (university) => {
  return !!POST_UTME[university?.toUpperCase()];
};

// List of available universities
export const AVAILABLE_UNIVERSITIES_LIST = Object.keys(POST_UTME);
