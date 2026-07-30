import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { applicationSubmissions, applicationTemplates } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Check if applications are open
  const templates = await db.select().from(applicationTemplates).limit(1);
  if (!templates.length || !templates[0].isOpen) {
    return NextResponse.json({ error: "Applications are currently closed." }, { status: 403 });
  }

  const {
    fullName, age, city, country, discord, email,
    skills, hoursPerDay, contact, about, roleData
  } = body;

  if (!fullName || !age || !city || !country || !discord || !email || !about) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const submission = await db
    .insert(applicationSubmissions)
    .values({
      templateId: templates[0].id,
      fullName,
      age: parseInt(age),
      city,
      country,
      discord,
      email,
      skills: skills || [],
      hoursPerDay,
      contact: contact || null,
      about,
      roleData: roleData || {},
      status: "Pending",
    })
    .returning();

  return NextResponse.json({ ok: true, id: submission[0].id });
}
