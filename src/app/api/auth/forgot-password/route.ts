import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return Response.json({ error: "Email required" }, { status: 400 });

    const origin = new URL(req.url).origin;
    const { error } = await supabaseServer.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/update-password`,
    });
    if (error) return Response.json({ error: error.message }, { status: 400 });
    return Response.json({ success: true, message: "If an account exists, a reset link has been sent." });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Unable to request password reset" }, { status: 500 });
  }
}
