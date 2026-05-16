"use client";

import { useEffect, useRef } from "react";

export default function WaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cv: HTMLCanvasElement = canvas;
    const cx: CanvasRenderingContext2D = ctx;

    // ── mouse ripple state ─────────────────────────────────────────────────
    const mouse = { x: -9999, y: -9999 };

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    window.addEventListener("mousemove", onMouseMove);

    let animId: number;
    let t = 0;

    const COLS = 26;
    const ROWS = 16;

    type Pt = { sx: number; sy: number; depth: number };

    function resize() {
      const p = cv.parentElement;
      if (!p) return;
      cv.width = p.offsetWidth;
      cv.height = p.offsetHeight;
    }

    function buildGrid(
      W: number,
      H: number,
      isFloor: boolean
    ): Pt[][] {
      const horizon = H * 0.5;
      const rows: Pt[][] = [];

      for (let j = 0; j <= ROWS; j++) {
        rows[j] = [];
        // depth: 0 = at horizon, 1 = at screen edge (top or bottom)
        const depth = j / ROWS;
        const perspective = 0.12 + depth * 0.88; // 0→0.12 (converge), 1→1 (full spread)

        for (let i = 0; i <= COLS; i++) {
          const xNorm = i / COLS - 0.5; // -0.5 … +0.5
          const sx = W * 0.5 + xNorm * W * 2.6 * perspective;

          // Base Y: spread from horizon toward screen edge
          const syBase = isFloor
            ? horizon + depth * (H * 0.5 + 20)
            : horizon - depth * (H * 0.5 + 20);

          // Wave displacement (stronger near the edge, minimal near horizon)
          const waveAmp = depth; // 0 at horizon, 1 at edge
          const wX = isFloor
            ? Math.sin(i * 0.38 + t) * Math.cos(j * 0.55 - t * 0.65) * 28 * waveAmp
              + Math.sin(i * 0.7 - t * 1.1 + j * 0.25) * 14 * waveAmp
            : Math.sin(i * 0.38 - t * 0.8) * Math.cos(j * 0.55 + t * 0.9) * 22 * waveAmp
              + Math.sin(i * 0.65 + t * 1.0 - j * 0.3) * 12 * waveAmp;

          // ── Mouse ripple ──────────────────────────────────────────────────
          // Compute distance from this grid point to the mouse (in screen space)
          const dx = sx - mouse.x;
          const dy = syBase - mouse.y;
          const distSq = dx * dx + dy * dy;
          // Gaussian envelope: radius ~200px, amplitude 50px × depth so it fades near horizon
          const rippleAmp = 50 * depth;
          const sigma = 200;
          const ripple = rippleAmp
            * Math.exp(-distSq / (sigma * sigma))
            * Math.sin(Math.sqrt(distSq) / 28 - t * 5.5);

          const sy = isFloor ? syBase - wX + ripple : syBase + wX - ripple;

          rows[j][i] = { sx, sy, depth };
        }
      }
      return rows;
    }

    function drawGrid(grid: Pt[][], isCeiling: boolean) {
      // Horizontal lines (depth-based: brighter deeper/nearer)
      for (let j = 0; j <= ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          const a = grid[j][i], b = grid[j][i + 1];
          const br = (a.depth + b.depth) * 0.5;
          if (br < 0.04) continue;
          const g = Math.round(150 + br * 105);
          const alpha = 0.04 + br * (isCeiling ? 0.35 : 0.42);
          cx.beginPath();
          cx.moveTo(a.sx, a.sy);
          cx.lineTo(b.sx, b.sy);
          cx.strokeStyle = `rgba(0,${g},255,${alpha})`;
          cx.lineWidth = 0.35 + br * 0.95;
          cx.stroke();
        }
      }

      // Vertical lines (cross-lines in purple)
      for (let i = 0; i <= COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const a = grid[j][i], b = grid[j + 1][i];
          const br = (a.depth + b.depth) * 0.5;
          if (br < 0.06) continue;
          const alpha = 0.025 + br * (isCeiling ? 0.2 : 0.28);
          cx.beginPath();
          cx.moveTo(a.sx, a.sy);
          cx.lineTo(b.sx, b.sy);
          cx.strokeStyle = `rgba(168,85,247,${alpha})`;
          cx.lineWidth = 0.3 + br * 0.7;
          cx.stroke();
        }
      }

      // Glow dots at every 3rd intersection on the floor only
      if (!isCeiling) {
        for (let j = 2; j <= ROWS; j += 3) {
          for (let i = 0; i <= COLS; i += 3) {
            const p = grid[j][i];
            if (p.depth < 0.28) continue;
            const size = 1.2 + p.depth * 3.2;
            const grd = cx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, size * 4);
            grd.addColorStop(0, `rgba(0,212,255,${p.depth * 0.55})`);
            grd.addColorStop(1, "rgba(0,212,255,0)");
            cx.beginPath();
            cx.arc(p.sx, p.sy, size * 4, 0, Math.PI * 2);
            cx.fillStyle = grd;
            cx.fill();
            cx.beginPath();
            cx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
            cx.fillStyle = `rgba(180,235,255,${0.35 + p.depth * 0.55})`;
            cx.fill();
          }
        }
      }
    }

    function draw() {
      t += 0.016;
      const W = cv.width, H = cv.height;
      cx.clearRect(0, 0, W, H);

      cx.lineCap = "round";

      // Draw ceiling first (behind floor visually)
      const ceiling = buildGrid(W, H, false);
      drawGrid(ceiling, true);

      // Draw floor on top
      const floor = buildGrid(W, H, true);
      drawGrid(floor, false);

      // Horizon glow line
      const hy = H * 0.5;
      const hGrad = cx.createLinearGradient(0, hy, W, hy);
      hGrad.addColorStop(0, "rgba(0,212,255,0)");
      hGrad.addColorStop(0.2, "rgba(0,212,255,0.18)");
      hGrad.addColorStop(0.5, "rgba(168,85,247,0.25)");
      hGrad.addColorStop(0.8, "rgba(0,212,255,0.18)");
      hGrad.addColorStop(1, "rgba(0,212,255,0)");
      cx.beginPath();
      cx.moveTo(0, hy);
      cx.lineTo(W, hy);
      cx.strokeStyle = hGrad;
      cx.lineWidth = 1;
      cx.stroke();

      animId = requestAnimationFrame(draw);
    }

    resize();
    const ro = new ResizeObserver(resize);
    if (cv.parentElement) ro.observe(cv.parentElement);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
