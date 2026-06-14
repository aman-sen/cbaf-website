import type { Metadata } from "next";
import Image from "next/image";
import Link  from "next/link";
import { MapPin, Users } from "lucide-react";

export const metadata: Metadata = {
  title:       "Projects",
  description: "Explore all active and completed projects by Community Base Advancement Foundation.",
};

const STATUS_STYLES: Record<string, string> = {
  UPCOMING:  "bg-gray-100 text-gray-600",
  ONGOING:   "bg-green-100 text-green-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  ON_HOLD:   "bg-amber-100 text-amber-700",
};

async function getProjects() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.project.findMany({
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 py-16 px-4 text-center">
        <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-4 border border-blue-500/30">
          Our Projects
        </span>
        <h1 className="font-display text-4xl font-bold text-white mb-3">
          Initiatives on the Ground
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          From education to environment, our projects span diverse areas and deliver measurable impact.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {projects.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="text-5xl mb-4">🏗️</div>
            <h3 className="font-display text-xl font-bold text-gray-700 mb-2">Projects Coming Soon</h3>
            <p className="text-gray-400 text-sm">
              Connect your database and seed it to see projects here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const progress = project.budget
                ? Math.round((project.spent / project.budget) * 100)
                : 0;
              const metrics = project.impactMetrics as Record<string, any> | null;
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-44 bg-gradient-to-br from-green-50 to-blue-50">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30">
                        🏗️
                      </div>
                    )}
                    <span
                      className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[project.status] || "bg-gray-100"}`}
                    >
                      {project.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-display font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                      {project.description}
                    </p>

                    {project.location && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                        <MapPin className="w-3.5 h-3.5" /> {project.location}
                      </div>
                    )}
                    {project.beneficiaries && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                        <Users className="w-3.5 h-3.5 text-green-500" />
                        {project.beneficiaries.toLocaleString("en-IN")} beneficiaries
                      </div>
                    )}

                    {project.budget && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Budget utilised</span>
                          <span className="font-semibold text-gray-700">{progress}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {metrics && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {Object.entries(metrics)
                          .slice(0, 2)
                          .map(([key, val]) => (
                            <div key={key} className="bg-gray-50 rounded-lg p-2 text-center">
                              <div className="font-display font-bold text-green-600 text-sm">
                                {String(val)}
                              </div>
                              <div className="text-xs text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    <Link
                      href={`/projects/${project.slug}`}
                      className="block text-center border border-green-600 text-green-700 hover:bg-green-600 hover:text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
                    >
                      View Project →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
