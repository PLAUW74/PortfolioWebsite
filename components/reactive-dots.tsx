"use client";

import { useEffect, useRef } from "react";

interface ReactiveDotsProps {
  dotSize?: number;
  dotSpacing?: number;
  hoverColor?: string;
  radius?: number;
  maxGrow?: number;
  pulseSpeed?: number;
  lag?: number; // 0 = instant, 1 = never catches up. ~0.08 feels natural
}

export function ReactiveDots({
  dotSize = 1,
  dotSpacing = 24,
  hoverColor = "rgba(29, 158, 117",
  radius = 60,
  maxGrow = 0,
  pulseSpeed = 0.0,
  lag = 0,
}: ReactiveDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Real mouse position — updated instantly on move
  const mouseRef = useRef({ x: -9999, y: -9999 });
  // Smoothed position — lags behind, chases mouseRef each frame
  const smoothRef = useRef({ x: -9999, y: -9999 });
  const isActiveRef = useRef(false);

  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };

      // On first entry, snap smooth position to avoid flying in from off-screen
      if (!isActiveRef.current) {
        smoothRef.current = { x, y };
        isActiveRef.current = true;
      }
    };

    const onMouseLeave = () => {
      isActiveRef.current = false;
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ease smoothed position toward real mouse each frame
      if (isActiveRef.current) {
        smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * lag;
        smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * lag;
      }

      const mx = smoothRef.current.x;
      const my = smoothRef.current.y;

      if (!isActiveRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const elapsed = (now - startTimeRef.current) / 1000;
      const pulse = (Math.sin((elapsed / pulseSpeed) * Math.PI * 2) + 1) / 2;

      const pulseRadiusMin = radius * 0.6;
      const pulseRadiusMax = radius * 1.2;
      const effectiveRadius = pulseRadiusMin + pulse * (pulseRadiusMax - pulseRadiusMin);

      const innerPulse = 1 - pulse;
      const innerRadius = radius * 0.35 + innerPulse * radius * 0.2;

      const offsetX = dotSpacing / 2;
      const offsetY = dotSpacing / 2;
      const cols = Math.ceil(canvas.width / dotSpacing) + 1;
      const rows = Math.ceil(canvas.height / dotSpacing) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * dotSpacing;
          const y = offsetY + row * dotSpacing;

          const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
          const outerInfluence = Math.max(0, 1 - dist / effectiveRadius);
          const innerInfluence = Math.max(0, 1 - dist / innerRadius);
          const totalInfluence = Math.min(1, outerInfluence + innerInfluence * 0.6);

          if (totalInfluence <= 0.01) continue;

          const r = dotSize + totalInfluence * dotSize * maxGrow;
          const alpha = 0.1 + totalInfluence * 0.7;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `${hoverColor}, ${alpha})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      ro.disconnect();
    };
  }, [dotSize, dotSpacing, hoverColor, radius, maxGrow, pulseSpeed, lag]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[-9]"
      style={{ display: "block" }}
    />
  );
}
