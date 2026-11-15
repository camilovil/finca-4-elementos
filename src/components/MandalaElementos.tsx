"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const OUTLINE = "M0 0 C58 -52 58 -118 0 -158 C-58 -118 -58 -52 0 0 Z";
const MIDRIB = "M0 -16 L0 -150";
const BARBS = [
  "M0 -52 L21 -68",
  "M0 -52 L-21 -68",
  "M0 -78 L21 -94",
  "M0 -78 L-21 -94",
  "M0 -104 L19 -119",
  "M0 -104 L-19 -119",
];

const DATA = [
  { el: "Tierra", wine: "Te", color: "#C68A3D", angle: 45 },
  { el: "Agua", wine: "Caha", color: "#4F7673", angle: 135 },
  { el: "Fuego", wine: "Qutec", color: "#BD7A6B", angle: 225 },
  { el: "Aire", wine: "Homtec", color: "#6F7A55", angle: 315 },
];

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const dash: CSSProperties = { strokeDasharray: 1, strokeDashoffset: 1 };

// Mándala de los 4 elementos: se traza ligada al scroll (panel fijo) y cada
// hoja, en hover/tap, se desprende, se tiñe de su color y revela su vino.
export default function MandalaElementos() {
  const scrollyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const coreRef = useRef<SVGCircleElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const scrolly = scrollyRef.current;
    const stage = stageRef.current;
    if (!scrolly || !stage) return;

    const strokesByLeaf = DATA.map((_, i) =>
      Array.from(
        stage.querySelectorAll<SVGPathElement>(`[data-leaf="${i}"] [data-stroke]`)
      )
    );

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      strokesByLeaf.flat().forEach((s) => (s.style.strokeDashoffset = "0"));
      if (ringRef.current) ringRef.current.style.strokeDashoffset = "0";
      if (coreRef.current) coreRef.current.style.opacity = "1";
      if (scrollHintRef.current) scrollHintRef.current.style.opacity = "0";
      return;
    }

    let raf = 0;
    const draw = () => {
      const rect = scrolly.getBoundingClientRect();
      const total = scrolly.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total) : 0;
      const d = p / 0.82; // el trazo completa al 82% y luego sostiene
      if (ringRef.current)
        ringRef.current.style.strokeDashoffset = String(1 - clamp(d / 0.16));
      strokesByLeaf.forEach((strokes, i) => {
        const lp = clamp((d - (0.12 + i * 0.18)) / 0.42);
        const off = String(1 - lp);
        strokes.forEach((s) => (s.style.strokeDashoffset = off));
      });
      if (coreRef.current)
        coreRef.current.style.opacity = String(clamp((d - 0.9) / 0.1));
      if (scrollHintRef.current)
        scrollHintRef.current.style.opacity = String(clamp(1 - d * 6));
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={scrollyRef} className="mandala" data-screen-label="Elementos">
      <div className="mandala__pattern" aria-hidden="true" />
      <div className="mandala__panel">
        <div className="mandala__head">
          <div className="mandala__kicker">
            <span className="mandala__num">04</span>
            <span>Una tierra · cuatro elementos</span>
          </div>
          <h2 className="mandala__title serif">
            El <span className="display">mándala</span> de la finca{" "}
            <span className="mandala__it">se dibuja al andar</span>
          </h2>
        </div>

        <div
          ref={stageRef}
          className={`mandala__stage${active !== null ? " has-active" : ""}`}
          onMouseLeave={() => setActive(null)}
        >
          <svg
            viewBox="-220 -220 440 440"
            className="mandala__ringsvg"
            aria-hidden="true"
          >
            <circle
              ref={ringRef}
              cx="0"
              cy="0"
              r="188"
              fill="none"
              stroke="#9A7B3A"
              strokeWidth="1"
              strokeLinecap="round"
              pathLength={1}
              transform="rotate(-90)"
              style={{ strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.55 }}
            />
          </svg>

          <svg
            viewBox="-220 -220 440 440"
            className="mandala__svg"
            role="group"
            aria-label="Mándala de los cuatro elementos"
          >
            <g fill="none">
              {DATA.map((dt, i) => (
                <g
                  key={i}
                  data-leaf={i}
                  data-cursor-label="tocá"
                  className={`mleaf${active === i ? " active" : ""}`}
                  style={{ ["--c" as string]: dt.color }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={active === i}
                  aria-label={`${dt.wine} · ${dt.el}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <g transform={`rotate(${dt.angle})`}>
                    <g className="mleaf__lift">
                      <path
                        className="mleaf__fill"
                        d={OUTLINE}
                        fill={dt.color}
                        stroke="none"
                      />
                      <g className="mleaf__ink">
                        <path
                          className="mleaf__stroke"
                          data-stroke
                          pathLength={1}
                          d={OUTLINE}
                          style={dash}
                        />
                        <path
                          className="mleaf__stroke"
                          data-stroke
                          pathLength={1}
                          d={MIDRIB}
                          style={dash}
                        />
                        {BARBS.map((b, j) => (
                          <path
                            key={j}
                            className="mleaf__stroke"
                            data-stroke
                            pathLength={1}
                            d={b}
                            style={dash}
                          />
                        ))}
                      </g>
                    </g>
                  </g>
                </g>
              ))}
              <circle
                ref={coreRef}
                cx="0"
                cy="0"
                r="5"
                fill="#9A7B3A"
                style={{ opacity: 0 }}
              />
            </g>
          </svg>

          <div className="mandala__label">
            {active === null ? (
              <span className="mandala__hint">
                elegí
                <br />
                una hoja
              </span>
            ) : (
              <div className="mandala__card" key={active}>
                <span className="mandala__card-el">{DATA[active].el}</span>
                <span
                  className="mandala__card-wine"
                  style={{ color: DATA[active].color }}
                >
                  {DATA[active].wine}
                </span>
                <span
                  className="mandala__card-dot"
                  style={{ background: DATA[active].color }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mandala__legend">
          {DATA.map((dt, i) => (
            <button
              key={i}
              type="button"
              className={`mleg${
                active === i ? " active" : active !== null ? " dim" : ""
              }`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className="mleg__dot" style={{ background: dt.color }} />
              {dt.wine} · {dt.el}
            </button>
          ))}
        </div>

        <div ref={scrollHintRef} className="mandala__scrollhint">
          <span>Deslizá para trazar</span>
          <span className="mandala__arrow">↓</span>
        </div>
      </div>
    </section>
  );
}
