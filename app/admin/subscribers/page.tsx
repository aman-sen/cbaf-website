import { prisma } from "@/lib/prisma";

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({ orderBy: { subscribedAt: "desc" } });
  const active = subscribers.filter((s) => s.status === "ACTIVE").length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
        <p className="text-gray-400 text-sm">{active} active subscribers</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total",       value: subscribers.length },
          { label: "Active",      value: active },
          { label: "Unsubscribed",value: subscribers.filter(s => s.status === "UNSUBSCRIBED").length },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="text-xs text-gray-400 mb-1">{s.label}</div>
            <div className="font-display text-2xl font-bold text-gray-800">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Email","Name","Source","Status","Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{s.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{s.name || "—"}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{s.source || "direct"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {new Date(s.subscribedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
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
