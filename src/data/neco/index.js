// ============================================================================
// NECO SUBJECT METADATA & DATA INDEX
// ============================================================================

export const NECO_SUBJECTS = [
  { id: 'english', label: 'English Language', icon: '📖', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'mathematics', label: 'Mathematics', icon: '📐', color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 'physics', label: 'Physics', icon: '⚡', color: '#B45309', bg: '#FEF3C7' },
  { id: 'chemistry', label: 'Chemistry', icon: '⚗️', color: '#9A3412', bg: '#FEE2E2' },
  { id: 'biology', label: 'Biology', icon: '🔬', color: '#065F46', bg: '#DCFCE7' },
  { id: 'economics', label: 'Economics', icon: '📊', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'government', label: 'Government', icon: '🏛️', color: '#3F6212', bg: '#F7FEE7' },
  { id: 'literature', label: 'Literature', icon: '📚', color: '#831843', bg: '#FCE7F3' },
  { id: 'geography', label: 'Geography', icon: '🌍', color: '#0C4A6E', bg: '#E0F2FE' },
];

// NECO shares the same question bank structure as WAEC
export const NECO_QB = {
  english: [
    {
      q: 'Which sentence is grammatically correct?',
      o: ['He go to school', 'He goes to school', 'He going to school', 'He gone to school'],
      a: 1,
      e: 'Third person singular present tense requires -s suffix on the verb.',
      h: 'Think about subject-verb agreement.',
      yr: '2023',
    },
    {
      q: 'The plural of "criterion" is:',
      o: ['criterions', 'criterias', 'criteria', 'criterium'],
      a: 2,
      e: 'Criterion is a Latin-origin word; its plural follows Latin rules: criteria.',
      h: 'Latin plurals often end in -a.',
      yr: '2022',
    },
    {
      q: 'A word that sounds like another but has a different meaning is called a:',
      o: ['Synonym', 'Antonym', 'Homophone', 'Homonym'],
      a: 2,
      e: 'A homophone sounds the same as another word but has different spelling/meaning (e.g., "bare" and "bear").',
      h: 'Think "homo" = same, "phone" = sound.',
      yr: '2023',
    },
    {
      q: 'Identify the passive voice: "The letter was written by Amaka."',
      o: ['Active', 'Passive', 'Imperative', 'Interrogative'],
      a: 1,
      e: 'Passive voice uses "was/were + past participle". The subject receives the action.',
      h: 'Who is performing the action?',
      yr: '2022',
    },
    {
      q: 'The literary device in "the angry sea" is:',
      o: ['Simile', 'Personification', 'Metaphor', 'Irony'],
      a: 1,
      e: 'Personification gives human qualities (anger) to non-human things (sea).',
      h: 'Can the sea really feel angry?',
      yr: '2021',
    },
  ],
  mathematics: [
    {
      q: 'Find the value of x in 2x + 5 = 17.',
      o: ['4', '5', '6', '7'],
      a: 2,
      e: '2x = 17 - 5 = 12, so x = 6.',
      h: 'Isolate x by subtracting 5 from both sides.',
      yr: '2023',
    },
    {
      q: 'Express 0.00452 in standard form.',
      o: ['4.52 × 10⁻³', '4.52 × 10⁻²', '45.2 × 10⁻⁴', '0.452 × 10⁻²'],
      a: 0,
      e: 'Move decimal right 3 places: 4.52 × 10⁻³.',
      h: 'The power of 10 equals the number of places you moved the decimal.',
      yr: '2022',
    },
    {
      q: 'A man travels 60 km in 1.5 hours. What is his speed?',
      o: ['40 km/h', '45 km/h', '50 km/h', '90 km/h'],
      a: 0,
      e: 'Speed = Distance ÷ Time = 60 ÷ 1.5 = 40 km/h.',
      h: 'Speed = Distance / Time.',
      yr: '2022',
    },
    {
      q: 'Simplify: (2³)²',
      o: ['12', '32', '64', '128'],
      a: 2,
      e: '(2³)² = 2^(3×2) = 2⁶ = 64.',
      h: 'Multiply the exponents when raising a power to a power.',
      yr: '2023',
    },
    {
      q: 'What is the LCM of 4, 6, and 8?',
      o: ['12', '16', '24', '48'],
      a: 2,
      e: 'LCM(4,6,8) = 24. 4=2², 6=2×3, 8=2³. LCM = 2³×3 = 24.',
      h: 'Use prime factorisation.',
      yr: '2021',
    },
  ],
  physics: [
    {
      q: 'What is the SI unit of electric current?',
      o: ['Volt', 'Watt', 'Ampere', 'Ohm'],
      a: 2,
      e: 'The SI unit of electric current is the Ampere (A).',
      h: 'Named after André-Marie Ampère.',
      yr: '2023',
    },
    {
      q: 'Which type of wave does not require a medium?',
      o: ['Sound', 'Water', 'Electromagnetic', 'Seismic'],
      a: 2,
      e: 'Electromagnetic waves (light, radio, X-rays) travel through vacuum without a medium.',
      h: 'Think about how sunlight reaches Earth.',
      yr: '2022',
    },
    {
      q: 'The formula for kinetic energy is:',
      o: ['KE = mgh', 'KE = ½mv²', 'KE = mv', 'KE = F×d'],
      a: 1,
      e: 'Kinetic energy = ½ × mass × velocity². KE = ½mv².',
      h: 'It involves velocity squared.',
      yr: '2023',
    },
    {
      q: 'A body is in equilibrium when the net force on it is:',
      o: ['Maximum', 'Minimum', 'Zero', 'Constant'],
      a: 2,
      e: 'For equilibrium, the vector sum of all forces acting on a body must be zero.',
      h: 'No net force means no acceleration.',
      yr: '2022',
    },
    {
      q: 'What phenomenon explains why a straw appears bent in water?',
      o: ['Reflection', 'Refraction', 'Diffraction', 'Dispersion'],
      a: 1,
      e: 'Refraction — light changes speed when passing from air to water, causing a bending effect.',
      h: 'Light changes direction at the interface.',
      yr: '2021',
    },
  ],
};

