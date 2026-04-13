// src/data/flashcards.js
import { QB } from '../QB';
import { POST_UTME } from './postutme';

// Get flashcards for JAMB subjects
export const getFlashcardsForSubject = (subjectId) => {
  const questions = QB[subjectId] || [];
  
  return questions.map((q, idx) => ({
    id: `${subjectId}_${idx}`,
    term: q.q,
    definition: `${q.o[q.a]}\n\n💡 ${q.full || q.e}`,
    known: false,
    subject: subjectId,
    type: 'jamb'
  }));
};

// Get POST UTME flashcards for a specific university and subject
export const getPostUtmeFlashcardsForSubject = (university, subjectId) => {
  const uniData = POST_UTME[university?.toUpperCase()];
  if (!uniData || !uniData[subjectId]) return [];
  
  // Convert questions to flashcards (term = question, definition = answer + explanation)
  return uniData[subjectId].map((q, idx) => ({
    id: `${university}_${subjectId}_${idx}`,
    term: q.q,
    definition: `${q.o[q.a]}\n\n📚 ${q.full || q.e}`,
    known: false,
    subject: subjectId,
    university: university,
    year: q.yr,
    type: 'postutme'
  }));
};

// Get all flashcards for POST UTME (for potential future features)
export const getAllPostUtmeFlashcards = (university) => {
  const uniData = POST_UTME[university?.toUpperCase()];
  if (!uniData) return [];
  
  let allFlashcards = [];
  Object.keys(uniData).forEach(subjectId => {
    const flashcards = getPostUtmeFlashcardsForSubject(university, subjectId);
    allFlashcards = [...allFlashcards, ...flashcards];
  });
  return allFlashcards;
};
