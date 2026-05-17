// ============================================================================
// HISTORY AND PHILOSOPHY OF SCIENCE — COMPLETE LEARNING MODULE (10 TOPICS)
// Based on CCMAS (Core Curriculum and Minimum Academic Standards)
// GST 114 / PHIL 102
// ============================================================================

export const GST_LEARN_GST_HISTORY = [
  // ==========================================================================
  // TOPIC 1: Introduction to History and Philosophy of Science
  // ==========================================================================
  {
    topic: "Introduction to History and Philosophy of Science",
    topicCode: "HPS-001-01",
    module: "Foundations",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">History and Philosophy of Science (HPS)</span> is an interdisciplinary field that examines the development of scientific knowledge through time (history) and the foundational assumptions, methods, and implications of science (philosophy). <strong>Understanding HPS helps you think critically about what science is, how it works, and why it matters</strong>.
</div>

<p class="learn-p">Science is one of the most powerful human endeavors. It has given us vaccines, computers, smartphones, airplanes, and an understanding of the universe from subatomic particles to distant galaxies. But what exactly is science? How does it differ from other ways of knowing (religion, philosophy, common sense, pseudoscience)? How does scientific knowledge grow and change? These questions are the domain of the philosophy of science. The history of science shows us that scientific knowledge is not static — it evolves through revolutions, debates, and discoveries, with theories once considered certain eventually discarded or refined.</p>

<h3 class="learn-subheading">What is Science? — Definitions and Characteristics</h3>

<p class="learn-p">The word "science" comes from the Latin "scientia," meaning knowledge. But not all knowledge is scientific. Science is a particular way of knowing characterized by specific methods and attitudes.</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Characteristic</th><th>Description</th><th>Example</th>
    </thead>
    <tbody>
      <tr><td>Empirical</th><td>Based on observable, measurable evidence — not pure reasoning or authority</th><td>Testing a drug's effectiveness through clinical trials, not just theorizing</td>
      </tr>
      <tr><td>Systematic</th><td>Organized, methodical approach following established procedures</th><td>Following the scientific method: hypothesis, prediction, experiment, analysis</td>
      </tr>
      <tr><td>Testable/Falsifiable</th><td>Must make predictions that can be checked against reality</th><td>"All swans are white" is falsifiable — finding one black swan disproves it</td>
      </tr>
      <tr><td>Self-Correcting</th><td>Errors are identified and corrected through peer review, replication, criticism</th><td>Retracted papers, revised theories based on new evidence</td>
      </tr>
      <tr><td>Provisional</th><td>Scientific knowledge is never "proven" absolutely; always open to revision</th><td>Newton's gravity replaced by Einstein's; may be refined further</td>
      </tr>
      <tr><td>Cumulative but Revolutionary</th><td>Builds on prior knowledge but also experiences paradigm shifts (Kuhn)</th><td>Copernican Revolution replaced geocentrism with heliocentrism</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="250" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🔬 WHAT IS SCIENCE? — Key Characteristics</text>
    
    <g>
      <circle cx="90" cy="70" r="8" fill="#3b82f6">
        <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
      </circle>
      <text x="90" y="96" text-anchor="middle" font-size="8" fill="#1e3a8a">Empirical</text>
    </g>
    <line x1="90" y1="78" x2="90" y2="200" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4,4"/>
    
    <g>
      <circle cx="160" cy="70" r="8" fill="#22c55e">
        <animate attributeName="r" values="8;12;8" dur="2s" begin="0.3s" repeatCount="indefinite"/>
      </circle>
      <text x="160" y="96" text-anchor="middle" font-size="8" fill="#166534">Systematic</text>
    </g>
    <line x1="160" y1="78" x2="160" y2="200" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,4"/>
    
    <g>
      <circle cx="230" cy="70" r="8" fill="#f59e0b">
        <animate attributeName="r" values="8;12;8" dur="2s" begin="0.6s" repeatCount="indefinite"/>
      </circle>
      <text x="230" y="96" text-anchor="middle" font-size="8" fill="#92400e">Falsifiable</text>
    </g>
    <line x1="230" y1="78" x2="230" y2="200" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4"/>
    
    <g>
      <circle cx="300" cy="70" r="8" fill="#ec4899">
        <animate attributeName="r" values="8;12;8" dur="2s" begin="0.9s" repeatCount="indefinite"/>
      </circle>
      <text x="300" y="96" text-anchor="middle" font-size="8" fill="#831843">Self-Correcting</text>
    </g>
    <line x1="300" y1="78" x2="300" y2="200" stroke="#ec4899" stroke-width="2" stroke-dasharray="4,4"/>
    
    <g>
      <circle cx="370" cy="70" r="8" fill="#8b5cf6">
        <animate attributeName="r" values="8;12;8" dur="2s" begin="1.2s" repeatCount="indefinite"/>
      </circle>
      <text x="370" y="96" text-anchor="middle" font-size="8" fill="#5b21b6">Provisional</text>
    </g>
    <line x1="370" y1="78" x2="370" y2="200" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="4,4"/>
    
    <g>
      <circle cx="440" cy="70" r="8" fill="#ef4444">
        <animate attributeName="r" values="8;12;8" dur="2s" begin="1.5s" repeatCount="indefinite"/>
      </circle>
      <text x="440" y="96" text-anchor="middle" font-size="8" fill="#991b1b">Cumulative &amp; Revolutionary</text>
    </g>
    <line x1="440" y1="78" x2="440" y2="200" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
    
    <rect x="50" y="210" width="400" height="30" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
    <text x="250" y="230" text-anchor="middle" font-size="9" fill="#475569">🔑 Science is a way of knowing — empirical, testable, and self-correcting</text>
  </svg>
</div>

<h3 class="learn-subheading">The Goals of Science</h3>

<p class="learn-p">Science pursues multiple interconnected goals:</p>
<ul class="learn-list">
  <li><strong>Description:</strong> Accurately observing and documenting phenomena (e.g., describing the life cycle of a butterfly, mapping the human genome)</li>
  <li><strong>Explanation:</strong> Understanding why phenomena occur — identifying causes and mechanisms (e.g., why planets orbit the sun: gravity)</li>
  <li><strong>Prediction:</strong> Using theories to forecast future events or unobserved phenomena (e.g., predicting eclipses, weather, disease spread)</li>
  <li><strong>Control/Intervention:</strong> Applying scientific knowledge to manipulate nature for human benefit (e.g., vaccines, antibiotics, engineering, agriculture)</li>
  <li><strong>Understanding/Explanation (as intrinsic value):</strong> Knowing for its own sake, satisfying human curiosity about the universe</li>
</ul>

<h3 class="learn-subheading">Science vs Other Ways of Knowing</h3>

<p class="learn-p">Science is not the only way to acquire knowledge. Philosophy uses logic and reasoning; religion appeals to revelation and faith; common sense draws on everyday experience; pseudoscience mimics science but lacks its rigor. Understanding the differences helps evaluate claims critically.</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Way of Knowing</th><th>Method</th><th>Strengths</th><th>Limitations</th>
    </thead>
    <tbody>
      <tr><td>Science</th><td>Empirical observation, experimentation, peer review, falsification</th><td>Reliable, testable, self-correcting, produces technology</th><td>Limited to empirical questions; cannot address values, meaning, aesthetics</td>
      </tr>
      <tr><td>Philosophy</th><td>Reason, logic, argument, conceptual analysis</th><td>Clarifies concepts, examines assumptions, addresses questions science cannot</th><td>Often lacks empirical grounding; conclusions debatable</td>
      </tr>
      <tr><td>Religion</th><td>Revelation, sacred texts, faith, tradition</th><td>Provides meaning, purpose, community, moral guidance</th><td>Claims not empirically testable; different religions conflict</td>
      </tr>
      <tr><td>Pseudoscience</th><td>Looks like science (jargon, formulas) but lacks testing, peer review, falsifiability</th><td>None — produces false beliefs, wastes resources, causes harm</th><td>Does not self-correct; claims persist despite contrary evidence</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">Why Study History and Philosophy of Science?</h3>

<p class="learn-p">Understanding HPS benefits everyone, whether scientist or not:</p>
<ul class="learn-list">
  <li><strong>Critical thinking:</strong> Evaluate scientific claims — distinguish good science from bad science, pseudoscience, and misinformation</li>
  <li><strong>Contextual understanding:</strong> Science does not occur in a vacuum; it is shaped by cultural, political, and economic factors</li>
  <li><strong>Appreciation of scientific process:</strong> Understanding that science is fallible, provisional, and self-correcting — not a collection of absolute truths</li>
  <li><strong>Ethical awareness:</strong> Science can be used for good or evil; understanding history helps avoid past mistakes (eugenics, unethical experiments)</li>
  <li><strong>Better science:</strong> Reflection on methods, assumptions, and history leads to more thoughtful, rigorous research</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>GST Exam Tip:</strong> Questions often ask you to distinguish science from pseudoscience using falsifiability. Remember: A statement is scientific only if it can be proven false (falsifiable). "All swans are white" is falsifiable; "There exists an invisible, undetectable dragon in my garage" is unfalsifiable and thus not scientific.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>Key Thinker:</strong> Karl Popper (1902-1994) proposed falsifiability as the criterion for demarcating science from non-science. He argued that no number of confirming observations can prove a theory true, but a single disconfirming observation can prove it false. Science progresses by conjectures and refutations.</span>
</div>
    `,
    questions: [
      { q: "The word 'science' comes from the Latin 'scientia' meaning:", o: ["Wisdom", "Knowledge", "Truth", "Experiment"], a: 1, e: "Scientia means knowledge. Science is a particular way of acquiring knowledge through empirical, systematic methods.", h: "What does 'scientia' translate to?", yr: "GST" },
      { q: "Which characteristic of science means that scientific claims must be testable against observable evidence?", o: ["Theoretical", "Speculative", "Empirical", "Intuitive"], a: 2, e: "Empirical means based on observation and experiment — evidence that can be observed, measured, and verified by others.", h: "What word means 'based on observation'?", yr: "GST" },
      { q: "According to Karl Popper, the criterion for distinguishing science from pseudoscience is:", o: ["Verifiability", "Falsifiability", "Popularity", "Complexity"], a: 1, e: "Popper argued scientific theories must be falsifiable — there must be possible observations that could prove them false. Unfalsifiable claims (e.g., astrology) are not scientific.", h: "What must be possible to prove a theory wrong?", yr: "GST" },
      { q: "Which of the following is a goal of science?", o: ["Description, explanation, prediction, and control", "Proving absolute truths forever", "Replacing religion", "Avoiding criticism"], a: 0, e: "Science aims to describe, explain, predict, and intervene/control natural phenomena. It never achieves absolute certainty.", h: "What does science try to do?", yr: "GST" },
      { q: "The statement 'There exist invisible, undetectable fairies in my garden' is:", o: ["Scientific", "Falsifiable", "Unfalsifiable — not scientific", "Empirically verified"], a: 2, e: "This claim is unfalsifiable because no possible observation could prove it false (the fairies are invisible and undetectable). Unfalsifiable claims are not scientific.", h: "Could you prove this wrong?", yr: "GST" },
      { q: "Science differs from philosophy in that science relies primarily on:", o: ["Pure reason", "Revelation", "Empirical observation and experimentation", "Tradition"], a: 2, e: "Science is empirical — based on observation and experiment. Philosophy primarily uses reason, logic, and conceptual analysis, not empirical data.", h: "What does science use that philosophy does not necessarily need?", yr: "GST" },
      { q: "Which of the following is NOT a characteristic of science?", o: ["Self-correcting", "Provisional", "Absolute certainty", "Falsifiable"], a: 2, e: "Science never achieves absolute certainty — all knowledge is provisional and subject to revision based on new evidence. Absolute certainty is not a characteristic of science.", h: "Does science claim to be permanently certain?", yr: "GST" },
      { q: "Why study History and Philosophy of Science? Select all that apply.", o: ["Develop critical thinking skills", "Appreciate that science is fallible and self-correcting", "Recognize that science is purely objective with no cultural context", "Understand ethical dimensions of science"], a: [0,1,3], e: "HPS develops critical thinking, shows science as fallible/self-correcting, and reveals ethical dimensions. Science does occur within cultural context — not purely objective without context.", h: "What are benefits of HPS?", yr: "GST" },
      { q: "The characteristic that science builds on prior knowledge but also undergoes revolutions is described as:", o: ["Cumulative but revolutionary", "Static", "Random", "Unchanging"], a: 0, e: "Science cumulatively builds knowledge, but also experiences paradigm shifts (Kuhn) where old frameworks are replaced — e.g., Copernican Revolution replaced geocentrism.", h: "How does science change over time?", yr: "GST" },
      { q: "Which philosopher is most associated with falsifiability?", o: ["Thomas Kuhn", "Karl Popper", "Imre Lakatos", "Paul Feyerabend"], a: 1, e: "Karl Popper proposed falsifiability as the demarcation criterion between science and pseudoscience.", h: "Who wrote 'The Logic of Scientific Discovery'?", yr: "GST" },
      { q: "A theory that makes risky predictions that could potentially disprove it is considered:", o: ["Weak", "Unscientific", "Strong according to Popper — because it is highly falsifiable", "Unimportant"], a: 2, e: "For Popper, theories that make bold, risky predictions (highly falsifiable) are stronger than theories that are vague or avoid prediction.", h: "What kind of theory impresses Popper?", yr: "GST" },
      { q: "The goal of prediction in science means:", o: ["Guessing randomly", "Using theories to forecast future events or unobserved phenomena", "Always being correct", "Ignoring data"], a: 1, e: "Prediction means using scientific theories to anticipate what will happen in the future or what will be found in unexamined cases — e.g., predicting eclipses or new particles.", h: "What is scientific prediction?", yr: "GST" },
      { q: "Which of the following is an example of a pseudoscience?", o: ["Physics", "Chemistry", "Astrology", "Biology"], a: 2, e: "Astrology claims to predict personality and events based on star positions but fails falsifiability tests and does not self-correct. Physics, chemistry, biology are genuine sciences.", h: "Which one is not a real science?", yr: "GST" },
      { q: "That science is 'self-correcting' means:", o: ["It never makes mistakes", "Errors are identified and corrected through peer review, replication, and criticism", "Only scientists can criticize science", "Mistakes are ignored"], a: 1, e: "Self-correcting means the scientific community identifies errors (fraud, mistakes) through peer review, replication attempts, and critical scrutiny, then corrects the record.", h: "How does science handle its mistakes?", yr: "GST" },
      { q: "Why can't science answer questions about the meaning of life?", o: ["Science is not interested", "Science is limited to empirical questions; meaning is a philosophical/religious question", "Scientists are not smart enough", "Science already answered it"], a: 1, e: "Science is limited to empirical, testable questions. Questions about purpose, meaning, value, morality are outside science's domain — addressed by philosophy and religion.", h: "What questions can't science answer?", yr: "GST" },
      { q: "Which of the following is a scientific claim?", o: ["Vaccines cause autism (based on retracted fraudulent study)", "The Earth revolves around the Sun (falsifiable, supported by evidence)", "Astrological signs determine personality", "Homeopathy cures all diseases"], a: 1, e: "Heliocentrism is falsifiable and supported by overwhelming evidence. The others are pseudoscience or fraudulent.", h: "Which has real evidence?", yr: "GST" },
      { q: "Thomas Kuhn is known for introducing which concept?", o: ["Falsifiability", "Paradigm shifts and normal science", "Verification principle", "Anarchist epistemology"], a: 1, e: "Kuhn's 'The Structure of Scientific Revolutions' (1962) introduced paradigm shifts — periods of revolutionary science alternating with 'normal science' puzzle-solving.", h: "What concept describes scientific revolutions?", yr: "GST" },
      { q: "The provisional nature of science means:", o: ["Scientific knowledge is tentative and subject to revision with new evidence", "Scientists are always wrong", "Science cannot be trusted", "Theories never change"], a: 0, e: "Provisional means scientific knowledge is never final — always open to revision based on new evidence. Newton's laws were revised by Einstein; Einstein's may be revised.", h: "Is science ever completely finished?", yr: "GST" },
      { q: "Which of the following distinguishes science from pseudoscience?", o: ["Use of jargon", "Use of mathematics", "Willingness to test claims and abandon them if falsified", "Complexity"], a: 2, e: "Pseudoscience often looks like science (jargon, math) but crucially lacks willingness to test claims and abandon them when falsified. Science self-corrects; pseudoscience clings to claims.", h: "What is the key behavioral difference?", yr: "GST" },
      { q: "The goal of 'control/intervention' in science refers to:", o: ["Controlling scientists' behavior", "Applying scientific knowledge to manipulate nature for human benefit (vaccines, antibiotics, technology)", "Controlling research funding", "Controlling publication"], a: 1, e: "Control means using scientific understanding to intervene in natural processes — developing vaccines, antibiotics, engineering materials, farming techniques, etc. — for human benefit.", h: "How does science help us change things?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 2: Ancient and Pre-Scientific Thought
  // ==========================================================================
  {
    topic: "Ancient and Pre-Scientific Thought",
    topicCode: "HPS-002-01",
    module: "History of Science",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Ancient and pre-scientific thought</span> laid the foundations for modern science. Long before the scientific revolution, Babylonian, Egyptian, Greek, Indian, Chinese, and Islamic civilizations developed sophisticated methods of observing nature, recording data, and creating explanatory systems. <strong>Understanding these early traditions shows that science did not emerge from nowhere — it built on millennia of accumulated knowledge</strong>.
</div>

<p class="learn-p">Modern science as we know it emerged in Europe during the 16th-17th centuries. But its roots extend far deeper and wider — across cultures and millennia. Ancient peoples observed the heavens, tracked seasons, developed mathematics, created calendars, practiced medicine, and theorized about the nature of reality. While their methods differed from modern science, they established crucial foundations: systematic observation, recording of data, mathematical modeling, and naturalistic explanation.</p>

<h3 class="learn-subheading">Babylonian and Egyptian Science (c. 3000-500 BCE)</h3>

<p class="learn-p">The Babylonians and Egyptians developed practical knowledge for agriculture, navigation, construction, and administration.</p>

<p class="learn-p"><strong>Babylonian contributions:</strong></p>
<ul class="learn-list">
  <li><strong>Astronomy:</strong> Systematic observation of planetary motions for over 700 years — recorded on clay tablets (cuneiform). Predicted lunar eclipses, calculated planetary periods, tracked Venus, Jupiter, Mars, Mercury, Saturn</li>
  <li><strong>Mathematics:</strong> Base-60 (sexagesimal) system — still used for time (60 minutes, 60 seconds) and angles (360 degrees). Developed multiplication tables, quadratic equations, Pythagorean triples (before Pythagoras)</li>
  <li><strong>Medicine:</strong> Diagnostic manuals, surgical procedures, medical recipes; recognized importance of observation and prognosis</li>
</ul>

<p class="learn-p"><strong>Egyptian contributions:</strong></p>
<ul class="learn-list">
  <li><strong>Geometry:</strong> Developed for land surveying (Nile floods erased property boundaries annually) and pyramid construction. Rhind Mathematical Papyrus (c. 1650 BCE) contains area calculations, volume formulas</li>
  <li><strong>Medicine:</strong> Ebers Papyrus (c. 1550 BCE) — 700+ remedies, anatomical observations, recognized heart as central organ, pulse diagnosis. Imhotep (c. 2650 BCE) was deified as god of medicine</li>
  <li><strong>Calendar:</strong> Solar calendar with 365 days (12 months of 30 days + 5 extra days) — remarkably accurate</li>
  <li><strong>Astronomy:</strong> Sirius rising used to predict Nile flood; identified planets; aligned pyramids with stars</li>
</ul>

<h3 class="learn-subheading">Greek Science — The Birth of Natural Philosophy (c. 600-200 BCE)</h3>

<p class="learn-p">The ancient Greeks transformed practical knowledge into systematic, rational inquiry — "natural philosophy" (philosophy of nature). They sought explanations based on reason, not myth or divine intervention.</p>

<p class="learn-p"><strong>Key Pre-Socratic philosophers:</strong></p>
<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Thinker</th><th>Contribution</th><th>Key Idea</th>
    </thead>
    <tbody>
      <tr><td>Thales (c. 624-546 BCE)</th><td>"First philosopher"</th><td>Water as fundamental substance (arche); predicted eclipse; used geometry practically</td>
      </tr>
      <tr><td>Anaximander</th><td>Evolutionary thought</th><td>Humans evolved from fish-like creatures; Earth floats unsupported</td>
      </tr>
      <tr><td>Pythagoras (c. 570-495 BCE)</th><td>Mathematics as key to reality</th><td>Numbers are fundamental; Pythagorean theorem; harmony of spheres</td>
      </tr>
      <tr><td>Democritus (c. 460-370 BCE)</th><td>Atomism</th><td>Everything composed of indivisible atoms moving in void — remarkably prescient</td>
      </tr>
      <tr><td>Aristotle (384-322 BCE)</th><td>Systematizer, biologist</th><td>Four causes, classification of animals, geocentric universe, logic (syllogism)</td>
      </tr>
    </tbody>
  </table>
</div>

<p class="learn-p"><strong>Hellenistic Science (Alexandria):</strong></p>
<ul class="learn-list">
  <li><strong>Euclid (c. 300 BCE):</strong> Elements — geometry textbook for 2000 years; axiomatic method (assumptions + logical deduction)</li>
  <li><strong>Archimedes (c. 287-212 BCE):</strong> Buoyancy (Eureka moment), lever, screw, pulley; calculated pi; developed integral calculus precursors</li>
  <li><strong>Eratosthenes (c. 276-194 BCE):</strong> Calculated Earth's circumference with remarkable accuracy using shadows at Syene and Alexandria</li>
  <li><strong>Hipparchus (c. 190-120 BCE):</strong> Founder of trigonometry; star catalog; discovered precession of equinoxes; geocentric model refined</li>
  <li><strong>Ptolemy (c. 100-170 CE):</strong> Almagest — geocentric astronomy with epicycles, influenced Islamic and European astronomy for 1400 years</li>
  <li><strong>Galen (129-216 CE):</strong> Medical system based on humors (blood, phlegm, black bile, yellow bile); dominated medicine for 1500 years</li>
</ul>

<h3 class="learn-subheading">Islamic Golden Age Science (c. 800-1200 CE)</h3>

<p class="learn-p">While Europe experienced the "Dark Ages," Islamic civilization preserved, translated, and advanced Greek knowledge, making original contributions across disciplines.</p>

<p class="learn-p"><strong>Key figures and contributions:</strong></p>
<ul class="learn-list">
  <li><strong>Al-Khwarizmi (c. 780-850 CE):</strong> "Father of Algebra" — from "al-jabr"; gave us the word "algorithm"; developed algebra as distinct discipline; Hindu-Arabic numerals (0-9) transmitted to Europe</li>
  <li><strong>Ibn al-Haytham (Alhazen, c. 965-1040 CE):</strong> "Father of modern scientific method" — emphasized experiment, observation, mathematical analysis; explained vision correctly (light enters eye, not emission from eye); Book of Optics</li>
  <li><strong>Avicenna (Ibn Sina, 980-1037 CE):</strong> Canon of Medicine — medical encyclopedia used in Europe for 500+ years; recognized contagious diseases, quarantine; clinical trials</li>
  <li><strong>Al-Biruni (973-1048 CE):</strong> Calculated Earth's circumference; compared different calendars; wrote on India's culture; hydrology, geography, mineralogy</li>
  <li><strong>Omar Khayyam (1048-1131 CE):</strong> Mathematician and poet; solved cubic equations; reformed Persian calendar (more accurate than Gregorian)</li>
</ul>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="300" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="12" fill="#1e293b" font-weight="700">🏛️ ANCIENT SCIENCE — Transmission of Knowledge</text>
    
    <g>
      <rect x="15" y="45" width="100" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="65" y="63" text-anchor="middle" font-size="8" fill="#92400e" font-weight="800">BABYLON</text>
      <text x="65" y="78" text-anchor="middle" font-size="7" fill="#92400e">Astronomy</text>
      <text x="65" y="90" text-anchor="middle" font-size="7" fill="#92400e">Base-60 math</text>
    </g>
    
    <g>
      <rect x="130" y="45" width="100" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="180" y="63" text-anchor="middle" font-size="8" fill="#92400e" font-weight="800">EGYPT</text>
      <text x="180" y="78" text-anchor="middle" font-size="7" fill="#92400e">Geometry</text>
      <text x="180" y="90" text-anchor="middle" font-size="7" fill="#92400e">Medicine</text>
    </g>
    
    <g>
      <rect x="245" y="45" width="100" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="295" y="63" text-anchor="middle" font-size="8" fill="#1e3a8a" font-weight="800">GREECE</text>
      <text x="295" y="78" text-anchor="middle" font-size="7" fill="#1e3a8a">Natural Philosophy</text>
      <text x="295" y="90" text-anchor="middle" font-size="7" fill="#1e3a8a">Reason + Observation</text>
    </g>
    
    <g>
      <rect x="360" y="45" width="125" height="50" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <text x="422" y="63" text-anchor="middle" font-size="8" fill="#166534" font-weight="800">ISLAMIC GOLDEN AGE</text>
      <text x="422" y="78" text-anchor="middle" font-size="7" fill="#166534">Algebra, Alchemy, Optics</text>
      <text x="422" y="90" text-anchor="middle" font-size="7" fill="#166534">Preserved Greek texts</text>
    </g>
    
    <g>
      <rect x="190" y="120" width="120" height="50" rx="8" fill="#fce7f3" stroke="#ec4899" stroke-width="1.5"/>
      <text x="250" y="138" text-anchor="middle" font-size="8" fill="#831843" font-weight="800">EUROPEAN</text>
      <text x="250" y="153" text-anchor="middle" font-size="8" fill="#831843" font-weight="800">SCIENTIFIC REVOLUTION</text>
    </g>
    
    <!-- Arrows showing transmission -->
    <path d="M65,95 L65,110 L250,110 L250,120" fill="none" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrowT1)"/>
    <path d="M180,95 L180,110 L250,110" fill="none" stroke="#f59e0b" stroke-width="2"/>
    <path d="M295,95 L295,120" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowT1)"/>
    <path d="M422,95 L422,110 L310,110" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrowT1)"/>
    
    <defs>
      <marker id="arrowT1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6"/>
      </marker>
    </defs>
    
    <text x="250" y="210" text-anchor="middle" font-size="9" fill="#475569">Greek knowledge preserved by Islamic scholars,</text>
    <text x="250" y="225" text-anchor="middle" font-size="9" fill="#475569">transmitted to Europe through Spain (Andalusia)</text>
    <text x="250" y="240" text-anchor="middle" font-size="9" fill="#475569">and translation movements (Toledo, 12th c.)</text>
    
    <rect x="60" y="260" width="380" height="30" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
    <text x="250" y="280" text-anchor="middle" font-size="9" fill="#475569">🔑 Science is cumulative — each civilization built on the achievements of previous ones</text>
  </svg>
</div>

<h3 class="learn-subheading">Chinese and Indian Science</h3>

<p class="learn-p"><strong>China:</strong></p>
<ul class="learn-list">
  <li>Four Great Inventions: papermaking, printing, gunpowder, compass — transformed world</li>
  <li>Astronomy: supernova records (1054, created Crab Nebula), earliest recorded sunspots</li>
  <li>Medicine: acupuncture, herbal remedies, pulse diagnosis; Neijing text (c. 200 BCE)</li>
  <li>Seismograph: Zhang Heng (132 CE) — detected direction of distant earthquakes</li>
</ul>

<p class="learn-p"><strong>India:</strong></p>
<ul class="learn-list">
  <li>Mathematics: concept of zero (0) as a number; decimal place-value system; negative numbers; sine function</li>
  <li>Astronomy: Aryabhata (476-550 CE) — Earth rotates on axis; heliocentric tendencies; solar and lunar eclipses correctly explained; calculated pi = 3.1416</li>
  <li>Medicine: Ayurveda — holistic system, surgery (plastic surgery described), materia medica</li>
  <li>Linguistics: Panini's grammar (c. 500 BCE) — first generative grammar, described rules of Sanskrit</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Point:</strong> The "Scientific Revolution" is sometimes portrayed as a purely European achievement, but this ignores centuries of Greek, Islamic, Chinese, and Indian contributions. Science is a global, cumulative enterprise. The Islamic Golden Age preserved Greek texts when Europe had lost them, and added original insights (algebra, experimental method, optics). Chinese inventions (paper, printing, gunpowder, compass) transformed the world.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Discuss the contributions of Islamic scholars to the development of science during the European 'Dark Ages.'" (Sample answer: Islamic scholars preserved, translated, and expanded Greek knowledge — Al-Khwarizmi developed algebra; Ibn al-Haytham pioneered experimental method and optics; Avicenna's Canon of Medicine was used for 500+ years; Al-Biruni calculated Earth's circumference. These works were transmitted to Europe via Spain, sparking the Renaissance and Scientific Revolution.)</span>
</div>
    `,
    questions: [
      { q: "Which ancient civilization developed base-60 (sexagesimal) mathematics still used for time (60 minutes) and angles (360 degrees)?", o: ["Egyptian", "Greek", "Babylonian", "Chinese"], a: 2, e: "Babylonians used base-60, which survives in our measurement of time (60 minutes, 60 seconds) and angles (360 degrees).", h: "Which civilization gave us 60 minutes in an hour?", yr: "GST" },
      { q: "The Rhind Mathematical Papyrus and Ebers Papyrus come from which civilization?", o: ["Babylonian", "Egyptian", "Greek", "Indian"], a: 1, e: "These papyri are Egyptian: Rhind (mathematics, geometry) and Ebers (medical remedies, anatomy).", h: "Which civilization used papyrus?", yr: "GST" },
      { q: "Which pre-Socratic philosopher proposed that everything is made of indivisible atoms moving in the void?", o: ["Aristotle", "Plato", "Democritus", "Pythagoras"], a: 2, e: "Democritus (c. 460-370 BCE) proposed atomism — remarkably prescient of modern atomic theory.", h: "Who first thought of atoms?", yr: "GST" },
      { q: "Who wrote 'Elements', the geometry textbook used for over 2000 years?", o: ["Archimedes", "Euclid", "Pythagoras", "Aristotle"], a: 1, e: "Euclid's 'Elements' organized geometry axiomatically — assumptions + logical deductions — used until the 19th century.", h: "Which Greek wrote the geometry textbook?", yr: "GST" },
      { q: "Which Hellenistic scientist calculated Earth's circumference with remarkable accuracy using shadows?", o: ["Ptolemy", "Eratosthenes", "Hipparchus", "Archimedes"], a: 1, e: "Eratosthenes compared shadow angles at Syene (no shadow) and Alexandria (7.2 degrees) to calculate circumference within 1-2% of modern value.", h: "Who measured Earth's size?", yr: "GST" },
      { q: "Ptolemy's 'Almagest' presented which astronomical model?", o: ["Heliocentric (Sun-centered)", "Geocentric (Earth-centered) with epicycles", "Galactic", "Acoustic"], a: 1, e: "Ptolemy's geocentric model with epicycles explained planetary motions and dominated astronomy for 1400 years until Copernicus.", h: "Did Ptolemy think Earth or Sun was center?", yr: "GST" },
      { q: "Who is known as the 'Father of Algebra'?", o: ["Al-Khwarizmi", "Ibn al-Haytham", "Avicenna", "Al-Biruni"], a: 0, e: "Al-Khwarizmi (c. 780-850 CE) wrote 'al-Jabr', giving us the word 'algebra'. Also developed algorithm (his name).", h: "Who gave us algebra?", yr: "GST" },
      { q: "Ibn al-Haytham (Alhazen) is known for:", o: ["Discovery of blood circulation", "Development of experimental method and optics", "Theory of evolution", "Periodic table"], a: 1, e: "Ibn al-Haytham's 'Book of Optics' emphasized experiment, mathematical analysis, and correctly explained vision (light enters eye).", h: "Who pioneered the experimental method?", yr: "GST" },
      { q: "Avicenna's 'Canon of Medicine' was used in Europe for:", o: ["50 years", "500+ years", "10 years", "Never used in Europe"], a: 1, e: "Avicenna's Canon was the standard medical encyclopedia in Europe from the 12th to 17th centuries — over 500 years.", h: "How long was Avicenna used?", yr: "GST" },
      { q: "Which civilization invented papermaking, printing, gunpowder, and the compass?", o: ["Greek", "Islamic", "Chinese", "Indian"], a: 2, e: "China's Four Great Inventions — papermaking, printing, gunpowder, magnetic compass — transformed world civilization.", h: "Which civilization invented these?", yr: "GST" },
      { q: "The concept of zero (0) as a number was developed in:", o: ["Greece", "Rome", "India", "Egypt"], a: 2, e: "Indian mathematicians developed zero as a number (not just placeholder) and the decimal place-value system, transmitted to Europe via Islamic scholars.", h: "Where did zero come from?", yr: "GST" },
      { q: "The Islamic Golden Age occurred roughly between:", o: ["500-800 BCE", "800-1200 CE", "1400-1700 CE", "1800-2000 CE"], a: 1, e: "Islamic Golden Age (Abbasid Caliphate, c. 800-1200 CE) saw translation of Greek texts and original advances in algebra, optics, medicine, astronomy.", h: "When was the Islamic Golden Age?", yr: "GST" },
      { q: "Aristotle's four causes include all EXCEPT:", o: ["Material", "Formal", "Efficient", "Random"], a: 3, e: "Aristotle's four causes: material (what it's made of), formal (its form/essence), efficient (what produced it), final (its purpose/end). Random is not a cause.", h: "How many causes did Aristotle identify?", yr: "GST" },
      { q: "Which Hellenistic scientist shouted 'Eureka!' upon discovering buoyancy?", o: ["Archimedes", "Euclid", "Ptolemy", "Hipparchus"], a: 0, e: "Archimedes discovered buoyancy while bathing — realizing his body displaced water — allegedly ran naked shouting 'Eureka!' (I have found it).", h: "Who discovered buoyancy?", yr: "GST" },
      { q: "Thales is considered the 'first philosopher' for proposing:", o: ["Atomism", "Water as fundamental substance (arche)", "Forms", "Logic"], a: 1, e: "Thales proposed that water is the fundamental substance (arche) from which everything derives — moving beyond myth to natural explanation.", h: "What did Thales say everything comes from?", yr: "GST" },
      { q: "Zhang Heng (132 CE) invented:", o: ["Paper", "Seismograph — detected direction of distant earthquakes", "Gunpowder", "Printing press"], a: 1, e: "Zhang Heng's seismograph detected the direction of distant earthquakes using a pendulum and dragon heads dropping balls into frog mouths.", h: "Who invented the first earthquake detector?", yr: "GST" },
      { q: "Ayurveda is the traditional medicine system of:", o: ["China", "Greece", "India", "Egypt"], a: 2, e: "Ayurveda (India) is a holistic medical system emphasizing balance of bodily humors, herbal remedies, surgery, and lifestyle.", h: "Which civilization developed Ayurveda?", yr: "GST" },
      { q: "Pythagoras is famous for all EXCEPT:", o: ["Pythagorean theorem", "Numbers as fundamental to reality", "Harmony of the spheres", "Atomic theory"], a: 3, e: "Pythagoras contributed mathematics and philosophy; atomic theory is Democritus. Pythagorean theorem (a²+b²=c²) predated Pythagoras but his school systematized it.", h: "What did Pythagoras NOT do?", yr: "GST" },
      { q: "Galen's medical system, which dominated for 1500 years, was based on:", o: ["Four humors (blood, phlegm, black bile, yellow bile)", "Germ theory", "Cell theory", "Vaccination"], a: 0, e: "Galen's system used four humors; imbalance caused disease. Treatments aimed to restore balance (bleeding, purging, diet).", h: "What were the four humors?", yr: "GST" },
      { q: "The 'House of Wisdom' (Bayt al-Hikma) in Baghdad was:", o: ["A mosque", "A palace", "A library and translation center preserving/advancing knowledge during Islamic Golden Age", "A military academy"], a: 2, e: "The House of Wisdom (8th-13th c.) was a major library, translation center, and research institute — translated Greek, Persian, Indian works into Arabic.", h: "Where was knowledge preserved in Islamic Golden Age?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 3: The Scientific Revolution (16th-17th Centuries)
  // ==========================================================================
  {
    topic: "The Scientific Revolution (16th-17th Centuries)",
    topicCode: "HPS-003-01",
    module: "History of Science",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">The Scientific Revolution</span> (c. 1543-1687) was a period of profound transformation in how Europeans understood the natural world. The geocentric universe of Aristotle and Ptolemy was replaced by the heliocentric system of Copernicus, Kepler, and Galileo; Aristotle's physics was replaced by Newton's laws; and a new experimental, mathematical approach to knowledge emerged. <strong>This revolution laid the foundations for modern science</strong>.
</div>

<p class="learn-p">The Scientific Revolution did not happen overnight. It built on Greek, Islamic, and medieval foundations, but introduced radical new ideas: the universe is heliocentric (Sun-centered), not geocentric (Earth-centered); celestial and terrestrial physics obey the same laws; knowledge comes from observation and experiment, not just authority; mathematics is the language of nature.</p>

<h3 class="learn-subheading">Key Figures and Discoveries</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Thinker</th><th>Key Work/Discovery</th><th>Year</th><th>Significance</th>
    </thead>
    <tbody>
      <tr><td>Nicolaus Copernicus</th><td>De Revolutionibus (On the Revolutions of the Heavenly Spheres)</th><td>1543</th><td>Heliocentric theory — Earth orbits Sun, not vice versa. Triggered revolution.</th>
      </tr>
      <tr><td>Tycho Brahe</th><td>Decades of naked-eye astronomical observations</th>。</th>。<th>Accurate planetary data (unmatched until telescopes). Provided data for Kepler.</th>
      </tr>
      <tr><td>Johannes Kepler</th><td>Three Laws of Planetary Motion</th><td>1609, 1619</th>。<th>Elliptical orbits (not circular); equal areas in equal times; harmonic law (period vs distance). Proved Copernicus was correct.</th>
      </tr>
      <tr><td>Galileo Galilei</th><td>Telescopic observations, experiments on motion</th><td>1609-1632</th>。<th>Moons of Jupiter, phases of Venus (proved heliocentrism), mountains on moon; inclined plane experiments; conflict with Church; "father of modern science"</th>
      </tr>
      <tr><td>Francis Bacon</th><td>Novum Organum, empirical method</th><td>1620</th>。<th>Empiricism — knowledge from observation and experiment; inductive method; criticized Aristotelian deduction</th>
      </tr>
      <tr><td>René Descartes</th>。<th>Discourse on Method, analytic geometry</th>。<th>1637</th>。<th>Rationalism — "Cogito ergo sum"; mind-body dualism; coordinate geometry; mechanical philosophy</th>
      </tr>
      <tr><td>Isaac Newton</th>。<th>Philosophiae Naturalis Principia Mathematica</th>。<th>1687</th>。<th>Universal gravitation, three laws of motion, calculus; unified celestial and terrestrial physics — culmination of Scientific Revolution</th>
      </tr>
    </tbody>
  </table>
</div>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="320" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="12" fill="#1e293b" font-weight="700">🌍 THE SCIENTIFIC REVOLUTION — From Geocentric to Heliocentric</text>
    
    <!-- Ptolemy (Old) -->
    <g>
      <text x="80" y="55" text-anchor="middle" font-size="9" fill="#991b1b" font-weight="800">PTOLEMAIC (Old)</text>
      <circle cx="80" cy="85" r="30" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
      <text x="80" y="88" text-anchor="middle" font-size="8" fill="#991b1b">🌍 EARTH</text>
      <circle cx="80" cy="85" r="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
      <circle cx="80" cy="85" r="16" fill="none" stroke="#f59e0b" stroke-width="0.8"/>
      <circle cx="80" cy="85" r="24" fill="none" stroke="#f59e0b" stroke-width="0.5"/>
      <text x="80" y="125" text-anchor="middle" font-size="7" fill="#64748b">Complex epicycles</text>
    </g>
    
    <!-- Arrow -->
    <line x1="130" y1="85" x2="170" y2="85" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowS1)"/>
    <text x="150" y="80" text-anchor="middle" font-size="7" fill="#3b82f6">→</text>
    
    <!-- Copernicus/Galileo (New) -->
    <g>
      <text x="250" y="55" text-anchor="middle" font-size="9" fill="#166534" font-weight="800">COPERNICAN (New)</text>
      <circle cx="250" cy="85" r="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text x="250" y="88" text-anchor="middle" font-size="8" fill="#92400e">☀️ SUN</text>
      <circle cx="290" cy="75" r="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
      <circle cx="270" cy="68" r="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
      <circle cx="300" cy="68" r="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
      <circle cx="260" cy="62" r="3" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
      <text x="250" y="125" text-anchor="middle" font-size="7" fill="#64748b">Elliptical orbits (Kepler)</text>
    </g>
    
    <!-- Timeline -->
    <rect x="50" y="150" width="400" height="20" rx="10" fill="#e2e8f0"/>
    <rect x="50" y="150" width="350" height="20" rx="10" fill="#3b82f6">
      <animate attributeName="width" values="0;350" dur="10s" repeatCount="indefinite"/>
    </rect>
    <text x="250" y="165" text-anchor="middle" font-size="8" fill="#ffffff" font-weight="700">1543 → 1687</text>
    
    <g>
      <text x="90" y="195" text-anchor="middle" font-size="8" fill="#1e293b">1543</text>
      <text x="90" y="208" text-anchor="middle" font-size="7" fill="#64748b">Copernicus</text>
      <text x="90" y="218" text-anchor="middle" font-size="6" fill="#94a3b8">De Revolutionibus</text>
    </g>
    
    <g>
      <text x="180" y="195" text-anchor="middle" font-size="8" fill="#1e293b">1609-1619</text>
      <text x="180" y="208" text-anchor="middle" font-size="7" fill="#64748b">Kepler</text>
      <text x="180" y="218" text-anchor="middle" font-size="6" fill="#94a3b8">Planetary Laws</text>
    </g>
    
    <g>
      <text x="270" y="195" text-anchor="middle" font-size="8" fill="#1e293b">1632</text>
      <text x="270" y="208" text-anchor="middle" font-size="7" fill="#64748b">Galileo</text>
      <text x="270" y="218" text-anchor="middle" font-size="6" fill="#94a3b8">Dialogue</text>
    </g>
    
    <g>
      <text x="400" y="195" text-anchor="middle" font-size="8" fill="#1e293b">1687</text>
      <text x="400" y="208" text-anchor="middle" font-size="7" fill="#64748b">Newton</text>
      <text x="400" y="218" text-anchor="middle" font-size="6" fill="#94a3b8">Principia</text>
    </g>
    
    <defs>
      <marker id="arrowS1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6"/>
      </marker>
    </defs>
    
    <text x="250" y="260" text-anchor="middle" font-size="9" fill="#475569" font-weight="700">🔑 KEY TRANSFORMATION</text>
    <text x="250" y="278" text-anchor="middle" font-size="8" fill="#475569">From Earth-centered (geocentric) to Sun-centered (heliocentric) universe</text>
    <text x="250" y="295" text-anchor="middle" font-size="8" fill="#475569">From Aristotelian physics to Newtonian mechanics</text>
    <text x="250" y="312" text-anchor="middle" font-size="8" fill="#475569">From authority-based knowledge to observation + experiment</text>
  </svg>
</div>

<h3 class="learn-subheading">The Copernican Revolution</h3>

<p class="learn-p">Nicolaus Copernicus (1473-1543) published De Revolutionibus Orbium Coelestium (On the Revolutions of the Celestial Spheres) in the year of his death (1543). He proposed that Earth rotates daily and revolves annually around the Sun — reversing the Ptolemaic/Aristotelian order.</p>

<p class="learn-p"><strong>Why revolutionary:</strong></p>
<ul class="learn-list">
  <li>Earth demoted from center of universe to just another planet</li>
  <li>Heavens not perfect (Copernicus still used circular orbits, but his successors abandoned them)</li>
  <li>Opened possibility of infinite universe (no fixed sphere of stars)</li>
</ul>

<p class="learn-p"><strong>Reception:</strong> Copernicus's theory was not immediately accepted. It had problems (still used circular orbits, didn't fit data better than Ptolemy without adjustments). But it planted a seed that grew.</p>

<h3 class="learn-subheading">Tycho Brahe — The Data Collector</h3>

<p class="learn-p">Tycho Brahe (1546-1601) built the most precise naked-eye observatory of his era (Uraniborg). For 20+ years, he recorded planetary positions with unprecedented accuracy (arcminute precision). He rejected heliocentrism (couldn't detect stellar parallax), proposed hybrid geo-heliocentric model (planets orbit Sun, Sun orbits Earth). But his data were crucial for Kepler.</p>

<h3 class="learn-subheading">Johannes Kepler — The Laws of Planetary Motion</h3>

<p class="learn-p">Kepler (1571-1630), Tycho's assistant, inherited the data. After years of struggle, he discovered three laws:</p>

<ol class="learn-list learn-ordered">
  <li><strong>Elliptical orbits:</strong> Planets move in ellipses, not perfect circles, with Sun at one focus</li>
  <li><strong>Equal areas in equal times:</strong> Planets sweep equal areas in equal times — they move faster when closer to Sun</li>
  <li><strong>Harmonic law:</strong> The square of a planet's orbital period is proportional to the cube of its semi-major axis (T² ∝ a³)</li>
</ol>

<p class="learn-p">Kepler's laws provided the first mathematically accurate description of planetary motions, definitively supporting heliocentrism.</p>

<h3 class="learn-subheading">Galileo Galilei — The Telescopic Observer</h3>

<p class="learn-p">Galileo (1564-1642) was the first to use the telescope for astronomy (after learning of Dutch invention). His discoveries:</p>
<ul class="learn-list">
  <li><strong>Moons of Jupiter (1610):</strong> Four bodies orbiting Jupiter — proved not everything orbits Earth</li>
  <li><strong>Phases of Venus:</strong> Full set of phases (like Moon) — impossible in Ptolemaic system, required Venus to orbit Sun</li>
  <li><strong>Mountains on Moon:</strong> Celestial bodies imperfect (contradicting Aristotelian perfection)</li>
  <li><strong>Sunspots:</strong> Sun not perfect, rotates</li>
</ul>

<p class="learn-p"><strong>Conflict with Church:</strong> Galileo's support for Copernicus brought him before the Inquisition (1633). Forced to recant (allegedly muttering "E pur si muove" — "And yet it moves"). Lived under house arrest.</p>

<h3 class="learn-subheading">Francis Bacon — The Empiricist Method</h3>

<p class="learn-p">Bacon (1561-1626) criticized reliance on Aristotle and deductive logic. He championed <strong>empiricism</strong>: knowledge comes from observation and experiment. Inductive method — collect data, identify patterns, form general laws. His vision of organized, collaborative science influenced founding of Royal Society (1660).</p>

<h3 class="learn-subheading">René Descartes — The Rationalist</h3>

<p class="learn-p">Descartes (1596-1650) sought certain foundations for knowledge. "Cogito ergo sum" ("I think, therefore I am") — indubitable starting point. He proposed <strong>mechanical philosophy</strong>: universe is matter in motion, governed by mathematical laws. Mind-body dualism (thinking substance separate from extended substance). Developed analytic geometry (bridging algebra and geometry).</p>

<h3 class="learn-subheading">Isaac Newton — The Synthesizer</h3>

<p class="learn-p">Newton (1643-1727) is the towering figure of the Scientific Revolution. His Principia Mathematica (1687) unified celestial and terrestrial physics under universal gravitation.</p>

<p class="learn-p"><strong>Newton's Three Laws of Motion:</strong></p>
<ol class="learn-list learn-ordered">
  <li><strong>Inertia:</strong> Objects at rest stay at rest; objects in motion stay in motion unless acted by external force</li>
  <li><strong>F = ma:</strong> Force equals mass times acceleration</li>
  <li><strong>Action-Reaction:</strong> For every action, there is an equal and opposite reaction</li>
</ol>

<p class="learn-p"><strong>Universal Gravitation:</strong> Every particle of matter attracts every other particle with force proportional to product of masses and inverse square of distance (F = G·m₁·m₂/r²). Explained falling apples (terrestrial) and orbiting planets (celestial) with same law.</p>

<p class="learn-p"><strong>Other contributions:</strong> Calculus (independently with Leibniz), optics (color spectrum, reflecting telescope), alchemy (although not modern science).</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Point:</strong> The Scientific Revolution was not just a set of discoveries — it was a transformation in method and worldview. From reliance on ancient authority (Aristotle, Galen) to reliance on observation, experiment, and mathematics. From a qualitative, teleological universe to a quantitative, mechanical universe. From Earth-centered to Sun-centered. This revolution made modern science possible.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Why is Galileo considered the 'father of modern science'?" (Sample answer: Galileo pioneered the experimental method — testing hypotheses with controlled experiments (inclined plane, pendulum). He used mathematics to describe natural laws. He insisted that science should be based on observation, not authority. His telescopic discoveries provided evidence for Copernicus. His conflict with the Church symbolized the tension between science and religious authority.)</span>
</div>
    `,
    questions: [
      { q: "Which 1543 book initiated the Scientific Revolution by proposing a heliocentric (Sun-centered) universe?", o: ["Newton's Principia", "Copernicus's De Revolutionibus", "Galileo's Dialogue", "Descartes's Discourse on Method"], a: 1, e: "Copernicus's De Revolutionibus (1543) proposed Earth rotates and orbits Sun — triggering the revolution.", h: "Which book came out in 1543?", yr: "GST" },
      { q: "Tycho Brahe's main contribution to the Scientific Revolution was:", o: ["Inventing the telescope", "Developing laws of planetary motion", "Decades of precise naked-eye astronomical data used by Kepler", "Discovering moons of Jupiter"], a: 2, e: "Tycho's accurate data (pre-telescope) were crucial for Kepler's laws. He rejected heliocentrism but provided evidence for it.", h: "Who collected the data Kepler used?", yr: "GST" },
      { q: "Kepler's first law of planetary motion states that planets move in:", o: ["Perfect circles", "Ellipses with Sun at one focus", "Epicycles", "Straight lines"], a: 1, e: "Kepler's first law: planetary orbits are ellipses, not circles, with Sun at one focus. This replaced ancient circular assumption.", h: "What shape are planetary orbits?", yr: "GST" },
      { q: "Galileo's telescopic discovery of Jupiter's moons proved:", o: ["Earth is center of universe", "Not everything orbits Earth — there are other centers of motion", "Sun revolves around Earth", "Planets are made of cheese"], a: 1, e: "Moons orbiting Jupiter showed celestial bodies can orbit something other than Earth, undermining geocentrism.", h: "What orbits Jupiter?", yr: "GST" },
      { q: "Galileo's Dialogue Concerning the Two Chief World Systems compared:", o: ["Copernican vs Ptolemaic systems", "Newton vs Leibniz", "Bacon vs Descartes", "Aristotle vs Plato"], a: 0, e: "Galileo's Dialogue (1632) compared Copernican (heliocentric) and Ptolemaic (geocentric) systems, leading to his trial.", h: "Which two world systems did Galileo compare?", yr: "GST" },
      { q: "Francis Bacon is associated with:", o: ["Deductive logic", "Rationalism", "Empiricism and the inductive method", "Analytic geometry"], a: 2, e: "Bacon championed empiricism — knowledge from observation and experiment, not just reason or authority. His inductive method influenced Royal Society.", h: "Who promoted observation and experiment?", yr: "GST" },
      { q: "René Descartes is famous for all EXCEPT:", o: ["Cogito ergo sum", "Mind-body dualism", "Analytic geometry", "Universal gravitation"], a: 3, e: "Universal gravitation is Newton's work. Descartes contributed rationalism, dualism, and coordinate geometry.", h: "What did Descartes NOT do?", yr: "GST" },
      { q: "Newton's First Law of Motion is also called:", o: ["Law of universal gravitation", "Law of inertia", "Law of action-reaction", "Law of equal areas"], a: 1, e: "Newton's first law (inertia): objects remain at rest or in uniform motion unless acted by external force.", h: "What law says objects keep moving unless stopped?", yr: "GST" },
      { q: "Newton's universal law of gravitation states that gravitational force is:", o: ["Proportional to distance squared", "Inversely proportional to distance squared (F ∝ 1/r²)", "Constant regardless of distance", "Only affects large objects"], a: 1, e: "Gravitational force follows inverse-square law: F ∝ 1/r². Double the distance → quarter the force.", h: "How does gravity change with distance?", yr: "GST" },
      { q: "Which of the following was NOT discovered by Galileo?", o: ["Moons of Jupiter", "Phases of Venus", "Sunspots", "Laws of planetary motion (elliptical orbits)"], a: 3, e: "Kepler discovered elliptical orbits. Galileo discovered Jupiter's moons, Venus's phases, sunspots, mountains on moon.", h: "Which one was Kepler's?", yr: "GST" },
      { q: "The Principia Mathematica (1687) was written by:", o: ["Galileo", "Descartes", "Newton", "Kepler"], a: 2, e: "Newton's Philosophiae Naturalis Principia Mathematica is one of the most important scientific books ever written.", h: "Who wrote Principia?", yr: "GST" },
      { q: "Newton's second law of motion is expressed mathematically as:", o: ["E=mc²", "F=ma", "F=G·m₁·m₂/r²", "a²+b²=c²"], a: 1, e: "F=ma — force equals mass times acceleration. This law quantifies the relationship between force, mass, and motion.", h: "What is F=ma?", yr: "GST" },
      { q: "Galileo's conflict with the Catholic Church (1633) was primarily about:", o: ["His experimental method", "His support for Copernican heliocentrism", "His discovery of sunspots", "His work on pendulums"], a: 1, e: "Galileo was tried for heresy for supporting Copernican heliocentrism, which contradicted Church interpretation of Scripture.", h: "What did Galileo believe that the Church rejected?", yr: "GST" },
      { q: "Kepler's second law ('equal areas in equal times') implies that planets:", o: ["Move at constant speed", "Move faster when closer to Sun, slower when farther", "Move in perfect circles", "Never change speed"], a: 1, e: "Equal areas in equal times means planets sweep same area in same time — they move faster when nearer Sun, slower when farther.", h: "Do planets move at constant speed?", yr: "GST" },
      { q: "The Royal Society of London (founded 1660) was influenced by the philosophy of:", o: ["Descartes", "Bacon (collaborative, experimental science)", "Newton", "Kepler"], a: 1, e: "Bacon's vision of organized, collaborative, experimental science influenced the founding of the Royal Society, first scientific academy.", h: "Who influenced the Royal Society?", yr: "GST" },
      { q: "Descartes's 'Cogito ergo sum' means:", o: ["I think, therefore I am", "I doubt, therefore I exist", "I am, therefore I think", "Science is certain"], a: 0, e: "Cogito ergo sum (I think, therefore I am) was Descartes's indubitable foundation for knowledge after radical doubt.", h: "What does 'Cogito ergo sum' translate to?", yr: "GST" },
      { q: "Newton and Leibniz are both credited with inventing:", o: ["Telescope", "Calculus (independently)", "Microscope", "Barometer"], a: 1, e: "Newton and Leibniz independently developed calculus (differential and integral), leading to priority dispute.", h: "What math did Newton and Leibniz invent?", yr: "GST" },
      { q: "The phrase 'E pur si muove' ('And yet it moves') is attributed to:", o: ["Copernicus", "Kepler", "Galileo (allegedly after recanting)", "Newton"], a: 2, e: "According to legend, after forced recantation, Galileo muttered 'And yet it moves' — expressing his continued belief in Earth's motion.", h: "Who said 'And yet it moves'?", yr: "GST" },
      { q: "Which of the following was a problem with early Copernican theory?", o: ["It still used circular orbits (didn't fit data well)", "It was immediately accepted by everyone", "It used epicycles more than Ptolemy", "It had no mathematical basis"], a: 0, e: "Copernicus still used circular orbits, which didn't fit data accurately. Kepler's ellipses solved this problem.", h: "What shape did Copernicus still use?", yr: "GST" },
      { q: "Newton's third law of motion states:", o: ["F=ma", "For every action, there is an equal and opposite reaction", "Objects in motion stay in motion", "Force equals gravitational constant times mass product over distance squared"], a: 1, e: "Newton's third law: action-reaction. When object A exerts force on B, B exerts equal and opposite force on A.", h: "What is the action-reaction law?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 4: Philosophy of Science — Induction, Deduction, and Falsification
  // ==========================================================================
  {
    topic: "Philosophy of Science — Induction, Deduction, and Falsification",
    topicCode: "HPS-004-01",
    module: "Philosophy of Science",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Philosophy of science</span> examines the foundations, methods, and implications of science. It asks: How does science acquire knowledge? What distinguishes science from pseudoscience? How do scientific theories change over time? <strong>Understanding these questions helps you think critically about scientific claims</strong>.
</div>

<p class="learn-p">While scientists do science, philosophers of science reflect on what scientists are doing. Key questions include: Is there a "scientific method"? What justifies belief in scientific theories? Can science ever prove anything definitively? How should we respond when theories conflict with evidence? These questions have generated lively debates for centuries.</p>

<h3 class="learn-subheading">Deduction vs Induction</h3>

<p class="learn-p">Two fundamental modes of reasoning are central to science: deductive reasoning and inductive reasoning. They work differently and serve different purposes.</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Characteristic</th><th>Deduction</th><th>Induction</th>
    </thead>
    <tbody>
      <tr><td>Direction</th><td>General → Specific</th><td>Specific → General</th>
      </tr>
      <tr><td>Example</th><td>All humans are mortal. Socrates is human. Therefore, Socrates is mortal.</th><td>Swan 1 is white, swan 2 is white, swan 3 is white. Therefore, all swans are white.</th>
      </tr>
      <tr><td>Certainty</th>。<th>If premises true, conclusion necessarily true (valid deduction)</th>。<th>Conclusion probable, not certain (even if premises true)</th>
      </tr>
      <tr><td>Conclusion</th>。<th>Guaranteed by premises</th>。<th>Extends beyond premises</th>
      </tr>
      <tr><td>Use in science</th>。<th>Testing predictions, deriving consequences from theories</th>。<th>Forming generalizations from observations, hypothesis generation</th>
      </tr>
    </tbody>
  </table>
</div>

<p class="learn-p"><strong>Deduction in science:</strong> If theory T is true, then it predicts observation O. We test whether O occurs. Example: Newton's theory predicts planets move in ellipses. Telescopic observation confirms elliptical orbits.</p>

<p class="learn-p"><strong>Induction in science:</strong> From repeated observations, we infer general laws. All observed swans are white → All swans are white. But induction cannot guarantee truth — black swans discovered in Australia disproved the generalization. This is the "problem of induction" (David Hume).</p>

<h3 class="learn-subheading">The Problem of Induction (David Hume)</h3>

<p class="learn-p">David Hume (1711-1776) pointed out a fundamental problem: induction cannot be logically justified. No matter how many white swans we observe, we cannot logically prove that all swans are white. The future might not resemble the past. We assume nature is uniform (the laws of nature don't change), but we cannot prove this assumption without circular reasoning.</p>

<p class="learn-p"><strong>Hume's conclusion:</strong> Induction is based on habit or custom, not logic. We expect the sun to rise tomorrow because it has risen every day in the past — but this is psychological, not logical, certainty. This is not a practical problem for science (induction works well enough), but it is a philosophical challenge to claims of scientific certainty.</p>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="250" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🔍 DEDUCTION vs INDUCTION — Two Modes of Reasoning</text>
    
    <!-- Deduction Side -->
    <g>
      <rect x="15" y="45" width="225" height="190" rx="10" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <rect x="15" y="45" width="225" height="30" rx="10" fill="#3b82f6"/>
      <text x="127" y="66" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="800">📐 DEDUCTION</text>
      
      <text x="127" y="95" text-anchor="middle" font-size="8" fill="#1e3a8a">General → Specific</text>
      <text x="127" y="115" text-anchor="middle" font-size="8" fill="#1e3a8a">Example:</text>
      <text x="127" y="132" text-anchor="middle" font-size="7" fill="#1e3a8a">All humans are mortal.</text>
      <text x="127" y="147" text-anchor="middle" font-size="7" fill="#1e3a8a">Socrates is human.</text>
      <text x="127" y="162" text-anchor="middle" font-size="7" fill="#1e3a8a">Therefore, Socrates is mortal.</text>
      <text x="127" y="185" text-anchor="middle" font-size="8" fill="#1e3a8a">Conclusion: CERTAIN</text>
      <text x="127" y="202" text-anchor="middle" font-size="8" fill="#1e3a8a">(if premises true)</text>
      <text x="127" y="222" text-anchor="middle" font-size="7" fill="#64748b">Used for testing predictions</text>
    </g>
    
    <!-- Induction Side -->
    <g>
      <rect x="260" y="45" width="225" height="190" rx="10" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <rect x="260" y="45" width="225" height="30" rx="10" fill="#22c55e"/>
      <text x="372" y="66" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="800">🔎 INDUCTION</text>
      
      <text x="372" y="95" text-anchor="middle" font-size="8" fill="#166534">Specific → General</text>
      <text x="372" y="115" text-anchor="middle" font-size="8" fill="#166534">Example:</text>
      <text x="372" y="132" text-anchor="middle" font-size="7" fill="#166534">Swan 1 is white.</text>
      <text x="372" y="147" text-anchor="middle" font-size="7" fill="#166534">Swan 2 is white.</text>
      <text x="372" y="162" text-anchor="middle" font-size="7" fill="#166534">Therefore, all swans are white.</text>
      <text x="372" y="185" text-anchor="middle" font-size="8" fill="#166534">Conclusion: PROBABLE</text>
      <text x="372" y="202" text-anchor="middle" font-size="8" fill="#166534">(not certain)</text>
      <text x="372" y="222" text-anchor="middle" font-size="7" fill="#64748b">Used for forming generalizations</text>
    </g>
    
    <text x="250" y="245" text-anchor="middle" font-size="9" fill="#64748b">🔑 Deduction gives certainty; Induction gives probability (but is essential for science)</text>
  </svg>
</div>

<h3 class="learn-subheading">Karl Popper — Falsification as Demarcation Criterion</h3>

<p class="learn-p">Karl Popper (1902-1994) was frustrated by theories like Marxism and Freudian psychoanalysis, which seemed to explain everything and never risked refutation. He proposed a solution: the criterion for distinguishing science from pseudoscience is <strong>falsifiability</strong>.</p>

<p class="learn-p"><strong>Falsifiability:</strong> A theory is scientific only if it makes predictions that could potentially be proven false. Theories that are consistent with every possible observation (unfalsifiable) are not scientific — they explain nothing because they predict nothing.</p>

<p class="learn-p"><strong>Examples:</strong></p>
<ul class="learn-list">
  <li><strong>Falsifiable (scientific):</strong> "All swans are white." Finding one black swan falsifies it. Einstein's theory predicted light bending around sun; tested during 1919 eclipse.</li>
  <li><strong>Unfalsifiable (not scientific):</strong> "There exists an invisible, undetectable dragon in my garage." No possible observation could prove this false. Astrology (vague predictions that accommodate any outcome).</li>
</ul>

<p class="learn-p"><strong>Popper's model of scientific progress:</strong> Science proceeds by <strong>conjectures and refutations</strong>. Scientists propose bold, falsifiable theories (conjectures), then attempt to falsify them through rigorous testing. Theories that survive repeated attempts at falsification are "corroborated" (not proven true). When a theory is falsified, scientists must abandon it and propose a better theory. This process explains why science is progressive — it discards false theories.</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Thinker:</strong> Karl Popper, "The Logic of Scientific Discovery" (1934), "Conjectures and Refutations" (1963). He argued that no number of confirming observations can prove a theory true, but a single disconfirming observation can prove it false. Science progresses not by verification but by falsification.</span>
</div>

<h3 class="learn-subheading">Thomas Kuhn — Paradigms and Scientific Revolutions</h3>

<p class="learn-p">Thomas Kuhn (1922-1996) challenged Popper's rational, cumulative picture of science. His book "The Structure of Scientific Revolutions" (1962) introduced concepts that transformed our understanding of scientific change.</p>

<p class="learn-p"><strong>Paradigm:</strong> A shared framework of assumptions, methods, values, and exemplary problems that guides research in a scientific community at a given time. Examples: Ptolemaic astronomy, Newtonian physics, Einsteinian relativity, Darwinian evolution.</p>

<p class="learn-p"><strong>Normal science:</strong> Puzzle-solving within a paradigm. Scientists work on problems the paradigm defines as important, using methods the paradigm provides. They do not question the paradigm itself. Most scientists spend most of their careers in normal science.</p>

<p class="learn-p"><strong>Anomaly:</strong> A problem that cannot be solved within the paradigm. Accumulating anomalies create crisis.</p>

<p class="learn-p"><strong>Scientific revolution (paradigm shift):</strong> When anomalies become severe, a new paradigm emerges that resolves them. But the new paradigm is incommensurable with the old — different concepts, methods, standards. Example: Copernican Revolution replaced geocentrism with heliocentrism. Not a simple accumulation of knowledge — a transformation in worldview.</p>

<p class="learn-p"><strong>Key implications of Kuhn:</strong></p>
<ul class="learn-list">
  <li>Science is not purely rational or cumulative — paradigm shifts involve gestalt switches (seeing the world differently)</li>
  <li>Observation is theory-laden — what scientists see depends on their paradigm</li>
  <li>Progress occurs, but not by simple falsification (scientists don't abandon paradigms when anomalies appear — they try to explain them away)</li>
  <li>Different paradigms are incommensurable — cannot be directly compared because they use different concepts</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Thinker:</strong> Thomas Kuhn's "Structure of Scientific Revolutions" (1962) is one of the most cited academic books of the 20th century. It introduced "paradigm shift" into popular vocabulary.</span>
</div>

<h3 class="learn-subheading">Imre Lakatos — Research Programmes</h3>

<p class="learn-p">Imre Lakatos (1922-1974) tried to reconcile Popper and Kuhn. He proposed that science consists of <strong>research programmes</strong>, not isolated theories.</p>

<p class="learn-p"><strong>Hard core:</strong> Fundamental assumptions that define the programme and are not abandoned (similar to paradigm).</p>
<p class="learn-p"><strong>Protective belt:</strong> Auxiliary hypotheses that can be modified to protect the hard core from falsification.</p>
<p class="learn-p"><strong>Positive heuristic:</strong> Guidelines for developing the programme, suggesting new avenues of research.</p>

<p class="learn-p"><strong>Progressive vs degenerative problem shifts:</strong></p>
<ul class="learn-list">
  <li><strong>Progressive:</strong> Programme predicts novel, surprising facts (successful). Example: Newtonian physics predicting existence of Neptune before observation.</li>
  <li><strong>Degenerative:</strong> Programme only accommodates facts after they are discovered, with ad hoc modifications. Should eventually be abandoned.</li>
</ul>

<p class="learn-p">Lakatos argued that falsification takes time — scientists should not abandon a programme just because it encounters anomalies. But a persistently degenerative programme should be replaced.</p>

<h3 class="learn-subheading">Paul Feyerabend — Epistemological Anarchism</h3>

<p class="learn-p">Paul Feyerabend (1924-1994) was the "bad boy" of philosophy of science. His book "Against Method" (1975) argued that there is no single scientific method — anything goes.</p>

<p class="learn-p"><strong>Key claims:</strong></p>
<ul class="learn-list">
  <li>No universal methodological rules — history shows successful science violates every proposed rule</li>
  <li>Proliferation of theories is good — even unscientific theories should be allowed to compete</li>
  <li>Science is not superior to other ways of knowing — it has no special claim to rationality or truth</li>
  <li>Science can be dogmatic, oppressive, and should be separated from state (like church)</li>
</ul>

<p class="learn-p">Feyerabend is controversial but raises important questions: Is science really as rational as it claims? Do we overvalue scientific knowledge relative to other forms of knowledge?</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>GST Exam Tip:</strong> Distinguish between Popper, Kuhn, and Feyerabend: Popper says science progresses by falsification; Kuhn says by paradigm shifts; Feyerabend says there is no method — anything goes. Questions often ask you to apply these views to historical episodes (e.g., Copernican Revolution as paradigm shift).</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Compare Popper's falsificationism with Kuhn's paradigm shifts. Which better describes how science actually works?" (Sample answer: Popper emphasizes rational testing and falsification — scientists should try to disprove theories. Kuhn emphasizes normal science (puzzle-solving within paradigms) and revolutionary paradigm shifts when anomalies accumulate. Popper's model fits some episodes (testing predictions), but Kuhn's fits others (scientists resist abandoning paradigms, explaining away anomalies). Most historians of science favor a nuanced combination — science has both cumulative and revolutionary aspects.)</span>
</div>
    `,
    questions: [
      { q: "Deductive reasoning moves from:", o: ["General to specific", "Specific to general", "Cause to effect", "Effect to cause"], a: 0, e: "Deduction reasons from general premises to specific conclusions. Example: All humans are mortal (general); Socrates is human; therefore Socrates is mortal (specific).", h: "What direction does deduction go?", yr: "GST" },
      { q: "Which of the following is an example of inductive reasoning?", o: ["If all humans are mortal and Socrates is human, then Socrates is mortal", "Swan 1 is white, swan 2 is white, swan 3 is white — therefore all swans are white", "If it rains, the ground gets wet. The ground is wet, therefore it rained", "Either it is raining or it is not raining"], a: 1, e: "Induction moves from specific observations to general conclusions. Observing many white swans and concluding all swans are white is induction.", h: "What type of reasoning goes from specific to general?", yr: "GST" },
      { q: "David Hume's 'problem of induction' points out that:", o: ["Induction is logically certain", "Induction cannot be logically justified — the future may not resemble the past", "Deduction is unreliable", "All knowledge is impossible"], a: 1, e: "Hume argued we cannot logically prove induction works; we assume the future resembles the past, but cannot justify this without circular reasoning.", h: "What is the problem with induction?", yr: "GST" },
      { q: "According to Karl Popper, the criterion for distinguishing science from pseudoscience is:", o: ["Verifiability", "Falsifiability", "Popularity", "Complexity"], a: 1, e: "Popper proposed falsifiability as the demarcation criterion — scientific theories must be testable and potentially disprovable.", h: "What must a theory do to be scientific according to Popper?", yr: "GST" },
      { q: "Which of the following statements is falsifiable (therefore scientific according to Popper)?", o: ["There exists an invisible, undetectable dragon in my garage", "All swans are white", "This statement has no meaning", "Something exists"], a: 1, e: "'All swans are white' is falsifiable — finding one black swan disproves it. The invisible dragon claim is unfalsifiable (no observation could disprove it).", h: "Which could be proven wrong?", yr: "GST" },
      { q: "Thomas Kuhn introduced which concept to describe revolutionary scientific change?", o: ["Falsification", "Paradigm shift", "Research programme", "Anarchist epistemology"], a: 1, e: "Kuhn's 'paradigm shift' describes scientific revolutions where one paradigm replaces another (e.g., Copernican Revolution).", h: "What term describes major scientific revolutions?", yr: "GST" },
      { q: "In Kuhn's model, 'normal science' refers to:", o: ["Revolutionary periods when paradigms change", "Puzzle-solving within an existing paradigm", "Pseudoscience", "The earliest stage of science"], a: 1, e: "Normal science is the everyday work of scientists solving puzzles within their paradigm — not questioning the paradigm itself.", h: "What do most scientists do most of the time?", yr: "GST" },
      { q: "According to Kuhn, anomalies are:", o: ["Problems solved within the paradigm", "Problems that cannot be solved within the existing paradigm", "Successful predictions", "Theories that are always true"], a: 1, e: "Anomalies are problems the paradigm cannot solve. Accumulating anomalies create crisis leading to paradigm shift.", h: "What causes a paradigm crisis?", yr: "GST" },
      { q: "Imre Lakatos proposed that science consists of:", o: ["Paradigms", "Research programmes with hard core and protective belt", "Falsifiable statements", "Anarchic methods"], a: 1, e: "Lakatos's research programmes have a 'hard core' (fundamental assumptions) and 'protective belt' (auxiliary hypotheses that can be modified).", h: "What did Lakatos call scientific frameworks?", yr: "GST" },
      { q: "Paul Feyerabend's famous slogan is:", o: ["Falsification is key", "Paradigm shifts explain science", "Anything goes", "Science is superior to all other knowledge"], a: 2, e: "Feyerabend's 'Against Method' argued there is no single scientific method — 'anything goes' — and science has no special claim to rationality.", h: "What is Feyerabend's controversial slogan?", yr: "GST" },
      { q: "A 'progressive' research programme (Lakatos) is one that:", o: ["Only explains past facts", "Predicts novel, surprising facts", "Never changes", "Rejects all criticism"], a: 1, e: "Progressive programmes predict new facts (e.g., Newtonian physics predicting Neptune's existence before observation). Degenerative programmes only accommodate facts after discovery.", h: "What makes a research programme progressive?", yr: "GST" },
      { q: "Which philosopher argued that no number of confirming observations can prove a theory true, but one disconfirming observation can prove it false?", o: ["Kuhn", "Popper", "Lakatos", "Feyerabend"], a: 1, e: "Popper's falsificationism: confirmation never proves truth; falsification can prove falsehood. Science progresses by conjectures and refutations.", h: "Who said falsification is key?", yr: "GST" },
      { q: "The concept of 'theory-laden observation' (observations are affected by theoretical assumptions) is associated with:", o: ["Popper", "Kuhn", "Hume", "Feyerabend"], a: 1, e: "Kuhn argued observation is theory-laden — what scientists 'see' depends on their paradigm. Different paradigms see the world differently.", h: "Who said observation isn't neutral?", yr: "GST" },
      { q: "According to Popper, when a theory is falsified, scientists should:", o: ["Ignore the falsification", "Modify the theory ad hoc", "Abandon it and propose a better theory", "Declare it true anyway"], a: 2, e: "Popper argued that when a theory is falsified, it must be abandoned. Science progresses by eliminating false theories.", h: "What should happen to falsified theories?", yr: "GST" },
      { q: "The discovery of black swans in Australia is an example of:", o: ["Deduction", "Falsification of 'all swans are white'", "Paradigm shift", "Problem of deduction"], a: 1, e: "The statement 'all swans are white' was falsified by finding a single black swan — example of Popperian falsification.", h: "What does a black swan disprove?", yr: "GST" },
      { q: "In Kuhn's model, a 'crisis' occurs when:", o: ["Too many anomalies accumulate that the paradigm cannot solve", "The paradigm is confirmed", "Scientists agree on everything", "No anomalies exist"], a: 0, e: "Crisis occurs when anomalies accumulate to the point that the paradigm is questioned, leading to scientific revolution.", h: "What leads to paradigm shift?", yr: "GST" },
      { q: "Which philosopher is known for 'epistemological anarchism'?", o: ["Popper", "Kuhn", "Lakatos", "Feyerabend"], a: 3, e: "Feyerabend argued 'anything goes' — no single scientific method, science not superior to other ways of knowing. 'Epistemological anarchism' is his term.", h: "Who said 'anything goes'?", yr: "GST" },
      { q: "The Copernican Revolution (geocentrism → heliocentrism) is an example of:", o: ["Normal science", "Falsification", "Paradigm shift (Kuhn)", "Deduction"], a: 2, e: "The shift from Ptolemaic (Earth-centered) to Copernican (Sun-centered) astronomy is Kuhn's classic example of a paradigm shift.", h: "What type of change was Copernicus?", yr: "GST" },
      { q: "According to Popper, a theory that explains all possible observations equally well is:", o: ["Very scientific", "Highly confirmed", "Unfalsifiable and therefore not scientific", "The best kind of theory"], a: 2, e: "Popper argued that theories consistent with every possible observation are unfalsifiable and thus not scientific. Science requires risk — predictions that could be wrong.", h: "What's wrong with theories that explain everything?", yr: "GST" },
      { q: "What does 'incommensurability' mean in Kuhn's philosophy?", o: ["Theories can be directly compared", "Different paradigms cannot be directly compared because they use different concepts and standards", "All theories are equally good", "Science never changes"], a: 1, e: "Incommensurability means paradigms are not directly comparable — they have different concepts, problems, methods, and standards of evaluation.", h: "Can different paradigms be easily compared?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 5: Major Scientific Discoveries in Physics
  // ==========================================================================
  {
    topic: "Major Scientific Discoveries in Physics",
    topicCode: "HPS-005-01",
    module: "History of Science",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Physics</span> has undergone dramatic revolutions in the past 500 years. From Newton's laws of motion to Einstein's relativity to quantum mechanics, each breakthrough transformed our understanding of space, time, matter, and energy. <strong>These discoveries not only changed physics but reshaped philosophy and culture</strong>.
</div>

<p class="learn-p">The history of physics is a story of successive approximations. Newton's physics works for everyday objects moving at everyday speeds. Einstein's relativity works for very fast objects or very strong gravity. Quantum mechanics works for very small objects. Each new theory doesn't completely replace the old — it shows the old theory's domain of applicability.</p>

<h3 class="learn-subheading">Newtonian Mechanics (1687)</h3>

<p class="learn-p">Isaac Newton's <em>Principia Mathematica</em> (1687) established the framework that dominated physics for over 200 years.</p>

<p class="learn-p"><strong>Core principles:</strong></p>
<ul class="learn-list">
  <li>Three laws of motion: inertia (F=ma), action-reaction</li>
  <li>Universal gravitation: F = G·m₁·m₂/r²</li>
  <li>Absolute space and time: space and time are fixed, independent backgrounds</li>
  <li>Determinism: given initial conditions, future is completely determined by laws of motion</li>
</ul>

<p class="learn-p"><strong>Successes:</strong> Explained planetary orbits, tides, projectile motion, pendulum clocks. Predicted existence of Neptune (1846, by Leverrier and Adams).</p>

<p class="learn-p"><strong>Limitations:</strong> Fails at very high speeds (approaching speed of light), very strong gravity (black holes), very small scales (atoms). Superseded by relativity and quantum mechanics.</p>

<h3 class="learn-subheading">Thermodynamics and the Laws of Energy (19th Century)</h3>

<p class="learn-p">Thermodynamics studies heat, work, temperature, and energy. Key developments:</p>

<ul class="learn-list">
  <li><strong>Zeroth Law:</strong> If two systems are in thermal equilibrium with a third, they are in equilibrium with each other (defines temperature)</li>
  <li><strong>First Law (Joule, Mayer, Helmholtz):</strong> Energy cannot be created or destroyed — only converted from one form to another (conservation of energy). Heat is a form of energy.</li>
  <li><strong>Second Law (Carnot, Clausius, Kelvin):</strong> Entropy (disorder) of an isolated system always increases. Heat cannot spontaneously flow from cold to hot.</li>
  <li><strong>Third Law (Nernst):</strong> As temperature approaches absolute zero, entropy approaches a minimum (can't reach absolute zero).</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Implication:</strong> The second law of thermodynamics (entropy increases) is often called "time's arrow" — it explains why time has a direction. Past low entropy → future high entropy. This is one of the few fundamental laws that distinguishes past from future.</span>
</div>

<h3 class="learn-subheading">Electromagnetism — Faraday, Maxwell, and the Unification of Forces</h3>

<p class="learn-p">In the 19th century, electricity and magnetism were unified into a single theory of electromagnetism.</p>

<p class="learn-p"><strong>Michael Faraday (1791-1867):</strong> Experimental genius. Discovered electromagnetic induction (moving magnet induces current) — basis for electric generators and transformers. Introduced concept of "fields" (invisible lines of force).</p>

<p class="learn-p"><strong>James Clerk Maxwell (1831-1879):</strong> Unified electricity, magnetism, and light into a single set of equations (Maxwell's equations). Predicted electromagnetic waves traveling at speed of light — therefore light itself is an electromagnetic wave. His equations predicted the existence of radio waves (later discovered by Hertz).</p>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">⚡ PROGRESS IN PHYSICS — From Newton to Einstein to Quantum</text>
    
    <rect x="15" y="45" width="140" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="85" y="63" text-anchor="middle" font-size="9" fill="#1e3a8a" font-weight="800">NEWTON</text>
    <text x="85" y="78" text-anchor="middle" font-size="7" fill="#1e3a8a">1687</text>
    <text x="85" y="93" text-anchor="middle" font-size="7" fill="#1e3a8a">Laws of motion + Gravity</text>
    <text x="85" y="100" text-anchor="middle" font-size="6" fill="#94a3b8">Absolute space/time</text>
    
    <line x1="155" y1="75" x2="175" y2="75" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowP1)"/>
    
    <rect x="180" y="45" width="140" height="60" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
    <text x="250" y="63" text-anchor="middle" font-size="9" fill="#166534" font-weight="800">MAXWELL</text>
    <text x="250" y="78" text-anchor="middle" font-size="7" fill="#166534">1865</text>
    <text x="250" y="93" text-anchor="middle" font-size="7" fill="#166534">Electromagnetism</text>
    <text x="250" y="100" text-anchor="middle" font-size="6" fill="#94a3b8">Light as EM wave</text>
    
    <line x1="320" y1="75" x2="340" y2="75" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowP1)"/>
    
    <rect x="345" y="45" width="140" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="415" y="63" text-anchor="middle" font-size="9" fill="#92400e" font-weight="800">EINSTEIN</text>
    <text x="415" y="78" text-anchor="middle" font-size="7" fill="#92400e">1905, 1915</text>
    <text x="415" y="93" text-anchor="middle" font-size="7" fill="#92400e">Relativity</text>
    <text x="415" y="100" text-anchor="middle" font-size="6" fill="#94a3b8">Spacetime, E=mc²</text>
    
    <rect x="180" y="125" width="140" height="60" rx="8" fill="#fce7f3" stroke="#ec4899" stroke-width="1.5"/>
    <text x="250" y="143" text-anchor="middle" font-size="9" fill="#831843" font-weight="800">QUANTUM</text>
    <text x="250" y="158" text-anchor="middle" font-size="7" fill="#831843">Planck, Bohr, Heisenberg</text>
    <text x="250" y="173" text-anchor="middle" font-size="7" fill="#831843">Wave-particle duality</text>
    <text x="250" y="180" text-anchor="middle" font-size="6" fill="#94a3b8">Probability, uncertainty</text>
    
    <line x1="250" y1="105" x2="250" y2="125" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowP1)"/>
    
    <defs>
      <marker id="arrowP1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6"/>
      </marker>
    </defs>
    
    <text x="250" y="195" text-anchor="middle" font-size="9" fill="#64748b">🔑 Each revolution expanded our understanding of the physical world</text>
  </svg>
</div>

<h3 class="learn-subheading">Special Relativity — Einstein (1905)</h3>

<p class="learn-p">Albert Einstein's 1905 paper "On the Electrodynamics of Moving Bodies" revolutionized our understanding of space, time, and motion.</p>

<p class="learn-p"><strong>Two postulates:</strong></p>
<ol class="learn-list learn-ordered">
  <li><strong>Principle of relativity:</strong> The laws of physics are the same in all inertial (non-accelerating) reference frames. No absolute rest frame.</li>
  <li><strong>Constancy of speed of light:</strong> The speed of light in vacuum (c = 299,792,458 m/s) is constant in all reference frames, regardless of source or observer motion.</li>
</ol>

<p class="learn-p"><strong>Counterintuitive consequences:</strong></p>
<ul class="learn-list">
  <li><strong>Time dilation:</strong> Moving clocks run slow. A clock on a fast spaceship ticks slower relative to stationary observer.</li>
  <li><strong>Length contraction:</strong> Moving objects shorten in direction of motion.</li>
  <li><strong>Relativity of simultaneity:</strong> Two events simultaneous in one frame may not be simultaneous in another.</li>
  <li><strong>E=mc² (mass-energy equivalence):</strong> Mass and energy are interchangeable. Small amount of mass = enormous energy (explains nuclear energy).</li>
</ul>

<p class="learn-p"><strong>Famous example (twin paradox):</strong> Twin travels near speed of light and returns younger than stay-at-home twin — time dilation is real, not illusion.</p>

<h3 class="learn-subheading">General Relativity — Einstein (1915)</h3>

<p class="learn-p">General relativity extends special relativity to include acceleration and gravity. Revolutionary idea: gravity is not a force but curvature of spacetime caused by mass and energy.</p>

<p class="learn-p"><strong>Key predictions confirmed:</strong></p>
<ul class="learn-list">
  <li><strong>Bending of light by gravity:</strong> Eddington's 1919 eclipse expedition measured light bending around sun — made Einstein famous worldwide.</li>
  <li><strong>Perihelion precession of Mercury:</strong> Newtonian gravity couldn't fully explain Mercury's orbit; general relativity matched observations perfectly.</li>
  <li><strong>Gravitational time dilation:</strong> Clocks run slower in stronger gravity (must correct for GPS satellites).</li>
  <li><strong>Gravitational waves:</strong> Ripples in spacetime predicted by Einstein, directly detected by LIGO (2015) — Nobel Prize 2017.</li>
  <li><strong>Black holes:</strong> Predicted by general relativity — regions where gravity so strong nothing (not even light) escapes. First image captured 2019.</li>
</ul>

<h3 class="learn-subheading">Quantum Mechanics — The Physics of the Very Small</h3>

<p class="learn-p">Quantum mechanics emerged in early 20th century to explain phenomena that classical physics could not: behavior of atoms, molecules, light, and subatomic particles. It is famously counterintuitive.</p>

<p class="learn-p"><strong>Key figures and discoveries:</strong></p>
<ul class="learn-list">
  <li><strong>Max Planck (1900):</strong> Energy is quantized — comes in discrete packets (quanta). Proposed to explain blackbody radiation. Birth of quantum theory.</li>
  <li><strong>Niels Bohr (1913):</strong> Model of atom — electrons occupy discrete energy levels, jump between levels emitting or absorbing photons.</li>
  <li><strong>Louis de Broglie (1924):</strong> Wave-particle duality — particles (like electrons) also behave as waves.</li>
  <li><strong>Werner Heisenberg (1927):</strong> Uncertainty principle — cannot simultaneously know a particle's exact position and momentum. The more precisely you know one, the less precisely you know the other.</li>
  <li><strong>Erwin Schrödinger (1926):</strong> Wave equation describes quantum systems (Schrödinger equation). His famous "cat" thought experiment illustrates quantum weirdness.</li>
  <li><strong>Max Born:</strong> Probability interpretation — quantum mechanics describes probabilities, not certainties.</li>
</ul>

<p class="learn-p"><strong>Counterintuitive quantum phenomena:</strong></p>
<ul class="learn-list">
  <li><strong>Wave-particle duality:</strong> Electrons and photons behave as both waves and particles depending on how measured.</li>
  <li><strong>Superposition:</strong> Particles can exist in multiple states simultaneously until measured (Schrödinger's cat both dead and alive).</li>
  <li><strong>Quantum entanglement:</strong> Particles can be correlated such that measuring one instantly affects the other, even across universe — "spooky action at a distance" (Einstein).</li>
  <li><strong>Observer effect:</strong> Measuring a quantum system inevitably changes it — can't observe without disturbing.</li>
</ul>

<p class="learn-p"><strong>Technological applications:</strong> Lasers, transistors, microchips, LEDs, MRI, GPS (corrected for relativity too), quantum computing (emerging).</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Thinker:</strong> Albert Einstein (1879-1955) — Nobel Prize 1921 for photoelectric effect (quantum). Ironically, he never accepted quantum mechanics' probabilistic nature: "God does not play dice with the universe." Yet his work on relativity transformed physics and he contributed to quantum theory's foundations.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Explain the difference between special relativity and general relativity." (Sample answer: Special relativity (1905) deals with motion at constant velocity in absence of gravity — consequences: time dilation, length contraction, E=mc². General relativity (1915) incorporates acceleration and gravity — gravity is curvature of spacetime. Predictions: light bending, black holes, gravitational waves, Mercury's orbit.)</span>
</div>
    `,
    questions: [
      { q: "Newton's law of universal gravitation states that gravitational force is:", o: ["F = ma", "F = G·m₁·m₂/r²", "E = mc²", "F = q·E"], a: 1, e: "Newton's gravitational law: force equals gravitational constant times product of masses divided by distance squared.", h: "Which formula describes gravity?", yr: "GST" },
      { q: "Which law of thermodynamics states that energy cannot be created or destroyed?", o: ["Zeroth Law", "First Law", "Second Law", "Third Law"], a: 1, e: "First Law of Thermodynamics: conservation of energy. Energy can be converted from one form to another but total remains constant.", h: "Which law is about conservation of energy?", yr: "GST" },
      { q: "The Second Law of Thermodynamics states that:", o: ["Energy is conserved", "Entropy (disorder) of an isolated system always increases", "Absolute zero is unattainable", "Heat flows from cold to hot"], a: 1, e: "Second Law: entropy increases over time — explains why time has direction (time's arrow).", h: "Which law says disorder increases?", yr: "GST" },
      { q: "James Clerk Maxwell is known for:", o: ["Discovering radioactivity", "Unifying electricity, magnetism, and light into electromagnetism", "Discovering the electron", "Developing quantum mechanics"], a: 1, e: "Maxwell's equations unified electricity, magnetism, and light — showing light is an electromagnetic wave.", h: "Who unified electricity and magnetism?", yr: "GST" },
      { q: "The two postulates of special relativity are:", o: ["Absolute space and absolute time", "Principle of relativity (laws same in all inertial frames) and constancy of speed of light", "Gravity is a force and space is flat", "Entropy always increases and energy is conserved"], a: 1, e: "Special relativity's postulates: (1) laws same in all inertial frames; (2) speed of light constant in all frames.", h: "What are Einstein's two postulates?", yr: "GST" },
      { q: "Time dilation in special relativity means:", o: ["Time always moves faster", "Moving clocks run slow relative to stationary observers", "Time doesn't exist", "Everyone experiences time the same"], a: 1, e: "Time dilation: moving clocks tick slower. Twin paradox — traveling twin ages less than stay-at-home twin.", h: "How does motion affect time?", yr: "GST" },
      { q: "Einstein's famous equation E=mc² expresses:", o: ["Kinetic energy", "Mass-energy equivalence — mass can be converted to energy", "Potential energy", "Thermal energy"], a: 1, e: "E=mc² shows mass and energy are interchangeable. Small amount of mass = enormous energy (explains nuclear reactions).", h: "What is E=mc²?", yr: "GST" },
      { q: "General relativity explains gravity as:", o: ["A force acting at a distance", "Curvature of spacetime caused by mass and energy", "Exchange of graviton particles", "Electromagnetic effect"], a: 1, e: "Einstein's general relativity: gravity is not a force but curvature of spacetime. Mass tells spacetime how to curve; curved spacetime tells mass how to move.", h: "What is gravity according to Einstein?", yr: "GST" },
      { q: "Which 1919 experiment made Einstein world-famous?", o: ["Discovery of radioactivity", "Eddington's eclipse expedition confirming light bending by sun's gravity", "Discovery of the electron", "Splitting the atom"], a: 1, e: "Eddington's 1919 eclipse measured starlight bending around sun, confirming general relativity — Einstein became international celebrity.", h: "What proved Einstein's theory?", yr: "GST" },
      { q: "Quantum mechanics is primarily concerned with:", o: ["Very large objects (galaxies)", "Very fast objects (near light speed)", "Very small objects (atoms, particles)", "Everyday objects"], a: 2, e: "Quantum mechanics describes behavior of atoms, molecules, and subatomic particles — very small scale.", h: "What scale does quantum mechanics describe?", yr: "GST" },
      { q: "Heisenberg's uncertainty principle states:", o: ["Position and momentum cannot both be precisely known simultaneously", "Energy is conserved", "Entropy always increases", "Light behaves as a wave"], a: 0, e: "Uncertainty principle: Δx·Δp ≥ ħ/2 — cannot simultaneously know exact position and momentum. More precise one → less precise other.", h: "What cannot be simultaneously known?", yr: "GST" },
      { q: "Wave-particle duality means:", o: ["Only light behaves as a wave", "Only electrons behave as particles", "Particles (like electrons) also behave as waves", "Waves are only mathematical"], a: 2, e: "Wave-particle duality: entities like electrons and photons exhibit both wave-like and particle-like properties depending on measurement.", h: "What has both wave and particle properties?", yr: "GST" },
      { q: "Gravitational waves were first directly detected in:", o: ["1919", "1969", "2015 (LIGO)", "2020"], a: 2, e: "LIGO detected gravitational waves from merging black holes in 2015, confirming Einstein's 1915 prediction. Nobel Prize 2017.", h: "When were gravitational waves detected?", yr: "GST" },
      { q: "Which quantum phenomenon did Einstein call 'spooky action at a distance'?", o: ["Wave-particle duality", "Uncertainty principle", "Quantum entanglement", "Superposition"], a: 2, e: "Entanglement: measuring one particle instantly affects another regardless of distance. Einstein found it troubling ('spooky').", h: "What did Einstein find 'spooky'?", yr: "GST" },
      { q: "Max Planck is credited with:", o: ["Theory of relativity", "Quantum theory — proposing energy is quantized (quanta)", "Wave equation", "Uncertainty principle"], a: 1, e: "Planck (1900) proposed energy is quantized to explain blackbody radiation — often considered birth of quantum theory.", h: "Who started quantum theory?", yr: "GST" },
      { q: "Schrödinger's cat thought experiment illustrates:", o: ["General relativity", "Quantum superposition — cat both dead and alive until observed", "Thermodynamics", "Electromagnetism"], a: 1, e: "Schrödinger's cat is both dead and alive (superposition) until opened/observed — highlighting quantum weirdness.", h: "What is the cat?", yr: "GST" },
      { q: "Niels Bohr's model of the atom proposed:", o: ["Electrons orbit nucleus in fixed energy levels", "Electrons are waves", "Nucleus contains protons and neutrons", "Atoms are indivisible"], a: 0, e: "Bohr model (1913): electrons occupy discrete energy levels; jumping levels emits/absorbs photons. Explained hydrogen spectrum.", h: "How do electrons behave in Bohr's atom?", yr: "GST" },
      { q: "Einstein received his Nobel Prize for:", o: ["Special relativity", "General relativity", "Photoelectric effect (quantum)", "E=mc²"], a: 2, e: "Einstein's 1921 Nobel Prize was for explaining photoelectric effect (light as particles/photons) — not relativity.", h: "What did Einstein win Nobel for?", yr: "GST" },
      { q: "A black hole is:", o: ["A hole in space", "A region where gravity is so strong nothing (not even light) escapes", "A dark star", "A galaxy center"], a: 1, e: "Black hole: spacetime region with gravity so intense that escape velocity exceeds light speed. First image captured 2019.", h: "What is a black hole?", yr: "GST" },
      { q: "GPS satellites must correct for both special and general relativity because:", o: ["They are not accurate", "Relativity is wrong", "Satellite motion (special) and weaker gravity (general) affect time — without corrections, GPS would be off by kilometers per day", "GPS doesn't use relativity"], a: 2, e: "GPS corrects for time dilation (special) and gravitational time dilation (general). Without corrections, GPS errors would accumulate rapidly.", h: "Why does GPS need relativity?", yr: "GST" }
    ]
  },
  // ============================================================================
// HISTORY AND PHILOSOPHY OF SCIENCE — PART 3 OF 4
// Continuing GST_LEARN_GST_HISTORY array from Part 2
// TOPICS 6, 7, 8
// ============================================================================

  // ==========================================================================
  // TOPIC 6: Major Scientific Discoveries — Chemistry and Biology
  // ==========================================================================
  {
    topic: "Major Scientific Discoveries — Chemistry and Biology",
    topicCode: "HPS-006-01",
    module: "History of Science",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Chemistry and biology</span> have undergone transformative revolutions that changed our understanding of matter and life. From the periodic table to DNA, from cells to evolution, these discoveries have reshaped medicine, agriculture, and our conception of humanity's place in nature. <strong>Understanding these breakthroughs illuminates the power and scope of scientific inquiry</strong>.
</div>

<p class="learn-p">While physics often gets attention for its revolutionary theories, chemistry and biology have produced equally profound insights. The discovery that all matter is composed of elements organized in the periodic table, that living things are made of cells, that species evolve through natural selection, and that heredity is coded in DNA — these are among humanity's greatest intellectual achievements.</p>

<h3 class="learn-subheading">The Chemical Revolution — Lavoisier and the Periodic Table</h3>

<p class="learn-p">Modern chemistry emerged in the late 18th century, primarily through the work of Antoine Lavoisier (1743-1794), often called the "father of modern chemistry."</p>

<p class="learn-p"><strong>Lavoisier's key contributions:</strong></p>
<ul class="learn-list">
  <li><strong>Law of conservation of mass:</strong> In chemical reactions, matter is neither created nor destroyed. Total mass remains constant. This transformed chemistry from qualitative to quantitative.</li>
  <li><strong>Disproved phlogiston theory:</strong> The prevailing theory claimed combustible materials contained "phlogiston" released during burning. Lavoisier showed combustion requires oxygen (which he named) and that metals gain mass (not lose) when calcined.</li>
  <li><strong>Identified oxygen and hydrogen:</strong> Showed water is compound of hydrogen and oxygen, not an element.</li>
  <li><strong>Systematic nomenclature:</strong> Created systematic naming system for chemical compounds, replacing alchemical jargon.</li>
</ul>

<p class="learn-p"><strong>John Dalton (1766-1844) — Atomic Theory:</strong></p>
<ul class="learn-list">
  <li>Proposed that all matter consists of indivisible atoms</li>
  <li>Atoms of given element identical; different elements have different atoms</li>
  <li>Chemical compounds form when atoms combine in simple whole-number ratios</li>
  <li>Atomic theory explained laws of definite and multiple proportions</li>
</ul>

<p class="learn-p"><strong>Dmitri Mendeleev (1834-1907) — Periodic Table:</strong></p>
<ul class="learn-list">
  <li>Arranged elements by atomic weight and chemical properties</li>
  <li>Noticed periodic patterns — properties repeat at regular intervals</li>
  <li><strong>Predicted undiscovered elements</strong> (gallium, germanium, scandium) — left gaps and predicted their properties. When discovered later, matched predictions perfectly — dramatic confirmation of periodic law.</li>
  <li>Modern periodic table organizes by atomic number (protons), not weight, but Mendeleev's insight remains foundational.</li>
</ul>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="280" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">⚗️ CHEMISTRY'S KEY DISCOVERIES</text>
    
    <g>
      <rect x="15" y="45" width="145" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="87" y="63" text-anchor="middle" font-size="9" fill="#1e3a8a" font-weight="800">LAVOISIER</text>
      <text x="87" y="78" text-anchor="middle" font-size="7" fill="#1e3a8a">Law of conservation of mass</text>
      <text x="87" y="93" text-anchor="middle" font-size="7" fill="#1e3a8a">Identified oxygen, hydrogen</text>
      <circle cx="15" cy="55" r="4" fill="#3b82f6">
        <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
      </circle>
    </g>
    
    <line x1="160" y1="75" x2="180" y2="75" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowC1)"/>
    
    <g>
      <rect x="183" y="45" width="145" height="60" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <text x="255" y="63" text-anchor="middle" font-size="9" fill="#166534" font-weight="800">DALTON</text>
      <text x="255" y="78" text-anchor="middle" font-size="7" fill="#166534">Atomic theory</text>
      <text x="255" y="93" text-anchor="middle" font-size="7" fill="#166534">Atoms combine in whole ratios</text>
    </g>
    
    <line x1="328" y1="75" x2="348" y2="75" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowC1)"/>
    
    <g>
      <rect x="351" y="45" width="135" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="418" y="63" text-anchor="middle" font-size="9" fill="#92400e" font-weight="800">MENDELEEV</text>
      <text x="418" y="78" text-anchor="middle" font-size="7" fill="#92400e">Periodic Table</text>
      <text x="418" y="93" text-anchor="middle" font-size="7" fill="#92400e">Predicted new elements</text>
    </g>
    
    <!-- Periodic table fragment -->
    <rect x="50" y="130" width="400" height="130" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5"/>
    <text x="250" y="150" text-anchor="middle" font-size="9" fill="#1e293b" font-weight="800">🔬 PERIODIC TABLE (First version — Mendeleev, 1869)</text>
    
    <!-- Sample elements -->
    <rect x="70" y="165" width="50" height="25" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
    <text x="95" y="182" text-anchor="middle" font-size="8" fill="#1e3a8a">H (1)</text>
    
    <rect x="130" y="165" width="50" height="25" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
    <text x="155" y="182" text-anchor="middle" font-size="8" fill="#1e3a8a">He (2)</text>
    
    <rect x="190" y="165" width="50" height="25" rx="4" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/>
    <text x="215" y="182" text-anchor="middle" font-size="8" fill="#166534">Li (3)</text>
    
    <rect x="250" y="165" width="50" height="25" rx="4" fill="#dcfce7" stroke="#22c55e" stroke-width="1"/>
    <text x="275" y="182" text-anchor="middle" font-size="8" fill="#166534">Be (4)</text>
    
    <rect x="310" y="165" width="50" height="25" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
    <text x="335" y="182" text-anchor="middle" font-size="8" fill="#92400e">B (5)</text>
    
    <rect x="370" y="165" width="50" height="25" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
    <text x="395" y="182" text-anchor="middle" font-size="8" fill="#92400e">C (6)</text>
    
    <text x="250" y="215" text-anchor="middle" font-size="7" fill="#64748b">Rows (periods) and columns (groups) reveal repeating chemical properties</text>
    <text x="250" y="232" text-anchor="middle" font-size="7" fill="#64748b">Mendeleev left gaps for undiscovered elements — predictions later confirmed</text>
    
    <defs>
      <marker id="arrowC1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6"/>
      </marker>
    </defs>
  </svg>
</div>

<h3 class="learn-subheading">Cell Theory — The Building Blocks of Life (1838-1855)</h3>

<p class="learn-p">Before the 19th century, the fundamental unit of life was unknown. The invention and improvement of microscopes made cell theory possible.</p>

<p class="learn-p"><strong>Robert Hooke (1665):</strong> Using early microscope, observed cork cells — named "cells" because they resembled monastery cells. Observed only dead plant cell walls.</p>

<p class="learn-p"><strong>Antonie van Leeuwenhoek (1632-1723):</strong> Master lens grinder, built microscopes over 200x magnification. First to observe living cells — bacteria ("animalcules"), protozoa, red blood cells, sperm. Called "father of microbiology."</p>

<p class="learn-p"><strong>Matthias Schleiden (1838):</strong> German botanist — proposed all plants are composed of cells.</p>

<p class="learn-p"><strong>Theodor Schwann (1839):</strong> German zoologist — extended to animals: all animals are composed of cells. Together proposed: all living things are made of cells, and cell is basic unit of life.</p>

<p class="learn-p"><strong>Rudolf Virchow (1855):</strong> Added third principle: <strong>Omnis cellula e cellula</strong> ("every cell arises from a pre-existing cell") — cells divide to produce new cells. Disproved spontaneous generation at cellular level.</p>

<p class="learn-p"><strong>Cell Theory's three principles:</strong></p>
<ol class="learn-list learn-ordered">
  <li>All living organisms are composed of one or more cells</li>
  <li>The cell is the basic structural and functional unit of life</li>
  <li>All cells arise from pre-existing cells</li>
</ol>

<h3 class="learn-subheading">Darwin and Evolution by Natural Selection (1859)</h3>

<p class="learn-p">Charles Darwin's (1809-1882) *On the Origin of Species* (1859) revolutionized biology and challenged humanity's understanding of its place in nature.</p>

<p class="learn-p"><strong>Darwin's observations (Voyage of the Beagle, 1831-1836):</strong></p>
<ul class="learn-list">
  <li>Galápagos finches — different beak shapes adapted to different food sources on different islands</li>
  <li>Fossils of extinct giant sloths and armadillos — species change over time</li>
  <li>Geological uplift — Earth is very old</li>
</ul>

<p class="learn-p"><strong>Key insights (also independently by Alfred Russel Wallace, 1858):</strong></p>
<ul class="learn-list">
  <li><strong>Variation:</strong> Individuals within a species vary in traits</li>
  <li><strong>Inheritance:</strong> Traits are passed from parents to offspring</li>
  <li><strong>Struggle for existence:</strong> More offspring produced than can survive (Malthus's influence)</li>
  <li><strong>Natural selection:</strong> Individuals with advantageous traits more likely to survive and reproduce. Over generations, favorable traits become more common.</li>
  <li><strong>Descent with modification:</strong> Species share common ancestors; evolution produces branching tree of life</li>
</ul>

<p class="learn-p"><strong>Evidence supporting evolution (then and now):</strong></p>
<ul class="learn-list">
  <li><strong>Fossil record:</strong> Transitional forms (e.g., Tiktaalik — fish to tetrapod)</li>
  <li><strong>Homologous structures:</strong> Same underlying structure, different functions (human arm, bird wing, whale flipper) — evidence of common ancestry</li>
  <li><strong>Analogous structures:</strong> Different structures, similar functions (bird wing, insect wing) — convergent evolution</li>
  <li><strong>Vestigial structures:</strong> Functionless remnants of evolution (human appendix, whale pelvis)</li>
  <li><strong>Embryology:</strong> Similar embryonic development across species</li>
  <li><strong>Molecular biology (DNA):</strong> Genetic similarities reflect evolutionary relationships</li>
  <li><strong>Observed evolution:</strong> Antibiotic resistance in bacteria, pesticide resistance in insects — natural selection in action</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Point:</strong> Darwin did not know the mechanism of heredity — genes and DNA were discovered later. Mendelian genetics (rediscovered 1900) provided the missing piece, leading to "modern synthesis" (1930s-40s) integrating Darwin and Mendel.</span>
</div>

<h3 class="learn-subheading">Genetics — From Mendel to DNA</h3>

<p class="learn-p"><strong>Gregor Mendel (1822-1884) — Father of Genetics:</strong></p>
<ul class="learn-list">
  <li>Augustinian monk who experimented with pea plants (1856-1863)</li>
  <li>Discovered that traits are inherited in discrete units (genes) — not blended</li>
  <li><strong>Laws of inheritance:</strong>
    <ul>
      <li>Law of segregation: Each parent contributes one allele (variant) for each trait; alleles separate during gamete formation</li>
      <li>Law of independent assortment: Genes for different traits assort independently (with exceptions)</li>
    </ul>
  </li>
  <li>Work largely ignored until rediscovered in 1900 (by Correns, de Vries, von Tschermak)</li>
</ul>

<p class="learn-p"><strong>DNA — The Molecule of Heredity:</strong></p>
<ul class="learn-list">
  <li><strong>Friedrich Miescher (1869):</strong> First isolated "nuclein" (DNA) from white blood cells — didn't know its function</li>
  <li><strong>Oswald Avery (1944):</strong> Showed DNA (not protein) carries genetic information — through experiments with bacteria</li>
  <li><strong>Erwin Chargaff (1947):</strong> Chargaff's rules: amount of A = T, amount of G = C — key clue for structure</li>
  <li><strong>Rosalind Franklin (1952):</strong> X-ray diffraction image (Photo 51) revealed DNA is helix with regular repeating structure</li>
  <li><strong>James Watson and Francis Crick (1953):</strong> Proposed double helix model — two strands wound around each other, base pairs (A-T, C-G) hold strands together. Model explained how DNA replicates and stores information.</li>
</ul>

<p class="learn-p"><strong>The Human Genome Project (1990-2003):</strong> Mapped entire human DNA sequence (3 billion base pairs). Revolutionized medicine — enabled personalized medicine, genetic testing, understanding of genetic diseases.</p>

<h3 class="learn-subheading">Germ Theory of Disease — Pasteur and Koch</h3>

<p class="learn-p">Before germ theory, disease was attributed to "miasma" (bad air), imbalances of humors, or divine punishment. Germ theory transformed medicine.</p>

<p class="learn-p"><strong>Louis Pasteur (1822-1895):</strong></p>
<ul class="learn-list">
  <li>Disproved spontaneous generation — showed microbes come from other microbes (swan-neck flask experiments)</li>
  <li>Developed pasteurization — heating kills microbes in milk, wine, beer</li>
  <li>Developed vaccines for rabies, anthrax</li>
  <li>Germ theory of fermentation — microorganisms cause fermentation</li>
</ul>

<p class="learn-p"><strong>Robert Koch (1843-1910):</strong></p>
<ul class="learn-list">
  <li>Identified specific microbes causing specific diseases: anthrax (Bacillus anthracis), tuberculosis (Mycobacterium tuberculosis), cholera (Vibrio cholerae)</li>
  <li><strong>Koch's postulates:</strong> Four criteria to establish microbe causes disease:
    <ol>
      <li>Microbe must be present in every case of disease</li>
      <li>Microbe must be isolated from diseased host and grown in pure culture</li>
      <li>Pure culture must cause same disease when inoculated into healthy host</li>
      <li>Microbe must be re-isolated from experimentally infected host</li>
    </ol>
  </li>
</ul>

<p class="learn-p"><strong>Impact:</strong> Germ theory led to sanitation (sewers, clean water), antiseptics (Joseph Lister), vaccines, antibiotics (penicillin — Fleming, Florey, Chain, 1940s). Human lifespan doubled in developed countries largely due to germ theory applications.</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>GST Exam Tip:</strong> Questions often ask about the relationship between Darwin and Mendel. Darwin didn't know about genes (Mendel's work was unknown to him). The "modern synthesis" (1930s-40s) integrated natural selection with Mendelian genetics, resolving Darwin's major problem — how traits are inherited without blending away variation.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>Key Figure:</strong> Rosalind Franklin (1920-1958) — her X-ray diffraction image (Photo 51) was crucial evidence for DNA's double helix structure. She died of ovarian cancer at 37, before the Nobel Prize was awarded to Watson, Crick, and Wilkins (1962). Nobels are not awarded posthumously; Franklin's contribution is now widely recognized.</span>
</div>
    `,
    questions: [
      { q: "Antoine Lavoisier is known as the 'father of modern chemistry' primarily for:", o: ["Discovering the periodic table", "Law of conservation of mass and disproving phlogiston theory", "Atomic theory", "Discovering radioactivity"], a: 1, e: "Lavoisier established conservation of mass, identified oxygen and hydrogen, and disproved phlogiston theory — transforming chemistry from qualitative to quantitative.", h: "Who discovered oxygen and conservation of mass?", yr: "GST" },
      { q: "John Dalton's atomic theory proposed that:", o: ["Atoms are divisible", "All matter consists of indivisible atoms; atoms of same element identical; compounds formed from whole-number ratios", "Atoms contain electrons", "Atoms are mostly empty space"], a: 1, e: "Dalton's atomic theory: elements composed of identical atoms, different elements have different atoms, atoms combine in whole-number ratios.", h: "What did Dalton say about atoms?", yr: "GST" },
      { q: "Dmitri Mendeleev's periodic table was revolutionary because:", o: ["It listed all elements alphabetically", "It arranged elements by atomic weight and predicted undiscovered elements", "It was the first list of elements", "It used atomic numbers"], a: 1, e: "Mendeleev left gaps for undiscovered elements and predicted their properties — later confirmed, dramatically confirming his periodic law.", h: "What did Mendeleev predict?", yr: "GST" },
      { q: "Which scientist first observed living cells ('animalcules') under a microscope?", o: ["Robert Hooke", "Antonie van Leeuwenhoek", "Matthias Schleiden", "Rudolf Virchow"], a: 1, e: "Leeuwenhoek, master lens grinder, first observed bacteria, protozoa, red blood cells, and sperm — 'father of microbiology'.", h: "Who discovered bacteria?", yr: "GST" },
      { q: "Rudolf Virchow's contribution to cell theory was:", o: ["All plants are made of cells", "All animals are made of cells", "Omnis cellula e cellula — every cell arises from a pre-existing cell", "First observation of cells"], a: 2, e: "Virchow added that cells come only from existing cells (cell division), disproving spontaneous generation at cellular level.", h: "Where do new cells come from?", yr: "GST" },
      { q: "Darwin's theory of evolution by natural selection is based on all EXCEPT:", o: ["Variation within species", "Inheritance of traits", "Struggle for existence (more offspring than survive)", "Acquired characteristics passed to offspring (Lamarckism)"], a: 3, e: "Darwin rejected Lamarck's inheritance of acquired characteristics. Natural selection requires heritable variation, not acquired traits.", h: "What did Darwin NOT believe?", yr: "GST" },
      { q: "Which evidence for evolution refers to structures with different functions but same underlying structure (human arm, bird wing, whale flipper)?", o: ["Analogous structures", "Homologous structures", "Vestigial structures", "Fossil record"], a: 1, e: "Homologous structures share common ancestry despite different functions. Analogous structures share function but different origins (convergent evolution).", h: "What indicates common ancestry?", yr: "GST" },
      { q: "Gregor Mendel's laws of inheritance include all EXCEPT:", o: ["Law of segregation (alleles separate during gamete formation)", "Law of independent assortment (genes for different traits assort independently)", "Law of dominance (some alleles mask others)", "Law of acquired characteristics"], a: 3, e: "Law of acquired characteristics is Lamarck, not Mendel. Mendel discovered segregation, independent assortment, and dominance.", h: "What did Mendel NOT discover?", yr: "GST" },
      { q: "Which scientist showed that DNA (not protein) carries genetic information (1944 experiment with bacteria)?", o: ["Watson and Crick", "Chargaff", "Avery", "Franklin"], a: 2, e: "Oswald Avery's experiments with bacteria demonstrated DNA is the transforming principle — genetic material.", h: "Who proved DNA carries genes?", yr: "GST" },
      { q: "Watson and Crick's 1953 model of DNA was based on evidence from:", o: ["Only their own experiments", "Chargaff's rules, Franklin's X-ray diffraction, and model building", "Only Darwin's theory", "Mendel's pea plants"], a: 1, e: "Watson and Crick used Chargaff's base-pairing rules, Franklin's Photo 51 (helix evidence), and model building to propose double helix.", h: "What evidence did Watson and Crick use?", yr: "GST" },
      { q: "The Human Genome Project completed mapping of human DNA in:", o: ["1975", "1990", "2003", "2015"], a: 2, e: "Project started 1990, completed 2003 — mapped 3 billion base pairs of human DNA.", h: "When was human genome sequenced?", yr: "GST" },
      { q: "Louis Pasteur's swan-neck flask experiment disproved:", o: ["Germ theory", "Spontaneous generation — that life arises from non-life", "Vaccination", "Fermentation"], a: 1, e: "Swan-neck flasks allowed air but not microbes; broth remained sterile, disproving spontaneous generation.", h: "What did Pasteur's swan-neck flask disprove?", yr: "GST" },
      { q: "Koch's postulates are criteria for:", o: ["Classifying plants", "Establishing that a specific microbe causes a specific disease", "Naming chemical compounds", "Classifying animals"], a: 1, e: "Koch's four postulates provide rigorous evidence that a particular microorganism causes a particular disease.", h: "What are Koch's postulates for?", yr: "GST" },
      { q: "Which of the following is an example of homologous structures?", o: ["Bird wing and insect wing", "Human arm and whale flipper", "Butterfly wing and bird wing", "Fish fin and dolphin flipper (different underlying structure)"], a: 1, e: "Homologous: same underlying bone structure, different function (human arm, whale flipper, bird wing, bat wing).", h: "Which share common ancestry?", yr: "GST" },
      { q: "The 'modern synthesis' of evolutionary biology integrated:", o: ["Darwin and Lamarck", "Darwin and Mendel (natural selection with genetics)", "Lamarck and Mendel", "Darwin and Wallace"], a: 1, e: "Modern synthesis (1930s-40s) combined Darwinian natural selection with Mendelian genetics, explaining mechanism of heredity.", h: "What was combined in modern synthesis?", yr: "GST" },
      { q: "Rosalind Franklin's contribution to DNA discovery was:", o: ["Proposing double helix model", "X-ray diffraction image (Photo 51) showing DNA's helical structure", "Discovering base-pairing rules", "Isolating DNA"], a: 1, e: "Franklin's Photo 51 provided crucial evidence that DNA is a helix with regular repeating structure — used by Watson and Crick.", h: "What did Franklin contribute?", yr: "GST" },
      { q: "Antibiotic resistance in bacteria is an example of:", o: ["Lamarckian evolution", "Natural selection in action — bacteria with resistance genes survive and reproduce", "Creationism", "Spontaneous generation"], a: 1, e: "Overuse of antibiotics selects for resistant bacteria — natural selection observed directly.", h: "What shows evolution happening now?", yr: "GST" },
      { q: "Which scientist developed the first vaccines (rabies, anthrax) and pasteurization?", o: ["Koch", "Pasteur", "Lister", "Jenner"], a: 1, e: "Pasteur developed vaccines for rabies and anthrax; also pasteurization to kill microbes in milk, beer, wine.", h: "Who developed pasteurization?", yr: "GST" },
      { q: "Chargaff's rules state that in DNA:", o: ["A = T and G = C", "A = G and T = C", "A = C and G = T", "All bases are equal"], a: 0, e: "Chargaff's rules: amount of adenine equals thymine (A=T) and guanine equals cytosine (G=C) — key to base-pairing.", h: "What matches with what in DNA?", yr: "GST" },
      { q: "The theory that all cells come from pre-existing cells is called:", o: ["Spontaneous generation", "Omnis cellula e cellula (Virchow)", "Biogenesis", "Cell fusion"], a: 1, e: "Virchow's 'omnis cellula e cellula' (every cell from a cell) — third principle of cell theory.", h: "Where do new cells come from?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 7: Philosophy of Science — Realism, Anti-Realism, and Values in Science
  // ==========================================================================
  {
    topic: "Philosophy of Science — Realism, Anti-Realism, and Values in Science",
    topicCode: "HPS-007-01",
    module: "Philosophy of Science",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Scientific realism and anti-realism</span> debate whether scientific theories describe a mind-independent reality. Do electrons, quarks, and black holes really exist, or are they merely useful fictions? This question has profound implications for what science tells us about the world. <strong>Understanding these positions helps you evaluate scientific claims critically</strong>.
</div>

<p class="learn-p">While scientists typically assume their theories refer to real entities, philosophers ask: Is this assumption justified? How can we know that unobservable entities (atoms, electrons, genes, black holes) actually exist? The debate between realists and anti-realists addresses these questions.</p>

<h3 class="learn-subheading">Scientific Realism</h3>

<p class="learn-p"><strong>Scientific realism</strong> holds that:</p>
<ul class="learn-list">
  <li>Theoretical terms (like "electron," "gene," "black hole") refer to real entities</li>
  <li>Scientific theories are approximately true descriptions of the world</li>
  <li>Science aims for truth and often achieves it (at least approximately)</li>
  <li>Unobservable entities posited by mature scientific theories actually exist</li>
</ul>

<p class="learn-p"><strong>Arguments for realism:</strong></p>
<ul class="learn-list">
  <li><strong>No miracles argument (Putnam):</strong> The success of science would be a miracle if theories weren't approximately true. How else to explain that theories make accurate predictions (e.g., Einstein's relativity predicting light bending)?</li>
  <li><strong>Common cause (inference to best explanation):</strong> We infer electrons exist because they best explain observed phenomena (cloud chamber tracks, chemical reactions, electricity).</li>
  <li><strong>Continuity of reference:</strong> Even when theories change, terms often refer to same real entities. "Atom" in Dalton meant indivisible; now we know atoms divisible — but still refers to same entity.</li>
</ul>

<h3 class="learn-subheading">Anti-Realism — Empiricism and Instrumentalism</h3>

<p class="learn-p"><strong>Anti-realists</strong> argue that we should not believe in unobservable entities — or that belief is unnecessary.</p>

<p class="learn-p"><strong>Bas van Fraassen — Constructive Empiricism:</strong></p>
<ul class="learn-list">
  <li>Science aims for empirical adequacy, not truth about unobservables</li>
  <li>A theory is acceptable if it correctly predicts observable phenomena — regardless of whether its unobservable entities "really exist"</li>
  <li>We should believe theories only about what is observable</li>
</ul>

<p class="learn-p"><strong>Instrumentalism:</strong></p>
<ul class="learn-list">
  <li>Theories are tools (instruments) for predicting phenomena, not descriptions of reality</li>
  <li>Debate about whether electrons "really exist" is pointless — they are useful fictions</li>
  <li>Associated with logical positivists and pragmatists (Dewey, Rorty)</li>
</ul>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="250" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🔭 SCIENTIFIC REALISM vs ANTI-REALISM</text>
    
    <!-- Realism Side -->
    <g>
      <rect x="15" y="45" width="225" height="190" rx="10" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <rect x="15" y="45" width="225" height="30" rx="10" fill="#3b82f6"/>
      <text x="127" y="66" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="800">🔬 SCIENTIFIC REALISM</text>
      
      <text x="127" y="95" text-anchor="middle" font-size="8" fill="#1e3a8a">Theories are (approximately) true</text>
      <text x="127" y="115" text-anchor="middle" font-size="8" fill="#1e3a8a">Unobservable entities (atoms,</text>
      <text x="127" y="132" text-anchor="middle" font-size="8" fill="#1e3a8a">electrons, black holes) really exist</text>
      <text x="127" y="155" text-anchor="middle" font-size="8" fill="#1e3a8a">No miracles argument: success</text>
      <text x="127" y="172" text-anchor="middle" font-size="8" fill="#1e3a8a">of science would be miracle</text>
      <text x="127" y="192" text-anchor="middle" font-size="8" fill="#1e3a8a">if theories not (approx.) true</text>
      
      <circle cx="127" cy="218" r="6" fill="#3b82f6" opacity="0.5">
        <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
      </circle>
    </g>
    
    <!-- Anti-Realism Side -->
    <g>
      <rect x="260" y="45" width="225" height="190" rx="10" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <rect x="260" y="45" width="225" height="30" rx="10" fill="#22c55e"/>
      <text x="372" y="66" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="800">🔎 ANTI-REALISM</text>
      
      <text x="372" y="95" text-anchor="middle" font-size="8" fill="#166534">Theories aim for empirical</text>
      <text x="372" y="112" text-anchor="middle" font-size="8" fill="#166534">adequacy — NOT truth about</text>
      <text x="372" y="129" text-anchor="middle" font-size="8" fill="#166534">unobservables (van Fraassen)</text>
      <text x="372" y="155" text-anchor="middle" font-size="8" fill="#166534">Theories as instruments for</text>
      <text x="372" y="172" text-anchor="middle" font-size="8" fill="#166534">prediction — not descriptions</text>
      <text x="372" y="192" text-anchor="middle" font-size="8" fill="#166534">of reality (instrumentalism)</text>
      
      <circle cx="372" cy="218" r="6" fill="#22c55e" opacity="0.5">
        <animate attributeName="r" values="6;10;6" dur="2s" begin="0.5s" repeatCount="indefinite"/>
      </circle>
    </g>
  </svg>
</div>

<h3 class="learn-subheading">The Pessimistic Induction</h3>

<p class="learn-p">Anti-realists pose a powerful challenge: the history of science is littered with theories once believed true but later abandoned. These theories posited unobservable entities that turned out not to exist.</p>

<p class="learn-p"><strong>Examples of abandoned theories:</strong></p>
<ul class="learn-list">
  <li><strong>Phlogiston theory:</strong> Combustible materials contained "phlogiston" released during burning. No such thing.</li>
  <li><strong>Caloric theory:</strong> Heat was a fluid ("caloric") that flowed between objects. No such fluid.</li>
  <li><strong>Luminiferous ether:</strong> Light waves needed a medium (ether) to travel through. No ether.</li>
  <li><strong>Ptolemaic astronomy:</strong> Planets moved on epicycles around Earth. False.</li>
</ul>

<p class="learn-p"><strong>Pessimistic induction argument:</strong> Most past theories were false. Therefore, current theories are likely also false (or at least not true about unobservables). Why should we believe electrons are any different from phlogiston?</p>

<p class="learn-p"><strong>Realist responses:</strong></p>
<ul class="learn-list">
  <li><strong>Continuity of reference:</strong> Past theories weren't entirely wrong — they were partially true (Newton's physics still works for most purposes).</li>
  <li><strong>Mature theories:</strong> Distinguish between immature theories (quickly abandoned) and mature theories (successful over long periods). Mature theories (quantum mechanics, relativity) have impressive predictive success.</li>
  <li><strong>No miracle argument revisited:</strong> The success of mature theories is best explained by their approximate truth.</li>
</ul>

<h3 class="learn-subheading">Underdetermination of Theory by Evidence</h3>

<p class="learn-p">The underdetermination thesis states that for any body of evidence, there are multiple (even infinitely many) logically possible theories consistent with that evidence. Evidence alone cannot uniquely determine which theory is correct.</p>

<p class="learn-p"><strong>Example:</strong> Observing the sun rise every day is consistent with:</p>
<ul class="learn-list">
  <li>Newtonian gravity (Earth rotates, sun stationary)</li>
  <li>Geocentrism (sun revolves around Earth — with complex epicycles)</li>
  <li>Simulation hypothesis (sunrise is simulated)</li>
  <li>Last Thursdayism (universe created last Thursday with appearance of age)</li>
</ul>

<p class="learn-p">Scientists appeal to non-empirical criteria to choose between theories: simplicity, explanatory power, coherence with other theories, fruitfulness (predicting novel facts). But these are philosophical, not purely empirical, criteria.</p>

<p class="learn-p"><strong>Implication:</strong> If underdetermination is correct, then empirical evidence alone never forces belief in a particular theory. Realists must appeal to additional criteria; anti-realists argue that since empirical evidence can't decide, we should withhold belief about unobservables.</p>

<h3 class="learn-subheading">Values in Science — Objectivity and Bias</h3>

<p class="learn-p">Can science be value-free? Should it be? The relationship between science and values is debated.</p>

<p class="learn-p"><strong>Traditional view (value-free ideal):</strong> Science should be objective, unbiased by social, political, or personal values. Values only enter in choosing research topics and applying science — not in evaluating evidence or accepting theories.</p>

<p class="learn-p"><strong>Challenges to value-free ideal:</strong></p>
<ul class="learn-list">
  <li><strong>Underdetermination:</strong> When evidence underdetermines theory choice, scientists must use non-empirical criteria (simplicity, etc.) — which may embed values</li>
  <li><strong>Inductive risk (Rudner):</strong> Scientists must decide when evidence is sufficient to accept a hypothesis. This involves weighing consequences of being wrong. Value judgments about acceptable risk are unavoidable.</li>
  <li><strong>Feminist philosophy of science (Harding, Longino):</strong> Science has historically been biased by male, Western, colonial perspectives. Question: Are there distinctively feminist perspectives that improve science?</li>
  <li><strong>Socially relevant science (climate change, public health, genetic engineering):</strong> Cannot be separated from social values. Questions about what to study, how to frame problems, what counts as evidence.</li>
</ul>

<p class="learn-p"><strong>Where values legitimately belong (according to most philosophers):</strong></p>
<ul class="learn-list">
  <li>Choice of research problems (what to study)</li>
  <li>Methodology (how to study — ethical constraints on research with human or animal subjects)</li>
  <li>Application of science (what to do with findings)</li>
  <li>Risk assessment (how much evidence is enough before acting, e.g., drug approval, climate policy)</li>
</ul>

<p class="learn-p"><strong>Where values should NOT influence science (according to most):</strong></p>
<ul class="learn-list">
  <li>Evaluation of evidence (should not ignore evidence because it conflicts with political or religious beliefs)</li>
  <li>Acceptance of theories (should not accept or reject theories based on desired conclusions)</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Concept:</strong> Inductive risk (Carl Hempel, Richard Rudner) — when scientists accept or reject a hypothesis, they risk being wrong. The acceptable level of risk depends on the consequences of error. For example, accepting a new drug as safe has different consequences than accepting a theory about distant galaxies. Value judgments about acceptable risk are unavoidable in science.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Explain the pessimistic induction. How might a scientific realist respond?" (Sample answer: The pessimistic induction notes that past theories (phlogiston, caloric, ether) were false; therefore, current theories will likely also be false. Realists respond: past theories weren't entirely false — they were approximately true in their domains (Newton's physics still works). Also, distinguish mature theories (long successful) from immature ones. The success of mature theories would be a miracle if they weren't approximately true.)</span>
</div>
    `,
    questions: [
      { q: "The 'no miracles argument' for scientific realism states that:", o: ["Science is full of miracles", "The success of science would be a miracle if theories weren't approximately true", "Miracles explain scientific discoveries", "Science cannot explain anything"], a: 1, e: "Putnam's no miracles argument: the predictive success of science (e.g., Einstein's relativity) would be inexplicable if theories weren't at least approximately true.", h: "Why is science so successful?", yr: "GST" },
      { q: "Constructive empiricism (van Fraassen) holds that:", o: ["Science aims for truth about unobservables", "Science aims for empirical adequacy (correct predictions about observables), not truth about unobservables", "Unobservables do not exist", "Only observables exist"], a: 1, e: "Van Fraassen: we should only believe what is observable. Theories need only be empirically adequate — correctly predict observable phenomena.", h: "What is the goal of science according to van Fraassen?", yr: "GST" },
      { q: "Instrumentalism views scientific theories as:", o: ["True descriptions of reality", "Tools or instruments for predicting phenomena, not descriptions of reality", "Falsifiable statements", "Paradigms"], a: 1, e: "Instrumentalism: theories are useful fictions — instruments for prediction. Debating whether electrons 'really exist' is pointless.", h: "What are theories according to instrumentalism?", yr: "GST" },
      { q: "The pessimistic induction argues that:", o: ["Current theories will never be proven false", "Past theories were mostly false, so current theories likely are too", "Science always progresses", "All scientific theories are true"], a: 1, e: "Pessimistic induction: past theories (phlogiston, caloric, ether) were false; therefore, current theories (quantum mechanics, relativity) are likely also false (or at least wrong about unobservables).", h: "What does past science tell us about current theories?", yr: "GST" },
      { q: "Which of the following is an example of a theory once believed true but later abandoned (used in pessimistic induction)?", o: ["Quantum mechanics", "Phlogiston theory of combustion", "General relativity", "Darwinian evolution"], a: 1, e: "Phlogiston theory (combustible materials contain 'phlogiston') was abandoned; quantum mechanics, relativity, and evolution are current mature theories.", h: "Which is a discarded theory?", yr: "GST" },
      { q: "The underdetermination thesis states that:", o: ["Evidence always determines a unique theory", "For any evidence, multiple theories are consistent with it", "Theories are determined by experiments", "Evidence is irrelevant"], a: 1, e: "Underdetermination: evidence alone cannot uniquely determine which theory is correct — multiple theories can fit the same data.", h: "Does evidence force one theory?", yr: "GST" },
      { q: "When evidence underdetermines theory choice, scientists appeal to criteria such as:", o: ["Popularity", "Simplicity, explanatory power, coherence with other theories", "Political alignment", "Personal preference"], a: 1, e: "Non-empirical criteria include simplicity (Occam's razor), explanatory power, coherence with other theories, and fruitfulness (predicting novel facts).", h: "What helps choose between theories when evidence doesn't?", yr: "GST" },
      { q: "The concept of 'inductive risk' (Rudner) refers to:", o: ["Risk that induction will fail", "Risk of being wrong when accepting or rejecting a hypothesis — acceptable level depends on consequences of error", "Risk of experiments", "Risk of falsification"], a: 1, e: "Inductive risk: scientists must decide when evidence is sufficient. The acceptable risk of being wrong depends on consequences (e.g., drug approval vs. cosmology).", h: "What risk do scientists take when accepting a hypothesis?", yr: "GST" },
      { q: "According to most philosophers, where do values legitimately enter science?", o: ["Evaluating evidence", "Accepting theories based on desired conclusions", "Choice of research problems, methodology (ethics), application, and risk assessment", "Nowhere — science should be completely value-free"], a: 2, e: "Values legitimately influence choice of problems, ethical methodology, application of findings, and risk assessment — not evaluation of evidence or acceptance of theories.", h: "Where should values NOT influence science?", yr: "GST" },
      { q: "Feminist philosophy of science (Harding, Longino) argues that:", o: ["Science is completely objective", "Science has historically been biased by male, Western, colonial perspectives; feminist perspectives can improve science", "Women cannot do science", "Science should ignore gender"], a: 1, e: "Feminist philosophers argue that science has been biased by male and Western perspectives, and that including diverse perspectives improves objectivity.", h: "What bias has affected science historically?", yr: "GST" },
      { q: "The luminiferous ether was a hypothesized medium for:", o: ["Sound waves", "Light waves (to travel through space)", "Radio waves", "Gravity"], a: 1, e: "19th-century physicists believed light waves needed a medium ('ether') to travel through space. Michelson-Morley experiment (1887) found no evidence for ether.", h: "What medium was supposed to carry light?", yr: "GST" },
      { q: "A realist response to the pessimistic induction includes:", o: ["Abandoning science", "Past theories weren't entirely false — they were approximately true in their domains; distinguish mature from immature theories", "Accepting all past theories were completely false", "Ignoring history"], a: 1, e: "Realists argue past theories had partial truth (Newton still works for most purposes). Mature theories (long successful) are more likely to be approximately true.", h: "How can realists defend against pessimistic induction?", yr: "GST" },
      { q: "Caloric theory held that:", o: ["Heat is a fluid ('caloric') that flows between objects", "Heat is molecular motion", "Heat is radiation", "Heat is energy"], a: 0, e: "Caloric theory (18th-19th c.) treated heat as a fluid. Abandoned after work by Rumford, Joule showing heat is motion, energy.", h: "What was heat according to caloric theory?", yr: "GST" },
      { q: "According to the value-free ideal, values should:", o: ["Influence acceptance of theories", "Influence evaluation of evidence", "Only influence choice of research problems and application — not evidence evaluation or theory acceptance", "Be completely excluded from science"], a: 2, e: "Value-free ideal: values can guide what to study and how to apply science, but not evaluation of evidence or acceptance of theories.", h: "Where can values legitimately go?", yr: "GST" },
      { q: "The term 'inductive risk' was developed by which philosopher?", o: ["Kuhn", "Popper", "Rudner and Hempel", "Feyerabend"], a: 2, e: "Carl Hempel and Richard Rudner developed inductive risk: scientists' decisions about accepting hypotheses involve risk, and acceptable risk depends on consequences.", h: "Who discussed risk in accepting hypotheses?", yr: "GST" },
      { q: "Which of the following is a non-empirical criterion for theory choice?", o: ["Number of confirming observations", "Simplicity (Occam's razor)", "Popular vote", "Age of theory"], a: 1, e: "Simplicity (Occam's razor — don't multiply entities unnecessarily) is a non-empirical criterion used when evidence underdetermines theory choice.", h: "What is Occam's razor?", yr: "GST" },
      { q: "The pessimistic induction is a challenge to:", o: ["Scientific anti-realism", "Scientific realism", "Instrumentalism", "Constructive empiricism"], a: 1, e: "Pessimistic induction challenges realism by arguing that past theories (thought true) were false, so current theories likely are too.", h: "Which position does the pessimistic induction attack?", yr: "GST" },
      { q: "Which of the following best describes van Fraassen's constructive empiricism?", o: ["All unobservable entities exist", "Science should aim for truth about everything", "Science aims for empirical adequacy; belief should be limited to observables", "Only observables exist"], a: 2, e: "Constructive empiricism: theories need only be empirically adequate (correctly predict observables). We need not believe in unobservable entities.", h: "What should we believe according to van Fraassen?", yr: "GST" },
      { q: "The underdetermination thesis implies that:", o: ["Science is irrational", "Empirical evidence alone never forces belief in a particular theory", "All theories are equally good", "Experiments are useless"], a: 1, e: "Underdetermination: multiple theories fit same evidence. Therefore, evidence alone cannot force belief in one theory.", h: "Does evidence determine theory uniquely?", yr: "GST" },
      { q: "Which of the following is NOT a legitimate role for values in science according to most philosophers?", o: ["Choosing which research problems to study", "Deciding how much evidence is enough to approve a new drug (risk assessment)", "Ignoring evidence that conflicts with religious beliefs", "Setting ethical constraints on experiments"], a: 2, e: "Ignoring contradictory evidence is never legitimate. Values should not influence evaluation of evidence or acceptance of theories.", h: "What is NOT acceptable in science?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 8: Science and Society — Ethics, Technology, and Public Policy
  // ==========================================================================
  {
    topic: "Science and Society — Ethics, Technology, and Public Policy",
    topicCode: "HPS-008-01",
    module: "Science and Society",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Science and society</span> are deeply intertwined. Science shapes society through technology, medicine, and our understanding of the world. Society shapes science through funding priorities, ethical regulations, and public values. <strong>Understanding this relationship is essential for responsible citizenship in a scientifically-driven world</strong>.
</div>

<p class="learn-p">Science is not conducted in a vacuum. It is funded by governments, corporations, and foundations with specific interests. It is regulated by laws and ethical guidelines. Its applications raise profound ethical questions. Citizens must be able to evaluate scientific claims, understand risks, and participate in democratic decisions about science policy.</p>

<h3 class="learn-subheading">The Social Context of Science — Funding, Priorities, and Bias</h3>

<p class="learn-p">What science gets done is influenced by social and economic factors.</p>

<p class="learn-p"><strong>Funding sources:</strong></p>
<ul class="learn-list">
  <li>Government funding (taxpayer money) — NIH, NSF, NASA, European Research Council. Priorities set by political process.</li>
  <li>Corporate/industry funding — pharmaceutical companies, tech companies, energy companies. May bias results toward funder interests (e.g., tobacco industry funding research that downplayed smoking risks).</li>
  <li>Non-profit/charitable funding — Gates Foundation, Howard Hughes Medical Institute. Reflect priorities of donors.</li>
</ul>

<p class="learn-p"><strong>Publication bias:</strong> Positive results (statistically significant) are more likely to be published than negative or null results. This distorts the scientific record — known as the "file drawer problem."</p>

<p class="learn-p"><strong>Replication crisis:</strong> Many published findings (especially in psychology, biomedicine) cannot be replicated. Causes include publication bias, small sample sizes, questionable research practices (p-hacking), and lack of pre-registration. Replication crisis has led to reforms: pre-registration, open data, larger sample sizes.</p>

<h3 class="learn-subheading">Science and Technology — Benefits and Risks</h3>

<p class="learn-p">Technology derived from science has transformed human life — but also created new risks.</p>

<p class="learn-p"><strong>Benefits:</strong></p>
<ul class="learn-list">
  <li>Medicine: Vaccines, antibiotics, anesthesia, imaging (X-ray, MRI, CT), gene therapy, organ transplantation — lifespan doubled in developed countries</li>
  <li>Agriculture: Green Revolution (high-yield crops, fertilizers) — reduced famine, but environmental costs</li>
  <li>Communication: Internet, smartphones, satellites — global connectivity</li>
  <li>Energy: Nuclear power, renewables, fossil fuels (with environmental costs)</li>
  <li>Transportation: Cars, planes, trains — mobility but pollution</li>
</ul>

<p class="learn-p"><strong>Risks and ethical concerns:</strong></p>
<ul class="learn-list">
  <li><strong>Nuclear weapons:</strong> Science enabled weapons capable of destroying civilization. Nuclear deterrence vs proliferation risk.</li>
  <li><strong>Climate change:</strong> Fossil fuel combustion (enabled by science) causing global warming. Mitigation requires technological and social change.</li>
  <li><strong>Artificial intelligence:</strong> Potential for autonomous weapons, surveillance, job displacement, alignment problem (ensuring AI acts ethically).</li>
  <li><strong>Genetic engineering (CRISPR):</strong> Potential to cure genetic diseases — also germline editing (changes inherited by future generations), designer babies, inequitable access.</li>
  <li><strong>Environmental degradation:</strong> Industrial chemicals, plastics, pesticides, habitat destruction — unintended consequences of technology.</li>
</ul>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="250" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">⚖️ SCIENCE AND SOCIETY — Dual-Use Dilemma</text>
    <text x="250" y="38" text-anchor="middle" font-size="8" fill="#64748b">Science can be used for benefit OR harm — often same knowledge enables both</text>
    
    <!-- Left: Benefits -->
    <g>
      <rect x="15" y="55" width="225" height="180" rx="10" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <rect x="15" y="55" width="225" height="30" rx="10" fill="#22c55e"/>
      <text x="127" y="76" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="800">✅ BENEFITS</text>
      
      <text x="127" y="105" text-anchor="middle" font-size="8" fill="#166534">Medicine: vaccines, antibiotics</text>
      <text x="127" y="122" text-anchor="middle" font-size="8" fill="#166534">Green Revolution: food production</text>
      <text x="127" y="139" text-anchor="middle" font-size="8" fill="#166534">Internet, smartphones, satellites</text>
      <text x="127" y="156" text-anchor="middle" font-size="8" fill="#166534">Clean energy (solar, wind)</text>
      <text x="127" y="173" text-anchor="middle" font-size="8" fill="#166534">Clean water, sanitation</text>
      <text x="127" y="190" text-anchor="middle" font-size="8" fill="#166534">Transportation, aviation</text>
      <text x="127" y="207" text-anchor="middle" font-size="8" fill="#166534">Doubled human lifespan</text>
    </g>
    
    <!-- Right: Risks -->
    <g>
      <rect x="260" y="55" width="225" height="180" rx="10" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <rect x="260" y="55" width="225" height="30" rx="10" fill="#ef4444"/>
      <text x="372" y="76" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="800">⚠️ RISKS / ETHICAL CONCERNS</text>
      
      <text x="372" y="105" text-anchor="middle" font-size="8" fill="#991b1b">Nuclear weapons (existential risk)</text>
      <text x="372" y="122" text-anchor="middle" font-size="8" fill="#991b1b">Climate change from fossil fuels</text>
      <text x="372" y="139" text-anchor="middle" font-size="8" fill="#991b1b">AI: autonomous weapons, bias, job loss</text>
      <text x="372" y="156" text-anchor="middle" font-size="8" fill="#991b1b">Genetic engineering: designer babies</text>
      <text x="372" y="173" text-anchor="middle" font-size="8" fill="#991b1b">Environmental pollution, plastics</text>
      <text x="372" y="190" text-anchor="middle" font-size="8" fill="#991b1b">Antibiotic resistance</text>
      <text x="372" y="207" text-anchor="middle" font-size="8" fill="#991b1b">Inequitable access to technology</text>
    </g>
  </svg>
</div>

<h3 class="learn-subheading">Ethics of Human Subjects Research</h3>

<p class="learn-p">Horrific experiments in the 20th century led to ethical regulations protecting human research subjects.</p>

<p class="learn-p"><strong>Nazi experiments (1930s-40s):</strong> Concentration camp prisoners subjected to deadly experiments without consent. Led to <strong>Nuremberg Code (1947)</strong> — established requirement for informed consent, benefit must outweigh risk, right to withdraw.</p>

<p class="learn-p"><strong>Tuskegee Syphilis Study (1932-1972, US):</strong> Poor Black men with syphilis were studied but not told they had syphilis; denied treatment even after penicillin became standard. Led to <strong>Belmont Report (1978)</strong> and <strong>Common Rule</strong> — principles: respect for persons (informed consent), beneficence (maximize benefits, minimize harms), justice (fair distribution of research burdens and benefits).</p>

<p class="learn-p"><strong>Informed consent requirements today:</strong></p>
<ul class="learn-list">
  <li>Information: Participants must understand purpose, procedures, risks, benefits, alternatives</li>
  <li>Voluntariness: No coercion or undue influence</li>
  <li>Capacity: Participants must be able to make informed decision</li>
  <li>Ongoing: Consent can be withdrawn at any time</li>
</ul>

<p class="learn-p"><strong>Institutional Review Boards (IRBs):</strong> Committees that review research proposals involving human subjects to ensure ethical standards are met.</p>

<h3 class="learn-subheading">Scientific Misconduct — Fraud, Plagiarism, and Questionable Practices</h3>

<p class="learn-p">Science relies on trust — but misconduct erodes that trust.</p>

<p class="learn-p"><strong>Types of misconduct:</strong></p>
<ul class="learn-list">
  <li><strong>Fabrication:</strong> Making up data (e.g., Andrew Wakefield's fraudulent 1998 paper linking MMR vaccine to autism — led to vaccination decline, disease outbreaks).</li>
  <li><strong>Falsification:</strong> Manipulating or changing data to get desired results.</li>
  <li><strong>Plagiarism:</strong> Using others' work without attribution.</li>
</ul>

<p class="learn-p"><strong>Questionable research practices (QRPs):</strong></p>
<ul class="learn-list">
  <li><strong>P-hacking:</strong> Collecting data until p < 0.05, then stopping. Running multiple analyses and reporting only significant ones. Excluding outliers without justification.</li>
  <li><strong>HARKing:</strong> Hypothesizing After Results are Known — presenting post hoc hypotheses as if they were predicted in advance.</li>
  <li><strong>Publication bias:</strong> Only submitting/accepting positive results — leads to overestimation of effects.</li>
</ul>

<p class="learn-p"><strong>Consequences of misconduct:</strong> Wasted resources (other scientists pursuing dead ends), erosion of public trust in science, harmful policy decisions based on false data.</p>

<h3 class="learn-subheading">Science Denial and Misinformation</h3>

<p class="learn-p">Despite overwhelming scientific evidence, some reject well-established findings — climate change, evolution, vaccine safety, HIV as cause of AIDS.</p>

<p class="learn-p"><strong>Common strategies of science denial:</strong></p>
<ul class="learn-list">
  <li><strong>Conspiracy theories:</strong> Scientists are part of conspiracy to deceive public</li>
  <li><strong>Fake experts:</strong> Citing individuals with credentials but no relevant expertise</li>
  <li><strong>Cherry-picking:</strong> Selecting only evidence that supports position, ignoring contrary evidence</li>
  <li><strong>Impossible expectations:</strong> Demanding 100% certainty or perfect evidence that science cannot provide</li>
  <li><strong>Logical fallacies:</strong> Moving goalposts, false balance (presenting fringe view as equally credible), ad hominem attacks</li>
</ul>

<p class="learn-p"><strong>Why do people deny science?</strong></p>
<ul class="learn-list">
  <li>Ideology/political identity (climate change denial correlates with political conservatism in US)</li>
  <li>Economic interests (fossil fuel industry funding denial campaigns)</li>
  <li>Religious beliefs (young Earth creationism, intelligent design)</li>
  <li>Mistrust of institutions</li>
  <li>Lack of science literacy</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Concept:</strong> The "replication crisis" refers to the finding that many published results in psychology, biomedicine, and other fields cannot be reproduced. Causes: publication bias, low statistical power, p-hacking, lack of pre-registration. Responses: pre-registration of studies, open data, registered reports (review before results known), larger sample sizes.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "What is the 'replication crisis' and what are its proposed solutions?" (Sample answer: Many published findings cannot be replicated, undermining confidence. Causes: publication bias (positive results overrepresented), p-hacking (analyzing data multiple ways until significant), small samples. Solutions: pre-registration (specifying analysis plan before data collection), registered reports (journals accept based on methods before results), open data (others can reanalyze), larger sample sizes, replication attempts valued as highly as original discoveries.)</span>
</div>
    `,
    questions: [
      { q: "The 'replication crisis' refers to:", o: ["Too many replications", "Inability to replicate many published scientific findings, especially in psychology and biomedicine", "Lack of scientific publications", "Too much data"], a: 1, e: "Replication crisis: many published results cannot be reproduced, raising concerns about reliability of scientific literature.", h: "What can't be reproduced?", yr: "GST" },
      { q: "Which of the following is a cause of the replication crisis?", o: ["Publication bias (positive results overrepresented)", "Large sample sizes", "Pre-registration of studies", "Open data"], a: 0, e: "Publication bias means negative/null results often unpublished, distorting evidence base. Small samples, p-hacking, and lack of pre-registration also contribute.", h: "What distorts the published record?", yr: "GST" },
      { q: "The Nuremberg Code (1947) was established in response to:", o: ["Tuskegee Syphilis Study", "Nazi medical experiments on concentration camp prisoners without consent", "Milgram obedience experiments", "Stanford prison experiment"], a: 1, e: "Nuremberg Code (1947) followed trials of Nazi doctors who conducted deadly experiments. Established informed consent requirement.", h: "What prompted the Nuremberg Code?", yr: "GST" },
      { q: "The Tuskegee Syphilis Study (1932-1972) violated ethical principles because:", o: ["Participants were told they had syphilis", "Participants were treated with penicillin", "Poor Black men with syphilis were studied without informed consent and denied treatment even after penicillin became standard", "It was conducted outside US"], a: 2, e: "Tuskegee: men not told they had syphilis, denied treatment after penicillin available, misled about purpose of study.", h: "What was wrong with Tuskegee?", yr: "GST" },
      { q: "The Belmont Report (1978) established three core principles for human subjects research:", o: ["Speed, efficiency, cost-effectiveness", "Respect for persons (informed consent), beneficence (maximize benefits/minimize harms), justice (fair distribution)", "Confidentiality, anonymity, security", "Replication, falsification, prediction"], a: 1, e: "Belmont principles: respect for persons (autonomy, informed consent), beneficence (do good, avoid harm), justice (fair selection of subjects).", h: "What are the three Belmont principles?", yr: "GST" },
      { q: "P-hacking refers to:", o: ["Using powerful computers for analysis", "Collecting data until p < 0.05, running multiple analyses, excluding outliers to achieve statistical significance", "Pre-registering analysis plans", "Replicating studies"], a: 1, e: "P-hacking: manipulating analysis to get significant p-values (often < 0.05), inflating false positives.", h: "What is a questionable practice to get significant results?", yr: "GST" },
      { q: "Which of the following is a solution proposed to address the replication crisis?", o: ["Smaller sample sizes", "Pre-registration of studies (specifying analysis plan before data collection)", "Discouraging replication attempts", "Secrecy about methods"], a: 1, e: "Pre-registration forces researchers to specify hypotheses and analysis plans before seeing data, reducing p-hacking and HARKing.", h: "What helps prevent p-hacking?", yr: "GST" },
      { q: "Andrew Wakefield's 1998 paper linking MMR vaccine to autism was problematic because:", o: ["It was based on fraudulent data", "It was replicated many times", "It was clearly correct", "It had no impact"], a: 0, e: "Wakefield's paper was fraudulent, led to vaccination decline and disease outbreaks. Retracted by The Lancet. No evidence for link.", h: "What was wrong with Wakefield's study?", yr: "GST" },
      { q: "The 'file drawer problem' refers to:", o: ["Too many published papers", "Studies with null/negative results not submitted or accepted for publication — leading to publication bias", "Missing data", "Poor filing systems"], a: 1, e: "File drawer problem: null results sit in researchers' file drawers, not published. Distorts meta-analyses and evidence base.", h: "Where do null results often go?", yr: "GST" },
      { q: "Which of the following is a common strategy used by science deniers?", o: ["Accepting scientific consensus", "Cherry-picking evidence that supports position while ignoring contrary evidence", "Pre-registering studies", "Replicating findings"], a: 1, e: "Cherry-picking: selecting only favorable evidence, ignoring overwhelming contrary evidence (e.g., citing one discredited study against vaccines while ignoring hundreds supporting safety).", h: "What strategy ignores contrary evidence?", yr: "GST" },
      { q: "Institutional Review Boards (IRBs) are responsible for:", o: ["Funding research", "Reviewing research proposals involving human subjects to ensure ethical standards are met", "Conducting experiments", "Publishing results"], a: 1, e: "IRBs review research protocols to protect human subjects — ensuring informed consent, risk/benefit analysis, fair subject selection.", h: "Who approves human subjects research?", yr: "GST" },
      { q: "The 'dual-use dilemma' refers to:", o: ["Using two research methods", "Research that can be used for both beneficial and harmful purposes (e.g., knowledge enabling both vaccines and bioweapons)", "Two possible outcomes", "Using two funding sources"], a: 1, e: "Dual-use dilemma: same scientific knowledge that enables beneficial applications (vaccines) could also enable harmful applications (bioweapons).", h: "What dilemma has both good and bad uses?", yr: "GST" },
      { q: "HARKing (Hypothesizing After Results are Known) is problematic because:", o: ["It is always fraudulent", "It presents post hoc explanations as if they were predicted in advance, inflating apparent confirmation", "It uses large samples", "It pre-registers hypotheses"], a: 1, e: "HARKing: after seeing results, researchers present post hoc hypotheses as if they were predicted, making results seem more impressive.", h: "What is pretending hypotheses were predicted?", yr: "GST" },
      { q: "Which factor contributes to science denial?", o: ["High science literacy", "Trust in scientific institutions", "Ideology/political identity conflicting with evidence (e.g., climate change denial)", "Acceptance of scientific consensus"], a: 2, e: "When scientific findings conflict with political or religious identities, denial can occur — even among educated people.", h: "What can cause rejection of evidence?", yr: "GST" },
      { q: "The 'precautionary principle' in science policy suggests:", o: ["Always proceed with new technology regardless of risk", "When an action has potential for serious harm, lack of full scientific certainty should not be used as reason to postpone preventive measures", "Ignore potential risks", "Only act when risks are zero"], a: 1, e: "Precautionary principle: potential for serious harm justifies precautionary action even without complete evidence (e.g., climate change).", h: "What principle says act cautiously with uncertain risks?", yr: "GST" },
      { q: "One proposed solution to publication bias is:", o: ["Registered reports — journals accept study based on methods and pre-registration before results are known", "Discouraging replication", "Secrecy", "Smaller sample sizes"], a: 0, e: "Registered reports: journals commit to publishing regardless of results (positive or null) if methods are sound, reducing publication bias.", h: "What journal format accepts before results?", yr: "GST" },
      { q: "The Tuskegee Syphilis Study violated which Belmont principle?", o: ["Only respect for persons", "Only beneficence", "Only justice", "All three: respect (no informed consent), beneficence (harm without benefit), justice (exploited vulnerable population)"], a: 3, e: "Tuskegee violated all three: no informed consent (respect), harmful without benefit (beneficence), exploited poor Black men (justice).", h: "How many Belmont principles did Tuskegee violate?", yr: "GST" },
      { q: "Which industry has been documented to fund research designed to create doubt about scientific consensus (e.g., tobacco causing cancer, fossil fuels causing climate change)?", o: ["Pharmaceutical industry", "Tobacco and fossil fuel industries", "Tech industry", "Agriculture industry"], a: 1, e: "Tobacco industry funded research questioning smoking-cancer link. Fossil fuel industry funded climate change denial.", h: "Which industries created doubt about science?", yr: "GST" },
      { q: "Open data practices aim to address:", o: ["Data security", "Replication crisis and transparency — others can reanalyze data to verify findings", "Data privacy", "Data storage"], a: 1, e: "Open data allows others to reanalyze, check for errors, and attempt replication — increasing transparency and reliability.", h: "What helps others verify results?", yr: "GST" },
      { q: "The 'precautionary principle' is most often applied to which issues?", o: ["Mathematics", "Cosmology", "Climate change, GMOs, chemical regulation (where potential harms are severe and irreversible)", "Pure physics"], a: 2, e: "Precautionary principle applied to environmental and health issues where potential harms are severe (climate change, chemical exposure, GMOs).", h: "Where is precautionary principle used?", yr: "GST" }
    ]
  },
// ============================================================================
// HISTORY AND PHILOSOPHY OF SCIENCE — PART 4 OF 4
// Continuing GST_LEARN_GST_HISTORY array from Part 3
// TOPICS 9, 10
// ============================================================================

  // ==========================================================================
  // TOPIC 9: Contemporary Issues in Science — Climate Change, AI, and Bioethics
  // ==========================================================================
  {
    topic: "Contemporary Issues in Science — Climate Change, AI, and Bioethics",
    topicCode: "HPS-009-01",
    module: "Science and Society",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Contemporary science</span> raises urgent ethical, social, and policy questions. Climate change threatens global civilization. Artificial intelligence promises transformation but also risks. Biotechnology enables unprecedented control over life — from gene editing to synthetic biology. <strong>Understanding these issues is essential for informed citizenship and responsible decision-making</strong>.
</div>

<p class="learn-p">Never before have scientific capabilities been so powerful — and never before have their potential consequences been so significant. Climate change, AI, and biotechnology each pose unique challenges that cut across disciplinary boundaries. Solutions require not just scientific expertise but ethical judgment, political will, and public engagement.</p>

<h3 class="learn-subheading">Climate Change — The Science and the Challenge</h3>

<p class="learn-p"><strong>The scientific consensus:</strong></p>
<ul class="learn-list">
  <li>Earth's average temperature has risen ~1.1°C since pre-industrial times (1850-1900 baseline)</li>
  <li>Human activities (burning fossil fuels, deforestation, agriculture) release greenhouse gases (CO₂, methane, nitrous oxide)</li>
  <li>Greenhouse gases trap heat, causing global warming</li>
  <li>Over 99% of climate scientists agree: humans are causing climate change (NASA, IPCC, national academies of science worldwide)</li>
  <li>IPCC (Intergovernmental Panel on Climate Change) — thousands of scientists assessing climate science, impacts, mitigation</li>
</ul>

<p class="learn-p"><strong>Observed impacts:</strong></p>
<ul class="learn-list">
  <li>Rising sea levels (melting glaciers, ice sheets, thermal expansion)</li>
  <li>More frequent and intense extreme weather — heatwaves, droughts, floods, hurricanes, wildfires</li>
  <li>Ecosystem disruption — coral bleaching, species extinction, shifting ranges</li>
  <li>Agricultural impacts — crop yield declines, food insecurity</li>
  <li>Human health — heat-related illness, infectious disease spread, malnutrition, displacement</li>
</ul>

<p class="learn-p"><strong>Mitigation (reducing emissions) and adaptation (adjusting to impacts):</strong></p>
<ul class="learn-list">
  <li><strong>Mitigation:</strong> Transition to renewable energy (solar, wind, hydro, nuclear), energy efficiency, electric vehicles, reforestation, carbon capture</li>
  <li><strong>Adaptation:</strong> Sea walls, drought-resistant crops, early warning systems, relocating communities</li>
  <li><strong>International agreements:</strong> Kyoto Protocol (1997), Paris Agreement (2015) — aims to limit warming to 1.5-2°C above pre-industrial</li>
  <li><strong>Challenges:</strong> Political will, economic costs (though cheaper than inaction), equity (developing countries need fossil fuels for development, but bear least responsibility for past emissions)</li>
</ul>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="280" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🌡️ CLIMATE CHANGE — Causes, Impacts, Solutions</text>
    
    <!-- Causes -->
    <g>
      <rect x="15" y="45" width="145" height="100" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
      <rect x="15" y="45" width="145" height="25" rx="8" fill="#ef4444"/>
      <text x="87" y="63" text-anchor="middle" font-size="8" fill="#ffffff" font-weight="800">🔥 CAUSES</text>
      <text x="87" y="85" text-anchor="middle" font-size="7" fill="#991b1b">Fossil fuel burning</text>
      <text x="87" y="100" text-anchor="middle" font-size="7" fill="#991b1b">Deforestation</text>
      <text x="87" y="115" text-anchor="middle" font-size="7" fill="#991b1b">Agriculture</text>
      <text x="87" y="130" text-anchor="middle" font-size="7" fill="#991b1b">CO₂, methane, N₂O</text>
    </g>
    
    <line x1="160" y1="95" x2="175" y2="95" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowCC1)"/>
    
    <!-- Impacts -->
    <g>
      <rect x="178" y="45" width="145" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <rect x="178" y="45" width="145" height="25" rx="8" fill="#f59e0b"/>
      <text x="250" y="63" text-anchor="middle" font-size="8" fill="#92400e" font-weight="800">⚠️ IMPACTS</text>
      <text x="250" y="85" text-anchor="middle" font-size="7" fill="#92400e">Sea level rise</text>
      <text x="250" y="100" text-anchor="middle" font-size="7" fill="#92400e">Extreme weather</text>
      <text x="250" y="115" text-anchor="middle" font-size="7" fill="#92400e">Ecosystem collapse</text>
      <text x="250" y="130" text-anchor="middle" font-size="7" fill="#92400e">Food/water insecurity</text>
    </g>
    
    <line x1="323" y1="95" x2="338" y2="95" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowCC1)"/>
    
    <!-- Solutions -->
    <g>
      <rect x="341" y="45" width="145" height="100" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <rect x="341" y="45" width="145" height="25" rx="8" fill="#22c55e"/>
      <text x="413" y="63" text-anchor="middle" font-size="8" fill="#ffffff" font-weight="800">✅ SOLUTIONS</text>
      <text x="413" y="85" text-anchor="middle" font-size="7" fill="#166534">Renewable energy</text>
      <text x="413" y="100" text-anchor="middle" font-size="7" fill="#166534">Energy efficiency</text>
      <text x="413" y="115" text-anchor="middle" font-size="7" fill="#166534">Reforestation</text>
      <text x="413" y="130" text-anchor="middle" font-size="7" fill="#166534">International cooperation</text>
    </g>
    
    <!-- Animated temperature line -->
    <rect x="15" y="165" width="470" height="100" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
    <text x="250" y="185" text-anchor="middle" font-size="9" fill="#1e293b" font-weight="800">📈 GLOBAL TEMPERATURE RISE (1850 - Present)</text>
    
    <polyline points="50,250 120,245 180,240 240,235 300,225 360,215 420,205" fill="none" stroke="#ef4444" stroke-width="3">
      <animate attributeName="points" values="50,250 120,245 180,240 240,235 300,225 360,215 420,205;50,250 120,245 180,240 240,235 300,225 360,215 420,200;50,250 120,245 180,240 240,235 300,225 360,215 420,205" dur="4s" repeatCount="indefinite"/>
    </polyline>
    <circle cx="420" cy="205" r="4" fill="#ef4444">
      <animate attributeName="cy" values="205;200;205" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite"/>
    </circle>
    <text x="420" y="200" text-anchor="middle" font-size="7" fill="#991b1b">↑ ~1.1°C</text>
    
    <defs>
      <marker id="arrowCC1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6"/>
      </marker>
    </defs>
    
    <text x="250" y="275" text-anchor="middle" font-size="8" fill="#64748b">🔑 IPCC consensus >99%: human activities are causing climate change. Urgent action needed.</text>
  </svg>
</div>

<h3 class="learn-subheading">Artificial Intelligence — Promise and Peril</h3>

<p class="learn-p">AI has advanced rapidly in recent years, with large language models (ChatGPT, Claude), image generators (Midjourney, DALL-E), self-driving cars, facial recognition, medical diagnosis, and more.</p>

<p class="learn-p"><strong>Potential benefits:</strong></p>
<ul class="learn-list">
  <li><strong>Healthcare:</strong> Earlier disease detection (cancer from scans), drug discovery acceleration, personalized treatment, robotic surgery</li>
  <li><strong>Education:</strong> Personalized tutoring, accessibility tools for disabilities, language translation</li>
  <li><strong>Science:</strong> Protein folding (AlphaFold), materials discovery, climate modeling, astronomical data analysis</li>
  <li><strong>Productivity:</strong> Automating routine tasks, aiding creative work, improving efficiency</li>
  <li><strong>Accessibility:</strong> Voice recognition for hands-free operation, image description for visually impaired, real-time captioning</li>
</ul>

<p class="learn-p"><strong>Risks and ethical concerns:</strong></p>
<ul class="learn-list">
  <li><strong>Bias and discrimination:</strong> AI trained on biased data perpetuates racism, sexism, other biases. Facial recognition less accurate for darker-skinned faces. Hiring algorithms discriminate against women.</li>
  <li><strong>Privacy:</strong> Mass surveillance, facial recognition in public spaces, data collection without consent</li>
  <li><strong>Autonomous weapons:</strong> Lethal autonomous weapons systems (killer robots) — who is responsible for their actions?</li>
  <li><strong>Job displacement:</strong> Automation could eliminate many jobs (drivers, customer service, data entry, translation, even white-collar work)</li>
  <li><strong>Misinformation and deepfakes:</strong> AI-generated fake videos, images, text — indistinguishable from real — undermining trust</li>
  <li><strong>Concentration of power:</strong> AI development dominated by few large tech companies (Google, Microsoft, OpenAI, Meta, Amazon)</li>
  <li><strong>Existential risk (long-term):</strong> If AI becomes superintelligent (exceeding human intelligence across all domains), ensuring alignment with human values is unsolved problem. Could AI act in ways harmful to humanity?</li>
  <li><strong>Loss of human skills:</strong> Over-reliance on AI could atrophy critical thinking, writing, problem-solving, navigation, memory</li>
  <li><strong>Environmental impact:</strong> Training large AI models consumes enormous energy — carbon footprint concerns</li>
</ul>

<p class="learn-p"><strong>AI governance and ethics frameworks:</strong></p>
<ul class="learn-list">
  <li>Transparency — AI decisions should be explainable</li>
  <li>Accountability — humans responsible for AI harms</li>
  <li>Fairness — algorithms should not discriminate</li>
  <li>Privacy — data collection with consent</li>
  <li>Safety — testing before deployment</li>
  <li>Human control — humans should make life-and-death decisions, not AI</li>
  <li>International cooperation — treaties banning autonomous weapons</li>
</ul>

<h3 class="learn-subheading">Bioethics — Gene Editing, Cloning, and Designer Babies</h3>

<p class="learn-p">Biotechnology gives humans unprecedented ability to modify living organisms — including ourselves. CRISPR-Cas9 (2012) made gene editing precise, inexpensive, and accessible.</p>

<p class="learn-p"><strong>CRISPR-Cas9 — How it works:</strong> Bacterial defense system adapted to cut DNA at specific locations. Enables adding, removing, or modifying genes. Used in research, agriculture (disease-resistant crops), medicine (potential cures for genetic diseases).</p>

<p class="learn-p"><strong>Somatic vs germline editing:</strong></p>
<ul class="learn-list">
  <li><strong>Somatic editing:</strong> Changes affect only the treated individual, not passed to offspring. Widely accepted for treating disease (e.g., editing immune cells to fight cancer).</li>
  <li><strong>Germline editing:</strong> Changes affect sperm, eggs, or embryos — passed to future generations. Controversial — raises ethical questions about consent (future generations cannot consent), unintended consequences, eugenics (designing "better" humans).</li>
</ul>

<p class="learn-p"><strong>He Jiankui case (2018):</strong> Chinese scientist created first gene-edited babies (twin girls, Lulu and Nana) — edited CCR5 gene (hoped to confer HIV resistance). Widely condemned — unethical (informed consent inadequate, unknown risks, violated international consensus). Sentenced to prison.</p>

<p class="learn-p"><strong>Ethical issues in gene editing:</strong></p>
<ul class="learn-list">
  <li><strong>Safety:</strong> Off-target edits could cause cancer or other problems. Long-term effects unknown.</li>
  <li><strong>Informed consent:</strong> Cannot obtain consent from embryos or future generations. Parents' consent insufficient for permanent genetic changes affecting child's entire life.</li>
  <li><strong>Equity:</strong> If gene editing for enhancement becomes available only to wealthy, could create genetic divide (genetic haves and have-nots).</li>
  <li><strong>Eugenics:</strong> Slippery slope from preventing disease to enhancing traits (intelligence, height, appearance, athleticism) to designer babies. Historical eugenics movements (Nazi Germany, forced sterilizations) raise caution.</li>
  <li><strong>Unintended consequences:</strong> Ecosystem impacts if edited organisms released. Unknown long-term effects on human gene pool.</li>
</ul>

<p class="learn-p"><strong>International governance:</strong> Most countries prohibit germline editing for reproduction. Some allow research. No binding international treaty. WHO has guidelines but not enforceable. He Jiankui case showed need for stronger regulation.</p>

<h3 class="learn-subheading">Other Emerging Biotechnologies</h3>

<p class="learn-p"><strong>Synthetic biology:</strong> Designing and building new biological parts, devices, systems — or redesigning existing organisms. Potential: biofuels, biosensors, new medicines, biodegradable materials. Risk: bioweapons, accidental release, unpredictable ecological effects.</p>

<p class="learn-p"><strong>Human cloning:</strong> Reproductive cloning (creating cloned human) — widely banned. Therapeutic cloning (creating embryos for stem cells, not implantation) — less controversial but still debated.</p>

<p class="learn-p"><strong>Mitochondrial replacement therapy ("three-parent baby"):</strong> Replace faulty mitochondrial DNA to prevent inherited diseases. Child has DNA from three people (nuclear DNA from parents, mitochondrial DNA from donor). Legal in UK. Ethical: Should we modify germline? Child cannot consent.</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Concept:</strong> The distinction between therapy (treating or preventing disease) and enhancement (improving traits beyond normal functioning) is central to bioethics. Therapy is generally accepted; enhancement is controversial. But line is blurry — e.g., treating short stature with growth hormone?</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "What is the difference between somatic and germline gene editing? Why is germline editing more controversial?" (Sample answer: Somatic editing affects only treated individual, not passed to offspring — widely accepted for treating disease. Germline editing affects sperm, eggs, or embryos — changes passed to future generations. More controversial because: future generations cannot consent, unknown long-term effects, slippery slope to eugenics and designer babies, inequitable access could create genetic divide.)</span>
</div>
    `,
    questions: [
      { q: "What percentage of climate scientists agree that human activities are causing global warming?", o: ["About 50%", "About 75%", "Over 99%", "Less than 10%"], a: 2, e: "Over 99% of climate scientists agree humans are causing climate change (NASA, IPCC). There is overwhelming scientific consensus.", h: "What is the consensus level?", yr: "GST" },
      { q: "The IPCC is the:", o: ["International Panel on Climate Prediction", "Intergovernmental Panel on Climate Change — assesses climate science, impacts, mitigation", "International Petroleum and Coal Producers", "Institute for Pollution Control"], a: 1, e: "IPCC — thousands of scientists worldwide summarizing climate research for policymakers. Nobel Peace Prize 2007.", h: "What is IPCC?", yr: "GST" },
      { q: "The Paris Agreement (2015) aims to:", o: ["Eliminate all fossil fuels immediately", "Limit global warming to well below 2°C (preferably 1.5°C) above pre-industrial levels", "Ignore climate change", "Increase emissions"], a: 1, e: "Paris Agreement: nearly all countries committed to reducing emissions to limit warming to 1.5-2°C. Each country sets own targets (NDCs).", h: "What temperature limit?", yr: "GST" },
      { q: "Which of the following is a risk of artificial intelligence?", o: ["Improved healthcare", "Bias and discrimination from biased training data", "Faster scientific discovery", "Personalized education"], a: 1, e: "Bias is a risk — AI trained on biased data perpetuates discrimination (racism, sexism). The others are benefits.", h: "Which is a downside?", yr: "GST" },
      { q: "The 'alignment problem' in AI refers to:", o: ["Aligning AI hardware", "Ensuring AI systems act in accordance with human values and intentions, even as they become superintelligent", "Aligning AI with corporate goals", "Aligning AI with military objectives"], a: 1, e: "Alignment problem: how to ensure superintelligent AI pursues goals beneficial to humanity, not harmful ones. Unsolved problem.", h: "What is the challenge of controlling superintelligent AI?", yr: "GST" },
      { q: "Autonomous weapons systems (killer robots) raise concerns about:", o: ["Cost", "Speed", "Accountability — who is responsible when AI kills civilians?", "Energy consumption"], a: 2, e: "Accountability: if autonomous weapon kills without human control, who is responsible? Commander? Manufacturer? AI itself? Difficult.", h: "What is problematic about AI making kill decisions?", yr: "GST" },
      { q: "CRISPR-Cas9 is:", o: ["A new antibiotic", "A gene-editing tool that can precisely cut and modify DNA", "A vaccine technology", "A type of microscope"], a: 1, e: "CRISPR-Cas9 (2012) revolutionized gene editing — precise, inexpensive, accessible. Adapted from bacterial immune system.", h: "What is CRISPR?", yr: "GST" },
      { q: "Somatic gene editing:", o: ["Affects only the treated individual, not passed to offspring", "Affects sperm, eggs, or embryos — changes passed to future generations", "Is banned worldwide", "Is the same as germline editing"], a: 0, e: "Somatic edits affect only treated patient. Widely accepted for treating diseases (e.g., editing immune cells to fight cancer).", h: "Which type is not inherited?", yr: "GST" },
      { q: "Germline gene editing is more controversial than somatic editing because:", o: ["It is cheaper", "It is easier", "Changes are passed to future generations who cannot consent, and unknown long-term effects", "It is more effective"], a: 2, e: "Germline edits affect future generations (children, grandchildren, etc.) who cannot consent. Long-term effects unknown. Risk of unintended consequences.", h: "Why is inheritable genetic change problematic?", yr: "GST" },
      { q: "The He Jiankui case (2018) involved:", o: ["First human cloning", "First gene-edited babies (using CRISPR) — widely condemned as unethical", "First AI diagnosis of cancer", "First vaccine"], a: 1, e: "He Jiankui created first gene-edited babies (CCR5 gene for HIV resistance). Universal condemnation — unethical, inadequate consent, unknown risks.", h: "What did He Jiankui do?", yr: "GST" },
      { q: "Which of the following is an example of AI bias?", o: ["AI playing chess well", "Facial recognition less accurate for darker-skinned faces", "AI translating languages", "AI recommending movies"], a: 1, e: "Facial recognition bias: trained on mostly light-skinned faces, performs worse on darker-skinned faces — leading to false identifications, wrongful arrests.", h: "What shows AI discrimination?", yr: "GST" },
      { q: "Deepfakes are problematic because they:", o: ["Are always obvious fakes", "Enable creation of realistic fake videos/images/text that are hard to distinguish from real — undermining trust and enabling misinformation", "Are only used for entertainment", "Cannot be detected"], a: 1, e: "Deepfakes undermine trust — if any video/audio can be faked, evidence becomes unreliable. Used for misinformation, fraud, harassment.", h: "What problem do AI-generated fakes cause?", yr: "GST" },
      { q: "Mitochondrial replacement therapy ('three-parent baby') involves:", o: ["Cloning humans", "Replacing faulty mitochondrial DNA to prevent inherited diseases — child has DNA from three people", "Gene editing embryos", "Artificial wombs"], a: 1, e: "MRT replaces faulty mitochondrial DNA with donor's healthy mitochondrial DNA. Child has nuclear DNA from parents, mitochondrial DNA from donor.", h: "How many genetic parents?", yr: "GST" },
      { q: "Which of the following is a proposed solution to climate change?", o: ["Increasing fossil fuel use", "Deforestation", "Transition to renewable energy (solar, wind, nuclear)", "Ignoring the problem"], a: 2, e: "Renewable energy (solar, wind, hydro, nuclear) reduces CO₂ emissions. Fossil fuels and deforestation worsen climate change.", h: "What reduces emissions?", yr: "GST" },
      { q: "The distinction between therapy and enhancement in bioethics is:", o: ["Clear and uncontroversial", "Therapy treats/prevents disease; enhancement improves traits beyond normal functioning — line can be blurry (e.g., treating short stature)", "Same thing", "Never discussed"], a: 1, e: "Therapy (treating disease) generally accepted; enhancement (improving normal traits) controversial. But line blurry — is improving height therapy or enhancement?", h: "What is the difference between fixing problems and adding abilities?", yr: "GST" },
      { q: "Which of the following is a concern about AI job displacement?", o: ["Too many jobs", "Automation could eliminate many jobs faster than new jobs created, causing unemployment and inequality", "AI will never replace human workers", "Only blue-collar jobs at risk"], a: 1, e: "AI could automate many jobs — drivers, customer service, data entry, translation, even white-collar work — potentially displacing many workers.", h: "What is the economic concern with AI?", yr: "GST" },
      { q: "The precautionary principle applied to gene editing suggests:", o: ["Proceed with germline editing immediately", "In absence of full certainty about safety, caution is warranted — especially for inheritable changes", "Ignore potential risks", "Only benefits matter"], a: 1, e: "Precautionary principle: potential for serious harm (even without complete evidence) justifies caution. Many argue germline editing should not proceed until safety proven.", h: "What principle says be cautious with uncertain risks?", yr: "GST" },
      { q: "Which international agreement aims to limit global warming?", o: ["Kyoto Protocol and Paris Agreement", "Geneva Convention", "Nuclear Non-Proliferation Treaty", "Universal Declaration of Human Rights"], a: 0, e: "Kyoto Protocol (1997) and Paris Agreement (2015) are UN climate treaties aiming to reduce emissions and limit warming.", h: "What are the climate agreements?", yr: "GST" },
      { q: "Synthetic biology raises concerns about:", o: ["Only economic issues", "Bioweapons, accidental release, unpredictable ecological effects from designed organisms", "Only energy use", "Only cost"], a: 1, e: "Synthetic biology (designing new biological systems) could be misused for bioweapons, accidentally release organisms with harmful effects, disrupt ecosystems.", h: "What are the risks of designing new life forms?", yr: "GST" },
      { q: "Which ethical principle is violated by AI systems that make decisions without explanation?", o: ["Transparency — decisions should be explainable, especially when affecting people's lives (loans, hiring, criminal justice)", "Speed", "Efficiency", "Profit"], a: 0, e: "Explainability/transparency: when AI denies loan, parole, job, people deserve explanation. 'Black box' AI (cannot explain decisions) raises accountability concerns.", h: "What principle requires AI to explain its decisions?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 10: The Future of Science and Nigerian Science Development
  // ==========================================================================
  {
    topic: "The Future of Science and Nigerian Science Development",
    topicCode: "HPS-010-01",
    module: "Science and Society",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">The future of science</span> will be shaped by emerging technologies, global challenges, and where research is conducted. For Nigeria, developing scientific capacity is essential for economic diversification, health, agriculture, and sustainable development. <strong>Understanding how science works globally and locally prepares you to participate in building a scientifically literate, innovative Nigeria</strong>.
</div>

<p class="learn-p">Science is no longer the exclusive domain of Europe and North America. China, India, South Korea, and other nations have rapidly built world-class research capacity. Africa, including Nigeria, has immense potential but faces significant challenges in funding, infrastructure, and policy. This final topic examines trends in global science and Nigeria's scientific development.</p>

<h3 class="learn-subheading">Emerging Trends in Global Science</h3>

<p class="learn-p"><strong>Open science:</strong> Movement toward making research outputs (publications, data, code, methods) freely accessible to all. Benefits: accelerates discovery, enables replication, increases transparency, allows global participation. Challenges: funding for open access, quality control, data management.</p>

<p class="learn-p"><strong>Interdisciplinary research:</strong> Major challenges (climate change, pandemic response, food security, AI ethics) require collaboration across disciplines. Bioengineering, computational social science, environmental economics — breaking down traditional boundaries.</p>

<p class="learn-p"><strong>Citizen science:</strong> Public participation in scientific research — eBird (bird observations), Galaxy Zoo (galaxy classification), Foldit (protein folding), COVID symptom trackers. Expands data collection, engages public, improves science literacy.</p>

<p class="learn-p"><strong>Data-intensive science (fourth paradigm):</strong> Big data, machine learning, AI are transforming research — from hypothesis-driven to data-driven discovery. Genomics (sequencing billions of base pairs), astronomy (terabytes of telescope data), climate modeling.</p>

<p class="learn-p"><strong>Responsible research and innovation (RRI):</strong> Framework for aligning research and innovation with societal values, needs, and ethical principles. Emphasizes anticipation (considering future consequences), reflexivity (examining assumptions), inclusion (public engagement), responsiveness (adapting based on feedback).</p>

<h3 class="learn-subheading">Challenges Facing Global Science</h3>

<p class="learn-p"><strong>Funding instability:</strong> Government research budgets unpredictable; short-term funding cycles discourage long-term projects. Increased reliance on private funding may skew priorities toward profit, not public good.</p>

<p class="learn-p"><strong>Publish or perish culture:</strong> Pressure to publish frequently incentivizes questionable practices (p-hacking, HARKing, salami slicing — dividing one study into multiple papers). Evaluation metrics (impact factors, citation counts) imperfect.</p>

<p class="learn-p"><strong>Bias in publishing and funding:</strong> Women and minorities underrepresented in top journals, funding awards, and leadership positions. Western institutions overrepresented; research from developing countries less likely to be published in high-impact journals.</p>

<p class="learn-p"><strong>Public trust in science:</strong> Declining trust in some countries (vaccine hesitancy, climate change denial, conspiracy theories). Scientists must communicate effectively, engage with public, counter misinformation.</p>

<h3 class="learn-subheading">Nigeria's Science Landscape — Current Status</h3>

<p class="learn-p"><strong>Research output:</strong> Nigeria produces significant research in Africa (second after South Africa) — but small globally. Leading fields: public health, tropical medicine, agriculture, materials science, computer science. Collaboration with international partners common.</p>

<p class="learn-p"><strong>Challenges facing Nigerian science:</strong></p>
<ul class="learn-list">
  <li><strong>Funding:</strong> R&D spending very low (% of GDP). TETFund supports universities, but research grants limited compared to developed countries.</li>
  <li><strong>Infrastructure:</strong> Labs lack equipment; unreliable electricity; internet connectivity issues; access to journals limited (though improving with open access).</li>
  <li><strong>Brain drain:</strong> Many top Nigerian scientists work abroad (UK, US, Canada) — better funding, facilities, career opportunities. Remittances helpful, but loss of talent harms local capacity.</li>
  <li><strong>Policy-practice gap:</strong> Many science policies exist but implementation weak. Coordination among agencies limited.</li>
  <li><strong>Commercialization:</strong> Research results rarely translated into products, patents, startups. Weak links between universities and industry.</li>
  <li><strong>Career paths:</strong> Limited academic positions; research careers precarious. Many PhD graduates leave research.</li>
</ul>

<h3 class="learn-subheading">Opportunities and Initiatives</h3>

<p class="learn-p"><strong>Government initiatives:</strong></p>
<ul class="learn-list">
  <li><strong>TETFund (Tertiary Education Trust Fund):</strong> Provides funding for infrastructure, research, staff development in public universities. Significant impact but challenges remain.</li>
  <li><strong>NITDA (National Information Technology Development Agency):</strong> Promotes IT development, digital literacy, tech hubs.</li>
  <li><strong>NUC (National Universities Commission):</strong> Curriculum development, accreditation, quality assurance.</li>
  <li><strong>NASENI (National Agency for Science and Engineering Infrastructure):</strong> Promotes indigenous technology development.</li>
  <li><strong>SHESTCO (Science and Technology Education Post-Basic):</strong> Promotes science education.</li>
</ul>

<p class="learn-p"><strong>International collaborations:</strong></p>
<ul class="learn-list">
  <li>World Bank-funded projects (ACE — African Centres of Excellence)</li>
  <li>UK aid, EU research programmes, Wellcome Trust, Bill & Melinda Gates Foundation</li>
  <li>South-South collaboration (China, India, Brazil)</li>
</ul>

<p class="learn-p"><strong>Tech hubs and innovation:</strong></p>
<ul class="learn-list">
  <li>Lagos: CcHub (Co-creation Hub), Wennovation, Leadspace — supporting startups, tech entrepreneurs</li>
  <li>Abuja, Port Harcourt, other cities: growing ecosystems</li>
  <li>Success stories: Paystack (fintech, acquired by Stripe), Flutterwave, Andela (software development training), Paga, Kuda</li>
</ul>

<p class="learn-p"><strong>Grassroots and community science:</strong></p>
<ul class="learn-list">
  <li>Nigerian Young Academy (NYA) — early-career scientists</li>
  <li>Science communication groups (SciComm Nigeria)</li>
  <li>Social media science communities (Twitter, WhatsApp groups)</li>
  <li>Student research groups, science clubs in universities</li>
</ul>

<h3 class="learn-subheading">Building a Scientific Culture in Nigeria</h3>

<p class="learn-p"><strong>What students can do:</strong></p>
<ul class="learn-list">
  <li>Develop critical thinking skills — evaluate evidence, recognize bias, question claims</li>
  <li>Engage with science beyond coursework — read, attend seminars, join research groups</li>
  <li>Consider research careers — PhD, academia, industry, policy, science communication</li>
  <li>Advocate for science funding, evidence-based policy, science education</li>
  <li>Communicate science to public — write, present, use social media, counter misinformation</li>
</ul>

<p class="learn-p"><strong>What Nigeria needs:</strong></p>
<ul class="learn-list">
  <li>Increased, sustained R&D funding (public and private)</li>
  <li>Improved infrastructure (reliable electricity, internet, lab equipment)</li>
  <li>Better incentives for research careers (competitive salaries, clear promotion paths)</li>
  <li>Stronger university-industry linkages (commercialization, internships, joint research)</li>
  <li>Science education reform (critical thinking, hands-on learning, teacher training)</li>
  <li>Public engagement with science (museums, festivals, media coverage, citizen science)</li>
  <li>Policies to reduce brain drain (better conditions, diaspora engagement, return programs)</li>
</ul>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="250" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🇳🇬 NIGERIAN SCIENCE — Challenges and Opportunities</text>
    
    <!-- Challenges -->
    <g>
      <rect x="15" y="45" width="225" height="180" rx="10" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <rect x="15" y="45" width="225" height="30" rx="10" fill="#ef4444"/>
      <text x="127" y="66" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="800">⚠️ CHALLENGES</text>
      
      <text x="127" y="95" text-anchor="middle" font-size="8" fill="#991b1b">Low R&D funding</text>
      <text x="127" y="115" text-anchor="middle" font-size="8" fill="#991b1b">Poor infrastructure</text>
      <text x="127" y="135" text-anchor="middle" font-size="8" fill="#991b1b">Brain drain</text>
      <text x="127" y="155" text-anchor="middle" font-size="8" fill="#991b1b">Policy-practice gap</text>
      <text x="127" y="175" text-anchor="middle" font-size="8" fill="#991b1b">Weak commercialization</text>
      <text x="127" y="195" text-anchor="middle" font-size="8" fill="#991b1b">Limited career paths</text>
      
      <circle cx="127" cy="212" r="5" fill="#ef4444" opacity="0.5">
        <animate attributeName="r" values="5;9;5" dur="2s" repeatCount="indefinite"/>
      </circle>
    </g>
    
    <!-- Opportunities -->
    <g>
      <rect x="260" y="45" width="225" height="180" rx="10" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <rect x="260" y="45" width="225" height="30" rx="10" fill="#22c55e"/>
      <text x="372" y="66" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="800">✅ OPPORTUNITIES</text>
      
      <text x="372" y="95" text-anchor="middle" font-size="8" fill="#166534">TETFund research funding</text>
      <text x="372" y="115" text-anchor="middle" font-size="8" fill="#166534">International collaborations</text>
      <text x="372" y="135" text-anchor="middle" font-size="8" fill="#166534">Tech hubs (CcHub, Wennovation)</text>
      <text x="372" y="155" text-anchor="middle" font-size="8" fill="#166534">Successful startups (Paystack)</text>
      <text x="372" y="175" text-anchor="middle" font-size="8" fill="#166534">Young scientists (NYA)</text>
      <text x="372" y="195" text-anchor="middle" font-size="8" fill="#166534">Science communication groups</text>
      
      <path d="M290,212 Q310,204 330,212 Q350,220 370,212 Q390,204 410,212 Q430,220 450,212" fill="none" stroke="#22c55e" stroke-width="2" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite"/>
      </path>
    </g>
  </svg>
</div>

<h3 class="learn-subheading">The Role of Universities in Nigerian Science</h3>

<p class="learn-p">Nigerian universities face challenges but remain central to research and training.</p>

<p class="learn-p"><strong>Centres of Excellence (World Bank):</strong> ACE programme established centres in Nigerian universities focusing on specific areas — agriculture (ABU Zaria), renewable energy (UNN), public health (UI, UNIJOS), materials science, etc. Improved infrastructure, research output, international collaboration.</p>

<p class="learn-p"><strong>Research groups and networks:</strong> Despite challenges, many Nigerian researchers maintain active programs — often with international partners. Malaria research (NIMR), vaccine development, crop improvement, AI, materials science.</p>

<p class="learn-p"><strong>Graduate training:</strong> PhD programs expanding (PTDF scholarship scheme for science, technology, engineering). Nigerian Academy of Science (NAS) promotes excellence.</p>

<h3 class="learn-subheading">Conclusion — Science for Sustainable Development</h3>

<p class="learn-p">The UN Sustainable Development Goals (SDGs) — ending poverty, zero hunger, good health and wellbeing, quality education, clean water, clean energy, climate action, peace, justice, partnership — all require science. For Nigeria to achieve these goals, strengthening scientific capacity is not optional — it is essential.</p>

<p class="learn-p">Science is not just for scientists. Understanding how science works, how to evaluate evidence, how to recognize bias and misinformation, and how science interacts with society — these are skills for every citizen. History and Philosophy of Science equips you with these tools.</p>

<p class="learn-p"><strong>Final reflection:</strong> The history of science shows that knowledge grows through hard work, creativity, collaboration, and sometimes revolution. The philosophy of science shows that certainty is elusive but progress is real. The future of science — in Nigeria and globally — depends on people like you: curious, critical, committed, and responsible.</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>What you can do:</strong> Science is not just a career — it's a way of thinking. Whether you become a scientist, teacher, doctor, engineer, lawyer, businessperson, civil servant, or artist, you can:
  <ul class="learn-list" style="margin-top:5px">
    <li>Think critically — question claims, seek evidence</li>
    <li>Communicate clearly — explain scientific concepts to public</li>
    <li>Advocate for evidence-based policy</li>
    <li>Support science education — volunteer, mentor, donate</li>
    <li>Engage with research — even as citizen scientist</li>
    <li>Counter misinformation — share accurate information</li>
  </ul>
  </span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Identify three challenges facing science in Nigeria and propose one solution for each." (Sample answer: Challenges — (1) Low funding: Solution — increase R&D budget, create competitive grants. (2) Brain drain: Solution — improve local research conditions, engagement with diaspora through visiting positions, collaborative grants. (3) Poor infrastructure: Solution — invest in reliable electricity, internet; share regional facilities; use open access resources.)</span>
</div>
    `,
    questions: [
      { q: "Open science aims to:", o: ["Keep research secret", "Make research outputs (publications, data, code) freely accessible to all", "Charge high subscription fees", "Publish only in print"], a: 1, e: "Open science: free access to publications, data, code, methods — accelerates discovery, enables replication, increases transparency.", h: "What does open science make accessible?", yr: "GST" },
      { q: "Citizen science refers to:", o: ["Only scientists can participate", "Public participation in scientific research (e.g., eBird, Galaxy Zoo)", "Government funding of science", "Private sector research"], a: 1, e: "Citizen science involves non-scientists in research — collecting data, classifying images, solving problems — expands capacity and engages public.", h: "What involves the public in research?", yr: "GST" },
      { q: "Nigeria's research output compared to other African countries is:", o: ["Lowest in Africa", "Second highest after South Africa", "Highest in Africa", "Non-existent"], a: 1, e: "Nigeria is second in Africa for research output (after South Africa). Globally, still small but significant growth.", h: "How does Nigeria rank in Africa?", yr: "GST" },
      { q: "Which Nigerian government agency provides funding for university research and infrastructure?", o: ["EFCC", "TETFund (Tertiary Education Trust Fund)", "INEC", "NIMC"], a: 1, e: "TETFund supports public universities with research grants, infrastructure, staff development — crucial for Nigerian science.", h: "What is TETFund?", yr: "GST" },
      { q: "The term 'brain drain' refers to:", o: ["New research methods", "Top scientists leaving Nigeria for better opportunities abroad — loss of talent", "Brain surgery", "Sleep deprivation"], a: 1, e: "Brain drain: emigration of skilled professionals (scientists, doctors, engineers) to countries with better opportunities. Reduces local capacity.", h: "What is loss of skilled workers called?", yr: "GST" },
      { q: "Which of the following is a successful Nigerian tech startup?", o: ["Google", "Paystack (fintech, acquired by Stripe)", "Microsoft", "Amazon"], a: 1, e: "Paystack (Nigerian fintech) acquired by Stripe for $200M+. Also Flutterwave, Andela, Paga, Kuda.", h: "Which Nigerian startup succeeded?", yr: "GST" },
      { q: "The fourth paradigm of science refers to:", o: ["Hypothesis-driven science", "Experimental science", "Theoretical science", "Data-intensive science — big data, AI, machine learning driving discovery"], a: 3, e: "Fourth paradigm: data-intensive science. AI and machine learning find patterns in large datasets — complementing theory, experiment, simulation.", h: "What is data-driven science called?", yr: "GST" },
      { q: "Responsible Research and Innovation (RRI) emphasizes:", o: ["Only speed", "Anticipation, reflexivity, inclusion, responsiveness — aligning research with societal values", "Only profit", "Secrecy"], a: 1, e: "RRI framework: anticipate future consequences, examine assumptions, engage public, adapt based on feedback. Science for public good.", h: "What framework aligns research with society?", yr: "GST" },
      { q: "A challenge facing global science is:", o: ["Too much funding", "Publication bias and 'publish or perish' culture incentivizing questionable practices", "Too many women in science", "Too much replication"], a: 1, e: "Pressure to publish frequently incentivizes p-hacking, HARKing, salami slicing — questionable practices that undermine reliability.", h: "What problem does publication pressure cause?", yr: "GST" },
      { q: "The African Centres of Excellence (ACE) programme is funded by:", o: ["Nigerian government only", "World Bank — establishing research centres in Nigerian universities", "European Union", "Chinese government"], a: 1, e: "World Bank's ACE programme supports research centres in African universities (including Nigeria) in priority fields.", h: "Who funds ACE?", yr: "GST" },
      { q: "Which of the following is a Nigerian science hub supporting tech startups?", o: ["Silicon Valley", "CcHub (Co-creation Hub) in Lagos", "Cambridge Innovation Center", "Station F"], a: 1, e: "CcHub (founded 2010) is Lagos tech hub supporting startups through incubation, funding, mentorship. Other hubs: Wennovation, Leadspace.", h: "What is CcHub?", yr: "GST" },
      { q: "Interdisciplinary research is important because:", o: ["Only one discipline matters", "Major challenges (climate change, pandemics) require collaboration across disciplines", "Disciplines should never mix", "It is easier"], a: 1, e: "Complex problems (climate change, pandemics, food security) need multiple perspectives — natural sciences, social sciences, humanities, engineering.", h: "Why combine disciplines?", yr: "GST" },
      { q: "Nigeria's R&D spending as percentage of GDP is:", o: ["Very high (comparable to US)", "Very low (significantly below global average)", "Average", "Not measured"], a: 1, e: "Nigeria's R&D spending is very low (% of GDP) — far below developed countries and below international target of 1% GDP.", h: "Is R&D funding high or low?", yr: "GST" },
      { q: "The Nigerian Young Academy (NYA) is:", o: ["A primary school", "A network of early-career scientists promoting science and policy engagement", "A government ministry", "A private company"], a: 1, e: "NYA supports young scientists' careers, promotes science-policy engagement, organizes training and networking.", h: "What is NYA?", yr: "GST" },
      { q: "Which of the following would help reduce brain drain from Nigeria?", o: ["Ignore diaspora", "Improve local research conditions, competitive salaries, career paths; engage diaspora through visiting positions and collaborations", "Ban scientists from leaving", "Only increase publications"], a: 1, e: "Brain drain solutions: better local conditions (funding, facilities, salaries), career paths, diaspora engagement (visiting positions, collaborative grants).", h: "How to keep scientists in Nigeria?", yr: "GST" },
      { q: "The 'publish or perish' culture refers to:", o: ["Scientists who do not publish die", "Pressure to publish frequently for career advancement — may incentivize questionable practices", "Only publishing books", "Not publishing at all"], a: 1, e: "Publish or perish: academic careers depend on publication count and journal prestige — pressure that can incentivize shortcuts, questionable practices.", h: "What does 'publish or perish' mean?", yr: "GST" },
      { q: "Sustainable Development Goals (SDGs) relate to science because:", o: ["SDGs ignore science", "SDGs are purely political", "Achieving SDGs (health, food, energy, climate) requires scientific knowledge and innovation", "Science cannot help development"], a: 2, e: "SDGs — ending poverty, zero hunger, good health, clean energy, climate action — all require scientific research, technology, and evidence-based policy.", h: "What helps achieve SDGs?", yr: "GST" },
      { q: "Which Nigerian agency promotes indigenous technology development?", o: ["NITDA", "NASENI (National Agency for Science and Engineering Infrastructure)", "EFCC", "NUC"], a: 1, e: "NASENI promotes indigenous technology development, engineering infrastructure, and local production of scientific equipment.", h: "What is NASENI?", yr: "GST" },
      { q: "One way to strengthen university-industry linkages in Nigeria is:", o: ["Keep universities isolated from industry", "Internships, joint research projects, commercialization offices to translate research into products, patents, startups", "Ignore industry needs", "Only focus on basic research"], a: 1, e: "University-industry linkages include internships, collaborative research, commercialization (patents, licensing, startups). Benefits students, researchers, economy.", h: "How can universities work with industry?", yr: "GST" },
      { q: "Why is science communication important in Nigeria?", o: ["Scientists should never talk to public", "Counter misinformation, build public trust, engage citizens, influence policy", "Only publish in journals", "Keep science secret"], a: 1, e: "Science communication engages public, counters misinformation (vaccine hesitancy, climate denial), builds trust, informs policy, inspires next generation.", h: "Why communicate science to public?", yr: "GST" }
    ]
  }
];
