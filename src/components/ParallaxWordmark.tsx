"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  from?: number; // desplazamiento inicial en vw
  to?: number; // desplazamiento final en vw
};

// Wordmark gigante de fondo que deriva horizontalmente con el scroll
// (estilo lidiaeamato). Se monta dentro de un contenedor relative + overflow:hidden.
export default function ParallaxWordmark({ text, from = 12, to = -12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // progreso de 0 (entrando por abajo) a 1 (saliendo por arriba)
        const p = Math.max(
          0,
          Math.min(1, (vh - rect.top) / (vh + rect.height))
        );
        const x = from + (to - from) * p;
        el.style.transform = `translateX(${x}vw)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [from, to]);

  return (
    <div className="pwordmark" aria-hidden="true">
      <span ref={ref} className="pwordmark__text">
        {text}
      </span>
    </div>
  );
}
