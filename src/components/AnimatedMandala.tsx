"use client";

import { useInView } from "./useInView";

const ARMS = [45, 135, 225, 315];

// Mandala/emblema huarpe que se traza brazo por brazo y luego florece + respira.
export default function AnimatedMandala({
  className = "",
}: {
  className?: string;
}) {
  const { ref, inView } = useInView<SVGSVGElement>("0px 0px -20% 0px");

  return (
    <svg
      ref={ref}
      viewBox="-205 -205 410 410"
      aria-hidden="true"
      className={`amandala${inView ? " in" : ""} ${className}`.trim()}
    >
      <g className="amandala__group">
        {ARMS.map((deg, ai) => (
          <g
            key={deg}
            transform={`rotate(${deg})`}
            fill="none"
            stroke="#C9B68A"
            strokeWidth={1.4}
            strokeLinecap="round"
          >
            <path
              className="amandala__draw"
              style={{ animationDelay: `${0.1 + ai * 0.25}s` }}
              d="M0 0 C58 -52 58 -118 0 -158 C-58 -118 -58 -52 0 0 Z"
            />
            <path
              className="amandala__draw"
              style={{ animationDelay: `${0.6 + ai * 0.25}s` }}
              d="M0 -14 L0 -146"
            />
            <path
              className="amandala__draw"
              style={{ animationDelay: `${0.95 + ai * 0.25}s` }}
              d="M0 -55 L26 -78 M0 -85 L26 -108 M0 -55 L-26 -78 M0 -85 L-26 -108"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
