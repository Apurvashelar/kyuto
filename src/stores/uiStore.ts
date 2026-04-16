"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
  ribbonDismissed: boolean;
  mobileNavOpen: boolean;
  searchOpen: boolean;
  welcomePopupSeen: boolean;
  dismissRibbon: () => void;
  setMobileNav: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  markWelcomeSeen: () => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      ribbonDismissed: false,
      mobileNavOpen: false,
      searchOpen: false,
      welcomePopupSeen: false,
      dismissRibbon: () => set({ ribbonDismissed: true }),
      setMobileNav: (mobileNavOpen) => set({ mobileNavOpen }),
      setSearchOpen: (searchOpen) => set({ searchOpen }),
      markWelcomeSeen: () => set({ welcomePopupSeen: true }),
    }),
    {
      name: "kyuto-ui",
      partialize: (state) => ({
        ribbonDismissed: state.ribbonDismissed,
        welcomePopupSeen: state.welcomePopupSeen,
      }),
    }
  )
);
