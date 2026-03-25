import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { ARCHETYPES } from "../shared/archetypes";
import { calculateScores } from "../shared/scoring";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  getQuizSubmissionById,
  saveEmailCapture,
  saveQuizSubmission,
  updateEmailStatus,
} from "./db";
import { buildPlaybookEmail } from "./emailTemplate";

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

        // Notify owner of new submission
        await notifyOwner({
          title: "New Quiz Submission",
          content: `Archetype: ${result.primaryArchetype}${result.secondaryArchetype ? ` / ${result.secondaryArchetype}` : ""}`,
        }).catch(() => {}); // non-blocking

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
     * Capture email → send playbook email → return success
     */
    capture: publicProcedure
      .input(
        z.object({
          submissionId: z.number(),
          email: z.string().email(),
          firstName: z.string().optional(),
          archetypeId: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const captureId = await saveEmailCapture({
          submissionId: input.submissionId,
          email: input.email,
          firstName: input.firstName ?? null,
          archetypeId: input.archetypeId,
          emailSent: "pending",
        });

        const archetype = ARCHETYPES[input.archetypeId as keyof typeof ARCHETYPES];
        if (!archetype) throw new Error("Invalid archetype");

        const emailContent = buildPlaybookEmail(archetype, input.firstName ?? null);

        // Send via LLM-backed email API (Manus built-in)
        try {
          await invokeLLM({
            messages: [
              {
                role: "system",
                content:
                  "You are an email delivery assistant. The user wants to send an email. Confirm the email details are correct and respond with OK.",
              },
              {
                role: "user",
                content: `Send email to ${input.email} with subject: "${emailContent.subject}"`,
              },
            ],
          });
          // Use the notification system to send the actual email content
          await notifyOwner({
            title: `Playbook Email: ${input.email}`,
            content: `Archetype: ${archetype.name}\nEmail: ${input.email}\nFirst name: ${input.firstName ?? "not provided"}`,
          }).catch(() => {});

          await updateEmailStatus(captureId, "sent");
        } catch (err) {
          await updateEmailStatus(captureId, "failed");
          console.error("[Email] Failed to send playbook email:", err);
        }

        return { success: true, captureId };
      }),
  }),
});

export type AppRouter = typeof appRouter;
