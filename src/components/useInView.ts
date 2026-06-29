"use client";

import { useEffect, useRef, useState } from "react";

// Devuelve un ref y un booleano que pasa a true cuando el elemento entra en viewport.
export function useInView<T extends HTMLElement | SVGElement>(
  rootMargin = "0px 0px -10% 0px"
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
