import Reveal from "./Reveal";
import AnimatedLeaf from "./AnimatedLeaf";
import AnimatedMandala from "./AnimatedMandala";
import EditorialHeadline from "./EditorialHeadline";
import { elements } from "@/data/site";

export default function Territorio() {
  return (
    <section id="territorio" className="territorio" data-screen-label="Territorio">
      {/* intro de terruño */}
      <div className="territorio__intro">
        <Reveal>
          <span className="eyebrow">Territorio · Valle de Uco</span>
        </Reveal>
        <EditorialHeadline
          className="territorio__head"
          words={[
            { text: "Vinos", variant: "serif" },
            { text: "donde", variant: "serif" },
            { text: "Tierra", variant: "anton" },
            { text: "y", variant: "italic" },
            { text: "Fuego", variant: "anton" },
            { text: "se", variant: "serif" },
            { text: "vuelven", variant: "serif" },
            { text: "copa", variant: "gold" },
          ]}
        />
        <Reveal className="territorio__copy" delay={120}>
          <p>
            A más de 1.000 metros sobre el nivel del mar, en el Valle de Uco, el
            día arde y la noche enfría. Esa amplitud —sol de altura y deshielo de
            los Andes— moldea suelos pedregosos y vivos donde la vid encuentra
            tensión, frescura y carácter.
          </p>
          <p>
            No corregimos ese origen: lo dejamos hablar. Cada añada es una
            fotografía líquida de un clima y un latido específico de la finca.
          </p>
        </Reveal>
      </div>

      {/* paisaje del Valle de Uco */}
      <Reveal className="territorio__photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/finca-vinedo.webp"
          alt="Viñedo de Finca 4 Elementos en el Valle de Uco, con la casa de la finca y cielo despejado"
        />
      </Reveal>

      {/* 4 elementos huarpe (inmersivo) */}
      <div className="huarpe">
        <div className="huarpe__lines" />
        <AnimatedMandala className="huarpe__mandala" />
        <div className="huarpe__inner">
          <Reveal>
            <span className="huarpe__eyebrow">El origen del nombre</span>
            <h2 className="serif">
              <span className="display">Cuatro elementos.</span> Una lengua.
            </h2>
            <p className="huarpe__lead">
              En allentiac —la lengua del pueblo huarpe de Cuyo— nombramos lo que
              nos sostiene. Cada hoja de nuestra marca es un elemento.
            </p>
          </Reveal>
          <div className="huarpe__grid">
            {elements.map((el, i) => (
              <Reveal
                key={el.word}
                className="element"
                delay={i * 100}
                style={{ ["--el-color" as string]: el.dot }}
              >
                <div className="element__leaf">
                  <AnimatedLeaf
                    variant={
                      el.word.toLowerCase() as
                        | "te"
                        | "qutec"
                        | "caha"
                        | "homtec"
                    }
                    height={112}
                  />
                </div>
                <div className="element__info">
                  <h3 className="serif" style={{ color: el.title }}>
                    {el.word}
                  </h3>
                  <span className="element__el">{el.element}</span>
                  <p className="element__desc">{el.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
