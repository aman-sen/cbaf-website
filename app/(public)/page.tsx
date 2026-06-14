import { HeroSection }   from "@/components/home/HeroSection";
import { AboutSection }  from "@/components/home/AboutSection";
import { CorePillars }   from "@/components/home/CorePillars";
import { ImpactStats }   from "@/components/home/ImpactStats";
import { Testimonials }  from "@/components/home/Testimonials";
import { Newsletter }    from "@/components/home/Newsletter";
import { CampaignCard }  from "@/components/campaigns/CampaignCard";
import Link              from "next/link";
import { ArrowRight }    from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Community Base Advancement Foundation — Building Stronger Communities",
  description: "An NGO dedicated to women empowerment, rural education, environmental action, and emergency relief across India.",
};

async function getCampaigns() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.campaign.findMany({
      where:   { status: "ACTIVE" },
      orderBy: [{ isFeatured: "desc" }, { isUrgent: "desc" }, { createdAt: "desc" }],
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const campaigns = await getCampaigns();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CorePillars />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-3">
                Active Campaigns
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">Fund a Cause Today</h2>
            </div>
            <Link href="/campaigns"
              className="hidden sm:flex items-center gap-1.5 text-blue-600 font-semibold text-sm border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {campaigns.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <div className="text-5xl mb-4">🌱</div>
              <p className="text-gray-600 font-semibold">No campaigns yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Run <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">npm run db:seed</code> to populate campaigns.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {campaigns.map((c, i) => (
                <CampaignCard key={c.id} {...c} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ImpactStats />
      <Testimonials />
      <Newsletter />
    </>
  );
}
