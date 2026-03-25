/**
 * Sends transactional emails via the Resend API.
 * Uses a direct REST call so it works in both sandbox and deployed production environments.
 */
export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    console.error("[Email] RESEND_API_KEY is not configured");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject,
        text,
      }),
    });

    if (res.ok) {
      const data = (await res.json()) as { id?: string };
      console.log("[Email] Sent successfully, id:", data.id);
      return { success: true };
    }

    const errorBody = await res.text().catch(() => "");
    console.error("[Email] Resend API error:", res.status, errorBody);
    return { success: false, error: `Resend ${res.status}: ${errorBody.slice(0, 200)}` };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Email] Send failed:", message);
    return { success: false, error: message };
  }
}

// Keep backward-compatible alias so existing imports still work
export const sendGmailEmail = ({
  to,
  subject,
  content,
}: {
  to: string;
  subject: string;
  content: string;
}) => sendEmail({ to, subject, text: content });
