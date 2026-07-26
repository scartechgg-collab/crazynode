import { supabaseServer, sessionCookieHeaders } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return Response.json({ error: "Email and password required" }, { status: 400 });

    const allowed = (process.env.SUPABASE_ADMIN_EMAIL || "root@crazynode.in").toLowerCase();
    if (String(email).toLowerCase() !== allowed) {
      return Response.json({ error: "This account is not authorized for administration" }, { status: 403 });
    }

    const { data, error } = await supabaseServer.auth.signInWithPassword({ email, password });
    if (error || !data.session || !data.user) {
      return Response.json({ error: error?.message || "Invalid credentials" }, { status: 401 });
    }
    if ((data.user.email || "").toLowerCase() !== allowed) {
      return Response.json({ error: "Unauthorized administrator" }, { status: 403 });
    }

    const response = Response.json({ success: true, email: data.user.email });
    for (const cookie of sessionCookieHeaders(data.session.access_token, data.session.refresh_token)) {
      response.headers.append("Set-Cookie", cookie);
    }
    return response;
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Unable to sign in" }, { status: 500 });
  }
}
