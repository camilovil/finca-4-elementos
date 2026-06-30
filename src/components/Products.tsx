"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import ParallaxWordmark from "./ParallaxWordmark";
import { wines, wineCards, type Wine } from "@/data/site";

// foto por vino (preview flotante del índice) — shots propios de cada etiqueta
const wineImage: Record<Wine["key"], string> = {
  te: "/photos/te-vinedo.webp",
  qutec: "/photos/qutec-vinedo.webp",
  caha: "/photos/caha-cerezas.webp",
  homtec: "/photos/homtec-piedra.webp",
};

export default function Products() {
  const [active, setActive] = useState<Wine["key"]>("te");
  const [following, setFollowing] = useState(false);
  const a = wines.find((w) => w.key === active) ?? wines[0];

  // foto que sigue al cursor sobre el índice (desktop)
  const followRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const loop = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.18;
      p.y += (p.ty - p.y) * 0.18;
      if (followRef.current) {
        followRef.current.style.left = `${p.x.toFixed(1)}px`;
        followRef.current.style.top = `${p.y.toFixed(1)}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onListMove = (e: React.MouseEvent) => {
    pos.current.tx = e.clientX;
    pos.current.ty = e.clientY;
  };
  const onListEnter = (e: React.MouseEvent) => {
    pos.current.x = pos.current.tx = e.clientX;
    pos.current.y = pos.current.ty = e.clientY;
    setFollowing(true);
  };

  return (
    <section id="productos" className="productos" data-screen-label="Productos">
      <ParallaxWordmark text="FINCA 4 ELEMENTOS" />
      <div className="productos__wrap">
        <Reveal className="productos__head">
          <div>
            <span className="eyebrow">Los Vinos</span>
            <h2 className="serif">Productos</h2>
          </div>
          <p>
            Pasá el cursor sobre cada vino para conocerlo. Dos disponibles hoy;
            dos en camino.
          </p>
        </Reveal>

        <div className="productos__gallery">
          {[
            { img: "/photos/qutec-vinedo.webp", name: "Qutec", meta: "Fuego · Tinto" },
            { img: "/photos/caha-cerezas.webp", name: "Caha", meta: "Agua · Rosado" },
            { img: "/photos/homtec-piedra.webp", name: "Homtec", meta: "Aire · Tinto" },
          ].map((g, i) => (
            <Reveal as="figure" key={g.name} className="gphoto reveal--page" delay={i * 110}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.img} alt={`${g.name} — ${g.meta}`} />
              <figcaption>
                <span className="gphoto__name serif">{g.name}</span>
                <span className="gphoto__meta">{g.meta}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <div className="productos__main">
          {/* lista */}
          <ul
            className="winelist"
            onMouseEnter={onListEnter}
            onMouseMove={onListMove}
            onMouseLeave={() => setFollowing(false)}
          >
            {wines.map((w) => {
              const available = w.status === "Disponible";
              return (
                <li
                  key={w.key}
                  tabIndex={0}
                  className={`${available ? "available" : "soon"}${
                    active === w.key ? " active" : ""
                  }`}
                  onMouseEnter={() => setActive(w.key)}
                  onFocus={() => setActive(w.key)}
                >
                  <span
                    className="winelist__name"
                    style={
                      active === w.key && available
                        ? { textShadow: `0 0 28px ${w.glow}` }
                        : undefined
                    }
                  >
                    {w.name}
                  </span>
                  <span className="winelist__meta">
                    {w.shortMeta}
                    <br />
                    <span
                      className={`winelist__status${
                        available ? " available" : ""
                      }`}
                    >
                      {w.status}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          {/* preview fijo (mobile / sin hover) */}
          <div className="bottle-wrap">
            <div
              className="bottle"
              style={{ boxShadow: `0 30px 60px -40px ${a.color}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={a.key}
                src={wineImage[a.key]}
                alt={`${a.name} — ${a.element}`}
                className="bottle__img"
              />
              <div className="bottle__scrim" />
              <span className="bottle__el" style={{ color: a.color }}>
                {a.element}
              </span>
              <div className="bottle__cap" key={`cap-${a.key}`}>
                <div className="bottle__name serif">{a.name}</div>
                <div className="bottle__sub">{a.sub}</div>
              </div>
            </div>
          </div>
        </div>

        {/* fichas */}
        <div className="cards">
          {wineCards.map((c, i) => (
            <Reveal as="article" key={c.name} className="card reveal--page" delay={i * 120}>
              <div className="card__head">
                <span className="card__dot" style={{ background: c.dot }} />
                <h3>{c.name}</h3>
                <span className="card__meta">{c.meta}</span>
              </div>
              <p className="card__quote">{c.quote}</p>
              <p className="card__body">{c.body}</p>
              <dl>
                {c.specs.map((s) => (
                  <Fragment key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </Fragment>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </div>

      {/* foto que sigue al cursor (desktop) */}
      <div
        ref={followRef}
        className={`winefollow${following ? " show" : ""}`}
        aria-hidden="true"
      >
        <div className="winefollow__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={active} src={wineImage[active]} alt="" />
        </div>
      </div>
    </section>
  );
}
