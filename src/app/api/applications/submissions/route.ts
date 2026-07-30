import { NextResponse } from "next/server";
import { db } from "@/db";
import { applicationSubmissions } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db
    .select()
    .from(applicationSubmissions)
    .orderBy(desc(applicationSubmissions.submittedAt));

  return NextResponse.json(rows);
}
