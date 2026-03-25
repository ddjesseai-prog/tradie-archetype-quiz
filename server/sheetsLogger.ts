/**
 * Appends a lead row to the Tradie Quiz Google Sheet via the Sheets REST API.
 * Uses the GOOGLE_WORKSPACE_CLI_TOKEN OAuth token which is available in both
 * sandbox and deployed production environments.
 */

const SHEET_ID = "1ochv-YGKaxYAqAUgXbl-4qjyezPY6V6YYhNVoAeAGPQ";
const SHEET_NAME = "Leads";

export async function logLeadToSheets({
  firstName,
  email,
  primaryArchetype,
  secondaryArchetype,
  submissionId,
  playbookLink,
}: {
  firstName: string | null;
  email: string;
  primaryArchetype: string;
  secondaryArchetype: string | null;
  submissionId: number;
  playbookLink: string;
}): Promise<{ success: boolean; error?: string }> {
  const token = process.env.GOOGLE_WORKSPACE_CLI_TOKEN;

  if (!token) {
    console.error("[Sheets] GOOGLE_WORKSPACE_CLI_TOKEN is not configured");
    return { success: false, error: "Sheets token not configured" };
  }

  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

  const row = [
    timestamp,
    firstName ?? "",
    email,
    primaryArchetype,
    secondaryArchetype ?? "",
    String(submissionId),
    playbookLink,
  ];

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME + "!A:G")}:append?valueInputOption=RAW`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (res.ok) {
      const data = (await res.json()) as { updates?: { updatedRows?: number } };
      console.log("[Sheets] Row appended, updatedRows:", data.updates?.updatedRows);
      return { success: true };
    }

    const errorBody = await res.text().catch(() => "");
    console.error("[Sheets] API error:", res.status, errorBody.slice(0, 200));

    // If token is expired (401), log clearly so it can be refreshed
    if (res.status === 401) {
      console.error("[Sheets] OAuth token expired — GOOGLE_WORKSPACE_CLI_TOKEN needs refresh");
    }

    return { success: false, error: `Sheets API ${res.status}: ${errorBody.slice(0, 200)}` };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Sheets] Log failed:", message);
    return { success: false, error: message };
  }
}
