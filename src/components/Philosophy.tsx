import Reveal from "./Reveal";
import { principles } from "@/data/site";

export default function Philosophy() {
  return (
    <section className="philosophy">
      <Reveal className="philosophy__head">
        <span className="eyebrow">Filosofía</span>
        <h2 className="section-h2 serif">
          <span className="display">Cuatro principios</span> sostienen cada
          decisión que tomamos en la finca.
        </h2>
      </Reveal>
      <div className="philosophy__grid">
        {principles.map((p, i) => (
          <Reveal key={p.n} className="principle reveal--page" delay={i * 110}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              className="principle__icon"
            >
              <path
                d="M12 2.5C18 8 18 15.5 12 21.5C6 15.5 6 8 12 2.5Z"
                fill={p.color}
                fillOpacity={p.opacity}
                stroke={p.color}
                strokeWidth="1.3"
              />
              <path d="M12 5.5V18.5" stroke={p.color} strokeWidth="1.1" />
            </svg>
            <span className="principle__n">{p.n}</span>
            <h3 className="serif">{p.title}</h3>
            <p>{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
