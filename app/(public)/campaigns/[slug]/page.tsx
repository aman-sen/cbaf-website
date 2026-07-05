import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DonationWidget } from "@/components/donation/DonationWidget";
import { ProgressBar } from "@/components/campaigns/ProgressBar";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { Share2, Clock, Users, Calendar } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const campaign = await prisma.campaign.findUnique({
    where: { slug: params.slug },
  });
  if (!campaign) return {};
  return {
    title:       campaign.title,
    description: campaign.description,
    openGraph: {
      title:       campaign.title,
      description: campaign.description,
      images:      campaign.coverImage ? [campaign.coverImage] : [],
    },
  };
}

export default async function CampaignDetailPage({ params }: Props) {
  const campaign = await prisma.campaign.findUnique({
    where:   { slug: params.slug },
    include: { updates: { orderBy: { createdAt: "desc" } } },
  });
  if (!campaign) notFound();

  const related = await prisma.campaign.findMany({
    where: {
      category: campaign.category,
      status:   "ACTIVE",
      NOT:      { id: campaign.id },
    },
    take: 3,
  });

  const percentage = Math.round((campaign.raisedAmount / campaign.goalAmount) * 100);
  const daysLeft = campaign.endDate
    ? Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / 86400000))
    : null;

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style:                 "currency",
      currency:              "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://communityfoundation.in";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          {" / "}
          <Link href="/campaigns" className="hover:text-blue-600">Campaigns</Link>
          {" / "}
          <span className="text-gray-800 font-medium">{campaign.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
              {campaign.coverImage && (
                <Image
                  src={campaign.coverImage}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              )}
              {campaign.isUrgent && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  🚨 URGENT
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {campaign.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  {campaign.donorCount.toLocaleString("en-IN")} donors
                </span>
                {daysLeft !== null && (
                  <span className={`flex items-center gap-1.5 ${daysLeft <= 5 ? "text-red-500 font-semibold" : ""}`}>
                    <Clock className="w-4 h-4" />
                    {daysLeft === 0 ? "Ends today!" : `${daysLeft} days remaining`}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Started{" "}
                  {new Date(campaign.startDate).toLocaleDateString("en-IN", {
                    month: "short",
                    year:  "numeric",
                  })}
                </span>
              </div>
              <ProgressBar raised={campaign.raisedAmount} goal={campaign.goalAmount} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Campaign Story</h2>
              <div
                className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: campaign.story }}
              />
            </div>

            {campaign.updates.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-5">
                  Updates ({campaign.updates.length})
                </h2>
                <div className="space-y-5">
                  {campaign.updates.map((update) => (
                    <div key={update.id} className="border-l-2 border-blue-200 pl-4">
                      <div className="text-xs text-gray-400 mb-1">
                        {new Date(update.createdAt).toLocaleDateString("en-IN", {
                          day:   "numeric",
                          month: "long",
                          year:  "numeric",
                        })}
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{update.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{update.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4">
              <Share2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700 mb-2">Share this campaign</p>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: "WhatsApp", color: "bg-blue-500", href: `https://wa.me/?text=${encodeURIComponent(`Support: ${siteUrl}/campaigns/${campaign.slug}`)}` },
                    { label: "Twitter",  color: "bg-blue-400",  href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(campaign.title)}&url=${siteUrl}/campaigns/${campaign.slug}` },
                    { label: "Facebook", color: "bg-blue-600",  href: `https://www.facebook.com/sharer/sharer.php?u=${siteUrl}/campaigns/${campaign.slug}` },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${s.color} text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-900 text-xl">{formatINR(campaign.raisedAmount)}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${percentage >= 100 ? "bg-blue-100 text-blue-700" : "bg-blue-100 text-blue-700"}`}>
                    {percentage}% funded
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-3">
                  raised of {formatINR(campaign.goalAmount)} goal
                </div>
                <ProgressBar raised={campaign.raisedAmount} goal={campaign.goalAmount} showLabels={false} />
              </div>
              <DonationWidget campaignId={campaign.id} campaignTitle={campaign.title} />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Related Campaigns</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((c, i) => (
                <CampaignCard key={c.id} {...c} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
