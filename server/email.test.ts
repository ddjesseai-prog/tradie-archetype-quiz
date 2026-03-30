import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock external side-effects before importing routers

vi.mock("./emailSender", () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
  sendGmailEmail: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("./sheetsLogger", () => ({
  logLeadToSheets: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

vi.mock("./db", () => ({
  saveEmailCapture: vi.fn().mockResolvedValue(42),
  updateEmailStatus: vi.fn().mockResolvedValue(undefined),
  saveQuizSubmission: vi.fn().mockResolvedValue(1),
  getQuizSubmissionById: vi.fn().mockResolvedValue(null),
  getQuizSubmissionAnswers: vi.fn().mockResolvedValue([]),
  getAllLeads: vi.fn().mockResolvedValue([]),
  getAdminStats: vi.fn().mockResolvedValue({}),
}));

import { appRouter } from "./routers";
import { sendEmail } from "./emailSender";
import { logLeadToSheets } from "./sheetsLogger";
import { saveEmailCapture, updateEmailStatus } from "./db";
import type { TrpcContext } from "./_core/context";

function createPublicCtx(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {
        origin: "https://tradiequiz-qnyesx8s.manus.space",
      },
    } as unknown as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("email.capture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (sendEmail as ReturnType<typeof vi.fn>).mockResolvedValue({ success: true });
    (logLeadToSheets as ReturnType<typeof vi.fn>).mockResolvedValue({ success: true });
    (saveEmailCapture as ReturnType<typeof vi.fn>).mockResolvedValue(42);
    (updateEmailStatus as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
  });

  it("saves email capture to DB", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await caller.email.capture({
      submissionId: 1,
      email: "test@example.com",
      firstName: "Jake",
      archetypeId: "PC",
    });
    expect(saveEmailCapture).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "test@example.com",
        firstName: "Jake",
        archetypeId: "PC",
        emailSent: "pending",
      }),
    );
  });

  it("calls sendEmail with correct recipient", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await caller.email.capture({
      submissionId: 1,
      email: "tradie@example.com",
      archetypeId: "PC",
    });
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "tradie@example.com",
      }),
    );
  });

  it("email subject includes archetype name", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await caller.email.capture({
      submissionId: 1,
      email: "tradie@example.com",
      archetypeId: "PC",
    });
    const callArgs = (sendEmail as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callArgs.subject).toContain("Precision Craftsman");
  });

  it("email text includes playbook link", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await caller.email.capture({
      submissionId: 99,
      email: "tradie@example.com",
      archetypeId: "SO",
    });
    const callArgs = (sendEmail as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callArgs.text).toContain("submissionId=99");
    expect(callArgs.text).toContain("archetype=SO");
    expect(callArgs.text).toContain("unlocked=1");
  });

  it("calls logLeadToSheets with correct data", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await caller.email.capture({
      submissionId: 5,
      email: "sheets@example.com",
      firstName: "Dave",
      archetypeId: "HT",
      secondaryArchetypeId: "RB",
    });
    expect(logLeadToSheets).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "sheets@example.com",
        firstName: "Dave",
        primaryArchetype: "HT",
        secondaryArchetype: "RB",
        submissionId: 5,
      }),
    );
  });

  it("marks email as sent when Resend succeeds", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await caller.email.capture({
      submissionId: 1,
      email: "success@example.com",
      archetypeId: "VC",
    });
    expect(updateEmailStatus).toHaveBeenCalledWith(42, "sent");
  });

  it("marks email as failed when Resend fails", async () => {
    (sendEmail as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      success: false,
      error: "Network error",
    });
    const caller = appRouter.createCaller(createPublicCtx());
    await caller.email.capture({
      submissionId: 1,
      email: "fail@example.com",
      archetypeId: "RB",
    });
    expect(updateEmailStatus).toHaveBeenCalledWith(42, "failed");
  });

  it("returns success with playbookLink and status flags", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.email.capture({
      submissionId: 7,
      email: "result@example.com",
      archetypeId: "HT",
    });
    expect(result.success).toBe(true);
    expect(result.emailSent).toBe(true);
    expect(result.sheetsLogged).toBe(true);
    expect(result.playbookLink).toContain("submissionId=7");
  });

  it("throws on invalid archetypeId", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await expect(
      caller.email.capture({
        submissionId: 1,
        email: "test@example.com",
        archetypeId: "not_a_real_archetype",
      }),
    ).rejects.toThrow();
  });
});
