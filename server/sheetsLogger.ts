import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const SHEET_ID = "1ochv-YGKaxYAqAUgXbl-4qjyezPY6V6YYhNVoAeAGPQ";
const SHEET_NAME = "Leads";

/**
 * Appends a lead row to the Tradie Quiz Google Sheet.
 * Columns: Timestamp | First Name | Email | Primary Archetype | Secondary Archetype | Submission ID | Playbook Link
 */
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

  const params = JSON.stringify({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:G`,
    valueInputOption: "RAW",
  });

  const body = JSON.stringify({
    values: [row],
  });

  try {
    const { stdout, stderr } = await execFileAsync(
      "gws",
      [
        "sheets",
        "spreadsheets",
        "values",
        "append",
        "--params",
        params,
        "--json",
        body,
      ],
      { timeout: 15_000 },
    );

    const output = stdout + stderr;

    if (
      output.includes("updatedRows") ||
      output.includes("updatedCells") ||
      output.includes("tableRange")
    ) {
      return { success: true };
    }

    if (!output.toLowerCase().includes("error") && output.trim().length > 0) {
      return { success: true };
    }

    return { success: false, error: output.slice(0, 200) };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Sheets] Log failed:", message);
    return { success: false, error: message };
  }
}
