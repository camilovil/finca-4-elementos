"use client";

import { useRef } from "react";

// Sección Tienda con el badge circular magnético (anillo de texto que gira +
// disco "SHOP" que sigue al cursor). Patrón aprobado del handoff "Esencial".
export default function ShopBadge() {
  const badgeRef = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const b = badgeRef.current;
    if (!b) return;
    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) * 0.16;
    const dy = (e.clientY - cy) * 0.16;
    b.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(
      1
    )}px) scale(1.05)`;
  };
  const onLeave = () => {
    if (badgeRef.current) badgeRef.current.style.transform = "translate(0,0) scale(1)";
  };

  return (
    <section
      id="tienda"
      className="shop"
      data-screen-label="Tienda"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="shop__phrase serif">Llevá la finca a tu mesa</span>
      <a
        ref={badgeRef}
        href="#contacto"
        className="shop__badge"
        aria-label="Ir a la tienda (próximamente)"
      >
        <svg viewBox="0 0 220 220" className="shop__ring" aria-hidden="true">
          <defs>
            <path
              id="fee-ring"
              d="M110,110 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
            />
          </defs>
          <text
            fontFamily="var(--font-work-sans), sans-serif"
            fontSize="12.5"
            fontWeight="600"
            letterSpacing="3.6"
            fill="#1E1D1A"
          >
            <textPath href="#fee-ring" startOffset="0%">
              COMPRAR AHORA · IR A LA TIENDA · COMPRAR AHORA · IR A LA TIENDA ·
            </textPath>
          </text>
        </svg>
        <span className="shop__disc">Shop</span>
      </a>
      <span className="shop__soon">Tienda online · próximamente</span>
    </section>
  );
}
