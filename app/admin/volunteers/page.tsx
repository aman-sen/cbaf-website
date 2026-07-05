import { prisma } from "@/lib/prisma";

const STATUS_STYLES: Record<string, string> = {
  PENDING:  "bg-amber-100 text-amber-700",
  APPROVED: "bg-blue-100 text-blue-700",
  ACTIVE:   "bg-blue-100 text-blue-700",
  INACTIVE: "bg-gray-100 text-gray-500",
};

export default async function AdminVolunteersPage() {
  const volunteers = await prisma.volunteer.findMany({ orderBy: { joinedAt: "desc" } });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900">Volunteers</h1>
        <p className="text-gray-400 text-sm">{volunteers.length} registered volunteers</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Name","Email","Phone","City","Availability","Skills","Status","Joined"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {volunteers.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{v.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{v.email}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{v.phone}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{v.city}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{v.availability}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {v.skills.slice(0, 2).map((s) => (
                        <span key={s} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs">{s}</span>
                      ))}
                      {v.skills.length > 2 && <span className="text-gray-400 text-xs">+{v.skills.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLES[v.status] || "bg-gray-100"}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {new Date(v.joinedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
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
