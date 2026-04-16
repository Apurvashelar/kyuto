"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Star, Trash2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import type { Address } from "./page";

type Draft = Omit<Address, "id" | "is_default"> & { id?: string };

const EMPTY: Draft = {
  full_name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

export function AddressesClient({
  initialAddresses,
}: {
  initialAddresses: Address[];
}) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in again");
      setLoading(false);
      return;
    }
    const payload = {
      user_id: user.id,
      full_name: editing.full_name,
      phone: editing.phone,
      line1: editing.line1,
      line2: editing.line2 || null,
      city: editing.city,
      state: editing.state,
      pincode: editing.pincode,
    };
    const { data, error } = editing.id
      ? await supabase
          .from("addresses")
          .update(payload)
          .eq("id", editing.id)
          .select()
          .single()
      : await supabase
          .from("addresses")
          .insert({ ...payload, is_default: addresses.length === 0 })
          .select()
          .single();
    setLoading(false);
    if (error) {
      toast.error("Could not save", { description: error.message });
      return;
    }
    const saved = data as Address;
    setAddresses((prev) =>
      editing.id
        ? prev.map((a) => (a.id === saved.id ? saved : a))
        : [...prev, saved]
    );
    setEditing(null);
    toast.success(editing.id ? "Address updated" : "Address saved");
  }

  async function remove(id: string) {
    if (!confirm("Delete this address?")) return;
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) {
      toast.error("Could not delete", { description: error.message });
      return;
    }
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed");
  }

  async function setDefault(id: string) {
    const supabase = createSupabaseBrowserClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);
    const { error } = await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", id);
    if (error) return;
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, is_default: a.id === id }))
    );
  }

  return (
    <div className="space-y-4">
      {addresses.length === 0 && !editing && (
        <p className="text-sm text-kyuto-grey">No addresses saved yet.</p>
      )}

      <ul className="space-y-3">
        {addresses.map((a) => (
          <li
            key={a.id}
            className="p-4 rounded-xl border border-kyuto-purple-100 bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-kyuto-dark">{a.full_name}</p>
                  {a.is_default && (
                    <span className="text-[10px] uppercase tracking-wide bg-kyuto-pink-100 text-kyuto-pink-700 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-kyuto-grey mt-1">
                  {a.line1}
                  {a.line2 ? `, ${a.line2}` : ""}
                  <br />
                  {a.city}, {a.state} {a.pincode}
                  <br />
                  {a.phone}
                </p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                {!a.is_default && (
                  <button
                    type="button"
                    onClick={() => setDefault(a.id)}
                    className="p-1.5 rounded-full hover:bg-kyuto-pink-50 text-kyuto-grey hover:text-kyuto-pink-600"
                    title="Set as default"
                  >
                    <Star size={16} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setEditing({
                      id: a.id,
                      full_name: a.full_name,
                      phone: a.phone,
                      line1: a.line1,
                      line2: a.line2 ?? "",
                      city: a.city,
                      state: a.state,
                      pincode: a.pincode,
                    })
                  }
                  className="text-xs text-kyuto-purple-700 hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(a.id)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-kyuto-grey hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {editing ? (
        <form
          onSubmit={save}
          className="p-4 rounded-xl border border-kyuto-pink-200 bg-kyuto-pink-50/40 space-y-3"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              label="Full name"
              value={editing.full_name}
              onChange={(v) => setEditing({ ...editing, full_name: v })}
              required
            />
            <Input
              label="Phone"
              value={editing.phone}
              onChange={(v) => setEditing({ ...editing, phone: v })}
              required
            />
          </div>
          <Input
            label="Address line 1"
            value={editing.line1}
            onChange={(v) => setEditing({ ...editing, line1: v })}
            required
          />
          <Input
            label="Address line 2"
            value={editing.line2 ?? ""}
            onChange={(v) => setEditing({ ...editing, line2: v })}
          />
          <div className="grid sm:grid-cols-3 gap-3">
            <Input
              label="City"
              value={editing.city}
              onChange={(v) => setEditing({ ...editing, city: v })}
              required
            />
            <Input
              label="State"
              value={editing.state}
              onChange={(v) => setEditing({ ...editing, state: v })}
              required
            />
            <Input
              label="Pincode"
              value={editing.pincode}
              onChange={(v) => setEditing({ ...editing, pincode: v })}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save address"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditing(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button
          variant="outline"
          onClick={() => setEditing({ ...EMPTY })}
          className="inline-flex items-center gap-2"
        >
          <Plus size={16} /> Add new address
        </Button>
      )}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-kyuto-dark mb-1">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full h-10 px-3 rounded-lg border border-kyuto-purple-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400"
      />
    </label>
  );
}
