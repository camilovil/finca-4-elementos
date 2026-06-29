import type Lenis from "lenis";

// Scroll suave a una sección, compensando la altura de la nav fija.
// Usa Lenis si está activo; si no, scroll nativo.
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = id === "inicio" ? 0 : -70;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(id === "inicio" ? 0 : el, { offset });
    return;
  }
  const y =
    id === "inicio"
      ? 0
      : el.getBoundingClientRect().top + (window.scrollY || 0) + offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}
