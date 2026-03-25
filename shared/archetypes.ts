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
}

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  craftsman: {
    id: "craftsman",
    name: "The Craftsman",
    tagline: "Built right. Every time.",
    emoji: "🔨",
    identityDescription:
      "You're the tradie who gives a shit about the details. You take pride in doing the job properly — not just getting it done. You measure twice, cut once, and you'd rather lose a job than cut corners. Your work is your reputation, and you know it.",
    strengths: [
      "Exceptional quality of work",
      "High attention to detail",
      "Strong repeat and referral business",
      "Trustworthy and reliable reputation",
      "Premium pricing power through demonstrated quality",
    ],
    weaknesses: [
      "Can be slow to scale — perfectionism gets in the way",
      "Struggles to delegate because no one does it 'right'",
      "Often undercharges relative to the value delivered",
      "Can come across as inflexible or hard to work with",
      "Difficulty marketing yourself — you let the work speak but the work needs a megaphone",
    ],
    defaultBehaviours: [
      "Spends extra time on finishing touches no one asked for",
      "Gets frustrated watching other tradies rush jobs",
      "Has strong opinions on materials and methods",
      "Keeps a tidy van and organised tools",
      "Remembers every job and takes pride in the portfolio",
    ],
    marketPerception:
      "Clients who find you love you and never leave. But you're often invisible to new clients because you don't shout about your work. Word of mouth is your engine — but it's slow.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I'm a [trade] who does the job once, properly. No shortcuts, no callbacks, no excuses. If you want it done right, you call me.",
        whatToBeKnownFor:
          "The tradie who takes pride in every single job. The one clients show off to their mates. Quality that lasts.",
      },
      contentStrategy: {
        whatToPost: [
          "Before and after transformation shots — let the quality speak",
          "Close-up detail shots showing craftsmanship (joints, finishes, precision work)",
          "Time-lapse of a full job from start to finish",
          "Short explainers on why you do things a certain way",
          "Client testimonials focused on quality and attention to detail",
          "Behind-the-scenes of your process and tools",
        ],
        whatNotToPost: [
          "Rushed jobs or anything that doesn't represent your best work",
          "Price-focused content — it commoditises you",
          "Generic motivational quotes",
          "Anything that makes you look like you're in a hurry",
        ],
        toneOfVoice:
          "Confident, measured, and proud without being arrogant. You speak with authority about your trade. Direct and honest — no fluff.",
        filmingStyle:
          "Clean and polished. Good lighting. Close-up detail shots. Steady camera. Let the quality of the work be the star.",
      },
      clientTargeting: {
        whoToAttract: [
          "Homeowners who've been burned by cheap tradies before",
          "Clients doing forever homes — not flips",
          "Architects and designers who specify quality",
          "Property owners who understand value over price",
          "Commercial clients with quality standards",
        ],
        whoToAvoid: [
          "Price shoppers and quote collectors",
          "Clients who want it done yesterday",
          "Developers cutting costs on every line item",
          "Anyone who starts the conversation with 'how cheap can you do it?'",
        ],
      },
      pricingStrategy: {
        tier: "premium",
        guidance:
          "You should be in the top 20% of your market. Your quality justifies premium pricing — but you need to communicate that value before you quote. Stop discounting. Start showing why you're worth it. Lead with portfolio, testimonials, and process before you ever mention a number.",
      },
      brandIdentity: {
        visualDirection:
          "Clean, minimal, and confident. Think dark tones, strong typography, and high-quality photography. No clip art. No cheap logos. Your brand should look as precise as your work.",
        languageStyle:
          "Direct and authoritative. Short sentences. No corporate speak. Speak like a master of your trade, not a salesman.",
        colourPalette:
          "Deep charcoal, warm whites, and a single strong accent colour (burnt orange, navy, or forest green). Avoid bright primary colours.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Craftsman scales by building a reputation so strong that price becomes secondary. Focus on niching down to a specific type of work you do exceptionally well, then dominate that niche. Build a team of tradies who share your standards — and document your process so quality doesn't drop when you're not on site.",
        commonBlockers: [
          "Refusing to delegate because 'no one does it like me'",
          "Not charging enough for the quality delivered",
          "Invisible online — great work but no digital presence",
          "Taking on every job instead of specialising",
          "Perfectionism causing slow turnaround and missed opportunities",
        ],
      },
    },
  },

  operator: {
    id: "operator",
    name: "The Operator",
    tagline: "Systems. Scale. Results.",
    emoji: "⚙️",
    identityDescription:
      "You think like a business owner, not a tradie. You're building something bigger than yourself. Systems, processes, and efficiency are your language. You're not just doing jobs — you're running a machine. You measure everything and you're always looking for ways to do it better, faster, and more profitably.",
    strengths: [
      "Strong business acumen and financial awareness",
      "Ability to scale through systems and delegation",
      "Consistent quality through documented processes",
      "Profitable because you track numbers",
      "Can run multiple crews and jobs simultaneously",
    ],
    weaknesses: [
      "Can feel impersonal to clients — too corporate",
      "May lose the 'tradie feel' that builds trust",
      "Staff turnover if culture isn't right",
      "Can over-systematise and lose flexibility",
      "Sometimes seen as 'just another big company'",
    ],
    defaultBehaviours: [
      "Has job management software and actually uses it",
      "Tracks revenue, margins, and job costs weekly",
      "Delegates well and trusts the team",
      "Thinks in terms of processes, not individual jobs",
      "Always asking 'how do we do this better next time?'",
    ],
    marketPerception:
      "Seen as professional and reliable. Clients trust you with bigger projects. You can handle volume. But some clients worry you're too big to care about their small job.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "We're a [trade] company built on systems, not luck. You get consistent quality, clear communication, and a job that runs on time — every time.",
        whatToBeKnownFor:
          "The tradie business that actually runs like a business. Professional, reliable, and scalable. The one you call for big projects.",
      },
      contentStrategy: {
        whatToPost: [
          "Behind-the-scenes of your systems and processes",
          "Team culture content — show the people behind the business",
          "Project case studies with scope, timeline, and outcome",
          "How you handle large or complex jobs",
          "Content about your quality control process",
          "Before/after on commercial or large-scale projects",
        ],
        whatNotToPost: [
          "Anything that looks disorganised or reactive",
          "Content that makes you look like a one-man band",
          "Complaints about clients or other tradies",
          "Overly personal content that doesn't serve the brand",
        ],
        toneOfVoice:
          "Professional but not corporate. Confident and clear. You speak like a business leader who also knows the trade inside out.",
        filmingStyle:
          "Polished and structured. Drone shots for large projects. Team shots. Clean graphics and captions. Looks like a proper company.",
      },
      clientTargeting: {
        whoToAttract: [
          "Commercial clients and project managers",
          "Developers and builders needing reliable subcontractors",
          "Body corporates and facility managers",
          "Clients with ongoing maintenance contracts",
          "Businesses that need a reliable trade partner",
        ],
        whoToAvoid: [
          "Clients who want to micromanage every step",
          "One-off residential jobs below your minimum",
          "Clients who don't value systems or process",
          "Anyone who wants to 'just have a chat' without a clear brief",
        ],
      },
      pricingStrategy: {
        tier: "mid",
        guidance:
          "You should be pricing for volume and margin, not the highest rate. Your edge is consistency and reliability at scale. Offer service agreements, maintenance contracts, and retainer arrangements. Price for the relationship, not the job.",
      },
      brandIdentity: {
        visualDirection:
          "Clean, corporate-lite. Strong logo, consistent colours across vehicles and uniforms. Looks like a proper company. Professional photography of team and projects.",
        languageStyle:
          "Clear, confident, and process-oriented. Use words like 'system', 'process', 'reliable', 'consistent'. Avoid overly casual language.",
        colourPalette:
          "Navy, white, and a strong accent (orange, red, or yellow). High contrast. Easy to read on vehicles and signage.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Operator scales by doubling down on systems and hiring well. Build your operations manual, create repeatable processes for every job type, and hire people who fit your culture. The goal is a business that runs without you on the tools every day.",
        commonBlockers: [
          "Hiring the wrong people and not having a culture document",
          "Growing too fast before systems are solid",
          "Losing the personal touch that got you your first clients",
          "Not tracking margins per job type — some work is killing your profit",
          "Underinvesting in marketing because 'we're busy enough'",
        ],
      },
    },
  },

  hustler: {
    id: "hustler",
    name: "The Hustler",
    tagline: "Fast. Hungry. Always moving.",
    emoji: "⚡",
    identityDescription:
      "You're the tradie who never stops. You're always on the phone, always quoting, always moving. Cash flow is king and you know how to keep it flowing. You're not precious about the work — you're about volume, speed, and keeping the machine running. You outwork everyone around you.",
    strengths: [
      "High energy and relentless work ethic",
      "Strong sales ability and quick to close",
      "Good cash flow management",
      "Adaptable and fast to respond",
      "Builds a large client base quickly",
    ],
    weaknesses: [
      "Quality can slip when volume is too high",
      "Burnout risk — always on, never off",
      "Reputation can suffer if speed beats quality",
      "Hard to build premium positioning",
      "Difficult to scale because everything runs through you",
    ],
    defaultBehaviours: [
      "Answers the phone at 7am and 9pm",
      "Quotes fast — sometimes too fast",
      "Always has three jobs running at once",
      "Knows every supplier rep by name",
      "Measures success by how much is in the account",
    ],
    marketPerception:
      "Seen as responsive and available. Clients like that you show up and get it done. But some question whether you're cutting corners to keep the pace up.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I get it done. Fast, fair, and no messing around. You call, I show up. You need it done — I do it.",
        whatToBeKnownFor:
          "The tradie who actually answers the phone and shows up when they say they will. Fast turnaround, fair price, no drama.",
      },
      contentStrategy: {
        whatToPost: [
          "Same-day or next-day job completions",
          "Reactive content — 'just finished this job in [suburb]'",
          "Availability posts — 'spots open this week'",
          "Fast turnaround testimonials",
          "High volume of content — quantity over perfection",
          "Local area targeting content",
        ],
        whatNotToPost: [
          "Anything that makes you look unreliable or disorganised",
          "Complaints about being too busy",
          "Jobs you're not proud of",
          "Anything that looks rushed or sloppy",
        ],
        toneOfVoice:
          "Fast, punchy, and direct. Short sentences. High energy. Sounds like a text message, not an essay. No fluff.",
        filmingStyle:
          "Raw and real. Phone footage is fine. Quick cuts. Show the pace and energy. Authenticity over polish.",
      },
      clientTargeting: {
        whoToAttract: [
          "Clients who need it done now",
          "Property managers with urgent maintenance",
          "Real estate agents needing pre-sale work",
          "Clients who've been let down by no-shows",
          "Repeat residential clients who value reliability",
        ],
        whoToAvoid: [
          "Clients who want the cheapest price — they'll drain you",
          "Large complex projects that need slow, careful execution",
          "Clients who want to manage every detail",
          "Anyone who takes 3 days to reply to a quote",
        ],
      },
      pricingStrategy: {
        tier: "mid",
        guidance:
          "You're not the cheapest and you shouldn't be. You're priced for speed and reliability. Add a premium for urgent or same-day work. Stop racing to the bottom — your responsiveness is worth money. Charge for it.",
      },
      brandIdentity: {
        visualDirection:
          "Bold and energetic. Strong colours, clear messaging. Looks like it was made to be seen on a phone screen. High contrast, easy to read fast.",
        languageStyle:
          "Punchy and direct. Action words. 'Fast', 'now', 'today', 'done'. Sounds like a real person, not a company.",
        colourPalette:
          "Bold primary colours — red, yellow, or bright blue. High energy. Easy to spot.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Hustler scales by hiring a second pair of hands before they need it, then building a simple system to maintain quality at volume. The goal is to move from doing everything yourself to running a small, fast team. Start tracking which job types make the most money per hour — and do more of those.",
        commonBlockers: [
          "Doing everything yourself and hitting a ceiling",
          "Not tracking which jobs are actually profitable",
          "Reputation for speed over quality catching up",
          "Burnout from never switching off",
          "No systems — everything lives in your head",
        ],
      },
    },
  },

  specialist: {
    id: "specialist",
    name: "The Specialist",
    tagline: "The best in the game at one thing.",
    emoji: "🎯",
    identityDescription:
      "You've gone deep, not wide. You've chosen a niche and you own it. You're the go-to person for a specific type of work — and clients pay premium because they know you're the expert. You don't do everything. You do one thing better than anyone else.",
    strengths: [
      "Premium pricing power through expertise",
      "Strong reputation in a specific niche",
      "Less competition — you're not fighting on price",
      "Referrals from other tradies who don't do your niche",
      "Deep knowledge that builds client confidence",
    ],
    weaknesses: [
      "Vulnerable if the niche dries up or changes",
      "Smaller market — can be hard to fill the calendar",
      "Can be hard to explain what you do to people outside the niche",
      "May need to educate clients before they understand your value",
      "Risk of being too narrow if the market shifts",
    ],
    defaultBehaviours: [
      "Turns down work outside their specialty without hesitation",
      "Knows more about their niche than most people in the industry",
      "Gets called in by other tradies to handle the hard stuff",
      "Charges more than generalists — and gets it",
      "Constantly upskilling and staying ahead of the niche",
    ],
    marketPerception:
      "Seen as the expert. Clients feel confident because they know they're getting the best person for the job. Referred by other tradies. Premium positioning is natural.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I'm [name], and I specialise exclusively in [niche]. If you need [specific outcome], I'm the person you call. I don't do everything — I do this better than anyone.",
        whatToBeKnownFor:
          "The undisputed expert in [niche]. The tradie other tradies call when they're out of their depth. Premium, precise, and worth every dollar.",
      },
      contentStrategy: {
        whatToPost: [
          "Deep-dive educational content about your niche",
          "Complex problem-solving content — show the hard stuff you handle",
          "Industry insights and trends in your specialty",
          "Case studies of unusual or challenging jobs",
          "Content that positions you as the educator in your niche",
          "Testimonials from other tradies who refer to you",
        ],
        whatNotToPost: [
          "General trade content outside your niche",
          "Price-focused content",
          "Anything that makes you look like a generalist",
          "Content that dumbs down your expertise",
        ],
        toneOfVoice:
          "Authoritative and educational. You speak like the expert you are. Confident, not arrogant. You teach without talking down.",
        filmingStyle:
          "Educational and detailed. Whiteboard-style explainers, close-up technical shots, process walkthroughs. Looks like a masterclass.",
      },
      clientTargeting: {
        whoToAttract: [
          "Clients with specific, complex problems in your niche",
          "Other tradies who need a specialist subcontractor",
          "Architects and engineers who specify specialist work",
          "Clients who've been told 'no one can do this' by others",
          "Premium residential and commercial clients",
        ],
        whoToAvoid: [
          "Clients wanting a generalist at specialist prices",
          "Anyone who doesn't understand why you charge more",
          "Clients who want you to do work outside your specialty",
          "Price shoppers who don't value expertise",
        ],
      },
      pricingStrategy: {
        tier: "premium",
        guidance:
          "You should be the most expensive option in your niche — and proud of it. Your expertise eliminates risk for clients. Price for the outcome, not the hours. Consider retainer arrangements with builders and other tradies who regularly need your specialty.",
      },
      brandIdentity: {
        visualDirection:
          "Precise and technical. Clean design with a focus on your niche. Looks like a specialist, not a generalist. Photography that shows the complexity and quality of your specific work.",
        languageStyle:
          "Technical and authoritative. Use industry-specific language that signals expertise. Educate without overwhelming. Speak to clients who already know they need a specialist.",
        colourPalette:
          "Deep, sophisticated tones. Midnight blue, slate grey, or forest green. Signals expertise and premium positioning.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Specialist scales by becoming the most recognised name in their niche — online and in the industry. Build a referral network with other tradies, create educational content that attracts clients searching for your specialty, and consider training others in your niche as a revenue stream.",
        commonBlockers: [
          "Not marketing the specialty clearly enough — people don't know you exist",
          "Undercharging because 'no one else charges that much'",
          "Taking on general work to fill gaps instead of doubling down on the niche",
          "Not building a referral network with complementary tradies",
          "Niche is too narrow — needs adjacent specialties to grow",
        ],
      },
    },
  },

  leader: {
    id: "leader",
    name: "The Leader",
    tagline: "Building something bigger than the tools.",
    emoji: "🦁",
    identityDescription:
      "You're not just a tradie — you're building a brand and a team. You think about culture, reputation, and legacy. You want to be known, respected, and followed. You're the one other tradies look up to. You're building something that lasts beyond you.",
    strengths: [
      "Natural authority and ability to attract talent",
      "Strong brand presence and community recognition",
      "Ability to inspire and lead a team",
      "Thinks long-term about reputation and legacy",
      "Can attract premium clients through brand alone",
    ],
    weaknesses: [
      "Can get caught up in the brand and lose focus on the work",
      "Team management is demanding and emotionally taxing",
      "High expectations can be hard to maintain at scale",
      "Risk of ego getting in the way of good decisions",
      "Brand-building takes time — slow to monetise",
    ],
    defaultBehaviours: [
      "Shows up at industry events and is known in the community",
      "Mentors younger tradies",
      "Has a strong opinion on the direction of the industry",
      "Invests in team culture and development",
      "Thinks about what they want to be remembered for",
    ],
    marketPerception:
      "Respected and well-known. Clients feel proud to work with you. Other tradies want to work for you. You're seen as a leader in the industry, not just a service provider.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "We're [business name] — a [trade] company built on culture, quality, and reputation. We're not just doing jobs. We're building a standard for the industry.",
        whatToBeKnownFor:
          "The tradie brand that sets the standard. The one clients brag about hiring. The business that other tradies respect and want to join.",
      },
      contentStrategy: {
        whatToPost: [
          "Leadership and culture content — show what you stand for",
          "Team stories and behind-the-scenes of your culture",
          "Industry commentary and opinion pieces",
          "Mentorship and giving-back content",
          "Brand story content — why you built this business",
          "Premium project showcases that reflect your brand values",
        ],
        whatNotToPost: [
          "Content that undermines your authority or brand",
          "Complaints or negativity about the industry",
          "Anything that looks cheap or inconsistent with your brand",
          "Personal content that doesn't serve the brand narrative",
        ],
        toneOfVoice:
          "Authoritative and inspiring. You speak with conviction. You have a point of view on the industry. Direct, but with depth. You lead, you don't just inform.",
        filmingStyle:
          "High production value. Cinematic. Shows the scale and culture of your business. Interviews with team members. Brand story videos. Looks like a proper company with a soul.",
      },
      clientTargeting: {
        whoToAttract: [
          "Premium residential clients who want the best",
          "Commercial clients who value brand and reputation",
          "Clients who want to be associated with a quality brand",
          "Developers who want a reliable, reputable partner",
          "Clients who've heard about you through reputation",
        ],
        whoToAvoid: [
          "Clients who don't respect your brand or team",
          "Price-driven clients who don't value reputation",
          "Anyone who treats your team poorly",
          "Clients who want to micromanage",
        ],
      },
      pricingStrategy: {
        tier: "premium",
        guidance:
          "You should command premium pricing based on brand and reputation alone. Your clients aren't just paying for the work — they're paying for the experience, the team, and the brand. Price confidently and don't apologise for it.",
      },
      brandIdentity: {
        visualDirection:
          "Premium and distinctive. Strong brand identity across everything — vehicles, uniforms, website, social. Looks like a company with a clear identity and values. Photography that shows the team and the culture, not just the work.",
        languageStyle:
          "Authoritative and values-driven. Speaks to culture, standards, and legacy. Uses 'we' not 'I'. Sounds like a brand, not an individual.",
        colourPalette:
          "Strong, distinctive brand colours that are consistent across everything. Could be bold (black and gold) or refined (navy and cream). The palette should be ownable and recognisable.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Leader scales by building a brand that attracts both clients and talent. Invest in culture, document your values, and build a team that embodies what you stand for. The goal is a business where the brand is bigger than any individual — including you.",
        commonBlockers: [
          "Ego getting in the way of good hiring decisions",
          "Brand-building without enough focus on profitability",
          "Not delegating enough — still trying to be on the tools",
          "Culture breaking down as the team grows",
          "Losing the personal touch that built the reputation",
        ],
      },
    },
  },

  guardian: {
    id: "guardian",
    name: "The Guardian",
    tagline: "Trusted. Reliable. Always there.",
    emoji: "🛡️",
    identityDescription:
      "You're the tradie clients call for everything. You've been looking after the same families and businesses for years. Loyalty is your currency. You're not flashy, you're not the cheapest, and you're not trying to take over the world. You're the one they trust — and that trust is worth more than any marketing campaign.",
    strengths: [
      "Exceptional client retention and loyalty",
      "Strong word-of-mouth referral network",
      "Deep understanding of long-term client needs",
      "Consistent and dependable — never lets people down",
      "Trusted advisor status with key clients",
    ],
    weaknesses: [
      "Hard to grow beyond the existing client base",
      "Can be taken for granted by long-term clients",
      "Reluctant to raise prices with loyal clients",
      "Slow to adopt new technology or methods",
      "Invisible to new clients — no marketing presence",
    ],
    defaultBehaviours: [
      "Remembers clients' names, kids, and preferences",
      "Shows up on time, every time",
      "Does small favours that aren't on the invoice",
      "Has clients who've been with them for 10+ years",
      "Gets uncomfortable with pushy sales tactics",
    ],
    marketPerception:
      "Beloved by existing clients. Invisible to new ones. You're the best-kept secret in your area — which is both your strength and your biggest problem.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I'm the [trade] that [suburb] families and businesses have trusted for [X] years. I'm not the cheapest. I'm the one you call when you need it done right and you need someone you can trust.",
        whatToBeKnownFor:
          "The tradie your neighbours recommend without hesitation. The one who's been looking after the community for years. Trusted, reliable, and always there.",
      },
      contentStrategy: {
        whatToPost: [
          "Community and local area content",
          "Long-term client stories (with permission)",
          "Seasonal maintenance tips and reminders",
          "Content that shows your longevity and experience",
          "Local landmarks and community involvement",
          "Genuine, personal content that shows who you are",
        ],
        whatNotToPost: [
          "Anything that feels inauthentic or salesy",
          "Content that doesn't feel local and personal",
          "Overly polished content that loses your genuine feel",
          "Anything that makes you look like a big corporate",
        ],
        toneOfVoice:
          "Warm, genuine, and personal. Sounds like a neighbour, not a company. Honest and straightforward. The kind of person you'd trust with your house keys.",
        filmingStyle:
          "Authentic and real. Natural lighting. Conversational to camera. Feels like a real person, not a production. Local and community-focused.",
      },
      clientTargeting: {
        whoToAttract: [
          "Long-term homeowners in your local area",
          "Families who want a trusted tradie relationship",
          "Small businesses needing reliable ongoing maintenance",
          "Clients who've been burned by unreliable tradies",
          "Elderly clients who need someone they can trust completely",
        ],
        whoToAvoid: [
          "Clients who are just looking for the cheapest quote",
          "One-off clients with no potential for ongoing relationship",
          "Clients outside your local area",
          "Anyone who doesn't value the relationship",
        ],
      },
      pricingStrategy: {
        tier: "mid",
        guidance:
          "You're undercharging your loyal clients and you know it. It's time to raise your rates — slowly and with communication. Your long-term clients will understand. And new clients should be paying your full rate from day one. Your reliability and trustworthiness are worth a premium.",
      },
      brandIdentity: {
        visualDirection:
          "Warm and approachable. Local feel. Family-friendly. Photos of real work in real homes. Looks like a person, not a corporation. Consistent but not corporate.",
        languageStyle:
          "Personal and warm. First person. Conversational. Uses 'I' and 'we' naturally. Sounds like a real person who cares.",
        colourPalette:
          "Warm, approachable tones. Earthy greens, warm blues, or classic navy and white. Feels trustworthy and local.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Guardian scales by turning loyal clients into active referrers and building a local reputation that attracts new clients organically. Ask for Google reviews, create a referral program, and start showing up online so new clients can find you. Your reputation is your biggest asset — start using it.",
        commonBlockers: [
          "Not asking for reviews or referrals from loyal clients",
          "Invisible online — no website, no Google Business Profile",
          "Undercharging long-term clients out of loyalty",
          "Not growing beyond the existing client base",
          "Relying entirely on word of mouth with no active marketing",
        ],
      },
    },
  },

  maverick: {
    id: "maverick",
    name: "The Maverick",
    tagline: "Different by design.",
    emoji: "🔥",
    identityDescription:
      "You do things your way. You've never followed the crowd and you're not about to start. You've got a strong personality, a unique approach, and clients either love you or they're not your people. You're not trying to appeal to everyone — you're building something distinctive and you're proud of it.",
    strengths: [
      "Highly distinctive brand that stands out",
      "Strong personal brand and loyal following",
      "Attracts clients who specifically want your style",
      "Not competing on price — competing on personality",
      "High energy and creativity that drives innovation",
    ],
    weaknesses: [
      "Can alienate potential clients with strong personality",
      "Inconsistency if the personal brand isn't managed",
      "Hard to scale because the brand is tied to you personally",
      "Can be unpredictable — hard for clients to know what to expect",
      "Risk of burning bridges in a small industry",
    ],
    defaultBehaviours: [
      "Does things differently just because they can",
      "Has strong opinions and isn't afraid to share them",
      "Builds a following, not just a client list",
      "Pushes back on clients who want to compromise the vision",
      "Constantly experimenting with new approaches",
    ],
    marketPerception:
      "Polarising — but in a good way. The clients who get you are fiercely loyal. The ones who don't aren't your clients anyway. You're memorable, distinctive, and impossible to ignore.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I'm [name] and I do [trade] differently. If you want the same as everyone else, I'm not your tradie. If you want something that actually stands out — call me.",
        whatToBeKnownFor:
          "The tradie with a point of view. The one who does it differently and isn't apologetic about it. Distinctive, bold, and impossible to forget.",
      },
      contentStrategy: {
        whatToPost: [
          "Strong opinions about the industry",
          "Behind-the-scenes of your unique approach",
          "Content that shows your personality, not just your work",
          "Controversial takes that start conversations",
          "Work that looks different from everyone else",
          "Personal story content that builds the brand narrative",
        ],
        whatNotToPost: [
          "Generic content that looks like everyone else",
          "Safe, bland, corporate-style posts",
          "Anything that dilutes your distinctive personality",
          "Content that tries to appeal to everyone",
        ],
        toneOfVoice:
          "Bold, opinionated, and unapologetic. You have a point of view and you share it. Entertaining and engaging. Sounds like no one else in the industry.",
        filmingStyle:
          "Creative and distinctive. Doesn't look like a typical tradie video. Could be cinematic, could be raw — but it's always intentional and always on-brand.",
      },
      clientTargeting: {
        whoToAttract: [
          "Clients who specifically want your style and approach",
          "Design-conscious clients who value creativity",
          "Clients who've seen your work and sought you out",
          "People who want something different from the norm",
          "Clients who become fans and advocates",
        ],
        whoToAvoid: [
          "Clients who want you to do it 'like everyone else'",
          "Conservative clients who don't appreciate your style",
          "Anyone who tries to change your approach",
          "Clients who don't get your brand",
        ],
      },
      pricingStrategy: {
        tier: "premium",
        guidance:
          "Your distinctiveness is your premium. Clients who seek you out specifically are willing to pay more. Don't discount to win work — if they're not willing to pay your rate, they're not your client. Your brand is the product as much as the work.",
      },
      brandIdentity: {
        visualDirection:
          "Bold and distinctive. Looks like nothing else in the industry. Strong visual identity that reflects your personality. Could be dark and edgy, bright and bold, or artistic and refined — but it's always unmistakably you.",
        languageStyle:
          "Distinctive and personal. Sounds like you, not a brand guide. Has a clear voice and point of view. Memorable and quotable.",
        colourPalette:
          "Whatever fits your personality — but commit to it fully. Could be all black, could be bright and bold. The key is that it's ownable and consistent.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Maverick scales by building a personal brand so strong that the business grows through attraction, not outreach. Focus on content that builds a following, not just a client list. Consider how to systematise the work so the brand can grow beyond just you on the tools.",
        commonBlockers: [
          "Brand too tied to personal identity — hard to scale",
          "Inconsistency in content or approach undermining the brand",
          "Alienating potential clients with too-strong opinions",
          "Not converting the following into actual paying clients",
          "Burning out from the constant content and personality demands",
        ],
      },
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
