import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { ARCHETYPES } from "../shared/archetypes";
import { calculateScores } from "../shared/scoring";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import {
  getAdminStats,
  getAllLeads,
  getQuizSubmissionById,
  getQuizSubmissionAnswers,
  saveEmailCapture,
  saveQuizSubmission,
  updateEmailStatus,
} from "./db";
import { buildPlaybookEmail } from "./emailTemplate";
import { sendEmail } from "./emailSender";
import { logLeadToSheets } from "./sheetsLogger";
import { buildAndLogCRMLead } from "./crmLogger";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Build the shareable playbook URL from the request origin.
 * Falls back to the production domain if origin is unavailable.
 */
function buildPlaybookLink(
  req: { headers: Record<string, string | string[] | undefined> },
  submissionId: number,
  primaryArchetype: string,
  secondaryArchetype?: string | null,
): string {
  // Prefer the Origin header, then X-Forwarded-Host, then the production domain
  const origin =
    (req.headers["origin"] as string) ||
    (req.headers["x-forwarded-host"]
      ? `https://${req.headers["x-forwarded-host"] as string}`
      : null) ||
    "https://tradiequiz-qnyesx8s.manus.space";

  const url = new URL("/results", origin);
  url.searchParams.set("submissionId", String(submissionId));
  url.searchParams.set("archetype", primaryArchetype);
  if (secondaryArchetype) {
    url.searchParams.set("secondary", secondaryArchetype);
  }
  // Unlock the playbook immediately when visiting via the email link
  url.searchParams.set("unlocked", "1");
  return url.toString();
}

// ─── Router ──────────────────────────────────────────────────────────────────

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  quiz: router({
    /**
     * Submit quiz answers → calculate scores → persist → return result
     */
    submit: publicProcedure
      .input(
        z.object({
          sessionId: z.string().min(1),
          answers: z.record(z.string(), z.string()),
        }),
      )
      .mutation(async ({ input }) => {
        const result = calculateScores(input.answers);

        const submissionId = await saveQuizSubmission({
          sessionId: input.sessionId,
          answers: input.answers,
          primaryArchetype: result.primaryArchetype,
          secondaryArchetype: result.secondaryArchetype ?? undefined,
          scores: result.scores,
          percentages: result.percentages,
        });

        // Notify owner of new submission (non-blocking)
        notifyOwner({
          title: "New Quiz Submission",
          content: `Archetype: ${result.primaryArchetype}${result.secondaryArchetype ? ` / ${result.secondaryArchetype}` : ""} | ID: ${submissionId}`,
        }).catch(() => {});

        return {
          submissionId,
          primaryArchetype: result.primaryArchetype,
          secondaryArchetype: result.secondaryArchetype,
          scores: result.scores,
          percentages: result.percentages,
        };
      }),

    /**
     * Get a submission by ID (used to restore results from URL)
     */
    getResult: publicProcedure
      .input(z.object({ submissionId: z.number() }))
      .query(async ({ input }) => {
        const submission = await getQuizSubmissionById(input.submissionId);
        if (!submission) return null;
        return {
          submissionId: submission.id,
          primaryArchetype: submission.primaryArchetype,
          secondaryArchetype: submission.secondaryArchetype ?? null,
          scores: submission.scores as Record<string, number>,
          percentages: submission.percentages as Record<string, number>,
        };
      }),
  }),

  email: router({
    /**
     * Capture email → build shareable link → send Gmail → log to Sheets
     */
    capture: publicProcedure
      .input(
        z.object({
          submissionId: z.number(),
          email: z.string().email(),
          firstName: z.string().optional(),
          archetypeId: z.string(),
          secondaryArchetypeId: z.string().optional(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const archetype = ARCHETYPES[input.archetypeId as keyof typeof ARCHETYPES];
        if (!archetype) throw new Error("Invalid archetype");

        // Build the shareable playbook link
        const playbookLink = buildPlaybookLink(
          ctx.req,
          input.submissionId,
          input.archetypeId,
          input.secondaryArchetypeId,
        );

        // Save capture to DB
        const captureId = await saveEmailCapture({
          submissionId: input.submissionId,
          email: input.email,
          firstName: input.firstName ?? null,
          archetypeId: input.archetypeId,
          emailSent: "pending",
        });

        // Build email content
        const { subject, text } = buildPlaybookEmail(
          archetype,
          input.firstName ?? null,
          playbookLink,
        );

        // ── 1. Send email via Resend ─────────────────────────────────
        const emailResult = await sendEmail({
          to: input.email,
          subject,
          text,
        });

        if (emailResult.success) {
          await updateEmailStatus(captureId, "sent");
          console.log(`[Email] Sent playbook to ${input.email}`);
        } else {
          await updateEmailStatus(captureId, "failed");
          console.error(`[Email] Failed for ${input.email}:`, emailResult.error);
        }

        // ── 2. Log to Google Sheets ──────────────────────────────────
        const sheetsResult = await logLeadToSheets({
          firstName: input.firstName ?? null,
          email: input.email,
          primaryArchetype: input.archetypeId,
          secondaryArchetype: input.secondaryArchetypeId ?? null,
          submissionId: input.submissionId,
          playbookLink,
        });

        if (sheetsResult.success) {
          console.log(`[Sheets] Logged lead: ${input.email}`);
        } else {
          console.error(`[Sheets] Log failed:`, sheetsResult.error);
        }

        // ── 3. Log to CRM (JSONL) ──────────────────────────────────
        const submissionData = await getQuizSubmissionAnswers(input.submissionId);
        const crmResult = await buildAndLogCRMLead({
          firstName: input.firstName ?? null,
          email: input.email,
          archetypeId: input.archetypeId,
          secondaryArchetypeId: input.secondaryArchetypeId ?? null,
          submissionId: input.submissionId,
          quizAnswers: submissionData?.answers as Record<string, string> ?? {},
          scores: submissionData?.scores as Record<string, number> ?? {},
          percentages: submissionData?.percentages as Record<string, number> ?? {},
        });

        if (crmResult.success) {
          console.log(`[CRM] Logged lead: ${input.email}`);
        } else {
          console.error(`[CRM] Log failed:`, crmResult.error);
        }

        // ── 4. Notify owner ──────────────────────────────────────────
        notifyOwner({
          title: `New Lead: ${input.firstName ?? input.email}`,
          content: `Email: ${input.email}\nArchetype: ${archetype.name}\nPlaybook: ${playbookLink}\nEmail sent: ${emailResult.success ? "✓" : "✗"} | Sheets: ${sheetsResult.success ? "✓" : "✗"} | CRM: ${crmResult.success ? "✓" : "✗"}`,
        }).catch(() => {});

        return {
          success: true,
          captureId,
          playbookLink,
          emailSent: emailResult.success,
          sheetsLogged: sheetsResult.success,
          crmLogged: crmResult.success,
        };
      }),
  }),

  admin: router({
    /**
     * Get all email captures — admin only
     */
    getLeads: adminProcedure.query(async () => {
      return getAllLeads();
    }),

    /**
     * Get dashboard stats — admin only
     */
    getStats: adminProcedure.query(async () => {
      return getAdminStats();
    }),
  }),
});

export type AppRouter = typeof appRouter;
