"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-kyuto-dark hover:bg-kyuto-pink-50 whitespace-nowrap transition-colors"
    >
      <LogOut size={16} className="text-kyuto-purple-700" />
      Logout
    </button>
  );
}