// NECO Learn content
export const NECO_LEARN = {
  english: [
    {
      topic: 'Parts of Speech',
      content:
        'English has eight parts of speech: Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, and Interjection. NECO frequently tests their identification and correct use in sentences.',
    },
    {
      topic: 'Comprehension',
      content:
        "Read the passage carefully before answering. Identify the main idea, supporting details, and the author's purpose. Vocabulary questions often test contextual meaning, not just dictionary definitions.",
    },
    {
      topic: 'Figures of Speech',
      content:
        'Key figures: Simile (uses like/as), Metaphor (direct comparison), Personification (human traits to objects), Hyperbole (exaggeration), Irony (says opposite of what is meant). NECO tests all of these.',
    },
    {
      topic: 'Tenses & Concord',
      content:
        'Subject-verb agreement (concord) is heavily tested. Singular subjects take singular verbs. Collective nouns can be singular or plural depending on context. Master all 12 tenses of English.',
    },
    {
      topic: 'Spelling & Vocabulary',
      content:
        'NECO tests commonly misspelled words and near-synonyms. Study word families, prefixes (un-, dis-, mis-) and suffixes (-tion, -ness, -ful) to expand your vocabulary systematically.',
    },
  ],
  mathematics: [
    {
      topic: 'Number & Numeration',
      content:
        'Covers prime numbers, fractions, decimals, percentages, ratios, and standard form (scientific notation). NECO consistently tests these foundational topics.',
    },
    {
      topic: 'Algebra',
      content:
        'Simplification, expansion, factorisation, solving linear and quadratic equations, and subject of formula. Remember: change the side, change the sign.',
    },
    {
      topic: 'Geometry',
      content:
        'Properties of triangles, quadrilaterals, circles. Angles (alternate, corresponding, co-interior). Locus problems. NECO often includes construction questions.',
    },
    {
      topic: 'Statistics & Probability',
      content:
        'Mean, median, mode, range. Reading bar charts, pie charts, and histograms. Probability = favourable outcomes ÷ total outcomes.',
    },
    {
      topic: 'Mensuration',
      content:
        'Area and perimeter of 2D shapes. Volume and surface area of 3D shapes. Learn all formulas: circle, cylinder, cone, sphere, prism.',
    },
  ],
};
