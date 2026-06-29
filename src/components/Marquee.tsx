type MarqueeProps = {
  items: string[];
  reverse?: boolean;
};

// Cinta en loop infinito (estilo lidiaeamato). CSS puro, duplicada para loop continuo.
export default function Marquee({ items, reverse = false }: MarqueeProps) {
  const row = (
    <div className="marquee__row" aria-hidden="true">
      {items.map((t, i) => (
        <span key={i} className="marquee__item">
          {t}
          <span className="marquee__sep">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee">
      <div className={`marquee__track${reverse ? " marquee__track--rev" : ""}`}>
        {row}
        {row}
      </div>
    </div>
  );
}
