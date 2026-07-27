"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// ── scramble character pools ────────────────────────────────────────────────
const ZH_POOL = "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心力理二字必接战接联以反企无远".split("");
const EN_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ".split("");

function randChar(pool: string[]) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function seededChar(pool: string[], text: string, index: number) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i) + index) >>> 0;
  }
  return pool[hash % pool.length];
}

interface DecodeTextProps {
  text: string;
  lang: "en" | "zh";
  /** delay before animation starts (ms) */
  delay?: number;
  /** total reveal duration (ms) */
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function DecodeText({
  text,
  lang,
  delay = 0,
  duration = 900,
  style,
  className,
}: DecodeTextProps) {
  const pool = lang === "zh" ? ZH_POOL : EN_POOL;
  const [displayed, setDisplayed] = useState<string[]>(() =>
    text.split("").map((ch, i) => (ch === " " || ch === "　" ? ch : seededChar(pool, text, i)))
  );
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });

  // Start after element enters view + delay
  useEffect(() => {
    if (!isInView || started) return;
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [isInView, started, delay]);

  // Scramble → reveal animation
  useEffect(() => {
    if (!started) return;

    const chars = text.split("");
    const total = chars.length;
    let startTime: number | null = null;
    let raf: number;

    // Track which scramble chars each still-scrambled slot is showing
    const scrambleState = chars.map(() => randChar(pool));

    function frame(ts: number) {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // How many characters are resolved (left to right)
      const resolved = Math.floor(progress * total);

      const next = chars.map((ch, i) => {
        if (i < resolved) return ch; // resolved — show real char
        if (ch === " " || ch === "　") return ch; // preserve spaces
        // still scrambling — change every ~3 frames for a lively effect
        if (Math.random() < 0.35) scrambleState[i] = randChar(pool);
        return scrambleState[i];
      });

      setDisplayed(next);

      if (progress < 1) {
        raf = requestAnimationFrame(frame);
      }
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [started, text, pool, duration]);

  const chars = text.split("");
  const visibleChars = started
    ? displayed
    : chars.map((ch, i) => {
        if (ch === " " || ch === "　") return ch;
        return displayed.length === chars.length ? displayed[i] : seededChar(pool, text, i);
      });

  return (
    <span ref={containerRef} style={style} className={className}>
      {visibleChars.map((ch, i) => {
        const isResolved = started
          ? /* We re-derive this from the displayed array — if it matches real char OR was space */ chars[i] === " " || displayed[i] === chars[i]
          : false;

        if (chars[i] === " " || chars[i] === "　") {
          return <span key={i}>{ch}</span>;
        }

        return (
          <span
            key={i}
            style={
              isResolved
                ? undefined
                : {
                    color: "rgba(0,212,255,0.75)",
                    fontFamily: "var(--font-geist-mono, 'Courier New', monospace)",
                    fontSize: "0.92em",
                  }
            }
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}
