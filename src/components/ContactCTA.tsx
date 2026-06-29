import Reveal from "./Reveal";
import { site } from "@/data/site";

export default function ContactCTA() {
  return (
    <section id="contacto" className="cta" data-screen-label="Contacto">
      <div className="cta__bg" />
      <Reveal className="cta__inner">
        <span className="cta__eyebrow">Para vinotecas y restaurantes</span>
        <h2 className="serif">
          Distribuimos a quienes entienden el vino como nosotros.
        </h2>
        <p className="cta__lead">
          Trabajamos con una selección de vinotecas y restaurantes. Si querés
          sumar Finca 4 Elementos a tu carta, escribinos y conversamos.
        </p>
        <a href={`mailto:${site.email}`} className="cta__btn btn-fill">
          Escribir a distribución →
        </a>
        <p className="cta__fine">
          Fase institucional · todavía sin venta directa al consumidor final
        </p>
      </Reveal>
    </section>
  );
}
