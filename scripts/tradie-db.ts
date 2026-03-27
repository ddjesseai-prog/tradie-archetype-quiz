/**
 * Tradie Quiz - SQLite Database Layer
 * 
 * Isolated storage for Tradie Quiz leads (separate from DreamDealer)
 * Uses sql.js (pure JS SQLite) to avoid native binding issues
 * 
 * Schema:
 * - leads: Individual lead records with qualification state
 * - messages: Log of sent messages/emails
 * - sequence_state: Current position in follow-up sequences
 */

import initSqlJs, { Database as SqlJsDatabase } from "sql.js";
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "tradie.db");

let _db: SqlJsDatabase | null = null;
let _initialized = false;

// ─── Initialize ───────────────────────────────────────────────────────────────

async function initDb(): Promise<SqlJsDatabase> {
  if (_db) return _db;
  
  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  const SQL = await initSqlJs();
  
  // Load existing or create new
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    _db = new SQL.Database(buffer);
  } else {
    _db = new SQL.Database();
  }
  
  initSchema(_db);
  _initialized = true;
  
  return _db;
}

function getDb(): SqlJsDatabase {
  if (!_db) {
    throw new Error("Database not initialized. Call initDb() first.");
  }
  return _db;
}

function saveDb() {
  if (_db) {
    const data = _db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

function initSchema(db: SqlJsDatabase) {
  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      first_name TEXT,
      phone TEXT,
      archetype_id TEXT NOT NULL,
      archetype_name TEXT NOT NULL,
      secondary_archetype_id TEXT,
      secondary_archetype_name TEXT,
      quiz_answers TEXT,
      scores TEXT,
      percentages TEXT,
      source TEXT DEFAULT 'tradie-quiz',
      qual_stage TEXT DEFAULT 'new',
      qual_stage_updated_at TEXT,
      sequence_status TEXT DEFAULT 'idle',
      sequence_id TEXT,
      current_stage_id TEXT,
      manual_review INTEGER DEFAULT 0,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id INTEGER NOT NULL,
      sequence_id TEXT,
      stage_id TEXT,
      type TEXT NOT NULL,
      template_id TEXT,
      subject TEXT,
      body TEXT,
      status TEXT DEFAULT 'pending',
      sent_at TEXT,
      error TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(id)
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS sequence_state (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id INTEGER NOT NULL UNIQUE,
      sequence_id TEXT NOT NULL,
      current_stage_id TEXT,
      stage_started_at TEXT,
      stage_completed_at TEXT,
      next_scheduled_at TEXT,
      retry_count INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(id)
    )
  `);
  
  db.run(`CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_leads_qual_stage ON leads(qual_stage)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_leads_sequence_status ON leads(sequence_status)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_messages_lead_id ON messages(lead_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_sequence_state_lead_id ON sequence_state(lead_id)`);
}

// ─── Lead Operations ────────────────────────────────────────────────────────

export interface TradieLead {
  id: number;
  email: string;
  first_name: string | null;
  phone: string | null;
  archetype_id: string;
  archetype_name: string;
  secondary_archetype_id: string | null;
  secondary_archetype_name: string | null;
  quiz_answers: string | null;
  scores: string | null;
  percentages: string | null;
  source: string;
  qual_stage: string;
  qual_stage_updated_at: string | null;
  sequence_status: string;
  sequence_id: string | null;
  current_stage_id: string | null;
  manual_review: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export async function initTradieDb(): Promise<void> {
  await initDb();
}

export function createLead(data: {
  email: string;
  firstName?: string;
  phone?: string;
  archetypeId: string;
  archetypeName: string;
  secondaryArchetypeId?: string;
  secondaryArchetypeName?: string;
  quizAnswers?: Record<string, string>;
  scores?: Record<string, number>;
  percentages?: Record<string, number>;
}): number {
  const db = getDb();
  
  db.run(`
    INSERT INTO leads (
      email, first_name, phone, 
      archetype_id, archetype_name, 
      secondary_archetype_id, secondary_archetype_name,
      quiz_answers, scores, percentages,
      qual_stage, qual_stage_updated_at, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', datetime('now'), datetime('now'), datetime('now'))
  `, [
    data.email,
    data.firstName ?? null,
    data.phone ?? null,
    data.archetypeId,
    data.archetypeName,
    data.secondaryArchetypeId ?? null,
    data.secondaryArchetypeName ?? null,
    data.quizAnswers ? JSON.stringify(data.quizAnswers) : null,
    data.scores ? JSON.stringify(data.scores) : null,
    data.percentages ? JSON.stringify(data.percentages) : null,
  ]);
  
  const result = db.exec("SELECT last_insert_rowid() as id");
  const id = result[0]?.values[0]?.[0] as number;
  
  saveDb();
  return id;
}

export function getLeadByEmail(email: string): TradieLead | undefined {
  const db = getDb();
  const result = db.exec("SELECT * FROM leads WHERE email = ?", [email]);
  if (result.length === 0 || result[0].values.length === 0) return undefined;
  return rowToLead(result[0].columns, result[0].values[0]);
}

export function getLeadById(id: number): TradieLead | undefined {
  const db = getDb();
  const result = db.exec("SELECT * FROM leads WHERE id = ?", [id]);
  if (result.length === 0 || result[0].values.length === 0) return undefined;
  return rowToLead(result[0].columns, result[0].values[0]);
}

export function updateLeadQualStage(id: number, stage: string) {
  const db = getDb();
  db.run(`UPDATE leads SET qual_stage = ?, qual_stage_updated_at = datetime('now'), updated_at = datetime('now') WHERE id = ?`, [stage, id]);
  saveDb();
}

export function updateLeadSequence(id: number, status: string, sequenceId?: string, stageId?: string) {
  const db = getDb();
  db.run(`UPDATE leads SET sequence_status = ?, sequence_id = ?, current_stage_id = ?, updated_at = datetime('now') WHERE id = ?`, [status, sequenceId ?? null, stageId ?? null, id]);
  saveDb();
}

export function getLeadsByQualStage(stage: string): TradieLead[] {
  const db = getDb();
  const result = db.exec("SELECT * FROM leads WHERE qual_stage = ?", [stage]);
  if (result.length === 0) return [];
  return result[0].values.map(row => rowToLead(result[0].columns, row));
}

export function getLeadsNeedingFollowup(): TradieLead[] {
  const db = getDb();
  const result = db.exec(`SELECT * FROM leads WHERE qual_stage IN ('qualified', 'warm', 'conversation') AND sequence_status != 'exhausted' AND manual_review = 0`);
  if (result.length === 0) return [];
  return result[0].values.map(row => rowToLead(result[0].columns, row));
}

export function getLeadsForManualReview(): TradieLead[] {
  const db = getDb();
  const result = db.exec(`SELECT * FROM leads WHERE manual_review = 1 AND qual_stage != 'manual_reviewed' ORDER BY updated_at DESC`);
  if (result.length === 0) return [];
  return result[0].values.map(row => rowToLead(result[0].columns, row));
}

export function setLeadManualReview(id: number, flag: boolean) {
  const db = getDb();
  db.run("UPDATE leads SET manual_review = ? WHERE id = ?", [flag ? 1 : 0, id]);
  saveDb();
}

function rowToLead(columns: string[], row: unknown[]): TradieLead {
  const obj: Record<string, unknown> = {};
  columns.forEach((col, i) => { obj[col] = row[i]; });
  return obj as unknown as TradieLead;
}

// ─── Message Operations ──────────────────────────────────────────────────────

export function logMessage(data: {
  leadId: number;
  sequenceId?: string;
  stageId?: string;
  type: string;
  templateId?: string;
  subject?: string;
  body: string;
  status?: string;
  error?: string;
}): number {
  const db = getDb();
  
  db.run(`
    INSERT INTO messages (lead_id, sequence_id, stage_id, type, template_id, subject, body, status, error, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `, [
    data.leadId,
    data.sequenceId ?? null,
    data.stageId ?? null,
    data.type,
    data.templateId ?? null,
    data.subject ?? null,
    data.body,
    data.status ?? "pending",
    data.error ?? null,
  ]);
  
  const result = db.exec("SELECT last_insert_rowid() as id");
  const id = result[0]?.values[0]?.[0] as number;
  
  saveDb();
  return id;
}

export function markMessageSent(id: number) {
  const db = getDb();
  db.run(`UPDATE messages SET status = 'sent', sent_at = datetime('now') WHERE id = ?`, [id]);
  saveDb();
}

export function markMessageFailed(id: number, error: string) {
  const db = getDb();
  db.run(`UPDATE messages SET status = 'failed', error = ? WHERE id = ?`, [error, id]);
  saveDb();
}

export function getMessagesForLead(leadId: number) {
  const db = getDb();
  const result = db.exec("SELECT * FROM messages WHERE lead_id = ? ORDER BY created_at DESC", [leadId]);
  if (result.length === 0) return [];
  return result[0].values.map(row => {
    const obj: Record<string, unknown> = {};
    result[0].columns.forEach((col, i) => { obj[col] = row[i]; });
    return obj;
  });
}

// ─── Sequence State Operations ──────────────────────────────────────────────

export function startSequence(leadId: number, sequenceId: string, firstStageId: string, nextScheduledAt: string) {
  const db = getDb();
  
  db.run(`
    INSERT INTO sequence_state (lead_id, sequence_id, current_stage_id, stage_started_at, next_scheduled_at, status, created_at, updated_at)
    VALUES (?, ?, ?, datetime('now'), ?, 'active', datetime('now'), datetime('now'))
  `, [leadId, sequenceId, firstStageId, nextScheduledAt]);
  
  updateLeadSequence(leadId, "active", sequenceId, firstStageId);
  saveDb();
}

export function advanceSequence(leadId: number, nextStageId: string | null, nextScheduledAt: string | null) {
  const db = getDb();
  
  if (nextStageId) {
    db.run(`
      UPDATE sequence_state SET current_stage_id = ?, stage_started_at = datetime('now'), next_scheduled_at = ?, updated_at = datetime('now')
      WHERE lead_id = ? AND status = 'active'
    `, [nextStageId, nextScheduledAt, leadId]);
    updateLeadSequence(leadId, "active", undefined, nextStageId);
  } else {
    db.run(`
      UPDATE sequence_state SET status = 'completed', stage_completed_at = datetime('now'), updated_at = datetime('now')
      WHERE lead_id = ? AND status = 'active'
    `, [leadId]);
    updateLeadSequence(leadId, "exhausted");
  }
  saveDb();
}

export function getActiveSequences() {
  const db = getDb();
  // Get all active sequences and filter in JS to handle ISO timestamps
  const result = db.exec(`
    SELECT ss.*, l.email, l.first_name, l.archetype_name, l.qual_stage
    FROM sequence_state ss
    JOIN leads l ON ss.lead_id = l.id
    WHERE ss.status = 'active'
  `);
  if (result.length === 0) return [];
  
  const now = new Date();
  return result[0].values
    .map(row => {
      const obj: Record<string, unknown> = {};
      result[0].columns.forEach((col, i) => { obj[col] = row[i]; });
      return obj;
    })
    .filter((seq: Record<string, unknown>) => {
      const scheduled = new Date(seq.next_scheduled_at as string);
      return scheduled <= now;
    });
}

export function completeSequence(leadId: number) {
  const db = getDb();
  db.run(`
    UPDATE sequence_state SET status = 'completed', stage_completed_at = datetime('now'), updated_at = datetime('now')
    WHERE lead_id = ? AND status = 'active'
  `, [leadId]);
  updateLeadSequence(leadId, "exhausted");
  saveDb();
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export function getTradieStats() {
  const db = getDb();
  
  const totalResult = db.exec("SELECT COUNT(*) as count FROM leads");
  const totalLeads = totalResult[0]?.values[0]?.[0] as number ?? 0;
  
  const byStageResult = db.exec("SELECT qual_stage, COUNT(*) as count FROM leads GROUP BY qual_stage");
  const byStage: Record<string, number> = {};
  if (byStageResult.length > 0) {
    byStageResult[0].values.forEach(row => {
      byStage[row[0] as string] = row[1] as number;
    });
  }
  
  const byArchetypeResult = db.exec("SELECT archetype_id, COUNT(*) as count FROM leads GROUP BY archetype_id");
  const byArchetype: Record<string, number> = {};
  if (byArchetypeResult.length > 0) {
    byArchetypeResult[0].values.forEach(row => {
      byArchetype[row[0] as string] = row[1] as number;
    });
  }
  
  const manualResult = db.exec("SELECT COUNT(*) as count FROM leads WHERE manual_review = 1");
  const manualReviewCount = manualResult[0]?.values[0]?.[0] as number ?? 0;
  
  return {
    totalLeads,
    byStage,
    byArchetype,
    manualReviewCount,
  };
}

export function getLeadsForCRM() {
  const db = getDb();
  const result = db.exec("SELECT id, email, first_name, archetype_name, qual_stage, sequence_status, updated_at, created_at FROM leads ORDER BY created_at DESC");
  if (result.length === 0) return [];
  return result[0].values.map(row => ({
    id: row[0] as number,
    email: row[1] as string,
    first_name: row[2] as string | null,
    archetype_name: row[3] as string,
    qual_stage: row[4] as string,
    sequence_status: row[5] as string,
    updated_at: row[6] as string,
    created_at: row[7] as string,
  }));
}