import { createAuthenticatedSupabase, getCookie } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  const accessToken = getCookie(request, "sb_access_token");
  if (accessToken) await createAuthenticatedSupabase(accessToken).auth.signOut();

  const response = Response.json({ success: true });
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.headers.append("Set-Cookie", `sb_access_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`);
  response.headers.append("Set-Cookie", `sb_refresh_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`);
  return response;
}
