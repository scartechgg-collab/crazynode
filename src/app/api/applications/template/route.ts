import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { applicationTemplates } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  let rows = await db.select().from(applicationTemplates).limit(1);
  if (!rows.length) {
    // Insert default
    await db.insert(applicationTemplates).values({
      title: "Staff Application",
      fields: [],
      isOpen: false,
      closedMessage: "There are no applications open at CrazyNode right now. Check back later!",
    });
    rows = await db.select().from(applicationTemplates).limit(1);
  }
  return NextResponse.json(rows[0]);
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, fields, isOpen, closedMessage } = body;

  const rows = await db.select().from(applicationTemplates).limit(1);
  if (!rows.length) {
    await db.insert(applicationTemplates).values({
      title: title ?? "Staff Application",
      fields: fields ?? [],
      isOpen: isOpen ?? false,
      closedMessage: closedMessage ?? "There are no applications open at CrazyNode right now. Check back later!",
    });
  } else {
    await db
      .update(applicationTemplates)
      .set({
        ...(title !== undefined && { title }),
        ...(fields !== undefined && { fields }),
        ...(isOpen !== undefined && { isOpen }),
        ...(closedMessage !== undefined && { closedMessage }),
        updatedAt: new Date(),
      });
  }

  const updated = await db.select().from(applicationTemplates).limit(1);
  return NextResponse.json(updated[0]);
}
