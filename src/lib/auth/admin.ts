import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseKeys } from "@/lib/supabase/client";

const ADMIN_EMAILS = new Set<string>(["apurvashelar303@gmail.com"]);

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.has(email.toLowerCase());
}

export async function getAdminUser() {
  if (!hasSupabaseKeys()) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email ?? null;
  if (!isAdminEmail(email)) return null;
  return data.user;
}
