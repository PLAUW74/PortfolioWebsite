"use client";

import { useEffect, useRef, useState } from "react";

interface LineNumbersProps {
  totalLines?: number;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function LineNumbers({ totalLines = 120, scrollContainerRef }: LineNumbersProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleHeight, setVisibleHeight] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleHeight(window.innerHeight - 41);
    const onResize = () => setVisibleHeight(window.innerHeight - 41);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
      setScrollProgress(progress);
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => target.removeEventListener("scroll", handleScroll);
  }, [totalLines, scrollContainerRef]);

  const lineHeight = 32; // leading-8 = 2rem = 32px
  const totalHeight = totalLines * lineHeight;
  const maxOffset = totalHeight - visibleHeight;
  const offset = maxOffset > 0 ? scrollProgress * maxOffset : 0;

  // Which line is at the center of the visible area
  const centerLine = Math.floor((offset + visibleHeight / 2) / lineHeight);

  return (
    <div
      ref={containerRef}
      className="hidden md:flex flex-col py-12 px-4 text-right select-none overflow-hidden"
      style={{ maxHeight: `calc(100vh - 41px)`, position: "sticky", top: "41px" }}
    >
      <div
        style={{
          transform: `translateY(-${offset}px)`,
          willChange: "transform",
        }}
      >
        {Array.from({ length: totalLines }, (_, i) => {
          const num = i + 1;
          const distance = Math.abs(num - centerLine);
          const isActive = distance === 0;
          const opacity = isActive ? 1 : Math.max(0.15, 0.6 - distance * 0.06);

          return (
            <span
              key={num}
              className="text-sm font-mono leading-8 block transition-colors duration-150"
              style={{
                color: isActive ? "var(--color-primary, oklch(0.65 0.15 180))" : undefined,
                opacity: isActive ? 1 : opacity,
                fontSize: isActive ? "0.8rem" : "0.75rem",
              }}
            >
              {String(num).padStart(3, "0")}
            </span>
          );
        })}
      </div>
    </div>
  );
}
