// ============================================================================
// PEACE, CONFLICT AND RESOLUTION — COMPLETE LEARNING MODULE (10 TOPICS)
// Based on CCMAS (Core Curriculum and Minimum Academic Standards)
// GST 224 / POL 221
// ============================================================================

export const GST_LEARN_GST_PEACE = [
  // ==========================================================================
  // TOPIC 1: Introduction to Peace Studies
  // ==========================================================================
  {
    topic: "Introduction to Peace Studies",
    topicCode: "PCR-001-01",
    module: "Foundations of Peace Studies",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Peace studies</span> is an interdisciplinary field that examines the causes of violence and conflict while exploring pathways to non-violent, just, and sustainable peace. In Nigeria, where diverse ethnic, religious, and regional groups coexist, understanding peace is not merely academic — it is <strong>essential for national survival and development</strong>.
</div>

<p class="learn-p">Peace studies emerged as a distinct academic discipline after the devastating world wars of the 20th century. Scholars realized that if humanity could study war so thoroughly, it could also study peace. Today, peace studies draws from political science, sociology, psychology, history, law, economics, and anthropology. For Nigerian university students, this course provides tools to understand and address the conflicts that have shaped our nation.</p>

<h3 class="learn-subheading">Defining Peace — Beyond Absence of War</h3>

<p class="learn-p">Most people define peace as the absence of war or direct violence. While this is partially correct, peace scholars argue that true peace requires much more. The most influential framework comes from Norwegian sociologist <strong>Johan Galtung</strong>, who distinguished between negative peace and positive peace.</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th style="background:#dcfce7;">Negative Peace</th>
      <th style="background:#dbeafe;">Positive Peace</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Absence of direct violence (war, killing, fighting)</td>
      <td style="background:#eff6ff;">Absence of structural violence (poverty, inequality, oppression)</td>
    </tr>
      <tr><td style="background:#f0fdf4;">Temporary ceasefire or truce</td>
      <td style="background:#eff6ff;">Sustainable, just social order</td>
    </tr>
      <tr><td style="background:#f0fdf4;">Example: Nigeria after Civil War ceasefire (1970)</td>
      <td style="background:#eff6ff;">Example: Society with social justice, equal opportunity, rule of law</td>
    </tr>
      <tr><td style="background:#f0fdf4;">Peace is simply "no fighting"</td>
      <td style="background:#eff6ff;">Peace includes cooperation, development, human rights</td>
    </tr>
    </tbody>
  </table>
</div>

<p class="learn-p">Galtung also identified <strong>cultural violence</strong> — aspects of culture that legitimize direct or structural violence. For example, stereotypes that dehumanize other ethnic groups, religious justifications for violence, or historical narratives that glorify conquest all constitute cultural violence.</p>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="280" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="24" text-anchor="middle" font-size="12" fill="#1e293b" font-family="sans-serif" font-weight="700">🕊️ NEGATIVE vs POSITIVE PEACE — Johan Galtung's Framework</text>
    
    <g>
      <rect x="15" y="45" width="225" height="195" rx="12" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
      <rect x="15" y="45" width="225" height="30" rx="12" fill="#ef4444"/>
      <text x="127" y="66" text-anchor="middle" font-size="12" fill="#ffffff" font-family="sans-serif" font-weight="800">🕊️ NEGATIVE PEACE</text>
      <text x="127" y="98" text-anchor="middle" font-size="9" fill="#991b1b">Absence of direct violence</text>
      <text x="127" y="118" text-anchor="middle" font-size="9" fill="#991b1b">No war, no killing, no fighting</text>
      <text x="127" y="138" text-anchor="middle" font-size="9" fill="#991b1b">But structural violence remains</text>
      <text x="127" y="158" text-anchor="middle" font-size="9" fill="#991b1b">Poverty, inequality, oppression</text>
      <text x="127" y="178" text-anchor="middle" font-size="9" fill="#991b1b">Temporary truce or ceasefire</text>
      <text x="127" y="198" text-anchor="middle" font-size="9" fill="#991b1b">Example: Nigeria 1970 ceasefire</text>
      <circle cx="127" cy="225" r="6" fill="#ef4444" opacity="0.4">
        <animate attributeName="r" values="6; 12; 6" dur="2s" repeatCount="indefinite"/>
      </circle>
    </g>
    
    <g>
      <line x1="240" y1="147" x2="260" y2="147" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrowP1)"/>
      <text x="250" y="142" text-anchor="middle" font-size="8" fill="#3b82f6" font-weight="700">vs</text>
    </g>
    
    <g>
      <rect x="260" y="45" width="225" height="195" rx="12" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
      <rect x="260" y="45" width="225" height="30" rx="12" fill="#22c55e"/>
      <text x="372" y="66" text-anchor="middle" font-size="12" fill="#ffffff" font-weight="800">🕊️ POSITIVE PEACE</text>
      <text x="372" y="98" text-anchor="middle" font-size="9" fill="#166534">Absence of structural violence</text>
      <text x="372" y="118" text-anchor="middle" font-size="9" fill="#166534">No poverty, no inequality</text>
      <text x="372" y="138" text-anchor="middle" font-size="9" fill="#166534">Social justice and human rights</text>
      <text x="372" y="158" text-anchor="middle" font-size="9" fill="#166534">Equal opportunity for all</text>
      <text x="372" y="178" text-anchor="middle" font-size="9" fill="#166534">Sustainable, just social order</text>
      <text x="372" y="198" text-anchor="middle" font-size="9" fill="#166534">Example: Norway or Canada</text>
      <path d="M290,225 Q310,218 330,225 Q350,232 370,225 Q390,218 410,225 Q430,232 450,225" fill="none" stroke="#22c55e" stroke-width="2" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite"/>
      </path>
    </g>
    
    <defs>
      <marker id="arrowP1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6"/>
      </marker>
    </defs>
    
    <text x="250" y="268" text-anchor="middle" font-size="9" fill="#64748b">🔑 Negative peace stops fighting — Positive peace builds a just society</text>
  </svg>
</div>

<h3 class="learn-subheading">Peace in the Nigerian Traditional Context</h3>

<p class="learn-p">Before colonialism, Nigerian societies had rich concepts of peace embedded in their worldviews. Among the <strong>Yoruba</strong>, the word for peace is "alaafia" — which implies not just absence of conflict but physical health, spiritual well-being, prosperity, and good social relations. Among the <strong>Igbo</strong>, "udo" represents peace as harmony within the community, maintained through justice (ikwu aka) and dialogue (ikoro). Among the <strong>Hausa-Fulani</strong>, "zaman lafiya" encompasses peace, security, and tranquility — both physical and spiritual.</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>GST Exam Tip:</strong> Questions often ask you to distinguish negative peace from positive peace using Nigerian examples. Negative peace = ceasefire after Civil War (1970). Positive peace = absence of the inequalities that caused the war.</span>
</div>

<h3 class="learn-subheading">Why Peace Studies Matters for Nigeria</h3>

<p class="learn-p">Nigeria has experienced significant conflicts since independence: the Civil War (1967-1970) claimed over one million lives; ethno-religious crises have killed thousands; Boko Haram insurgency has caused over 35,000 deaths; farmers-herder conflicts now claim hundreds of lives annually. Peace studies equip students with analytical tools to understand these conflicts and contribute to peacebuilding.</p>

<div class="learn-tip-box learn-tip-warn">
  <span class="learn-tip-icon">⚠️</span>
  <span><strong>Critical Thinking:</strong> Diversity alone does not cause conflict — mismanagement of diversity, unequal access to resources, and political exclusion cause conflict. Countries like Switzerland and Canada manage diversity peacefully.</span>
</div>

<h3 class="learn-subheading">Levels of Peace</h3>

<ul class="learn-list">
  <li><strong>Inner Peace (Intrapersonal):</strong> Psychological well-being, freedom from internal turmoil</li>
  <li><strong>Interpersonal Peace:</strong> Peace between individuals in families, friendships, workplaces</li>
  <li><strong>Intergroup Peace:</strong> Peace between ethnic, religious, or other identity groups</li>
  <li><strong>National Peace:</strong> Peace within a country's borders</li>
  <li><strong>International Peace:</strong> Peace between nations</li>
  <li><strong>Global Peace:</strong> Peace at the planetary level — addressing global threats</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Scholar:</strong> Johan Galtung (born 1930) founded peace and conflict studies. He coined "negative peace," "positive peace," "structural violence," and "conflict transformation."</span>
</div>
    `,
    questions: [
      { q: "According to Johan Galtung, what is the difference between negative peace and positive peace?", o: ["Negative peace is local; positive peace is global", "Negative peace is absence of direct violence; positive peace is absence of structural violence", "Negative peace is temporary; positive peace is permanent", "Negative peace requires military intervention; positive peace requires diplomacy"], a: 1, e: "Negative peace means absence of direct violence (war, killing, fighting). Positive peace means absence of structural violence — poverty, inequality, oppression, injustice — and presence of social justice.", h: "Think about what continues to cause conflict even when there's no war.", yr: "GST" },
      { q: "Which of the following is an example of structural violence?", o: ["A military coup overthrowing a democratically elected government", "A riot between ethnic groups in Jos", "A system where one ethnic group is systematically excluded from government employment", "A bomb explosion at a market in Maiduguri"], a: 2, e: "Structural violence is harm caused by social, economic, or political systems — not by a direct actor. Systematic exclusion based on ethnicity is structural violence.", h: "Structural violence is built into systems and institutions.", yr: "GST" },
      { q: "In traditional Yoruba society, the concept of 'alaafia' meant:", o: ["Only the absence of war", "Peace, health, prosperity, and good social relations", "Military victory over enemies", "Submission to the Oba's authority"], a: 1, e: "Alaafia encompasses physical health, spiritual well-being, prosperity, and good social relations — not just absence of conflict.", h: "Traditional African peace concepts were holistic.", yr: "GST" },
      { q: "Which country does NOT have a positive peace tradition despite experiencing negative peace?", o: ["Switzerland", "Norway", "Nigeria after the Civil War ceasefire", "Canada"], a: 2, e: "Nigeria after the 1970 ceasefire had negative peace (fighting stopped) but not positive peace because structural violence remained.", h: "Think about which country continues to experience conflict despite no active war.", yr: "GST" },
      { q: "According to Galtung, what is cultural violence?", o: ["Violence committed during cultural festivals", "Violence against minority cultures", "Aspects of culture that legitimize direct or structural violence", "Violence between different cultural groups"], a: 2, e: "Cultural violence refers to cultural elements — language, symbols, religion, ideology — used to justify direct or structural violence.", h: "Think about how culture can make violence seem acceptable.", yr: "GST" },
      { q: "The Global Peace Index (GPI) measures primarily what type of peace?", o: ["Positive peace", "Cultural peace", "Negative peace", "Spiritual peace"], a: 2, e: "The GPI measures negative peace — absence of violence. Its 23 indicators include conflicts, deaths, violent crime, terrorism, and military spending.", h: "The GPI looks at violence, not justice.", yr: "GST" },
      { q: "Why does peace studies matter for Nigeria? Select all that apply.", o: ["Nigeria has experienced multiple major conflicts since independence", "Conflicts have caused hundreds of thousands of deaths", "Peace is only relevant for Western countries", "Understanding conflict helps prevent future violence"], a: [0,1,3], e: "Nigeria has experienced Civil War, Boko Haram, ethno-religious crises, farmers-herder conflicts. Understanding causes helps prevent future violence.", h: "Consider Nigeria's history since 1960.", yr: "GST" },
      { q: "What is the relationship between peace and development?", o: ["Development causes conflict", "Peace and development are unrelated", "Peace is necessary for development, and development helps sustain peace", "Development automatically creates peace regardless of governance"], a: 2, e: "Peace and development are mutually reinforcing. Peace provides stability needed for investment; development addresses structural grievances that fuel conflict.", h: "Think about whether countries at war can build roads and schools.", yr: "GST" },
      { q: "In Igbo traditional society, 'udo' represented:", o: ["Military conquest", "Harmony within the community maintained through justice and dialogue", "Individual spiritual enlightenment", "Submission to colonial authority"], a: 1, e: "Udo represents peace as harmony within the community, maintained through justice (ikwu aka) and dialogue (ikoro).", h: "Traditional Igbo society valued community consensus.", yr: "GST" },
      { q: "Which best describes Nigeria's Global Peace Index ranking?", o: ["Top 10 most peaceful", "Middle range", "Low peace — among least peaceful", "Not ranked"], a: 2, e: "In 2023, Nigeria ranked 144th out of 163 countries — very low peace levels due to insurgency, banditry, and conflicts.", h: "Nigeria faces multiple active conflicts.", yr: "2023" },
      { q: "What is an example of positive peace?", o: ["A ceasefire agreement", "A peace treaty ending civil war", "A society with equal opportunity, rule of law, and social justice", "A temporary truce"], a: 2, e: "Positive peace means absence of structural violence and presence of justice, equality, and opportunity.", h: "Positive peace is about justice, not just stopping violence.", yr: "GST" },
      { q: "Who is considered the founder of peace and conflict studies?", o: ["Martin Luther King Jr.", "Mahatma Gandhi", "Johan Galtung", "Kofi Annan"], a: 2, e: "Johan Galtung founded the Peace Research Institute Oslo (1959) and coined core concepts of the field.", h: "This Norwegian scholar created many core concepts.", yr: "GST" },
      { q: "Which is an example of cultural violence in Nigeria?", o: ["Military attack on a village", "Stereotype that a particular ethnic group is inherently violent", "Law that discriminates against women", "Poverty in rural communities"], a: 1, e: "Cultural violence involves cultural elements that legitimize violence. A stereotype that an ethnic group is violent justifies discrimination or attack.", h: "Cultural violence is about ideas and beliefs.", yr: "GST" },
      { q: "In Hausa-Fulani tradition, 'zaman lafiya' refers to:", o: ["Only religious peace", "Only political stability", "Peace, security, and tranquility — physical and spiritual", "Economic prosperity"], a: 2, e: "Zaman lafiya encompasses peace, security, and tranquility — both physical and spiritual.", h: "Traditional African peace concepts were holistic.", yr: "GST" },
      { q: "What does the Positive Peace Index measure?", o: ["Number of wars", "Military spending", "Factors that build resilient societies — rule of law, human capital, low corruption", "Number of peace treaties"], a: 2, e: "The Positive Peace Index measures well-functioning government, equitable resource distribution, free flow of information, and low corruption.", h: "Positive peace is about what makes peace sustainable.", yr: "GST" },
      { q: "Which Nigerian conflict exemplifies negative peace achieved but positive peace lacking?", o: ["The Civil War ended in 1970", "EndSARS protest 2020", "Aba Women's Riot 1929", "First Republic 1960-1966"], a: 0, e: "The Civil War ceasefire achieved negative peace, but structural issues (political marginalization, resource control) remain unresolved.", h: "Think about which conflict ended but whose causes remain.", yr: "GST" },
      { q: "What is the relationship between levels of peace?", o: ["Inner peace is unrelated to national peace", "Global peace can exist without interpersonal peace", "Peace at all levels is interconnected", "Only international peace matters"], a: 2, e: "Peace at different levels is interconnected. Inner peace supports interpersonal peace, which supports intergroup peace, which supports national peace.", h: "Think about how personal calm affects relationships and communities.", yr: "GST" },
      { q: "Why is diversity NOT inherently conflict-prone?", o: ["Diverse countries have no conflicts", "Conflict is caused by mismanagement of diversity — not diversity itself", "Only homogenous countries experience conflict", "Diversity automatically creates peace"], a: 1, e: "Diversity alone doesn't cause conflict. Conflict is caused by mismanagement — unequal access, political exclusion, lack of conflict resolution mechanisms.", h: "Look at diverse but peaceful countries like Switzerland.", yr: "GST" },
      { q: "What traditional Igbo institution was responsible for conflict resolution?", o: ["The Oba's court", "The Ogboni society", "The Oha na Eze (council of elders)", "The Alkali court"], a: 2, e: "The Oha na Eze was the Igbo council of elders responsible for community governance, justice, and conflict resolution.", h: "Different ethnic groups had different traditional structures.", yr: "GST" },
      { q: "Why is peace studies mandatory in Nigerian universities?", o: ["To train students to join the military", "Because Nigeria has experienced significant conflicts and understanding peace is essential", "To promote a single political ideology", "Because Western countries require it"], a: 1, e: "Peace studies is mandatory because Nigeria has experienced devastating conflicts and graduates need skills to prevent, manage, and resolve conflicts.", h: "Consider Nigeria's conflict history since independence.", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 2: Understanding Conflict
  // ==========================================================================
  {
    topic: "Understanding Conflict",
    topicCode: "PCR-002-01",
    module: "Foundations of Peace Studies",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Conflict</span> is a natural, inevitable, and potentially constructive aspect of human relationships. Contrary to popular belief, conflict is not inherently negative — it becomes destructive only when managed poorly. In Nigerian contexts, from family disputes to communal clashes to national crises, understanding conflict dynamics is <strong>essential for effective resolution and peacebuilding</strong>.
</div>

<p class="learn-p">Many people equate conflict with violence, but this is a dangerous misunderstanding. Conflict exists whenever two or more parties perceive that their interests, needs, goals, or values are incompatible. Violence is one possible expression of conflict — but conflict can also be expressed through debate, negotiation, litigation, strikes, protests, or constructive dialogue.</p>

<h3 class="learn-subheading">Defining Conflict — Beyond the Dictionary</h3>

<p class="learn-p">The most useful definition comes from Morton Deutsch (1973): <strong>"Conflict exists whenever incompatible activities occur... one party is interfering, or is about to interfere, with the actions of another."</strong> Key elements include: interdependence, perceived incompatibility, scarcity, interference, and interaction.</p>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="250" rx="14" fill="#fff7ed" stroke="#fdba74" stroke-width="1.5"/>
    <text x="250" y="24" text-anchor="middle" font-size="12" fill="#9a3412" font-weight="800">⚡ THE CONFLICT ICEBERG — Visible vs Hidden</text>
    <line x1="50" y1="130" x2="450" y2="130" stroke="#3b82f6" stroke-width="2" stroke-dasharray="8,4"/>
    <text x="250" y="125" text-anchor="middle" font-size="8" fill="#3b82f6">WATER SURFACE (visible 10%)</text>
    <polygon points="250,30 180,130 320,130" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
    <text x="250" y="75" text-anchor="middle" font-size="10" fill="#0369a1" font-weight="800">VISIBLE</text>
    <text x="250" y="90" text-anchor="middle" font-size="8" fill="#0369a1">Position/Behavior</text>
    <text x="250" y="105" text-anchor="middle" font-size="8" fill="#0369a1">Violence, arguing</text>
    <polygon points="250,130 100,240 400,240" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
    <text x="250" y="170" text-anchor="middle" font-size="10" fill="#475569" font-weight="800">HIDDEN (90%)</text>
    <text x="250" y="188" text-anchor="middle" font-size="8" fill="#475569">Interests, needs, values</text>
    <text x="250" y="203" text-anchor="middle" font-size="8" fill="#475569">Fear, mistrust, grievances</text>
    <text x="250" y="218" text-anchor="middle" font-size="8" fill="#475569">WHAT PEOPLE REALLY NEED</text>
    <text x="250" y="245" text-anchor="middle" font-size="9" fill="#64748b">🔑 Visible conflict is only 10% — most is below the surface</text>
  </svg>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>GST Exam Tip:</strong> The iceberg metaphor shows visible conflict (fighting, arguing) is only 10% — hidden elements (interests, needs, fears, grievances) constitute the other 90% where resolution must occur.</span>
</div>

<h3 class="learn-subheading">Sources and Causes of Conflict</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Source Category</th><th>Nigerian Examples</th></tr></thead>
    <tbody>
      <tr><td>Resource Scarcity</td><td>Land (farmers vs herders), oil (Niger Delta), water</td></tr>
      <tr><td>Identity-Based</td><td>Ethnic (Hausa vs Igbo vs Yoruba), religious (Christian vs Muslim)</td></tr>
      <tr><td>Structural/Systemic</td><td>Federal character violations, political exclusion, corruption</td></tr>
      <tr><td>Historical Grievances</td><td>Civil War legacy, colonial divide-and-rule</td></tr>
      <tr><td>Communication Breakdown</td><td>Hate speech, rumors, inflammatory rhetoric</td></tr>
      <tr><td>Power Imbalance</td><td>Ruler-subject, employer-employee, majority-minority</td></tr>
    </tbody>
  </table>
</div>

<p class="learn-p"><strong>The Greed vs Grievance Debate:</strong> Economist Paul Collier asked whether conflicts are caused by "greed" (economic motivations) or "grievance" (political/social motivations). Nigerian conflicts show both factors at play — in Niger Delta, grievance (environmental devastation, marginalization) combined with greed (oil revenues, bunkering).</p>

<h3 class="learn-subheading">Types of Conflict</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Type</th><th>Parties</th><th>Nigerian Example</th></tr></thead>
    <tbody>
      <tr><td>Intrapersonal</td><td>Individual vs self</td><td>Moral dilemma, career choice</td></tr>
      <tr><td>Interpersonal</td><td>Individual vs individual</td><td>Family disputes, landlord-tenant</td></tr>
      <tr><td>Intragroup</td><td>Within same group</td><td>Political party leadership tussles</td></tr>
      <tr><td>Intergroup</td><td>Between groups</td><td>Ethnic/religious conflicts</td></tr>
      <tr><td>Intrastate</td><td>Within a country</td><td>Boko Haram insurgency, Civil War</td></tr>
      <tr><td>Interstate</td><td>Between countries</td><td>Nigeria vs Cameroon (Bakassi)</td></tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">Functions of Conflict — Positive and Negative</h3>

<p class="learn-p"><strong>Positive functions:</strong> clarifies issues, increases motivation, leads to change (e.g., Aba Women's Riot 1929 challenged colonial taxation), strengthens relationships, reveals problems, promotes innovation.</p>

<p class="learn-p"><strong>Negative functions:</strong> violence and destruction, resource waste, relationship damage, psychological trauma, social fragmentation, development setback.</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Scholar:</strong> Lewis Coser wrote "The Functions of Social Conflict" (1956), arguing conflict is not necessarily dysfunctional and can clarify boundaries, increase cohesion, release tension, and lead to social change.</span>
</div>

<h3 class="learn-subheading">Conflict Dynamics — Escalation to Resolution</h3>

<ul class="learn-list">
  <li><strong>Latent Conflict:</strong> Conflict exists but not yet expressed — prevention focus</li>
  <li><strong>Emergence/Escalation:</strong> Conflict becomes visible — de-escalation focus</li>
  <li><strong>Stalemate:</strong> Neither side can win — "ripe moment" for negotiation</li>
  <li><strong>De-escalation/Resolution:</strong> Parties move toward agreement</li>
  <li><strong>Post-Conflict Peacebuilding:</strong> Long-term rebuilding and reconciliation</li>
</ul>

<h3 class="learn-subheading">Conflict Analysis Tools</h3>

<ul class="learn-list">
  <li><strong>Conflict Tree (Problem Tree):</strong> Core problem (trunk), root causes (roots), effects/consequences (branches)</li>
  <li><strong>Stakeholder Analysis:</strong> Identifies all parties affected — primary, secondary, third parties</li>
  <li><strong>Onion Model:</strong> Distinguishes positions (what people say) from interests (why they want it) from needs (fundamental human requirements)</li>
  <li><strong>Conflict Mapping (ABC Triangle):</strong> Analyzes Attitude, Behavior, Context</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Explain why a conflict might escalate from non-violent protest to armed insurgency. Use a Nigerian example." (Sample answer: Niger Delta escalated from peaceful protests to armed militancy due to state repression, lack of government response, availability of weapons, economic incentives, and loss of trust in peaceful channels.)</span>
</div>
    `,
    questions: [
      { q: "According to Morton Deutsch, conflict exists when:", o: ["Parties agree on all issues", "Incompatible activities occur and one party interferes with another", "There is perfect communication", "Resources are abundant"], a: 1, e: "Deutsch defined conflict as existing when incompatible activities occur and one party is interfering with another's actions.", h: "Look for the definition that includes incompatibility and interference.", yr: "GST" },
      { q: "The conflict iceberg metaphor suggests that:", o: ["Most of conflict is visible and easy to resolve", "Only 10% of conflict is visible; 90% is hidden", "Conflict is like ice — cold and hard", "All conflict should be brought to the surface"], a: 1, e: "The iceberg shows visible conflict (fighting) is only 10% — hidden elements (interests, needs, fears) constitute 90% where resolution must occur.", h: "Remember the percentage split.", yr: "GST" },
      { q: "Which is an example of structural violence in Nigeria?", o: ["Boko Haram attack on a village", "Systematic exclusion of a region from federal appointments", "A riot between ethnic groups", "A kidnapping for ransom"], a: 1, e: "Structural violence is harm caused by social, economic, or political systems. Systematic exclusion is structural violence.", h: "Structural violence is built into systems, not caused by a direct actor.", yr: "GST" },
      { q: "According to Paul Collier's greed vs grievance debate, the Niger Delta conflict was fueled by:", o: ["Only greed", "Only grievance", "Both greed and grievance", "Neither greed nor grievance"], a: 2, e: "Niger Delta combined grievance (environmental devastation, marginalization) with greed (oil revenues, illegal bunkering, kidnapping for ransom).", h: "Think about both economic and political motivations.", yr: "GST" },
      { q: "Which is a positive function of conflict?", o: ["Violence and destruction", "Resource waste", "Clarifying issues and revealing problems", "Psychological trauma"], a: 2, e: "Positive functions include clarifying issues, increasing motivation, leading to change, strengthening relationships, revealing problems, and promoting innovation.", h: "Think about how conflict can sometimes improve things.", yr: "GST" },
      { q: "The Aba Women's Riot of 1929 is an example of conflict's positive function because:", o: ["It resulted in many deaths", "It destroyed property", "It successfully challenged colonial taxation policies", "It created permanent violence"], a: 2, e: "The Aba Women's Riot challenged colonial taxation and led to policy changes — showing conflict can catalyze positive social change.", h: "Think about what the protest achieved.", yr: "GST" },
      { q: "In conflict dynamics, the 'ripe moment' for negotiation typically occurs during:", o: ["Latent conflict", "Escalation", "Stalemate", "Resolution"], a: 2, e: "Stalemate creates a 'ripe moment' because neither side can win decisively and both are exhausted, making them willing to negotiate.", h: "When are both sides tired of fighting?", yr: "GST" },
      { q: "The conflict tree tool identifies:", o: ["Only visible violence", "Root causes, core problem, and effects", "Only stakeholders", "Only solutions"], a: 1, e: "The conflict tree identifies root causes (roots), core problem (trunk), and effects/consequences (branches).", h: "Think about a tree's parts.", yr: "GST" },
      { q: "What does the 'onion model' distinguish?", o: ["Farmers from herders", "Positions, interests, and needs", "Men from women", "North from South"], a: 1, e: "The onion model distinguishes positions (what people say they want), interests (why they want it), and needs (fundamental human requirements).", h: "Think about layers of the onion.", yr: "GST" },
      { q: "According to the iceberg metaphor, what is hidden below the surface?", o: ["Violence and fighting", "Arguing and protests", "Interests, needs, fears, and grievances", "Ceasefire agreements"], a: 2, e: "Hidden elements include interests, needs, fears, mistrust, historical grievances, and underlying needs.", h: "What's underneath visible fighting?", yr: "GST" },
      { q: "Which type of conflict involves individuals within the same group?", o: ["Interpersonal", "Intragroup", "Intergroup", "Intrastate"], a: 1, e: "Intragroup conflict occurs within the same group — e.g., leadership tussles within a political party or inheritance disputes within a family.", h: "The prefix 'intra' means within.", yr: "GST" },
      { q: "Which scholar wrote 'The Functions of Social Conflict'?", o: ["Johan Galtung", "Lewis Coser", "Paul Collier", "Morton Deutsch"], a: 1, e: "Lewis Coser (1956) argued conflict is not necessarily dysfunctional and can clarify boundaries, increase cohesion, and lead to social change.", h: "This scholar focused on positive functions of conflict.", yr: "GST" },
      { q: "Which is a negative function of conflict?", o: ["Clarifying issues", "Increasing motivation", "Psychological trauma and relationship damage", "Promoting innovation"], a: 2, e: "Negative functions include violence, destruction, resource waste, relationship damage, psychological trauma, and development setback.", h: "Think about harm caused by conflict.", yr: "GST" },
      { q: "What does stakeholder analysis identify?", o: ["Only the government", "All parties affected by or affecting the conflict", "Only the victims", "Only the perpetrators"], a: 1, e: "Stakeholder analysis identifies all parties affected by or affecting the conflict — primary (directly involved), secondary (indirectly affected), and third parties (external actors).", h: "Who has a stake in the conflict?", yr: "GST" },
      { q: "According to the module, what causes conflict to escalate?", o: ["Good communication", "Abundant resources", "State repression, lack of response, availability of weapons", "Strong trust between parties"], a: 2, e: "Escalation is caused by state repression, lack of government response, availability of weapons, economic incentives, and loss of trust in peaceful channels.", h: "Think about Niger Delta's escalation from protest to militancy.", yr: "GST" },
      { q: "What is the difference between intrastate and interstate conflict?", o: ["Intrastate is between countries; interstate is within a country", "Intrastate is within a country; interstate is between countries", "There is no difference", "Intrastate involves only economic issues"], a: 1, e: "Intrastate conflict occurs within a country (civil war, insurgency). Interstate conflict occurs between countries (international war).", h: "Remember: intra = within, inter = between.", yr: "GST" },
      { q: "Which conflict analysis tool uses the ABC triangle (Attitude, Behavior, Context)?", o: ["Conflict tree", "Stakeholder analysis", "Onion model", "Conflict mapping"], a: 3, e: "Conflict mapping (ABC triangle) analyzes Attitude (perceptions, stereotypes), Behavior (actions), and Context (structural factors).", h: "ABC stands for three dimensions.", yr: "GST" },
      { q: "The Bakassi Peninsula dispute between Nigeria and Cameroon is an example of:", o: ["Intrapersonal conflict", "Interpersonal conflict", "Intrastate conflict", "Interstate conflict"], a: 3, e: "The Bakassi dispute involved Nigeria and Cameroon as countries, making it an interstate conflict. It was resolved by the International Court of Justice in 2002.", h: "Which two countries were involved?", yr: "GST" },
      { q: "What is the 'greed' factor in the greed vs grievance debate?", o: ["Political discrimination", "Historical injustices", "Economic motivations — controlling resources, looting, profiting from war", "Religious persecution"], a: 2, e: "Greed refers to economic motivations — controlling valuable resources, looting, illegal trade, kidnapping for ransom, and profiting from continued conflict.", h: "Think about financial gain from conflict.", yr: "GST" },
      { q: "What does the 'post-conflict peacebuilding' phase focus on?", o: ["Continued fighting", "Long-term rebuilding of institutions, reconciliation, and preventing relapse", "Declaring victory", "Punishing the losers"], a: 1, e: "Post-conflict peacebuilding focuses on long-term work — rebuilding institutions, addressing trauma, promoting reconciliation, and preventing recurrence of conflict.", h: "What needs to happen after a peace agreement?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 3: Theories of Conflict
  // ==========================================================================
  {
    topic: "Theories of Conflict",
    topicCode: "PCR-003-01",
    module: "Foundations of Peace Studies",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Theories of conflict</span> attempt to explain why conflict occurs, how it develops, and under what conditions it becomes violent. Different theories emphasize different causes — human nature, psychological drives, social structures, political systems, economic conditions, or cultural factors. <strong>Understanding these theories helps peacebuilders identify appropriate intervention points</strong>.
</div>

<p class="learn-p">No single theory explains all conflicts. Real-world conflicts typically involve multiple causes operating at different levels. The most effective peacebuilding integrates insights from multiple theoretical perspectives, addressing root causes at each level.</p>

<h3 class="learn-subheading">Biological Theories of Conflict</h3>

<p class="learn-p">Biological theories suggest that conflict and aggression are rooted in human nature, biology, or evolution. <strong>Thomas Hobbes</strong> (1651) argued that humans in a "state of nature" live in constant war of "all against all" — conflict is inevitable without strong government. <strong>Konrad Lorenz</strong> (1966) argued aggression is an innate instinct that evolved because it served survival functions. <strong>Sigmund Freud</strong> proposed a death instinct (Thanatos) that drives aggression. These theories are criticized for biological determinism — ignoring how culture, learning, and social structures shape behavior. If conflict is purely biological, peacebuilding is futile. Most contemporary scholars reject pure biological determinism.</p>

<h3 class="learn-subheading">Psychological Theories of Conflict</h3>

<p class="learn-p">Psychological theories focus on individual and group psychology. <strong>Frustration-Aggression Theory</strong> (Dollard et al., 1939) argues that frustration — the blocking of goal-directed behavior — inevitably leads to some form of aggression. In Nigerian contexts, youth unemployment (frustration of economic goals) may contribute to violence. <strong>Social Identity Theory</strong> (Tajfel & Turner, 1979) argues that people derive part of their identity from group membership, leading to in-group favoritism and out-group discrimination. When groups compete for resources or status, intergroup conflict becomes likely. <strong>Relative Deprivation Theory</strong> argues that conflict arises not from absolute poverty but from perceived gap between what people have and what they believe they deserve compared to others.</p>

<h3 class="learn-subheading">Sociological Theories of Conflict</h3>

<p class="learn-p"><strong>Karl Marx</strong> argued that class conflict — between bourgeoisie (capitalists who own means of production) and proletariat (workers who sell labor) — is the engine of historical change. Conflict is inherent in capitalist societies because the system exploits workers. <strong>Lewis Coser</strong> argued conflict can be functional — clarifying boundaries, increasing group cohesion, releasing tension, and leading to beneficial social change. <strong>Ralf Dahrendorf</strong> argued conflict arises from authority relationships, not just class. Wherever there is authority (state, workplace, family), there is potential for conflict between those who hold authority and those subject to it.</p>

<h3 class="learn-subheading">Political Theories of Conflict</h3>

<p class="learn-p"><strong>Realism</strong> argues that international conflict is driven by the struggle for power in an anarchic system where no central authority exists to enforce rules. States prioritize survival and security, leading to arms races, alliances, and wars. <strong>Liberalism</strong> argues that democratic states rarely fight each other (Democratic Peace Theory), that international institutions (UN, ECOWAS, AU) can reduce conflict, and that economic interdependence makes war less likely. <strong>The Democratic Peace Theory</strong> — democracies almost never fight other democracies — has strong empirical support but exceptions exist. Nigeria's return to democracy in 1999 reduced but did not eliminate internal conflicts.</p>

<h3 class="learn-subheading">Economic Theories of Conflict</h3>

<p class="learn-p"><strong>Greed vs Grievance:</strong> Paul Collier's research on civil wars found that economic factors (greed) — particularly dependence on primary commodities like oil, diamonds, or timber that can be looted — are better predictors of civil war than political grievances. However, both factors matter. <strong>Scarcity Theory</strong> argues that competition over scarce resources (land, water, energy, minerals) causes conflict. Climate change exacerbates scarcity, contributing to conflicts like farmers-herders violence in Nigeria.</p>

<h3 class="learn-subheading">Post-Colonial Theories of Conflict</h3>

<p class="learn-p">Post-colonial theorists argue that contemporary African conflicts cannot be understood without examining colonial legacy. <strong>Artificial borders</strong> drawn by European powers without regard for ethnic, religious, or cultural boundaries created states that contain multiple nations — producing "failed states" vulnerable to conflict. <strong>Divide and rule</strong> colonial strategies pitted groups against each other, creating lasting inter-group distrust and competition. <strong>Extraction economies</strong> established patterns of resource exploitation for European benefit, leaving weak institutions, corruption, and resource curse. In Nigeria, the amalgamation of 1914 united northern and southern protectorates against local will; colonial favoritism toward certain ethnic groups; and oil extraction without local benefit all reflect post-colonial conflict theory.</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Theory</th><th>Key Proponent(s)</th><th>Main Argument</th><th>Nigerian Application</th></tr></thead>
    <tbody>
      <tr><td>Biological</td><td>Hobbes, Lorenz, Freud</td><td>Conflict rooted in human nature/instincts</td><td>Limited — too deterministic</td></tr>
      <tr><td>Psychological</td><td>Tajfel, Turner, Gurr</td><td>Identity, frustration, relative deprivation</td><td>Youth unemployment → frustration → violence</td></tr>
      <tr><td>Sociological</td><td>Marx, Coser, Dahrendorf</td><td>Class conflict, authority relations</td><td>Class and ethnic inequality</td></tr>
      <tr><td>Political</td><td>Realists, Liberals</td><td>Power struggle, democratic peace</td><td>Authoritarian vs democratic governance</td></tr>
      <tr><td>Economic</td><td>Collier, Homer-Dixon</td><td>Greed, scarcity, resource competition</td><td>Oil, land, farmers-herders</td></tr>
      <tr><td>Post-Colonial</td><td>Various African scholars</td><td>Colonial legacy causes contemporary conflict</td><td>Borders, divide-and-rule, extraction economies</td></tr>
    </tbody>
  </table>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>GST Exam Tip:</strong> Questions often ask you to apply theories to Nigerian conflicts. For Boko Haram: psychological (relative deprivation of North-East), economic (poverty, lack of jobs), political (state failure, weak governance), post-colonial (colonial neglect of education in North).</span>
</div>
    `,
    questions: [
      { q: "According to Thomas Hobbes, humans in a 'state of nature' experience:", o: ["Perfect peace and harmony", "Constant war of 'all against all'", "Cooperation and mutual aid", "Abundance of resources"], a: 1, e: "Hobbes argued life in the state of nature was solitary, poor, nasty, brutish, and short — constant war of all against all.", h: "What did Hobbes think life was like without government?", yr: "GST" },
      { q: "Social Identity Theory (Tajfel & Turner) explains intergroup conflict as resulting from:", o: ["Scarcity of resources", "In-group favoritism and out-group discrimination", "Biological instincts", "Economic exploitation"], a: 1, e: "Social Identity Theory argues people derive identity from group membership, leading to in-group favoritism and out-group discrimination — which can escalate to intergroup conflict.", h: "How does group membership affect behavior?", yr: "GST" },
      { q: "According to Relative Deprivation Theory, conflict arises from:", o: ["Absolute poverty", "Perceived gap between what people have and what they believe they deserve", "Abundance of resources", "Strong government institutions"], a: 1, e: "Relative deprivation theory argues conflict arises from perceived gap between expectations and reality — comparing oneself to others or past conditions.", h: "It's about comparison, not just poverty.", yr: "GST" },
      { q: "According to Karl Marx, the fundamental conflict in capitalist society is between:", o: ["Christians and Muslims", "Hausa and Igbo", "Bourgeoisie (capitalists) and proletariat (workers)", "Men and women"], a: 2, e: "Marx argued class conflict between bourgeoisie (own means of production) and proletariat (sell labor) is the engine of historical change.", h: "Which two classes did Marx identify?", yr: "GST" },
      { q: "The Democratic Peace Theory argues that:", o: ["Democracies fight more wars", "Democracies rarely fight other democracies", "Democracies are always peaceful", "Democracy has no relation to peace"], a: 1, e: "Democratic Peace Theory has strong empirical support: democracies almost never fight other democracies, though they may fight non-democracies.", h: "What happens when two democracies face each other?", yr: "GST" },
      { q: "According to Paul Collier's research, civil wars are best predicted by:", o: ["Political grievances", "Ethnic diversity", "Economic dependence on primary commodities that can be looted", "Religious differences"], a: 2, e: "Collier found economic factors — particularly dependence on commodities like oil, diamonds, or timber that can be looted — are better predictors of civil war than grievances.", h: "What makes war profitable?", yr: "GST" },
      { q: "Post-colonial theories argue that contemporary African conflicts result from:", o: ["Traditional African culture", "Colonial legacy — artificial borders, divide-and-rule, extraction economies", "Global warming only", "Population growth only"], a: 1, e: "Post-colonial theorists emphasize colonial legacy: artificial borders that grouped enemies, divide-and-rule strategies that created distrust, and extraction economies that left weak institutions.", h: "What did colonialism leave behind?", yr: "GST" },
      { q: "Which theory best explains the farmers-herders conflict in Nigeria?", o: ["Only biological theory", "Scarcity theory — competition over land and water resources exacerbated by climate change", "Only psychological theory", "Only post-colonial theory"], a: 1, e: "Scarcity theory explains farmers-herders conflict as competition over diminishing land and water resources, exacerbated by climate change, desertification, and population growth.", h: "What are farmers and herders competing for?", yr: "GST" },
      { q: "Konrad Lorenz's theory of aggression suggests that:", o: ["Aggression is learned from culture", "Aggression is an innate instinct that evolved for survival", "Aggression is caused by economic inequality", "Aggression is a modern invention"], a: 1, e: "Lorenz argued aggression is an innate instinct that evolved because it served survival functions (defending territory, competing for mates).", h: "Is aggression in our biology?", yr: "GST" },
      { q: "Which psychological theory suggests frustration inevitably leads to some form of aggression?", o: ["Social Identity Theory", "Relative Deprivation Theory", "Frustration-Aggression Theory", "Democratic Peace Theory"], a: 2, e: "Frustration-Aggression Theory (Dollard et al., 1939) argues that blocking goal-directed behavior leads to frustration, which inevitably produces some form of aggression.", h: "What happens when you can't achieve your goals?", yr: "GST" },
      { q: "According to Ralf Dahrendorf, conflict arises from:", o: ["Only economic class", "Authority relationships wherever authority exists", "Only ethnic differences", "Only religious differences"], a: 1, e: "Dahrendorf argued conflict arises from authority relationships — wherever there is authority (state, workplace, family), there is potential conflict between those who hold authority and those subject to it.", h: "Think about power differences in any organization.", yr: "GST" },
      { q: "The 1914 amalgamation of Nigeria is relevant to which theory of conflict?", o: ["Biological theory", "Psychological theory", "Post-colonial theory", "Economic theory"], a: 2, e: "Post-colonial theory emphasizes the 1914 amalgamation as creating artificial borders that united diverse groups against their will, creating conditions for future conflict.", h: "Which theory focuses on colonial actions?", yr: "GST" },
      { q: "Which theory would explain Boko Haram using both economic conditions (poverty) and psychological factors (relative deprivation)?", o: ["Single-factor theory", "Eclectic/integrative approach using multiple theories", "Biological determinism", "Pure post-colonial theory"], a: 1, e: "Most conflicts require multiple theoretical explanations. Boko Haram involves economic (poverty), psychological (relative deprivation, frustration), political (state failure), and post-colonial (colonial neglect) factors.", h: "Can one theory explain everything?", yr: "GST" },
      { q: "Liberalism's solution to international conflict emphasizes:", o: ["Military buildup", "International institutions, democracy, and economic interdependence", "Isolationism", "Colonial expansion"], a: 1, e: "Liberalism argues international institutions (UN, ECOWAS), spread of democracy, and economic interdependence reduce conflict between nations.", h: "What makes war less likely according to liberals?", yr: "GST" },
      { q: "What is the main criticism of biological theories of conflict?", o: ["They are too optimistic", "They ignore how culture and social structures shape behavior (biological determinism)", "They focus too much on economics", "They only explain international conflict"], a: 1, e: "Biological theories are criticized for biological determinism — ignoring how culture, learning, institutions, and social structures shape human behavior. If conflict is purely biological, peacebuilding is futile.", h: "What do biological theories leave out?", yr: "GST" },
      { q: "Which theory would highlight how colonial education policies created regional inequality in Nigeria?", o: ["Biological theory", "Psychological theory", "Post-colonial theory", "Realist theory"], a: 2, e: "Post-colonial theory examines how colonial policies — including differential investment in education between North and South — created lasting structural inequalities that fuel contemporary conflicts.", h: "Which theory focuses on colonial legacy?", yr: "GST" },
      { q: "According to Realism, international conflict is driven by:", o: ["Economic interdependence", "Struggle for power in an anarchic system with no central authority", "Cultural differences", "Democratic values"], a: 1, e: "Realism argues that in an anarchic international system (no world government), states prioritize survival and security, leading to power struggles, arms races, alliances, and wars.", h: "What happens when there's no police?", yr: "GST" },
      { q: "Lewis Coser's contribution to conflict theory was:", o: ["Conflict is always destructive", "Conflict can have positive functions", "Conflict is caused by biology", "Conflict never leads to change"], a: 1, e: "Coser argued conflict can be functional — clarifying boundaries, increasing group cohesion, releasing tension, and leading to beneficial social change.", h: "Can conflict ever be good?", yr: "GST" },
      { q: "The 'resource curse' thesis relates to which theory?", o: ["Psychological", "Economic — countries with valuable natural resources experience more conflict", "Biological", "Post-colonial only"], a: 1, e: "Economic theory includes the resource curse — countries rich in oil, diamonds, or minerals experience more conflict because resources can be looted to fund rebellion and cause greed-based conflicts.", h: "Is oil wealth always a blessing?", yr: "GST" },
      { q: "Which theory best explains why Nigeria's return to democracy in 1999 reduced but did not eliminate internal conflicts?", o: ["Democratic Peace Theory (applied internally)", "Pure biological theory", "Pure post-colonial theory", "Pure economic theory"], a: 0, e: "Democratic Peace Theory applies to internal conflict as well — democracy provides mechanisms for conflict resolution (elections, courts, free press) that reduce but do not eliminate conflict, especially when democratic institutions remain weak.", h: "How does democracy affect conflict within a country?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 4: Conflict Analysis and Assessment
  // ==========================================================================
  {
    topic: "Conflict Analysis and Assessment",
    topicCode: "PCR-004-01",
    module: "Conflict Analysis Methods",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Conflict analysis</span> is the systematic study of a conflict's causes, dynamics, stakeholders, and potential solutions. Before intervening in any conflict, peacebuilders must understand what is really happening — not just what appears on the surface. <strong>Effective analysis prevents wasted resources, unintended harm, and failed interventions</strong>.
</div>

<p class="learn-p">Conflict analysis is not academic luxury — it is practical necessity. Interventions based on superficial understanding often make conflicts worse. The tools presented here help peacebuilders move beyond simplistic explanations ("ethnic hatred," "religious extremism") to nuanced understanding of multiple interacting causes.</p>

<h3 class="learn-subheading">The Conflict Tree Model (Problem Tree)</h3>

<p class="learn-p">The conflict tree visually separates causes from core problem from effects. The <strong>roots</strong> are underlying causes — structural factors, historical grievances, economic conditions. The <strong>trunk</strong> is the core problem — the central issue that parties are fighting about. The <strong>branches</strong> are effects/consequences — the visible manifestations of conflict (violence, displacement, destruction).</p>

<p class="learn-p"><strong>Example: Farmers-Herders Conflict in Nigeria</strong></p>
<ul class="learn-list">
  <li><strong>Roots:</strong> Climate change (desertification, shrinking grazing land), population growth, encroachment on grazing routes, weak conflict resolution mechanisms, proliferation of small arms</li>
  <li><strong>Trunk (Core Problem):</strong> Violent competition over land and water resources between farmers and herders</li>
  <li><strong>Branches:</strong> Deaths of farmers and herders, destruction of crops and livestock, displacement of communities, ethnic and religious tension, food insecurity, revenge cycles</li>
</ul>

<h3 class="learn-subheading">Stakeholder Analysis</h3>

<p class="learn-p">Stakeholder analysis identifies all parties affected by or affecting the conflict, then analyzes their interests, positions, power, relationships, and potential roles in peacebuilding.</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Stakeholder Category</th><th>Definition</th><th>Farmers-Herders Example</th></tr></thead>
    <tbody>
      <tr><td>Primary</td><td>Directly involved, directly affected</td><td>Farmers, herders</td></tr>
      <tr><td>Secondary</td><td>Not directly involved but affected or can influence</td><td>Local government, traditional rulers, community leaders, vigilantes</td></tr>
      <tr><td>Tertiary/Third Party</td><td>External actors who may mediate or influence</td><td>Federal government, NGOs (WANEP, Search for Common Ground), UN, ECOWAS, media</td></tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">The Onion Model — Positions, Interests, Needs</h3>

<p class="learn-p">The onion model distinguishes three layers of any conflict.</p>
<ul class="learn-list">
  <li><strong>Positions (outer layer):</strong> What parties say they want — usually specific, concrete, and non-negotiable sounding. "We must have grazing reserves established immediately."</li>
  <li><strong>Interests (middle layer):</strong> Why they want it — underlying needs, fears, desires, motivations. "We need our cattle to survive; without grazing land, our livelihood and culture are threatened."</li>
  <li><strong>Needs (core):</strong> Fundamental human requirements — security, identity, recognition, autonomy, participation, dignity. "We need physical security for our families, economic survival, and recognition as legitimate members of society."</li>
</ul>

<p class="learn-p">Negotiating positions leads to compromise or deadlock. Addressing interests and needs leads to resolution. Peacebuilders must help parties move from positions (what they demand) to interests (why they demand it) to needs (what they fundamentally require as human beings).</p>

<h3 class="learn-subheading">Conflict Mapping (ABC Triangle)</h3>

<p class="learn-p">The ABC triangle analyzes three interconnected dimensions of conflict:</p>
<ul class="learn-list">
  <li><strong>A — Attitude:</strong> Perceptions, stereotypes, emotions (fear, anger, mistrust, hatred), values, beliefs. In farmers-herders conflict: herders may be stereotyped as violent intruders; farmers as hostile land-grabbers.</li>
  <li><strong>B — Behavior:</strong> Actions taken — violent (killing, destruction), non-violent (protests, negotiations), or avoidance (flight, withdrawal). In farmers-herders: cattle rustling, crop destruction, village raids, reprisal attacks, displacement.</li>
  <li><strong>C — Context:</strong> Structural factors — history, geography, economy, demography, politics, laws, institutions. In farmers-herders: climate change, population growth, land tenure laws, weak security forces.</li>
</ul>

<p class="learn-p">These three dimensions interact and reinforce each other. Hostile attitudes lead to violent behavior, which hardens hostile attitudes, within a context that enables violence. Peacebuilding must address all three.</p>

<h3 class="learn-subheading">Early Warning Systems</h3>

<p class="learn-p">Early warning systems monitor indicators of escalating conflict to enable preventive action before violence erupts. Indicators include: hate speech in media, arms build-up, population displacement, human rights violations, political instability, economic shocks, natural disasters, elections, inflammatory rhetoric by leaders.</p>

<p class="learn-p">In Nigeria, ECOWARN (ECOWAS Early Warning System) and NEWS (National Early Warning System) attempt to provide early warning, but response remains weak. Most conflicts escalate because warnings are ignored or resources for prevention are unavailable.</p>

<h3 class="learn-subheading">Gender Analysis in Conflict</h3>

<p class="learn-p">Conflict affects men and women differently, and peacebuilding must address these differences. Gender analysis examines: how conflict changes gender roles (women becoming heads of households), gendered violence (sexual violence as war tactic), women's participation in peacebuilding (often excluded despite effectiveness), and women's specific needs in post-conflict reconstruction.</p>

<p class="learn-p">UN Security Council Resolution 1325 (2000) mandates women's participation in peace processes, yet implementation remains weak globally and in Nigeria. Nigeria adopted a National Action Plan on UNSCR 1325, but women remain underrepresented in formal peace negotiations.</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Using the conflict tree model, analyze the Boko Haram insurgency. Identify roots (underlying causes), trunk (core problem), and branches (effects)." (Sample answer: Roots: poverty, weak education, political exclusion, corruption, foreign jihadi influences. Trunk: armed insurgency seeking Islamic state. Branches: deaths, displacement, destroyed infrastructure, humanitarian crisis, regional instability.)</span>
</div>
    `,
    questions: [
      { q: "In the conflict tree model, what do the 'roots' represent?", o: ["Visible violence", "Underlying causes of conflict", "Effects of conflict", "Solutions to conflict"], a: 1, e: "Roots represent underlying causes — structural factors, historical grievances, economic conditions that produce the conflict.", h: "What's underground on a tree?", yr: "GST" },
      { q: "In the farmers-herders conflict, which is an example of a 'root cause'?", o: ["Deaths of farmers", "Displacement of communities", "Climate change (desertification)", "Food insecurity"], a: 2, e: "Climate change is an underlying cause (root) that produces competition over diminishing resources. Deaths, displacement, and food insecurity are effects (branches).", h: "What causes the conflict, not what results from it?", yr: "GST" },
      { q: "Primary stakeholders in a conflict are:", o: ["International organizations", "Those directly involved and directly affected", "The media", "The government"], a: 1, e: "Primary stakeholders are directly involved in the conflict and directly affected by its outcomes — e.g., farmers and herders in that conflict.", h: "Who is in the middle of the fighting?", yr: "GST" },
      { q: "According to the onion model, 'positions' refer to:", o: ["What parties fundamentally need as human beings", "Why parties want something — their underlying motivations", "What parties say they want — usually specific and concrete", "The physical location of the conflict"], a: 2, e: "Positions are the outer layer — what parties say they want (e.g., 'grazing reserves now!'). These are usually specific, concrete, and sound non-negotiable.", h: "What do people demand publicly?", yr: "GST" },
      { q: "In the onion model, what is the core layer (most fundamental)?", o: ["Positions", "Interests", "Needs", "Demands"], a: 2, e: "Needs are the core — fundamental human requirements: security, identity, recognition, autonomy, participation, dignity. Addressing needs leads to lasting resolution.", h: "What do humans fundamentally require?", yr: "GST" },
      { q: "In the ABC triangle, 'A' stands for:", o: ["Action", "Attitude (perceptions, stereotypes, emotions)", "Authority", "Aid"], a: 1, e: "A = Attitude — perceptions, stereotypes, emotions (fear, anger, mistrust, hatred), values, and beliefs that parties hold about each other.", h: "What do people think and feel?", yr: "GST" },
      { q: "In the ABC triangle, 'C' stands for:", o: ["Conflict", "Context (structural factors — history, economy, politics, demography)", "Culture", "Communication"], a: 1, e: "C = Context — structural factors including history, geography, economy, demography, politics, laws, and institutions that shape the conflict.", h: "What is the environment surrounding the conflict?", yr: "GST" },
      { q: "What is the purpose of early warning systems?", o: ["To punish perpetrators after violence", "To monitor indicators and enable preventive action before violence erupts", "To predict winners of conflicts", "To replace peacebuilding"], a: 1, e: "Early warning systems monitor indicators of escalating conflict (hate speech, arms build-up, displacement) to enable preventive action before violence erupts.", h: "What happens before violence starts?", yr: "GST" },
      { q: "UN Security Council Resolution 1325 addresses:", o: ["Climate change", "Economic development", "Women's participation in peace processes", "Counter-terrorism"], a: 2, e: "UNSCR 1325 (2000) mandates women's participation in peace processes, recognizing that peace agreements last longer when women are involved.", h: "Which group is often excluded from peace talks?", yr: "GST" },
      { q: "Which conflict analysis tool uses the layers: positions, interests, needs?", o: ["Conflict tree", "Stakeholder analysis", "Onion model", "ABC triangle"], a: 2, e: "The onion model distinguishes positions (outer layer), interests (middle layer), and needs (core).", h: "Think about peeling an onion.", yr: "GST" },
      { q: "In farmers-herders conflict, 'food insecurity' is best classified as:", o: ["Root cause", "Core problem", "Effect/branch", "Stakeholder"], a: 2, e: "Food insecurity results from the conflict (crops destroyed, markets disrupted) — it is an effect/branch, not a root cause.", h: "Does food insecurity cause the conflict or result from it?", yr: "GST" },
      { q: "Which statement best describes the relationship between attitudes, behavior, and context?", o: ["They are independent and unrelated", "They interact and reinforce each other", "Only attitudes matter", "Only context matters"], a: 1, e: "The ABC triangle shows these dimensions interact — hostile attitudes lead to violent behavior, which hardens hostile attitudes, within a context that enables violence. All three must be addressed.", h: "Do these factors affect each other?", yr: "GST" },
      { q: "Which Nigerian early warning system attempts to monitor conflict indicators?", o: ["EFCC", "ICPC", "NEWS (National Early Warning System)", "NITDA"], a: 2, e: "NEWS (National Early Warning System) was established to monitor conflict indicators and enable preventive action, though implementation challenges remain.", h: "Which agency watches for signs of conflict?", yr: "GST" },
      { q: "According to gender analysis, how does conflict affect women differently?", o: ["Women are never affected by conflict", "Women experience specific forms of violence (sexual violence) and often become heads of households", "Women always benefit from conflict", "Women are not involved in peacebuilding"], a: 1, e: "Gender analysis shows women experience specific harms (sexual violence as war tactic) and often become heads of households, yet are excluded from formal peace negotiations.", h: "Do men and women experience conflict the same way?", yr: "GST" },
      { q: "In the conflict tree, what is the relationship between roots and branches?", o: ["Branches cause roots", "Roots (causes) produce the core problem, which produces branches (effects)", "There is no relationship", "Roots and branches are the same"], a: 1, e: "Roots (underlying causes) produce the trunk (core problem), which produces branches (effects/consequences). Understanding this causal chain helps identify intervention points.", h: "What comes first — causes or effects?", yr: "GST" },
      { q: "Why is conflict analysis essential before intervention?", o: ["To waste time", "To prevent wasted resources, unintended harm, and failed interventions", "To avoid intervening altogether", "To blame one party"], a: 1, e: "Conflict analysis prevents interventions based on superficial understanding that often make conflicts worse or waste resources.", h: "What happens if you don't understand a problem before trying to fix it?", yr: "GST" },
      { q: "Which stakeholder category would include ECOWAS trying to mediate a conflict?", o: ["Primary", "Secondary", "Tertiary/Third Party", "Perpetrator"], a: 2, e: "ECOWAS is a third party — external actor not directly involved in the conflict but attempting to mediate or influence its resolution.", h: "Who comes from outside to help?", yr: "GST" },
      { q: "In the ABC triangle, revenge attacks would be classified under:", o: ["Attitude", "Behavior", "Context", "None of the above"], a: 1, e: "Revenge attacks are actions taken by parties — they fall under Behavior (B) in the ABC triangle.", h: "Is revenge an action or a thought?", yr: "GST" },
      { q: "What is the 'hurting stalemate' concept in conflict analysis?", o: ["When one side is winning", "When both sides are exhausted and neither can win, creating a 'ripe moment' for negotiation", "When the conflict has ended", "When outside intervention has failed"], a: 1, e: "A hurting stalemate occurs when neither side can win decisively and both are suffering — creating willingness to negotiate and making the conflict 'ripe' for resolution.", h: "When are parties most willing to talk?", yr: "GST" },
      { q: "Which factor would an early warning system monitor as a conflict indicator?", o: ["Economic growth", "Peaceful elections", "Hate speech in media and proliferation of small arms", "Tourism revenue"], a: 2, e: "Early warning systems monitor indicators like hate speech, arms build-up, displacement, human rights violations, and inflammatory rhetoric — signs of escalating conflict.", h: "What warns that violence might happen soon?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 5: Conflict Resolution Approaches
  // ==========================================================================
  {
    topic: "Conflict Resolution Approaches",
    topicCode: "PCR-005-01",
    module: "Conflict Resolution Methods",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Conflict resolution</span> refers to the processes and methods used to address, manage, or transform conflicts. Distinguishing between resolution, management, and transformation is crucial — each implies different goals, timeframes, and intervention strategies. <strong>Effective peacebuilding matches the approach to the nature and stage of the conflict</strong>.
</div>

<p class="learn-p">Many people assume that resolving conflict means eliminating it — but conflict is natural and inevitable. The goal is not to eliminate conflict but to channel it into constructive forms and address underlying causes. This section examines three related but distinct approaches.</p>

<h3 class="learn-subheading">Resolution, Management, Transformation — Key Distinctions</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th style="background:#dbeafe;">Approach</th>
      <th style="background:#dbeafe;">Goal</th>
      <th style="background:#dbeafe;">Timeframe</th>
      <th style="background:#dbeafe;">Focus</th>
      <th style="background:#dbeafe;">Example</th>
    </thead>
    <tbody>
      <tr><td style="background:#eff6ff;">Conflict Resolution</td>
      <td style="background:#eff6ff;">Eliminate root causes, achieve win-win outcomes</td>
      <td style="background:#eff6ff;">Medium to long-term</td>
      <td style="background:#eff6ff;">Addressing underlying interests and needs</td>
      <td style="background:#eff6ff;">Land reform addressing farmers' and herders' needs</td>
     </tr>
      <tr style="background:#eff6ff;">Conflict Management</td>
      <td style="background:#eff6ff;">Contain conflict, prevent escalation</td>
      <td style="background:#eff6ff;">Short to medium-term</td>
      <td style="background:#eff6ff;">Behavior change, ceasefire, de-escalation</td>
      <td style="background:#eff6ff;">Seasonal grazing route agreements preventing violence</td>
     </tr>
      <tr style="background:#eff6ff;">Conflict Transformation</td>
      <td style="background:#eff6ff;">Change underlying structures and relationships</td>
      <td style="background:#eff6ff;">Long-term (generations)</td>
      <td style="background:#eff6ff;">Systemic change — institutions, relationships, narratives</td>
      <td style="background:#eff6ff;">Constitutional reform, federal character evolution</td>
     </tr>
    </tbody>
   </table>
</div>

<p class="learn-p"><strong>Conflict Resolution (John Burton):</strong> Burton argued conflicts persist because underlying human needs (security, identity, recognition, participation) remain unmet. Superficial compromises fail because they don't address these needs. True resolution requires problem-solving workshops where parties analyze their needs and design mutually acceptable solutions.</p>

<p class="learn-p"><strong>Conflict Management (William Zartman):</strong> Some conflicts cannot be resolved — at least not quickly. Management focuses on preventing escalation, limiting violence, and keeping conflict within acceptable bounds. This is realistic for deep-seated conflicts where parties are not ready for resolution.</p>

<p class="learn-p"><strong>Conflict Transformation (John Paul Lederach):</strong> Lederach shifted focus from resolving specific episodes to transforming underlying structures and relationships that produce conflict. Transformation happens at multiple levels: personal (attitudes), relational (trust), structural (institutions), and cultural (narratives).</p>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="250" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🕊️ RESOLUTION → MANAGEMENT → TRANSFORMATION — A Continuum</text>
    <g>
      <rect x="15" y="45" width="145" height="170" rx="10" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <rect x="15" y="45" width="145" height="30" rx="10" fill="#22c55e"/>
      <text x="87" y="66" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="800">RESOLUTION</text>
      <text x="87" y="95" text-anchor="middle" font-size="8" fill="#166534">Solve root causes</text>
      <text x="87" y="112" text-anchor="middle" font-size="8" fill="#166534">Win-win outcomes</text>
      <text x="87" y="129" text-anchor="middle" font-size="8" fill="#166534">Address interests</text>
      <text x="87" y="146" text-anchor="middle" font-size="8" fill="#166534">Medium-long term</text>
      <text x="87" y="163" text-anchor="middle" font-size="8" fill="#166534">Burton, Fisher</text>
      <circle cx="87" cy="190" r="6" fill="#22c55e" opacity="0.4">
        <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
      </circle>
    </g>
    <g>
      <line x1="160" y1="130" x2="180" y2="130" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowC1)"/>
      <text x="170" y="125" text-anchor="middle" font-size="7" fill="#3b82f6">→</text>
    </g>
    <g>
      <rect x="183" y="45" width="135" height="170" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <rect x="183" y="45" width="135" height="30" rx="10" fill="#f59e0b"/>
      <text x="250" y="66" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="800">MANAGEMENT</text>
      <text x="250" y="95" text-anchor="middle" font-size="8" fill="#92400e">Contain conflict</text>
      <text x="250" y="112" text-anchor="middle" font-size="8" fill="#92400e">Prevent escalation</text>
      <text x="250" y="129" text-anchor="middle" font-size="8" fill="#92400e">Limit violence</text>
      <text x="250" y="146" text-anchor="middle" font-size="8" fill="#92400e">Short-medium term</text>
      <text x="250" y="163" text-anchor="middle" font-size="8" fill="#92400e">Zartman</text>
      <circle cx="250" cy="190" r="6" fill="#f59e0b" opacity="0.4">
        <animate attributeName="r" values="6;10;6" dur="2s" begin="0.5s" repeatCount="indefinite"/>
      </circle>
    </g>
    <g>
      <line x1="318" y1="130" x2="338" y2="130" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowC1)"/>
      <text x="328" y="125" text-anchor="middle" font-size="7" fill="#3b82f6">→</text>
    </g>
    <g>
      <rect x="341" y="45" width="145" height="170" rx="10" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <rect x="341" y="45" width="145" height="30" rx="10" fill="#3b82f6"/>
      <text x="413" y="66" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="800">TRANSFORM</text>
      <text x="413" y="95" text-anchor="middle" font-size="8" fill="#1e3a8a">Change systems</text>
      <text x="413" y="112" text-anchor="middle" font-size="8" fill="#1e3a8a">Restructure relations</text>
      <text x="413" y="129" text-anchor="middle" font-size="8" fill="#1e3a8a">Change narratives</text>
      <text x="413" y="146" text-anchor="middle" font-size="8" fill="#1e3a8a">Long-term</text>
      <text x="413" y="163" text-anchor="middle" font-size="8" fill="#1e3a8a">Lederach</text>
      <circle cx="413" cy="190" r="6" fill="#3b82f6" opacity="0.4">
        <animate attributeName="r" values="6;10;6" dur="2s" begin="1s" repeatCount="indefinite"/>
      </circle>
    </g>
    <defs>
      <marker id="arrowC1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6"/>
      </marker>
    </defs>
    <text x="250" y="240" text-anchor="middle" font-size="9" fill="#64748b">🔑 Resolution solves problems — Transformation builds systems that prevent future conflicts</text>
  </svg>
</div>

<h3 class="learn-subheading">Third Party Intervention — The Spectrum of Involvement</h3>

<p class="learn-p">When parties cannot resolve conflict themselves, third parties may intervene. Types include:</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Intervention Type</th><th>Third Party Role</th><th>Decision Power</th><th>Nigerian Example</th>
    </thead>
    <tbody>
      <tr><td>Conciliation</td><td>Facilitates communication, builds trust</td><td>None — facilitative</td><td>Swiss intermediaries between Nigerian govt and Boko Haram</td></tr>
      <tr><td>Facilitation</td><td>Manages process, chairs meetings</td><td>Process control only</td><td>Chair leading Niger Delta stakeholders dialogue</td></tr>
      <tr><td>Mediation</td><td>Active role — proposes options, caucuses</td><td>No binding authority</td><td>ECOWAS mediation in Mali, traditional Oha na Eze</td></tr>
      <tr><td>Arbitration</td><td>Hears evidence, issues decision</td><td>Binding (if agreed)</td><td>ICJ ruling on Bakassi Peninsula (2002)</td></tr>
      <tr><td>Adjudication</td><td>Formal legal process in court</td><td>Binding</td><td>Court cases, Sharia courts, customary courts</td></tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">Mediation — In-Depth</h3>

<p class="learn-p">Mediation is the most common third-party intervention. The mediator is a neutral facilitator who helps parties communicate, understand each other's perspectives, generate options, and reach their own agreement. Mediators do not impose solutions.</p>

<p class="learn-p"><strong>Mediator roles (Christopher Moore):</strong> (1) Facilitator — manages process, ensures ground rules; (2) Formulator — helps reframe issues, generate options; (3) Manipulator — uses leverage to encourage agreement.</p>

<p class="learn-p"><strong>Stages of mediation:</strong> Pre-mediation (assessment, logistics), Opening (establish ground rules), Exploration (understand issues and interests), Negotiation (generate and evaluate options), Agreement (document, implementation plan), Closure (ratification, follow-up).</p>

<h3 class="learn-subheading">Negotiation — Distributive vs Integrative</h3>

<p class="learn-p"><strong>Distributive negotiation (win-lose):</strong> Fixed pie assumption — one party's gain is the other's loss. Competitive, positional bargaining. Appropriate when resources are truly fixed.</p>

<p class="learn-p"><strong>Integrative negotiation (win-win):</strong> Variable pie assumption — parties can create value by trading on different priorities. Collaborative, interest-based bargaining. More likely to produce lasting agreements and preserve relationships.</p>

<p class="learn-p">Key concepts: <strong>BATNA</strong> (Best Alternative to Negotiated Agreement) — what you will do if negotiation fails. <strong>ZOPA</strong> (Zone of Possible Agreement) — range where agreement is possible.</p>

<h3 class="learn-subheading">Peacekeeping and Peacebuilding</h3>

<p class="learn-p"><strong>Peacekeeping:</strong> Deploying neutral forces to monitor ceasefires, separate combatants, protect civilians. UN peacekeeping principles: consent of parties, impartiality, non-use of force except self-defense.</p>

<p class="learn-p"><strong>Peacebuilding:</strong> Long-term approach addressing root causes — rebuilding institutions, promoting economic development, reconciliation, rule of law, security sector reform. Peacebuilding prevents relapse into conflict.</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Scholar:</strong> John Paul Lederach developed the concept of conflict transformation and the "pyramid" model of peacebuilding — different strategies for top leaders, middle-range leaders, and grassroots.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>GST Exam Tip:</strong> Distinguish between mediation (non-binding, parties control outcome) and arbitration (binding, third party decides). Mediation is more common in community conflicts; arbitration more common in commercial or international disputes where parties agree in advance to be bound.</span>
</div>
    `,
    questions: [
      { q: "According to John Burton, conflict resolution requires:", o: ["Imposing a solution on parties", "Addressing underlying human needs (security, identity, recognition)", "Using military force", "Waiting for conflict to burn out"], a: 1, e: "Burton argued conflicts persist because needs remain unmet. True resolution requires problem-solving workshops where parties analyze and address these needs.", h: "What causes conflicts to continue?", yr: "GST" },
      { q: "Which approach is most appropriate for a deep-seated conflict where parties are not ready for resolution?", o: ["Conflict resolution", "Conflict management", "Conflict transformation", "Military intervention"], a: 1, e: "Conflict management focuses on containing conflict and preventing escalation — realistic when parties cannot or will not resolve underlying issues.", h: "When parties won't talk, what can you do?", yr: "GST" },
      { q: "John Paul Lederach is associated with which approach?", o: ["Conflict resolution", "Conflict management", "Conflict transformation", "Arbitration"], a: 2, e: "Lederach developed conflict transformation — changing underlying structures, relationships, and discourses that produce conflict over the long term.", h: "Which approach focuses on structural change?", yr: "GST" },
      { q: "In mediation, the mediator's role is to:", o: ["Impose a binding solution", "Judge who is right and wrong", "Facilitate parties to reach their own agreement", "Represent one side"], a: 2, e: "Mediators are neutral facilitators who help parties communicate and reach their own agreement — they do not impose solutions or decide who is right.", h: "What does a mediator do?", yr: "GST" },
      { q: "What does BATNA stand for in negotiation?", o: ["Best Alternative to Negotiated Agreement", "Binding Arbitration Treaty for National Agreements", "Basic Approach to Negotiation and Arbitration", "Bilateral Agreement Terms and Norms"], a: 0, e: "BATNA is your best alternative if negotiation fails — knowing your BATNA gives you power and helps you decide whether to accept an agreement.", h: "What will you do if you don't reach agreement?", yr: "GST" },
      { q: "ZOPA in negotiation refers to:", o: ["Zone of Possible Agreement — range where agreement is possible", "Zero Option Peace Agreement", "Zone of Political Authority", "Zonal Peace Accord"], a: 0, e: "ZOPA is the range between parties' reservation points where a mutually acceptable agreement exists. If ZOPA doesn't exist, no negotiated agreement is possible.", h: "Where can both parties find common ground?", yr: "GST" },
      { q: "Distributive negotiation assumes:", o: ["Value can be created — win-win possible", "Fixed pie — one party's gain is the other's loss", "Both parties can get everything they want", "Conflict is unnecessary"], a: 1, e: "Distributive (win-lose) negotiation assumes a fixed pie — resources are limited, so one party's gain requires the other's loss.", h: "What happens when there's only one thing to split?", yr: "GST" },
      { q: "Which intervention type produced a binding decision on the Bakassi Peninsula dispute?", o: ["Mediation", "Conciliation", "Arbitration (ICJ)", "Facilitation"], a: 2, e: "The International Court of Justice (ICJ) issued a binding arbitration decision on Bakassi in 2002, which both Nigeria and Cameroon accepted.", h: "Which court decides international disputes?", yr: "GST" },
      { q: "UN peacekeeping principles include all EXCEPT:", o: ["Consent of parties", "Impartiality", "Non-use of force except self-defense", "Taking sides with the stronger party"], a: 3, e: "UN peacekeeping principles are consent, impartiality, and non-use of force except self-defense. Taking sides violates impartiality.", h: "What would violate neutrality?", yr: "GST" },
      { q: "Peacebuilding focuses on:", o: ["Short-term ceasefire", "Long-term addressing of root causes — institutions, development, reconciliation", "Military victory", "Punishing war criminals"], a: 1, e: "Peacebuilding is long-term work addressing root causes: rebuilding institutions, economic development, rule of law, reconciliation, and security sector reform.", h: "What prevents conflict from recurring?", yr: "GST" },
      { q: "In mediation, the 'caucus' refers to:", o: ["Public meeting with all parties", "Private meeting between mediator and one party", "Final agreement signing", "Opening statement"], a: 1, e: "A caucus is a private, confidential meeting between the mediator and one party — used to explore interests, generate options, and manage emotions.", h: "What happens when mediator meets each side alone?", yr: "GST" },
      { q: "Which Nigerian traditional institution functions as a mediation body?", o: ["EFCC", "INEC", "Oha na Eze (Igbo council of elders)", "Nigerian Army"], a: 2, e: "The Oha na Eze is the Igbo council of elders responsible for community governance, justice, and conflict resolution — functioning as mediators.", h: "Which traditional body resolves Igbo community disputes?", yr: "GST" },
      { q: "Integrative negotiation is characterized by:", o: ["Competition and positional bargaining", "Collaboration and interest-based bargaining", "Avoidance of conflict", "Forced agreement"], a: 1, e: "Integrative (win-win) negotiation involves collaboration, sharing information, trading on different priorities, and creating value — producing better, longer-lasting agreements.", h: "What works better for long-term relationships?", yr: "GST" },
      { q: "Which ECOWAS intervention is an example of mediation?", o: ["Economic sanctions only", "ECOWAS mediation in Mali (2012, 2020)", "Military invasion", "Trade embargo"], a: 1, e: "ECOWAS has successfully mediated conflicts in Mali (2012 coup, 2020 coup), The Gambia (2017), and other West African states.", h: "What does ECOWAS do to resolve conflicts?", yr: "GST" },
      { q: "The 'ripening' of a conflict for resolution often occurs during:", o: ["Early escalation", "Hurting stalemate — when both sides are exhausted and neither can win", "Latent conflict", "Post-conflict period"], a: 1, e: "A hurting stalemate occurs when neither side can win and both are suffering — creating a 'ripe moment' when parties become willing to negotiate seriously.", h: "When are parties most ready to talk?", yr: "GST" },
      { q: "What is the difference between mediation and arbitration?", o: ["No difference — same thing", "Mediation is binding; arbitration is non-binding", "Mediation is non-binding (parties control outcome); arbitration is binding (third party decides)", "Mediation uses courts; arbitration uses elders"], a: 2, e: "Mediation is non-binding — parties control the outcome and can reject mediator proposals. Arbitration is binding — parties agree in advance to accept the third party's decision.", h: "Who makes the final decision?", yr: "GST" },
      { q: "Track 1 diplomacy refers to:", o: ["Official government-to-government negotiations", "Unofficial, non-governmental peace efforts", "Military action", "Economic sanctions"], a: 0, e: "Track 1 diplomacy is official, government-to-government negotiations. Track 2 is unofficial, involving NGOs, academics, religious leaders, etc.", h: "Which track involves official diplomats?", yr: "GST" },
      { q: "Which of the following is an example of conflict transformation?", o: ["A ceasefire agreement", "Constitutional reform changing how resources are distributed", "Temporary truce", "Evacuation of civilians"], a: 1, e: "Conflict transformation involves structural change — constitutional reform, institutional restructuring, narrative change — addressing root causes over the long term.", h: "What changes the system that produces conflict?", yr: "GST" },
      { q: "What is the primary goal of peacekeeping operations?", o: ["Winning the war", "Economic development", "Monitoring ceasefires, separating combatants, protecting civilians", "Punishing aggressors"], a: 2, e: "Peacekeeping deploys neutral forces to monitor ceasefires, separate combatants, protect civilians, and create space for political solutions.", h: "What do blue helmets do?", yr: "GST" },
      { q: "Which scholar developed the concept of 'conflict transformation'?", o: ["Johan Galtung", "John Paul Lederach", "Paul Collier", "Morton Deutsch"], a: 1, e: "John Paul Lederach developed conflict transformation — moving beyond resolution of specific episodes to transforming the underlying structures, relationships, and discourses that produce conflict.", h: "Which scholar wrote 'Building Peace' and 'The Moral Imagination'?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 6: Non-Violent Conflict Resolution
  // ==========================================================================
  {
    topic: "Non-Violent Conflict Resolution",
    topicCode: "PCR-006-01",
    module: "Conflict Resolution Methods",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Non-violent conflict resolution</span> approaches reject physical violence while seeking to address, manage, or transform conflicts. Far from passive, non-violence is an active, powerful strategy that has achieved major political and social change worldwide — including in Nigeria. <strong>Understanding non-violence provides alternatives to violence that are often more effective in achieving lasting peace</strong>.
</div>

<p class="learn-p">Non-violence is not the same as passivity, cowardice, or surrender. Non-violent action involves courage, discipline, and strategic planning. Practitioners willingly accept suffering rather than inflict it, exposing injustice and winning sympathy.</p>

<h3 class="learn-subheading">Mahatma Gandhi's Philosophy of Non-Violence</h3>

<p class="learn-p">Mohandas K. Gandhi developed Satyagraha — "truth force" or "soul force." Key principles include:</p>
<ul class="learn-list">
  <li><strong>Ahimsa (non-harm):</strong> Refusing to harm any living being — not just physically but through words and thoughts</li>
  <li><strong>Satyagraha (truth force):</strong> Holding firmly to truth, refusing to participate in injustice</li>
  <li><strong>Civil disobedience:</strong> Consciously and publicly breaking unjust laws, accepting legal consequences</li>
  <li><strong>Non-cooperation:</strong> Withdrawing cooperation from unjust systems (tax refusal, boycott, resignation)</li>
  <li><strong>Constructive program:</strong> Building alternative institutions (self-sufficient communities, independent education)</li>
</ul>

<p class="learn-p">Gandhi's methods succeeded against the British Empire. The Salt March (1930) — walking 240 miles to make salt in violation of British monopoly — became iconic. When marchers were beaten, they did not fight back. The world watched. British authorities could not justify brutality against peaceful protesters, and India gained independence in 1947.</p>

<h3 class="learn-subheading">Martin Luther King Jr. — Non-Violence in the American Civil Rights Movement</h3>

<p class="learn-p">MLK adapted Gandhi's principles to the American context. His six principles of non-violence:</p>
<ol class="learn-list learn-ordered">
  <li>Non-violence is a way of life for courageous people — not passive, but active</li>
  <li>Non-violence seeks to win friendship and understanding, not defeat opponents</li>
  <li>Non-violence attacks forces of evil, not persons doing evil</li>
  <li>Non-violence accepts suffering without retaliation — unearned suffering is redemptive</li>
  <li>Non-violence rejects physical violence but embraces spiritual love (agape)</li>
  <li>Non-violence believes the universe is on the side of justice — faith in the future</li>
</ol>

<p class="learn-p">The Montgomery Bus Boycott (1955-56), Birmingham protests (1963), and March on Washington (1963) led to the Civil Rights Act (1964) and Voting Rights Act (1965).</p>

<h3 class="learn-subheading">Gene Sharp — The Strategic Theory of Non-Violent Action</h3>

<p class="learn-p">Gene Sharp catalogued 198 methods of non-violent action, organized into three categories:</p>
<ul class="learn-list">
  <li><strong>Protest and persuasion:</strong> Marches, rallies, vigils, petitions, picketing, teach-ins, symbolic acts</li>
  <li><strong>Non-cooperation:</strong> Social (boycotts, student strikes), economic (tax refusal, rent strikes, consumer boycotts), political (disobeying laws, civil disobedience, resignations)</li>
  <li><strong>Non-violent intervention:</strong> Sit-ins, blockades, hunger strikes, parallel government, creating alternative institutions</li>
</ul>

<p class="learn-p">Sharp argued that political power depends on obedience and cooperation. When enough people withdraw cooperation (pay taxes, obey laws, work for the system), rulers cannot govern.</p>

<h3 class="learn-subheading">Successful Non-Violent Movements Worldwide</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Movement</th><th>Years</th><th>Non-Violent Methods</th><th>Outcome</th></tr></thead>
    <tbody>
      <tr><td>India Independence</td><td>1915-1947</td><td>Salt March, non-cooperation, boycotts</td><td>Independence from Britain</td></tr>
      <tr><td>US Civil Rights</td><td>1955-1968</td><td>Boycotts, sit-ins, freedom rides, marches</td><td>Civil Rights Act, Voting Rights Act</td></tr>
      <tr><td>Philippines (EDSA)</td><td>1986</td><td>Mass protests, defection of military</td><td>Marcos ousted, democracy restored</td></tr>
      <tr><td>South Africa</td><td>1950s-1994</td><td>Defiance campaigns, sanctions, boycotts</td><td>End of apartheid</td></tr>
      <tr><td>Poland (Solidarity)</td><td>1980-1989</td><td>Strikes, workers' movement, civil resistance</td><td>Fall of communism</td></tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">Non-Violence in Nigerian Context</h3>

<p class="learn-p">Nigeria has examples of both successful non-violent resistance and movements that escalated to violence when peaceful channels failed.</p>

<p class="learn-p"><strong>Aba Women's Riot (1929):</strong> Thousands of Igbo and Ibibio women protested colonial taxation and warrant chiefs. Using traditional "sitting on a man" (protests outside chiefs' compounds), singing, and dancing — they forced colonial authorities to abolish the warrant chief system and reduce taxes. This is one of Africa's most successful examples of non-violent resistance.</p>

<p class="learn-p"><strong>EndSARS (2020):</strong> Young Nigerians protested police brutality by the Special Anti-Robbery Squad. Using social media organization, mass protests, and #EndSARS hashtag — they achieved government dissolution of SARS. However, peaceful protests were met with violence at Lekki Toll Gate, and demands for broader police reform remain partially unfulfilled.</p>

<p class="learn-p"><strong>Pro-Democracy Movements (1990s):</strong> NADECO and others resisted military rule through strikes, protests, and civil disobedience. The June 12 movement kept democratic aspirations alive until transition in 1999.</p>

<p class="learn-p"><strong>Challenges for Non-Violence in Nigeria:</strong> State violence against protesters (e.g., Lekki 2020) can escalate resistance or discourage it. Impunity for security forces reduces trust in peaceful channels. However, non-violence remains more effective than violence in achieving lasting political change — violent insurgencies (Boko Haram, Niger Delta militancy) have not achieved their stated goals.</p>

<h3 class="learn-subheading">Restorative Justice</h3>

<p class="learn-p">Restorative justice focuses on repairing harm caused by conflict, not punishing offenders. Key principles:</p>
<ul class="learn-list">
  <li><strong>Harm as central concern:</strong> Crime/conflict is first about harm to victims and communities, not violation of laws</li>
  <li><strong>Inclusive processes:</strong> All affected parties (victims, offenders, community) should participate in resolution</li>
  <li><strong>Accountability as repair:</strong> Offenders take responsibility by repairing harm — apology, restitution, service</li>
  <li><strong>Reintegration:</strong> Offenders are reintegrated into community, not permanently excluded</li>
</ul>

<p class="learn-p">Restorative practices include victim-offender mediation, circle sentencing, family group conferencing, and peacemaking circles. Traditional Nigerian conflict resolution — elders' councils, compensation, ritual reconciliation — embodies restorative principles.</p>

<h3 class="learn-subheading">Traditional African Non-Violent Conflict Resolution</h3>

<p class="learn-p">Traditional Nigerian societies developed sophisticated non-violent conflict resolution mechanisms:</p>
<ul class="learn-list">
  <li><strong>Igbo (Oha na Eze, Umuada):</strong> Council of elders deliberates, women's group intervenes in domestic and community disputes. Compensation (ikwu aka) restores balance.</li>
  <li><strong>Yoruba (Ogboni, Egbe Awo):</strong> Secret society responsible for justice and conflict resolution. Use of oratory, proverbs, precedents.</li>
  <li><strong>Hausa-Fulani (Alkali courts, Sharia):</strong> Islamic legal system with mediation and reconciliation processes.</li>
  <li><strong>Tiv (Jir, Msam, Mkem):</strong> Kinship-based resolution — Jir (court of lineage heads), Msam (prayer and ritual), Mkem (compensation).</li>
  <li><strong>Ijaw (Amanyanabo):</strong> Traditional rulers and elders' councils mediate community and inter-community disputes.</li>
</ul>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="220" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="12" fill="#1e293b" font-weight="700">✊ NON-VIOLENT ACTION — Gene Sharp's 198 Methods</text>
    
    <g>
      <rect x="15" y="45" width="150" height="150" rx="10" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <rect x="15" y="45" width="150" height="30" rx="10" fill="#3b82f6"/>
      <text x="90" y="66" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="800">PROTEST & PERSUASION</text>
      <text x="90" y="95" text-anchor="middle" font-size="8" fill="#1e3a8a">Marches, rallies, vigils</text>
      <text x="90" y="112" text-anchor="middle" font-size="8" fill="#1e3a8a">Petitions, picketing</text>
      <text x="90" y="129" text-anchor="middle" font-size="8" fill="#1e3a8a">Teach-ins, symbol acts</text>
      <text x="90" y="146" text-anchor="middle" font-size="8" fill="#1e3a8a">Leaflets, posters</text>
      <text x="90" y="163" text-anchor="middle" font-size="8" fill="#1e3a8a">Mock elections, protests</text>
      <circle cx="90" cy="180" r="6" fill="#3b82f6" opacity="0.4">
        <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
      </circle>
    </g>
    
    <g>
      <rect x="175" y="45" width="150" height="150" rx="10" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <rect x="175" y="45" width="150" height="30" rx="10" fill="#22c55e"/>
      <text x="250" y="66" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="800">NON-COOPERATION</text>
      <text x="250" y="95" text-anchor="middle" font-size="8" fill="#166534">Economic boycotts</text>
      <text x="250" y="112" text-anchor="middle" font-size="8" fill="#166534">Tax refusal, rent strikes</text>
      <text x="250" y="129" text-anchor="middle" font-size="8" fill="#166534">Student strikes</text>
      <text x="250" y="146" text-anchor="middle" font-size="8" fill="#166534">Civil disobedience</text>
      <text x="250" y="163" text-anchor="middle" font-size="8" fill="#166534">Mass resignations</text>
      <circle cx="250" cy="180" r="6" fill="#22c55e" opacity="0.4">
        <animate attributeName="r" values="6;10;6" dur="2s" begin="0.5s" repeatCount="indefinite"/>
      </circle>
    </g>
    
    <g>
      <rect x="335" y="45" width="150" height="150" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <rect x="335" y="45" width="150" height="30" rx="10" fill="#f59e0b"/>
      <text x="410" y="66" text-anchor="middle" font-size="10" fill="#ffffff" font-weight="800">NON-VIOLENT INTERVENTION</text>
      <text x="410" y="95" text-anchor="middle" font-size="8" fill="#92400e">Sit-ins, blockades</text>
      <text x="410" y="112" text-anchor="middle" font-size="8" fill="#92400e">Hunger strikes</text>
      <text x="410" y="129" text-anchor="middle" font-size="8" fill="#92400e">Parallel government</text>
      <text x="410" y="146" text-anchor="middle" font-size="8" fill="#92400e">Alternative institutions</text>
      <text x="410" y="163" text-anchor="middle" font-size="8" fill="#92400e">Non-violent occupation</text>
      <circle cx="410" cy="180" r="6" fill="#f59e0b" opacity="0.4">
        <animate attributeName="r" values="6;10;6" dur="2s" begin="1s" repeatCount="indefinite"/>
      </circle>
    </g>
    
    <text x="250" y="212" text-anchor="middle" font-size="9" fill="#64748b">✊ Non-violence is active, strategic, and has won major political changes worldwide</text>
  </svg>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Scholar:</strong> Gene Sharp (1928-2018) wrote "The Politics of Nonviolent Action" (1973), cataloguing 198 methods. His work influenced movements worldwide — including Serbia's Otpor, Ukraine's Orange Revolution, and Arab Spring.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Using the Aba Women's Riot (1929), explain how non-violent action achieved political change in colonial Nigeria." (Sample answer: Women used traditional "sitting on a man" protests, songs, and dances — refusing to pay taxes and protesting warrant chiefs. Colonial authorities could not justify violence against women; they abolished the warrant chief system and reduced taxes. The riot demonstrates non-violence's effectiveness.)</span>
</div>
    `,
    questions: [
      { q: "What does 'Satyagraha' mean in Gandhi's philosophy?", o: ["Holy war", "Truth force or soul force", "Non-cooperation", "Civil disobedience"], a: 1, e: "Satyagraha combines satya (truth) and agraha (holding firmly) — truth force, soul force. Gandhi developed it as active non-violent resistance.", h: "Think about holding firmly to truth.", yr: "GST" },
      { q: "Gandhi's Salt March (1930) is an example of:", o: ["Terrorism", "Violent revolution", "Civil disobedience — breaking unjust law and accepting consequences", "Military action"], a: 2, e: "The Salt March involved making salt in violation of British monopoly — consciously breaking an unjust law and accepting arrest, which is civil disobedience.", h: "What is it called when you break a law to protest it?", yr: "GST" },
      { q: "Which of the following is NOT one of MLK's six principles of non-violence?", o: ["Non-violence is for the courageous", "Non-violence attacks forces of evil, not persons", "Non-violence accepts suffering without retaliation", "Non-violence uses any means necessary including violence"], a: 3, e: "MLK's principles reject violence entirely. 'Any means necessary' is associated with Malcolm X, not MLK's non-violent philosophy.", h: "Would MLK ever justify violence?", yr: "GST" },
      { q: "Gene Sharp's analysis argues that political power depends on:", o: ["Military force only", "Obedience and cooperation of citizens — withdraw cooperation, rulers cannot govern", "Economic resources only", "International support"], a: 1, e: "Sharp argued power comes from cooperation. When enough people withdraw cooperation (pay taxes, obey laws, work for the system), rulers cannot maintain control.", h: "What happens if everyone stops obeying?", yr: "GST" },
      { q: "The Aba Women's Riot (1929) is an example of:", o: ["Armed insurrection", "Successful non-violent resistance against colonial taxation and warrant chiefs", "Religious conflict", "Military coup"], a: 1, e: "Thousands of women used traditional protests to force colonial authorities to abolish warrant chiefs and reduce taxes — one of Africa's most successful non-violent movements.", h: "Did the women use weapons?", yr: "GST" },
      { q: "Restorative justice focuses on:", o: ["Punishing offenders as severely as possible", "Repairing harm caused by conflict, involving victims, offenders, and community", "Ignoring victims completely", "Only punishing offenders through imprisonment"], a: 1, e: "Restorative justice prioritizes repairing harm. Offenders take responsibility through apology, restitution, service — reintegrated into community, not permanently excluded.", h: "What does 'restorative' mean — restore what?", yr: "GST" },
      { q: "Which traditional Igbo institution embodies restorative justice principles?", o: ["Ogboni", "Oha na Eze and Umuada", "Alkali court", "Sharia court"], a: 1, e: "Oha na Eze (elders' council) and Umuada (women's group) practice restorative justice — deliberation, compensation (ikwu aka), reconciliation.", h: "Which group uses elders and women's groups?", yr: "GST" },
      { q: "EndSARS (2020) in Nigeria is an example of:", o: ["Successful non-violent protest achieving dissolution of SARS", "Failed violent insurrection", "Military coup", "Religious conflict"], a: 0, e: "Youth used social media, mass protests, and #EndSARS to demand police reform. Government dissolved SARS, though broader reforms remain incomplete.", h: "What method did young Nigerians use?", yr: "GST" },
      { q: "What are the three categories of non-violent action according to Gene Sharp?", o: ["War, peace, negotiation", "Protest/persuasion, non-cooperation, non-violent intervention", "Fighting, running, surrendering", "Politics, economics, religion"], a: 1, e: "Sharp's 198 methods are organized into: protest and persuasion (marches, rallies), non-cooperation (boycotts, civil disobedience), and non-violent intervention (sit-ins, blockades).", h: "How many categories?", yr: "GST" },
      { q: "The Montgomery Bus Boycott (1955-56) used which non-violent method?", o: ["Armed uprising", "Economic boycott and non-cooperation", "Terrorism", "Military intervention"], a: 1, e: "African Americans boycotted buses, refusing to use segregated public transit — economic non-cooperation that eventually led to desegregation.", h: "What did people refuse to ride?", yr: "GST" },
      { q: "What is 'Ahimsa' in Gandhi's philosophy?", o: ["Truth force", "Non-harm — refusing to harm any living being", "Civil disobedience", "Non-cooperation"], a: 1, e: "Ahimsa means non-harm — refusing to cause harm to any living being through physical actions, words, or thoughts.", h: "What is the principle of not harming?", yr: "GST" },
      { q: "Which traditional Yoruba institution was responsible for justice and conflict resolution?", o: ["Oha na Eze", "Ogboni and Egbe Awo", "Alkali court", "Umuada"], a: 1, e: "Ogboni (secret society) and Egbe Awo were responsible for justice, conflict resolution, and maintaining social order in traditional Yoruba society.", h: "Which secret society handled justice?", yr: "GST" },
      { q: "The Philippines EDSA Revolution (1986) is an example of:", o: ["Failed insurgency", "Successful non-violent mass movement that ousted Marcos", "Military coup", "Religious war"], a: 1, e: "Millions of Filipinos protested non-violently; military defected; President Marcos fled — restoring democracy. EDSA is a landmark non-violent success.", h: "What happened in the Philippines in 1986?", yr: "GST" },
      { q: "What is a 'hunger strike' classified as in Sharp's methods?", o: ["Protest and persuasion", "Non-cooperation", "Non-violent intervention", "None of the above"], a: 2, e: "Hunger strikes are non-violent intervention — directly intervening through self-suffering to pressure authorities, create moral crisis, and gain concessions.", h: "Which category involves direct action that accepts suffering?", yr: "GST" },
      { q: "According to restorative justice, an offender should:", o: ["Be permanently excluded from society", "Take responsibility and repair harm through apology, restitution, or service", "Never be held accountable", "Only be punished through imprisonment"], a: 1, e: "Restorative justice requires offenders to take responsibility by repairing harm — apology, compensation, community service — and then be reintegrated into the community.", h: "How does an offender make things right?", yr: "GST" },
      { q: "Which challenge faces non-violent movements in Nigeria?", o: ["Perfect conditions always exist", "State violence against peaceful protesters (e.g., Lekki 2020) and impunity for security forces", "No one ever uses non-violence", "Non-violence always works immediately"], a: 1, e: "Non-violent movements face state violence and impunity — as seen at Lekki Toll Gate (2020) — which can discourage or escalate resistance, though non-violence remains more effective than violence.", h: "What happened at Lekki?", yr: "GST" },
      { q: "The anti-apartheid movement in South Africa used which non-violent methods?", o: ["Only armed struggle", "Defiance campaigns, sanctions, boycotts, and international pressure", "Only passive acceptance", "Only military force"], a: 1, e: "The anti-apartheid movement combined non-violent resistance (defiance campaigns, boycotts) with international sanctions and pressure, leading to apartheid's end in 1994.", h: "What methods helped end apartheid?", yr: "GST" },
      { q: "What is the difference between non-violence and pacifism?", o: ["No difference — same thing", "Pacifism rejects all violence as immoral; non-violence is a strategic method that may be chosen for effectiveness", "Non-violence rejects all violence; pacifism accepts violence", "Pacifism is only for religious people"], a: 1, e: "Pacifism is an ethical stance rejecting violence as always wrong. Non-violence as strategy (Sharp) may be chosen for effectiveness, not necessarily moral absolutism — it's about what works.", h: "Is non-violence a belief or a strategy?", yr: "GST" },
      { q: "Which institution embodies restorative justice in traditional Ijaw society?", o: ["Ogboni", "Amanyanabo (traditional rulers and elders' councils)", "Sharia court", "Oha na Eze"], a: 1, e: "The Amanyanabo (traditional rulers) and elders' councils mediate community and inter-community disputes, seeking restoration and reconciliation.", h: "What are Ijaw traditional leaders called?", yr: "GST" },
      { q: "The principle that 'unearned suffering is redemptive' comes from which non-violence tradition?", o: ["Gandhi", "Martin Luther King Jr.", "Gene Sharp", "Nelson Mandela"], a: 1, e: "MLK believed that suffering accepted without retaliation (unearned suffering) exposes injustice, wins sympathy, and transforms society — a key principle of his non-violent philosophy.", h: "Which leader spoke of suffering's redemptive power?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 7: Peace Education and Culture of Peace
  // ==========================================================================
  {
    topic: "Peace Education and Culture of Peace",
    topicCode: "PCR-007-01",
    module: "Peacebuilding and Prevention",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Peace education</span> is the process of teaching knowledge, skills, attitudes, and values needed to prevent conflict, resolve disputes non-violently, and build sustainable peace. <strong>If violence is learned, peace can also be learned — through formal curriculum and informal socialization</strong>.
</div>

<p class="learn-p">The UNESCO Constitution (1945) declared that "since wars begin in the minds of men, it is in the minds of men that the defenses of peace must be constructed." Peace education operationalizes this insight — transforming how people think about conflict, violence, and alternatives.</p>

<h3 class="learn-subheading">Definition and Goals of Peace Education</h3>

<p class="learn-p">Peace education has multiple interconnected goals:</p>
<ul class="learn-list">
  <li><strong>Knowledge:</strong> Understanding causes of conflict, dynamics of violence, alternatives to violence, human rights, international humanitarian law, conflict resolution methods</li>
  <li><strong>Skills:</strong> Communication, active listening, negotiation, mediation, critical thinking, empathy, perspective-taking, emotional regulation</li>
  <li><strong>Attitudes:</strong> Respect for diversity, tolerance, non-violence, willingness to compromise, commitment to justice, global citizenship</li>
  <li><strong>Values:</strong> Human dignity, equality, freedom, solidarity, environmental stewardship, democratic participation</li>
</ul>

<h3 class="learn-subheading">Three Dimensions of Peace Education</h3>

<p class="learn-p">Betty Reardon (1988) identified three dimensions of peace education:</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Dimension</th><th>Focus</th><th>Questions</th></tr></thead>
    <tbody>
      <tr><td>Education ABOUT peace</ol><td style="background:#eff6ff;">Knowledge — what is peace, causes of war, conflict resolution methods</ol><td style="background:#eff6ff;">What do students need to KNOW?</ol></tr>
      <tr><td>Education FOR peace</ol><td style="background:#eff6ff;">Skills and values — enabling students to become peacebuilders</ol><td style="background:#eff6ff;">What do students need to BE ABLE TO DO?</ol></tr>
      <tr><td>Education THROUGH peace</ol><td style="background:#eff6ff;">Pedagogy — peaceful teaching methods (cooperative learning, democratic classrooms)</ol><td style="background:#eff6ff;">How should teaching MODEL peace?</ol></tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">Key Components of Peace Education Curriculum</h3>

<ul class="learn-list">
  <li><strong>Conflict resolution education:</strong> Teaching negotiation, mediation, problem-solving, anger management</li>
  <li><strong>Human rights education:</strong> Understanding universal human rights, instruments (UDHR), mechanisms for protection</li>
  <li><strong>Intercultural/Interfaith education:</strong> Reducing prejudice, building respect for diversity, dialogue across differences</li>
  <li><strong>Environmental peace education:</strong> Linking environmental degradation to conflict, sustainable development</li>
  <li><strong>Gender and peace:</strong> Understanding how gender inequality relates to violence, women's roles in peacebuilding</li>
  <li><strong>Global citizenship education:</strong> Beyond national boundaries, shared humanity, global challenges</li>
  <li><strong>Media literacy for peace:</strong> Recognizing propaganda, hate speech, stereotypes — using media for peace</li>
</ul>

<h3 class="learn-subheading">Peace Education in Nigerian Schools — Status and Challenges</h3>

<p class="learn-p">Nigeria has integrated peace education into various subjects: social studies, civic education, Islamic studies, Christian religious studies, and security education. However, implementation faces challenges:</p>
<ul class="learn-list">
  <li><strong>Curriculum overload:</strong> Limited time to cover peace education adequately</li>
  <li><strong>Teacher training:</strong> Most teachers not trained in peace education pedagogy</li>
  <li><strong>Resources:</strong> Lack of textbooks, materials, training manuals</li>
  <li><strong>Examination focus:</strong> Emphasis on recall rather than skills development</li>
  <li><strong>Conflict-affected areas:</strong> Schools destroyed, children displaced, education disrupted</li>
</ul>

<p class="learn-p"><strong>Opportunities:</strong> Existing civics education framework provides entry point; growing recognition of peace education's importance; NGO partnerships (WANEP, Search for Common Ground) supporting implementation.</p>

<h3 class="learn-subheading">Culture of Peace — UNESCO Framework</h3>

<p class="learn-p">The UN Declaration on a Culture of Peace (1999) identified eight action areas:</p>
<ol class="learn-list learn-ordered">
  <li>Culture of peace through education (peace education for all)</li>
  <li>Sustainable economic and social development (address root causes)</li>
  <li>Respect for all human rights (dignity, freedom, equality)</li>
  <li>Equality between women and men (gender equality as peace condition)</li>
  <li>Democratic participation (inclusive decision-making)</li>
  <li>Understanding, tolerance, solidarity (across differences)</li>
  <li>Participatory communication and free flow of information (media for peace)</li>
  <li>International peace and security (disarmament, conflict prevention)</li>
</ol>

<p class="learn-p">A culture of peace exists when these conditions are embedded in daily life — not just absence of war but presence of justice, participation, and non-violence as cultural norms.</p>

<h3 class="learn-subheading">Peace Clubs and Youth for Peace in Nigeria</h3>

<p class="learn-p">Peace clubs in Nigerian schools bring students together across ethnic and religious lines. Activities include:</p>
<ul class="learn-list">
  <li>Debates and essay competitions on peace themes</li>
  <li>Interfaith and intercultural dialogues</li>
  <li>Peer mediation training — students resolve disputes among peers</li>
  <li>Community service — joint projects across divides</li>
  <li>Peace rallies, concerts, sports competitions promoting unity</li>
</ul>

<p class="learn-p">Examples: Plateau State has developed peace clubs in schools affected by ethno-religious violence. WANEP (West African Network for Peacebuilding) supports youth peace networks across Nigeria.</p>

<h3 class="learn-subheading">Building a Culture of Peace in Nigeria — Community Initiatives</h3>

<p class="learn-p">Beyond schools, communities are building cultures of peace through:</p>
<ul class="learn-list">
  <li><strong>Interfaith dialogue:</strong> Christian-Muslim dialogue initiatives (e.g., Pastor James Wuye and Imam Muhammad Ashafa in Kaduna) model reconciliation</li>
  <li><strong>Peace rallies and walks:</strong> Community-wide events promoting unity</li>
  <li><strong>Sports for peace:</strong> Football tournaments bringing divided communities together</li>
  <li><strong>Peace media:</strong> Community radio, social media campaigns promoting tolerance</li>
  <li><strong>Traditional conflict resolution:</strong> Revitalizing indigenous peace mechanisms</li>
</ul>

<h3 class="learn-subheading">Peace Champions in Nigeria</h3>

<p class="learn-p">Notable Nigerian peacebuilders include:</p>
<ul class="learn-list">
  <li><strong>Pastor James Wuye and Imam Muhammad Ashafa:</strong> Former enemies who now co-direct the Interfaith Mediation Centre, training religious leaders across Nigeria and West Africa</li>
  <li><strong>Professor Joy Ogeah:</strong> Women's peace activist, advocating for gender inclusion in peace processes</li>
  <li><strong>Traditional rulers:</strong> Sultan of Sokoto (Muslim leader), Ooni of Ife, Obi of Onitsha — using traditional authority for peace</li>
  <li><strong>Youth peace activists:</strong> Various young Nigerians organizing peace initiatives despite challenges</li>
</ul>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="240" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🏫 PEACE EDUCATION — Knowledge, Skills, Attitudes, Values</text>
    
    <g>
      <rect x="15" y="45" width="225" height="85" rx="10" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text x="127" y="66" text-anchor="middle" font-size="11" fill="#1e3a8a" font-weight="800">📚 KNOWLEDGE</text>
      <text x="127" y="86" text-anchor="middle" font-size="8" fill="#1e3a8a">Causes of conflict, human rights</text>
      <text x="127" y="102" text-anchor="middle" font-size="8" fill="#1e3a8a">Conflict resolution methods</text>
      <text x="127" y="118" text-anchor="middle" font-size="8" fill="#1e3a8a">International humanitarian law</text>
    </g>
    
    <g>
      <rect x="260" y="45" width="225" height="85" rx="10" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <text x="372" y="66" text-anchor="middle" font-size="11" fill="#166534" font-weight="800">🛠️ SKILLS</text>
      <text x="372" y="86" text-anchor="middle" font-size="8" fill="#166534">Negotiation, mediation, communication</text>
      <text x="372" y="102" text-anchor="middle" font-size="8" fill="#166534">Critical thinking, empathy</text>
      <text x="372" y="118" text-anchor="middle" font-size="8" fill="#166534">Active listening, problem-solving</text>
    </g>
    
    <g>
      <rect x="15" y="145" width="225" height="70" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text x="127" y="166" text-anchor="middle" font-size="11" fill="#92400e" font-weight="800">❤️ ATTITUDES</text>
      <text x="127" y="186" text-anchor="middle" font-size="8" fill="#92400e">Respect for diversity, tolerance</text>
      <text x="127" y="202" text-anchor="middle" font-size="8" fill="#92400e">Non-violence, global citizenship</text>
    </g>
    
    <g>
      <rect x="260" y="145" width="225" height="70" rx="10" fill="#ede9fe" stroke="#a78bfa" stroke-width="2"/>
      <text x="372" y="166" text-anchor="middle" font-size="11" fill="#5b21b6" font-weight="800">🌟 VALUES</text>
      <text x="372" y="186" text-anchor="middle" font-size="8" fill="#5b21b6">Human dignity, equality</text>
      <text x="372" y="202" text-anchor="middle" font-size="8" fill="#5b21b6">Freedom, solidarity, justice</text>
    </g>
    
    <text x="250" y="235" text-anchor="middle" font-size="9" fill="#64748b">🔑 Peace education transforms how people think about conflict and violence</text>
  </svg>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Scholar:</strong> Betty Reardon developed the three dimensions of peace education (about, for, through peace). Her work at Teachers College, Columbia University, shaped global peace education.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Explain how peace clubs in Nigerian schools contribute to building a culture of peace." (Sample answer: Peace clubs bring students across ethnic/religious lines together for debates, dialogues, peer mediation, and community service — developing conflict resolution skills, building relationships across divides, and changing attitudes through positive contact. They create micro-cultures of peace that can influence wider school communities.)</span>
</div>
    `,
    questions: [
      { q: "According to Betty Reardon, peace education has which three dimensions?", o: ["Local, national, international", "Education about peace, for peace, through peace", "Primary, secondary, tertiary", "Knowledge, skills, attitudes"], a: 1, e: "Reardon's three dimensions: education ABOUT peace (knowledge), FOR peace (skills/values), and THROUGH peace (pedagogy — teaching peacefully).", h: "Think about content, purpose, and method.", yr: "GST" },
      { q: "The UNESCO Constitution states that 'since wars begin in the minds of men...'", o: ["...wars will never end", "...only military force can stop them", "...it is in the minds of men that the defenses of peace must be constructed", "...peace is impossible"], a: 2, e: "The UNESCO Constitution (1945) recognized that peace must be built through education and transformed thinking — not just military or political arrangements.", h: "Where do wars start?", yr: "GST" },
      { q: "Which of the following is a key component of peace education?", o: ["Learning to use weapons", "Conflict resolution education — teaching negotiation, mediation, problem-solving", "Military training", "Nationalist propaganda"], a: 1, e: "Peace education includes conflict resolution education — teaching non-violent dispute resolution skills like negotiation, mediation, active listening, and problem-solving.", h: "What helps people resolve disputes without violence?", yr: "GST" },
      { q: "What is the 'culture of peace' according to UNESCO?", o: ["Only absence of war", "Eight action areas including education, development, human rights, gender equality, democratic participation, tolerance, free information, and international security", "Military alliance", "Economic union"], a: 1, e: "The UN Declaration on a Culture of Peace (1999) identified eight action areas that together create conditions where peace is embedded as cultural norms — not just absence of violence.", h: "What are the eight areas?", yr: "GST" },
      { q: "Peace clubs in Nigerian schools typically engage in all EXCEPT:", o: ["Debates and essay competitions on peace themes", "Interfaith and intercultural dialogues", "Peer mediation training", "Armed combat training"], a: 3, e: "Peace clubs focus on non-violent activities — debates, dialogues, peer mediation, community service. Armed combat training contradicts peace education goals.", h: "What would NOT belong in a peace club?", yr: "GST" },
      { q: "Which Nigerian peace champions are former enemies who now co-direct the Interfaith Mediation Centre?", o: ["Bishop Kukah and Sultan Abubakar", "Pastor James Wuye and Imam Muhammad Ashafa", "Professor Wole Soyinka and Chinua Achebe", "General Gowon and Ojukwu"], a: 1, e: "Wuye (Christian) and Ashafa (Muslim) were once enemies during Kaduna ethno-religious conflicts. They reconciled and now train religious leaders across Nigeria and West Africa in peacebuilding.", h: "Which Christian-Muslim pair worked together for peace?", yr: "GST" },
      { q: "Human rights education in peace education teaches:", o: ["That rights don't matter", "Understanding universal human rights, UDHR, and mechanisms for protection", "Only national rights", "Only religious rights"], a: 1, e: "Human rights education teaches universal human rights, the Universal Declaration of Human Rights (UDHR), international human rights law, and mechanisms for protecting rights.", h: "What document begins with 'All human beings are born free and equal'?", yr: "GST" },
      { q: "A challenge facing peace education in Nigerian schools is:", o: ["Too much teacher training", "Curriculum overload and lack of teacher training", "Too many resources available", "Perfect implementation"], a: 1, e: "Challenges include curriculum overload (limited time), inadequate teacher training, lack of resources, examination focus on recall rather than skills, and conflict-affected areas where schools are disrupted.", h: "What makes it hard to teach peace in Nigerian schools?", yr: "GST" },
      { q: "Intercultural and interfaith education aims to:", o: ["Increase prejudice", "Build respect for diversity and dialogue across differences", "Convert others to one religion", "Separate groups completely"], a: 1, e: "Intercultural/interfaith education reduces prejudice, builds respect for diversity, and teaches skills for constructive dialogue across ethnic and religious differences.", h: "What reduces prejudice and builds respect?", yr: "GST" },
      { q: "What is peer mediation in peace education?", o: ["Fighting to resolve disputes", "Students trained to help other students resolve disputes peacefully", "Teachers only resolving disputes", "Police intervention"], a: 1, e: "Peer mediation trains students as neutral mediators to help fellow students resolve conflicts — developing leadership skills while reducing violence and teacher intervention burden.", h: "Who helps students solve problems?", yr: "GST" },
      { q: "The Declaration on a Culture of Peace was adopted by the UN in:", o: ["1945", "1960", "1999", "2015"], a: 2, e: "The UN General Assembly adopted the Declaration and Programme of Action on a Culture of Peace in 1999, following UNESCO's leadership.", h: "What year was it adopted?", yr: "GST" },
      { q: "Gender and peace education addresses:", o: ["That gender doesn't matter", "How gender inequality relates to violence and women's roles in peacebuilding", "Only men's issues", "Only military issues"], a: 1, e: "Gender and peace education examines how gender inequality correlates with violence, the specific ways conflict affects women and men differently, and women's crucial roles in peacebuilding (UNSCR 1325).", h: "How does gender relate to conflict?", yr: "GST" },
      { q: "Global citizenship education emphasizes:", o: ["National superiority", "Shared humanity beyond national boundaries, addressing global challenges together", "Isolation from other countries", "Only local issues"], a: 1, e: "Global citizenship education transcends nationalism — recognizing shared humanity, interdependence, and need to address global challenges (climate change, pandemics, nuclear weapons) cooperatively.", h: "What connects all humans across borders?", yr: "GST" },
      { q: "Which is an example of 'education THROUGH peace' (pedagogy dimension)?", o: ["Lecture on conflict theory", "Cooperative learning and democratic classroom management modeling peaceful relations", "Multiple-choice exam on peace", "Memorizing definitions"], a: 1, e: "Education THROUGH peace refers to pedagogy — how teaching methods model peace. Cooperative learning, democratic classrooms, and non-coercive discipline teach peace through experience, not just content.", h: "How teachers teach — not just what they teach.", yr: "GST" },
      { q: "Media literacy for peace education teaches students to:", o: ["Believe all media", "Recognize propaganda, hate speech, and stereotypes — using media to promote peace", "Ignore all news", "Only watch entertainment"], a: 1, e: "Media literacy for peace teaches critical consumption of media — identifying propaganda, hate speech, biased reporting, and stereotypes — and constructive use of media (social media, community radio) to promote peace and counter violent extremism.", h: "How can media be used for peace?", yr: "GST" },
      { q: "Which community initiative builds culture of peace through football tournaments?", o: ["Sports for peace — bringing divided communities together", "Military parades", "Armed patrols", "Curfews"], a: 0, e: "Sports for peace uses football (soccer) tournaments to bring together youth from divided communities, building relationships across ethnic and religious lines through positive shared experiences.", h: "What sport is most popular for peace-building?", yr: "GST" },
      { q: "The condition for a 'culture of peace' includes:", o: ["Censorship and control of information", "Democratic participation and free flow of information", "Military rule", "One-party state"], a: 1, e: "A culture of peace requires democratic participation (inclusive decision-making) and free flow of information — not censorship or authoritarian control.", h: "What political conditions support peace?", yr: "GST" },
      { q: "Environmental peace education addresses:", o: ["Only climate science", "How environmental degradation links to conflict (e.g., desertification contributing to farmers-herders conflict)", "Only conservation", "Only pollution"], a: 1, e: "Environmental peace education links environmental issues to conflict — climate change causing resource scarcity, desertification driving migration, competition over water and land — and promotes sustainable development as peacebuilding.", h: "How does the environment relate to conflict?", yr: "GST" },
      { q: "Which of the following is a skill taught in peace education?", o: ["How to use weapons", "Active listening and empathy", "How to start fights", "How to hold grudges"], a: 1, e: "Peace education teaches communication skills including active listening (fully attending to speaker), empathy (understanding others' perspectives), and emotional regulation.", h: "What helps you understand others?", yr: "GST" },
      { q: "What is the primary goal of peace education?", o: ["To eliminate all conflict (impossible)", "To teach knowledge, skills, attitudes, and values for preventing conflict and resolving disputes non-violently", "To promote nationalism", "To teach only military history"], a: 1, e: "Peace education aims to equip learners with knowledge (causes of conflict), skills (negotiation, mediation), attitudes (tolerance, respect), and values (human dignity, equality) to handle conflict constructively — not eliminate it (impossible and undesirable).", h: "What does peace education actually teach?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 8: Conflict in Nigeria - Causes and Patterns
  // ==========================================================================
  {
    topic: "Conflict in Nigeria - Causes and Patterns",
    topicCode: "PCR-008-01",
    module: "Nigerian Conflicts",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Nigeria has experienced numerous conflicts</span> since independence in 1960, ranging from the devastating Civil War (1967-1970) to contemporary insurgencies, militancy, banditry, and communal violence. Understanding these conflicts — their causes, dynamics, and patterns — is <strong>essential for developing effective prevention and resolution strategies</strong>.
</div>

<p class="learn-p">Nigeria's conflicts are complex and multi-causal, involving political exclusion, economic inequality, resource competition, ethnic and religious identity, historical grievances, environmental stress, weak governance, and proliferation of small arms. No single factor explains any major Nigerian conflict — they result from interacting causes.</p>

<h3 class="learn-subheading">Overview of Conflict Types in Nigeria</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Conflict Type</th><th>Examples</th><th>Primary Regions</th><th>Key Causes</th>
    </thead>
    <tbody>
      <tr><td>Ethno-Religious</td><td>Jos crises, Kaduna (2000, 2002), Kano (1991, 2000), Zangon-Kataf (1992)</td><td>Middle Belt, North-West, North-Central</td><td>Indigene/settler, political competition, religious identity, historical grievances</td>
      </tr>
      <tr><td>Resource-Based</td><td>Farmers-herders, land disputes, water conflicts, oil/gas</td><td>North-Central, South-South, North-East</td><td>Climate change, population growth, grazing routes, environmental degradation</td></tr>
      <tr><td>Political Violence</td><td>Election violence (1964/65, 1983, 2011), June 12 crisis (1993)</td><td>National</td><td>Winner-take-all system, poverty, political thuggery, elite manipulation</td></tr>
      <tr><td>Insurgency</td><td>Boko Haram, ISWAP</td><td>North-East (Borno, Yobe, Adamawa)</td><td>Poverty, weak education, political exclusion, foreign jihadi influences, state failure</td></tr>
      <tr><td>Militancy</td><td>Niger Delta (MEND, NDV), IPOB (Biafra agitation)</td><td>South-South, South-East</td><td>Resource control, environmental degradation, political marginalization</td></tr>
      <tr><td>Banditry/Kidnapping</td><td>Zamfara, Katsina, Kaduna, Sokoto, Niger</td><td>North-West, North-Central</td><td>Mining conflicts, cattle rustling, small arms proliferation, poverty</td></tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">The Nigerian Civil War (1967-1970)</h3>

<p class="learn-p">The Civil War (also known as the Biafran War) remains Nigeria's deadliest conflict. Causes included:</p>
<ul class="learn-list">
  <li><strong>1966 coups:</strong> January coup (mostly Igbo officers), July counter-coup (Northern officers) — pogroms against Igbo in North</li>
  <li><strong>Eastern Region secession:</strong> Lt. Colonel Odumegwu Ojukwu declared Republic of Biafra (May 30, 1967)</li>
  <li><strong>Federal response:</strong> General Gowon's federal forces fought to preserve unity</li>
  <li><strong>Humanitarian catastrophe:</strong> Starvation (images of starving Biafran children), international aid</li>
  <li><strong>End and aftermath:</strong> Surrender January 1970; "No Victor, No Vanquished" policy; subsequent marginalization of Igbo</li>
</ul>

<p class="learn-p"><strong>Legacy:</strong> Over one million dead (mostly civilians from starvation). Igbo remain sensitive to perceived marginalization — IPOB agitation continues. Structural issues (resource control, federal character, political inclusion) remain unresolved.</p>

<h3 class="learn-subheading">Ethno-Religious Conflicts in the Middle Belt and North</h3>

<p class="learn-p">The Middle Belt (states like Plateau, Kaduna, Benue, Nasarawa, Taraba) experiences recurring ethno-religious conflicts. Key episodes:</p>
<ul class="learn-list">
  <li><strong>Kafanchan (1987):</strong> Christian-Muslim violence spread to Kaduna, Kano, Katsina</li>
  <li><strong>Zangon-Kataf (1992):</strong> Hausa vs Atyap — over 1,000 dead</li>
  <li><strong>Kaduna (2000):</strong> Sharia implementation protests — over 2,000 dead</li>
  <li><strong>Jos crises (1994, 2001, 2008, 2010):</strong> Indigene/settler dynamics, political competition, religious identity — hundreds dead, thousands displaced</li>
</ul>

<p class="learn-p"><strong>Underlying causes:</strong> Indigene/settler dichotomy (some groups defined as "indigenous" with special rights, others as "settlers" excluded); political competition for local government control; poverty; weak conflict resolution; proliferation of small arms.</p>

<h3 class="learn-subheading">Farmers-Herders Conflict</h3>

<p class="learn-p">This conflict has escalated dramatically in the last decade, now claiming hundreds of lives annually — particularly in Benue, Plateau, Taraba, Nasarawa, Kaduna, and Adamawa.</p>

<p class="learn-p"><strong>Causes:</strong></p>
<ul class="learn-list">
  <li><strong>Climate change:</strong> Desertification reduces grazing land in North, pushing herders South</li>
  <li><strong>Population growth:</strong> More people needing more land for farming and grazing</li>
  <li><strong>Grazing routes:</strong> Traditional routes encroached by farms, settlements</li>
  <li><strong>Land tenure laws:</strong> Benue's Open Grazing Prohibition and Ranches Establishment Law (2017) — controversial among herders</li>
  <li><strong>Small arms proliferation:</strong> Weapons from Libya (post-Gaddafi), local production</li>
  <li><strong>Weak security:</strong> Police, military unable to prevent attacks or protect communities</li>
</ul>

<p class="learn-p"><strong>Consequences:</strong> Deaths, displacement, food insecurity (crops destroyed, livestock killed), ethnic/religious polarization (herders predominantly Fulani Muslim; farmers predominantly Christian or traditionalist in Middle Belt).</p>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="250" rx="14" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#991b1b" font-weight="800">🔥 FARMERS-HERDERS CONFLICT IN NIGERIA — Cycle of Violence</text>
    
    <g>
      <rect x="15" y="45" width="220" height="42" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
      <text x="125" y="62" text-anchor="middle" font-size="9" fill="#991b1b" font-weight="800">🌍 Climate Change + Population Growth</text>
      <text x="125" y="78" text-anchor="middle" font-size="8" fill="#991b1b">→ Resource Scarcity (land, water)</text>
    </g>
    
    <g>
      <line x1="125" y1="87" x2="125" y2="95" stroke="#ef4444" stroke-width="1.5" marker-end="url(#arrowD)"/>
      <text x="250" y="142" text-anchor="middle" font-size="8" fill="#991b1b">→</text>
    </g>
    
    <g>
      <rect x="15" y="98" width="220" height="42" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="125" y="115" text-anchor="middle" font-size="9" fill="#92400e" font-weight="800">💥 Competition Escalates</text>
      <text x="125" y="131" text-anchor="middle" font-size="8" fill="#92400e">Crop destruction → Cattle rustling → Violence</text>
    </g>
    
    <g>
      <line x1="125" y1="140" x2="125" y2="148" stroke="#ef4444" stroke-width="1.5" marker-end="url(#arrowD)"/>
    </g>
    
    <g>
      <rect x="15" y="151" width="220" height="42" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <text x="125" y="168" text-anchor="middle" font-size="9" fill="#166534" font-weight="800">🔄 Vicious Cycle</text>
      <text x="125" y="184" text-anchor="middle" font-size="8" fill="#166534">Revenge attacks → Displacement → More violence</text>
    </g>
    
    <g>
      <rect x="260" y="45" width="225" height="148" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="372" y="66" text-anchor="middle" font-size="9" fill="#1e293b" font-weight="800">📊 KEY STATISTICS (Recent Years)</text>
      <text x="372" y="90" text-anchor="middle" font-size="8" fill="#64748b">• Hundreds killed annually</text>
      <text x="372" y="108" text-anchor="middle" font-size="8" fill="#64748b">• Thousands displaced</text>
      <text x="372" y="126" text-anchor="middle" font-size="8" fill="#64748b">• Benue, Plateau, Taraba worst-hit</text>
      <text x="372" y="144" text-anchor="middle" font-size="8" fill="#64748b">• Food insecurity worsens</text>
      <text x="372" y="162" text-anchor="middle" font-size="8" fill="#64748b">• Ethnic/religious polarization</text>
      <text x="372" y="180" text-anchor="middle" font-size="8" fill="#64748b">• Government responses: RUGA, NLTP</text>
    </g>
    
    <defs>
      <marker id="arrowD" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#ef4444"/>
      </marker>
    </defs>
    
    <text x="250" y="242" text-anchor="middle" font-size="9" fill="#64748b">🔑 Addressing climate change, land tenure, and security is essential for breaking the cycle</text>
  </svg>
</div>

<h3 class="learn-subheading">Boko Haram Insurgency in North-East Nigeria</h3>

<p class="learn-p">Boko Haram (meaning "Western education is forbidden/sinful") emerged in Borno State around 2002 under Mohammed Yusuf. Key phases:</p>

<ul class="learn-list">
  <li><strong>2002-2009: Pre-uprising</strong> — establishing base in Maiduguri, preaching against Western education, attracting followers</li>
  <li><strong>2009 Uprising:</strong> Violent confrontation with security forces; Yusuf killed in custody — radicalization of survivors</li>
  <li><strong>2010-2014: Escalation under Abubakar Shekau</strong> — suicide bombings, attacks on churches, schools, markets, police, military</li>
  <li><strong>2014: Peak of insurgency</strong> — declared caliphate, controlled territory size of Belgium, Chibok girls kidnapping (April 2014)</li>
  <li><strong>2015-present: Counter-insurgency</strong> — Multinational Joint Task Force (MNJTF) pushes Boko Haram out of most territory; ISWAP splinter faction emerges; Shekau killed (2021); violence continues</li>
</ul>

<p class="learn-p"><strong>Causes:</strong> Poverty, unemployment, weak education (especially in North-East), corruption, political exclusion, historical grievances, foreign jihadi influences (al-Qaeda, ISIS), state failure.</p>

<p class="learn-p"><strong>Consequences:</strong> Over 35,000 killed, over 2 million displaced, destroyed infrastructure (schools, hospitals, markets), humanitarian crisis, children out of school, food insecurity.</p>

<h3 class="learn-subheading">Niger Delta Militancy</h3>

<p class="learn-p">The Niger Delta region (oil-producing states: Rivers, Bayelsa, Delta, Akwa Ibom, Cross River) has experienced militancy since the 1990s.</p>

<p class="learn-p"><strong>Root causes:</strong> Oil extraction without local benefit (resource curse), environmental devastation (oil spills, gas flaring destroying agriculture and fisheries), political marginalization, poverty despite oil wealth, lack of development (infrastructure, healthcare, education).</p>

<p class="learn-p"><strong>Key actors:</strong> Ken Saro-Wiwa and MOSOP (Movement for the Survival of Ogoni People) — peaceful activism until state execution (1995); MEND (Movement for the Emancipation of the Niger Delta) — armed militancy from 2005; NDV, NDA; current attacks on pipelines, kidnapping.</p>

<p class="learn-p"><strong>Amnesty Programme (2009):</strong> Government offered militants cash, training, and stipends in exchange for surrendering weapons and stopping attacks. Initially reduced violence, but implementation problems (delayed payments, inadequate training) and renewed militancy in some areas.</p>

<h3 class="learn-subheading">Banditry and Kidnapping in North-West Nigeria</h3>

<p class="learn-p">States like Zamfara, Katsina, Kaduna, Sokoto, and Niger have experienced escalating banditry (armed groups attacking villages, rustling cattle, kidnapping for ransom).</p>

<p class="learn-p"><strong>Causes:</strong> Competition over mining sites, cattle rustling as livelihood, proliferation of small arms (from Libya, local production), poverty, unemployment, weak security forces.</p>

<p class="learn-p"><strong>Government responses:</strong> Sharia law in Zamfara (attempt to deter crime); military operations (Sharan Daji, etc.); negotiation with bandits (controversial).</p>

<h3 class="learn-subheading">Separatist Agitations — IPOB and Others</h3>

<p class="learn-p">IPOB (Indigenous People of Biafra), led by Nnamdi Kanu, agitates for Biafran secession. Origins: MASSOB (1999), IPOB (2012). Demands include referendum on Biafran independence, release of Kanu. Government response: military operation "Python Dance," arrest and trial of Kanu (re-arrested 2021 after jumping bail). Other agitations: Oodua People's Congress (OPC) and Yoruba Nation agitation (Sunday Igboho).</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📊</span>
  <span><strong>Key Statistic:</strong> According to ACLED (Armed Conflict Location & Event Data Project), Nigeria consistently ranks among the most conflict-affected countries in Africa, with thousands of fatalities annually from Boko Haram, banditry, farmers-herders, and communal conflicts.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Compare the causes of the Niger Delta militancy and the Boko Haram insurgency. What similarities and differences exist?" (Similarities: poverty, unemployment, political marginalization, state failure. Differences: Niger Delta — resource curse, environmental degradation; Boko Haram — religious ideology, rejection of Western education, foreign jihadi influences.)</span>
</div>
    `,
    questions: [
      { q: "When did the Nigerian Civil War take place?", o: ["1960-1963", "1967-1970", "1975-1979", "1983-1985"], a: 1, e: "The Civil War (Biafran War) lasted from July 6, 1967 to January 15, 1970, when Biafra surrendered.", h: "Remember the years — Biafra declared in 1967.", yr: "GST" },
      { q: "Which event triggered the escalation of Boko Haram from preaching to armed insurgency?", o: ["2009 killing of Mohammed Yusuf in police custody", "2014 Chibok kidnapping", "2015 election of President Buhari", "2011 bombing of UN building"], a: 0, e: "When Mohammed Yusuf was killed in police custody (2009), survivors including Abubakar Shekau radicalized and launched armed insurgency.", h: "What happened in 2009?", yr: "GST" },
      { q: "The Niger Delta militancy primarily arises from:", o: ["Religious differences", "Oil extraction without local benefit (environmental devastation, poverty despite oil wealth, political marginalization)", "Ethnic cleansing", "Border disputes"], a: 1, e: "Niger Delta militancy results from resource curse — oil wealth not benefiting local communities, environmental destruction, political exclusion, and lack of development.", h: "What is the main resource there?", yr: "GST" },
      { q: "The Amnesty Programme in Niger Delta was established in which year?", o: ["1999", "2005", "2009", "2015"], a: 2, e: "The Amnesty Programme (2009) offered militants cash, training, and stipends to surrender weapons, initially reducing violence.", h: "When did President Yar'Adua launch it?", yr: "GST" },
      { q: "Boko Haram means:", o: ["Western education is forbidden/sinful", "Islamic education is mandatory", "Nigeria must be divided", "Fight for freedom"], a: 0, e: "Boko Haram means 'Western education is forbidden (haram)' — the group rejects Western-style education and seeks Islamic state.", h: "What does 'Boko' refer to?", yr: "GST" },
      { q: "Which Middle Belt state is worst affected by farmers-herders conflict?", o: ["Borno", "Rivers", "Benue", "Lagos"], a: 2, e: "Benue is among worst-hit states, with hundreds killed annually. Benue's Open Grazing Prohibition Law (2017) is controversial among herders.", h: "Which state banned open grazing?", yr: "GST" },
      { q: "The Jos crises (1994-2010) are primarily:", o: ["Oil conflicts", "Ethno-religious and indigene/settler conflicts", "Border disputes", "Tax protests"], a: 1, e: "Jos crises involve indigene/settler dichotomy (Berom vs Hausa, etc.), political competition, and Christian-Muslim dimensions.", h: "What is the indigene/settler issue?", yr: "GST" },
      { q: "Which group agitates for Biafran secession?", o: ["MEND", "Boko Haram", "IPOB (Indigenous People of Biafra)", "Oodua People's Congress"], a: 2, e: "IPOB, led by Nnamdi Kanu, agitates for Biafran secession. MASSOB preceded IPOB.", h: "Which group wants Biafra?", yr: "GST" },
      { q: "Which factor contributes to farmers-herders conflict?", o: ["Desertification due to climate change pushing herders South", "Abundant water resources", "Low population", "Strong grazing route protection"], a: 0, e: "Climate change causes desertification in North, reducing grazing land and pushing herders South into farming areas, increasing competition over land and water.", h: "How does climate affect herders?", yr: "GST" },
      { q: "Ken Saro-Wiwa was executed in 1995 for leading:", o: ["Boko Haram", "MEND", "MOSOP (Movement for Survival of Ogoni People) protesting oil devastation", "IPOB"], a: 2, e: "Saro-Wiwa and MOSOP peacefully protested Shell's oil extraction devastating Ogoni land and communities. He was executed by Sani Abacha's regime, sparking international outrage.", h: "Which movement protested oil in Ogoniland?", yr: "GST" },
      { q: "The 2014 Chibok kidnapping involved:", o: ["Niger Delta militants", "Boko Haram kidnapping over 200 schoolgirls", "Bandits", "IPOB"], a: 1, e: "Boko Haram kidnapped over 200 girls from Government Secondary School, Chibok, Borno State — global #BringBackOurGirls campaign.", h: "Which group kidnapped Chibok girls?", yr: "GST" },
      { q: "The 1966 coups and pogroms against Igbo in the North led to:", o: ["Niger Delta militancy", "Boko Haram", "Nigerian Civil War (Biafran secession)", "Farmers-herders conflict"], a: 2, e: "Igbo pogroms in North after the coups led Eastern Region (under Ojukwu) to secede as Biafra, triggering the Civil War.", h: "What was the immediate cause of Biafra secession?", yr: "GST" },
      { q: "Banditry in North-West Nigeria is driven by all EXCEPT:", o: ["Cattle rustling as livelihood", "Competition over mining sites", "Proliferation of small arms", "Strong, well-funded security forces"], a: 3, e: "Banditry thrives due to weak security, not strong forces. Causes include mining competition, cattle rustling, small arms, poverty, and weak police/military.", h: "What would reduce, not increase, banditry?", yr: "GST" },
      { q: "What is 'No Victor, No Vanquished'?", o: ["Military coup slogan", "Gowon's policy after Civil War — no winner, no loser — aimed at reconciliation", "Boko Haram motto", "IPOB slogan"], a: 1, e: "General Gowon announced 'No Victor, No Vanquished' after Civil War surrender (1970) to promote reconciliation, though Igbo felt it ignored their suffering and marginalization continued.", h: "What did Gowon say after the war?", yr: "GST" },
      { q: "Which group splintered from Boko Haram and pledged allegiance to ISIS?", o: ["MEND", "ISWAP (Islamic State West Africa Province)", "IPOB", "NDV"], a: 1, e: "ISWAP splintered from Boko Haram around 2016, pledging allegiance to ISIS. ISWAP and Boko Haram (JAS) now compete and conflict.", h: "Which faction supports ISIS?", yr: "GST" },
      { q: "Oodua People's Congress (OPC) agitates for:", o: ["Biafra", "Yoruba Nation — self-determination for Yoruba people", "Niger Delta independence", "Sharia law"], a: 1, e: "OPC and more recent 'Yoruba Nation' agitators (Sunday Igboho) seek self-determination for Yoruba people, citing marginalization.", h: "Which group wants a Yoruba nation?", yr: "GST" },
      { q: "The Multinational Joint Task Force (MNJTF) fights:", o: ["Niger Delta militants", "Boko Haram/ISWAP in Lake Chad region", "Bandits in North-West", "IPOB"], a: 1, e: "MNJTF includes Nigeria, Niger, Chad, Cameroon, Benin troops combating Boko Haram/ISWAP in the Lake Chad Basin.", h: "Which regional force fights Boko Haram?", yr: "GST" },
      { q: "Farmers-herders conflict is worst in which zones?", o: ["North-Central and South-South", "North-East only", "South-West only", "North-Central and North-East (Benue, Plateau, Taraba, Nasarawa, Adamawa)"], a: 3, e: "Farmers-herders conflict is most intense in Middle Belt (North-Central) and parts of North-East — Benue, Plateau, Taraba, Nasarawa, Kaduna, Adamawa.", h: "Which states are most affected?", yr: "GST" },
      { q: "What was the immediate cause of the 2009 Boko Haram uprising?", o: ["Chibok kidnapping", "UN bombing", "Clash with security forces over motorcycle helmets (enforcement of helmet law led to shootout)", "Election fraud"], a: 2, e: "In July 2009, Boko Haram members refused to wear helmets while riding motorcycles; clash with police escalated, leading to uprising and Yusuf's capture and extrajudicial killing.", h: "What triggered the uprising?", yr: "GST" },
      { q: "According to the module, why does Nigeria experience so many conflicts?", o: ["Single cause — ethnic diversity only", "Multiple interacting causes: political exclusion, economic inequality, resource competition, identity, climate change, weak governance, historical grievances", "Only religious differences", "Only poverty"], a: 1, e: "Nigerian conflicts have multiple interacting causes at individual, community, state, and systemic levels — no single factor explains any major conflict.", h: "Do Nigerian conflicts have simple or complex causes?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 9: Peacebuilding and Conflict Prevention in Nigeria
  // ==========================================================================
  {
    topic: "Peacebuilding and Conflict Prevention in Nigeria",
    topicCode: "PCR-009-01",
    module: "Nigerian Peacebuilding",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Peacebuilding in Nigeria</span> involves government institutions, NGOs, community organizations, religious leaders, traditional rulers, and international partners working to prevent conflict, resolve disputes, and build sustainable peace. Despite significant challenges, <strong>numerous initiatives have demonstrated effectiveness in reducing violence and promoting reconciliation</strong>.
</div>

<p class="learn-p">Peacebuilding is long-term work addressing root causes — not just managing violence. Effective peacebuilding in Nigeria requires understanding local contexts, respecting traditional mechanisms, involving women and youth, and coordinating across multiple actors.</p>

<h3 class="learn-subheading">Government Peacebuilding Institutions and Programs</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Institution/Program</th><th>Mandate</th><th>Status/Challenges</th>
    </thead>
    <tbody>
      <tr><td>National Peace Commission (proposed)</td><td>Coordinate peacebuilding across federal and state levels, early warning and response</td><td>Not yet established; draft bill pending</td>
      </table>
      <tr><td>National Early Warning System (NEWS)</td><td>Monitor conflict indicators, provide early warning for preventive action</td><td>Operational but underfunded; response weak</td></tr>
      <tr><td>North-East Development Commission (NEDC)</td><td>Rebuild Borno, Yobe, Adamawa after Boko Haram destruction</td><td>Active but challenges with scale and corruption</td></tr>
      <tr><td>Presidential Committee on Northeast Initiative (PCNI)</td><td>Coordinate humanitarian and development response</td><td>Phased out, replaced by NEDC</td></tr>
      <tr><td>Victims Support Fund</td><td>Support victims of terrorism and insurgency</td><td>Limited resources, ongoing needs exceed capacity</td></tr>
      <tr><td>Operation Safe Corridor</td><td>Deradicalization, rehabilitation, reintegration of repentant Boko Haram fighters</td><td>Mixed results; controversy over reintegration</td></tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">Non-Governmental Peacebuilding Organizations in Nigeria</h3>

<p class="learn-p">NGOs play crucial roles in peacebuilding, often working at community level where government cannot reach:</p>

<ul class="learn-list">
  <li><strong>WANEP (West African Network for Peacebuilding):</strong> Regional network with strong Nigeria presence — early warning, training, mediation, women/youth peacebuilding</li>
  <li><strong>Search for Common Ground:</strong> International NGO with Nigeria office — media for peace (radio dramas), community dialogues, youth programs</li>
  <li><strong>Interfaith Mediation Centre (Kaduna):</strong> Wuye and Ashafa — training religious leaders across Nigeria, West Africa in mediation and interfaith cooperation</li>
  <li><strong>International Alert:</strong> Research, policy advocacy, community-level peacebuilding (especially Plateau, Kaduna)</li>
  <li><strong>CLEEN Foundation:</strong> Police reform, security sector governance, community safety</li>
  <li><strong>PIND (Partnership Initiatives in Niger Delta):</strong> Economic development as peacebuilding, conflict tracking</li>
  <li><strong>Nigeria Stability and Reconciliation Programme (NSRP, British Council):</strong> Conflict analysis, support to peacebuilders (ended 2020)</li>
  <li><strong>Partners for Peace (P4P):</strong> Multi-stakeholder networks for early warning and response in Niger Delta</li>
  <li><strong>Peace Revival and Reconciliation Foundation of Nigeria (PREREF):</strong> Community reconciliation, trauma healing</li>
</ul>

<h3 class="learn-subheading">Interfaith Dialogue Initiatives</h3>

<p class="learn-p">Nigeria's religious diversity (roughly 50% Muslim, 48% Christian, 2% traditional/other) requires interfaith cooperation for peace.</p>

<ul class="learn-list">
  <li><strong>Nigeria Inter-Religious Council (NIREC):</strong> Co-chaired by Sultan of Sokoto (Muslim leader) and President of Christian Association of Nigeria (CAN). Brings together religious leaders for dialogue on national issues.</li>
  <li><strong>Christian-Muslim dialogue at local level:</strong> Community-level interfaith committees, joint prayers after conflicts, shared religious events</li>
  <li><strong>Interfaith Mediation Centre (Kaduna):</strong> Training religious leaders as peacebuilders</li>
</ul>

<h3 class="learn-subheading">Community-Based Peacebuilding — Traditional and Local Mechanisms</h3>

<p class="learn-p">Community-level peacebuilding often proves most effective because it understands local dynamics and enjoys community trust.</p>

<p class="learn-p"><strong>Examples:</strong></p>
<ul class="learn-list">
  <li><strong>Community peace committees:</strong> Volunteers trained in conflict resolution, early warning, and rapid response — operating at ward or local government level (e.g., Plateau Peacebuilding Network)</li>
  <li><strong>Vigilantes and community security:</strong> Civilian Joint Task Force (CJTF) in Borno (controversial — human rights concerns); local vigilantes elsewhere</li>
  <li><strong>Community dialogues and peace platforms:</strong> Bringing together divided communities for facilitated dialogue</li>
  <li><strong>Traditional conflict resolution (revitalized):</strong> Elders' councils (Oha na Eze, Ogboni, Alkali courts, Amanyanabo) used for restorative justice, compensation, reconciliation</li>
</ul>

<h3 class="learn-subheading">Women's Role in Peacebuilding</h3>

<p class="learn-p">UN Security Council Resolution 1325 (2000) recognizes women's crucial role in peacebuilding and mandates their participation. In Nigeria:</p>

<ul class="learn-list">
  <li><strong>WIPNET (Women in Peacebuilding Network):</strong> Trains women peacebuilders, advocates for women's inclusion</li>
  <li><strong>Women Without Walls (WOWIC):</strong> Women-led peace initiatives in conflict zones</li>
  <li><strong>FOMWAN (Federation of Muslim Women's Associations):</strong> Muslim women's peacebuilding and advocacy</li>
  <li><strong>Ecumenical Women's Peace Network:</strong> Christian women's peace initiatives</li>
</ul>

<p class="learn-p"><strong>Challenges:</strong> Women remain underrepresented in formal peace negotiations; gender-based violence persists; women's peacebuilding work often underfunded and unrecognized.</p>

<h3 class="learn-subheading">Youth Peacebuilding</h3>

<p class="learn-p">Youth are both perpetrators of violence (unemployed youth recruited by armed groups) and potential peacebuilders.</p>

<ul class="learn-list">
  <li><strong>National Youth Peace and Security Agenda:</strong> Implementation of UNSCR 2250 (2015) on Youth, Peace, and Security</li>
  <li><strong>Youth-led organizations:</strong> Numerous youth groups conducting peace clubs, sports for peace, vocational training</li>
  <li><strong>Vocational training as peacebuilding:</strong> Providing economic alternatives to violence — skills training, startup capital for at-risk youth</li>
</ul>

<h3 class="learn-subheading">Traditional Institutions and Rulers in Peacebuilding</h3>

<p class="learn-p">Traditional rulers retain significant influence, especially in rural areas where state presence is weak.</p>

<ul class="learn-list">
  <li><strong>Sultan of Sokoto (Muslim leader), Ooni of Ife, Obi of Onitsha, Oba of Benin, Emirs, Chiefs</strong> — using moral authority, convening power, and traditional conflict resolution mechanisms</li>
  <li><strong>Council of Traditional Rulers:</strong> National body advising government</li>
  <li><strong>Limitations:</strong> Some traditional rulers co-opted by colonial or post-colonial state, losing legitimacy; younger generations less deferential</li>
</ul>

<h3 class="learn-subheading">Disarmament, Demobilization, Reintegration (DDR) in Nigeria</h3>

<p class="learn-p">DDR is critical for ending insurgencies and militancy.</p>

<ul class="learn-list">
  <li><strong>Niger Delta Amnesty Programme (2009):</strong> Militants surrender weapons in exchange for cash, training, stipends — reduced violence initially, but implementation problems (delayed payments, inadequate training) and renewed militancy in some areas</li>
  <li><strong>Operation Safe Corridor (Boko Haram):</strong> Deradicalization, rehabilitation, reintegration of repentant fighters — controversial (victims' families oppose reintegration; concerns about recidivism)</li>
  <li><strong>Lessons learned:</strong> DDR requires economic opportunities, community acceptance, and long-term follow-up — not just cash payments</li>
</ul>

<h3 class="learn-subheading">Countering Violent Extremism (CVE) Programs</h3>

<p class="learn-p">CVE programs prevent radicalization and violent extremism.</p>

<ul class="learn-list">
  <li><strong>Prevention:</strong> Education (especially girls' education), economic opportunity (jobs, skills training), social services (healthcare, infrastructure), counter-narratives (challenging extremist ideology), community engagement</li>
  <li><strong>Nigerian CVE initiatives:</strong> Under Ministry of Interior, supported by international partners (US, UK, EU, UNDP) — includes deradicalization centers, counter-messaging campaigns, community policing</li>
  <li><strong>Challenges:</strong> Limited reach, insufficient funding, lack of coordination, corruption, security sector abuse undermining trust</li>
</ul>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="250" rx="14" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#166534" font-weight="800">🕊️ MULTI-LEVEL PEACEBUILDING IN NIGERIA</text>
    
    <g>
      <rect x="15" y="45" width="225" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="127" y="63" text-anchor="middle" font-size="9" fill="#1e3a8a" font-weight="800">🏛️ GOVERNMENT LEVEL</text>
      <text x="127" y="80" text-anchor="middle" font-size="7" fill="#1e3a8a">NEDC, NEWS, Operation Safe Corridor,</text>
      <text x="127" y="90" text-anchor="middle" font-size="7" fill="#1e3a8a">Victims Support Fund, National Peace Commission (proposed)</text>
    </g>
    
    <g>
      <rect x="260" y="45" width="225" height="50" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <text x="372" y="63" text-anchor="middle" font-size="9" fill="#166534" font-weight="800">🌍 INTERNATIONAL LEVEL</text>
      <text x="372" y="80" text-anchor="middle" font-size="7" fill="#166534">UN, ECOWAS, AU, US, UK, EU</text>
      <text x="372" y="90" text-anchor="middle" font-size="7" fill="#166534">MNJTF (Lake Chad), peacekeeping</text>
    </g>
    
    <g>
      <rect x="15" y="110" width="225" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="127" y="128" text-anchor="middle" font-size="9" fill="#92400e" font-weight="800">🏘️ COMMUNITY LEVEL</text>
      <text x="127" y="145" text-anchor="middle" font-size="7" fill="#92400e">Peace committees, vigilantes,</text>
      <text x="127" y="155" text-anchor="middle" font-size="7" fill="#92400e">traditional rulers, interfaith dialogues</text>
    </g>
    
    <g>
      <rect x="260" y="110" width="225" height="50" rx="8" fill="#fce7f3" stroke="#ec4899" stroke-width="1.5"/>
      <text x="372" y="128" text-anchor="middle" font-size="9" fill="#831843" font-weight="800">👩‍🦱 CIVIL SOCIETY / NGO LEVEL</text>
      <text x="372" y="145" text-anchor="middle" font-size="7" fill="#831843">WANEP, Search for Common Ground,</text>
      <text x="372" y="155" text-anchor="middle" font-size="7" fill="#831843">Interfaith Mediation Centre, PIND, CLEEN</text>
    </g>
    
    <g>
      <rect x="130" y="175" width="240" height="50" rx="8" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="250" y="193" text-anchor="middle" font-size="9" fill="#5b21b6" font-weight="800">👥 INDIVIDUAL AND RELATIONSHIP LEVEL</text>
      <text x="250" y="210" text-anchor="middle" font-size="7" fill="#5b21b6">Attitude change, trust-building, reconciliation, trauma healing</text>
      <text x="250" y="220" text-anchor="middle" font-size="7" fill="#5b21b6">Peace education in schools</text>
    </g>
    
    <text x="250" y="242" text-anchor="middle" font-size="9" fill="#64748b">🔑 Effective peacebuilding works at ALL levels simultaneously</text>
  </svg>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Scholar:</strong> John Paul Lederach's "pyramid" model distinguishes three levels: top leaders (government, military), middle-range leaders (NGOs, religious leaders, academics, traditional rulers), and grassroots (community). Peacebuilding requires coordinated action at all three levels.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Explain the role of traditional rulers in Nigerian peacebuilding. What are their strengths and limitations?" (Strengths: local legitimacy, cultural authority, access to communities, traditional conflict resolution mechanisms. Limitations: Some co-opted by state, losing legitimacy; younger generations less deferential; can be partisan.)</span>
</div>
    `,
    questions: [
      { q: "Which government agency is responsible for rebuilding Borno, Yobe, Adamawa after Boko Haram destruction?", o: ["EFCC", "NEDC (North-East Development Commission)", "NDDC", "NITDA"], a: 1, e: "NEDC was established to reconstruct and develop North-East states devastated by Boko Haram insurgency.", h: "Which commission focuses on North-East?", yr: "GST" },
      { q: "WANEP (West African Network for Peacebuilding) focuses on:", o: ["Economic development only", "Early warning, training, mediation, women/youth peacebuilding across West Africa", "Military intervention", "Political campaigns"], a: 1, e: "WANEP works on early warning, capacity building, mediation, and supporting women and youth peacebuilders across West Africa, including Nigeria.", h: "What does WANEP do?", yr: "GST" },
      { q: "Pastor James Wuye and Imam Muhammad Ashafa are known for:", o: ["Political campaigns", "Leading Boko Haram", "Co-founding Interfaith Mediation Centre training religious leaders in peacebuilding", "Military operations"], a: 2, e: "Former enemies who reconciled and now train religious leaders across Nigeria and West Africa in mediation, interfaith cooperation, and peacebuilding.", h: "Which Christian-Muslim duo works for peace?", yr: "GST" },
      { q: "NIREC (Nigeria Inter-Religious Council) is co-chaired by:", o: ["President and Vice President", "Sultan of Sokoto and CAN President", "Chief Justice and Senate President", "IGP and Chief of Army Staff"], a: 1, e: "NIREC brings together Muslim and Christian leaders for dialogue, co-chaired by Sultan of Sokoto (Muslim leader) and CAN President (Christian leader).", h: "Who leads NIREC?", yr: "GST" },
      { q: "UN Security Council Resolution 1325 addresses:", o: ["Counter-terrorism", "Women, peace, and security — women's participation in peace processes", "Climate change", "Economic sanctions"], a: 1, e: "UNSCR 1325 (2000) recognizes women's crucial role in peacebuilding and mandates their participation in peace processes and post-conflict reconstruction.", h: "What resolution focuses on women?", yr: "GST" },
      { q: "Operation Safe Corridor is a program for:", o: ["Niger Delta militants", "Boko Haram repentant fighters — deradicalization, rehabilitation, reintegration", "Bandits in North-West", "IPOB members"], a: 1, e: "Operation Safe Corridor offers deradicalization, rehabilitation, and reintegration for Boko Haram fighters who surrender, though controversial.", h: "What program handles repentant Boko Haram?", yr: "GST" },
      { q: "The Niger Delta Amnesty Programme (2009) offers:", o: ["Death penalty", "Cash, training, stipends to militants who surrender weapons", "Life imprisonment", "Exile"], a: 1, e: "Amnesty Programme gave militants cash, vocational training, and monthly stipends in exchange for surrendering weapons, initially reducing violence.", h: "What did militants get for surrendering?", yr: "GST" },
      { q: "WIPNET focuses on:", o: ["Military training", "Women in Peacebuilding Network — training women peacebuilders", "Political campaigns", "Religious conversion"], a: 1, e: "WIPNET trains women peacebuilders and advocates for women's inclusion in peace processes across Nigeria.", h: "Which network empowers women for peace?", yr: "GST" },
      { q: "UNSCR 2250 addresses:", o: ["Women", "Youth, peace, and security — youth participation in peacebuilding", "Climate change", "Economic sanctions"], a: 1, e: "UNSCR 2250 (2015) recognizes youth's role in peacebuilding and mandates their participation in peace processes.", h: "Which resolution focuses on youth?", yr: "GST" },
      { q: "CVE stands for:", o: ["Central Verification Entity", "Countering Violent Extremism — programs preventing radicalization", "Criminal Violence Eradication", "Civilian Volunteer Enforcement"], a: 1, e: "CVE programs prevent radicalization and violent extremism through education, economic opportunity, counter-narratives, and community engagement.", h: "What does CVE mean?", yr: "GST" },
      { q: "Which traditional ruler co-chairs NIREC?", o: ["Ooni of Ife", "Sultan of Sokoto (Muslim leader)", "Obi of Onitsha", "Oba of Benin"], a: 1, e: "Sultan of Sokoto co-chairs NIREC with CAN President, representing Muslim community in Nigeria.", h: "Which traditional ruler leads Nigerian Muslims?", yr: "GST" },
      { q: "Community peace committees typically:", o: ["Take up arms against opponents", "Are volunteers trained in conflict resolution, early warning, and rapid response", "Replace formal government", "Only work with police"], a: 1, e: "Community peace committees are volunteers (often trained by NGOs) who monitor conflicts, mediate disputes, and facilitate early warning and response at community level.", h: "Who helps resolve local conflicts?", yr: "GST" },
      { q: "Which international organization leads peacekeeping in Nigeria's North-East (MNJTF)?", o: ["UN", "AU", "ECOWAS (through MNJTF with Nigeria, Niger, Chad, Cameroon, Benin)", "EU"], a: 2, e: "MNJTF (Multinational Joint Task Force) is under Lake Chad Basin Commission, involving Nigeria, Niger, Chad, Cameroon, Benin — combating Boko Haram/ISWAP.", h: "Which regional body leads MNJTF?", yr: "GST" },
      { q: "According to Lederach's pyramid, which level includes NGOs and religious leaders?", o: ["Top leaders (government, military)", "Middle-range leaders (NGOs, religious, academics, traditional rulers)", "Grassroots (community)", "International"], a: 1, e: "Middle-range leaders include respected figures who bridge top leadership and grassroots — NGOs, religious leaders, academics, traditional rulers.", h: "Who connects government and communities?", yr: "GST" },
      { q: "Which NGO focuses on police reform and security sector governance in Nigeria?", o: ["WANEP", "Search for Common Ground", "CLEEN Foundation", "International Alert"], a: 2, e: "CLEEN Foundation works on police reform, security sector governance, community safety, and police accountability in Nigeria.", h: "Which NGO focuses on police?", yr: "GST" },
      { q: "DDR stands for:", o: ["Direct Democratic Representation", "Disarmament, Demobilization, Reintegration — critical for ending insurgencies", "Defense, Diplomacy, Reconstruction", "Development, Democracy, Rights"], a: 1, e: "DDR is the process of disarming combatants, demobilizing them from military structures, and reintegrating them into civilian life.", h: "What does DDR mean?", yr: "GST" },
      { q: "Which challenge faces women's peacebuilding in Nigeria?", o: ["Women are never involved", "Women are overrepresented in formal peace negotiations", "Women remain underrepresented in formal peace negotiations; work underfunded and unrecognized", "Women cause most conflicts"], a: 2, e: "Despite UNSCR 1325, women remain underrepresented in formal peace negotiations, and women's peacebuilding work often receives less funding and recognition than men's.", h: "What limits women's peacebuilding?", yr: "GST" },
      { q: "Which government program offers vocational training for at-risk youth as peacebuilding?", o: ["Only military recruitment", "Various programs — N-Power, NDE, state-level skills training — providing economic alternatives to violence", "Only prison", "Only religious education"], a: 1, e: "Nigerian and state governments run skills training programs (N-Power, NDE, etc.) that provide economic alternatives to youth who might otherwise be recruited into violence.", h: "What gives youth alternatives to violence?", yr: "GST" },
      { q: "PIND (Partnership Initiatives in Niger Delta) focuses on:", o: ["Military operations", "Economic development as peacebuilding, conflict tracking in Niger Delta", "Political campaigns", "Religious conversion"], a: 1, e: "PIND works on economic development (creating jobs, livelihoods) as peacebuilding, plus conflict tracking and early warning in Niger Delta.", h: "What does PIND do?", yr: "GST" },
      { q: "What is the main challenge facing the National Peace Commission (proposed)?", o: ["No need for it", "Bill pending; not yet established despite need for coordinating peacebuilding across levels", "Too many peace commissions", "Only for military"], a: 1, e: "The National Peace Commission bill remains pending; Nigeria still lacks a dedicated federal body to coordinate peacebuilding across states, despite repeated calls.", h: "Why hasn't the Peace Commission started?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 10: International Conflict Resolution and Human Rights
  // ==========================================================================
  {
    topic: "International Conflict Resolution and Human Rights",
    topicCode: "PCR-010-01",
    module: "Global and Regional Frameworks",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">International conflict resolution</span> involves global and regional organizations — United Nations (UN), African Union (AU), ECOWAS, International Criminal Court (ICC) — working to prevent, manage, and resolve conflicts. <strong>Understanding these frameworks helps Nigeria engage effectively with international peace and justice mechanisms</strong>.
</div>

<p class="learn-p">Nigeria is a member of the UN, AU, and ECOWAS, and has ratified numerous human rights treaties. These memberships create obligations and opportunities for peacebuilding, conflict resolution, and protection of human rights.</p>

<h3 class="learn-subheading">The United Nations and International Peace</h3>

<p class="learn-p">The UN Charter (1945) established the UN to "save succeeding generations from the scourge of war." Key provisions for peace include:</p>
<ul class="learn-list">
  <li><strong>Chapter VI: Pacific Settlement of Disputes</strong> — Parties to any dispute likely to endanger international peace shall seek resolution through negotiation, mediation, conciliation, arbitration, judicial settlement, or other peaceful means.</li>
  <li><strong>Chapter VII: Action with Respect to Threats to Peace</strong> — Security Council may impose sanctions, authorize peacekeeping operations, or authorize military force to maintain or restore international peace.</li>
  <li><strong>Principal organs:</strong> Security Council (primary responsibility for international peace), General Assembly, Secretariat, International Court of Justice (ICJ)</li>
</ul>

<p class="learn-p"><strong>UN Peacekeeping:</strong> Blue helmet missions deploy neutral forces to monitor ceasefires, protect civilians, and create space for political solutions. Principles: consent of parties, impartiality, non-use of force except self-defense. Notable missions: Liberia (UNMIL), Sierra Leone (UNAMSIL), DR Congo (MONUSCO). Nigeria has been a major troop contributor to UN peacekeeping.</p>

<h3 class="learn-subheading">International Criminal Justice — ICC and Others</h3>

<p class="learn-p"><strong>International Criminal Court (ICC):</strong> Established by Rome Statute (1998), prosecutes individuals for genocide, crimes against humanity, war crimes, and aggression. The ICC is a court of last resort — only when states are unwilling or unable to prosecute.</p>

<p class="learn-p"><strong>Nigeria and ICC:</strong> Nigeria signed Rome Statute in 2000, ratified in 2001. The ICC has not opened formal investigations in Nigeria (unlike Sudan, DR Congo, Uganda, Kenya, Libya, Côte d'Ivoire). However, ICC has expressed concern about Boko Haram crimes, security force abuses.</p>

<p class="learn-p"><strong>African Union criticism:</strong> Some African leaders accuse ICC of bias against Africa (all early cases were African). Several African states threatened withdrawal; South Africa, Burundi, Gambia gave withdrawal notices (some rescinded). AU proposed alternative: African Court with expanded jurisdiction.</p>

<p class="learn-p"><strong>International Court of Justice (ICJ):</strong> Resolves legal disputes between states — e.g., Nigeria vs Cameroon (Bakassi Peninsula, 2002) resolved by ICJ.</p>

<p class="learn-p"><strong>Special tribunals (ad hoc):</strong> ICTR (Rwanda, genocide 1994), ICTY (Former Yugoslavia), Special Court for Sierra Leone.</p>

<h3 class="learn-subheading">Human Rights and Conflict</h3>

<p class="learn-p">Human rights are inherent to all human beings, regardless of nationality, ethnicity, religion, gender, or status. Conflict both results from human rights violations (exclusion, discrimination, repression) and causes them (violence, displacement, torture, sexual violence).</p>

<p class="learn-p"><strong>Universal Declaration of Human Rights (UDHR, 1948):</strong> Foundation of international human rights law. Core principles: universality (human rights apply to everyone), indivisibility (all rights equally important), interdependence (rights reinforce each other).</p>

<p class="learn-p"><strong>Core human rights treaties:</strong></p>
<ul class="learn-list">
  <li><strong>ICCPR (International Covenant on Civil and Political Rights, 1966):</strong> Right to life, freedom from torture, freedom of speech, assembly, religion, fair trial</li>
  <li><strong>ICESCR (International Covenant on Economic, Social and Cultural Rights, 1966):</strong> Right to work, education, healthcare, housing, food, social security</li>
  <li><strong>African Charter on Human and Peoples' Rights (Banjul Charter, 1981):</strong> African regional human rights instrument, includes collective rights (right to development, peace)</li>
</ul>

<p class="learn-p"><strong>National Human Rights Commission (NHRC):</strong> Nigeria's national human rights institution — investigates complaints, promotes human rights education, advises government. NHRC documented abuses by Boko Haram and security forces.</p>

<h3 class="learn-subheading">ECOWAS Peace and Security Architecture</h3>

<p class="learn-p">ECOWAS (Economic Community of West African States, established 1975) has developed significant peace and security mechanisms:</p>

<ul class="learn-list">
  <li><strong>ECOWAS Conflict Prevention Framework (ECPF):</strong> Comprehensive approach to early warning, prevention, management, resolution, peacebuilding</li>
  <li><strong>ECOWAS Standby Force (ESF):</strong> Military and civilian standby force for peace support operations</li>
  <li><strong>ECOWAS Early Warning System (ECOWARN):</strong> Monitors conflict indicators across region, provides early warning</li>
  <li><strong>Council of the Wise:</strong> Eminent West Africans who mediate in conflicts</li>
</ul>

<p class="learn-p"><strong>ECOWAS interventions (successes):</strong></p>
<ul class="learn-list">
  <li><strong>Liberia (1990s-2000s):</strong> ECOMOG intervened multiple times, eventually successful (UNMIL)</li>
  <li><strong>Sierra Leone (1997-2000):</strong> ECOMOG restored democratically elected government after coup</li>
  <li><strong>Guinea-Bissau (1999, 2012):</strong> Mediation, stabilization</li>
  <li><strong>Mali (2012):</strong> After coup, ECOWAS mediation, sanctions, eventually French military intervention</li>
  <li><strong>The Gambia (2017):</strong> Yahya Jammeh refused to step down after election loss — ECOWAS threat of military force (backed by AU, UN) forced Jammeh into exile, Adama Barrow inaugurated</li>
</ul>

<p class="learn-p"><strong>Challenges:</strong> Funding, coordination with AU and UN, political will, capacity</p>

<h3 class="learn-subheading">African Union Peace and Security Architecture</h3>

<p class="learn-p">AU shifted from OAU (Organization of African Unity) principle of non-interference to principle of non-indifference — intervening in member states for serious crimes (genocide, war crimes, crimes against humanity).</p>

<ul class="learn-list">
  <li><strong>Peace and Security Council (PSC):</strong> 15-member body (elected by regions) responsible for peace and security decisions — similar to UN Security Council</li>
  <li><strong>Panel of the Wise:</strong> Eminent Africans for mediation and preventive diplomacy</li>
  <li><strong>African Standby Force (ASF):</strong> Military, police, civilian standby force for peace support operations (five regional brigades)</li>
  <li><strong>Continental Early Warning System (CEWS):</strong> Monitors conflict indicators</li>
  <li><strong>African Peace Facility:</strong> EU-funded mechanism supporting AU peace operations</li>
</ul>

<p class="learn-p"><strong>AU interventions:</strong> Burundi (mediation, sanctions), Somalia (AMISOM/ATMIS), Sudan (Darfur — UNAMID hybrid UN-AU), Mali (2012), Lake Chad Basin (MNJTF).</p>

<h3 class="learn-subheading">International Humanitarian Law (IHL)</h3>

<p class="learn-p">IHL (also called Law of Armed Conflict) regulates conduct during armed conflict, protecting people not participating in hostilities and restricting means and methods of warfare.</p>

<p class="learn-p"><strong>Core principles:</strong></p>
<ul class="learn-list">
  <li><strong>Distinction:</strong> Distinguish between combatants and civilians, military objectives and civilian objects — only target legitimate military targets</li>
  <li><strong>Proportionality:</strong> Expected military advantage must outweigh incidental harm to civilians</li>
  <li><strong>Military necessity:</strong> Only force necessary to achieve legitimate military objective</li>
  <li><strong>Precaution:</strong> Take all feasible precautions to avoid civilian harm</li>
  <li><strong>Prohibition of unnecessary suffering:</strong> Weapons causing superfluous injury or unnecessary suffering prohibited (e.g., chemical weapons, blinding lasers, expanding bullets)</li>
</ul>

<p class="learn-p"><strong>Sources:</strong> Geneva Conventions (1949) + Additional Protocols (1977, 2005); Hague Conventions; customary international humanitarian law.</p>

<p class="learn-p"><strong>Applicability to Nigerian conflicts:</strong> Boko Haram violations (attacks on civilians, suicide bombings in markets, abduction of schoolgirls) constitute war crimes. Security force abuses (extrajudicial killings, torture, arbitrary detention) also violate IHL when committed in armed conflict.</p>

<h3 class="learn-subheading">Responsibility to Protect (R2P)</h3>

<p class="learn-p">R2P doctrine (adopted at 2005 World Summit) holds that states have primary responsibility to protect their populations from genocide, war crimes, crimes against humanity, ethnic cleansing. When states fail or are the perpetrators, the international community (through UN Security Council) should take collective action — including military force as last resort.</p>

<p class="learn-p"><strong>Three pillars:</strong></p>
<ol class="learn-list learn-ordered">
  <li>State responsibility to protect its populations (prevention, capacity-building)</li>
  <li>International assistance and capacity-building to help states fulfill responsibility</li>
  <li>Timely and decisive response through UN Charter (Chapter VII) when states manifestly fail</li>
</ol>

<p class="learn-p"><strong>Controversies:</strong> Accused of being pretext for regime change (Libya 2011). Applied inconsistently (e.g., not applied to Sri Lanka, Myanmar, Syria).</p>

<h3 class="learn-subheading">Conflict-Sensitive Journalism and Media for Peace</h3>

<p class="learn-p">Media can either escalate or de-escalate conflict. <strong>Peace journalism</strong> (Galtung) emphasizes:</p>
<ul class="learn-list">
  <li>Reporting causes and solutions, not just violence and visible events</li>
  <li>Avoiding dehumanizing language about groups</li>
  <li>Giving voice to all sides, not just official sources</li>
  <li>Highlighting peace initiatives and reconciliation efforts</li>
</ul>

<p class="learn-p">In Nigeria, hate speech (NBC code prohibits incitement) and inflammatory reporting can escalate conflicts. Community radio and social media can promote peace.</p>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 230" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="230" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="800">🌍 INTERNATIONAL PEACE & JUSTICE FRAMEWORKS</text>
    
    <g>
      <rect x="15" y="45" width="145" height="160" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="87" y="65" text-anchor="middle" font-size="9" fill="#1e3a8a" font-weight="800">UNITED NATIONS</text>
      <line x1="25" y1="72" x2="150" y2="72" stroke="#3b82f6" stroke-width="0.5"/>
      <text x="87" y="90" text-anchor="middle" font-size="7" fill="#1e3a8a">Security Council</text>
      <text x="87" y="105" text-anchor="middle" font-size="7" fill="#1e3a8a">Peacekeeping (Blue Helmets)</text>
      <text x="87" y="120" text-anchor="middle" font-size="7" fill="#1e3a8a">ICJ (state disputes)</text>
      <text x="87" y="135" text-anchor="middle" font-size="7" fill="#1e3a8a">UNHRC (human rights)</text>
      <text x="87" y="150" text-anchor="middle" font-size="7" fill="#1e3a8a">Chapter VI & VII</text>
      <text x="87" y="165" text-anchor="middle" font-size="7" fill="#1e3a8a">Nigeria: major troop</text>
      <text x="87" y="178" text-anchor="middle" font-size="7" fill="#1e3a8a">contributor to UN missions</text>
    </g>
    
    <g>
      <rect x="175" y="45" width="145" height="160" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <text x="247" y="65" text-anchor="middle" font-size="9" fill="#166534" font-weight="800">ECOWAS / AU</text>
      <line x1="185" y1="72" x2="310" y2="72" stroke="#22c55e" stroke-width="0.5"/>
      <text x="247" y="90" text-anchor="middle" font-size="7" fill="#166534">ECOWAS Standby Force</text>
      <text x="247" y="105" text-anchor="middle" font-size="7" fill="#166534">AU Peace & Security Council</text>
      <text x="247" y="120" text-anchor="middle" font-size="7" fill="#166534">African Standby Force</text>
      <text x="247" y="135" text-anchor="middle" font-size="7" fill="#166534">ECOWARN (early warning)</text>
      <text x="247" y="150" text-anchor="middle" font-size="7" fill="#166534">Successes: Liberia, Sierra Leone</text>
      <text x="247" y="165" text-anchor="middle" font-size="7" fill="#166534">Gambia (2017), Mali (2012)</text>
      <text x="247" y="178" text-anchor="middle" font-size="7" fill="#166534">Non-indifference principle</text>
    </g>
    
    <g>
      <rect x="335" y="45" width="150" height="160" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="410" y="65" text-anchor="middle" font-size="9" fill="#92400e" font-weight="800">ICC & IHL</text>
      <line x1="345" y1="72" x2="475" y2="72" stroke="#f59e0b" stroke-width="0.5"/>
      <text x="410" y="90" text-anchor="middle" font-size="7" fill="#92400e">ICC: genocide, crimes against</text>
      <text x="410" y="105" text-anchor="middle" font-size="7" fill="#92400e">humanity, war crimes</text>
      <text x="410" y="120" text-anchor="middle" font-size="7" fill="#92400e">Rome Statute (1998)</text>
      <text x="410" y="135" text-anchor="middle" font-size="7" fill="#92400e">Nigeria ratified 2001</text>
      <text x="410" y="150" text-anchor="middle" font-size="7" fill="#92400e">IHL principles: distinction,</text>
      <text x="410" y="165" text-anchor="middle" font-size="7" fill="#92400e">proportionality, precaution</text>
      <text x="410" y="178" text-anchor="middle" font-size="7" fill="#92400e">Geneva Conventions (1949)</text>
    </g>
    
    <text x="250" y="222" text-anchor="middle" font-size="9" fill="#64748b">🔑 Nigeria engages with all these frameworks — memberships create obligations and opportunities for peace</text>
  </svg>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">📖</span>
  <span><strong>Key Scholar:</strong> Johan Galtung developed peace journalism — reporting that avoids dehumanizing language, gives voice to all sides, and highlights peace initiatives, contrasted with war journalism (violence-focused, elite-oriented, us-vs-them framing).</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Discuss ECOWAS's role in regional peace and security, using at least one example of successful intervention." (Sample answer: ECOWAS developed peacekeeping (ECOMOG/ESF), early warning (ECOWARN), mediation (Council of Wise). Success: The Gambia 2017 — after Yahya Jammeh refused to step down, ECOWAS threat of military force (backed by AU, UN) forced Jammeh into exile, allowing Adama Barrow to assume presidency. Other successes: Liberia, Sierra Leone, Guinea-Bissau.)</span>
</div>
    `,
    questions: [
      { q: "Which UN Charter chapter authorizes the Security Council to impose sanctions or authorize force?", o: ["Chapter I", "Chapter VI (Pacific Settlement)", "Chapter VII (Action with Respect to Threats to Peace)", "Chapter VIII"], a: 2, e: "Chapter VII empowers the Security Council to take enforcement action — sanctions, peacekeeping, military force — to maintain or restore international peace.", h: "Which chapter allows force?", yr: "GST" },
      { q: "The International Criminal Court (ICC) prosecutes individuals for all EXCEPT:", o: ["Genocide", "Crimes against humanity", "War crimes", "Tax evasion"], a: 3, e: "ICC jurisdiction limited to four crimes: genocide, crimes against humanity, war crimes, aggression (the latter still developing). Tax evasion not an international crime.", h: "What international crimes does ICC handle?", yr: "GST" },
      { q: "Which international court resolved the Bakassi Peninsula dispute between Nigeria and Cameroon (2002)?", o: ["ICC", "ICJ (International Court of Justice)", "ECOWAS Court", "African Court"], a: 1, e: "ICJ resolved the border dispute between Nigeria and Cameroon, awarding Bakassi to Cameroon. Both countries accepted and implemented the decision (Green Tree Agreement).", h: "Which court handles disputes between states?", yr: "GST" },
      { q: "The Rome Statute (1998) established:", o: ["UN", "ECOWAS", "International Criminal Court (ICC)", "African Union"], a: 2, e: "Rome Statute (1998) established the ICC, entering into force 2002. Nigeria signed 2000, ratified 2001.", h: "Which treaty created ICC?", yr: "GST" },
      { q: "ECOWAS stands for:", o: ["Economic Community of West African States", "European Community of West African States", "East African Community", "Economic Cooperation of West Africa"], a: 0, e: "ECOWAS, established 1975, promotes economic integration and peace/security in West Africa.", h: "What does ECOWAS mean?", yr: "GST" },
      { q: "Which ECOWAS intervention forced Yahya Jammeh into exile after losing 2016 election?", o: ["Liberia", "Sierra Leone", "The Gambia (2017)", "Mali"], a: 2, e: "Jammeh refused to step down. ECOWAS threat of military force (backed by AU, UN) forced him into exile; Adama Barrow inaugurated — peaceful transfer of power.", h: "Which country's dictator was forced out in 2017?", yr: "GST" },
      { q: "The principle that states must distinguish between combatants and civilians is part of:", o: ["Economic law", "International Humanitarian Law (IHL) — Law of Armed Conflict", "Trade law", "Maritime law"], a: 1, e: "Distinction between combatants and civilians is a core IHL principle — only military objectives may be targeted; civilians and civilian objects are protected.", h: "What laws apply during war?", yr: "GST" },
      { q: "The Geneva Conventions (1949) primarily regulate:", o: ["International trade", "Conduct during armed conflict (IHL)", "Diplomatic relations", "Environmental protection"], a: 1, e: "Geneva Conventions protect wounded, sick, shipwrecked, prisoners of war, and civilians during armed conflict — core of IHL.", h: "What do Geneva Conventions protect?", yr: "GST" },
      { q: "Which African Union principle replaced OAU's non-interference with non-indifference?", o: ["Non-interference always", "Indifference always", "Non-indifference — intervening for serious crimes (genocide, war crimes, crimes against humanity)", "Isolation"], a: 2, e: "AU Constitutive Act allows intervention in member states for genocide, war crimes, crimes against humanity — shift from OAU's strict non-interference.", h: "What changed from OAU to AU?", yr: "GST" },
      { q: "The African Standby Force (ASF) is:", o: ["Only military", "Military, police, civilian standby force for peace support operations (five regional brigades)", "Only police", "Only civilian"], a: 1, e: "ASF includes military, police, and civilian components, organized into five regional brigades (North, West, Central, East, Southern Africa).", h: "What does ASF include?", yr: "GST" },
      { q: "Which UN peacekeeping principle requires consent of parties to the conflict?", o: ["Impartiality", "Consent of parties (cannot deploy without host state/permission)", "Use of force always", "Taking sides"], a: 1, e: "Three UN peacekeeping principles: consent of parties, impartiality, non-use of force except self-defense. Consent means UN cannot deploy without host state agreement.", h: "What principle requires host state permission?", yr: "GST" },
      { q: "The Universal Declaration of Human Rights (UDHR) was adopted in:", o: ["1919", "1945", "1948", "1966"], a: 2, e: "UDHR adopted by UN General Assembly on December 10, 1948 — foundation of international human rights law.", h: "When was UDHR adopted?", yr: "GST" },
      { q: "Peace journalism emphasizes:", o: ["Only reporting violence", "Reporting causes and solutions, avoiding dehumanizing language, giving voice to all sides", "Sensationalism", "Taking sides"], a: 1, e: "Peace journalism (Galtung) focuses on causes and solutions, avoids dehumanizing language, gives voice to all sides, highlights peace initiatives — reduces conflict escalation.", h: "How can media promote peace?", yr: "GST" },
      { q: "Which IHL principle requires taking all feasible precautions to avoid civilian harm?", o: ["Proportionality", "Precaution", "Distinction", "Military necessity"], a: 1, e: "Precaution principle requires parties to take all feasible precautions to avoid civilian harm — checking targets, warnings when possible, avoiding densely populated areas.", h: "What precaution must be taken?", yr: "GST" },
      { q: "What is the AU Peace and Security Council (PSC)?", o: ["Economic body", "15-member body responsible for peace and security decisions — similar to UN Security Council", "Cultural body", "Health body"], a: 1, e: "PSC is the AU's standing decision-making body for peace and security, with 15 member states elected by region.", h: "What is AU's security decision body?", yr: "GST" },
      { q: "The Responsibility to Protect (R2P) was adopted at:", o: ["1945 UN Charter", "2005 World Summit", "1998 Rome Statute", "1981 Banjul Charter"], a: 1, e: "R2P doctrine adopted unanimously at 2005 UN World Summit, affirming states' responsibility to protect populations from atrocity crimes and international community's role when states fail.", h: "When was R2P adopted?", yr: "GST" },
      { q: "Which IHL principle requires military advantage to outweigh incidental civilian harm?", o: ["Distinction", "Proportionality", "Precaution", "Military necessity"], a: 1, e: "Proportionality prohibits attacks where expected military advantage is outweighed by incidental civilian harm (death, injury, destruction).", h: "What balances military gain and civilian harm?", yr: "GST" },
      { q: "Nigeria's National Human Rights Commission (NHRC):", o: ["Only investigates economic crimes", "Investigates human rights complaints, promotes human rights education, advises government", "Only promotes trade", "Only military oversight"], a: 1, e: "NHRC is Nigeria's national human rights institution — investigates complaints, documents abuses (by Boko Haram and security forces), promotes human rights education.", h: "What does NHRC do?", yr: "GST" },
      { q: "The African Charter on Human and Peoples' Rights (Banjul Charter) includes:", o: ["Only individual rights", "Only collective rights", "Both individual and collective rights (right to development, right to peace)", "Only economic rights"], a: 2, e: "Banjul Charter uniquely includes collective/peoples' rights — right to development, right to peace, right to a satisfactory environment — not just individual rights.", h: "What makes African Charter unique?", yr: "GST" },
      { q: "ECOWAS intervention in Mali (2012) after coup included:", o: ["Only military invasion", "Mediation, sanctions, eventually French military intervention (Serval) with ECOWAS support", "No intervention", "Only diplomatic recognition of coup leaders"], a: 1, e: "ECOWAS imposed sanctions, mediated, and supported French military intervention to restore democracy after Mali coup.", h: "How did ECOWAS respond to Mali coup?", yr: "GST" }
    ]
  }
];
