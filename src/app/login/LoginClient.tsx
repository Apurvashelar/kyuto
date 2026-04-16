"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  createSupabaseBrowserClient,
  hasSupabaseKeys,
} from "@/lib/supabase/client";

type Step = "email" | "otp";

export function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/";

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [loading, setLoading] = useState(false);

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!hasSupabaseKeys()) {
      toast.error("Auth not configured", {
        description: "Add Supabase keys to .env.local first.",
      });
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: mode === "signup",
        data: mode === "signup" ? { full_name: name.trim() } : undefined,
      },
    });
    setLoading(false);
    if (error) {
      const msg = error.message.toLowerCase();
      const userMissing =
        mode === "login" &&
        (msg.includes("signups not allowed") ||
          msg.includes("user not found") ||
          msg.includes("not found") ||
          error.code === "otp_disabled" ||
          error.code === "user_not_found");
      if (userMissing) {
        toast.error("No account found", {
          description: "Please sign up first — we've taken you there.",
        });
        setMode("signup");
        setStep("email");
        setOtp("");
        return;
      }
      toast.error("Could not send code", { description: error.message });
      return;
    }
    toast.success("Check your inbox", {
      description: `We sent a 6-digit code to ${email}`,
    });
    setStep("otp");
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Enter the 6-digit code");
      return;
    }
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otp,
      type: "email",
    });
    setLoading(false);
    if (error) {
      toast.error("Invalid code", { description: error.message });
      return;
    }
    const displayName =
      (data.user?.user_metadata?.full_name as string | undefined) ??
      email.split("@")[0];
    toast.success(`Hi ${displayName}, welcome to the Kyuto world!`);
    router.replace(nextPath);
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] bg-gradient-section flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-kyuto-pink-100/60 p-8">
        <div className="text-center mb-6">
          <h1 className="font-heading text-3xl text-kyuto-dark">
            {mode === "login" ? "Welcome back" : "Join the Kyuto world"}
          </h1>
          <p className="font-hand text-lg text-kyuto-pink-600 mt-1">
            {mode === "login"
              ? "sign in with your email"
              : "we'll send a code to your email"}
          </p>
        </div>

        <div className="flex bg-kyuto-pink-50 rounded-full p-1 mb-6 text-sm font-medium">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setStep("email");
                setOtp("");
              }}
              className={
                "flex-1 py-2 rounded-full transition-colors " +
                (mode === m
                  ? "bg-white text-kyuto-dark shadow-sm"
                  : "text-kyuto-grey hover:text-kyuto-dark")
              }
            >
              {m === "login" ? "Login" : "Sign up"}
            </button>
          ))}
        </div>

        {step === "email" ? (
          <form onSubmit={sendOtp} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-kyuto-dark mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full h-11 px-4 rounded-xl border border-kyuto-purple-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-kyuto-dark mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kyuto-grey"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-kyuto-purple-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "Sending code..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-kyuto-dark mb-1.5">
                6-digit code sent to {email}
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="••••••"
                autoFocus
                autoComplete="one-time-code"
                className="w-full h-12 px-4 rounded-xl border border-kyuto-purple-200 bg-white text-center text-xl tracking-[0.4em] font-semibold focus:outline-none focus:ring-2 focus:ring-kyuto-purple-400"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </Button>
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setOtp("");
              }}
              className="w-full text-xs text-kyuto-grey hover:text-kyuto-purple-700 underline"
            >
              Use a different email
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-kyuto-grey">
          By continuing you agree to our{" "}
          <Link
            href="/policies/privacy"
            className="underline hover:text-kyuto-purple-700"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
