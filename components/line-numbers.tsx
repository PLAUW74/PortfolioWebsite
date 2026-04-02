"use client";

import { useEffect, useRef, useState } from "react";

interface LineNumbersProps {
  totalLines?: number;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function LineNumbers({ totalLines = 60, scrollContainerRef }: LineNumbersProps) {
  const [activeLine, setActiveLine] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = scrollContainerRef?.current ?? window;

    const handleScroll = () => {
      let scrollY: number;
      let maxScroll: number;

      if (scrollContainerRef?.current) {
        const el = scrollContainerRef.current;
        scrollY = el.scrollTop;
        maxScroll = el.scrollHeight - el.clientHeight;
      } else {
        scrollY = window.scrollY;
        maxScroll = document.body.scrollHeight - window.innerHeight;
      }

      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      const line = Math.floor(1 + progress * (totalLines - 1));
      setActiveLine(line);
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => target.removeEventListener("scroll", handleScroll);
  }, [totalLines, scrollContainerRef]);

  // Keep active line visible in the numbers column
  useEffect(() => {
    if (!containerRef.current) return;
    const lineEl = containerRef.current.querySelector(`[data-line="${activeLine}"]`) as HTMLElement;
    if (lineEl) {
      lineEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeLine]);

  return (
    <div
      ref={containerRef}
      className="hidden md:flex flex-col py-12 px-4 text-right select-none overflow-hidden"
      style={{ maxHeight: "calc(100vh - 41px)", position: "sticky", top: "41px" }}
    >
      {Array.from({ length: totalLines }, (_, i) => {
        const num = i + 1;
        const isActive = num === activeLine;
        const distance = Math.abs(num - activeLine);
        const opacity = distance === 0 ? 1 : Math.max(0.15, 0.6 - distance * 0.06);

        return (
          <span
            key={num}
            data-line={num}
            className="text-sm font-mono leading-8 transition-all duration-150"
            style={{
              color: isActive ? "var(--color-primary, oklch(0.65 0.15 180))" : undefined,
              opacity: isActive ? 1 : opacity,
              fontSize: isActive ? "0.8rem" : "0.75rem",
            }}
          >
            {String(num).padStart(2, "0")}
          </span>
        );
      })}
    </div>
  );
}
