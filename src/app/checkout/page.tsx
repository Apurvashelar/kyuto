import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseKeys } from "@/lib/supabase/client";
import { CheckoutClient } from "./CheckoutClient";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  if (!hasSupabaseKeys()) {
    redirect("/login?next=/checkout");
  }
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login?next=/checkout");
  }

  return <CheckoutClient userEmail={user.email ?? ""} />;
}
