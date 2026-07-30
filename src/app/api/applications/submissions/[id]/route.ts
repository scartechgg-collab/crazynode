import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// PATCH: Update submission status
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { status } = body;

    const { error } = await supabase
      .from("application_submissions")
      .update({ status })
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating submission:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

// DELETE: Remove a submission
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase
      .from("application_submissions")
      .delete()
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting submission:", error);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
