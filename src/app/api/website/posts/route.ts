import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { postSchema } from "@/lib/validations/website";
import { requireAdmin, writeErrorResponse } from "@/lib/website-admin";

// POST /api/website/posts — Admin only: create a news post
export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = postSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const created = await db.post.create({ data: { ...parsed.data, publishedAt: parsed.data.publishedAt ?? new Date() } });
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    return writeErrorResponse(e);
  }
}
