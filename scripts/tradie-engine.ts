/**
 * Tradie Quiz - Follow-Up Engine
 * 
 * Isolated engine for running Tradie Quiz follow-up sequences.
 * Pattern copied from DreamDealer Cypher but completely separate.
 * 
 * Run via: pnpm tradie:engine
 * Schedule via: LaunchAgent (ai.dreamdealer.tradie-engine)
 */

import fs from "node:fs";
import path from "node:path";

// ─── Timezone Configuration ─────────────────────────────────────────────────
// Australia/Brisbane timezone (AEST/GMT+10, no DST)
const BRISBANE_OFFSET_MS = 10 * 60 * 60 * 1000; // +10 hours from UTC

function getBrisbaneNow(): Date {
  // Current time in Brisbane timezone
  return new Date(Date.now() + BRISBANE_OFFSET_MS);
}

function getBrisbaneHour(): number {
  // Get current hour in Brisbane (0-23)
  const brisbaneTime = getBrisbaneNow();
  return brisbaneTime.getUTCHours();
}

function isReadyInBrisbane(utcScheduledAt: string): boolean {
  // Convert scheduled time (UTC) to Brisbane time for comparison
  const scheduledBrisbane = new Date(new Date(utcScheduledAt).getTime() + BRISBANE_OFFSET_MS);
  const nowBrisbane = getBrisbaneNow();
  return nowBrisbane >= scheduledBrisbane;
}

// Load .env.tradie
const envPath = path.join(process.cwd(), ".env.tradie");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
}
import {
  advanceSequence,
  completeSequence,
  createLead,
  getActiveSequences,
  getLeadByEmail,
  getLeadsForManualReview,
  getMessagesForLead,
  initTradieDb,
  getTradieStats,
  logMessage,
  markMessageFailed,
  markMessageSent,
  startSequence,
  updateLeadQualStage,
} from "./tradie-db.js";

const DATA_DIR = path.resolve(process.cwd(), "data");
const SEQUENCES_PATH = path.join(process.cwd(), "scripts/tradie-sequences.json");

interface SequenceConfig {
  sequences: Record<string, Sequence>;
  templates: Record<string, Template>;
}

interface Sequence {
  name: string;
  description: string;
  trigger: string;
  stages: Stage[];
}

interface Stage {
  id: string;
  name: string;
  type: string;
  delay_hours: number;
  template: string;
  next_stage: string | null;
}

interface Template {
  subject: string;
  variables: string[];
}

// ─── Load Sequences ─────────────────────────────────────────────────────────

function loadSequences(): SequenceConfig {
  const raw = fs.readFileSync(SEQUENCES_PATH, "utf-8");
  return JSON.parse(raw);
}

// ─── Email Sender (Resend) ────────────────────────────────────────────────────

const DRY_RUN = !process.env.RESEND_API_KEY;

async function sendEmail(to: string, subject: string, body: string): Promise<{ success: boolean; error?: string }> {
  if (DRY_RUN) {
    console.log(`[DRY-RUN] Would send email to ${to}: ${subject}`);
    return { success: true }; // Pretend success in dry-run
  }
  
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.warn("[Tradie Engine] RESEND_API_KEY not set, skipping email send");
    return { success: false, error: "RESEND_API_KEY not configured" };
  }
  
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Tradie Quiz <onboarding@resend.dev>",
        to,
        subject,
        html: `<html><body>${body}</body></html>`,
      }),
    });
    
    if (res.ok) {
      return { success: true };
    }
    
    const error = await res.text();
    return { success: false, error };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ─── Build Email Content ─────────────────────────────────────────────────────

function buildEmailContent(templateId: string, variables: Record<string, string>): { subject: string; body: string } {
  const config = loadSequences();
  const template = config.templates[templateId];
  
  if (!template) {
    return { subject: "Update from Tradie Quiz", body: variables.body ?? "Here's your update." };
  }
  
  // Simple variable replacement
  let subject = template.subject;
  let body = variables.body ?? getDefaultBody(templateId);
  
  for (const [key, value] of Object.entries(variables)) {
    subject = subject.replace(new RegExp(`{{${key}}}`, "g"), value);
    body = body.replace(new RegExp(`{{${key}}}`, "g"), value);
  }
  
  return { subject, body };
}

