// ============================================================================
// GST (General Studies) — University Level
// ============================================================================

export const GST_SUBJECTS = [
  { id: 'gst_english', label: 'Use of English', icon: '📝', color: '#0369A1', bg: '#E0F2FE' },
  {
    id: 'gst_logic',
    label: 'Logic & Critical Thinking',
    icon: '🧠',
    color: '#7C3AED',
    bg: '#EDE9FE',
  },
  {
    id: 'gst_nigerian',
    label: 'Nigerian Peoples & Culture',
    icon: '🇳🇬',
    color: '#065F46',
    bg: '#DCFCE7',
  },
  {
    id: 'gst_history',
    label: 'History & Philosophy of Sci',
    icon: '🔭',
    color: '#B45309',
    bg: '#FEF3C7',
  },
  {
    id: 'gst_compute',
    label: 'Introduction to Computing',
    icon: '💻',
    color: '#1D4ED8',
    bg: '#DBEAFE',
  },
];

export const GST_QB = {
  gst_english: [
    {
      q: 'The word "ubiquitous" means:',
      o: ['Rare', 'Present everywhere', 'Ancient', 'Transparent'],
      a: 1,
      e: 'Ubiquitous means seeming to appear everywhere at the same time.',
      h: 'Think "everywhere simultaneously".',
      yr: '2023',
    },
    {
      q: 'Which sentence uses the semicolon correctly?',
      o: [
        'I am tired; but happy',
        'I am tired; to sleep',
        'I am tired; I need rest',
        'I; am tired',
      ],
      a: 2,
      e: 'A semicolon joins two independent clauses. "I am tired" and "I need rest" are both independent clauses.',
      h: 'Both sides of a semicolon must be complete thoughts.',
      yr: '2022',
    },
    {
      q: 'A "thesis statement" in an essay is:',
      o: [
        'The conclusion',
        'The topic of a paragraph',
        'The central argument of the essay',
        'A quotation from an author',
      ],
      a: 2,
      e: 'A thesis statement clearly states the main argument or position of the essay.',
      h: 'It tells the reader what to expect.',
      yr: '2023',
    },
    {
      q: 'Plagiarism means:',
      o: [
        'Writing original work',
        "Using someone's ideas without attribution",
        'Citing sources correctly',
        'Paraphrasing with credit',
      ],
      a: 1,
      e: "Plagiarism is presenting another person's work as your own without acknowledgement.",
      h: 'Academic dishonesty.',
      yr: '2022',
    },
    {
      q: 'An "abstract" in an academic paper is:',
      o: [
        'The conclusion',
        'A brief summary of the entire paper',
        'The introduction only',
        'The reference list',
      ],
      a: 1,
      e: 'An abstract is a concise summary (usually 150–300 words) of the entire research paper.',
      h: 'It appears at the beginning but summarises everything.',
      yr: '2021',
    },
  ],
  gst_logic: [
    {
      q: 'A deductive argument moves from:',
      o: ['Specific to general', 'General to specific', 'Opinion to fact', 'Data to hypothesis'],
      a: 1,
      e: 'Deductive reasoning starts with general premises and draws specific conclusions.',
      h: 'All men are mortal → Socrates is a man → Socrates is mortal.',
      yr: '2023',
    },
    {
      q: 'Ad hominem is a fallacy that attacks the:',
      o: ['Argument', 'Evidence', 'Person making the argument', 'Conclusion'],
      a: 2,
      e: 'Ad hominem means "to the person" — it attacks the speaker rather than the argument itself.',
      h: 'Personal attack instead of addressing the argument.',
      yr: '2022',
    },
    {
      q: '"If it rains, the ground gets wet. The ground is wet, therefore it rained." This is an example of:',
      o: [
        'Valid deduction',
        'Affirming the consequent (fallacy)',
        'Inductive reasoning',
        'Analogy',
      ],
      a: 1,
      e: 'This is the fallacy of affirming the consequent. The ground could be wet for other reasons.',
      h: 'The conclusion does not necessarily follow.',
      yr: '2023',
    },
    {
      q: 'An argument is "valid" when:',
      o: [
        'The premises are true',
        'The conclusion is true',
        'If the premises are true, the conclusion must be true',
        'The language is clear',
      ],
      a: 2,
      e: 'Validity is about the logical structure, not truth of premises. A valid argument means the conclusion follows necessarily from the premises.',
      h: 'Validity ≠ truth.',
      yr: '2022',
    },
    {
      q: 'Which of these is an example of an inductive argument?',
      o: [
        'All mammals breathe air. Dolphins are mammals. Dolphins breathe air.',
        'The sun rose yesterday and today, so it will rise tomorrow.',
        'If P then Q. P. Therefore Q.',
        'All bachelors are unmarried.',
      ],
      a: 1,
      e: 'Inductive arguments move from specific observations to general conclusions. The sun example is inductive — it generalises from past events.',
      h: 'Inductive = observing patterns to predict.',
      yr: '2021',
    },
  ],
  gst_nigerian: [
    {
      q: 'Nigeria became a republic in:',
      o: ['1960', '1963', '1966', '1979'],
      a: 1,
      e: 'Nigeria gained independence in 1960 and became a republic on October 1, 1963.',
      h: 'Three years after independence.',
      yr: '2023',
    },
    {
      q: 'The largest ethnic group in Northern Nigeria is:',
      o: ['Yoruba', 'Igbo', 'Hausa-Fulani', 'Tiv'],
      a: 2,
      e: 'The Hausa-Fulani constitute the largest ethnic group in Northern Nigeria.',
      h: 'North Nigeria.',
      yr: '2022',
    },
    {
      q: 'The official language of Nigeria is:',
      o: ['Hausa', 'Yoruba', 'Igbo', 'English'],
      a: 3,
      e: "English is Nigeria's official language, inherited from British colonial rule.",
      h: 'Colonial legacy.',
      yr: '2023',
    },
    {
      q: 'The Nigerian Civil War lasted from:',
      o: ['1964–1967', '1967–1970', '1970–1975', '1960–1963'],
      a: 1,
      e: 'The Nigerian Civil War (Biafra War) was fought from July 1967 to January 1970.',
      h: 'Biafra secession attempt.',
      yr: '2022',
    },
    {
      q: "Nigeria's federal capital territory is:",
      o: ['Lagos', 'Ibadan', 'Abuja', 'Kano'],
      a: 2,
      e: "Abuja became Nigeria's federal capital in December 1991, replacing Lagos.",
      h: 'Centrally located capital.',
      yr: '2021',
    },
  ],
};

