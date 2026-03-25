export type ArchetypeId =
  | "craftsman"
  | "operator"
  | "hustler"
  | "specialist"
  | "leader"
  | "guardian"
  | "maverick";

export interface Archetype {
  id: ArchetypeId;
  name: string;
  tagline: string;
  emoji: string;
  identityDescription: string;
  strengths: string[];
  weaknesses: string[];
  defaultBehaviours: string[];
  marketPerception: string;
  playbook: BrandPlaybook;
}

export interface BrandPlaybook {
  positioning: {
    howToDescribeYourself: string;
    whatToBeKnownFor: string;
  };
  contentStrategy: {
    whatToPost: string[];
    whatNotToPost: string[];
    toneOfVoice: string;
    filmingStyle: string;
  };
  clientTargeting: {
    whoToAttract: string[];
    whoToAvoid: string[];
  };
  pricingStrategy: {
    tier: "budget" | "mid" | "premium";
    guidance: string;
  };
  brandIdentity: {
    visualDirection: string;
    languageStyle: string;
    colourPalette: string;
  };
  growthStrategy: {
    howThisArchetypeScalesBest: string;
    commonBlockers: string[];
  };
  actionThisWeek: string;
}

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  craftsman: {
    id: "craftsman",
    name: "The Craftsman",
    tagline: "Built right. Every time.",
    emoji: "🔨",
    identityDescription:
      "You're the tradie who gives a shit about the details. You take pride in doing the job properly — not just getting it done. You measure twice, cut once, and you'd rather lose a job than cut corners. Your work is your reputation, and you know it. The problem isn't your quality — it's that not enough people know about it.",
    strengths: [
      "Exceptional quality that earns repeat business without asking",
      "Clients who find you become loyal for life — and refer everyone they know",
      "Premium pricing power once your reputation is visible",
      "Deep trade knowledge that builds instant client confidence",
      "Your portfolio is your best sales tool — it does the work for you",
    ],
    weaknesses: [
      "Perfectionism slows you down — and you know it",
      "You struggle to delegate because no one does it quite right",
      "You're almost certainly undercharging for the quality you deliver",
      "You're invisible online — great work, no megaphone",
      "You find it hard to talk about yourself without feeling like you're showing off",
    ],
    defaultBehaviours: [
      "Spends extra time on finishing touches no one asked for — and doesn't charge for it",
      "Gets quietly frustrated watching other tradies rush jobs",
      "Has strong opinions on materials, methods, and shortcuts",
      "Keeps a tidy van, organised tools, and a mental catalogue of every job",
      "Would rather redo something than leave it at 90%",
    ],
    marketPerception:
      "Clients who find you love you and never leave. But you're often invisible to new clients because you don't shout about your work. Word of mouth is your engine — but it's slow, and you're leaving money on the table every week.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I'm a [trade] who does the job once, properly. No shortcuts, no callbacks, no excuses. If you want it done right the first time — you call me.",
        whatToBeKnownFor:
          "The tradie who takes pride in every single job. The one clients show off to their mates. Quality that's still standing in 20 years.",
      },
      contentStrategy: {
        whatToPost: [
          "Close-up detail shots that show the craftsmanship — the joints, the finishes, the precision work most tradies skip",
          "Before and after transformations where the quality difference is obvious",
          "Short explainers on why you do things a specific way — educate and demonstrate expertise at the same time",
        ],
        whatNotToPost: [
          "Rushed jobs or anything that doesn't represent your best work — one bad post undoes ten good ones",
          "Price-focused content — it commoditises you and attracts the wrong clients",
          "Generic motivational quotes that have nothing to do with your trade",
        ],
        toneOfVoice:
          "Confident, measured, and proud without being arrogant. You speak with authority about your trade. Short sentences. No fluff. Sounds like someone who's been doing this for 15 years and knows exactly what they're talking about.",
        filmingStyle:
          "Clean and deliberate. Good lighting. Close-up detail shots. Steady camera. Let the quality of the work be the star — not you talking to camera.",
      },
      clientTargeting: {
        whoToAttract: [
          "Homeowners doing a forever home — not a quick flip",
          "Clients who've been burned by a cheap tradie and won't make that mistake again",
          "Architects and designers who specify quality and refer premium tradies",
          "Property owners who understand that value and price are different things",
        ],
        whoToAvoid: [
          "Price shoppers who open with 'how cheap can you do it?'",
          "Developers cutting costs on every line item — they will drain your energy and your margin",
          "Clients who want it done yesterday — speed is the enemy of your standard",
        ],
      },
      pricingStrategy: {
        tier: "premium",
        guidance:
          "You should be in the top 20% of your market — and you're probably not there yet. Your quality justifies premium pricing, but you need to communicate that value before you quote. Lead with your portfolio, your process, and your testimonials. Stop discounting. The clients who push back on price aren't your clients.",
      },
      brandIdentity: {
        visualDirection:
          "Clean, minimal, and confident. Dark tones, strong typography, high-quality photography. No clip art. No cheap logos. Your brand should look as precise as your work — because clients judge the book by the cover before they ever see the job.",
        languageStyle:
          "Direct and authoritative. Short sentences. No corporate speak. Speak like a master of your trade, not a salesman. Use words like 'built', 'crafted', 'precise', 'right'.",
        colourPalette:
          "Deep charcoal or near-black as the base, warm white for contrast, and a single strong accent — burnt orange, navy, or forest green. Avoid bright primary colours. Looks expensive.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Craftsman scales by making the invisible visible. Your quality is already there — the problem is no one outside your existing clients knows about it. Start documenting your work obsessively. Build a portfolio that does the selling for you. Then niche down to the specific type of work you do exceptionally well, charge what it's actually worth, and build a team of tradies who share your standards.",
        commonBlockers: [
          "Refusing to delegate because 'no one does it like me' — this is the ceiling that keeps most Craftsmen small",
          "Not charging enough for the quality delivered — you're subsidising clients who don't appreciate it",
          "Invisible online — great work but no digital presence means no new clients",
          "Taking on every job instead of specialising in what you do best",
        ],
      },
      actionThisWeek:
        "Take 5 photos of your best recent work — close-up detail shots, not wide angles. Post one today with a single sentence about why you did it that way. That's your brand starting to work for you.",
    },
  },

  operator: {
    id: "operator",
    name: "The Operator",
    tagline: "Systems. Scale. Results.",
    emoji: "⚙️",
    identityDescription:
      "You think like a business owner, not just a tradie. You're building something bigger than yourself — systems, processes, and efficiency are your language. You're not just doing jobs, you're running a machine. You measure everything and you're always looking for ways to do it better, faster, and more profitably. The work is the product. The business is the real project.",
    strengths: [
      "Strong business acumen — you know your numbers and they guide your decisions",
      "Ability to scale through systems and delegation without quality dropping",
      "Consistent output because your process is documented, not just in your head",
      "Can run multiple crews and jobs simultaneously without chaos",
      "Clients trust you with bigger, more complex projects",
    ],
    weaknesses: [
      "Can feel impersonal to clients — too corporate, not enough human",
      "Staff turnover if culture and purpose aren't clearly defined",
      "Over-systematising can kill the flexibility that wins good clients",
      "Sometimes so focused on efficiency you miss the relationship that drives referrals",
      "Seen as 'just another big company' by clients who want a personal touch",
    ],
    defaultBehaviours: [
      "Has job management software and actually uses it — not just pays for it",
      "Tracks revenue, margins, and job costs weekly, not just at tax time",
      "Delegates well and trusts the team to execute",
      "Thinks in terms of processes and systems, not individual jobs",
      "Always asking 'how do we do this better next time?' after every job",
    ],
    marketPerception:
      "Seen as professional, reliable, and capable of handling volume. Clients trust you with bigger projects. But some clients worry you're too big to care about their job — and that's the gap you need to close.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "We're a [trade] company built on systems, not luck. You get consistent quality, clear communication, and a job that runs on time — every time. No surprises.",
        whatToBeKnownFor:
          "The tradie business that actually runs like a business. Professional, reliable, and capable of handling anything. The one builders and property managers call first.",
      },
      contentStrategy: {
        whatToPost: [
          "Behind-the-scenes of your systems — show how a job is managed from quote to completion",
          "Team culture content — the people behind the business build trust faster than any logo",
          "Project case studies with real scope, timeline, and outcome — show you can handle complexity",
        ],
        whatNotToPost: [
          "Anything that looks disorganised, reactive, or chaotic — it contradicts your entire brand",
          "Content that makes you look like a one-man band — you're building a company, not a personal brand",
          "Complaints about clients, suppliers, or other tradies — it's unprofessional and it sticks",
        ],
        toneOfVoice:
          "Professional but not corporate. Confident and clear. You speak like a business leader who also knows the trade inside out. Decisive. No waffle.",
        filmingStyle:
          "Polished and structured. Drone shots for large projects. Team shots. Clean graphics and captions. Looks like a proper company — because it is.",
      },
      clientTargeting: {
        whoToAttract: [
          "Commercial clients and project managers who need a reliable subcontractor",
          "Developers and builders who can't afford a tradie who doesn't show up",
          "Body corporates and facility managers with ongoing maintenance needs",
          "Businesses that want a long-term trade partner, not a one-off",
        ],
        whoToAvoid: [
          "Clients who want to micromanage every step — they'll slow your system down",
          "One-off residential jobs below your minimum job size",
          "Anyone who doesn't understand why process and documentation matter",
        ],
      },
      pricingStrategy: {
        tier: "mid",
        guidance:
          "Your edge is consistency and reliability at scale — price for that. Offer service agreements, maintenance contracts, and retainer arrangements. Price for the relationship, not the job. Your clients should be paying you before they even have a problem.",
      },
      brandIdentity: {
        visualDirection:
          "Clean and corporate-lite. Strong logo, consistent colours across vehicles and uniforms. Looks like a proper company. Professional photography of the team and large-scale projects — not just finished work.",
        languageStyle:
          "Clear, confident, and process-oriented. Use words like 'system', 'reliable', 'consistent', 'on time'. Avoid overly casual language — but don't sound like a bank either.",
        colourPalette:
          "Navy, white, and a strong accent — orange, red, or yellow. High contrast. Easy to read on vehicles and signage. Looks professional from 50 metres away.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Operator scales by doubling down on systems and hiring well. Build your operations manual, create repeatable processes for every job type, and hire people who fit your culture. The goal is a business that runs without you on the tools every day — and eventually without you managing every job.",
        commonBlockers: [
          "Hiring the wrong people and not having a culture document to filter them out",
          "Growing too fast before the systems are solid enough to support it",
          "Not tracking margins per job type — some work is killing your profit and you don't know it",
          "Underinvesting in marketing because 'we're busy enough' — busy isn't the same as profitable",
        ],
      },
      actionThisWeek:
        "Pick one recurring job type and write down the 5-step process for how it should run from first contact to invoice. That's the start of your operations manual — and the thing that lets you hire without chaos.",
    },
  },

  hustler: {
    id: "hustler",
    name: "The Hustler",
    tagline: "Fast. Hungry. Always moving.",
    emoji: "⚡",
    identityDescription:
      "You're the tradie who never stops. Always on the phone, always quoting, always moving. Cash flow is king and you know how to keep it flowing. You're not precious about the work — you're about volume, speed, and keeping the machine running. You outwork everyone around you. The risk isn't your work ethic — it's that hustle without direction eventually hits a ceiling.",
    strengths: [
      "High energy and relentless work ethic that clients notice immediately",
      "Strong sales ability — you can close a quote faster than most tradies can find their pen",
      "Good cash flow because you're always moving and always billing",
      "Adaptable and fast to respond — you answer the phone when others don't",
      "Builds a large client base quickly through sheer volume of activity",
    ],
    weaknesses: [
      "Quality can slip when volume gets too high — and one bad job can undo ten good ones",
      "Burnout risk is real — you're always on and you rarely switch off",
      "Hard to build premium positioning when you're known for speed and availability",
      "Everything runs through you — which means you're the bottleneck",
      "Difficult to scale because the hustle is personal, not systematic",
    ],
    defaultBehaviours: [
      "Answers the phone at 7am and 9pm — and doesn't think twice about it",
      "Quotes fast — sometimes too fast, and the margin suffers",
      "Always has three jobs running at once and somehow keeps them all moving",
      "Knows every supplier rep by name and gets things done through relationships",
      "Measures success by what landed in the account this week",
    ],
    marketPerception:
      "Seen as responsive, available, and reliable in the short term. Clients like that you show up and get it done. But some start to wonder if you're cutting corners to keep the pace up — and that doubt is the thing that stops you charging more.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I get it done. Fast, fair, and no messing around. You call, I show up. You need it done — I do it. No waiting, no excuses.",
        whatToBeKnownFor:
          "The tradie who actually answers the phone and shows up when they say they will. Fast turnaround, fair price, no drama. The one property managers call first.",
      },
      contentStrategy: {
        whatToPost: [
          "Same-day or next-day job completions — 'called at 8am, done by 2pm' is your brand in action",
          "Availability posts — 'spots open this week in [suburb]' — this is direct response marketing that works",
          "Fast turnaround testimonials from property managers and repeat clients",
        ],
        whatNotToPost: [
          "Anything that makes you look unreliable, disorganised, or like you're cutting corners",
          "Complaints about being too busy — it makes clients nervous about whether you'll show up",
          "Jobs you're not proud of — volume doesn't mean posting everything",
        ],
        toneOfVoice:
          "Fast, punchy, and direct. Short sentences. High energy. Sounds like a text message, not an essay. No fluff, no corporate speak, no waffle.",
        filmingStyle:
          "Raw and real. Phone footage is fine — it actually builds trust. Quick cuts. Show the pace and energy. Authenticity over polish every time.",
      },
      clientTargeting: {
        whoToAttract: [
          "Property managers with urgent maintenance needs — they need someone who answers",
          "Real estate agents needing pre-sale work done fast",
          "Clients who've been let down by no-shows and want reliability above everything",
          "Repeat residential clients who value fast response over lowest price",
        ],
        whoToAvoid: [
          "Clients who want the cheapest price — they'll drain your time and your margin",
          "Large complex projects that need slow, careful execution — they'll expose your weaknesses",
          "Clients who take 3 days to reply to a quote — they're not serious",
        ],
      },
      pricingStrategy: {
        tier: "mid",
        guidance:
          "You're not the cheapest and you shouldn't be. You're priced for speed and reliability — and those things have real value. Add a premium for urgent or same-day work. Stop racing to the bottom. Your responsiveness is worth money. Start charging for it.",
      },
      brandIdentity: {
        visualDirection:
          "Bold and energetic. Strong colours, clear messaging. Looks like it was made to be seen on a phone screen at 7am. High contrast, easy to read fast, impossible to ignore.",
        languageStyle:
          "Punchy and direct. Action words. 'Fast', 'now', 'today', 'done'. Sounds like a real person, not a company. Short. Sharp. No padding.",
        colourPalette:
          "Bold primary colours — red, yellow, or bright blue. High energy. Easy to spot on a van or a phone screen.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Hustler scales by hiring a second pair of hands before they need it — not after they're drowning. Then building a simple system to maintain quality at volume. Start tracking which job types make the most money per hour and do more of those. The goal is to move from doing everything yourself to running a small, fast team.",
        commonBlockers: [
          "Doing everything yourself and hitting a hard ceiling — you can only move so fast",
          "Not tracking which jobs are actually profitable — busy doesn't mean making money",
          "Reputation for speed over quality starting to catch up — one bad review can undo months of hustle",
          "No systems — everything lives in your head, which means it can't run without you",
        ],
      },
      actionThisWeek:
        "Track every job you do this week and write down the hours spent vs what you charged. Find the one job type that pays best per hour — and make that your focus for the next month.",
    },
  },

  specialist: {
    id: "specialist",
    name: "The Specialist",
    tagline: "The best in the game at one thing.",
    emoji: "🎯",
    identityDescription:
      "You've gone deep, not wide. You've chosen a niche and you own it. You're the go-to person for a specific type of work — and clients pay premium because they know you're the expert. You don't do everything. You do one thing better than anyone else. And that focus is worth more than most tradies realise.",
    strengths: [
      "Premium pricing power through genuine expertise — you're not competing on price",
      "Strong reputation in a specific niche that's hard to replicate",
      "Referrals from other tradies who don't do your niche — they send you their best clients",
      "Deep knowledge that builds instant client confidence — they feel safe immediately",
      "Less competition — you're in a category of one, not a race to the bottom",
    ],
    weaknesses: [
      "Vulnerable if the niche dries up, changes, or gets commoditised",
      "Smaller market — can be hard to fill the calendar without marketing",
      "Hard to explain what you do to people outside the niche — you need to educate before you sell",
      "Risk of being too narrow if the market shifts and you haven't built adjacent skills",
      "Can be perceived as expensive by clients who don't understand the value of specialisation",
    ],
    defaultBehaviours: [
      "Turns down work outside their specialty without hesitation — and feels good about it",
      "Knows more about their niche than most people in the entire industry",
      "Gets called in by other tradies to handle the hard stuff they can't do",
      "Charges more than generalists — and gets it, because clients feel the expertise",
      "Constantly upskilling and staying ahead of the niche — this is never finished",
    ],
    marketPerception:
      "Seen as the expert. Clients feel confident because they know they're getting the best person for the job. Referred by other tradies. Premium positioning is natural — but only if people know you exist.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I'm [name], and I specialise exclusively in [niche]. If you need [specific outcome], I'm the person you call. I don't do everything — I do this better than anyone in [area].",
        whatToBeKnownFor:
          "The undisputed expert in [niche]. The tradie other tradies call when they're out of their depth. Premium, precise, and worth every dollar.",
      },
      contentStrategy: {
        whatToPost: [
          "Deep-dive educational content about your niche — teach what others don't know and you become the obvious expert",
          "Complex problem-solving content — show the hard stuff you handle that generalists can't",
          "Case studies of unusual or challenging jobs that demonstrate your depth",
        ],
        whatNotToPost: [
          "General trade content outside your niche — it dilutes your positioning immediately",
          "Price-focused content — specialists don't compete on price, they compete on expertise",
          "Anything that makes you look like a generalist — it's the one thing that kills specialist positioning",
        ],
        toneOfVoice:
          "Authoritative and educational. You speak like the expert you are. Confident, not arrogant. You teach without talking down. Clients should feel smarter after reading your content.",
        filmingStyle:
          "Educational and detailed. Close-up technical shots, process walkthroughs, explainer-style content. Looks like a masterclass, not a sales pitch.",
      },
      clientTargeting: {
        whoToAttract: [
          "Clients with specific, complex problems in your niche who've been told 'no one can do this'",
          "Other tradies who need a specialist subcontractor — they become your best referral source",
          "Architects and engineers who specify specialist work and have premium clients",
          "Premium residential and commercial clients who understand why expertise costs more",
        ],
        whoToAvoid: [
          "Clients wanting a generalist at specialist prices — they'll never be happy",
          "Anyone who doesn't understand why you charge more — educating them is a full-time job",
          "Clients who want you to do work outside your specialty — it's a trap",
        ],
      },
      pricingStrategy: {
        tier: "premium",
        guidance:
          "You should be the most expensive option in your niche — and proud of it. Your expertise eliminates risk for clients. Price for the outcome, not the hours. Consider retainer arrangements with builders and other tradies who regularly need your specialty — that's recurring revenue without the quoting cycle.",
      },
      brandIdentity: {
        visualDirection:
          "Precise and technical. Clean design with a focus on your niche. Looks like a specialist, not a generalist. Photography that shows the complexity and quality of your specific work — not generic trade shots.",
        languageStyle:
          "Technical and authoritative. Use industry-specific language that signals expertise. Educate without overwhelming. Speak to clients who already know they need a specialist.",
        colourPalette:
          "Deep, sophisticated tones. Midnight blue, slate grey, or forest green. Signals expertise and premium positioning. Avoid anything that looks cheap or generic.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Specialist scales by becoming the most recognised name in their niche — online and in the industry. Build a referral network with complementary tradies, create educational content that attracts clients searching for your specialty, and consider training others in your niche as a revenue stream.",
        commonBlockers: [
          "Not marketing the specialty clearly enough — people don't know you exist, and that's the whole problem",
          "Undercharging because 'no one else charges that much' — you're the expert, act like it",
          "Taking on general work to fill gaps instead of doubling down on the niche",
          "Niche is too narrow — needs adjacent specialties to grow without abandoning the positioning",
        ],
      },
      actionThisWeek:
        "Write one sentence that describes exactly what you specialise in and who you do it for. Post it on your Google Business Profile today. That's your positioning statement — and it starts working the moment it's live.",
    },
  },

  leader: {
    id: "leader",
    name: "The Leader",
    tagline: "Building something bigger than the tools.",
    emoji: "🦁",
    identityDescription:
      "You're not just a tradie — you're building a brand and a team. You think about culture, reputation, and legacy. You want to be known, respected, and followed. You're the one other tradies look up to. You're building something that lasts beyond you — and you feel it every time you walk onto a job site.",
    strengths: [
      "Natural authority and ability to attract talented people who want to be part of something",
      "Strong brand presence that generates leads without cold outreach",
      "Ability to inspire and lead a team through culture, not just management",
      "Thinks long-term about reputation and legacy — not just this month's cash flow",
      "Can attract premium clients through brand alone — they come to you",
    ],
    weaknesses: [
      "Can get caught up in the brand and lose focus on the profitability that funds it",
      "Team management is demanding and emotionally taxing — people problems are constant",
      "High expectations can be hard to maintain at scale when you're not on every job",
      "Risk of ego getting in the way of good hiring and good decisions",
      "Brand-building takes time — it's slow to monetise and easy to get impatient",
    ],
    defaultBehaviours: [
      "Shows up at industry events and is known in the community — people know the name",
      "Mentors younger tradies and genuinely enjoys it",
      "Has a strong opinion on the direction of the industry and isn't afraid to share it",
      "Invests in team culture and development — not just tools and equipment",
      "Thinks about what they want to be remembered for, not just what they're billing this week",
    ],
    marketPerception:
      "Respected and well-known. Clients feel proud to work with you. Other tradies want to work for you. You're seen as a leader in the industry — not just a service provider. That's rare, and it's worth protecting.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "We're [business name] — a [trade] company built on culture, quality, and reputation. We're not just doing jobs. We're building a standard for the industry.",
        whatToBeKnownFor:
          "The tradie brand that sets the standard. The one clients brag about hiring. The business that other tradies respect and want to join.",
      },
      contentStrategy: {
        whatToPost: [
          "Leadership and culture content — show what you stand for and why your team chooses to work with you",
          "Industry commentary and opinion pieces — you have a point of view, use it",
          "Brand story content — why you built this business and what you're building toward",
        ],
        whatNotToPost: [
          "Content that undermines your authority or brand — one inconsistent post can confuse the narrative",
          "Complaints or negativity about the industry — leaders lift the industry, they don't drag it",
          "Anything that looks cheap or inconsistent with your brand — you've built something, protect it",
        ],
        toneOfVoice:
          "Authoritative and inspiring. You speak with conviction. You have a point of view on the industry. Direct, but with depth. You lead, you don't just inform.",
        filmingStyle:
          "High production value. Cinematic where possible. Shows the scale and culture of your business. Interviews with team members. Brand story videos. Looks like a proper company with a soul.",
      },
      clientTargeting: {
        whoToAttract: [
          "Premium residential clients who want the best and are willing to pay for it",
          "Commercial clients who value brand and reputation over lowest price",
          "Developers who want a reliable, reputable partner for multiple projects",
          "Clients who've heard about you through reputation and sought you out specifically",
        ],
        whoToAvoid: [
          "Clients who don't respect your brand or treat your team poorly",
          "Price-driven clients who don't value reputation — they'll never appreciate what you've built",
          "Anyone who tries to micromanage — they don't trust you, and that relationship won't work",
        ],
      },
      pricingStrategy: {
        tier: "premium",
        guidance:
          "You should command premium pricing based on brand and reputation alone. Your clients aren't just paying for the work — they're paying for the experience, the team, and the brand. Price confidently and don't apologise for it. The right clients won't flinch.",
      },
      brandIdentity: {
        visualDirection:
          "Premium and distinctive. Strong brand identity across everything — vehicles, uniforms, website, social. Looks like a company with a clear identity and values. Photography that shows the team and the culture, not just the finished work.",
        languageStyle:
          "Authoritative and values-driven. Speaks to culture, standards, and legacy. Uses 'we' not 'I'. Sounds like a brand, not an individual. Every word reinforces what you stand for.",
        colourPalette:
          "Strong, distinctive brand colours that are consistent across everything. Bold (black and gold) or refined (navy and cream). The palette should be ownable and recognisable from across a job site.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Leader scales by building a brand that attracts both clients and talent. Invest in culture, document your values, and build a team that embodies what you stand for. The goal is a business where the brand is bigger than any individual — including you.",
        commonBlockers: [
          "Ego getting in the way of good hiring decisions — the best leaders hire people better than them",
          "Brand-building without enough focus on profitability — a beautiful brand that loses money isn't a business",
          "Not delegating enough — still trying to be on the tools when you should be building the company",
          "Culture breaking down as the team grows — it needs active maintenance, not just good intentions",
        ],
      },
      actionThisWeek:
        "Write down the 3 things your business stands for — not what you do, but what you believe. Post one of them this week with a real story that proves it. That's your brand in action.",
    },
  },

  guardian: {
    id: "guardian",
    name: "The Guardian",
    tagline: "Trusted. Reliable. Always there.",
    emoji: "🛡️",
    identityDescription:
      "You're the tradie clients call for everything. You've been looking after the same families and businesses for years. Loyalty is your currency. You're not flashy, you're not the cheapest, and you're not trying to take over the world. You're the one they trust — and that trust is worth more than any marketing campaign. The problem is, not enough new people know you exist.",
    strengths: [
      "Exceptional client retention — your clients don't leave, and they send everyone they know",
      "Strong word-of-mouth referral network built over years of showing up",
      "Deep understanding of long-term client needs — you know their house better than they do",
      "Consistent and dependable — you never let people down, and that's rarer than it sounds",
      "Trusted advisor status with key clients — they call you before they call anyone else",
    ],
    weaknesses: [
      "Hard to grow beyond the existing client base — you're the best-kept secret in your area",
      "Can be taken for granted by long-term clients who expect the same price forever",
      "Reluctant to raise prices with loyal clients — and you've been undercharging for years",
      "Slow to adopt new technology or methods — it works, so why change it?",
      "Invisible to new clients — no online presence means no new pipeline",
    ],
    defaultBehaviours: [
      "Remembers clients' names, their kids' names, and what they had done last time",
      "Shows up on time, every time — and calls ahead if anything changes",
      "Does small favours that aren't on the invoice — and clients remember it for years",
      "Has clients who've been with them for 10+ years and wouldn't call anyone else",
      "Gets genuinely uncomfortable with pushy sales tactics — it's not who they are",
    ],
    marketPerception:
      "Beloved by existing clients. Invisible to new ones. You're the best-kept secret in your area — which is both your greatest strength and your biggest growth problem.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I'm the [trade] that [suburb] families and businesses have trusted for [X] years. I'm not the cheapest. I'm the one you call when you need it done right and you need someone you can trust completely.",
        whatToBeKnownFor:
          "The tradie your neighbours recommend without hesitation. The one who's been looking after the community for years. Trusted, reliable, and always there when you need them.",
      },
      contentStrategy: {
        whatToPost: [
          "Long-term client stories — with permission, these are your most powerful content because they prove loyalty over time",
          "Community and local area content — show you're part of the area, not just working in it",
          "Seasonal maintenance tips and reminders — this positions you as the trusted advisor, not just a service",
        ],
        whatNotToPost: [
          "Anything that feels inauthentic or salesy — your clients trust you because you're real, don't ruin it",
          "Overly polished content that loses your genuine feel — authenticity is your brand",
          "Anything that makes you look like a big corporate — that's the opposite of what you stand for",
        ],
        toneOfVoice:
          "Warm, genuine, and personal. Sounds like a neighbour, not a company. Honest and straightforward. The kind of person you'd trust with your house keys — because clients literally do.",
        filmingStyle:
          "Authentic and real. Natural lighting. Conversational to camera. Feels like a real person, not a production. Local and community-focused.",
      },
      clientTargeting: {
        whoToAttract: [
          "Long-term homeowners in your local area who want a tradie relationship, not a transaction",
          "Families who want someone they can trust completely — not just the cheapest quote",
          "Small businesses needing reliable ongoing maintenance from someone who knows the property",
          "Clients who've been burned by unreliable tradies and want the opposite",
        ],
        whoToAvoid: [
          "Clients who are just looking for the cheapest quote — they'll never value what you offer",
          "One-off clients with no potential for ongoing relationship — they're not your people",
          "Anyone who doesn't value the relationship — they'll drain your energy and your loyalty",
        ],
      },
      pricingStrategy: {
        tier: "mid",
        guidance:
          "You're undercharging your loyal clients and you know it. It's time to raise your rates — slowly and with honest communication. Your long-term clients will understand because they trust you. New clients should be paying your full rate from day one. Your reliability and trustworthiness are worth a premium — start charging for them.",
      },
      brandIdentity: {
        visualDirection:
          "Warm and approachable. Local feel. Family-friendly. Photos of real work in real homes — not staged shoots. Looks like a person, not a corporation. Consistent but never corporate.",
        languageStyle:
          "Personal and warm. First person. Conversational. Uses 'I' naturally. Sounds like a real person who genuinely cares — because you do.",
        colourPalette:
          "Warm, approachable tones. Earthy greens, warm blues, or classic navy and white. Feels trustworthy and local. Nothing that looks cold or corporate.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Guardian scales by turning loyal clients into active referrers and building a local reputation that attracts new clients organically. Ask for Google reviews, create a simple referral program, and start showing up online so new clients can find you. Your reputation is your biggest asset — it's time to start using it.",
        commonBlockers: [
          "Not asking for reviews or referrals from loyal clients — they'd happily do it, you just never ask",
          "Invisible online — no website, no Google Business Profile, no way for new clients to find you",
          "Undercharging long-term clients out of loyalty — it's costing you thousands every year",
          "Relying entirely on word of mouth with no active marketing — it works until it doesn't",
        ],
      },
      actionThisWeek:
        "Text your 3 best long-term clients today and ask them to leave you a Google review. Give them the direct link. That's the fastest thing you can do to start showing up for new clients who don't know you yet.",
    },
  },

  maverick: {
    id: "maverick",
    name: "The Maverick",
    tagline: "Different by design.",
    emoji: "🔥",
    identityDescription:
      "You do things your way. You've never followed the crowd and you're not about to start. You've got a strong personality, a unique approach, and clients either love you or they're not your people. You're not trying to appeal to everyone — you're building something distinctive and you're proud of it. The risk isn't your boldness — it's making sure the business behind the brand is as solid as the personality.",
    strengths: [
      "Highly distinctive brand that stands out in a sea of identical tradie businesses",
      "Strong personal brand and loyal following that generates leads through attraction",
      "Attracts clients who specifically want your style — they're pre-sold before they call",
      "Not competing on price — competing on personality and distinctiveness",
      "High energy and creativity that drives innovation and keeps the work interesting",
    ],
    weaknesses: [
      "Can alienate potential clients with a strong personality — but that's also the point",
      "Inconsistency if the personal brand isn't actively managed and protected",
      "Hard to scale because the brand is tied to you personally — you're the product",
      "Can be unpredictable — hard for clients to know what to expect if you're not consistent",
      "Risk of burning bridges in a small industry where everyone knows everyone",
    ],
    defaultBehaviours: [
      "Does things differently just because they can — and it usually works",
      "Has strong opinions and isn't afraid to share them publicly",
      "Builds a following, not just a client list — people come back for the personality",
      "Pushes back on clients who want to compromise the vision — and clients respect it",
      "Constantly experimenting with new approaches, new content, new ways of doing things",
    ],
    marketPerception:
      "Polarising — but in a good way. The clients who get you are fiercely loyal. The ones who don't aren't your clients anyway. You're memorable, distinctive, and impossible to ignore. That's the whole point.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I'm [name] and I do [trade] differently. If you want the same as everyone else, I'm not your tradie. If you want something that actually stands out — call me.",
        whatToBeKnownFor:
          "The tradie with a point of view. The one who does it differently and isn't apologetic about it. Distinctive, bold, and impossible to forget.",
      },
      contentStrategy: {
        whatToPost: [
          "Strong opinions about the industry — the takes that start conversations and build a following",
          "Behind-the-scenes of your unique approach — show why you do it differently",
          "Work that looks different from everyone else — your aesthetic is your brand",
        ],
        whatNotToPost: [
          "Generic content that looks like everyone else — it's the one thing that kills your positioning",
          "Safe, bland, corporate-style posts — they're the opposite of everything you stand for",
          "Content that tries to appeal to everyone — you're not for everyone, and that's the strength",
        ],
        toneOfVoice:
          "Bold, opinionated, and unapologetic. You have a point of view and you share it. Entertaining and engaging. Sounds like no one else in the industry — because you're not like anyone else.",
        filmingStyle:
          "Creative and distinctive. Doesn't look like a typical tradie video. Could be cinematic, could be raw — but it's always intentional and always unmistakably you.",
      },
      clientTargeting: {
        whoToAttract: [
          "Clients who specifically want your style and approach — they've done their research and chosen you",
          "Design-conscious clients who value creativity and want something that stands out",
          "Clients who've seen your work and sought you out — they're already sold",
          "People who become fans and advocates — they don't just hire you, they tell everyone",
        ],
        whoToAvoid: [
          "Clients who want you to do it 'like everyone else' — they'll never be happy with you",
          "Conservative clients who don't appreciate your style — they'll try to change you",
          "Anyone who tries to water down your approach — it's not worth it",
        ],
      },
      pricingStrategy: {
        tier: "premium",
        guidance:
          "Your distinctiveness is your premium. Clients who seek you out specifically are willing to pay more — because they can't get what you offer anywhere else. Don't discount to win work. If they're not willing to pay your rate, they're not your client. Your brand is the product as much as the work.",
      },
      brandIdentity: {
        visualDirection:
          "Bold and distinctive. Looks like nothing else in the industry. Strong visual identity that reflects your personality. Could be dark and edgy, bright and bold, or artistic and refined — but it's always unmistakably you.",
        languageStyle:
          "Distinctive and personal. Sounds like you, not a brand guide. Has a clear voice and point of view. Memorable and quotable. People should be able to tell it's you without seeing your name.",
        colourPalette:
          "Whatever fits your personality — but commit to it fully and consistently. Could be all black, could be bright and bold. The key is that it's ownable and instantly recognisable.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Maverick scales by building a personal brand so strong that the business grows through attraction, not outreach. Focus on content that builds a following, not just a client list. The challenge is systematising the work so the brand can grow beyond just you on the tools — because right now, you are the product.",
        commonBlockers: [
          "Brand too tied to personal identity — hard to scale because you can't clone yourself",
          "Inconsistency in content or approach undermining the brand — one off-brand post can confuse the narrative",
          "Not converting the following into actual paying clients — a big audience means nothing if it doesn't pay",
          "Burning out from the constant content and personality demands — the brand needs fuel, and that fuel is you",
        ],
      },
      actionThisWeek:
        "Post one genuine opinion about your industry this week — something you actually believe that most tradies wouldn't say publicly. That's the content that builds a following. Don't overthink it. Just say it.",
    },
  },
};

export const ARCHETYPE_ORDER: ArchetypeId[] = [
  "craftsman",
  "operator",
  "hustler",
  "specialist",
  "leader",
  "guardian",
  "maverick",
];
