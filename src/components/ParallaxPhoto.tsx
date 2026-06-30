// Foto con reveal "cortina" + parallax — la animación la maneja GsapScroll
// vía la clase .rimg (clip-path scrub) y el <img> interno (parallax scrub).
export default function ParallaxPhoto({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`rimg ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
    </div>
  );
}
