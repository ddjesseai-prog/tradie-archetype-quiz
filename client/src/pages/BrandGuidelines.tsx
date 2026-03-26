import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Copy, Check, Download } from "lucide-react";

const LOGO_ICON_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663455007192/QnyeSx8s548idVXmYjbqZt/tq-logo-icon_bc89673d.png";
const LOGO_PRIMARY_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663455007192/QnyeSx8s548idVXmYjbqZt/tq-logo-primary_cf5ce1e7.png";
const LOGO_LIGHT_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663455007192/QnyeSx8s548idVXmYjbqZt/tq-logo-light_aa7b0ea9.png";
const LOGO_FULL_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663455007192/QnyeSx8s548idVXmYjbqZt/tq-logo-full_1959a688.png";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded hover:bg-white/10 transition-colors"
      title="Copy"
    >
      {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} className="text-muted-foreground" />}
    </button>
  );
}

const colours = [
  {
    name: "Burnt Orange",
    role: "Primary / Accent",
    hex: "#E8611A",
    oklch: "oklch(0.65 0.18 42)",
    usage: "CTAs, highlights, logo mark, active states",
    bg: "#E8611A",
    text: "#161616",
  },
  {
    name: "Near Black",
    role: "Background",
    hex: "#161616",
    oklch: "oklch(0.09 0.005 260)",
    usage: "Primary background, logo dark background",
    bg: "#161616",
    text: "#EDEBE6",
    border: true,
  },
  {
    name: "Surface",
    role: "Card / Panel",
    hex: "#1E1E1E",
    oklch: "oklch(0.12 0.005 260)",
    usage: "Cards, modals, input backgrounds",
    bg: "#1E1E1E",
    text: "#EDEBE6",
    border: true,
  },
  {
    name: "Elevated Surface",
    role: "Secondary Surface",
    hex: "#272727",
    oklch: "oklch(0.16 0.005 260)",
    usage: "Hover states, secondary panels, dividers",
    bg: "#272727",
    text: "#EDEBE6",
    border: true,
  },
  {
    name: "Off White",
    role: "Foreground",
    hex: "#EDEBE6",
    oklch: "oklch(0.93 0.01 80)",
    usage: "Body text, headings on dark backgrounds",
    bg: "#EDEBE6",
    text: "#161616",
  },
  {
    name: "Muted",
    role: "Secondary Text",
    hex: "#888880",
    oklch: "oklch(0.55 0.01 80)",
    usage: "Captions, metadata, secondary labels",
    bg: "#888880",
    text: "#161616",
  },
  {
    name: "Border",
    role: "Dividers",
    hex: "#333333",
    oklch: "oklch(0.2 0.005 260)",
    usage: "Card borders, input outlines, separators",
    bg: "#333333",
    text: "#EDEBE6",
    border: true,
  },
];

const typography = [
  {
    label: "Display / Hero",
    sample: "You're not struggling with business.",
    class: "text-4xl font-black tracking-tight leading-none",
    spec: "Inter Black · 900 · -0.03em tracking · 1.0 line-height",
  },
  {
    label: "Heading 1",
    sample: "Your Brand Archetype",
    class: "text-3xl font-bold tracking-tight",
    spec: "Inter Bold · 700 · -0.02em tracking · 1.1 line-height",
  },
  {
    label: "Heading 2",
    sample: "Brand Playbook",
    class: "text-xl font-semibold",
    spec: "Inter SemiBold · 600 · -0.01em tracking · 1.2 line-height",
  },
  {
    label: "Body",
    sample: "Direct. Actionable. No corporate fluff. Written for tradies who work with their hands and build with their name.",
    class: "text-base font-normal leading-relaxed",
    spec: "Inter Regular · 400 · 0em tracking · 1.6 line-height",
  },
  {
    label: "Caption / Label",
    sample: "TRADIE BRAND ARCHETYPE QUIZ",
    class: "text-xs font-semibold tracking-widest uppercase",
    spec: "Inter SemiBold · 600 · 0.15em tracking · uppercase",
  },
];

const toneExamples = [
  {
    label: "Do",
    good: true,
    text: "You're not struggling with business. You're misaligned with your brand.",
  },
  {
    label: "Don't",
    good: false,
    text: "Our comprehensive brand assessment tool helps you identify your unique value proposition.",
  },
  {
    label: "Do",
    good: true,
    text: "Stop posting random jobs. Start posting who you are.",
  },
  {
    label: "Don't",
    good: false,
    text: "Leverage our platform to optimise your digital marketing strategy.",
  },
];

