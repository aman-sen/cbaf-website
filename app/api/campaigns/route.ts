import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateSlug } from "@/lib/utils/generateSlug";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category  = searchParams.get("category") || undefined;
  const search    = searchParams.get("search") || undefined;
  const sortBy    = searchParams.get("sortBy") || "newest";
  const featured  = searchParams.get("featured") === "true" ? true : undefined;
  const urgent    = searchParams.get("urgent") === "true" ? true : undefined;
  const trending  = searchParams.get("trending") === "true" ? true : undefined;
  const page      = Math.max(1, Number(searchParams.get("page") || 1));
  const limit     = Math.min(24, Number(searchParams.get("limit") || 9));
  const status    = searchParams.get("status") || "ACTIVE";

  const where: any = {
    status,
    ...(category  && { category }),
    ...(featured  && { isFeatured: true }),
    ...(urgent    && { isUrgent: true }),
    ...(trending  && { isTrending: true }),
    ...(search    && {
      OR: [
        { title:       { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const orderBy: any =
    sortBy === "endingSoon"  ? { endDate:      "asc"  } :
    sortBy === "mostFunded"  ? { raisedAmount: "desc" } :
    sortBy === "mostDonors"  ? { donorCount:   "desc" } :
    /* newest */               { createdAt:    "desc" };

  const [campaigns, total] = await Promise.all([
    prisma.campaign.findMany({
      where, orderBy,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true, title: true, slug: true, description: true,
        category: true, status: true, goalAmount: true, raisedAmount: true,
        donorCount: true, endDate: true, coverImage: true,
        isFeatured: true, isUrgent: true, isTrending: true,
      },
    }),
    prisma.campaign.count({ where }),
  ]);

  return NextResponse.json({
    campaigns,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const slug = generateSlug(body.title);

  const campaign = await prisma.campaign.create({
    data: { ...body, slug, raisedAmount: 0, donorCount: 0 },
  });
  return NextResponse.json(campaign, { status: 201 });
}
