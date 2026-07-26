import { supabaseServer, sessionCookieHeaders } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) return Response.json({ error: "Email and password required" }, { status: 400 });
    if (password.length < 6) return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 });

    const origin = new URL(req.url).origin;
    const { data, error } = await supabaseServer.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name || "" },
        emailRedirectTo: `${origin}/login?confirmed=1`,
      },
    });
    if (error) return Response.json({ error: error.message }, { status: 400 });

    const response = Response.json({
      success: true,
      requiresEmailConfirmation: !data.session,
      email: data.user?.email,
      name: data.user?.user_metadata?.full_name || "",
      message: data.session ? "Account created" : "Check your email to confirm your account",
    });
    if (data.session) {
      for (const cookie of sessionCookieHeaders(data.session.access_token, data.session.refresh_token)) {
        response.headers.append("Set-Cookie", cookie);
      }
    }
    return response;
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Unable to create account" }, { status: 500 });
  }
}
