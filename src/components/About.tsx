import Reveal from "./Reveal";
import ParallaxPhoto from "./ParallaxPhoto";
import CountUp from "./CountUp";

export default function About() {
  return (
    <section id="nosotros" className="nosotros" data-screen-label="Nosotros">
      {/* Historia */}
      <div className="split">
        <Reveal className="split__text">
          <span className="eyebrow">Nosotros · 2019</span>
          <h2 className="section-h2 serif">
            Un proyecto familiar, nacido de la{" "}
            <span className="display">tierra</span>.
          </h2>
          <p>
            Finca 4 Elementos comenzó en 2019 como un proyecto familiar:
            recuperar un viñedo y aprender a escucharlo. Trabajamos varios años
            en silencio, sin apuro por salir al mercado, hasta confiar en lo que
            el suelo nos devolvía.
          </p>
          <p>
            Desde 2023 comercializamos nuestras primeras añadas. Pocas botellas,
            numeradas a mano, para quienes buscan un vino con origen y con verdad.
          </p>
        </Reveal>
        <div className="split__photo split__photo--earth">
          <ParallaxPhoto
            src="/photos/vendimia.webp"
            alt="Vendimia en Finca 4 Elementos: cajones con uva recién cosechada entre las hileras"
          />
        </div>
      </div>

      {/* Cómo trabajamos */}
      <div className="split split--bordered">
        <div className="split__photo split__photo--soil split__photo--first">
          <ParallaxPhoto
            src="/photos/vendimia-uvas.webp"
            alt="Uvas recién cosechadas en bins, con olivos y viñedo de fondo en San Rafael"
          />
        </div>
        <Reveal className="split__text" delay={120}>
          <span className="eyebrow">Cómo trabajamos</span>
          <h2 className="section-h2 serif">
            Agricultura <span className="display">regenerativa</span>, baja
            intervención.
          </h2>
          <p>
            Manejamos el viñedo de forma agroecológica: cobertura vegetal,
            compost propio y cero síntesis química. La salud del suelo es la
            salud del vino.
          </p>
          <ul className="worklist">
            <li>
              <span>—</span> Sin correcciones químicas en bodega
            </li>
            <li>
              <span>—</span> Fermentación con levaduras nativas
            </li>
            <li>
              <span>—</span> Sin filtrado mecánico
            </li>
          </ul>
        </Reveal>
      </div>

      {/* Producción limitada */}
      <div className="limited">
        <Reveal>
          <span className="eyebrow">Producción artesanal y limitada</span>
          <h2 className="section-h2 serif">
            Pocas botellas. Cada una, numerada a mano.
          </h2>
        </Reveal>
        <Reveal className="limited__fig" delay={120}>
          <div className="limited__num serif">
            <CountUp to={500} />
            <span>–</span>
            <CountUp to={1000} />
          </div>
          <p>
            botellas por añada y por varietal. No producimos más de lo que la
            finca puede dar con honestidad.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
