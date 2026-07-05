import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  ACTIVE:    "bg-blue-100 text-blue-700",
  DRAFT:     "bg-gray-100 text-gray-600",
  COMPLETED: "bg-blue-100 text-blue-700",
  PAUSED:    "bg-amber-100 text-amber-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function AdminCampaignsPage() {
  const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: "desc" } });

  const formatINR = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-400 text-sm">{campaigns.length} total campaigns</p>
        </div>
        <Link href="/admin/campaigns/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
          <Plus className="w-4 h-4" /> New Campaign
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Title","Category","Goal","Raised","Donors","Status","Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {campaigns.map((c) => {
                const pct = Math.round((c.raisedAmount / c.goalAmount) * 100);
                return (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800 text-sm max-w-xs truncate">{c.title}</div>
                      <div className="text-xs text-gray-400">{c.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.category.replace("_"," ")}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{formatINR(c.goalAmount)}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-semibold text-blue-600">{formatINR(c.raisedAmount)}</div>
                      <div className="text-xs text-gray-400">{pct}% funded</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{c.donorCount}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLES[c.status] || "bg-gray-100"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/campaigns/${c.slug}`} target="_blank"
                          className="text-gray-400 hover:text-blue-600 transition-colors" title="View">
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
