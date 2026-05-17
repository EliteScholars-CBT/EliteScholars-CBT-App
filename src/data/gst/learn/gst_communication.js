// ============================================================================
// COMMUNICATION SKILLS — COMPLETE LEARNING MODULE (10 TOPICS)
// Based on CCMAS (Core Curriculum and Minimum Academic Standards)
// GST 121 / ENG 111
// ============================================================================

export const GST_LEARN_GST_COMMUNICATION = [
  // ==========================================================================
  // TOPIC 1: Introduction to Communication
  // ==========================================================================
  {
    topic: "Introduction to Communication",
    topicCode: "COM-001-01",
    module: "Foundations of Communication",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Communication</span> is the process of exchanging information, ideas, thoughts, and feelings between people. Derived from the Latin "communicare" meaning "to share," communication is fundamental to human existence — from daily conversations to mass media, from business negotiations to family relationships. <strong>Effective communication is essential for success in university, career, and personal life</strong>.
</div>

<p class="learn-p">Communication is not just about speaking or writing — it involves encoding thoughts into messages, transmitting through channels, decoding by receivers, and providing feedback. Noise (distractions) can disrupt the process. Understanding how communication works helps you become a more effective communicator in academic, professional, and social contexts.</p>

<h3 class="learn-subheading">The Communication Process</h3>

<p class="learn-p">Communication is a dynamic process involving several interconnected elements:</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Element</th><th>Description</th><th>Example</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Sender/Source</th>。<th>The person who initiates the message</th>。<th>Lecturer giving a lecture, manager giving instructions</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Encoding</th>。<th>Converting thoughts into words, symbols, or gestures</th>。<th>Choosing words to explain a concept, writing an email</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Message</th>。<th>The information being conveyed</th>。<th>The content of a speech, a text message, a report</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Channel/Medium</th>。<th>The method used to transmit the message</th>。<th>Face-to-face conversation, phone call, email, WhatsApp, letter</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Receiver</th>。<th>The person for whom the message is intended</th>。<th>Student listening to lecture, employee receiving instructions</th>
      </tr>
      <td><td style="background:#f0fdf4;">Decoding</th>。<th>Interpreting and making sense of the message</th>。<th>Understanding what the lecturer means, reading an email</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Feedback</th>。<th>Response from receiver back to sender</th>。<th>Asking questions, nodding, replying to email, taking action</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Noise</th>。<th>Anything that interferes with message transmission</th>。<th>Background noise, unclear handwriting, language barrier, distraction</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Context</th>。<th>The environment and situation in which communication occurs</th>。<th>Office meeting, classroom lecture, phone conversation, social gathering</th>
      </tr>
    </tbody>
  </table>
</div>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="220" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🔄 THE COMMUNICATION PROCESS</text>
    
    <g>
      <rect x="15" y="45" width="80" height="40" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text x="55" y="70" text-anchor="middle" font-size="9" fill="#1e3a8a" font-weight="800">SENDER</text>
    </g>
    
    <g>
      <rect x="110" y="45" width="80" height="40" rx="6" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <text x="150" y="70" text-anchor="middle" font-size="9" fill="#166534" font-weight="800">ENCODE</text>
    </g>
    
    <g>
      <rect x="205" y="45" width="80" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text x="245" y="70" text-anchor="middle" font-size="9" fill="#92400e" font-weight="800">MESSAGE</text>
    </g>
    
    <g>
      <rect x="300" y="45" width="80" height="40" rx="6" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
      <text x="340" y="70" text-anchor="middle" font-size="9" fill="#831843" font-weight="800">CHANNEL</text>
    </g>
    
    <g>
      <rect x="395" y="45" width="90" height="40" rx="6" fill="#ede9fe" stroke="#a78bfa" stroke-width="2"/>
      <text x="440" y="70" text-anchor="middle" font-size="9" fill="#5b21b6" font-weight="800">RECEIVER</text>
    </g>
    
    <line x1="95" y1="65" x2="110" y2="65" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowC1)"/>
    <line x1="190" y1="65" x2="205" y2="65" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowC1)"/>
    <line x1="285" y1="65" x2="300" y2="65" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowC1)"/>
    <line x1="380" y1="65" x2="395" y2="65" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowC1)"/>
    
    <g>
      <rect x="250" y="130" width="80" height="40" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <text x="290" y="155" text-anchor="middle" font-size="9" fill="#991b1b" font-weight="800">DECODE</text>
    </g>
    
    <line x1="290" y1="85" x2="290" y2="130" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowC1)"/>
    
    <text x="250" y="195" text-anchor="middle" font-size="8" fill="#475569">Feedback flows from receiver back to sender — completing the loop</text>
    
    <defs>
      <marker id="arrowC1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6"/>
      </marker>
    </defs>
  </svg>
</div>

<h3 class="learn-subheading">Models of Communication</h3>

<p class="learn-p">Several models help explain how communication works:</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Model</th><th>Key Features</th><th>Limitation</th><th>Example</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Linear (Aristotle, Shannon-Weaver)</th>。<th>One-way transmission from sender to receiver</th>。<th>Ignores feedback and context</th>。<th>TV broadcast, radio announcement</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Interactive (Schramm)</th>。<th>Includes feedback and field of experience</th>。<th>Still treats communication as sequential</th>。<th>Email exchange, conversation with response</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Transactional (Barnlund)</th>。<th>Simultaneous sending and receiving, shared meaning construction</th>。<th>Complex to analyze</th>。<th>Face-to-face conversation, active dialogue</th>
      </tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">Functions of Communication</h3>

<p class="learn-p">Communication serves multiple essential functions:</p>

