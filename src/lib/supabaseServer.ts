import { createClient, type User } from "@supabase/supabase-js";

const url =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const anonKey =
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error("Supabase URL and anon key are required");
}

export const supabaseServer = createClient(url, anonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export function createAuthenticatedSupabase(accessToken: string) {
  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

export function getCookie(request: Request, name: string) {
  const header = request.headers.get("cookie") || "";
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return (
    header.match(new RegExp(`(?:^|;\\s*)${escaped}=([^;]+)`))?.[1] || null
  );
}

export async function getSupabaseUser(
  request: Request
): Promise<{ user: User; accessToken: string } | null> {
  const authorization = request.headers.get("authorization");

  const bearer = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  const accessToken = bearer || getCookie(request, "sb_access_token");

  if (!accessToken) return null;

  const { data, error } = await supabaseServer.auth.getUser(accessToken);

  if (error || !data.user) return null;

  return {
    user: data.user,
    accessToken,
  };
}

export async function getSupabaseAdmin(request: Request) {
  const auth = await getSupabaseUser(request);

  if (!auth) return null;

  const allowed = (
    process.env.SUPABASE_ADMIN_EMAIL || "root@crazynode.in"
  ).toLowerCase();

  if ((auth.user.email || "").toLowerCase() !== allowed) {
    return null;
  }

  return auth;
}

export function sessionCookieHeaders(
  accessToken: string,
  refreshToken?: string
) {
  const secure =
    process.env.NODE_ENV === "production" ? "; Secure" : "";

  const headers = [
    `sb_access_token=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600${secure}`,
  ];

  if (refreshToken) {
    headers.push(
      `sb_refresh_token=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${secure}`
    );
  }

  return headers;
}
