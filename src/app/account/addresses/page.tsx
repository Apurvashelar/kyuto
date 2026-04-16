import { MapPin } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseKeys } from "@/lib/supabase/client";
import { AddressesClient } from "./AddressesClient";

export const metadata = { title: "Addresses" };

export type Address = {
  id: string;
  full_name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
};

export default async function AddressesPage() {
  let addresses: Address[] = [];
  if (hasSupabaseKeys()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false });
      addresses = (data as Address[]) ?? [];
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin size={20} className="text-kyuto-purple-700" />
        <h2 className="font-heading text-2xl text-kyuto-dark">My Addresses</h2>
      </div>
      <AddressesClient initialAddresses={addresses} />
    </div>
  );
}