<ul class="learn-list">
  <li><strong>Information:</strong> Sharing facts, data, news, instructions (e.g., lecturer explaining a concept, news broadcast)</li>
  <li><strong>Control:</strong> Directing behavior, setting rules, giving orders (e.g., manager assigning tasks, parent setting curfew)</li>
  <li><strong>Motivation:</strong> Inspiring, encouraging, persuading (e.g., pep talk, inspirational speech, performance feedback)</li>
  <li><strong>Emotional expression:</strong> Sharing feelings, building relationships (e.g., telling a friend you care, expressing frustration)</li>
  <li><strong>Social interaction:</strong> Connecting with others, building community (e.g., small talk, greetings, group activities)</li>
</ul>

<h3 class="learn-subheading">The 7 Cs of Effective Communication</h3>

<p class="learn-p">The 7 Cs provide a checklist for clear, effective communication:</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>C</th><th>Principle</th><th>Description</th><th>Example</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">1</th>。<th>Clear</th>。<th>Message easily understood</th>。<th>"Please submit your report by Friday" not "Whenever you get around to it"</th>
      </tr>
      <tr><td style="background:#f0fdf4;">2</th>。<th>Concise</th>。<th>No unnecessary words</th>。<th>"I need the file" not "I was wondering if it would be possible for you to send me the file"</th>
      </tr>
      <tr><td style="background:#f0fdf4;">3</th>。<th>Concrete</th>。<th>Specific, not vague</th>。<th>"Sales increased 15%" not "Sales increased significantly"</th>
      </tr>
      <tr><td style="background:#f0fdf4;">4</th>。<th>Correct</th>。<th>Accurate information, proper grammar</th>。<th>Check facts, spell names correctly, use proper punctuation</th>
      </tr>
      <tr><td style="background:#f0fdf4;">5</th>。<th>Coherent</th>。<th>Logical flow, all points connected</th>。<th>Ideas organized logically, transitions between points</th>
      </tr>
      <tr><td style="background:#f0fdf4;">6</th>。<th>Complete</th>。<th>All necessary information included</th>。<th>Include who, what, when, where, why, how</th>
      </tr>
      <tr><td style="background:#f0fdf4;">7</th>。<th>Courteous</th>。<th>Respectful, polite, considerate</th>。<th>"Please" and "thank you," respectful tone, consider receiver's perspective</th>
      </tr>
    </tbody>
  </table>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>GST Exam Tip:</strong> The 7 Cs are frequently tested. Remember: Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous. When answering questions about effective communication, check which C is being violated.</span>
</div>

<h3 class="learn-subheading">Barriers to Effective Communication</h3>

<p class="learn-p">Barriers interfere with message transmission and understanding:</p>

<ul class="learn-list">
  <li><strong>Physical barriers:</strong> Noise, distance, poor acoustics, bad lighting, technical problems</li>
  <li><strong>Psychological barriers:</strong> Stress, anxiety, anger, prejudice, closed-mindedness, defensiveness</li>
  <li><strong>Semantic barriers:</strong> Different interpretations of words, jargon, ambiguous language, translation issues</li>
  <li><strong>Cultural barriers:</strong> Different norms, values, customs, non-verbal cues, high-context vs low-context differences</li>
  <li><strong>Organizational barriers:</strong> Hierarchical levels, status differences, complex chain of command, information filtering</li>
  <li><strong>Physiological barriers:</strong> Hearing impairment, speech disorders, fatigue, illness, hunger</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Thinker:</strong> Claude Shannon and Warren Weaver developed the linear communication model (1949) which introduced the concept of "noise" — any interference in communication. This model revolutionized how we understand communication technology.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Describe the communication process using the Shannon-Weaver model. What is 'noise' and how does it affect communication?" (Sample answer: The Shannon-Weaver model includes sender, encoder, message, channel, decoder, receiver, and noise. Noise is any interference that distorts the message — physical noise (traffic, static), psychological noise (distraction, stress), or semantic noise (unfamiliar words). Noise reduces clarity and may cause misunderstanding. Effective communicators anticipate and minimize noise.)</span>
