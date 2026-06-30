"use client";

import { useEffect, useRef } from "react";
import { useInView } from "./useInView";

// Foto con reveal "cortina" (wipe) al entrar + parallax sutil al scroll.
export default function ParallaxPhoto({
  src,
  alt,
  className = "",
  speed = 0.12,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("0px 0px -5% 0px");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        const img = imgRef.current;
        if (!el || !img) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const prog = (r.top + r.height / 2 - vh / 2) / vh; // ~ -1..1
        img.style.transform = `translateY(${(prog * speed * 100).toFixed(
          2
        )}px) scale(1.14)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, speed]);

  return (
    <div ref={ref} className={`rimg${inView ? " in" : ""} ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt={alt} />
    </div>
  );
}
