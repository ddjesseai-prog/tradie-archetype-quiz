import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { ARCHETYPES } from "../../../shared/archetypes";

// ─── Archetype label helper ───────────────────────────────────────────────────
function archetypeLabel(id: string): string {
  const a = ARCHETYPES[id as keyof typeof ARCHETYPES];
  return a ? a.name : id;
}

// ─── CSV export ───────────────────────────────────────────────────────────────
function exportCSV(leads: Lead[]) {
  const headers = ["ID", "First Name", "Email", "Archetype", "Email Sent", "Date"];
  const rows = leads.map((l) => [
    l.id,
    l.firstName ?? "",
    l.email,
    archetypeLabel(l.archetypeId),
    l.emailSent,
    new Date(l.createdAt).toLocaleString("en-AU"),
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `tradie-quiz-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

type Lead = {
  id: number;
  email: string;
  firstName: string | null;
  archetypeId: string;
  emailSent: "pending" | "sent" | "failed";
  createdAt: Date;
  submissionId: number;
};

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-1">
      <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">{label}</span>
      <span className="text-3xl font-bold text-white">{value}</span>
      {sub && <span className="text-xs text-zinc-500">{sub}</span>}
    </div>
  );
}

// ─── Main admin page ──────────────────────────────────────────────────────────
export default function Admin() {
  const { user, loading } = useAuth();

  const { data: leads, isLoading: leadsLoading } = trpc.admin.getLeads.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });

  const { data: stats, isLoading: statsLoading } = trpc.admin.getStats.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-zinc-400 text-sm">You need to sign in to access this page.</p>
          <a
            href={getLoginUrl()}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  // ── Not admin ──────────────────────────────────────────────────────────────
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-zinc-400 text-sm">Access denied. This page is restricted to the site owner.</p>
        </div>
      </div>
    );
  }

  // ── Top archetype ──────────────────────────────────────────────────────────
  const topArchetype = stats?.archetypeBreakdown
    ? Object.entries(stats.archetypeBreakdown).sort((a, b) => b[1] - a[1])[0]
    : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">← Back to site</a>
            <span className="text-zinc-700">|</span>
            <h1 className="text-white font-semibold text-sm">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500">{user.email ?? user.name}</span>
            {leads && leads.length > 0 && (
              <button
                onClick={() => exportCSV(leads as Lead[])}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Export CSV
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats row */}
        {statsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 h-24 animate-pulse" />
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Completions" value={stats.totalSubmissions} sub="quiz submissions" />
            <StatCard label="Email Captures" value={stats.totalCaptures} sub="leads collected" />
            <StatCard label="Conversion Rate" value={`${stats.conversionRate}%`} sub="quiz → email" />
            <StatCard
              label="Top Archetype"
              value={topArchetype ? archetypeLabel(topArchetype[0]) : "—"}
              sub={topArchetype ? `${topArchetype[1]} leads` : "no data yet"}
            />
          </div>
        ) : null}

        {/* Archetype breakdown */}
        {stats?.archetypeBreakdown && Object.keys(stats.archetypeBreakdown).length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">Archetype Distribution</h2>
            <div className="space-y-3">
              {Object.entries(stats.archetypeBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([id, count]) => {
                  const pct = stats.totalCaptures > 0 ? Math.round((count / stats.totalCaptures) * 100) : 0;
                  return (
                    <div key={id} className="flex items-center gap-3">
                      <span className="text-sm text-zinc-300 w-28 shrink-0">{archetypeLabel(id)}</span>
                      <div className="flex-1 bg-zinc-800 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-zinc-500 w-16 text-right">{count} ({pct}%)</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Leads table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
              All Leads {leads ? `(${leads.length})` : ""}
            </h2>
          </div>

          {leadsLoading ? (
            <div className="p-8 flex justify-center">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !leads || leads.length === 0 ? (
            <div className="p-12 text-center text-zinc-600 text-sm">No leads yet. Share the quiz to start collecting.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Archetype</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {(leads as Lead[]).map((lead) => (
                    <tr key={lead.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 text-zinc-200 font-medium">
                        {lead.firstName ?? <span className="text-zinc-600 italic">—</span>}
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{lead.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          {archetypeLabel(lead.archetypeId)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {lead.emailSent === "sent" ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                            Sent
                          </span>
                        ) : lead.emailSent === "failed" ? (
                          <span className="inline-flex items-center gap-1 text-xs text-red-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                            Failed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 inline-block" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-zinc-500 text-xs">
                        {new Date(lead.createdAt).toLocaleString("en-AU", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
