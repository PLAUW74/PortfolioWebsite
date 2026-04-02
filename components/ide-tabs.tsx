"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { TransitionLink } from "./transition-link";

type Tab = "aboutme" | "projects" | "skills";

interface IdeTabsContextType {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const IdeTabsContext = createContext<IdeTabsContextType | null>(null);

export function useIdeTabs() {
  const context = useContext(IdeTabsContext);
  if (!context) throw new Error("useIdeTabs must be used within IdeTabsProvider");
  return context;
}

export function IdeTabsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getTabFromPath = (path: string): Tab => {
    if (path.startsWith("/projects")) return "projects";
    if (path.startsWith("/skills")) return "skills";
    return "aboutme";
  };

  const [activeTab, setActiveTab] = useState<Tab>(getTabFromPath(pathname));

  useEffect(() => {
    setActiveTab(getTabFromPath(pathname));
  }, [pathname]);

  return (
    <IdeTabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </IdeTabsContext.Provider>
  );
}

const tabs = [
  { id: "aboutme" as Tab, label: "ABOUTME.CPP", href: "/" },
  { id: "projects" as Tab, label: "PROJECTS.CPP", href: "/projects" },
  { id: "skills" as Tab, label: "SKILLS.CPP", href: "/skills" },
];

export function IdeTabs() {
  const { activeTab } = useIdeTabs();

  return (
    <div className="flex">
      {tabs.map((tab) => (
        <TransitionLink
          key={tab.id}
          href={tab.href}
          className={`flex items-center gap-2 px-4 py-2 transition-colors relative ${
            activeTab === tab.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground/70"
          }`}
        >
          {activeTab === tab.id && (
            <Settings className="w-3.5 h-3.5 text-primary" />
          )}
          <span className="text-xs font-mono">{tab.label}</span>
          {activeTab === tab.id && (
            <>
              <span className="text-muted-foreground text-xs ml-1">×</span>
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </>
          )}
        </TransitionLink>
      ))}
    </div>
  );
}
