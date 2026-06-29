"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";
import FullscreenMenu from "./FullscreenMenu";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handle = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#inicio" onClick={handle("inicio")} className="nav__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/leaves.png" alt="" className="nav__logo" />
          <span className="nav__wordmark">
            Finca<span className="nav__four">4</span>Elementos
          </span>
        </a>
        <button
          type="button"
          className="nav__burger"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
        </button>
      </nav>

      <button
        type="button"
        className={`fsmenu__close${menuOpen ? " show" : ""}`}
        aria-label="Cerrar menú"
        onClick={() => setMenuOpen(false)}
      >
        <span />
        <span />
      </button>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
