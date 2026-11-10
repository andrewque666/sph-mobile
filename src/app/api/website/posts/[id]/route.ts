import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { postSchema } from "@/lib/validations/website";
import { requireAdmin, writeErrorResponse } from "@/lib/website-admin";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/website/posts/[id] — Admin only: update a news post
export async function PATCH(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const parsed = postSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const updated = await db.post.update({ where: { id }, data: { ...parsed.data, publishedAt: parsed.data.publishedAt ?? new Date() } });
    return NextResponse.json(updated);
  } catch (e) {
    return writeErrorResponse(e);
  }
}

// DELETE /api/website/posts/[id] — Admin only: delete a news post
export async function DELETE(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  try {
    await db.post.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    return writeErrorResponse(e);
  }
}
