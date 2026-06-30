"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  { id: "inicio", label: "La Finca" },
  { id: "nosotros", label: "Nosotros" },
  { id: "productos", label: "Los Vinos" },
];

export default function ProgressIndicator() {
  const [progress, setProgress] = useState(0);
  const [section, setSection] = useState(0);
  const [deep, setDeep] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const top = window.scrollY || doc.scrollTop || 0;
        setProgress(
          max > 0 ? Math.max(0, Math.min(100, Math.round((top / max) * 100))) : 0
        );
        const mid = top + window.innerHeight * 0.42;
        let sec = 0;
        ["inicio", "nosotros", "productos"].forEach((id, i) => {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= mid) sec = i;
        });
        setSection(sec);
        setDeep(max - top < 160);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scrollbar" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <div className={`progress${deep ? " hidden" : ""}`}>
        {steps.map((s, i) => (
        <span
          key={s.id}
          className="progress__step-wrap"
          style={{ display: "contents" }}
        >
          {i > 0 && <span className="progress__dot" />}
          <span
            className={`progress__step${section === i ? " active" : ""}`}
          >
            {s.label}
          </span>
        </span>
      ))}
        <span className="progress__divider" />
        <span className="progress__pct serif">{progress}%</span>
      </div>
    </>
  );
}
