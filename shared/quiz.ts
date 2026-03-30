// Tradie Quiz — Master Execution Spec v2
// 5 Archetypes, 20 Questions, Deterministic +1 Scoring
// Tiebreak: HT > SO > PC > RB > VC

export type ArchetypeCode = "PC" | "SO" | "HT" | "VC" | "RB";

export interface QuizOption {
  id: string;
  text: string;
  scores: Partial<Record<ArchetypeCode, number>>;
}

export interface QuizQuestion {
  id: string;
  number: number;
  text: string;
  options: QuizOption[];
}

export const ARCHETYPES: Record<ArchetypeCode, { name: string; tagline: string }> = {
  PC: { name: "The Precision Craftsman", tagline: "Quality is your brand. Every job is a signature." },
  SO: { name: "The Systems Operator", tagline: "You run a business, not just a trade." },
  HT: { name: "The High-Ticket Specialist", tagline: "You go deep, charge accordingly, and work with clients who value it." },
  VC: { name: "The Volume Contractor", tagline: "You move fast, win more, and build through scale." },
  RB: { name: "The Reputation Builder", tagline: "Your name is your marketing. Trust is your edge." },
};

// Tiebreak priority (enforced): HT > SO > PC > RB > VC
export const TIEBREAK_ORDER: ArchetypeCode[] = ["HT", "SO", "PC", "RB", "VC"];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    number: 1,
    text: "A client calls asking for a quote on a job that is not quite in your wheelhouse. What do you do?",
    options: [
      { id: "q1a", text: "Pass on it — you only take jobs you can do to your standard", scores: { PC: 1 } },
      { id: "q1b", text: "Assess whether it fits your systems and capacity before committing", scores: { SO: 1 } },
      { id: "q1c", text: "Decline — it does not match your niche or your rate", scores: { HT: 1 } },
      { id: "q1d", text: "Quote it anyway — work is work and you will figure it out", scores: { VC: 1 } },
    ],
  },
  {
    id: "q2",
    number: 2,
    text: "How do most of your best clients find you?",
    options: [
      { id: "q2a", text: "Word of mouth from previous clients who loved the finish", scores: { PC: 1 } },
      { id: "q2b", text: "Referrals from builders or developers who trust your process", scores: { SO: 1 } },
      { id: "q2c", text: "They specifically sought out someone with your level of expertise", scores: { HT: 1 } },
      { id: "q2d", text: "Online ads, directories, or just being visible everywhere", scores: { VC: 1 } },
    ],
  },
  {
    id: "q3",
    number: 3,
    text: "A job runs over budget due to unexpected site conditions. How do you handle it?",
    options: [
      { id: "q3a", text: "Absorb it — you quoted it and you stand by your word", scores: { PC: 1 } },
      { id: "q3b", text: "Issue a variation order immediately — your contract covers this", scores: { SO: 1 } },
      { id: "q3c", text: "Have a direct conversation and charge accordingly — you do not work for free", scores: { HT: 1 } },
      { id: "q3d", text: "Move on and price it into the next job — it evens out", scores: { VC: 1 } },
    ],
  },
  {
    id: "q4",
    number: 4,
    text: "What does a good week look like for your business?",
    options: [
      { id: "q4a", text: "One or two jobs done to an exceptional standard with no callbacks", scores: { PC: 1 } },
      { id: "q4b", text: "The team ran smoothly, invoices went out on time, and the schedule held", scores: { SO: 1 } },
      { id: "q4c", text: "A high-value project progressed and the client is fully engaged", scores: { HT: 1 } },
      { id: "q4d", text: "Multiple jobs completed, a full pipeline, and strong revenue numbers", scores: { VC: 1 } },
    ],
  },
  {
    id: "q5",
    number: 5,
    text: "How do you decide what to charge for a job?",
    options: [
      { id: "q5a", text: "Based on the complexity and the time it takes to do it properly", scores: { PC: 1 } },
      { id: "q5b", text: "From a costed template that accounts for labour, materials, and margin", scores: { SO: 1 } },
      { id: "q5c", text: "Based on the value delivered to the client, not just the hours", scores: { HT: 1 } },
      { id: "q5d", text: "Competitive market rate — you need to win the job first", scores: { VC: 1 } },
    ],
  },
  {
    id: "q6",
    number: 6,
    text: "A client pushes back on your price. What is your instinct?",
    options: [
      { id: "q6a", text: "Explain the detail and quality that justifies it — and hold the price", scores: { PC: 1 } },
      { id: "q6b", text: "Show them the scope breakdown and what they are actually getting", scores: { SO: 1 } },
      { id: "q6c", text: "Walk away — clients who argue price are not your clients", scores: { HT: 1 } },
      { id: "q6d", text: "Negotiate — getting the job at a lower margin is better than losing it", scores: { VC: 1 } },
    ],
  },
  {
    id: "q7",
    number: 7,
    text: "What is the biggest thing holding your business back right now?",
    options: [
      { id: "q7a", text: "Not enough clients who appreciate quality and are willing to pay for it", scores: { PC: 1 } },
      { id: "q7b", text: "The business still depends too much on me being hands-on", scores: { SO: 1 } },
      { id: "q7c", text: "I am not visible enough to the clients who would pay my real rate", scores: { HT: 1 } },
      { id: "q7d", text: "Inconsistent lead flow — some months are great, others are slow", scores: { VC: 1 } },
    ],
  },
  {
    id: "q8",
    number: 8,
    text: "How do you feel about hiring and managing a team?",
    options: [
      { id: "q8a", text: "Cautious — most people do not meet the standard I hold myself to", scores: { PC: 1 } },
      { id: "q8b", text: "It is essential — a business that cannot run without me is not a business", scores: { SO: 1 } },
      { id: "q8c", text: "I prefer a small, trusted crew — quality over headcount", scores: { HT: 1 } },
      { id: "q8d", text: "The more good people I can get, the more work I can take on", scores: { VC: 1 } },
    ],
  },
  {
    id: "q9",
    number: 9,
    text: "A past client refers you to someone who then asks for a discount. What do you do?",
    options: [
      { id: "q9a", text: "Politely decline — your price reflects your standard, not who referred them", scores: { PC: 1 } },
      { id: "q9b", text: "Stick to your quoted rate — discounting undermines the whole model", scores: { SO: 1 } },
      { id: "q9c", text: "No discount — if they need to ask, they are probably not the right fit", scores: { HT: 1 } },
      { id: "q9d", text: "Offer a small one to secure the relationship and keep the referral chain going", scores: { VC: 1 } },
    ],
  },
  {
    id: "q10",
    number: 10,
    text: "How do you handle your reputation online?",
    options: [
      { id: "q10a", text: "My work speaks for itself — I rely on photos and word of mouth", scores: { RB: 1 } },
      { id: "q10b", text: "I have a process for requesting reviews and following up after jobs", scores: { SO: 1 } },
      { id: "q10c", text: "I am selective about where I appear — I want to be seen in the right places", scores: { HT: 1 } },
      { id: "q10d", text: "I am active everywhere — the more visible the better", scores: { VC: 1 } },
    ],
  },
  {
    id: "q11",
    number: 11,
    text: "What does your ideal client look like?",
    options: [
      { id: "q11a", text: "Someone who values craftsmanship and does not rush the job", scores: { PC: 1 } },
      { id: "q11b", text: "A developer or builder who wants a reliable, systemised trade partner", scores: { SO: 1 } },
      { id: "q11c", text: "A high-net-worth client with a complex brief and a real budget", scores: { HT: 1 } },
      { id: "q11d", text: "Anyone with a real job, a realistic budget, and a quick decision", scores: { VC: 1 } },
    ],
  },
  {
    id: "q12",
    number: 12,
    text: "How do you think about your brand right now?",
    options: [
      { id: "q12a", text: "My reputation is my brand — built job by job over years", scores: { RB: 1 } },
      { id: "q12b", text: "I have not really thought about it — I just focus on the work", scores: { PC: 1 } },
      { id: "q12c", text: "It is something I know I need to develop properly", scores: { SO: 1 } },
      { id: "q12d", text: "I know what I stand for but it is not clearly communicated yet", scores: { HT: 1 } },
    ],
  },
  {
    id: "q13",
    number: 13,
    text: "What is your relationship with technology and systems in your business?",
    options: [
      { id: "q13a", text: "Minimal — I prefer to keep things simple and personal", scores: { PC: 1 } },
      { id: "q13b", text: "Heavy — quoting software, job management, invoicing, all automated", scores: { SO: 1 } },
      { id: "q13c", text: "Selective — I use what helps me deliver a premium experience", scores: { HT: 1 } },
      { id: "q13d", text: "Whatever helps me move faster and take on more volume", scores: { VC: 1 } },
    ],
  },
  {
    id: "q14",
    number: 14,
    text: "How do you typically win new work?",
    options: [
      { id: "q14a", text: "Referrals from clients who have seen my finished work", scores: { RB: 1 } },
      { id: "q14b", text: "Repeat business from builders and developers I have worked with before", scores: { SO: 1 } },
      { id: "q14c", text: "My reputation in a specific niche brings the right clients to me", scores: { HT: 1 } },
      { id: "q14d", text: "Actively quoting, following up, and staying visible in the market", scores: { VC: 1 } },
    ],
  },
  {
    id: "q15",
    number: 15,
    text: "When you finish a job, what matters most to you?",
    options: [
      { id: "q15a", text: "That the finish is exactly what I envisioned — no compromises", scores: { PC: 1 } },
      { id: "q15b", text: "That it was delivered on time, on budget, and the client is satisfied", scores: { SO: 1 } },
      { id: "q15c", text: "That the client sees the value and will refer others at the same level", scores: { HT: 1 } },
      { id: "q15d", text: "That it is done, invoiced, and the next one is already lined up", scores: { VC: 1 } },
    ],
  },
  {
    id: "q16",
    number: 16,
    text: "What does growth mean to you?",
    options: [
      { id: "q16a", text: "Becoming known as the best at what I do in my area", scores: { RB: 1 } },
      { id: "q16b", text: "Building a business that runs without me needing to be on every job", scores: { SO: 1 } },
      { id: "q16c", text: "Moving into higher-value work with better clients and bigger margins", scores: { HT: 1 } },
      { id: "q16d", text: "More jobs, more revenue, more market share", scores: { VC: 1 } },
    ],
  },
  {
    id: "q17",
    number: 17,
    text: "How do you feel when a competitor undercuts your price and wins the job?",
    options: [
      { id: "q17a", text: "Frustrated but not surprised — most people do not understand what quality costs", scores: { PC: 1 } },
      { id: "q17b", text: "Indifferent — if they want the cheapest option, they are not my client", scores: { SO: 1 } },
      { id: "q17c", text: "Completely unbothered — we are not competing for the same clients", scores: { HT: 1 } },
      { id: "q17d", text: "Annoyed — I will adjust my approach to win more of those jobs next time", scores: { VC: 1 } },
    ],
  },
  {
    id: "q18",
    number: 18,
    text: "What would you most like your business to be known for in five years?",
    options: [
      { id: "q18a", text: "The standard of work — the name people mention when quality matters", scores: { RB: 1 } },
      { id: "q18b", text: "A reliable, professional operation that delivers every time", scores: { SO: 1 } },
      { id: "q18c", text: "The go-to expert for a specific type of high-value project", scores: { HT: 1 } },
      { id: "q18d", text: "One of the biggest and most active contractors in the region", scores: { VC: 1 } },
    ],
  },
  {
    id: "q19",
    number: 19,
    text: "How do you currently present your business to new clients?",
    options: [
      { id: "q19a", text: "Photos of past work and word of mouth — the work sells itself", scores: { PC: 1 } },
      { id: "q19b", text: "A clear process, professional quote, and structured onboarding", scores: { SO: 1 } },
      { id: "q19c", text: "A curated portfolio and a conversation about what they are trying to achieve", scores: { HT: 1 } },
      { id: "q19d", text: "Fast response, competitive price, and availability", scores: { VC: 1 } },
    ],
  },
  {
    id: "q20",
    number: 20,
    text: "If you could fix one thing about how your business is perceived right now, what would it be?",
    options: [
      { id: "q20a", text: "That clients understood the difference between my work and everyone else's", scores: { PC: 1 } },
      { id: "q20b", text: "That we looked as professional on the outside as we are on the inside", scores: { SO: 1 } },
      { id: "q20c", text: "That the right clients knew I existed and what I was capable of", scores: { HT: 1 } },
      { id: "q20d", text: "That we were seen as a serious, established operation — not just another tradie", scores: { RB: 1 } },
    ],
  },
];
