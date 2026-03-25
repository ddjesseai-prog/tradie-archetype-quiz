import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

/**
 * Sends a plain-text email via the connected Gmail account using the MCP CLI.
 * This is a server-side utility — called from tRPC procedures only.
 */
export async function sendGmailEmail({
  to,
  subject,
  content,
}: {
  to: string;
  subject: string;
  content: string;
}): Promise<{ success: boolean; error?: string }> {
  const messages = JSON.stringify([
    {
      to: [to],
      subject,
      content,
    },
  ]);

  const input = JSON.stringify({ messages });

  try {
    const { stdout, stderr } = await execFileAsync(
      "manus-mcp-cli",
      ["tool", "call", "gmail_send_messages", "--server", "gmail", "--input", input],
      { timeout: 30_000 },
    );

    const output = stdout + stderr;

    // MCP CLI returns result saved to a file path — check for success indicators
    if (
      output.includes("result saved") ||
      output.includes("mcp_result") ||
      output.includes("Message sent") ||
      output.includes("draft") ||
      output.includes("id")
    ) {
      return { success: true };
    }

    // If we got output but no error keyword, treat as success
    if (!output.toLowerCase().includes("error") && output.trim().length > 0) {
      return { success: true };
    }

    return { success: false, error: output.slice(0, 200) };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Gmail] Send failed:", message);
    return { success: false, error: message };
  }
}