export const GST_LEARN = {
  gst_english: [
    {
      topic: 'Academic Writing',
      content:
        'Academic writing requires formal language, clear structure, and evidence-based arguments. Every essay needs: Introduction (with thesis), Body (with topic sentences), and Conclusion (summarising key points). Avoid contractions and colloquial language.',
    },
    {
      topic: 'Research Skills',
      content:
        'A research paper begins with a research question. Primary sources include original data, interviews, and experiments. Secondary sources include books, journals, and articles. Always cite your sources using the required format (APA, MLA, or Chicago).',
    },
    {
      topic: 'Referencing & Citation',
      content:
        "APA format: Author, A. A. (Year). Title of work. Publisher. In-text citation: (Smith, 2020). Plagiarism — using others' work without credit — is a serious academic offence with consequences including expulsion.",
    },
    {
      topic: 'Oral Communication',
      content:
        'Effective speaking requires clarity, appropriate tone, and audience awareness. In formal presentations: maintain eye contact, speak clearly, use structured points, and manage your time. Listen actively when others speak.',
    },
    {
      topic: 'Critical Reading',
      content:
        "When reading critically: identify the author's purpose, evaluate the evidence, detect bias, and consider alternative perspectives. Ask: Is this evidence reliable? What assumptions does the author make? Is the conclusion justified?",
    },
  ],
  gst_logic: [
    {
      topic: 'Types of Arguments',
      content:
        'Deductive arguments guarantee their conclusions if premises are true (e.g., syllogisms). Inductive arguments support their conclusions with probability but not certainty. Abductive arguments choose the most likely explanation.',
    },
    {
      topic: 'Logical Fallacies',
      content:
        'Common fallacies: Ad hominem (attacking the person), Straw man (misrepresenting the argument), False dilemma (only two options when more exist), Slippery slope (one event inevitably causes extreme consequences), and Appeal to authority.',
    },
    {
      topic: 'Critical Thinking',
      content:
        'Critical thinking involves: identifying assumptions, evaluating evidence, recognising bias, considering multiple perspectives, and drawing reasoned conclusions. It is the cornerstone of academic and professional success.',
    },
    {
      topic: 'Validity & Soundness',
      content:
        'An argument is valid if the conclusion follows logically from the premises. It is sound if it is valid AND all premises are true. You can have a valid argument with false premises. Soundness requires both validity and truth.',
    },
    {
      topic: 'Propositions & Logic',
      content:
        'A proposition is a statement that is either true or false. "P → Q" means "if P then Q". Contrapositive: "not Q → not P" (always equivalent). Converse: "Q → P" (not always equivalent). These distinctions are tested in GST exams.',
    },
  ],
};
