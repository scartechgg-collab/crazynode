import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Destructure the payload sent from the frontend
    const { fullName, age, city, country, discord, email, skills, hoursPerDay, contact, about, roleData, templateId } = body;

    const { data, error } = await supabase
      .from("application_submissions")
      .insert({
        template_id: templateId || 1, // Fallback to 1 if not provided
        full_name: fullName,
        age: Number(age),
        city,
        country,
        discord,
        email,
        skills, // array of strings
        hours_per_day: hoursPerDay,
        contact: contact || null,
        about,
        role_data: roleData, // JSON object
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, id: data.id });
  } catch (error: any) {
    console.error("Error submitting application:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
