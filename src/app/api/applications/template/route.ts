import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch the live application template
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("application_templates")
      .select("*")
      .limit(1)
      .single();

    if (error) throw error;

    // Return the template mapped to the frontend expectations
    return NextResponse.json({
      id: data.id,
      title: data.title,
      fields: data.fields,
      isOpen: data.is_open,
      closedMessage: data.closed_message,
    });
  } catch (error: any) {
    console.error("Error fetching template:", error);
    return NextResponse.json({ error: "Failed to load template" }, { status: 500 });
  }
}

// PUT: Update the template (Admin only)
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("application_templates")
      .update({
        title: body.title,
        fields: body.fields,
        is_open: body.isOpen,
        closed_message: body.closedMessage,
      })
      .eq("id", body.id)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({
      id: data.id,
      title: data.title,
      fields: data.fields,
      isOpen: data.is_open,
      closedMessage: data.closed_message,
    });
  } catch (error: any) {
    console.error("Error saving template:", error);
    return NextResponse.json({ error: "Failed to save template" }, { status: 500 });
  }
}
