/**
 * Tradie Leads CRM View
 * 
 * Read-only view of Tradie Quiz leads from tradie.db
 * Route: /tradie-leads
 */

import { useEffect, useState } from "react";

interface TradieLead {
  id: number;
  email: string;
  first_name: string | null;
  archetype_name: string;
  qual_stage: string;
  sequence_status: string;
  updated_at: string;
  created_at: string;
}

export default function TradieLeads() {
  const [leads, setLeads] = useState<TradieLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/tradie-leads")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch leads");
        return res.json();
      })
      .then(data => {
        setLeads(data.leads);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-400 text-sm">Error: {error}</p>
          <a href="/" className="text-orange-500 hover:text-orange-400 text-sm">← Back to site</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm">← Back to site</a>
            <span className="text-zinc-700">|</span>
            <h1 className="text-white font-semibold text-sm">Tradie Leads CRM</h1>
          </div>
          <span className="text-xs text-zinc-500">{leads.length} leads</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {leads.length === 0 ? (
          <div className="p-12 text-center text-zinc-600 text-sm">
            No leads yet. Submit the quiz to create a lead.
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Archetype</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Qual Stage</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Sequence</th>
                    <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Last Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 text-zinc-200 font-medium">
                        {lead.first_name ?? <span className="text-zinc-600 italic">—</span>}
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{lead.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          {lead.archetype_name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          lead.qual_stage === "new" ? "bg-blue-500/10 text-blue-400" :
                          lead.qual_stage === "qualified" ? "bg-emerald-500/10 text-emerald-400" :
                          lead.qual_stage === "warm" ? "bg-yellow-500/10 text-yellow-400" :
                          "bg-zinc-500/10 text-zinc-400"
                        }`}>
                          {lead.qual_stage}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          lead.sequence_status === "active" ? "bg-emerald-500/10 text-emerald-400" :
                          lead.sequence_status === "exhausted" ? "bg-zinc-500/10 text-zinc-400" :
                          "bg-blue-500/10 text-blue-400"
                        }`}>
                          {lead.sequence_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-500 text-xs">
                        {new Date(lead.updated_at).toLocaleString("en-AU", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}