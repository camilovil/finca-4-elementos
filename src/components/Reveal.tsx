"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

// Revela el contenido al entrar en viewport (IntersectionObserver),
// con un fallback de seguridad por si el observer no dispara.
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

    if (delay) el.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    const safe = setTimeout(() => el.classList.add("is-visible"), 3200);

    return () => {
      io.disconnect();
      clearTimeout(safe);
    };
  }, [delay]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
