import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page  = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(50, Number(searchParams.get("limit") || 20));

  const [donations, total] = await Promise.all([
    prisma.campaignDonation.findMany({
      where: { status: "SUCCESS" },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { campaign: { select: { title: true, slug: true } } },
    }),
    prisma.campaignDonation.count({ where: { status: "SUCCESS" } }),
  ]);

  return NextResponse.json({ donations, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
}
