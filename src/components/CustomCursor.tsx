"use client";

import { useEffect, useRef } from "react";

// Cursor circular custom (solo desktop con puntero fino). Sigue el mouse con
// inercia y crece sobre elementos interactivos. Oculta el cursor nativo.
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.body.classList.add("has-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      el.style.opacity = "1";
    };
    const labelEl = el.querySelector(".cursor__label") as HTMLElement | null;
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const t = target?.closest(
        "a,button,[role='button'],.winelist li,.mleaf,.mleg,[data-cursor]"
      );
      el.classList.toggle("is-hover", !!t);
      const labeled = target?.closest("[data-cursor-label]") as HTMLElement | null;
      const label = labeled?.dataset.cursorLabel || "";
      el.classList.toggle("has-label", !!label);
      if (labelEl) labelEl.textContent = label;
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);

    const loop = () => {
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span className="cursor__label" />
    </div>
  );
}
