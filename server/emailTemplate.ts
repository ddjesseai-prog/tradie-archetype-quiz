import type { Archetype } from "../shared/archetypes";

export function buildPlaybookEmail(
  archetype: Archetype,
  firstName: string | null,
  playbookLink: string,
): { subject: string; text: string } {
  const greeting = firstName ? `G'day ${firstName},` : "G'day,";
  const subject = `Your Brand Archetype: ${archetype.name} — Here's Your Playbook`;

  const textContent = `${greeting}

You just took the Tradie Brand Archetype Quiz — and your result is in.

You're ${archetype.name}.

"${archetype.tagline}"

${archetype.identityDescription}

──────────────────────────────────────────
VIEW YOUR FULL BRAND PLAYBOOK HERE:
${playbookLink}
──────────────────────────────────────────

Bookmark that link. It's your personalised brand playbook — built specifically for how you work.

Here's a quick summary of what's inside:

YOUR BRAND PLAYBOOK
===================

POSITIONING
-----------
How to describe yourself:
"${archetype.playbook.positioning.howToDescribeYourself}"

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

──────────────────────────────────────────

Now you know who you are. The question is — what are you going to do about it?

Start with one thing. Pick your positioning statement, update your bio, and post one piece of content that actually sounds like you.

That's it. One step.

View your full playbook anytime here:
${playbookLink}

The Tradie Brand Archetype Quiz
`.trim();

  return { subject, text: textContent };
}
