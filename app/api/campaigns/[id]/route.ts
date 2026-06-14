import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Props { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Props) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: params.id },
    include: { updates: { orderBy: { createdAt: "desc" } } },
  });
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(campaign);
}

export async function PUT(req: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const campaign = await prisma.campaign.update({ where: { id: params.id }, data: body });
  return NextResponse.json(campaign);
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.campaign.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
