"use client";

import { useEffect, useRef } from "react";

// Particle trail — each particle lags behind the cursor with a different lerp speed,
// creating a comet-tail effect. Particle[0] is closest (fastest), [6] is furthest (slowest).
const TRAIL_COUNT = 7;
const LERP_SPEEDS = [0.28, 0.22, 0.17, 0.13, 0.09, 0.065, 0.045];
const TRAIL_SIZES = [5.5, 4.8, 4.0, 3.2, 2.5, 1.8, 1.2];
// cyan → purple gradient across the trail
const TRAIL_COLORS = [
  "rgba(0,212,255,0.75)",
  "rgba(30,195,255,0.65)",
  "rgba(80,165,255,0.55)",
  "rgba(120,130,255,0.45)",
  "rgba(150,105,255,0.38)",
  "rgba(168,85,247,0.28)",
  "rgba(168,85,247,0.18)",
];

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>(Array(TRAIL_COUNT).fill(null));

  // live mouse position
  const mousePos = useRef({ x: -200, y: -200 });
  // current interpolated positions for dot, ring, and each trail particle
  const dotPos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const trailPos = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200 }))
  );

  useEffect(() => {
    // ── inject cursor:none globally ──────────────────────────────────────────
    const style = document.createElement("style");
    style.id = "cursor-glow-hide";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    let animId: number;

    function onMouseMove(e: MouseEvent) {
      mousePos.current = { x: e.clientX, y: e.clientY };
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // ── dot: snaps nearly instantly ──────────────────────────────────────
      dotPos.current.x = lerp(dotPos.current.x, mx, 0.55);
      dotPos.current.y = lerp(dotPos.current.y, my, 0.55);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 5}px, ${dotPos.current.y - 5}px)`;
      }

      // ── ring: slower follow ───────────────────────────────────────────────
      ringPos.current.x = lerp(ringPos.current.x, mx, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, my, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
      }

      // ── trail particles: each lags behind the previous ────────────────────
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const target = i === 0
          ? dotPos.current   // first particle follows the dot
          : trailPos.current[i - 1]; // subsequent particles follow the one ahead

        trailPos.current[i].x = lerp(trailPos.current[i].x, target.x, LERP_SPEEDS[i]);
        trailPos.current[i].y = lerp(trailPos.current[i].y, target.y, LERP_SPEEDS[i]);

        const el = trailRefs.current[i];
        if (el) {
          const half = TRAIL_SIZES[i] / 2;
          el.style.transform = `translate(${trailPos.current[i].x - half}px, ${trailPos.current[i].y - half}px)`;
        }
      }

      animId = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMouseMove);
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
      const injected = document.getElementById("cursor-glow-hide");
      if (injected) injected.remove();
    };
  }, []);

  return (
    <>
      {/* ── trail particles ── */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: TRAIL_SIZES[i],
            height: TRAIL_SIZES[i],
            borderRadius: "50%",
            background: TRAIL_COLORS[i],
            pointerEvents: "none",
            zIndex: 9997,
            willChange: "transform",
            filter: `blur(${i * 0.4}px)`,
          }}
        />
      ))}

      {/* ── ring: larger circle that lags behind ── */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(0,212,255,0.55)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          boxShadow: "0 0 8px rgba(0,212,255,0.2)",
        }}
      />

      {/* ── main dot ── */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#00d4ff",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          boxShadow: "0 0 10px #00d4ff, 0 0 22px rgba(0,212,255,0.6)",
        }}
      />
    </>
  );
}
