"use client";

import { useEffect, useRef } from "react";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
};

// Cinta en loop infinito que se inclina (skew) según la velocidad de scroll.
export default function Marquee({ items, reverse = false }: MarqueeProps) {
  const skewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lastY = window.scrollY;
    let skew = 0;
    let target = 0;
    let raf = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const v = y - lastY;
      lastY = y;
      target = Math.max(-10, Math.min(10, v * 0.35)); // inclinación según velocidad
    };
    const loop = () => {
      target *= 0.9; // decae hacia 0 al frenar
      skew += (target - skew) * 0.15;
      if (skewRef.current)
        skewRef.current.style.transform = `skewX(${skew.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const row = (
    <div className="marquee__row" aria-hidden="true">
      {items.map((t, i) => (
        <span key={i} className="marquee__item">
          {t}
          <span className="marquee__sep">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div className="marquee__skew" ref={skewRef}>
        <div className={`marquee__track${reverse ? " marquee__track--rev" : ""}`}>
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
