import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("application_submissions")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) throw error;

    // Map database columns to camelCase for the frontend
    const formatted = data.map((sub: any) => ({
      id: sub.id,
      templateId: sub.template_id,
      fullName: sub.full_name,
      age: sub.age,
      city: sub.city,
      country: sub.country,
      discord: sub.discord,
      email: sub.email,
      skills: sub.skills,
      hoursPerDay: sub.hours_per_day,
      contact: sub.contact,
      about: sub.about,
      roleData: sub.role_data,
      status: sub.status,
      submittedAt: sub.submitted_at,
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
