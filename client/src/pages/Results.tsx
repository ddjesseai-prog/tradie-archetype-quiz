import React, { useState, useRef } from "react";
import { useLocation, useSearch } from "wouter";
import {
  ArrowRight,
  Lock,
  Unlock,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Mail,
  CheckCircle2,
  TrendingUp,
  Users,
  DollarSign,
  Palette,
  Rocket,
  MessageSquare,
  Zap,
  Copy,
  Check,
} from "lucide-react";
import { ARCHETYPES } from "../../../shared/archetypes";
import type { ArchetypeId, Archetype } from "../../../shared/archetypes";
import { trpc } from "@/lib/trpc";

// ─── PLAYBOOK SECTION ────────────────────────────────────────────────────────

function PlaybookSection({
  icon,
  number,
  title,
  children,
  defaultOpen = false,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-5 py-4 bg-card hover:bg-secondary/30 transition-colors text-left"
      >
        <span className="text-primary">{icon}</span>
        <span className="text-xs font-black text-primary/50 tracking-widest w-6">{number}</span>
        <span className="font-bold flex-1">{title}</span>
        {open ? (
          <ChevronUp size={16} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={16} className="text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="px-5 py-5 bg-background border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── SCORE BAR ───────────────────────────────────────────────────────────────

function ScoreBar({
  archetype,
  percentage,
  isPrimary,
}: {
  archetype: Archetype;
  percentage: number;
  isPrimary: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-base w-6 text-center">{archetype.emoji}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className={`text-xs font-semibold ${isPrimary ? "text-primary" : "text-muted-foreground"}`}>
            {archetype.name}
          </span>
          <span className={`text-xs font-bold ${isPrimary ? "text-primary" : "text-muted-foreground"}`}>
            {percentage}%
          </span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${isPrimary ? "bg-primary" : "bg-muted-foreground/40"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── COPY LINK BUTTON ───────────────────────────────────────────────────────

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="w-full flex items-center justify-center gap-2 border border-border bg-card text-muted-foreground font-semibold py-3.5 rounded-xl hover:bg-secondary/50 hover:text-foreground transition-all text-sm"
    >
      {copied ? (
        <><Check size={15} className="text-primary" /> Link copied to clipboard</>
      ) : (
        <><Copy size={15} /> Copy your results link</>
      )}
    </button>
  );
}

// ─── EMAIL GATE ──────────────────────────────────────────────────────────────

function EmailGate({
  submissionId,
  archetypeId,
  secondaryArchetypeId,
  onUnlock,
}: {
  submissionId: number;
  archetypeId: string;
  secondaryArchetypeId?: string;
  onUnlock: (emailWasSent: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const captureMutation = trpc.email.capture.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => setSubmitted(true), // still show success, unlock regardless
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || captureMutation.isPending) return;
    captureMutation.mutate({
      submissionId,
      email,
      firstName: firstName || undefined,
      archetypeId,
      secondaryArchetypeId: secondaryArchetypeId || undefined,
    });
  };

  // ── After form submit: show confirmation + explicit open button ──
  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6 sm:p-8 text-center space-y-5">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 border border-primary/40 mx-auto">
          <CheckCircle2 size={26} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-black mb-1">You're in.</h3>
          <p className="text-sm text-muted-foreground">
            Your playbook is on its way to{" "}
            <span className="text-foreground font-medium">{email}</span>.
            Bookmark that email — it's your permanent link.
          </p>
        </div>
        <button
          onClick={() => onUnlock(true)}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-xl text-base hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
        >
          <Unlock size={18} />
          Open My Full Playbook
          <ArrowRight size={18} />
        </button>
        <p className="text-xs text-muted-foreground/60">
          Playbook also saved to your inbox as a permanent link.
        </p>
      </div>
    );
  }

  // ── Default: form ──
  const archetypeName = archetypeId.charAt(0).toUpperCase() + archetypeId.slice(1);
  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 sm:p-8 space-y-5 relative overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.65 0.18 42 / 0.06) 0%, transparent 70%)" }}
      />

      <div className="text-center relative z-10">
        <h3 className="text-2xl font-black mb-2">Your Playbook Is Ready</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Drop your email and it unlocks on screen instantly — plus we'll send a permanent link to your inbox so you can come back to it anytime.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="given-name"
          className="w-full px-4 py-4 bg-secondary border border-border rounded-xl text-base placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          inputMode="email"
          className="w-full px-4 py-4 bg-secondary border border-border rounded-xl text-base placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={!email || captureMutation.isPending}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-black py-5 rounded-xl text-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-xl shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {captureMutation.isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
              Unlocking...
            </span>
          ) : (
            <>
              <Unlock size={20} />
              Show Me My Playbook
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/60 relative z-10">
        <span>Free forever</span>
        <span>·</span>
        <span>No spam</span>
        <span>·</span>
        <span>Unsubscribe anytime</span>
      </div>

      <button
        onClick={() => onUnlock(false)}
        className="w-full text-center text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors py-1 relative z-10"
      >
        Skip for now
      </button>
    </div>
  );
}

