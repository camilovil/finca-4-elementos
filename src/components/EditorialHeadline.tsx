"use client";

import { useInView } from "./useInView";

type Word = { text: string; variant?: "serif" | "anton" | "italic" | "gold" };

// Titular editorial mixto (Cormorant + Anton) cuyas palabras suben en cascada
// al entrar en viewport. Patrón del handoff "Elementos Editoriales".
export default function EditorialHeadline({
  words,
  className = "",
}: {
  words: Word[];
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLParagraphElement>(
    "0px 0px -6% 0px"
  );

  return (
    <p
      ref={ref}
      className={`ehead${inView ? " in" : ""} ${className}`.trim()}
    >
      {words.map((w, i) => (
        <span key={i} className="ehead__mask">
          <span
            className={`ehead__word ehead__word--${w.variant ?? "serif"}`}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            {w.text}
            {" "}
          </span>
        </span>
      ))}
    </p>
  );
}
