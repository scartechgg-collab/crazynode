import { getSupabaseUser } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const auth = await getSupabaseUser(request);
  if (!auth) return Response.json({ authenticated: false }, { status: 401 });

  return Response.json({
    authenticated: true,
    id: auth.user.id,
    email: auth.user.email,
    name: auth.user.user_metadata?.full_name || auth.user.user_metadata?.name || "",
  });
}
