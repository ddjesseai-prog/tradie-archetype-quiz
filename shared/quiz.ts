import type { ArchetypeId } from "./archetypes";

export type QuestionType = "multiple_choice" | "likert";

export interface QuizOption {
  id: string;
  text: string;
  weights: Partial<Record<ArchetypeId, number>>;
}

export interface QuizQuestion {
  id: string;
  number: number;
  category: string;
  text: string;
  type: QuestionType;
  options: QuizOption[];
}

// Likert scale labels
export const LIKERT_LABELS = [
  "Strongly disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly agree",
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ─── WORK STYLE ───────────────────────────────────────────────
  {
    id: "q1",
    number: 1,
    category: "Work Style",
    text: "When you finish a job, what matters most to you?",
    type: "multiple_choice",
    options: [
      {
        id: "q1a",
        text: "That every detail is exactly right — even the stuff the client won't notice",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q1b",
        text: "That it was done efficiently and on time",
        weights: { operator: 3, hustler: 2 },
      },
      {
        id: "q1c",
        text: "That the client is happy and will call me again",
        weights: { guardian: 3, leader: 1 },
      },
      {
        id: "q1d",
        text: "That it reflects my unique style and approach",
        weights: { maverick: 3, specialist: 1 },
      },
    ],
  },
  {
    id: "q2",
    number: 2,
    category: "Work Style",
    text: "How do you feel about taking on jobs outside your usual scope?",
    type: "multiple_choice",
    options: [
      {
        id: "q2a",
        text: "I avoid it — I only do what I'm excellent at",
        weights: { specialist: 3, craftsman: 1 },
      },
      {
        id: "q2b",
        text: "I'll take it if the systems and team can handle it",
        weights: { operator: 3, leader: 1 },
      },
      {
        id: "q2c",
        text: "If there's money in it, I'll figure it out",
        weights: { hustler: 3, maverick: 1 },
      },
      {
        id: "q2d",
        text: "I prefer to stick to what my regular clients need",
        weights: { guardian: 3, craftsman: 1 },
      },
    ],
  },
  {
    id: "q3",
    number: 3,
    category: "Work Style",
    text: "A client asks you to rush a job to save money. You:",
    type: "multiple_choice",
    options: [
      {
        id: "q3a",
        text: "Refuse — I won't compromise the quality",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q3b",
        text: "Find a process-efficient way to do it faster without cutting corners",
        weights: { operator: 3, hustler: 1 },
      },
      {
        id: "q3c",
        text: "Get it done fast — cash flow is king",
        weights: { hustler: 3 },
      },
      {
        id: "q3d",
        text: "Have an honest conversation about what's realistic",
        weights: { guardian: 2, leader: 2, craftsman: 1 },
      },
    ],
  },

  // ─── RISK TOLERANCE ───────────────────────────────────────────
  {
    id: "q4",
    number: 4,
    category: "Risk Tolerance",
    text: "You have the chance to take on a big contract — but it means hiring two new staff and buying new equipment. You:",
    type: "multiple_choice",
    options: [
      {
        id: "q4a",
        text: "Jump on it — growth requires risk",
        weights: { leader: 3, hustler: 2 },
      },
      {
        id: "q4b",
        text: "Do the numbers first, then decide",
        weights: { operator: 3, specialist: 1 },
      },
      {
        id: "q4c",
        text: "Pass — I don't want to overextend",
        weights: { guardian: 3, craftsman: 1 },
      },
      {
        id: "q4d",
        text: "Take it if it fits my specialty and vision",
        weights: { maverick: 2, specialist: 2 },
      },
    ],
  },
  {
    id: "q5",
    number: 5,
    category: "Risk Tolerance",
    text: "How do you feel about debt to grow your business?",
    type: "multiple_choice",
    options: [
      {
        id: "q5a",
        text: "Comfortable — leverage is how you scale",
        weights: { operator: 3, leader: 2 },
      },
      {
        id: "q5b",
        text: "Only if the numbers clearly stack up",
        weights: { specialist: 2, craftsman: 2 },
      },
      {
        id: "q5c",
        text: "Avoid it — I'd rather grow slowly and stay in control",
        weights: { guardian: 3, craftsman: 1 },
      },
      {
        id: "q5d",
        text: "I'll take the risk if it means doing things my way",
        weights: { maverick: 3, hustler: 1 },
      },
    ],
  },

  // ─── COMMUNICATION STYLE ──────────────────────────────────────
  {
    id: "q6",
    number: 6,
    category: "Communication Style",
    text: "How do you prefer to communicate with clients?",
    type: "multiple_choice",
    options: [
      {
        id: "q6a",
        text: "In person — I like to look them in the eye",
        weights: { craftsman: 2, guardian: 3 },
      },
      {
        id: "q6b",
        text: "Through a system — quotes, invoices, job updates via software",
        weights: { operator: 3, specialist: 1 },
      },
      {
        id: "q6c",
        text: "Fast and direct — text or a quick call",
        weights: { hustler: 3, maverick: 1 },
      },
      {
        id: "q6d",
        text: "I let my brand and content do the talking",
        weights: { leader: 3, maverick: 2 },
      },
    ],
  },
  {
    id: "q7",
    number: 7,
    category: "Communication Style",
    text: "A client is being difficult and unreasonable. You:",
    type: "multiple_choice",
    options: [
      {
        id: "q7a",
        text: "Stay calm, explain the facts, and hold your ground",
        weights: { craftsman: 2, specialist: 2, operator: 1 },
      },
      {
        id: "q7b",
        text: "Escalate to a formal process — it's documented and handled",
        weights: { operator: 3 },
      },
      {
        id: "q7c",
        text: "Get it sorted fast and move on — time is money",
        weights: { hustler: 3 },
      },
      {
        id: "q7d",
        text: "Tell them straight — and if they don't like it, that's fine",
        weights: { maverick: 3, leader: 1 },
      },
    ],
  },

  // ─── ATTENTION TO DETAIL ──────────────────────────────────────
  {
    id: "q8",
    number: 8,
    category: "Attention to Detail",
    text: "You notice a small imperfection in your work that the client definitely won't see. You:",
    type: "multiple_choice",
    options: [
      {
        id: "q8a",
        text: "Fix it — I'll know it's there",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q8b",
        text: "Assess if it affects function or longevity — if not, move on",
        weights: { operator: 3, guardian: 1 },
      },
      {
        id: "q8c",
        text: "Leave it — the client won't notice and I've got another job to get to",
        weights: { hustler: 3 },
      },
      {
        id: "q8d",
        text: "Fix it — my reputation depends on every detail",
        weights: { leader: 2, craftsman: 2 },
      },
    ],
  },
  {
    id: "q9",
    number: 9,
    category: "Attention to Detail",
    text: "How do you feel about paperwork, quoting, and admin?",
    type: "multiple_choice",
    options: [
      {
        id: "q9a",
        text: "It's part of the job — I do it properly",
        weights: { craftsman: 2, operator: 2 },
      },
      {
        id: "q9b",
        text: "I've got systems for it — it runs itself",
        weights: { operator: 3, specialist: 1 },
      },
      {
        id: "q9c",
        text: "I hate it but I do it because I have to",
        weights: { hustler: 2, maverick: 2 },
      },
      {
        id: "q9d",
        text: "I keep it simple — relationships matter more than paperwork",
        weights: { guardian: 3, craftsman: 1 },
      },
    ],
  },

  // ─── EGO VS HUMILITY ──────────────────────────────────────────
  {
    id: "q10",
    number: 10,
    category: "Ego vs Humility",
    text: "Another tradie does a job differently to you. You think:",
    type: "multiple_choice",
    options: [
      {
        id: "q10a",
        text: "There's a right way and a wrong way — and I know which is which",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q10b",
        text: "If it's efficient and profitable, it's valid",
        weights: { operator: 3, hustler: 1 },
      },
      {
        id: "q10c",
        text: "Good on them — there's room for everyone",
        weights: { guardian: 3, leader: 1 },
      },
      {
        id: "q10d",
        text: "I'm doing it my way regardless",
        weights: { maverick: 3, leader: 1 },
      },
    ],
  },
  {
    id: "q11",
    number: 11,
    category: "Ego vs Humility",
    text: "A client praises your work publicly. How do you feel?",
    type: "multiple_choice",
    options: [
      {
        id: "q11a",
        text: "Quietly proud — the work speaks for itself",
        weights: { craftsman: 3, guardian: 1 },
      },
      {
        id: "q11b",
        text: "Good — that's the system working as intended",
        weights: { operator: 3 },
      },
      {
        id: "q11c",
        text: "Great — now let's get more of those",
        weights: { hustler: 2, leader: 2 },
      },
      {
        id: "q11d",
        text: "Energised — I want to share it and build the brand",
        weights: { leader: 3, maverick: 2 },
      },
    ],
  },

  // ─── GROWTH AMBITION ──────────────────────────────────────────
  {
    id: "q12",
    number: 12,
    category: "Growth Ambition",
    text: "Where do you want your business to be in 5 years?",
    type: "multiple_choice",
    options: [
      {
        id: "q12a",
        text: "Doing the same work, just better — and charging more for it",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q12b",
        text: "Running multiple crews with strong systems and good margins",
        weights: { operator: 3, leader: 1 },
      },
      {
        id: "q12c",
        text: "Turning over significantly more — more jobs, more revenue",
        weights: { hustler: 3, operator: 1 },
      },
      {
        id: "q12d",
        text: "Known as the best in my niche — premium and respected",
        weights: { specialist: 3, maverick: 1 },
      },
    ],
  },
  {
    id: "q13",
    number: 13,
    category: "Growth Ambition",
    text: "How do you feel about hiring staff?",
    type: "multiple_choice",
    options: [
      {
        id: "q13a",
        text: "I'd rather stay small and keep control of quality",
        weights: { craftsman: 3, specialist: 1 },
      },
      {
        id: "q13b",
        text: "I actively want to build a team — that's how you scale",
        weights: { operator: 3, leader: 3 },
      },
      {
        id: "q13c",
        text: "I'll hire when I need to keep up with demand",
        weights: { hustler: 3, guardian: 1 },
      },
      {
        id: "q13d",
        text: "Only people who share my vision and standards",
        weights: { maverick: 2, leader: 2 },
      },
    ],
  },

  // ─── CUSTOMER INTERACTION ─────────────────────────────────────
  {
    id: "q14",
    number: 14,
    category: "Customer Interaction",
    text: "What kind of client relationship do you prefer?",
    type: "multiple_choice",
    options: [
      {
        id: "q14a",
        text: "Long-term — I want to be their tradie for life",
        weights: { guardian: 3, craftsman: 1 },
      },
      {
        id: "q14b",
        text: "Professional and transactional — do the job, get paid, move on",
        weights: { operator: 3, hustler: 1 },
      },
      {
        id: "q14c",
        text: "Volume — the more clients the better",
        weights: { hustler: 3 },
      },
      {
        id: "q14d",
        text: "Clients who get what I'm about and trust my vision",
        weights: { maverick: 3, specialist: 2 },
      },
    ],
  },
  {
    id: "q15",
    number: 15,
    category: "Customer Interaction",
    text: "A potential client asks you to match a competitor's cheaper quote. You:",
    type: "multiple_choice",
    options: [
      {
        id: "q15a",
        text: "Explain why my work is worth more — and walk if they don't get it",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q15b",
        text: "Show them the value in my systems and reliability",
        weights: { operator: 3, leader: 1 },
      },
      {
        id: "q15c",
        text: "Negotiate — getting the job is better than losing it",
        weights: { hustler: 3, guardian: 1 },
      },
      {
        id: "q15d",
        text: "Tell them to go with the other guy — I'm not for everyone",
        weights: { maverick: 3, specialist: 1 },
      },
    ],
  },

  // ─── BUSINESS MINDSET ─────────────────────────────────────────
  {
    id: "q16",
    number: 16,
    category: "Business Mindset",
    text: "How closely do you track your business numbers?",
    type: "multiple_choice",
    options: [
      {
        id: "q16a",
        text: "Weekly — I know my margins, revenue, and costs",
        weights: { operator: 3, specialist: 1 },
      },
      {
        id: "q16b",
        text: "Monthly — I check in but don't obsess",
        weights: { craftsman: 2, leader: 2 },
      },
      {
        id: "q16c",
        text: "I check the bank — if there's money, we're good",
        weights: { hustler: 3, guardian: 1 },
      },
      {
        id: "q16d",
        text: "My accountant handles it — I focus on the work",
        weights: { maverick: 2, craftsman: 2 },
      },
    ],
  },
  {
    id: "q17",
    number: 17,
    category: "Business Mindset",
    text: "What does success look like to you?",
    type: "multiple_choice",
    options: [
      {
        id: "q17a",
        text: "A reputation for doing the best work in my area",
        weights: { craftsman: 3, guardian: 1 },
      },
      {
        id: "q17b",
        text: "A profitable, well-run business that doesn't depend on me being on the tools",
        weights: { operator: 3, leader: 2 },
      },
      {
        id: "q17c",
        text: "Financial freedom — enough money to do what I want",
        weights: { hustler: 3, maverick: 1 },
      },
      {
        id: "q17d",
        text: "Being known as the best in my niche",
        weights: { specialist: 3, leader: 1 },
      },
    ],
  },

  // ─── PRIDE TRIGGERS ───────────────────────────────────────────
  {
    id: "q18",
    number: 18,
    category: "Pride Triggers",
    text: "What makes you most proud about your work?",
    type: "multiple_choice",
    options: [
      {
        id: "q18a",
        text: "When the finish is perfect and I know it",
        weights: { craftsman: 3, specialist: 1 },
      },
      {
        id: "q18b",
        text: "When a job runs exactly to plan and on budget",
        weights: { operator: 3 },
      },
      {
        id: "q18c",
        text: "When I've turned over a big week and the cash is in",
        weights: { hustler: 3 },
      },
      {
        id: "q18d",
        text: "When a client calls me back years later and still talks about the job",
        weights: { guardian: 3, craftsman: 1 },
      },
    ],
  },
  {
    id: "q19",
    number: 19,
    category: "Pride Triggers",
    text: "What would you hate most about your business?",
    type: "multiple_choice",
    options: [
      {
        id: "q19a",
        text: "Being known for average work",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q19b",
        text: "Running a disorganised, unprofitable operation",
        weights: { operator: 3, leader: 1 },
      },
      {
        id: "q19c",
        text: "Being slow and missing opportunities",
        weights: { hustler: 3, maverick: 1 },
      },
      {
        id: "q19d",
        text: "Losing the trust of clients I've built relationships with",
        weights: { guardian: 3, craftsman: 1 },
      },
    ],
  },

  // ─── LIKERT SCALE QUESTIONS ───────────────────────────────────
  {
    id: "q20",
    number: 20,
    category: "Work Style",
    text: "I would rather do fewer jobs at a higher standard than more jobs at an average standard.",
    type: "likert",
    options: [
      { id: "q20_1", text: "1", weights: { hustler: 2, operator: 1 } },
      { id: "q20_2", text: "2", weights: { hustler: 1, guardian: 1 } },
      { id: "q20_3", text: "3", weights: { guardian: 1, operator: 1 } },
      { id: "q20_4", text: "4", weights: { craftsman: 1, specialist: 1 } },
      { id: "q20_5", text: "5", weights: { craftsman: 3, specialist: 2 } },
    ],
  },
  {
    id: "q21",
    number: 21,
    category: "Business Mindset",
    text: "I think about my business as a brand, not just a service.",
    type: "likert",
    options: [
      { id: "q21_1", text: "1", weights: { craftsman: 1, guardian: 1 } },
      { id: "q21_2", text: "2", weights: { hustler: 1, craftsman: 1 } },
      { id: "q21_3", text: "3", weights: { operator: 1, guardian: 1 } },
      { id: "q21_4", text: "4", weights: { leader: 1, specialist: 1 } },
      { id: "q21_5", text: "5", weights: { leader: 3, maverick: 2 } },
    ],
  },
  {
    id: "q22",
    number: 22,
    category: "Growth Ambition",
    text: "I am actively working to build systems so the business can run without me.",
    type: "likert",
    options: [
      { id: "q22_1", text: "1", weights: { craftsman: 2, maverick: 1 } },
      { id: "q22_2", text: "2", weights: { hustler: 1, craftsman: 1 } },
      { id: "q22_3", text: "3", weights: { guardian: 1, specialist: 1 } },
      { id: "q22_4", text: "4", weights: { operator: 2, leader: 1 } },
      { id: "q22_5", text: "5", weights: { operator: 3, leader: 2 } },
    ],
  },
  {
    id: "q23",
    number: 23,
    category: "Ego vs Humility",
    text: "I am comfortable saying no to work that doesn't fit my standards or specialty.",
    type: "likert",
    options: [
      { id: "q23_1", text: "1", weights: { hustler: 2, guardian: 1 } },
      { id: "q23_2", text: "2", weights: { hustler: 1, guardian: 1 } },
      { id: "q23_3", text: "3", weights: { operator: 1, leader: 1 } },
      { id: "q23_4", text: "4", weights: { specialist: 2, craftsman: 1 } },
      { id: "q23_5", text: "5", weights: { specialist: 3, maverick: 2 } },
    ],
  },
  {
    id: "q24",
    number: 24,
    category: "Customer Interaction",
    text: "My best clients have been with me for years and I know them personally.",
    type: "likert",
    options: [
      { id: "q24_1", text: "1", weights: { hustler: 2, operator: 1 } },
      { id: "q24_2", text: "2", weights: { hustler: 1, maverick: 1 } },
      { id: "q24_3", text: "3", weights: { specialist: 1, leader: 1 } },
      { id: "q24_4", text: "4", weights: { guardian: 2, craftsman: 1 } },
      { id: "q24_5", text: "5", weights: { guardian: 3, craftsman: 2 } },
    ],
  },
  {
    id: "q25",
    number: 25,
    category: "Pride Triggers",
    text: "I want to be known in my industry — not just in my local area.",
    type: "likert",
    options: [
      { id: "q25_1", text: "1", weights: { guardian: 2, craftsman: 1 } },
      { id: "q25_2", text: "2", weights: { guardian: 1, craftsman: 1 } },
      { id: "q25_3", text: "3", weights: { operator: 1, specialist: 1 } },
      { id: "q25_4", text: "4", weights: { leader: 2, maverick: 1 } },
      { id: "q25_5", text: "5", weights: { leader: 3, maverick: 3 } },
    ],
  },
];

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
