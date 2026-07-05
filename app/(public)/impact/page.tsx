import { ImpactStats }  from "@/components/home/ImpactStats";
import { BarChart3, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Impact Dashboard",
  description: "See the measurable impact of Community Base Advancement Foundation.",
};

async function getImpactData() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const [totalRaised, recentDonations, topCampaigns] = await Promise.all([
      prisma.campaignDonation.aggregate({ _sum: { amount: true }, where: { status: "SUCCESS" } }),
      prisma.campaignDonation.findMany({
        where:   { status: "SUCCESS" },
        orderBy: { createdAt: "desc" },
        take:    10,
        include: { campaign: { select: { title: true } } },
      }),
      prisma.campaign.findMany({
        orderBy: { raisedAmount: "desc" },
        take:    5,
        select:  { title: true, raisedAmount: true, goalAmount: true, donorCount: true },
      }),
    ]);
    return { totalRaised: totalRaised._sum.amount || 0, recentDonations, topCampaigns };
  } catch {
    return { totalRaised: 0, recentDonations: [], topCampaigns: [] };
  }
}

export default async function ImpactPage() {
  const { totalRaised, recentDonations, topCampaigns } = await getImpactData();

  const formatINR = (n: number) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
    if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  return (
    <div>
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 py-16 px-4 text-center">
        <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-4 border border-blue-500/30">
          Impact Dashboard
        </span>
        <h1 className="font-display text-4xl font-bold text-white mb-3">
          Measuring What Matters
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Transparent, real-time data on every rupee raised and every life changed.
        </p>
      </div>

      <ImpactStats />

      {topCampaigns.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" /> Top Performing Campaigns
            </h2>
            <div className="space-y-3">
              {topCampaigns.map((c, i) => {
                const pct = Math.round((c.raisedAmount / c.goalAmount) * 100);
                return (
                  <div key={c.title} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                    <span className="font-display text-2xl font-black text-gray-200 w-8 flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm truncate mb-1.5">
                        {c.title}
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-gray-900 text-sm">{formatINR(c.raisedAmount)}</div>
                      <div className="text-xs text-gray-400">{c.donorCount} donors · {pct}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {recentDonations.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" /> Recent Donations
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["Donor", "Campaign", "Amount", "Date"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentDonations.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50">
                        <td className="px-5 py-3 text-sm font-medium text-gray-800">
                          {d.isAnonymous ? "Anonymous" : d.donorName}
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-500 max-w-xs truncate">
                          {d.campaign.title}
                        </td>
                        <td className="px-5 py-3 text-sm font-bold text-blue-600">
                          {formatINR(d.amount)}
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-400">
                          {new Date(d.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