const logoVariations = [
  {
    name: "Shield Badge (Primary)",
    desc: "Use for app icons, social profile images, stickers, and anywhere a compact mark is needed.",
    url: LOGO_ICON_URL,
    bg: "#161616",
    border: true,
    downloadUrl: LOGO_ICON_URL,
  },
  {
    name: "Wordmark — Dark",
    desc: "Use on dark backgrounds for headers, presentations, and digital documents.",
    url: LOGO_PRIMARY_URL,
    bg: "#161616",
    border: true,
    downloadUrl: LOGO_PRIMARY_URL,
  },
  {
    name: "Wordmark — Light",
    desc: "Use on white or light backgrounds only. Never place on dark backgrounds.",
    url: LOGO_LIGHT_URL,
    bg: "#FFFFFF",
    border: false,
    downloadUrl: LOGO_LIGHT_URL,
  },
  {
    name: "Full Lockup",
    desc: "Use for email headers, documents, and anywhere the full brand name needs to appear.",
    url: LOGO_FULL_URL,
    bg: "#161616",
    border: true,
    downloadUrl: LOGO_FULL_URL,
  },
];

const spacingScale = [
  { token: "4px", label: "xs", usage: "Icon gaps, tight labels" },
  { token: "8px", label: "sm", usage: "Inner padding, badge spacing" },
  { token: "16px", label: "md", usage: "Card padding, section gaps (mobile)" },
  { token: "24px", label: "lg", usage: "Component spacing, button padding" },
  { token: "32px", label: "xl", usage: "Section padding, card margins" },
  { token: "48px", label: "2xl", usage: "Page section gaps" },
  { token: "64px", label: "3xl", usage: "Hero section padding" },
  { token: "96px", label: "4xl", usage: "Major section breaks" },
];