function getDefaultBody(templateId: string): string {
  const bodies: Record<string, string> = {
    welcome_email: `<p>Hi {{firstName}},</p><p>Your archetype is <strong>{{archetypeName}}</strong>.</p><p>Click here to see your full playbook: {{playbookLink}}</p>`,
    day_1_followup: `<p>Hey {{firstName}},</p><p>Quick question — did you check out your {{archetypeName}} archetype?</p><p>Let me know if you have any questions.</p>`,
    day_3_value: `<p>{{firstName}},</p><p>Here are 3 things every tradie brand gets wrong (and how to fix them):</p><ol><li>Trying to be everywhere instead of dominate one channel</li><li>Copying corporate marketing instead of embracing the tradie identity</li><li>Waiting for referrals instead of building a system</li></ol><p>Which one hits home?</p>`,
    day_7_soft_close: `<p>{{firstName}},</p><p>This is your last chance to unlock your full brand playbook.</p><p><a href="{{playbookLink}}">Click here to see it now</a></p><p>— Jesse</p>`,
    reengage_1: `<p>{{firstName}},</p><p>Did you see your {{archetypeName}} archetype result?</p><p>It's free to check out — no catch.</p>`,
    reengage_2: `<p>{{firstName}},</p><p>One more thing...</p><p>If this isn't for you, just reply "stop" and I'll leave you alone.</p>`,
  };
  return bodies[templateId] ?? "<p>Here's your update.</p>";
}

// ─── Run Scheduled Sequences ─────────────────────────────────────────────────

async function runScheduledSequences() {
  const config = loadSequences();
  const ready = getActiveSequences();
  
  console.log(`[Tradie Engine] ${ready.length} sequences ready to process`);
  
  for (const seq of ready) {
    const sequence = config.sequences[seq.sequence_id];
    if (!sequence) {
      console.warn(`[Tradie Engine] Unknown sequence: ${seq.sequence_id}`);
      continue;
    }
    
    const currentStage = sequence.stages.find(s => s.id === seq.current_stage_id);
    if (!currentStage) {
      console.warn(`[Tradie Engine] Unknown stage: ${seq.current_stage_id}`);
      continue;
    }
    
    // Check if this is an immediate email (welcome_email, delay_hours: 0)
    const isImmediateEmail = currentStage.delay_hours === 0;
    
    // Brisbane time check for non-immediate emails
    // Immediate emails (welcome_email) send at any time
    // Later stages use Brisbane timezone for scheduling decisions
    const brisbaneHour = getBrisbaneHour();
    const canSendNow = isImmediateEmail || (brisbaneHour >= 8 && brisbaneHour < 20); // 8AM-8PM AEST
    
    if (!canSendNow && !isImmediateEmail) {
      console.log(`[Tradie Engine] Skipping ${currentStage.template} - outside Brisbane business hours (${brisbaneHour}:00 AEST)`);
      continue;
    }
    
    // Send the message
    const lead = { email: seq.email, firstName: seq.first_name };
    const variables: Record<string, string> = {
      firstName: lead.firstName ?? "there",
      archetypeName: seq.archetype_name,
      playbookLink: "https://tradiequiz.com/results",
      body: "",
    };
    
    const { subject, body } = buildEmailContent(currentStage.template, variables);
    
    // Log message
    const msgId = logMessage({
      leadId: seq.lead_id,
      sequenceId: seq.sequence_id,
      stageId: currentStage.id,
      type: currentStage.type,
      templateId: currentStage.template,
      subject,
      body,
    });
    
    // Send
    const result = await sendEmail(lead.email, subject, body);
    
    if (result.success) {
      markMessageSent(msgId);
      console.log(`[Tradie Engine] Sent ${currentStage.template} to ${lead.email}${isImmediateEmail ? ' (immediate)' : ''}`);
    } else {
      markMessageFailed(msgId, result.error ?? "Unknown error");
      console.error(`[Tradie Engine] Failed to send to ${lead.email}:`, result.error);
    }
    
    // Advance sequence
    if (currentStage.next_stage) {
      const nextStage = sequence.stages.find(s => s.id === currentStage.next_stage);
      const nextScheduled = nextStage 
        ? new Date(Date.now() + nextStage.delay_hours * 60 * 60 * 1000).toISOString()
        : null;
      
      advanceSequence(seq.lead_id, currentStage.next_stage, nextScheduled);
    } else {
      completeSequence(seq.lead_id);
    }
  }
}

