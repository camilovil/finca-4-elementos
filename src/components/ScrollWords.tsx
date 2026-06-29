"use client";

import { useEffect, useRef, useState } from "react";

type Word = { text: string; variant?: "serif" | "anton" | "italic" | "gold" };

// Titular cuyas palabras se "redactan" (de tenue a pleno) ligadas a la
// posición de scroll: a medida que la sección sube, se encienden en secuencia.
export default function ScrollWords({
  words,
  className = "",
}: {
  words: Word[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // se redacta entre que entra por abajo (85%) y llega a ~35% del viewport
        const start = vh * 0.85;
        const end = vh * 0.35;
        const p = (start - rect.top) / (start - end);
        setProgress(Math.max(0, Math.min(1, p)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shown = progress * words.length;

  return (
    <p ref={ref} className={`swords ${className}`.trim()}>
      {words.map((w, i) => {
        // cada palabra se enciende de forma escalonada y suave
        const lit = Math.max(0, Math.min(1, shown - i));
        return (
          <span
            key={i}
            className={`swords__w swords__w--${w.variant ?? "serif"}`}
            style={{ opacity: 0.18 + lit * 0.82 }}
          >
            {w.text}
          </span>
        );
      })}
    </p>
  );
}
