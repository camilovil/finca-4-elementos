"use client";

import { useEffect, useRef, useState } from "react";

// Curva que imita una carga real: ráfagas + mesetas (no lineal).
function loadEase(t: number) {
  const pts = [
    [0, 0],
    [0.16, 0.33],
    [0.32, 0.39],
    [0.5, 0.66],
    [0.66, 0.73],
    [0.86, 0.95],
    [1, 1],
  ];
  for (let i = 1; i < pts.length; i++) {
    if (t <= pts[i][0]) {
      const a = pts[i - 1];
      const b = pts[i];
      const k = (t - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * k;
    }
  }
  return 1;
}

const ARMS = [45, 135, 225, 315];

// Preloader "Carga Finca": el emblema huarpe se traza con el progreso,
// con anillo, contador y barra. Se muestra una vez por sesión.
export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState<boolean | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fireReady = () => {
      (window as unknown as { __f4eReady?: boolean }).__f4eReady = true;
      window.dispatchEvent(new Event("f4e:ready"));
    };

    if (sessionStorage.getItem("f4e-intro")) {
      setSkip(true);
      fireReady();
      return;
    }
    setSkip(false);
    sessionStorage.setItem("f4e-intro", "1");
    document.body.style.overflow = "hidden";

    const DURATION = 2800;
    let start: number | null = null;
    let raf = 0;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / DURATION);
      const p = loadEase(t);
      rootRef.current?.style.setProperty("--p", p.toFixed(4));
      if (barRef.current) barRef.current.style.width = `${(p * 100).toFixed(1)}%`;
      setPct(Math.round(p * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setDone(true);
          fireReady();
          setTimeout(() => {
            document.body.style.overflow = "";
          }, 900);
        }, 650);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  // null (primer render / SSR) o true (ya visto en esta sesión) → no mostrar
  if (skip !== false) return null;

  return (
    <div
      ref={rootRef}
      className={`cf${done ? " cf--done" : ""}`}
      aria-hidden="true"
    >
      <div className="cf__vignette" />
      <div className="cf__grain" />

      <div className="cf__eyebrow">Mendoza · Argentina</div>

      <div className="cf__stage">
        <span className="cf__label cf__label--l">Valle de Uco</span>
        <span className="cf__label cf__label--c">Una&nbsp;tierra</span>
        <span className="cf__label cf__label--r">Sus vinos</span>

        <svg
          viewBox="-215 -215 430 430"
          aria-label="Emblema Finca 4 Elementos trazándose"
          className="cf__emblem"
        >
          <circle
            cx="0"
            cy="0"
            r="202"
            fill="none"
            stroke="rgba(201,182,138,.16)"
            strokeWidth="1"
          />
          <circle
            cx="0"
            cy="0"
            r="202"
            fill="none"
            stroke="#C9B68A"
            strokeWidth="1.3"
            strokeLinecap="round"
            pathLength={1}
            transform="rotate(-90)"
            className="cf__ring"
          />
          <g
            fill="none"
            stroke="#C9B68A"
            strokeWidth="1.25"
            strokeLinecap="round"
          >
            {ARMS.map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path
                  className="cf__stroke"
                  d="M0 0 C58 -52 58 -118 0 -158 C-58 -118 -58 -52 0 0 Z"
                />
                <path className="cf__stroke" d="M0 -14 L0 -146" />
                <path
                  className="cf__stroke"
                  d="M0 -55 L26 -78 M0 -85 L26 -108 M0 -55 L-26 -78 M0 -85 L-26 -108"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="cf__pct serif">{pct}%</div>

      <div className="cf__bar">
        <div ref={barRef} className="cf__bar-fill" />
      </div>
      <div className="cf__hint">Preparando la finca</div>
    </div>
  );
}
