import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VolunteerSchema } from "@/lib/validations/volunteer";
import { sendVolunteerConfirmation } from "@/lib/email";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = VolunteerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.volunteer.findUnique({ where: { email: result.data.email } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered as volunteer" }, { status: 409 });
  }

  // const volunteer = await prisma.volunteer.create({ data: result.data });
  const volunteer = await prisma.volunteer.create({ data: result.data as any });

  sendVolunteerConfirmation({ name: volunteer.name, email: volunteer.email }).catch(console.error);

  return NextResponse.json({ success: true, id: volunteer.id }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page  = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = 20;

  const [volunteers, total] = await Promise.all([
    prisma.volunteer.findMany({ orderBy: { joinedAt: "desc" }, skip: (page - 1) * limit, take: limit }),
    prisma.volunteer.count(),
  ]);

  return NextResponse.json({ volunteers, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
}
