"use client";

import { useInView } from "./useInView";

type Variant = "te" | "qutec" | "caha" | "homtec";

const STROKE: Record<Variant, string> = {
  te: "#6E6C49",
  qutec: "#BD7A6B",
  caha: "#8B9A8B",
  homtec: "#C68A3D",
};

// brillo (glow) por elemento — del handoff "Hojas Animadas"
const GLOW: Record<Variant, string> = {
  te: "rgba(166,168,120,.7)",
  qutec: "rgba(214,141,98,.9)",
  caha: "rgba(166,179,164,.75)",
  homtec: "rgba(214,160,90,.8)",
};

// Hoja huarpe que se traza al entrar en viewport y luego tiene su movimiento
// propio (Te respira, Qutec titila, Caha ondula, Homtec flota). Incluye una
// capa de relleno sólido que se enciende en hover (controlada por el padre).
export default function AnimatedLeaf({
  variant,
  height = 64,
}: {
  variant: Variant;
  height?: number;
}) {
  const { ref, inView } = useInView<SVGSVGElement>();
  const stroke = STROKE[variant];

  return (
    <svg
      ref={ref}
      viewBox="-72 -172 144 190"
      aria-hidden="true"
      className={`leaf leaf--${variant}${inView ? " in" : ""}`}
      style={
        {
          height,
          width: "auto",
          ["--leaf-glow" as string]: GLOW[variant],
        } as React.CSSProperties
      }
    >
      <g
        className="leaf__body"
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      >
        {/* relleno sólido — invisible hasta el hover */}
        <path
          className="leaf__fill"
          d="M0 0 C58 -52 58 -118 0 -158 C-58 -118 -58 -52 0 0 Z"
          fill={stroke}
          stroke="none"
        />
        <path
          className="leaf__draw leaf__draw--1"
          d="M0 0 C58 -52 58 -118 0 -158 C-58 -118 -58 -52 0 0 Z"
        />
        <path className="leaf__draw leaf__draw--2" d="M0 -14 L0 -146" />
        <path
          className="leaf__draw leaf__draw--3"
          d="M0 -55 L26 -78 M0 -85 L26 -108 M0 -55 L-26 -78 M0 -85 L-26 -108"
        />
      </g>
    </svg>
  );
}
