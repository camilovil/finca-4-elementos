"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

// Número que cuenta de 0 al valor al entrar en viewport.
export default function CountUp({
  to,
  duration = 1600,
  locale = "de-DE", // separador de miles con punto (1.000)
  className,
}: {
  to: number;
  duration?: number;
  locale?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>("0px 0px -12% 0px");
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {val.toLocaleString(locale)}
    </span>
  );
}