</div>
    `,
    questions: [
      { q: "The word 'communication' comes from the Latin 'communicare' meaning:", o: ["To speak", "To share", "To write", "To listen"], a: 1, e: "Communicare means 'to share' — communication is about sharing information, ideas, thoughts, and feelings.", h: "What does 'communicare' mean?", yr: "GST" },
      { q: "In the communication process, 'encoding' refers to:", o: ["Interpreting the message", "Converting thoughts into words or symbols", "The channel used", "The response from receiver"], a: 1, e: "Encoding is the process of converting thoughts, ideas, or feelings into verbal or non-verbal symbols that can be transmitted.", h: "What is turning thoughts into words called?", yr: "GST" },
      { q: "Which element of communication is the response from receiver back to sender?", o: ["Message", "Channel", "Feedback", "Noise"], a: 2, e: "Feedback is the receiver's response — asking questions, nodding, replying, taking action. It completes the communication loop.", h: "What is the receiver's response called?", yr: "GST" },
      { q: "According to the 7 Cs, a message that says 'Sales increased approximately 15-20%' violates which C?", o: ["Courteous", "Concise", "Concrete", "Complete"], a: 2, e: "Concrete means specific, not vague. 'Approximately 15-20%' is vague. Better: 'Sales increased 17%.'", h: "Which C requires specific numbers?", yr: "GST" },
      { q: "Background noise in a classroom is an example of which type of barrier?", o: ["Psychological", "Semantic", "Physical", "Cultural"], a: 2, e: "Physical barriers include environmental factors — noise, distance, poor acoustics, bad lighting.", h: "What type of barrier is environmental noise?", yr: "GST" },
      { q: "Which communication model treats communication as one-way transmission without feedback?", o: ["Transactional", "Interactive", "Linear", "Circular"], a: 2, e: "Linear models (Aristotle, Shannon-Weaver) treat communication as one-way. They ignore feedback and shared meaning.", h: "What model ignores feedback?", yr: "GST" },
      { q: "A manager giving instructions to an employee serves which function of communication?", o: ["Emotional expression", "Control", "Social interaction", "Motivation"], a: 1, e: "Control function directs behavior, sets rules, gives orders — managers controlling employee actions.", h: "What function involves giving orders?", yr: "GST" },
      { q: "Which of the following is NOT one of the 7 Cs?", o: ["Clear", "Creative", "Concrete", "Courteous"], a: 1, e: "The 7 Cs are Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous. 'Creative' is not one.", h: "Which C is NOT in the list?", yr: "GST" },
      { q: "When a Nigerian and a British person misinterpret each other's non-verbal cues, this is a:", o: ["Physical barrier", "Cultural barrier", "Physiological barrier", "Semantic barrier"], a: 1, e: "Cultural barriers arise from different norms, values, customs, and non-verbal communication across cultures.", h: "What barrier involves cultural differences?", yr: "GST" },
      { q: "The transactional model of communication emphasizes:", o: ["One-way transmission", "Simultaneous sending and receiving, shared meaning construction", "Only feedback", "Only noise"], a: 1, e: "Transactional model (Barnlund): participants send and receive simultaneously, co-creating meaning through interaction.", h: "What model involves simultaneous sending and receiving?", yr: "GST" },
      { q: "A lecturer explaining a concept serves which communication function?", o: ["Control", "Information", "Emotional expression", "Social interaction"], a: 1, e: "Information function: sharing facts, data, knowledge — lecturers conveying course content.", h: "What function involves sharing knowledge?", yr: "GST" },
      { q: "Which C requires checking facts, spelling, and grammar?", o: ["Clear", "Concrete", "Correct", "Complete"], a: 2, e: "Correct means accurate information, proper grammar, correct spelling, and appropriate format.", h: "Which C requires accuracy?", yr: "GST" },
      { q: "Shannon and Weaver introduced which concept to communication theory?", o: ["Feedback", "Context", "Noise", "Channel"], a: 2, e: "Shannon-Weaver model introduced 'noise' — any interference that distorts the message.", h: "What concept did Shannon-Weaver introduce?", yr: "GST" },
      { q: "A message that says 'Please submit your report' without specifying when violates which C?", o: ["Clear", "Concise", "Complete", "Courteous"], a: 2, e: "Complete means all necessary information — missing deadline makes message incomplete.", h: "Which C requires including all necessary information?", yr: "GST" },
      { q: "Which element of communication is the medium used to transmit the message?", o: ["Encoding", "Channel", "Decoding", "Feedback"], a: 1, e: "Channel is the medium — face-to-face, phone, email, WhatsApp, letter, radio, television.", h: "What is the medium of transmission called?", yr: "GST" },
      { q: "Feeling stressed about an exam while listening to a lecture is which barrier?", o: ["Physical", "Semantic", "Psychological", "Cultural"], a: 2, e: "Psychological barriers include stress, anxiety, anger, prejudice, defensiveness — internal mental states.", h: "What barrier involves stress and anxiety?", yr: "GST" },
      { q: "A speech that inspires employees to work harder serves which function?", o: ["Control", "Information", "Motivation", "Emotional expression"], a: 2, e: "Motivation function: inspiring, encouraging, persuading, energizing people to take action.", h: "What function inspires people?", yr: "GST" },
      { q: "Which model includes 'field of experience' (shared knowledge and background between communicators)?", o: ["Shannon-Weaver", "Aristotle", "Schramm's interactive model", "Barnlund's transactional"], a: 2, e: "Schramm's model emphasizes shared field of experience — common ground enables effective communication.", h: "What model includes shared experience?", yr: "GST" },
      { q: "Using the word 'jargon' that receiver doesn't understand is which barrier?", o: ["Physical", "Psychological", "Semantic", "Physiological"], a: 2, e: "Semantic barriers involve different interpretations of words, specialized jargon, ambiguous language.", h: "What barrier involves unfamiliar words?", yr: "GST" },
      { q: "The 7 Cs were developed to help communicators achieve:", o: ["Entertainment", "Effectiveness and clarity", "Complexity", "Confusion"], a: 1, e: "The 7 Cs provide a checklist for clear, effective, and professional communication.", h: "What do the 7 Cs help with?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 2: Verbal and Non-Verbal Communication
  // ==========================================================================
  {
    topic: "Verbal and Non-Verbal Communication",
    topicCode: "COM-002-01",
    module: "Types of Communication",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Verbal and non-verbal communication</span> work together to convey meaning. Verbal communication uses words (spoken or written). Non-verbal communication uses body language, voice, space, time, and other cues without words. Research shows that <strong>over 65% of meaning in face-to-face communication comes from non-verbal cues</strong>.
</div>

<p class="learn-p">Understanding both verbal and non-verbal communication is essential for effective interaction. Words convey content; non-verbal cues convey relationship, emotion, and attitude. When verbal and non-verbal messages conflict, people tend to believe the non-verbal.</p>

<h3 class="learn-subheading">Verbal Communication</h3>

<p class="learn-p">Verbal communication uses language — words, grammar, vocabulary, sentences. It has two forms: oral and written.</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Form</th><th>Examples</th><th>Advantages</th><th>Disadvantages</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Oral</th>。<th>Conversations, meetings, speeches, phone calls, presentations</th>。<th>Immediate feedback, personal, allows questions, tone conveyed</th>。<th>No permanent record, memory dependent, less precise</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Written</th>。<th>Emails, letters, reports, memos, texts, social media posts</th>。<th>Permanent record, precise, can be edited, wide distribution</th>。<th>No immediate feedback, tone ambiguous, can be ignored</th>
      </tr>
    </tbody>
  </table>
</div>

<p class="learn-p"><strong>Characteristics of effective verbal communication:</strong></p>
<ul class="learn-list">
  <li>Use clear, simple language appropriate for audience</li>
  <li>Organize thoughts before speaking/writing</li>
  <li>Be concise — avoid unnecessary words</li>
  <li>Use examples and illustrations</li>
  <li>Check for understanding — ask questions, request feedback</li>
  <li>Adapt tone and style to context (formal vs informal)</li>
</ul>

<h3 class="learn-subheading">Non-Verbal Communication — The Silent Language</h3>

<p class="learn-p">Non-verbal communication conveys meaning without words. It includes:</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Type</th><th>Definition</th><th>Nigerian Examples</th><th>Meaning</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Kinesics (Body Language)</th>。<th>Facial expressions, gestures, posture, movement</th>。<th>Nodding for agreement, head tilt for curiosity, crossed arms for defensiveness</th>。<th>Conveys emotion, attitude, engagement</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Proxemics (Space)</th>。<th>Use of personal space and distance</th>。<th>Intimate (0-18 inches), personal (1.5-4 ft), social (4-12 ft), public (12+ ft)</th>。<th>Indicates relationship, comfort, power</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Paralanguage (Voice)</th>。<th>Tone, pitch, volume, rate, pauses, emphasis</th>。<th>Loud voice for anger or excitement, soft voice for intimacy or fear</th>。<th>Conveys emotion, attitude, emphasis</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Chronemics (Time)</th>。<th>Use of time in communication</th>。<th>Being late shows disrespect; promptness shows respect</th>。<th>Indicates status, respect, priorities</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Haptics (Touch)</th>。<th>Communication through touch</th>。<th>Handshake for greeting; pat on back for encouragement</th>。<th>Conveys warmth, support, dominance</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Oculesics (Eye Contact)</th>。<th>Use of eyes in communication</th>。<th>Direct eye contact = confidence/respect (varies by culture)</th>。<th>Indicates interest, honesty, power</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Artifacts</th>。<th>Objects and accessories</th>。<th>Clothing, jewelry, briefcase, phone, car</th>。<th>Conveys status, identity, professionalism</th>
      </tr>
    </tbody>
  </table>
</div>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="280" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🗣️ NON-VERBAL COMMUNICATION — Types and Meanings</text>
    
    <g>
      <rect x="15" y="45" width="145" height="65" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="87" y="65" text-anchor="middle" font-size="9" fill="#1e3a8a" font-weight="800">😀 KINESICS</text>
      <text x="87" y="82" text-anchor="middle" font-size="7" fill="#1e3a8a">Body language</text>
      <text x="87" y="97" text-anchor="middle" font-size="7" fill="#1e3a8a">Facial expressions, gestures</text>
    </g>
    
    <g>
      <rect x="175" y="45" width="145" height="65" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <text x="247" y="65" text-anchor="middle" font-size="9" fill="#166534" font-weight="800">📍 PROXEMICS</text>
      <text x="247" y="82" text-anchor="middle" font-size="7" fill="#166534">Personal space</text>
      <text x="247" y="97" text-anchor="middle" font-size="7" fill="#166534">Distance zones</text>
    </g>
    
    <g>
      <rect x="335" y="45" width="150" height="65" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="410" y="65" text-anchor="middle" font-size="9" fill="#92400e" font-weight="800">🗣️ PARALANGUAGE</text>
      <text x="410" y="82" text-anchor="middle" font-size="7" fill="#92400e">Voice: tone, pitch, volume</text>
      <text x="410" y="97" text-anchor="middle" font-size="7" fill="#92400e">Rate, pauses, emphasis</text>
    </g>
    
    <g>
      <rect x="15" y="125" width="145" height="65" rx="8" fill="#fce7f3" stroke="#ec4899" stroke-width="1.5"/>
      <text x="87" y="145" text-anchor="middle" font-size="9" fill="#831843" font-weight="800">⏰ CHRONEMICS</text>
      <text x="87" y="162" text-anchor="middle" font-size="7" fill="#831843">Use of time</text>
      <text x="87" y="177" text-anchor="middle" font-size="7" fill="#831843">Punctuality, waiting</text>
    </g>
    
    <g>
      <rect x="175" y="125" width="145" height="65" rx="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="247" y="145" text-anchor="middle" font-size="9" fill="#5b21b6" font-weight="800">✋ HAPTICS</text>
      <text x="247" y="162" text-anchor="middle" font-size="7" fill="#5b21b6">Touch</text>
      <text x="247" y="177" text-anchor="middle" font-size="7" fill="#5b21b6">Handshake, pat, hug</text>
    </g>
    
    <g>
      <rect x="335" y="125" width="150" height="65" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
      <text x="410" y="145" text-anchor="middle" font-size="9" fill="#991b1b" font-weight="800">👁️ OCULESICS</text>
      <text x="410" y="162" text-anchor="middle" font-size="7" fill="#991b1b">Eye contact</text>
      <text x="410" y="177" text-anchor="middle" font-size="7" fill="#991b1b">Gaze direction</text>
    </g>
    
    <text x="250" y="225" text-anchor="middle" font-size="9" fill="#475569">Over 65% of meaning in face-to-face communication is non-verbal</text>
    
    <rect x="50" y="240" width="400" height="30" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
    <text x="250" y="258" text-anchor="middle" font-size="8" fill="#475569">When verbal and non-verbal conflict → people believe the non-verbal</text>
  </svg>
</div>

<h3 class="learn-subheading">Functions of Non-Verbal Communication</h3>

<p class="learn-p">Non-verbal cues serve several important functions:</p>

<ul class="learn-list">
  <li><strong>Repetition:</strong> Repeats verbal message (saying "yes" while nodding)</li>
  <li><strong>Contradiction:</strong> Contradicts verbal message (saying "I'm fine" with tears in eyes)</li>
  <li><strong>Substitution:</strong> Replaces words entirely (waving instead of saying "hello")</li>
  <li><strong>Complementing:</strong> Adds to verbal message (voice emphasis on important words)</li>
  <li><strong>Accenting:</strong> Emphasizes specific parts of message (pounding table for emphasis)</li>
  <li><strong>Regulating:</strong> Controls conversation flow (looking at watch to end conversation, raising hand to speak)</li>
</ul>

<h3 class="learn-subheading">Interpreting Non-Verbal Cues in Nigerian Context</h3>

<p class="learn-p">Different cultures interpret non-verbal cues differently. In Nigeria:</p>
<ul class="learn-list">
  <li>Direct eye contact with elders may be considered disrespectful in some cultures (looking down shows respect)</li>
  <li>Proxemics (personal space) may be smaller than in Western cultures — Nigerians often stand closer when conversing</li>
  <li>Gestures vary: pointing with finger may be rude (use whole hand); "come here" gesture (palm down, fingers curling) is common</li>
  <li>Greetings are elaborate and important — handshake often longer, sometimes with snap</li>
  <li>Time orientation: "African time" (more relaxed punctuality) — though professional settings demand punctuality</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Key Insight:</strong> In Nigerian culture, greetings are essential. Failing to greet properly before stating your business is considered rude. Always greet according to context and relationship — "Good morning, sir" before asking for something.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Explain the functions of non-verbal communication using examples from Nigerian culture." (Sample answer: Repetition — nodding while saying "yes"; Substitution — waving goodbye without speaking; Complementing — speaking loudly while angry; Regulating — looking at watch to signal meeting should end; Contradiction — saying "I'm not angry" while clenching fists. In Nigerian context, avoiding direct eye contact with elders shows respect — contradicting Western interpretation.)</span>
</div>
    `,
    questions: [
      { q: "Which form of verbal communication provides immediate feedback but no permanent record?", o: ["Written", "Oral", "Digital", "Visual"], a: 1, e: "Oral communication (conversations, phone calls, meetings) allows immediate feedback but has no permanent record unless recorded.", h: "What communication form is spoken?", yr: "GST" },
      { q: "Kinesics refers to:", o: ["Personal space", "Body language, facial expressions, gestures", "Use of time", "Voice tone and pitch"], a: 1, e: "Kinesics is the study of body language — facial expressions, gestures, posture, and movement.", h: "What is the study of body language called?", yr: "GST" },
      { q: "What percentage of meaning in face-to-face communication comes from non-verbal cues according to research?", o: ["About 25%", "Over 65%", "About 10%", "100%"], a: 1, e: "Research (Mehrabian) suggests over 65% of meaning comes from non-verbal cues — body language, voice, etc.", h: "How much meaning is non-verbal?", yr: "GST" },
      { q: "When someone says 'I'm fine' but has tears in their eyes, which function of non-verbal communication is occurring?", o: ["Repetition", "Contradiction", "Substitution", "Complementing"], a: 1, e: "Contradiction occurs when non-verbal cues contradict verbal message — tears contradict 'I'm fine'.", h: "What is it called when non-verbal says opposite of words?", yr: "GST" },
      { q: "Proxemics is the study of:", o: ["Voice and tone", "Personal space and distance", "Eye contact", "Touch"], a: 1, e: "Proxemics (Edward Hall) studies how people use personal space and distance in communication — intimate, personal, social, public zones.", h: "What is the study of personal space called?", yr: "GST" },
      { q: "In Nigerian culture, avoiding direct eye contact with an elder often signals:", o: ["Dishonesty", "Respect", "Anger", "Confusion"], a: 1, e: "In many Nigerian cultures, direct eye contact with elders may be considered disrespectful; looking down shows respect.", h: "What does avoiding eye contact with elders often mean in Nigeria?", yr: "GST" },
      { q: "Paralanguage includes all EXCEPT:", o: ["Tone and pitch", "Volume and rate", "Pauses and emphasis", "Facial expressions"], a: 3, e: "Paralanguage is voice-related — tone, pitch, volume, rate, pauses. Facial expressions are kinesics, not paralanguage.", h: "What is NOT part of paralanguage?", yr: "GST" },
      { q: "Waving goodbye instead of saying 'goodbye' is an example of which non-verbal function?", o: ["Repetition", "Contradiction", "Substitution", "Complementing"], a: 2, e: "Substitution replaces words entirely — waving instead of saying goodbye.", h: "What function replaces words with gestures?", yr: "GST" },
      { q: "Chronemics refers to:", o: ["Use of space", "Use of time", "Use of touch", "Use of voice"], a: 1, e: "Chronemics is the study of how people use and perceive time — punctuality, waiting, time orientation.", h: "What is the study of time in communication?", yr: "GST" },
      { q: "Which non-verbal cue involves the distance zone from 1.5 to 4 feet?", o: ["Intimate distance", "Personal distance", "Social distance", "Public distance"], a: 1, e: "Personal distance (1.5-4 ft) is for conversations with friends, family, close colleagues.", h: "What distance zone is for friends?", yr: "GST" },
      { q: "A speaker pounding the table to emphasize a point demonstrates which non-verbal function?", o: ["Repetition", "Contradiction", "Accenting", "Substitution"], a: 2, e: "Accenting emphasizes specific parts of the message — pounding table to show importance.", h: "What function adds emphasis?", yr: "GST" },
      { q: "Written communication's main disadvantage is:", o: ["No permanent record", "No immediate feedback", "Cannot be edited", "Limited distribution"], a: 1, e: "Written communication lacks immediate feedback — you cannot see receiver's reaction or clarify misunderstandings instantly.", h: "What is the main disadvantage of writing?", yr: "GST" },
      { q: "In Nigerian culture, greetings are considered:", o: ["Optional", "Essential before stating business", "Only for formal occasions", "Unimportant"], a: 1, e: "Greetings are essential in Nigerian culture. Failing to greet properly before stating business is considered rude.", h: "How important are greetings in Nigeria?", yr: "GST" },
      { q: "Haptics refers to:", o: ["Eye contact", "Touch communication", "Personal space", "Body language"], a: 1, e: "Haptics is communication through touch — handshake, pat on back, hug, holding hands.", h: "What is touch communication called?", yr: "GST" },
      { q: "When verbal and non-verbal messages conflict, people tend to:", o: ["Believe the verbal", "Believe the non-verbal", "Ignore both", "Ask for clarification"], a: 1, e: "When words and body language conflict, people typically believe the non-verbal — it's harder to fake.", h: "Which do people trust more when they conflict?", yr: "GST" },
      { q: "Looking at your watch during a conversation signals:", o: ["Interest", "Boredom or desire to end conversation", "Respect", "Confusion"], a: 1, e: "Looking at watch often signals you are checking time, may be bored or want to end the conversation — a regulating cue.", h: "What does looking at watch often signal?", yr: "GST" },
      { q: "Direct eye contact in Western cultures signals:", o: ["Disrespect", "Confidence and honesty", "Fear", "Confusion"], a: 1, e: "In Western cultures, direct eye contact signals confidence, honesty, and engagement — differs from some Nigerian interpretations.", h: "What does direct eye contact signal in the West?", yr: "GST" },
      { q: "Oral communication's main advantage is:", o: ["Permanent record", "Immediate feedback and personal connection", "Precise wording", "Wide distribution"], a: 1, e: "Oral communication allows immediate feedback — you can ask questions, clarify, see reactions, adjust message.", h: "What is the main advantage of speaking?", yr: "GST" },
      { q: "Nodding while saying 'yes' is an example of which non-verbal function?", o: ["Contradiction", "Substitution", "Repetition", "Accenting"], a: 2, e: "Repetition repeats the verbal message — nodding reinforces 'yes'.", h: "What function repeats the verbal message?", yr: "GST" },
      { q: "The 'come here' gesture (palm down, fingers curling) is commonly used in:", o: ["United States", "Japan", "Nigeria", "Germany"], a: 2, e: "In Nigeria, the 'come here' gesture often uses palm down with fingers curling. Pointing with finger may be considered rude.", h: "What gesture is common in Nigeria for 'come here'?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 3: Listening Skills
  // ==========================================================================
  {
    topic: "Listening Skills",
    topicCode: "COM-003-01",
    module: "Core Communication Skills",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Listening</span> is the active process of receiving, attending to, understanding, and responding to spoken messages. Unlike hearing (passive and automatic), listening requires conscious effort and skill. <strong>Effective listening is essential for academic success, professional relationships, and personal connections</strong>.
</div>

<p class="learn-p">Research shows that people spend 45-55% of their communication time listening — more than speaking, reading, or writing. Yet most people have never been trained to listen effectively. Poor listening leads to misunderstandings, errors, conflict, and missed opportunities.</p>

<h3 class="learn-subheading">Hearing vs Listening — The Critical Difference</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Aspect</th><th>Hearing</th><th>Listening</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Process</th>。<th>Passive, automatic</th>。<th>Active, intentional</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Effort</th>。<th>None required</th>。<th>Conscious effort required</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Nature</th>。<th>Physiological</th>。<th>Cognitive + emotional</th>
      </tr>
      <td><td style="background:#f0fdf4;">Occurrence</th>。<th>Happens even during sleep</th>。<th>Requires wakefulness and attention</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Outcome</th>。<th>Sound detected</th>。<th>Meaning understood and remembered</th>
      </tr>
    </tbody>
  </table>
</div>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="220" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">👂 THE LISTENING PROCESS</text>
    
    <g>
      <rect x="15" y="45" width="85" height="50" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text x="57" y="65" text-anchor="middle" font-size="8" fill="#1e3a8a" font-weight="800">RECEIVING</text>
      <text x="57" y="82" text-anchor="middle" font-size="6" fill="#1e3a8a">Hearing sounds</text>
    </g>
    
    <line x1="100" y1="70" x2="110" y2="70" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowL1)"/>
    
    <g>
      <rect x="113" y="45" width="85" height="50" rx="6" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <text x="155" y="65" text-anchor="middle" font-size="8" fill="#166534" font-weight="800">ATTENDING</text>
      <text x="155" y="82" text-anchor="middle" font-size="6" fill="#166534">Focusing attention</text>
    </g>
    
    <line x1="198" y1="70" x2="208" y2="70" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowL1)"/>
    
    <g>
      <rect x="211" y="45" width="85" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text x="253" y="65" text-anchor="middle" font-size="8" fill="#92400e" font-weight="800">UNDERSTANDING</text>
      <text x="253" y="82" text-anchor="middle" font-size="6" fill="#92400e">Decoding meaning</text>
    </g>
    
    <line x1="296" y1="70" x2="306" y2="70" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowL1)"/>
    
    <g>
      <rect x="309" y="45" width="85" height="50" rx="6" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
      <text x="351" y="65" text-anchor="middle" font-size="8" fill="#831843" font-weight="800">RESPONDING</text>
      <text x="351" y="82" text-anchor="middle" font-size="6" fill="#831843">Feedback, questions</text>
    </g>
    
    <line x1="394" y1="70" x2="404" y2="70" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowL1)"/>
    
    <g>
      <rect x="407" y="45" width="80" height="50" rx="6" fill="#ede9fe" stroke="#a78bfa" stroke-width="2"/>
      <text x="447" y="65" text-anchor="middle" font-size="8" fill="#5b21b6" font-weight="800">REMEMBERING</text>
      <text x="447" y="82" text-anchor="middle" font-size="6" fill="#5b21b6">Storing information</text>
    </g>
    
    <text x="250" y="140" text-anchor="middle" font-size="9" fill="#475569">Five stages of the listening process</text>
    
    <rect x="50" y="160" width="400" height="45" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
    <text x="250" y="178" text-anchor="middle" font-size="8" fill="#475569">📌 Most people spend 45-55% of communication time listening</text>
    <text x="250" y="193" text-anchor="middle" font-size="8" fill="#475569">📌 Yet most have never been trained to listen effectively</text>
    
    <defs>
      <marker id="arrowL1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6"/>
      </marker>
    </defs>
  </svg>
