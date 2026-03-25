import type { Archetype } from "../shared/archetypes";

export function buildPlaybookEmail(
  archetype: Archetype,
  firstName: string | null,
): { subject: string; html: string; text: string } {
  const greeting = firstName ? `G'day ${firstName},` : "G'day,";

  const subject = `Your Brand Archetype: ${archetype.name} — Here's Your Playbook`;

  const textContent = `
${greeting}

You just took the Tradie Brand Archetype Quiz — and your result is in.

You're ${archetype.name}.

${archetype.tagline}

${archetype.identityDescription}

---

YOUR BRAND PLAYBOOK
===================

POSITIONING
-----------
How to describe yourself:
${archetype.playbook.positioning.howToDescribeYourself}

What to be known for:
${archetype.playbook.positioning.whatToBeKnownFor}

CONTENT STRATEGY
----------------
What to post:
${archetype.playbook.contentStrategy.whatToPost.map((p) => `• ${p}`).join("\n")}

What NOT to post:
${archetype.playbook.contentStrategy.whatNotToPost.map((p) => `• ${p}`).join("\n")}

Tone of voice: ${archetype.playbook.contentStrategy.toneOfVoice}
Filming style: ${archetype.playbook.contentStrategy.filmingStyle}

CLIENT TARGETING
----------------
Who to attract:
${archetype.playbook.clientTargeting.whoToAttract.map((p) => `• ${p}`).join("\n")}

Who to avoid:
${archetype.playbook.clientTargeting.whoToAvoid.map((p) => `• ${p}`).join("\n")}

PRICING STRATEGY
----------------
${archetype.playbook.pricingStrategy.guidance}

BRAND IDENTITY
--------------
Visual direction: ${archetype.playbook.brandIdentity.visualDirection}
Language style: ${archetype.playbook.brandIdentity.languageStyle}
Colour palette: ${archetype.playbook.brandIdentity.colourPalette}

GROWTH STRATEGY
---------------
How you scale best:
${archetype.playbook.growthStrategy.howThisArchetypeScalesBest}

What usually holds you back:
${archetype.playbook.growthStrategy.commonBlockers.map((b) => `• ${b}`).join("\n")}

---

Now you know who you are. The question is — what are you going to do about it?

Start with one thing. Pick your positioning statement, update your bio, and post one piece of content that actually sounds like you.

That's it. One step.

The Tradie Brand Archetype Quiz
tradiearctype.com.au
`.trim();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${subject}</title>
<style>
  body { margin: 0; padding: 0; background: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #e5e5e5; }
  .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
  .header { border-bottom: 2px solid #e07b39; padding-bottom: 24px; margin-bottom: 32px; }
  .archetype-badge { display: inline-block; background: #e07b39; color: #0f0f0f; font-weight: 700; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 4px; margin-bottom: 16px; }
  h1 { font-size: 28px; font-weight: 800; color: #ffffff; margin: 0 0 8px; line-height: 1.2; }
  .tagline { font-size: 16px; color: #e07b39; font-style: italic; margin: 0; }
  .identity { background: #1a1a1a; border-left: 3px solid #e07b39; padding: 20px 24px; border-radius: 0 8px 8px 0; margin: 24px 0; font-size: 15px; line-height: 1.7; color: #cccccc; }
  .section { margin: 32px 0; }
  .section-title { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #e07b39; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #2a2a2a; }
  .subsection-title { font-size: 13px; font-weight: 600; color: #ffffff; margin: 16px 0 8px; }
  p { font-size: 15px; line-height: 1.7; color: #cccccc; margin: 0 0 12px; }
  ul { margin: 0 0 12px; padding-left: 20px; }
  li { font-size: 15px; line-height: 1.7; color: #cccccc; margin-bottom: 4px; }
  .cta-box { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 24px; margin: 32px 0; text-align: center; }
  .cta-box p { color: #ffffff; font-size: 16px; font-weight: 600; margin-bottom: 8px; }
  .cta-box small { color: #888; font-size: 13px; }
  .footer { margin-top: 40px; padding-top: 24px; border-top: 1px solid #2a2a2a; font-size: 12px; color: #555; text-align: center; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <div class="archetype-badge">Your Archetype</div>
    <h1>${archetype.emoji} ${archetype.name}</h1>
    <p class="tagline">${archetype.tagline}</p>
  </div>

  <p style="font-size:16px;color:#e5e5e5;">${greeting}</p>
  <p>You took the Tradie Brand Archetype Quiz — and your result is in. Here's your full Brand Playbook. No fluff. Just what you need to know.</p>

  <div class="identity">${archetype.identityDescription}</div>

  <!-- POSITIONING -->
  <div class="section">
    <div class="section-title">01 — Positioning</div>
    <div class="subsection-title">How to describe yourself</div>
    <p>${archetype.playbook.positioning.howToDescribeYourself}</p>
    <div class="subsection-title">What to be known for</div>
    <p>${archetype.playbook.positioning.whatToBeKnownFor}</p>
  </div>

  <!-- CONTENT STRATEGY -->
  <div class="section">
    <div class="section-title">02 — Content Strategy</div>
    <div class="subsection-title">What to post</div>
    <ul>${archetype.playbook.contentStrategy.whatToPost.map((p) => `<li>${p}</li>`).join("")}</ul>
    <div class="subsection-title">What NOT to post</div>
    <ul>${archetype.playbook.contentStrategy.whatNotToPost.map((p) => `<li>${p}</li>`).join("")}</ul>
    <div class="subsection-title">Tone of voice</div>
    <p>${archetype.playbook.contentStrategy.toneOfVoice}</p>
    <div class="subsection-title">Filming style</div>
    <p>${archetype.playbook.contentStrategy.filmingStyle}</p>
  </div>

  <!-- CLIENT TARGETING -->
  <div class="section">
    <div class="section-title">03 — Client Targeting</div>
    <div class="subsection-title">Who to attract</div>
    <ul>${archetype.playbook.clientTargeting.whoToAttract.map((p) => `<li>${p}</li>`).join("")}</ul>
    <div class="subsection-title">Who to avoid</div>
    <ul>${archetype.playbook.clientTargeting.whoToAvoid.map((p) => `<li>${p}</li>`).join("")}</ul>
  </div>

  <!-- PRICING -->
  <div class="section">
    <div class="section-title">04 — Pricing Strategy</div>
    <p>${archetype.playbook.pricingStrategy.guidance}</p>
  </div>

  <!-- BRAND IDENTITY -->
  <div class="section">
    <div class="section-title">05 — Brand Identity</div>
    <div class="subsection-title">Visual direction</div>
    <p>${archetype.playbook.brandIdentity.visualDirection}</p>
    <div class="subsection-title">Language style</div>
    <p>${archetype.playbook.brandIdentity.languageStyle}</p>
    <div class="subsection-title">Colour palette</div>
    <p>${archetype.playbook.brandIdentity.colourPalette}</p>
  </div>

  <!-- GROWTH STRATEGY -->
  <div class="section">
    <div class="section-title">06 — Growth Strategy</div>
    <div class="subsection-title">How you scale best</div>
    <p>${archetype.playbook.growthStrategy.howThisArchetypeScalesBest}</p>
    <div class="subsection-title">What usually holds you back</div>
    <ul>${archetype.playbook.growthStrategy.commonBlockers.map((b) => `<li>${b}</li>`).join("")}</ul>
  </div>

  <div class="cta-box">
    <p>Now you know who you are.</p>
    <p style="font-size:14px;font-weight:400;color:#aaa;">Start with one thing. Pick your positioning statement, update your bio, and post one piece of content that actually sounds like you.</p>
    <small>That's it. One step.</small>
  </div>

  <div class="footer">
    <p>Tradie Brand Archetype Quiz</p>
    <p style="color:#333;">You're receiving this because you completed the quiz and entered your email.</p>
  </div>
</div>
</body>
</html>`;

  return { subject, html, text: textContent };
}
