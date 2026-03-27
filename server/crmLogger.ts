/**
 * CRM Lead Logger
 * 
 * Writes lead data to a local JSONL file for future CRM integration.
 * This is a staging point — replace with real CRM API call when ready.
 * 
 * Format: JSONL (one JSON object per line)
 * Location: /workspace/projects/tradie_quiz_site/data/crm-leads.jsonl
 */

import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.resolve(process.cwd(), "data");
const CRM_LEADS_FILE = path.join(DATA_DIR, "crm-leads.jsonl");

export interface CRMLeadPayload {
  // Contact
  firstName: string | null;
  email: string;
  
  // Quiz Result
  archetypeId: string;
  archetypeName: string;
  secondaryArchetypeId: string | null;
  secondaryArchetypeName: string | null;
  
  // Scores (for segmentation)
  scores: Record<string, number>;
  percentages: Record<string, number>;
  
  // Context
  submissionId: number;
  quizAnswers: Record<string, string>; // questionId → optionId
  
  // Metadata
  timestamp: string; // ISO 8601
  source: "tradie-quiz";
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export async function logLeadToCRM(payload: CRMLeadPayload): Promise<{ success: boolean; error?: string }> {
  try {
    ensureDataDir();
    
    const line = JSON.stringify(payload) + "\n";
    fs.appendFileSync(CRM_LEADS_FILE, line, "utf-8");
    
    console.log(`[CRM] Lead logged: ${payload.email} (${payload.archetypeId})`);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[CRM] Log failed:", message);
    return { success: false, error: message };
  }
}

/**
 * Build CRM payload from quiz submission data.
 * Call this from the email.capture mutation with full submission data.
 */
export async function buildAndLogCRMLead({
  firstName,
  email,
  archetypeId,
  secondaryArchetypeId,
  submissionId,
  quizAnswers,
  scores,
  percentages,
}: {
  firstName: string | null;
  email: string;
  archetypeId: string;
  secondaryArchetypeId: string | null;
  submissionId: number;
  quizAnswers: Record<string, string>;
  scores: Record<string, number>;
  percentages: Record<string, number>;
}): Promise<{ success: boolean; error?: string }> {
  const { ARCHETYPES } = await import("../shared/archetypes.js");
  
  const primaryArchetype = ARCHETYPES[archetypeId as keyof typeof ARCHETYPES];
  const secondaryArchetype = secondaryArchetypeId 
    ? ARCHETYPES[secondaryArchetypeId as keyof typeof ARCHETYPES]
    : null;
  
  const payload: CRMLeadPayload = {
    firstName,
    email,
    archetypeId,
    archetypeName: primaryArchetype?.name ?? archetypeId,
    secondaryArchetypeId,
    secondaryArchetypeName: secondaryArchetype?.name ?? null,
    scores,
    percentages,
    submissionId,
    quizAnswers,
    timestamp: new Date().toISOString(),
    source: "tradie-quiz",
  };
  
  return logLeadToCRM(payload);
}