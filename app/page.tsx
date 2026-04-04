"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Settings, Mail, MapPin } from "lucide-react";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { BGPattern } from "@/components/bg-pattern";
import { LineNumbers } from "@/components/line-numbers";

// ─── Icons ───────────────────────────────────────────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ArtStationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24-2.009a2.4 2.4 0 0 0-.463-1.422L14.983 1.426a2.397 2.397 0 0 0-2.164-1.333H9.166l12.127 20.996 2.174-3.766A2.406 2.406 0 0 0 24 15.714zm-7.412 1.47L9.166 4.838 1.69 17.184h14.898z" />
    </svg>
  );
}

// ─── Tab bar ─────────────────────────────────────────────────────────────────

type TabId = "aboutme" | "projects" | "skills";

const tabs: { id: TabId; label: string; section: string }[] = [
  { id: "aboutme",  label: "ABOUTME.CPP",  section: "section-aboutme"  },
  { id: "projects", label: "PROJECTS.CPP", section: "section-projects" },
  { id: "skills",   label: "SKILLS.CPP",   section: "section-skills"   },
];

function IdeTabs({ activeTab, onTabClick }: { activeTab: TabId; onTabClick: (id: TabId) => void }) {
  return (
    <div className="flex">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 transition-colors relative ${
            activeTab === tab.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground/70"
          }`}
        >
          {activeTab === tab.id && <Settings className="w-3.5 h-3.5 text-primary" />}
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
        </button>
      ))}
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <motion.aside
      className="hidden lg:flex flex-col w-72 border-r border-border bg-card/50 fixed top-[41px] left-0 h-[calc(100vh-41px)] z-10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Replace with <img src="/profile.jpg" className="w-full h-full object-cover" alt="Nigel Goh" /> */}
        <div className="aspect-square w-full bg-secondary/50 rounded overflow-hidden border border-border">
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary flex items-center justify-center">
            <span className="text-xs font-mono text-muted-foreground">profile.jpg</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-mono text-muted-foreground tracking-wider">COORDINATES</h3>
          <div className="space-y-2">
            <a href="mailto:nigelgoh74@gmail.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group">
              <Mail className="w-3.5 h-3.5" />
              <span className="font-mono group-hover:text-primary transition-colors">nigelgoh74@gmail.com</span>
            </a>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono uppercase">Singapore</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-mono text-muted-foreground tracking-wider">CONNECTIONS</h3>
          <div className="grid grid-cols-2 gap-2">
            <a href="https://github.com/PLAUW74" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 border border-border rounded text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
              <GitHubIcon className="w-3 h-3" /> GITHUB
            </a>
            <a href="https://linkedin.com/in/goh-jun-jie-nigel" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 border border-border rounded text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
              <LinkedInIcon className="w-3 h-3" /> LINKEDIN
            </a>
            <a href="https://nigel_goh.artstation.com" target="_blank" rel="noopener noreferrer"
              className="col-span-2 flex items-center justify-center gap-1.5 px-3 py-2 border border-border rounded text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
              <ArtStationIcon className="w-3 h-3" /> ARTSTATION
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-mono text-muted-foreground tracking-wider">STATUS</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary">OPEN_TO_OPPORTUNITIES</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("aboutme");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);

  // Scroll to section when tab is clicked
  const handleTabClick = (id: TabId) => {
    const container = scrollContainerRef.current;
    const section = document.getElementById(`section-${id}`);
    if (!container || !section) return;

    isScrollingProgrammatically.current = true;

    section.scrollIntoView({ behavior: "instant", block: "start" });

    setActiveTab(id);

    // detect scroll end properly
    let timeout: any;

    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isScrollingProgrammatically.current = false;
        container.removeEventListener("scroll", onScroll);
      }, 100);
    };

    container.addEventListener("scroll", onScroll);


  };
  // Update active tab based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
    if (isScrollingProgrammatically.current) return;

    const height = container.clientHeight;
    const containerTop = container.getBoundingClientRect().top;

      for (let i = tabs.length - 1; i >= 0; i--) {
        const el = document.getElementById(`section-${tabs[i].id}`);
        if (!el) continue;

        const elTop = el.getBoundingClientRect().top;

        if (elTop - containerTop <= height * 0.4) {
          setActiveTab(tabs[i].id);
          break;
        }
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Top bar ── */}
      <div className="hidden lg:flex fixed top-0 left-0 right-0 z-20 border-b border-border bg-background">
        <div className="w-72 flex items-center justify-between px-4 py-2 border-r border-border bg-card/50">
          <span className="text-xs font-mono text-muted-foreground tracking-wider">EXPLORER</span>
          <span className="text-muted-foreground">:</span>
        </div>
        <IdeTabs activeTab={activeTab} onTabClick={handleTabClick} />
      </div>

      {/* ── Sidebar ── */}
      <Sidebar />

      {/* ── Scrollable content ── */}
      <div
        ref={scrollContainerRef}
        className="flex-1 lg:ml-72 lg:mt-[41px] overflow-y-scroll"
        style={{ scrollBehavior: "auto" }} // we handle smooth manually
      >
        {/* Shared dot background + reactive layer spanning full scroll height */}
        <div className="relative">
          <BGPattern variant="dots" mask="none" size={24} fill="rgba(255,255,255,0.06)" />
          {/* Line numbers — sticky so they follow scroll */}
          <div className="hidden md:block sticky top-0 float-left z-10">
            <LineNumbers totalLines={120} scrollContainerRef={scrollContainerRef} />
          </div>

          {/* ── Section: ABOUTME.CPP ── */}
          <section
            id="section-aboutme"
            className="min-h-screen px-6 lg:px-12 py-12 relative z-10"
          >
            <div className="mb-2">
              <span className="text-sm font-mono text-muted-foreground">// ABOUTME.CPP</span>
            </div>
            <Hero />
          </section>

          {/* ── Section: PROJECTS.CPP ── */}
          <section
            id="section-projects"
            className="min-h-screen px-6 lg:px-12 py-12 border-t border-border/40 relative z-10"
          >
            <div className="mb-8">
              <span className="text-sm font-mono text-muted-foreground">// PROJECTS.CPP</span>
            </div>
            <Projects />
          </section>

          {/* ── Section: SKILLS.CPP ── */}
          <section
            id="section-skills"
            className="min-h-screen px-6 lg:px-12 py-12 border-t border-border/40 relative z-10"
          >
            <div className="mb-8">
              <span className="text-sm font-mono text-muted-foreground">// SKILLS.CPP</span>
            </div>
            <Skills />
          </section>
        </div>
      </div>
    </div>
  );
}
