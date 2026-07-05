import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Calendar, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!project) notFound();

  const metrics  = project.impactMetrics as Record<string, any> | null;
  const progress = project.budget ? Math.round((project.spent / project.budget) * 100) : 0;

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style:                 "currency",
      currency:              "INR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="max-w-5xl mx-auto text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>{" / "}
          <Link href="/projects" className="hover:text-blue-600">Projects</Link>{" / "}
          <span className="text-gray-800">{project.title}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 mb-6">
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {project.category}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-4">
                {project.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t border-gray-100 text-sm text-gray-500">
                {project.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {project.location}
                  </span>
                )}
                {project.beneficiaries && (
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-500" />
                    {project.beneficiaries.toLocaleString("en-IN")} beneficiaries
                  </span>
                )}
                {project.startDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    Started{" "}
                    {new Date(project.startDate).toLocaleDateString("en-IN", {
                      month: "long",
                      year:  "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>

            {metrics && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" /> Impact Metrics
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Object.entries(metrics).map(([key, val]) => (
                    <div
                      key={key}
                      className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-100"
                    >
                      <div className="font-display text-2xl font-bold text-blue-700">
                        {String(val)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Project Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-blue-700">{project.status}</span>
                </div>
                {project.budget && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Budget</span>
                      <span className="font-medium">{formatINR(project.budget)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Spent</span>
                      <span className="font-medium">{formatINR(project.spent)}</span>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <Link
              href="/donate"
              className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-center text-sm transition-colors"
            >
              ❤ Support This Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
