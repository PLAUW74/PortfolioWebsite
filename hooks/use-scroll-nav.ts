"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface UseScrollNavOptions {
  prevPage?: string;
  nextPage?: string;
}

export function useScrollNav({ prevPage, nextPage }: UseScrollNavOptions) {
  const router = useRouter();
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const navigate = (href: string) => {
      if (hasNavigatedRef.current) return;
      hasNavigatedRef.current = true;
      router.push(href);
    };

    const handleWheel = (e: WheelEvent) => {
      if (hasNavigatedRef.current) return;
      const atTop = window.scrollY <= 0;
      const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;

      if (e.deltaY < -30 && atTop && prevPage) navigate(prevPage);
      else if (e.deltaY > 30 && atBottom && nextPage) navigate(nextPage);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      if (hasNavigatedRef.current) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      const atTop = window.scrollY <= 0;
      const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;

      if (diff < -50 && atTop && prevPage) navigate(prevPage);
      if (diff > 50 && atBottom && nextPage) navigate(nextPage);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [prevPage, nextPage, router]);
}