</div>

<h3 class="learn-subheading">Types of Listening</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Type</th><th>Purpose</th><th>Example</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Discriminative</th>。<th>Distinguishing sounds, recognizing differences</th>。<th>Recognizing different speakers' voices, hearing emotional tone</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Comprehensive</th>。<th>Understanding and remembering information</th>。<th>Listening to a lecture, following instructions, taking notes</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Critical</th>。<th>Evaluating message, judging credibility, logic</th>。<th>Evaluating a persuasive speech, identifying bias, spotting fallacies</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Empathetic</th>。<th>Understanding speaker's feelings, perspective, without judgment</th>。<th>Listening to a friend's problem, counseling, conflict resolution</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Appreciative</th>。<th>Enjoyment, pleasure, entertainment</th>。<th>Listening to music, comedy, storytelling, poetry</th>
      </tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">Barriers to Effective Listening</h3>

<ul class="learn-list">
  <li><strong>Physical distractions:</strong> Noise, poor acoustics, uncomfortable seating, visual distractions</li>
  <li><strong>Psychological distractions:</strong> Daydreaming, worrying, thinking about response, emotional reactions</li>
  <li><strong>Semantic barriers:</strong> Unfamiliar words, jargon, ambiguous language, language differences</li>
  <li><strong>Speaker-related barriers:</strong> Monotone voice, speaking too fast/slow, disorganized content, accent</li>
  <li><strong>Listener-related barriers:</strong> Prejudging speaker, listening only for facts (not main ideas), faking attention, interrupting, selective listening (hearing only what you want to hear)</li>
  <li><strong>Information overload:</strong> Too much information too quickly — brain cannot process fast enough</li>
