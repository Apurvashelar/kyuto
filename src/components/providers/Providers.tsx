"use client";

import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-center"
        richColors
        toastOptions={{
          style: {
            fontFamily: "var(--font-body)",
            borderRadius: "12px",
          },
        }}
      />
    </>
  );
}
