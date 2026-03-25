import { useLocation } from "wouter";
import { ArrowRight, Zap, Target, TrendingUp, Shield } from "lucide-react";

const ARCHETYPE_PREVIEWS = [
  { emoji: "🔨", name: "The Craftsman", hint: "Quality over everything" },
  { emoji: "⚙️", name: "The Operator", hint: "Systems & scale" },
  { emoji: "⚡", name: "The Hustler", hint: "Fast & hungry" },
  { emoji: "🎯", name: "The Specialist", hint: "Niche mastery" },
  { emoji: "🦁", name: "The Leader", hint: "Building a legacy" },
  { emoji: "🛡️", name: "The Guardian", hint: "Trusted for life" },
  { emoji: "🔥", name: "The Maverick", hint: "Different by design" },
];

const STATS = [
  { value: "5 min", label: "to complete" },
  { value: "25", label: "questions" },
  { value: "7", label: "archetypes" },
  { value: "100%", label: "free" },
];

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.65 0.18 42 / 0.08) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <div className="animate-fade-in-up opacity-0 delay-100 mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary border border-primary/30 bg-primary/5 px-4 py-2 rounded-full">
            <Zap size={12} />
            Tradie Brand Archetype Quiz
          </span>
        </div>

        {/* Main headline */}
        <div className="animate-fade-in-up opacity-0 delay-200 text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
            You're not struggling{" "}
            <br className="hidden sm:block" />
            with{" "}
            <span className="text-primary">business.</span>
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mt-2">
            You're{" "}
            <span className="relative inline-block">
              <span className="relative z-10">misaligned</span>
              <span
                className="absolute bottom-1 left-0 right-0 h-[3px] bg-primary"
                style={{ bottom: "4px" }}
              />
            </span>{" "}
            with your brand.
          </h1>
        </div>

        {/* Sub-headline */}
        <p className="animate-fade-in-up opacity-0 delay-300 text-base sm:text-lg text-muted-foreground text-center max-w-xl mx-auto mb-10 leading-relaxed">
          25 questions. 5 minutes. A brand playbook built specifically for how
          you work, who you are, and where you want to go.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up opacity-0 delay-400 flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => navigate("/quiz")}
            className="group flex items-center gap-3 bg-primary text-primary-foreground font-bold text-base px-8 py-4 rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            Find Your Archetype
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <span className="text-sm text-muted-foreground">
            Free. No signup required.
          </span>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in-up opacity-0 delay-500 mt-16 grid grid-cols-4 gap-6 sm:gap-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl font-black text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-border rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-muted-foreground rounded-full" />
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ──────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
                The Problem
              </p>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-6">
                Strong identity. Weak brand.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most tradies are brilliant at what they do. But when it comes to
                telling people about it — they sound like everyone else.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The problem isn't your work. It's that you haven't figured out{" "}
                <em className="text-foreground not-italic font-semibold">
                  who you are as a brand
                </em>{" "}
                — and how to communicate that to the right clients.
              </p>
              <p className="text-foreground font-semibold leading-relaxed">
                That's what this quiz fixes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Target size={20} />,
                  title: "Find your identity",
                  desc: "Understand exactly who you are as a tradie and a business",
                },
                {
                  icon: <Zap size={20} />,
                  title: "Get your playbook",
                  desc: "Positioning, content, pricing, and brand direction — all in one",
                },
                {
                  icon: <TrendingUp size={20} />,
                  title: "Know your path",
                  desc: "Understand how your archetype scales and what holds you back",
                },
                {
                  icon: <Shield size={20} />,
                  title: "Attract better clients",
                  desc: "Know exactly who to go after — and who to walk away from",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <div className="text-primary mb-3">{item.icon}</div>
                  <div className="font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHETYPES PREVIEW ───────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              The 7 Archetypes
            </p>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-4">
              Which one are you?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Every tradie fits one of these identities. The quiz figures out
              which one — and gives you the exact playbook for it.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
            {ARCHETYPE_PREVIEWS.map((a) => (
              <div
                key={a.name}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-default"
              >
                <div className="text-2xl mb-2">{a.emoji}</div>
                <div className="font-bold text-sm">{a.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {a.hint}
                </div>
              </div>
            ))}
            {/* Take quiz card */}
            <div
              onClick={() => navigate("/quiz")}
              className="bg-primary/10 border border-primary/30 rounded-xl p-4 hover:bg-primary/15 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
            >
              <div className="text-2xl mb-2">?</div>
              <div className="font-bold text-sm text-primary">Find yours</div>
              <div className="text-xs text-primary/70 mt-1">Take the quiz</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/quiz")}
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-base px-8 py-4 rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start the Quiz — It's Free
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              What You Get
            </p>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Your complete brand playbook
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                num: "01",
                title: "Positioning",
                desc: "Exactly how to describe yourself and what to be known for",
              },
              {
                num: "02",
                title: "Content Strategy",
                desc: "What to post, what to avoid, tone of voice, and filming style",
              },
              {
                num: "03",
                title: "Client Targeting",
                desc: "Who to attract, who to walk away from, and why",
              },
              {
                num: "04",
                title: "Pricing Strategy",
                desc: "Budget, mid, or premium — and how to position yourself there",
              },
              {
                num: "05",
                title: "Brand Identity",
                desc: "Visual direction, language style, and colour palette guidance",
              },
              {
                num: "06",
                title: "Growth Strategy",
                desc: "How your archetype scales best and what usually holds it back",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="text-xs font-black text-primary/50 tracking-widest mb-3">
                  {item.num}
                </div>
                <div className="font-bold mb-2">{item.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-24 px-4 border-t border-border text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
            Know who you are.
            <br />
            <span className="text-primary">Build the brand to match.</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            5 minutes. 25 questions. Your brand, sorted.
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-lg px-10 py-5 rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20"
          >
            Take the Free Quiz
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-border py-8 px-4 text-center">
        <p className="text-xs text-muted-foreground">
          Tradie Brand Archetype Quiz — Built for Australian tradies.
        </p>
      </footer>
    </div>
  );
}
