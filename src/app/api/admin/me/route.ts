import { getSupabaseAdmin } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const admin = await getSupabaseAdmin(request);
  if (!admin) return Response.json({ authenticated: false }, { status: 401 });
  return Response.json({ authenticated: true, email: admin.user.email, id: admin.user.id });
}
