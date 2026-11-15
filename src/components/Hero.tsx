"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import Typewriter from "./Typewriter";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mouseRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  // entrada orquestada: arranca cuando el preloader avisa que terminó
  useEffect(() => {
    const w = window as unknown as { __f4eReady?: boolean };
    if (w.__f4eReady) {
      setEntered(true);
      return;
    }
    const on = () => setEntered(true);
    window.addEventListener("f4e:ready", on);
    // fallback por si el evento ya pasó
    const t = setTimeout(() => setEntered(true), 4000);
    return () => {
      window.removeEventListener("f4e:ready", on);
      clearTimeout(t);
    };
  }, []);

  // Parallax de scroll (capa externa, vía variable CSS) +
  // seguimiento del cursor con deslizamiento suave (lerp) en la capa interna.
  useEffect(() => {
    const host = ref.current;
    const mouseEl = mouseRef.current;
    if (!host || !mouseEl) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafScroll = 0;
    const onScroll = () => {
      if (rafScroll) return;
      rafScroll = requestAnimationFrame(() => {
        rafScroll = 0;
        host.style.setProperty("--scroll", String(window.scrollY));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (reduce) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    // estado del seguimiento de cursor
    let tx = 0,
      ty = 0; // objetivo (-1..1)
    let cx = 0,
      cy = 0; // actual (interpolado)
    let active = false;
    let rafMouse = 0;

    let hasMouse = false;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!hasMouse) {
        // con mouse, el brillo y la sombra siguen al cursor (la luz)
        hasMouse = true;
        host.classList.add("has-mouse");
      }
      if (!active) {
        active = true;
        rafMouse = requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      // interpolación → sensación de deslizamiento
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      mouseEl.style.transform =
        `translate3d(${(cx * 26).toFixed(2)}px, ${(cy * 16).toFixed(2)}px, 0)` +
        ` rotateX(${(-cy * 6).toFixed(2)}deg)` +
        ` rotateY(${(cx * 16).toFixed(2)}deg)` +
        ` rotateZ(${(cx * 3).toFixed(2)}deg)`;
      // posición de la "luz": mueve sombra proyectada, reflejo y brillo
      host.style.setProperty("--mx", cx.toFixed(3));
      host.style.setProperty("--my", cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        rafMouse = requestAnimationFrame(loop);
      } else {
        active = false;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafMouse);
      cancelAnimationFrame(rafScroll);
    };
  }, []);

  return (
    <header
      id="inicio"
      className={`hero${entered ? " entered" : ""}`}
      data-screen-label="Hero"
      ref={ref}
    >
      <div className="hero__bg" />
      <div className="hero__light" aria-hidden="true" />

      <div className="hero__top">
        <span className="hero__kicker">{site.kicker}</span>
      </div>

      <div className="hero__stage">
        <p className="hero__tagline">
          <Typewriter
            as="span"
            className="serif hero__tagline-it"
            text="No hacemos vino."
            startDelay={500}
            speed={70}
          />
          <span className="hero__tagline-strong">
            Dejamos que la tierra hable.
          </span>
        </p>

        <div className="hero__bottle-enter">
          <div className="hero__bottle-wrap">
            {/* reflejo de color y sombra que la botella proyecta sobre la página */}
            <span className="hero__bottle-glow" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/botella-qutec.webp"
              alt=""
              aria-hidden="true"
              className="hero__bottle-cast"
            />
            <div className="hero__bottle-mouse" ref={mouseRef}>
              <div className="hero__bottle-float">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/botella-qutec.webp"
                  alt="Botella QUTEC — tinto Malbec / Syrah de Finca 4 Elementos"
                  className="hero__bottle"
                />
                <span className="hero__bottle-shine" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* wordmark gigante: fijo abajo durante todo el scroll, detrás del contenido */}
      <div className="hero__wordmark" aria-hidden="true">
        <span>4&nbsp;ELEMENTOS</span>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <span className="hero__scroll-cue" />
      </div>
    </header>
  );
}
