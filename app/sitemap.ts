import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://communityfoundation.in";

  const  projects = await Promise.all([
    // prisma.campaign.findMany({ select: { slug: true, updatedAt: true }, where: { status: "ACTIVE" } }),
    prisma.project.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes = [
    { url: "/", priority: 1.0, freq: "daily" },
    { url: "/about", priority: 0.9, freq: "monthly" },
    { url: "/vision-mission", priority: 0.8, freq: "monthly" },
    // { url: "/campaigns", priority: 0.9, freq: "daily" },
    { url: "/projects", priority: 0.8, freq: "weekly" },
    // { url: "/fund-predictor", priority: 0.7, freq: "monthly" },
    { url: "/impact", priority: 0.8, freq: "weekly" },
    { url: "/volunteer", priority: 0.8, freq: "monthly" },
    { url: "/donate", priority: 1.0, freq: "daily" },
    { url: "/contact", priority: 0.7, freq: "monthly" },
    { url: "/news", priority: 0.7, freq: "weekly" },
    { url: "/gallery", priority: 0.6, freq: "monthly" },
    { url: "/privacy-policy", priority: 0.3, freq: "yearly" },
    { url: "/terms-and-conditions", priority: 0.3, freq: "yearly" },
    { url: "/refund-policy", priority: 0.3, freq: "yearly" },
  ];

  return [
    ...staticRoutes.map(({ url, priority, freq }) => ({
      url: `${baseUrl}${url}`,
      changeFrequency: freq as any,
      priority,
    })),
    // ...campaigns.map((c) => ({
    //   url: `${baseUrl}/campaigns/${c.slug}`,
    //   lastModified: c.updatedAt,
    //   changeFrequency: "daily" as const,
    //   priority: 0.9,
    // })),
    ...projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
