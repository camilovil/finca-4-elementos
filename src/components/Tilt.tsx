"use client";

import { useRef, type ReactNode, type HTMLAttributes } from "react";

// Inclina el contenido en 3D hacia el cursor (desktop). En touch no se dispara.
export default function Tilt({
  children,
  max = 7,
  className = "",
  ...rest
}: {
  children: ReactNode;
  max?: number;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(820px) rotateY(${(px * max).toFixed(
      2
    )}deg) rotateX(${(-py * max).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform = "perspective(820px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </div>
  );
}
