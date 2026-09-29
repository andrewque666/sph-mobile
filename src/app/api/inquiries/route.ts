import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { inquirySchema } from "@/lib/validations/website";

// POST /api/inquiries — Public: contact message or appointment request from the website
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  // Honeypot: the hidden "website" field is only ever filled in by bots.
  if (body?.website) {
    return NextResponse.json({ message: "Thank you — we received your message." }, { status: 201 });
  }

  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  await db.inquiry.create({ data: parsed.data });

  return NextResponse.json({ message: "Thank you — we received your message." }, { status: 201 });
}