</ul>

<h3 class="learn-subheading">Active Listening — Techniques and Skills</h3>

<p class="learn-p">Active listening is a structured way of listening that involves fully concentrating, understanding, responding, and remembering. It requires suspending judgment and focusing on speaker's message.</p>

<p class="learn-p"><strong>Active listening techniques:</strong></p>
<ul class="learn-list">
  <li><strong>Pay attention:</strong> Give speaker your full attention — put away distractions, make eye contact, face speaker, avoid interrupting</li>
  <li><strong>Show you're listening:</strong> Nod, smile, use encouraging sounds ("uh-huh," "I see"), maintain open posture</li>
  <li><strong>Paraphrase:</strong> Restate what speaker said in your own words — "So you're saying that..." "What I hear you saying is..."</li>
  <li><strong>Ask questions:</strong> Clarify unclear points — "Can you tell me more about...?" "What do you mean when you say...?"</li>
  <li><strong>Reflect feelings:</strong> Acknowledge speaker's emotions — "It sounds like you're frustrated..." "You seem excited about..."</li>
  <li><strong>Summarize:</strong> Periodically recap main points — "Let me make sure I understand. You've said that..."</li>
  <li><strong>Withhold judgment:</strong> Listen fully before evaluating — don't formulate response while speaker is still talking</li>
  <li><strong>Take notes:</strong> When appropriate (lectures, meetings), write key points to aid memory</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Practical Exercise — Paraphrasing Practice:</strong> In your next conversation, after the speaker finishes, paraphrase what they said before responding. "So what I hear you saying is..." This forces you to listen actively and ensures understanding before reacting.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "What is the difference between hearing and listening? Why is active listening important in academic settings?" (Sample answer: Hearing is passive, automatic, physiological. Listening is active, intentional, cognitive. Active listening is important in academic settings for following lectures (comprehensive listening), participating in discussions (critical listening), working in groups (empathetic listening), and avoiding misunderstandings that lead to poor grades or conflict.)</span>
