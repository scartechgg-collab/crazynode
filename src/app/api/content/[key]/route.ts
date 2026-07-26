import { contentDefaults } from "@/lib/contentDefaults";
import { createAuthenticatedSupabase, getSupabaseAdmin, supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const { data, error } = await supabaseServer.from("site_settings").select("key,value,updated_at").eq("key", key).maybeSingle();

  if (error) console.error("Supabase setting read failed:", error.message);
  const fallback = contentDefaults[key] ?? null;
  if (!data && fallback === null) return Response.json({ key, value: null }, { status: 404 });

  return Response.json(
    { key, value: data?.value ?? fallback, updatedAt: data?.updated_at ?? null },
    { headers: { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=60" } }
  );
}

export async function PUT(request: Request, { params }: { params: Promise<{ key: string }> }) {
  const admin = await getSupabaseAdmin(request);
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { key } = await params;
  const body = await request.json();
  if (!("value" in body)) return Response.json({ error: "value is required" }, { status: 400 });

  const client = createAuthenticatedSupabase(admin.accessToken);
  const { data, error } = await client
    .from("site_settings")
    .upsert({ key, value: body.value, updated_at: new Date().toISOString(), updated_by: admin.user.id }, { onConflict: "key" })
    .select("key,value,updated_at")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ success: true, setting: data });
}
