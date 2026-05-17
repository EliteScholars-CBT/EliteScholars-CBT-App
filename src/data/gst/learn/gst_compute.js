// ============================================================================
// INTRODUCTION TO COMPUTING — COMPLETE LEARNING MODULE (10 TOPICS)
// Based on CCMAS (Core Curriculum and Minimum Academic Standards)
// CSC 101
// ============================================================================

export const GST_LEARN_GST_COMPUTING = [
  // ==========================================================================
  // TOPIC 1: Introduction to Computers
  // ==========================================================================
  {
    topic: "Introduction to Computers",
    topicCode: "CSC-001-01",
    module: "Foundations of Computing",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">A computer</span> is an electronic device that processes data according to a set of instructions (programs), producing meaningful information. Computers have transformed every aspect of modern life — from communication and entertainment to healthcare, education, and business. <strong>Understanding how computers work is essential in today's digital world</strong>.
</div>

<p class="learn-p">The word "computer" originally referred to people who performed calculations. Today, computers are ubiquitous — from smartphones in our pockets to supercomputers that predict weather and simulate nuclear reactions. All computers, regardless of size or complexity, follow the same basic principle: input → processing → output → storage.</p>

<h3 class="learn-subheading">Characteristics of Computers</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Characteristic</th><th>Description</th><th>Example</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Speed</th>。<th>Computers process millions to billions of operations per second</th>。<th>CPU speeds measured in GHz (billions of cycles per second)</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Accuracy</th>。<th>Computers produce error-free results when hardware and software are functioning correctly</th>。<th>Calculations are precise; errors are human-made (garbage in, garbage out)</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Diligence</th>。<th>Computers do not get tired or lose concentration</th>。<th>Can perform repetitive tasks millions of times without error</th>
      </tr>
      <td><td style="background:#f0fdf4;">Versatility</th>。<th>Computers can perform completely different tasks</th>。<th>Same computer can browse internet, edit photos, play games, calculate spreadsheets</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Storage</th>。<th>Computers can store vast amounts of data permanently</th>。<th>Hard drives can store terabytes (trillions of bytes) of data</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Automation</th>。<th>Computers can follow instructions automatically without human intervention</th>。<th>Once started, a program runs until completion</th>
      </tr>
      <tr><td style="background:#f0fdf4;">No IQ</th>。<th>Computers cannot think or make decisions independently</th>。<th>They follow programmed instructions; AI simulates intelligence but is not conscious</th>
      </tr>
    </tbody>
  </table>
</div>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">💻 GENERATIONS OF COMPUTERS</text>
    
    <g>
      <rect x="15" y="45" width="85" height="50" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="57" y="63" text-anchor="middle" font-size="8" fill="#1e3a8a" font-weight="800">1st Gen</text>
      <text x="57" y="78" text-anchor="middle" font-size="6" fill="#1e3a8a">Vacuum Tubes</text>
      <text x="57" y="88" text-anchor="middle" font-size="6" fill="#1e3a8a">1940s-50s</text>
    </g>
    
    <g>
      <rect x="110" y="45" width="85" height="50" rx="6" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <text x="152" y="63" text-anchor="middle" font-size="8" fill="#166534" font-weight="800">2nd Gen</text>
      <text x="152" y="78" text-anchor="middle" font-size="6" fill="#166534">Transistors</text>
      <text x="152" y="88" text-anchor="middle" font-size="6" fill="#166534">1950s-60s</text>
    </g>
    
    <g>
      <rect x="205" y="45" width="85" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="247" y="63" text-anchor="middle" font-size="8" fill="#92400e" font-weight="800">3rd Gen</text>
      <text x="247" y="78" text-anchor="middle" font-size="6" fill="#92400e">ICs</text>
      <text x="247" y="88" text-anchor="middle" font-size="6" fill="#92400e">1960s-70s</text>
    </g>
    
    <g>
      <rect x="300" y="45" width="85" height="50" rx="6" fill="#fce7f3" stroke="#ec4899" stroke-width="1.5"/>
      <text x="342" y="63" text-anchor="middle" font-size="8" fill="#831843" font-weight="800">4th Gen</text>
      <text x="342" y="78" text-anchor="middle" font-size="6" fill="#831843">Microprocessors</text>
      <text x="342" y="88" text-anchor="middle" font-size="6" fill="#831843">1970s-90s</text>
    </g>
    
    <g>
      <rect x="395" y="45" width="90" height="50" rx="6" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="440" y="63" text-anchor="middle" font-size="8" fill="#5b21b6" font-weight="800">5th Gen</text>
      <text x="440" y="78" text-anchor="middle" font-size="6" fill="#5b21b6">AI & ULSI</text>
      <text x="440" y="88" text-anchor="middle" font-size="6" fill="#5b21b6">1990s+</text>
    </g>
    
    <text x="250" y="130" text-anchor="middle" font-size="9" fill="#475569">Each generation brought smaller size, lower cost, higher speed, and more reliability</text>
    
    <rect x="50" y="150" width="400" height="35" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
    <text x="250" y="170" text-anchor="middle" font-size="8" fill="#475569">Today's smartphones have more computing power than room-sized computers of the 1960s</text>
  </svg>
</div>

<h3 class="learn-subheading">Generations of Computers</h3>

<ul class="learn-list">
  <li><strong>First Generation (1940s-1950s):</strong> Vacuum tubes — large, expensive, generated enormous heat, unreliable. Examples: ENIAC, UNIVAC I. Used machine language (0s and 1s).</li>
  <li><strong>Second Generation (1950s-1960s):</strong> Transistors replaced vacuum tubes — smaller, faster, more reliable, less heat. Assembly language and early high-level languages (FORTRAN, COBOL).</li>
  <li><strong>Third Generation (1960s-1970s):</strong> Integrated Circuits (ICs) — multiple transistors on single chip. Smaller, cheaper, more powerful. Operating systems developed.</li>
  <li><strong>Fourth Generation (1970s-1990s):</strong> Microprocessors — entire CPU on one chip. Personal computers emerged (IBM PC, Apple Macintosh). GUIs, networks, internet.</li>
  <li><strong>Fifth Generation (1990s-present):</strong> Artificial Intelligence, parallel processing, ULSI (Ultra Large Scale Integration). Smartphones, tablets, cloud computing, AI assistants.</li>
</ul>

<h3 class="learn-subheading">Classification of Computers</h3>

<p class="learn-p"><strong>By Size and Power:</strong></p>
<ul class="learn-list">
  <li><strong>Supercomputers:</strong> Fastest, most powerful — used for weather forecasting, scientific simulations, nuclear research, cryptography. Examples: Fugaku (Japan), Summit (US).</li>
  <li><strong>Mainframe computers:</strong> Large, high-capacity — used by banks, airlines, government for transaction processing. Handle millions of users simultaneously.</li>
  <li><strong>Minicomputers (mid-range):</strong> Smaller than mainframes — used in manufacturing, research labs, small businesses.</li>
  <li><strong>Microcomputers (personal computers):</strong> Desktops, laptops, tablets, smartphones — most common type.</li>
  <li><strong>Workstations:</strong> High-performance PCs for scientific, engineering, design work (CAD, 3D rendering).</li>
</ul>

<p class="learn-p"><strong>By Purpose:</strong> General purpose (designed for variety of tasks) vs Special purpose (designed for specific tasks — ATMs, traffic light controllers, medical devices).</p>
<p class="learn-p"><strong>By Type:</strong> Analog (continuous data — temperature, pressure), Digital (discrete data — numbers, text), Hybrid (both analog and digital — medical equipment, industrial controls).</p>

<h3 class="learn-subheading">The Information Processing Cycle</h3>

<p class="learn-p">All computers follow the same basic cycle:</p>
<ul class="learn-list">
  <li><strong>Input:</strong> Entering data into the computer (keyboard, mouse, scanner, microphone)</li>
  <li><strong>Processing:</strong> Performing operations on data (calculations, comparisons, sorting) — done by CPU</li>
  <li><strong>Output:</strong> Displaying or producing results (monitor, printer, speaker)</li>
  <li><strong>Storage:</strong> Saving data permanently for future use (hard drive, SSD, USB drive)</li>
  <li><strong>Communication:</strong> Transferring data between computers (networks, internet, Bluetooth, WiFi)</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Key Term:</strong> GIGO — Garbage In, Garbage Out. Computers are accurate, but they cannot correct wrong input. If you input incorrect data, output will be incorrect.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Tip:</strong> Remember the five generations with their key technologies: Vacuum Tubes → Transistors → ICs → Microprocessors → AI/Parallel Processing. Each generation brought smaller size, lower cost, and higher speed.</span>
</div>
    `,
    questions: [
      { q: "A computer is best defined as:", o: ["A machine that displays pictures", "An electronic device that processes data according to instructions", "A device for playing games", "A typewriter with a screen"], a: 1, e: "A computer is an electronic device that processes data following programmed instructions, producing meaningful output.", h: "What is a computer?", yr: "GST" },
      { q: "Which characteristic of computers means they can perform completely different tasks?", o: ["Speed", "Accuracy", "Versatility", "Diligence"], a: 2, e: "Versatility means computers can do many different tasks — browse internet, edit photos, play games, calculate spreadsheets.", h: "What characteristic is doing many tasks?", yr: "GST" },
      { q: "First generation computers used which technology?", o: ["Transistors", "Integrated Circuits", "Vacuum Tubes", "Microprocessors"], a: 2, e: "First generation (1940s-50s) used vacuum tubes — large, hot, unreliable, power-hungry.", h: "What did first gen computers use?", yr: "GST" },
      { q: "Microprocessors were introduced in which generation?", o: ["2nd Generation", "3rd Generation", "4th Generation", "5th Generation"], a: 2, e: "Fourth generation (1970s-90s) introduced microprocessors — entire CPU on one chip, enabling personal computers.", h: "Which generation had microprocessors?", yr: "GST" },
      { q: "Which type of computer is the fastest and most powerful?", o: ["Mainframe", "Minicomputer", "Supercomputer", "Microcomputer"], a: 2, e: "Supercomputers are the fastest and most powerful — used for weather forecasting, scientific simulations, cryptography.", h: "What is the most powerful computer?", yr: "GST" },
      { q: "The information processing cycle consists of:", o: ["Only input and output", "Input, processing, output, storage, communication", "Only storage", "Only processing"], a: 1, e: "Complete cycle: Input → Processing → Output → Storage → Communication.", h: "What are the steps?", yr: "GST" },
      { q: "Which characteristic explains why computers do not get tired?", o: ["Accuracy", "Diligence", "Speed", "Storage"], a: 1, e: "Diligence means computers can perform repetitive tasks tirelessly without losing concentration.", h: "What characteristic means no tiredness?", yr: "GST" },
      { q: "ENIAC and UNIVAC are examples of which generation?", o: ["First", "Second", "Third", "Fourth"], a: 0, e: "ENIAC (Electronic Numerical Integrator and Computer) and UNIVAC I were first generation vacuum tube computers.", h: "Which generation included ENIAC?", yr: "GST" },
      { q: "A laptop computer is classified as:", o: ["Supercomputer", "Mainframe", "Minicomputer", "Microcomputer"], a: 3, e: "Laptops are microcomputers (personal computers) — small, affordable, designed for individual use.", h: "What type is a laptop?", yr: "GST" },
      { q: "Which generation introduced transistors?", o: ["First", "Second", "Third", "Fourth"], a: 1, e: "Second generation (1950s-60s) replaced vacuum tubes with transistors — smaller, faster, more reliable.", h: "Which generation had transistors?", yr: "GST" },
      { q: "GIGO stands for:", o: ["Good Input, Good Output", "Garbage In, Garbage Out", "Great Input, Great Output", "General Input, General Output"], a: 1, e: "GIGO means computers cannot correct wrong input — inaccurate input produces inaccurate output.", h: "What does GIGO mean?", yr: "GST" },
      { q: "Which of the following is NOT a characteristic of computers?", o: ["Speed", "Intelligence (computers have no IQ)", "Accuracy", "Diligence"], a: 1, e: "Computers have no IQ — they follow instructions without understanding or independent thought.", h: "What do computers lack?", yr: "GST" },
      { q: "Smartphones and tablets belong to which computer class?", o: ["Mainframe", "Minicomputer", "Microcomputer", "Supercomputer"], a: 2, e: "Smartphones and tablets are microcomputers — small, portable, general purpose computing devices.", h: "What type are smartphones?", yr: "GST" },
      { q: "Mainframe computers are typically used by:", o: ["Individuals", "Banks, airlines, government for transaction processing", "Game players", "Weather forecasters"], a: 1, e: "Mainframes handle massive transaction processing for banks, airlines, government agencies.", h: "Who uses mainframes?", yr: "GST" },
      { q: "Integrated Circuits (ICs) were introduced in which generation?", o: ["First", "Second", "Third", "Fourth"], a: 2, e: "Third generation (1960s-70s) introduced integrated circuits — multiple transistors on single chip.", h: "Which generation had ICs?", yr: "GST" },
      { q: "Which of the following is an example of storage in the information processing cycle?", o: ["Keyboard", "Monitor", "Hard drive", "CPU"], a: 2, e: "Hard drive, SSD, USB drive are storage devices — they save data permanently for future use.", h: "What is an example of storage?", yr: "GST" },
      { q: "Fifth generation computers are characterized by:", o: ["Vacuum tubes", "Transistors", "Artificial Intelligence and parallel processing", "Integrated Circuits"], a: 2, e: "Fifth generation (1990s-present) focuses on AI, parallel processing, natural language processing, expert systems.", h: "What defines fifth generation?", yr: "GST" },
      { q: "Which characteristic means computers produce error-free results when functioning correctly?", o: ["Speed", "Accuracy", "Diligence", "Versatility"], a: 1, e: "Accuracy means results are precise and error-free — provided input and hardware/software are correct.", h: "What characteristic means no errors?", yr: "GST" },
      { q: "A hybrid computer combines features of:", o: ["Supercomputer and mainframe", "Analog and digital computers", "Microcomputer and minicomputer", "Laptop and desktop"], a: 1, e: "Hybrid computers combine analog (continuous data) and digital (discrete data) capabilities — used in medical equipment, industrial controls.", h: "What does hybrid combine?", yr: "GST" },
      { q: "Which generation saw the emergence of personal computers (IBM PC, Apple Macintosh)?", o: ["2nd", "3rd", "4th", "5th"], a: 2, e: "Fourth generation microprocessors enabled personal computers — IBM PC (1981), Apple Macintosh (1984).", h: "Which generation brought PCs?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 2: Computer Hardware - System Unit
  // ==========================================================================
  {
    topic: "Computer Hardware - System Unit",
    topicCode: "CSC-002-01",
    module: "Computer Hardware",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">The system unit</span> is the core of a computer — the metal or plastic case that houses the main electronic components. It contains the motherboard, CPU, memory, power supply, and storage drives. <strong>Understanding the system unit is essential for knowing how computers process information</strong>.
</div>

<p class="learn-p">The system unit is often called the "tower" or "CPU" (incorrectly — the CPU is just one component inside). All critical processing occurs inside the system unit.</p>

<h3 class="learn-subheading">The Motherboard</h3>

<p class="learn-p">The motherboard is the main circuit board that connects all components. Think of it as the central nervous system or the "backbone" of the computer.</p>

<p class="learn-p"><strong>Major motherboard components:</strong></p>
<ul class="learn-list">
  <li><strong>CPU socket:</strong> Holds the processor (CPU)</li>
  <li><strong>RAM slots:</strong> Hold memory modules (DIMM slots)</li>
  <li><strong>Expansion slots:</strong> PCI, PCIe for adding cards (graphics, sound, network)</li>
  <li><strong>Chipset:</strong> Controls data flow between CPU, memory, and peripherals</li>
  <li><strong>BIOS/UEFI chip:</strong> Contains basic input/output system (starts the computer)</li>
  <li><strong>CMOS battery:</strong> Powers BIOS memory to save settings (date, time, boot order)</li>
  <li><strong>Power connectors:</strong> Supply power to motherboard and CPU</li>
  <li><strong>SATA connectors:</strong> Connect storage drives (hard drives, SSDs)</li>
  <li><strong>USB headers, fan headers, front panel connectors</strong></li>
</ul>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">⚙️ THE CPU - Fetch-Decode-Execute Cycle</text>
    
    <g>
      <rect x="15" y="45" width="140" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text x="85" y="65" text-anchor="middle" font-size="9" fill="#1e3a8a" font-weight="800">FETCH</text>
      <text x="85" y="82" text-anchor="middle" font-size="7" fill="#1e3a8a">Get instruction from memory</text>
    </g>
    
    <g>
      <rect x="180" y="45" width="140" height="50" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <text x="250" y="65" text-anchor="middle" font-size="9" fill="#166534" font-weight="800">DECODE</text>
      <text x="250" y="82" text-anchor="middle" font-size="7" fill="#166534">Interpret instruction</text>
    </g>
    
    <g>
      <rect x="345" y="45" width="140" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text x="415" y="65" text-anchor="middle" font-size="9" fill="#92400e" font-weight="800">EXECUTE</text>
      <text x="415" y="82" text-anchor="middle" font-size="7" fill="#92400e">Perform operation</text>
    </g>
    
    <line x1="155" y1="70" x2="180" y2="70" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowCPU1)"/>
    <line x1="320" y1="70" x2="345" y2="70" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowCPU1)"/>
    
    <defs>
      <marker id="arrowCPU1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6"/>
      </marker>
    </defs>
    
    <text x="250" y="135" text-anchor="middle" font-size="9" fill="#475569">The CPU continuously repeats this cycle billions of times per second</text>
    
    <rect x="50" y="155" width="400" height="35" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
    <text x="250" y="175" text-anchor="middle" font-size="8" fill="#475569">Clock speed (GHz) determines how many cycles per second the CPU can perform</text>
  </svg>
</div>

<h3 class="learn-subheading">The Central Processing Unit (CPU)</h3>

<p class="learn-p">The CPU is the "brain" of the computer — it executes instructions and performs calculations.</p>

<p class="learn-p"><strong>CPU Components:</strong></p>
<ul class="learn-list">
  <li><strong>ALU (Arithmetic Logic Unit):</strong> Performs arithmetic (addition, subtraction, multiplication, division) and logical operations (comparisons: greater than, less than, equal to).</li>
  <li><strong>CU (Control Unit):</strong> Directs the flow of data and instructions — tells other components what to do.</li>
  <li><strong>Registers:</strong> Very fast, small memory locations inside CPU that hold data being processed.</li>
</ul>

<p class="learn-p"><strong>Fetch-Decode-Execute Cycle:</strong> The CPU continuously repeats three steps: 1) Fetch instruction from memory, 2) Decode instruction, 3) Execute instruction — billions of times per second.</p>

<p class="learn-p"><strong>Factors affecting CPU performance:</strong></p>
<ul class="learn-list">
  <li><strong>Clock speed (GHz):</strong> Number of cycles per second — higher = faster (but not the only factor)</li>
  <li><strong>Number of cores:</strong> Multiple processing units on one chip — dual-core, quad-core, octa-core, etc.</li>
  <li><strong>Cache memory:</strong> Very fast memory on CPU (L1, L2, L3) — holds frequently used data</li>
  <li><strong>Word size:</strong> Bits CPU can process at once (32-bit vs 64-bit)</li>
</ul>

<h3 class="learn-subheading">Memory — RAM and ROM</h3>

<p class="learn-p"><strong>RAM (Random Access Memory):</strong></p>
<ul class="learn-list">
  <li>Volatile — loses data when power is turned off</li>
  <li>Temporarily holds data and programs being used</li>
  <li>More RAM allows more programs to run simultaneously</li>
  <li>Types: DRAM (Dynamic RAM — needs refreshing), SRAM (Static RAM — faster, more expensive)</li>
</ul>

<p class="learn-p"><strong>ROM (Read Only Memory):</strong></p>
<ul class="learn-list">
  <li>Non-volatile — retains data when power is off</li>
  <li>Contains permanent instructions for booting the computer (BIOS/UEFI)</li>
  <li>Cannot be easily modified by the user</li>
  <li>Types: PROM (programmable once), EPROM (erasable with UV light), EEPROM (electrically erasable)</li>
</ul>

<p class="learn-p"><strong>Cache memory:</strong> Extremely fast memory located on or near the CPU (L1, L2, L3). Stores frequently used data for quick access. L1 is fastest and smallest; L3 is slower but larger.</p>

<p class="learn-p"><strong>RAM vs ROM comparison:</strong></p>
<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Feature</th><th>RAM</th><th>ROM</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Volatility</th>。<th>Volatile (loses data when power off)</th>。<th>Non-volatile (retains data)</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Usage</th>。<th>Temporary storage for active programs</th>。<th>Permanent storage for boot instructions</th>
      <tr>
      <tr><td style="background:#f0fdf4;">Modifiability</th>。<th>Read-write (can change)</th>。<th>Read-only (normally)</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Speed</th>。<th>Fast</th>。<th>Slower than RAM</th>
      </tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">Ports and Connectors</h3>

<p class="learn-p"><strong>USB (Universal Serial Bus):</strong> Types: USB-A (standard rectangular), USB-B (square for printers), USB-C (reversible, newer), Micro-USB, Mini-USB.</p>
<p class="learn-p"><strong>Video ports:</strong> HDMI (High-Definition Multimedia Interface — audio+video), VGA (older analog video), DisplayPort, DVI.</p>
<p class="learn-p"><strong>Other ports:</strong> Ethernet (RJ45 for network cable), Audio jack (headphones, microphone), Thunderbolt (high-speed data + video).</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Key Distinction:</strong> RAM is temporary and volatile; ROM is permanent and non-volatile. RAM contents disappear when you shut down; ROM retains BIOS settings.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Tip:</strong> The CPU's fetch-decode-execute cycle is fundamental. Remember: Fetch (get instruction) → Decode (interpret) → Execute (perform). Clock speed (GHz) determines cycle frequency.</span>
</div>
    `,
    questions: [
      { q: "The motherboard is best described as:", o: ["The CPU", "The main circuit board connecting all components", "The power supply", "The hard drive"], a: 1, e: "Motherboard is the main circuit board that connects CPU, memory, storage, and expansion cards.", h: "What is the main circuit board?", yr: "GST" },
      { q: "Which CPU component performs arithmetic and logical operations?", o: ["Control Unit", "ALU (Arithmetic Logic Unit)", "Registers", "Cache"], a: 1, e: "ALU performs addition, subtraction, multiplication, division, and comparisons (greater than, equal to).", h: "What does ALU do?", yr: "GST" },
      { q: "RAM is which type of memory?", o: ["Non-volatile", "Volatile (loses data when power off)", "Read-only", "Permanent"], a: 1, e: "RAM is volatile — contents are lost when computer shuts down.", h: "Is RAM volatile?", yr: "GST" },
      { q: "Which memory is used to store BIOS/UEFI instructions?", o: ["RAM", "ROM", "Cache", "Hard drive"], a: 1, e: "ROM stores permanent boot instructions (BIOS/UEFI). Non-volatile.", h: "What stores BIOS?", yr: "GST" },
      { q: "The fetch-decode-execute cycle is performed by:", o: ["RAM", "Hard drive", "CPU", "Motherboard"], a: 2, e: "CPU repeatedly fetches, decodes, and executes instructions billions of times per second.", h: "What performs the fetch-decode-execute cycle?", yr: "GST" },
      { q: "Which factor affects CPU performance?", o: ["RAM color", "Clock speed (GHz)", "Hard drive size", "Monitor resolution"], a: 1, e: "Clock speed (GHz) determines cycles per second — higher speed generally means faster processing.", h: "What affects CPU speed?", yr: "GST" },
      { q: "A CPU with multiple processing units is called:", o: ["Multi-core", "Multi-threaded", "Multi-tasking", "Multi-processing"], a: 0, e: "Multi-core CPUs have multiple processing units (dual-core, quad-core, octa-core) on one chip.", h: "What is a multi-core CPU?", yr: "GST" },
      { q: "Which memory is fastest and located closest to the CPU?", o: ["RAM", "ROM", "Cache (L1)", "Hard drive"], a: 2, e: "Cache memory (L1, L2, L3) is extremely fast and located on or near CPU.", h: "What is the fastest memory?", yr: "GST" },
      { q: "USB-C is characterized by:", o: ["Rectangular shape, not reversible", "Square shape", "Reversible connector (can plug either way)", "Round shape"], a: 2, e: "USB-C is reversible — no wrong orientation. Supports faster speeds and power delivery.", h: "What is USB-C?", yr: "GST" },
      { q: "Which component of the CPU directs the flow of data and instructions?", o: ["ALU", "Control Unit", "Registers", "Cache"], a: 1, e: "Control Unit directs operations — tells other components what to do.", h: "What directs data flow?", yr: "GST" },
      { q: "ROM stands for:", o: ["Random Only Memory", "Read Only Memory", "Read Operational Memory", "Random Operational Memory"], a: 1, e: "ROM = Read Only Memory — non-volatile memory that retains data when power off.", h: "What does ROM stand for?", yr: "GST" },
      { q: "Which type of memory is used for temporary storage of active programs and data?", o: ["ROM", "Hard drive", "RAM", "SSD"], a: 2, e: "RAM temporarily holds active programs and data while computer is running.", h: "What holds active programs temporarily?", yr: "GST" },
      { q: "The BIOS/UEFI chip is typically stored on:", o: ["RAM", "Hard drive", "Motherboard (ROM)", "CPU"], a: 2, e: "BIOS/UEFI is stored on ROM chip on motherboard — non-volatile boot instructions.", h: "Where is BIOS stored?", yr: "GST" },
      { q: "Which port is commonly used for network cable connections?", o: ["USB", "HDMI", "Ethernet (RJ45)", "VGA"], a: 2, e: "Ethernet (RJ45) port connects to network cables for wired internet access.", h: "What port is for network cable?", yr: "GST" },
      { q: "Word size (32-bit vs 64-bit) refers to:", o: ["Monitor resolution", "Bits CPU can process at once", "RAM size", "Hard drive capacity"], a: 1, e: "Word size is the number of bits CPU can process simultaneously — 64-bit CPUs handle more data per cycle.", h: "What does word size mean?", yr: "GST" },
      { q: "Which memory is non-volatile?", o: ["RAM", "Cache", "ROM", "Register"], a: 2, e: "ROM is non-volatile — retains data when power is off. RAM, cache, registers are volatile.", h: "What memory retains data when off?", yr: "GST" },
      { q: "HDMI port carries:", o: ["Only video", "Only audio", "Both audio and video", "Only power"], a: 2, e: "HDMI carries high-definition audio and video in one cable.", h: "What does HDMI carry?", yr: "GST" },
      { q: "Cache memory levels L1, L2, L3 differ by:", o: ["Color", "Speed and size (L1 fastest, smallest; L3 slower, larger)", "Shape", "Brand"], a: 1, e: "L1 is fastest and smallest, L2 is medium, L3 is slower but larger.", h: "How do cache levels differ?", yr: "GST" },
      { q: "Which component holds the CPU?", o: ["RAM slot", "CPU socket", "PCI slot", "SATA connector"], a: 1, e: "CPU socket on motherboard holds the processor.", h: "What holds the CPU?", yr: "GST" },
      { q: "The control unit's function is to:", o: ["Perform arithmetic", "Direct data flow and instruction execution", "Store data", "Display output"], a: 1, e: "Control unit manages and coordinates all CPU activities — directing data flow and instruction execution.", h: "What does control unit do?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 3: Computer Hardware - Input and Output Devices
  // ==========================================================================
  {
    topic: "Computer Hardware - Input and Output Devices",
    topicCode: "CSC-003-01",
    module: "Computer Hardware",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Input and output devices</span> allow users to interact with computers. Input devices send data to the computer (keyboard, mouse, scanner, microphone). Output devices receive data from the computer (monitor, printer, speakers). <strong>Without input/output devices, computers would be isolated and useless</strong>.
</div>

<p class="learn-p">Input devices convert user actions or physical data into electronic signals the computer can process. Output devices convert computer data into human-readable form (visual, audio, printed).</p>

<h3 class="learn-subheading">Input Devices</h3>

<p class="learn-p"><strong>Keyboard:</strong> Most common input device. Types: QWERTY (standard layout), ergonomic (angled to reduce strain), virtual (touchscreen). Keys: Alphanumeric (letters, numbers), Function (F1-F12), Navigation (arrows, Home, End, Page Up/Down), Numeric keypad, Modifier (Shift, Ctrl, Alt, Windows).</p>

<p class="learn-p"><strong>Mouse:</strong> Pointing device. Types: Mechanical (ball inside — obsolete), Optical (LED light detects movement), Wireless (Bluetooth or RF), Trackball (ball moved with thumb/fingers). Operations: Click, Double-click, Right-click, Drag and drop, Scroll, Hover.</p>

<p class="learn-p"><strong>Touchscreen:</strong> Combines input and output. Types: Resistive (pressure-sensitive — responds to any touch), Capacitive (electrical field — responds to finger, supports multi-touch). Multi-touch gestures: Tap, Swipe, Pinch zoom, Rotate, Two-finger scroll.</p>

<p class="learn-p"><strong>Scanner:</strong> Converts physical documents/images to digital. Types: Flatbed (book/flat documents), Sheet-fed (multiple pages), Handheld (portable), Drum (high-resolution professional). OCR (Optical Character Recognition) converts scanned images of text into editable text.</p>

<p class="learn-p"><strong>Microphone:</strong> Converts sound to digital audio. Uses: Voice input, dictation, voice commands, recording, video conferencing, gaming.</p>

<p class="learn-p"><strong>Webcam:</strong> Captures video for conferencing, streaming, security, photography.</p>

<p class="learn-p"><strong>Biometric devices:</strong> Use physical characteristics for identification/authentication. Fingerprint scanner, Iris scanner, Facial recognition, Voice recognition.</p>

<p class="learn-p"><strong>Barcode reader:</strong> Reads barcodes (UPC, QR codes). Uses: Retail checkout, inventory management, library systems.</p>

<p class="learn-p"><strong>Magnetic stripe reader:</strong> Reads magnetic stripes on credit/debit cards, ID cards, hotel key cards.</p>

<p class="learn-p"><strong>Smart card reader:</strong> Reads chip cards (EMV credit cards, SIM cards).</p>

<p class="learn-p"><strong>Touchpad:</strong> Laptop pointing device. Multi-touch gestures: two-finger scroll, pinch zoom, three-finger swipe.</p>

<p class="learn-p"><strong>Joystick/Gamepad:</strong> Gaming and simulation input (flight simulators, medical training).</p>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🖨️ PRINTER TYPES - Impact vs Non-Impact</text>
    
    <g>
      <rect x="15" y="45" width="225" height="65" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
      <rect x="15" y="45" width="225" height="25" rx="8" fill="#ef4444"/>
      <text x="127" y="63" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="800">IMPACT PRINTERS</text>
      <text x="127" y="85" text-anchor="middle" font-size="8" fill="#991b1b">Dot Matrix Printer</text>
      <text x="127" y="100" text-anchor="middle" font-size="7" fill="#991b1b">Uses pins striking ink ribbon</text>
    </g>
    
    <g>
      <rect x="260" y="45" width="225" height="65" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <rect x="260" y="45" width="225" height="25" rx="8" fill="#22c55e"/>
      <text x="372" y="63" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="800">NON-IMPACT PRINTERS</text>
      <text x="372" y="85" text-anchor="middle" font-size="8" fill="#166534">Inkjet, Laser, Thermal, 3D</text>
      <text x="372" y="100" text-anchor="middle" font-size="7" fill="#166534">No physical contact with paper</text>
    </g>
    
    <text x="250" y="140" text-anchor="middle" font-size="9" fill="#475569">Impact printers are noisy but can make carbon copies</text>
    <text x="250" y="155" text-anchor="middle" font-size="9" fill="#475569">Non-impact printers are faster, quieter, and produce higher quality</text>
  </svg>
</div>

<h3 class="learn-subheading">Output Devices</h3>

<p class="learn-p"><strong>Monitor (Display):</strong> Most common visual output device.</p>
<p class="learn-p">Types: CRT (Cathode Ray Tube — old, bulky), LCD (Liquid Crystal Display — thin, energy efficient), LED (Light Emitting Diode — backlit LCD), OLED (Organic LED — better contrast, thinner).</p>
<p class="learn-p">Specifications: Size (measured diagonally in inches), Resolution (pixels: 1920x1080, 3840x2160), Refresh rate (Hz — higher smoother), Response time (ms — lower better for gaming).</p>
<p class="learn-p">Ports: VGA (older analog), DVI, HDMI (audio+video), DisplayPort.</p>

<p class="learn-p"><strong>Printer:</strong> Produces hard copy (physical paper output).</p>
<p class="learn-p">Impact printers: Dot Matrix — uses pins striking ink ribbon; noisy but can make carbon copies (multi-part forms). Used for invoices, receipts.</p>
<p class="learn-p">Non-impact printers: Inkjet — sprays ink droplets; good for color photos, home use. Laser — uses toner and heat; fast, high volume, sharp text; office use. Thermal — uses heat on special paper; receipt printers, label printers. 3D printer — builds three-dimensional objects by layering material.</p>
<p class="learn-p">Specifications: Speed (pages per minute), Resolution (dots per inch — DPI), Color vs monochrome.</p>

<p class="learn-p"><strong>Speaker/Headphones:</strong> Audio output. Speakers: built-in or external, stereo or surround sound. Headphones: personal listening, noise-cancelling, gaming headsets.</p>

<p class="learn-p"><strong>Projector:</strong> Projects computer display onto large screen. Types: DLP, LCD, LED. Uses: presentations, home theater, classrooms.</p>

<p class="learn-p"><strong>Plotter:</strong> Large format printer for engineering drawings, blueprints, maps, posters. Uses pens to draw vector images.</p>

<h3 class="learn-subheading">Hybrid Devices (Input + Output)</h3>

<p class="learn-p">Some devices serve both input and output functions: Touchscreen (displays output and accepts touch input), Modem (sends and receives data), Network card (transmits and receives network data), Headset (speakers output audio, microphone inputs).</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Key Distinction:</strong> Input devices send data TO the computer (keyboard, mouse, scanner). Output devices receive data FROM the computer (monitor, printer, speakers).</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Tip:</strong> OCR (Optical Character Recognition) converts scanned images of text into editable text — used in document scanning, digitizing books, reading license plates.</span>
</div>
    `,
    questions: [
      { q: "Which of the following is an input device?", o: ["Monitor", "Printer", "Keyboard", "Speaker"], a: 2, e: "Keyboard sends data to computer — input device. Monitor, printer, speaker are output devices.", h: "What sends data TO computer?", yr: "GST" },
      { q: "Which printer type uses pins striking an ink ribbon?", o: ["Inkjet", "Laser", "Dot Matrix", "Thermal"], a: 2, e: "Dot Matrix is impact printer — pins strike ribbon to print dots. Noisy, can make carbon copies.", h: "What printer uses pins?", yr: "GST" },
      { q: "OCR (Optical Character Recognition) is used with:", o: ["Keyboard", "Mouse", "Scanner", "Printer"], a: 2, e: "OCR converts scanned images of text into editable text — used with scanners.", h: "What uses OCR?", yr: "GST" },
      { q: "Which monitor type uses OLED technology?", o: ["CRT", "LCD", "LED", "OLED (organic LEDs, self-emitting, better contrast)"], a: 3, e: "OLED has organic LEDs that self-emit light — no backlight needed, better contrast, thinner.", h: "What is OLED?", yr: "GST" },
      { q: "A touchscreen is classified as:", o: ["Input only", "Output only", "Both input and output (hybrid)", "Neither"], a: 2, e: "Touchscreen displays output (visual) and accepts touch input — hybrid device.", h: "Is touchscreen input, output, or both?", yr: "GST" },
      { q: "Which biometric device uses physical characteristics for authentication?", o: ["Keyboard", "Mouse", "Fingerprint scanner", "Monitor"], a: 2, e: "Biometric devices (fingerprint, iris, facial recognition, voice) use physical traits for identification.", h: "What uses fingerprints?", yr: "GST" },
      { q: "Laser printers use which technology?", o: ["Spraying ink", "Pins striking ribbon", "Toner and heat (electrostatic)", "Heat on special paper"], a: 2, e: "Laser printers use toner (powder) and heat to fuse toner to paper — fast, high quality.", h: "What technology do laser printers use?", yr: "GST" },
      { q: "Which mouse operation involves pressing and holding button while moving?", o: ["Click", "Double-click", "Drag and drop", "Right-click"], a: 2, e: "Drag and drop: click and hold button, move mouse to new location, release button.", h: "What is drag and drop?", yr: "GST" },
      { q: "A plotter is used for:", o: ["Printing text documents", "Large format printing (blueprints, maps, engineering drawings)", "Scanning documents", "Playing audio"], a: 1, e: "Plotters are large-format printers for CAD drawings, blueprints, maps, posters.", h: "What is a plotter for?", yr: "GST" },
      { q: "Which of the following is a non-impact printer?", o: ["Dot Matrix", "Inkjet", "Typewriter", "None of these"], a: 1, e: "Inkjet is non-impact — no physical contact with paper. Dot Matrix is impact printer.", h: "What is non-impact?", yr: "GST" },
      { q: "Capacitive touchscreen responds to:", o: ["Any object (pen, glove)", "Finger only (electrical field)", "Only stylus", "Only gloved hand"], a: 1, e: "Capacitive touchscreens detect electrical field changes — respond to finger (conductive).", h: "What works on capacitive screen?", yr: "GST" },
      { q: "Which printer is best for high-volume black-and-white office printing?", o: ["Inkjet", "Laser", "Dot Matrix", "Thermal"], a: 1, e: "Laser printers are fast, cost-effective for high-volume text printing — ideal for offices.", h: "What printer for office?", yr: "GST" },
      { q: "A barcode reader is typically used for:", o: ["Reading text", "Reading barcodes (UPC, QR) at checkout, inventory", "Playing games", "Typing documents"], a: 1, e: "Barcode readers scan UPC/QR codes for retail checkout, inventory tracking, library systems.", h: "What uses barcode reader?", yr: "GST" },
      { q: "Monitor refresh rate (measured in Hz) affects:", o: ["Color accuracy", "Smoothness of motion (higher Hz = smoother)", "Resolution", "Screen size"], a: 1, e: "Refresh rate (Hz) determines how many times screen updates per second — higher = smoother motion, better for gaming.", h: "What does refresh rate affect?", yr: "GST" },
      { q: "A webcam is primarily an:", o: ["Output device", "Input device (captures video)", "Storage device", "Processing device"], a: 1, e: "Webcam captures video and sends to computer — input device.", h: "Is webcam input or output?", yr: "GST" },
      { q: "Which scanner type is best for scanning books?", o: ["Sheet-fed", "Handheld", "Flatbed", "Drum"], a: 2, e: "Flatbed scanners have glass surface for books or documents that cannot be fed through rollers.", h: "What scanner for books?", yr: "GST" },
      { q: "A 3D printer produces:", o: ["2D images", "Three-dimensional objects by layering material", "Text documents", "Audio files"], a: 1, e: "3D printers build physical objects layer by layer from digital models — used for prototyping, manufacturing, medical devices.", h: "What does 3D printer make?", yr: "GST" },
      { q: "Which of the following is NOT an input device?", o: ["Mouse", "Scanner", "Monitor", "Microphone"], a: 2, e: "Monitor is output device — displays information from computer. Others send data to computer.", h: "What is NOT input?", yr: "GST" },
      { q: "Thermal printers are commonly used for:", o: ["Photo printing", "Receipts and labels (uses heat-sensitive paper)", "Large format printing", "Book printing"], a: 1, e: "Thermal printers use heat on special paper — common for receipts (ATMs, POS), shipping labels.", h: "Where are thermal printers used?", yr: "GST" },
      { q: "Magnetic stripe readers read information from:", o: ["Barcodes", "Credit/debit cards, ID cards, hotel keys", "QR codes", "RFID tags"], a: 1, e: "Magnetic stripe readers read magnetic stripes on credit cards, ID cards, key cards.", h: "What reads card stripes?", yr: "GST" }
    ]
  },

  // ============================================================================
// INTRODUCTION TO COMPUTING — PART 2 OF 4 (CLEAN - NO INLINE STYLES)
// Continuing GST_LEARN_GST_COMPUTING array from Part 1
// TOPICS 4, 5, 6
// ============================================================================

  // ==========================================================================
  // TOPIC 4: Computer Software
  // ==========================================================================
  {
    topic: "Computer Software",
    topicCode: "CSC-004-01",
    module: "Computer Software",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Software</span> refers to the programs and instructions that tell the computer hardware what to do. Without software, computers are useless hardware. Software is intangible — you cannot touch it. <strong>Understanding the different types of software is essential for using computers effectively</strong>.
</div>

<p class="learn-p">Software is divided into two main categories: system software (runs the computer) and application software (does what you want). Utility software provides additional tools for maintenance and security.</p>

<h3 class="learn-subheading">System Software — Operating Systems</h3>

<p class="learn-p">An operating system (OS) is the most important system software. It manages hardware resources, provides a user interface, and runs application software.</p>

<p class="learn-p"><strong>Functions of an operating system:</strong></p>
<ul class="learn-list">
  <li><strong>Process management:</strong> Manages running programs (processes) — starts, stops, allocates CPU time</li>
  <li><strong>Memory management:</strong> Allocates RAM to programs, tracks used/free memory, handles virtual memory (using hard drive as extra RAM)</li>
  <li><strong>File management:</strong> Organizes files on storage devices (create, delete, read, write, manage folders/directories)</li>
  <li><strong>Device management:</strong> Controls input/output devices through drivers</li>
  <li><strong>Security:</strong> User accounts, passwords, permissions, protection from unauthorized access</li>
  <li><strong>User interface:</strong> Provides way for users to interact with computer (GUI or CUI)</li>
</ul>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Type</th><th>Examples</th><th>Characteristics</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Desktop OS</th>。<th>Windows, macOS, Linux</th>。<th>Personal computers, GUI, multi-user, multi-tasking</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Mobile OS</th>。<th>Android, iOS</th>。<th>Touch interface, app stores, power efficient</th>
      </table>
      <tr><td style="background:#f0fdf4;">Server OS</th>。<th>Windows Server, Linux Server</th>。<th>Network services, high stability, security</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Real-time OS</th>。<th>VxWorks, QNX</th>。<th>Deterministic response times (industrial, automotive, medical)</th>
      </tr>
    </tbody>
  </table>
</div>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">💿 TYPES OF SOFTWARE</text>
    
    <g>
      <rect x="15" y="45" width="220" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <rect x="15" y="45" width="220" height="22" rx="8" fill="#3b82f6"/>
      <text x="125" y="61" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="800">SYSTEM SOFTWARE</text>
      <text x="125" y="80" text-anchor="middle" font-size="8" fill="#1e3a8a">Operating System (Windows, Linux, Android)</text>
      <text x="125" y="92" text-anchor="middle" font-size="7" fill="#1e3a8a">Device Drivers</text>
    </g>
    
    <g>
      <rect x="260" y="45" width="225" height="50" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <rect x="260" y="45" width="225" height="22" rx="8" fill="#22c55e"/>
      <text x="372" y="61" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="800">APPLICATION SOFTWARE</text>
      <text x="372" y="80" text-anchor="middle" font-size="8" fill="#166534">Word processors, Spreadsheets, Web browsers</text>
      <text x="372" y="92" text-anchor="middle" font-size="7" fill="#166534">Games, Databases, Email clients</text>
    </g>
    
    <g>
      <rect x="15" y="110" width="220" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <rect x="15" y="110" width="220" height="22" rx="8" fill="#f59e0b"/>
      <text x="125" y="126" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="800">UTILITY SOFTWARE</text>
      <text x="125" y="145" text-anchor="middle" font-size="8" fill="#92400e">Antivirus, Disk Cleanup, Backup</text>
      <text x="125" y="157" text-anchor="middle" font-size="7" fill="#92400e">File Compression, Firewall</text>
    </g>
    
    <g>
      <rect x="260" y="110" width="225" height="50" rx="8" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
      <rect x="260" y="110" width="225" height="22" rx="8" fill="#ec4899"/>
      <text x="372" y="126" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="800">PROGRAMMING SOFTWARE</text>
      <text x="372" y="145" text-anchor="middle" font-size="8" fill="#831843">Compilers, Interpreters, IDEs</text>
      <text x="372" y="157" text-anchor="middle" font-size="7" fill="#831843">Debuggers, Code editors</text>
    </g>
  </svg>
</div>

<h3 class="learn-subheading">Application Software</h3>

<p class="learn-p">Application software helps users perform specific tasks. Categories include:</p>

<ul class="learn-list">
  <li><strong>Productivity software:</strong> Word processors (Microsoft Word, Google Docs), Spreadsheets (Excel, Google Sheets), Presentation software (PowerPoint, Google Slides), Database software (Access, MySQL Workbench)</li>
  <li><strong>Business software:</strong> Accounting (QuickBooks), CRM (Salesforce), ERP, Project management (Trello, Asana)</li>
  <li><strong>Communication software:</strong> Email clients (Outlook, Gmail), Messaging apps (WhatsApp, Telegram), Video conferencing (Zoom, Teams, Google Meet), Web browsers (Chrome, Firefox, Edge, Safari)</li>
  <li><strong>Multimedia software:</strong> Media players (VLC), Image editors (Photoshop, GIMP), Video editors (Premiere, DaVinci Resolve), Audio editors (Audacity)</li>
  <li><strong>Educational software:</strong> Learning management systems (Canvas, Moodle), Tutorials, Simulations, Language learning apps (Duolingo)</li>
  <li><strong>Gaming software:</strong> Casual games, serious games, esports titles</li>
</ul>

<h3 class="learn-subheading">Utility Software</h3>

<p class="learn-p">Utility software performs specific tasks to maintain, optimize, and secure the computer:</p>

<ul class="learn-list">
  <li><strong>Antivirus/Anti-malware:</strong> Protects from viruses, malware, spyware (Norton, McAfee, Kaspersky, Windows Defender)</li>
  <li><strong>Disk cleanup:</strong> Removes temporary files, cache, browser history, recycle bin</li>
  <li><strong>Disk defragmenter:</strong> Rearranges fragmented files for faster access (HDD only — not needed for SSDs)</li>
  <li><strong>Backup software:</strong> Copies important files to external drives or cloud</li>
  <li><strong>File compression:</strong> Reduces file size (WinZip, 7-Zip) — creates ZIP, RAR archives</li>
  <li><strong>Firewall:</strong> Monitors network traffic, blocks unauthorized access</li>
</ul>

<h3 class="learn-subheading">Software Licensing</h3>

<p class="learn-p"><strong>Software license types:</strong></p>
<ul class="learn-list">
  <li><strong>Proprietary (closed source):</strong> Source code kept secret; user pays for license; cannot modify (Microsoft Windows, Adobe Photoshop)</li>
  <li><strong>Open source:</strong> Source code freely available; can modify and redistribute; often free (Linux, Firefox, LibreOffice, GIMP, Android)</li>
  <li><strong>Freeware:</strong> Free to use, but source code not available (no modification) (Adobe Reader, Skype)</li>
  <li><strong>Shareware:</strong> Free trial period, then pay for continued use (WinZip trial)</li>
  <li><strong>Public domain:</strong> No copyright restrictions; free to use, modify, distribute</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Key Distinction:</strong> System software runs the computer; application software does what you want. The OS is system software; Word is application software.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Tip:</strong> Open source software (Linux, Firefox, LibreOffice) is free and modifiable — not the same as freeware (free but not modifiable).</span>
</div>
    `,
    questions: [
      { q: "Which of the following is system software?", o: ["Microsoft Word", "Google Chrome", "Windows 11 (Operating System)", "Adobe Photoshop"], a: 2, e: "Windows 11 is an operating system — system software. Word, Chrome, Photoshop are application software.", h: "What is system software?", yr: "GST" },
      { q: "The operating system manages all EXCEPT:", o: ["Processes", "Memory", "Files", "The user's typing speed"], a: 3, e: "OS manages processes, memory, files, devices, security, user interface — not user typing speed.", h: "What does OS NOT manage?", yr: "GST" },
      { q: "Which of the following is an open source operating system?", o: ["Windows 11", "macOS", "Linux", "iOS"], a: 2, e: "Linux is open source — source code freely available. Windows, macOS, iOS are proprietary.", h: "What is open source?", yr: "GST" },
      { q: "Google Chrome is classified as:", o: ["System software", "Application software (web browser)", "Utility software", "Programming software"], a: 1, e: "Web browsers (Chrome, Firefox, Edge) are application software — they help users perform specific tasks.", h: "What type is Chrome?", yr: "GST" },
      { q: "Which utility software rearranges fragmented files for faster access?", o: ["Antivirus", "Disk Defragmenter", "Backup software", "File compression"], a: 1, e: "Disk defragmenter rearranges fragmented files on HDD for faster access (not needed for SSDs).", h: "What defragments drives?", yr: "GST" },
      { q: "A license that allows free use but source code is not available is:", o: ["Open source", "Freeware", "Public domain", "Proprietary"], a: 1, e: "Freeware is free to use but source code is not available (cannot modify). Open source provides source code.", h: "What is freeware?", yr: "GST" },
      { q: "Which of the following is an example of application software?", o: ["Windows 10", "Linux kernel", "Microsoft Excel", "BIOS"], a: 2, e: "Excel is application software (spreadsheet). Windows, Linux, BIOS are system software.", h: "What is application software?", yr: "GST" },
      { q: "Antivirus software is classified as:", o: ["System software", "Application software", "Utility software", "Programming software"], a: 2, e: "Antivirus is utility software — helps maintain and secure computer system.", h: "What type is antivirus?", yr: "GST" },
      { q: "The function of device drivers is to:", o: ["Manage files", "Allow OS to communicate with hardware devices", "Compress files", "Defragment disks"], a: 1, e: "Device drivers enable operating system to communicate with and control hardware devices (printer, graphics card, etc.).", h: "What do drivers do?", yr: "GST" },
      { q: "Which software license allows users to view, modify, and redistribute source code?", o: ["Proprietary", "Freeware", "Open source", "Shareware"], a: 2, e: "Open source licenses give users freedom to view, modify, and redistribute source code.", h: "What allows source code modification?", yr: "GST" },
      { q: "Microsoft Windows is an example of:", o: ["Application software", "Utility software", "Proprietary operating system", "Open source software"], a: 2, e: "Windows is proprietary (closed source) operating system — system software.", h: "What type is Windows?", yr: "GST" },
      { q: "Which of the following is utility software?", o: ["Microsoft Word", "Google Chrome", "7-Zip (file compression)", "Windows 11"], a: 2, e: "7-Zip is file compression utility — utility software. Word, Chrome are applications; Windows is OS.", h: "What is 7-Zip?", yr: "GST" },
      { q: "A compiler translates:", o: ["English to machine code", "High-level programming language to machine code", "Machine code to high-level language", "Binary to decimal"], a: 1, e: "Compiler translates high-level programming language (C, C++, Java) into machine code (binary) for execution.", h: "What does compiler do?", yr: "GST" },
      { q: "Which of the following is NOT a function of an operating system?", o: ["Process management", "Memory management", "Creating documents", "File management"], a: 2, e: "Creating documents is application software function (word processor). OS manages processes, memory, files, devices.", h: "What does OS NOT do?", yr: "GST" },
      { q: "Android and iOS are examples of:", o: ["Desktop operating systems", "Mobile operating systems", "Utility software", "Application software"], a: 1, e: "Android and iOS are operating systems designed for mobile devices (phones, tablets).", h: "What are Android and iOS?", yr: "GST" },
      { q: "Shareware is characterized by:", o: ["Always free", "Free trial period, then pay", "Source code available", "No restrictions"], a: 1, e: "Shareware offers free trial period (usually 30 days), then requires payment for continued use.", h: "What is shareware?", yr: "GST" },
      { q: "Which software is used to create spreadsheets?", o: ["Microsoft Word", "Microsoft Excel", "PowerPoint", "Outlook"], a: 1, e: "Excel is spreadsheet software — creates tables, formulas, charts, data analysis.", h: "What creates spreadsheets?", yr: "GST" },
      { q: "The main difference between freeware and open source is:", o: ["Freeware costs money", "Open source provides source code; freeware does not", "Freeware is for businesses only", "Open source costs money"], a: 1, e: "Open source provides source code (can modify); freeware is free to use but source code not available.", h: "How does open source differ from freeware?", yr: "GST" },
      { q: "Which utility creates copies of important files for recovery?", o: ["Disk defragmenter", "Backup software", "Antivirus", "File compression"], a: 1, e: "Backup software copies important files to external drives or cloud for recovery after data loss.", h: "What creates backups?", yr: "GST" },
      { q: "A GUI (Graphical User Interface) uses:", o: ["Text commands only", "Icons, windows, menus, pointer", "Voice commands only", "No user interaction"], a: 1, e: "GUI uses visual elements: icons, windows, menus, buttons, pointer — user-friendly, not requiring commands.", h: "What does GUI use?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 5: Data Representation and Number Systems
  // ==========================================================================
  {
    topic: "Data Representation and Number Systems",
    topicCode: "CSC-005-01",
    module: "Data Representation",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Data representation</span> is how computers encode information (numbers, text, images, sound) into binary (0s and 1s). Computers use binary because electronic switches have two states: on (1) and off (0). <strong>Understanding number systems is essential for understanding how computers store and process data</strong>.
</div>

<p class="learn-p">All data in a computer is represented in binary. Different number systems (binary, octal, decimal, hexadecimal) are used for different purposes — binary for machine, hexadecimal for memory addresses and debugging, decimal for human readability.</p>

<h3 class="learn-subheading">Number Systems</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>System</th><th>Base</th><th>Digits</th><th>Uses</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Binary</th>。<th>2</th>。<th>0, 1</th>。<th>Computer internal representation</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Octal</th>。<th>8</th>。<th>0-7</th>。<th>Unix file permissions (chmod), some programming</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Decimal</th>。<th>10</th>。<th>0-9</th>。<th>Everyday human use</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Hexadecimal</th>。<th>16</th>。<th>0-9, A-F (A=10, B=11, C=12, D=13, E=14, F=15)</th>。<th>Memory addresses, color codes (RGB), debugging</th>
      </tr>
    </tbody>
  </table>
</div>

<p class="learn-p"><strong>Binary to Decimal Conversion:</strong> Multiply each digit by its place value (power of 2) and sum.</p>
<p class="learn-p">Example: Binary 1011₂ = 1×8 + 0×4 + 1×2 + 1×1 = 8 + 0 + 2 + 1 = 11₁₀</p>

<p class="learn-p"><strong>Decimal to Binary Conversion:</strong> Repeatedly divide by 2, read remainders from bottom to top.</p>
<p class="learn-p">Example: 13₁₀ ÷ 2 = 6 remainder 1; 6 ÷ 2 = 3 remainder 0; 3 ÷ 2 = 1 remainder 1; 1 ÷ 2 = 0 remainder 1 → 1101₂</p>

<p class="learn-p"><strong>Binary to Hexadecimal (shortcut):</strong> Group binary digits into groups of 4 (from right), convert each group to hex digit.</p>
<p class="learn-p">Example: 11010111₂ → 1101 (D) 0111 (7) → D7₁₆</p>

<p class="learn-p"><strong>Hexadecimal to Binary:</strong> Convert each hex digit to 4-bit binary.</p>
<p class="learn-p">Example: 2F₁₆ → 2 (0010) F (1111) → 00101111₂</p>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">📊 DATA UNITS - From Bit to Terabyte</text>
    
    <g>
      <rect x="15" y="45" width="70" height="40" rx="5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="50" y="62" text-anchor="middle" font-size="8" fill="#1e3a8a" font-weight="800">bit</text>
      <text x="50" y="76" text-anchor="middle" font-size="6" fill="#1e3a8a">0 or 1</text>
    </g>
    
    <g>
      <rect x="95" y="45" width="70" height="40" rx="5" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <text x="130" y="62" text-anchor="middle" font-size="8" fill="#166534" font-weight="800">nibble</text>
      <text x="130" y="76" text-anchor="middle" font-size="6" fill="#166534">4 bits</text>
    </g>
    
    <g>
      <rect x="175" y="45" width="70" height="40" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="210" y="62" text-anchor="middle" font-size="8" fill="#92400e" font-weight="800">byte</text>
      <text x="210" y="76" text-anchor="middle" font-size="6" fill="#92400e">8 bits</text>
    </g>
    
    <g>
      <rect x="255" y="45" width="80" height="40" rx="5" fill="#fce7f3" stroke="#ec4899" stroke-width="1.5"/>
      <text x="295" y="62" text-anchor="middle" font-size="7" fill="#831843" font-weight="800">KB</text>
      <text x="295" y="76" text-anchor="middle" font-size="6" fill="#831843">1024 bytes</text>
    </g>
    
    <g>
      <rect x="345" y="45" width="70" height="40" rx="5" fill="#ede9fe" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="380" y="62" text-anchor="middle" font-size="7" fill="#5b21b6" font-weight="800">MB</text>
      <text x="380" y="76" text-anchor="middle" font-size="6" fill="#5b21b6">1024 KB</text>
    </g>
    
    <g>
      <rect x="420" y="45" width="70" height="40" rx="5" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
      <text x="455" y="62" text-anchor="middle" font-size="7" fill="#991b1b" font-weight="800">GB</text>
      <text x="455" y="76" text-anchor="middle" font-size="6" fill="#991b1b">1024 MB</text>
    </g>
    
    <text x="250" y="120" text-anchor="middle" font-size="9" fill="#475569" font-weight="800">1 Kilobyte (KB) = 1024 bytes (not 1000)</text>
    <text x="250" y="137" text-anchor="middle" font-size="9" fill="#475569">1 Megabyte (MB) = 1024 KB = 1,048,576 bytes</text>
    <text x="250" y="154" text-anchor="middle" font-size="9" fill="#475569">1 Gigabyte (GB) = 1024 MB = 1,073,741,824 bytes</text>
    <text x="250" y="171" text-anchor="middle" font-size="9" fill="#475569">1 Terabyte (TB) = 1024 GB = 1,099,511,627,776 bytes</text>
  </svg>
</div>

<h3 class="learn-subheading">Data Units</h3>

<p class="learn-p"><strong>Basic units:</strong></p>
<ul class="learn-list">
  <li><strong>Bit:</strong> Smallest unit — 0 or 1</li>
  <li><strong>Nibble:</strong> 4 bits</li>
  <li><strong>Byte:</strong> 8 bits — can represent one character (ASCII)</li>
  <li><strong>Kilobyte (KB):</strong> 1024 bytes (2¹⁰) — not 1000</li>
  <li><strong>Megabyte (MB):</strong> 1024 KB (2²⁰) — about 1 million bytes</li>
  <li><strong>Gigabyte (GB):</strong> 1024 MB (2³⁰) — about 1 billion bytes</li>
  <li><strong>Terabyte (TB):</strong> 1024 GB (2⁴⁰) — about 1 trillion bytes</li>
  <li><strong>Petabyte (PB):</strong> 1024 TB (2⁵⁰)</li>
</ul>

<h3 class="learn-subheading">Character Encoding</h3>

<p class="learn-p"><strong>ASCII (American Standard Code for Information Interchange):</strong></p>
<ul class="learn-list">
  <li>7-bit encoding (128 characters) — 0-127</li>
  <li>Includes uppercase (A-Z: 65-90), lowercase (a-z: 97-122), digits (0-9: 48-57), punctuation, control characters</li>
  <li>Extended ASCII uses 8 bits (256 characters)</li>
</ul>

<p class="learn-p"><strong>Unicode:</strong></p>
<ul class="learn-list">
  <li>Supports all world languages (over 143,000 characters)</li>
  <li>UTF-8: Variable length (1-4 bytes) — compatible with ASCII, most common for web</li>
  <li>UTF-16: 2 or 4 bytes — used by Windows, Java</li>
  <li>UTF-32: 4 bytes fixed — simple but space-inefficient</li>
</ul>

<h3 class="learn-subheading">Representing Numbers</h3>

<p class="learn-p"><strong>Integer representation:</strong> Sign-magnitude (first bit for sign), One's complement (invert all bits), Two's complement (invert +1) — standard for signed integers in computers.</p>

<p class="learn-p"><strong>Floating point (IEEE 754):</strong> Represents real numbers (decimals) — sign bit, exponent, mantissa. Allows very large and very small numbers.</p>

<h3 class="learn-subheading">Representing Images</h3>

<p class="learn-p"><strong>Bitmap (raster):</strong> Grid of pixels; each pixel has color value (bits per pixel). File formats: BMP (uncompressed), PNG (lossless compression), JPEG (lossy compression — good for photos), GIF (limited colors, supports animation), TIFF (high quality, large).</p>

<p class="learn-p"><strong>Vector:</strong> Stores geometric instructions (lines, curves, shapes). File formats: SVG (web vector), EPS, AI (Adobe Illustrator). Scalable without quality loss — logos, fonts, illustrations.</p>

<h3 class="learn-subheading">Representing Sound and Video</h3>

<p class="learn-p"><strong>Sound:</strong> Sampling — measuring amplitude at regular intervals. Sample rate (Hz: CD quality 44.1kHz), bit depth (16-bit, 24-bit). File formats: WAV (uncompressed), MP3 (lossy compression), AAC, FLAC (lossless compression).</p>

<p class="learn-p"><strong>Video:</strong> Sequence of frames (images) at frame rate (fps: 24, 30, 60). File formats: MP4, AVI, MKV, MOV. Codecs compress video (H.264, HEVC, VP9).</p>

<h3 class="learn-subheading">Data Compression</h3>

<p class="learn-p"><strong>Lossless compression:</strong> Original can be perfectly reconstructed — run-length encoding, Huffman coding, LZW (used in PNG, ZIP).</p>
<p class="learn-p"><strong>Lossy compression:</strong> Some data lost — higher compression ratios; used for JPEG, MP3, MPEG (trading quality for file size).</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Memory Acronym:</strong> KB = Kilobyte (1024 bytes), MB = Megabyte (1024 KB), GB = Gigabyte (1024 MB), TB = Terabyte (1024 GB).</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "Convert binary 101101 to decimal. (Sample answer: 101101₂ = 1×32 + 0×16 + 1×8 + 1×4 + 0×2 + 1×1 = 32+8+4+1 = 45₁₀)"</span>
</div>
    `,
    questions: [
      { q: "Computers use binary because:", o: ["Binary is easier for humans", "Electronic switches have two states (on/off or 0/1)", "Binary uses fewer digits", "Binary is older"], a: 1, e: "Transistors/switches have two states — on (1) and off (0) — naturally binary.", h: "Why binary?", yr: "GST" },
      { q: "Convert binary 1101 to decimal.", o: ["10", "11", "12", "13"], a: 3, e: "1101₂ = 1×8 + 1×4 + 0×2 + 1×1 = 8+4+0+1 = 13₁₀", h: "What is 1101 binary in decimal?", yr: "GST" },
      { q: "A byte consists of how many bits?", o: ["4", "8", "16", "32"], a: 1, e: "A byte is 8 bits — can represent 256 values (2⁸).", h: "How many bits in a byte?", yr: "GST" },
      { q: "Hexadecimal digits include:", o: ["0-9 only", "0-9 and A-G", "0-9 and A-F", "A-Z only"], a: 2, e: "Hexadecimal uses 0-9 and A-F (A=10, B=11, C=12, D=13, E=14, F=15).", h: "What digits are in hex?", yr: "GST" },
      { q: "Convert decimal 25 to binary.", o: ["11001", "10011", "11010", "10101"], a: 0, e: "25 ÷ 2 = 12 r1; 12÷2=6 r0; 6÷2=3 r0; 3÷2=1 r1; 1÷2=0 r1 → 11001₂", h: "What is 25 decimal in binary?", yr: "GST" },
      { q: "ASCII is a character encoding standard that uses how many bits?", o: ["4 bits", "7 bits (standard ASCII)", "16 bits", "32 bits"], a: 1, e: "Standard ASCII uses 7 bits (128 characters). Extended ASCII uses 8 bits.", h: "How many bits in ASCII?", yr: "GST" },
      { q: "One Kilobyte (KB) equals:", o: ["1000 bytes", "1024 bytes", "100 bytes", "2048 bytes"], a: 1, e: "1 KB = 1024 bytes (2¹⁰), not 1000 bytes (decimal).", h: "How many bytes in 1 KB?", yr: "GST" },
      { q: "Which number system is used for memory addresses and debugging?", o: ["Binary", "Octal", "Decimal", "Hexadecimal"], a: 3, e: "Hexadecimal (base 16) is used for memory addresses, color codes (RGB), and debugging.", h: "What system for memory addresses?", yr: "GST" },
      { q: "Unicode is important because:", o: ["It only supports English", "It supports all world languages (over 143,000 characters)", "It is older than ASCII", "It uses fewer bits"], a: 1, e: "Unicode supports characters from all writing systems worldwide — not just English.", h: "Why is Unicode important?", yr: "GST" },
      { q: "JPEG image compression is:", o: ["Lossless (perfect reconstruction)", "Lossy (some data lost, smaller file)", "Uncompressed", "Vector-based"], a: 1, e: "JPEG uses lossy compression — sacrifices some detail for smaller file size, good for photos.", h: "Is JPEG lossy or lossless?", yr: "GST" },
      { q: "Convert hexadecimal 2A to decimal.", o: ["32", "42", "52", "62"], a: 1, e: "2A₁₆ = 2×16 + 10 = 32 + 10 = 42₁₀ (A=10)", h: "What is hex 2A in decimal?", yr: "GST" },
      { q: "A nibble consists of:", o: ["2 bits", "4 bits", "8 bits", "16 bits"], a: 1, e: "A nibble is half a byte — 4 bits, can represent 16 values.", h: "How many bits in a nibble?", yr: "GST" },
      { q: "The decimal number 255 in binary is:", o: ["11111111 (eight 1s)", "1111111 (seven 1s)", "10000000", "11110000"], a: 0, e: "255₁₀ = 11111111₂ (all 8 bits 1) — maximum value for one byte.", h: "What is 255 in binary?", yr: "GST" },
      { q: "UTF-8 is a variable-length encoding that is compatible with:", o: ["EBCDIC", "ASCII (first 128 characters same as ASCII)", "Only Chinese", "Only Japanese"], a: 1, e: "UTF-8 is backward compatible with ASCII — same for first 128 characters.", h: "What is UTF-8 compatible with?", yr: "GST" },
      { q: "1 Gigabyte (GB) equals:", o: ["1024 KB", "1024 MB", "1024 bytes", "1024 TB"], a: 1, e: "1 GB = 1024 MB = 1,073,741,824 bytes.", h: "How many MB in 1 GB?", yr: "GST" },
      { q: "Vector images store data as:", o: ["Pixels", "Geometric instructions (lines, curves, shapes)", "Color values only", "Audio samples"], a: 1, e: "Vector images store mathematical instructions — scalable without quality loss (logos, fonts).", h: "How do vectors store images?", yr: "GST" },
      { q: "The hexadecimal digit F represents which decimal number?", o: ["10", "12", "15", "16"], a: 2, e: "In hex, A=10, B=11, C=12, D=13, E=14, F=15.", h: "What decimal is F?", yr: "GST" },
      { q: "MP3 audio compression is:", o: ["Lossless", "Lossy (discards some audio data for smaller file size)", "Uncompressed", "Vector-based"], a: 1, e: "MP3 uses lossy compression — removes sounds less audible to human ear, significantly reduces file size.", h: "Is MP3 lossy?", yr: "GST" },
      { q: "Binary 1111 in decimal is:", o: ["8", "12", "14", "15"], a: 3, e: "1111₂ = 8+4+2+1 = 15₁₀ — the largest 4-bit binary number.", h: "What is 1111 binary?", yr: "GST" },
      { q: "One Terabyte (TB) equals:", o: ["1024 GB", "1024 MB", "1024 KB", "1024 bytes"], a: 0, e: "1 TB = 1024 GB = 1,099,511,627,776 bytes.", h: "How many GB in 1 TB?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 6: Computer Networks and Internet
  // ==========================================================================
  {
    topic: "Computer Networks and Internet",
    topicCode: "CSC-006-01",
    module: "Networking",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Computer networks</span> connect multiple computers to share resources, exchange data, and communicate. The internet is the largest network — a global system of interconnected networks. <strong>Understanding networks is essential in today's connected world</strong>.
</div>

<p class="learn-p">Networks enable email, web browsing, file sharing, video conferencing, online gaming, cloud computing, and much more. Without networks, computers would be isolated.</p>

<h3 class="learn-subheading">Types of Networks by Size</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Type</th><th>Full Form</th><th>Range</th><th>Example</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">PAN</th>。<th>Personal Area Network</th>。<th>Within person's reach (~10m)</th>。<th>Bluetooth between phone and headset</th>
      </tr>
      <tr><td style="background:#f0fdf4;">LAN</th>。<th>Local Area Network</th>。<th>Building/campus (~100m)</th>。<th>Office network, school computer lab</th>
      <tr>
      <tr><td style="background:#f0fdf4;">CAN</th>。<th>Campus Area Network</th>。<th>University campus, corporate campus</th>。<th>UNN campus network connecting buildings</th>
      </tr>
      <tr><td style="background:#f0fdf4;">MAN</th>。<th>Metropolitan Area Network</th>。<th>City-wide</th>。<th>City government network</th>
      </tr>
      <tr><td style="background:#f0fdf4;">WAN</th>。<th>Wide Area Network</th>。<th>Country or global</th>。<th>The Internet (largest WAN)</th>
      </tr>
    </tbody>
  </table>
</div>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🌐 NETWORK TOPOLOGIES</text>
    
    <g>
      <rect x="15" y="45" width="110" height="35" rx="5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="70" y="67" text-anchor="middle" font-size="8" fill="#1e3a8a" font-weight="800">BUS</text>
    </g>
    
    <g>
      <rect x="135" y="45" width="110" height="35" rx="5" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <text x="190" y="67" text-anchor="middle" font-size="8" fill="#166534" font-weight="800">STAR</text>
    </g>
    
    <g>
      <rect x="255" y="45" width="110" height="35" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="310" y="67" text-anchor="middle" font-size="8" fill="#92400e" font-weight="800">RING</text>
    </g>
    
    <g>
      <rect x="375" y="45" width="110" height="35" rx="5" fill="#fce7f3" stroke="#ec4899" stroke-width="1.5"/>
      <text x="430" y="67" text-anchor="middle" font-size="8" fill="#831843" font-weight="800">MESH</text>
    </g>
    
    <text x="250" y="110" text-anchor="middle" font-size="9" fill="#475569" font-weight="800">Common Network Topologies</text>
    
    <rect x="50" y="130" width="400" height="55" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
    <text x="250" y="150" text-anchor="middle" font-size="8" fill="#475569">Star topology (central switch) is most common in home/office networks</text>
    <text x="250" y="165" text-anchor="middle" font-size="8" fill="#475569">Ethernet (wired) and WiFi (wireless) are most common LAN technologies</text>
  </svg>
</div>

<h3 class="learn-subheading">Network Topologies</h3>

<ul class="learn-list">
  <li><strong>Bus topology:</strong> Single cable connects all devices — simple, cheap, but single point of failure; performance degrades with more devices</li>
  <li><strong>Star topology:</strong> Devices connect to central switch/hub — most common; easy to add devices; if one cable fails, only that device affected; central switch is single point of failure</li>
  <li><strong>Ring topology:</strong> Devices connected in closed loop — data travels in one direction; failure of one device or cable breaks the ring</li>
  <li><strong>Mesh topology:</strong> Every device connects to every other — highly redundant, fault-tolerant; expensive, complex wiring (used in backbone networks)</li>
  <li><strong>Tree/Hybrid topology:</strong> Combination of star and bus — hierarchical; used in larger networks (university campus)</li>
</ul>

<h3 class="learn-subheading">Network Devices</h3>

<ul class="learn-list">
  <li><strong>Modem:</strong> Modulates/demodulates signals between ISP and home network — connects to internet</li>
  <li><strong>Router:</strong> Connects different networks; routes data between them; provides WiFi, NAT, firewall</li>
  <li><strong>Switch:</strong> Connects devices within same network (LAN) — learns MAC addresses, forwards data only to intended recipient</li>
  <li><strong>Hub:</strong> Older technology — broadcasts data to all ports (inefficient, collisions)</li>
  <li><strong>Access Point (AP):</strong> Provides wireless connectivity (WiFi) to devices</li>
  <li><strong>NIC (Network Interface Card):</strong> Hardware connecting computer to network (Ethernet port, WiFi adapter)</li>
  <li><strong>Firewall:</strong> Monitors and controls incoming/outgoing network traffic based on security rules</li>
</ul>

<h3 class="learn-subheading">The OSI Model (7 Layers)</h3>

<p class="learn-p">The OSI (Open Systems Interconnection) model standardizes network communication:</p>
<ul class="learn-list">
  <li><strong>Layer 7 - Application:</strong> User applications (HTTP, FTP, SMTP)</li>
  <li><strong>Layer 6 - Presentation:</strong> Data formatting, encryption, compression</li>
  <li><strong>Layer 5 - Session:</strong> Establishes, manages, terminates connections</li>
  <li><strong>Layer 4 - Transport:</strong> Reliable data transfer (TCP, UDP)</li>
  <li><strong>Layer 3 - Network:</strong> Routing, IP addressing (IP, routers)</li>
  <li><strong>Layer 2 - Data Link:</strong> Error detection, MAC addressing (Ethernet, switches)</li>
  <li><strong>Layer 1 - Physical:</strong> Physical medium (cables, signals, hubs)</li>
</ul>

<h3 class="learn-subheading">IP Addressing</h3>

<p class="learn-p"><strong>IPv4:</strong> 32-bit addresses (4 numbers, 0-255 each) — e.g., 192.168.1.1. About 4.3 billion addresses — exhausted!</p>
<p class="learn-p"><strong>IPv6:</strong> 128-bit addresses (hexadecimal) — 340 undecillion addresses — solves address shortage.</p>
<p class="learn-p"><strong>Public vs Private IPs:</strong> Private IPs (192.168.x.x, 10.x.x.x, 172.16-31.x.x) are for internal networks; NAT translates private to public for internet access.</p>

<h3 class="learn-subheading">Nigerian Internet Landscape</h3>

<p class="learn-p">Major ISPs: MTN Nigeria, Glo, Airtel, 9mobile, Spectranet, FibreOne. Undersea cables connecting Nigeria to global internet: SAT-3/WASC, WACS, MainOne, Glo-1, ACE (Africa Coast to Europe).</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Memory Aid for OSI Layers:</strong> "Please Do Not Throw Sausage Pizza Away" — Physical, Data Link, Network, Transport, Session, Presentation, Application.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Tip:</strong> Router connects different networks (Layer 3). Switch connects devices within same network (Layer 2). Hub is older Layer 1 device.</span>
</div>
    `,
    questions: [
      { q: "Which network type covers a city-wide area?", o: ["LAN", "MAN (Metropolitan Area Network)", "WAN", "PAN"], a: 1, e: "MAN covers a city — larger than LAN, smaller than WAN.", h: "What covers a city?", yr: "GST" },
      { q: "The internet is the largest example of which network type?", o: ["LAN", "MAN", "WAN", "PAN"], a: 2, e: "The internet is a global Wide Area Network (WAN) — the largest network.", h: "What type is the internet?", yr: "GST" },
      { q: "Which network topology uses a central switch or hub?", o: ["Bus", "Star", "Ring", "Mesh"], a: 1, e: "Star topology has central switch/hub — all devices connect to it. Most common in home/office networks.", h: "What topology has a central device?", yr: "GST" },
      { q: "A router operates at which OSI layer?", o: ["Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 7 (Application)"], a: 2, e: "Routers operate at Network Layer (Layer 3) — they route packets based on IP addresses.", h: "What OSI layer do routers work at?", yr: "GST" },
      { q: "IPv4 addresses are how many bits?", o: ["16 bits", "32 bits", "64 bits", "128 bits"], a: 1, e: "IPv4 uses 32-bit addresses (4 numbers 0-255) — about 4.3 billion addresses.", h: "How many bits in IPv4?", yr: "GST" },
      { q: "Which protocol is used for web browsing (HTTP/HTTPS)?", o: ["FTP", "SMTP", "HTTP/HTTPS", "DNS"], a: 2, e: "HTTP (Hypertext Transfer Protocol) and HTTPS (secure) are used for web browsing.", h: "What protocol for web?", yr: "GST" },
      { q: "A switch operates at which OSI layer?", o: ["Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)"], a: 1, e: "Switches operate at Data Link Layer (Layer 2) — forward frames based on MAC addresses.", h: "What OSI layer do switches work at?", yr: "GST" },
      { q: "Which of the following is a private IP address range?", o: ["8.8.8.8", "192.168.1.1", "1.1.1.1", "9.9.9.9"], a: 1, e: "192.168.x.x is private IP range (internal networks). 8.8.8.8 is Google DNS (public).", h: "What is a private IP?", yr: "GST" },
      { q: "The OSI model has how many layers?", o: ["4", "5", "7", "9"], a: 2, e: "OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.", h: "How many OSI layers?", yr: "GST" },
      { q: "Which Nigerian undersea cable connects Nigeria to Europe?", o: ["SAT-3/WASC", "MainOne", "Glo-1", "All of the above"], a: 3, e: "Multiple cables: SAT-3/WASC, WACS, MainOne, Glo-1, ACE connect Nigeria to global internet.", h: "Which cables connect Nigeria?", yr: "GST" },
      { q: "FTP is a protocol used for:", o: ["Web browsing", "Email", "File transfer", "DNS lookup"], a: 2, e: "FTP (File Transfer Protocol) transfers files between computers.", h: "What does FTP do?", yr: "GST" },
      { q: "MAC addresses operate at which OSI layer?", o: ["Layer 1", "Layer 2 (Data Link)", "Layer 3", "Layer 4"], a: 1, e: "MAC (Media Access Control) addresses operate at Data Link Layer (Layer 2) — unique to each network interface.", h: "What layer uses MAC addresses?", yr: "GST" },
      { q: "A modem converts:", o: ["Digital to digital", "Analog to digital and digital to analog", "Only digital to analog", "Only analog to digital"], a: 1, e: "Modem modulates (digital→analog) for transmission and demodulates (analog→digital) for reception.", h: "What does modem do?", yr: "GST" },
      { q: "DNS (Domain Name System) translates:", o: ["IP to MAC address", "Domain names (www.google.com) to IP addresses", "MAC to IP address", "Email addresses to IP"], a: 1, e: "DNS converts human-readable domain names (google.com) to IP addresses (142.250.190.46).", h: "What does DNS translate?", yr: "GST" },
      { q: "IPv6 uses how many bits?", o: ["32 bits", "64 bits", "128 bits", "256 bits"], a: 2, e: "IPv6 uses 128-bit addresses — supports 340 undecillion addresses, solving IPv4 shortage.", h: "How many bits in IPv6?", yr: "GST" },
      { q: "TCP (Transmission Control Protocol) provides:", o: ["Connectionless, unreliable transmission", "Connection-oriented, reliable transmission", "No error checking", "Only for web browsing"], a: 1, e: "TCP is connection-oriented, reliable — ensures data arrives complete and in order.", h: "What does TCP provide?", yr: "GST" },
      { q: "UDP is used when:", o: ["Reliability is critical", "Speed is more important than reliability (streaming, gaming, VoIP)", "Error correction needed", "Connection is required"], a: 1, e: "UDP is faster but unreliable — used for streaming, gaming, VoIP where speed matters more than perfect delivery.", h: "When is UDP used?", yr: "GST" },
      { q: "Which device connects different networks and directs traffic?", o: ["Switch", "Hub", "Router", "Modem"], a: 2, e: "Router connects different networks (LAN to WAN) and routes packets based on IP addresses.", h: "What connects different networks?", yr: "GST" },
      { q: "A hub operates at which OSI layer?", o: ["Layer 1 (Physical — just repeats signals)", "Layer 2", "Layer 3", "Layer 4"], a: 0, e: "Hub is a Layer 1 device — simply repeats incoming signals to all ports (broadcasts).", h: "What layer does hub work at?", yr: "GST" },
      { q: "NAT (Network Address Translation) allows:", o: ["Multiple devices on private network to share one public IP", "Faster internet", "No security", "IPv6 to IPv4 conversion"], a: 0, e: "NAT translates private IP addresses to public IP, allowing multiple devices to share one public IP for internet access.", h: "What does NAT do?", yr: "GST" }
    ]
  },

  // ============================================================================
// INTRODUCTION TO COMPUTING — PART 3 OF 3 (CLEAN - NO INLINE STYLES)
// Continuing GST_LEARN_GST_COMPUTING array from Part 2
// TOPICS 7, 8, 9, 10
// ============================================================================

  // ==========================================================================
  // TOPIC 7: The World Wide Web and Web Technologies
  // ==========================================================================
  {
    topic: "The World Wide Web and Web Technologies",
    topicCode: "CSC-007-01",
    module: "Web Technologies",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">The World Wide Web (WWW)</span> is a system of interlinked hypertext documents accessed via the internet. Invented by Tim Berners-Lee at CERN in 1989, the Web transformed the internet from a research tool into a global information space. <strong>Understanding how the Web works is essential in today's digital world</strong>.
</div>

<p class="learn-p">The Web is often confused with the internet, but they are different: the internet is the network infrastructure; the Web is a service that runs on the internet (like email, FTP, VoIP).</p>

<h3 class="learn-subheading">How the Web Works — Client-Server Model</h3>

<p class="learn-p">When you visit a website, your browser (client) requests pages from a web server, which responds with HTML, CSS, JavaScript, images, and other resources.</p>

<p class="learn-p"><strong>HTTP request-response cycle:</strong> Browser sends HTTP request → Server processes → Server sends HTTP response → Browser renders page.</p>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Component</th><th>Description</th><th>Examples</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Web Browser (Client)</th>。<th>Requests and displays web pages</th>。<th>Chrome, Firefox, Safari, Edge, Brave</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Web Server</th>。<th>Stores and delivers web pages</th>。<th>Apache, Nginx, IIS</th>
      </tr>
      <td><td style="background:#f0fdf4;">HTML</th>。<th>Structure of web pages</th>。<th>&lt;html&gt;, &lt;head&gt;, &lt;body&gt;, &lt;div&gt;, &lt;p&gt;</th>
      </tr>
      <tr><td style="background:#f0fdf4;">CSS</th>。<th>Styling and layout</th>。<th>Colors, fonts, spacing, responsive design</th>
      </td>
      <tr><td style="background:#f0fdf4;">JavaScript</th>。<th>Interactivity and dynamic behavior</th>。<th>Form validation, animations, API calls</th>
      </tr>
    </tbody>
  </table>
</div>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="180" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🌐 CLIENT-SERVER MODEL</text>
    
    <g>
      <rect x="15" y="45" width="140" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text x="85" y="65" text-anchor="middle" font-size="10" fill="#1e3a8a" font-weight="800">CLIENT</text>
      <text x="85" y="82" text-anchor="middle" font-size="8" fill="#1e3a8a">Web Browser</text>
      <text x="85" y="95" text-anchor="middle" font-size="7" fill="#1e3a8a">Requests web page</text>
    </g>
    
    <line x1="155" y1="75" x2="200" y2="75" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowWeb1)"/>
    <line x1="200" y1="90" x2="155" y2="90" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrowWeb2)"/>
    
    <text x="178" y="70" text-anchor="middle" font-size="7" fill="#3b82f6">HTTP Request</text>
    <text x="178" y="98" text-anchor="middle" font-size="7" fill="#f59e0b">HTTP Response</text>
    
    <g>
      <rect x="200" y="45" width="200" height="60" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <text x="300" y="65" text-anchor="middle" font-size="10" fill="#166534" font-weight="800">SERVER</text>
      <text x="300" y="82" text-anchor="middle" font-size="8" fill="#166534">Web Server</text>
      <text x="300" y="95" text-anchor="middle" font-size="7" fill="#166534">Sends HTML, CSS, JS</text>
    </g>
    
    <defs>
      <marker id="arrowWeb1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6"/>
      </marker>
      <marker id="arrowWeb2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b"/>
      </marker>
    </defs>
    
    <text x="250" y="140" text-anchor="middle" font-size="9" fill="#475569">HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the Web</text>
    <text x="250" y="158" text-anchor="middle" font-size="8" fill="#64748b">HTTPS adds encryption (SSL/TLS) for security</text>
  </svg>
</div>

<h3 class="learn-subheading">URLs and Domain Names</h3>

<p class="learn-p">A URL (Uniform Resource Locator) is the address of a web page:</p>
<p class="learn-p"><strong>Structure:</strong> protocol://domain/path?query#fragment</p>
<p class="learn-p">Example: https://www.google.com/search?q=computers#results</p>
<ul class="learn-list">
  <li><strong>Protocol:</strong> https:// (HTTP or HTTPS)</li>
  <li><strong>Domain:</strong> www.google.com</li>
  <li><strong>Path:</strong> /search</li>
  <li><strong>Query:</strong> ?q=computers</li>
  <li><strong>Fragment:</strong> #results</li>
</ul>

<p class="learn-p">Domain names are organized hierarchically: TLD (top-level domain: .com, .org, .ng, .edu) → Domain (google) → Subdomain (www, mail, drive).</p>

<h3 class="learn-subheading">Web Development Technologies</h3>

<p class="learn-p"><strong>Front-End (Client-Side):</strong> What users see and interact with — HTML (structure), CSS (styling), JavaScript (interactivity). Frameworks: React, Angular, Vue, Bootstrap.</p>

<p class="learn-subheading">Web Hosting</p>

<p class="learn-p">Web hosting services store website files and make them accessible online. Types: Shared (cheapest, other sites share server), VPS (virtual private server), Dedicated (entire server for one site), Cloud (scalable, pay-as-you-go), Managed WordPress.</p>

<p class="learn-subheading">Cloud Computing</p>

<p class="learn-p">Cloud computing delivers computing services (servers, storage, databases, networking, software) over the internet.</p>

<p class="learn-p"><strong>Service models:</strong> IaaS (Infrastructure as a Service — AWS EC2, Google Compute), PaaS (Platform as a Service — Google App Engine, Heroku), SaaS (Software as a Service — Gmail, Google Drive, Office 365).</p>

<p class="learn-p"><strong>Deployment models:</strong> Public cloud (AWS, Azure, Google Cloud), Private cloud (for single organization), Hybrid cloud (combination).</p>

<h3 class="learn-subheading">Nigerian Internet Landscape</h3>

<p class="learn-p">Major ISPs: MTN Nigeria, Glo, Airtel, 9mobile, Spectranet, FibreOne. Undersea cables: SAT-3/WASC, WACS, MainOne, Glo-1, ACE (Africa Coast to Europe) connect Nigeria to global internet.</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Key Distinction:</strong> Internet = network infrastructure. World Wide Web = information system (websites, links). Email, FTP, VoIP are other internet services — not part of the Web.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Tip:</strong> HTTPS is HTTP with encryption (SSL/TLS) — secure version for sensitive data (passwords, credit cards, personal info). Look for padlock icon in browser.</span>
</div>
    `,
    questions: [
      { q: "Who invented the World Wide Web?", o: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Mark Zuckerberg"], a: 2, e: "Tim Berners-Lee invented the WWW at CERN in 1989, creating HTML, HTTP, and the first web browser.", h: "Who invented the Web?", yr: "GST" },
      { q: "HTML stands for:", o: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], a: 0, e: "HTML (Hypertext Markup Language) is the standard language for creating web pages.", h: "What does HTML stand for?", yr: "GST" },
      { q: "CSS is used for:", o: ["Structure of web pages", "Styling and layout of web pages", "Server-side programming", "Database management"], a: 1, e: "CSS (Cascading Style Sheets) controls colors, fonts, spacing, layout, and responsive design.", h: "What does CSS do?", yr: "GST" },
      { q: "JavaScript is primarily used for:", o: ["Styling web pages", "Structure of web pages", "Interactivity and dynamic behavior", "Database storage"], a: 2, e: "JavaScript adds interactivity: form validation, animations, API calls, dynamic content updates.", h: "What does JavaScript do?", yr: "GST" },
      { q: "HTTP stands for:", o: ["Hyper Text Transfer Protocol", "High Tech Transfer Protocol", "Hyper Text Transmission Protocol", "Home Transfer Protocol"], a: 0, e: "HTTP is the protocol for transferring web pages from server to browser.", h: "What does HTTP stand for?", yr: "GST" },
      { q: "A domain name (e.g., google.com) is converted to an IP address by:", o: ["HTTP", "DNS (Domain Name System)", "HTML", "CSS"], a: 1, e: "DNS translates human-readable domain names (google.com) to IP addresses (142.250.190.46).", h: "What translates domain to IP?", yr: "GST" },
      { q: "Cloud computing service model where you rent virtual machines (servers) is:", o: ["SaaS", "PaaS", "IaaS", "DaaS"], a: 2, e: "IaaS (Infrastructure as a Service) provides virtual servers, storage, networking — you control OS and applications.", h: "What is IaaS?", yr: "GST" },
      { q: "HTTPS adds which security feature to HTTP?", o: ["Firewall", "Antivirus", "Encryption (SSL/TLS)", "Password protection"], a: 2, e: "HTTPS encrypts data between browser and server using SSL/TLS — protects passwords, credit cards from interception.", h: "What does HTTPS add?", yr: "GST" },
      { q: "A web browser is an example of:", o: ["Server software", "Client software", "Database software", "Operating system"], a: 1, e: "Web browser (Chrome, Firefox) is client software — it requests and displays pages from servers.", h: "Is browser client or server?", yr: "GST" },
      { q: "Which of the following is a front-end JavaScript framework?", o: ["Node.js", "React", "Django", "Laravel"], a: 1, e: "React is front-end JavaScript library (client-side). Node.js, Django, Laravel are back-end.", h: "What is React?", yr: "GST" },
      { q: "A URL consists of:", o: ["Protocol, domain, path, query, fragment", "Only domain name", "Only protocol", "Only file name"], a: 0, e: "Full URL: protocol://domain/path?query#fragment — e.g., https://www.google.com/search?q=test#results", h: "What parts make a URL?", yr: "GST" },
      { q: "Which undersea cable connects Nigeria to Europe?", o: ["SAT-3/WASC", "MainOne", "Glo-1", "All of the above"], a: 3, e: "Multiple cables: SAT-3/WASC, WACS, MainOne, Glo-1, ACE connect Nigeria to global internet.", h: "Which cables connect Nigeria?", yr: "GST" },
      { q: "A web server stores and delivers:", o: ["Email messages", "Web pages (HTML, CSS, JS, images)", "Database records", "Video files only"], a: 1, e: "Web servers store HTML, CSS, JavaScript, images, videos and deliver them to browsers.", h: "What does web server deliver?", yr: "GST" },
      { q: "Google Drive is an example of:", o: ["IaaS", "PaaS", "SaaS (Software as a Service)", "DaaS"], a: 2, e: "SaaS provides ready-to-use software over internet — Google Drive, Gmail, Office 365.", h: "What is SaaS?", yr: "GST" },
      { q: "The difference between internet and WWW is:", o: ["Same thing", "Internet is network infrastructure; WWW is service (websites) on internet", "WWW is older", "Internet is newer"], a: 1, e: "Internet = physical network of computers. WWW = information system (websites) that runs on the internet.", h: "What is the difference?", yr: "GST" },
      { q: "Which of the following is a web browser?", o: ["Google Chrome", "Google Search", "Google Drive", "Google Docs"], a: 0, e: "Chrome is web browser. Google Search is search engine; Drive and Docs are web applications.", h: "What is a browser?", yr: "GST" },
      { q: "The client-server model in web involves:", o: ["Browser (client) requests; Server responds", "Server requests; Browser responds", "Peer-to-peer only", "No client-server"], a: 0, e: "Browser sends HTTP request; web server sends HTTP response with HTML/CSS/JS.", h: "How does client-server work?", yr: "GST" },
      { q: "Which protocol is used for secure web browsing?", o: ["HTTP", "FTP", "HTTPS", "SMTP"], a: 2, e: "HTTPS (HTTP Secure) encrypts communication using SSL/TLS — for secure transactions, logins.", h: "What is secure web protocol?", yr: "GST" },
      { q: "A subdomain is part of a larger domain. Example:", o: ["google.com", "mail.google.com (mail is subdomain)", ".com", "https://"], a: 1, e: "Subdomain comes before main domain — mail.google.com (mail subdomain), drive.google.com (drive subdomain).", h: "What is a subdomain?", yr: "GST" },
      { q: "Web hosting types include all EXCEPT:", o: ["Shared hosting", "VPS hosting", "Dedicated hosting", "Localhost only (your own computer — not hosting service)"], a: 3, e: "Web hosting services (shared, VPS, dedicated, cloud) store websites accessible online.", h: "What is NOT a hosting type?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 8: Database Management Systems
  // ==========================================================================
  {
    topic: "Database Management Systems",
    topicCode: "CSC-008-01",
    module: "Databases",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">A database</span> is an organized collection of structured data. A Database Management System (DBMS) is software that creates, manages, and interacts with databases. <strong>Databases power everything from banking systems to social media to airline reservations</strong>.
</div>

<p class="learn-p">Without databases, applications would struggle to store, retrieve, and manage large amounts of data efficiently. Databases ensure data integrity, security, and concurrent access.</p>

<h3 class="learn-subheading">Database Terminology</h3>

<ul class="learn-list">
  <li><strong>Data:</strong> Raw facts and figures</li>
  <li><strong>Field:</strong> Single piece of data (column) — e.g., Name, Age, StudentID</li>
  <li><strong>Record:</strong> Complete set of fields about one entity (row) — e.g., one student's information</li>
  <li><strong>Table:</strong> Collection of related records</li>
  <li><strong>Database:</strong> Collection of related tables</li>
  <li><strong>DBMS:</strong> Software managing the database (MySQL, PostgreSQL, Oracle)</li>
  <li><strong>Primary Key:</strong> Unique identifier for each record (StudentID, NationalID)</li>
  <li><strong>Foreign Key:</strong> Field linking to primary key in another table (establishes relationships)</li>
</ul>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="180" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🗄️ DATABASE RELATIONSHIPS</text>
    
    <g>
      <rect x="15" y="45" width="220" height="120" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="125" y="65" text-anchor="middle" font-size="9" fill="#1e3a8a" font-weight="800">STUDENTS Table</text>
      <text x="125" y="85" text-anchor="middle" font-size="7" fill="#1e3a8a">StudentID (Primary Key)</text>
      <text x="125" y="100" text-anchor="middle" font-size="7" fill="#1e3a8a">Name</text>
      <text x="125" y="115" text-anchor="middle" font-size="7" fill="#1e3a8a">Email</text>
      <text x="125" y="130" text-anchor="middle" font-size="7" fill="#1e3a8a">DepartmentID (Foreign Key)</text>
    </g>
    
    <g>
      <rect x="265" y="45" width="220" height="120" rx="6" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
      <text x="375" y="65" text-anchor="middle" font-size="9" fill="#166534" font-weight="800">DEPARTMENTS Table</text>
      <text x="375" y="85" text-anchor="middle" font-size="7" fill="#166534">DepartmentID (Primary Key)</text>
      <text x="375" y="100" text-anchor="middle" font-size="7" fill="#166534">DepartmentName</text>
      <text x="375" y="115" text-anchor="middle" font-size="7" fill="#166534">Faculty</text>
      <text x="375" y="130" text-anchor="middle" font-size="7" fill="#166534">HeadOfDepartment</text>
    </g>
    
    <line x1="235" y1="105" x2="265" y2="105" stroke="#f59e0b" stroke-width="2"/>
    <text x="250" y="100" text-anchor="middle" font-size="8" fill="#f59e0b">↔</text>
  </svg>
</div>

<h3 class="learn-subheading">The Relational Database Model</h3>

<p class="learn-p">The relational model organizes data into tables (relations) with rows (tuples) and columns (attributes).</p>

<p class="learn-p"><strong>Relationships:</strong></p>
<ul class="learn-list">
  <li><strong>One-to-one (1:1):</strong> One record in Table A matches one record in Table B (person → passport)</li>
  <li><strong>One-to-many (1:M):</strong> One record in Table A matches many records in Table B (department → students)</li>
  <li><strong>Many-to-many (M:N):</strong> Many records in Table A match many in Table B (students → courses) — requires junction table</li>
</ul>

<h3 class="learn-subheading">Normalization</h3>

<p class="learn-p">Normalization organizes data to reduce redundancy and avoid anomalies. Normal forms: 1NF (no repeating groups), 2NF (no partial dependency), 3NF (no transitive dependency).</p>

<h3 class="learn-subheading">SQL (Structured Query Language)</h3>

<p class="learn-p">SQL is the standard language for relational databases.</p>

<p class="learn-p"><strong>DDL (Data Definition Language):</strong> CREATE, ALTER, DROP — defines database structure.</p>
<p class="learn-p"><strong>DML (Data Manipulation Language):</strong> SELECT, INSERT, UPDATE, DELETE — manipulates data.</p>

<p class="learn-p"><strong>Basic SQL examples:</strong></p>
<ul class="learn-list">
  <li>CREATE TABLE Students (StudentID INT PRIMARY KEY, Name VARCHAR(50), Age INT);</li>
  <li>INSERT INTO Students VALUES (101, 'Adekunle', 20);</li>
  <li>SELECT * FROM Students WHERE Age > 18;</li>
  <li>UPDATE Students SET Age = 21 WHERE StudentID = 101;</li>
  <li>DELETE FROM Students WHERE StudentID = 101;</li>
</ul>

<p class="learn-p"><strong>SQL clauses and joins:</strong> ORDER BY (sort), GROUP BY (group rows), WHERE (filter), JOIN (combine tables — INNER JOIN, LEFT JOIN, RIGHT JOIN).</p>

<p class="learn-p"><strong>Aggregate functions:</strong> COUNT(), SUM(), AVG(), MAX(), MIN().</p>

<h3 class="learn-subheading">NoSQL Databases</h3>

<p class="learn-p">NoSQL databases handle unstructured or semi-structured data, high scalability. Types: Document stores (MongoDB), Key-value stores (Redis), Column-family (Cassandra), Graph (Neo4j).</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>SQL Example:</strong> "SELECT Name, Age FROM Students WHERE Age > 18 ORDER BY Name" — selects names and ages of students over 18, sorted by name.</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Tip:</strong> Primary Key uniquely identifies each record (cannot be NULL). Foreign Key links to Primary Key in another table (establishes relationships).</span>
</div>
    `,
    questions: [
      { q: "A primary key is:", o: ["Any column in a table", "Unique identifier for each record (no duplicates, not NULL)", "Foreign key reference", "Index only"], a: 1, e: "Primary key uniquely identifies each row — cannot be NULL or duplicate.", h: "What is primary key?", yr: "GST" },
      { q: "SQL stands for:", o: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Sequential Query Language"], a: 0, e: "SQL is the standard language for managing relational databases.", h: "What does SQL stand for?", yr: "GST" },
      { q: "Which SQL statement retrieves data from a database?", o: ["INSERT", "UPDATE", "SELECT", "DELETE"], a: 2, e: "SELECT retrieves data from tables. INSERT adds, UPDATE modifies, DELETE removes.", h: "What retrieves data?", yr: "GST" },
      { q: "A foreign key is:", o: ["Primary key of same table", "Column that references primary key in another table", "Unique index", "Auto-increment field"], a: 1, e: "Foreign key links tables — value must match primary key value in referenced table.", h: "What is foreign key?", yr: "GST" },
      { q: "Which relationship means one department has many students?", o: ["One-to-one", "One-to-many", "Many-to-many", "No relationship"], a: 1, e: "One-to-many: one department (one) → many students (many).", h: "What relationship is department to students?", yr: "GST" },
      { q: "Normalization reduces:", o: ["Data redundancy and anomalies", "Data security", "Data access speed", "Database size"], a: 0, e: "Normalization organizes data to reduce redundancy (duplication) and avoid update/insert/delete anomalies.", h: "What does normalization reduce?", yr: "GST" },
      { q: "Which SQL clause filters rows based on condition?", o: ["ORDER BY", "GROUP BY", "WHERE", "JOIN"], a: 2, e: "WHERE filters rows — e.g., SELECT * FROM Students WHERE Age > 18.", h: "What clause filters rows?", yr: "GST" },
      { q: "MongoDB is an example of which type of database?", o: ["Relational (SQL)", "Document store (NoSQL)", "Key-value store", "Graph database"], a: 1, e: "MongoDB is a document store NoSQL database — stores JSON-like documents.", h: "What type is MongoDB?", yr: "GST" },
      { q: "Which SQL keyword sorts results?", o: ["WHERE", "GROUP BY", "ORDER BY", "HAVING"], a: 2, e: "ORDER BY sorts results — ASC (ascending, default) or DESC (descending).", h: "What sorts results?", yr: "GST" },
      { q: "A table is also called a:", o: ["Field", "Record", "Relation", "Query"], a: 2, e: "In relational model, table = relation. Row = tuple, column = attribute.", h: "What is another name for table?", yr: "GST" },
      { q: "Which SQL statement adds new records to a table?", o: ["SELECT", "UPDATE", "INSERT", "CREATE"], a: 2, e: "INSERT INTO adds new rows (records) to a table.", h: "What adds new records?", yr: "GST" },
      { q: "COUNT() is an example of:", o: ["SQL clause", "Aggregate function", "Data type", "Constraint"], a: 1, e: "Aggregate functions perform calculations on sets of rows: COUNT, SUM, AVG, MAX, MIN.", h: "What type of function is COUNT?", yr: "GST" },
      { q: "INNER JOIN returns:", o: ["All rows from left table", "All rows from right table", "Rows with matching values in both tables", "All rows from both tables"], a: 2, e: "INNER JOIN returns only rows where there is a match in both joined tables.", h: "What does INNER JOIN return?", yr: "GST" },
      { q: "Redis is an example of which NoSQL type?", o: ["Document store", "Key-value store", "Column-family", "Graph"], a: 1, e: "Redis is key-value store — stores data as key-value pairs, very fast.", h: "What type is Redis?", yr: "GST" },
      { q: "Which SQL statement removes a table from database?", o: ["DELETE", "DROP", "REMOVE", "TRUNCATE"], a: 1, e: "DROP TABLE removes table structure and data. DELETE removes rows (keeps table).", h: "What removes entire table?", yr: "GST" },
      { q: "Many-to-many relationship requires:", o: ["Single table", "Two tables", "Three tables (junction/associative table)", "No tables"], a: 2, e: "Many-to-many uses a junction table containing foreign keys from both related tables.", h: "What does many-to-many need?", yr: "GST" },
      { q: "DBMS stands for:", o: ["Database Management System", "Data Backup Management System", "Database Memory System", "Digital Base Management System"], a: 0, e: "DBMS is software for creating, managing, and interacting with databases.", h: "What does DBMS stand for?", yr: "GST" },
      { q: "Which SQL function returns the average of a numeric column?", o: ["SUM()", "COUNT()", "AVG()", "MAX()"], a: 2, e: "AVG() returns average (mean) of values in a column.", h: "What returns average?", yr: "GST" },
      { q: "A record in a table is also called a:", o: ["Field", "Column", "Row (tuple)", "Key"], a: 2, e: "Record = row = tuple — complete set of fields about one entity.", h: "What is a record also called?", yr: "GST" },
      { q: "Cassandra is an example of which NoSQL type?", o: ["Document store", "Key-value store", "Column-family store", "Graph database"], a: 2, e: "Cassandra is column-family NoSQL database — designed for high scalability, used by large companies.", h: "What type is Cassandra?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 9: Computer Security and Ethics
  // ==========================================================================
  {
    topic: "Computer Security and Ethics",
    topicCode: "CSC-009-01",
    module: "Security and Ethics",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Computer security</span> protects computer systems, networks, and data from unauthorized access, theft, damage, or disruption. Cybercrime is growing globally and in Nigeria. <strong>Understanding security threats and ethical computing practices is essential for protecting yourself and others</strong>.
</div>

<p class="learn-p">The CIA triad (Confidentiality, Integrity, Availability) is the foundation of computer security. Security measures protect against malware, hacking, social engineering, and other threats.</p>

<h3 class="learn-subheading">The CIA Triad</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead>
      <tr><th>Principle</th><th>Description</th><th>Example</th>
    </thead>
    <tbody>
      <tr><td style="background:#f0fdf4;">Confidentiality</th>。<th>Ensuring data is accessible only to authorized users</th>。<th>Encryption, passwords, access controls</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Integrity</th>。<th>Ensuring data is accurate and unaltered</th>。<th>Checksums, version control, audit logs</th>
      </tr>
      <tr><td style="background:#f0fdf4;">Availability</th>。<th>Ensuring systems and data are accessible when needed</th>。<th>Backups, redundancy, disaster recovery</th>
      </tr>
    </tbody>
  </table>
</div>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🛡️ TYPES OF MALWARE</text>
    
    <g>
      <rect x="15" y="45" width="110" height="40" rx="5" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
      <text x="70" y="63" text-anchor="middle" font-size="8" fill="#991b1b" font-weight="800">VIRUS</text>
      <text x="70" y="78" text-anchor="middle" font-size="6" fill="#991b1b">Attaches to files</text>
    </g>
    
    <g>
      <rect x="135" y="45" width="110" height="40" rx="5" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="190" y="63" text-anchor="middle" font-size="8" fill="#92400e" font-weight="800">WORM</text>
      <text x="190" y="78" text-anchor="middle" font-size="6" fill="#92400e">Self-replicates</text>
    </g>
    
    <g>
      <rect x="255" y="45" width="110" height="40" rx="5" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="310" y="63" text-anchor="middle" font-size="8" fill="#1e3a8a" font-weight="800">TROJAN</text>
      <text x="310" y="78" text-anchor="middle" font-size="6" fill="#1e3a8a">Disguised as legit</text>
    </g>
    
    <g>
      <rect x="375" y="45" width="110" height="40" rx="5" fill="#fce7f3" stroke="#ec4899" stroke-width="1.5"/>
      <text x="430" y="63" text-anchor="middle" font-size="8" fill="#831843" font-weight="800">RANSOMWARE</text>
      <text x="430" y="78" text-anchor="middle" font-size="6" fill="#831843">Encrypts data for ransom</text>
    </g>
    
    <text x="250" y="120" text-anchor="middle" font-size="9" fill="#475569">Malware (malicious software) is designed to harm computers or steal data</text>
    
    <rect x="50" y="140" width="400" height="45" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
    <text x="250" y="158" text-anchor="middle" font-size="8" fill="#475569">Keep software updated, use antivirus, avoid suspicious links/attachments</text>
    <text x="250" y="173" text-anchor="middle" font-size="8" fill="#475569">Back up important data regularly</text>
  </svg>
</div>

<h3 class="learn-subheading">Types of Malware</h3>

<ul class="learn-list">
  <li><strong>Virus:</strong> Attaches to legitimate files, spreads when executed — requires human action</li>
  <li><strong>Worm:</strong> Self-replicates across networks without human action — can spread rapidly</li>
  <li><strong>Trojan Horse:</strong> Disguised as legitimate software — trick users into installing</li>
  <li><strong>Ransomware:</strong> Encrypts data and demands ransom for decryption — WannaCry, Ryuk</li>
  <li><strong>Spyware:</strong> Secretly monitors user activity, steals data (passwords, browsing)</li>
  <li><strong>Adware:</strong> Displays unwanted advertisements</li>
  <li><strong>Rootkit:</strong> Hides deep in system, evades detection, gives attacker control</li>
  <li><strong>Keylogger:</strong> Records keystrokes to steal passwords, credit card numbers</li>
</ul>

<h3 class="learn-subheading">Network Attacks</h3>

<ul class="learn-list">
  <li><strong>Phishing:</strong> Fake emails/messages pretending to be legitimate to steal credentials</li>
  <li><strong>DoS/DDoS:</strong> Overwhelms server with traffic, making service unavailable</li>
  <li><strong>Man-in-the-middle (MITM):</strong> Attacker intercepts communication between two parties</li>
  <li><strong>Social engineering:</strong> Manipulating people to reveal confidential information</li>
</ul>

<h3 class="learn-subheading">Password Security</h3>

<ul class="learn-list">
  <li><strong>Strong password characteristics:</strong> Long (12+ characters), complex (uppercase, lowercase, numbers, symbols), unique (not reused across sites)</li>
  <li><strong>Two-Factor Authentication (2FA):</strong> Requires second factor (SMS code, authenticator app, biometric) — much more secure than password alone</li>
  <li><strong>Password managers:</strong> Generate and store strong unique passwords (Bitwarden, LastPass, 1Password)</li>
</ul>

<h3 class="learn-subheading">Encryption</h3>

<p class="learn-p">Encryption converts data into unreadable format (ciphertext). Decryption converts back.</p>
<ul class="learn-list">
  <li><strong>Symmetric encryption:</strong> Same key encrypts and decrypts (AES, DES) — fast, but key distribution problem</li>
  <li><strong>Asymmetric encryption:</strong> Public key encrypts, private key decrypts (RSA, ECC) — slower but no key sharing</li>
  <li><strong>Hashing:</strong> One-way function (cannot be reversed) — used for passwords, file integrity</li>
  <li><strong>SSL/TLS:</strong> Encrypts web traffic (HTTPS)</li>
  <li><strong>VPN:</strong> Encrypts all traffic between device and VPN server</li>
</ul>

<h3 class="learn-subheading">Backup and Disaster Recovery</h3>

<p class="learn-p">Backup types: Full (complete copy), Incremental (changes since last backup), Differential (changes since last full backup). 3-2-1 rule: 3 copies, 2 different media, 1 offsite.</p>

<h3 class="learn-subheading">Cybercrime Laws in Nigeria</h3>

<p class="learn-p">The Cybercrimes (Prohibition, Prevention, Etc.) Act 2015 criminalizes: hacking (unauthorized access), identity theft, cyberstalking, online fraud (419), child pornography, hate speech. Penalties include fines and imprisonment up to 15 years for serious offenses.</p>

<h3 class="learn-subheading">Computer Ethics</h3>

<p class="learn-p">Ethical principles for computing professionals: Avoid harming others, respect privacy, be honest and trustworthy, give credit where due (no plagiarism), use resources responsibly.</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>2FA Importance:</strong> Even if your password is stolen, attackers cannot log in without the second factor (SMS code, authenticator app, fingerprint).</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Tip:</strong> The Cybercrimes Act 2015 is Nigeria's primary cybercrime law. Penalties include imprisonment for hacking, identity theft, cyberstalking, and online fraud.</span>
</div>
    `,
    questions: [
      { q: "The CIA triad in computer security stands for:", o: ["Confidentiality, Integrity, Availability", "Central Intelligence Agency", "Confidentiality, Internet, Access", "Code, Integrity, Authentication"], a: 0, e: "CIA triad: Confidentiality (authorized access only), Integrity (data accuracy), Availability (accessible when needed).", h: "What does CIA stand for in security?", yr: "GST" },
      { q: "Which type of malware self-replicates across networks without human action?", o: ["Virus", "Worm", "Trojan", "Ransomware"], a: 1, e: "Worms self-replicate across networks automatically — no need to open files or click links.", h: "What spreads automatically?", yr: "GST" },
      { q: "Phishing is a type of:", o: ["Malware", "Social engineering attack (fake emails/messages tricking users)", "Virus", "Ransomware"], a: 1, e: "Phishing uses fake emails, texts, or websites pretending to be legitimate to steal credentials.", h: "What is phishing?", yr: "GST" },
      { q: "Two-Factor Authentication (2FA) adds:", o: ["A second password", "A second factor (SMS code, app, biometric) beyond password", "More complex password", "No security benefit"], a: 1, e: "2FA requires something you know (password) plus something you have (phone) or are (fingerprint).", h: "What does 2FA add?", yr: "GST" },
      { q: "Ransomware is malware that:", o: ["Steals passwords", "Encrypts data and demands ransom for decryption", "Displays ads", "Self-replicates"], a: 1, e: "Ransomware encrypts files, making them inaccessible until ransom (usually cryptocurrency) is paid.", h: "What does ransomware do?", yr: "GST" },
      { q: "The Cybercrimes Act 2015 is Nigeria's law against:", o: ["Traffic violations", "Online crimes (hacking, identity theft, cyberstalking, fraud)", "Tax evasion", "Environmental pollution"], a: 1, e: "Cybercrimes Act 2015 criminalizes hacking, identity theft, cyberstalking, online fraud, child pornography, hate speech.", h: "What does Cybercrimes Act cover?", yr: "GST" },
      { q: "A Trojan horse is malware that:", o: ["Self-replicates", "Attaches to files", "Disguises itself as legitimate software", "Encrypts data"], a: 2, e: "Trojan tricks users into installing by appearing legitimate — but has malicious payload.", h: "What disguises as legitimate?", yr: "GST" },
      { q: "Symmetric encryption uses:", o: ["One key (same for encrypt and decrypt)", "Two keys (public and private)", "No key", "Three keys"], a: 0, e: "Symmetric encryption uses same key for encryption and decryption — fast but key distribution problem.", h: "How many keys in symmetric?", yr: "GST" },
      { q: "A keylogger records:", o: ["Mouse movements", "Keystrokes (passwords, credit cards, messages)", "Network traffic", "Screen images"], a: 1, e: "Keylogger captures every keystroke — can steal passwords, credit card numbers, private messages.", h: "What does keylogger record?", yr: "GST" },
      { q: "Asymmetric encryption uses:", o: ["One key", "Two keys (public and private)", "No key", "Shared secret"], a: 1, e: "Asymmetric uses key pair: public key encrypts (shareable), private key decrypts (secret).", h: "How many keys in asymmetric?", yr: "GST" },
      { q: "DoS (Denial of Service) attack aims to:", o: ["Steal data", "Make service unavailable (overwhelm with traffic)", "Encrypt files", "Record keystrokes"], a: 1, e: "DoS/DDoS overwhelms server with requests, making website/service unavailable to legitimate users.", h: "What does DoS attack do?", yr: "GST" },
      { q: "A strong password should be:", o: ["Short and simple", "Long (12+ characters), complex, unique", "Same password for all sites", "Only numbers"], a: 1, e: "Strong password: long, mix of uppercase/lowercase/numbers/symbols, unique per site.", h: "What makes a strong password?", yr: "GST" },
      { q: "HTTPS uses which encryption protocol?", o: ["SSL/TLS", "AES only", "DES only", "No encryption"], a: 0, e: "HTTPS uses SSL/TLS certificates to encrypt web traffic between browser and server.", h: "What encrypts HTTPS?", yr: "GST" },
      { q: "Man-in-the-middle (MITM) attack involves:", o: ["Self-replicating malware", "Attacker intercepts communication between two parties", "Encrypting files", "Recording keystrokes"], a: 1, e: "MITM attacker secretly intercepts and may alter communication between two parties.", h: "What is MITM?", yr: "GST" },
      { q: "Spyware is designed to:", o: ["Display ads", "Secretly monitor user activity and steal data", "Encrypt files", "Self-replicate"], a: 1, e: "Spyware collects user information (browsing, passwords, personal data) without consent.", h: "What does spyware do?", yr: "GST" },
      { q: "The 3-2-1 backup rule means:", o: ["3 backups, 2 days, 1 location", "3 copies, 2 different media, 1 offsite", "3 years, 2 months, 1 week", "3 devices, 2 locations, 1 person"], a: 1, e: "3-2-1 rule: 3 copies of data, 2 different storage media, 1 copy stored offsite (cloud, remote location).", h: "What is 3-2-1 backup rule?", yr: "GST" },
      { q: "A firewall monitors and controls:", o: ["CPU usage", "Network traffic based on security rules", "Disk space", "RAM usage"], a: 1, e: "Firewall filters incoming/outgoing network traffic based on rules — blocks unauthorized access.", h: "What does firewall control?", yr: "GST" },
      { q: "Hashing is used for:", o: ["Encrypting messages", "Password storage and file integrity (one-way, cannot be reversed)", "Key exchange", "Network routing"], a: 1, e: "Hashing is one-way — cannot retrieve original data. Used for passwords (store hash, not password).", h: "What is hashing used for?", yr: "GST" },
      { q: "Computer ethics includes:", o: ["Hacking for fun", "Respecting privacy, giving credit, avoiding harm", "Sharing passwords", "Ignoring copyright"], a: 1, e: "Ethical computing: respect privacy, don't harm others, give credit, use resources responsibly.", h: "What is computer ethics?", yr: "GST" },
      { q: "A VPN (Virtual Private Network) provides:", o: ["Faster internet", "Encrypted tunnel for all traffic, hiding IP address", "Antivirus protection", "Password management"], a: 1, e: "VPN encrypts all traffic between device and VPN server — hides IP address, protects on public WiFi.", h: "What does VPN provide?", yr: "GST" }
    ]
  },

  // ==========================================================================
  // TOPIC 10: Emerging Technologies and Future Trends
  // ==========================================================================
  {
    topic: "Emerging Technologies and Future Trends",
    topicCode: "CSC-010-01",
    module: "Emerging Technologies",
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Emerging technologies</span> are transforming how we live, work, and interact. Artificial intelligence, blockchain, Internet of Things, and quantum computing promise revolutionary changes. <strong>Understanding these technologies prepares you for the future job market and society</strong>.
</div>

<p class="learn-p">Technologies evolve rapidly. What is cutting-edge today may be obsolete tomorrow. Staying informed about emerging trends is essential for career planning and informed citizenship.</p>

<h3 class="learn-subheading">Artificial Intelligence (AI)</h3>

<p class="learn-p">AI is the simulation of human intelligence in machines. Subfields: Machine Learning (ML), Deep Learning, Natural Language Processing (NLP), Computer Vision, Robotics.</p>

<p class="learn-p"><strong>Machine Learning types:</strong></p>
<ul class="learn-list">
  <li><strong>Supervised learning:</strong> Trained on labeled data (spam detection, image classification)</li>
  <li><strong>Unsupervised learning:</strong> Finds patterns in unlabeled data (customer segmentation, anomaly detection)</li>
  <li><strong>Reinforcement learning:</strong> Learns through trial and error, rewards (game playing, robotics)</li>
</ul>

<p class="learn-p"><strong>AI applications:</strong> Recommendation systems (Netflix, Amazon), spam filters, facial recognition, voice assistants (Siri, Alexa, Google Assistant), autonomous vehicles, medical diagnosis.</p>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="500" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="250" y="22" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="700">🤖 ARTIFICIAL INTELLIGENCE - Subfields</text>
    
    <g>
      <circle cx="100" cy="80" r="28" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
      <text x="100" y="78" text-anchor="middle" font-size="8" fill="#1e3a8a" font-weight="800">Machine</text>
      <text x="100" y="92" text-anchor="middle" font-size="8" fill="#1e3a8a" font-weight="800">Learning</text>
    </g>
    
    <g>
      <circle cx="190" cy="80" r="28" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
      <text x="190" y="78" text-anchor="middle" font-size="8" fill="#166534" font-weight="800">NLP</text>
    </g>
    
    <g>
      <circle cx="280" cy="80" r="28" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
      <text x="280" y="78" text-anchor="middle" font-size="8" fill="#92400e" font-weight="800">Computer</text>
      <text x="280" y="92" text-anchor="middle" font-size="8" fill="#92400e" font-weight="800">Vision</text>
    </g>
    
    <g>
      <circle cx="370" cy="80" r="28" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
      <text x="370" y="78" text-anchor="middle" font-size="8" fill="#831843" font-weight="800">Robotics</text>
    </g>
    
    <text x="250" y="145" text-anchor="middle" font-size="9" fill="#475569">AI systems learn from data, recognize patterns, make decisions</text>
    
    <rect x="50" y="160" width="400" height="30" rx="8" fill="#f1f5f9" stroke="#64748b" stroke-width="1"/>
    <text x="250" y="180" text-anchor="middle" font-size="8" fill="#475569">Nigerian AI startups: Data Science Nigeria, Awarri, Touchabl</text>
  </svg>
</div>

<h3 class="learn-subheading">Internet of Things (IoT)</h3>

<p class="learn-p">IoT connects everyday devices to the internet — smart home devices (thermostats, lights, locks), wearables (smartwatches, fitness trackers), industrial sensors, smart cities (traffic lights, waste management), healthcare (remote monitoring).</p>
<p class="learn-p">Challenges: Security (vulnerable devices), privacy (data collection), interoperability (different standards).</p>

<h3 class="learn-subheading">Blockchain and Cryptocurrencies</h3>

<p class="learn-p">Blockchain is a distributed, decentralized ledger that records transactions across many computers. Key features: Immutable (cannot be altered), Transparent (all transactions visible), Decentralized (no central authority).</p>
<p class="learn-p"><strong>Cryptocurrencies:</strong> Bitcoin (first, most valuable), Ethereum (smart contracts), others (Solana, Cardano, Ripple). Uses: Payments, remittances, investments, DeFi (decentralized finance).</p>
<p class="learn-p"><strong>Nigerian context:</strong> Nigeria has one of the highest cryptocurrency adoption rates globally (Chainalysis, 2023). CBN restricts banks from crypto transactions, but P2P trading thrives.</p>

<h3 class="learn-subheading">Cloud Computing</h3>

<p class="learn-p">Cloud computing delivers computing services over internet: IaaS (infrastructure), PaaS (platform), SaaS (software). Major providers: AWS, Microsoft Azure, Google Cloud, Alibaba Cloud. Nigerian cloud providers: Layer3, MainOne Cloud.</p>

<h3 class="learn-subheading">Big Data</h3>

<p class="learn-p">Big data is characterized by 5 Vs: Volume (huge amounts), Velocity (rapid generation), Variety (structured, unstructured, semi-structured), Veracity (uncertainty, quality issues), Value (extracting insights). Technologies: Hadoop, Spark, NoSQL databases. Applications: Business intelligence, healthcare analytics, fraud detection, scientific research.</p>

<h3 class="learn-subheading">Virtual Reality (VR) and Augmented Reality (AR)</h3>

<p class="learn-p">VR: Fully immersive digital environment (headset, controllers) — gaming, training, virtual tours. AR: Overlays digital information on real world (smartphone, glasses) — Pokémon GO, IKEA furniture placement, navigation overlays.</p>

<h3 class="learn-subheading">5G Technology</h3>

<p class="learn-p">5G offers: Higher speed (up to 10 Gbps), Lower latency (1 ms), More capacity (1 million devices/km²). Enables: IoT proliferation, autonomous vehicles, telemedicine, cloud gaming, smart factories.</p>

<h3 class="learn-subheading">Quantum Computing</h3>

<p class="learn-p">Quantum computers use qubits (quantum bits) that can be 0, 1, or superposition (both simultaneously). Potential applications: Drug discovery (molecular simulation), Cryptography (breaking current encryption), Optimization (logistics, finance), AI acceleration. Current state: Early stage, not yet practical for most applications.</p>

<h3 class="learn-subheading">Nigerian Tech Ecosystem</h3>

<p class="learn-p"><strong>Successful startups:</strong> Paystack (fintech, acquired by Stripe), Flutterwave (payments, unicorn), Andela (software developer training), Interswitch (payments), Paga (mobile payments), Kuda (digital bank).</p>
<p class="learn-p"><strong>Tech hubs:</strong> CcHub (Lagos), Wennovation, Leadspace, Ventures Platform. Government initiatives: NITDA, NCAIR (National Centre for AI and Robotics), NIGCOMSAT, Galaxy Backbone.</p>
<p class="learn-p"><strong>Challenges:</strong> Funding (though improving), infrastructure (electricity, internet), talent gap, regulation uncertainty, brain drain (top talent leaving).</p>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Nigerian Tech Fact:</strong> Nigeria has the highest cryptocurrency adoption rate in Africa and among the highest globally (Chainalysis Global Crypto Adoption Index).</span>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">🎓</span>
  <span><strong>GST Exam Practice:</strong> "What is blockchain? How does it differ from traditional databases?" (Sample answer: Blockchain is a distributed, decentralized, immutable ledger. Unlike traditional databases (centralized, controlled by single entity, can be altered), blockchain records are permanent, transparent, and not controlled by any single party. Each block is cryptographically linked to previous block, making tampering extremely difficult.)</span>
</div>
    `,
    questions: [
      { q: "Machine learning is a subfield of:", o: ["Blockchain", "Artificial Intelligence", "Internet of Things", "Quantum Computing"], a: 1, e: "Machine learning is a subset of AI — systems learn from data without explicit programming.", h: "What is ML a subset of?", yr: "GST" },
      { q: "Blockchain is best described as:", o: ["Centralized database", "Distributed, decentralized, immutable ledger", "Cryptocurrency only", "Cloud storage"], a: 1, e: "Blockchain is distributed (many copies), decentralized (no central authority), immutable (cannot alter past records).", h: "What is blockchain?", yr: "GST" },
      { q: "Which Nigerian fintech startup was acquired by Stripe?", o: ["Flutterwave", "Paystack", "Paga", "Kuda"], a: 1, e: "Paystack was acquired by Stripe in 2020 for over $200 million — one of Nigeria's largest startup exits.", h: "Which was acquired by Stripe?", yr: "GST" },
      { q: "IoT stands for:", o: ["Internet of Things", "Interconnection of Technology", "Internet of Transactions", "Input Output Transfer"], a: 0, e: "Internet of Things connects everyday devices (thermostats, locks, wearables) to the internet.", h: "What does IoT stand for?", yr: "GST" },
      { q: "Nigeria has the highest cryptocurrency adoption rate in:", o: ["World (top globally)", "Africa", "Asia", "Europe"], a: 1, e: "Nigeria leads Africa and ranks among top globally for cryptocurrency adoption (Chainalysis Index).", h: "Where does Nigeria rank in crypto adoption?", yr: "GST" },
      { q: "Supervised machine learning requires:", o: ["No labeled data", "Labeled training data (input-output pairs)", "Only unlabeled data", "No data"], a: 1, e: "Supervised learning trains on labeled data — input and correct output (e.g., spam vs not spam).", h: "What does supervised learning need?", yr: "GST" },
      { q: "5G technology offers all EXCEPT:", o: ["Higher speed", "Lower latency", "Higher capacity", "Slower internet"], a: 3, e: "5G offers higher speed (10 Gbps), lower latency (1 ms), higher capacity — not slower.", h: "What does 5G NOT offer?", yr: "GST" },
      { q: "VR (Virtual Reality) provides:", o: ["Overlays digital info on real world", "Fully immersive digital environment (headset)", "Only audio", "Only text"], a: 1, e: "VR fully immerses user in digital environment using headset, controllers. AR overlays on real world.", h: "What does VR provide?", yr: "GST" },
      { q: "Big data is characterized by 5 Vs including:", o: ["Volume, Velocity, Variety, Veracity, Value", "Very, Vast, Virtual, Valid, Valuable", "Version, Video, Voice, Virtual, Value", "None of these"], a: 0, e: "Big data 5 Vs: Volume (amount), Velocity (speed), Variety (types), Veracity (quality), Value (insights).", h: "What are the 5 Vs?", yr: "GST" },
      { q: "Quantum computers use which unit of information?", o: ["Bit", "Byte", "Qubit", "Nibble"], a: 2, e: "Qubit (quantum bit) can be 0, 1, or superposition (both) — enables quantum computing power.", h: "What is quantum unit?", yr: "GST" },
      { q: "CBN restrictions on cryptocurrency in Nigeria affect:", o: ["Bank accounts for crypto exchanges (P2P trading still possible)", "All crypto use", "Only Bitcoin", "Only Ethereum"], a: 0, e: "CBN directed banks to close accounts of crypto exchanges, but peer-to-peer (P2P) trading remains common.", h: "What does CBN restrict?", yr: "GST" },
      { q: "CcHub is a:", o: ["Cryptocurrency exchange", "Tech hub/incubator in Lagos", "University", "Government agency"], a: 1, e: "CcHub (Co-creation Hub) is Lagos-based tech innovation hub supporting startups, entrepreneurs.", h: "What is CcHub?", yr: "GST" },
      { q: "Reinforcement learning learns through:", o: ["Labeled data", "Unlabeled data", "Trial and error, rewards/punishments", "No learning"], a: 2, e: "Reinforcement learning uses rewards and punishments — agent learns by interacting with environment.", h: "How does reinforcement learning work?", yr: "GST" },
      { q: "AR (Augmented Reality) is used in:", o: ["Pokémon GO, IKEA furniture placement", "Only gaming", "Only medical", "Only education"], a: 0, e: "AR overlays digital content on real world — popular in games (Pokémon GO), retail (IKEA), navigation.", h: "What is AR used for?", yr: "GST" },
      { q: "NITDA is Nigeria's agency for:", o: ["National Information Technology Development Agency", "National Internet Technology Development", "Nigerian IT Development Authority", "None"], a: 0, e: "NITDA promotes IT development, digital literacy, and technology regulation in Nigeria.", h: "What is NITDA?", yr: "GST" },
      { q: "Which Nigerian startup is a digital-only bank?", o: ["Paystack", "Flutterwave", "Kuda", "Andela"], a: 2, e: "Kuda is a digital-only bank (no physical branches) — licensed by CBN.", h: "Which is digital-only bank?", yr: "GST" },
      { q: "Blockchain immutability means:", o: ["Data can be changed easily", "Data cannot be altered or deleted once recorded", "Data is lost", "Data is encrypted only"], a: 1, e: "Immutability means recorded transactions cannot be changed or deleted — tamper evident.", h: "What does immutability mean?", yr: "GST" },
      { q: "Andela is a Nigerian startup that:", o: ["Provides banking", "Trains software developers and connects them with global companies", "Sells cryptocurrency", "Makes hardware"], a: 1, e: "Andela trains African software developers and places them with global tech companies.", h: "What does Andela do?", yr: "GST" },
      { q: "Smart contracts are associated with:", o: ["Bitcoin", "Ethereum (blockchain with programmability)", "Paystack", "Google"], a: 1, e: "Smart contracts are self-executing contracts on blockchain — pioneered by Ethereum.", h: "Which blockchain has smart contracts?", yr: "GST" },
      { q: "Nigerian tech ecosystem challenges include:", o: ["Too much funding", "Excellent infrastructure", "Funding gap, infrastructure, talent shortage, brain drain", "No challenges"], a: 2, e: "Challenges: limited funding, unreliable electricity/internet, talent gap, brain drain (top talent leaving).", h: "What are Nigerian tech challenges?", yr: "GST" }
    ]
  }
];
