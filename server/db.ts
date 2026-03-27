import { desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  emailCaptures,
  InsertEmailCapture,
  InsertQuizSubmission,
  InsertUser,
  quizSubmissions,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── USER HELPERS ─────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  const textFields = ["name", "email", "loginMethod"] as const;
  type TextField = (typeof textFields)[number];
  const assignNullable = (field: TextField) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  };
  textFields.forEach(assignNullable);

  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── QUIZ HELPERS ─────────────────────────────────────────────────────────────

export async function saveQuizSubmission(data: InsertQuizSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(quizSubmissions).values(data);
  return result[0].insertId as number;
}

export async function getQuizSubmissionById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(quizSubmissions).where(eq(quizSubmissions.id, id)).limit(1);
  return result[0] ?? undefined;
}

export async function getQuizSubmissionAnswers(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select({ answers: quizSubmissions.answers, scores: quizSubmissions.scores, percentages: quizSubmissions.percentages }).from(quizSubmissions).where(eq(quizSubmissions.id, id)).limit(1);
  return result[0] ?? undefined;
}

// ─── EMAIL CAPTURE HELPERS ────────────────────────────────────────────────────

export async function saveEmailCapture(data: InsertEmailCapture) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(emailCaptures).values(data);
  return result[0].insertId as number;
}

export async function updateEmailStatus(
  id: number,
  status: "sent" | "failed",
) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(emailCaptures)
    .set({ emailSent: status })
    .where(eq(emailCaptures.id, id));
}

// ─── ADMIN HELPERS ────────────────────────────────────────────────────────────

export async function getAllLeads() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: emailCaptures.id,
      email: emailCaptures.email,
      firstName: emailCaptures.firstName,
      archetypeId: emailCaptures.archetypeId,
      emailSent: emailCaptures.emailSent,
      createdAt: emailCaptures.createdAt,
      submissionId: emailCaptures.submissionId,
    })
    .from(emailCaptures)
    .orderBy(desc(emailCaptures.createdAt));
}

export async function getAdminStats() {
  const db = await getDb();
  if (!db) return { totalSubmissions: 0, totalCaptures: 0, conversionRate: 0, archetypeBreakdown: {} };

  const [submissionCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(quizSubmissions);

  const [captureCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(emailCaptures);

  const archetypeRows = await db
    .select({
      archetypeId: emailCaptures.archetypeId,
      count: sql<number>`count(*)`,
    })
    .from(emailCaptures)
    .groupBy(emailCaptures.archetypeId);

  const archetypeBreakdown: Record<string, number> = {};
  for (const row of archetypeRows) {
    archetypeBreakdown[row.archetypeId] = Number(row.count);
  }

  const total = Number(submissionCount?.count ?? 0);
  const captures = Number(captureCount?.count ?? 0);

  return {
    totalSubmissions: total,
    totalCaptures: captures,
    conversionRate: total > 0 ? Math.round((captures / total) * 100) : 0,
    archetypeBreakdown,
  };
}
