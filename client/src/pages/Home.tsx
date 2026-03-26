import { useLocation } from "wouter";
import { ArrowRight, Zap, CheckCircle, Star } from "lucide-react";

const ARCHETYPE_PREVIEWS = [
  { emoji: "🔨", name: "The Craftsman", hint: "Quality over everything" },
  { emoji: "⚙️", name: "The Operator", hint: "Systems & scale" },
  { emoji: "⚡", name: "The Hustler", hint: "Fast & hungry" },
  { emoji: "🎯", name: "The Specialist", hint: "Niche mastery" },
  { emoji: "🦁", name: "The Leader", hint: "Building a legacy" },
  { emoji: "🛡️", name: "The Guardian", hint: "Trusted for life" },
  { emoji: "🔥", name: "The Maverick", hint: "Different by design" },
];

const PLAYBOOK_ITEMS = [
  "Your exact positioning statement — how to describe yourself so clients get it immediately",
  "What to post on social, what to avoid, and the tone that fits your identity",
  "Who your ideal client is — and who you should walk away from",
  "Whether you're a budget, mid-market, or premium brand — and how to own it",
  "Visual direction: colours, language style, and what your brand should feel like",
  "Your #1 growth blocker — and the specific move to break through it",
];

const SOCIAL_PROOF = [
  { quote: "Figured out in 5 minutes what I'd been trying to work out for 2 years.", name: "Jake M.", trade: "Electrician, Brisbane" },
  { quote: "The content strategy section alone was worth it. I knew exactly what to post the next day.", name: "Damo T.", trade: "Plumber, Melbourne" },
  { quote: "Sent it to my apprentice. Every tradie needs to do this.", name: "Chris W.", trade: "Builder, Sydney" },
];

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-12">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% 0%, oklch(0.65 0.18 42 / 0.10) 0%, transparent 65%)",
          }}
        />

        {/* Badge */}
        <div className="animate-fade-in-up opacity-0 delay-100 mb-6 z-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-primary border border-primary/30 bg-primary/8 px-4 py-2 rounded-full">
            <Zap size={11} fill="currentColor" />
            Free Brand Archetype Quiz for Tradies
          </span>
        </div>

        {/* Headline */}
        <div className="animate-fade-in-up opacity-0 delay-200 text-center max-w-3xl mx-auto mb-5 z-10">
          <h1 className="text-[2.6rem] sm:text-5xl md:text-[4.2rem] lg:text-7xl font-black leading-[1.03] tracking-tight">
            You're not struggling
            <br />
            with{" "}
            <span className="text-primary">business.</span>
          </h1>
          <h1 className="text-[2.6rem] sm:text-5xl md:text-[4.2rem] lg:text-7xl font-black leading-[1.03] tracking-tight mt-1">
            You're{" "}
            <span className="relative inline-block">
              <span className="relative z-10">misaligned</span>
              <span className="absolute left-0 right-0 h-[3px] bg-primary rounded-full" style={{ bottom: "6px" }} />
            </span>{" "}
            with your brand.
          </h1>
        </div>

        {/* Sub-headline */}
        <p className="animate-fade-in-up opacity-0 delay-300 text-base sm:text-lg text-muted-foreground text-center max-w-lg mx-auto mb-8 leading-relaxed z-10">
          Take the quiz. Discover your tradie archetype. Get a brand playbook
          built specifically for how you work — in under 5 minutes.
        </p>

        {/* Primary CTA */}
        <div className="animate-fade-in-up opacity-0 delay-400 z-10 w-full max-w-sm mx-auto space-y-3">
          <button
            onClick={() => navigate("/quiz")}
            className="group w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground font-black text-lg px-8 py-5 rounded-2xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/25"
          >
            Find My Archetype — Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-primary" />
              No signup required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-primary" />
              Takes under 5 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-primary" />
              100% free
            </span>
          </div>
        </div>

        {/* Social proof strip */}
        <div className="animate-fade-in-up opacity-0 delay-500 mt-12 z-10 w-full max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-primary fill-primary" />
            ))}
            <span className="text-xs text-muted-foreground ml-2">Used by tradies across Australia</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {SOCIAL_PROOF.map((p) => (
              <div key={p.name} className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 italic">"{p.quote}"</p>
                <div>
                  <span className="text-xs font-bold text-foreground">{p.name}</span>
                  <span className="text-xs text-muted-foreground/60 ml-1">— {p.trade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">What's inside your playbook</p>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Six sections. Zero fluff.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm leading-relaxed">
              Every answer is specific to your archetype — not generic advice that applies to everyone and helps no one.
            </p>
          </div>

          <div className="space-y-3 mb-10">
            {PLAYBOOK_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-card border border-border rounded-xl px-5 py-4">
                <span className="text-xs font-black text-primary/40 tracking-widest mt-0.5 w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/quiz")}
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-black text-base px-8 py-4 rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              Get My Playbook — It's Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── ARCHETYPES PREVIEW ───────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">The 7 Archetypes</p>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-3">Which one are you?</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Every tradie fits one of these identities. The quiz figures out which one — and gives you the exact playbook for it.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {ARCHETYPE_PREVIEWS.map((a) => (
              <div
                key={a.name}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-colors"
              >
                <div className="text-2xl mb-2">{a.emoji}</div>
                <div className="font-bold text-sm">{a.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{a.hint}</div>
              </div>
            ))}
            <div
              onClick={() => navigate("/quiz")}
              className="bg-primary/10 border border-primary/30 rounded-xl p-4 hover:bg-primary/15 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
            >
              <div className="text-2xl mb-2">?</div>
              <div className="font-bold text-sm text-primary">Find yours</div>
              <div className="text-xs text-primary/60 mt-1">Take the quiz</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/quiz")}
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-black text-base px-8 py-4 rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start the Quiz — Takes 5 Minutes
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-4">
            Stop guessing. Start building
            <br />
            <span className="text-primary">the right brand.</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Most tradies spend years figuring out what works. This quiz gives you the answer in 5 minutes — for free.
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-black text-lg px-10 py-5 rounded-2xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/25"
          >
            Find My Archetype
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-muted-foreground/60 mt-4">Free. No account. No credit card.</p>
        </div>
      </section>

    </div>
  );
}
