import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { applicationSubmissions } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json();

  await db
    .update(applicationSubmissions)
    .set({ status })
    .where(eq(applicationSubmissions.id, parseInt(id)));

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  await db
    .delete(applicationSubmissions)
    .where(eq(applicationSubmissions.id, parseInt(id)));

  return NextResponse.json({ ok: true });
}