// ─── MAIN RESULTS PAGE ───────────────────────────────────────────────────────

export default function Results() {
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);

  const submissionId = parseInt(params.get("submissionId") ?? "0");
  const archetypeParam = params.get("archetype") as ArchetypeId | null;
  const secondaryParam = params.get("secondary") as ArchetypeId | null;
  const isUnlockedViaLink = params.get("unlocked") === "1";

  const [playbookUnlocked, setPlaybookUnlocked] = useState(isUnlockedViaLink);
  const [emailSent, setEmailSent] = useState(false);
  const playbookRef = useRef<HTMLDivElement>(null);

  const { data: resultData } = trpc.quiz.getResult.useQuery(
    { submissionId },
    { enabled: submissionId > 0 },
  );

  const primaryId = (resultData?.primaryArchetype as ArchetypeId) ?? archetypeParam;
  const secondaryId = (resultData?.secondaryArchetype as ArchetypeId | null) ?? secondaryParam;
  const percentages = resultData?.percentages as Record<ArchetypeId, number> | undefined;

  const archetype = primaryId ? ARCHETYPES[primaryId] : null;
  const secondaryArchetype = secondaryId ? ARCHETYPES[secondaryId] : null;

  const handleUnlock = (emailWasSent: boolean) => {
    setPlaybookUnlocked(true);
    setEmailSent(emailWasSent);
    setTimeout(() => {
      playbookRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  if (!archetype) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No results found.</p>
          <button onClick={() => navigate("/quiz")} className="text-primary hover:underline">
            Take the quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── ARCHETYPE REVEAL ──────────────────────────────────────── */}
      <section className="relative py-16 px-4 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.65 0.18 42 / 0.1) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="animate-fade-in-up opacity-0">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary border border-primary/30 bg-primary/5 px-4 py-2 rounded-full mb-6">
              Your Archetype
            </span>
          </div>
          <div className="animate-fade-in-up opacity-0 delay-100">
            <div className="text-7xl sm:text-8xl mb-4">{archetype.emoji}</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3">{archetype.name}</h1>
            <p className="text-lg sm:text-xl text-primary font-semibold italic mb-6">
              "{archetype.tagline}"
            </p>
          </div>
          <div className="animate-fade-in-up opacity-0 delay-200">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {archetype.identity}
            </p>
          </div>
          {secondaryArchetype && (
            <div className="animate-fade-in-up opacity-0 delay-300 mt-6">
              <div className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-4 py-2">
                <span className="text-sm">{secondaryArchetype.emoji}</span>
                <span className="text-xs text-muted-foreground">
                  Strong secondary:{" "}
                  <span className="text-foreground font-semibold">{secondaryArchetype.name}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── BODY ──────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">

        {/* Strengths & Weaknesses teaser */}
        <div className="animate-fade-in-up opacity-0 delay-100">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-xs font-black tracking-widest uppercase text-primary mb-4">Your Strengths</h3>
              <ul className="space-y-2">
                {archetype.mirrorStatements.slice(0, 3).map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">✓</span>
                    <span className="text-muted-foreground">{s}</span>
                  </li>
                ))}
                {archetype.mirrorStatements.length > 3 && (
                  <li className="text-xs text-muted-foreground/50 pl-5">
                    +{archetype.mirrorStatements.length - 3} more in your playbook
                  </li>
                )}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-xs font-black tracking-widest uppercase text-destructive/70 mb-4">Watch Out For</h3>
              <ul className="space-y-2">
                {archetype.universalTruths.slice(0, 3).map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm">
                    <span className="text-destructive/70 mt-0.5">!</span>
                    <span className="text-muted-foreground">{w}</span>
                  </li>
                ))}
                {archetype.universalTruths.length > 3 && (
                  <li className="text-xs text-muted-foreground/50 pl-5">
                    +{archetype.universalTruths.length - 3} more in your playbook
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Score breakdown */}
        {percentages && (
          <div className="animate-fade-in-up opacity-0 delay-200 bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-black tracking-widest uppercase text-muted-foreground mb-5">
              Your Score Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries(percentages)
                .sort(([, a], [, b]) => b - a)
                .map(([id, pct]) => {
                  const a = ARCHETYPES[id as ArchetypeId];
                  if (!a) return null;
                  return (
                    <ScoreBar key={id} archetype={a} percentage={pct} isPrimary={id === primaryId} />
                  );
                })}
            </div>
          </div>
        )}

        {/* ── EMAIL GATE ──────────────────────────────────────────── */}
        {!playbookUnlocked && (
          <div className="animate-fade-in-up opacity-0 delay-300">
            {/* Value bridge — show what's coming before the gate */}
            <div className="bg-card border border-border rounded-xl p-5 mb-4">
              <p className="text-xs font-black tracking-widest uppercase text-primary mb-3">What's in your {archetype.name} Playbook</p>
              <div className="space-y-2">
                {[
                  `Your exact positioning statement as ${archetype.name}`,
                  "What to post, what to avoid, and your filming style",
                  "Who your ideal client is — and who to walk away from",
                  "Your pricing tier and how to own it",
                  "Visual and language direction for your brand",
                  "Your #1 growth blocker and the specific move to fix it",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-primary font-bold text-xs w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <EmailGate
              submissionId={submissionId}
              archetypeId={primaryId!}
              secondaryArchetypeId={secondaryId ?? undefined}
              onUnlock={handleUnlock}
            />
          </div>
        )}

        {/* ── FULL PLAYBOOK ────────────────────────────────────────── */}
        {playbookUnlocked && (
          <div ref={playbookRef} className="scroll-mt-4 space-y-6 animate-fade-in-up opacity-0">

            {/* Email sent confirmation */}
            {emailSent && (
              <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl p-4">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                <p className="text-sm text-primary">
                  Your full playbook has been sent to your inbox.
                </p>
              </div>
            )}

            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-primary mb-3">
                <Unlock size={18} />
                <span className="text-sm font-semibold">Playbook Unlocked</span>
              </div>
              <h2 className="text-2xl font-black">{archetype.name} Brand Playbook</h2>
            </div>

            {/* #1 Action This Week — hero callout */}
            <div className="bg-primary/10 border-2 border-primary/40 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={18} className="text-primary" />
                <span className="text-xs font-black tracking-widest uppercase text-primary">Your #1 Action This Week</span>
              </div>
              <p className="text-base sm:text-lg font-semibold leading-relaxed text-foreground">
                {archetype.playbook.actionThisWeek}
              </p>
            </div>

            {/* Playbook sections */}
            <div className="space-y-3">
              <PlaybookSection icon={<MessageSquare size={18} />} number="01" title="Positioning" defaultOpen={true}>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      How to describe yourself
                    </p>
                    <div className="bg-secondary/50 border border-border rounded-lg p-4">
                      <p className="text-sm leading-relaxed italic text-foreground">
                        "{archetype.playbook.positioning.howToDescribeYourself}"
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      What to be known for
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {archetype.playbook.positioning.whatToBeKnownFor}
                    </p>
                  </div>
                </div>
              </PlaybookSection>

              <PlaybookSection icon={<Rocket size={18} />} number="02" title="Content Strategy">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">What to post</p>
                    <ul className="space-y-1.5">
                      {archetype.playbook.contentStrategy.whatToPost.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-destructive/70 mb-2">What NOT to post</p>
                    <ul className="space-y-1.5">
                      {archetype.playbook.contentStrategy.whatNotToPost.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <span className="text-destructive/70 mt-0.5 flex-shrink-0">✗</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-secondary/30 rounded-lg p-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Tone of Voice</p>
                      <p className="text-sm text-foreground">{archetype.playbook.contentStrategy.toneOfVoice}</p>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Action This Week</p>
                      <p className="text-sm text-foreground">{archetype.playbook.actionThisWeek}</p>
                    </div>
                  </div>
                </div>
              </PlaybookSection>

              <PlaybookSection icon={<Users size={18} />} number="03" title="Client Targeting">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Who to attract</p>
                    <ul className="space-y-1.5">
                      {archetype.playbook.clientTargeting.whoToAttract.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-destructive/70 mb-2">Who to avoid</p>
                    <ul className="space-y-1.5">
                      {archetype.playbook.clientTargeting.whoToAvoid.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <span className="text-destructive/70 mt-0.5 flex-shrink-0">✗</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </PlaybookSection>

              <PlaybookSection icon={<DollarSign size={18} />} number="04" title="Pricing Strategy">
                <div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-3 py-1 mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {archetype.playbook.pricingStrategy.tier === "premium"
                        ? "Premium Tier"
                        : archetype.playbook.pricingStrategy.tier === "mid"
                          ? "Mid Tier"
                          : "Budget Tier"}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {archetype.playbook.pricingStrategy.guidance}
                  </p>
                </div>
              </PlaybookSection>

              <PlaybookSection icon={<Palette size={18} />} number="05" title="Brand Identity">
                <div className="space-y-3">
                  {[
                    { label: "Visual Direction", value: archetype.playbook.brandIdentity.visualDirection },
                    { label: "Language Style", value: archetype.playbook.brandIdentity.languageStyle },
                    { label: "Colour Palette", value: archetype.playbook.brandIdentity.colourPalette },
                  ].map((item) => (
                    <div key={item.label} className="bg-secondary/30 rounded-lg p-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-sm text-foreground leading-relaxed">{item.value}</p>
                    </div>
                  ))}
                </div>
              </PlaybookSection>

              <PlaybookSection icon={<TrendingUp size={18} />} number="06" title="Growth Strategy">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">How you scale best</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {archetype.playbook.growthStrategy.howThisArchetypeScalesBest}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-destructive/70 mb-2">What usually holds you back</p>
                    <ul className="space-y-1.5">
                      {archetype.playbook.growthStrategy.commonBlockers.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm">
                          <span className="text-destructive/70 mt-0.5 flex-shrink-0">!</span>
                          <span className="text-muted-foreground">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </PlaybookSection>
            </div>

            {/* Copy results link */}
            <CopyLinkButton />

            {/* Default behaviours */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-xs font-black tracking-widest uppercase text-muted-foreground mb-4">How You Show Up</h3>
              <ul className="space-y-2">
                {archetype.universalTruths.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">→</span>
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Market perception */}
            <div className="bg-secondary/30 border border-border rounded-xl p-5">
              <h3 className="text-xs font-black tracking-widest uppercase text-muted-foreground mb-3">How the Market Sees You</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{archetype.tension}</p>
            </div>

          </div>
        )}

        {/* ── RETAKE / HOME ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <button
            onClick={() => navigate("/quiz")}
            className="flex-1 flex items-center justify-center gap-2 border border-border bg-card text-foreground font-semibold py-3.5 rounded-xl hover:bg-secondary/50 transition-colors text-sm"
          >
            <RotateCcw size={15} />
            Retake the Quiz
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-all text-sm"
          >
            Back to Home
            <ArrowRight size={15} />
          </button>
        </div>

      </div>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="border-t border-border py-8 px-4 text-center mt-8">
        <p className="text-xs text-muted-foreground">
          Tradie Brand Archetype Quiz — Built for Australian tradies.
        </p>
      </footer>

    </div>
  );
}
