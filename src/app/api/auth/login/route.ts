import { supabaseServer, sessionCookieHeaders } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const { data, error } =
      await supabaseServer.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      console.error("Supabase login error:", error);

      return Response.json(
        {
          error: error.message,
          code: error.code,
          status: error.status,
        },
        { status: 401 }
      );
    }

    if (!data.user || !data.session) {
      return Response.json(
        { error: "Login failed. No session created." },
        { status: 401 }
      );
    }

    const response = Response.json({
      success: true,
      email: data.user.email,
      name:
        data.user.user_metadata?.full_name ||
        data.user.user_metadata?.name ||
        "",
    });

    const cookies = sessionCookieHeaders(
      data.session.access_token,
      data.session.refresh_token
    );

    for (const cookie of cookies) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (error) {
    console.error("Login API error:", error);

    return Response.json(
      { error: "Unable to sign in" },
      { status: 500 }
    );
  }
}
