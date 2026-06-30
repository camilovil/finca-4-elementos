// Wordmark gigante de fondo que deriva horizontalmente con el scroll.
// El movimiento lo maneja GsapScroll vía data-parallax-x (scrub).
export default function ParallaxWordmark({
  text,
  amount = 12,
}: {
  text: string;
  amount?: number;
}) {
  return (
    <div className="pwordmark" aria-hidden="true">
      <span className="pwordmark__text" data-parallax-x={amount}>
        {text}
      </span>
    </div>
  );
}
