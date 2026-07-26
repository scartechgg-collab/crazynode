import { supabaseServer } from "@/lib/supabaseServer";
import { contentDefaults } from "@/lib/contentDefaults";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabaseServer.from("site_settings").select("key,value,updated_at");
  if (error) {
    console.error("Supabase content read failed:", error.message);
    return Response.json(contentDefaults, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  }

  const output: Record<string, unknown> = { ...contentDefaults };
  for (const row of data || []) output[row.key] = row.value;
  return Response.json(output, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" },
  });
}
