import React from 'react';
import { useState, useEffect, useRef } from 'react';
import logo from './assets/elite-scholars-cbt-logo.png';

// ── Config — edit these freely ─────────────────────────────────────────────
const ROUND_SIZE = 20; // questions per quiz round
const SHARE_GATE_EVERY = 3; // show "share to WhatsApp friends" gate every N quizzes

// When no share gate: alternate between showing Join Group and Join Channel.
// Quizzes 1,3,5... (odd) → Group. Quizzes 2,4,6... (even) → Channel.
// Neither shows when the share gate is active.

function getTimerSecs(subjectId, questionCount) {
  const calcSubjects = ['mathematics', 'physics', 'chemistry'];
  const secsPerQ = calcSubjects.includes(subjectId) ? 25 : 16;
  return questionCount * secsPerQ;
}

const WA_GROUP = 'https://chat.whatsapp.com/DSeaqKuKRhw1bIFVpAJreB?mode=gi_t';
const WA_CHANNEL = 'https://whatsapp.com/channel/0029Vb6wPv72kNFnjr4FMr24';
const APP_URL = 'https://elitescholars.site';

// Share message — only the site URL, no group/channel links in the text
const shareMsg = (name, subject, correct, totalQ) =>
  `${name} just scored ${correct}/${totalQ} in ${subject} on EliteScholars CBT! 🔥\n\nI'm practising for JAMB free at ${APP_URL} — come try it!`;

// ── Colours ────────────────────────────────────────────────────────────────
const PURPLE = '#4B0082';
const DPURP = '#280050';
const GOLD = '#D4AF37';
const LGOLD = '#FFEB82';
const DGOLD = '#A07820';
const GREEN = '#16A34A';
const LGREEN = '#DCFCE7';
const RED = '#DC2626';
const LRED = '#FEE2E2';
const GRAY = '#6B7280';
const LGRAY = '#E5E7EB';
const BG = '#F8F5FF';
const WHITE = '#FFFFFF';

// ── Subject metadata ───────────────────────────────────────────────────────
const SUBJ = {
  english: { icon: '📖', label: 'English', color: '#0369A1', bg: '#E0F2FE' },
  economics: {
    icon: '📊',
    label: 'Economics',
    color: '#7C3AED',
    bg: '#EDE9FE',
  },
  biology: { icon: '🔬', label: 'Biology', color: '#065F46', bg: '#DCFCE7' },
  chemistry: {
    icon: '⚗️',
    label: 'Chemistry',
    color: '#9A3412',
    bg: '#FEE2E2',
  },
  mathematics: {
    icon: '📐',
    label: 'Mathematics',
    color: '#1D4ED8',
    bg: '#DBEAFE',
  },
  physics: { icon: '⚡', label: 'Physics', color: '#B45309', bg: '#FEF3C7' },
  government: {
    icon: '🏛️',
    label: 'Government',
    color: '#3F6212',
    bg: '#F7FEE7',
  },
  literature: {
    icon: '📚',
    label: 'Literature',
    color: '#831843',
    bg: '#FCE7F3',
  },
  novel: {
    icon: '📗',
    label: 'The Lekki Headmaster',
    color: '#831843',
    bg: '#FCE7F3',
  },
};

// ── Sound Engine (Web Audio API — no external files needed) ────────────────
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) {
    try {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {}
  }
  return _audioCtx;
}

function playTone(
  frequency,
  duration,
  type = 'sine',
  volume = 0.18,
  delay = 0
) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    // Soft attack
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.04);
    // Gentle natural decay — use linearRamp for smoother fade than exponential
    gain.gain.linearRampToValueAtTime(
      0.001,
      ctx.currentTime + delay + duration
    );
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.05);
  } catch (e) {}
}

const SFX = {
  // Engaging splash intro — plays during loading screen
  // Deep pulse → rising sweep → bright chime landing
  intro: () => {
    const ctx = getAudioCtx();
    if (!ctx) return;
    try {
      // Deep opening pulse
      playTone(80, 0.35, 'sine', 0.22, 0.0);
      playTone(120, 0.3, 'sine', 0.18, 0.1);
      // Rising sweep via rapid scale
      [196, 246, 294, 349, 392, 494, 587, 698, 784].forEach((f, i) => {
        playTone(f, 0.1, 'sine', 0.14, 0.35 + i * 0.07);
      });
      // Bright fanfare chords at the top
      playTone(784, 0.45, 'sine', 0.2, 1.05);
      playTone(988, 0.45, 'sine', 0.16, 1.05);
      playTone(1175, 0.45, 'sine', 0.12, 1.05);
      // Final sparkle hits
      playTone(1568, 0.18, 'sine', 0.14, 1.52);
      playTone(1976, 0.22, 'sine', 0.1, 1.68);
    } catch (e) {}
  },

  // Soft click when selecting an option
  select: () => {
    playTone(600, 0.07, 'sine', 0.12);
  },

  // Wrong answer — descending drop
  wrong: () => {
    playTone(300, 0.18, 'sawtooth', 0.14, 0);
    playTone(220, 0.28, 'sawtooth', 0.1, 0.15);
  },

  // Correct answer — cheerful ascending chime
  correct: () => {
    playTone(523, 0.12, 'sine', 0.16, 0);
    playTone(659, 0.12, 'sine', 0.16, 0.1);
    playTone(784, 0.22, 'sine', 0.18, 0.2);
  },

  // Round complete — celebratory fanfare
  roundComplete: () => {
    playTone(523, 0.1, 'sine', 0.2, 0.0);
    playTone(659, 0.1, 'sine', 0.2, 0.1);
    playTone(784, 0.1, 'sine', 0.2, 0.2);
    playTone(1047, 0.1, 'sine', 0.2, 0.3);
    playTone(1047, 0.4, 'sine', 0.18, 0.42);
    playTone(784, 0.3, 'sine', 0.15, 0.55);
  },

  // Timer warning — single quiet tick (caller controls frequency)
  timerWarn: () => {
    playTone(880, 0.05, 'square', 0.08);
  },

  // Submit press
  submit: () => {
    playTone(440, 0.08, 'sine', 0.13);
    playTone(550, 0.08, 'sine', 0.1, 0.06);
  },

  // Splash intro — soft ambient rising tone, synced to the 2.5s load bar
  // Gentle chime melody that builds and resolves exactly as loading ends
  splash: () => {
    // Soft opening shimmer — high gentle chimes
    playTone(1047, 0.5, 'sine', 0.06, 0.0); // C6 shimmer
    playTone(1319, 0.5, 'sine', 0.05, 0.1); // E6 shimmer
    playTone(1568, 0.5, 'sine', 0.05, 0.2); // G6 shimmer
    // Rising melody — warm mid tones (C5 arpeggio, gentle)
    playTone(523, 0.4, 'sine', 0.1, 0.4); // C5
    playTone(659, 0.4, 'sine', 0.11, 0.65); // E5
    playTone(784, 0.4, 'sine', 0.12, 0.9); // G5
    playTone(1047, 0.5, 'sine', 0.13, 1.15); // C6
    // Warm swell — full chord building together
    playTone(523, 0.7, 'sine', 0.1, 1.4); // C5
    playTone(659, 0.7, 'sine', 0.09, 1.42); // E5
    playTone(784, 0.7, 'sine', 0.09, 1.44); // G5
    // Resolution — the final note fades out as loading bar completes at 2.5s
    playTone(1047, 1.0, 'sine', 0.14, 1.8); // C6 — long fade matches load end
    playTone(784, 0.9, 'sine', 0.08, 1.9); // G5 harmony underneath
  },
};

// ── Question bank ──────────────────────────────────────────────────────────
const QB = {
  economics: [
    {
      yr: 2024,
      q: 'If wage rate is less than the average revenue product, the firm earns ___',
      o: ['Loss', 'Super normal profit', 'Normal profit', 'Higher revenue'],
      a: 1,
      e: 'When wage rate lt ARP each worker generates more revenue than cost. That surplus is supernormal profit.',
      full: "Think of it this way: the Average Revenue Product (ARP) tells you how much money each worker brings in for the firm on average. The wage rate is what the firm pays each worker.\n\nSo if you're paying a worker ₦5,000 but they're generating ₦8,000 in revenue for you, you're keeping ₦3,000 extra per worker — that's profit.\n\nNow, normal profit is just enough to keep the firm running — it's the bare minimum. When a firm earns more than that minimum, economists call it supernormal profit (also called abnormal profit). Since the firm is paying less than what each worker earns for it, that extra gap becomes supernormal profit.\n\nSo whenever wage rate is less than ARP, the firm is in a sweet spot — paying less than it earns. That's supernormal profit.",
      h: 'Cost less than revenue earned = which type of profit?',
    },
    {
      yr: 2024,
      q: 'Which is NOT emphasised in a production possibility curve?',
      o: [
        'Scarcity of resources',
        'Unemployment of labour',
        'Inefficiency in use of resources',
        'Economic development',
      ],
      a: 3,
      e: 'The PPC shows scarcity, unemployment (inside), and inefficiency. Economic development is an outward shift.',
      full: "A Production Possibility Curve (PPC) is basically a graph that shows all the combinations of two goods a country can produce if it uses ALL its resources fully and efficiently.\n\nThe PPC emphasises three key ideas: points ON the curve mean resources are being used efficiently; points INSIDE the curve mean there is unemployment or wastage — resources are sitting idle; and the boundary of the curve itself shows scarcity, because you literally cannot produce beyond it with current resources.\n\nNow here is where economic development is different. Economic development means the country's productive capacity grows over time — maybe through better technology or more resources. On a PPC diagram, that shows up as the ENTIRE CURVE shifting outward, not as a concept within the existing curve.\n\nSo economic development is not something you see on or inside the current PPC — it is the movement of the curve itself. That makes it the odd one out. Answer is D.",
      h: 'Which option happens beyond the curve, not within it?',
    },
    {
      yr: 2024,
      q: 'Economic problem arises as a result of',
      o: ['Money cost', 'Opportunity cost', 'Choice', 'Scarcity'],
      a: 3,
      e: 'Scarcity is the root cause. Limited resources vs unlimited wants forces trade-offs.',
      full: 'The economic problem exists because human wants are unlimited but resources — land, money, time, raw materials — are limited. That imbalance is called scarcity, and it is the root of everything.\n\nBecause resources are scarce, we cannot have everything we want. So we are forced to make choices. Every choice you make means giving up something else — that sacrifice is called opportunity cost. And whenever resources change hands or are allocated, money cost is involved.\n\nSo the chain goes like this: scarcity exists, which forces us to make choices, which creates opportunity cost, which involves money cost. Scarcity comes first in that chain. Without it, there would be no economic problem at all — we could simply have everything we want.\n\nThe other options are consequences of scarcity, not the cause of it. Answer is D.',
      h: 'Choice and opportunity cost are effects — what is the root cause?',
    },
    {
      yr: 2024,
      q: 'Types of business organisation EXCEPT',
      o: [
        'Co-operative society',
        'Partnership',
        'Entrepreneurship',
        'Public corporation',
      ],
      a: 2,
      e: 'Entrepreneurship is a process, not a structure. The others are recognised organisational forms.',
      full: "Business organisations are the formal structures through which people carry out commercial activities. The question asks which option is NOT one of those structures.\n\nA co-operative society is a recognised structure — members pool resources together and share the benefits. A partnership is also a structure — two or more people running a business and sharing profit and liability. A public corporation is a government-owned business entity, like NNPC in Nigeria.\n\nEntrepreneurship, however, is not a structure. It is an activity — the process of identifying an opportunity, taking a risk, and building a business. You cannot register a business as an 'entrepreneurship'. It describes what a person does, not what a business is.\n\nThat distinction is what the question is testing. All the others are actual types of business structure. Entrepreneurship is the process. Answer is C.",
      h: 'Which one is an activity or process, not a structure?',
    },
    {
      yr: 2024,
      q: 'Standard deviation is 3.6. What is the variance?',
      o: ['12.96', '12.69', '12.9', '12.98'],
      a: 0,
      e: 'Variance = SD squared = 3.6 x 3.6 = 12.96.',
      full: 'Variance and standard deviation are both measures of how spread out a set of data is. The relationship between them is simple: variance is just the standard deviation squared.\n\nSo here, you just need to square 3.6. To do that carefully: 3.6 x 3.6. Multiply 3 by 3.6 to get 10.8, then multiply 0.6 by 3.6 to get 2.16. Add those together: 10.8 + 2.16 = 12.96.\n\nThe other options are close but wrong. 12.69 would come from squaring 3.56, not 3.6. The values 12.9 and 12.98 are rounding errors — they are not exact.\n\nAlways remember: to go from standard deviation to variance, you square it. To go from variance back to standard deviation, you take the square root. Never mix them up. Answer is A — 12.96.',
      h: 'Square the standard deviation. 3.6 x 3.6 = ?',
    },
    {
      yr: 2024,
      q: 'Few sellers and many buyers describes',
      o: ['Duopoly', 'Monopoly', 'Perfect competition', 'Oligopoly'],
      a: 3,
      e: 'Oligopoly = few sellers dominate. Duopoly = two sellers. Monopoly = one seller.',
      full: 'Market structures describe how many sellers and buyers exist in a particular market, and how much control any one of them has.\n\nA monopoly has just ONE seller who dominates the entire market (mono = one). A duopoly has exactly TWO sellers (duo = two). Perfect competition has MANY sellers and MANY buyers, where no single player has real control over the price.\n\nOligopoly sits in a different space — a FEW sellers (typically 3 to 10) dominate the market, while buyers are many. The word comes from the Greek oligo, meaning few. In an oligopoly, those few firms have significant pricing power.\n\nLook around Nigeria for real examples: the telecom market has MTN, Airtel, Glo and 9mobile — a few big players with millions of buyers. The cement industry has Dangote, BUA and Lafarge — same pattern. Both are oligopolies.\n\nFew sellers, many buyers = Oligopoly. Answer is D.',
      h: 'Oligo is Greek for few. Few sellers = which market structure?',
    },
    {
      yr: 2024,
      q: 'Which will NOT improve balance of payments?',
      o: [
        'Anti-dumping policies',
        'Export subsidies',
        'Decreasing personal income tax',
        'Increasing import duties',
      ],
      a: 2,
      e: 'Lower income taxes raise disposable income, increasing import spending and worsening the balance of payments.',
      full: 'The Balance of Payments (BOP) records all money coming into a country against all money going out. To improve it, you either need more money coming in (more exports) or less going out (fewer imports).\n\nAnti-dumping policies restrict cheap foreign goods from flooding the market, so fewer imports come in — BOP improves. Export subsidies help local producers sell cheaply abroad, so exports go up — BOP improves. Increasing import duties makes foreign goods more expensive, so people buy fewer of them — BOP improves again.\n\nBut when you decrease personal income tax, people end up with more money in their pockets. More spending power means they buy more goods — and some of those goods will be imported. More imports means more money flowing OUT of the country. That actually worsens the BOP, not improves it.\n\nSo decreasing income tax is the odd one out — it moves the BOP in the wrong direction. Answer is C.',
      h: 'Which policy puts more spending money in pockets — including for imports?',
    },
    {
      yr: 2024,
      q: 'In bankruptcy, joint-stock company owners lose',
      o: [
        'Company and private assets',
        'Only capital invested',
        'Only dividends',
        'Private properties',
      ],
      a: 1,
      e: 'Limited liability means shareholders only lose what they invested. Personal assets are protected.',
      full: "A joint-stock company is a business where ownership is divided into shares. People buy those shares and become shareholders — which makes them the owners.\n\nThe key concept here is limited liability. It means that if the company gets into trouble and goes bankrupt, each shareholder is only responsible for the debts of the company up to the amount they personally invested. Their houses, cars, savings, and personal belongings are completely protected.\n\nSo imagine the company owes ₦50 million and cannot pay. Creditors can come after the company's assets — its equipment, offices, accounts. But they cannot go after the shareholders' personal belongings. Each shareholder simply loses whatever they put into the company and nothing more.\n\nThis is why limited liability matters so much — it encourages people to invest by removing the fear of losing everything. If there were no such protection, most people would be too afraid to ever buy shares in a company.\n\nIn bankruptcy, joint-stock owners lose only the capital they invested. Answer is B.",
      h: 'The keyword is limited liability — how limited is the loss?',
    },
    {
      yr: 2024,
      q: 'Price of X rises and consumers shift to Y. X and Y are',
      o: ['Inferior goods', 'Substitutes', 'Complements', 'Bought together'],
      a: 1,
      e: 'Substitutes replace each other when one becomes expensive.',
      full: "What happened here is straightforward — the price of X went up, and consumers responded by buying Y instead. That tells you everything.\n\nThey switched to Y because Y can do exactly the same job as X. When goods can replace each other like this, economists call them substitutes. And the relationship is predictable: when the price of one goes up, demand for the other goes up too.\n\nPepsi and Coke are the classic example. If Coke suddenly becomes more expensive, people start buying Pepsi. If Glo data gets too pricey, people switch to MTN. The goods are interchangeable from the consumer's point of view.\n\nComplement goods are the opposite — they are used together. Bread and butter, fuel and cars. If bread gets expensive, you buy less bread AND less butter. Both fall together. That is not what happened in this question.\n\nInferior goods are different altogether — those are goods you buy more of when your income falls, like cheaper alternatives. That has nothing to do with the price of X rising here.\n\nSince X got expensive and people moved to Y, X and Y are substitutes. Answer is B.",
      h: 'When one replaces the other due to price change, what relationship is that?',
    },
    {
      yr: 2024,
      q: 'Cultivating land and rearing animals is called',
      o: ['Forestry', 'Agriculture', 'Mono culture', 'Horticulture'],
      a: 1,
      e: 'Agriculture covers both crop farming and animal rearing.',
      full: "The question is asking for the one broad term that covers both cultivating land and rearing animals. Let's look at each option honestly.\n\nForestry is about managing forests and trees — timber, wood products. It does not involve growing food crops or raising livestock at all.\n\nMonoculture is a specific farming method where only one type of crop is grown on the same piece of land season after season. It is a subset of agriculture, not the broad category itself.\n\nHorticulture focuses on fruits, vegetables, ornamental plants, and flowers — typically in gardens or small-scale plots. Again, it is a branch of agriculture, not the umbrella term.\n\nAgriculture is the broadest term. It covers everything: cultivating the land, growing crops, AND rearing animals like cattle, poultry, and fish for human use. It is the only option that wraps both activities the question mentions under one definition.\n\nAnswer is B — Agriculture.",
      h: 'Which is the broadest term covering both crops AND animals?',
    },
    {
      yr: 2024,
      q: 'Determines consumption level EXCEPT',
      o: ['Level of income', 'Rate of taxes', 'Savings', 'Political climate'],
      a: 3,
      e: 'Income, taxes and savings directly affect spending. Political climate only affects general confidence.',
      full: 'Consumption — how much people spend — depends on three main things: how much money they earn (income), how much the government takes away (taxes), and how much they decide to save. Cut income or raise taxes and people spend less. Raise income or cut taxes and they spend more. Savings work the opposite way — more savings means less current spending.\n\nPolitical climate is different. A stable or unstable political environment might affect general confidence and future plans, but it does not directly put money in or take money out of your pocket today. Someone who earns a salary still spends based on that salary regardless of who is in government. That is why political climate is the odd one out here.',
      h: 'Which affects mood but not directly your spending ability?',
    },
    {
      yr: 2024,
      q: 'NOT a function of the IMF',
      o: [
        'Aid for balance of payment difficulties',
        'Promoting monetary cooperation',
        'Exchange rate stabilisation',
        'Assisting countries to print currency',
      ],
      a: 3,
      e: "Printing currency is each country's central bank responsibility, not the IMF.",
      full: "The International Monetary Fund (IMF) is an international organisation that helps countries manage their finances, stabilise exchange rates, and overcome balance of payment problems. It provides loans and promotes global monetary cooperation.\n\nPrinting currency, however, is a sovereign function — it belongs to each country's own central bank. In Nigeria, that is the Central Bank of Nigeria (CBN). The IMF does not print anyone's money and would never do so, because that would undermine the sovereignty of member nations. If the IMF could print naira or dollars, it would have enormous and inappropriate control over national economies.\n\nThe other options — providing financial aid, promoting cooperation, and stabilising exchange rates — are all genuine IMF functions.",
      h: 'Who prints money in your country?',
    },
    {
      yr: 2024,
      q: 'Marginal utility equals price means',
      o: [
        'Market not in equilibrium',
        'More can be consumed',
        'Total utility equals price',
        'Consumer is in equilibrium',
      ],
      a: 3,
      e: 'MU = Price is the condition for consumer equilibrium.',
      full: "When you buy something, you keep buying more of it as long as each additional unit gives you satisfaction worth at least the price you are paying. The moment you feel that the next unit is worth exactly its price — no more, no less — you stop buying. That is your equilibrium point.\n\nMarginal utility (MU) is the extra satisfaction you get from consuming one more unit. Price is what you give up to get it. When MU equals Price, you have reached the perfect balance — you are getting exactly your money's worth from the last unit bought. There is no reason to buy more (MU would fall below price) or less (MU is still above price). That balance is consumer equilibrium.",
      h: 'MU = P means the consumer is perfectly satisfied.',
    },
    {
      yr: 2024,
      q: 'Which will NOT increase labour force?',
      o: [
        'Decrease in death rate',
        'Better medical services',
        'Immigration',
        'Emigration',
      ],
      a: 3,
      e: 'Emigration takes workers out of the country, reducing the labour force.',
      full: "The labour force includes everyone who is either working or actively looking for work within a country. Anything that increases the population of working-age people — or brings more of them into the workforce — increases the labour force.\n\nA decrease in death rate means more people survive to working age, so more people are available to work. Better medical services keep workers healthy and productive longer. Immigration brings workers from other countries into yours, adding to the labour force.\n\nEmigration is the opposite — people leaving your country to live and work elsewhere. Every person who emigrates takes their labour capacity out of your economy. They may still be part of someone else's labour force, but they are no longer contributing to yours. So emigration reduces the labour force, making it the answer here.",
      h: 'Which option moves workers AWAY from the country?',
    },
    {
      yr: 2024,
      q: 'Persistent fall in general price level is',
      o: ['Deflation', 'Devaluation', 'General price increase', 'Inflation'],
      a: 0,
      e: 'Deflation = sustained price fall. Opposite of inflation.',
      full: "Inflation is a persistent rise in the general price level over time — things keep getting more expensive. Deflation is the exact opposite: a persistent FALL in the general price level over time — things keep getting cheaper.\n\nDevaluation is different — it refers to the deliberate reduction of a currency's exchange rate value relative to other currencies. It affects the external value of money in international trade, not the domestic price level.\n\nA general price increase describes inflation, not deflation. And deflation is not the same as a one-time price drop — it has to be persistent and widespread across the economy. When prices keep falling consistently over time, that is deflation.",
      h: 'Opposite of inflation.',
    },
    {
      yr: 2023,
      q: 'As more variable factor is added to fixed factors, ___',
      o: [
        'Output increases proportionately',
        'Marginal product eventually falls',
        'Total product always falls',
        'Average cost stays constant',
      ],
      a: 1,
      e: 'Law of diminishing returns: marginal product eventually decreases.',
      full: 'Imagine a small farm with one fixed tractor. You start adding more workers. The first worker is incredibly productive — they use the tractor, plough the fields, plant seeds. The second worker helps and output rises significantly. The third worker adds even more.\n\nBut at some point, adding another worker means two people are sharing the tractor, or three people are crowding the same row of crops. The farm is getting crowded. Each new worker still adds output — total product keeps rising — but each additional worker adds LESS output than the one before. That declining additional output is what we call diminishing marginal product.\n\nThe law of diminishing returns states that as you keep adding a variable input (like labour) to a fixed input (like land or capital), eventually the marginal product of each additional unit will start to fall.',
      h: 'Focus on marginal product.',
    },
    {
      yr: 2023,
      q: 'Budget deficit occurs when',
      o: [
        'Revenue exceeds expenditure',
        'Expenditure exceeds revenue',
        'Exports exceed imports',
        'Imports exceed exports',
      ],
      a: 1,
      e: 'Budget deficit = government spends more than it earns.',
      full: 'A government earns revenue mainly through taxes — income tax, VAT, corporate tax, customs duties and so on. Government expenditure is what it spends on services, salaries, infrastructure, defence, debt interest, etc.\n\nWhen revenue exceeds expenditure, the government has a surplus — money left over. When expenditure exceeds revenue, the government has a deficit — it has spent more than it collected. It must then borrow to cover the gap, which is why deficit spending is closely linked to government borrowing and national debt.\n\nThe other options describe the trade balance (exports vs imports), not the budget. Those are part of the balance of payments, not the government budget.',
      h: 'Deficit means shortfall.',
    },
    {
      yr: 2023,
      q: 'Which is a merit good?',
      o: ['Cigarettes', 'Education', 'Petrol', 'Alcohol'],
      a: 1,
      e: 'Merit goods are underconsumed without government intervention. Education is the classic example.',
      full: 'Some goods provide benefits not just to the person buying them but to society as a whole. Left entirely to the free market, people would buy less of these goods than is actually good for society — because individuals only think about their own private benefit, not the wider social benefit.\n\nEducation is the perfect example. An educated population produces better workers, reduces crime, increases innovation, and grows the economy. But if education were purely private and expensive, many people would not afford it, and society would suffer. So governments subsidise education, make it compulsory, and provide public schools.\n\nCigarettes, alcohol, and petrol are either demerit goods (whose social costs exceed private benefits) or neutral goods. None of them is underconsumed — if anything, cigarettes and alcohol are overconsumed without government intervention.',
      h: 'Which good does government actively encourage?',
    },
    {
      yr: 2023,
      q: 'Price elasticity of demand measures',
      o: [
        'Change in supply due to price',
        'Responsiveness of demand to price',
        'Effect of income on demand',
        'Relationship between two goods',
      ],
      a: 1,
      e: 'PED measures how much quantity demanded changes in response to a price change.',
      full: 'Elasticity in economics always means responsiveness — how much one variable reacts when another changes. Price Elasticity of Demand (PED) specifically measures how responsive the QUANTITY DEMANDED of a good is when its PRICE changes.\n\nIf you raise the price of bread by 10% and people buy 20% less, the demand is elastic — very responsive. If you raise the price of petrol by 10% and people only buy 3% less (because they need it regardless), the demand is inelastic.\n\nThe formula is: PED = % change in quantity demanded ÷ % change in price. The other options describe different elasticity concepts — supply elasticity (response of supply to price), income elasticity (response of demand to income changes), and cross-price elasticity (relationship between two goods).',
      h: 'Elasticity = responsiveness of demand to what?',
    },
    {
      yr: 2022,
      q: 'Main aim of privatisation is to',
      o: [
        'Increase government control',
        'Improve efficiency through competition',
        'Reduce government revenue',
        'Nationalise industries',
      ],
      a: 1,
      e: 'Privatisation transfers state enterprises to private ownership to improve efficiency.',
      full: 'When the government owns a business, it often lacks the pressure to perform well. There are no shareholders demanding profit, no competitors threatening to take customers, and no bankruptcy risk if things go wrong. This can lead to inefficiency, waste, and poor service.\n\nPrivatisation is the process of selling government-owned enterprises to private individuals or companies. The new private owners are motivated by profit — they must be efficient, cut waste, and satisfy customers or lose business to competitors. This pressure typically improves performance.\n\nThe main aim is NOT to reduce government revenue (in fact, privatisation often raises money through the sale). It is not nationalisation — that is the opposite process. And it is not primarily about increasing government control — again, the opposite.',
      h: 'Private sector is believed to be more efficient. Why?',
    },
    {
      yr: 2022,
      q: 'Example of direct tax',
      o: ['VAT', 'Custom duties', 'Personal income tax', 'Excise duties'],
      a: 2,
      e: 'Direct taxes are paid directly by individuals. Income tax is paid directly from earnings.',
      full: 'Taxes come in two broad types. Direct taxes are paid directly by the person or company that earns the income. You receive your salary and a portion goes straight to the government as income tax. You earn profit as a company and corporate tax is paid on it directly.\n\nIndirect taxes are collected indirectly — they are embedded in the price of goods and services. VAT is added to the price of what you buy. Customs duties are added to imported goods. Excise duties are added to specific products like fuel or alcohol. You pay them without necessarily knowing the exact amount, and the seller collects and remits them to government.\n\nPersonal income tax is the clearest example of a direct tax — it comes straight off your earnings before you even receive them.',
      h: 'Direct = paid directly by you, not through buying goods.',
    },
    {
      yr: 2021,
      q: 'National income is the total value of',
      o: [
        'Goods only produced',
        'Services only provided',
        'Goods and services produced in a year',
        'Government expenditure',
      ],
      a: 2,
      e: 'National income = total monetary value of all goods and services produced by residents in a year.',
      full: "National income measures the total economic output of a country's residents over a year. It captures the value of everything produced — both physical goods (food, cars, phones) and services (banking, education, healthcare).\n\nNotice it says residents, not territory. Gross National Product (GNP) and national income focus on who produces (residents), while Gross Domestic Product (GDP) focuses on where production happens (within the country's borders). The distinction matters when citizens work abroad or foreigners work locally.\n\nGovernment expenditure alone is not national income — it is just one component. And measuring only goods, or only services, would miss half the picture. National income captures everything.",
      h: 'National = all production. Income = value of everything.',
    },
    {
      yr: 2021,
      q: 'Which institution controls monetary policy in Nigeria?',
      o: [
        'Federal Ministry of Finance',
        'Central Bank of Nigeria',
        'Securities and Exchange Commission',
        'National Economic Council',
      ],
      a: 1,
      e: 'The CBN formulates and implements monetary policy.',
      full: "Monetary policy involves controlling the money supply, interest rates, and credit conditions to achieve economic goals like price stability, full employment, and economic growth. In Nigeria, this power belongs exclusively to the Central Bank of Nigeria (CBN).\n\nThe Federal Ministry of Finance handles the government's budget and fiscal policy — taxes and spending — but not monetary policy. The Securities and Exchange Commission (SEC) regulates the capital markets. The National Economic Council advises on economic planning but has no direct policy implementation power.\n\nThe CBN sets the Monetary Policy Rate (MPR), controls how much commercial banks can lend, issues and manages the naira, and manages foreign exchange reserves. These are all monetary policy tools.",
      h: 'Which institution controls money supply and interest rates?',
    },
    {
      yr: 2021,
      q: 'The multiplier effect refers to',
      o: [
        'Effect of price changes on demand',
        'Magnified impact of initial injection on national income',
        'Effect of taxation on consumption',
        'Relationship between savings and investment',
      ],
      a: 1,
      e: 'The multiplier shows how an initial injection creates a larger increase in national income.',
      full: 'Imagine the government spends ₦1 billion building a road. The construction workers earn wages and spend some of that on food, clothes, and transport. Those shop owners and transport workers also spend part of their earnings. Each spending round generates income for someone else who then spends again.\n\nThe initial ₦1 billion injection ripples through the economy, creating a total increase in national income that is LARGER than ₦1 billion. That magnifying effect is the multiplier. How large the multiplier is depends on what fraction of income people spend (called the marginal propensity to consume). The more people spend rather than save, the bigger the multiplier effect.',
      h: 'An initial spending creates a bigger final income change.',
    },
    {
      yr: 2022,
      q: 'Devaluation of a currency means',
      o: [
        'Increasing the exchange rate',
        'Decreasing the external value of the currency',
        'Increasing buying power',
        'Removing currency from circulation',
      ],
      a: 1,
      e: "Devaluation deliberately reduces a currency's exchange rate value.",
      full: 'When a country devalues its currency, it officially lowers the exchange rate — meaning its currency buys fewer units of foreign currencies than before. For example, if ₦1,000 used to buy $1, after devaluation it might only buy $0.70.\n\nWhy would a country do this? Because cheaper currency makes exports cheaper and more attractive to foreign buyers (good for export industries) while making imports more expensive (which reduces import spending and can improve the balance of payments).\n\nDevaluation is different from depreciation — depreciation is a market-driven fall in currency value, while devaluation is a deliberate government/central bank decision. The key word in the correct answer is "external value" — it is about what the currency is worth in international exchange, not domestic purchasing power.',
      h: 'De prefix means reducing.',
    },
    {
      yr: 2022,
      q: 'An industry maximises profit when',
      o: ['DD lt SS', 'MC gt AC', 'MC = MR', 'MC lt AR'],
      a: 2,
      e: 'Profit maximisation occurs at MC = MR — the golden rule.',
      full: 'A firm maximises profit by continuing to produce as long as each additional unit brings in more revenue than it costs to produce. The moment the cost of producing one more unit (Marginal Cost, MC) equals the revenue that unit generates (Marginal Revenue, MR), the firm has found its sweet spot.\n\nIf MC is below MR, the firm is still making money on each extra unit — it should keep producing. If MC is above MR, each extra unit is actually losing money — the firm should produce less. The profit-maximising point is exactly where MC = MR. This rule applies universally — to monopolies, oligopolies, and competitive firms alike.\n\nThe option "DD less than SS" relates to market equilibrium, not profit maximisation. The others describe cost-output relationships that are not the standard profit-maximisation condition.',
      h: 'The universal profit maximisation condition.',
    },
    {
      yr: 2023,
      q: 'Stock exchange market deals with',
      o: [
        'Sales of second-hand securities',
        'Sales of foreign exchange',
        'Exchange of stock fish',
        'Exchange of treasury bills',
      ],
      a: 0,
      e: 'Stock exchange is a secondary market for already-issued shares and bonds.',
      full: 'When a company first issues shares to the public, that happens in the primary market — typically through an Initial Public Offering (IPO). The money raised goes directly to the company.\n\nThe stock exchange is a secondary market — it is where those already-issued shares and bonds are subsequently bought and sold between investors. The company does not receive money from these transactions; only the sellers do. The stock exchange provides liquidity, meaning shareholders can convert their investments to cash by selling to other buyers.\n\nForeign exchange is traded in the forex market, not the stock exchange. Treasury bills are government debt instruments traded in the money market. Stock fish, of course, is not a financial instrument.',
      h: 'Second-hand = already issued = secondary market.',
    },
    {
      yr: 2023,
      q: 'Formula (N+1)/2 determines the',
      o: ['Median', 'Mean', 'Standard deviation', 'Mode'],
      a: 0,
      e: '(N+1)/2 gives the position of the median in an ordered dataset.',
      full: 'The median is the middle value in a dataset that has been arranged in order. To find it, you first need to know WHICH position in the ordered list is the middle one. That is what the formula (N+1)/2 tells you.\n\nFor example, if you have 9 data values (N=9), the middle position is (9+1)/2 = 5. So the median is the 5th value in your ordered list.\n\nIf N is even, say N=10, then (10+1)/2 = 5.5, which means you average the 5th and 6th values to find the median.\n\nThe formula gives you a POSITION, not the actual median value itself. Once you know the position, you look at the ordered data to find the actual value there.',
      h: 'This finds a POSITION, not a value.',
    },
    {
      yr: 2022,
      q: 'What adds funds to the circular flow?',
      o: ['Expenditure approach', 'Withdrawal', 'Leakages', 'Injection'],
      a: 3,
      e: 'Injections (investment, government spending, exports) add to the circular flow.',
      full: 'The circular flow of income describes money moving between households and firms in an economy. Households provide labour and receive wages; firms produce goods and receive revenue. This loop keeps circulating.\n\nLeakages (also called withdrawals) are flows that take money OUT of the circular flow — savings, taxes, and import spending all remove money from the domestic cycle.\n\nInjections are the opposite — they ADD money INTO the circular flow from outside the basic household-firm loop. The three main injections are: investment (firms spending on capital), government spending (on public services and infrastructure), and exports (foreigners spending on your goods, bringing money in from abroad).',
      h: 'The word adds points directly to the answer.',
    },
    {
      yr: 2021,
      q: 'A firm operating under perfect competition earns only normal profit in',
      o: ['Short run', 'Long run', 'Both short and long run', 'Neither'],
      a: 1,
      e: 'In the long run under perfect competition, free entry eliminates supernormal profit. Only normal profit remains.',
      full: "In the short run, a firm in a perfectly competitive market can make supernormal profit — earning more than the minimum needed to stay in business. But in perfect competition there are no barriers to entry, so other profit-seeking firms quickly enter the market.\n\nAs more firms enter, the industry's total supply increases. With more supply and the same demand, the market price falls. This continues until the price falls to exactly the level where firms earn only normal profit — just enough to cover all costs including a fair return on investment.\n\nSo in the long run, the entry of new firms drives down supernormal profits until only normal profit remains. Short run = supernormal profit possible. Long run = only normal profit survives.",
      h: 'What happens to supernormal profit when other firms freely enter the market?',
    },
  ],
  english: [
    {
      yr: 2024,
      q: "'Her response was AMBIGUOUS' — underlined word means",
      o: ['Clear', 'Vague', 'Brief', 'Passionate'],
      a: 1,
      e: 'Ambiguous = open to more than one interpretation. Vague is the closest synonym.',
      full: 'Ambiguous comes from the Latin ambiguus, meaning "moving from side to side" or "uncertain." When something is ambiguous, it can be understood in more than one way — there is no single clear meaning.\n\nVague is the closest match because a vague response also lacks clarity and precision. The other options do not fit: clear is the opposite of ambiguous. Brief means short, which says nothing about clarity. Passionate describes the emotion behind a response, not its clarity.\n\nIn the sentence, nobody could tell exactly what the person meant by her response — that is ambiguity. The answer is B — Vague.',
      h: 'If ambiguous, can you clearly understand it?',
    },
    {
      yr: 2024,
      q: 'The committee ___ its decision yesterday.',
      o: ['have reached', 'has reached', 'reached', 'were reaching'],
      a: 2,
      e: 'Yesterday indicates simple past tense. Reached is correct.',
      full: 'Tense in English is determined by time markers. "Yesterday" is a clear past-time marker — it tells you the action happened at a specific completed point in the past.\n\nThe simple past tense is formed with the past form of the verb alone. For "reach," the past form is "reached." No auxiliary verb is needed.\n\n"Have reached" and "has reached" are present perfect forms — used for actions connected to the present, not for specific past times like yesterday. "Were reaching" is past continuous, used for ongoing actions in the past, which does not suit a single completed decision. The correct answer is C — reached.',
      h: 'Yesterday tells you the tense needed.',
    },
    {
      yr: 2023,
      q: "Correct plural of 'phenomenon'",
      o: ['Phenomenons', 'Phenomenas', 'Phenomena', 'Phenomenae'],
      a: 2,
      e: 'Phenomena is the correct Greek-origin plural.',
      full: 'English borrowed many words from Greek and Latin and kept their original plural forms. "Phenomenon" comes from Greek, and its plural follows the Greek pattern: phenomenon becomes phenomena.\n\nThis is similar to other Greek-origin words: criterion becomes criteria, datum becomes data, medium becomes media. The English plural "phenomenons" is sometimes used informally but is not standard. "Phenomenas" and "phenomenae" are simply wrong — they do not follow any recognised pattern.',
      h: 'Greek words often keep their original plural endings.',
    },
    {
      yr: 2023,
      q: "'The wind whispered through the trees' — figure of speech?",
      o: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
      a: 2,
      e: 'Personification gives human qualities to non-human things. Wind cannot whisper.',
      full: 'Whisper is a human action — it requires vocal cords, breath, and intent. Wind is not a living being and has no ability to whisper. When a writer gives a non-human thing a human quality or action like this, the figure of speech is called personification.\n\nA simile would compare the wind to something using "like" or "as." A metaphor would directly state the wind IS something else. Hyperbole is a wild exaggeration. None of those apply here — the defining element is the human verb "whispered" being given to the non-human wind.',
      h: 'Wind is doing something only humans can do.',
    },
    {
      yr: 2024,
      q: 'Word nearest in meaning to VERBOSE',
      o: ['Brief', 'Wordy', 'Silent', 'Rude'],
      a: 1,
      e: 'Verbose means using more words than necessary. Wordy is the closest synonym.',
      full: 'Verbose comes from the Latin verbum, meaning "word." A verbose person or text uses far more words than needed to express a simple idea — they ramble, repeat, and overcomplicate. Wordy means exactly the same thing.\n\nBrief is the antonym of verbose — brief means short and concise. Silent means not speaking at all, which is the opposite of verbose. Rude describes manner or tone, not quantity of words. The answer is B — Wordy.',
      h: 'Verb relates to words. Too many = too wordy?',
    },
    {
      yr: 2023,
      q: 'Neither John nor his brothers ___ present.',
      o: ['was', 'were', 'is', 'are'],
      a: 1,
      e: 'With neither-nor, verb agrees with the closest subject. Brothers is plural so were is correct.',
      full: 'The neither...nor construction is a correlative conjunction. A common grammar rule applies: when using neither...nor, the verb agrees with the subject CLOSEST to it (this is called the proximity rule).\n\nIn this sentence, the two subjects are "John" (singular) and "his brothers" (plural). "Brothers" comes immediately before the verb, so the verb must be plural. The plural past tense of "to be" is "were," not "was" or "is." \n\nIf the sentence were reversed — "Neither his brothers nor John was present" — then "was" would be correct because "John" (singular) would be closest to the verb.',
      h: 'Which subject is closest to the verb?',
    },
    {
      yr: 2022,
      q: 'Grammatically correct sentence',
      o: [
        'Between you and I',
        'Between you and me',
        'Between you and myself',
        'Between I and you',
      ],
      a: 1,
      e: 'Between is a preposition requiring object pronouns. Me is the correct object form.',
      full: 'Prepositions like between, for, with, to, and from are always followed by object pronouns (me, him, her, us, them), never subject pronouns (I, he, she, we, they).\n\nPeople often say "between you and I" thinking it sounds formal or correct, but this is actually a grammar error. "I" is a subject pronoun — it should be used as the subject of a sentence, not after a preposition. "Me" is the object form, and "between" requires the object form.\n\n"Myself" is a reflexive pronoun — it refers back to the subject of the sentence and cannot be used simply as an object after a preposition in this context. The answer is B — Between you and me.',
      h: 'After a preposition, use object pronouns.',
    },
    {
      yr: 2024,
      q: 'Word opposite in meaning to TACITURN',
      o: ['Quiet', 'Talkative', 'Shy', 'Reserved'],
      a: 1,
      e: 'Taciturn means reserved and reluctant to speak. Antonym is talkative.',
      full: 'Taciturn describes someone who rarely speaks, keeps to themselves, and says very little. It comes from the Latin tacitus, meaning "silent." A taciturn person is naturally quiet and reserved in social situations.\n\nThe antonym (opposite) would describe someone who talks freely and often — that is talkative. Quiet and reserved are synonyms of taciturn, not antonyms. Shy is related but not the opposite — a shy person wants to speak but feels anxious, while a taciturn person simply does not feel the need to speak much.',
      h: "If someone is taciturn, they don't talk much. Opposite?",
    },
    {
      yr: 2024,
      q: 'Correctly spelt word',
      o: ['Accomodation', 'Accommodation', 'Acommodation', 'Acomodation'],
      a: 1,
      e: 'Accommodation has double c and double m: Ac-com-mo-da-tion.',
      full: 'Accommodation is one of the most commonly misspelled words in English. The trick is remembering it has BOTH a double c and a double m.\n\nThink of it this way: you need two cots (cc) and two mattresses (mm) for accommodation. Or remember the pattern: ac-COM-mo-da-tion — the two middle consonants are doubled.\n\nNone of the other options have both doubles correctly placed. Accomodation has the double c but only one m. Acommodation has neither correct. Acomodation gets both wrong.',
      h: 'Double c, double m.',
    },
    {
      yr: 2023,
      q: "'I will see him tomorrow' is in the ___ tense",
      o: [
        'Simple present',
        'Simple past',
        'Simple future',
        'Present continuous',
      ],
      a: 2,
      e: 'Will see indicates simple future tense. Tomorrow confirms future time.',
      full: 'The simple future tense in English is formed with will + base verb. "Will see" follows this pattern exactly. "Tomorrow" is a future time adverb that confirms the action has not happened yet and is planned for the future.\n\nSimple present would be "I see him" — used for habits or general truths, not scheduled future events. Simple past would be "I saw him" — for completed past actions. Present continuous ("I am seeing him") can sometimes express near-future plans but typically describes actions happening right now. The simple future is the most precise and natural tense here.',
      h: 'Will + verb = which tense?',
    },
    {
      yr: 2022,
      q: 'Correct use of the apostrophe',
      o: [
        "The boys' books",
        "The boys's books",
        "The boy's' books",
        "The boys book's",
      ],
      a: 0,
      e: 'For plural nouns ending in s, apostrophe comes AFTER the s.',
      full: 'Apostrophes for possession follow two rules. For singular nouns, add apostrophe + s: the boy\'s book (one boy\'s book). For plural nouns that already end in s, add only an apostrophe after the s: the boys\' books (books belonging to multiple boys).\n\n"The boys\'s books" is wrong — you never add an extra s after the apostrophe for plural nouns ending in s. "The boy\'s\' books" is meaningless. "The boys book\'s" puts the apostrophe in the wrong place entirely. The correct form is "The boys\' books" — apostrophe after the s, signalling plural possession.',
      h: 'Plural possessive: apostrophe after the s.',
    },
    {
      yr: 2024,
      q: 'IMPECUNIOUS most nearly means',
      o: ['Wealthy', 'Poor', 'Generous', 'Stingy'],
      a: 1,
      e: 'Impecunious means having little or no money.',
      full: 'Impecunious comes from the Latin impecuniosus — in (not) + pecunia (money). So it literally means "not having money" — poor or penniless.\n\nThis is a formal and slightly literary word for being broke. You might describe a struggling student or an artist who cannot pay rent as impecunious. Wealthy is the direct opposite. Generous describes how freely you give, not how much you have. Stingy means reluctant to spend money — but someone can be stingy while having plenty of it, so that is not the right meaning.',
      h: 'Pecunia is Latin for money. Im = not having.',
    },
    {
      yr: 2023,
      q: 'Correct subjunctive mood',
      o: [
        'If I was you, I would go',
        'If I were you, I would go',
        'If I am you, I will go',
        'If I be you, I go',
      ],
      a: 1,
      e: 'Subjunctive uses were for all persons in hypothetical conditions.',
      full: 'The subjunctive is a grammatical mood used for situations that are not real — hypothetical, imagined, wished for, or contrary to fact. In modern English, it appears most clearly in "if I were you" constructions.\n\nNormally, "was" is the past tense of "to be" for first person singular (I was). But in hypothetical conditions with "if," English grammar requires "were" for ALL persons — I were, he were, she were — not "was." This signals to the listener that the situation is imaginary, not real.\n\nSo "If I were you" is correct, not "If I was you." The distinction signals that you are speaking hypothetically — you are not actually that person.',
      h: 'Hypothetical conditions use a special mood form.',
    },
    {
      yr: 2022,
      q: "'The early bird catches the worm' is a",
      o: ['Metaphor', 'Proverb', 'Simile', 'Idiom'],
      a: 1,
      e: 'A proverb is a short saying expressing general wisdom.',
      full: 'The early bird catches the worm is a proverb — a short, memorable saying passed down through generations that expresses a general truth or piece of practical wisdom. In this case, the wisdom is that starting early gives you an advantage.\n\nA metaphor makes a direct comparison without using "like" or "as." A simile makes a comparison using "like" or "as." An idiom is a phrase whose meaning cannot be understood from the literal words alone.\n\nThis saying is not comparing two things (ruling out metaphor and simile), and its meaning IS clear from the words themselves with a bit of inference — it is not idiomatic in the technical sense. It is a classic proverb.',
      h: 'Short saying = general wisdom = which figure?',
    },
    {
      yr: 2024,
      q: 'He is one of the students who ___ late.',
      o: ['is', 'was', 'were', 'are'],
      a: 3,
      e: 'The antecedent of who is students (plural), so the verb must be plural: are.',
      full: 'In this sentence, "who" is a relative pronoun referring back to its antecedent — the noun it stands in for. The question is: what does "who" refer to? The full phrase is "one of the students who ___ late."\n\nThe temptation is to match the verb with "one" (singular) and say "is." But "who" refers to "students" — the whole group. The relative clause "who ___ late" describes the students, not just the one. Therefore the verb must agree with "students" — which is plural — and the correct form is "are."\n\nThis is a classic grammar trap. The answer is D — are.',
      h: 'Who refers to which noun — one or students?',
    },
    {
      yr: 2023,
      q: 'LOQUACIOUS means',
      o: ['Quiet', 'Talkative', 'Angry', 'Lazy'],
      a: 1,
      e: 'Loquacious means tending to talk a great deal.',
      full: 'Loquacious comes from the Latin loqui, meaning "to speak." A loquacious person talks constantly, freely, and at length. It is a slightly formal or literary synonym for talkative.\n\nQuiet is the opposite. Angry and lazy describe emotional states or work habits and have nothing to do with talking. The root loqui also appears in other English words like eloquent (speaking beautifully) and soliloquy (speaking alone on stage).',
      h: 'Loqui is Latin for speak.',
    },
    {
      yr: 2022,
      q: "'To bite the bullet' means to",
      o: [
        'Shoot a gun',
        'Endure a painful situation',
        'Eat something hard',
        'Run away',
      ],
      a: 1,
      e: 'To bite the bullet means to endure a painful or difficult situation stoically.',
      full: 'This idiom originated in the pre-anaesthesia era when soldiers undergoing battlefield surgery were given a bullet to bite down on to help endure the pain. Over time, the phrase evolved to mean facing and enduring any difficult, painful, or unpleasant situation without complaint.\n\nIt has nothing to do with literally shooting a gun or eating something hard. And it does not mean running away — in fact it means the opposite: staying and enduring. The key meaning is stoic endurance in the face of difficulty.',
      h: 'This is an idiom. Think about endurance.',
    },
    {
      yr: 2024,
      q: "The passive voice of 'She wrote the letter' is",
      o: [
        'The letter wrote her',
        'The letter was written by her',
        'She had written the letter',
        'The letter is written',
      ],
      a: 1,
      e: 'Passive voice: object becomes subject + was/were + past participle + by + agent.',
      full: 'In an active sentence, the subject does the action: "She wrote the letter." She is the doer (subject), wrote is the action, and the letter is the thing being acted on (object).\n\nTo make it passive, the object becomes the new subject, and the original subject becomes the agent (introduced with "by"). The verb changes to was/were + past participle: "The letter was written by her."\n\n"Her" is correct here (object form after "by"), not "she." "The letter wrote her" reverses the logic nonsensically. "She had written the letter" is past perfect, not passive. "The letter is written" is passive but present tense — missing the "by her" agent.',
      h: 'Object (letter) becomes the subject in passive voice.',
    },
    {
      yr: 2023,
      q: 'Choose the correct option: The news ___ surprising.',
      o: ['were', 'are', 'is', 'have been'],
      a: 2,
      e: 'News is an uncountable noun treated as singular, so takes a singular verb: is.',
      full: 'News looks like a plural noun because it ends in s, but it is actually an uncountable noun in English — it refers to information in general, not individual countable items. Like water, information, or advice, it is treated as singular.\n\nThis means it takes a singular verb: "The news IS surprising," not "are." Similarly, you would say "The advice is helpful" and "The information is correct."\n\nWere and are are plural forms. Have been is present perfect plural. All three are incorrect for a singular uncountable noun like news.',
      h: 'Is news singular or plural in English grammar?',
    },
    {
      yr: 2022,
      q: 'EPHEMERAL means',
      o: ['Long-lasting', 'Short-lived', 'Colourful', 'Enormous'],
      a: 1,
      e: 'Ephemeral means lasting for a very short time.',
      full: 'Ephemeral comes from the Greek ephemeros — epi (on) + hemera (day) — meaning "lasting only a day." In modern English it refers to anything that is fleeting, transient, or short-lived.\n\nMayflies are the classic example — they live for only a day or two. A rainbow, a moment of perfect weather, the cherry blossoms in spring — all ephemeral. Long-lasting is the direct opposite. Colourful and enormous describe appearance and size, which have nothing to do with duration.',
      h: "Think mayflies. Ephemeral things don't last long.",
    },
    {
      yr: 2024,
      q: 'Which sentence contains a dangling modifier?',
      o: [
        'Running fast, he won the race',
        'Running fast, the race was won',
        'She ran fast and won',
        'He ran fast to win',
      ],
      a: 1,
      e: "'Running fast, the race was won' has a dangling modifier because the race cannot run fast.",
      full: 'A dangling modifier is a descriptive phrase that does not clearly or logically connect to the noun it is supposed to modify. The phrase "dangles" because the subject it should describe is missing or misplaced.\n\nIn "Running fast, the race was won" — who is running fast? The sentence says the race is running fast, which makes no sense. The race cannot run. The modifier "running fast" is left dangling because the person who was actually running fast (the athlete) is not mentioned.\n\nThe correct version would be: "Running fast, he won the race." Now the modifier clearly connects to "he" — the person who was running fast. Options C and D are grammatically correct sentences with no dangling modifiers.',
      h: 'A dangling modifier has no clear subject to modify.',
    },
    {
      yr: 2023,
      q: "The plural of 'datum' is",
      o: ['Datums', 'Datas', 'Data', 'Datae'],
      a: 2,
      e: 'Data is the correct plural of datum. It comes from Latin.',
      full: 'Latin borrowed many words into English, and some kept their Latin plural forms. Datum (singular) becomes data (plural). Similarly, criterion becomes criteria, medium becomes media, formula becomes formulae.\n\nIn formal academic and scientific writing, "data" is treated as plural: "The data are inconclusive." In everyday modern English, "data" is increasingly treated as singular, but in JAMB grammar, the classical plural "data" is the expected answer.\n\nDatums is an informal Anglicised plural. Datas and datae are not recognised forms in any standard usage.',
      h: 'Latin origin: datum (singular).',
    },
    {
      yr: 2022,
      q: 'SYCOPHANT means',
      o: ['A leader', 'A flatterer', 'A scholar', 'A warrior'],
      a: 1,
      e: 'A sycophant is a person who flatters powerful people to gain favour.',
      full: 'A sycophant is someone who uses excessive flattery, praise, and agreement to gain favour with powerful or influential people. They say what those in power want to hear, regardless of truth, purely for personal advancement.\n\nIn politics, a sycophant is a yes-man — someone who never challenges authority and constantly praises their superiors. Sycophancy is generally viewed negatively because it is dishonest and self-serving.\n\nThe word has ancient origins — in ancient Greece, a sykophantes was an informer or someone who made accusations for personal gain. Over time it evolved to mean a servile flatterer.',
      h: 'Sycophants tell people only what they want to hear.',
    },
    {
      yr: 2024,
      q: "Identify the gerund: 'Swimming is good exercise'",
      o: ['Swimming', 'good', 'exercise', 'is'],
      a: 0,
      e: 'A gerund is a verb form ending in -ing that functions as a noun. Swimming is the subject here.',
      full: 'A gerund is a verb that has been converted into a noun by adding -ing. It looks exactly like a present participle but functions differently — it acts as a noun (as subject, object, or complement) rather than as part of a verb phrase.\n\nIn "Swimming is good exercise," the word swimming is doing the job of a noun — it is the subject of the sentence (what is good exercise?). You could replace it with "Football is good exercise" and the structure would be the same.\n\nContrast with: "She is swimming" — here swimming is a present participle, part of the verb phrase "is swimming." Same word form, different grammatical function.',
      h: 'Which word ends in -ing and acts as a noun?',
    },
    {
      yr: 2023,
      q: 'AMELIORATE means',
      o: ['Worsen', 'Improve', 'Destroy', 'Create'],
      a: 1,
      e: 'To ameliorate means to make something bad or unsatisfactory better.',
      full: 'Ameliorate comes from the Latin meliorare — melior means "better." To ameliorate a situation means to improve it, especially when it was previously bad, difficult, or painful.\n\nA doctor might ameliorate a patient\'s suffering with medication. Policies might ameliorate poverty. The word carries a sense of gradual improvement from a negative starting point.\n\nWorsen is the direct opposite. Destroy and create do not relate to improving something. Ameliorate is a formal vocabulary word frequently tested in JAMB English to see if students know advanced synonyms for "improve."',
      h: 'Melior is Latin for better.',
    },
    {
      yr: 2022,
      q: 'Choose the correct option: I ___ him since Monday.',
      o: ["didn't see", "haven't seen", "don't see", "wasn't seeing"],
      a: 1,
      e: 'Since indicates a continuing action from a point in the past. Present perfect is required.',
      full: 'The word "since" signals that an action began at a specific point in the past and continues to be relevant or true up to the present. This calls for the present perfect tense.\n\nPresent perfect is formed with have/has + past participle. "Haven\'t seen" = have not seen — I started not seeing him since Monday and that situation continues to now.\n\n"Didn\'t see" is simple past — used for completed actions at a specific past time, not continuing situations. "Don\'t see" is simple present — for habits or general truths. "Wasn\'t seeing" is past continuous — for interrupted or ongoing past actions, not for use with "since" in this context.',
      h: 'Since + present perfect tense.',
    },
    {
      yr: 2024,
      q: 'An OXYMORON is',
      o: [
        'A combination of contradictory terms',
        'A very long word',
        'A figure using like or as',
        'A type of rhyme',
      ],
      a: 0,
      e: 'An oxymoron combines contradictory terms for effect, e.g. deafening silence.',
      full: 'An oxymoron is a figure of speech that deliberately combines two contradictory or opposite words to create a striking, thought-provoking expression. The contradiction forces the reader or listener to think about a deeper meaning.\n\nExamples: "deafening silence" (silence cannot be deafening), "living death," "bittersweet," "cruel kindness," "clearly confused," "organised chaos." The clash between the two words creates tension and depth of meaning.\n\nThe word comes from Greek oxys (sharp) + moros (dull or foolish) — itself an oxymoron. It is different from a paradox (a statement that seems self-contradictory but reveals a truth) and different from a simile or metaphor.',
      h: 'Oxy + moron = sharp + dull in Greek. Contradiction.',
    },
    {
      yr: 2023,
      q: "The indirect object in 'She gave him a gift' is",
      o: ['She', 'gave', 'him', 'gift'],
      a: 2,
      e: 'The indirect object is him — the recipient of the direct object (gift).',
      full: 'In a sentence with two objects, the direct object is the thing being acted upon and the indirect object is the person or thing that receives or benefits from the direct object.\n\nIn "She gave him a gift": She is the subject. Gave is the verb. A gift is the direct object — the thing being given. Him is the indirect object — the recipient of the gift.\n\nA simple test: the direct object answers "gave WHAT?" (A gift). The indirect object answers "gave to WHOM?" (Him). Indirect objects are typically people or entities that receive, benefit from, or are affected by the action.',
      h: 'Who received the gift?',
    },
    {
      yr: 2022,
      q: 'TACIT means',
      o: [
        'Understood without being stated',
        'Loudly expressed',
        'Written clearly',
        'Formally agreed',
      ],
      a: 0,
      e: 'Tacit means understood or implied without being directly stated.',
      full: 'Something tacit exists by implication, mutual understanding, or unspoken agreement — it has never been explicitly stated but everyone involved understands it to be the case.\n\nA tacit agreement is one that nobody ever formally made but both parties act as though they made it. A tacit assumption is one nobody said out loud but everyone took for granted. Tacit knowledge is skills and understanding that are difficult to put into words.\n\nThe word comes from Latin tacitus, meaning silent. It is related to taciturn (a person who speaks very little). The key idea is that something tacit operates quietly, without being spoken — understood without being stated.',
      h: 'Tacit agreement = agreement that nobody spoke aloud.',
    },
    {
      yr: 2024,
      q: "'He works like a horse' is an example of",
      o: ['Metaphor', 'Simile', 'Hyperbole', 'Personification'],
      a: 1,
      e: 'A simile makes a comparison using like or as.',
      full: "A simile makes a comparison using the signal words 'like' or 'as.' These words alert the reader that a comparison is being made, which makes a simile gentler and more explicit than a metaphor.\n\n'He works like a horse' — the comparison is between his work ethic and a horse's strength and endurance. The word 'like' signals it is a comparison, not a literal statement.\n\nA metaphor would say 'He is a horse at work.' A personification gives human qualities to non-human things. Hyperbole is wild exaggeration. Alliteration is repetition of initial sounds. The simile is identified by the presence of 'like' or 'as' in a comparison.",
      h: 'Which figure of speech uses like or as?',
    },
  ],
  biology: [
    {
      yr: 2024,
      q: 'The powerhouse of the cell is the',
      o: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'],
      a: 1,
      e: 'Mitochondria produce ATP through cellular respiration.',
      full: 'Every living cell needs energy to perform its functions — dividing, growing, moving, making proteins. That energy comes in the form of a molecule called ATP (adenosine triphosphate), which works like a rechargeable battery for the cell.\n\nMitochondria are the organelles where ATP is manufactured through a process called cellular respiration. They take in glucose and oxygen and convert them into ATP, releasing carbon dioxide and water as by-products. Because they are the primary energy producers of the cell, they earned the nickname "the powerhouse of the cell."\n\nThe nucleus stores DNA and controls the cell\'s activities. Ribosomes make proteins. The Golgi body packages and ships proteins. None of these produce ATP.',
      h: "Which organelle produces the cell's energy currency?",
    },
    {
      yr: 2024,
      q: 'Universal blood donor is group',
      o: ['A', 'B', 'AB', 'O'],
      a: 3,
      e: 'Blood group O negative lacks A and B antigens that could cause reactions.',
      full: "When blood is transfused into a patient, the recipient's immune system checks for antigens on the surface of the incoming red blood cells. If it finds unfamiliar antigens, it launches an immune attack — a potentially fatal transfusion reaction.\n\nBlood group O negative red blood cells have neither A antigens nor B antigens on their surface. This means a patient of ANY blood group cannot recognise them as foreign — there is nothing to trigger an immune attack. That is why O negative is called the universal donor.\n\nBlood group AB positive is the universal RECIPIENT — people with AB+ can receive blood from any group because their immune system already tolerates both A and B antigens.",
      h: 'Which group has NO antigens that can cause rejection?',
    },
    {
      yr: 2023,
      q: 'Photosynthesis takes place in the',
      o: ['Mitochondria', 'Chloroplast', 'Nucleus', 'Vacuole'],
      a: 1,
      e: 'Chloroplasts contain chlorophyll and are the site of photosynthesis.',
      full: "Chlorophyll is the green pigment that absorbs sunlight and uses it to drive the chemical reactions of photosynthesis. It is found inside organelles called chloroplasts, which are present mainly in the cells of green plant leaves.\n\nMitochondria are found in both plants and animals and are the site of respiration, not photosynthesis. The nucleus contains DNA and controls the cell's activities. The vacuole stores water and waste products.\n\nChloroplasts are unique to plants (and some algae) — animal cells do not have them, which is why animals cannot photosynthesise and must eat food to obtain energy.",
      h: 'Which organelle contains chlorophyll?',
    },
    {
      yr: 2024,
      q: 'Green plants make food through',
      o: ['Respiration', 'Transpiration', 'Photosynthesis', 'Digestion'],
      a: 2,
      e: 'Photosynthesis uses sunlight, CO2 and water to produce glucose and oxygen.',
      full: "Plants make their own food through photosynthesis — a chemical process that takes place inside chloroplasts. The raw materials are carbon dioxide (absorbed from the air through tiny pores called stomata) and water (absorbed from the soil through roots). Sunlight provides the energy needed to drive the reaction.\n\nThe products are glucose — the plant's food — and oxygen, which is released into the air as a by-product. This is why plants are essential for life on Earth: they produce the oxygen we breathe while removing CO2 from the atmosphere.\n\nRespiration is the reverse process — it releases energy from glucose. Transpiration is water loss. Digestion is food breakdown in animals.",
      h: 'Photo = light. Synthesis = making.',
    },
    {
      yr: 2023,
      q: 'NOT a function of the liver',
      o: [
        'Detoxification',
        'Production of bile',
        'Filtration of blood',
        'Secretion of insulin',
      ],
      a: 3,
      e: 'Insulin is secreted by the pancreas, not the liver.',
      full: 'The liver is a remarkable organ with over 500 functions. It detoxifies harmful substances in the blood, produces bile (which helps digest fats), stores glycogen (for blood sugar regulation), makes blood-clotting proteins, and filters old red blood cells.\n\nHowever, insulin — the hormone that lowers blood glucose levels — is produced by specialised cells called beta cells in the islets of Langerhans within the pancreas. The pancreas is a separate organ located behind the stomach.\n\nConfusing the pancreas and the liver is a very common mistake. Remember: the liver stores and releases glucose, but the pancreas produces the insulin that controls how glucose is used.',
      h: "The liver doesn't produce blood sugar hormones.",
    },
    {
      yr: 2022,
      q: 'Osmosis is movement of water from',
      o: [
        'Low to high concentration',
        'High to low water potential',
        'Low to high pressure',
        'High to low temperature',
      ],
      a: 1,
      e: 'Osmosis is movement from high water potential to low water potential through a semi-permeable membrane.',
      full: 'Water potential is a measure of the tendency of water molecules to move from one place to another. Pure water has the highest water potential. Adding dissolved substances (solutes) lowers water potential.\n\nOsmosis is the specific movement of water molecules across a semi-permeable membrane (a membrane that lets water through but not dissolved substances) from where water potential is HIGH (more dilute solution) to where it is LOW (more concentrated solution).\n\nThis is how plant cells absorb water from the soil — the cell contents are more concentrated than the soil water, creating a water potential gradient that drives water in. It is also why eating salty food dehydrates you — the high salt concentration in food draws water out of cells.',
      h: 'Water moves DOWN its potential gradient.',
    },
    {
      yr: 2024,
      q: 'The genetic material in most organisms is',
      o: ['RNA', 'Protein', 'DNA', 'Lipid'],
      a: 2,
      e: 'DNA carries genetic information in most organisms.',
      full: 'DNA (deoxyribonucleic acid) is the molecule that stores and transmits genetic information. It contains instructions for building proteins, controlling cell functions, and passing characteristics from parents to offspring.\n\nRNA (ribonucleic acid) plays a role in reading and using the instructions in DNA to make proteins, but it is not the primary storage molecule. Proteins are built FROM the instructions in DNA — they are the products, not the blueprint. Lipids (fats) are structural and energy-storage molecules with no genetic information role.\n\nIn viruses, RNA can be the genetic material, but in virtually all living organisms — bacteria, plants, fungi, and animals — DNA is the genetic material.',
      h: 'What molecule stores genetic information?',
    },
    {
      yr: 2023,
      q: 'Which part of the brain controls balance?',
      o: ['Cerebrum', 'Cerebellum', 'Medulla oblongata', 'Hypothalamus'],
      a: 1,
      e: 'The cerebellum coordinates voluntary movements and maintains balance.',
      full: 'The brain has several distinct regions with specific functions. The cerebrum (the large folded outer region) handles conscious thought, memory, language, sensory processing, and voluntary movement commands. The medulla oblongata controls involuntary functions like breathing, heart rate, and swallowing. The hypothalamus regulates body temperature, hunger, thirst, and hormones.\n\nThe cerebellum — literally "little brain" — sits at the back and bottom of the brain. Its job is to coordinate smooth, precise movements and maintain posture and balance. It receives signals from the muscles and sensory organs and fine-tunes motor commands so that movements are fluid, not jerky.\n\nDamage to the cerebellum causes loss of coordination, unsteady walking, and tremors.',
      h: 'Cerebellum means little brain — specialises in coordination.',
    },
    {
      yr: 2022,
      q: 'The basic unit of life is',
      o: ['Tissue', 'Organ', 'Cell', 'Organism'],
      a: 2,
      e: 'The cell is the smallest structural and functional unit of living organisms.',
      full: 'Life is organised in levels of increasing complexity: cells → tissues → organs → organ systems → organisms. The cell is the foundation of this hierarchy — the smallest unit that can perform all the basic functions of life: obtaining energy, responding to stimuli, reproducing, and maintaining homeostasis.\n\nA tissue is a group of similar cells working together (like muscle tissue or nerve tissue). An organ is made of multiple tissue types working together (like the heart). An organism is the complete living individual.\n\nViruses are smaller than cells but are debated as to whether they are truly "alive" — they cannot reproduce without hijacking a host cell. For JAMB purposes, the cell is the basic unit of life.',
      h: 'Smallest unit that can carry out all life functions.',
    },
    {
      yr: 2024,
      q: 'Anaerobic respiration in yeast produces',
      o: [
        'CO2 and water',
        'Ethanol and CO2',
        'Lactic acid only',
        'Oxygen and glucose',
      ],
      a: 1,
      e: 'Yeast fermentation produces ethanol and carbon dioxide.',
      full: 'When oxygen is unavailable, yeast switches from aerobic respiration to anaerobic respiration — also called fermentation. Instead of fully breaking down glucose to carbon dioxide and water (as in aerobic respiration), fermentation only partially breaks it down.\n\nThe products are ethanol (alcohol) and carbon dioxide gas. This is the biological basis of the brewing and baking industries. In brewing, the ethanol is the desired product. In baking, the CO2 is the desired product — it causes bread dough to rise.\n\nIn human muscle cells, a different form of anaerobic respiration produces lactic acid (not ethanol) when oxygen runs out during intense exercise. That is why you feel muscle burn during a hard sprint — but that is human muscle, not yeast.',
      h: 'Fermentation in brewing produces alcohol.',
    },
    {
      yr: 2023,
      q: 'Hormone for fight or flight response',
      o: ['Insulin', 'Oestrogen', 'Adrenaline', 'Thyroxine'],
      a: 2,
      e: 'Adrenaline is released by adrenal glands during stress.',
      full: "The fight or flight response is the body's emergency system. When you face a threat — whether a dangerous situation or an exam you're not prepared for — your brain signals the adrenal glands (small glands that sit on top of your kidneys) to release adrenaline (also called epinephrine).\n\nAdrenaline rapidly prepares your body for action: heart rate increases to pump more blood to muscles, breathing quickens, pupils dilate for better vision, blood glucose rises for quick energy, and non-essential functions (like digestion) slow down.\n\nInsulin controls blood sugar. Oestrogen is a female sex hormone. Thyroxine regulates metabolism. None of these produce the fight or flight response.",
      h: "Which hormone is released when you're scared or excited?",
    },
    {
      yr: 2022,
      q: 'Example of asexual reproduction',
      o: ['Fertilisation', 'Budding', 'Pollination', 'Mating'],
      a: 1,
      e: 'Budding is asexual reproduction where a new organism grows from a bud on the parent.',
      full: 'Asexual reproduction involves only one parent and produces offspring genetically identical to that parent. Budding is one type — a small outgrowth (bud) forms on the parent organism, grows, and eventually detaches to become a new independent organism.\n\nYeast (a fungus) reproduces by budding. Hydra (a simple aquatic animal) also reproduces this way. The offspring is a clone of the parent.\n\nFertilisation, pollination, and mating all involve two parents (male and female gametes combining) — these are all forms of sexual reproduction. Only budding is a single-parent asexual process among the options.',
      h: 'Asexual means one parent.',
    },
    {
      yr: 2024,
      q: 'Function of haemoglobin',
      o: [
        'Fight infection',
        'Transport oxygen',
        'Produce energy',
        'Digest food',
      ],
      a: 1,
      e: 'Haemoglobin is an iron-containing protein in red blood cells that binds and transports oxygen.',
      full: 'Haemoglobin is a protein found in red blood cells. Each haemoglobin molecule contains four iron-containing units called haem groups. Oxygen binds to these iron atoms in the lungs, where oxygen concentration is high, forming oxyhaemoglobin.\n\nAs the blood travels to tissues where oxygen concentration is lower, haemoglobin releases the oxygen for cells to use in respiration. The red blood cells then carry carbon dioxide back to the lungs for exhalation.\n\nWhite blood cells fight infection. Red blood cells carry oxygen thanks to haemoglobin — but haemoglobin itself is the specific molecule doing the carrying. Haemoglobin does not produce energy directly, nor does it digest food.',
      h: 'What makes red blood cells useful for the body?',
    },
    {
      yr: 2023,
      q: 'Fungi belong to kingdom',
      o: ['Plantae', 'Animalia', 'Fungi', 'Protista'],
      a: 2,
      e: 'Fungi are classified in their own kingdom.',
      full: 'For a long time, fungi were classified as plants because they do not move. But fungi are fundamentally different from plants in several key ways: they cannot photosynthesise (they have no chlorophyll), their cell walls are made of chitin (not cellulose like plant cells), and they obtain nutrition by absorbing organic matter from their environment.\n\nFungi are also different from animals — they are mostly multicellular (except yeast), have cell walls, and do not ingest food. And they are more complex than Protista (single-celled organisms).\n\nBecause fungi do not fit neatly into any other kingdom, they have been given their own kingdom — Fungi. This kingdom includes mushrooms, moulds, yeasts, and mildews.',
      h: 'Fungi have their own kingdom named after them.',
    },
    {
      yr: 2022,
      q: 'Removing metabolic waste from the body is called',
      o: ['Digestion', 'Excretion', 'Secretion', 'Absorption'],
      a: 1,
      e: 'Excretion removes metabolic waste products from the body.',
      full: 'Metabolism is the sum of all chemical reactions happening inside living organisms. These reactions produce waste products as by-products — carbon dioxide from respiration, urea from protein breakdown, water from various reactions.\n\nExcretion is specifically the removal of these METABOLIC waste products from the body. The lungs excrete CO2, the kidneys excrete urea in urine, and the skin excretes some salts and water in sweat.\n\nDigestion is the breakdown of food into absorbable nutrients. Secretion is the release of useful substances (like enzymes or hormones) from cells or glands — the opposite of excretion. Absorption is taking nutrients into the blood from the digestive system.',
      h: 'Removing METABOLIC waste specifically.',
    },
    {
      yr: 2024,
      q: 'The process by which plants lose water is called',
      o: ['Photosynthesis', 'Transpiration', 'Respiration', 'Excretion'],
      a: 1,
      e: 'Transpiration is the process by which plants lose water vapour through stomata.',
      full: 'Plants absorb water from the soil through their roots, which travels up through the stem to the leaves. In the leaves, this water evaporates from the cell surfaces and exits through tiny pores called stomata, mainly on the underside of leaves. This process of water loss is called transpiration.\n\nTranspiration serves important functions: it creates a tension that pulls water up from the roots (the transpiration stream), it cools the leaf surface, and it enables gas exchange. However, in very hot or dry conditions, stomata close to reduce water loss, which also reduces CO2 uptake and slows photosynthesis.\n\nThink of transpiration as the plant version of sweating.',
      h: 'Think of it as plants sweating.',
    },
    {
      yr: 2023,
      q: 'Which blood cells are responsible for immunity?',
      o: ['Red blood cells', 'Platelets', 'White blood cells', 'Plasma'],
      a: 2,
      e: 'White blood cells (leucocytes) are responsible for immune defence against pathogens.',
      full: "The blood contains three main cellular components: red blood cells (erythrocytes), white blood cells (leucocytes), and platelets (thrombocytes). Each has a distinct function.\n\nWhite blood cells are the immune system's soldiers. There are several types — neutrophils engulf and destroy bacteria, lymphocytes produce antibodies, and macrophages consume foreign particles and dead cells. Together they protect the body from infection by bacteria, viruses, fungi, and parasites.\n\nRed blood cells carry oxygen using haemoglobin. Platelets help blood to clot and stop bleeding. Plasma is the liquid component carrying nutrients, hormones, and waste. None of these are responsible for immune defence — only white blood cells are.",
      h: 'Which cells fight infection?',
    },
    {
      yr: 2022,
      q: 'The site of protein synthesis in a cell is the',
      o: ['Nucleus', 'Mitochondria', 'Ribosome', 'Vacuole'],
      a: 2,
      e: 'Ribosomes are the sites where proteins are synthesised using mRNA instructions.',
      full: 'Protein synthesis is one of the most important processes in any living cell — proteins carry out virtually every function of life. The process involves two steps: transcription (DNA → mRNA in the nucleus) and translation (mRNA → protein at the ribosome).\n\nRibosomes read the messenger RNA (mRNA) sequence and use it as instructions to assemble amino acids into a protein chain. Ribosomes are found floating freely in the cytoplasm or attached to the rough endoplasmic reticulum.\n\nThe nucleus stores the DNA blueprint. Mitochondria generate energy. The vacuole stores water and waste. Only ribosomes are the actual protein-building machines.',
      h: 'Which organelle reads mRNA to build proteins?',
    },
    {
      yr: 2024,
      q: 'AIDS is caused by',
      o: ['Bacteria', 'Virus', 'Fungi', 'Protozoa'],
      a: 1,
      e: 'AIDS is caused by HIV (Human Immunodeficiency Virus).',
      full: 'AIDS stands for Acquired Immunodeficiency Syndrome — a condition where the immune system is so severely damaged that the body cannot fight ordinary infections and cancers. AIDS is caused by the Human Immunodeficiency Virus (HIV).\n\nHIV attacks and destroys CD4+ T cells — a critical component of the immune system. As CD4+ cell counts fall, the body becomes increasingly vulnerable to opportunistic infections (infections that healthy immune systems would easily resist).\n\nHIV is transmitted through infected blood, sexual contact, sharing needles, or from mother to child during birth or breastfeeding. HIV/AIDS is a viral infection, not bacterial (B), fungal (C), or protozoan (D).',
      h: 'HIV = Human Immunodeficiency ___',
    },
    {
      yr: 2023,
      q: 'The process of cell division for growth is called',
      o: ['Meiosis', 'Mitosis', 'Fertilisation', 'Budding'],
      a: 1,
      e: 'Mitosis produces two genetically identical daughter cells for growth and repair.',
      full: 'Cell division occurs by two main processes. Mitosis produces two daughter cells that are genetically IDENTICAL to the parent cell — same number of chromosomes, same DNA. It is used for growth, repair of damaged tissues, and asexual reproduction.\n\nMeiosis produces four daughter cells that are genetically DIFFERENT from the parent cell — half the number of chromosomes (haploid). It is used only to produce sex cells (gametes): sperm and eggs in animals, pollen and ovules in plants.\n\nFertilisation is the fusion of two gametes. Budding is a form of asexual reproduction in yeast and hydra. For normal body growth and repair, mitosis is the process.',
      h: 'Mitosis = identical copies. Meiosis = sex cells.',
    },
    {
      yr: 2022,
      q: 'Which part of the eye controls the amount of light entering?',
      o: ['Retina', 'Cornea', 'Iris', 'Lens'],
      a: 2,
      e: 'The iris controls the size of the pupil, regulating how much light enters the eye.',
      full: 'The eye is a complex optical organ with multiple layers. The retina at the back contains light-sensitive cells (rods and cones) that detect light. The cornea is the transparent outer layer that refracts (bends) incoming light. The lens focuses light onto the retina.\n\nThe iris is the coloured part of the eye — it contains circular and radial muscle fibres that control the size of the pupil (the dark hole in the centre). In bright light, the iris contracts, making the pupil smaller to reduce the amount of light entering. In dim light, the iris relaxes, making the pupil larger to let in more light.\n\nThis automatic adjustment is called the pupillary reflex and protects the retina from damage caused by excess light.',
      h: 'Which coloured part of the eye expands and contracts?',
    },
    {
      yr: 2024,
      q: 'Malaria is caused by',
      o: ['Bacteria', 'Virus', 'Plasmodium', 'Fungi'],
      a: 2,
      e: 'Malaria is caused by Plasmodium parasites transmitted through Anopheles mosquito bites.',
      full: 'Malaria is one of the most significant infectious diseases in sub-Saharan Africa. It is caused by Plasmodium — a single-celled protozoan parasite. There are several species, but Plasmodium falciparum is the most deadly and most common in Nigeria.\n\nThe parasite is transmitted when a female Anopheles mosquito bites an infected person, takes in Plasmodium with the blood, and then bites another person, injecting the parasite into their bloodstream. The parasite travels to the liver, matures, then attacks red blood cells — causing the characteristic cycles of fever, chills, and sweating.\n\nMalaria is not caused by bacteria, viruses, or fungi. It is a parasitic protozoan disease.',
      h: 'Which protozoan parasite causes malaria?',
    },
    {
      yr: 2023,
      q: 'Photosynthesis produces',
      o: ['CO2 and water', 'Glucose and oxygen', 'ATP only', 'Lactic acid'],
      a: 1,
      e: 'Photosynthesis: 6CO2 + 6H2O + light energy produces glucose and O2.',
      full: 'Photosynthesis is the process by which green plants and algae convert light energy into chemical energy stored in glucose. The overall equation is:\n\n6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\nSix molecules of carbon dioxide and six molecules of water, using light energy, produce one molecule of glucose (C₆H₁₂O₆) and six molecules of oxygen gas. The oxygen is released into the atmosphere as a by-product — which is why plants are essential to sustaining oxygen levels on Earth.\n\nThe reactants are CO₂ and water. The products are glucose and oxygen. Carbon dioxide and water are CONSUMED, not produced.',
      h: 'What do plants make using sunlight?',
    },
    {
      yr: 2022,
      q: 'Enzymes are made of',
      o: ['Lipids', 'Carbohydrates', 'Proteins', 'Nucleic acids'],
      a: 2,
      e: 'Enzymes are biological catalysts made of protein.',
      full: 'A catalyst is a substance that speeds up a chemical reaction without being consumed in the process. Enzymes are biological catalysts — they speed up the thousands of chemical reactions that occur inside living cells, making life possible at normal body temperatures.\n\nEnzymes are made of protein — long chains of amino acids folded into precise three-dimensional shapes. The shape of the active site (the part of the enzyme where the reaction occurs) determines which specific reaction the enzyme catalyses. This is the lock-and-key model of enzyme action.\n\nEnzymes are highly specific (each catalyses only one reaction), sensitive to temperature and pH, and reusable. Without enzymes, most biochemical reactions would be too slow to sustain life.',
      h: 'Enzymes are biological molecules made of which macromolecule?',
    },
    {
      yr: 2024,
      q: 'Which nutrient provides the most energy per gram?',
      o: ['Carbohydrates', 'Proteins', 'Fats', 'Vitamins'],
      a: 2,
      e: 'Fats provide 9 kcal per gram, compared to 4 kcal for carbohydrates and proteins.',
      full: "The three macronutrients that provide energy are carbohydrates, proteins, and fats (lipids). Each provides a different amount of energy per gram:\n\nCarbohydrates: 4 kcal per gram — the body's preferred quick-release energy source.\nProteins: 4 kcal per gram — primarily used for building and repairing tissues, but can provide energy.\nFats: 9 kcal per gram — more than double the energy density of the others, making them the most concentrated energy store.\n\nThis is why fatty foods are high-calorie. Vitamins do not provide energy at all — they are micronutrients needed in tiny amounts for specific biochemical functions.",
      h: 'Which macronutrient is most energy-dense?',
    },
    {
      yr: 2023,
      q: 'The heart is made of which type of muscle?',
      o: ['Skeletal', 'Smooth', 'Cardiac', 'Striated'],
      a: 2,
      e: 'The heart is made of cardiac muscle, which contracts involuntarily and never fatigues.',
      full: 'The body has three types of muscle tissue: skeletal (voluntary, striated — the muscles you consciously control), smooth (involuntary, non-striated — in the walls of organs like the stomach and intestines), and cardiac (involuntary, striated — found only in the heart).\n\nCardiac muscle is unique in several ways: it is involuntary (you cannot stop your heart from beating through conscious effort), it is striated like skeletal muscle (giving it strength), and crucially — it never fatigues. The heart beats approximately 100,000 times a day, every day of your life, without rest.\n\nThis tireless nature of cardiac muscle is due to its high density of mitochondria (for constant energy supply) and intercalated discs that enable coordinated electrical impulses across all heart cells simultaneously.',
      h: 'Which muscle type is unique to the heart?',
    },
    {
      yr: 2022,
      q: 'Chromosomes are found in the',
      o: ['Cytoplasm', 'Mitochondria', 'Nucleus', 'Ribosome'],
      a: 2,
      e: 'Chromosomes carrying DNA are located in the nucleus of the cell.',
      full: 'The nucleus is the control centre of the cell, often called the "brain" of the cell. It contains the cell\'s genetic material in the form of chromosomes — tightly coiled structures made of DNA wrapped around proteins called histones.\n\nHuman cells (except red blood cells and mature sperm/egg) contain 46 chromosomes arranged in 23 pairs. During cell division, the chromosomes become visible under a microscope as distinct X-shaped structures.\n\nChromosomes are not found in the cytoplasm (the fluid surrounding organelles), not in the mitochondria (which have their own small circular DNA, but not chromosomes), and not in ribosomes (which read the instructions encoded in chromosomes).',
      h: "Where is the cell's genetic material stored?",
    },
    {
      yr: 2024,
      q: 'The function of the stomata in plants is to',
      o: [
        'Absorb water',
        'Allow gas exchange',
        'Produce glucose',
        'Store food',
      ],
      a: 1,
      e: 'Stomata are pores on leaves that allow gas exchange and water vapour out.',
      full: 'Stomata (singular: stoma) are microscopic pores found mainly on the underside of leaves. Each stoma is surrounded by a pair of guard cells that control whether the stoma is open or closed.\n\nWhen stomata are open, they allow: carbon dioxide to enter the leaf for photosynthesis, oxygen produced by photosynthesis to exit, and water vapour to escape (transpiration). This gas exchange is essential for plant life.\n\nDuring the day in sunlight, stomata are typically open for gas exchange. At night or during water stress (drought), they close to conserve water — but this also reduces CO₂ uptake and slows photosynthesis. The balance between gas exchange and water conservation is a fundamental challenge for plant life.',
      h: 'Small pores on leaves — what do they do?',
    },
    {
      yr: 2023,
      q: 'Blood clotting involves which blood component?',
      o: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'],
      a: 2,
      e: 'Platelets (thrombocytes) are responsible for blood clotting to stop bleeding.',
      full: 'When a blood vessel is damaged, the body must quickly seal the breach to prevent excessive blood loss. Platelets — also called thrombocytes — are tiny cell fragments (not full cells) produced in bone marrow. They circulate in the blood and are activated when they encounter a damaged vessel wall.\n\nActivated platelets become sticky and clump together at the damage site, forming a temporary plug. They also release chemicals that trigger a cascade of reactions involving clotting proteins (like fibrinogen converting to fibrin) to form a proper blood clot — a mesh of fibres that seals the wound.\n\nPeople with too few platelets (thrombocytopenia) bleed excessively even from minor injuries.',
      h: 'Which blood component patches wounds?',
    },
    {
      yr: 2022,
      q: 'The kidneys are part of which system?',
      o: [
        'Digestive system',
        'Respiratory system',
        'Excretory system',
        'Nervous system',
      ],
      a: 2,
      e: 'The kidneys filter blood and produce urine as part of the excretory system.',
      full: 'The kidneys are paired bean-shaped organs located in the lower back. Their primary function is to filter waste products and excess substances from the blood, producing urine which is then excreted from the body.\n\nBlood enters each kidney through the renal artery. Inside the kidney, millions of tiny filtering units called nephrons remove urea (a waste product of protein metabolism), excess water, salts, and other substances. The filtered fluid becomes urine, which flows to the bladder.\n\nThis makes the kidneys a central organ of the excretory system. The digestive system breaks down food. The respiratory system handles gas exchange. The nervous system controls body functions. Only the excretory system is responsible for removing metabolic waste from the blood.',
      h: 'Which system removes waste products from the blood?',
    },
  ],
  chemistry: [
    {
      yr: 2024,
      q: 'Chemical formula for water',
      o: ['H2O2', 'HO', 'H2O', 'OH2'],
      a: 2,
      e: 'Water consists of 2 hydrogen atoms bonded to 1 oxygen atom.',
      full: 'Water is the most essential molecule for life on Earth, and its formula H2O is probably the most famous in all of science. Two hydrogen atoms (H) are each covalently bonded to one oxygen atom (O), creating a bent molecular shape.\n\nH2O2 is hydrogen peroxide — a completely different compound used as a bleaching agent and antiseptic. HO would imply one hydrogen and one oxygen with an unpaired electron — that is a hydroxyl radical, not water. OH2 is just H2O written backwards — while the atoms are the same, the conventional formula is always written H2O.',
      h: 'Most famous chemical formula.',
    },
    {
      yr: 2024,
      q: 'Atomic number of Carbon',
      o: ['6', '12', '8', '14'],
      a: 0,
      e: 'Carbon has 6 protons, giving atomic number 6. Mass number is 12.',
      full: "The atomic number of an element is defined as the number of protons in the nucleus of one atom of that element. Carbon has 6 protons, so its atomic number is 6. This number is what defines an element — change the number of protons and you have a different element entirely.\n\nThe mass number (12 for the most common carbon isotope) is the total number of protons plus neutrons. Carbon-12 has 6 protons and 6 neutrons. There is also Carbon-14 (6 protons, 8 neutrons) — same element, different mass, which makes them isotopes of each other.\n\nThe options 12, 8, and 14 refer to the mass number of carbon, oxygen's atomic number, and carbon-14 respectively — not carbon's atomic number.",
      h: 'Atomic number = number of protons.',
    },
    {
      yr: 2023,
      q: 'Example of a physical change',
      o: ['Burning wood', 'Rusting iron', 'Melting ice', 'Baking bread'],
      a: 2,
      e: 'Melting ice only changes state — composition remains H2O.',
      full: 'A physical change is one where the substance changes its form (solid, liquid, or gas) or some physical property, but no new substance is formed. The chemical identity — what the substance IS — remains the same.\n\nWhen ice melts, it changes from solid to liquid water. But it is still H2O throughout. You could freeze it again and get ice back. No new chemical bonds are formed or broken; only the arrangement of molecules changes.\n\nBurning wood creates ash, CO2, and water vapour — completely new substances. Rusting iron creates iron oxide — a new compound. Baking bread triggers chemical reactions that transform the ingredients permanently. All three are chemical changes.',
      h: 'Physical = no new substance. Which just changes state?',
    },
    {
      yr: 2024,
      q: 'pH of a neutral solution',
      o: ['0', '7', '14', '1'],
      a: 1,
      e: 'pH 7 is neutral. Below 7 is acidic, above 7 is alkaline.',
      full: 'The pH scale runs from 0 to 14 and measures the concentration of hydrogen ions (H+) in a solution. The lower the pH, the more acidic (more H+ ions). The higher the pH, the more alkaline or basic (fewer H+ ions, more OH- ions).\n\npH 7 is exactly in the middle of the scale — pure water has a pH of 7 and is considered neutral. Stomach acid is around pH 2 (very acidic). Bleach is around pH 13 (very alkaline). Blood is slightly alkaline at about pH 7.4.\n\npH 0 is the most acidic possible. pH 14 is the most alkaline. pH 1 is strongly acidic. Only pH 7 is neutral.',
      h: '0-14 scale. Neutral is exactly in the middle.',
    },
    {
      yr: 2023,
      q: 'Gas produced when zinc reacts with HCl',
      o: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Nitrogen'],
      a: 2,
      e: 'Zn + 2HCl gives ZnCl2 + H2. Hydrogen gas is evolved.',
      full: 'This is a standard single displacement reaction where a metal reacts with an acid to produce a salt and hydrogen gas. Zinc is more reactive than hydrogen, so it displaces hydrogen from hydrochloric acid.\n\nThe equation is: Zn + 2HCl → ZnCl2 + H2↑\n\nZinc chloride (ZnCl2) is the salt produced, and hydrogen gas (H2) bubbles off. You can confirm hydrogen gas with a glowing splint — hydrogen ignites with a squeaky pop. This is also how you produce small amounts of hydrogen gas in the laboratory for testing purposes.',
      h: 'Metal + acid reaction. What gas bubbles off?',
    },
    {
      yr: 2022,
      q: 'Periodic table is arranged by',
      o: ['Atomic mass', 'Atomic number', 'Electronegativity', 'Density'],
      a: 1,
      e: 'Modern periodic table is arranged by increasing atomic number.',
      full: "Dmitri Mendeleev arranged the early periodic table by atomic mass in the 1860s, which worked well but had some inconsistencies. Henry Moseley discovered in 1913 that the fundamental property determining an element's identity and position was its atomic number (number of protons), not its mass.\n\nThe modern periodic table is arranged in order of increasing atomic number from left to right and top to bottom. Elements in the same vertical column (group) have similar chemical properties because they have the same number of outer electrons. Elements in the same horizontal row (period) have the same number of electron shells.\n\nElectronegativity and density do vary across the table, but they are not the organising principle.",
      h: 'Moseley arranged it by proton number.',
    },
    {
      yr: 2024,
      q: 'Example of an alloy',
      o: ['Pure gold', 'Bronze', 'Distilled water', 'Diamond'],
      a: 1,
      e: 'Bronze is an alloy of copper and tin.',
      full: 'An alloy is a mixture of two or more elements where at least one is a metal, created to have improved properties compared to the individual elements. Alloys are designed for specific uses — greater strength, resistance to corrosion, better appearance, or lower melting point.\n\nBronze is one of the oldest and most important alloys in human history — copper mixed with tin. It is harder than pure copper and was so significant it defined an entire era: the Bronze Age.\n\nOther common alloys include steel (iron + carbon), brass (copper + zinc), solder (tin + lead), and stainless steel (iron + chromium + nickel). Pure gold is not an alloy. Distilled water and diamond are not metals at all.',
      h: 'Which is a MIXTURE of two metals?',
    },
    {
      yr: 2023,
      q: 'Type of bond involving electron sharing',
      o: ['Ionic', 'Metallic', 'Covalent', 'Hydrogen'],
      a: 2,
      e: 'Covalent bonds form when atoms SHARE electrons.',
      full: 'Atoms bond because they want to achieve a stable electron configuration — usually a full outer shell. There are two main ways to do this: give or take electrons, or share them.\n\nIn ionic bonding, one atom transfers electrons to another. The atom that loses electrons becomes a positive ion; the one that gains becomes negative. They are held together by electrostatic attraction.\n\nIn covalent bonding, two atoms share electrons between them. Neither fully gives up nor fully takes — they both gain the stability of having more electrons in their outer shell by sharing. Water (H2O), carbon dioxide (CO2), and methane (CH4) are all covalent compounds.\n\nMetallic bonding involves a sea of free electrons shared among all metal atoms. Hydrogen bonds are weak attractions between molecules, not full chemical bonds.',
      h: 'Sharing = covalent. Transfer = ionic.',
    },
    {
      yr: 2022,
      q: 'Converting liquid to gas by heating is called',
      o: ['Condensation', 'Evaporation', 'Sublimation', 'Solidification'],
      a: 1,
      e: 'Evaporation is conversion of liquid to vapour through heating.',
      full: 'The states of matter — solid, liquid, gas — change when energy is added or removed. When a liquid gains enough energy (heat), its molecules move faster and faster until they escape the liquid surface and become gas. This is evaporation.\n\nCondensation is the reverse — gas cooling into liquid (water vapour becoming water droplets on a cold glass). Sublimation is when a solid converts directly to gas without passing through liquid (dry ice — solid CO2 — sublimates at room temperature). Solidification is liquid becoming solid (water freezing into ice).\n\nEvaporation can happen below boiling point at the surface of a liquid. When the entire liquid boils and evaporates rapidly throughout, that is called boiling — but evaporation is the general term for liquid to gas conversion.',
      h: 'Liquid to gas by heating.',
    },
    {
      yr: 2024,
      q: 'Chemical symbol for Gold',
      o: ['Go', 'Gd', 'Au', 'Ag'],
      a: 2,
      e: "Gold's symbol Au comes from Latin Aurum.",
      full: "Many chemical symbols come from the element's Latin or Greek name rather than its modern English name. Gold's Latin name is Aurum, so its symbol is Au. Similarly, silver is Ag from Argentum, iron is Fe from Ferrum, sodium is Na from Natrium, potassium is K from Kalium, and mercury is Hg from Hydrargyrum.\n\nThese Latin-origin symbols reflect the fact that these elements were known in antiquity and named in Latin during the era when science was conducted in that language. Go, Gd, and Ag are not the symbol for gold — Gd is Gadolinium and Ag is Silver.",
      h: 'Latin name for gold is Aurum.',
    },
    {
      yr: 2023,
      q: 'Isotopes are atoms of the same element with different',
      o: [
        'Atomic numbers',
        'Numbers of protons',
        'Numbers of neutrons',
        'Chemical properties',
      ],
      a: 2,
      e: 'Isotopes have same atomic number but different neutrons.',
      full: 'All atoms of the same element have the same number of protons — that is what makes them the same element. But the number of neutrons can vary. Atoms of the same element with different numbers of neutrons are called isotopes.\n\nCarbon-12 has 6 protons and 6 neutrons. Carbon-14 has 6 protons and 8 neutrons. Same element (both are carbon, atomic number 6), different mass numbers (12 and 14), different neutron counts (6 vs 8). They have nearly identical chemical properties but different physical properties — Carbon-14 is radioactive and used in carbon dating.\n\nIsotopes have the same atomic number (same element), same chemical properties (same electron configuration), but different mass numbers and different numbers of neutrons.',
      h: 'Same element = same protons. What differs between C-12 and C-14?',
    },
    {
      yr: 2022,
      q: 'Which of the following is a mixture?',
      o: ['Pure water', 'Salt', 'Air', 'Sodium chloride'],
      a: 2,
      e: 'Air is a mixture of nitrogen, oxygen and other gases with no fixed composition.',
      full: 'A pure substance has a fixed, definite chemical composition. Pure water is always H2O — the same ratio of hydrogen to oxygen, always. Salt is always NaCl. Diamond is always pure carbon.\n\nA mixture has no fixed composition — its components can vary in proportion. Air is mostly nitrogen (~78%) and oxygen (~21%), with small amounts of argon, carbon dioxide, water vapour, and other gases. The exact percentages can vary slightly by location, altitude, and environmental conditions.\n\nPure water, salt, and sodium chloride are all pure substances with definite formulas. Air is the only mixture in the list, making it the correct answer.',
      h: 'A mixture has no fixed chemical formula.',
    },
    {
      yr: 2024,
      q: 'Reaction rate increased by',
      o: [
        'Decreasing temperature',
        'Decreasing concentration',
        'Increasing surface area',
        'Removing catalyst',
      ],
      a: 2,
      e: 'Increasing surface area exposes more reactant particles for collision.',
      full: 'Chemical reactions happen when reactant particles collide with sufficient energy. The more frequent and energetic the collisions, the faster the reaction.\n\nIncreasing surface area (for example, grinding a solid into powder) exposes more reactant particles at the surface — there are simply more particles available to collide with other reactants. Powdered calcium carbonate reacts with acid much faster than a single marble chip of the same mass.\n\nDecreasing temperature slows particles down and reduces collision frequency. Decreasing concentration reduces the number of particles in a given volume. Removing a catalyst removes a substance that lowers the activation energy needed for collisions to succeed. All three would slow the reaction, not speed it up.',
      h: 'More contact = more collisions = faster.',
    },
    {
      yr: 2023,
      q: 'Gas that turns limewater milky',
      o: ['Oxygen', 'Hydrogen', 'Carbon dioxide', 'Nitrogen'],
      a: 2,
      e: 'CO2 reacts with limewater to form calcium carbonate, making it milky.',
      full: 'Limewater is a solution of calcium hydroxide — Ca(OH)2 — in water. When carbon dioxide is bubbled through it, a reaction occurs:\nCO2 + Ca(OH)2 → CaCO3 + H2O\n\nCalcium carbonate (CaCO3) is insoluble in water. It forms as a white precipitate that turns the clear limewater cloudy and milky white. This is the classic test for carbon dioxide gas in chemistry.\n\nOxygen does not react with limewater in this way. Hydrogen also does not. Nitrogen is largely unreactive. Only CO2 produces this distinctive milky white turbidity, making the limewater test a reliable and specific test for carbon dioxide.',
      h: 'Classic chemistry test. Used in respiration experiments.',
    },
    {
      yr: 2022,
      q: 'An acid is a substance that',
      o: [
        'Turns litmus blue',
        'Has pH above 7',
        'Donates protons (H+)',
        'Accepts electrons',
      ],
      a: 2,
      e: 'By Bronsted-Lowry definition, an acid donates protons.',
      full: 'There are several definitions of acids and bases. The simplest (Arrhenius) says acids produce H+ ions in solution and bases produce OH- ions. The more general Bronsted-Lowry definition says an acid is a proton donor — it gives away H+ ions — and a base is a proton acceptor — it receives H+ ions.\n\nTurning litmus blue is what a BASE does, not an acid. Acids turn litmus RED. A pH above 7 is alkaline, not acidic. Accepting electrons describes a Lewis acid-base concept, but the Lewis definition says the acid ACCEPTS electron pairs, not donates protons.\n\nUnder Bronsted-Lowry — the most commonly used definition in JAMB — an acid donates protons (H+ ions).',
      h: 'Acids donate protons. Bases accept them.',
    },
    {
      yr: 2024,
      q: 'The process of obtaining pure solid from a solution is called',
      o: ['Filtration', 'Distillation', 'Crystallisation', 'Evaporation'],
      a: 2,
      e: 'Crystallisation involves cooling a saturated solution to allow pure solid crystals to form.',
      full: 'Crystallisation is a separation and purification technique used to obtain a pure solid from a solution. When you dissolve a solid in a solvent at high temperature, you can dissolve more of it than at lower temperatures. As the solution cools, it becomes supersaturated — it holds more dissolved solid than it can at that temperature — and the excess precipitates out as pure crystals.\n\nThe crystals form in regular geometric patterns because the atoms or molecules arrange themselves in repeating lattice structures. The process naturally excludes impurities (they do not fit into the crystal lattice), which is why crystallisation is a powerful purification method.\n\nFiltration separates insoluble solids from liquids. Distillation separates liquids by boiling point. Evaporation leaves all dissolved substances behind, not just one.',
      h: 'Which process produces crystals from a solution?',
    },
    {
      yr: 2023,
      q: 'Which gas is used in fire extinguishers?',
      o: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
      a: 2,
      e: 'CO2 smothers fires by removing oxygen.',
      full: 'Fire requires three things to sustain itself — the fire triangle: fuel (something to burn), heat (enough temperature), and oxygen. Remove any one of these and the fire goes out.\n\nCO₂ fire extinguishers work by displacing oxygen around the fire. Carbon dioxide gas is denser than air, so it sinks and forms a blanket that cuts off the oxygen supply. Without oxygen, the fire cannot continue to burn.\n\nCO₂ extinguishers are ideal for electrical fires and liquid fires because CO₂ leaves no residue that could damage equipment. They are not suitable for fires involving flammable metals or materials that produce their own oxygen.\n\nOxygen obviously supports combustion. Nitrogen and hydrogen do not react with fire in a useful way for suppression.',
      h: 'Which gas does NOT support combustion?',
    },
    {
      yr: 2022,
      q: 'Rusting of iron is an example of',
      o: ['Physical change', 'Neutralisation', 'Oxidation', 'Decomposition'],
      a: 2,
      e: 'Rusting involves iron reacting with oxygen and water to form iron oxide — an oxidation reaction.',
      full: 'Oxidation is a chemical process in which a substance gains oxygen (or loses electrons). Rusting is a classic example of oxidation — iron reacts with oxygen in the presence of water to form hydrated iron(III) oxide, commonly known as rust.\n\nThe overall simplified reaction: 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ → forms rust (Fe₂O₃·H₂O)\n\nThis is NOT a physical change (a new substance is formed). It is not neutralisation (which involves acid-base reactions). It is not simple decomposition (which involves one substance breaking down). Rusting is specifically an oxidation process, which is why iron exposed to salt water rusts much faster — salt water conducts electricity, speeding up the electrochemical oxidation.',
      h: 'Iron combines with oxygen. What type of reaction is this?',
    },
    {
      yr: 2024,
      q: 'The number of moles in 18g of water',
      o: ['1 mole', '2 moles', '0.5 mole', '3 moles'],
      a: 0,
      e: 'Molar mass of H2O = 18 g/mol. So 18g = 18/18 = 1 mole.',
      full: "A mole is a unit of measurement in chemistry representing 6.02 × 10²³ (Avogadro's number) of particles. The molar mass of a substance is the mass of one mole of that substance in grams.\n\nFor water (H₂O): Hydrogen has a relative atomic mass of 1. There are 2 hydrogen atoms, contributing 2 g/mol. Oxygen has a relative atomic mass of 16. Total molar mass = 2 + 16 = 18 g/mol.\n\nThe formula: moles = mass ÷ molar mass. So 18g ÷ 18 g/mol = 1 mole. If you had 36g of water, that would be 2 moles. If you had 9g, that would be 0.5 moles.",
      h: 'Moles = mass divided by molar mass.',
    },
    {
      yr: 2023,
      q: 'Which is a noble gas?',
      o: ['Fluorine', 'Chlorine', 'Argon', 'Nitrogen'],
      a: 2,
      e: 'Argon is a noble gas (Group 18). Noble gases are stable and unreactive.',
      full: 'The noble gases occupy Group 18 (the far right column) of the periodic table: helium, neon, argon, krypton, xenon, and radon. They are characterised by having completely full outer electron shells, which makes them extraordinarily stable and chemically unreactive under normal conditions.\n\nBecause they are so unreactive, noble gases are also called inert gases. They do not form compounds easily (though some exceptions exist under extreme conditions). This makes them useful for creating inert atmospheres — argon is used in welding to prevent oxygen from reacting with hot metal.\n\nFluorine and chlorine are in Group 17 (halogens) — highly reactive non-metals. Nitrogen, while relatively unreactive in its diatomic form (N₂), is not a noble gas.',
      h: 'Which group in the periodic table contains noble gases?',
    },
    {
      yr: 2022,
      q: 'Electrolysis involves passing ___ through a solution',
      o: ['Heat', 'Light', 'Electrical current', 'Sound'],
      a: 2,
      e: 'Electrolysis uses electrical current to decompose ionic compounds in solution.',
      full: 'Electrolysis is the process of using an electric current to drive a non-spontaneous chemical reaction — typically the decomposition of an ionic compound. The ionic compound must be either dissolved in water (aqueous solution) or melted so that its ions are free to move.\n\nThe setup involves two electrodes (conductors) connected to a power source immersed in the electrolyte (the ionic solution). At the cathode (negative electrode), positive ions are reduced (gain electrons). At the anode (positive electrode), negative ions are oxidised (lose electrons).\n\nApplications include extracting aluminium from its ore (bauxite), electroplating metals with a thin layer of gold or chrome, and producing chlorine gas from brine (saltwater).',
      h: 'The electro in electrolysis means?',
    },
    {
      yr: 2024,
      q: 'The formula for sulphuric acid is',
      o: ['HCl', 'H2SO4', 'H2SO3', 'HNO3'],
      a: 1,
      e: 'Sulphuric acid is H2SO4 — a strong acid used in many industrial processes.',
      full: 'Sulphuric acid (H₂SO₄) is one of the most important industrial chemicals in the world. It is a strong diprotic acid (it can donate two H⁺ ions) and is used in fertiliser production, metal processing, oil refining, battery acid, and many manufacturing processes.\n\nHCl is hydrochloric acid — the acid in your stomach and used in many chemical processes, but that is a single-proton acid with one H and one Cl.\nH₂SO₃ is sulphurous acid — weaker and less common.\nHNO₃ is nitric acid — used in explosives and fertilisers, but not sulphuric acid.\n\nThe key to remembering H₂SO₄: sulphur (S) + four oxygens (O₄) + two hydrogens (H₂). The formula reflects one sulphur atom bonded to four oxygen atoms, with two ionisable hydrogen atoms.',
      h: 'Sulphuric = sulphur + oxygen + hydrogen. Which formula fits?',
    },
    {
      yr: 2023,
      q: 'Which element is a liquid at room temperature?',
      o: ['Mercury', 'Gold', 'Iron', 'Copper'],
      a: 0,
      e: 'Mercury (Hg) is the only metal that is liquid at room temperature.',
      full: 'Most metals are solid at room temperature (20-25°C). Mercury is the remarkable exception — it is a shiny, silver-coloured liquid metal at room temperature. Its melting point is -38.8°C, well below room temperature.\n\nMercury\'s symbol Hg comes from the Latin hydrарgyrum, meaning "liquid silver" or "water silver."\n\nMercury\'s unusual liquid state at room temperature made it historically useful in thermometers (it expands uniformly with temperature), barometers, and electrical switches. However, mercury is highly toxic, so modern thermometers often use alcohol or digital sensors instead.\n\nGold, iron, and copper all have melting points well above 1000°C — they are solid at room temperature.',
      h: 'Which metal is used in thermometers in its liquid form?',
    },
    {
      yr: 2022,
      q: 'Chemical formula for table salt is',
      o: ['KCl', 'NaOH', 'NaCl', 'CaCl2'],
      a: 2,
      e: 'Table salt is sodium chloride, NaCl.',
      full: 'Sodium chloride (NaCl) is the chemical name for common table salt. It forms when sodium (Na) — an extremely reactive metal — reacts with chlorine (Cl) — a toxic green gas — to form a stable, white crystalline solid that is safe to eat in moderate amounts.\n\nNaCl is an ionic compound: sodium forms Na⁺ ions and chlorine forms Cl⁻ ions, held together by strong electrostatic attraction in a crystal lattice.\n\nKCl is potassium chloride — used as a salt substitute. NaOH is sodium hydroxide (caustic soda) — highly alkaline and corrosive. CaCl₂ is calcium chloride — used as a drying agent and road de-icer. Only NaCl is table salt.',
      h: 'Salt = sodium + chloride.',
    },
    {
      yr: 2024,
      q: 'What is the valency of oxygen?',
      o: ['1', '2', '3', '4'],
      a: 1,
      e: 'Oxygen has a valency of 2, meaning it forms two chemical bonds.',
      full: 'Valency is the number of bonds an atom typically forms with other atoms. It is determined by the number of electrons an atom needs to gain, lose, or share to achieve a stable full outer electron shell.\n\nOxygen has 6 electrons in its outer shell and needs 2 more to complete it (to reach 8, like a noble gas). So it forms 2 bonds with other atoms. In water (H₂O), oxygen bonds with 2 hydrogen atoms — confirming its valency of 2.\n\nThis also explains why CO₂ is O=C=O (oxygen forms a double bond with carbon, still using 2 bonding pairs). Hydrogen has a valency of 1. Carbon has a valency of 4. Nitrogen has a valency of 3.',
      h: 'Water is H2O. How many hydrogens bond to one oxygen?',
    },
    {
      yr: 2023,
      q: 'The law of conservation of mass states that',
      o: [
        'Mass can be created',
        'Mass can be destroyed',
        'Mass is conserved in reactions',
        'Mass equals energy',
      ],
      a: 2,
      e: 'Mass cannot be created or destroyed in a chemical reaction.',
      full: 'The law of conservation of mass, formulated by Antoine Lavoisier in the 18th century, states that in any chemical reaction, the total mass of the reactants equals the total mass of the products. Mass is neither created nor destroyed.\n\nFor example: if 56g of iron reacts with 32g of sulphur, exactly 88g of iron sulphide is produced. Not 87g, not 89g — exactly 88g.\n\nThis law holds because atoms are neither created nor destroyed in chemical reactions — they are only rearranged. The same atoms that were in the reactants end up in the products, just arranged differently. Mass equals energy (E = mc²) is true at nuclear scales but irrelevant at ordinary chemical scales.',
      h: 'What is conserved in every chemical reaction?',
    },
    {
      yr: 2022,
      q: 'Which acid is found in the stomach?',
      o: ['Sulphuric acid', 'Hydrochloric acid', 'Nitric acid', 'Acetic acid'],
      a: 1,
      e: 'The stomach produces hydrochloric acid (HCl) to aid digestion.',
      full: 'The stomach secretes gastric juice, which contains hydrochloric acid (HCl) at a pH of around 1.5 to 2 — extremely acidic. This strong acid serves several functions: it kills most bacteria that enter with food, it activates pepsinogen (an inactive enzyme precursor) into pepsin (which digests proteins), and it provides the acidic environment that pepsin needs to function.\n\nSulphuric acid would corrode the stomach lining catastrophically — the body does not produce it. Nitric acid and acetic acid (vinegar) are not produced by the stomach either. HCl is the specific acid of gastric digestion, and the stomach has special protective mucus lining to prevent it from digesting itself.',
      h: 'Which strong acid helps digest food?',
    },
    {
      yr: 2024,
      q: 'Catalysts work by',
      o: [
        'Increasing activation energy',
        'Decreasing activation energy',
        'Increasing temperature',
        'Decreasing temperature',
      ],
      a: 1,
      e: 'Catalysts lower the activation energy needed for a reaction, speeding it up without being consumed.',
      full: 'For a chemical reaction to occur, the reactant molecules must collide with enough energy to overcome the activation energy barrier. Catalysts provide an alternative reaction pathway with a LOWER activation energy — making it much easier for the reaction to proceed.\n\nCrucially, catalysts are not consumed in the reaction — they participate in the intermediate steps but are regenerated at the end. This means a small amount of catalyst can speed up the reaction of a much larger amount of reactants.\n\nIn industry, catalysts save enormous amounts of energy. In the Haber process for making ammonia, iron is the catalyst. In the body, enzymes are biological catalysts. Catalysts do not change the overall energy difference between reactants and products — just the speed of getting there.',
      h: 'Catalysts speed up reactions by changing what energy level?',
    },
    {
      yr: 2023,
      q: 'Burning is a chemical reaction involving',
      o: ['Decomposition', 'Oxidation', 'Reduction', 'Neutralisation'],
      a: 1,
      e: 'Burning (combustion) is a rapid oxidation reaction that releases heat and light.',
      full: 'Combustion is the chemical reaction between a fuel (carbon-containing compound) and oxygen, producing heat and light. It is a form of rapid oxidation.\n\nComplete combustion (when oxygen is plentiful) produces carbon dioxide and water: CH₄ + 2O₂ → CO₂ + 2H₂O. Incomplete combustion (insufficient oxygen) produces carbon monoxide (toxic) and soot (unburned carbon particles).\n\nDecomposition involves a single compound breaking down into simpler substances — different from combustion. Reduction is the gain of electrons or loss of oxygen — the opposite of oxidation. Neutralisation involves acid and base reacting to form salt and water. Combustion is specifically rapid oxidation with energy release as heat and light.',
      h: 'Fire involves rapid reaction with oxygen. What type?',
    },
    {
      yr: 2022,
      q: 'Which particle has no charge?',
      o: ['Proton', 'Electron', 'Neutron', 'Ion'],
      a: 2,
      e: 'Neutrons have no electrical charge. Protons are positive, electrons are negative.',
      full: "Atoms consist of three types of subatomic particles, each with a specific charge. Protons carry a positive charge (+1) and are found in the nucleus. Electrons carry a negative charge (-1) and orbit the nucleus in electron shells.\n\nNeutrons carry no electrical charge — they are electrically neutral. This is where their name comes from: neutral. Neutrons are also found in the nucleus, alongside protons. They contribute to the atom's mass but not to its charge.\n\nIn a neutral atom, the number of protons equals the number of electrons, so the positive and negative charges cancel out. When electrons are gained or lost, the atom becomes an ion with a net charge.",
      h: 'Which atomic particle is electrically neutral?',
    },
  ],
  mathematics: [
    {
      yr: 2024,
      q: 'Simplify: 2 cubed x 2 to the power 4',
      o: ['2 to the 7', '2 to the 12', '4 to the 7', '2 to the 6'],
      a: 0,
      e: 'Same base multiplication: add exponents. 2^3 x 2^4 = 2^7.',
      full: 'When multiplying numbers with the same base, you simply add the exponents. This is the product rule for indices: a^m × a^n = a^(m+n).\n\nHere, both numbers have base 2. So 2^3 × 2^4 = 2^(3+4) = 2^7. You do not multiply the base or the exponents — you keep the base and ADD the powers.\n\n2^7 = 128, if you want to check: 2^3 = 8, 2^4 = 16, and 8 × 16 = 128. Also 2^7 = 128. ✓\n\nThe option 2^12 would be correct for 2^3 × 2^4 only if you MULTIPLIED the exponents — but that is a different rule (the power rule, used for (2^3)^4).',
      h: 'Same base, multiplication: add the powers.',
    },
    {
      yr: 2024,
      q: '3x + 7 = 22. Find x.',
      o: ['3', '5', '4', '6'],
      a: 1,
      e: '3x + 7 = 22, so 3x = 15, so x = 5.',
      full: 'To solve a linear equation, isolate the variable by doing the same operation to both sides. Start by removing the constant term (7) from the left side.\n\nSubtract 7 from both sides: 3x + 7 - 7 = 22 - 7, giving 3x = 15.\nNow divide both sides by 3: 3x ÷ 3 = 15 ÷ 3, giving x = 5.\n\nVerify: substitute back — 3(5) + 7 = 15 + 7 = 22. ✓\n\nThis two-step approach (deal with addition/subtraction first, then multiplication/division) works for all linear equations.',
      h: 'Subtract 7 from both sides, then divide by 3.',
    },
    {
      yr: 2023,
      q: 'What is 15% of 200?',
      o: ['25', '30', '35', '40'],
      a: 1,
      e: '15/100 x 200 = 30.',
      full: 'To find a percentage of a quantity, convert the percentage to a decimal or fraction, then multiply by the quantity.\n\n15% means 15 out of every 100, so as a fraction it is 15/100 = 0.15.\n0.15 × 200 = 30.\n\nAlternatively, think of it as: 10% of 200 = 20, and 5% of 200 = 10 (half of 10%). Add them: 20 + 10 = 30. This mental arithmetic shortcut is useful in exams when a calculator is not available.',
      h: 'Percentage x total.',
    },
    {
      yr: 2024,
      q: 'Sum of angles in a triangle',
      o: ['90 degrees', '180 degrees', '270 degrees', '360 degrees'],
      a: 1,
      e: 'All interior angles of a triangle add up to 180 degrees.',
      full: 'This is one of the most fundamental theorems in Euclidean geometry. No matter the shape of the triangle — equilateral, isosceles, scalene, right-angled, or obtuse — the three interior angles always sum to exactly 180 degrees.\n\nYou can verify this with a simple physical proof: cut out a triangle from paper, tear off all three corners, and arrange them side by side. They form a straight line — which is 180 degrees.\n\nFor quadrilaterals (4 sides), interior angles sum to 360 degrees. For pentagons (5 sides), 540 degrees. For any polygon, the sum is (n-2) × 180 degrees. But for a triangle specifically, it is always 180.',
      h: 'Fundamental triangle theorem.',
    },
    {
      yr: 2023,
      q: 'Factorise: x squared minus 9',
      o: ['(x-3)(x-3)', '(x+3)(x+3)', '(x-3)(x+3)', '(x+9)(x-1)'],
      a: 2,
      e: 'x squared minus 9 is difference of two squares: (x-3)(x+3).',
      full: 'The difference of two squares is a factorisation pattern: a² - b² = (a - b)(a + b). Any expression in this form can be factorised immediately using this rule.\n\nHere, x² - 9 = x² - 3². So a = x and b = 3. Applying the formula: (x - 3)(x + 3).\n\nVerify by expanding: (x - 3)(x + 3) = x² + 3x - 3x - 9 = x² - 9. ✓\n\n(x - 3)(x - 3) would give x² - 6x + 9, which is not what we want. (x + 3)(x + 3) gives x² + 6x + 9. Only (x - 3)(x + 3) gives the original expression.',
      h: 'a squared minus b squared = (a-b)(a+b).',
    },
    {
      yr: 2022,
      q: 'Triangle base 6cm, height 8cm. Area?',
      o: ['48 cm2', '24 cm2', '14 cm2', '28 cm2'],
      a: 1,
      e: 'Area = half x base x height = half x 6 x 8 = 24 cm2.',
      full: 'The area of a triangle is calculated using the formula: Area = ½ × base × height. The height must be the perpendicular height — the vertical distance from the base to the opposite vertex, not the slant side.\n\nSubstituting: ½ × 6 × 8 = ½ × 48 = 24 cm².\n\nThe option 48 cm² is a common error — it comes from forgetting the half (calculating base × height without dividing by 2). Think of it this way: a triangle is exactly half of a rectangle with the same base and height. A 6×8 rectangle has area 48 cm², so the triangle inside it has area 24 cm².',
      h: 'Half base times height.',
    },
    {
      yr: 2024,
      q: 'Solve: 2x minus 5 is greater than 9',
      o: [
        'x greater than 2',
        'x greater than 7',
        'x less than 7',
        'x greater than 14',
      ],
      a: 1,
      e: '2x minus 5 greater than 9, so 2x greater than 14, so x greater than 7.',
      full: 'Solving inequalities follows the same steps as solving equations, with one crucial difference: if you multiply or divide both sides by a NEGATIVE number, you must flip the inequality sign.\n\nHere, we are only adding and dividing by positive numbers, so the inequality direction stays the same throughout.\n\nAdd 5 to both sides: 2x - 5 + 5 > 9 + 5, giving 2x > 14.\nDivide both sides by 2: 2x/2 > 14/2, giving x > 7.\n\nThis means x can be any value greater than 7 — like 7.1, 8, 100 — but NOT 7 itself (it is a strict inequality, not ≥).',
      h: 'Add 5 to both sides, divide by 2.',
    },
    {
      yr: 2023,
      q: 'LCM of 4, 6 and 12',
      o: ['48', '24', '12', '36'],
      a: 2,
      e: 'LCM of 4, 6 and 12 is 12 — smallest divisible by all three.',
      full: 'The Lowest Common Multiple (LCM) is the smallest positive integer that is divisible by all the numbers in the set.\n\nList the multiples: Multiples of 4: 4, 8, 12, 16... Multiples of 6: 6, 12, 18... Multiples of 12: 12, 24...\n\nThe first number appearing in all three lists is 12. Check: 12 ÷ 4 = 3 ✓, 12 ÷ 6 = 2 ✓, 12 ÷ 12 = 1 ✓.\n\nAlternatively, use prime factorisation: 4 = 2², 6 = 2 × 3, 12 = 2² × 3. LCM = 2² × 3 = 12.',
      h: 'Smallest number all three divide into evenly.',
    },
    {
      yr: 2022,
      q: 'Convert 0.375 to a fraction in lowest terms',
      o: ['3/8', '375/100', '3/4', '1/3'],
      a: 0,
      e: '0.375 = 375/1000 = 3/8.',
      full: 'To convert a decimal to a fraction, write it over the appropriate power of 10. 0.375 has three decimal places, so it becomes 375/1000.\n\nNow simplify by finding the HCF (Highest Common Factor) of 375 and 1000. Both are divisible by 5: 375 ÷ 5 = 75, 1000 ÷ 5 = 200. Both are divisible by 5 again: 75 ÷ 5 = 15, 200 ÷ 5 = 40. Both are divisible by 5 once more: 15 ÷ 5 = 3, 40 ÷ 5 = 8. Result: 3/8.\n\nVerify: 3 ÷ 8 = 0.375. ✓',
      h: '375/1000. Find the HCF.',
    },
    {
      yr: 2024,
      q: 'Gradient through points (2,3) and (6,11)',
      o: ['2', '3', '4', '1'],
      a: 0,
      e: 'Gradient = (11-3)/(6-2) = 8/4 = 2.',
      full: 'The gradient (slope) of a line measures how steeply it rises or falls. It is calculated as the change in y divided by the change in x between any two points on the line — often remembered as "rise over run."\n\nFormula: m = (y₂ - y₁) / (x₂ - x₁)\n\nUsing the points (2, 3) and (6, 11):\nm = (11 - 3) / (6 - 2) = 8 / 4 = 2\n\nA gradient of 2 means for every 1 unit you move right, the line goes up 2 units. You can use either point as (x₁, y₁) — the result will be the same.',
      h: 'Rise over run: change in y divided by change in x.',
    },
    {
      yr: 2023,
      q: 'Express 64 as a power of 2',
      o: ['2 to the 5', '2 to the 6', '2 to the 7', '2 to the 4'],
      a: 1,
      e: '2 to the power 6 = 64.',
      full: 'To express 64 as a power of 2, ask: how many times must you multiply 2 by itself to get 64?\n\n2¹ = 2\n2² = 4\n2³ = 8\n2⁴ = 16\n2⁵ = 32\n2⁶ = 64 ✓\n\nSo 64 = 2⁶. The exponent 6 means 2 is multiplied by itself 6 times: 2 × 2 × 2 × 2 × 2 × 2 = 64. This is a useful power to memorise, along with the other powers of 2 up to 2¹⁰ = 1024.',
      h: 'Keep doubling from 2 until you reach 64.',
    },
    {
      yr: 2022,
      q: "If P(A) = 0.3, then P(A') is",
      o: ['0.3', '0.7', '1.3', '0.03'],
      a: 1,
      e: "P(A') = 1 minus P(A) = 0.7.",
      full: 'A\' (read "A prime" or "A complement") represents the event of A NOT occurring — everything except A. Since A either happens or it does not, P(A) + P(A\') must always equal 1.\n\nThis is called the complement rule: P(A\') = 1 - P(A).\n\nIf P(A) = 0.3, then P(A\') = 1 - 0.3 = 0.7. In other words, there is a 30% chance of A happening and a 70% chance of it not happening.',
      h: "P(A) + P(A') = 1 always.",
    },
    {
      yr: 2024,
      q: 'Expand (x + 3) squared',
      o: ['x2 + 9', 'x2 + 6x + 9', 'x2 + 3x + 9', 'x2 + 6x + 3'],
      a: 1,
      e: '(x+3) squared = x2 + 6x + 9.',
      h: '(a+b) squared = a2 + 2ab + b2.',
    },
    {
      yr: 2023,
      q: 'Car travels 120km in 2 hours. Average speed?',
      o: ['240 km/h', '60 km/h', '40 km/h', '80 km/h'],
      a: 1,
      e: 'Speed = Distance/Time = 120/2 = 60 km/h.',
      full: 'Speed is how far something travels per unit of time. The formula is simply Speed = Distance ÷ Time.\n\n120 km ÷ 2 hours = 60 km/h.\n\nIf the question asked for time: Time = Distance ÷ Speed.\nIf it asked for distance: Distance = Speed × Time.\n\nThese three forms are worth memorising. The unit km/h tells you the answer — kilometres per hour — confirming you should divide distance (km) by time (h).',
      h: 'Speed = Distance divided by Time.',
    },
    {
      yr: 2022,
      q: 'Evaluate: log base 2 of 16',
      o: ['2', '4', '8', '3'],
      a: 1,
      e: 'Log base 2 of 16 = 4 because 2 to the power 4 = 16.',
      full: 'A logarithm answers the question: "What power must I raise the base to in order to get this number?"\n\nlog₂(16) asks: "What power of 2 gives me 16?"\n2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16. The answer is 4.\n\nLogarithms and exponentials are inverses of each other. If 2⁴ = 16, then log₂(16) = 4. This relationship is the key to solving any logarithm problem.',
      h: '2 to what power equals 16?',
    },
    {
      yr: 2024,
      q: 'Circumference of a circle with radius 7, using pi = 22/7',
      o: ['22', '44', '154', '22/7'],
      a: 1,
      e: 'Circumference = 2 x pi x r = 2 x 22/7 x 7 = 44.',
      full: 'The circumference of a circle is the distance around its outer edge — essentially, the perimeter of a circle. The formula is C = 2πr (or equivalently C = πd, where d is the diameter = 2r).\n\nWith r = 7 and π = 22/7:\nC = 2 × 22/7 × 7\nThe 7 in the numerator and denominator cancel: = 2 × 22 = 44.\n\nThe area formula (πr²) would give 22/7 × 49 = 154 cm² — that is for area, not circumference. Always remember: circumference involves the radius to the FIRST power (2πr), while area involves the radius SQUARED (πr²).',
      h: 'C = 2 pi r. Substitute r = 7.',
    },
    {
      yr: 2023,
      q: 'Evaluate the square root of 144',
      o: ['11', '12', '13', '14'],
      a: 1,
      e: 'Square root of 144 = 12 because 12 x 12 = 144.',
      full: 'The square root of a number is the value that, when multiplied by itself, gives that number. To find √144, ask: which number times itself equals 144?\n\n10 × 10 = 100 (too small)\n11 × 11 = 121 (still too small)\n12 × 12 = 144 ✓\n\nSo √144 = 12. This is a perfect square — the result is a whole number. It is useful to memorise the perfect squares up to at least 15²: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.',
      h: 'Which number multiplied by itself gives 144?',
    },
    {
      yr: 2022,
      q: 'What is the median of 3, 7, 2, 9, 5?',
      o: ['5', '7', '3', '9'],
      a: 0,
      e: 'Ordered: 2, 3, 5, 7, 9. The middle value (3rd) is 5.',
      full: 'The median is the middle value in an ordered data set. The key steps are: (1) arrange all values in ascending or descending order, and (2) find the middle value.\n\nOriginal data: 3, 7, 2, 9, 5.\nOrdered: 2, 3, 5, 7, 9.\nThere are 5 values, so the middle is the 3rd value (position = (5+1)/2 = 3).\nThe 3rd value in the ordered set is 5.\n\nThe median is 5. Note that 7 is the most frequently confused answer — people pick the wrong value by not ordering first. Always order before finding the median.',
      h: 'Arrange in order and pick the middle value.',
    },
    {
      yr: 2024,
      q: 'Simplify: (3x squared y)(2xy cubed)',
      o: [
        '6x cubed y to the 4',
        '5x cubed y to the 4',
        '6x squared y cubed',
        '6x cubed y cubed',
      ],
      a: 0,
      e: 'Multiply coefficients: 3x2=6. Add exponents: x becomes x cubed, y becomes y to the 4.',
      full: 'When multiplying algebraic terms, you multiply the numbers (coefficients) together and add the exponents of matching variables.\n\n(3x²y)(2xy³): Multiply coefficients: 3 × 2 = 6. For x: x² × x¹ = x^(2+1) = x³. For y: y¹ × y³ = y^(1+3) = y⁴. Result: 6x³y⁴.\n\nThe rule is: same base, multiplication means ADD the exponents. Never multiply the exponents when multiplying — that rule (multiply exponents) only applies when raising a power to another power, like (x²)³ = x⁶.',
      h: 'Multiply numbers, add powers of same variables.',
    },
    {
      yr: 2023,
      q: 'A man sells for 600 naira, profit of 20%. Cost price?',
      o: ['500 naira', '480 naira', '520 naira', '450 naira'],
      a: 0,
      e: 'SP = CP x 1.2. So CP = 600 divided by 1.2 = 500 naira.',
      full: 'Profit and loss problems require understanding the relationship between cost price (CP), selling price (SP), and profit percentage.\n\nA 20% profit means the selling price is 120% of the cost price (the original 100% + 20% profit).\nSo: SP = CP × (100% + 20%) = CP × 1.20\n\nRearranging to find CP: CP = SP ÷ 1.20 = 600 ÷ 1.20 = 500 naira.\n\nVerify: 20% of 500 = 100. Cost price 500 + profit 100 = selling price 600. ✓\n\nA common error is simply calculating 20% of 600 (= 120) and subtracting to get 480 — but that would only work if the profit percentage was calculated on the selling price, not the cost price.',
      h: 'SP = CP x (1 + profit%). Solve for CP.',
    },
    {
      yr: 2022,
      q: 'The interior angle of a regular hexagon is',
      o: ['108 degrees', '120 degrees', '135 degrees', '60 degrees'],
      a: 1,
      e: 'Interior angle = (n-2) x 180 divided by n = (6-2) x 180/6 = 120 degrees.',
      full: 'The sum of interior angles of any polygon is (n-2) × 180°, where n is the number of sides.\nFor a regular polygon (all sides and angles equal), each interior angle = (n-2) × 180° ÷ n.\n\nFor a hexagon (6 sides): Each angle = (6-2) × 180° ÷ 6 = 4 × 180° ÷ 6 = 720° ÷ 6 = 120°.\n\nCommon polygon angles: equilateral triangle = 60°, square = 90°, regular pentagon = 108°, regular hexagon = 120°, regular octagon = 135°. Memorising these helps with quick calculation.',
      h: 'Formula: (n-2) x 180 divided by n.',
    },
    {
      yr: 2024,
      q: 'Solve: x squared minus 5x + 6 = 0',
      o: ['x=2 or x=3', 'x=-2 or x=-3', 'x=1 or x=6', 'x=-1 or x=-6'],
      a: 0,
      e: 'Factorise: (x-2)(x-3) = 0. So x = 2 or x = 3.',
      full: 'To solve a quadratic equation by factorisation, find two numbers that multiply to give the constant term (6) and add to give the coefficient of x (-5).\n\nWe need two numbers that: multiply to +6 AND add to -5.\nThose numbers are -2 and -3 (since -2 × -3 = +6 and -2 + (-3) = -5).\n\nSo x² - 5x + 6 = (x - 2)(x - 3) = 0.\nIf (x-2) = 0, then x = 2.\nIf (x-3) = 0, then x = 3.\n\nVerify: (2)² - 5(2) + 6 = 4 - 10 + 6 = 0 ✓. (3)² - 5(3) + 6 = 9 - 15 + 6 = 0 ✓.',
      h: 'Find two numbers that multiply to 6 and add to -5.',
    },
    {
      yr: 2023,
      q: 'Evaluate: 5 factorial',
      o: ['25', '60', '120', '720'],
      a: 2,
      e: '5! = 5 x 4 x 3 x 2 x 1 = 120.',
      full: 'The factorial of a number n (written n!) means multiplying all positive integers from n down to 1. It counts the number of ways to arrange n objects in a sequence.\n\n5! = 5 × 4 × 3 × 2 × 1 = 120.\n\nStep by step: 5 × 4 = 20. 20 × 3 = 60. 60 × 2 = 120. 120 × 1 = 120.\n\nFactorials grow very quickly: 0! = 1 (by definition), 1! = 1, 2! = 2, 3! = 6, 4! = 24, 5! = 120, 6! = 720, 7! = 5040. Factorials are used extensively in probability, combinations, and permutations.',
      h: 'Factorial means multiply all integers down to 1.',
    },
    {
      yr: 2022,
      q: 'Find the volume of a cube with side 4cm',
      o: ['16 cm3', '24 cm3', '64 cm3', '48 cm3'],
      a: 2,
      e: 'Volume of cube = side cubed = 4 cubed = 64 cm3.',
      full: "A cube has all sides equal. Its volume is found by multiplying length × width × height — and since all three are equal in a cube, this simplifies to side³ (side to the power of 3).\n\nWith side = 4 cm: Volume = 4³ = 4 × 4 × 4 = 16 × 4 = 64 cm³.\n\nThe common errors: 4² = 16 gives area, not volume. 4 × 6 = 24 gives the sum of edges (not volume). 4 × 12 = 48 gives... nothing useful. The cube's volume formula is always s³.",
      h: 'Volume = s x s x s.',
    },
    {
      yr: 2024,
      q: 'What type of angle is 135 degrees?',
      o: ['Acute', 'Right', 'Obtuse', 'Reflex'],
      a: 2,
      e: 'An obtuse angle is between 90 and 180 degrees. 135 falls in this range.',
      full: 'Angles are classified by their size:\n\nAcute: less than 90°. These are small, sharp angles.\nRight: exactly 90°. A perfect corner.\nObtuse: between 90° and 180°. Wider than a right angle but less than a straight line.\nStraight: exactly 180°. A flat line.\nReflex: between 180° and 360°. Greater than a straight line.\n\n135° falls clearly between 90° and 180° — so it is obtuse. It is wider than a right angle but has not yet opened to form a straight line.',
      h: '90 degrees is less than obtuse is less than 180 degrees.',
    },
    {
      yr: 2023,
      q: 'A bag has 3 red and 5 blue balls. Probability of picking red?',
      o: ['3/8', '5/8', '3/5', '1/3'],
      a: 0,
      e: 'P(red) = 3 divided by (3+5) = 3/8.',
      full: 'Probability is calculated as: P(event) = Number of favourable outcomes ÷ Total number of possible outcomes.\n\nThe bag contains 3 red balls and 5 blue balls. Total = 3 + 5 = 8 balls.\nFavourable outcomes (picking red) = 3.\nP(red) = 3/8.\n\nThis means if you picked a ball many times (replacing it each time), you would expect to pick red 3 out of every 8 times — or about 37.5% of the time.\n\nDo not confuse 3/8 with 3/5 (which would be the probability among only the non-blue balls — a different question).',
      h: 'Probability = favourable outcomes divided by total outcomes.',
    },
    {
      yr: 2022,
      q: 'Simplify: 2 to the 5 divided by 2 to the 3',
      o: ['2', '4', '8', '16'],
      a: 1,
      e: '2^5 divided by 2^3 = 2^(5-3) = 2^2 = 4.',
      full: 'The division rule for indices (quotient rule): when dividing numbers with the same base, subtract the exponents. a^m ÷ a^n = a^(m-n).\n\n2⁵ ÷ 2³ = 2^(5-3) = 2² = 4.\n\nVerify: 2⁵ = 32 and 2³ = 8. 32 ÷ 8 = 4. ✓\n\nRemember the three index rules: multiply → add exponents (2³ × 2⁴ = 2⁷). Divide → subtract exponents (2⁵ ÷ 2³ = 2²). Power of a power → multiply exponents ((2²)³ = 2⁶).',
      h: 'Same base division: subtract exponents.',
    },
    {
      yr: 2024,
      q: 'The mean of 4, 8, 6, 2, 10 is',
      o: ['5', '6', '7', '8'],
      a: 1,
      e: 'Mean = (4+8+6+2+10)/5 = 30/5 = 6.',
      full: 'The mean (arithmetic average) is calculated by adding all values in the data set and dividing by the count of values.\n\nData: 4, 8, 6, 2, 10.\nSum: 4 + 8 + 6 + 2 + 10 = 30.\nCount: 5 values.\nMean = 30 ÷ 5 = 6.\n\nThe mean of 6 means that if all five values were equal, each would be 6. The mean represents the "balance point" of the data set. Note that no value in this set actually equals the mean — that is perfectly normal.',
      h: 'Sum all values then divide by the count.',
    },
    {
      yr: 2023,
      q: 'Express 0.000345 in standard form',
      o: [
        '3.45 x 10 to -4',
        '3.45 x 10 to -3',
        '34.5 x 10 to -5',
        '0.345 x 10 to -3',
      ],
      a: 0,
      e: '0.000345 = 3.45 x 10 to the -4. Move decimal 4 places right.',
      full: 'Standard form (scientific notation) expresses any number as a × 10ⁿ where 1 is less than or equal to a, which is less than 10, and n is an integer.\n\nFor 0.000345: move the decimal point to the right until you have a number between 1 and 10. Moving right 4 places gives 3.45 (moving the decimal right gives a smaller original number, so the power of 10 is negative).\n\nCount: 0.000345 → 0.00345 (1 place) → 0.0345 (2) → 0.345 (3) → 3.45 (4 places).\nSo the power is -4: 3.45 × 10⁻⁴.\n\nFor large numbers, you move left (positive power). For small numbers, you move right (negative power).',
      h: 'Standard form: a x 10 to n where 1 is less than or equal to a less than 10.',
    },
    {
      yr: 2022,
      q: 'What is the reciprocal of 2/5?',
      o: ['2/5', '5/2', '-2/5', '-5/2'],
      a: 1,
      e: 'The reciprocal is obtained by flipping the fraction: reciprocal of 2/5 = 5/2.',
      h: 'Flip the numerator and denominator.',
    },
  ],
  physics: [
    {
      yr: 2024,
      q: 'SI unit of force',
      o: ['Joule', 'Watt', 'Newton', 'Pascal'],
      a: 2,
      e: 'Force is measured in Newtons, named after Isaac Newton.',
      full: "Force is a push or pull that can change the motion of an object. In the International System of Units (SI), force is measured in Newtons (N), named in honour of Sir Isaac Newton who formulated the laws of motion in the 17th century.\n\n1 Newton is defined as the force needed to accelerate a mass of 1 kg by 1 m/s². So the Newton connects force, mass, and acceleration through Newton's Second Law: F = ma.\n\nJoules measure energy or work. Watts measure power (energy per unit time). Pascals measure pressure (force per unit area). None of these measure force directly.",
      h: 'Named after the scientist who defined laws of motion.',
    },
    {
      yr: 2024,
      q: 'Distance = 100m, Time = 20s. Speed?',
      o: ['5 m/s', '500 m/s', '2000 m/s', '2 m/s'],
      a: 0,
      e: 'Speed = 100 divided by 20 = 5 m/s.',
      full: 'Speed measures how quickly an object covers distance. The formula is: Speed = Distance ÷ Time.\n\n100 m ÷ 20 s = 5 m/s.\n\nThe unit metres per second (m/s) is the SI unit of speed. A simple check: if you travel 100 metres in 20 seconds, that is the same as travelling 5 metres every second. So 5 m/s makes sense intuitively.',
      h: 'Divide distance by time.',
    },
    {
      yr: 2023,
      q: 'Which is a vector quantity?',
      o: ['Mass', 'Temperature', 'Speed', 'Velocity'],
      a: 3,
      e: 'Velocity has both magnitude and direction — vector. Speed only has magnitude.',
      full: 'Scalar quantities have magnitude (size) only — temperature, mass, speed, distance, time, energy. Vector quantities have both magnitude AND direction — velocity, force, displacement, acceleration, momentum.\n\nSpeed tells you how fast an object is moving. Velocity tells you how fast AND in which direction. A car doing 60 km/h north has a different velocity from one doing 60 km/h south, even though their speeds are identical.\n\nMass is a scalar (it does not point in any direction). Temperature is a scalar. Speed is a scalar. Only velocity among the options is a vector.',
      h: 'Vectors have both size AND direction.',
    },
    {
      yr: 2024,
      q: 'Energy cannot be created or destroyed. This is',
      o: [
        "Newton's first law",
        'Law of conservation of energy',
        "Ohm's law",
        "Boyle's law",
      ],
      a: 1,
      e: 'The law of conservation of energy states energy can only be transformed.',
      full: "Energy exists in many forms — kinetic, potential, thermal, chemical, electrical, nuclear, sound, and light. The law of conservation of energy states that energy can never be created from nothing and can never be destroyed entirely — it can only be converted from one form to another.\n\nWhen you burn petrol in a car engine, chemical energy converts to kinetic energy (movement) and thermal energy (heat). When a phone charges, electrical energy converts to chemical energy stored in the battery. When a ball falls, gravitational potential energy converts to kinetic energy.\n\nThe total energy in a closed system always remains constant — only the form changes. This is Newton's first law for energy.",
      h: 'Conservation means the total stays the same.',
    },
    {
      yr: 2023,
      q: 'Temperature increases in a metal conductor. Resistance ___',
      o: ['Decreases', 'Increases', 'Stays the same', 'Becomes zero'],
      a: 1,
      e: 'Rising temperature causes atoms to vibrate more, increasing resistance.',
      full: 'In metallic conductors, electricity flows through the movement of free electrons between atoms. When the temperature rises, the metal atoms vibrate more intensely about their fixed positions.\n\nThese vibrating atoms obstruct the flow of electrons — the electrons collide with them more frequently, losing energy in each collision. This increased interference with electron flow is what we call increased electrical resistance.\n\nThis is why the resistance of a metal wire increases with temperature. (Note: semiconductors behave oppositely — their resistance DECREASES with temperature, which is used in thermistors for temperature measurement.)',
      h: 'More vibrations = more collisions with electrons.',
    },
    {
      yr: 2022,
      q: 'Unit of electrical resistance',
      o: ['Volt', 'Ampere', 'Ohm', 'Watt'],
      a: 2,
      e: 'Electrical resistance is measured in Ohms, named after Georg Simon Ohm.',
      full: "Resistance is the opposition that a material offers to the flow of electric current. The greater the resistance, the harder it is for current to flow. Resistance is measured in ohms (Ω), named after Georg Simon Ohm, the German physicist who discovered Ohm's Law.\n\nOhm's Law states that V = IR — voltage equals current times resistance. From this: resistance (R) = V/I.\n\nVolts measure electrical potential difference (voltage). Amperes measure electrical current. Watts measure electrical power. None of these measure resistance. The symbol for ohm is Ω (the Greek letter omega).",
      h: "Named after Ohm — who discovered Ohm's Law.",
    },
    {
      yr: 2024,
      q: "V = 12V, R = 4 ohms. Find I using Ohm's Law.",
      o: ['48A', '8A', '3A', '0.33A'],
      a: 2,
      e: 'I = V/R = 12/4 = 3A.',
      full: "Ohm's Law is one of the most fundamental relationships in electricity: V = IR, where V is voltage (volts), I is current (amperes), and R is resistance (ohms).\n\nTo find current, rearrange: I = V/R.\nSubstitute the values: I = 12V / 4Ω = 3A.\n\nVerify: V = IR = 3A × 4Ω = 12V. ✓\n\nRemember the triangle: cover the quantity you want to find. Cover I → V/R. Cover V → I×R. Cover R → V/I.",
      h: 'Rearrange V = IR to find I.',
    },
    {
      yr: 2023,
      q: 'Which wave requires a medium to travel?',
      o: ['Light waves', 'Radio waves', 'Sound waves', 'X-rays'],
      a: 2,
      e: 'Sound waves require a physical medium. Light travels in a vacuum.',
      full: 'Mechanical waves require a physical medium — solid, liquid, or gas — to propagate. They move by causing particles of the medium to vibrate and pass energy along. Sound is a mechanical wave. This is why there is no sound in the vacuum of outer space.\n\nElectromagnetic waves (light, radio waves, X-rays, microwaves, gamma rays) do NOT require a medium. They are self-propagating oscillations of electric and magnetic fields and can travel through a vacuum at the speed of light.\n\nThis is a critical distinction. Sound cannot travel in space (no medium), but light from the sun reaches us across 150 million km of vacuum effortlessly.',
      h: 'Can sound travel in a vacuum?',
    },
    {
      yr: 2022,
      q: 'Gravitational field strength on Earth',
      o: ['9.8 N/kg', '10 N/kg squared', '9.8 m/s', '8.9 N/kg'],
      a: 0,
      e: 'g = 9.8 N/kg.',
      full: "The gravitational field strength (g) on Earth's surface is approximately 9.8 N/kg (or 9.8 m/s²). This means every kilogram of mass experiences a downward gravitational force of 9.8 Newtons.\n\nThe unit N/kg (Newtons per kilogram) is used when thinking about it as a field strength. The unit m/s² (metres per second squared) is used when thinking about it as gravitational acceleration. Both values are equivalent and equal to approximately 9.8.\n\nFor calculation purposes in JAMB, 10 N/kg is often used as a convenient approximation, but the more precise value is 9.8 N/kg.",
      h: 'g is approximately 9.8, units are N/kg.',
    },
    {
      yr: 2024,
      q: 'Kinetic energy is',
      o: [
        'Energy stored in a body',
        'Energy due to motion',
        'Energy due to position',
        'Chemical energy',
      ],
      a: 1,
      e: 'KE is energy due to motion. KE = half mv squared.',
      full: "Kinetic energy is the energy an object possesses because it is moving. Any object with mass that is in motion has kinetic energy — a running person, a flying bullet, a rolling ball, a flowing river.\n\nThe formula is KE = ½mv², where m is the object's mass (kg) and v is its velocity (m/s). Notice that KE depends on the SQUARE of velocity — doubling speed quadruples the kinetic energy. This is why high-speed collisions are so much more destructive.\n\nPotential energy is stored energy due to position (a ball held up high). Thermal energy is due to the random motion of particles. Chemical energy is stored in molecular bonds.",
      h: 'Kinetic comes from Greek for motion.',
    },
    {
      yr: 2023,
      q: 'Heat transfer through direct contact is called',
      o: ['Convection', 'Radiation', 'Conduction', 'Reflection'],
      a: 2,
      e: 'Conduction transfers heat through direct contact without material moving.',
      full: 'Heat can transfer in three ways, and it is important to distinguish between them.\n\nConduction occurs when heat is transferred through direct physical contact — hot atoms or molecules vibrate and transfer energy to neighbouring atoms by bumping into them. The material itself does not move. This is how a metal spoon gets hot when left in hot soup.\n\nConvection occurs in fluids (liquids and gases). Hot fluid expands, becomes less dense, rises, and is replaced by cooler denser fluid — the material actually moves in currents.\n\nRadiation requires no medium at all — energy travels as electromagnetic waves (infrared radiation). The sun warms Earth by radiation across the vacuum of space.',
      h: 'Contact = conduction. Fluid movement = convection.',
    },
    {
      yr: 2022,
      q: 'Colour of light with highest frequency',
      o: ['Red', 'Orange', 'Blue', 'Violet'],
      a: 3,
      e: 'Violet has the highest frequency in the visible spectrum.',
      full: 'The visible spectrum is the range of light wavelengths detectable by the human eye. It runs from red (longest wavelength, lowest frequency) through orange, yellow, green, blue, indigo, to violet (shortest wavelength, highest frequency). This is remembered as ROYGBIV.\n\nFrequency and wavelength are inversely proportional for electromagnetic waves: higher frequency = shorter wavelength. Violet light has the shortest wavelength (~380-450 nm) in the visible spectrum and therefore the highest frequency.\n\nRed light has the lowest frequency. Beyond violet is ultraviolet (which we cannot see). Beyond red is infrared (which we feel as heat but cannot see).',
      h: 'ROYGBIV — which end has highest frequency?',
    },
    {
      yr: 2024,
      q: "Newton's first law: a body remains at rest unless",
      o: [
        'Acted on by gravity',
        'Acted on by external force',
        'It has mass',
        'It is in space',
      ],
      a: 1,
      e: 'Law of Inertia: objects stay at rest unless acted on by unbalanced external force.',
      full: "Newton's First Law — often called the Law of Inertia — states that an object will remain in its current state (either at rest or moving at constant velocity in a straight line) unless acted upon by a net external force.\n\nInertia is the tendency of objects to resist changes in their motion. A book sitting on a table stays still because the forces on it are balanced (gravity down, normal force up). A spacecraft moving through space continues at the same speed forever because there is no friction or air resistance to slow it.\n\nThe moment an unbalanced external force acts — like friction, gravity, or a push — the state of motion changes. That change (acceleration) is described by Newton's Second Law: F = ma.",
      h: 'What breaks the state of rest?',
    },
    {
      yr: 2023,
      q: 'Unit of power',
      o: ['Joule', 'Newton', 'Watt', 'Volt'],
      a: 2,
      e: 'Power is measured in Watts. 1 Watt = 1 Joule per second.',
      full: 'Power is the rate at which work is done or energy is transferred. It tells you how quickly energy is being used or produced.\n\nFormula: Power = Energy ÷ Time, or P = W/t\n\nThe SI unit is the Watt (W), named after James Watt who improved the steam engine. 1 Watt means 1 Joule of energy is transferred every second.\n\nA 60W light bulb uses 60 Joules of electrical energy every second. A person climbing stairs might use 500W of power. The Joule measures energy (not the rate). The Newton measures force. The Volt measures electrical potential difference.',
      h: 'Named after James Watt.',
    },
    {
      yr: 2022,
      q: 'Pressure is force per unit ___',
      o: ['Volume', 'Area', 'Mass', 'Length'],
      a: 1,
      e: 'Pressure = Force divided by Area. Measured in Pascals.',
      full: 'Pressure is the force applied per unit area. The same force spread over a larger area creates less pressure, while concentrated over a small area creates more pressure. This is why a sharp knife cuts better than a blunt one — the force is concentrated on a tiny area, creating enormous pressure.\n\nFormula: Pressure = Force ÷ Area, or P = F/A\n\nThe SI unit is the Pascal (Pa), named after Blaise Pascal, where 1 Pa = 1 N/m².\n\nHigh-heeled shoes exert more pressure on the floor than flat shoes because the same weight is concentrated on a tiny heel area. Snowshoes spread weight over a large area to reduce pressure on snow.',
      h: 'P = F/A. Force spread over what?',
    },
    {
      yr: 2024,
      q: 'A transformer steps up voltage. What happens to current?',
      o: ['Increases', 'Decreases', 'Stays the same', 'Becomes zero'],
      a: 1,
      e: 'In a transformer, power is conserved. If voltage increases, current decreases proportionally.',
      full: 'A transformer transfers electrical energy between circuits through electromagnetic induction. The key principle is conservation of energy — assuming 100% efficiency, the power output equals the power input.\n\nPower = Voltage × Current (P = VI). If voltage steps up, and power stays the same, then current must step DOWN proportionally. If you double the voltage, current halves. This is why electricity is transmitted over long distances at very high voltage and low current — lower current means less energy lost as heat in the wires (heat loss = I²R).\n\nStep-up transformer: increases voltage, decreases current. Step-down transformer: decreases voltage, increases current.',
      h: 'Power = V x I. If V goes up and power stays same, what happens to I?',
    },
    {
      yr: 2023,
      q: 'What type of lens corrects short-sightedness?',
      o: ['Convex', 'Concave', 'Plane', 'Bifocal'],
      a: 1,
      e: 'Concave (diverging) lenses correct myopia by diverging light rays.',
      full: 'Myopia (short-sightedness) occurs when the eyeball is too long or the lens is too curved, causing light from distant objects to focus IN FRONT of the retina instead of ON it. The result: distant objects appear blurry.\n\nTo correct this, we need a lens that spreads (diverges) the light rays BEFORE they enter the eye, so that they focus further back — right on the retina. A concave (diverging) lens does this by bending rays outward.\n\nConvex (converging) lenses correct hyperopia (long-sightedness) by converging light. They are used for reading glasses when someone cannot focus on close objects.',
      h: 'Short-sighted = image falls in FRONT of retina. Which lens spreads light?',
    },
    {
      yr: 2022,
      q: 'The speed of light in a vacuum is approximately',
      o: ['3 x 10^6 m/s', '3 x 10^8 m/s', '3 x 10^10 m/s', '3 x 10^4 m/s'],
      a: 1,
      e: 'The speed of light in a vacuum is approximately 3 x 10^8 m/s.',
      full: "The speed of light in a vacuum is one of the most fundamental constants in physics. It is approximately 299,792,458 m/s — which rounds conveniently to 3 × 10⁸ m/s. The symbol for the speed of light is c.\n\nThis constant appears in Einstein's famous equation E = mc², relating energy to mass. Nothing with mass can travel as fast as light. Light takes about 8 minutes to travel from the Sun to Earth (150 million km).\n\n3 × 10⁶ m/s is 100 times too slow. 3 × 10¹⁰ m/s is 100 times too fast. 3 × 10⁴ m/s is about 30 km/s — which is nothing like the speed of light.",
      h: 'A very large number. 3 x 10 to the power of what?',
    },
    {
      yr: 2024,
      q: 'Which type of energy does a stretched spring possess?',
      o: [
        'Kinetic energy',
        'Thermal energy',
        'Elastic potential energy',
        'Chemical energy',
      ],
      a: 2,
      e: 'A stretched spring stores elastic potential energy due to its deformation.',
      full: 'Potential energy is stored energy — energy that is waiting to be released. Elastic potential energy specifically is stored in objects that have been deformed (stretched, compressed, or twisted) and will return to their original shape when released.\n\nA stretched spring, a compressed rubber ball, a drawn bowstring, a wound-up clock spring — all store elastic potential energy. When released, this stored energy converts to kinetic energy (motion).\n\nKinetic energy is energy due to current motion (not stored). Thermal energy is heat. Chemical energy is stored in molecular bonds. Only elastic potential energy describes energy stored in a deformed spring.',
      h: 'Stretched = deformed = stored what kind of energy?',
    },
    {
      yr: 2023,
      q: 'Frequency of a wave with period 0.02s?',
      o: ['50 Hz', '20 Hz', '200 Hz', '0.02 Hz'],
      a: 0,
      e: 'Frequency = 1 divided by Period = 1/0.02 = 50 Hz.',
      full: 'Frequency (f) and period (T) are inversely related in wave physics. Frequency is how many complete wave cycles occur per second (measured in Hz). Period is how long one complete cycle takes (measured in seconds).\n\nFormula: f = 1/T (or T = 1/f).\n\nWith T = 0.02 s: f = 1 ÷ 0.02 = 50 Hz.\n\nThis means the wave completes 50 full cycles every second. A period of 0.02 seconds means each cycle takes 20 milliseconds. A mains electricity supply in Nigeria runs at 50 Hz — meaning the current alternates direction 50 times per second, with each cycle taking 0.02 s.',
      h: 'f = 1/T. Divide 1 by the period.',
    },
    {
      yr: 2022,
      q: 'Object has mass 5kg. Weight on Earth (g = 10)?',
      o: ['5 N', '50 N', '0.5 N', '500 N'],
      a: 1,
      e: 'Weight = mass x g = 5 x 10 = 50 N.',
      full: 'Weight is the gravitational force acting on an object. It is calculated using: Weight (W) = mass (m) × gravitational field strength (g).\n\nWith m = 5 kg and g = 10 N/kg:\nW = 5 × 10 = 50 N.\n\nNote that mass (5 kg) and weight (50 N) are different quantities. Mass is the amount of matter in an object and stays the same everywhere. Weight depends on gravity — on the Moon (g ≈ 1.6 N/kg), the same 5 kg object would weigh only 8 N. On Earth, the weight is 50 N.',
      h: 'W = mg. Mass x gravitational field strength.',
    },
    {
      yr: 2024,
      q: 'Fuse wire in a circuit is designed to',
      o: [
        'Increase current',
        'Decrease voltage',
        'Protect the circuit from excess current',
        'Increase resistance',
      ],
      a: 2,
      e: 'A fuse melts when current exceeds a safe level, breaking the circuit and preventing damage.',
      full: "A fuse is a deliberate weak link in an electrical circuit — a thin wire with a specific current rating. Under normal operating conditions, the current through the fuse is within its safe limit and it stays intact.\n\nIf a fault causes excess current to flow (like a short circuit), the fuse wire heats up rapidly due to its high resistance relative to the rest of the circuit. When the current exceeds the fuse's rated value, the wire melts and breaks the circuit — stopping all current flow and protecting the appliance and wiring from damage or fire.\n\nFuses are one-time devices — once blown, they must be replaced. Circuit breakers serve the same purpose but can be reset after tripping.",
      h: 'A fuse sacrifices itself to protect what?',
    },
    {
      yr: 2023,
      q: 'The SI unit of electric charge is',
      o: ['Ampere', 'Volt', 'Coulomb', 'Ohm'],
      a: 2,
      e: 'Electric charge is measured in Coulombs (C).',
      full: 'Electric charge is the fundamental property of matter that causes it to experience electromagnetic forces. There are two types: positive charge (carried by protons) and negative charge (carried by electrons).\n\nThe SI unit of electric charge is the Coulomb (C), named after French physicist Charles-Augustin de Coulomb who studied electrostatic forces. One Coulomb is the amount of charge transferred by a current of 1 Ampere flowing for 1 second.\n\nThe charge of one electron is -1.6 × 10⁻¹⁹ C — an incredibly tiny amount, which is why everyday circuits involve flows of trillions of electrons. Amperes measure current flow rate. Volts measure electrical potential. Ohms measure resistance.',
      h: 'Named after Charles-Augustin de Coulomb.',
    },
    {
      yr: 2022,
      q: 'Density: Mass = 200g, Volume = 40cm cubed. Density?',
      o: ['5 g/cm3', '0.2 g/cm3', '8000 g/cm3', '160 g/cm3'],
      a: 0,
      e: 'Density = 200 divided by 40 = 5 g/cm3.',
      full: 'Density is a measure of how much mass is packed into a given volume. Formula: Density = Mass ÷ Volume.\n\nWith Mass = 200 g and Volume = 40 cm³:\nDensity = 200 ÷ 40 = 5 g/cm³.\n\nThis means every cubic centimetre of the material has a mass of 5 grams. For comparison: water has a density of 1 g/cm³ (things denser than 1 sink in water; less dense than 1 float). Gold is about 19.3 g/cm³. Aluminium is 2.7 g/cm³.\n\n0.2 g/cm³ would come from dividing the wrong way (40 ÷ 200). Always check: mass ÷ volume, not volume ÷ mass.',
      h: 'Divide mass by volume.',
    },
    {
      yr: 2024,
      q: 'Which type of radiation is stopped by paper?',
      o: ['Alpha', 'Beta', 'Gamma', 'X-ray'],
      a: 0,
      e: 'Alpha particles are the largest and least penetrating — stopped by a sheet of paper.',
      full: 'Radioactive decay produces three types of radiation, each with different properties.\n\nAlpha particles are the largest — essentially a helium nucleus (2 protons + 2 neutrons). Because of their relatively large size and double positive charge, they collide frequently with matter and lose energy quickly. They travel only a few centimetres in air and are stopped by a sheet of paper or the outer layer of human skin. They are the most ionising (cause the most damage per unit path) but least penetrating.\n\nBeta particles are fast-moving electrons — smaller and more penetrating, stopped by a few mm of aluminium. Gamma rays are electromagnetic waves — highly penetrating, requiring several cm of lead or metres of concrete to attenuate significantly.',
      h: 'Largest, least penetrating radiation. Stopped by the weakest barrier.',
    },
    {
      yr: 2023,
      q: 'An echo is caused by',
      o: [
        'Refraction of sound',
        'Reflection of sound',
        'Absorption of sound',
        'Diffraction of sound',
      ],
      a: 1,
      e: 'An echo is the reflection of sound off a hard surface back to the listener.',
      full: 'Sound is a mechanical wave that travels through a medium (air, water, or solid) as a series of compressions and rarefactions. Like all waves, sound can be reflected, refracted, absorbed, and diffracted.\n\nWhen sound waves hit a hard, flat surface (like a cliff face, building, or empty room wall), they bounce back. If you are far enough from the surface (at least about 17 metres, to allow the original sound to die out before the reflection returns), you hear the reflected sound as a distinct repetition — an echo.\n\nReverberation is different — it is the persistence of sound in a room due to multiple reflections arriving too quickly to distinguish as separate echoes.',
      h: 'Echo = sound coming back to you = which wave behaviour?',
    },
    {
      yr: 2022,
      q: 'Work done: F = 20N, d = 5m. Work = ?',
      o: ['4 J', '25 J', '100 J', '15 J'],
      a: 2,
      e: 'Work = 20 x 5 = 100 J.',
      full: 'Work is done when a force causes an object to move in the direction of the force. The formula is: Work = Force × Distance (W = Fd).\n\nWith F = 20 N and d = 5 m:\nWork = 20 × 5 = 100 J (Joules).\n\nThe Joule is the SI unit of work and energy: 1 J = 1 N·m (one Newton of force applied over one metre). If the force is applied perpendicular to the movement (like holding a heavy bag while walking horizontally), no work is done in the physics sense — work requires force and displacement to be in the same direction.',
      h: 'Multiply force by distance.',
    },
    {
      yr: 2024,
      q: 'Total internal reflection occurs when light moves from',
      o: ['Air to glass', 'Water to air', 'Air to water', 'Vacuum to glass'],
      a: 1,
      e: 'Total internal reflection occurs when light moves from denser to less dense medium beyond critical angle.',
      full: 'When light travels from a denser medium (like glass or water) to a less dense medium (like air), it refracts (bends away from the normal). As the angle of incidence increases, the refracted ray bends more and more.\n\nAt a specific angle — called the critical angle — the refracted ray travels along the boundary (90° to the normal). If the angle of incidence EXCEEDS the critical angle, no refraction occurs. Instead, all the light reflects back into the denser medium. This is total internal reflection.\n\nApplications: optical fibres use total internal reflection to transmit light signals with virtually no loss over long distances — enabling modern internet cables. Diamonds sparkle because they are cut to maximise internal reflection.',
      h: 'Denser to less dense medium. Water is denser than air.',
    },
    {
      yr: 2023,
      q: 'Principle of moments states that for equilibrium',
      o: [
        'Sum of upward forces = downward forces',
        'Clockwise moments = anticlockwise moments',
        'Action = reaction',
        'Force = mass x acceleration',
      ],
      a: 1,
      e: 'For rotational equilibrium, the sum of clockwise moments equals sum of anticlockwise moments.',
      full: 'A moment is the turning effect of a force about a pivot point. It is calculated as: Moment = Force × Perpendicular distance from pivot.\n\nFor a body to be in rotational equilibrium (not rotating), the total clockwise moments about any point must equal the total anticlockwise moments. This is the Principle of Moments.\n\nExample: a see-saw balances when a heavy child sits closer to the middle and a lighter child sits further from the middle — because the moments (force × distance) on each side are equal.\n\nThis principle is used in the design of levers, cranes, bridges, and any structure that must remain stationary under turning forces.',
      h: 'Balance point: which moments must be equal?',
    },
    {
      yr: 2022,
      q: 'Machine has effort 50N and load 200N. Mechanical advantage?',
      o: ['4', '0.25', '250', '150'],
      a: 0,
      e: 'Mechanical Advantage = Load/Effort = 200/50 = 4.',
      full: 'Mechanical Advantage (MA) tells you how much a machine multiplies your effort force. It is the ratio of the load (output force) to the effort (input force).\n\nFormula: MA = Load ÷ Effort = 200 N ÷ 50 N = 4.\n\nAn MA of 4 means the machine multiplies your effort by 4 — you apply 50 N and can move a 200 N load. However, this comes at a cost: you must move the effort further than the load moves (work in = work out, assuming no friction).\n\nMA greater than 1 means the machine gives a force advantage. MA less than 1 means the machine trades force for speed or distance (like a bicycle gear that makes pedalling faster).',
      h: 'MA = Load divided by Effort.',
    },
  ],
  government: [
    {
      yr: 2024,
      q: 'The three arms of government are',
      o: [
        'Executive, Legislative, Judiciary',
        'President, Senate, Courts',
        'Cabinet, Parliament, Judiciary',
        'Federal, State, Local',
      ],
      a: 0,
      e: 'Executive implements laws, Legislative makes laws, Judiciary interprets laws.',
      full: 'Modern democratic governments typically divide power among three separate branches to prevent any single group from becoming too powerful. This is called the separation of powers.\n\nThe Legislature (in Nigeria: the National Assembly — Senate and House of Representatives) makes the laws. The Executive (headed by the President) implements and enforces those laws through government ministries and agencies. The Judiciary (courts, headed by the Supreme Court) interprets the laws and resolves disputes about their meaning or application.\n\nThis three-way division ensures accountability. Each branch can check the others through mechanisms called checks and balances.',
      h: 'Which three bodies make, implement, and interpret laws?',
    },
    {
      yr: 2023,
      q: 'Federalism is a system where',
      o: [
        'All power is centralised',
        'Power is shared between central and component units',
        'Only states have power',
        'The military rules',
      ],
      a: 1,
      e: 'Federalism divides sovereign power between central and state governments.',
      full: 'In a unitary system, all significant power rests with the central government — local authorities exist only by permission and can be overruled or abolished. In a federal system, sovereign power is constitutionally DIVIDED between a central government and component units (states or regions), and neither can simply abolish the other.\n\nNigeria is a federal state — the Federal Government and the 36 state governments both have constitutionally defined powers. Some powers are exclusive to the federal government (defence, immigration). Some are concurrent (shared). Some belong only to states.\n\nMilitary rule concentrates power; it is the opposite of federalism.',
      h: 'Federal = power shared between levels.',
    },
    {
      yr: 2024,
      q: 'Separation of powers was propounded by',
      o: [
        'John Locke',
        'Thomas Hobbes',
        'Baron de Montesquieu',
        'Jean Jacques Rousseau',
      ],
      a: 2,
      e: 'Montesquieu developed the doctrine in The Spirit of the Laws (1748).',
      full: "The doctrine of separation of powers — that government functions should be divided among separate institutions to prevent tyranny — was most fully developed by the French political philosopher Baron de Montesquieu in his landmark work The Spirit of the Laws, published in 1748.\n\nMontesquieu was inspired by his observation of the English constitutional system. His ideas directly influenced the framers of the American Constitution and have shaped democratic constitutions around the world, including Nigeria's.\n\nJohn Locke also wrote about separation of powers (legislative and executive) but Montesquieu developed the full three-way separation including an independent judiciary. Thomas Hobbes argued for strong centralised authority. Rousseau focused on the social contract and popular sovereignty.",
      h: 'French philosopher of the 18th century.',
    },
    {
      yr: 2023,
      q: 'Rigid constitution requires',
      o: [
        'Can be changed easily',
        'Special procedure to amend',
        'No written form',
        'Military control',
      ],
      a: 1,
      e: 'A rigid constitution requires a complex amendment procedure, not a simple majority.',
      full: "Constitutions vary in how easily they can be amended. A flexible constitution can be changed by the ordinary legislative process — just like any other law, by a simple majority. The UK's unwritten constitution is an example of flexibility.\n\nA rigid constitution requires a special, more demanding procedure to be amended — such as a supermajority (e.g. two-thirds of the legislature), ratification by state legislatures, or a referendum. This rigidity protects fundamental rights and structures from being easily changed by temporary political majorities.\n\nNigeria's 1999 Constitution is rigid — amending it requires approval by two-thirds of the National Assembly and the approval of at least 24 state Houses of Assembly.",
      h: 'Rigid = hard to change = special requirements.',
    },
    {
      yr: 2022,
      q: 'Main function of the legislature is to',
      o: ['Implement laws', 'Make laws', 'Interpret laws', 'Enforce laws'],
      a: 1,
      e: 'The legislature is responsible for making laws.',
      full: "The word legislature comes from the Latin legis (law) + latura (bringing). The legislature's primary function is to deliberate on and pass laws that govern the country.\n\nIn Nigeria's bicameral National Assembly, the process involves a bill being introduced, read three times, debated, and voted on in both the Senate and House of Representatives before being sent to the President for assent.\n\nThe executive implements and enforces laws — it does not make them. The judiciary interprets laws — it explains what they mean in specific cases. Law enforcement agencies enforce laws at street level. The legislature is the lawmaking body.",
      h: 'Legislature comes from legis = law.',
    },
    {
      yr: 2024,
      q: 'Head of government in parliamentary system',
      o: ['President', 'Prime Minister', 'Monarch', 'Governor-General'],
      a: 1,
      e: 'In parliamentary system, the Prime Minister is head of government.',
      full: 'There are two main systems of executive government. In a presidential system (like Nigeria and the USA), the president is both head of state and head of government, directly elected by the people.\n\nIn a parliamentary system (like the UK, India, and many former British colonies), there is a separation between the head of state (often a monarch or president who is ceremonial) and the head of government (the Prime Minister, who leads the cabinet and is accountable to parliament).\n\nIn the UK, King Charles III is the head of state but has limited real power. The Prime Minister (from the majority party in Parliament) is the head of government and actually runs the country.',
      h: 'Parliamentary system — which official leads the government?',
    },
    {
      yr: 2023,
      q: 'Universal Adult Suffrage means',
      o: [
        'Only educated people vote',
        'All adults above minimum age can vote',
        'Only taxpayers vote',
        'Only men vote',
      ],
      a: 1,
      e: 'Universal adult suffrage grants voting rights to all adult citizens.',
      full: 'Suffrage means the right to vote. Universal adult suffrage means this right is granted to ALL adults above the minimum voting age, without discrimination based on gender, wealth, education, religion, or ethnicity.\n\nHistorically, voting was restricted in most countries — only men with property, or only white citizens, or only educated citizens could vote. Universal suffrage was a major democratic achievement won through long political struggles.\n\nIn Nigeria, all citizens aged 18 and above who are registered with INEC have the right to vote. This is universal adult suffrage in practice.',
      h: 'Universal = for all. Suffrage = right to vote.',
    },
    {
      yr: 2022,
      q: 'Checks and balances means',
      o: [
        'Government keeps financial records',
        'Each arm limits the power of others',
        'Banks regulate government',
        'Military checks civilians',
      ],
      a: 1,
      e: 'Checks and balances prevents any one arm from becoming too powerful.',
      full: 'Even with separation of powers, it is possible for one branch to dominate the others. Checks and balances is a system where each branch of government has specific powers to limit or oversee the others, preventing any single branch from accumulating unchecked power.\n\nFor example: the legislature makes laws but the executive can veto them. The executive implements laws but the legislature can override a veto with enough votes. The judiciary can declare laws unconstitutional. The executive appoints judges but the legislature must confirm them.\n\nThis web of mutual oversight ensures that power is balanced and that no president, parliament, or court can act without accountability to the others.',
      h: 'Each arm can check the others from abusing power.',
    },
    {
      yr: 2024,
      q: 'ECOWAS was established in',
      o: ['1975', '1980', '1963', '1970'],
      a: 0,
      e: 'ECOWAS was established in 1975 in Lagos.',
      full: "The Economic Community of West African States (ECOWAS) was founded on 28 May 1975 through the Treaty of Lagos, signed by 15 West African nations. Nigeria was a key driver of the organisation's creation under General Yakubu Gowon.\n\nECOWAS aims to promote economic integration, free movement of people and goods, and political stability across West Africa. Its headquarters is in Abuja, Nigeria. It has also taken on security roles — the ECOWAS Monitoring Group (ECOMOG) has intervened in regional conflicts.\n\nNever confuse the founding date (1975) with the OAU founding date (1963) or Nigeria's independence (1960).",
      h: 'When was the Treaty of Lagos signed?',
    },
    {
      yr: 2023,
      q: 'UN organ responsible for international peace',
      o: ['General Assembly', 'Security Council', 'ICJ', 'Secretariat'],
      a: 1,
      e: 'The Security Council has primary responsibility for maintaining international peace.',
      full: 'The United Nations has several principal organs with different roles. The General Assembly includes all 193 member states, debates issues, and passes non-binding resolutions. The Secretariat is the administrative arm led by the Secretary-General. The International Court of Justice (ICJ) settles legal disputes between states.\n\nThe Security Council has 15 members — 5 permanent (USA, UK, France, Russia, China) with veto power, and 10 rotating elected members. Under the UN Charter, the Security Council has PRIMARY responsibility for international peace and security. It can authorise peacekeeping operations, impose sanctions, and authorise the use of military force.',
      h: 'Peace and security = which council?',
    },
    {
      yr: 2022,
      q: 'Citizenship can be acquired by',
      o: [
        'Birth only',
        'Naturalisation only',
        'Birth, naturalisation, and registration',
        'Election',
      ],
      a: 2,
      e: 'Citizenship can be acquired by birth, naturalisation, or registration.',
      full: 'Countries determine who their citizens are through different methods:\n\nCitizenship by birth has two forms: jus soli (right of the soil — born on the territory) and jus sanguinis (right of blood — born to citizen parents). Nigeria primarily uses jus sanguinis.\n\nCitizenship by naturalisation is granted to foreigners who have lived in the country for a specified period, met certain requirements (good conduct, language proficiency), and applied formally.\n\nCitizenship by registration is a simpler process for certain categories — like foreign women who marry Nigerian citizens, or people with strong ancestral ties.\n\nAll three routes are valid in Nigerian law.',
      h: 'There are multiple ways to become a citizen.',
    },
    {
      yr: 2024,
      q: 'Rule of law means',
      o: [
        'Rulers are above the law',
        'Everyone is equal before the law',
        'Only courts make laws',
        'Law is for the poor',
      ],
      a: 1,
      e: 'Rule of law: no one is above the law — all persons subject equally.',
      full: 'The rule of law is a foundational principle of constitutional democracy. It means that the law is supreme — it applies equally to every person in society, including rulers, presidents, soldiers, and ordinary citizens. No individual, institution, or group is above the law.\n\nA.V. Dicey, the British constitutional scholar, identified three core elements: no one can be punished except for a breach of the law; everyone is equal before and under the law; and constitutional rights are the result of ordinary law rather than abstract documents.\n\nWhere the rule of law is absent, you have arbitrary government — rulers who can imprison, punish, or favour people at will, based on personal power rather than legal principle.',
      h: 'Rule OF law — everyone including leaders must obey.',
    },
    {
      yr: 2023,
      q: 'A Bill becomes a law when',
      o: [
        'The Speaker signs it',
        'Passed by Senate only',
        'It receives presidential assent',
        'The public approves',
      ],
      a: 2,
      e: 'After passing both houses, a bill becomes law when the President gives assent.',
      full: "In Nigeria's law-making process, a bill must pass through several stages. It is introduced in either the Senate or House of Representatives, read three times, debated, and voted on in that chamber. Then it goes to the other chamber for the same process.\n\nIf both chambers pass the bill (including resolving any differences), it is sent to the President. The President can either sign it — giving assent and making it law — or withhold assent (a veto). If the President withholds assent, the National Assembly can override the veto with a two-thirds majority vote in both chambers.\n\nPresidential assent is the final, critical step that converts a bill into an Act of Parliament — a binding law.",
      h: 'Last step in the lawmaking process.',
    },
    {
      yr: 2022,
      q: 'Political socialisation refers to',
      o: [
        'Making politicians social',
        'Process of acquiring political values',
        'Socialising in parties',
        'Registering to vote',
      ],
      a: 1,
      e: 'Political socialisation is how individuals learn political values from family, school, media.',
      full: "Political socialisation is the lifelong process through which individuals acquire political knowledge, values, beliefs, and attitudes. It is how citizens come to understand politics and form opinions about government, authority, rights, and civic duties.\n\nThe primary agents of political socialisation include: family (the first and most influential — children absorb parents' political views early); schools (civic education, history classes, national symbols); peer groups (friends and social circles reinforce or challenge views); mass media (television, social media, newspapers shape political perceptions); and religious institutions (which can carry political values).\n\nThis process never truly ends — people continue to update their political views throughout life as they encounter new experiences.",
      h: 'How do people learn their political beliefs?',
    },
    {
      yr: 2024,
      q: 'Which is an example of an unwritten constitution?',
      o: ['USA', 'Nigeria', 'UK', 'France'],
      a: 2,
      e: 'The UK has no single codified constitutional document — its constitution is unwritten.',
      full: 'Most countries have a codified constitution — a single written document that is the supreme law of the land, containing the fundamental rights, powers, and structures of government. Examples include Nigeria (1999 Constitution), USA (1787 Constitution), and France.\n\nThe United Kingdom is famously different. There is no single document called "The British Constitution." Instead, British constitutional law is scattered across centuries of Acts of Parliament (like the Magna Carta of 1215, the Bill of Rights of 1689), court judgements, and unwritten conventions that everyone follows without being explicitly legally required to.\n\nThis makes the UK constitution unwritten (or more precisely, uncodified) — a product of gradual evolution rather than a single founding moment.',
      h: 'Which country relies on conventions rather than a single written document?',
    },
    {
      yr: 2023,
      q: 'A state can be defined by',
      o: [
        'Its army only',
        'Population, territory, government, sovereignty',
        'Only its government',
        'Only its population',
      ],
      a: 1,
      e: 'The four elements of a state are: population, territory, government, and sovereignty.',
      full: 'A state in international relations is more than just a country name — it must possess four essential elements to be recognised as a state in the Westphalian sense:\n\nPopulation: a permanent group of people who live in the territory. A state without people is not a state. Territory: a defined geographic area with recognised borders. Government: an organised authority that can make and enforce rules. Sovereignty: the supreme power to govern without interference from external authorities.\n\nAn army is not one of the four elements — states can exist without a military (Costa Rica has no army). The four elements are the classical definition from international law.',
      h: 'What four elements define a state?',
    },
    {
      yr: 2022,
      q: 'Pressure group differs from political party because it',
      o: [
        'Has members',
        'Seeks to influence government but not control it',
        'Has a constitution',
        'Organises elections',
      ],
      a: 1,
      e: 'Pressure groups seek to influence policy without seeking political power themselves.',
      full: 'Both pressure groups and political parties participate in the political process, but they differ fundamentally in their goals.\n\nPolitical parties seek to WIN POWER — to control government by contesting elections and filling government positions. Once in power, they make laws and run the country.\n\nPressure groups (interest groups) do NOT seek to govern. They seek to INFLUENCE those who govern. They lobby politicians, campaign in public, commission research, organise protests, and use media to push specific policies. Examples: trade unions, business associations, environmental groups, religious organisations.\n\nBoth may have constitutions and members, and both may organise activities — but only parties contest elections to take power.',
      h: 'Pressure groups influence; parties seek to control?',
    },
    {
      yr: 2024,
      q: 'Bicameral legislature means',
      o: ['One house', 'Two houses', 'Three houses', 'Many houses'],
      a: 1,
      e: 'Bicameral = two chambers. In Nigeria: Senate and House of Representatives.',
      full: "The word bicameral comes from Latin: bi (two) + camera (chamber). A bicameral legislature has two separate houses or chambers that both play a role in the law-making process.\n\nNigeria's National Assembly is bicameral: the Senate (upper house, 109 members) and the House of Representatives (lower house, 360 members). For most bills to become law, both houses must pass them.\n\nBicameral systems are common in federations — the upper house often represents the component units (states) while the lower house represents population. A unicameral legislature has only one chamber (like the parliaments of Ghana and Senegal).",
      h: 'Bi = two. Cameral = chamber.',
    },
    {
      yr: 2023,
      q: 'The Nigerian Senate has how many members?',
      o: ['360', '109', '120', '469'],
      a: 1,
      e: 'The Nigerian Senate has 109 members — 3 from each of 36 states plus 1 from FCT.',
      full: 'The Nigerian Senate is the upper chamber of the National Assembly. Its composition reflects the federal structure of Nigeria:\n\n3 senators per state × 36 states = 108 senators, plus 1 senator representing the Federal Capital Territory (Abuja) = 109 senators total.\n\nThis equal representation of states in the Senate (regardless of population) ensures that smaller states have an equal voice to large states like Lagos or Kano. The House of Representatives, by contrast, is allocated seats based on population — it has 360 members.\n\nDo not confuse 360 (House of Representatives members) with 109 (Senate members).',
      h: 'Three senators per state x 36 states + 1 FCT.',
    },
    {
      yr: 2022,
      q: 'Judicial review is the power of courts to',
      o: [
        'Appoint judges',
        'Declare laws unconstitutional',
        'Make new laws',
        'Amend the constitution',
      ],
      a: 1,
      e: 'Judicial review allows courts to strike down laws that conflict with the constitution.',
      full: 'Judicial review is the power of courts — ultimately the Supreme Court — to examine laws, executive actions, and government decisions to determine whether they are consistent with the constitution. If found inconsistent, the court can declare them null and void.\n\nThis power makes the judiciary a vital check on the legislature and executive. Even if parliament passes a law with a large majority, the Supreme Court can strike it down if it violates fundamental constitutional rights or exceeds legislative powers.\n\nJudicial review is central to constitutional democracy. In Nigeria, Section 1(3) of the 1999 Constitution states that any law inconsistent with the constitution is void to the extent of its inconsistency.',
      h: 'Which court power protects the constitution?',
    },
    {
      yr: 2024,
      q: 'Proportional representation is a type of',
      o: ['Electoral system', 'Constitution', 'Government', 'Political party'],
      a: 0,
      e: 'Proportional representation is an electoral system where seats are allocated based on percentage of votes received.',
      full: 'An electoral system determines how votes translate into seats or positions. There are different types.\n\nUnder first-past-the-post (FPTP), used in Nigeria for most elections, the candidate with the most votes wins — even if they do not have a majority. Votes for losing candidates count for nothing.\n\nUnder proportional representation (PR), seats are allocated roughly in proportion to the percentage of votes each party receives. If a party gets 30% of votes, it gets approximately 30% of the seats. This system is considered fairer in representing minority views but can lead to many small parties and coalition governments.\n\nPR is used in South Africa, Germany, and many other democracies.',
      h: 'How seats are allocated based on votes = type of what?',
    },
    {
      yr: 2023,
      q: 'The OAU was replaced by',
      o: ['ECOWAS', 'African Union', 'United Nations', 'NEPAD'],
      a: 1,
      e: 'The Organisation of African Unity (OAU) was replaced by the African Union (AU) in 2002.',
      full: "The Organisation of African Unity (OAU) was founded in 1963 in Addis Ababa by 32 independent African states. Its primary goals were to end colonialism in Africa and oppose apartheid. It was a significant symbol of Pan-African unity.\n\nHowever, the OAU was widely criticised for its principle of non-interference in member states' internal affairs, which prevented it from responding to human rights abuses and internal conflicts.\n\nIn 2002, the OAU was replaced by the African Union (AU), modelled partly on the European Union. The AU has a more interventionist mandate, can impose sanctions on members, and addresses governance, democracy, and human rights in addition to the original Pan-African goals. Its headquarters remains in Addis Ababa, Ethiopia.",
      h: 'Which pan-African body replaced the OAU?',
    },
    {
      yr: 2022,
      q: 'Parliamentary government originated in',
      o: ['France', 'USA', 'UK', 'Germany'],
      a: 2,
      e: 'Parliamentary government originated in the United Kingdom.',
      full: "The parliamentary system of government evolved gradually in Britain over centuries — it was not designed all at once but developed through historical struggles between monarchs and nobles.\n\nThe Magna Carta (1215) was an early step, limiting royal power. The development of Parliament as a representative body, the English Civil War (1640s), the Glorious Revolution (1688), and the Bill of Rights (1689) progressively established parliamentary sovereignty and cabinet government.\n\nBy the 18th and 19th centuries, Britain's Westminster model — with a Prime Minister accountable to Parliament, a constitutional monarchy, and an independent judiciary — was well established and exported to former British colonies including Nigeria, India, Canada, and Australia.",
      h: 'Where did Westminster-style parliament originate?',
    },
    {
      yr: 2024,
      q: 'Delegated legislation refers to',
      o: [
        'Laws made by the president alone',
        'Laws made by subordinate bodies under authority',
        'Laws made by courts',
        'International laws',
      ],
      a: 1,
      e: 'Delegated legislation is law made by subordinate bodies under authority granted by parliament.',
      full: 'Parliament is the primary law-making body but it cannot practically legislate on every technical detail of every policy area. Instead, Parliament passes an Enabling Act (or parent Act) that grants specific powers to the Executive or other bodies to make detailed rules and regulations.\n\nThese rules and regulations made under that delegated authority are called delegated legislation (or secondary legislation). Examples include ministerial orders, local council bylaws, and rules made by regulatory agencies.\n\nDelegated legislation must stay within the limits set by the enabling act — if it exceeds those limits, courts can strike it down as ultra vires (beyond the power granted).',
      h: 'Who makes delegated legislation?',
    },
    {
      yr: 2023,
      q: 'The concept of sovereignty means',
      o: [
        'A country has an army',
        'Supreme power to make and enforce laws',
        'Having a constitution',
        'Being a member of the UN',
      ],
      a: 1,
      e: 'Sovereignty is the supreme, absolute power of a state to make and enforce laws within its territory.',
      full: "Sovereignty is the concept that within a defined territory, a state has the final, supreme, and absolute authority — no higher power exists that can override it within that territory. A sovereign state can make any laws it chooses and enforce them without external interference.\n\nThere are two dimensions: internal sovereignty (supremacy over everyone within the territory — no group can override the state's authority) and external sovereignty (independence from foreign control — no other state can legally tell this state what to do).\n\nSovereignty is challenged in practice by international obligations, treaties, and organisations like the UN — but in theory, each state retains the right to withdraw and act independently.",
      h: 'Supreme, ultimate power of a state.',
    },
    {
      yr: 2022,
      q: 'Secularism in government means',
      o: [
        'Government promotes religion',
        'Government is separate from religion',
        'Only Christians can govern',
        'Only Muslims can govern',
      ],
      a: 1,
      e: 'A secular government maintains separation between state authority and religious institutions.',
      full: "Secularism in government means that the state operates independently of religious institutions. Government policy, legislation, and public institutions are based on civic principles rather than religious doctrine. No single religion is given official state status or used as the basis of law.\n\nSecular states protect religious freedom — citizens may practice any religion or none. But the state itself remains neutral on religious questions.\n\nNigeria's constitution declares it a secular state, though this is sometimes debated given the prevalence of religion in public life. The separation prevents theocracy (government by religious authorities) and ensures that laws apply equally to people of all faiths and none.",
      h: 'Secular = separated from which institution?',
    },
    {
      yr: 2024,
      q: 'The main function of the executive arm is to',
      o: [
        'Make laws',
        'Implement laws',
        'Interpret laws',
        'Amend the constitution',
      ],
      a: 1,
      e: 'The executive implements and enforces the laws made by the legislature.',
      full: 'The three arms of government have distinct functions that must not be confused.\n\nThe Legislature (National Assembly) makes laws. The Judiciary (courts) interprets those laws and resolves disputes. The Executive — headed by the President and including all government ministries, agencies, and security forces — carries out and enforces the laws.\n\nThis is why ministers, the police, EFCC, NAFDAC, and other government bodies are part of the executive arm — they implement specific policies and enforce specific laws. The President also appoints key officials, manages foreign policy, and leads the armed forces. All of these are implementation roles.',
      h: 'Execute = carry out. What does the executive carry out?',
    },
    {
      yr: 2023,
      q: 'Coalition government is formed when',
      o: [
        'One party wins majority',
        'Multiple parties combine to form government',
        'Military takes over',
        'President appoints cabinet alone',
      ],
      a: 1,
      e: 'A coalition government is formed when no single party wins an outright majority and parties combine.',
      full: "In many democratic elections, no single party wins enough seats to form a majority government. When this happens, parties must negotiate and combine forces to achieve a working majority — this is called a coalition government.\n\nCoalitions are especially common in countries with proportional representation, where seats are spread more evenly among multiple parties. The coalition partners must agree on a shared programme of government and divide ministerial positions between them.\n\nCoalitions can be unstable — if the parties disagree significantly, the government can collapse. Germany, Israel, and Italy have historically relied heavily on coalition governments. Nigeria's presidential system and first-past-the-post elections make coalition governments less common but not impossible.",
      h: 'When no single party has majority, what do they form?',
    },
    {
      yr: 2022,
      q: 'Censure motion in parliament is used to',
      o: [
        'Pass a bill',
        'Express disapproval of the executive',
        'Amend the constitution',
        'Elect the president',
      ],
      a: 1,
      e: "A censure or vote of no confidence expresses parliament's disapproval of the executive.",
      full: "One of the key tools of legislative oversight is the ability to formally express disapproval of the executive or specific ministers. A censure motion or vote of no confidence is exactly this — a formal parliamentary vote saying the executive (or a minister) no longer has the confidence of parliament.\n\nIn a parliamentary system, losing a vote of no confidence typically forces the Prime Minister to resign or call a new election. In Nigeria's presidential system, the National Assembly can pass a vote of no confidence in the Vice President or ministers, signalling political disapproval, though the consequences differ from a parliamentary system.\n\nCensure is a powerful political tool — it signals that parliament believes the executive is performing poorly or acting improperly.",
      h: "Parliament's way of showing disapproval of government.",
    },
    {
      yr: 2024,
      q: 'The Electoral Commission in Nigeria is called',
      o: ['EFCC', 'INEC', 'NBS', 'NHRC'],
      a: 1,
      e: 'INEC (Independent National Electoral Commission) conducts elections in Nigeria.',
      full: "The Independent National Electoral Commission (INEC) is Nigeria's electoral management body, established by Section 153 of the 1999 Constitution. INEC is responsible for organising, undertaking, and supervising all elections to the offices of the President, Vice President, Governor, Deputy Governor, and members of the National and State Assemblies.\n\nINEC also registers political parties, registers voters, maintains the voters' register, and monitors campaigns. Its independence is crucial — it must be free from political interference to conduct credible elections.\n\nThe EFCC (Economic and Financial Crimes Commission) fights financial crimes. The NBS (National Bureau of Statistics) collects data. The NHRC (National Human Rights Commission) protects human rights. Only INEC conducts elections.",
      h: 'Which commission organises Nigerian elections?',
    },
  ],
  literature: [
    {
      yr: 2024,
      q: "'All the world's a stage' is from",
      o: [
        'Charles Dickens',
        'William Shakespeare',
        'John Keats',
        'John Milton',
      ],
      a: 1,
      e: 'This line is from As You Like It by William Shakespeare.',
      full: "All the world's a stage, and all the men and women merely players — this is one of the most famous speeches in all of English literature. It comes from Act 2, Scene 7 of As You Like It by William Shakespeare, spoken by the melancholy character Jaques.\n\nIn the speech, Jaques compares the entire world to a theatrical stage and all human beings to actors, then divides human life into seven ages from infancy to old age. It is a beautiful and profound metaphor on the nature of life.\n\nCharles Dickens was a Victorian novelist. John Keats and John Milton were poets. Shakespeare was the playwright whose work is central to English Literature in JAMB.",
      h: 'Which playwright compared the world to a stage?',
    },
    {
      yr: 2024,
      q: 'First person narration uses pronoun',
      o: ['He/She', 'They', 'I/We', 'You'],
      a: 2,
      e: 'First person uses I (singular) or We (plural).',
      full: 'In literature, the narrative perspective tells us who is telling the story and what point of view the story is told from.\n\nFirst person narration uses "I" (when one narrator tells their own story) or "we" (when multiple narrators share the telling). The narrator is a character within the story with direct access to their own thoughts but limited knowledge of others\' inner thoughts.\n\nSecond person uses "you" — rare in fiction, common in instruction manuals and some experimental writing. Third person uses "he," "she," "they" — the narrator stands outside the story, either with limited perspective (third person limited) or all-knowing (third person omniscient).',
      h: 'First person = the narrator speaks as themselves.',
    },
    {
      yr: 2023,
      q: 'An epic is a',
      o: [
        'Short lyric poem',
        'Long narrative poem about heroic deeds',
        'Comedy play',
        'Short story',
      ],
      a: 1,
      e: 'An epic is a long narrative poem celebrating heroic deeds.',
      full: 'The epic is one of the oldest and grandest literary forms. Epic poems tell the story of a hero — often of national or cosmic importance — who undergoes extraordinary adventures and battles. They are long, formal, and elevated in style.\n\nThe classic epics include Homer\'s Iliad and Odyssey (ancient Greece), Virgil\'s Aeneid (Rome), and Beowulf (Old English). African epics include the Sundiata epic of West Africa.\n\nA lyric poem is short and expressive of personal emotion (like a song). A comedy is a type of drama, not a narrative poem. A short story is prose, not poetry. Only "long narrative poem about heroic deeds" correctly defines the epic form.',
      h: 'Think Iliad and Odyssey. Long, heroic, narrative.',
    },
    {
      yr: 2024,
      q: 'The climax of a story is',
      o: [
        'The beginning',
        'The point of highest tension',
        'The end',
        'The resolution',
      ],
      a: 1,
      e: 'The climax is the most intense turning point in a narrative.',
      full: 'Every story follows a plot structure. It begins with exposition (introduction of characters and setting), then rises through complications and conflict (rising action), reaches the moment of greatest tension and decision (climax), then begins to resolve (falling action), and finally ends (resolution or denouement).\n\nThe climax is the peak of the story — the moment when the central conflict comes to a head. In Hamlet, the climax is the duel and multiple deaths in Act 5. In a thriller, it might be the confrontation between hero and villain.\n\nThe beginning is the exposition. The end is the resolution. The climax is specifically the turning point of highest tension — not the ending itself.',
      h: 'Highest point of tension in the plot.',
    },
    {
      yr: 2023,
      q: 'A soliloquy is when a character',
      o: [
        'Speaks to another',
        'Speaks alone to express inner thoughts',
        'Sings on stage',
        'Writes a letter',
      ],
      a: 1,
      e: 'A soliloquy is a character speaking thoughts aloud when alone.',
      full: 'The soliloquy is a theatrical device in which a character is alone on stage (or believes themselves to be alone) and speaks their inner thoughts aloud for the audience to hear. The audience gains privileged insight into the character\'s true feelings, plans, and conflicts — information that other characters in the play do not have.\n\nShakespeare used soliloquies extensively. Hamlet\'s "To be or not to be" is the most famous soliloquy in English literature — Hamlet alone, contemplating suicide and the meaning of existence.\n\nA dialogue is a conversation between two or more people. An aside is a brief private comment to the audience, not a full speech. A soliloquy is always solo and always expressive of inner thoughts.',
      h: 'Solo = alone. A character speaks their mind to no one.',
    },
    {
      yr: 2022,
      q: 'Dramatic irony occurs when',
      o: [
        'Characters are dramatic',
        'Audience knows more than characters',
        'Plot is surprising',
        'Ending is unexpected',
      ],
      a: 1,
      e: 'Dramatic irony is when the audience has knowledge that characters do not.',
      full: 'Irony is the gap between what is expected or understood and what is actually happening. Dramatic irony is specifically when the AUDIENCE knows something important that the characters on stage do not know.\n\nThis creates tension because the audience watches characters make decisions, say things, or walk into danger — unaware of what the audience already knows. In Romeo and Juliet, the audience knows Juliet is not actually dead when Romeo finds her in the tomb. Romeo does not know. The tragedy that follows is powered entirely by dramatic irony.\n\nSituational irony is when events turn out opposite to expectations. Verbal irony is when someone says the opposite of what they mean. Dramatic irony is the audience-versus-character knowledge gap.',
      h: "The audience knows something the characters don't.",
    },
    {
      yr: 2024,
      q: 'A protagonist is',
      o: [
        'The villain',
        'The main character',
        'A minor character',
        'The narrator',
      ],
      a: 1,
      e: 'The protagonist is the central character around whom the story revolves.',
      full: 'In any narrative — novel, film, play, or short story — the protagonist is the main character whose journey, conflict, and development drives the story forward. The entire plot is structured around what happens to the protagonist and what choices they make.\n\nThe word comes from the Greek protos (first) and agonist (actor or contestant). Protagonists need not be morally good — they just need to be the central figure. Macbeth is the protagonist of his play despite being the villain.\n\nThe antagonist opposes the protagonist. A minor character has a small role. The narrator tells the story but may or may not be the main character.',
      h: 'Proto = first/main. Who is the story mainly about?',
    },
    {
      yr: 2023,
      q: "Direct comparison without 'like' or 'as'",
      o: ['Simile', 'Metaphor', 'Hyperbole', 'Alliteration'],
      a: 1,
      e: 'A metaphor makes a direct comparison without the words like or as.',
      full: 'Both similes and metaphors make comparisons, but they do it differently.\n\nA simile uses the words "like" or "as" to signal the comparison: "He is like a lion." "She ran as fast as the wind." The comparison is explicit.\n\nA metaphor states the comparison directly, without any signal words: "He is a lion." "She was the wind." The thing being described IS something else — not merely similar to it.\n\nHyperbole is exaggeration for effect: "I\'ve told you a million times." Alliteration is the repetition of initial consonant sounds: "Peter Piper Picked..."',
      h: 'Direct = metaphor. Using like/as = simile.',
    },
    {
      yr: 2022,
      q: "'The pen is mightier than the sword' is",
      o: ['Alliteration', 'Hyperbole', 'Metaphor', 'Simile'],
      a: 2,
      e: 'This is a metaphor — direct comparison, no like or as.',
      full: 'The pen is mightier than the sword is a metaphor attributed to the English novelist Edward Bulwer-Lytton (1839). The pen stands for the power of writing, communication, and ideas. The sword stands for military force and physical violence.\n\nThe statement says that writing and ideas (the pen) have greater power to change the world than physical force (the sword). It is a direct comparison — the pen IS mightier. There is no "like" or "as" making it a simile. It is not an exaggeration (hyperbole). There is no sound repetition (alliteration). The figure of speech is metaphor.',
      h: 'No like or as. Direct comparison = which device?',
    },
    {
      yr: 2024,
      q: 'A flashback in literature refers to',
      o: [
        'A bright light effect',
        'A scene set in the past',
        'A dream sequence',
        'A fight scene',
      ],
      a: 1,
      e: 'A flashback interrupts the current story to depict past events.',
      full: "Narrative structure does not always follow chronological order. A flashback is a technique where the narrative is temporarily interrupted to present a scene from an earlier time — before the current story timeline.\n\nFlashbacks are used to reveal backstory, explain a character's motivations, or provide context for current events. In a film, a character might suddenly remember their childhood as the camera cuts to that memory. In a novel, a chapter might open in the present then drift back years.\n\nThe opposite is a flash-forward (or prolepsis) — jumping ahead to future events. A dream sequence is imagined, not remembered. A fight scene is action, not a time-shift technique.",
      h: 'Flash = sudden. Back = into the past.',
    },
    {
      yr: 2023,
      q: 'An antagonist is',
      o: [
        'The hero',
        'The main character',
        'The character who opposes the protagonist',
        'The narrator',
      ],
      a: 2,
      e: 'The antagonist is the character who opposes or creates conflict for the protagonist.',
      full: "Every compelling story needs conflict. The antagonist is the character (or force) that opposes the protagonist, creating the central conflict that drives the plot.\n\nThe antagonist need not be a villain in the traditional sense. It can be any character whose goals or actions conflict with the protagonist's goals. In some stories, society, nature, or even the protagonist's own inner demons serve as the antagonist.\n\nIn Chinua Achebe's Things Fall Apart, the colonial forces and changing society serve as antagonists to Okonkwo. In Macbeth, Macduff is an antagonist to the protagonist Macbeth (who is himself a villain but the protagonist because the story follows him).",
      h: 'Opposite of protagonist. Who opposes the hero?',
    },
    {
      yr: 2022,
      q: 'Alliteration is the repetition of',
      o: [
        'End sounds',
        'Vowel sounds',
        'Initial consonant sounds',
        'Middle sounds',
      ],
      a: 2,
      e: 'Alliteration is the repetition of the same consonant sound at the beginning of nearby words.',
      full: 'Alliteration is a sound device in poetry and prose. It occurs when two or more words in close succession begin with the same consonant sound. The effect is musical, memorable, and often creates emphasis.\n\nExamples: "Peter Piper Picked a Peck of Pickled Peppers" — the P sound. "She sells sea shells by the sea shore" — the S and SH sounds. "Fearful, frantic, and furious" — the F sound.\n\nAlliteration is about initial sounds, not letters. "Kneel" and "Night" alliterate on the N sound even though both begin with K. It is specifically the CONSONANT sound at the beginning that must repeat — not end sounds (rhyme) or vowel sounds (assonance).',
      h: 'Peter Piper Picked — which sound repeats?',
    },
    {
      yr: 2024,
      q: 'A tragedy typically ends with',
      o: [
        'A wedding',
        "The hero's triumph",
        "The hero's downfall or death",
        'Comic resolution',
      ],
      a: 2,
      e: "Tragedy ends with the protagonist's downfall, suffering, or death.",
      full: "Tragedy is one of the oldest dramatic forms, originating in ancient Greece. The tragic form follows a protagonist of high status or noble character who, through a combination of fate, circumstances, and usually a fatal flaw (hamartia), is brought to ruin.\n\nAristotle defined tragedy as the imitation of a serious action that produces catharsis — the emotional purging of pity and fear in the audience. The audience feels pity for the suffering protagonist and fear because they recognise the possibility of such a fate in themselves.\n\nShakespeare's great tragedies — Hamlet, Macbeth, Othello, King Lear — all end with the death or destruction of the central figure. A comedy, by contrast, typically ends with harmony, reconciliation, and often a wedding.",
      h: "Think Shakespeare's tragedies — Hamlet, Macbeth. How do they end?",
    },
    {
      yr: 2023,
      q: 'Wole Soyinka won the Nobel Prize for Literature in',
      o: ['1976', '1986', '1996', '2006'],
      a: 1,
      e: 'Wole Soyinka became the first African to win the Nobel Prize in Literature in 1986.',
      full: "Wole Soyinka is Nigeria's most celebrated writer and one of Africa's greatest literary figures. He is a playwright, novelist, poet, and political activist. His major works include the plays Death and the King's Horseman, A Dance of the Forests, and The Lion and the Jewel, as well as the memoir Ake: The Years of Childhood.\n\nIn 1986, he was awarded the Nobel Prize in Literature, becoming the first African to receive this honour. The Nobel Committee recognised his wide cultural perspective and poetic overtones in crafting the drama of existence.\n\nSoyinka was also a vocal critic of military dictatorship in Nigeria and was imprisoned and exiled for his political activism.",
      h: 'First African Nobel laureate for Literature. Decade of the 1980s.',
    },
    {
      yr: 2022,
      q: 'A sonnet has how many lines?',
      o: ['10', '12', '14', '16'],
      a: 2,
      e: 'A sonnet is a 14-line poem, traditionally written in iambic pentameter.',
      full: 'The sonnet is one of the most enduring and disciplined forms in English poetry. It has exactly 14 lines and is traditionally written in iambic pentameter — a rhythm pattern of five unstressed-stressed syllable pairs per line (da-DUM da-DUM da-DUM da-DUM da-DUM), giving each line 10 syllables.\n\nThere are two main sonnet types: the Petrarchan (Italian) sonnet, with an 8-line octave followed by a 6-line sestet, and the Shakespearean (English) sonnet, with three 4-line quatrains followed by a 2-line couplet. Shakespeare wrote 154 sonnets.\n\nKnow the number 14 — it appears in many JAMB questions about the sonnet form.',
      h: "Shakespeare's sonnets have exactly how many lines?",
    },
    {
      yr: 2024,
      q: 'Onomatopoeia is when a word',
      o: [
        'Means its opposite',
        'Sounds like what it describes',
        'Is an exaggeration',
        'Gives human traits to objects',
      ],
      a: 1,
      e: 'Onomatopoeia uses words that phonetically imitate the sound they describe (buzz, crash, hiss).',
      full: 'Onomatopoeia is a fascinating figure of speech — words that actually sound like what they mean. The word itself comes from Greek: onoma (name) + poiein (to make). Onomatopoeic words imitate the natural sounds they describe.\n\nExamples: buzz (sounds like a bee), crash, bang, hiss, sizzle, drip, murmur, crackle, gurgle, thud. In poetry, onomatopoeia creates vivid sensory effects — the sound of the words reinforces the meaning.\n\nThe defining test: does the word sound like what it means? If yes, it is onomatopoeia. This is different from a simile (uses like/as), a metaphor (direct comparison), or personification (human qualities to non-human things).',
      h: 'Buzz, crash, hiss — these words sound like what?',
    },
    {
      yr: 2023,
      q: 'The setting of a story refers to',
      o: [
        'The main character',
        'The plot twist',
        'The time and place of the action',
        'The theme',
      ],
      a: 2,
      e: 'Setting refers to the time, place, and social environment in which the story takes place.',
      full: "Setting is more than just the physical location of a story. It encompasses three dimensions: place (where the story happens — a village, a city, a jungle, a classroom), time (when it happens — historical period, season, time of day), and social environment (the cultural, political, and social conditions that shape characters' lives).\n\nSetting is crucial to understanding literature because it shapes character behaviour, creates atmosphere, provides context for conflicts, and can itself become symbolic. In Things Fall Apart, the Igbo village setting in pre-colonial Nigeria is inseparable from the themes of cultural identity and colonial disruption.\n\nA plot twist is something that happens, not where or when. The main character is the protagonist. The theme is the central message.",
      h: 'Where and when does the story happen?',
    },
    {
      yr: 2022,
      q: 'A biography is a written account of',
      o: [
        'Fictional events',
        "A real person's life written by another",
        'An imaginary character',
        'A historical event',
      ],
      a: 1,
      e: "A biography is a detailed written account of a real person's life, written by someone else.",
      full: "The word biography comes from Greek: bios (life) + graphia (writing). A biography is a detailed account of a real person's life, researched and written by another author.\n\nAn autobiography is similar but written by the person themselves about their own life (auto = self). A memoir is a type of autobiography focused on a specific period or aspect of the writer's life. A novel is fictional. A historical account describes events rather than a single person's life.\n\nFamous biographies include Walter Isaacson's Steve Jobs and Robert Caro's series on Lyndon B. Johnson. The key elements: real person, real events, written by someone other than the subject.",
      h: 'Bio = life. Graphy = writing. Written by whom?',
    },
    {
      yr: 2024,
      q: 'Which of these is a device used to create humour?',
      o: ['Elegy', 'Satire', 'Dirge', 'Epitaph'],
      a: 1,
      e: 'Satire uses humour, irony, and exaggeration to criticise or mock people or society.',
      full: "Satire is a literary and dramatic genre that uses wit, irony, exaggeration, and ridicule to expose and criticise human folly, vice, corruption, and absurdity — particularly in politics and society. The goal is not just to entertain but to provoke thought and encourage reform.\n\nFamous satirical works include Jonathan Swift's Gulliver's Travels (mocking 18th-century politics), Wole Soyinka's plays (criticising post-colonial Nigerian society), and the TV series Yes Minister (satirising British bureaucracy).\n\nAn elegy mourns the dead. A dirge is a song of mourning. An epitaph is words inscribed on a gravestone. Only satire uses humour and mockery for social criticism.",
      h: 'Which literary form uses mockery and wit?',
    },
    {
      yr: 2023,
      q: 'Blank verse is poetry written',
      o: [
        'Without any structure',
        'In rhyming couplets',
        'In iambic pentameter without rhyme',
        'In free verse',
      ],
      a: 2,
      e: 'Blank verse is unrhymed iambic pentameter — structured rhythm but no end rhyme.',
      full: "Blank verse is a specific poetic form that has a regular rhythmic structure (iambic pentameter — five unstressed-stressed beats per line, 10 syllables) but does NOT rhyme at the line endings. It sounds natural and speech-like while maintaining poetic structure.\n\nShakespeare wrote most of his dramatic dialogue in blank verse. Milton's Paradise Lost is written in blank verse. The lack of rhyme allows for natural-sounding speech while the iambic rhythm provides a musical, elevated quality.\n\nFree verse has no fixed rhythm AND no rhyme. A rhyming couplet has rhyme but may or may not have fixed metre. Blank verse is the specific combination of iambic pentameter WITHOUT end rhyme.",
      h: 'Iambic pentameter + no rhyme = which poetic form?',
    },
    {
      yr: 2022,
      q: 'A dirge is a song or poem of',
      o: ['Celebration', 'Mourning', 'Love', 'War'],
      a: 1,
      e: 'A dirge is a mournful song or poem written to lament the dead.',
      full: 'A dirge is a slow, solemn song or poem of mourning, traditionally sung or read at funerals or in memory of the dead. It is an expression of grief, loss, and sadness.\n\nThe word comes from the Latin dirige (direct), the first word of a traditional antiphon sung at Catholic funeral services. In literature, dirges appear in plays and poems as expressions of grief.\n\nAn elegy is a reflective poem mourning a specific dead person. A dirge is more specifically a song or short poem with a mournful, musical quality sung at or about death. Both belong to the literature of grief, but the dirge emphasises the song-like, musical quality of lamentation.',
      h: 'Funerals use dirges. What emotion do they express?',
    },
    {
      yr: 2024,
      q: "Chinua Achebe's Things Fall Apart is set among the",
      o: ['Yoruba', 'Hausa', 'Igbo', 'Efik'],
      a: 2,
      e: 'Things Fall Apart is set among the Igbo people of Nigeria, centred on the character Okonkwo.',
      full: 'Things Fall Apart (1958) by Chinua Achebe is one of the most important novels ever written about Africa. It tells the story of Okonkwo, a proud, strong, and successful warrior in the Igbo village of Umuofia in southeastern Nigeria, in the late 19th century.\n\nThe novel depicts the rich, complex Igbo culture and community — its religion, politics, family structure, and values — before and during the arrival of Christian missionaries and British colonial administration. The title comes from W.B. Yeats\'s poem "The Second Coming" — suggesting the disintegration of a world and identity.\n\nThe Igbo ethnic group is the third largest in Nigeria. Okonkwo is not Yoruba, Hausa, or Efik.',
      h: 'Which ethnic group is Okonkwo from in Things Fall Apart?',
    },
    {
      yr: 2023,
      q: 'A couplet consists of',
      o: [
        'One line',
        'Two consecutive rhyming lines',
        'Three lines',
        'Four lines',
      ],
      a: 1,
      e: 'A couplet is a pair of successive lines of verse that rhyme.',
      full: 'A couplet is the simplest unit of rhyme in poetry — two consecutive lines that end with rhyming words. Couplets create a satisfying sense of completion and balance.\n\nShakespeare frequently ended his sonnets with a rhyming couplet that summarises or twists the meaning of the preceding lines — called the final couplet or closing couplet.\n\nA heroic couplet is a couplet written in iambic pentameter, commonly used by poets like Alexander Pope. An open couplet does not end with a full stop and runs on to the next lines. But the defining feature is always two lines — couple = two — ending with rhyming words.',
      h: 'Couple = two. Rhyming pair of lines.',
    },
    {
      yr: 2022,
      q: 'The theme of a literary work is',
      o: [
        "The author's name",
        'The central idea or message',
        'The setting',
        'The plot summary',
      ],
      a: 1,
      e: 'The theme is the central, underlying idea or message that the author communicates through the work.',
      full: 'The theme of a literary work is its central insight about human nature, society, or the human condition — the deeper meaning beneath the surface of the plot and characters. A story about war might have themes of bravery and futility. A love story might explore jealousy and sacrifice.\n\nTheme is different from plot (what happens), setting (where and when), or character (who). The theme is WHY it matters — what the author wants the reader to think about or understand after experiencing the work.\n\nThings Fall Apart has themes of colonialism and cultural loss, masculinity and tragic pride, tradition versus change. These are universal human concerns explored through specific Igbo characters and events.',
      h: 'What message is the whole story trying to convey?',
    },
    {
      yr: 2024,
      q: 'An elegy is a poem written to',
      o: [
        'Celebrate a birthday',
        'Mourn someone who has died',
        'Praise a king',
        'Mock an enemy',
      ],
      a: 1,
      e: 'An elegy is a serious reflective poem mourning the death of a particular person.',
      full: "The elegy is a poem that mourns the death of a specific person and reflects on loss, grief, and often the broader meaning of death and mortality. Unlike a dirge (which is song-like and performed), an elegy is a more private, meditative poetic form.\n\nFamous elegies include Milton's Lycidas (mourning a drowned friend), Tennyson's In Memoriam (mourning his friend Arthur Hallam), and Wole Soyinka's Abiku (reflecting on child mortality in Yoruba belief).\n\nAn elegy for a birthday would be an oxymoron — birthdays celebrate life. Praising a king is a panegyric. Mocking an enemy is invective or satire. An elegy is specifically a lament for someone who has died.",
      h: 'Elegies are written in memory of the dead.',
    },
    {
      yr: 2023,
      q: 'A metaphor directly compares two things',
      o: [
        'Using like or as',
        'Without using like or as',
        'Using rhyme',
        'Using repetition',
      ],
      a: 1,
      e: 'A metaphor makes a direct comparison without the words like or as.',
      h: 'Direct comparison, no like or as.',
    },
    {
      yr: 2022,
      q: 'Deus ex machina means',
      o: [
        'God is everywhere',
        'An unlikely solution introduced to resolve a plot',
        'A type of rhyme',
        'A dramatic monologue',
      ],
      a: 1,
      e: 'Deus ex machina is an unlikely or improbable device introduced to solve a difficult plot situation.',
      full: "Deus ex machina is Latin for 'god from the machine.' It refers to a plot device in which an apparently unsolvable problem is suddenly resolved by a convenient, unexpected, or improbable occurrence — often criticised as poor or lazy storytelling.\n\nThe term originates from ancient Greek theatre, where a machine (mechane) would literally lower an actor playing a god onto the stage to resolve the plot. The audience saw it as an artificial, unsatisfying solution.\n\nModern examples: a character in mortal danger who is inexplicably rescued by someone who arrives at exactly the right moment with no prior setup in the story. Good storytelling avoids deus ex machina by preparing solutions organically within the narrative.",
      h: 'Latin for a sudden, convenient resolution to an impossible problem.',
    },
    {
      yr: 2024,
      q: 'Which narrative perspective uses he/she/they?',
      o: ['First person', 'Second person', 'Third person', 'Omniscient'],
      a: 2,
      e: 'Third person narration uses he, she, or they and views the story from outside the characters.',
      full: "Narrative perspective determines who tells the story and what information the reader has access to.\n\nIn third person narration, the story is told from outside the characters using pronouns he, she, they, or character names. The narrator is not a character in the story.\n\nThird person limited: the narrator sees into the mind of ONE character only — we know that character's thoughts but not others'.\nThird person omniscient: the narrator sees into ALL characters' minds and knows everything happening everywhere simultaneously.\n\nFirst person uses I. Second person uses you (rare in fiction). Third person uses he/she/they — and is the most common narrative perspective in literary fiction.",
      h: 'He said, she went, they arrived — which person?',
    },
    {
      yr: 2023,
      q: 'A foil character is one who',
      o: [
        'Is the main villain',
        'Helps the hero physically',
        'Contrasts with the protagonist to highlight their traits',
        'Narrates the story',
      ],
      a: 2,
      e: 'A foil is a character whose contrasting traits highlight the qualities of another character.',
      full: "A foil is a character who, by contrast, makes the main character's traits more visible and distinct. The word comes from the metalworking term for a thin sheet of metal placed behind a gemstone to make it shine more brightly.\n\nIn Hamlet, Laertes is a foil to Hamlet. Both lose their fathers and seek revenge, but Laertes acts immediately and decisively while Hamlet agonises and delays. The contrast throws Hamlet's indecisiveness into sharp relief.\n\nIn Pride and Prejudice, Jane's unguarded optimism serves as a foil to Elizabeth's sharp, sometimes cynical wit. The foil need not be the villain — any character whose differences highlight the protagonist's characteristics can serve this function.",
      h: "A foil creates contrast to highlight another character's traits.",
    },
    {
      yr: 2022,
      q: 'The falling action in a plot comes after',
      o: [
        'The exposition',
        'The rising action',
        'The climax',
        'The resolution',
      ],
      a: 2,
      e: 'Falling action follows the climax — the tension begins to decrease as the story moves toward resolution.',
      full: "The plot of a story typically follows a five-part structure often called Freytag's Pyramid: Exposition (introduction) → Rising Action (building conflict and tension) → Climax (peak of tension, turning point) → Falling Action (tension decreasing, consequences unfolding) → Resolution/Denouement (final outcome, loose ends tied).\n\nFalling action occurs after the climax — the main conflict has been decided, and the story is winding toward its conclusion. Events in the falling action typically show the consequences of the climactic decision or event.\n\nIn Romeo and Juliet, the falling action begins after the deaths of Romeo and Juliet, as the Prince, Montagues, and Capulets process what has happened and reconcile.",
      h: 'Climax is the peak. What comes after the peak?',
    },
  ],
  novel: [
    {
      yr: 2025,
      q: 'Who is the protagonist of The Lekki Headmaster?',
      o: ['Banky', 'Bepo', 'Mrs. Ibidun Gloss', 'Mr. Ogunwale'],
      a: 1,
      e: 'The protagonist is Bepo — the dedicated principal of Stardom Schools in Lekki.',
      full: 'The Lekki Headmaster centres on Mr. Adewale Adebepo, known to everyone as Bepo. He is the principal of Stardom Schools, a private school in the affluent Lekki suburb of Lagos. The entire story follows his personal and professional struggles — his love for teaching, his students, and Nigerian culture set against the mounting pressure to relocate to the UK to join his wife and daughters.\n\nBepo is not just the main character — he is the moral compass of the novel. Every key theme in the book (education, migration, patriotism, leadership) is explored through his experiences and decisions.\n\nBanky is a student. Mrs. Ibidun Gloss is a respected teacher. Mr. Ogunwale is a staff member. None of them are the protagonist.',
      h: "The novel's title refers to this character's nickname at his school.",
    },
    {
      yr: 2025,
      q: 'What is the full name of the character known as Bepo?',
      o: [
        'Bepo Adebowale',
        'Adewale Adebepo',
        'Adebayo Bepolade',
        'Adekunle Bepo',
      ],
      a: 1,
      e: 'His full name is Adewale Adebepo — Bepo is the short form his colleagues and students use.',
      full: 'Throughout the novel, the principal is affectionately referred to as Bepo — a nickname derived from his surname Adebepo. His full name, Adewale Adebepo, is only used in formal contexts such as official documents and during administrative proceedings.\n\nThe nickname Bepo reflects the warm, informal relationship he has built with both staff and students at Stardom Schools. It signals that despite being the principal, he is approachable and genuinely beloved — not feared.\n\nThis detail appears early in the novel and is often tested in JAMB because it establishes character identity. The other options rearrange or alter his name incorrectly.',
      h: 'His surname is Adebepo — the nickname comes from the second part.',
    },

    {
      yr: 2025,
      q: 'Which teacher in The Lekki Headmaster was known for her witty remarks?',
      o: ['Mrs. Ibidun Gloss', 'Mrs. Apeh', 'Mr. Audu', 'Mr. Amos'],
      a: 0,
      e: 'Mrs. Ibidun Gloss was known for her sharp wit and memorable remarks throughout the novel.',
      full: "Mrs. Ibidun Gloss is one of the most memorable supporting characters in The Lekki Headmaster. She is a teacher at Stardom Schools known for her intelligence, witty observations, and sharp tongue. Her remarks are often humorous but carry deeper truths about the situations unfolding around Bepo.\n\nHer relationship with Bepo is one of deep mutual respect. She appreciates his leadership and dedication, and her wit often provides comic relief in otherwise tense moments. One of her famous lines — 'If you want a debtor to lead, ask a tenant to lead the landlord' — reflects both her sharpness and the social commentary running through the novel.\n\nMrs. Apeh, Mr. Audu, and Mr. Amos are also staff members but are not specifically associated with wit or memorable remarks in the text.",
      h: "This female teacher delivers some of the novel's most memorable lines.",
    },

    {
      yr: 2025,
      q: 'The two students involved in a rivalry dating back to JSS 3 were',
      o: ['Banky and Tosh', 'Jide and Kemi', 'Seri and Tai', 'Ogba and Tosh'],
      a: 0,
      e: 'Banky and Tosh had a long-running rivalry stretching back to their JSS 3 days.',
      full: "One of the subplot tensions in The Lekki Headmaster involves two students — Banky and Tosh — whose competitive rivalry has existed since JSS 3. Their relationship comes to a head during the prefect election campaign when Banky makes a remark that insults Tosh's father, turning an academic rivalry into a personal conflict.\n\nThis rivalry serves a thematic purpose: it mirrors the broader social and political conflicts in Nigerian society, including how personal ambition and family background intersect. Bepo has to navigate and mediate this tension, which showcases his conflict-resolution skills and his role as more than just an academic administrator.\n\nThe conflict between Banky and Tosh reflects the themes of democracy, fairness, and the challenges of leadership — all central concerns of the novel.",
      h: 'Their rivalry erupted publicly during the prefect election campaign.',
    },

    {
      yr: 2025,
      q: 'What is the name of the school where Bepo serves as principal?',
      o: [
        'Lekki High School',
        'Lagos Academy',
        'Stardom Schools',
        'Premier College',
      ],
      a: 2,
      e: 'Bepo is the principal of Stardom Schools, located in the Lekki area of Lagos.',
      full: "Stardom Schools is the private institution at the heart of The Lekki Headmaster. It is located in Lekki, a highbrow area of Lagos, and represents the challenges and rewards of running an elite private school in Nigeria.\n\nThe school is the stage on which all the major events unfold — the prefect elections, the cultural shows, the excursions, the farewell ceremony, and ultimately Bepo's decision to return. The name 'Stardom' is itself symbolic: Bepo believes every child who passes through the school has the potential to become a star.\n\nThe school's students have a rallying chant — 'We're Stars, we're Stars of Stardom!' — which is sung both at celebratory moments and when Bepo makes his emotional return at the end of the novel.",
      h: "The school's name reflects Bepo's belief in the potential of every student.",
    },

    {
      yr: 2025,
      q: "What is the meaning of the term 'Japa syndrome' as used in the novel?",
      o: [
        'Returning home after working abroad',
        'Leaving Nigeria for better opportunities abroad',
        'Escaping school responsibilities',
        'A cultural festival in Lagos',
      ],
      a: 1,
      e: 'Japa syndrome refers to the wave of Nigerians relocating abroad — particularly to the UK and USA — in search of better economic opportunities.',
      full: "'Japa' is a Yoruba slang word meaning to run away or escape. In the context of the novel, 'Japa syndrome' describes the mass migration of educated, skilled Nigerians — particularly to the United Kingdom — driven by frustration with poor salaries, corruption, insecurity, and lack of opportunities at home.\n\nBepo himself is caught in the grip of this syndrome. His wife Seri (a nurse) and his two daughters Nike and Kike are already living in the UK. The salary gap is staggering: Bepo earns around ₦400,000 monthly in Nigeria while Seri earns £10,000 in the UK. The economic pull is undeniable.\n\nThe novel does not simply condemn Japa — it humanises it. Bepo understands why people leave, even as his heart remains rooted in Nigeria and his school. This nuanced treatment of migration is one of the novel's greatest strengths.",
      h: "The Yoruba word 'Japa' means to run away or escape.",
    },

    {
      yr: 2025,
      q: "What major theme is explored through Bepo's reluctance to leave Nigeria?",
      o: [
        'Wealth and ambition',
        'Dedication to duty and patriotism',
        'Betrayal and revenge',
        'Romance and family',
      ],
      a: 1,
      e: "Bepo's inner conflict between leaving for the UK and staying at Stardom Schools is the novel's central exploration of dedication to duty and patriotism.",
      full: "The central tension of The Lekki Headmaster is Bepo's moral dilemma: should he join his family in the UK and enjoy financial comfort, or should he stay and continue his work at Stardom Schools, which he considers his life's mission?\n\nThis dilemma is the novel's most powerful exploration of dedication to duty and patriotism. Bepo is not portrayed as someone who stays out of inability to leave — he genuinely has the opportunity to go. He chooses to stay because he believes in the transformative power of education and his role in shaping the next generation of Nigerians.\n\nThe author uses Bepo's struggle to argue that Nigeria's salvation lies partly in the hands of people like him — educated, committed professionals who refuse to abandon the country despite its flaws. This is why the ending, where Bepo returns to Stardom, is so emotionally charged.",
      h: "Bepo's choice at the end of the novel represents this theme most powerfully.",
    },

    {
      yr: 2025,
      q: 'What phrase in the novel reflects the theme of the value of education?',
      o: [
        'Education is the key to the future',
        'If you say education is expensive, try ignorance',
        'Japa is the answer to suffering',
        'Stars are made, not born',
      ],
      a: 1,
      e: "The phrase 'If you say education is expensive, try ignorance' recurs in the novel as a statement of Bepo's belief in education's irreplaceable value.",
      full: "This powerful phrase — 'If you say education is expensive, try ignorance' — is one of the recurring philosophical anchors of The Lekki Headmaster. Bepo uses it to respond to parents, critics, and colleagues who question whether quality education is worth the sacrifice.\n\nThe phrase originally attributed to Derek Bok (former Harvard president) is repurposed in the Nigerian context to make a bold point: the cost of not educating young Nigerians — in corruption, poverty, poor leadership, and underdevelopment — far exceeds the cost of investing in schools.\n\nThe phrase encapsulates one of the novel's central messages and is the kind of thematic statement JAMB frequently tests. It shows that the novel is not merely a story about one principal but a broader argument for the transformative role of education in Nigerian society.",
      h: "This saying is Bepo's philosophical defence of why quality education matters.",
    },

    {
      yr: 2025,
      q: 'Where is Stardom Schools located?',
      o: ['Badagry', 'Ikoyi', 'Lekki', 'Ibadan'],
      a: 2,
      e: 'Stardom Schools is located in Lekki, a highbrow residential and commercial area in Lagos.',
      full: "The specific setting of Lekki is significant in the novel. Lekki is one of Lagos's most affluent and rapidly developing areas — a place of sharp contrasts between extreme wealth and the daily struggles of ordinary Nigerians. By setting the story here, the author immediately positions the novel within the Nigerian elite educational system.\n\nHowever, despite being set in a wealthy environment, the novel does not shy away from the deeper problems that affect even privileged schools — corruption, the brain drain of good teachers, exam malpractice, and the pressure parents place on results over character.\n\nThe Lekki setting also gives the novel its title. Bepo's reputation is so strong within the area that he earns the informal title 'The Lekki Headmaster' — a man who, through dedication, has become synonymous with educational excellence in that part of Lagos.",
      h: "The novel's title directly references the setting — a specific area of Lagos.",
    },

    {
      yr: 2025,
      q: 'What historical location did the students visit in Badagry?',
      o: [
        'The First Storey Building only',
        'The Slave Market only',
        'The Point of No Return only',
        'All of the above — the First Storey Building, Point of No Return, and Heritage Museum',
      ],
      a: 3,
      e: 'The students visited multiple historical sites in Badagry including the First Storey Building, the Slave Market, the Point of No Return, and the Heritage Slave Museum.',
      full: 'One of the most emotionally powerful sections of the novel involves Bepo taking the Stardom students on an excursion to Badagry — a town in Lagos State with deep historical significance as a major hub of the transatlantic slave trade.\n\nThe students visit the First Storey Building (the first Western-style building in Nigeria), the Heritage Slave Museum, and most powerfully, the Point of No Return — the place from which enslaved Africans were shipped across the Atlantic, never to return to their homeland.\n\nFor Bepo, this excursion is not merely educational — it becomes deeply personal and symbolic. Standing at the Point of No Return while contemplating his own impending departure to the UK forces him to confront uncomfortable parallels between the forced migration of enslaved people and the voluntary migration of modern Nigerians through the Japa syndrome.',
      h: 'The Badagry excursion was comprehensive — students visited multiple sites.',
    },

    {
      yr: 2025,
      q: 'What does the Point of No Return symbolise in the novel?',
      o: [
        'A new beginning for Nigerians abroad',
        'The horrors of historical slavery',
        'Freedom and independence from colonialism',
        'The gateway to modern migration',
      ],
      a: 1,
      e: 'The Point of No Return symbolises the horrors of the transatlantic slave trade — the place from which enslaved Africans departed never to return.',
      full: "In historical terms, the Point of No Return in Badagry is the jetty from which enslaved Africans were loaded onto ships and transported across the Atlantic Ocean during the slave trade era. It earned its name because once enslaved people crossed that point, they would never see their homeland again.\n\nIn the novel, Bepo's visit to this location becomes one of the most emotionally resonant moments. As someone who is himself contemplating leaving Nigeria permanently, standing at the Point of No Return forces him to reflect on what departure and non-return mean — both historically and in his own life.\n\nThe author uses this historical symbol to deepen the Japa theme: the voluntary exodus of modern Nigerians, while driven by economic necessity rather than violence, still represents a kind of loss — of talent, culture, and human capital — that the country can ill afford.",
      h: 'The name itself tells you what this place represents — departure with no return.',
    },

    {
      yr: 2025,
      q: 'What tourist attraction in Ekiti did the Stardom students visit?',
      o: [
        'Erin Ijesha Waterfalls',
        'Yankari Games Reserve',
        'Ikogosi Warm Springs',
        'Arinta Waterfalls',
      ],
      a: 2,
      e: 'The students visited the Ikogosi Warm Springs in Ekiti State, a famous natural phenomenon where warm and cold springs meet.',
      full: "As part of Bepo's commitment to exposing his students to Nigeria's natural and cultural heritage, he organises an excursion to the Ikogosi Warm Springs in Ekiti State. This is a remarkable natural site where a warm spring and a cold spring meet at a single confluence without mixing — a phenomenon found in very few places on Earth.\n\nThe excursion reinforces one of Bepo's core educational beliefs: that Nigerian students should know and appreciate their own country before looking elsewhere. He uses these trips to build patriotism and cultural pride alongside academic knowledge.\n\nThe visit to Ikogosi also demonstrates the novel's broader agenda — it is as much a celebration of Nigeria's richness (natural, historical, cultural) as it is a critique of the country's problems.",
      h: 'This is a natural wonder where warm and cold springs meet in Ekiti State.',
    },

    {
      yr: 2025,
      q: "What was the Invention Club's major project in the novel?",
      o: [
        'A solar-powered generator',
        'A phone-making project',
        'A recycling water system',
        'A wind turbine for the school',
      ],
      a: 1,
      e: "The Invention Club was working on a phone-making project, reflecting the novel's emphasis on science, innovation, and Nigerian youth potential.",
      full: "The Invention Club's phone-making project is one of the details in the novel that showcases Bepo's progressive, forward-thinking approach to education. Rather than merely teaching students to pass examinations, he encourages them to create, innovate, and solve problems.\n\nThe project is part of the 'Breath Project' — a broader initiative at Stardom Schools using recycled and locally available materials to build functional devices. This reflects the theme of African ingenuity and self-reliance, pushing back against the narrative that Nigerians must go abroad to access technology or innovation.\n\nIn JAMB questions, this detail is tested to see whether candidates have read beyond the main plot. The Invention Club project symbolises Bepo's vision: that Nigeria's future lies in educated, creative young people who can build solutions from whatever they have.",
      h: 'The club used recycled materials to build this communication device.',
    },

    {
      yr: 2025,
      q: 'What caused the conflict during the prefect election at Stardom Schools?',
      o: [
        'A bribe scandal was uncovered',
        'Bepo intervened in the voting',
        "Banky insulted Tosh's father in his campaign speech",
        'Tosh accused the school of nepotism',
      ],
      a: 2,
      e: "Banky's election speech crossed a line when he made an insulting remark about Tosh's father, turning a school election into a deeply personal confrontation.",
      full: "The prefect election at Stardom Schools is meant to be a lesson in democracy — students campaigning, debating, and voting for their preferred candidates. However, the process becomes dramatically tense when Banky, in his campaign speech, makes a remark that insults Tosh's father.\n\nThis incident escalates the existing rivalry between the two students significantly and forces Bepo to intervene with diplomacy and wisdom. The situation also raises questions about the conduct of elections — how personal attacks, rather than policy arguments, can derail a democratic process.\n\nThe election subplot mirrors real-world Nigerian politics, where personality attacks, tribal sentiment, and family name often overshadow substantive debate. It is one of the ways the novel uses school life as a microcosm for broader national themes.",
      h: "The conflict was personal — one candidate attacked the other's family background.",
    },

    {
      yr: 2025,
      q: "What was Bepo's nickname among students and staff at Stardom?",
      o: ['The Principal', 'Headmaster Bepo', 'Principoo', 'Mr. Adebowale'],
      a: 2,
      e: "Students and staff affectionately called Bepo 'Principoo' — a playful variation of 'Principal' that reflected his warm relationship with the school community.",
      full: "The nickname 'Principoo' is a charming detail that reveals the special relationship Bepo has built with his school community. Unlike a principal who commands respect through fear or distance, Bepo earns affection through genuine care, humour, and accessibility.\n\nThe informal nickname signals that while Bepo is firm and committed to high standards, he is also human and relatable. Students are comfortable enough around him to coin a playful nickname — something that would be unthinkable with a cold or authoritarian principal.\n\nThis detail is significant thematically: it shows that true leadership earns genuine loyalty, not just compliance. When Bepo eventually returns to the school after nearly leaving for the UK, the students' joyful reaction is believable precisely because of relationships like this.",
      h: "Students shortened 'Principal' into a playful nickname for Bepo.",
    },

    {
      yr: 2025,
      q: 'How much was Bepo given as a farewell gift from Stardom Schools?',
      o: ['$5,000', '$10,000', '$15,000', '$20,000'],
      a: 1,
      e: 'Bepo was presented with a $10,000 farewell gift at his send-off ceremony — a sign of how deeply his contributions were valued.',
      full: "The $10,000 farewell gift presented to Bepo at his send-off is one of the most concrete demonstrations of the school community's appreciation for his years of service. It is a significant sum — especially when compared to his monthly Nigerian salary of around ₦400,000 — and signals that his impact on Stardom Schools has been considered beyond ordinary professional contribution.\n\nThe farewell ceremony is one of the most emotionally charged sections of the novel. Alongside the financial gift, Bepo receives speeches, cultural performances, and an outpouring of affection that makes his departure feel like a national loss rather than a personal career move.\n\nThis detail also deepens the Japa theme's complexity: if Nigeria could offer Bepo recognition, love, and even significant financial reward, the pull of leaving becomes more nuanced than simple economic desperation.",
      h: 'This is a specific figure that appears in the farewell ceremony chapter.',
    },

    {
      yr: 2025,
      q: 'What performance made Bepo deeply emotional at his farewell ceremony?',
      o: [
        'The Yoruba Bata Dance',
        'The Igbo Atilogwu Dance',
        'The Canoe Dance',
        'The Hausa Koroso Dance',
      ],
      a: 2,
      e: 'The Canoe Dance moved Bepo to tears — it symbolised African historical suffering and triggered his deep emotional conflict about leaving Nigeria.',
      full: "The Canoe Dance is the most powerful moment of Bepo's farewell ceremony. As the performers recreate the imagery of Africans being loaded onto slave ships — canoes symbolising the passage across the ocean — Bepo is overcome with emotion. He shouts 'Nooo!' in the middle of the performance, visibly disturbed.\n\nThis reaction is not random. Bepo has just visited the Point of No Return in Badagry and has been wrestling with the question of whether his own departure to the UK represents a voluntary version of the same historical tragedy. The Canoe Dance makes that parallel unbearably vivid.\n\nThe performance is the emotional climax of the novel, the moment where Bepo's internal conflict becomes visible to everyone around him. It sets up his ultimate decision — to return to Stardom rather than board the flight to the UK.",
      h: 'This dance recreated slave ship imagery — the most emotionally charged performance.',
    },

    {
      yr: 2025,
      q: "What was Bepo's emotional reaction during the Canoe Dance?",
      o: [
        'He applauded enthusiastically',
        'He became emotional and shouted Nooo!',
        'He left the hall quietly',
        'He joined the performers on stage',
      ],
      a: 1,
      e: "Bepo became deeply emotional during the Canoe Dance, shouting 'Nooo!' as the performance's symbolism overwhelmed him.",
      full: "When the Canoe Dance recreated the imagery of enslaved Africans being transported across the ocean, Bepo — who had been sitting in the audience — suddenly shouted 'Nooo!' This outburst surprises everyone present and signals that the performance has triggered something much deeper than aesthetic appreciation.\n\nFor Bepo, the dance is not just culture — it is a mirror. The historical departure with no return connects directly to his own impending departure to the UK. The Japa syndrome he has been wrestling with suddenly appears, in the light of the Canoe Dance, as a continuation of a historical pattern of loss and departure.\n\nThis moment is the emotional turning point of the novel and is almost certainly one of the questions JAMB will test. It is the moment when theme, character, and event converge most powerfully.",
      h: 'His outburst during this performance was the emotional peak of the ceremony.',
    },

    {
      yr: 2025,
      q: "What happened on the Monday after Bepo's departure from Stardom?",
      o: [
        'Students refused to attend school',
        'Bepo returned unexpectedly',
        'Mrs. Gloss announced a new principal',
        'The school was temporarily closed',
      ],
      a: 1,
      e: 'Bepo returned to Stardom Schools unexpectedly on the Monday after his farewell — having turned back before boarding his flight.',
      full: "In one of the most celebrated moments of the novel, Bepo — having said his goodbyes, received his farewell gift, and been driven to the airport — turns back before boarding. He returns to Stardom Schools on the following Monday, walking through the gates as if nothing has changed.\n\nThe students, who had been mourning his absence, erupt with joy. They sing their school song — 'We're Stars, we're Stars of Stardom!' — in an emotional celebration of his return. The scene is deliberately constructed to be uplifting: a man choosing duty, love, and roots over economic comfort.\n\nThis ending reinforces the novel's central argument: that Nigeria's problems can only be solved by people who stay and fight, not those who leave. Bepo's return is both a personal statement and a political one.",
      h: 'The Monday after his farewell brought a surprise that delighted the entire school.',
    },

    {
      yr: 2025,
      q: 'What song did the students sing when Bepo returned to Stardom?',
      o: [
        'The Nigerian National Anthem',
        "Stardom's victory song — 'We're Stars, we're Stars of Stardom!'",
        'A farewell hymn',
        'A Yoruba cultural song',
      ],
      a: 1,
      e: "The students sang Stardom's victory song — 'We're Stars, we're Stars of Stardom!' — to celebrate Bepo's unexpected return.",
      full: "The school song — 'We're Stars, we're Stars of Stardom!' — serves as both a motif and a symbol throughout The Lekki Headmaster. The students chant it at moments of celebration, victory, and collective pride. Its most powerful use is at the very end of the novel when Bepo walks back through the school gates.\n\nThe song's lyrics are a statement of identity and self-belief — that the students of Stardom are exceptional, that they are stars. Bepo has spent his career nurturing this belief in his students. When they sing the song at his return, they are not merely welcoming him back — they are affirming what he has built and why it matters.\n\nThe choice to end the novel with this jubilant, communal song rather than a quiet moment of individual reflection is deliberate. It emphasises that Bepo's story is not just personal — it belongs to the entire school community.",
      h: "The students' celebration song contained the word that gives the school its name.",
    },

    {
      yr: 2025,
      q: "What was the relationship between Bepo's wife Seri and the theme of Japa?",
      o: [
        'She refused to leave Nigeria and urged Bepo to stay',
        'She was already living in the UK as a nurse and wanted Bepo to join her',
        'She returned from the UK to be with Bepo',
        'She opposed migration and worked with Bepo at Stardom',
      ],
      a: 1,
      e: "Bepo's wife Seri had already relocated to the UK as a nurse, earning £10,000 monthly — her presence abroad was the main family pull driving Bepo toward Japa.",
      full: "Seri's situation in the novel embodies the human cost of the Japa syndrome at the family level. She is a trained nurse who has already made the move to the UK, where she earns £10,000 monthly — roughly 25 times what Bepo earns in Nigeria. Their two daughters, Nike and Kike, are also with her.\n\nThe family separation has strained the marriage. Seri wants Bepo to join them and is understandably frustrated with his continued attachment to Stardom Schools. From her perspective, she has built a stable life abroad and there is no logical reason for Bepo to stay behind.\n\nThe couple's tension represents a universal Nigerian family experience: one partner who has made the leap versus one who cannot let go of home. The novel treats both positions with empathy, refusing to make Seri a villain for leaving or Bepo a saint for staying.",
      h: 'Her profession and UK location created the central family tension in the novel.',
    },

    {
      yr: 2025,
      q: 'What does the novel suggest about the impact of Japa on Nigeria?',
      o: [
        'It strengthens the economy through remittances',
        'It has no significant effect on the country',
        'It creates a leadership and talent vacuum in the country',
        'It is entirely positive for Nigerian families',
      ],
      a: 2,
      e: 'The novel argues that the Japa syndrome creates a devastating talent and leadership vacuum — Nigeria loses its most educated, most committed people to foreign countries.',
      full: "Through Bepo's story, Kabir Alabi Garba makes a clear argument: when Nigeria's best educators, doctors, engineers, and professionals leave en masse, the country loses exactly the people it needs most to rebuild. Bepo is not an ordinary person — he is the kind of committed, principled leader who makes institutions function well. His potential departure would leave a Bepo-shaped hole in Stardom Schools that would be very hard to fill.\n\nThe novel does not pretend that staying is easy or that Nigeria's problems are trivial. It acknowledges the genuine difficulty of choosing Nigeria over comfort. But it consistently argues that the country's future depends on people making exactly that difficult choice.\n\nThe contrast between Bepo's ₦400,000 Nigerian salary and Seri's £10,000 UK salary is presented starkly — the author is honest about the economic reality. But Bepo's return demonstrates that some things cannot be measured in salary alone.",
      h: 'The novel frames migration as a national loss, not just a personal choice.',
    },

    {
      yr: 2025,
      q: 'What key value did Bepo emphasise most in his work with students?',
      o: [
        'Academic excellence above all else',
        'Patriotism and love for Nigerian culture',
        'Religious devotion',
        'Financial ambition',
      ],
      a: 1,
      e: "Bepo's defining educational mission was instilling patriotism and a deep love for Nigerian culture, history, and identity in his students.",
      full: "While Bepo cares deeply about academic results, what truly sets him apart as an educator is his commitment to building patriotic, culturally rooted Nigerians. He organises excursions to historical sites not for entertainment but to ensure his students understand where they come from and what their ancestors experienced.\n\nFrom Badagry's slave history to Ekiti's natural wonders, from African proverbs to the Canoe Dance — Bepo designs an education that insists Nigeria is worth knowing, worth loving, and worth fighting for.\n\nThis is directly connected to the novel's stance on Japa: Bepo believes that if young Nigerians truly understood and valued their heritage, they would be more likely to stay and contribute to the country's development rather than flee at the first opportunity. His pedagogy is therefore also a form of national advocacy.",
      h: 'His excursion choices and cultural emphasis reveal his deepest educational priority.',
    },

    {
      yr: 2025,
      q: "Who said 'If you want a debtor to lead, ask a tenant to lead the landlord'?",
      o: ['Bepo', 'Mrs. Ibidun Gloss', 'Mr. Amos', 'Banky'],
      a: 1,
      e: 'This witty and pointed remark was made by Mrs. Ibidun Gloss, reflecting her sharp social commentary.',
      full: "This proverb-like statement by Mrs. Ibidun Gloss is one of the most quoted lines in the novel. It is delivered in a context of commenting on leadership and power dynamics — specifically about the absurdity of placing someone in authority over people who are in a superior position to them.\n\nThe line showcases Mrs. Gloss's character perfectly: she uses humour and indirect speech (the Yoruba rhetorical tradition of speaking truth through proverbs) to make pointed observations that others might be afraid to say directly.\n\nIn a broader sense, the statement is also a commentary on Nigerian institutions — schools, companies, governments — where those in leadership positions are sometimes less qualified or less invested than those they lead. Mrs. Gloss's wit gives the novel much of its social critique beyond the main Bepo narrative.",
      h: "This female teacher delivered many of the novel's most quotable social observations.",
    },

    {
      yr: 2025,
      q: "How did Bepo's school honour his contributions at the farewell?",
      o: [
        'By naming a hall after him',
        'By presenting him a $10,000 gift and hosting a cultural show',
        'By promoting him posthumously',
        'By publishing a book about his career',
      ],
      a: 1,
      e: 'Bepo was honoured with a $10,000 cash gift, a banner, speeches, a debate, and multiple cultural performances including the Canoe Dance.',
      full: "The farewell ceremony for Bepo is one of the most elaborate and emotionally detailed sections of The Lekki Headmaster. It is not a simple goodbye — it is a full cultural celebration of a man whose work has defined the school.\n\nThe programme includes student debates, cultural performances representing Nigeria's diverse ethnic groups (the Bata dance, the Atilogwu dance, the Canoe dance), heartfelt speeches from staff and the Managing Director, a farewell banner, and the $10,000 gift.\n\nEach element of the ceremony serves a thematic function. The cultural dances affirm the cultural education Bepo championed. The speeches articulate his impact in words. The financial gift demonstrates tangible respect. And the Canoe Dance — the final performance — becomes the emotional trigger that ultimately leads to his return.",
      h: 'His farewell was a full cultural event, not just a handshake and a cheque.',
    },

    {
      yr: 2025,
      q: 'What historical figure is mentioned in the novel as having translated the Yoruba Bible?',
      o: [
        'Chief Didi Ogba',
        'Rev. Samuel Ajayi Crowther',
        'J.P. Clark',
        'Bishop Akinola',
      ],
      a: 1,
      e: 'Rev. Samuel Ajayi Crowther, the first African Anglican bishop, is mentioned for his translation of the Bible into Yoruba — a detail raised during the Badagry excursion.',
      full: "During the Badagry excursion, as the students explore the historical sites including the First Storey Building, Bepo teaches them about Rev. Samuel Ajayi Crowther — a remarkable figure in Nigerian history. Crowther was born in present-day Oyo State, enslaved as a child, rescued by the British Royal Navy, educated in Sierra Leone, and eventually became the first African Anglican bishop.\n\nHis greatest literary and cultural achievement was the translation of the Bible into Yoruba — an act that made Christian scripture accessible to Yoruba speakers and preserved the language in written form.\n\nThis detail in the novel is not accidental. By including Crowther in the Badagry chapter, the author connects the history of slavery (Crowther himself was enslaved) to the history of resilience, scholarship, and cultural preservation — all themes central to the novel's message about Nigeria's heritage.",
      h: 'He was an enslaved child who became a bishop and translated scripture into Yoruba.',
    },

    {
      yr: 2025,
      q: "What does Bepo's dream at the airport represent in the novel?",
      o: [
        'His excitement about the UK',
        "His subconscious guilt about leaving — connected to slavery and Nigeria's history",
        'His practical fears about the flight',
        'His nostalgia for his university days',
      ],
      a: 1,
      e: "Bepo's airport dream blends the imagery of the slave trade with his own departure, representing his deep subconscious guilt and conflict about abandoning Nigeria.",
      full: "As Bepo sits at the airport preparing to board his flight to the UK, he falls into a dream or semi-conscious reverie. The imagery of the dream blends his contemporary situation with the historical imagery of the Point of No Return and the Canoe Dance — enslaved Africans being loaded onto ships merge with his own figure boarding a plane.\n\nThis dream is the novel's most explicit symbolic moment. The author is drawing a direct parallel between the forced departure of enslaved people and the voluntary departure of modern Nigerians through Japa. While the circumstances are radically different — one was violent, one is chosen — the emotional resonance of loss, separation, and non-return connects them.\n\nThe dream is what ultimately turns Bepo around. He cannot shake the feeling that in leaving, he is completing a tragic historical pattern rather than escaping it. He chooses instead to return.",
      h: 'His dream merged contemporary migration with historical slave trade imagery.',
    },

    {
      yr: 2025,
      q: 'What advice did Bepo give students about achieving success?',
      o: [
        'Travel abroad as soon as possible',
        'Make the best use of your talents and time',
        'Focus only on passing examinations',
        'Follow the path your parents have chosen',
      ],
      a: 1,
      e: "Bepo's consistent advice to students was to make the best use of their talents and time — a statement of personal responsibility and self-investment.",
      full: "Throughout the novel, Bepo is portrayed as a motivational force in his students' lives. His advice is not simplistic or transactional — he does not tell them to just pass examinations or chase money. Instead, his core message is about purposeful self-development: identify your talents, invest in them fully, and use your time wisely.\n\nThis philosophy explains his emphasis on cultural excursions, the Invention Club, debating, and other extra-curricular activities. He believes education is holistic — that a student who knows Nigerian history, can debate confidently, and can invent things with their hands is more equipped for life than one who merely scores high in tests.\n\nThe advice also speaks to the Japa theme: Bepo implicitly argues that talent and hard work can succeed in Nigeria, and that leaving is not the only path to fulfilment. His own life is the evidence he offers.",
      h: 'His advice focused on internal development rather than external destination.',
    },

    {
      yr: 2025,
      q: "What is the significance of the Badagry excursion to the novel's overall theme?",
      o: [
        'It shows that Stardom Schools has a generous excursion budget',
        'It is a plot device to introduce tourism in Nigeria',
        'It connects the historical trauma of slavery to the modern trauma of Japa migration',
        "It demonstrates Bepo's fondness for travel",
      ],
      a: 2,
      e: "The Badagry excursion creates the novel's central thematic bridge — connecting the forced migration of enslaved Africans to the voluntary but equally poignant migration of modern Nigerians through Japa.",
      full: 'The Badagry excursion is not simply a field trip — it is the thematic heart of the novel. By taking his students (and the reader) to the very place where African captives were shipped across the ocean never to return, the author creates an irresistible parallel with the Japa syndrome.\n\nBepo standing at the Point of No Return, knowing he is about to leave Nigeria himself, forces a confrontation with what departure truly means. Is his voluntary migration so different from the involuntary migration that happened here centuries ago? The answer the novel gives is: it is different in nature, but similar in consequence — Nigeria loses people who will likely not return.\n\nThe Badagry excursion transforms the Japa theme from a contemporary social issue into something with deep historical roots. It gives the novel a gravity that elevates it beyond a simple story about a principal deciding whether to emigrate.',
      h: "This excursion creates the novel's most important thematic connection.",
    },

    {
      yr: 2025,
      q: 'Who published The Lekki Headmaster and in what year?',
      o: [
        'Heinemann, 2020',
        'Longman, 2022',
        'Winepress Publishing, 2023',
        'Farafina Books, 2024',
      ],
      a: 2,
      e: 'The Lekki Headmaster was published by Winepress Publishing in 2023.',
      full: "The Lekki Headmaster by Kabir Alabi Garba was published in 2023 by Winepress Publishing. It was subsequently selected by JAMB as the official recommended novel for the 2025 and 2026 UTME Use of English examination — meaning millions of Nigerian candidates were required to study it.\n\nThis publishing detail is a basic factual question that JAMB commonly tests. Knowing the publisher, year of publication, and author's full name are foundational facts expected of every candidate who has studied the text.\n\nKabir Alabi Garba is a Nigerian author whose work engages with contemporary Nigerian social issues — education, migration, corruption, and cultural identity. The Lekki Headmaster is his contribution to the literary conversation about what Nigeria is, what it could be, and what it risks losing through brain drain.",
      h: 'This novel was published in 2023 by a Nigerian publishing house.',
    },

    {
      yr: 2025,
      q: "What does Bepo's return to Stardom Schools at the novel's end ultimately represent?",
      o: [
        'His inability to afford the flight to the UK',
        'His regret about the farewell ceremony',
        'The triumph of duty, love, and patriotism over economic comfort',
        "His wife's decision to return to Nigeria",
      ],
      a: 2,
      e: "Bepo's return is the novel's definitive statement — that duty, love for one's students, and patriotism can outweigh even the most powerful economic and family pressures.",
      full: "The ending of The Lekki Headmaster is its most important statement. Bepo has everything in place to leave: his ticket is bought, his farewell has been celebrated, his wife and children are waiting in the UK. And yet he turns back.\n\nHis return is not a failure or an accident — it is a deliberate, conscious choice. The airport dream, the memory of the Canoe Dance, the faces of his students, his belief in what he is building at Stardom — all of it outweighs the economic argument for leaving.\n\nThe author uses this ending to make an argument about Nigeria's future: the country's salvation will come from people like Bepo who choose to stay and build, not from those who leave. It is a hopeful but demanding conclusion — it asks the reader, especially the young JAMB candidate reading the novel, to consider what they owe their country and what it might mean to stay.",
      h: "His final choice is the novel's central argument about patriotism and purpose.",
    },
  ],
};

// ── Analytics — sends to Google Sheets via Apps Script webhook (no backend)
const SHEETS_URL =
  'https://script.google.com/macros/s/AKfycby59br8odWXDWQLkomFieaU-2aq_4wb5FiwzTiHkFgqztm0HqU5RShooJLeUANpF8sI/exec';

function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua);
  const browser =
    /Chrome/i.test(ua) && !/Edge|OPR/i.test(ua)
      ? 'Chrome'
      : /Firefox/i.test(ua)
      ? 'Firefox'
      : /Safari/i.test(ua) && !/Chrome/i.test(ua)
      ? 'Safari'
      : /Edge/i.test(ua)
      ? 'Edge'
      : /OPR|Opera/i.test(ua)
      ? 'Opera'
      : 'Other';
  const device = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';
  const os = /Android/i.test(ua)
    ? 'Android'
    : /iPhone|iPad/i.test(ua)
    ? 'iOS'
    : /Windows/i.test(ua)
    ? 'Windows'
    : /Mac/i.test(ua)
    ? 'macOS'
    : /Linux/i.test(ua)
    ? 'Linux'
    : 'Unknown';
  return { browser, device, os };
}

function fmtTimestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function trackEvent(eventName, data) {
  if (!SHEETS_URL) return; // silent no-op until URL is set
  const payload = {
    event: eventName,
    timestamp: fmtTimestamp(),
    ...data,
  };
  // Fire-and-forget — doesn't block the UI at all
  try {
    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors', // avoids CORS issues with Apps Script
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {}); // swallow any network errors silently
  } catch (e) {}
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  utter.pitch = 1.0;
  utter.volume = 1;
  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = [
      'Google UK English Male',
      'Microsoft David Desktop',
      'Microsoft Mark Desktop',
      'Daniel',
      'Fred',
      'Thomas',
      'Arthur',
      'Google US English',
      'Alex',
    ];
    const male =
      voices.find((v) => preferred.some((p) => v.name.includes(p))) ||
      voices.find((v) => v.name.toLowerCase().includes('male')) ||
      voices.find((v) =>
        /david|daniel|fred|thomas|arthur|alex|george/i.test(v.name)
      ) ||
      null;
    if (male) utter.voice = male;
    window.speechSynthesis.speak(utter);
  };
  if (window.speechSynthesis.getVoices().length > 0) {
    trySpeak();
  } else {
    window.speechSynthesis.onvoiceschanged = trySpeak;
  }
  return utter;
}
function stopSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

// ── Helpers ────────────────────────────────────────────────────────────────
function sfl(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function loadUser() {
  try {
    return JSON.parse(localStorage.getItem('ep_user') || '{}');
  } catch {
    return {};
  }
}
function loadStats(email) {
  try {
    const key = email ? `ep_stats_${email}` : 'ep_stats';
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}
function saveUser(u) {
  try {
    localStorage.setItem('ep_user', JSON.stringify(u));
  } catch {}
}
function saveStats(s, email) {
  try {
    const key = email ? `ep_stats_${email}` : 'ep_stats';
    localStorage.setItem(key, JSON.stringify(s));
  } catch {}
}

// ── CSS ────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Poppins',sans-serif;background:#F8F5FF;margin:0;padding:0;min-height:100dvh;display:flex;flex-direction:column;}
.phone{width:100%;min-height:100dvh;background:#F8F5FF;position:relative;display:flex;flex-direction:column;overflow-x:hidden;}
.scr{flex:1;display:flex;flex-direction:column;overflow:hidden;min-height:100dvh;}
.scroll{overflow-y:auto;-webkit-overflow-scrolling:touch;}
.scroll::-webkit-scrollbar{width:3px;}
.scroll::-webkit-scrollbar-thumb{background:rgba(75,0,130,.18);border-radius:2px;}
@keyframes fd{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes su{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pi{from{opacity:0;transform:scale(.84)}to{opacity:1;transform:scale(1)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes twinkle{0%,100%{opacity:.2}50%{opacity:1}}
@keyframes loadBar{from{width:0}to{width:100%}}
@keyframes fall{0%{transform:translateY(-10px) rotate(0);opacity:1}100%{transform:translateY(210px) rotate(360deg);opacity:0}}
@keyframes timerPulse{0%,100%{color:#FF6B6B;transform:scale(1)}50%{color:#ff3333;transform:scale(1.12)}}
@keyframes powerGlow{0%,100%{box-shadow:0 0 0 0 rgba(212,175,55,0)}50%{box-shadow:0 0 10px 3px rgba(212,175,55,.35)}}
@keyframes powerGlowP{0%,100%{box-shadow:0 0 0 0 rgba(75,0,130,0)}50%{box-shadow:0 0 10px 3px rgba(75,0,130,.35)}}
@keyframes fadeUsed{from{opacity:1}to{opacity:.35}}
@keyframes wrongShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
.fd{animation:fd .3s ease both;}
.su{animation:su .25s ease both;}
.pi{animation:pi .25s ease both;}
.correct-pop{animation:correctPop .3s ease;}
.wrong-shake{animation:wrongShake .35s ease;}
.star{position:absolute;width:3px;height:3px;background:#D4AF37;border-radius:50%;animation:twinkle 2s infinite;}
input{font-family:'Poppins',sans-serif;}
button{font-family:'Poppins',sans-serif;cursor:pointer;transition:all .18s;}
button:active{transform:scale(.97);}
html, body, #root {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
.phone {
  width: 100% !important;
  max-width: 100% !important;
  min-height: 100dvh;
  position: relative;
}
.scr {
  width: 100%;
  max-width: 100%;
  min-height: 100dvh;
  position: relative;
}
* {
  max-width: 100%;
}
img {
  max-width: 100%;
  height: auto;
  display: block;
}
`;



// ── Splash ─────────────────────────────────────────────────────────────────
function Splash({ onDone }) {
  const stars = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      dur: 1.5 + Math.random() * 2,
    }))
  ).current;
  useEffect(() => {
    // Small delay lets AudioContext initialise cleanly before we hit it
    const s = setTimeout(() => SFX.splash(), 300);
    const t = setTimeout(onDone, 2800);
    return () => {
      clearTimeout(s);
      clearTimeout(t);
    };
  }, []);
  return (
    <div
      className="scr"
      style={{
        background: 'linear-gradient(160deg,#1a0030,#4B0082,#1a0030)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
      <img
  src={logo}
  alt="Elite Scholars CBT Logo"
  style={{
    width: 120,
    height: 120,
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 0 40px rgba(212,175,55,.5)',
    animation: 'pulse 2s infinite',
    zIndex: 1,
  }}
/>
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 1.1,
          }}
        >
          Elite<span style={{ color: GOLD }}>Scholars</span> CBT
        </div>
        <div
          style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 6 }}
        >
          JAMB Practice · 8 Subjects
        </div>
      </div>
      <div
        style={{
          width: 180,
          height: 3,
          background: 'rgba(255,255,255,.15)',
          borderRadius: 2,
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <div
          style={{
            height: '100%',
            background: GOLD,
            animation: 'loadBar 2.5s ease forwards',
          }}
        />
      </div>
      <div
        style={{
          fontSize: 10,
          color: LGOLD,
          letterSpacing: 2,
          textTransform: 'uppercase',
          zIndex: 1,
        }}
      >
        by Elite JAMB &amp; PUTME Clinic
      </div>
    </div>
  );
}

// ── Onboard ────────────────────────────────────────────────────────────────
function Onboard({ onDone }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const submit = () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    const emailRx = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRx.test(email.trim())) {
      alert('Please enter a valid email address (e.g. name@gmail.com)');
      return;
    }
    saveUser({ name: name.trim(), email: email.trim() });
    trackEvent('register', {
      name: name.trim(),
      email: email.trim(),
      ...getDeviceInfo(),
    });
    onDone(name.trim(), email.trim());
  };
  const inpStyle = {
    width: '100%',
    padding: '14px 18px',
    fontSize: 14,
    fontWeight: 500,
    border: '2px solid rgba(255,255,255,.15)',
    borderRadius: 14,
    background: 'rgba(255,255,255,.08)',
    color: WHITE,
    outline: 'none',
  };
  return (
    <div
      className="scr fd"
      style={{ background: 'linear-gradient(160deg,#280050,#4B0082,#280050)' }}
    >
      <div
        style={{
          padding: '44px 24px 24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 40, animation: 'bounce 2s infinite' }}>👋</div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: WHITE,
            lineHeight: 1.2,
          }}
        >
          Let's get you
          <br />
          <span style={{ color: GOLD }}>300+</span> ready.
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,.6)',
            lineHeight: 1.65,
          }}
        >
          Enter your name and email to save progress. No password needed.
        </div>
      </div>
      <div
        style={{
          padding: '0 24px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <input
          style={inpStyle}
          placeholder="Your first name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
          onFocus={(e) => (e.target.style.borderColor = GOLD)}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,.15)')}
        />
        <input
          style={inpStyle}
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = GOLD)}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,.15)')}
        />
        <button
          onClick={submit}
          style={{
            padding: 16,
            background: GOLD,
            border: 'none',
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            color: DPURP,
            boxShadow: '0 8px 24px rgba(212,175,55,.4)',
          }}
        >
          Let's Go →
        </button>
      </div>
    </div>
  );
}

// ── Subjects ───────────────────────────────────────────────────────────────
function Subjects({ name, onStart, onProfile, onSignOut }) {
  const [sel, setSel] = useState();

  // Build subject entries — inject Lekki Headmaster as 3rd card (full-width)
  const subjEntries = Object.entries(SUBJ).filter(([id]) => id !== 'novel');
  const lekkiCard = { id: '__lekki__', isLekki: true };
  // Insert after index 1 (after cards 1 and 2) → becomes card 3
  const allCards = [
    ...subjEntries.slice(0, 2).map(([id, meta]) => ({ id, meta })),
    lekkiCard,
    ...subjEntries.slice(2).map(([id, meta]) => ({ id, meta })),
  ];

  return (
    <div
      className="scr fd"
      style={{
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg,${DPURP},${PURPLE})`,
          padding: '44px 20px 30px',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: -16,
            left: 0,
            right: 0,
            height: 32,
            background: BG,
            borderRadius: '20px 20px 0 0',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,.5)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 3,
              }}
            >
              WELCOME BACK
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: WHITE }}>
              {name || 'Student'} 👋
            </div>
            <div
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,.6)',
                marginTop: 2,
              }}
            >
              Pick a subject to practise today
            </div>
          </div>
          {/* Profile + Sign Out — top right */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 6,
              marginTop: 2,
            }}
          >
            <button
              onClick={onProfile}
              style={{
                background: 'rgba(255,255,255,.14)',
                border: '1px solid rgba(255,255,255,.2)',
                borderRadius: 10,
                padding: '5px 12px',
                color: WHITE,
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              👤 Profile
            </button>
            <button
              onClick={onSignOut}
              style={{
                background: 'rgba(220,38,38,.18)',
                border: '1px solid rgba(220,38,38,.3)',
                borderRadius: 10,
                padding: '5px 12px',
                color: '#fca5a5',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ↩ Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable subject cards */}
      <div
        className="scroll"
        style={{ flex: 1, padding: '24px 16px 100px', overflowY: 'auto' }}
      >
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
        >
          {allCards.map((card, idx) => {
            if (card.isLekki) {
              // Full-width Lekki Headmaster card spanning both columns
              const isSelL = sel === '__lekki__';
              return (
                <div
                  key="lekki"
                  onClick={() => {
                    SFX.select();
                    setSel('__lekki__');
                  }}
                  style={{
                    gridColumn: '1 / -1',
                    background: isSelL ? '#FCE7F3' : WHITE,
                    borderRadius: 16,
                    padding: '14px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    border: `2px solid ${isSelL ? '#831843' : LGRAY}`,
                    cursor: 'pointer',
                    boxShadow: isSelL
                      ? '0 4px 14px #83184330'
                      : '0 2px 8px rgba(0,0,0,.05)',
                    transition: 'all .2s',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: isSelL ? '#831843' : '#FCE7F3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      flexShrink: 0,
                      transition: 'all .2s',
                    }}
                  >
                    📗
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#1a0030',
                        lineHeight: 1.2,
                      }}
                    >
                      The Lekki Headmaster
                    </div>
                    <div style={{ fontSize: 10, color: GRAY, marginTop: 2 }}>
                      Kabir Alabi Garba · Literature
                    </div>
                    <div
                      style={{
                        background: isSelL ? '#831843' : LGRAY,
                        color: isSelL ? WHITE : GRAY,
                        fontSize: 9,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 12,
                        display: 'inline-block',
                        marginTop: 5,
                      }}
                    >
                      NOVEL
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: GRAY,
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        color: isSelL ? '#831843' : GRAY,
                      }}
                    >
                      {(QB.novel || []).length}
                    </div>
                    <div>questions</div>
                  </div>
                </div>
              );
            }
            const { id, meta } = card;
            const isSel = sel === id;
            return (
              <div
                key={id}
                onClick={() => {
                  SFX.select();
                  setSel(id);
                }}
                style={{
                  background: isSel ? meta.bg : WHITE,
                  borderRadius: 16,
                  padding: '14px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 7,
                  border: `2px solid ${isSel ? meta.color : LGRAY}`,
                  cursor: 'pointer',
                  boxShadow: isSel
                    ? `0 4px 14px ${meta.color}30`
                    : '0 2px 8px rgba(0,0,0,.05)',
                  transition: 'all .2s',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: isSel ? meta.color : meta.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    transition: 'all .2s',
                  }}
                >
                  {meta.icon}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#1a0030',
                    lineHeight: 1.2,
                  }}
                >
                  {meta.label}
                </div>
                <div style={{ fontSize: 10, color: GRAY }}>
                  {(QB[id] || []).length} questions
                </div>
                <div
                  style={{
                    background: isSel ? meta.color : LGRAY,
                    color: isSel ? WHITE : GRAY,
                    fontSize: 9,
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 12,
                    alignSelf: 'flex-start',
                  }}
                >
                  READY
                </div>
              </div>
            );
          })}
        </div>
      </div>

    {/* Fixed Start button */}
<div
  style={{
    padding: '8px 16px 24px',
    flexShrink: 0,
    background: BG,
    borderTop: `1px solid ${LGRAY}`,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
  }}
>
  <button
    onClick={() => {
      SFX.submit();
      onStart(sel === '__lekki__' ? 'novel' : sel);
    }}
    style={{
      width: '100%',
      padding: 16,
      background: sel ? PURPLE : LGRAY,
      border: 'none',
      borderRadius: 14,
      fontSize: 15,
      fontWeight: 700,
      color: sel ? WHITE : GRAY,
      boxShadow: sel ? '0 8px 22px rgba(75,0,130,.4)' : 'none',
      opacity: sel ? 1 : 0.6,
      cursor: sel ? 'pointer' : 'not-allowed',
    }}
  >
    {sel === '__lekki__' ? '📗' : SUBJ[sel]?.icon || '📚'} Start{' '}
    {sel === '__lekki__' ? 'Lekki Headmaster' : SUBJ[sel]?.label || 'a subject'} →
  </button>
</div>
          
    </div>
  );
}

// ── Ready ──────────────────────────────────────────────────────────────────
function Ready({ subjectId, onGo, onBack }) {
  const [count, setCount] = useState(3);
  const [offset, setOffset] = useState(283);
  const meta = SUBJ[subjectId] || SUBJ.english;
  useEffect(() => {
    const tick = (c) => {
      setCount(c);
      setOffset(283 * (1 - (4 - c) / 3));
      if (c === 0) {
        setTimeout(onGo, 450);
        return;
      }
      SFX.select();
      setTimeout(() => tick(c - 1), 1000);
    };
    setTimeout(() => tick(3), 200);
  }, []);
  return (
    <div
      className="scr fd"
      style={{
        background: 'linear-gradient(160deg,#1a0030,#4B0082,#1a0030)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        textAlign: 'center',
        padding: '40px 24px',
        position: 'relative',
      }}
    >
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: 48,
          left: 20,
          background: 'rgba(255,255,255,.1)',
          border: 'none',
          borderRadius: 10,
          padding: '6px 14px',
          color: 'rgba(255,255,255,.7)',
          fontSize: 12,
        }}
      >
        ← Back
      </button>
      <div style={{ fontSize: 28 }}>{meta.icon}</div>
      <div
        style={{
          width: 140,
          height: 140,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="140"
          height="140"
          style={{
            position: 'absolute',
            inset: 0,
            transform: 'rotate(-90deg)',
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,.1)"
            strokeWidth="7"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={GOLD}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div
          key={count}
          className="pi"
          style={{ fontSize: 58, fontWeight: 900, color: WHITE, zIndex: 1 }}
        >
          {count}
        </div>
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: WHITE }}>
        {meta.label} — Get Ready! 🔥
      </div>
      <div
        style={{
          fontSize: 12,
          color: 'rgba(255,255,255,.65)',
          lineHeight: 1.6,
        }}
      >
        {ROUND_SIZE} questions · {getTimerSecs(subjectId, ROUND_SIZE)}s timer
        <br />
        Select → Submit → See explanation
      </div>
      <div
        style={{
          display: 'flex',
          gap: 7,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          '+10 pts correct',
          '50/50 lifeline',
          'Hint lifeline',
          '🔊 Voice read',
        ].map((t, i) => (
          <div
            key={i}
            style={{
              background:
                i === 0 ? 'rgba(212,175,55,.2)' : 'rgba(255,255,255,.1)',
              border: `1px solid ${i === 0 ? GOLD : 'rgba(255,255,255,.2)'}`,
              color: i === 0 ? LGOLD : WHITE,
              fontSize: 10,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 16,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Quiz ───────────────────────────────────────────────────────────────────
function Quiz({
  subjectId,
  onAllDone,
  score,
  setScore,
  correct,
  setCorrect,
  totalQ,
  setTotalQ,
  onHome,
}) {
  const [shuffled] = useState(() => sfl(QB[subjectId] || QB.economics));
  const [qi, setQi] = useState(0);
  const [rs, setRs] = useState(0);
  const [sel, setSel] = useState(-1);
  const [done, setDone] = useState(false);
  const [modal, setModal] = useState(false);
  const [timeLeft, setTL] = useState(() => getTimerSecs(subjectId, ROUND_SIZE));
  const [usedF, setUF] = useState(false);
  const [usedH, setUH] = useState(false);
  const [hidden, setHid] = useState([]);
  const [showHint, setSHint] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [ansAnim, setAnsAnim] = useState(''); // "correct" | "wrong" | ""
  const timerRef = useRef(null);
  const bodyRef = useRef(null);
  const utterRef = useRef(null);
  const roundSecs = getTimerSecs(subjectId, ROUND_SIZE);

  const q = shuffled[qi];
  const isLastQ = qi >= shuffled.length - 1;
  const isRoundEnd = (qi + 1) % ROUND_SIZE === 0;
  const isLast = isLastQ || isRoundEnd;
  const roundNum = Math.floor(qi / ROUND_SIZE);
  const meta = SUBJ[subjectId] || SUBJ.economics;

  // Auto-read on new question
  useEffect(() => {
    if (!q || !voiceEnabled) return;
    const txt =
      q.q +
      '. Options: ' +
      q.o.map((opt, i) => ['A', 'B', 'C', 'D'][i] + '. ' + opt).join('. ');
    stopSpeech();
    const u = speak(txt);
    if (u) {
      utterRef.current = u;
      setSpeaking(true);
      u.onend = () => setSpeaking(false);
    }
  }, [qi, voiceEnabled, q]);

  // Accurate timer per round — never stops until round ends or user leaves
  useEffect(() => {
    setTL(roundSecs);
    if (timerRef.current) clearInterval(timerRef.current);
    const start = Date.now();
    let lastWarnSec = -1;
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = Math.max(0, roundSecs - elapsed);
      setTL(remaining);
      // Only fire timerWarn once per second (not twice from 500ms interval)
      if (remaining <= 10 && remaining > 0 && remaining !== lastWarnSec) {
        lastWarnSec = remaining;
        SFX.timerWarn();
      }
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setDone((d) => {
          if (!d) {
            setTotalQ((x) => x + 1);
            return true;
          }
          return d;
        });
        stopSpeech();
        setSpeaking(false);
      }
    }, 500);
    return () => clearInterval(timerRef.current);
  }, [roundNum, roundSecs]);

  const stopTimer = () => clearInterval(timerRef.current);

  const toggleVoice = () => {
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
      setVoiceEnabled(false);
    } else {
      setVoiceEnabled((v) => {
        const next = !v;
        if (next && q) {
          const txt =
            q.q +
            '. Options: ' +
            q.o
              .map((opt, i) => ['A', 'B', 'C', 'D'][i] + '. ' + opt)
              .join('. ');
          const u = speak(txt);
          if (u) {
            utterRef.current = u;
            setSpeaking(true);
            u.onend = () => setSpeaking(false);
          }
        }
        return next;
      });
    }
  };

  const handleSelect = (i) => {
    if (done || hidden.includes(i)) return;
    SFX.select();
    setSel(i);
  };

  const handleSubmit = () => {
    if (sel === -1 || done) return;
    // NOTE: timer keeps running — do NOT stop it here
    stopSpeech();
    setSpeaking(false);
    SFX.submit();
    setDone(true);
    setTotalQ((t) => t + 1);
    const isCorrect = sel === q.a;
    if (isCorrect) {
      setScore((s) => s + 1);
      setCorrect((c) => c + 1);
      setTimeout(() => SFX.correct(), 100);
      setAnsAnim('correct');
    } else {
      setTimeout(() => SFX.wrong(), 80);
      setAnsAnim('wrong');
    }
    setTimeout(() => setAnsAnim(''), 500);
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = 999;
    }, 200);
  };

  const handleNext = () => {
    stopSpeech();
    setSpeaking(false);
    setSHint(false);
    if (isLast) {
      SFX.roundComplete();
      const finalRounds = Math.ceil(shuffled.length / ROUND_SIZE);
      onAllDone(finalRounds);
      return;
    }
    const nextQi = qi + 1;
    // Powerups (50/50 and Hint) stay disabled for the whole round once used.
    // Only reset them at the round boundary. Hidden options also reset at round boundary.
    if (isRoundEnd) {
      setUF(false);
      setUH(false);
      setHid([]);
      setSHint(false);
    }
    setQi(nextQi);
    setSel(-1);
    setDone(false);
    setAnsAnim('');
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  };

  const doFifty = () => {
    if (usedF || done) return;
    setUF(true);
    SFX.select();
    const wrong = sfl([0, 1, 2, 3].filter((i) => i !== q.a)).slice(0, 2);
    setHid(wrong);
    if (wrong.includes(sel)) setSel(-1);
  };

  const doHint = () => {
    if (usedH || done) return;
    setUH(true);
    setSHint(true);
    SFX.select();
  };

  const tw = timeLeft <= 10;
  const tc = timeLeft <= 10 ? '#FF6B6B' : timeLeft <= 20 ? LGOLD : GOLD;

  const optStyle = (i) => {
    if (hidden.includes(i)) return { display: 'none' };
    let border = `2px solid ${LGRAY}`,
      bg = WHITE,
      color = '#1a0030';
    if (!done && sel === i) {
      border = `2px solid ${meta.color}`;
      bg = meta.bg;
      color = meta.color;
    }
    if (done) {
      if (i === q.a) {
        border = `2px solid ${GREEN}`;
        bg = LGREEN;
        color = GREEN;
      } else if (i === sel && i !== q.a) {
        border = `2px solid ${RED}`;
        bg = LRED;
        color = RED;
      }
    }
    return {
      border,
      background: bg,
      color,
      padding: '11px 13px',
      borderRadius: 11,
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      fontSize: 13,
      fontWeight: 500,
      cursor: done ? 'default' : 'pointer',
      transition: 'all .18s',
      marginBottom: 7,
    };
  };

  const bubStyle = (i) => {
    if (hidden.includes(i)) return { display: 'none' };
    let bg = LGRAY,
      color = GRAY;
    if (!done && sel === i) {
      bg = meta.color;
      color = WHITE;
    }
    if (done && i === q.a) {
      bg = GREEN;
      color = WHITE;
    }
    if (done && i === sel && i !== q.a) {
      bg = RED;
      color = WHITE;
    }
    return {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: bg,
      color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 700,
      flexShrink: 0,
      transition: 'all .18s',
    };
  };

  if (!q) return null;

  return (
    <div className="scr" style={{ background: BG }}>
      <div
        style={{
          background: `linear-gradient(135deg,${DPURP},${
            meta.color || PURPLE
          })`,
          padding: '38px 15px 13px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 7,
          }}
        >
          <button
            onClick={() => {
              stopSpeech();
              stopTimer();
              onHome();
            }}
            style={{
              background: 'rgba(255,255,255,.12)',
              border: 'none',
              borderRadius: 8,
              padding: '5px 11px',
              color: 'rgba(255,255,255,.85)',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            ⌂ Home
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: tc,
                animation: tw ? 'timerPulse .6s infinite' : 'none',
              }}
            >
              ⏱ {timeLeft}s
            </div>
            <div
              style={{
                background: 'rgba(0,0,0,.2)',
                color: LGOLD,
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 14,
              }}
            >
              {correct}/{ROUND_SIZE}
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 10,
            color: 'rgba(255,255,255,.55)',
            marginBottom: 5,
          }}
        >
          <span>
            Q{(qi % ROUND_SIZE) + 1}/{ROUND_SIZE} · {meta.label}
          </span>
          <span>
            Round {roundNum + 1} · {(qi % ROUND_SIZE) + 1}/{ROUND_SIZE}
          </span>
        </div>
        <div
          style={{
            height: 4,
            background: 'rgba(255,255,255,.15)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              background: GOLD,
              borderRadius: 2,
              width: `${(((qi % ROUND_SIZE) + 1) / ROUND_SIZE) * 100}%`,
              transition: 'width .4s ease',
            }}
          />
        </div>
      </div>

      <div
        ref={bodyRef}
        className="scroll"
        style={{
          flex: 1,
          padding: '10px 13px 6px',
          display: 'flex',
          flexDirection: 'column',
          gap: 9,
        }}
      >
        {/* Lifelines — pulse when available, gracefully fade when used */}
        <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
          {/* 50/50 */}
          <button
            onClick={doFifty}
            disabled={done}
            style={{
              flex: 1,
              padding: '8px 8px',
              borderRadius: 10,
              border: usedF ? '1px solid #E5E7EB' : `1.5px solid ${GOLD}`,
              background: usedF ? '#f9f9f9' : WHITE,
              color: usedF ? '#ccc' : DGOLD,
              fontSize: 10,
              fontWeight: 700,
              opacity: usedF ? 0.38 : 1,
              cursor: usedF ? 'not-allowed' : 'pointer',
              animation: usedF
                ? 'fadeUsed .4s ease forwards'
                : 'powerGlow 2s ease-in-out infinite',
              transition: 'opacity .4s, border .3s, background .3s',
            }}
          >
            ⚖️ 50/50
          </button>

          {/* Hint */}
          <button
            onClick={doHint}
            disabled={done}
            style={{
              flex: 1,
              padding: '8px 8px',
              borderRadius: 10,
              border: usedH ? '1px solid #E5E7EB' : `1.5px solid ${PURPLE}`,
              background: usedH ? '#f9f9f9' : WHITE,
              color: usedH ? '#ccc' : PURPLE,
              fontSize: 10,
              fontWeight: 700,
              opacity: usedH ? 0.38 : 1,
              cursor: usedH ? 'not-allowed' : 'pointer',
              animation: usedH
                ? 'fadeUsed .4s ease forwards'
                : 'powerGlowP 2s ease-in-out infinite',
              transition: 'opacity .4s, border .3s, background .3s',
            }}
          >
            💡 Hint
          </button>

          {/* Voice toggle */}
          <button
            onClick={toggleVoice}
            style={{
              flex: 1,
              padding: '8px 8px',
              borderRadius: 10,
              border: `1.5px solid ${voiceEnabled ? GREEN : GRAY}`,
              background: voiceEnabled ? LGREEN : WHITE,
              color: voiceEnabled ? GREEN : GRAY,
              fontSize: 10,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .25s',
            }}
          >
            {speaking ? '🔊 Stop' : voiceEnabled ? '🔊 On' : '🔊 Off'}
          </button>
        </div>

        {showHint && (
          <div
            className="su"
            style={{
              background: '#FFFBEB',
              border: `1px solid ${GOLD}`,
              borderRadius: 11,
              padding: '9px 13px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: DGOLD,
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              HINT
            </div>
            <div style={{ fontSize: 12, color: '#78350F', lineHeight: 1.55 }}>
              {q.h}
            </div>
          </div>
        )}

        {/* Question card with animation class */}
        <div
          key={qi}
          className={`su ${
            ansAnim === 'correct'
              ? 'correct-pop'
              : ansAnim === 'wrong'
              ? 'wrong-shake'
              : ''
          }`}
          style={{
            background: WHITE,
            borderRadius: 16,
            padding: 15,
            boxShadow: '0 3px 14px rgba(0,0,0,.08)',
            border: `2px solid ${done ? (sel === q.a ? GREEN : RED) : LGRAY}`,
            flexShrink: 0,
            transition: 'border-color .3s',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: meta.color,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Q{qi + 1}
            </div>
            <div
              style={{
                background: `${meta.color}18`,
                color: meta.color,
                fontSize: 9,
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: 12,
              }}
            >
              {q.yr}
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#1a0030',
              lineHeight: 1.55,
              marginBottom: 12,
            }}
          >
            {q.q}
          </div>
          {q.o.map((opt, i) => (
            <div key={i} style={optStyle(i)} onClick={() => handleSelect(i)}>
              <div style={bubStyle(i)}>{['A', 'B', 'C', 'D'][i]}</div>
              <span>{opt}</span>
            </div>
          ))}
        </div>

        {done && (
          <div
            className="su"
            style={{
              background: `linear-gradient(135deg,${DPURP},${PURPLE})`,
              borderRadius: 14,
              padding: '13px 15px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: GOLD,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: 5,
              }}
            >
              QUICK TAKE
            </div>
            <div
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,.88)',
                lineHeight: 1.65,
              }}
            >
              {q.e.split('. ')[0]}.
            </div>
            <div
              onClick={() => setModal(true)}
              style={{
                display: 'inline-block',
                marginTop: 7,
                fontSize: 10,
                fontWeight: 700,
                color: LGOLD,
                border: '1px solid rgba(212,175,55,.4)',
                padding: '3px 11px',
                borderRadius: 18,
                cursor: 'pointer',
                background: 'rgba(212,175,55,.08)',
              }}
            >
              Read full explanation →
            </div>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div
        style={{
          padding: '9px 13px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          background: BG,
          borderTop: `1px solid ${LGRAY}`,
          flexShrink: 0,
        }}
      >
        {!done && sel !== -1 && (
          <button
            onClick={() => setSel(-1)}
            style={{
              padding: '10px 13px',
              background: WHITE,
              border: `2px solid ${LGRAY}`,
              borderRadius: 11,
              fontSize: 12,
              fontWeight: 600,
              color: GRAY,
            }}
          >
            ✕
          </button>
        )}
        {!done && (
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: '11px 18px',
              background: sel === -1 ? LGRAY : PURPLE,
              border: 'none',
              borderRadius: 11,
              fontSize: 13,
              fontWeight: 700,
              color: sel === -1 ? GRAY : WHITE,
              opacity: sel === -1 ? 0.55 : 1,
              cursor: sel === -1 ? 'not-allowed' : 'pointer',
              boxShadow: sel !== -1 ? '0 4px 14px rgba(75,0,130,.3)' : 'none',
            }}
          >
            Submit Answer
          </button>
        )}
        {done && (
          <button
            onClick={handleNext}
            style={{
              marginLeft: 'auto',
              padding: '11px 20px',
              background: GOLD,
              border: 'none',
              borderRadius: 11,
              fontSize: 13,
              fontWeight: 700,
              color: DPURP,
              boxShadow: '0 4px 14px rgba(212,175,55,.4)',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            {isLastQ
              ? 'Final Results →'
              : isRoundEnd
              ? 'See Results →'
              : 'Next →'}
          </button>
        )}
      </div>

      {modal && (
        <div
          onClick={(e) => e.target === e.currentTarget && setModal(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,.6)',
            display: 'flex',
            alignItems: 'flex-end',
            zIndex: 100,
          }}
        >
          <div
            className="su"
            style={{
              background: WHITE,
              borderRadius: '26px 26px 0 0',
              padding: '24px 22px 32px',
              width: '100%',
              maxHeight: '82%',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div
              style={{
                width: 36,
                height: 4,
                background: LGRAY,
                borderRadius: 2,
                margin: '0 auto 18px',
              }}
            />
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: PURPLE,
                marginBottom: 6,
              }}
            >
              💡 Full Explanation
            </div>
            <div
              style={{
                fontSize: 12,
                color: GRAY,
                lineHeight: 1.55,
                marginBottom: 14,
                paddingBottom: 12,
                borderBottom: `1px solid ${LGRAY}`,
                fontStyle: 'italic',
              }}
            >
              {q.q}
            </div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: GOLD,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              WHY THIS ANSWER?
            </div>
            <div style={{ fontSize: 13, color: '#1a0030', lineHeight: 1.85 }}>
              {(q.full || q.e)
                .split('\n')
                .filter((l) => l.trim())
                .map((para, i) => (
                  <p key={i} style={{ marginBottom: 12 }}>
                    {para}
                  </p>
                ))}
            </div>
            <div
              style={{
                marginTop: 14,
                background: `${meta.color}12`,
                border: `1px solid ${meta.color}30`,
                borderRadius: 10,
                padding: '10px 14px',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: meta.color,
                  letterSpacing: 1,
                  marginBottom: 4,
                }}
              >
                CORRECT ANSWER
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a0030' }}>
                {['A', 'B', 'C', 'D'][q.a]}. {q.o[q.a]}
              </div>
            </div>
            <button
              onClick={() => setModal(false)}
              style={{
                width: '100%',
                padding: 13,
                background: PURPLE,
                border: 'none',
                borderRadius: 11,
                fontSize: 13,
                fontWeight: 700,
                color: WHITE,
              }}
            >
              Got it ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Score Card ─────────────────────────────────────────────────────────────
function ScoreCard({ name, subjectId, score, correct, totalQ, onClose }) {
  const meta = SUBJ[subjectId] || SUBJ.economics;
  const pct = totalQ ? Math.round((correct / totalQ) * 100) : 0;
  const wrong = totalQ - correct;
  const grade =
    pct >= 80
      ? {
          emoji: '🏆',
          label: 'ELITE',
          ac: '#F59E0B',
          bg: 'rgba(245,158,11,.18)',
        }
      : pct >= 60
      ? { emoji: '⭐', label: 'SHARP', ac: GOLD, bg: 'rgba(212,175,55,.18)' }
      : pct >= 40
      ? {
          emoji: '💪',
          label: 'RISING',
          ac: '#06B6D4',
          bg: 'rgba(6,182,212,.18)',
        }
      : {
          emoji: '📚',
          label: 'LEARNING',
          ac: LGOLD,
          bg: 'rgba(255,235,130,.12)',
        };
  const pidginMessages = {
    elite: [
      `${name} e choke!! 🔥 No be every person fit score like this — you be different breed!`,
      `Omo! ${name} don enter another level! This score na pure W, no cap!`,
      `${name} you sabi well well 😭 300+ dey your corner, no be joke!`,
      `E don cast for your mates 💥 ${name} na real idan for this JAMB matter!`,
      `No gree for anybody!! ${name} just proved say the bag secured 🏆`,
    ],
    sharp: [
      `${name} you dey gbadun!! Score like this no be beans — continue like this!`,
      `Oya ${name}, the momentum dey! Few more rounds and e go e choke!`,
      `${name} you sabi o — just small gyara and 300+ don fall for your hand!`,
      `W energy dey here! ${name} keep this vibe, the sapa wan run comot!`,
      `${name} this one na sharp guy move — your mates still dey sleep 😂`,
    ],
    rising: [
      `${name} you don start o! Small small e go reach top — no stop now!`,
      `Oya manage this score for now ${name}, but know say better dey come!`,
      `${name} the hustle dey show — keep reading the explanations, them go help!`,
      `Yakubu manage!! 😂 But for real ${name} — you dey try, continue!`,
      `${name} this na your beginning — great JAMB scores take practise, keep going!`,
    ],
    learning: [
      `${name} no vex — everybody start from somewhere! Review every explanation 📖`,
      `Omo ${name} the wahala no finish yet 😂 but e no mean say you no go win!`,
      `${name} this na your L but tomorrow na another day — no gree for sapa!`,
      `E be things ${name} 😭 but your ancestors believe in you — review and retry!`,
      `${name} oblee score but the journey just start — no cast yourself, keep studying!`,
    ],
  };
  const pool =
    pct >= 80
      ? pidginMessages.elite
      : pct >= 60
      ? pidginMessages.sharp
      : pct >= 40
      ? pidginMessages.rising
      : pidginMessages.learning;
  const msg = pool[Math.floor(Math.random() * pool.length)];
  const shareText = `${grade.emoji} ${msg}\n\nI scored ${correct}/${totalQ} (${pct}%) in ${meta.label} on EliteScholars CBT!\n\n🎓 Free JAMB practice at ${APP_URL} — by Elite JAMB & PUTME Clinic`;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: 20,
      }}
    >
      <div
        className="su"
        style={{
          width: '100%',
          maxWidth: 340,
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,.6)',
        }}
      >
        <div
          style={{
            background: `linear-gradient(150deg, #0d001a 0%, ${meta.color}60 55%, #150028 100%)`,
            padding: '24px 22px 18px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 3 + (i % 3),
                height: 3 + (i % 3),
                borderRadius: '50%',
                background: grade.ac,
                opacity: 0.35,
                left: `${10 + i * 11}%`,
                top: `${15 + Math.sin(i) * 30}%`,
              }}
            />
          ))}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
              position: 'relative',
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,.38)',
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              EliteScholars CBT
            </div>
            <div
              style={{
                background: grade.bg,
                border: `1px solid ${grade.ac}`,
                color: grade.ac,
                fontSize: 10,
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: 20,
                letterSpacing: 1,
              }}
            >
              {grade.label}
            </div>
          </div>
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: 40, marginBottom: 2 }}>{grade.emoji}</div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: grade.ac,
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              {pct}
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 0 }}>
                %
              </span>
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'rgba(255,255,255,.6)',
                marginTop: 2,
              }}
            >
              {correct} / {totalQ} correct
            </div>
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: 14,
              paddingTop: 14,
              borderTop: '1px solid rgba(255,255,255,.1)',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 800, color: WHITE }}>
              {name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,.4)',
                marginTop: 2,
              }}
            >
              {meta.icon} {meta.label} · JAMB Practice
            </div>
          </div>
        </div>
        <div
          style={{
            background: '#110020',
            display: 'flex',
            borderTop: '1px solid rgba(255,255,255,.06)',
          }}
        >
          {[
            ['✅', correct, 'Correct', GREEN],
            ['❌', wrong, 'Wrong', RED],
            ['🏅', score, 'Points', grade.ac],
          ].map(([ico, v, l, c]) => (
            <div
              key={l}
              style={{
                flex: 1,
                padding: '13px 8px',
                textAlign: 'center',
                borderRight:
                  l !== 'Points' ? '1px solid rgba(255,255,255,.06)' : 'none',
              }}
            >
              <div style={{ fontSize: 10, marginBottom: 3 }}>{ico}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: c }}>{v}</div>
              <div
                style={{
                  fontSize: 9,
                  color: 'rgba(255,255,255,.3)',
                  marginTop: 2,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: '#0d0018',
            padding: '13px 20px',
            borderTop: '1px solid rgba(255,255,255,.06)',
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,.5)',
              lineHeight: 1.65,
              fontStyle: 'italic',
              textAlign: 'center',
            }}
          >
            "{msg}"
          </div>
        </div>
        <div
          style={{
            background: '#0a0015',
            padding: '14px 18px 18px',
            borderTop: '1px solid rgba(255,255,255,.06)',
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: 'rgba(255,255,255,.2)',
              textAlign: 'center',
              marginBottom: 11,
              letterSpacing: 1,
            }}
          >
            {APP_URL}
          </div>
          <button
            onClick={() => {
              window.open(
                `https://wa.me/?text=${encodeURIComponent(shareText)}`,
                '_blank'
              );
              onClose();
            }}
            style={{
              width: '100%',
              padding: 13,
              background: '#25D366',
              border: 'none',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 700,
              color: WHITE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 9,
            }}
          >
            📤 Share My Score Card
          </button>
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: 10,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: 12,
              fontSize: 12,
              color: 'rgba(255,255,255,.32)',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Result ─────────────────────────────────────────────────────────────────
function Result({
  name,
  subjectId,
  score,
  correct,
  totalQ,
  totalSessions,
  onHome,
  onProfile,
}) {
  const [showCard, setShowCard] = useState(false);
  const [shared, setShared] = useState(false);
  const [sharing, setSharing] = useState(false); // true = waiting 30s
  const [countdown, setCountdown] = useState(30);
  const meta = SUBJ[subjectId] || SUBJ.economics;
  const pct = totalQ ? Math.round((correct / totalQ) * 100) : 0;
  const wrong = totalQ - correct;

  // Core logic — all driven by totalSessions (lifetime quiz count)
  const needShare = totalSessions > 0 && totalSessions % SHARE_GATE_EVERY === 0;
  const showGroup = !needShare && totalSessions % 2 === 1;
  const showChannel = !needShare && totalSessions % 2 === 0;

  const msgs = [
    [80, "Excellent! You're in the top league. 300+ is within reach."],
    [60, "Good work! A bit more practice and you're unstoppable."],
    [40, 'Not bad. Review the explanations and come back.'],
    [0, "Every session makes you sharper. Don't stop."],
  ];
  const msg = msgs.find(([t]) => pct >= t)[1];
  const vibes = [
    'Your brain is literally built different right now. Keep this energy!',
    'Every question you answered just moved you closer to your dream school.',
    "This is what serious JAMB students look like. You're on the right track.",
    "Okay — this performance is not regular. You're in Elite territory.",
    'Your ancestors looked down and smiled at that session. Facts.',
  ];
  const vibe = vibes[Math.floor(Math.random() * vibes.length)];
  const waShareText = shareMsg(name, meta.label, correct, totalQ);

  // Countdown timer — runs for 30s after share is tapped
  useEffect(() => {
    if (!sharing) return;
    if (countdown <= 0) {
      setShared(true);
      setSharing(false);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [sharing, countdown]);

  const doShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(waShareText)}`,
      '_blank'
    );
    setSharing(true);
    setCountdown(30);
  };

  const dots = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    l: Math.random() * 100,
    t: Math.random() * 25 + 5,
    c: [GOLD, LGOLD, WHITE, PURPLE, GREEN][i % 5],
    s: 4 + Math.random() * 8,
    d: Math.random() * 2,
    dur: 2 + Math.random() * 2,
  }));

  useEffect(() => {
    setTimeout(() => SFX.roundComplete(), 400);
  }, []);

  return (
    <div className="scr fd" style={{ background: BG }}>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg,${DPURP},${
            meta.color || PURPLE
          })`,
          padding: '40px 20px 62px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {dots.map((d) => (
          <div
            key={d.id}
            style={{
              position: 'absolute',
              left: `${d.l}%`,
              top: `${d.t}%`,
              width: d.s,
              height: d.s,
              borderRadius: '50%',
              background: d.c,
              animation: `fall ${d.dur}s ease-in-out infinite`,
              animationDelay: `${d.d}s`,
            }}
          />
        ))}
        <div
          style={{
            width: 108,
            height: 108,
            borderRadius: '50%',
            background: 'rgba(255,255,255,.1)',
            border: `3px solid ${GOLD}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: '0 0 32px rgba(212,175,55,.3)',
            position: 'relative',
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 900, color: GOLD }}>
            {correct}/{totalQ}
          </div>
          <div
            style={{
              fontSize: 9,
              color: 'rgba(255,255,255,.55)',
              letterSpacing: 1,
            }}
          >
            FINAL SCORE
          </div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: WHITE }}>
          {name}!
        </div>
        <div
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,.7)',
            marginTop: 4,
            lineHeight: 1.5,
          }}
        >
          {msg}
        </div>
      </div>

      <div
        className="scroll"
        style={{ flex: 1, padding: '0 16px 20px', marginTop: -18 }}
      >
        {/* Stats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[
            ['Correct', correct],
            ['Wrong', wrong],
            ['Points', score],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                flex: 1,
                background: WHITE,
                borderRadius: 13,
                padding: '12px 9px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,.06)',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: PURPLE }}>
                {v}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: GRAY,
                  marginTop: 1,
                  fontWeight: 600,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>

        {/* Score card — always visible */}
        <button
          onClick={() => {
            SFX.select();
            setShowCard(true);
          }}
          style={{
            width: '100%',
            padding: '13px 16px',
            background: `linear-gradient(135deg,${meta.color},${DPURP})`,
            border: 'none',
            borderRadius: 13,
            fontSize: 13,
            fontWeight: 700,
            color: WHITE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            marginBottom: 12,
            boxShadow: `0 6px 16px ${meta.color}40`,
          }}
        >
          🖼️ Show Friends Your Score Card
        </button>

        {/* ── SHARE GATE (every SHARE_GATE_EVERY quizzes) ──────────────────── */}
        {needShare && (
          <div
            style={{
              background: `linear-gradient(135deg,${DPURP},#3d0070)`,
              borderRadius: 16,
              padding: '16px 18px',
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: GOLD,
                letterSpacing: 1.5,
                marginBottom: 6,
              }}
            >
              ✨ FROM ELITE JAMB
            </div>
            <div
              style={{
                fontSize: 12,
                color: WHITE,
                lineHeight: 1.65,
                marginBottom: 12,
                fontStyle: 'italic',
              }}
            >
              "{vibe}"
            </div>
            {!shared && !sharing ? (
              <>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,.55)',
                    marginBottom: 10,
                    lineHeight: 1.5,
                  }}
                >
                  Share your progress with friends on WhatsApp to unlock the
                  next round 🔥
                </div>
                <button
                  onClick={doShare}
                  style={{
                    width: '100%',
                    padding: 14,
                    background: '#25D366',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    color: WHITE,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 9,
                    boxShadow: '0 6px 18px rgba(37,211,102,.4)',
                    marginBottom: 10,
                  }}
                >
                  💬 Share to WhatsApp Friends
                </button>
                <div style={{ position: 'relative' }}>
                  <button
                    disabled
                    style={{
                      width: '100%',
                      padding: 13,
                      background: 'rgba(255,255,255,.08)',
                      border: '1px solid rgba(255,255,255,.12)',
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'rgba(255,255,255,.3)',
                      cursor: 'not-allowed',
                    }}
                  >
                    🔄 Play Again
                  </button>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,.35)',
                      textAlign: 'center',
                      marginTop: 6,
                    }}
                  >
                    Share first to unlock →
                  </div>
                </div>
              </>
            ) : sharing ? (
              <>
                <div
                  style={{
                    background: 'rgba(37,211,102,.1)',
                    border: '1px solid rgba(37,211,102,.3)',
                    borderRadius: 11,
                    padding: '13px 14px',
                    textAlign: 'center',
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#4ade80',
                      marginBottom: 4,
                    }}
                  >
                    ✅ Nice! Verifying your share...
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'rgba(255,255,255,.45)',
                      lineHeight: 1.5,
                    }}
                  >
                    Play Again unlocks in{' '}
                    <span style={{ color: GOLD, fontWeight: 700 }}>
                      {countdown}s
                    </span>
                  </div>
                  <div
                    style={{
                      height: 3,
                      background: 'rgba(255,255,255,.1)',
                      borderRadius: 2,
                      marginTop: 10,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        background: GREEN,
                        borderRadius: 2,
                        width: `${((30 - countdown) / 30) * 100}%`,
                        transition: 'width 1s linear',
                      }}
                    />
                  </div>
                </div>
                <button
                  disabled
                  style={{
                    width: '100%',
                    padding: 13,
                    background: 'rgba(255,255,255,.08)',
                    border: '1px solid rgba(255,255,255,.12)',
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,.3)',
                    cursor: 'not-allowed',
                  }}
                >
                  🔄 Play Again ({countdown}s)
                </button>
              </>
            ) : (
              <>
                <div
                  className="su"
                  style={{
                    background: 'rgba(22,163,74,.18)',
                    border: `1px solid ${GREEN}`,
                    borderRadius: 11,
                    padding: '11px 14px',
                    textAlign: 'center',
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}
                  >
                    ✅ Shared! Your friends are about to thank you.
                  </div>
                </div>
                {/* Play Again now unlocked */}
                <button
                  onClick={onHome}
                  style={{
                    width: '100%',
                    padding: 14,
                    background: GOLD,
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    color: DPURP,
                    boxShadow: '0 6px 18px rgba(212,175,55,.4)',
                  }}
                >
                  🔄 Play Again
                </button>
              </>
            )}
          </div>
        )}

        {/* ── JOIN GROUP (odd sessions, no share gate) ──────────────────────── */}
        {showGroup && (
          <div
            style={{
              background: `linear-gradient(135deg,${DPURP},${PURPLE})`,
              borderRadius: 16,
              padding: 16,
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: WHITE,
                marginBottom: 4,
              }}
            >
              Join Our WhatsApp Group 💬
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,.55)',
                marginBottom: 12,
              }}
            >
              Practise with other serious JAMB students daily.
            </div>
            <button
              onClick={() => window.open(WA_GROUP, '_blank')}
              style={{
                width: '100%',
                padding: 12,
                background: '#25D366',
                border: 'none',
                borderRadius: 11,
                fontSize: 13,
                fontWeight: 700,
                color: WHITE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 7,
                marginBottom: 8,
              }}
            >
              💬 Join WhatsApp Group
            </button>
            <button
              onClick={onHome}
              style={{
                width: '100%',
                padding: 12,
                background: 'rgba(255,255,255,.1)',
                border: '1px solid rgba(255,255,255,.16)',
                borderRadius: 11,
                fontSize: 13,
                fontWeight: 700,
                color: WHITE,
              }}
            >
              🔄 Play Again
            </button>
          </div>
        )}

        {/* ── JOIN CHANNEL (even sessions, no share gate) ───────────────────── */}
        {showChannel && (
          <div
            style={{
              background: `linear-gradient(135deg,${DPURP},${PURPLE})`,
              borderRadius: 16,
              padding: 16,
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: WHITE,
                marginBottom: 4,
              }}
            >
              Follow Our WhatsApp Channel 📲
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,.55)',
                marginBottom: 12,
              }}
            >
              Daily questions, tips &amp; serious JAMB community.
            </div>
            <button
              onClick={() => window.open(WA_CHANNEL, '_blank')}
              style={{
                width: '100%',
                padding: 12,
                background: '#25D366',
                border: 'none',
                borderRadius: 11,
                fontSize: 13,
                fontWeight: 700,
                color: WHITE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 7,
                marginBottom: 8,
              }}
            >
              📢 Follow Elite JAMB Channel
            </button>
            <button
              onClick={onHome}
              style={{
                width: '100%',
                padding: 12,
                background: 'rgba(255,255,255,.1)',
                border: '1px solid rgba(255,255,255,.16)',
                borderRadius: 11,
                fontSize: 13,
                fontWeight: 700,
                color: WHITE,
              }}
            >
              🔄 Play Again
            </button>
          </div>
        )}

        <button
          onClick={onProfile}
          style={{
            width: '100%',
            padding: 13,
            background: WHITE,
            border: `2px solid ${PURPLE}`,
            borderRadius: 13,
            fontSize: 13,
            fontWeight: 700,
            color: PURPLE,
            marginBottom: 8,
          }}
        >
          📊 View My Profile
        </button>
        <button
          onClick={onHome}
          style={{
            width: '100%',
            padding: 12,
            background: BG,
            border: `1px solid ${LGRAY}`,
            borderRadius: 13,
            fontSize: 12,
            fontWeight: 600,
            color: GRAY,
          }}
        >
          ⌂ Back to Main Menu
        </button>
      </div>

      {showCard && (
        <ScoreCard
          name={name}
          subjectId={subjectId}
          score={score}
          correct={correct}
          totalQ={totalQ}
          onClose={() => setShowCard(false)}
        />
      )}
      <div style={{ height: 20, background: BG, flexShrink: 0 }} />
    </div>
  );
}

// ── Profile ────────────────────────────────────────────────────────────────
function Profile({
  name,
  email,
  sessions,
  streak,
  allScores,
  bestScore,
  onBack,
  onSignOut,
}) {
  const initials = name ? name.slice(0, 2).toUpperCase() : 'ME';
  const avg = allScores.length
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;
  const rank =
    bestScore >= 38
      ? '🏆 Elite Scholar'
      : bestScore >= 30
      ? '⭐ Rising Star'
      : bestScore >= 20
      ? '📚 Sharp Guy'
      : '🌱 Beginner';
  const topSubj = 'Consistent'; // can be enhanced later with per-subject tracking
  return (
    <div className="scr fd" style={{ background: BG }}>
      <div
        style={{
          background: `linear-gradient(135deg,${DPURP},${PURPLE})`,
          padding: '44px 20px 68px',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: -20,
            left: 0,
            right: 0,
            height: 40,
            background: BG,
            borderRadius: '24px 24px 0 0',
          }}
        />
        <div
          onClick={onBack}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'rgba(255,255,255,.5)',
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          ← Back
        </div>
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: '50%',
            background: GOLD,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 800,
            color: DPURP,
            margin: '0 auto 10px',
            border: '3px solid rgba(255,255,255,.22)',
          }}
        >
          {initials}
        </div>
        <div
          style={{
            fontSize: 19,
            fontWeight: 800,
            color: WHITE,
            textAlign: 'center',
          }}
        >
          {name || 'Student'}
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,.4)',
            textAlign: 'center',
            marginTop: 2,
          }}
        >
          {email}
        </div>
        <div
          style={{
            display: 'flex',
            gap: 7,
            justifyContent: 'center',
            marginTop: 10,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: '4px 11px',
              borderRadius: 20,
              background: 'rgba(212,175,55,.2)',
              border: `1px solid ${GOLD}`,
              color: LGOLD,
            }}
          >
            🔥 {streak} Day{streak !== 1 ? 's' : ''} Streak
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: '4px 11px',
              borderRadius: 20,
              background: 'rgba(255,255,255,.1)',
              border: '1px solid rgba(255,255,255,.2)',
              color: WHITE,
            }}
          >
            {rank}
          </div>
        </div>
      </div>
      <div
        className="scroll"
        style={{
          flex: 1,
          padding: '28px 16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 11,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: GRAY,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          Your Stats
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}
        >
          {[
            ['Quizzes Done', sessions || 0],
            ['Avg Score', avg + '%'],
            ['Best Score', bestScore + '/' + ROUND_SIZE],
            ['Streak', streak + ' days'],
          ].map(([l, v]) => (
            <div
              key={l}
              style={{
                background: WHITE,
                borderRadius: 13,
                padding: '13px 12px',
                boxShadow: '0 2px 10px rgba(0,0,0,.06)',
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>
                {v}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: GRAY,
                  marginTop: 2,
                  fontWeight: 600,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: `linear-gradient(135deg,${DPURP},${PURPLE})`,
            borderRadius: 13,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 28 }}>🔥</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: GOLD }}>
              {streak}-Day Streak
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,.55)',
                marginTop: 1,
              }}
            >
              Come back daily to keep it alive!
            </div>
          </div>
        </div>
        <button
          onClick={onSignOut}
          style={{
            padding: 13,
            background: 'transparent',
            border: '1px solid rgba(220,38,38,.35)',
            borderRadius: 13,
            fontSize: 13,
            fontWeight: 700,
            color: '#DC2626',
          }}
        >
          ↩ Sign Out
        </button>
      </div>
      <div style={{ height: 20, background: BG, flexShrink: 0 }} />
    </div>
  );
}

// ── Share Gate Screen ──────────────────────────────────────────────────────
function ShareGate({ name, email, onUnlocked }) {
  const [sharing, setSharing] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [done, setDone] = useState(false);

  const shareText = `I'm seriously preparing for JAMB on EliteScholars CBT! 🔥\n\nFree practice at ${APP_URL} — come join me!`;

  useEffect(() => {
    if (!sharing) return;
    if (countdown <= 0) {
      setDone(true);
      setSharing(false);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [sharing, countdown]);

  const doShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      '_blank'
    );
    setSharing(true);
    setCountdown(30);
    try {
      if (email) localStorage.removeItem(`ep_sharepending_${email}`);
    } catch {}
  };

  const vibes = [
    'Your brain is literally built different right now. Keep this energy!',
    'Every question you answer moves you closer to your dream school.',
    "This is what serious JAMB students look like. You're on the right track.",
    'Your ancestors looked down and smiled at that session. Facts.',
  ];
  const vibe = vibes[Math.floor(Math.random() * vibes.length)];

  return (
    <div
      className="scr fd"
      style={{
        background: 'linear-gradient(160deg,#1a0030,#4B0082,#1a0030)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        gap: 0,
      }}
    >
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* Icon */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>📤</div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: WHITE,
              lineHeight: 1.2,
            }}
          >
            Unlock Your Next Round
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,.55)',
              marginTop: 8,
              lineHeight: 1.65,
            }}
          >
            Share EliteScholars with your friends on WhatsApp to keep playing.
            It takes 5 seconds. 🔥
          </div>
        </div>

        {/* Vibe quote */}
        <div
          style={{
            background: 'rgba(212,175,55,.1)',
            border: '1px solid rgba(212,175,55,.25)',
            borderRadius: 14,
            padding: '13px 16px',
            marginBottom: 22,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: GOLD,
              letterSpacing: 1.5,
              marginBottom: 6,
            }}
          >
            ✨ FROM ELITE JAMB
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,.75)',
              fontStyle: 'italic',
              lineHeight: 1.65,
            }}
          >
            "{vibe}"
          </div>
        </div>

        {!done ? (
          <>
            {/* Share button */}
            <button
              onClick={doShare}
              disabled={sharing}
              style={{
                width: '100%',
                padding: 15,
                background: sharing ? 'rgba(37,211,102,.5)' : '#25D366',
                border: 'none',
                borderRadius: 13,
                fontSize: 14,
                fontWeight: 700,
                color: WHITE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 9,
                boxShadow: sharing ? 'none' : '0 6px 18px rgba(37,211,102,.4)',
                marginBottom: 12,
                cursor: sharing ? 'default' : 'pointer',
              }}
            >
              💬{' '}
              {sharing
                ? `Verifying... ${countdown}s`
                : 'Share to WhatsApp Friends'}
            </button>

            {/* Progress bar while waiting */}
            {sharing && (
              <div
                style={{
                  height: 4,
                  background: 'rgba(255,255,255,.1)',
                  borderRadius: 2,
                  marginBottom: 16,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: GREEN,
                    borderRadius: 2,
                    width: `${((30 - countdown) / 30) * 100}%`,
                    transition: 'width 1s linear',
                  }}
                />
              </div>
            )}

            {/* Locked play button */}
            <button
              disabled
              style={{
                width: '100%',
                padding: 14,
                background: 'rgba(255,255,255,.06)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 13,
                fontSize: 14,
                fontWeight: 700,
                color: 'rgba(255,255,255,.25)',
                cursor: 'not-allowed',
              }}
            >
              🔒 Start Quiz — Share First
            </button>
          </>
        ) : (
          // Unlocked
          <div className="su">
            <div
              style={{
                background: 'rgba(22,163,74,.18)',
                border: `1px solid ${GREEN}`,
                borderRadius: 13,
                padding: '13px 16px',
                textAlign: 'center',
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#4ade80',
                  marginBottom: 3,
                }}
              >
                ✅ Unlocked! Your friends are going to love this.
              </div>
            </div>
            <button
              onClick={onUnlocked}
              style={{
                width: '100%',
                padding: 15,
                background: GOLD,
                border: 'none',
                borderRadius: 13,
                fontSize: 15,
                fontWeight: 700,
                color: DPURP,
                boxShadow: '0 8px 22px rgba(212,175,55,.4)',
              }}
            >
              🚀 Start Quiz Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Root App ───────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('splash');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('english');
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [totalQ, setTotalQ] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [allScores, setAllScores] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [fromResult, setFromResult] = useState(false);
  const [pendingSubject, setPendingSubject] = useState('english');
  const [streak, setStreak] = useState(1);
  const [lastDate, setLastDate] = useState('');

  useEffect(() => {
    const u = loadUser();
    if (u.name) {
      setName(u.name);
      setEmail(u.email || '');
    }
    const s = loadStats(u.email);
    if (s.sessions) setSessions(s.sessions);
    if (s.allScores) setAllScores(s.allScores);
    if (s.bestScore) setBestScore(s.bestScore);
    if (s.streak) setStreak(s.streak);
    if (s.lastDate) setLastDate(s.lastDate);
  }, []);

  const calcStreak = (currentStreak, lastDate) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (!lastDate) return 1;
    if (lastDate === today) return currentStreak; // already played today, no change
    if (lastDate === yesterday) return currentStreak + 1; // played yesterday → extend
    return 1; // missed a day → reset to 1
  };

  const persist = (ns, nsc, nb, streak, lastDate) =>
    saveStats(
      { sessions: ns, allScores: nsc, bestScore: nb, streak, lastDate },
      email
    );

  const goHome = () => {
    stopSpeech();
    setScreen('subjects');
  };

  const handleSplash = () => {
    const u = loadUser();
    if (u.name) {
      setName(u.name);
      setEmail(u.email || '');
      const s = loadStats(u.email);
      if (s.sessions) setSessions(s.sessions);
      if (s.allScores) setAllScores(s.allScores);
      if (s.bestScore) setBestScore(s.bestScore);
      if (s.streak) setStreak(s.streak);
      if (s.lastDate) setLastDate(s.lastDate);
      setScreen('subjects');
    } else setScreen('onboard');
  };

  const startQuiz = (sel) => {
    // Check if user owes a share before playing
    try {
      const pending = localStorage.getItem(`ep_sharepending_${email}`);
      if (pending) {
        setPendingSubject(sel);
        setScreen('sharegate');
        return;
      }
    } catch {}
    setSubject(sel);
    setScore(0);
    setCorrect(0);
    setTotalQ(0);
    setRoundsPlayed(0);
    trackEvent('quiz_start', {
      name,
      email,
      subject: sel,
      timestamp2: fmtTimestamp(),
      ...getDeviceInfo(),
    });
    setScreen('ready');
  };

  const handleAllDone = (finalRoundsPlayed) => {
    const pct = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;
    const ns = sessions + 1;
    const nsc = [...allScores, pct];
    const nb = Math.max(bestScore, score);
    const today = new Date().toDateString();
    const newStreak = calcStreak(streak, lastDate);
    setSessions(ns);
    setAllScores(nsc);
    setBestScore(nb);
    setStreak(newStreak);
    setLastDate(today);
    persist(ns, nsc, nb, newStreak, today);
    if (ns % SHARE_GATE_EVERY === 0) {
      try {
        localStorage.setItem(`ep_sharepending_${email}`, ns.toString());
      } catch {}
    }
    setRoundsPlayed(finalRoundsPlayed);
    setRoundsPlayed(finalRoundsPlayed);
    trackEvent('quiz_complete', {
      name,
      email,
      subject,
      score,
      correct,
      totalQ,
      pct: pct + '%',
      rounds: finalRoundsPlayed,
      totalSessions: ns,
      timestamp2: fmtTimestamp(),
    });
    setScreen('result');
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="phone">
        {screen === 'splash' && <Splash onDone={handleSplash} />}
        {screen === 'onboard' && (
          <Onboard
            onDone={(n, e) => {
              setName(n);
              setEmail(e);
              const s = loadStats(e);
              if (s.sessions) setSessions(s.sessions);
              if (s.allScores) setAllScores(s.allScores);
              if (s.bestScore) setBestScore(s.bestScore);
              if (s.streak) setStreak(s.streak);
              if (s.lastDate) setLastDate(s.lastDate);
              setScreen('subjects');
            }}
          />
        )}
        {screen === 'subjects' && (
          <Subjects
            name={name}
            onStart={startQuiz}
            onProfile={() => {
              setFromResult(false);
              setScreen('profile');
            }}
            onSignOut={() => {
              stopSpeech();
              localStorage.removeItem('ep_user');
              // ep_stats_<email> is kept so progress is restored on next login
              setName('');
              setEmail('');
              setSessions(0);
              setAllScores([]);
              setBestScore(0);
              setStreak(1);
              setLastDate('');
              setScreen('onboard');
            }}
          />
        )}

        {screen === 'sharegate' && (
          <ShareGate
            name={name}
            email={email}
            onUnlocked={() => {
              setSubject(pendingSubject);
              setScore(0);
              setCorrect(0);
              setTotalQ(0);
              setRoundsPlayed(0);
              trackEvent('quiz_start', {
                name,
                email,
                subject: pendingSubject,
                timestamp2: fmtTimestamp(),
                ...getDeviceInfo(),
              });
              setScreen('ready');
            }}
          />
        )}

        {screen === 'ready' && (
          <Ready
            subjectId={subject}
            onGo={() => setScreen('quiz')}
            onBack={goHome}
          />
        )}
        {screen === 'quiz' && (
          <Quiz
            subjectId={subject}
            onAllDone={handleAllDone}
            score={score}
            setScore={setScore}
            correct={correct}
            setCorrect={setCorrect}
            totalQ={totalQ}
            setTotalQ={setTotalQ}
            onHome={goHome}
          />
        )}
        {screen === 'result' && (
          <Result
            name={name}
            subjectId={subject}
            score={score}
            correct={correct}
            totalQ={totalQ}
            totalSessions={sessions}
            onHome={goHome}
            onProfile={() => {
              setFromResult(true);
              setScreen('profile');
            }}
          />
        )}
        {screen === 'profile' && (
          <Profile
            name={name}
            email={email}
            sessions={sessions}
            streak={streak}
            allScores={allScores}
            bestScore={bestScore}
            onBack={() => setScreen(fromResult ? 'result' : 'subjects')}
            onPlay={goHome}
            onSignOut={() => {
              stopSpeech();
              localStorage.removeItem('ep_user');
              setName('');
              setEmail('');
              setSessions(0);
              setAllScores([]);
              setBestScore(0);
              setStreak(1);
              setLastDate('');
              setScreen('onboard');
            }}
          />
        )}
      </div>
    </>
  );
}
