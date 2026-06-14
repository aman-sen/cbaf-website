import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactConfirmation } from "@/lib/email";
import { z } from "zod";

const ContactSchema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  phone:   z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(20),
});

export async function POST(req: NextRequest) {
  const body   = await req.json();
  const result = ContactSchema.safeParse(body);
  if (!result.success) return NextResponse.json({ error: result.error.flatten() }, { status: 400 });

  // const msg = await prisma.contactMessage.create({ data: result.data });
  const msg = await prisma.contactMessage.create({
  data: result.data as {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  },
});
  sendContactConfirmation(result.data.name, result.data.email).catch(console.error);

  return NextResponse.json({ success: true, id: msg.id }, { status: 201 });
}

export async function GET() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json({ messages });
}
