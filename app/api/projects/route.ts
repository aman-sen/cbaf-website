import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateSlug } from "@/lib/utils/generateSlug";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const slug = generateSlug(body.title);
  const project = await prisma.project.create({ data: { ...body, slug } });
  return NextResponse.json(project, { status: 201 });
}
