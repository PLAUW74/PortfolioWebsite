"use client";

import { createContext, useContext } from "react";

interface PageTransitionContextType {
  startExit: (onDone: () => void) => void;
  registerExit: (fn: (onDone: () => void) => void) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within PageTransitionProvider");
  return ctx;
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  // No animation — navigate immediately
  const startExit = (onDone: () => void) => onDone();
  const registerExit = (_fn: (onDone: () => void) => void) => {};

  return (
    <PageTransitionContext.Provider value={{ startExit, registerExit }}>
      {children}
    </PageTransitionContext.Provider>
  );
}
