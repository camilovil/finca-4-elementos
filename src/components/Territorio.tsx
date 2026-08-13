import Reveal from "./Reveal";
import ScrollWords from "./ScrollWords";
import ParallaxPhoto from "./ParallaxPhoto";
import MandalaElementos from "./MandalaElementos";

export default function Territorio() {
  return (
    <section id="territorio" className="territorio" data-screen-label="Territorio">
      {/* intro de terruño */}
      <div className="territorio__intro">
        <Reveal>
          <span className="eyebrow">Territorio · San Rafael</span>
        </Reveal>
        <ScrollWords
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
            A más de 1.000 metros sobre el nivel del mar, en San Rafael, el
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

      {/* paisaje de San Rafael */}
      <div className="territorio__photo">
        <ParallaxPhoto
          src="/photos/finca-vinedo.webp"
          alt="Viñedo de Finca 4 Elementos en San Rafael, con la casa de la finca y cielo despejado"
        />
      </div>

      {/* 4 elementos — mándala que se traza al scroll */}
      <MandalaElementos />
    </section>
  );
}