export default function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-10">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <ArrowLeft size={16} />
          Back to site
        </Link>
        <div className="flex items-center gap-3">
          <img src={LOGO_ICON_URL} alt="TQ" className="w-8 h-8 rounded" />
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Brand Guidelines</span>
        </div>
        <a
          href="/brand-guidelines-pdf"
          className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          <Download size={13} />
          Download PDF
        </a>
      </nav>

      {/* Hero */}
      <section className="border-b border-border px-6 py-20 text-center max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-6">TQ Brand System</p>
        <h1 className="text-5xl font-black tracking-tight leading-none mb-6">
          Brand Guidelines
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Everything needed to apply the TQ brand consistently — logo, colour, typography, tone, and spacing.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground border border-border rounded-full px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          Version 1.0 · March 2026
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">

        {/* Logo */}
        <section>
          <SectionHeader number="01" title="Logo" />
          <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            The TQ mark exists in four variations. The <strong className="text-foreground">Shield Badge</strong> is the primary mark — use it wherever a compact, iconic representation is needed. The wordmark and full lockup are for contexts where the full brand name adds value.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {logoVariations.map((logo) => (
              <div key={logo.name} className="rounded-xl overflow-hidden border border-border">
                <div
                  className="flex items-center justify-center p-10"
                  style={{ backgroundColor: logo.bg, border: logo.border ? undefined : "none" }}
                >
                  <img src={logo.url} alt={logo.name} className="max-h-36 max-w-full object-contain" />
                </div>
                <div className="p-5 bg-card">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-sm mb-1">{logo.name}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{logo.desc}</p>
                    </div>
                    <a
                      href={logo.downloadUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                      title="Download"
                    >
                      <Download size={14} className="text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Logo rules */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-green-900/40 bg-green-950/20 p-5">
              <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">Do</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Use the shield badge as the primary icon mark</li>
                <li>Maintain clear space equal to the height of the "T" on all sides</li>
                <li>Use the dark wordmark on backgrounds darker than #444</li>
                <li>Use the light wordmark on backgrounds lighter than #888</li>
                <li>Scale proportionally — never stretch or squash</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-5">
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">Don't</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Don't recolour the logo outside the approved palette</li>
                <li>Don't place the dark wordmark on a dark background</li>
                <li>Don't add drop shadows, outlines, or effects</li>
                <li>Don't rotate or skew the mark</li>
                <li>Don't use the logo smaller than 24px height</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Colour */}
        <section>
          <SectionHeader number="02" title="Colour Palette" />
          <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            The palette is built around <strong className="text-foreground">Burnt Orange</strong> on near-black — industrial, premium, and instantly recognisable. Every colour has a defined role. Don't introduce new colours without a clear reason.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colours.map((c) => (
              <div key={c.name} className="rounded-xl overflow-hidden border border-border">
                <div
                  className="h-24 w-full"
                  style={{ backgroundColor: c.bg, border: c.border ? "1px solid #333" : undefined }}
                />
                <div className="p-4 bg-card space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{c.name}</p>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">{c.role}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                    {c.hex}
                    <CopyButton value={c.hex} />
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground/60">
                    {c.oklch}
                    <CopyButton value={c.oklch} />
                  </div>
                  <p className="text-xs text-muted-foreground pt-1 border-t border-border mt-2">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Colour combinations */}
          <div className="mt-8 rounded-xl border border-border overflow-hidden">
            <div className="p-5 border-b border-border">
              <p className="font-semibold text-sm">Approved Combinations</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {[
                { bg: "#E8611A", text: "#161616", label: "Orange on Black", desc: "CTAs, primary buttons" },
                { bg: "#161616", text: "#EDEBE6", label: "Off-White on Black", desc: "Body text, headings" },
                { bg: "#1E1E1E", text: "#E8611A", label: "Orange on Surface", desc: "Accent labels, icons" },
              ].map((combo) => (
                <div key={combo.label} className="p-6 flex flex-col gap-3" style={{ backgroundColor: combo.bg }}>
                  <p className="text-2xl font-black" style={{ color: combo.text }}>Aa</p>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: combo.text }}>{combo.label}</p>
                    <p className="text-xs opacity-60" style={{ color: combo.text }}>{combo.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <SectionHeader number="03" title="Typography" />
          <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            The sole typeface is <strong className="text-foreground">Inter</strong> — loaded from Google Fonts at weights 400, 500, 600, 700, 800, and 900. Its geometric clarity and industrial neutrality suit the TQ brand perfectly. No secondary typeface is needed.
          </p>
          <div className="space-y-4">
            {typography.map((t) => (
              <div key={t.label} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest">{t.label}</span>
                  <span className="text-xs text-muted-foreground font-mono text-right">{t.spec}</span>
                </div>
                <p className={`${t.class} text-foreground`}>{t.sample}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Google Fonts Import</p>
            <code className="text-xs text-muted-foreground font-mono block bg-secondary rounded-lg p-3 leading-relaxed">
              {`<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />`}
            </code>
          </div>
        </section>

        {/* Tone of Voice */}
        <section>
          <SectionHeader number="04" title="Tone of Voice" />
          <p className="text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            TQ speaks like a tradie who takes their business seriously — direct, confident, and free of corporate jargon. Every word should feel like it came from someone who's been on a job site, not a boardroom.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { trait: "Direct", desc: "Say it in one sentence. If you need two, cut the first." },
              { trait: "Actionable", desc: "Every piece of copy should make someone want to do something." },
              { trait: "Personal", desc: "Speak to one tradie, not 'tradies' as a category." },
              { trait: "Confident", desc: "No hedging. No 'might', 'could', or 'perhaps'. State it." },
              { trait: "Grounded", desc: "Real examples, real language, real problems tradies face." },
              { trait: "No fluff", desc: "If a word doesn't earn its place, cut it." },
            ].map((v) => (
              <div key={v.trait} className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-sm text-primary mb-1">{v.trait}</p>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {toneExamples.map((ex, i) => (
              <div
                key={i}
                className={`rounded-xl border p-5 flex gap-4 items-start ${
                  ex.good
                    ? "border-green-900/40 bg-green-950/20"
                    : "border-red-900/40 bg-red-950/20"
                }`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-widest shrink-0 mt-0.5 ${
                    ex.good ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {ex.label}
                </span>
                <p className="text-sm text-foreground leading-relaxed">"{ex.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section>
          <SectionHeader number="05" title="Spacing Scale" />
          <p className="text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            All spacing is based on a 4px base unit. Use these values consistently across all touchpoints — web, print, and social.
          </p>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Token</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Size</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Visual</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Usage</th>
                </tr>
              </thead>
              <tbody>
                {spacingScale.map((s, i) => (
                  <tr key={s.label} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-secondary/20"}`}>
                    <td className="p-4 font-mono text-xs text-primary">{s.label}</td>
                    <td className="p-4 font-mono text-xs text-muted-foreground">{s.token}</td>
                    <td className="p-4 hidden sm:table-cell">
                      <div
                        className="bg-primary/60 rounded-sm"
                        style={{ width: s.token, height: "12px", minWidth: "4px" }}
                      />
                    </td>
                    <td className="p-4 text-xs text-muted-foreground">{s.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Brand Voice Archetypes */}
        <section>
          <SectionHeader number="06" title="Brand Positioning" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                label: "What TQ is",
                items: ["A brand identity tool for tradies", "Built by people who understand the trade industry", "Direct, no-fluff, actionable", "Premium without being pretentious"],
              },
              {
                label: "What TQ is not",
                items: ["A generic personality quiz", "Corporate HR assessment", "Another marketing funnel", "A tool for non-tradies"],
              },
              {
                label: "The core promise",
                items: ["You'll know exactly who you are as a brand", "You'll know what to say and how to say it", "You'll know who to attract and who to avoid", "You'll have a clear first action to take"],
              },
            ].map((col) => (
              <div key={col.label} className="rounded-xl border border-border bg-card p-6">
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">{col.label}</p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-border pt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_ICON_URL} alt="TQ" className="w-8 h-8 rounded" />
            <div>
              <p className="text-sm font-bold">TQ Brand Guidelines</p>
              <p className="text-xs text-muted-foreground">Version 1.0 · March 2026</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            For questions about brand usage, contact the TQ team at{" "}
            <a href="mailto:jesse@dreamdealer.com.au" className="text-primary hover:underline">
              jesse@dreamdealer.com.au
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-8">
      <span className="text-xs font-bold text-primary font-mono">{number}</span>
      <h2 className="text-2xl font-black tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
