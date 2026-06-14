import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNewsletterConfirmation } from "@/lib/email";
import { z } from "zod";

const SubscribeSchema = z.object({
  email:  z.string().email(),
  name:   z.string().optional(),
  source: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body   = await req.json();
  const result = SubscribeSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  const existing = await prisma.subscriber.findUnique({ where: { email: result.data.email } });
  if (existing) {
    if (existing.status === "UNSUBSCRIBED") {
      await prisma.subscriber.update({ where: { email: result.data.email }, data: { status: "ACTIVE" } });
      return NextResponse.json({ success: true, reactivated: true });
    }
    return NextResponse.json({ success: true, already: true });
  }

  // await prisma.subscriber.create({ data: result.data });
  await prisma.subscriber.create({ data: result.data as any });
  sendNewsletterConfirmation(result.data.email).catch(console.error);

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page  = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = 50;
  const [subscribers, total] = await Promise.all([
    prisma.subscriber.findMany({ where: { status: "ACTIVE" }, orderBy: { subscribedAt: "desc" }, skip: (page - 1) * limit, take: limit }),
    prisma.subscriber.count({ where: { status: "ACTIVE" } }),
  ]);
  return NextResponse.json({ subscribers, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
}
