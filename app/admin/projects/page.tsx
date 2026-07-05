import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-400 text-sm">{projects.length} total projects</p>
        </div>
        <Link href="/admin/projects/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((p) => {
          const progress = p.budget ? Math.round((p.spent / p.budget) * 100) : 0;
          return (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{p.category}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === "ONGOING" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                  {p.status}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">{p.title}</h3>
              {p.beneficiaries && (
                <p className="text-xs text-gray-400 mb-3">{p.beneficiaries.toLocaleString("en-IN")} beneficiaries</p>
              )}
              {p.budget && (
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Budget used</span><span>{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }} />
                  </div>
                </div>
              )}
              <Link href={`/projects/${p.slug}`} target="_blank"
                className="block text-center text-xs text-blue-600 font-medium mt-3 hover:underline">
                View Project →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
