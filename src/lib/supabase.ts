import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://gkfeplrnllxfroqvpwfw.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZmVwbHJubGx4ZnJvcXZwd2Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNjk1OTIsImV4cCI6MjEwMDY0NTU5Mn0.tofP23ulyPO2NmcwckKWHpStZ4DkKsmAPaW205fbHGM";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
