import { prisma } from "@/lib/prisma";

export default async function AdminDonationsPage() {
  const donations = await prisma.campaignDonation.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { campaign: { select: { title: true } } },
  });

  const totalRaised = donations.filter(d => d.status === "SUCCESS").reduce((s, d) => s + d.amount, 0);

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const STATUS_STYLES: Record<string, string> = {
    SUCCESS: "bg-blue-100 text-blue-700",
    PENDING: "bg-amber-100 text-amber-700",
    FAILED:  "bg-red-100 text-red-700",
    REFUNDED:"bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Donations</h1>
          <p className="text-gray-400 text-sm">Total raised: <span className="text-blue-600 font-bold">{formatINR(totalRaised)}</span></p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Raised",  value: formatINR(totalRaised), color: "text-blue-600" },
          { label: "Successful",    value: String(donations.filter(d => d.status === "SUCCESS").length), color: "text-blue-600" },
          { label: "Pending",       value: String(donations.filter(d => d.status === "PENDING").length), color: "text-amber-600" },
          { label: "Failed",        value: String(donations.filter(d => d.status === "FAILED").length),  color: "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="text-xs text-gray-400 mb-1">{s.label}</div>
            <div className={`font-display text-xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Donor","Email","Campaign","Amount","Method","Status","Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {donations.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{d.isAnonymous ? "Anonymous" : d.donorName}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{d.donorEmail}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-xs truncate">{d.campaign.title}</td>
                  <td className="px-4 py-3 text-sm font-bold text-blue-600">{formatINR(d.amount)}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{d.paymentMethod}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLES[d.status] || "bg-gray-100"}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {new Date(d.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
