import Reveal from "./Reveal";
import ScrollWords from "./ScrollWords";
import { principles } from "@/data/site";

export default function Philosophy() {
  return (
    <section className="filosofia">
      <Reveal>
        <span className="eyebrow">Filosofía</span>
      </Reveal>

      <ScrollWords
        className="filosofia__head"
        words={[
          { text: "Cuatro", variant: "anton" },
          { text: "principios", variant: "anton" },
          { text: "sostienen", variant: "serif" },
          { text: "cada", variant: "serif" },
          { text: "decisión", variant: "anton" },
          { text: "que", variant: "serif" },
          { text: "tomamos", variant: "serif" },
          { text: "en", variant: "serif" },
          { text: "la", variant: "serif" },
          { text: "finca.", variant: "italic" },
        ]}
      />

      <div className="filosofia__list">
        {principles.map((p, i) => (
          <Reveal key={p.n} className="fprin" delay={i * 90}>
            <div className="fprin__l">
              <span className="fprin__n">{p.n}</span>
              <span
                className="fprin__dot"
                style={{ background: p.color }}
                aria-hidden="true"
              />
              <h3 className="fprin__name serif">{p.title}</h3>
            </div>
            <p className="fprin__text">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
