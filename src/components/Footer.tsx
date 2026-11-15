"use client";

import { nav, site } from "@/data/site";
import { scrollToId } from "@/lib/scroll";

export default function Footer() {
  const handle = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="footer">
      <div className="footer__wordmark" aria-hidden="true">
        4&nbsp;ELEMENTOS
      </div>
      <div className="footer__grid">
        <div>
          <div className="footer__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/leaves.png" alt="" />
            <span>FINCA 4 ELEMENTOS</span>
          </div>
          <p className="footer__about">
            Bodega boutique de vinos de baja intervención. Mendoza, Argentina.
          </p>
        </div>
        <div>
          <span className="footer__label">Navegación</span>
          <div className="footer__col-links">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={handle(item.id)}>
                {item.label}
              </a>
            ))}
            <a href="#contacto" onClick={handle("contacto")}>
              Distribución
            </a>
          </div>
        </div>
        <div>
          <span className="footer__label">Contacto</span>
          <div className="footer__col-links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span className="footer__muted">San Rafael · Mendoza</span>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Finca 4 Elementos. Todos los derechos reservados.</span>
        <span>
          Beber con moderación · Prohibida la venta a menores de 18 años.
        </span>
      </div>
    </footer>
  );
}
