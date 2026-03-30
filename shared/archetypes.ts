// Tradie Quiz — Master Execution Spec v2
// 5 Archetypes: PC, SO, HT, VC, RB
// Tiebreak: HT > SO > PC > RB > VC

export type ArchetypeId = "PC" | "SO" | "HT" | "VC" | "RB";

export const ARCHETYPE_ORDER: ArchetypeId[] = ["PC", "SO", "HT", "VC", "RB"];

// Tiebreak priority (enforced when scores are equal)
export const TIEBREAK_ORDER: ArchetypeId[] = ["HT", "SO", "PC", "RB", "VC"];

export interface Archetype {
  id: ArchetypeId;
  name: string;
  tagline: string;
  emoji: string;
  // Results engine sections
  identity: string;
  universalTruths: string[];
  mirrorStatements: string[];
  immediateValue: {
    leanInto: string;
    holdingYouBack: string;
    oneShift: string;
  };
  reframe: string;
  gap: string;
  tension: string;
  positioningSnapshot: {
    pursue: string[];
    avoid: string[];
    howToPresent: string;
  };
  transition: string;
  // Brand playbook
  playbook: {
    positioning: {
      howToDescribeYourself: string;
      whatToBeKnownFor: string;
    };
    contentStrategy: {
      whatToPost: string[];
      whatNotToPost: string[];
      toneOfVoice: string;
    };
    clientTargeting: {
      whoToAttract: string[];
      whoToAvoid: string[];
    };
    pricingStrategy: {
      tier: "budget" | "mid" | "premium" | "ultra-premium";
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
  };
}

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  PC: {
    id: "PC",
    name: "The Precision Craftsman",
    tagline: "Quality is your brand. Every job is a signature.",
    emoji: "🔨",
    identity:
      "You are The Precision Craftsman. You take more care than anyone else on site — and you know it. Every job you finish is a direct reflection of who you are. You do not cut corners. You do not rush. You would rather lose a job than deliver something you are not proud of. The work is the standard, and the standard is non-negotiable.",
    universalTruths: [
      "You have redone work that the client would never have noticed — because you noticed.",
      "You have watched other tradies rush a job and felt something close to physical discomfort.",
      "You have undercharged for work that took twice as long because you refused to do it any other way.",
      "Clients who find you tend to stay with you for years — because no one else does it the way you do.",
      "You find it genuinely hard to talk about yourself, even though your work speaks loudly.",
    ],
    mirrorStatements: [
      "You are not slow — you are thorough. There is a difference, and you know it.",
      "You have a higher standard than most clients even know to ask for.",
      "You take pride in the parts of the job no one else will ever see.",
      "You measure twice because you have seen what happens when someone does not.",
      "Your callbacks are almost zero — and that is not an accident.",
    ],
    immediateValue: {
      leanInto:
        "Document your work obsessively. Every detail shot, every before-and-after, every close-up finish. Your quality is invisible to the market right now. Making it visible is the single highest-leverage thing you can do this week.",
      holdingYouBack:
        "You are almost certainly undercharging. Your pricing reflects what other tradies charge, not what your standard is worth. The gap between your quality and your rate is where you are losing money every single week.",
      oneShift:
        "Raise your rate on the next quote by 15 percent. Do not explain it. Do not apologise for it. See what happens. Most Precision Craftsmen are shocked to find clients do not even push back.",
    },
    reframe:
      "You do not have a work problem. You have a positioning problem. Your quality is already there. The market just does not know it yet.",
    gap: "The problem is, none of this is structured into how you present yourself. Clients who find you love you. But the clients who would pay your real rate cannot find you — because your brand does not communicate what you actually deliver.",
    tension:
      "You are better than your current positioning reflects. The gap between your standard and your visibility is costing you real money every month.",
    positioningSnapshot: {
      pursue: [
        "Homeowners doing a forever home who want it done once, properly",
        "Clients who have been burned by a cheap tradie and will not make that mistake again",
        "Architects and designers who specify quality and refer premium tradies",
        "Property owners who understand that value and price are different things",
      ],
      avoid: [
        "Price shoppers who open with how cheap can you do it",
        "Developers cutting costs on every line item",
        "Clients who want it done yesterday — speed is the enemy of your standard",
      ],
      howToPresent:
        "Lead with your portfolio. Let the work do the talking before you say a word about price. Show the detail, the finish, the precision. Then quote at the rate that reflects it.",
    },
    transition:
      "You have got the identity. But you do not have the system to execute it. Your quality deserves a brand that matches it — one that attracts the right clients, communicates your standard before you open your mouth, and lets you charge what your work is actually worth.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I am a [trade] who does the job once, properly. No shortcuts, no callbacks, no excuses. If you want it done right the first time — you call me.",
        whatToBeKnownFor:
          "The tradie who takes pride in every single job. The one clients show off to their mates. Quality that is still standing in 20 years.",
      },
      contentStrategy: {
        whatToPost: [
          "Close-up detail shots that show the craftsmanship — the joints, the finishes, the precision work most tradies skip",
          "Before and after transformations where the quality difference is obvious",
          "Short explainers on why you do things a specific way — educate and demonstrate expertise simultaneously",
        ],
        whatNotToPost: [
          "Rushed jobs or anything that does not represent your best work — one bad post undoes ten good ones",
          "Price-focused content — it commoditises you and attracts the wrong clients",
          "Generic motivational quotes that have nothing to do with your trade",
        ],
        toneOfVoice:
          "Confident, measured, and proud without being arrogant. You speak with authority about your trade. Short sentences. No fluff. Sounds like someone who has been doing this for 15 years and knows exactly what they are talking about.",
      },
      clientTargeting: {
        whoToAttract: [
          "Homeowners doing a forever home — not a quick flip",
          "Clients who have been burned by a cheap tradie and will not make that mistake again",
          "Architects and designers who specify quality and refer premium tradies",
        ],
        whoToAvoid: [
          "Price shoppers who open with how cheap can you do it",
          "Developers cutting costs on every line item",
          "Clients who want it done yesterday",
        ],
      },
      pricingStrategy: {
        tier: "premium",
        guidance:
          "You should be in the top 20 percent of your market — and you are probably not there yet. Your quality justifies premium pricing, but you need to communicate that value before you quote. Stop discounting. The clients who push back on price are not your clients.",
      },
      brandIdentity: {
        visualDirection:
          "Clean, minimal, and confident. Dark tones, strong typography, high-quality photography. No clip art. No cheap logos. Your brand should look as precise as your work.",
        languageStyle:
          "Direct and authoritative. Short sentences. No corporate speak. Speak like a master of your trade, not a salesman.",
        colourPalette:
          "Deep charcoal or near-black as the base, warm white for contrast, and a single strong accent — burnt orange, navy, or forest green. Looks expensive.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Precision Craftsman scales by making the invisible visible. Your quality is already there — the problem is no one outside your existing clients knows about it. Start documenting your work obsessively. Niche down to the specific type of work you do exceptionally well, charge what it is actually worth, and build a team who share your standards.",
        commonBlockers: [
          "Refusing to delegate because no one does it like me — this is the ceiling that keeps most Precision Craftsmen small",
          "Not charging enough for the quality delivered",
          "Invisible online — great work but no digital presence means no new clients",
        ],
      },
      actionThisWeek:
        "Take 5 photos of your best recent work — close-up detail shots, not wide angles. Post one today with a single sentence about why you did it that way. That is your brand starting to work for you.",
    },
  },

  SO: {
    id: "SO",
    name: "The Systems Operator",
    tagline: "You run a business, not just a trade.",
    emoji: "⚙️",
    identity:
      "You are The Systems Operator. You think like a business owner, not just a tradie. You are building something bigger than yourself — systems, processes, and efficiency are your language. You are not just doing jobs, you are running a machine. You measure everything and you are always looking for ways to do it better, faster, and more profitably.",
    universalTruths: [
      "You have job management software and you actually use it — not just pay for it.",
      "You track revenue, margins, and job costs regularly, not just at tax time.",
      "You think in terms of processes and systems, not individual jobs.",
      "You have asked how do we do this better next time after finishing a job.",
      "You know what your business costs to run — and you price accordingly.",
    ],
    mirrorStatements: [
      "You are not just a tradie — you are running a commercial operation.",
      "You delegate well and trust your team to execute.",
      "You have documented processes that exist outside your head.",
      "You think about the business five years from now, not just next week.",
      "You know the difference between being busy and being profitable.",
    ],
    immediateValue: {
      leanInto:
        "Your systems are your competitive advantage. Make them visible. Show clients and potential hires what a professional, organised operation looks like. Most tradies are winging it — you are not, and that is worth communicating.",
      holdingYouBack:
        "Your brand probably looks like every other tradie in your market. The professionalism you have built internally is not reflected in how you present externally. Clients cannot see your systems — they can only see your brand.",
      oneShift:
        "Audit your client-facing touchpoints this week. Quote template, email signature, website, social media. Do they look as professional as your operation actually is? Close the gap between how you run and how you look.",
    },
    reframe:
      "You do not have an operations problem. You have a perception problem. Your business runs well. The market just does not know it yet.",
    gap: "The problem is, none of this is structured into how you present yourself. Your systems are real. Your professionalism is real. But your brand does not communicate it — and that is costing you the clients and the rates you deserve.",
    tension:
      "You are better than your current positioning reflects. You have built something genuinely professional. Now your brand needs to match it.",
    positioningSnapshot: {
      pursue: [
        "Developers and builders who want a reliable, systemised trade partner",
        "Property managers who need a tradie they can trust to run without hand-holding",
        "Commercial clients who value consistency and clear communication above all else",
      ],
      avoid: [
        "Clients who want a personal touch above all else — they will feel like a number",
        "Jobs that fall outside your documented scope and break your systems",
        "Clients who pay slowly or require excessive follow-up to settle invoices",
      ],
      howToPresent:
        "Lead with your process. Show clients what working with you looks like from quote to completion. Professional documentation, clear communication, no surprises. That is your pitch.",
    },
    transition:
      "You have got the identity. But you do not have the system to execute it. Your operation deserves a brand that matches it — one that communicates your professionalism before the first conversation, attracts the right clients, and positions you to charge what a properly run business is worth.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "We are a [trade] company built on systems, not luck. You get consistent quality, clear communication, and a job that runs on time — every time. No surprises.",
        whatToBeKnownFor:
          "The tradie business that actually runs like a business. Professional, reliable, and capable of handling anything. The one builders and property managers call first.",
      },
      contentStrategy: {
        whatToPost: [
          "Behind-the-scenes of your systems — show how a job is managed from quote to completion",
          "Team culture content — the people behind the business build trust faster than any logo",
          "Project case studies with real scope, timeline, and outcome",
        ],
        whatNotToPost: [
          "Anything that looks disorganised, reactive, or chaotic — it contradicts your entire brand",
          "Content that makes you look like a one-man band — you are building a company",
          "Complaints about clients, suppliers, or other tradies",
        ],
        toneOfVoice:
          "Professional but not corporate. Confident and clear. You speak like a business leader who also knows the trade inside out. Decisive. No waffle.",
      },
      clientTargeting: {
        whoToAttract: [
          "Developers and builders who want a reliable, systemised trade partner",
          "Property managers who need a tradie they can trust",
          "Commercial clients who value consistency and clear communication",
        ],
        whoToAvoid: [
          "Clients who want a personal touch above all else",
          "Jobs that fall outside your documented scope",
          "Slow payers who require excessive follow-up",
        ],
      },
      pricingStrategy: {
        tier: "mid",
        guidance:
          "Your pricing should reflect the reliability and professionalism you deliver. You are not the cheapest and you should not be. Position your rate as the cost of certainty — no surprises, no drama, delivered as promised.",
      },
      brandIdentity: {
        visualDirection:
          "Clean, structured, and professional. Strong grid layouts, consistent typography, and a colour system that signals reliability. Think corporate without being cold.",
        languageStyle:
          "Clear, direct, and confident. Process-oriented language. Words like delivered, managed, structured, reliable. No fluff, no hype.",
        colourPalette:
          "Navy or dark slate as the base, clean white, and a single strong accent — electric blue, orange, or green. Signals trust and capability.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Systems Operator scales by replicating the system. Document everything, hire to the process, and remove yourself from the day-to-day. The ceiling is always the owner — the goal is to build a business that runs without you.",
        commonBlockers: [
          "Staying too involved in day-to-day operations instead of working on the business",
          "Not communicating the professionalism externally — invisible brand, visible operation",
          "Hiring for skill but not for cultural fit with the system",
        ],
      },
      actionThisWeek:
        "Pick one client-facing document — your quote template, your onboarding email, or your invoice — and make it look as professional as your operation actually is. One touchpoint at a time.",
    },
  },

  HT: {
    id: "HT",
    name: "The High-Ticket Specialist",
    tagline: "You go deep, charge accordingly, and work with clients who value it.",
    emoji: "💎",
    identity:
      "You are The High-Ticket Specialist. You have picked your lane and stayed in it. You know more about your niche than most people in the industry. Clients come to you specifically because no one else does what you do at the level you do it. You are not competing on price — you are competing on expertise. And when you are positioned correctly, you do not compete at all.",
    universalTruths: [
      "You have turned down work that did not meet your standard or your rate — and felt good about it.",
      "You have clients who waited for you specifically rather than go with someone else.",
      "You know things about your niche that most tradies in your field have never thought about.",
      "You have been called expensive — and you were fine with it.",
      "The clients who find you tend to refer others exactly like them.",
    ],
    mirrorStatements: [
      "You are not expensive — you are priced correctly for what you actually deliver.",
      "You have expertise that most clients cannot even articulate — but they can feel it.",
      "You do not need volume. You need the right clients at the right rate.",
      "Your niche is your moat. The deeper you go, the harder you are to replace.",
      "You are the specialist clients want when they cannot afford to get it wrong.",
    ],
    immediateValue: {
      leanInto:
        "Your expertise is the asset. Make it visible. Write about what you know. Show the complexity of what you do. Most tradies hide their knowledge — you should be broadcasting it. The clients who will pay your rate are looking for proof of expertise before they call.",
      holdingYouBack:
        "You are the best kept secret in your market. The right clients are out there looking for exactly what you offer. They just cannot find you — because your brand does not communicate your depth of expertise clearly enough.",
      oneShift:
        "Write one piece of content this week that demonstrates your specialist knowledge. Not a photo of a job — an explanation of something complex that only someone at your level would know. That content will attract the clients who will pay your rate.",
    },
    reframe:
      "You do not have a skills problem. You have a visibility problem. Your expertise is real. The market just does not know you exist yet.",
    gap: "The problem is, none of this is structured into how you present yourself. Your depth of knowledge is not visible in your brand. Clients who find you are impressed — but most of the right clients never find you at all.",
    tension:
      "You are better than your current positioning reflects. You have built genuine expertise. Now your brand needs to communicate it at the level it deserves.",
    positioningSnapshot: {
      pursue: [
        "High-net-worth clients with complex briefs and real budgets",
        "Architects and designers who need a specialist they can trust completely",
        "Clients who have already tried the generalist and want someone who actually knows",
        "Commercial clients with specialised requirements that most tradies cannot handle",
      ],
      avoid: [
        "Clients who want a generalist — they will not value your depth",
        "Price-sensitive clients who will not pay for expertise",
        "Jobs that fall outside your niche — they dilute your positioning",
      ],
      howToPresent:
        "Lead with expertise. Before you talk about price, demonstrate knowledge. Show that you understand the complexity of what they are trying to achieve. That is what separates you from every other tradie in the room.",
    },
    transition:
      "You have got the identity. But you do not have the system to execute it. Your expertise deserves a brand that communicates it clearly — one that attracts the right clients, positions you as the specialist they need, and lets you charge what genuine expertise is worth.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I specialise in [specific niche]. I do not take every job — I take the jobs where my expertise makes a real difference to the outcome. If you want a generalist, I am not your person. If you want the best result on a complex job, call me.",
        whatToBeKnownFor:
          "The go-to specialist for [niche]. The tradie other tradies call when they are out of their depth. The one clients wait for because no one else does it the same way.",
      },
      contentStrategy: {
        whatToPost: [
          "Deep-dive content that demonstrates your specialist knowledge — the complexity, the nuance, the things most tradies do not know",
          "Case studies of complex projects where your expertise made the difference",
          "Educational content that positions you as the authority in your niche",
        ],
        whatNotToPost: [
          "Generic content that makes you look like every other tradie — it destroys your specialist positioning",
          "Price-focused content — it commoditises expertise",
          "Volume content — you are not trying to reach everyone, you are trying to reach the right people",
        ],
        toneOfVoice:
          "Authoritative and specific. You speak with the confidence of someone who knows more about this than almost anyone. No hedging. No generic advice. Specific, expert, and direct.",
      },
      clientTargeting: {
        whoToAttract: [
          "High-net-worth clients with complex briefs and real budgets",
          "Architects and designers who need a specialist they can trust",
          "Commercial clients with specialised requirements",
        ],
        whoToAvoid: [
          "Clients who want a generalist",
          "Price-sensitive clients who will not pay for expertise",
          "Jobs outside your niche",
        ],
      },
      pricingStrategy: {
        tier: "ultra-premium",
        guidance:
          "You should be charging significantly more than the market rate — because you are not competing with the market. You are the specialist. Price accordingly. Clients who baulk at your rate are not your clients. The ones who pay it will refer others who will also pay it.",
      },
      brandIdentity: {
        visualDirection:
          "Premium, refined, and specific. Your brand should signal expertise and exclusivity. Think high-end professional services — not tradie. Clean typography, considered photography, and a visual identity that says this person is the best at what they do.",
        languageStyle:
          "Expert and specific. Use the technical language of your niche — it signals knowledge to the right clients and filters out the wrong ones. Authoritative without being arrogant.",
        colourPalette:
          "Deep, rich tones — midnight navy, forest green, or charcoal — with gold, cream, or copper as an accent. Signals premium without shouting about it.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The High-Ticket Specialist scales by deepening the niche and raising the rate. More volume is not the answer — better clients at higher rates is. Build a reputation so strong in your niche that clients seek you out specifically, and the rate becomes a non-issue.",
        commonBlockers: [
          "Taking on work outside the niche to fill the calendar — it dilutes the positioning",
          "Not charging enough for the expertise — underpricing specialist knowledge is the most expensive mistake",
          "Invisible brand — expertise that is not communicated is expertise that does not exist in the market",
        ],
      },
      actionThisWeek:
        "Write down the three things you know about your niche that most tradies in your field do not. Then post one of them. That is the beginning of your specialist positioning.",
    },
  },

  VC: {
    id: "VC",
    name: "The Volume Contractor",
    tagline: "You move fast, win more, and build through scale.",
    emoji: "🏗️",
    identity:
      "You are The Volume Contractor. You are built for scale. You move fast, you quote aggressively, and you keep the pipeline full. Where other tradies are waiting for the phone to ring, you are out there making it happen. You understand that volume creates opportunity — and you have the energy and the drive to capitalise on it.",
    universalTruths: [
      "You have had months where the revenue looked great and the profit looked average — and you know why.",
      "You are rarely short of work. The challenge is making sure the work is worth doing.",
      "You move faster than most tradies and you win more jobs because of it.",
      "You have taken on jobs you probably should not have — and made it work anyway.",
      "You know that slowing down is not the answer. Smarter systems are.",
    ],
    mirrorStatements: [
      "Your energy and drive are genuine competitive advantages — most tradies do not have what you have.",
      "You are not undisciplined — you are moving at a pace the market rewards.",
      "The problem is not the volume. It is the margin on the volume.",
      "You have built something real through sheer force of will. Now it needs a system.",
      "You are one pricing and systems upgrade away from a genuinely profitable operation.",
    ],
    immediateValue: {
      leanInto:
        "Your ability to move fast and keep the pipeline full is rare. That is a genuine advantage. The goal is not to slow down — it is to make sure every job you win is worth winning. Set a minimum margin floor and do not quote below it.",
      holdingYouBack:
        "You are winning jobs at rates that do not reflect the cost of running your operation properly. The volume looks impressive. The profit does not always match it. The fix is not less work — it is better pricing on the work you take.",
      oneShift:
        "Calculate your actual cost per job this week — labour, materials, overhead, and your own time. Then look at your last five quotes and check whether you made real money on each one. That number will tell you everything you need to know.",
    },
    reframe:
      "You do not have a work ethic problem. You have a margin problem. The hustle is real. The pricing just needs to match it.",
    gap: "The problem is, none of this is structured into how you present yourself. You are winning work — but not always the right work at the right rate. Your brand needs to attract better clients so you can be selective about the volume you take on.",
    tension:
      "You are better than your current positioning reflects. You have built a real operation through hard work and drive. Now your brand needs to attract clients who will pay for it properly.",
    positioningSnapshot: {
      pursue: [
        "Developers and builders who need a reliable contractor who can move at pace",
        "Commercial clients with ongoing work who value consistency and speed",
        "Clients with multiple projects who want one reliable trade partner",
      ],
      avoid: [
        "One-off residential clients who require excessive hand-holding",
        "Jobs with unclear scope that will blow out and kill your margin",
        "Clients who pay slowly — at your volume, cash flow is everything",
      ],
      howToPresent:
        "Lead with capacity and reliability. Show that you can handle volume, move fast, and deliver consistently. That is what the clients who will give you ongoing work need to see.",
    },
    transition:
      "You have got the identity. But you do not have the system to execute it. Your drive deserves a brand that attracts better clients — ones who will pay your real rate, give you ongoing work, and let you build the operation you are capable of.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "We are a [trade] operation built for volume without sacrificing quality. Fast response, competitive pricing, and the capacity to handle whatever you throw at us. We keep the job moving.",
        whatToBeKnownFor:
          "The contractor who actually shows up, moves fast, and gets it done. Reliable at scale. The one builders call when they need someone who can handle the load.",
      },
      contentStrategy: {
        whatToPost: [
          "Volume and capacity content — show the scale of what you handle",
          "Speed and reliability stories — the jobs you turned around fast without drama",
          "Team and fleet content — signals that you are a real operation, not a one-man band",
        ],
        whatNotToPost: [
          "Content that signals desperation for work — it attracts price shoppers",
          "Complaints about slow clients or difficult jobs — it signals that you are hard to work with",
          "Anything that makes you look disorganised — at your volume, chaos is the enemy",
        ],
        toneOfVoice:
          "Direct, energetic, and confident. You are not the cheapest — you are the most reliable at scale. Speak like someone who has done this a thousand times and will do it a thousand more.",
      },
      clientTargeting: {
        whoToAttract: [
          "Developers and builders who need a reliable contractor at pace",
          "Commercial clients with ongoing work",
          "Clients with multiple projects who want one reliable trade partner",
        ],
        whoToAvoid: [
          "One-off residential clients who require excessive hand-holding",
          "Jobs with unclear scope",
          "Slow payers",
        ],
      },
      pricingStrategy: {
        tier: "mid",
        guidance:
          "Your pricing needs to reflect the true cost of running your operation at volume. Set a minimum margin floor and enforce it. The jobs that do not meet the floor are not worth taking — they drain your capacity for the ones that do.",
      },
      brandIdentity: {
        visualDirection:
          "Bold, confident, and professional. Strong logo, clear typography, and imagery that signals scale and capability. Think established contractor, not solo tradie.",
        languageStyle:
          "Direct and action-oriented. Words like delivered, completed, on time, at scale. No fluff. Sounds like someone who has done this many times before.",
        colourPalette:
          "Bold primary colours — strong red, deep blue, or industrial orange — with black and white. Signals confidence and capability at scale.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Volume Contractor scales by improving margin, not just volume. The goal is the same number of jobs at a higher rate — or better jobs that require less management. Systems, pricing discipline, and client selectivity are the levers.",
        commonBlockers: [
          "Winning jobs at rates that do not cover the real cost of the operation",
          "Taking on every job instead of being selective about which volume is worth having",
          "No minimum margin floor — every job is priced reactively instead of strategically",
        ],
      },
      actionThisWeek:
        "Set a minimum margin floor for your business this week. Write it down. Apply it to the next quote you send. If the job does not meet the floor, do not take it.",
    },
  },

  RB: {
    id: "RB",
    name: "The Reputation Builder",
    tagline: "Your name is your marketing. Trust is your edge.",
    emoji: "🏆",
    identity:
      "You are The Reputation Builder. Your name carries weight in your market. You have built trust over time — through consistent delivery, honest communication, and showing up when you said you would. Clients do not just hire you for the job. They hire you because they trust you. And that trust is worth more than any marketing campaign you could run.",
    universalTruths: [
      "Most of your work comes from people who have worked with you before or been referred by someone who has.",
      "You have never needed to advertise heavily — your reputation does the work.",
      "You have turned down work that would have damaged your name — and it was the right call.",
      "Clients call you back for every job because they know what they are getting.",
      "You have a long list of clients who would recommend you without hesitation.",
    ],
    mirrorStatements: [
      "Your reputation is a genuine business asset — one that took years to build and cannot be copied.",
      "Trust is your competitive advantage. Most tradies cannot buy what you have already earned.",
      "You do not need to sell yourself — you need to make yourself findable.",
      "The clients who know you love you. The problem is the ones who do not know you yet.",
      "Your word means something. That is rarer than you think.",
    ],
    immediateValue: {
      leanInto:
        "Your reputation is real and it is valuable. The goal now is to make it visible beyond your existing network. Every client who loves you is a potential referral engine — but only if you make it easy for them to refer you. Ask for reviews. Ask for referrals. Make it a process, not an afterthought.",
      holdingYouBack:
        "Your reputation is local and personal — which means it does not scale without a system. You are dependent on word of mouth in a finite network. When that network slows down, so does your pipeline. You need to make your reputation visible to people who do not already know you.",
      oneShift:
        "Contact your three best clients this week and ask them directly: is there anyone you know who could use what I do? That one conversation, done consistently, will generate more work than any ad you could run.",
    },
    reframe:
      "You do not have a trust problem. You have a reach problem. Your reputation is real. It just needs to travel further than your existing network.",
    gap: "The problem is, none of this is structured into how you present yourself. Your reputation is built on relationships — but relationships do not scale without a system. Your brand needs to communicate your trustworthiness to people who have never met you.",
    tension:
      "You are better than your current positioning reflects. You have earned something genuinely valuable. Now your brand needs to communicate it to the people who have not experienced it yet.",
    positioningSnapshot: {
      pursue: [
        "Clients who value long-term relationships over the cheapest price",
        "Referrals from existing clients — they are pre-sold on your reputation",
        "Local community and network connections who already know your name",
        "Clients who have been burned before and want someone they can trust",
      ],
      avoid: [
        "One-off price shoppers who will not become repeat clients",
        "Clients who do not value the relationship — they will not refer you",
        "Jobs that would compromise your reputation for a short-term gain",
      ],
      howToPresent:
        "Lead with trust signals. Reviews, testimonials, years in business, repeat clients. Show that other people trust you — because that is the fastest way to earn trust from someone who does not know you yet.",
    },
    transition:
      "You have got the identity. But you do not have the system to execute it. Your reputation deserves a brand that communicates it beyond your existing network — one that makes your trustworthiness visible to the clients who have not met you yet.",
    playbook: {
      positioning: {
        howToDescribeYourself:
          "I have been doing this for [X] years and most of my work comes from people who have worked with me before or been referred by someone who has. That is not an accident. I do what I say I will do, when I say I will do it.",
        whatToBeKnownFor:
          "The tradie you can trust. The one who shows up, does the job, and does not create problems. The one clients call back every time — and tell their friends about.",
      },
      contentStrategy: {
        whatToPost: [
          "Client testimonials and reviews — social proof is your most powerful content",
          "Repeat client stories — show that people come back to you",
          "Behind-the-scenes of how you communicate and manage jobs — demonstrate the trustworthiness, do not just claim it",
        ],
        whatNotToPost: [
          "Anything that contradicts the trust positioning — complaints, drama, or unprofessional content",
          "Content that looks like you are desperate for work — it signals the opposite of trust",
          "Generic content that does not reinforce your reputation",
        ],
        toneOfVoice:
          "Warm, honest, and grounded. You speak like someone who has been around long enough to know what matters. No hype. No selling. Just straight talk from someone who has earned the right to be direct.",
      },
      clientTargeting: {
        whoToAttract: [
          "Clients who value long-term relationships",
          "Referrals from existing clients",
          "Clients who have been burned before and want someone they can trust",
        ],
        whoToAvoid: [
          "One-off price shoppers",
          "Clients who do not value the relationship",
          "Jobs that would compromise your reputation",
        ],
      },
      pricingStrategy: {
        tier: "mid",
        guidance:
          "Your pricing should reflect the value of certainty — clients pay you because they know what they are getting. That is worth a premium over the unknown. Do not discount. The clients who push back on price are not your clients.",
      },
      brandIdentity: {
        visualDirection:
          "Trustworthy, established, and personal. Think local institution — not corporate. Strong logo, consistent colours, and imagery that shows real people and real work. Looks like someone who has been around and will still be around.",
        languageStyle:
          "Honest, direct, and warm. Words like trusted, reliable, local, established. Sounds like a real person, not a marketing department.",
        colourPalette:
          "Warm, grounded tones — deep green, navy, or burgundy — with cream or warm white. Signals stability and trustworthiness. Looks like it has been around for a reason.",
      },
      growthStrategy: {
        howThisArchetypeScalesBest:
          "The Reputation Builder scales by systematising the referral engine. Every satisfied client is a potential referral source — but only if you make it easy and ask consistently. Build a review and referral process, make your reputation visible online, and let trust do the work at scale.",
        commonBlockers: [
          "Relying entirely on word of mouth in a finite network — it does not scale without a system",
          "Not asking for reviews or referrals — the reputation is real but invisible online",
          "Not charging enough — trust is worth a premium and most Reputation Builders undercharge for it",
        ],
      },
      actionThisWeek:
        "Ask your three best clients for a Google review this week. Send them a direct link. That is the fastest way to make your reputation visible to people who do not already know you.",
    },
  },
};
