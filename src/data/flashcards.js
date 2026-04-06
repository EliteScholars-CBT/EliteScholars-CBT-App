export const FLASHCARDS = {
  english: [
    {
      id: 1,
      term: "Noun",
      definition: "A word that names a person, place, thing, or idea. Examples: John, school, book, happiness.",
      example: "The **student** read her **book** at the **library**.",
      tip: "Ask yourself: Can I put 'a', 'an', or 'the' before it?"
    },
    {
      id: 2,
      term: "Verb",
      definition: "An action word or state of being. It tells what the subject does or is.",
      example: "She **runs** every morning. He **is** a teacher.",
      tip: "Ask yourself: Can I do this action?"
    },
    {
      id: 3,
      term: "Adjective",
      definition: "A word that describes a noun or pronoun. It tells which one, what kind, or how many.",
      example: "The **beautiful** flower is **red**.",
      tip: "Ask yourself: What kind? Which one? How many?"
    },
    {
      id: 4,
      term: "Adverb",
      definition: "A word that modifies a verb, adjective, or another adverb. It tells how, when, where, or to what extent.",
      example: "She sings **beautifully**. He arrived **late**.",
      tip: "Many adverbs end in '-ly'"
    }
  ],
  mathematics: [
    {
      id: 1,
      term: "Pythagorean Theorem",
      definition: "In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides.",
      example: "a² + b² = c², where c is the hypotenuse",
      tip: "Only works for right-angled triangles!"
    },
    {
      id: 2,
      term: "Quadratic Formula",
      definition: "Formula for finding solutions to quadratic equations ax² + bx + c = 0",
      example: "x = [-b ± √(b² - 4ac)] / 2a",
      tip: "Remember: 'All students take calculus' for sign convention"
    },
    {
      id: 3,
      term: "Mean (Average)",
      definition: "Sum of all values divided by the number of values",
      example: "Mean of 2,4,6 = (2+4+6)/3 = 4",
      tip: "Add them up, then divide by how many you have"
    }
  ],
  physics: [
    {
      id: 1,
      term: "Newton's First Law",
      definition: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
      example: "A book on a table stays there until someone moves it.",
      tip: "Also called the Law of Inertia"
    },
    {
      id: 2,
      term: "Ohm's Law",
      definition: "The current through a conductor is directly proportional to the voltage and inversely proportional to the resistance.",
      example: "V = IR (Voltage = Current × Resistance)",
      tip: "Remember: V = IR, I = V/R, R = V/I"
    },
    {
      id: 3,
      term: "Velocity",
      definition: "Speed with direction. It is a vector quantity.",
      example: "60 km/h north is velocity; 60 km/h is just speed.",
      tip: "Velocity changes if speed changes OR direction changes"
    }
  ],
  chemistry: [
    {
      id: 1,
      term: "Atom",
      definition: "The smallest unit of matter that retains the properties of an element.",
      example: "A gold atom is still gold.",
      tip: "Atoms are made of protons, neutrons, and electrons"
    },
    {
      id: 2,
      term: "Molecule",
      definition: "Two or more atoms bonded together.",
      example: "H₂O (water) is a molecule with 2 hydrogen and 1 oxygen atom.",
      tip: "Molecules can be same element (O₂) or different (H₂O)"
    },
    {
      id: 3,
      term: "pH Scale",
      definition: "Measure of how acidic or basic a solution is. Ranges from 0 to 14.",
      example: "pH 7 is neutral (water). Below 7 is acid. Above 7 is base.",
      tip: "Lower pH = stronger acid. Higher pH = stronger base."
    }
  ],
  biology: [
    {
      id: 1,
      term: "Cell",
      definition: "The basic structural and functional unit of all living organisms.",
      example: "Humans have billions of cells: skin cells, blood cells, nerve cells.",
      tip: "Cells are the 'building blocks of life'"
    },
    {
      id: 2,
      term: "Photosynthesis",
      definition: "Process by which plants make their own food using sunlight, water, and carbon dioxide.",
      example: "6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂",
      tip: "Plants produce oxygen during photosynthesis!"
    },
    {
      id: 3,
      term: "DNA",
      definition: "Deoxyribonucleic acid - the molecule that carries genetic information.",
      example: "DNA determines your eye color, hair type, and many other traits.",
      tip: "DNA looks like a twisted ladder (double helix)"
    }
  ],
  economics: [
    {
      id: 1,
      term: "Scarcity",
      definition: "Limited resources vs unlimited wants. The basic economic problem.",
      example: "Not enough oil, water, or time to do everything we want.",
      tip: "Scarcity forces us to make choices"
    },
    {
      id: 2,
      term: "Supply and Demand",
      definition: "Supply is how much is available. Demand is how much people want it.",
      example: "High demand + low supply = high prices. Low demand + high supply = low prices.",
      tip: "Prices help balance supply and demand"
    },
    {
      id: 3,
      term: "Opportunity Cost",
      definition: "The value of the next best alternative given up when making a choice.",
      example: "Choosing to study means giving up time with friends.",
      tip: "There's no free lunch - everything has a cost"
    }
  ],
  accounting: [
    {
      id: 1,
      term: "Assets",
      definition: "Resources owned by a business that have economic value.",
      example: "Cash, inventory, buildings, equipment, and accounts receivable.",
      tip: "Assets = What the business OWNS"
    },
    {
      id: 2,
      term: "Liabilities",
      definition: "Debts or obligations owed by a business to others.",
      example: "Bank loans, accounts payable, mortgages.",
      tip: "Liabilities = What the business OWES"
    },
    {
      id: 3,
      term: "Equity",
      definition: "The owner's claim on the business assets after liabilities are paid.",
      example: "Equity = Assets - Liabilities",
      tip: "Also called 'owner's equity' or 'capital'"
    }
  ],
  government: [
    {
      id: 1,
      term: "Democracy",
      definition: "A system of government where citizens vote to make decisions or elect representatives.",
      example: "Nigeria, USA, and UK are democratic countries.",
      tip: "Power comes from the people"
    },
    {
      id: 2,
      term: "Separation of Powers",
      definition: "Dividing government into branches to prevent any one branch from becoming too powerful.",
      example: "Executive (President), Legislative (Parliament), Judicial (Courts)",
      tip: "Each branch checks the others"
    }
  ],
  literature: [
    {
      id: 1,
      term: "Plot",
      definition: "The sequence of events that make up a story.",
      example: "Exposition → Rising Action → Climax → Falling Action → Resolution",
      tip: "Plot is WHAT happens in the story"
    },
    {
      id: 2,
      term: "Theme",
      definition: "The central message or idea of a literary work.",
      example: "Love, justice, coming of age, good vs evil",
      tip: "Theme is the deeper meaning, not just the story"
    }
  ]
};

// Default flashcards for subjects without custom ones
export const getFlashcardsForSubject = (subjectId) => {
  if (FLASHCARDS[subjectId]) {
    return FLASHCARDS[subjectId];
  }
  // Return default general flashcards
  return [
    {
      id: 1,
      term: "Study Tip",
      definition: "Review flashcards daily for better retention.",
      example: "Spend 10-15 minutes each day reviewing.",
      tip: "Consistency beats cramming!"
    },
    {
      id: 2,
      term: "Active Recall",
      definition: "Testing yourself instead of just re-reading.",
      example: "Cover the answer and try to remember it first.",
      tip: "This is one of the most effective study methods!"
    },
    {
      id: 3,
      term: "Spaced Repetition",
      definition: "Reviewing information at increasing intervals over time.",
      example: "Review today, tomorrow, then in 3 days, then in a week.",
      tip: "Helps move information to long-term memory"
    }
  ];
};
