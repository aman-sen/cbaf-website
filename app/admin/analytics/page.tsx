import { prisma } from "@/lib/prisma";
import { AdminDonationsChart } from "@/components/admin/AdminDonationsChart";

export default async function AdminAnalyticsPage() {
  const [
    totalRaised,
    donationCount,
    uniqueDonors,
    avgDonation,
    categoryBreakdown,
  ] = await Promise.all([
    prisma.campaignDonation.aggregate({ _sum: { amount: true }, where: { status: "SUCCESS" } }),
    prisma.campaignDonation.count({ where: { status: "SUCCESS" } }),
    prisma.campaignDonation.groupBy({ by: ["donorEmail"], where: { status: "SUCCESS" }, _count: true }),
    prisma.campaignDonation.aggregate({ _avg: { amount: true }, where: { status: "SUCCESS" } }),
    prisma.campaign.groupBy({
      by: ["category"],
      _sum: { raisedAmount: true },
      _count: true,
      orderBy: { _sum: { raisedAmount: "desc" } },
    }),
  ]);

  const formatINR = (n: number) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${Math.round(n).toLocaleString("en-IN")}`;
  };

  const total = totalRaised._sum.amount || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-400 text-sm">Fundraising performance overview</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Raised",    value: formatINR(total),                           sub: "All time" },
          { label: "Total Donations", value: donationCount.toLocaleString("en-IN"),      sub: "Successful transactions" },
          { label: "Unique Donors",   value: uniqueDonors.length.toLocaleString("en-IN"), sub: "Individual donors" },
          { label: "Avg Donation",    value: formatINR(avgDonation._avg.amount || 0),    sub: "Per transaction" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400 mb-1">{kpi.label}</div>
            <div className="font-display text-2xl font-bold text-gray-900">{kpi.value}</div>
            <div className="text-xs text-gray-400 mt-1">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Donation Trend Chart */}
      <AdminDonationsChart />

      {/* Category Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-5">Donations by Category</h3>
        <div className="space-y-3">
          {categoryBreakdown.map((c) => {
            const raised = c._sum.raisedAmount || 0;
            const pct = total > 0 ? Math.round((raised / total) * 100) : 0;
            return (
              <div key={c.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{String(c.category).replace("_", " ")}</span>
                  <span className="text-gray-500">{formatINR(raised)} ({pct}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
