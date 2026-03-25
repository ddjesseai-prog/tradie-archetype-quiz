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
  "Nah, not me",
  "Not really",
  "Sometimes",
  "Yeah, that's me",
  "100% me",
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ─── WORK STYLE ───────────────────────────────────────────────
  {
    id: "q1",
    number: 1,
    category: "Work Style",
    text: "You finish a job and the client is happy. What's going through your head?",
    type: "multiple_choice",
    options: [
      {
        id: "q1a",
        text: "Good — but I already know the three things I'd do differently next time",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q1b",
        text: "On time, on budget, on to the next one",
        weights: { operator: 3, hustler: 2 },
      },
      {
        id: "q1c",
        text: "That's another one who'll call me again — and tell their mates",
        weights: { guardian: 3, leader: 1 },
      },
      {
        id: "q1d",
        text: "Did we do something here that no one else would have done?",
        weights: { maverick: 3, specialist: 1 },
      },
    ],
  },
  {
    id: "q2",
    number: 2,
    category: "Work Style",
    text: "It's 6pm on a Friday. You've got a quote to write, a supplier to chase, and a client texting you. What do you do?",
    type: "multiple_choice",
    options: [
      {
        id: "q2a",
        text: "The quote gets done properly tonight — I won't rush it",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q2b",
        text: "My system handles the follow-ups — I check the dashboard and call it",
        weights: { operator: 3, leader: 1 },
      },
      {
        id: "q2c",
        text: "Quick text back, quote tomorrow morning, supplier Monday — done",
        weights: { hustler: 3, guardian: 1 },
      },
      {
        id: "q2d",
        text: "The client gets a real answer, the rest can wait",
        weights: { guardian: 3, craftsman: 1 },
      },
    ],
  },
  {
    id: "q3",
    number: 3,
    category: "Work Style",
    text: "A builder asks you to take on a job outside your usual scope — decent money, tight timeline. You:",
    type: "multiple_choice",
    options: [
      {
        id: "q3a",
        text: "Pass — I only do what I do well",
        weights: { specialist: 3, craftsman: 2 },
      },
      {
        id: "q3b",
        text: "Check if the team and timeline can handle it, then decide",
        weights: { operator: 3, leader: 1 },
      },
      {
        id: "q3c",
        text: "If the money's right, I'll figure it out on the way",
        weights: { hustler: 3, maverick: 1 },
      },
      {
        id: "q3d",
        text: "Only if it fits the kind of work I want to be known for",
        weights: { maverick: 2, leader: 2, craftsman: 1 },
      },
    ],
  },

  // ─── RISK & MONEY ─────────────────────────────────────────────
  {
    id: "q4",
    number: 4,
    category: "Risk & Money",
    text: "You've got a chance to take on a contract that would double your revenue — but you'd need to hire two people and take on debt. You:",
    type: "multiple_choice",
    options: [
      {
        id: "q4a",
        text: "Do the numbers hard. If the margin holds, I'm in",
        weights: { operator: 3, specialist: 1 },
      },
      {
        id: "q4b",
        text: "Jump on it — you don't grow by playing it safe",
        weights: { leader: 3, hustler: 2 },
      },
      {
        id: "q4c",
        text: "Pass — I'd rather grow slow and keep control",
        weights: { guardian: 3, craftsman: 2 },
      },
      {
        id: "q4d",
        text: "Only if it's the right kind of work — not just any contract",
        weights: { maverick: 2, specialist: 2 },
      },
    ],
  },
  {
    id: "q5",
    number: 5,
    category: "Risk & Money",
    text: "How do you know if you've had a good week?",
    type: "multiple_choice",
    options: [
      {
        id: "q5a",
        text: "I check the job costing — margin per job tells the story",
        weights: { operator: 3, specialist: 1 },
      },
      {
        id: "q5b",
        text: "If the work I delivered was genuinely excellent",
        weights: { craftsman: 3, guardian: 1 },
      },
      {
        id: "q5c",
        text: "How much landed in the account",
        weights: { hustler: 3, operator: 1 },
      },
      {
        id: "q5d",
        text: "Whether I moved the business forward — not just kept it running",
        weights: { leader: 3, maverick: 2 },
      },
    ],
  },

  // ─── COMMUNICATION STYLE ──────────────────────────────────────
  {
    id: "q6",
    number: 6,
    category: "Communication Style",
    text: "A new client asks how you work. What do you actually say?",
    type: "multiple_choice",
    options: [
      {
        id: "q6a",
        text: "I walk them through exactly how I do the job — the process matters",
        weights: { craftsman: 2, specialist: 3 },
      },
      {
        id: "q6b",
        text: "I send them our quote, scope, and timeline — it's all in the system",
        weights: { operator: 3, leader: 1 },
      },
      {
        id: "q6c",
        text: "Quick call, get the details, send a quote same day",
        weights: { hustler: 3, guardian: 1 },
      },
      {
        id: "q6d",
        text: "I tell them what I'm about and let them decide if we're a fit",
        weights: { maverick: 3, leader: 2 },
      },
    ],
  },
  {
    id: "q7",
    number: 7,
    category: "Communication Style",
    text: "A client calls you stressed — something's gone wrong on site and they're blaming you. It's not your fault. You:",
    type: "multiple_choice",
    options: [
      {
        id: "q7a",
        text: "Stay calm, lay out the facts, and hold my ground professionally",
        weights: { craftsman: 2, specialist: 2, operator: 1 },
      },
      {
        id: "q7b",
        text: "Escalate it through the proper process — everything's documented",
        weights: { operator: 3 },
      },
      {
        id: "q7c",
        text: "Get it sorted fast — I don't have time for drama",
        weights: { hustler: 3 },
      },
      {
        id: "q7d",
        text: "Tell them straight what happened — and if they don't like it, that's fine",
        weights: { maverick: 3, leader: 1 },
      },
    ],
  },

  // ─── IDENTITY & PRIDE ─────────────────────────────────────────
  {
    id: "q8",
    number: 8,
    category: "Identity & Pride",
    text: "Someone asks what you do for work. What do you actually say?",
    type: "multiple_choice",
    options: [
      {
        id: "q8a",
        text: "I'm a [trade] — and I tell them what I specialise in",
        weights: { specialist: 3, craftsman: 2 },
      },
      {
        id: "q8b",
        text: "I run a [trade] business — we've got a team and do commercial work",
        weights: { operator: 3, leader: 2 },
      },
      {
        id: "q8c",
        text: "I'm a [trade] — I stay busy, always got work on",
        weights: { hustler: 3, guardian: 1 },
      },
      {
        id: "q8d",
        text: "I'm building something — [trade] is the vehicle",
        weights: { leader: 3, maverick: 2 },
      },
    ],
  },
  {
    id: "q9",
    number: 9,
    category: "Identity & Pride",
    text: "What would genuinely sting — the kind of feedback that would keep you up at night?",
    type: "multiple_choice",
    options: [
      {
        id: "q9a",
        text: "Someone saying my work was average",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q9b",
        text: "Finding out my business is less profitable than I thought",
        weights: { operator: 3, hustler: 1 },
      },
      {
        id: "q9c",
        text: "A long-term client going to someone else without telling me why",
        weights: { guardian: 3, craftsman: 1 },
      },
      {
        id: "q9d",
        text: "Being called generic — just another tradie",
        weights: { maverick: 3, leader: 2 },
      },
    ],
  },

  // ─── GROWTH AMBITION ──────────────────────────────────────────
  {
    id: "q10",
    number: 10,
    category: "Growth Ambition",
    text: "Where do you actually want this business to be in 5 years?",
    type: "multiple_choice",
    options: [
      {
        id: "q10a",
        text: "Doing the same work — just better, and charging what it's worth",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q10b",
        text: "Running multiple crews with good systems and strong margins",
        weights: { operator: 3, leader: 1 },
      },
      {
        id: "q10c",
        text: "Turning over significantly more — I want to build real wealth",
        weights: { hustler: 3, operator: 1 },
      },
      {
        id: "q10d",
        text: "Known as the best in my niche — people come to me",
        weights: { specialist: 3, maverick: 1 },
      },
    ],
  },
  {
    id: "q11",
    number: 11,
    category: "Growth Ambition",
    text: "What's your honest relationship with hiring staff?",
    type: "multiple_choice",
    options: [
      {
        id: "q11a",
        text: "I'd rather stay lean and keep control of quality",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q11b",
        text: "I want to build a team — that's the whole point",
        weights: { operator: 3, leader: 3 },
      },
      {
        id: "q11c",
        text: "I'll hire when I have to — demand drives the decision",
        weights: { hustler: 3, guardian: 1 },
      },
      {
        id: "q11d",
        text: "Only people who genuinely get what I'm building",
        weights: { maverick: 2, leader: 2 },
      },
    ],
  },

  // ─── CUSTOMER INTERACTION ─────────────────────────────────────
  {
    id: "q12",
    number: 12,
    category: "Customer Interaction",
    text: "What does your ideal client relationship look like?",
    type: "multiple_choice",
    options: [
      {
        id: "q12a",
        text: "Long-term — I want to be their tradie for life",
        weights: { guardian: 3, craftsman: 1 },
      },
      {
        id: "q12b",
        text: "Professional and clear — do the job well, get paid, move on",
        weights: { operator: 3, specialist: 1 },
      },
      {
        id: "q12c",
        text: "Volume — the more clients the better",
        weights: { hustler: 3 },
      },
      {
        id: "q12d",
        text: "Clients who get what I'm about and trust my vision",
        weights: { maverick: 3, leader: 2 },
      },
    ],
  },
  {
    id: "q13",
    number: 13,
    category: "Customer Interaction",
    text: "A potential client asks you to match a cheaper quote. You:",
    type: "multiple_choice",
    options: [
      {
        id: "q13a",
        text: "Explain why my work is worth more — and walk if they don't get it",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q13b",
        text: "Show them the value in my process and reliability",
        weights: { operator: 3, leader: 1 },
      },
      {
        id: "q13c",
        text: "Negotiate — getting the job matters",
        weights: { hustler: 3, guardian: 1 },
      },
      {
        id: "q13d",
        text: "Tell them to go with the other guy — I'm not for everyone",
        weights: { maverick: 3, specialist: 1 },
      },
    ],
  },

  // ─── BUSINESS MINDSET ─────────────────────────────────────────
  {
    id: "q14",
    number: 14,
    category: "Business Mindset",
    text: "Your accountant asks how last quarter went. What's your honest answer?",
    type: "multiple_choice",
    options: [
      {
        id: "q14a",
        text: "I can tell you revenue, margin per job type, and where we lost money",
        weights: { operator: 3, specialist: 1 },
      },
      {
        id: "q14b",
        text: "Busy. Good work. I'll let you tell me the numbers",
        weights: { craftsman: 2, guardian: 2 },
      },
      {
        id: "q14c",
        text: "Smashed it — cash flow was strong",
        weights: { hustler: 3 },
      },
      {
        id: "q14d",
        text: "We moved the brand forward — the revenue will follow",
        weights: { leader: 3, maverick: 2 },
      },
    ],
  },
  {
    id: "q15",
    number: 15,
    category: "Business Mindset",
    text: "What does success actually look like to you — be honest?",
    type: "multiple_choice",
    options: [
      {
        id: "q15a",
        text: "A reputation for doing the best work in my area",
        weights: { craftsman: 3, guardian: 1 },
      },
      {
        id: "q15b",
        text: "A profitable business that doesn't depend on me being on the tools every day",
        weights: { operator: 3, leader: 2 },
      },
      {
        id: "q15c",
        text: "Financial freedom — enough to do what I want, when I want",
        weights: { hustler: 3, maverick: 1 },
      },
      {
        id: "q15d",
        text: "Being the name everyone in my niche knows",
        weights: { specialist: 3, leader: 1 },
      },
    ],
  },

  // ─── SOCIAL MEDIA & BRAND ─────────────────────────────────────
  {
    id: "q16",
    number: 16,
    category: "Social Media & Brand",
    text: "What's your honest relationship with social media for your business?",
    type: "multiple_choice",
    options: [
      {
        id: "q16a",
        text: "I post the work and let it speak — I'm not here to perform",
        weights: { craftsman: 3, guardian: 1 },
      },
      {
        id: "q16b",
        text: "It's a lead gen tool — I treat it like one",
        weights: { operator: 3, hustler: 1 },
      },
      {
        id: "q16c",
        text: "I post when I remember — it's not really my thing",
        weights: { guardian: 2, specialist: 2 },
      },
      {
        id: "q16d",
        text: "It's how I build the brand — I think about it constantly",
        weights: { leader: 3, maverick: 3 },
      },
    ],
  },
  {
    id: "q17",
    number: 17,
    category: "Social Media & Brand",
    text: "You see a tradie with 50k followers posting about their business. Your reaction?",
    type: "multiple_choice",
    options: [
      {
        id: "q17a",
        text: "Good on them — but I'd rather my work do the talking",
        weights: { craftsman: 3, specialist: 1 },
      },
      {
        id: "q17b",
        text: "Smart — that's a real competitive advantage if you use it right",
        weights: { operator: 2, leader: 2 },
      },
      {
        id: "q17c",
        text: "I want that — I'm working on building mine",
        weights: { leader: 3, maverick: 2 },
      },
      {
        id: "q17d",
        text: "Interesting — but are they actually making money from it?",
        weights: { hustler: 3, operator: 1 },
      },
    ],
  },

  // ─── PERSONALITY & LIFESTYLE ──────────────────────────────────
  {
    id: "q18",
    number: 18,
    category: "Personality",
    text: "Sunday arvo — no work on. What are you actually doing?",
    type: "multiple_choice",
    options: [
      {
        id: "q18a",
        text: "In the shed — fixing something, building something, or sharpening tools",
        weights: { craftsman: 3, specialist: 2 },
      },
      {
        id: "q18b",
        text: "Reviewing the week — what worked, what didn't, what's the plan",
        weights: { operator: 3, leader: 2 },
      },
      {
        id: "q18c",
        text: "Genuinely off — family, footy, or a cold one. Work can wait",
        weights: { guardian: 3, hustler: 1 },
      },
      {
        id: "q18d",
        text: "Probably on my phone — ideas, content, or researching something new",
        weights: { maverick: 3, leader: 1 },
      },
    ],
  },
  {
    id: "q19",
    number: 19,
    category: "Personality",
    text: "Another tradie in your area is doing well. Your honest first thought?",
    type: "multiple_choice",
    options: [
      {
        id: "q19a",
        text: "Good — but I wonder if their quality is actually there",
        weights: { craftsman: 3, specialist: 1 },
      },
      {
        id: "q19b",
        text: "How are they structured? What can I learn from that?",
        weights: { operator: 3, leader: 1 },
      },
      {
        id: "q19c",
        text: "Good on them — there's enough work for everyone",
        weights: { guardian: 3, craftsman: 1 },
      },
      {
        id: "q19d",
        text: "What are they doing differently — and can I do it better?",
        weights: { maverick: 2, hustler: 2, leader: 1 },
      },
    ],
  },

  // ─── LIKERT SCALE QUESTIONS ───────────────────────────────────
  {
    id: "q20",
    number: 20,
    category: "Work Style",
    text: "I'd genuinely rather lose a job than do it in a way I'm not proud of.",
    type: "likert",
    options: [
      { id: "q20_1", text: "1", weights: { hustler: 2, operator: 1 } },
      { id: "q20_2", text: "2", weights: { hustler: 1, guardian: 1 } },
      { id: "q20_3", text: "3", weights: { guardian: 1, operator: 1 } },
      { id: "q20_4", text: "4", weights: { craftsman: 1, specialist: 2 } },
      { id: "q20_5", text: "5", weights: { craftsman: 3, specialist: 3 } },
    ],
  },
  {
    id: "q21",
    number: 21,
    category: "Business Mindset",
    text: "I think about my business as a brand — not just a service I provide.",
    type: "likert",
    options: [
      { id: "q21_1", text: "1", weights: { craftsman: 1, guardian: 2 } },
      { id: "q21_2", text: "2", weights: { hustler: 1, craftsman: 1 } },
      { id: "q21_3", text: "3", weights: { operator: 1, guardian: 1 } },
      { id: "q21_4", text: "4", weights: { leader: 2, specialist: 1 } },
      { id: "q21_5", text: "5", weights: { leader: 3, maverick: 3 } },
    ],
  },
  {
    id: "q22",
    number: 22,
    category: "Growth Ambition",
    text: "I'm actively building systems so this business can run without me on the tools every day.",
    type: "likert",
    options: [
      { id: "q22_1", text: "1", weights: { craftsman: 2, maverick: 1 } },
      { id: "q22_2", text: "2", weights: { hustler: 1, craftsman: 1 } },
      { id: "q22_3", text: "3", weights: { guardian: 1, specialist: 1 } },
      { id: "q22_4", text: "4", weights: { operator: 2, leader: 1 } },
      { id: "q22_5", text: "5", weights: { operator: 3, leader: 3 } },
    ],
  },
  {
    id: "q23",
    number: 23,
    category: "Identity & Pride",
    text: "I'm completely comfortable saying no to work that doesn't fit what I'm building.",
    type: "likert",
    options: [
      { id: "q23_1", text: "1", weights: { hustler: 2, guardian: 1 } },
      { id: "q23_2", text: "2", weights: { hustler: 1, guardian: 1 } },
      { id: "q23_3", text: "3", weights: { operator: 1, craftsman: 1 } },
      { id: "q23_4", text: "4", weights: { specialist: 2, maverick: 1 } },
      { id: "q23_5", text: "5", weights: { specialist: 3, maverick: 2 } },
    ],
  },
  {
    id: "q24",
    number: 24,
    category: "Customer Interaction",
    text: "My best clients feel more like long-term relationships than transactions.",
    type: "likert",
    options: [
      { id: "q24_1", text: "1", weights: { hustler: 2, operator: 2 } },
      { id: "q24_2", text: "2", weights: { hustler: 1, maverick: 1 } },
      { id: "q24_3", text: "3", weights: { specialist: 1, leader: 1 } },
      { id: "q24_4", text: "4", weights: { guardian: 2, craftsman: 1 } },
      { id: "q24_5", text: "5", weights: { guardian: 3, craftsman: 2 } },
    ],
  },
  {
    id: "q25",
    number: 25,
    category: "Social Media & Brand",
    text: "I want to be known beyond my local area — I want a name in the industry.",
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
