"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import Typewriter from "./Typewriter";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mouseRef = useRef<HTMLDivElement>(null);

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

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
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
        ` rotateX(${(-cy * 4).toFixed(2)}deg)` +
        ` rotateY(${(cx * 7).toFixed(2)}deg)` +
        ` rotateZ(${(cx * 3).toFixed(2)}deg)`;
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
    <header id="inicio" className="hero" data-screen-label="Hero" ref={ref}>
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

        <div className="hero__bottle-wrap">
          <div className="hero__bottle-mouse" ref={mouseRef}>
            <div className="hero__bottle-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/botella-qutec.png"
                alt="Botella QUTEC — tinto Malbec / Syrah de Finca 4 Elementos"
                className="hero__bottle"
              />
              <span className="hero__bottle-shine" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* wordmark gigante a sangre */}
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