// ─── Trigger New Sequence ────────────────────────────────────────────────────

function triggerSequence(leadId: number, sequenceKey: string) {
  const config = loadSequences();
  const sequence = config.sequences[sequenceKey];
  
  if (!sequence) {
    console.error(`[Tradie Engine] Sequence not found: ${sequenceKey}`);
    return false;
  }
  
  const firstStage = sequence.stages[0];
  if (!firstStage) {
    console.error(`[Tradie Engine] No stages in sequence: ${sequenceKey}`);
    return false;
  }
  
  const nextScheduled = new Date(Date.now() + firstStage.delay_hours * 60 * 60 * 1000).toISOString();
  
  startSequence(leadId, sequenceKey, firstStage.id, nextScheduled);
  console.log(`[Tradie Engine] Started sequence '${sequenceKey}' for lead ${leadId}`);
  
  return true;
}

// ─── Check Manual Review ─────────────────────────────────────────────────────

async function checkManualReview() {
  const leads = getLeadsForManualReview();
  
  if (leads.length > 0) {
    console.log(`[Tradie Engine] ${leads.length} leads need manual review`);
    
    // TODO: Send notification to Jesse
    for (const lead of leads) {
      console.log(`  - ${lead.email} (${lead.archetype_name}) [${lead.qual_stage}]`);
    }
  }
}

// ─── Sync from JSONL ─────────────────────────────────────────────────────────

function syncFromJSONL() {
  const jsonlPath = path.join(DATA_DIR, "crm-leads.jsonl");
  
  if (!fs.existsSync(jsonlPath)) {
    return;
  }
  
  const lines = fs.readFileSync(jsonlPath, "utf-8").split("\n").filter(Boolean);
  let synced = 0;
  
  for (const line of lines) {
    try {
      const payload = JSON.parse(line);
      
      // Check if already exists
      const existing = getLeadByEmail(payload.email);
      if (existing) {
        continue;
      }
      
      // Create lead
      const leadId = createLead({
        email: payload.email,
        firstName: payload.firstName,
        archetypeId: payload.archetypeId,
        archetypeName: payload.archetypeName,
        secondaryArchetypeId: payload.secondaryArchetypeId,
        secondaryArchetypeName: payload.secondaryArchetypeName,
        quizAnswers: payload.quizAnswers,
        scores: payload.scores,
        percentages: payload.percentages,
      });
      
      // Auto-trigger post-quiz sequence
      triggerSequence(leadId, "post_quiz_capture");
      
      synced++;
    } catch (e) {
      console.warn(`[Tradie Engine] Failed to parse JSONL line:`, e);
    }
  }
  
  if (synced > 0) {
    console.log(`[Tradie Engine] Synced ${synced} new leads from JSONL`);
  }
}

// ─── Main Loop ───────────────────────────────────────────────────────────────

async function main() {
  console.log("[Tradie Engine] Starting...");
  
  // Initialize DB
  await initTradieDb();
  
  // Sync leads from JSONL
  syncFromJSONL();
  
  // Run scheduled sequences
  await runScheduledSequences();
  
  // Check manual review
  await checkManualReview();
  
  // Stats
  const stats = getTradieStats();
  console.log(`[Tradie Engine] Stats: ${stats.totalLeads} leads, ${stats.manualReviewCount} pending review`);
  
  console.log("[Tradie Engine] Done.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main, triggerSequence, getTradieStats };