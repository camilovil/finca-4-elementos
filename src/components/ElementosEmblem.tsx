"use client";

import { useState } from "react";
import { elements } from "@/data/site";

// Paths de la hoja huarpe (misma forma del logo/mandala)
const LEAF = "M0 0 C58 -52 58 -118 0 -158 C-58 -118 -58 -52 0 0 Z";
const MIDRIB = "M0 -14 L0 -146";
const VEINS =
  "M0 -55 L26 -78 M0 -85 L26 -108 M0 -55 L-26 -78 M0 -85 L-26 -108";

// glow por elemento (mismo set que las hojas animadas)
const GLOW: Record<string, string> = {
  te: "rgba(166,168,120,.85)",
  homtec: "rgba(214,160,90,.9)",
  qutec: "rgba(214,141,98,.95)",
  caha: "rgba(166,179,164,.85)",
};

// ángulo de cada hoja en el emblema unido (apuntan hacia afuera en X)
const ANGLE: Record<string, number> = {
  te: 315, // arriba-izquierda
  homtec: 45, // arriba-derecha
  qutec: 225, // abajo-izquierda
  caha: 135, // abajo-derecha
};

type Key = "te" | "homtec" | "qutec" | "caha";

export default function ElementosEmblem() {
  const [active, setActive] = useState<Key>("te");
  const byKey = (k: string) =>
    elements.find((e) => e.word.toLowerCase() === k)!;
  const a = byKey(active);

  return (
    <div className="emblem-wrap">
      {/* emblema de 4 hojas unidas */}
      <div className="emblem">
        <svg
          viewBox="-185 -185 370 370"
          className="emblem__svg"
          role="group"
          aria-label="Los cuatro elementos"
        >
          {(Object.keys(ANGLE) as Key[]).map((k) => {
            const el = byKey(k);
            const on = active === k;
            return (
              <g
                key={k}
                transform={`rotate(${ANGLE[k]})`}
                className={`emblem__leaf${on ? " active" : ""}`}
                style={{ ["--lg" as string]: GLOW[k] }}
                tabIndex={0}
                role="button"
                aria-pressed={on}
                aria-label={`${el.word} · ${el.element}`}
                onMouseEnter={() => setActive(k)}
                onFocus={() => setActive(k)}
                onClick={() => setActive(k)}
              >
                {/* zona de click cómoda */}
                <path className="emblem__hit" d={LEAF} />
                <path
                  className="emblem__fill"
                  d={LEAF}
                  fill={el.dot}
                  stroke="none"
                />
                <g
                  className="emblem__lines"
                  fill="none"
                  stroke={el.dot}
                  strokeWidth={1.4}
                  strokeLinecap="round"
                >
                  <path d={LEAF} />
                  <path d={MIDRIB} />
                  <path d={VEINS} />
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* panel del elemento activo */}
      <div className="emblem__panel" key={active}>
        <span className="emblem__el">{a.element}</span>
        <h3 className="emblem__word serif" style={{ color: a.title }}>
          {a.word}
        </h3>
        <p className="emblem__text">{a.text}</p>
        <span className="emblem__hint">
          Pasá el cursor o tocá cada hoja
        </span>
      </div>
    </div>
  );
}
