export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return Response.json({ ok: false, service: "supabase", error: "not configured" }, { status: 500 });

  try {
    const response = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Supabase returned ${response.status}`);
    return Response.json({ ok: true, service: "supabase" });
  } catch (error) {
    return Response.json({ ok: false, service: "supabase", error: error instanceof Error ? error.message : "unavailable" }, { status: 503 });
  }
}
