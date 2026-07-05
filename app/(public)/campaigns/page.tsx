"use client";
import { useState, useEffect, useCallback } from "react";
import { CampaignCard }    from "@/components/campaigns/CampaignCard";
import { CampaignFilters } from "@/components/campaigns/CampaignFilters";
import { Loader2 }         from "lucide-react";

export default function CampaignsPage() {
  const [campaigns,  setCampaigns]  = useState<any[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [search,     setSearch]     = useState("");
  const [category,   setCategory]   = useState("");
  const [sortBy,     setSortBy]     = useState("newest");
  const [filter,     setFilter]     = useState("all");
  const [page,       setPage]       = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        ...(search   && { search }),
        ...(category && { category }),
        sortBy,
        ...(filter === "urgent"   && { urgent:   "true" }),
        ...(filter === "featured" && { featured: "true" }),
        ...(filter === "trending" && { trending: "true" }),
        page:  String(page),
        limit: "9",
      });
      const res  = await fetch(`/api/campaigns?${params}`);
      const data = await res.json();
      setCampaigns(data.campaigns    || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch {
      setError("Could not load campaigns. Please check your database connection.");
    } finally {
      setLoading(false);
    }
  }, [search, category, sortBy, filter, page]);

  useEffect(() => { fetchCampaigns(); }, [fetchCampaigns]);

  return (
    <div>
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 py-14 px-4 text-center">
        <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-4 border border-blue-500/30">
          All Campaigns
        </span>
        <h1 className="font-display text-4xl font-bold text-white mb-3">
          Fund a Cause That Matters
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Browse active fundraising campaigns across education, women empowerment, healthcare, environment, and more.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <CampaignFilters
          onSearch={(q)  => { setSearch(q);   setPage(1); }}
          onCategory={(c)=> { setCategory(c); setPage(1); }}
          onSort={(s)    => { setSortBy(s);   setPage(1); }}
          onFilter={(f)  => { setFilter(f);   setPage(1); }}
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-gray-600 font-medium">{error}</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium">No campaigns found</p>
            <p className="text-sm mt-2">Try different filters or search terms.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {campaigns.map((c, i) => (
                <CampaignCard key={c.id} {...c} index={i} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium ${
                      p === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
