"use client";

import { useEffect, useRef, useState } from "react";

type TypewriterPhase = "typing" | "idle" | "deleting" | "done";

interface UseTypewriterOptions {
  text: string;
  typeSpeed?: number;     // ms per character while typing
  deleteSpeed?: number;   // ms per character while deleting
  startDelay?: number;    // ms before typing begins
  onDone?: () => void;    // called when deletion is fully complete
}

interface UseTypewriterReturn {
  displayed: string;
  phase: TypewriterPhase;
  startDelete: () => void; // call this to trigger backspace animation
  showCursor: boolean;
}

export function useTypewriter({
  text,
  typeSpeed = 35,
  deleteSpeed = 18,
  startDelay = 200,
  onDone,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<TypewriterPhase>("typing");
  const [shouldDelete, setShouldDelete] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typing phase
  useEffect(() => {
    if (phase !== "typing") return;

    const start = setTimeout(() => {
      const type = () => {
        if (indexRef.current <= text.length) {
          setDisplayed(text.slice(0, indexRef.current));
          indexRef.current++;
          timerRef.current = setTimeout(type, typeSpeed);
        } else {
          setPhase("idle");
        }
      };
      type();
    }, startDelay);

    return () => {
      clearTimeout(start);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, text, typeSpeed, startDelay]);

  // Deletion phase — triggered externally via startDelete()
  useEffect(() => {
    if (!shouldDelete || phase === "deleting" || phase === "done") return;
    setPhase("deleting");

    const del = () => {
      setDisplayed((prev) => {
        if (prev.length === 0) {
          setPhase("done");
          onDone?.();
          return "";
        }
        timerRef.current = setTimeout(del, deleteSpeed);
        return prev.slice(0, -1);
      });
    };

    timerRef.current = setTimeout(del, deleteSpeed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [shouldDelete, phase, deleteSpeed, onDone]);

  const startDelete = () => setShouldDelete(true);

  const showCursor = phase === "typing" || phase === "deleting";

  return { displayed, phase, startDelete, showCursor };
}
