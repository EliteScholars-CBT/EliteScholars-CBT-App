export const WAEC_MATHEMATICS = [
  {
    q: "Simplify: log₁₀ 1000",
    o: ["1", "2", "3", "4"],
    a: 2,
    e: "log₁₀ 1000 = log₁₀ 10³ = 3.",
    h: "How many times must you raise 10 to get 1000?",
    yr: "2023",
  },
  {
    q: "Find the gradient of the line 3y = 6x + 9.",
    o: ["2", "3", "6", "9"],
    a: 0,
    e: "Divide through by 3: y = 2x + 3. The gradient (slope) is the coefficient of x, which is 2.",
    h: "Rearrange to y = mx + c form.",
    yr: "2022",
  },
  {
    q: "A bag contains 4 red and 6 blue balls. What is the probability of picking a red ball?",
    o: ["2/5", "3/5", "1/4", "2/3"],
    a: 0,
    e: "P(red) = 4/(4+6) = 4/10 = 2/5.",
    h: "Probability = favourable outcomes ÷ total outcomes.",
    yr: "2023",
  },
  {
    q: "Evaluate: 5! (5 factorial)",
    o: ["20", "60", "100", "120"],
    a: 3,
    e: "5! = 5 × 4 × 3 × 2 × 1 = 120.",
    h: "Multiply all integers from 1 to 5.",
    yr: "2021",
  },
  {
    q: "The sum of angles in a triangle is:",
    o: ["90°", "180°", "270°", "360°"],
    a: 1,
    e: "The interior angles of any triangle always add up to 180°.",
    h: "Basic geometry rule.",
    yr: "2022",
  },
];

export const WAEC_MATHEMATICS_LEARN = [
  {
    topic: "Number Bases",
    content: "Numbers can be written in any base. Base 2 (binary) uses only 0 and 1. Base 8 (octal) uses 0–7. Base 16 (hexadecimal) uses 0–9 and A–F. To convert from base n to base 10, multiply each digit by n raised to its position power and sum the results.",
  },
  {
    topic: "Logarithms",
    content: "log_b(x) = y means b^y = x. Key rules: log(AB) = log A + log B; log(A/B) = log A – log B; log(A^n) = n log A. log₁₀ is the common log; ln is the natural log (base e ≈ 2.718).",
  },
  {
    topic: "Quadratic Equations",
    content: "ax² + bx + c = 0. Solve by: (1) Factorisation — find two numbers that multiply to ac and add to b. (2) Quadratic formula: x = (–b ± √(b²–4ac)) / 2a. (3) Completing the square. The discriminant b²–4ac tells you the nature of roots.",
  },
  {
    topic: "Probability",
    content: "P(event) = number of favourable outcomes / total possible outcomes. P(A or B) = P(A) + P(B) – P(A and B). P(A and B) = P(A) × P(B) for independent events. The sum of all probabilities in a sample space equals 1.",
  },
  {
    topic: "Mensuration",
    content: "Circle: Area = πr², Circumference = 2πr. Triangle: Area = ½ × base × height. Rectangle: Area = length × width. Cylinder: Volume = πr²h, Curved surface = 2πrh. Cone: Volume = ⅓πr²h. Sphere: Volume = 4/3πr³.",
  },
];
