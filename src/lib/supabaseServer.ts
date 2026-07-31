import { createClient, type User } from "@supabase/supabase-js";

const url = "https://gkfeplrnllxfroqvpwfw.supabase.co";

const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZmVwbHJubGx4ZnJvcXZwd2Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNjk1OTIsImV4cCI6MjEwMDY0NTU5Mn0.tofP23ulyPO2NmcwckKWHpStZ4DkKsmAPaW205fbHGM";

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
