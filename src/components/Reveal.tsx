"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

// Revelado continuo ligado al scroll (scrub): el contenido entra/sale a medida
// que pasa por el viewport, sin cortes. Variante "reveal--page" = giro tipo hoja.
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { autoAlpha: 1, clearProps: "transform" });
      return;
    }

    const page = className.includes("reveal--page");
    const from = page
      ? { autoAlpha: 0, y: 40, rotateY: -14, rotateX: 6 }
      : { autoAlpha: 0, y: 46 };

    const tw = gsap.fromTo(el, from, {
      autoAlpha: 1,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: `top ${90 - Math.min(delay / 40, 8)}%`,
        end: "top 56%",
        scrub: true,
      },
    });

    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [className, delay]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`.trim()}
      style={{ perspective: 1000, ...style }}
    >
      {children}
    </Tag>
  );
}
