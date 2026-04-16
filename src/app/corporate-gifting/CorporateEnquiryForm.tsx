"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

export function CorporateEnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "25-50",
    occasion: "",
    budget: "",
    notes: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/corporate-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Enquiry sent ✨", {
        description: "We'll be in touch within a day.",
      });
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        quantity: "25-50",
        occasion: "",
        budget: "",
        notes: "",
      });
    } catch {
      toast.error("Could not send", {
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Your name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          required
        />
        <Field
          label="Company"
          value={form.company}
          onChange={(v) => setForm({ ...form, company: v })}
          required
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Work email"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          required
        />
        <Field
          label="Phone"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
          required
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="block text-xs font-medium text-kyuto-dark mb-1">
            Quantity
          </span>
          <select
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-kyuto-purple-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400"
          >
            <option>10-25</option>
            <option>25-50</option>
            <option>50-100</option>
            <option>100-250</option>
            <option>250+</option>
          </select>
        </label>
        <Field
          label="Occasion"
          value={form.occasion}
          onChange={(v) => setForm({ ...form, occasion: v })}
          required
        />
        <Field
          label="Budget / unit (₹)"
          value={form.budget}
          onChange={(v) => setForm({ ...form, budget: v })}
        />
      </div>
      <label className="block">
        <span className="block text-xs font-medium text-kyuto-dark mb-1">
          Anything else?
        </span>
        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={4}
          placeholder="Delivery date, branding needs, product wishlist…"
          className="w-full px-3 py-2 rounded-lg border border-kyuto-purple-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400"
        />
      </label>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-kyuto-dark mb-1">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full h-10 px-3 rounded-lg border border-kyuto-purple-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400"
      />
    </label>
  );
}
