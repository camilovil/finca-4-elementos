"use client";

import { useEffect, useRef } from "react";
import AnimatedLeaf from "./AnimatedLeaf";
import { scrollToId } from "@/lib/scroll";

type Item = { id: string; label: string; soon?: boolean };

const items: Item[] = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "productos", label: "Vinos" },
  { id: "contacto", label: "Distribución" },
  { id: "tienda", label: "Tienda", soon: true },
];

export default function FullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // cerrar con Escape + bloquear scroll del body mientras está abierto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const go = (item: Item) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.soon) return;
    onClose();
    // esperar a que termine la transición de cierre antes de scrollear
    setTimeout(() => scrollToId(item.id), 180);
  };

  // parallax de las decoraciones según el cursor
  const onMove = (e: React.MouseEvent) => {
    const host = ref.current;
    if (!host) return;
    const r = host.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    host.querySelectorAll<HTMLElement>("[data-depth]").forEach((d) => {
      const depth = Number(d.dataset.depth);
      d.style.transform = `translate(${(nx * depth).toFixed(1)}px, ${(
        ny * depth
      ).toFixed(1)}px)`;
    });
  };

  return (
    <div
      ref={ref}
      className={`fsmenu${open ? " open" : ""}`}
      onMouseMove={onMove}
      aria-hidden={!open}
    >
      <div className="fsmenu__deco fsmenu__deco--a" data-depth="26">
        <AnimatedLeaf variant="te" height={150} />
      </div>
      <div className="fsmenu__deco fsmenu__deco--b" data-depth="-34">
        <AnimatedLeaf variant="caha" height={120} />
      </div>

      <nav className="fsmenu__nav">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={go(item)}
            className={`fsmenu__item${item.soon ? " soon" : ""}`}
          >
            {item.label}
            {item.soon && <span className="fsmenu__soon">Pronto</span>}
          </a>
        ))}
      </nav>

      <div className="fsmenu__foot">
        <span>hola@finca4elementos.com</span>
        <span>San Rafael · Mendoza</span>
      </div>
    </div>
  );
}