</div>
    `,
    questions: [
      { q: "The difference between hearing and listening is that hearing is:", o: ["Active and intentional", "Passive and automatic", "Requires training", "Only about music"], a: 1, e: "Hearing is passive, automatic, physiological — happens without effort. Listening is active, intentional, cognitive — requires effort.", h: "Which one is passive?", yr: "GST" },
      { q: "What percentage of communication time do people spend listening?", o: ["15-25%", "30-40%", "45-55%", "70-80%"], a: 2, e: "Research shows people spend 45-55% of communication time listening — more than speaking, reading, or writing.", h: "How much time is spent listening?", yr: "GST" },
      { q: "A student taking notes during a lecture is primarily using which type of listening?", o: ["Empathetic", "Critical", "Comprehensive", "Appreciative"], a: 2, e: "Comprehensive listening aims to understand and remember information — essential for lectures, instructions, briefings.", h: "What listening type is for learning?", yr: "GST" },
      { q: "Judging the credibility and logic of a persuasive speech requires which type of listening?", o: ["Comprehensive", "Critical", "Empathetic", "Discriminative"], a: 1, e: "Critical listening evaluates message quality — credibility, logic, evidence, bias, fallacies.", h: "What listening type evaluates?", yr: "GST" },
      { q: "Which active listening technique involves restating what the speaker said in your own words?", o: ["Questioning", "Paraphrasing", "Reflecting feelings", "Summarizing"], a: 1, e: "Paraphrasing restates speaker's message in your own words — ensures understanding, shows you're listening.", h: "What technique restates in your own words?", yr: "GST" },
      { q: "Daydreaming during a lecture is an example of which listening barrier?", o: ["Physical", "Semantic", "Psychological", "Speaker-related"], a: 2, e: "Psychological distractions include daydreaming, worrying, thinking about response, emotional reactions — internal mental noise.", h: "What barrier is internal mental distraction?", yr: "GST" },
      { q: "Hearing only what you want to hear (ignoring what you disagree with) is called:", o: ["Active listening", "Selective listening", "Empathetic listening", "Discriminative listening"], a: 1, e: "Selective listening filters messages — hearing only parts that confirm existing beliefs, ignoring contradictory information.", h: "What is hearing only what you want to hear?", yr: "GST" },
      { q: "Acknowledging a speaker's emotion ('It sounds like you're frustrated') is which active listening technique?", o: ["Paraphrasing", "Questioning", "Reflecting feelings", "Summarizing"], a: 2, e: "Reflecting feelings acknowledges the speaker's emotional state — builds empathy and trust.", h: "What technique acknowledges emotions?", yr: "GST" },
      { q: "Which stage of the listening process involves storing information for later recall?", o: ["Receiving", "Attending", "Responding", "Remembering"], a: 3, e: "Remembering is the final stage — encoding information into memory for future retrieval.", h: "What stage is about memory?", yr: "GST" },
      { q: "Listening to a friend talk about their problems without offering advice is an example of:", o: ["Critical listening", "Empathetic listening", "Comprehensive listening", "Appreciative listening"], a: 1, e: "Empathetic listening seeks to understand speaker's feelings and perspective without judgment — not to evaluate or solve.", h: "What listening type is for supporting friends?", yr: "GST" },
      { q: "Fake attention (pretending to listen while mind wanders) is a common:", o: ["Active listening technique", "Listening barrier (pseudo-listening)", "Type of empathetic listening", "Stage of listening"], a: 1, e: "Pseudo-listening is pretending to listen while attention is elsewhere — common and ineffective.", h: "What is fake listening called?", yr: "GST" },
      { q: "The stage of attending in the listening process involves:", o: ["Hearing sounds", "Focusing attention on the message", "Understanding meaning", "Providing feedback"], a: 1, e: "Attending is selectively focusing on the message — filtering out distractions to concentrate.", h: "What stage involves focus?", yr: "GST" },
      { q: "A listener who constantly interrupts the speaker is demonstrating poor:", o: ["Comprehensive listening", "Active listening (failing to let speaker finish)", "Critical listening", "Discriminative listening"], a: 1, e: "Active listening requires letting speaker finish before responding — interrupting shows lack of respect and prevents understanding.", h: "What does interrupting violate?", yr: "GST" },
      { q: "Evaluating a political speech for bias and logical fallacies requires:", o: ["Empathetic listening", "Appreciative listening", "Critical listening", "Discriminative listening"], a: 2, e: "Critical listening evaluates message quality — identifying bias, weak evidence, logical flaws, emotional manipulation.", h: "What listening type evaluates arguments?", yr: "GST" },
      { q: "Summarizing periodically during a conversation helps ensure:", o: ["Confusion", "Shared understanding and agreement", "Faster conversation", "More interruptions"], a: 1, e: "Summarizing confirms understanding, identifies agreements/disagreements, and keeps conversation focused.", h: "What does summarizing help with?", yr: "GST" },
      { q: "Which listening barrier involves unfamiliar words or jargon?", o: ["Physical", "Psychological", "Semantic", "Physiological"], a: 2, e: "Semantic barriers involve meaning — unfamiliar words, technical jargon, ambiguous language, different interpretations.", h: "What barrier involves unknown words?", yr: "GST" },
      { q: "Listening to a comedy show for enjoyment is an example of:", o: ["Comprehensive listening", "Critical listening", "Appreciative listening", "Empathetic listening"], a: 2, e: "Appreciative listening is for pleasure and enjoyment — music, comedy, stories, poetry.", h: "What listening type is for fun?", yr: "GST" },
      { q: "Formulating your response while the speaker is still talking is a form of:", o: ["Active listening", "Poor listening (not fully attending)", "Paraphrasing", "Reflecting"], a: 1, e: "Planning response while speaker talks prevents full attention — you may miss important information and appear disinterested.", h: "What is bad about thinking of reply while listening?", yr: "GST" },
      { q: "Which type of listening is most important for resolving conflicts?", o: ["Comprehensive", "Critical", "Empathetic", "Appreciative"], a: 2, e: "Empathetic listening — understanding each party's perspective, feelings, and needs — is essential for conflict resolution.", h: "What listening type helps resolve conflicts?", yr: "GST" },
      { q: "The responding stage of listening involves:", o: ["Storing information", "Providing feedback — asking questions, paraphrasing, showing understanding", "Decoding meaning", "Focusing attention"], a: 1, e: "Responding provides feedback to speaker — asking questions, paraphrasing, nodding, verbal encouragement.", h: "What stage involves feedback?", yr: "GST" }
    ]
  },
